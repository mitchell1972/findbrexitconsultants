import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { BarChart3, Users, MessageSquare, Settings, Eye, TrendingUp, LogOut, CreditCard } from 'lucide-react'
import { SubscriptionManager } from '../../components/SubscriptionManager'
import toast from 'react-hot-toast'

export function ConsultantDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
      navigate('/')
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please sign in to access your consultant dashboard.</p>
          <Link
            to="/signin"
            className="bg-[#003366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#003366]">Consultant Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-gray-600 hover:text-[#003366] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Subscription Section */}
        <SubscriptionManager />
        
        {/* Main Dashboard */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-8 h-8 text-[#003366]" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#003366] mb-4">Dashboard Coming Soon</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're building a comprehensive dashboard where you can manage your consultant profile, 
            track leads, view analytics, and grow your Brexit consulting business.
          </p>
          
          {/* Preview features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-4">
              <Users className="w-8 h-8 text-[#003366] mx-auto mb-3" />
              <h3 className="font-semibold text-[#003366] mb-2">Lead Management</h3>
              <p className="text-sm text-gray-600">Track and respond to client enquiries</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <Eye className="w-8 h-8 text-[#003366] mx-auto mb-3" />
              <h3 className="font-semibold text-[#003366] mb-2">Profile Analytics</h3>
              <p className="text-sm text-gray-600">View profile views and performance metrics</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <MessageSquare className="w-8 h-8 text-[#003366] mx-auto mb-3" />
              <h3 className="font-semibold text-[#003366] mb-2">Message Center</h3>
              <p className="text-sm text-gray-600">Communicate with potential clients</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <TrendingUp className="w-8 h-8 text-[#003366] mx-auto mb-3" />
              <h3 className="font-semibold text-[#003366] mb-2">Business Growth</h3>
              <p className="text-sm text-gray-600">Track revenue and client acquisition</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <Settings className="w-8 h-8 text-[#003366] mx-auto mb-3" />
              <h3 className="font-semibold text-[#003366] mb-2">Profile Management</h3>
              <p className="text-sm text-gray-600">Update your business information</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <CreditCard className="w-8 h-8 text-[#003366] mx-auto mb-3" />
              <h3 className="font-semibold text-[#003366] mb-2">Billing & Plans</h3>
              <p className="text-sm text-gray-600">Manage subscriptions and billing</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/pricing"
              className="bg-[#003366] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              View Plans
            </Link>
            <Link
              to="/find-consultants"
              className="border-2 border-[#003366] text-[#003366] px-8 py-4 rounded-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors"
            >
              Browse Directory
            </Link>
            <Link
              to="/contact"
              className="border-2 border-[#003366] text-[#003366] px-8 py-4 rounded-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors"
            >
              Contact Support
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Full dashboard functionality will be available soon. Thank you for your patience!
          </p>
        </div>
      </div>
    </div>
  )
}