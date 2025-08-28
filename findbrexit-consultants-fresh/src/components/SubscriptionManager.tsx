import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { CreditCard, Calendar, CheckCircle, AlertTriangle, Clock, BarChart3, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'

interface SubscriptionData {
  id: string
  stripe_subscription_id: string
  stripe_customer_id: string
  status: string
  price_id: string
  created_at: string
  updated_at: string
  fbc_plans: {
    plan_type: string
    price: number
    monthly_limit: number
  }
}

export function SubscriptionManager() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchSubscription()
    }
  }, [user])

  const fetchSubscription = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('fbc_subscriptions')
        .select(`
          *,
          fbc_plans!price_id(
            plan_type,
            price,
            monthly_limit
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle()

      if (error) {
        console.error('Error fetching subscription:', error)
      } else {
        setSubscription(data)
      }
    } catch (error) {
      console.error('Subscription fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleManageBilling = async () => {
    if (!user || !subscription) return

    setPortalLoading(true)

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        body: {
          userEmail: user.email
        }
      })

      if (error) throw error

      if (data.data?.portalUrl) {
        toast.success('Redirecting to billing portal...')
        window.open(data.data.portalUrl, '_blank')
      } else {
        throw new Error('No portal URL received')
      }
    } catch (error: any) {
      console.error('Portal error:', error)
      toast.error(error.message || 'Failed to access billing portal. Please try again.')
    } finally {
      setPortalLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'trialing':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'past_due':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'cancelled':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5" />
      case 'trialing':
        return <Clock className="w-5 h-5" />
      case 'past_due':
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <CheckCircle className="w-5 h-5" />
    }
  }

  const formatPrice = (priceInPence: number) => {
    return `£${(priceInPence / 100).toFixed(0)}`
  }

  const formatPlanName = (planType: string) => {
    return planType.charAt(0).toUpperCase() + planType.slice(1)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!subscription) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="text-center py-8">
          <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Subscription</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to a plan to access premium features and get more client leads.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center space-x-2 bg-[#003366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            <span>View Plans</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#003366]">Subscription</h2>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${
          getStatusColor(subscription.status)
        }`}>
          {getStatusIcon(subscription.status)}
          <span className="text-sm font-medium capitalize">
            {subscription.status === 'trialing' ? 'Free Trial' : subscription.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Current Plan</h3>
          <div className="text-2xl font-bold text-[#003366] mb-1">
            {formatPlanName(subscription.fbc_plans.plan_type)}
          </div>
          <div className="text-sm text-gray-600">
            {formatPrice(subscription.fbc_plans.price)}/month
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Quote Limit</h3>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-[#003366]" />
            <span className="text-lg font-semibold text-[#003366]">
              {subscription.fbc_plans.monthly_limit}
            </span>
            <span className="text-sm text-gray-600">requests/month</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Billing Management</h3>
            <p className="text-sm text-gray-600">
              Update payment methods, download invoices, and manage your subscription
            </p>
          </div>
          <button
            onClick={handleManageBilling}
            disabled={portalLoading}
            className="flex items-center space-x-2 bg-[#003366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="w-4 h-4" />
            <span>{portalLoading ? 'Loading...' : 'Manage Billing'}</span>
            {!portalLoading && <ExternalLink className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {subscription.status === 'trialing' && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Free Trial Active</h4>
              <p className="text-sm text-blue-700 mt-1">
                You're currently enjoying a 14-day free trial. Your subscription will begin automatically after the trial ends.
              </p>
            </div>
          </div>
        </div>
      )}

      {subscription.status === 'past_due' && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">Payment Required</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Your payment is past due. Please update your payment method to continue using premium features.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}