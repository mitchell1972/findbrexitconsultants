import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Briefcase } from 'lucide-react'

export function IndustryPage() {
  const { slug } = useParams<{ slug: string }>()
  
  const industries: Record<string, any> = {
    'food-beverage': { name: 'Food & Beverage', description: 'Specialized Brexit compliance for food and beverage import/export' },
    'manufacturing': { name: 'Manufacturing', description: 'Manufacturing sector Brexit compliance and trade facilitation' },
    'automotive': { name: 'Automotive', description: 'Automotive industry specific Brexit regulations and compliance' },
    'pharmaceuticals': { name: 'Pharmaceuticals', description: 'Pharmaceutical and healthcare product compliance and regulations' },
    'technology': { name: 'Technology', description: 'Technology sector Brexit compliance and international trade' },
    'retail-ecommerce': { name: 'Retail/E-commerce', description: 'Retail and e-commerce Brexit compliance and cross-border trade' }
  }
  
  const industry = industries[slug!] || { name: slug?.replace('-', ' '), description: 'Industry-specific Brexit compliance expertise' }
  
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
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-[#003366]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#003366] mb-2">{industry.name} Brexit Consultants</h1>
              <p className="text-xl text-gray-600">{industry.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-[#003366] mb-4">Industry Page Coming Soon</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're building dedicated industry pages with specialized consultants, 
            industry-specific guidance, and sector expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to={`/find-consultants?industry=${slug}`}
              className="bg-[#003366] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Find {industry.name} Consultants
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