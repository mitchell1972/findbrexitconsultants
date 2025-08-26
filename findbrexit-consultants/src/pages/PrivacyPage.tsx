import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Lock, Eye } from 'lucide-react'

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-[#004225]" />
            </div>
            <h1 className="text-4xl font-bold text-[#003366] mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: August 26, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
              <div className="flex">
                <Lock className="w-5 h-5 text-green-400 mt-1 mr-3" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Privacy Policy Coming Soon
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    We're preparing a comprehensive privacy policy that meets GDPR and UK data protection standards.
                  </p>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-[#003366] mb-6">Our Commitment to Privacy</h2>
            <p className="text-gray-700 mb-6">
              At FindBrexitConsultants.co.uk, we take your privacy seriously. We are committed to protecting 
              your personal information and being transparent about how we collect, use, and share your data.
            </p>
            
            <h3 className="text-xl font-semibold text-[#003366] mb-4">What Our Privacy Policy Will Cover</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>What personal information we collect and why</li>
              <li>How we use your information to provide our services</li>
              <li>When and how we share information with third parties</li>
              <li>How we protect your personal data</li>
              <li>Your rights regarding your personal information</li>
              <li>How to contact us about privacy concerns</li>
              <li>Cookie usage and tracking technologies</li>
              <li>Data retention and deletion policies</li>
            </ul>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Shield className="w-8 h-8 text-[#003366] mx-auto mb-3" />
                <h4 className="font-semibold text-[#003366] mb-2">GDPR Compliant</h4>
                <p className="text-sm text-gray-600">Full compliance with EU and UK data protection laws</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Lock className="w-8 h-8 text-[#004225] mx-auto mb-3" />
                <h4 className="font-semibold text-[#004225] mb-2">Secure Storage</h4>
                <p className="text-sm text-gray-600">Industry-standard encryption and security measures</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Eye className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold text-purple-600 mb-2">Transparency</h4>
                <p className="text-sm text-gray-600">Clear information about data collection and usage</p>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-[#003366] mb-3">Current Data Practices</h3>
              <p className="text-gray-600 text-sm mb-4">
                We currently collect only essential information needed to operate our directory service. 
                This includes basic contact information for consultants and businesses using our platform.
              </p>
              <p className="text-gray-600 text-sm">
                We do not sell personal data to third parties and only share information necessary to 
                facilitate connections between businesses and consultants.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/contact"
                  className="bg-[#003366] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
                  Privacy Questions?
                </Link>
                <Link
                  to="/"
                  className="border-2 border-[#003366] text-[#003366] px-8 py-3 rounded-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}