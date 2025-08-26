import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Shield, AlertTriangle } from 'lucide-react'

export function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-[#003366]" />
            </div>
            <h1 className="text-4xl font-bold text-[#003366] mb-4">
              Terms of Service
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
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <div className="flex">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1 mr-3" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Legal Terms Coming Soon
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    We're preparing comprehensive terms of service for our platform. 
                    For any questions about usage terms, please contact us directly.
                  </p>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-[#003366] mb-6">Overview</h2>
            <p className="text-gray-700 mb-6">
              FindBrexitConsultants.co.uk is a directory platform connecting UK businesses with Brexit compliance consultants. 
              Our detailed terms of service will cover:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Platform usage rights and restrictions</li>
              <li>Consultant listing terms and conditions</li>
              <li>Business user responsibilities</li>
              <li>Payment terms and refund policies</li>
              <li>Data protection and privacy measures</li>
              <li>Dispute resolution procedures</li>
              <li>Limitation of liability</li>
            </ul>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-[#003366] mb-3">In the Meantime</h3>
              <p className="text-gray-600 text-sm mb-4">
                By using our platform, you agree to use it responsibly and in accordance with UK law. 
                We are committed to providing a safe, trusted environment for connecting businesses with consultants.
              </p>
              <p className="text-gray-600 text-sm">
                For any questions about platform usage, data handling, or our policies, please contact our team.
              </p>
            </div>
            
            <div className="text-center">
              <Link
                to="/contact"
                className="bg-[#003366] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Contact Us for Legal Questions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}