import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Credentials': 'false'
}

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

if (!STRIPE_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing required environment variables')
}

interface PortalRequest {
  userEmail: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders })
  }

  try {
    const { userEmail }: PortalRequest = await req.json()

    if (!userEmail) {
      throw new Error('Missing required field: userEmail')
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Get user's active subscription
    const { data: authUsers, error: userError } = await supabase.auth.admin.listUsers()
    if (userError) {
      throw new Error('Failed to fetch user data')
    }

    const user = authUsers.users.find((u: any) => u.email === userEmail)
    if (!user) {
      throw new Error('User not found')
    }

    const { data: subscription, error: subError } = await supabase
      .from('fbc_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    if (subError || !subscription) {
      throw new Error('No active subscription found')
    }

    // Create Stripe customer portal session
    const portalSession = await createStripePortalSession(
      subscription.stripe_customer_id
    )

    return new Response(
      JSON.stringify({ data: { portalUrl: portalSession.url } }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Customer portal error:', error)
    return new Response(
      JSON.stringify({ 
        error: {
          code: 'PORTAL_ERROR',
          message: error.message || 'Failed to create portal session'
        }
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function createStripePortalSession(customerId: string) {
  const response = await fetch('https://api.stripe.com/v1/billing_portal/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'customer': customerId,
      'return_url': `${Deno.env.get('SUPABASE_URL')?.replace('supabase.co', 'space.minimaxi.cn')}/pricing`
    })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Stripe API error: ${errorData.error?.message || 'Unknown error'}`)
  }

  return await response.json()
}