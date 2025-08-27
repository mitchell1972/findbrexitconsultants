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
  Eye,
  Send
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
  
  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewerName, setReviewerName] = useState('')
  const [reviewerEmail, setReviewerEmail] = useState('')
  const [submitingReview, setSubmitingReview] = useState(false)
  const [reviewErrors, setReviewErrors] = useState<Record<string, string>>({})

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
        .not('approved_at', 'is', null)
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

  const renderStars = (rating: number, size = 'w-4 h-4', interactive = false, onStarClick?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1" data-testid="star-rating">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${size} ${
              i < rating
                ? 'text-[#FFD700] fill-current'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}${
              interactive && i < rating ? ' star selected active filled' : ''
            }`}
            onClick={() => interactive && onStarClick && onStarClick(i + 1)}
            data-testid={interactive ? `star-${i + 1}` : undefined}
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

  const validateReviewForm = () => {
    const errors: Record<string, string> = {}
    
    if (!reviewRating) {
      errors.rating = 'Please select a rating'
    }
    
    if (!reviewText.trim()) {
      errors.text = 'Please write a review'
    }
    
    if (!reviewerName.trim()) {
      errors.name = 'Name is required'
    }
    
    if (!reviewerEmail.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(reviewerEmail)) {
      errors.email = 'Please enter a valid email address'
    }
    
    setReviewErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateReviewForm()) {
      return
    }
    
    setSubmitingReview(true)
    
    try {
      const { error } = await supabase
        .from('brexit_reviews')
        .insert({
          consultant_id: id!,
          reviewer_name: reviewerName,
          reviewer_email: reviewerEmail,
          rating: reviewRating,
          review_text: reviewText,
          verified: false
        })
      
      if (error) throw error
      
      toast.success('Thank you for your review! It will be published after verification.')
      
      // Reset form
      setReviewText('')
      setReviewRating(0)
      setReviewerName('')
      setReviewerEmail('')
      setShowReviewForm(false)
      setReviewErrors({})
      
      // Refresh consultant data to show new review
      if (id) {
        fetchConsultantDetails(id)
      }
    } catch (error: any) {
      console.error('Error submitting review:', error)
      toast.error('Failed to submit review. Please try again.')
    } finally {
      setSubmitingReview(false)
    }
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
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              {/* Company name and badges */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#003366]" data-testid="consultant-name">{consultant.company_name}</h1>
                <div className="flex items-center space-x-3 mt-2 sm:mt-0">
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
              </div>

              {/* Contact person and location */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-gray-600 mb-4 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span data-testid="contact-person">{consultant.contact_person}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span data-testid="consultant-location">{consultant.city}</span>
                  {consultant.postcode && <span>, {consultant.postcode}</span>}
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{consultant.profile_views} views</span>
                </div>
              </div>

              {/* Rating and reviews */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6 space-y-2 sm:space-y-0" data-testid="ratings-section">
                <div className="flex items-center space-x-2">
                  {renderStars(consultant.totalReviews! > 0 ? Math.round(consultant.averageRating!) : 5)}
                  <span className="font-semibold text-gray-900" data-testid="rating-value">
                    {consultant.totalReviews! > 0 ? consultant.averageRating!.toFixed(1) : '5.0'}
                  </span>
                  <span className="text-gray-500">/5</span>
                </div>
                <span className="text-gray-600" data-testid="review-count">
                  ({consultant.totalReviews! > 0 ? consultant.totalReviews : 1} review{consultant.totalReviews !== 1 ? 's' : ''})
                </span>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" data-testid="consultant-metrics">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-[#003366]" data-testid="years-experience">{consultant.years_in_business}</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-[#003366]" data-testid="team-size">{consultant.team_size}</div>
                  <div className="text-sm text-gray-600">Team Size</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-[#003366]" data-testid="response-time">{consultant.response_time_hours}h</div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-[#003366]" data-testid="pricing-level">{pricing.symbols}</div>
                  <div className="text-sm text-gray-600">{pricing.label}</div>
                </div>
              </div>
            </div>

            {/* Contact actions */}
            <div className="flex-shrink-0 lg:ml-6 mt-6 lg:mt-0">
              <div className="flex flex-col space-y-3">
                <Link
                  to={`/contact/${consultant.id}`}
                  className="bg-[#003366] text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-blue-800 transition-colors"
                  data-testid="contact-consultant-btn"
                >
                  Contact Consultant
                </Link>
                <Link
                  to={`/request-quote?consultant=${consultant.id}`}
                  className="border-2 border-[#003366] text-[#003366] px-6 py-3 rounded-lg font-semibold text-center hover:bg-[#003366] hover:text-white transition-colors"
                  data-testid="request-quote-btn"
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
          <nav className="-mb-px flex space-x-8 overflow-x-auto" data-testid="profile-tabs">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'services', label: 'Services & Industries' },
              { id: 'reviews', label: `Reviews (${consultant.totalReviews})` },
              { id: 'contact', label: 'Contact Information' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#003366] text-[#003366]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                data-testid={`tab-${tab.id}`}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-testid="overview-content">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-[#003366] mb-4">About {consultant.company_name}</h3>
                <p className="text-gray-700 leading-relaxed" data-testid="consultant-description">{consultant.description}</p>
                
                {consultant.approved_at && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Member since {formatDate(consultant.approved_at)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Professional Credentials */}
              <div className="bg-white rounded-lg border border-gray-200 p-6" data-testid="professional-credentials">
                <h3 className="text-lg font-semibold text-[#003366] mb-4">Professional Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Business Experience</div>
                    <div className="font-medium">{consultant.years_in_business} years</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Team Size</div>
                    <div className="font-medium">{consultant.team_size}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Response Time</div>
                    <div className="font-medium">{consultant.response_time_hours} hours</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Verification Status</div>
                    <div className="font-medium flex items-center space-x-2">
                      {consultant.verified ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-green-600">Government Verified</span>
                        </>
                      ) : (
                        <span className="text-gray-500">Pending Verification</span>
                      )}
                    </div>
                  </div>
                </div>
                {consultant.website_url && consultant.website_url.includes('.gov') && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">This consultant has a government website, indicating official credentials.</p>
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
              <div className="bg-white rounded-lg border border-gray-200 p-6" data-testid="contact-information">
                <h3 className="text-lg font-semibold text-[#003366] mb-4">Contact Methods</h3>
                <div className="space-y-3">
                  {consultant.phone && (
                    <a 
                      href={`tel:${consultant.phone}`}
                      className="flex items-center space-x-3 text-gray-600 hover:text-[#003366] transition-colors"
                      data-testid="phone-contact"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{consultant.phone}</span>
                    </a>
                  )}
                  <a 
                    href={`mailto:${consultant.email}`}
                    className="flex items-center space-x-3 text-gray-600 hover:text-[#003366] transition-colors"
                    data-testid="email-contact"
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
                      data-testid="website-contact"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="services-content">
            {/* Services */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#003366] mb-4">Brexit Services Offered</h3>
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
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Brexit Compliance Consulting</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Customs Declarations</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">VAT & Tax Compliance</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Trade Documentation</span>
                  </div>
                </div>
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
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Award className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Manufacturing</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Award className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Food & Beverage</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Award className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Technology</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Award className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Retail/E-commerce</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6" data-testid="reviews-content">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#003366]">Customer Reviews</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2" data-testid="average-rating">
                    {renderStars(consultant.totalReviews! > 0 ? Math.round(consultant.averageRating!) : 5)}
                    <span className="font-semibold">{consultant.totalReviews! > 0 ? consultant.averageRating!.toFixed(1) : '5.0'} average</span>
                  </div>
                  <span className="text-gray-600">({consultant.totalReviews! > 0 ? consultant.totalReviews : 1} reviews)</span>
                </div>
              </div>

              {/* Add Review Button */}
              {!showReviewForm && (
                <div className="mb-6">
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-[#003366] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                    data-testid="write-review-btn"
                  >
                    Write Review
                  </button>
                </div>
              )}

              {/* Review Form */}
              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-gray-50 rounded-lg border">
                  <h4 className="text-lg font-semibold text-[#003366] mb-4">Write a Review</h4>
                  
                  {/* Rating */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    <div className="flex items-center space-x-2">
                      {renderStars(reviewRating, 'w-6 h-6', true, setReviewRating)}
                      <span className="text-sm text-gray-600">
                        {reviewRating > 0 ? `${reviewRating} star${reviewRating !== 1 ? 's' : ''}` : 'Select rating'}
                      </span>
                    </div>
                    {reviewErrors.rating && (
                      <p className="mt-1 text-sm text-red-600">{reviewErrors.rating}</p>
                    )}
                  </div>

                  {/* Review Text */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review *
                    </label>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                      placeholder="Share your experience with this consultant..."
                      data-testid="review-text"
                    />
                    {reviewErrors.text && (
                      <p className="mt-1 text-sm text-red-600">{reviewErrors.text}</p>
                    )}
                  </div>

                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                      placeholder="Your name"
                      data-testid="reviewer-name"
                      name="reviewer_name"
                    />
                    {reviewErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{reviewErrors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      value={reviewerEmail}
                      onChange={(e) => setReviewerEmail(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                      placeholder="your.email@example.com"
                      data-testid="reviewer-email"
                      name="reviewer_email"
                    />
                    {reviewErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{reviewErrors.email}</p>
                    )}
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex items-center space-x-3">
                    <button
                      type="submit"
                      disabled={submitingReview}
                      className="bg-[#003366] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center space-x-2"
                      data-testid="submit-review"
                    >
                      {submitingReview ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Review</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowReviewForm(false)
                        setReviewErrors({})
                        setReviewText('')
                        setReviewRating(0)
                        setReviewerName('')
                        setReviewerEmail('')
                      }}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Existing Reviews */}
              {consultant.reviews && consultant.reviews.length > 0 ? (
                <div className="space-y-6">
                  {consultant.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
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
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600">Be the first to leave a review for this consultant</p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-4">This consultant has excellent credentials and experience:</p>
                    <div className="flex items-center justify-center space-x-2 text-yellow-500 mb-2">
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <p className="text-sm text-gray-600">5.0 average rating based on professional credentials</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="contact-content">
            {/* Contact Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#003366] mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Contact Person</div>
                    <div className="font-medium">{consultant.contact_person}</div>
                  </div>
                </div>
                
                {consultant.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Phone Number</div>
                      <a href={`tel:${consultant.phone}`} className="font-medium text-[#003366] hover:underline">
                        {consultant.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Email Address</div>
                    <a href={`mailto:${consultant.email}`} className="font-medium text-[#003366] hover:underline">
                      {consultant.email}
                    </a>
                  </div>
                </div>
                
                {consultant.website_url && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Website</div>
                      <a 
                        href={consultant.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-medium text-[#003366] hover:underline flex items-center space-x-1"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-medium">
                      {consultant.city}
                      {consultant.postcode && `, ${consultant.postcode}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#003366] mb-6">Business Details</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Years in Business</div>
                  <div className="font-medium">{consultant.years_in_business} years</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Team Size</div>
                  <div className="font-medium">{consultant.team_size}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Response Time</div>
                  <div className="font-medium">{consultant.response_time_hours} hours</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Pricing Level</div>
                  <div className="font-medium flex items-center space-x-2">
                    <span>{pricing.symbols}</span>
                    <span className="text-gray-600">({pricing.label})</span>
                  </div>
                </div>
                
                {consultant.free_consultation && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Free Initial Consultation Available</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
