import React, { useEffect, useState } from 'react'
import { Star, Quote } from 'lucide-react'
import { supabase, type Review } from '@/lib/supabase'

interface ReviewWithConsultant extends Review {
  consultant?: {
    company_name: string
  }
}

export function RecentReviews() {
  const [reviews, setReviews] = useState<ReviewWithConsultant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecentReviews() {
      try {
        // Fetch reviews with consultant information
        const { data: reviewsData, error } = await supabase
          .from('brexit_reviews')
          .select('*')
          .eq('verified', true)
          .order('created_at', { ascending: false })
          .limit(12)

        if (error) throw error

        if (reviewsData && reviewsData.length > 0) {
          // Get consultant information for each review
          const consultantIds = reviewsData.map(review => review.consultant_id)
          const { data: consultantsData } = await supabase
            .from('brexit_consultants')
            .select('id, company_name')
            .in('id', consultantIds)

          // Merge consultant data with reviews
          const reviewsWithConsultants = reviewsData.map(review => ({
            ...review,
            consultant: consultantsData?.find(c => c.id === review.consultant_id)
          }))

          setReviews(reviewsWithConsultants)
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentReviews()
  }, [])

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? 'text-[#FFD700] fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
              What Our Clients Say
            </h2>
          </div>
          <div className="flex space-x-6 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-48 w-80 flex-shrink-0"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real reviews from businesses that found success with our Brexit compliance consultants. 
            Join hundreds of satisfied clients who've navigated post-Brexit regulations with expert help.
          </p>
        </div>

        {/* Reviews carousel */}
        <div className="relative">
          {/* Scrollable container */}
          <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-80 flex-shrink-0 hover:shadow-md transition-shadow"
              >
                {/* Quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8 text-[#003366] opacity-20" />
                  {renderStars(review.rating)}
                </div>

                {/* Review text */}
                <blockquote className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                  "{review.review_text}"
                </blockquote>

                {/* Reviewer info */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#003366] text-sm">
                        {review.reviewer_name || 'Anonymous'}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {review.business_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#004225] font-medium text-xs">
                        {review.consultant?.company_name}
                      </p>
                      {review.project_type && (
                        <p className="text-gray-500 text-xs">
                          {review.project_type}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {review.project_value && (
                    <div className="mt-2">
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Project: {review.project_value}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays for scroll hint */}
          <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>

        {/* View all reviews button */}
        <div className="text-center mt-8">
          <button className="text-[#003366] font-semibold hover:text-blue-800 transition-colors">
            View All Reviews
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}