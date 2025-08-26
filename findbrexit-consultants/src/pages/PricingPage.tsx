import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Star, Users, TrendingUp, Crown, Shield, Zap } from 'lucide-react'

const pricingPlans = [
  {
    id: 'free',
    name: 'Free Basic',
    price: '£0',
    period: 'forever',
    description: 'Get started with basic listing features',
    icon: Users,
    color: 'border-gray-200',
    buttonStyle: 'border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white',
    popular: false,
    features: [
      'Company name and location (city only)',
      'Contact email and phone number',
      'One service category',
      '50-word company description',
      'Listed after paid members',
      'Basic profile visibility',
      'Email support'
    ],
    limitations: [
      'Limited profile information',
      'No direct enquiry form',
      'No website/LinkedIn links',
      'No photos or logos',
      'No analytics',
      'Lower search ranking'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '£99',
    period: 'per month',
    description: 'Perfect for established consultants',
    icon: TrendingUp,
    color: 'border-[#003366]',
    buttonStyle: 'bg-[#003366] text-white hover:bg-blue-800',
    popular: true,
    features: [
      'Everything in Free Basic',
      'Full profile with unlimited description',
      'Up to 5 service categories',
      'Direct enquiry form on profile',
      'Website and LinkedIn links',
      '3 photos/logos upload',
      'Response time guarantee badge',
      'Basic analytics dashboard',
      'Appear above free listings',
      'Priority email support',
      'Monthly leads report'
    ],
    limitations: [
      'No homepage featuring',
      'No "Verified Expert" badge',
      'No video profile',
      'Limited case studies (1 max)'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Featured',
    price: '£299',
    period: 'per month',
    description: 'Maximum visibility and premium features',
    icon: Crown,
    color: 'border-[#FFD700] bg-gradient-to-br from-yellow-50 to-orange-50',
    buttonStyle: 'bg-[#FFD700] text-[#003366] hover:bg-yellow-400',
    popular: false,
    features: [
      'Everything in Professional',
      'Homepage featured consultant (rotating)',
      'Top placement in all category searches',
      '"Verified Expert" badge',
      'Video profile introduction',
      'Detailed case studies (up to 5)',
      'Priority in search results',
      'Monthly performance report',
      'Highlighted listing with border',
      'Direct WhatsApp button',
      'Dedicated account manager',
      'Phone support priority',
      'Custom profile URL',
      'Advanced analytics dashboard'
    ],
    limitations: []
  }
]

const faqs = [
  {
    question: 'How does the free plan work?',
    answer: 'The free plan includes basic listing features that allow you to get started immediately. Your profile will include essential contact information and a brief description, but will appear after paid listings in search results.'
  },
  {
    question: 'Can I upgrade or downgrade my plan at any time?',
    answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing period.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards (Visa, MasterCard, American Express) processed securely through Stripe. All payments are in GBP.'
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No, there are no setup fees or hidden costs. You only pay the monthly subscription fee for your chosen plan.'
  },
  {
    question: 'How do I get verified as an expert?',
    answer: 'Premium members can apply for "Verified Expert" status by submitting relevant certifications, client testimonials, and proof of experience. Our team reviews applications within 5-7 business days.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your profile will remain active until the end of your current billing period, then revert to the free plan.'
  }
]

export function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-6">
              Choose Your Membership Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join the UK's leading directory of Brexit compliance consultants. 
              Get more leads, build credibility, and grow your business.
            </p>
            
            {/* Billing toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-[#003366] font-semibold' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                    billingPeriod === 'annual' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${billingPeriod === 'annual' ? 'text-[#003366] font-semibold' : 'text-gray-500'}`}>
                Annual
                <span className="ml-1 text-green-600 font-medium">(Save 20%)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => {
            const IconComponent = plan.icon
            const annualPrice = plan.id === 'free' ? '£0' 
              : plan.id === 'professional' ? '£79'
              : '£239'
              
            const displayPrice = billingPeriod === 'annual' && plan.id !== 'free' ? annualPrice : plan.price
            const displayPeriod = billingPeriod === 'annual' && plan.id !== 'free' ? 'per month (billed annually)' : plan.period
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl border-2 shadow-sm hover:shadow-lg transition-all duration-200 ${plan.color} ${
                  plan.popular ? 'transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#003366] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  {/* Plan header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                      <IconComponent className="w-6 h-6 text-[#003366]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#003366] mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="text-4xl font-bold text-[#003366]">{displayPrice}</div>
                      <div className="text-sm text-gray-500">{displayPeriod}</div>
                      {billingPeriod === 'annual' && plan.id !== 'free' && (
                        <div className="text-sm text-green-600 font-medium mt-1">
                          Save £{plan.id === 'professional' ? '240' : '720'}/year
                        </div>
                      )}
                    </div>
                    
                    <Link
                      to={`/list-business?plan=${plan.id}`}
                      className={`w-full inline-block px-6 py-3 rounded-lg font-semibold text-center transition-colors ${plan.buttonStyle}`}
                    >
                      {plan.id === 'free' ? 'Get Started Free' : 'Start Free Trial'}
                    </Link>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <div className="w-4 h-4 border-2 border-gray-300 rounded mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-500">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Trust indicators */}
        <div className="text-center mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-8 h-8 text-[#003366] mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">All payments processed securely through Stripe</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-[#003366] mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant Activation</h3>
              <p className="text-sm text-gray-600">Your profile goes live immediately after approval</p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-[#003366] mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-sm text-gray-600">Get help from our dedicated support team</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and membership plans
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-[#003366] rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <div className={`transform transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-[#003366] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Brexit Consulting Business?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of successful consultants already using our platform to connect with new clients
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/list-business"
              className="bg-[#FFD700] text-[#003366] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors"
            >
              Start Your Free Trial
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#003366] transition-colors"
            >
              Contact Sales
            </Link>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            14-day free trial • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  )
}