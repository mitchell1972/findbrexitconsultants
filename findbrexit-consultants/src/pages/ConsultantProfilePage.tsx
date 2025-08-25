import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  MapPin, 
  Clock, 
  CheckCircle, 
  Star, 
  ExternalLink, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Calendar, 
  Award, 
  MessageSquare,
  Eye
} from 'lucide-react'
import { supabase, type Consultant, type Review } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface ConsultantDetails extends Consultant {
  services?: Array<{ name: string; slug: string }>
  industries?: Array<{ name: string; slug: string }>
  reviews?: Review[]
  averageRating?: number
  totalReviews?: number
}

export function ConsultantProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [consultant, setConsultant] = useState<ConsultantDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (id) {
      fetchConsultantDetails(id)
      // Increment profile views
      incrementProfileViews(id)
    }
  }, [id])

  const fetchConsultantDetails = async (consultantId: string) => {
    try {
      // Fetch consultant basic info
      const { data: consultantData, error: consultantError } = await supabase
        .from('brexit_consultants')
        .select('*')
        .eq('id', consultantId)
        .eq('approved_at', 'not.is.null')
        .maybeSingle()

      if (consultantError) throw consultantError
      if (!consultantData) {
        toast.error('Consultant not found')
        return
      }

      // Fetch services
      const { data: servicesData } = await supabase
        .from('brexit_consultant_services')
        .select(`
          brexit_service_types (
            name,
            slug
          )
        `)
        .eq('consultant_id', consultantId)

      // Fetch industries
      const { data: industriesData } = await supabase
        .from('brexit_consultant_industries')
        .select(`
          brexit_industries (
            name,
            slug
          )
        `)
        .eq('consultant_id', consultantId)

      // Fetch reviews
      const { data: reviewsData } = await supabase
        .from('brexit_reviews')
        .select('*')
        .eq('consultant_id', consultantId)
        .eq('verified', true)
        .order('created_at', { ascending: false })

      // Calculate average rating
      const averageRating = reviewsData && reviewsData.length > 0 
        ? reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length
        : 0

      const consultantDetails: ConsultantDetails = {
        ...consultantData,
        services: servicesData?.map(item => item.brexit_service_types).filter(Boolean) || [],
        industries: industriesData?.map(item => item.brexit_industries).filter(Boolean) || [],
        reviews: reviewsData || [],
        averageRating,
        totalReviews: reviewsData?.length || 0
      }

      setConsultant(consultantDetails)
    } catch (error: any) {
      console.error('Error fetching consultant details:', error)
      toast.error('Failed to load consultant details')
    } finally {
      setLoading(false)
    }
  }

  const incrementProfileViews = async (consultantId: string) => {
    try {
      await supabase
        .from('brexit_consultants')
        .update({ 
          profile_views: consultant?.profile_views ? consultant.profile_views + 1 : 1
        })
        .eq('id', consultantId)
    } catch (error) {
      console.error('Error updating profile views:', error)
    }
  }

  const getPricingDisplay = (level: number) => {
    const labels = ['', 'Budget Friendly', 'Mid-Range', 'Premium']
    return {
      symbols: '£'.repeat(level),
      label: labels[level] || ''
    }
  }

  const renderStars = (rating: number, size = 'w-4 h-4') => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${size} ${
              i < rating
                ? 'text-[#FFD700] fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!consultant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Consultant not found</h2>
          <p className="text-gray-600 mb-6">The consultant you're looking for doesn't exist or is no longer available.</p>
          <Link 
            to="/find-consultants"
            className="inline-flex items-center px-6 py-3 bg-[#003366] text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
          >
            Browse All Consultants
          </Link>
        </div>
      </div>
    )
  }

  const pricing = getPricingDisplay(consultant.pricing_level)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Company name and badges */}
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-3xl font-bold text-[#003366]">{consultant.company_name}</h1>
                {consultant.verified && (
                  <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                )}
                {consultant.featured && (
                  <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Featured</span>
                  </div>
                )}
              </div>

              {/* Contact person and location */}
              <div className="flex items-center space-x-6 text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{consultant.contact_person}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{consultant.city}</span>
                  {consultant.postcode && <span>, {consultant.postcode}</span>}
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{consultant.profile_views} views</span>
                </div>
              </div>

              {/* Rating and reviews */}
              {consultant.totalReviews! > 0 && (
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    {renderStars(Math.round(consultant.averageRating!))}
                    <span className="font-semibold text-gray-900">
                      {consultant.averageRating!.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-gray-600">
                    ({consultant.totalReviews} review{consultant.totalReviews !== 1 ? 's' : ''})
                  </span>
                </div>
              )}

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-[#003366]">{consultant.years_in_business}</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-[#003366]">{consultant.team_size}</div>
                  <div className="text-sm text-gray-600">Team Size</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-[#003366]">{consultant.response_time_hours}h</div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-[#003366]">{pricing.symbols}</div>
                  <div className="text-sm text-gray-600">{pricing.label}</div>
                </div>
              </div>
            </div>

            {/* Contact actions */}
            <div className="flex-shrink-0 ml-6">
              <div className="flex flex-col space-y-3">
                <Link
                  to={`/contact/${consultant.id}`}
                  className="bg-[#003366] text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-blue-800 transition-colors"
                >
                  Contact Consultant
                </Link>
                <Link
                  to={`/request-quote?consultant=${consultant.id}`}
                  className="border-2 border-[#003366] text-[#003366] px-6 py-3 rounded-lg font-semibold text-center hover:bg-[#003366] hover:text-white transition-colors"
                >
                  Request Quote
                </Link>
                {consultant.free_consultation && (
                  <div className="text-center text-sm text-green-600 font-medium">
                    Free Consultation Available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'services', label: 'Services & Industries' },
              { id: 'reviews', label: `Reviews (${consultant.totalReviews})` },
              { id: 'contact', label: 'Contact Information' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#003366] text-[#003366]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-[#003366] mb-4">About {consultant.company_name}</h3>
                <p className="text-gray-700 leading-relaxed">{consultant.description}</p>
                
                {consultant.approved_at && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Member since {formatDate(consultant.approved_at)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Project Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-[#003366] mb-4">Project Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Minimum Project Size</div>
                    <div className="font-medium">{consultant.minimum_project_size || 'Contact for quote'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Typical Project Duration</div>
                    <div className="font-medium">{consultant.typical_project_duration || 'Varies by project'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-[#003366] mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  {consultant.phone && (
                    <a 
                      href={`tel:${consultant.phone}`}
                      className="flex items-center space-x-3 text-gray-600 hover:text-[#003366] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{consultant.phone}</span>
                    </a>
                  )}
                  <a 
                    href={`mailto:${consultant.email}`}
                    className="flex items-center space-x-3 text-gray-600 hover:text-[#003366] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{consultant.email}</span>
                  </a>
                  {consultant.website_url && (
                    <a 
                      href={consultant.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-gray-600 hover:text-[#003366] transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Visit Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Response Guarantee */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">Response Guarantee</h3>
                </div>
                <p className="text-green-700 text-sm">
                  This consultant typically responds within {consultant.response_time_hours} hours during business days.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Services */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#003366] mb-4">Services Offered</h3>
              {consultant.services && consultant.services.length > 0 ? (
                <div className="space-y-3">
                  {consultant.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium">{service.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No specific services listed</p>
              )}
            </div>

            {/* Industries */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#003366] mb-4">Industries Served</h3>
              {consultant.industries && consultant.industries.length > 0 ? (
                <div className="space-y-3">
                  {consultant.industries.map((industry, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Award className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">{industry.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No specific industries listed</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {consultant.reviews && consultant.reviews.length > 0 ? (
              consultant.reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{review.reviewer_name || 'Anonymous'}</span>
                        {review.business_name && (
                          <span> from {review.business_name}</span>
                        )}
                      </div>
                    </div>
                    {review.project_value && (
                      <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                        {review.project_value}
                      </div>
                    )}
                  </div>
                  
                  <blockquote className="text-gray-700 mb-4">
                    "{review.review_text}"
                  </blockquote>
                  
                  {review.project_type && (
                    <div className="text-sm text-gray-500">
                      Project type: {review.project_type}
                    </div>
                  )}
                  
                  {review.response_text && (
                    <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400">
                      <div className="text-sm font-medium text-blue-900 mb-1">Response from {consultant.company_name}:</div>
                      <div className="text-sm text-blue-700">{review.response_text}</div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600">Be the first to leave a review for this consultant</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#003366] mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Contact Person</div>
                  <div className="font-medium">{consultant.contact_person}</div>
                </div>
                
                {consultant.phone && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Phone</div>
                    <a href={`tel:${consultant.phone}`} className="font-medium text-[#003366] hover:underline">
                      {consultant.phone}
                    </a>
                  </div>
                )}
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Email</div>
                  <a href={`mailto:${consultant.email}`} className="font-medium text-[#003366] hover:underline">
                    {consultant.email}
                  </a>
                </div>
                
                {consultant.website_url && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Website</div>
                    <a 
                      href={consultant.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium text-[#003366] hover:underline flex items-center space-x-1"
                    >
                      <span>{consultant.website_url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                
                {consultant.linkedin_url && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">LinkedIn</div>
                    <a 
                      href={consultant.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium text-[#003366] hover:underline flex items-center space-x-1"
                    >
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#003366] mb-4">Address</h3>
              <div className="space-y-2">
                {consultant.address && (
                  <div>{consultant.address}</div>
                )}
                <div>{consultant.city}</div>
                {consultant.postcode && (
                  <div>{consultant.postcode}</div>
                )}
                <div className="text-gray-600">United Kingdom</div>
              </div>
              
              {/* WhatsApp if available */}
              {consultant.whatsapp_number && (
                <div className="mt-6">
                  <a
                    href={`https://wa.me/${consultant.whatsapp_number.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}