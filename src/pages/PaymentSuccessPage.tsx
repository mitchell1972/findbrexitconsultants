import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, ArrowRight, CreditCard, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'

export function PaymentSuccessPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    // Show success message when component mounts
    toast.success('Payment successful! Your subscription is now active.', {
      duration: 5000
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          {/* Success Message */}
          <h1 className="text-2xl font-bold text-[#003366] mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Your subscription has been activated successfully. You now have access to all premium features and can start receiving more client leads.
          </p>
          
          {/* Features Highlight */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-[#003366] mb-3">What's included:</h3>
            <ul className="text-sm text-gray-700 space-y-2 text-left">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Enhanced consultant profile</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Priority listing placement</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Access to quote requests</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Analytics dashboard</span>
              </li>
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/dashboard"
              className="w-full bg-[#003366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/pricing"
                className="flex-1 flex items-center justify-center space-x-2 border-2 border-[#003366] text-[#003366] px-4 py-2 rounded-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors text-sm"
              >
                <CreditCard className="w-4 h-4" />
                <span>Manage Billing</span>
              </Link>
              
              <Link
                to="/find-consultants"
                className="flex-1 flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>View Directory</span>
              </Link>
            </div>
          </div>
          
          {/* Support Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">
              Need help getting started?
            </p>
            <Link
              to="/contact"
              className="text-[#003366] hover:text-blue-800 font-medium text-sm"
            >
              Contact our support team
            </Link>
          </div>
          
          {/* Session ID for Reference */}
          {sessionId && (
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Transaction Reference:</p>
              <p className="text-xs font-mono text-gray-700 break-all">{sessionId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}