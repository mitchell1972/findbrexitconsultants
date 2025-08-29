import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setIsLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      
      if (error) {
        toast.error(error.message || 'Failed to send reset email')
      } else {
        setEmailSent(true)
        toast.success('Password reset email sent!')
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-[#003366] rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">FB</span>
              </div>
              <span className="text-xl font-bold text-[#003366]">FindBrexitConsultants</span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            {emailSent ? 'Check your email' : 'Forgot your password?'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {emailSent 
              ? 'We\'ve sent a password reset link to your email address.'
              : 'Enter your email address and we\'ll send you a link to reset your password.'
            }
          </p>
        </div>

        {/* Reset form or success message */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {emailSent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">Email sent successfully!</p>
                <p className="text-sm text-gray-600">
                  If an account with <span className="font-medium">{email}</span> exists, you'll receive a password reset link shortly.
                </p>
                <p className="text-xs text-gray-500">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center w-full py-3 px-4 border border-[#003366] text-sm font-medium rounded-lg text-[#003366] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] transition-colors"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to sign in
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#003366] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send reset link
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
                
                <Link
                  to="/signin"
                  className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] transition-colors"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to sign in
                </Link>
              </div>
            </form>
          )}
        </div>

        {/* Additional help */}
        {!emailSent && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link to="/signin" className="font-medium text-[#003366] hover:text-blue-800">
                Sign in instead
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}