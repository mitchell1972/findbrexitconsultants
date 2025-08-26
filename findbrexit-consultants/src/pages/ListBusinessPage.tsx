import React, { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Building, Mail, Phone, Globe, MapPin, Users, Star, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

interface RegistrationForm {
  // Step 1: Basic Information
  company_name: string
  contact_person: string
  email: string
  phone: string
  website_url: string
  
  // Step 2: Location
  city: string
  postcode: string
  
  // Step 3: Business Details
  years_in_business: number
  team_size: string
  description: string
  
  // Step 4: Services & Pricing
  services: string[]
  industries: string[]
  pricing_level: number
  minimum_project_size: string
  typical_project_duration: string
  response_time_hours: number
  free_consultation: boolean
}

const initialForm: RegistrationForm = {
  company_name: '',
  contact_person: '',
  email: '',
  phone: '',
  website_url: '',
  city: '',
  postcode: '',
  years_in_business: 0,
  team_size: '',
  description: '',
  services: [],
  industries: [],
  pricing_level: 2,
  minimum_project_size: '',
  typical_project_duration: '',
  response_time_hours: 24,
  free_consultation: false
}

const serviceOptions = [
  'Customs Declarations',
  'VAT/Tax Compliance', 
  'Northern Ireland Protocol',
  'Regulatory Compliance',
  'Import/Export Documentation',
  'Supply Chain Consulting',
  'Trade Agreement Analysis',
  'Brexit Impact Assessment'
]

const industryOptions = [
  'Food & Beverage',
  'Manufacturing',
  'Automotive',
  'Pharmaceuticals',
  'Technology',
  'Retail/E-commerce',
  'Healthcare',
  'Financial Services'
]

export function ListBusinessPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const selectedPlan = searchParams.get('plan') || 'professional'
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<RegistrationForm>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const plans = {
    starter: { name: 'Starter', price: '£29', color: 'border-gray-200' },
    professional: { name: 'Professional', price: '£99', color: 'border-[#003366]' },
    enterprise: { name: 'Enterprise', price: '£249', color: 'border-[#FFD700]' }
  }

  const updateForm = (field: keyof RegistrationForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const toggleArrayField = (field: 'services' | 'industries', value: string) => {
    const currentArray = formData[field]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateForm(field, newArray)
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    switch (step) {
      case 1:
        if (!formData.company_name) newErrors.company_name = 'Company name is required'
        if (!formData.contact_person) newErrors.contact_person = 'Contact person is required'
        if (!formData.email) newErrors.email = 'Email is required'
        if (!formData.phone) newErrors.phone = 'Phone is required'
        break
      case 2:
        if (!formData.city) newErrors.city = 'City is required'
        break
      case 3:
        if (!formData.years_in_business) newErrors.years_in_business = 'Years in business is required'
        if (!formData.team_size) newErrors.team_size = 'Team size is required'
        if (!formData.description || formData.description.length < 50) {
          newErrors.description = 'Description must be at least 50 characters'
        }
        break
      case 4:
        if (formData.services.length === 0) newErrors.services = 'Select at least one service'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return
    
    if (!user) {
      toast.error('Please sign in to register your business')
      navigate('/signin')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Insert consultant data
      const { error } = await supabase
        .from('brexit_consultants')
        .insert({
          ...formData,
          user_id: user.id,
          verified: false,
          featured: false,
          profile_views: 0,
          created_at: new Date().toISOString()
        })
      
      if (error) throw error
      
      toast.success('Registration submitted successfully! We will review your application.')
      navigate('/dashboard')
      
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error('Failed to submit registration. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
              Join the UK's leading directory of Brexit compliance consultants
            </p>
            
            {/* Step indicator */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step 
                      ? 'bg-[#003366] text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step ? <CheckCircle className="w-4 h-4" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-0.5 ml-4 ${
                      currentStep > step ? 'bg-[#003366]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#003366] mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => updateForm('company_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="Brexit Compliance Ltd"
                  />
                  {errors.company_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    value={formData.contact_person}
                    onChange={(e) => updateForm('contact_person', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="John Smith"
                  />
                  {errors.contact_person && (
                    <p className="text-red-500 text-sm mt-1">{errors.contact_person}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="+44 20 7946 0958"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => updateForm('website_url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  placeholder="https://www.yourcompany.com"
                />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#003366] mb-6">Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateForm('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="London"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postcode
                  </label>
                  <input
                    type="text"
                    value={formData.postcode}
                    onChange={(e) => updateForm('postcode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="SW1A 1AA"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Business Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#003366] mb-6">Business Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years in Business *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.years_in_business}
                    onChange={(e) => updateForm('years_in_business', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="5"
                  />
                  {errors.years_in_business && (
                    <p className="text-red-500 text-sm mt-1">{errors.years_in_business}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Size *
                  </label>
                  <select
                    value={formData.team_size}
                    onChange={(e) => updateForm('team_size', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  >
                    <option value="">Select team size</option>
                    <option value="1">1 person</option>
                    <option value="2-5">2-5 people</option>
                    <option value="6-10">6-10 people</option>
                    <option value="11-25">11-25 people</option>
                    <option value="26+">26+ people</option>
                  </select>
                  {errors.team_size && (
                    <p className="text-red-500 text-sm mt-1">{errors.team_size}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Description * (minimum 50 characters)
                </label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) => updateForm('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  placeholder="Describe your company, expertise, and what makes you unique..."
                />
                <div className="flex justify-between text-sm mt-1">
                  <span className={formData.description.length < 50 ? 'text-red-500' : 'text-green-500'}>
                    {formData.description.length}/50 characters minimum
                  </span>
                </div>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Services & Pricing */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#003366] mb-6">Services & Pricing</h2>
              
              {/* Services */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Services Offered * (select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {serviceOptions.map((service) => (
                    <label key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => toggleArrayField('services', service)}
                        className="rounded border-gray-300 text-[#003366] focus:ring-[#003366]"
                      />
                      <span className="ml-2 text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
                {errors.services && (
                  <p className="text-red-500 text-sm mt-1">{errors.services}</p>
                )}
              </div>
              
              {/* Industries */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Industries Served (select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {industryOptions.map((industry) => (
                    <label key={industry} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.industries.includes(industry)}
                        onChange={() => toggleArrayField('industries', industry)}
                        className="rounded border-gray-300 text-[#003366] focus:ring-[#003366]"
                      />
                      <span className="ml-2 text-sm text-gray-700">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Pricing and other details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pricing Level
                  </label>
                  <select
                    value={formData.pricing_level}
                    onChange={(e) => updateForm('pricing_level', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  >
                    <option value={1}>£ - Budget friendly</option>
                    <option value={2}>££ - Mid-range</option>
                    <option value={3}>£££ - Premium</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Response Time (hours)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="168"
                    value={formData.response_time_hours}
                    onChange={(e) => updateForm('response_time_hours', parseInt(e.target.value) || 24)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Project Size
                  </label>
                  <input
                    type="text"
                    value={formData.minimum_project_size}
                    onChange={(e) => updateForm('minimum_project_size', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="£5,000 or No minimum"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Typical Project Duration
                  </label>
                  <input
                    type="text"
                    value={formData.typical_project_duration}
                    onChange={(e) => updateForm('typical_project_duration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="2-4 weeks or Varies"
                  />
                </div>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.free_consultation}
                    onChange={(e) => updateForm('free_consultation', e.target.checked)}
                    className="rounded border-gray-300 text-[#003366] focus:ring-[#003366]"
                  />
                  <span className="ml-2 text-sm text-gray-700">I offer free initial consultations</span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <div>
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}
            </div>
            
            <div className="text-center">
              <span className="text-sm text-gray-500">
                Step {currentStep} of 4
              </span>
            </div>
            
            <div>
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-3 bg-[#003366] text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-8 py-3 bg-[#003366] text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Submit Registration</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}