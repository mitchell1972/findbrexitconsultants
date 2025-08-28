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
  termsAccepted: boolean
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
  free_consultation: false,
  termsAccepted: false
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
  const [showSuccess, setShowSuccess] = useState(false)
  
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
        if (!formData.company_name?.trim()) {
          newErrors.company_name = 'Company name is required'
        }
        if (!formData.contact_person?.trim()) {
          newErrors.contact_person = 'Contact person is required'
        }
        if (!formData.email?.trim()) {
          newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address'
        }
        if (!formData.phone?.trim()) {
          newErrors.phone = 'Phone number is required'
        }
        break
      case 2:
        if (!formData.city?.trim()) {
          newErrors.city = 'City is required'
        }
        break
      case 3:
        if (!formData.years_in_business || formData.years_in_business <= 0) {
          newErrors.years_in_business = 'Years in business is required'
        }
        if (!formData.team_size?.trim()) {
          newErrors.team_size = 'Team size is required'
        }
        if (!formData.description?.trim()) {
          newErrors.description = 'Company description is required'
        } else if (formData.description.length < 50) {
          newErrors.description = 'Description must be at least 50 characters'
        }
        break
      case 4:
        if (formData.services.length === 0) {
          newErrors.services = 'Please select at least one service'
        }
        if (!formData.termsAccepted) {
          newErrors.terms = 'You must accept the terms and conditions'
        }
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
      // Extract services and industries from form data
      const { services, industries, ...consultantData } = formData
      
      // 1. Insert consultant data (without services/industries)
      const { data: consultant, error: consultantError } = await supabase
        .from('brexit_consultants')
        .insert({
          ...consultantData,
          user_id: user.id,
          verified: false,
          featured: false,
          profile_views: 0
        })
        .select()
        .single()
      
      if (consultantError) throw consultantError
      
      // 2. Insert services into junction table
      if (services && services.length > 0) {
        // First, get service IDs
        const { data: serviceTypes, error: serviceError } = await supabase
          .from('brexit_service_types')
          .select('id, name')
          .in('name', services)
        
        if (serviceError) throw serviceError
        
        // Insert consultant-service relationships
        const serviceInserts = serviceTypes.map(service => ({
          consultant_id: consultant.id,
          service_type_id: service.id
        }))
        
        if (serviceInserts.length > 0) {
          const { error: serviceJunctionError } = await supabase
            .from('brexit_consultant_services')
            .insert(serviceInserts)
          
          if (serviceJunctionError) throw serviceJunctionError
        }
      }
      
      // 3. Insert industries into junction table
      if (industries && industries.length > 0) {
        // First, get industry IDs
        const { data: industryTypes, error: industryError } = await supabase
          .from('brexit_industries')
          .select('id, name')
          .in('name', industries)
        
        if (industryError) throw industryError
        
        // Insert consultant-industry relationships
        const industryInserts = industryTypes.map(industry => ({
          consultant_id: consultant.id,
          industry_id: industry.id
        }))
        
        if (industryInserts.length > 0) {
          const { error: industryJunctionError } = await supabase
            .from('brexit_consultant_industries')
            .insert(industryInserts)
          
          if (industryJunctionError) throw industryJunctionError
        }
      }
      
      setShowSuccess(true)
      toast.success('Registration submitted successfully! We will review your application.')
      
      // Reset form after successful submission
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
      
    } catch (error: any) {
      console.error('Registration error:', error)
      
      // Provide specific error feedback
      let errorMessage = 'Failed to submit registration. Please try again.'
      
      if (error.message) {
        if (error.message.includes('duplicate key')) {
          errorMessage = 'A business with this email is already registered.'
        } else if (error.message.includes('foreign key')) {
          errorMessage = 'Please ensure all selected services and industries are valid.'
        } else {
          errorMessage = `Registration failed: ${error.message}`
        }
      }
      
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success page
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your submission. We'll review your application and contact you within 24-48 hours.
          </p>
          <div className="space-y-3">
            <Link 
              to="/dashboard"
              className="block w-full bg-[#003366] text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link 
              to="/"
              className="block w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ... rest of the component remains the same as original ...
  // [Include all the original JSX for the form steps]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Rest of component JSX remains unchanged */}
      {/* This is just showing the key fix - the handleSubmit function */}
      <div>Original JSX content here...</div>
    </div>
  )
}
