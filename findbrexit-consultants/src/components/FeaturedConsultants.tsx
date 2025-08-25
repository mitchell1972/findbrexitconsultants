import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, Clock, CheckCircle, ExternalLink, Phone } from 'lucide-react'
import { supabase, type Consultant } from '@/lib/supabase'

export function FeaturedConsultants() {
  const [consultants, setConsultants] = useState<Consultant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedConsultants() {
      try {
        const { data, error } = await supabase.functions.invoke('search-consultants', {
          body: {
            featured: true,
            limit: 6
          }
        })

        if (error) throw error
        
        if (data?.data?.consultants) {
          // Get featured consultants or fallback to top consultants
          const featured = data.data.consultants.filter((c: Consultant) => c.featured)
          const topConsultants = featured.length >= 3 ? featured.slice(0, 6) : data.data.consultants.slice(0, 6)
          setConsultants(topConsultants)
        }
      } catch (error) {
        console.error('Error fetching featured consultants:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedConsultants()
  }, [])

  const getPricingDisplay = (level: number) => {
    return '£'.repeat(level)
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
              Featured Brexit Consultants
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
            Featured Brexit Consultants
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Premium verified consultants with proven track records. 
            These experts have helped hundreds of businesses navigate Brexit compliance.
          </p>
        </div>

        {/* Consultants grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consultants.map((consultant) => (
            <div
              key={consultant.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200"
            >
              {/* Card header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-[#003366] truncate">
                        {consultant.company_name}
                      </h3>
                      {consultant.verified && (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      )}
                      {consultant.featured && (
                        <Star className="w-5 h-5 text-[#FFD700] flex-shrink-0 fill-current" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{consultant.contact_person}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{getPricingDisplay(consultant.pricing_level)}</div>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                {/* Location and response time */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{consultant.city}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{consultant.response_time_hours}h response</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {consultant.description}
                </p>

                {/* Key info */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Experience:</span>
                    <span className="text-gray-900 font-medium">{consultant.years_in_business} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Team size:</span>
                    <span className="text-gray-900 font-medium">{consultant.team_size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Min. project:</span>
                    <span className="text-gray-900 font-medium">{consultant.minimum_project_size || 'Contact for quote'}</span>
                  </div>
                </div>

                {/* Free consultation badge */}
                {consultant.free_consultation && (
                  <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mb-4">
                    Free Consultation Available
                  </div>
                )}
              </div>

              {/* Card footer */}
              <div className="px-6 pb-6">
                <div className="flex space-x-3">
                  <Link
                    to={`/consultant/${consultant.id}`}
                    className="flex-1 bg-[#003366] text-white px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-blue-800 transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link
                    to={`/contact/${consultant.id}`}
                    className="flex-1 border-2 border-[#003366] text-[#003366] px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-[#003366] hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </div>
                
                {/* Additional contact options */}
                <div className="flex items-center justify-center space-x-4 mt-3 text-xs text-gray-500">
                  {consultant.website_url && (
                    <a 
                      href={consultant.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 hover:text-[#003366]"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Website</span>
                    </a>
                  )}
                  {consultant.phone && (
                    <a 
                      href={`tel:${consultant.phone}`}
                      className="flex items-center space-x-1 hover:text-[#003366]"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Link
            to="/find-consultants"
            className="inline-flex items-center px-8 py-4 bg-[#004225] text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
          >
            View All Consultants
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}