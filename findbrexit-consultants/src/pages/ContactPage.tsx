import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  type: string
}

const initialForm: ContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  type: 'general'
}

export function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateForm = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company_name: formData.subject || null, // Use subject as company name if provided
          content: formData.message,
          sales_preference: formData.type,
          status: 'new',
          created_at: new Date().toISOString()
        })

      if (error) throw error

      setIsSubmitted(true)
      toast.success('Message sent successfully!')
    } catch (error: any) {
      console.error('Contact form error:', error)
      toast.error('Failed to send message. Please try again.')
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
          <h2 className="text-2xl font-bold text-[#003366] mb-4">Message Sent!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours during business days.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData(initialForm)
            }}
            className="bg-[#003366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a question about our platform, need help with your listing, or want to provide feedback? 
              We're here to help and would love to hear from you.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-[#003366] mb-8">Get in Touch</h2>
            
            <div className="space-y-6">
              {/* Office */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#003366]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Head Office</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    25 Moorgate<br />
                    London EC2R 6AY<br />
                    United Kingdom
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#003366]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 text-sm space-y-1">
                    <a href="mailto:info@findbrexitconsultants.co.uk" className="block hover:text-[#003366] transition-colors">
                      info@findbrexitconsultants.co.uk
                    </a>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#003366]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                    <p className="text-xs text-gray-500 mt-2">All times GMT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick contact options */}
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-[#003366] mb-3">Quick Questions?</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>For Businesses:</strong> Need help finding consultants or have questions about our services?
                </div>
                <div>
                  <strong>For Consultants:</strong> Interested in listing your business or need support with your profile?
                </div>
                <div>
                  <strong>Technical Issues:</strong> Experiencing problems with the website or need technical assistance?
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#003366] mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What can we help you with?
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => updateForm('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  >
                    <option value="general">General Enquiry</option>
                    <option value="business">Business Support</option>
                    <option value="consultant">Consultant Support</option>
                    <option value="technical">Technical Issue</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
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
                      value={formData.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Phone and Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                      value={formData.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      placeholder="Contact number (optional)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                      value={formData.subject}
                      onChange={(e) => updateForm('subject', e.target.value)}
                      placeholder="Brief description of your enquiry"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    value={formData.message}
                    onChange={(e) => updateForm('message', e.target.value)}
                    placeholder="Please provide details about your enquiry. The more information you can share, the better we can help you."
                  />
                </div>

                {/* Submit button */}
                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-gray-500">
                    We typically respond within 24 hours during business days.
                  </p>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 bg-[#003366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions. Can't find what you're looking for? Send us a message above.
            </p>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How do I list my consulting business?</h3>
              <p className="text-gray-600">Click "List Your Business" in the header, complete your profile, and our team will review your application within 2-5 business days.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Is there a cost to find consultants?</h3>
              <p className="text-gray-600">No, finding and contacting consultants through our platform is completely free for businesses.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How do you verify consultants?</h3>
              <p className="text-gray-600">We manually review each consultant's credentials, experience, and professional standing before approving their listing.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibred text-gray-900 mb-2">Can I get help choosing the right consultant?</h3>
              <p className="text-gray-600">Yes! Use our quote request system to get matched with relevant consultants, or contact us for personalized recommendations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}