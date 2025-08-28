import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Shield, Users, CheckCircle } from 'lucide-react'

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery.trim()) params.append('query', searchQuery.trim())
    if (selectedService) params.append('service', selectedService)
    if (selectedLocation) params.append('location', selectedLocation)
    
    navigate(`/find-consultants?${params.toString()}`)
  }

  const serviceTypes = [
    { value: 'customs-declarations', label: 'Customs Declarations' },
    { value: 'vat-tax-compliance', label: 'VAT/Tax Compliance' },
    { value: 'northern-ireland-protocol', label: 'Northern Ireland Protocol' },
    { value: 'regulatory-compliance', label: 'Regulatory Compliance' },
    { value: 'import-export-documentation', label: 'Import/Export Documentation' },
    { value: 'supply-chain-consulting', label: 'Supply Chain Consulting' }
  ]

  const locations = [
    { value: 'london', label: 'London' },
    { value: 'manchester', label: 'Manchester' },
    { value: 'birmingham', label: 'Birmingham' },
    { value: 'scotland', label: 'Scotland' },
    { value: 'wales', label: 'Wales' },
    { value: 'northern-ireland', label: 'Northern Ireland' }
  ]

  return (
    <section className="bg-gradient-to-br from-[#003366] via-[#004225] to-[#003366] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Verified Brexit
            <span className="block text-[#FFD700]">Compliance Consultants</span>
            <span className="block text-3xl md:text-4xl font-normal mt-2">
              in the UK
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Connect with certified customs agents, trade specialists, and Brexit experts. 
            Get professional guidance to navigate post-Brexit compliance with confidence.
          </p>

          {/* Search form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Service type dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Service Type</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  >
                    <option value="">All Services</option>
                    {serviceTypes.map(service => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Keywords</label>
                  <input
                    type="text"
                    placeholder="Company name, industry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Search button */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#003366] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Find Consultants</span>
                </button>
                <Link
                  to="/request-quote"
                  className="flex-1 bg-[#FFD700] text-[#003366] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>Request Quote</span>
                </Link>
              </div>
            </div>
          </form>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Shield className="w-12 h-12 text-[#FFD700]" />
              </div>
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-blue-100">Verified Consultants</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Users className="w-12 h-12 text-[#FFD700]" />
              </div>
              <h3 className="text-2xl font-bold">1000+</h3>
              <p className="text-blue-100">Businesses Helped</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-[#FFD700]" />
              </div>
              <h3 className="text-2xl font-bold">100%</h3>
              <p className="text-blue-100">All Consultants Vetted</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}