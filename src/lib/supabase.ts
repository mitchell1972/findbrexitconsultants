import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zjfilhbczaquokqlcoej.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZmlsaGJjemFxdW9rcWxjb2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzQ2MjIsImV4cCI6MjA3MTExMDYyMn0.b6YATor8UyDwYSiSagOQUxM_4sqfCv-89CBXVgC2hP0'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Consultant {
  id: string
  company_name: string
  company_logo_url?: string
  contact_person: string
  email: string
  phone?: string
  website_url?: string
  linkedin_url?: string
  whatsapp_number?: string
  years_in_business: number
  team_size: string
  response_time_hours: number
  description: string
  minimum_project_size?: string
  typical_project_duration?: string
  pricing_level: number
  free_consultation: boolean
  address?: string
  city: string
  postcode?: string
  latitude?: number
  longitude?: number
  verified: boolean
  featured: boolean
  profile_views: number
  created_at: string
  updated_at: string
  approved_at?: string
}

export interface ServiceType {
  id: number
  name: string
  slug: string
  description?: string
  icon_name?: string
}

export interface Industry {
  id: number
  name: string
  slug: string
  description?: string
}

export interface Location {
  id: number
  name: string
  slug: string
  type: string
  region?: string
}

export interface Review {
  id: string
  consultant_id: string
  business_name?: string
  reviewer_name?: string
  rating: number
  review_text?: string
  project_type?: string
  project_value?: string
  verified: boolean
  response_text?: string
  responded_at?: string
  created_at: string
}

export interface QuoteRequest {
  id: string
  requester_name: string
  requester_email: string
  requester_phone?: string
  company_name?: string
  company_size?: string
  industry?: string
  project_description: string
  budget_range?: string
  timeline?: string
  preferred_contact: string
  service_types?: string
  location_preference?: string
  status: string
  created_at: string
}