import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Building, Mail, Phone, Globe, MapPin, Users, Star, CheckCircle } from 'lucide-react'

export function ListBusinessPage() {
  const [searchParams] = useSearchParams()
  const selectedPlan = searchParams.get('plan') || 'professional'
  const [currentStep, setCurrentStep] = useState(1)
  
  const plans = {
    free: { name: 'Free Basic', price: '£0', color: 'border-gray-200' },
    professional: { name: 'Professional', price: '£99', color: 'border-[#003366]' },
    premium: { name: 'Premium Featured', price: '£299', color: 'border-[#FFD700]' }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#003366] mb-6">
              List Your Brexit Consulting Business
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join the UK's leading directory of Brexit compliance consultants and connect with new clients
            </p>
            
            {/* Selected plan indicator */}
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <Star className="w-5 h-5 text-[#003366]" />
              <span className="text-[#003366] font-medium">
                Selected Plan: {plans[selectedPlan as keyof typeof plans]?.name} - {plans[selectedPlan as keyof typeof plans]?.price}/month
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Coming soon content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Building className="w-8 h-8 text-[#003366]" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#003366] mb-4">Registration Form Coming Soon</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're putting the finishing touches on our consultant registration system. 
            In the meantime, you can contact us directly to get your business listed.
          </p>
          
          {/* Temporary contact info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <Mail className="w-5 h-5 text-[#003366]" />
              <span className="text-gray-700">hello@findbrexitconsultants.co.uk</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Phone className="w-5 h-5 text-[#003366]" />
              <span className="text-gray-700">+44 20 7946 0958</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="w-5 h-5 text-[#003366]" />
              <span className="text-gray-700">London, UK</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/contact"
              className="bg-[#003366] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Contact Us to List Your Business
            </Link>
            <Link
              to="/pricing"
              className="border-2 border-[#003366] text-[#003366] px-8 py-4 rounded-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors"
            >
              View Pricing Plans
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Registration system will be live soon. Thank you for your patience!
          </p>
        </div>
      </div>
    </div>
  )
}