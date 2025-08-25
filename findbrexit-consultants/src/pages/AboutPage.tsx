import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Users, TrendingUp, Award, CheckCircle, Heart } from 'lucide-react'

export function AboutPage() {
  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'CEO & Founder',
      bio: 'Former Brexit compliance consultant with 15 years of experience helping businesses navigate international trade regulations.',
      image: '/images/team/sarah.jpg'
    },
    {
      name: 'James Robertson',
      role: 'Head of Operations',
      bio: 'Ex-HMRC customs specialist with deep expertise in post-Brexit regulatory frameworks and compliance processes.',
      image: '/images/team/james.jpg'
    },
    {
      name: 'Emma Thompson',
      role: 'Business Development Director',
      bio: 'MBA with 12 years in B2B marketplace development, focused on connecting businesses with professional services.',
      image: '/images/team/emma.jpg'
    },
    {
      name: 'David Chen',
      role: 'Technical Director',
      bio: 'Full-stack developer and former fintech CTO, passionate about building platforms that solve real business problems.',
      image: '/images/team/david.jpg'
    }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Trust & Verification',
      description: 'Every consultant is manually verified for credentials, experience, and professional standing before joining our directory.'
    },
    {
      icon: Users,
      title: 'Human-Centered Approach',
      description: 'We believe business relationships matter. Our platform facilitates genuine connections between consultants and clients.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description: 'We constantly enhance our platform based on user feedback and changing Brexit compliance requirements.'
    },
    {
      icon: Heart,
      title: 'Supporting UK Business',
      description: 'Our mission is to help UK businesses thrive post-Brexit by connecting them with the expertise they need.'
    }
  ]

  const milestones = [
    {
      year: '2021',
      title: 'Founded',
      description: 'Platform launched to address the growing need for Brexit compliance expertise'
    },
    {
      year: '2022',
      title: '100 Consultants',
      description: 'Reached our first 100 verified consultants across all major UK regions'
    },
    {
      year: '2023',
      title: '500 Businesses Helped',
      description: 'Celebrated helping 500+ businesses navigate post-Brexit compliance'
    },
    {
      year: '2024',
      title: 'Platform Expansion',
      description: 'Added advanced matching algorithms and premium features for consultants'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-6">
              About FindBrexitConsultants
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We're the UK's leading directory connecting businesses with verified Brexit compliance consultants. 
              Our mission is to simplify the complex world of post-Brexit regulations by connecting you with the right expertise.
            </p>
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/find-consultants"
                className="bg-[#003366] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Find Consultants
              </Link>
              <Link
                to="/list-business"
                className="border-2 border-[#003366] text-[#003366] px-8 py-4 rounded-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors"
              >
                List Your Business
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-[#003366] mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              To empower UK businesses to thrive in the post-Brexit landscape by connecting them with verified, 
              expert compliance consultants who understand the complexities of international trade regulations.
            </p>
            <p className="text-gray-600">
              Brexit changed everything about how UK businesses trade internationally. New regulations, customs procedures, 
              and compliance requirements created challenges that many businesses weren't prepared for. We built this platform 
              to bridge that gap.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#003366] mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              To be the most trusted and comprehensive resource for Brexit compliance expertise in the UK, 
              enabling seamless connections between businesses and consultants.
            </p>
            <p className="text-gray-600">
              We envision a future where no UK business is held back by compliance uncertainty, where finding the right 
              expertise is simple and transparent, and where consultants can build thriving practices helping businesses succeed.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-[#003366]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#003366] mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#003366] mb-8 text-center">Our Story</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              FindBrexitConsultants was born from frustration. As Brexit transition period ended in 2021, 
              our founder Sarah Mitchell, a Brexit compliance consultant herself, witnessed countless UK businesses 
              struggling to navigate new regulations, customs procedures, and trade requirements.
            </p>
            <p className="mb-6">
              While there were plenty of consultants with the right expertise, businesses couldn't easily find them. 
              Traditional referral networks were limited, and there was no centralized, trustworthy directory 
              specifically focused on Brexit compliance.
            </p>
            <p className="mb-6">
              Sarah partnered with business development expert Emma Thompson and technical director David Chen 
              to build a platform that would solve this problem. They wanted to create more than just a directory – 
              they envisioned a trusted marketplace where quality consultants could build their practices and 
              businesses could find exactly the expertise they needed.
            </p>
            <p>
              Today, we're proud to have helped over 1,000 businesses connect with the right Brexit compliance expertise, 
              and we continue to grow our network of verified consultants across all regions of the UK.
            </p>
          </div>

          {/* Timeline */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-[#003366] mb-8 text-center">Key Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#003366] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-sm">{milestone.year}</span>
                  </div>
                  <h4 className="font-semibold text-[#003366] mb-2">{milestone.title}</h4>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The experienced professionals working to connect UK businesses with Brexit compliance expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#003366] mb-1">{member.name}</h3>
                <p className="text-[#004225] font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-[#003366] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-blue-100">
              Numbers that show the difference we're making for UK businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#FFD700] mb-2">500+</div>
              <div className="text-blue-100">Verified Consultants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FFD700] mb-2">1,000+</div>
              <div className="text-blue-100">Businesses Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FFD700] mb-2">98%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FFD700] mb-2">24h</div>
              <div className="text-blue-100">Average Response Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-[#003366] mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you're a business looking for expertise or a consultant wanting to grow your practice, 
            we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/find-consultants"
              className="bg-[#003366] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors"
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