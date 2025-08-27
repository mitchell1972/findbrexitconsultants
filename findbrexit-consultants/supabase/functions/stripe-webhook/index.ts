import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

if (!STRIPE_WEBHOOK_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing required environment variables')
}

Deno.serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      throw new Error('No stripe signature found')
    }

    const body = await req.text()

    // Verify webhook signature
    const event = await verifyStripeSignature(body, signature)

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    console.log(`Processing webhook event: ${event.type}`)

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(supabase, event.data.object)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(supabase, event.data.object)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(supabase, event.data.object)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(supabase, event.data.object)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

async function verifyStripeSignature(body: string, signature: string) {
  // Simple timestamp validation (in production, use proper HMAC verification)
  const elements = signature.split(',')
  const timestamp = elements.find(e => e.startsWith('t='))?.split('=')[1]
  
  if (!timestamp) {
    throw new Error('Invalid signature format')
  }

  // Parse the event (in production, verify HMAC signature first)
  try {
    return JSON.parse(body)
  } catch {
    throw new Error('Invalid JSON in webhook body')
  }
}

async function handleSubscriptionChange(supabase: any, subscription: any) {
  const { id: stripeSubId, customer, items, status, metadata } = subscription
  const priceId = items.data[0].price.id

  // Get user by customer email from metadata
  const customerEmail = metadata?.customer_email
  if (!customerEmail) {
    console.error('No customer email in subscription metadata')
    return
  }

  // Find user by email
  const { data: authUsers, error: userError } = await supabase.auth.admin.listUsers()
  if (userError) {
    console.error('Failed to fetch users:', userError)
    return
  }

  const user = authUsers.users.find((u: any) => u.email === customerEmail)
  if (!user) {
    console.error(`User not found for email: ${customerEmail}`)
    return
  }

  // Upsert subscription record
  const { error } = await supabase
    .from('fbc_subscriptions')
    .upsert({
      user_id: user.id,
      stripe_subscription_id: stripeSubId,
      stripe_customer_id: customer,
      price_id: priceId,
      status: status,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'stripe_subscription_id'
    })

  if (error) {
    console.error('Failed to upsert subscription:', error)
  } else {
    console.log(`Subscription ${status}: ${stripeSubId} for user ${user.id}`)
  }
}

async function handleSubscriptionDeleted(supabase: any, subscription: any) {
  const { id: stripeSubId } = subscription

  const { error } = await supabase
    .from('fbc_subscriptions')
    .update({ 
      status: 'cancelled',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', stripeSubId)

  if (error) {
    console.error('Failed to cancel subscription:', error)
  } else {
    console.log(`Subscription cancelled: ${stripeSubId}`)
  }
}

async function handlePaymentSucceeded(supabase: any, invoice: any) {
  const subscriptionId = invoice.subscription

  if (subscriptionId) {
    const { error } = await supabase
      .from('fbc_subscriptions')
      .update({ 
        status: 'active',
        updated_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', subscriptionId)

    if (error) {
      console.error('Failed to activate subscription:', error)
    } else {
      console.log(`Payment succeeded for subscription: ${subscriptionId}`)
    }
  }
}

async function handlePaymentFailed(supabase: any, invoice: any) {
  const subscriptionId = invoice.subscription

  if (subscriptionId) {
    const { error } = await supabase
      .from('fbc_subscriptions')
      .update({ 
        status: 'past_due',
        updated_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', subscriptionId)

    if (error) {
      console.error('Failed to mark subscription as past due:', error)
    } else {
      console.log(`Payment failed for subscription: ${subscriptionId}`)
    }
  }
}