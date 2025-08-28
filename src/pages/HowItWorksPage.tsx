import React from 'react'
import { Link } from 'react-router-dom'
import { Search, UserCheck, MessageSquare, CheckCircle, FileText, Users, TrendingUp, Shield } from 'lucide-react'

export function HowItWorksPage() {
  const businessSteps = [
    {
      icon: Search,
      title: 'Search & Filter',
      description: 'Use our advanced search to find Brexit consultants by service type, location, industry, and pricing level.',
      details: ['Filter by 6 service categories', 'Search by location or remote', 'Filter by industry expertise', 'Compare pricing levels']
    },
    {
      icon: UserCheck,
      title: 'Review Profiles',
      description: 'Browse detailed consultant profiles with verified credentials, client reviews, and case studies.',
      details: ['View years of experience', 'Read client testimonials', 'Check response time guarantees', 'See certification badges']
    },
    {
      icon: MessageSquare,
      title: 'Request Quotes',
      description: 'Submit your project requirements and get matched with 3-5 relevant consultants automatically.',
      details: ['Multi-step quote form', 'Automatic consultant matching', 'Direct contact information', '24-48 hour response guarantee']
    },
    {
      icon: CheckCircle,
      title: 'Choose & Start',
      description: 'Compare proposals, select the best consultant for your needs, and begin your Brexit compliance project.',
      details: ['Compare detailed proposals', 'Free consultations available', 'Secure payment options', 'Ongoing project support']
    }
  ]

  const consultantSteps = [
    {
      icon: FileText,
      title: 'Create Profile',
      description: 'Sign up and create a comprehensive profile showcasing your Brexit compliance expertise and experience.',
      details: ['Company information', 'Service specializations', 'Client testimonials', 'Case studies']
    },
    {
      icon: Shield,
      title: 'Get Verified',
      description: 'Our team reviews your credentials and approves qualified consultants for the directory.',
      details: ['Credential verification', 'Experience validation', 'Quality assurance review', '2-5 business day approval']
    },
    {
      icon: Users,
      title: 'Receive Leads',
      description: 'Get matched with relevant businesses looking for your specific Brexit compliance services.',
      details: ['Automatic lead matching', 'Detailed project briefs', 'Pre-qualified prospects', 'Direct contact details']
    },
    {
      icon: TrendingUp,
      title: 'Grow Business',
      description: 'Convert leads into clients, build your reputation, and grow your Brexit consulting practice.',
      details: ['Performance analytics', 'Client feedback system', 'Profile optimization tips', 'Business growth support']
    }
  ]

  const features = [
    {
      title: 'Verified Consultants',
      description: 'All consultants are manually reviewed and verified for credentials and experience',
      icon: Shield
    },
    {
      title: 'Smart Matching',
      description: 'Our algorithm matches businesses with consultants based on services, location, and industry',
      icon: Search
    },
    {
      title: 'Transparent Reviews',
      description: 'Real client reviews and ratings help businesses make informed decisions',
      icon: CheckCircle
    },
    {
      title: 'Response Guarantees',
      description: 'Consultants commit to response times, ensuring businesses get timely replies',
      icon: MessageSquare
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-6">
              How FindBrexitConsultants Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connecting UK businesses with verified Brexit compliance experts. 
              Simple, transparent, and effective for both businesses and consultants.
            </p>
          </div>
        </div>
      </div>

      {/* For Businesses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#003366] mb-4">For Businesses</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find and connect with the right Brexit compliance consultant in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {businessSteps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="relative">
                {/* Connection line */}
                {index < businessSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-200 z-0" />
                )}
                
                <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  {/* Step number */}
                  <div className="absolute -top-3 left-6 w-6 h-6 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-[#003366]" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-[#003366] mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  
                  <ul className="text-sm text-gray-500 space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/find-consultants"
            className="inline-flex items-center px-8 py-4 bg-[#003366] text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
          >
            Start Finding Consultants
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1" />
      </div>

      {/* For Consultants */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">For Consultants</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Build your practice and connect with new clients through our verified consultant directory
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {consultantSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="relative">
                  {/* Connection line */}
                  {index < consultantSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-200 z-0" />
                  )}
                  
                  <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    {/* Step number */}
                    <div className="absolute -top-3 left-6 w-6 h-6 bg-[#004225] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-[#004225]" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-semibold text-[#004225] mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    <ul className="text-sm text-gray-500 space-y-1">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/list-business"
              className="inline-flex items-center px-8 py-4 bg-[#004225] text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
            >
              List Your Business
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">Why Choose Our Platform</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've built the most trusted and effective platform for Brexit compliance connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white border-2 border-[#003366] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-[#003366]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#003366] mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#003366] mb-2">500+</div>
              <div className="text-gray-600">Verified Consultants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#003366] mb-2">1000+</div>
              <div className="text-gray-600">Businesses Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#003366] mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#003366] mb-2">24h</div>
              <div className="text-gray-600">Average Response Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#003366] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the UK's most trusted Brexit compliance directory today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/find-consultants"
              className="bg-white text-[#003366] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Find Consultants
            </Link>
            <Link
              to="/list-business"
              className="bg-[#FFD700] text-[#003366] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors"
            >
              List Your Business
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}