import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'

// Layout
import { Header } from './components/Header'
import { Footer } from './components/Footer'

// Pages
import { HomePage } from './pages/HomePage'
import { FindConsultantsPage } from './pages/FindConsultantsPage'
import { ConsultantProfilePage } from './pages/ConsultantProfilePage'
import { RequestQuotePage } from './pages/RequestQuotePage'
import { ListBusinessPage } from './pages/ListBusinessPage'
import { PricingPage } from './pages/PricingPage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { BrexitGuidePage } from './pages/BrexitGuidePage'
import { TermsPage } from './pages/TermsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { SignInPage } from './pages/auth/SignInPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { ConsultantDashboard } from './pages/dashboard/ConsultantDashboard'
import { ServiceCategoryPage } from './pages/ServiceCategoryPage'
import { LocationPage } from './pages/LocationPage'
import { IndustryPage } from './pages/IndustryPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          
          <main className="flex-1">
            <Routes>
              {/* Homepage */}
              <Route path="/" element={<HomePage />} />
              
              {/* Directory & Search */}
              <Route path="/find-consultants" element={<FindConsultantsPage />} />
              <Route path="/consultant/:id" element={<ConsultantProfilePage />} />
              <Route path="/request-quote" element={<RequestQuotePage />} />
              
              {/* Business listing */}
              <Route path="/list-business" element={<ListBusinessPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              
              {/* Category pages */}
              <Route path="/services/:slug" element={<ServiceCategoryPage />} />
              <Route path="/location/:slug" element={<LocationPage />} />
              <Route path="/industry/:slug" element={<IndustryPage />} />
              
              {/* Static pages */}
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/brexit-guide" element={<BrexitGuidePage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              
              {/* Authentication */}
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              
              {/* Dashboard */}
              <Route path="/dashboard" element={<ConsultantDashboard />} />
              
              {/* Contact consultant route */}
              <Route path="/contact/:consultantId" element={<ContactPage />} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
        
        {/* Toast notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#003366',
              color: '#fff',
            },
            success: {
              style: {
                background: '#004225',
              },
            },
            error: {
              style: {
                background: '#dc2626',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  )
}

export default App