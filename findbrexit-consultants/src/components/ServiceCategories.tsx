import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Calculator, MapPin, Shield, ClipboardList, Truck } from 'lucide-react'

const serviceCategories = [
  {
    name: 'Customs Declarations',
    slug: 'customs-declarations',
    description: 'Expert guidance on customs documentation and procedures',
    icon: FileText,
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
  },
  {
    name: 'VAT/Tax Compliance',
    slug: 'vat-tax-compliance',
    description: 'VAT registration, tax compliance, and reporting services',
    icon: Calculator,
    color: 'bg-green-50 border-green-200 hover:bg-green-100'
  },
  {
    name: 'Northern Ireland Protocol',
    slug: 'northern-ireland-protocol',
    description: 'Specialized advice on NI Protocol requirements',
    icon: MapPin,
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
  },
  {
    name: 'Regulatory Compliance',
    slug: 'regulatory-compliance',
    description: 'Ensure compliance with new regulatory frameworks',
    icon: Shield,
    color: 'bg-red-50 border-red-200 hover:bg-red-100'
  },
  {
    name: 'Import/Export Documentation',
    slug: 'import-export-documentation',
    description: 'Comprehensive documentation services for trade',
    icon: ClipboardList,
    color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
  },
  {
    name: 'Supply Chain Consulting',
    slug: 'supply-chain-consulting',
    description: 'Strategic supply chain optimization services',
    icon: Truck,
    color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
  }
]

export function ServiceCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
            Brexit Compliance Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find specialized consultants for every aspect of post-Brexit compliance. 
            Our verified experts cover all major service categories.
          </p>
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {serviceCategories.map((service) => {
            const IconComponent = service.icon
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 ${service.color}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <IconComponent className="w-6 h-6 text-[#003366]" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-[#003366] mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                {/* Service stats */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>50+ consultants</span>
                    <span className="text-[#003366] font-medium">View all →</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <Link
            to="/find-consultants"
            className="inline-flex items-center px-8 py-4 bg-[#003366] text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
          >
            Browse All Consultants
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}