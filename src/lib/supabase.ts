import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zjfilhbczaquokqlcoej.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZmlsaGJjemFxdW9rcWxjb2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzQ6MjIsImV4cCI6MjA3MTExMDYyMn0.b6YATor8UyDwYSiSagOQUxM_4sqfCv-89CBXVgC2hP0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Consultant type based on usage in components
export interface Consultant {
  id: string
  company_name: string
  contact_person: string
  email: string
  phone?: string
  website_url?: string
  description: string
  city: string
  postcode?: string
  years_in_business: number
  team_size: string
  pricing_level: number
  response_time_hours: number
  verified: boolean
  featured: boolean
  free_consultation: boolean
  minimum_project_size?: string
  typical_project_duration?: string
  profile_views?: number
  approved_at?: string
  created_at: string
  updated_at: string
}

// Review type based on usage in components
export interface Review {
  id: string
  consultant_id: string
  reviewer_name: string
  business_name: string
  review_text: string
  rating: number
  project_type?: string
  project_value?: string
  response_text?: string
  verified: boolean
  created_at: string
  updated_at: string
}

// Database types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brexit_consultants: {
        Row: Consultant
        Insert: Omit<Consultant, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Consultant, 'id' | 'created_at' | 'updated_at'>>
      }
      brexit_reviews: {
        Row: Review
        Insert: Omit<Review, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Review, 'id' | 'created_at' | 'updated_at'>>
      }
      // Add other tables as needed based on usage
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          company: string
          message: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['contact_submissions']['Row'], 'id' | 'created_at'>
        Update: Partial<Omit<Database['public']['Tables']['contact_submissions']['Row'], 'id' | 'created_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
