import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'lucide-react'

export function LocationPage() {
  const { slug } = useParams<{ slug: string }>()
  
  const locations: Record<string, any> = {
    'london': { name: 'London', region: 'England' },
    'manchester': { name: 'Manchester', region: 'England' },
    'birmingham': { name: 'Birmingham', region: 'England' },
    'scotland': { name: 'Scotland', region: 'Scotland' },
    'wales': { name: 'Wales', region: 'Wales' },
    'northern-ireland': { name: 'Northern Ireland', region: 'Northern Ireland' }
  }
  
  const location = locations[slug!] || { name: slug?.replace('-', ' '), region: 'UK' }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-[#003366] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-8 h-8 text-[#003366]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#003366] mb-2">Brexit Consultants in {location.name}</h1>
              <p className="text-xl text-gray-600">Find local Brexit compliance experts in {location.name}, {location.region}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-[#003366] mb-4">Location Page Coming Soon</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're building dedicated location pages with local consultants, 
            regional expertise, and location-specific Brexit compliance guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to={`/find-consultants?location=${slug}`}
              className="bg-[#003366] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Find Consultants in {location.name}
            </Link>
            <Link
              to="/request-quote"
              className="border-2 border-[#003366] text-[#003366] px-8 py-4 rounded-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}