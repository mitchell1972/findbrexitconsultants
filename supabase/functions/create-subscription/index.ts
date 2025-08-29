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

interface CreateCheckoutRequest {
  planType: 'starter' | 'professional' | 'enterprise'
  customerEmail: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders })
  }

  try {
    const { planType, customerEmail }: CreateCheckoutRequest = await req.json()

    if (!planType || !customerEmail) {
      throw new Error('Missing required fields: planType, customerEmail')
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Get plan details from database
    const { data: plan, error: planError } = await supabase
      .from('fbc_plans')
      .select('*')
      .eq('plan_type', planType)
      .single()

    if (planError || !plan) {
      throw new Error(`Plan not found: ${planType}`)
    }

    // Create Stripe checkout session
    const checkoutSession = await createStripeCheckoutSession({
      priceId: plan.price_id,
      customerEmail,
      planType
    })

    return new Response(
      JSON.stringify({ data: { checkoutUrl: checkoutSession.url } }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Create subscription error:', error)
    return new Response(
      JSON.stringify({ 
        error: {
          code: 'CREATE_SUBSCRIPTION_ERROR',
          message: error.message || 'Failed to create subscription'
        }
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function createStripeCheckoutSession({
  priceId,
  customerEmail,
  planType
}: {
  priceId: string
  customerEmail: string
  planType: string
}) {
  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'payment_method_types[0]': 'card',
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      'mode': 'subscription',
      'customer_email': customerEmail,
      'success_url': `${Deno.env.get('SUPABASE_URL')?.replace('supabase.co', 'space.minimaxi.cn')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      'cancel_url': `${Deno.env.get('SUPABASE_URL')?.replace('supabase.co', 'space.minimaxi.cn')}/payment/cancel`,
      'metadata[plan_type]': planType,
      'metadata[customer_email]': customerEmail,
      'subscription_data[trial_period_days]': '14',
      'billing_address_collection': 'required',
      'allow_promotion_codes': 'true',
      'automatic_tax[enabled]': 'true'
    })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Stripe API error: ${errorData.error?.message || 'Unknown error'}`)
  }

  return await response.json()
}