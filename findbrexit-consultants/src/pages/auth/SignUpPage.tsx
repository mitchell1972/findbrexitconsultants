import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, Building } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

export function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    contactName: '',
    acceptTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const updateForm = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.email || !formData.password || !formData.companyName || !formData.contactName) {
      toast.error('Please fill in all required fields')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions')
      return
    }

    setIsLoading(true)
    try {
      const { error } = await signUp(formData.email, formData.password)
      
      if (error) {
        // Improved error handling
        let errorMessage = 'Failed to create account'
        
        if (error.message.includes('email')) {
          errorMessage = 'Please enter a valid email address'
        } else if (error.message.includes('password')) {
          errorMessage = 'Password does not meet requirements'
        } else {
          errorMessage = error.message
        }
        
        toast.error(errorMessage)
      } else {
        toast.success('Account created! Please check your email to verify your account.')
        navigate('/signin')
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
          <h2 className="text-3xl font-bold text-gray-900">Create your consultant account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our directory of verified Brexit compliance consultants
          </p>
        </div>

        {/* Sign up form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    className="pl-10 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="Your consulting company name"
                    value={formData.companyName}
                    onChange={(e) => updateForm('companyName', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    required
                    className="pl-10 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="Your full name"
                    value={formData.contactName}
                    onChange={(e) => updateForm('contactName', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address *
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
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className="pl-10 pr-10 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => updateForm('password', e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    className="pl-10 pr-10 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateForm('confirmPassword', e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                className="h-4 w-4 text-[#003366] focus:ring-[#003366] border-gray-300 rounded"
                checked={formData.acceptTerms}
                onChange={(e) => updateForm('acceptTerms', e.target.checked)}
              />
              <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-[#003366] hover:text-blue-800">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-[#003366] hover:text-blue-800">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#003366] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Sign in link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="font-medium text-[#003366] hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}