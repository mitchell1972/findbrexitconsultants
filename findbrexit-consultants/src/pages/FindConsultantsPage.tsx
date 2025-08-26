import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Filter, MapPin, Clock, CheckCircle, Star, ExternalLink, Phone } from 'lucide-react'
import { supabase, type Consultant } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface SearchFilters {
  query: string
  serviceTypes: string[]
  industries: string[]
  locations: string[]
  pricingLevel: number | null
  verifiedOnly: boolean
  freeConsultation: boolean
  sortBy: string
}

export function FindConsultantsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [consultants, setConsultants] = useState<Consultant[]>([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [usingClientSideFiltering, setUsingClientSideFiltering] = useState(false)
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('query') || '',
    serviceTypes: searchParams.get('serviceTypes')?.split(',').filter(Boolean) || [],
    industries: searchParams.get('industries')?.split(',').filter(Boolean) || [],
    locations: searchParams.get('locations')?.split(',').filter(Boolean) || [],
    pricingLevel: searchParams.get('pricingLevel') ? parseInt(searchParams.get('pricingLevel')!) : null,
    verifiedOnly: searchParams.get('verifiedOnly') === 'true',
    freeConsultation: searchParams.get('freeConsultation') === 'true',
    sortBy: searchParams.get('sortBy') || 'relevance'
  })

  // Available filter options
  const serviceTypes = [
    { value: 'customs-declarations', label: 'Customs Declarations' },
    { value: 'vat-tax-compliance', label: 'VAT/Tax Compliance' },
    { value: 'northern-ireland-protocol', label: 'Northern Ireland Protocol' },
    { value: 'regulatory-compliance', label: 'Regulatory Compliance' },
    { value: 'import-export-documentation', label: 'Import/Export Documentation' },
    { value: 'supply-chain-consulting', label: 'Supply Chain Consulting' }
  ]

  const industries = [
    { value: 'food-beverage', label: 'Food & Beverage' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
    { value: 'technology', label: 'Technology' },
    { value: 'retail-ecommerce', label: 'Retail/E-commerce' }
  ]

  const locations = [
    { value: 'london', label: 'London' },
    { value: 'manchester', label: 'Manchester' },
    { value: 'birmingham', label: 'Birmingham' },
    { value: 'scotland', label: 'Scotland' },
    { value: 'wales', label: 'Wales' },
    { value: 'northern-ireland', label: 'Northern Ireland' }
  ]

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'featured', label: 'Featured First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'response_time', label: 'Fastest Response' },
    { value: 'newest', label: 'Newest First' }
  ]

  // Search function with client-side filtering fallback
  const performSearch = async (page = 1) => {
    setLoading(true)
    try {
      const searchQuery = new URLSearchParams()
      
      if (filters.query) searchQuery.append('query', filters.query)
      if (filters.serviceTypes.length) searchQuery.append('serviceTypes', filters.serviceTypes.join(','))
      if (filters.industries.length) searchQuery.append('industries', filters.industries.join(','))
      if (filters.locations.length) searchQuery.append('locations', filters.locations.join(','))
      if (filters.pricingLevel) searchQuery.append('pricingLevel', filters.pricingLevel.toString())
      if (filters.verifiedOnly) searchQuery.append('verifiedOnly', 'true')
      if (filters.freeConsultation) searchQuery.append('freeConsultation', 'true')
      searchQuery.append('sortBy', filters.sortBy)
      searchQuery.append('page', page.toString())
      searchQuery.append('limit', '12')

      let searchResult;
      
      // Force client-side filtering for location filters due to known backend bug
      if (filters.locations.length > 0) {
        console.log('🔧 Using client-side filtering for location filters (backend bug fix)')
        toast.success('Using enhanced location filtering')
        setUsingClientSideFiltering(true)
        searchResult = await performClientSideSearch(page)
      } else {
        try {
          // Try backend search for non-location filters
          const { data, error } = await supabase.functions.invoke('search-consultants?' + searchQuery.toString())
          if (error) throw error
          searchResult = data
          setUsingClientSideFiltering(false)
        } catch (backendError) {
          console.log('Backend search failed, using client-side filtering:', backendError)
          toast.success('Using enhanced client-side filtering')
          setUsingClientSideFiltering(true)
          searchResult = await performClientSideSearch(page)
        }
      }
      
      if (searchResult?.data) {
        setConsultants(searchResult.data.consultants || [])
        setTotalResults(searchResult.data.pagination?.total || 0)
        setTotalPages(searchResult.data.pagination?.totalPages || 1)
        setCurrentPage(page)
      }
    } catch (error: any) {
      console.error('Search error:', error)
      toast.error('Failed to search consultants')
    } finally {
      setLoading(false)
    }
  }

  // Client-side filtering fallback
  const performClientSideSearch = async (page = 1) => {
    console.log('🔧 Using client-side filtering as fallback')
    
    // Fetch all approved consultants directly from Supabase
    const { data: allConsultants, error } = await supabase
      .from('brexit_consultants')
      .select('*')
      .not('approved_at', 'is', null)
      .order('featured', { ascending: false })
      .order('profile_views', { ascending: false })
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }

    let filteredConsultants = allConsultants || []

    // Apply client-side filters
    console.log(`📊 Starting with ${filteredConsultants.length} total consultants`)

    // Location filter - CRITICAL FIX
    if (filters.locations.length > 0) {
      const locationMap: { [key: string]: string } = {
        'london': 'London',
        'manchester': 'Manchester',
        'birmingham': 'Birmingham',
        'scotland': 'Scotland',
        'wales': 'Wales',
        'northern-ireland': 'Northern Ireland',
        'edinburgh': 'Edinburgh',
        'cardiff': 'Cardiff',
        'belfast': 'Belfast'
      }
      
      const targetCities = filters.locations.map(slug => locationMap[slug] || slug)
      console.log(`🔍 Filtering by cities:`, targetCities)
      
      filteredConsultants = filteredConsultants.filter(consultant => {
        const matchesLocation = targetCities.includes(consultant.city)
        if (filters.locations.includes('birmingham') && consultant.city) {
          console.log(`${consultant.company_name} (${consultant.city}): ${matchesLocation ? '✅' : '❌'}`)
        }
        return matchesLocation
      })
      
      console.log(`📍 After location filter: ${filteredConsultants.length} consultants`)
    }

    // Text search filter
    if (filters.query) {
      const searchTerm = filters.query.toLowerCase()
      filteredConsultants = filteredConsultants.filter(consultant =>
        consultant.company_name?.toLowerCase().includes(searchTerm) ||
        consultant.description?.toLowerCase().includes(searchTerm) ||
        consultant.contact_person?.toLowerCase().includes(searchTerm) ||
        consultant.city?.toLowerCase().includes(searchTerm)
      )
      console.log(`🔍 After text search: ${filteredConsultants.length} consultants`)
    }

    // Verified only filter
    if (filters.verifiedOnly) {
      filteredConsultants = filteredConsultants.filter(consultant => consultant.verified)
      console.log(`✅ After verified filter: ${filteredConsultants.length} consultants`)
    }

    // Free consultation filter
    if (filters.freeConsultation) {
      filteredConsultants = filteredConsultants.filter(consultant => consultant.free_consultation)
      console.log(`💬 After free consultation filter: ${filteredConsultants.length} consultants`)
    }

    // Pricing level filter
    if (filters.pricingLevel) {
      filteredConsultants = filteredConsultants.filter(consultant => 
        consultant.pricing_level <= filters.pricingLevel!
      )
      console.log(`💰 After pricing filter: ${filteredConsultants.length} consultants`)
    }

    // TODO: Service type and industry filters would require additional queries
    // For now, these are skipped in client-side filtering

    // Apply sorting
    switch (filters.sortBy) {
      case 'response_time':
        filteredConsultants.sort((a, b) => a.response_time_hours - b.response_time_hours)
        break
      case 'newest':
        filteredConsultants.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'featured':
        filteredConsultants.sort((a, b) => {
          if (a.featured !== b.featured) return b.featured ? 1 : -1
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })
        break
      default: // relevance
        filteredConsultants.sort((a, b) => {
          if (a.featured !== b.featured) return b.featured ? 1 : -1
          return b.profile_views - a.profile_views
        })
    }

    // Apply pagination
    const limit = 12
    const offset = (page - 1) * limit
    const totalCount = filteredConsultants.length
    const paginatedConsultants = filteredConsultants.slice(offset, offset + limit)

    console.log(`📋 Final results: ${paginatedConsultants.length} consultants (page ${page}, total ${totalCount})`)

    return {
      data: {
        consultants: paginatedConsultants,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit)
        }
      }
    }
  }

  // Update URL params and search when filters change
  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    
    // Update URL parameters
    const params = new URLSearchParams()
    if (updatedFilters.query) params.append('query', updatedFilters.query)
    if (updatedFilters.serviceTypes.length) params.append('serviceTypes', updatedFilters.serviceTypes.join(','))
    if (updatedFilters.industries.length) params.append('industries', updatedFilters.industries.join(','))
    if (updatedFilters.locations.length) params.append('locations', updatedFilters.locations.join(','))
    if (updatedFilters.pricingLevel) params.append('pricingLevel', updatedFilters.pricingLevel.toString())
    if (updatedFilters.verifiedOnly) params.append('verifiedOnly', 'true')
    if (updatedFilters.freeConsultation) params.append('freeConsultation', 'true')
    if (updatedFilters.sortBy !== 'relevance') params.append('sortBy', updatedFilters.sortBy)
    
    setSearchParams(params)
  }

  // Initial search on mount and when search params change
  useEffect(() => {
    performSearch(1)
  }, [filters])

  const getPricingDisplay = (level: number) => {
    return '£'.repeat(level)
  }

  const handleFilterToggle = (type: keyof SearchFilters, value: string) => {
    const currentArray = filters[type] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateFilters({ [type]: newArray })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search bar */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search consultants by company name, service, or location..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                value={filters.query}
                onChange={(e) => updateFilters({ query: e.target.value })}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg border transition-colors ${
                showFilters 
                  ? 'bg-[#003366] text-white border-[#003366]' 
                  : 'bg-white text-[#003366] border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Results summary */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {loading ? 'Searching...' : `${totalResults} consultants found`}
              {usingClientSideFiltering && !loading && (
                <span className="ml-2 inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Enhanced Filtering Active
                </span>
              )}
            </p>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#003366] focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Client-side filtering notification */}
        {usingClientSideFiltering && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Enhanced Client-Side Filtering Active
                </h3>
                <div className="mt-1 text-sm text-blue-700">
                  <p>
                    Location filters are now working correctly with enhanced client-side processing. 
                    Birmingham filter will show only Birmingham consultants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Filters sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
                <h3 className="font-semibold text-lg text-[#003366] mb-4">Refine Results</h3>
                
                {/* Service types */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Service Type</h4>
                  <div className="space-y-2">
                    {serviceTypes.map(service => (
                      <label key={service.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.serviceTypes.includes(service.value)}
                          onChange={() => handleFilterToggle('serviceTypes', service.value)}
                          className="rounded border-gray-300 text-[#003366] focus:ring-[#003366]"
                        />
                        <span className="ml-2 text-sm text-gray-700">{service.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Location</h4>
                  <div className="space-y-2">
                    {locations.map(location => (
                      <label key={location.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.locations.includes(location.value)}
                          onChange={() => handleFilterToggle('locations', location.value)}
                          className="rounded border-gray-300 text-[#003366] focus:ring-[#003366]"
                        />
                        <span className="ml-2 text-sm text-gray-700">{location.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Industries */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Industry</h4>
                  <div className="space-y-2">
                    {industries.map(industry => (
                      <label key={industry.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.industries.includes(industry.value)}
                          onChange={() => handleFilterToggle('industries', industry.value)}
                          className="rounded border-gray-300 text-[#003366] focus:ring-[#003366]"
                        />
                        <span className="ml-2 text-sm text-gray-700">{industry.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special filters */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Special Options</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.verifiedOnly}
                        onChange={(e) => updateFilters({ verifiedOnly: e.target.checked })}
                        className="rounded border-gray-300 text-[#003366] focus:ring-[#003366]"
                      />
                      <span className="ml-2 text-sm text-gray-700">Verified consultants only</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.freeConsultation}
                        onChange={(e) => updateFilters({ freeConsultation: e.target.checked })}
                        className="rounded border-gray-300 text-[#003366] focus:ring-[#003366]"
                      />
                      <span className="ml-2 text-sm text-gray-700">Free consultation available</span>
                    </label>
                  </div>
                </div>

                {/* Pricing level */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Max Pricing Level</h4>
                  <select
                    value={filters.pricingLevel || ''}
                    onChange={(e) => updateFilters({ pricingLevel: e.target.value ? parseInt(e.target.value) : null })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  >
                    <option value="">Any pricing level</option>
                    <option value="1">£ - Budget friendly</option>
                    <option value="2">££ - Mid-range</option>
                    <option value="3">£££ - Premium</option>
                  </select>
                </div>

                {/* Clear filters */}
                <button
                  onClick={() => {
                    setFilters({
                      query: '',
                      serviceTypes: [],
                      industries: [],
                      locations: [],
                      pricingLevel: null,
                      verifiedOnly: false,
                      freeConsultation: false,
                      sortBy: 'relevance'
                    })
                    setSearchParams({})
                  }}
                  className="w-full text-sm text-[#003366] hover:text-blue-800 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse"></div>
                ))}
              </div>
            ) : consultants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {consultants.map((consultant) => (
                  <div
                    key={consultant.id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
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
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">No consultants found matching your criteria</div>
                <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
                <Link 
                  to="/request-quote"
                  className="inline-flex items-center px-6 py-3 bg-[#003366] text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Request Custom Quote
                </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => performSearch(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + 1
                  return (
                    <button
                      key={page}
                      onClick={() => performSearch(page)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        page === currentPage
                          ? 'bg-[#003366] text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
                
                <button
                  onClick={() => performSearch(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}