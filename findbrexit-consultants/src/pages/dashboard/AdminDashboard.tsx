import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  CreditCard,
  UserCheck,
  UserX,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Filter,
  Download,
  RefreshCcw
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

interface DashboardStats {
  totalConsultants: number
  pendingApprovals: number
  totalQuoteRequests: number
  monthlyRevenue: number
  activeSubscriptions: number
}

interface PendingConsultant {
  id: string
  company_name: string
  contact_name: string
  email: string
  phone: string
  created_at: string
  services: string[]
  locations: string[]
}

interface QuoteRequest {
  id: string
  full_name: string
  email: string
  company: string
  services_needed: string[]
  budget_range: string
  timeline: string
  created_at: string
  status: string
}

export function AdminDashboard() {
  const { user, signOut } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalConsultants: 0,
    pendingApprovals: 0,
    totalQuoteRequests: 0,
    monthlyRevenue: 0,
    activeSubscriptions: 0
  })
  const [pendingConsultants, setPendingConsultants] = useState<PendingConsultant[]>([])
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'consultants' | 'quotes' | 'revenue'>('overview')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        loadStats(),
        loadPendingConsultants(),
        loadQuoteRequests()
      ])
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      // Load consultant stats
      const { data: consultants } = await supabase
        .from('brexit_consultants')
        .select('id, approved_at')
      
      // Load quote request stats
      const { data: quotes } = await supabase
        .from('brexit_quote_requests')
        .select('id, created_at')

      // Load subscription stats
      const { data: subscriptions } = await supabase
        .from('brexit_subscriptions')
        .select('id, plan_type, amount, status')

      const totalConsultants = consultants?.length || 0
      const pendingApprovals = consultants?.filter(c => !c.approved_at).length || 0
      const totalQuoteRequests = quotes?.length || 0
      const activeSubscriptions = subscriptions?.filter(s => s.status === 'active').length || 0
      const monthlyRevenue = subscriptions
        ?.filter(s => s.status === 'active')
        ?.reduce((sum, s) => sum + (s.amount || 0), 0) || 0

      setStats({
        totalConsultants,
        pendingApprovals,
        totalQuoteRequests,
        monthlyRevenue,
        activeSubscriptions
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const loadPendingConsultants = async () => {
    try {
      const { data, error } = await supabase
        .from('brexit_consultants')
        .select(`
          id,
          company_name,
          contact_name,
          email,
          phone,
          created_at,
          brexit_consultant_services(
            brexit_service_types(name)
          ),
          brexit_consultant_locations(
            brexit_locations(name)
          )
        `)
        .is('approved_at', null)
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedData = data?.map(consultant => ({
        ...consultant,
        services: consultant.brexit_consultant_services?.map((s: any) => s.brexit_service_types?.name).filter(Boolean) || [],
        locations: consultant.brexit_consultant_locations?.map((l: any) => l.brexit_locations?.name).filter(Boolean) || []
      })) || []

      setPendingConsultants(formattedData)
    } catch (error) {
      console.error('Error loading pending consultants:', error)
    }
  }

  const loadQuoteRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('brexit_quote_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      setQuoteRequests(data || [])
    } catch (error) {
      console.error('Error loading quote requests:', error)
    }
  }

  const approveConsultant = async (consultantId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('approve-consultant', {
        body: {
          consultantId,
          approved: true
        }
      })

      if (error) throw error
      
      toast.success('Consultant approved successfully')
      await loadDashboardData()
    } catch (error: any) {
      console.error('Error approving consultant:', error)
      toast.error(error.message || 'Failed to approve consultant')
    }
  }

  const rejectConsultant = async (consultantId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('approve-consultant', {
        body: {
          consultantId,
          approved: false
        }
      })

      if (error) throw error
      
      toast.success('Consultant rejected')
      await loadDashboardData()
    } catch (error: any) {
      console.error('Error rejecting consultant:', error)
      toast.error(error.message || 'Failed to reject consultant')
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
    } catch (error) {
      toast.error('Error signing out')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#003366] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#003366] rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FB</span>
                </div>
                <span className="font-bold text-[#003366]">Admin Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-sm">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === 'overview'
                    ? 'bg-[#003366] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('consultants')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === 'consultants'
                    ? 'bg-[#003366] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                Consultants
                {stats.pendingApprovals > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {stats.pendingApprovals}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('quotes')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === 'quotes'
                    ? 'bg-[#003366] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                Quote Requests
              </button>
              <button
                onClick={() => setActiveTab('revenue')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === 'revenue'
                    ? 'bg-[#003366] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <DollarSign className="w-5 h-5 mr-3" />
                Revenue
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'overview' && (
            <div>
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                  <button
                    onClick={loadDashboardData}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Consultants</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalConsultants}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <UserCheck className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Quote Requests</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalQuoteRequests}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">£{stats.monthlyRevenue}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('consultants')}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                  >
                    <UserCheck className="w-8 h-8 text-[#003366] mb-2" />
                    <h4 className="font-medium text-gray-900">Review Consultants</h4>
                    <p className="text-sm text-gray-600">Approve or reject pending applications</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                  >
                    <MessageSquare className="w-8 h-8 text-[#003366] mb-2" />
                    <h4 className="font-medium text-gray-900">Manage Quotes</h4>
                    <p className="text-sm text-gray-600">View and manage quote requests</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('revenue')}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                  >
                    <TrendingUp className="w-8 h-8 text-[#003366] mb-2" />
                    <h4 className="font-medium text-gray-900">Revenue Analytics</h4>
                    <p className="text-sm text-gray-600">Track subscriptions and earnings</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'consultants' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Consultant Management</h1>
                <p className="text-gray-600">Review and approve consultant applications</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Pending Approvals ({pendingConsultants.length})
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {pendingConsultants.length === 0 ? (
                    <div className="px-6 py-8 text-center">
                      <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No pending consultant applications</p>
                    </div>
                  ) : (
                    pendingConsultants.map((consultant) => (
                      <div key={consultant.id} className="px-6 py-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <div>
                                <h4 className="text-lg font-medium text-gray-900">
                                  {consultant.company_name}
                                </h4>
                                <p className="text-gray-600">{consultant.contact_name}</p>
                              </div>
                            </div>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-600">
                                  <strong>Email:</strong> {consultant.email}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong>Phone:</strong> {consultant.phone}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong>Applied:</strong> {new Date(consultant.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 mb-1">
                                  <strong>Services:</strong>
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {consultant.services.map((service, index) => (
                                    <span
                                      key={index}
                                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                    >
                                      {service}
                                    </span>
                                  ))}
                                </div>
                                <p className="text-sm text-gray-600 mt-2 mb-1">
                                  <strong>Locations:</strong>
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {consultant.locations.map((location, index) => (
                                    <span
                                      key={index}
                                      className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                                    >
                                      {location}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => approveConsultant(consultant.id)}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700"
                            >
                              <UserCheck className="w-4 h-4 mr-1" />
                              Approve
                            </button>
                            <button
                              onClick={() => rejectConsultant(consultant.id)}
                              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                            >
                              <UserX className="w-4 h-4 mr-1" />
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Quote Requests</h1>
                <p className="text-gray-600">Manage incoming quote requests from businesses</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Quote Requests ({quoteRequests.length})
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Services
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Budget
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timeline
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {quoteRequests.map((quote) => (
                        <tr key={quote.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {quote.full_name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {quote.email}
                              </div>
                              <div className="text-sm text-gray-500">
                                {quote.company}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {quote.services_needed?.map((service, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                >
                                  {service}
                                </span>
                              )) || <span className="text-sm text-gray-500">No services specified</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {quote.budget_range || 'Not specified'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {quote.timeline || 'Not specified'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(quote.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              {quote.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {quoteRequests.length === 0 && (
                    <div className="px-6 py-8 text-center">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No quote requests found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'revenue' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Revenue Analytics</h1>
                <p className="text-gray-600">Track subscriptions and revenue metrics</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">£{stats.monthlyRevenue}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <DollarSign className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.activeSubscriptions}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <CreditCard className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Revenue Per User</p>
                      <p className="text-3xl font-bold text-gray-900">
                        £{stats.activeSubscriptions > 0 ? Math.round(stats.monthlyRevenue / stats.activeSubscriptions) : 0}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics Coming Soon</h4>
                  <p className="text-gray-600">
                    Detailed revenue charts, growth trends, and financial insights will be available here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}