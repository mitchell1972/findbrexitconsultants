import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, FileText, Calculator, MapPin, Shield, ClipboardList, Truck } from 'lucide-react'

export function ServiceCategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  
  const services: Record<string, any> = {
    'customs-declarations': {
      name: 'Customs Declarations',
      icon: FileText,
      description: 'Expert guidance on customs documentation and procedures for import/export compliance',
      color: 'bg-blue-50 border-blue-200'
    },
    'vat-tax-compliance': {
      name: 'VAT/Tax Compliance', 
      icon: Calculator,
      description: 'VAT registration, tax compliance, and reporting services for post-Brexit trade',
      color: 'bg-green-50 border-green-200'
    },
    'northern-ireland-protocol': {
      name: 'Northern Ireland Protocol',
      icon: MapPin, 
      description: 'Specialized advice on Northern Ireland Protocol requirements and compliance',
      color: 'bg-purple-50 border-purple-200'
    },
    'regulatory-compliance': {
      name: 'Regulatory Compliance',
      icon: Shield,
      description: 'Ensure compliance with new regulatory frameworks and standards', 
      color: 'bg-red-50 border-red-200'
    },
    'import-export-documentation': {
      name: 'Import/Export Documentation',
      icon: ClipboardList,
      description: 'Comprehensive documentation services for international trade',
      color: 'bg-yellow-50 border-yellow-200'
    },
    'supply-chain-consulting': {
      name: 'Supply Chain Consulting',
      icon: Truck,
      description: 'Strategic supply chain optimization and Brexit adaptation services',
      color: 'bg-indigo-50 border-indigo-200'
    }
  }
  
  const service = services[slug!] || services['customs-declarations']
  const IconComponent = service.icon
  
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
            <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center ${service.color}`}>
              <IconComponent className="w-8 h-8 text-[#003366]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#003366] mb-2">{service.name} Consultants</h1>
              <p className="text-xl text-gray-600">{service.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-[#003366] mb-4">Service Category Page Coming Soon</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're building dedicated pages for each service category with specialized consultants, 
            detailed service information, and industry-specific guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to={`/find-consultants?service=${slug}`}
              className="bg-[#003366] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Find {service.name} Consultants
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