import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, CheckCircle, User, Briefcase, MessageSquare, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface QuoteFormData {
  // Step 1: Personal Information
  requesterName: string
  requesterEmail: string
  requesterPhone: string
  companyName: string
  companySize: string
  
  // Step 2: Project Details
  industry: string
  projectDescription: string
  serviceTypes: string[]
  budgetRange: string
  timeline: string
  
  // Step 3: Preferences
  locationPreference: string
  preferredContact: string
}

const initialFormData: QuoteFormData = {
  requesterName: '',
  requesterEmail: '',
  requesterPhone: '',
  companyName: '',
  companySize: '',
  industry: '',
  projectDescription: '',
  serviceTypes: [],
  budgetRange: '',
  timeline: '',
  locationPreference: '',
  preferredContact: 'email'
}

const companySizes = [
  { value: 'small', label: 'Small Business (<£2M revenue)' },
  { value: 'sme', label: 'SME (£2M-£10M revenue)' },
  { value: 'mid-market', label: 'Mid-Market (£10M-£50M revenue)' },
  { value: 'enterprise', label: 'Enterprise (£50M+ revenue)' }
]

const industries = [
  { value: 'food-beverage', label: 'Food & Beverage' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
  { value: 'technology', label: 'Technology' },
  { value: 'retail-ecommerce', label: 'Retail/E-commerce' },
  { value: 'other', label: 'Other' }
]

const serviceTypes = [
  { value: 'customs-declarations', label: 'Customs Declarations' },
  { value: 'vat-tax-compliance', label: 'VAT/Tax Compliance' },
  { value: 'northern-ireland-protocol', label: 'Northern Ireland Protocol' },
  { value: 'regulatory-compliance', label: 'Regulatory Compliance' },
  { value: 'import-export-documentation', label: 'Import/Export Documentation' },
  { value: 'supply-chain-consulting', label: 'Supply Chain Consulting' }
]

const budgetRanges = [
  { value: 'under-5k', label: 'Under £5,000' },
  { value: '5k-15k', label: '£5,000 - £15,000' },
  { value: '15k-50k', label: '£15,000 - £50,000' },
  { value: '50k-plus', label: '£50,000+' },
  { value: 'discuss', label: 'Prefer to discuss' }
]

const timelines = [
  { value: 'urgent', label: 'Urgent (Within 2 weeks)' },
  { value: '1-month', label: '1 month' },
  { value: '2-3-months', label: '2-3 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: 'flexible', label: 'Flexible timing' }
]

const locations = [
  { value: 'london', label: 'London' },
  { value: 'manchester', label: 'Manchester' },
  { value: 'birmingham', label: 'Birmingham' },
  { value: 'scotland', label: 'Scotland' },
  { value: 'wales', label: 'Wales' },
  { value: 'northern-ireland', label: 'Northern Ireland' },
  { value: 'remote', label: 'Remote/Virtual meetings' },
  { value: 'no-preference', label: 'No preference' }
]

export function RequestQuotePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const totalSteps = 3

  // Pre-fill consultant if coming from consultant profile
  useEffect(() => {
    const consultantId = searchParams.get('consultant')
    if (consultantId) {
      // Could pre-select location or other preferences based on consultant
    }
  }, [searchParams])

  const updateFormData = (field: keyof QuoteFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleServiceType = (serviceType: string) => {
    const current = formData.serviceTypes
    const updated = current.includes(serviceType)
      ? current.filter(s => s !== serviceType)
      : [...current, serviceType]
    updateFormData('serviceTypes', updated)
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.requesterName && formData.requesterEmail && formData.companyName)
      case 2:
        return !!(formData.projectDescription && formData.serviceTypes.length > 0)
      case 3:
        return true // All fields in step 3 are optional
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const submitQuoteRequest = async () => {
    if (!validateStep(1) || !validateStep(2)) {
      toast.error('Please complete all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      const { data, error } = await supabase.functions.invoke('submit-quote-request', {
        body: {
          requesterName: formData.requesterName,
          requesterEmail: formData.requesterEmail,
          requesterPhone: formData.requesterPhone || null,
          companyName: formData.companyName,
          companySize: formData.companySize || null,
          industry: formData.industry || null,
          projectDescription: formData.projectDescription,
          budgetRange: formData.budgetRange || null,
          timeline: formData.timeline || null,
          preferredContact: formData.preferredContact,
          serviceTypes: formData.serviceTypes,
          locationPreference: formData.locationPreference || null
        }
      })

      if (error) throw error

      if (data?.data) {
        setIsSubmitted(true)
        toast.success('Quote request submitted successfully!')
      }
    } catch (error: any) {
      console.error('Quote request submission error:', error)
      toast.error(error.message || 'Failed to submit quote request')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-sm p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#003366] mb-4">Quote Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your quote request. We've sent your requirements to relevant Brexit compliance consultants 
            who will contact you within 24-48 hours.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/find-consultants')}
              className="w-full bg-[#003366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Browse Consultants
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full border-2 border-[#003366] text-[#003366] px-6 py-3 rounded-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#003366] mb-4">Request a Quote</h1>
            <p className="text-xl text-gray-600 mb-8">
              Get matched with verified Brexit compliance consultants for your project
            </p>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                    step < currentStep
                      ? 'bg-green-600 text-white'
                      : step === currentStep
                      ? 'bg-[#003366] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-8 mt-4 text-sm">
              <span className={currentStep === 1 ? 'text-[#003366] font-semibold' : 'text-gray-500'}>
                Personal Info
              </span>
              <span className={currentStep === 2 ? 'text-[#003366] font-semibold' : 'text-gray-500'}>
                Project Details
              </span>
              <span className={currentStep === 3 ? 'text-[#003366] font-semibold' : 'text-gray-500'}>
                Preferences
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-6 h-6 text-[#003366]" />
                <h2 className="text-xl font-semibold text-[#003366]">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    value={formData.requesterName}
                    onChange={(e) => updateFormData('requesterName', e.target.value)}
                    placeholder="John Smith"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    value={formData.requesterEmail}
                    onChange={(e) => updateFormData('requesterEmail', e.target.value)}
                    placeholder="john@company.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    value={formData.requesterPhone}
                    onChange={(e) => updateFormData('requesterPhone', e.target.value)}
                    placeholder="+44 20 7946 0958"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    placeholder="Your Company Ltd"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Size
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  value={formData.companySize}
                  onChange={(e) => updateFormData('companySize', e.target.value)}
                >
                  <option value="">Select company size</option>
                  {companySizes.map(size => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Briefcase className="w-6 h-6 text-[#003366]" />
                <h2 className="text-xl font-semibold text-[#003366]">Project Details</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  value={formData.industry}
                  onChange={(e) => updateFormData('industry', e.target.value)}
                >
                  <option value="">Select your industry</option>
                  {industries.map(industry => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services Required *
                </label>
                <p className="text-sm text-gray-500 mb-3">Select all services you need help with</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {serviceTypes.map(service => (
                    <label key={service.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.serviceTypes.includes(service.value)}
                        onChange={() => toggleServiceType(service.value)}
                        className="rounded border-gray-300 text-[#003366] focus:ring-[#003366]"
                      />
                      <span className="text-sm">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  value={formData.projectDescription}
                  onChange={(e) => updateFormData('projectDescription', e.target.value)}
                  placeholder="Describe your Brexit compliance needs, current challenges, and what outcomes you're looking to achieve..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    value={formData.budgetRange}
                    onChange={(e) => updateFormData('budgetRange', e.target.value)}
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map(budget => (
                      <option key={budget.value} value={budget.value}>
                        {budget.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    value={formData.timeline}
                    onChange={(e) => updateFormData('timeline', e.target.value)}
                  >
                    <option value="">Select timeline</option>
                    {timelines.map(timeline => (
                      <option key={timeline.value} value={timeline.value}>
                        {timeline.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="w-6 h-6 text-[#003366]" />
                <h2 className="text-xl font-semibold text-[#003366]">Preferences</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location Preference
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  value={formData.locationPreference}
                  onChange={(e) => updateFormData('locationPreference', e.target.value)}
                >
                  <option value="">Any location</option>
                  {locations.map(location => (
                    <option key={location.value} value={location.value}>
                      {location.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'email', label: 'Email' },
                    { value: 'phone', label: 'Phone' },
                    { value: 'either', label: 'Either' }
                  ].map(method => (
                    <label key={method.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method.value}
                        checked={formData.preferredContact === method.value}
                        onChange={(e) => updateFormData('preferredContact', e.target.value)}
                        className="text-[#003366] focus:ring-[#003366]"
                      />
                      <span className="text-sm">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• We'll match you with 3-5 relevant consultants</li>
                  <li>• Consultants will contact you within 24-48 hours</li>
                  <li>• You'll receive personalized quotes and proposals</li>
                  <li>• Choose the best consultant for your needs</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                className="flex items-center space-x-2 px-6 py-3 bg-[#003366] text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={submitQuoteRequest}
                disabled={isSubmitting || !validateStep(1) || !validateStep(2)}
                className="flex items-center space-x-2 px-6 py-3 bg-[#003366] text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Request</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}