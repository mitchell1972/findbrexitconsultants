import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, FileText, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react'

export function BrexitGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#003366] mb-6">
              Complete Brexit Compliance Guide
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your comprehensive resource for understanding and navigating post-Brexit trade regulations
            </p>
            
            <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Last updated: August 2025
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Guide content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-[#003366]" />
            </div>
            
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Comprehensive Guide In Development</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're creating the most comprehensive Brexit compliance guide for UK businesses. 
              This resource will cover everything from customs procedures to regulatory requirements.
            </p>
            
            {/* Preview of coming sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-[#003366] mb-2">Chapter 1: Customs Declarations</h3>
                <p className="text-sm text-gray-600">Step-by-step guide to UK customs procedures</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-[#003366] mb-2">Chapter 2: VAT & Tax Changes</h3>
                <p className="text-sm text-gray-600">Understanding new VAT rules and obligations</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-[#003366] mb-2">Chapter 3: Northern Ireland Protocol</h3>
                <p className="text-sm text-gray-600">Special rules for NI businesses and trade</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibred text-[#003366] mb-2">Chapter 4: Regulatory Compliance</h3>
                <p className="text-sm text-gray-600">Product standards and certification requirements</p>
              </div>
            </div>
          </div>
          
          {/* Temporary resources */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-[#003366] mb-4">Useful Resources While We Prepare</h3>
            <div className="space-y-3">
              <a href="https://www.gov.uk/brexit" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <ExternalLink className="w-5 h-5 text-[#003366]" />
                <div>
                  <div className="font-medium text-gray-900">Government Brexit Guidance</div>
                  <div className="text-sm text-gray-600">Official UK government Brexit information</div>
                </div>
              </a>
              <a href="https://www.gov.uk/guidance/customs-procedures-if-the-uk-leaves-the-eu-without-a-deal" target="_blank" rel="noopener noreferrer"
                 className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <ExternalLink className="w-5 h-5 text-[#003366]" />
                <div>
                  <div className="font-medium text-gray-900">HMRC Customs Guidance</div>
                  <div className="text-sm text-gray-600">Detailed customs procedures and requirements</div>
                </div>
              </a>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/find-consultants"
                className="bg-[#003366] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Find Brexit Consultants Now
              </Link>
              <Link
                to="/contact"
                className="border-2 border-[#003366] text-[#003366] px-8 py-4 rounded-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors"
              >
                Request Guide Notification
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}