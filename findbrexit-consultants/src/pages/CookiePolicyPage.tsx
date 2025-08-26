import React from 'react'
import { Link } from 'react-router-dom'
import { Cookie, Clock, Shield, Settings } from 'lucide-react'

export function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#003366] to-blue-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Cookie className="h-12 w-12 text-yellow-300 mr-4" />
              <h1 className="text-4xl font-bold text-white">Cookie Policy</h1>
            </div>
            <p className="text-xl text-blue-100 leading-relaxed">
              Learn about how FindBrexitConsultants.co.uk uses cookies to enhance your browsing experience
            </p>
            <p className="text-blue-200 mt-2">
              Last updated: August 27, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose max-w-none">
            {/* What are Cookies */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Cookie className="h-8 w-8 text-[#003366] mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">What are Cookies?</h2>
              </div>
              <div className="bg-blue-50 border-l-4 border-[#003366] p-6 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences and improving our services.
                </p>
              </div>
            </div>

            {/* Types of Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {/* Essential Cookies */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-green-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Essential Cookies</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    These cookies are necessary for the website to function properly. They enable core functionality 
                    such as security, network management, and accessibility.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Authentication and sign-in status</li>
                    <li>• Security and fraud prevention</li>
                    <li>• Loading balancing and performance</li>
                    <li>• Remember your cookie preferences</li>
                  </ul>
                </div>

                {/* Functional Cookies */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <Settings className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Functional Cookies</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    These cookies allow us to remember your preferences and provide enhanced features 
                    to improve your user experience.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Remember your location and language preferences</li>
                    <li>• Store your consultant search filters</li>
                    <li>• Remember your dashboard settings</li>
                    <li>• Personalize content based on your interests</li>
                  </ul>
                </div>

                {/* Performance Cookies */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <Clock className="h-6 w-6 text-orange-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Performance Cookies</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    These cookies help us understand how visitors interact with our website by collecting 
                    information anonymously. This helps us improve our services.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Analyze website traffic and usage patterns</li>
                    <li>• Identify popular content and services</li>
                    <li>• Measure website performance and speed</li>
                    <li>• Help us fix bugs and improve functionality</li>
                  </ul>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <svg className="h-6 w-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900">Marketing Cookies</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    These cookies are used to track visitors across websites to display relevant 
                    advertisements and measure campaign effectiveness.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Show relevant consultant recommendations</li>
                    <li>• Measure advertising campaign performance</li>
                    <li>• Retarget visitors with relevant content</li>
                    <li>• Social media integration and sharing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Third Party Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  We use several third-party services that may set their own cookies. These include:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Analytics Services</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Google Analytics (website traffic analysis)</li>
                      <li>• Hotjar (user behavior analysis)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Payment Processing</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Stripe (secure payment processing)</li>
                      <li>• PayPal (alternative payment method)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Communication Tools</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Intercom (customer support chat)</li>
                      <li>• Mailchimp (email marketing)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Social Media</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• LinkedIn (professional networking)</li>
                      <li>• Twitter (social sharing)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookie Management */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Managing Your Cookie Preferences</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser Settings</h3>
                  <p className="text-gray-700 mb-4">
                    You can control and manage cookies through your browser settings. Most browsers allow you to:
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li>• View what cookies are stored on your device</li>
                    <li>• Delete cookies individually or all at once</li>
                    <li>• Block cookies from specific websites</li>
                    <li>• Block third-party cookies entirely</li>
                    <li>• Receive notifications when cookies are being set</li>
                  </ul>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Chrome</h4>
                    <p className="text-sm text-gray-600">Settings → Privacy → Cookies</p>
                  </div>
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Firefox</h4>
                    <p className="text-sm text-gray-600">Options → Privacy → Cookies</p>
                  </div>
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Safari</h4>
                    <p className="text-sm text-gray-600">Preferences → Privacy</p>
                  </div>
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Edge</h4>
                    <p className="text-sm text-gray-600">Settings → Cookies</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <svg className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h3>
                      <p className="text-yellow-700">
                        Disabling certain cookies may affect the functionality of our website. Essential cookies 
                        cannot be disabled as they are required for the website to function properly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About Cookies?</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about our Cookie Policy or how we use cookies, please don't hesitate to contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> privacy@findbrexitconsultants.co.uk</p>
                  <p><strong>Phone:</strong> +44 20 1234 5678</p>
                  <p><strong>Address:</strong> FindBrexitConsultants Ltd, 123 Business Street, London, UK</p>
                </div>
                <div className="mt-6">
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-4 py-2 border border-[#003366] text-[#003366] rounded-lg hover:bg-[#003366] hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            {/* Updates to Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Updates to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices, 
                technology, or legal requirements. When we make changes, we will update the "Last updated" 
                date at the top of this policy.
              </p>
              <p className="text-gray-700">
                We encourage you to review this Cookie Policy periodically to stay informed about our 
                use of cookies and related technologies.
              </p>
            </div>

            {/* Related Links */}
            <div className="bg-[#003366] rounded-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Related Policies</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <Link to="/privacy" className="block p-4 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors">
                  <h4 className="font-semibold mb-2">Privacy Policy</h4>
                  <p className="text-sm text-blue-100">Learn how we collect and use your personal information</p>
                </Link>
                <Link to="/terms" className="block p-4 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors">
                  <h4 className="font-semibold mb-2">Terms of Service</h4>
                  <p className="text-sm text-blue-100">Review our terms and conditions for using our services</p>
                </Link>
                <Link to="/contact" className="block p-4 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors">
                  <h4 className="font-semibold mb-2">Contact Us</h4>
                  <p className="text-sm text-blue-100">Get in touch with any questions or concerns</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}