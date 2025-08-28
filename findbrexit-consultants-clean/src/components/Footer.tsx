import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const serviceCategories = [
    { name: 'Customs Declarations', slug: 'customs-declarations' },
    { name: 'VAT/Tax Compliance', slug: 'vat-tax-compliance' },
    { name: 'Northern Ireland Protocol', slug: 'northern-ireland-protocol' },
    { name: 'Regulatory Compliance', slug: 'regulatory-compliance' },
    { name: 'Import/Export Documentation', slug: 'import-export-documentation' },
    { name: 'Supply Chain Consulting', slug: 'supply-chain-consulting' }
  ]

  const locations = [
    { name: 'Brexit Consultants in London', slug: 'london' },
    { name: 'Brexit Consultants in Manchester', slug: 'manchester' },
    { name: 'Brexit Consultants in Birmingham', slug: 'birmingham' },
    { name: 'Brexit Consultants in Scotland', slug: 'scotland' },
    { name: 'Brexit Consultants in Wales', slug: 'wales' },
    { name: 'Brexit Consultants in Northern Ireland', slug: 'northern-ireland' }
  ]

  const industries = [
    { name: 'Food & Beverage', slug: 'food-beverage' },
    { name: 'Manufacturing', slug: 'manufacturing' },
    { name: 'Automotive', slug: 'automotive' },
    { name: 'Pharmaceuticals', slug: 'pharmaceuticals' },
    { name: 'Technology', slug: 'technology' },
    { name: 'Retail/E-commerce', slug: 'retail-ecommerce' }
  ]

  return (
    <footer className="bg-[#003366] text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#FFD700] rounded flex items-center justify-center">
                <span className="text-[#003366] font-bold text-sm">FB</span>
              </div>
              <span className="font-bold text-lg">FindBrexitConsultants</span>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              The UK's leading directory for Brexit compliance consultants. 
              Connect with verified experts to navigate post-Brexit regulations with confidence.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#FFD700]" />
                <span className="text-sm">info@findbrexitconsultants.co.uk</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#FFD700]" />
                <span className="text-sm">London, United Kingdom</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-4 mt-6">
              <a href="#" className="text-blue-100 hover:text-[#FFD700] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-[#FFD700] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-[#FFD700] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#FFD700]">Services</h4>
            <ul className="space-y-2">
              {serviceCategories.map((service) => (
                <li key={service.slug}>
                  <Link 
                    to={`/services/${service.slug}`}
                    className="text-blue-100 hover:text-white text-sm transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#FFD700]">Locations</h4>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location.slug}>
                  <Link 
                    to={`/location/${location.slug}`}
                    className="text-blue-100 hover:text-white text-sm transition-colors"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#FFD700]">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-blue-100 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-blue-100 hover:text-white text-sm transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/brexit-guide" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Brexit Compliance Guide
                </Link>
              </li>
              <li>
                <Link to="/list-business" className="text-blue-100 hover:text-white text-sm transition-colors">
                  List Your Business
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Industries */}
            <h4 className="font-semibold text-lg mb-4 mt-8 text-[#FFD700]">Industries</h4>
            <ul className="space-y-2">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link 
                    to={`/industry/${industry.slug}`}
                    className="text-blue-100 hover:text-white text-sm transition-colors"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-blue-100">
              © {currentYear} FindBrexitConsultants.co.uk. All rights reserved.
            </div>
            
            {/* Legal links */}
            <div className="flex items-center space-x-6">
              <Link to="/terms" className="text-sm text-blue-100 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-blue-100 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-sm text-blue-100 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}