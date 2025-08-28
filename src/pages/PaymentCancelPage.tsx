import React from 'react'
import { Link } from 'react-router-dom'
import { XCircle, ArrowLeft, CreditCard, MessageCircle, HelpCircle } from 'lucide-react'

export function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          {/* Cancel Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          
          {/* Cancel Message */}
          <h1 className="text-2xl font-bold text-[#003366] mb-4">
            Payment Cancelled
          </h1>
          <p className="text-gray-600 mb-8">
            No worries! Your payment was cancelled and no charges were made. 
            You can try again anytime or contact us if you need assistance.
          </p>
          
          {/* Reassurance */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-[#003366] mb-2">Still interested?</h3>
            <p className="text-sm text-gray-700 mb-3">
              Remember, you get a 14-day free trial with full access to all features. No payment required upfront!
            </p>
            <ul className="text-xs text-gray-600 space-y-1 text-left">
              <li>• Try all premium features for free</li>
              <li>• Cancel anytime during the trial</li>
              <li>• No setup or cancellation fees</li>
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/pricing"
              className="w-full bg-[#003366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Try Again - Start Free Trial</span>
            </Link>
            
            <Link
              to="/"
              className="w-full border-2 border-[#003366] text-[#003366] px-6 py-3 rounded-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          {/* Alternative Options */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Need help?</h4>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/contact"
                className="flex flex-col items-center space-y-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MessageCircle className="w-6 h-6 text-[#003366]" />
                <span className="text-sm font-medium text-gray-700">Contact Us</span>
              </Link>
              
              <Link
                to="/how-it-works"
                className="flex flex-col items-center space-y-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <HelpCircle className="w-6 h-6 text-[#003366]" />
                <span className="text-sm font-medium text-gray-700">How It Works</span>
              </Link>
            </div>
          </div>
          
          {/* Support Note */}
          <div className="mt-6">
            <p className="text-xs text-gray-500">
              Questions about pricing or features? Our team is here to help.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}