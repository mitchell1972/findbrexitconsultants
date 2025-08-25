import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Search } from 'lucide-react'

interface HeaderProps {
  onSearchSubmit?: (query: string) => void
}

export function Header({ onSearchSubmit }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearchSubmit && searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim())
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Top bar with trust indicators */}
      <div className="bg-[#003366] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 py-2 text-sm">
            <span>500+ Verified Consultants</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">1000+ Businesses Helped</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">All Consultants Vetted</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#003366] rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">FB</span>
              </div>
              <span className="font-bold text-xl text-[#003366]">FindBrexitConsultants.co.uk</span>
            </Link>
          </div>

          {/* Desktop search bar */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search consultants by service, location, or company..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-[#003366]"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/find-consultants" className="text-gray-700 hover:text-[#003366] font-medium">
              Find Consultants
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-[#003366] font-medium">
              How It Works
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-[#003366] font-medium">
              Pricing
            </Link>
            <Link 
              to="/list-business" 
              className="bg-[#FFD700] text-[#003366] px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              List Your Business
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#003366]"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {/* Mobile search */}
          <div className="px-4 py-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search consultants..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-[#003366]"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Mobile navigation links */}
          <nav className="px-4 pb-4 space-y-2">
            <Link 
              to="/find-consultants" 
              className="block py-2 text-gray-700 hover:text-[#003366] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Consultants
            </Link>
            <Link 
              to="/how-it-works" 
              className="block py-2 text-gray-700 hover:text-[#003366] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/pricing" 
              className="block py-2 text-gray-700 hover:text-[#003366] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/list-business" 
              className="block bg-[#FFD700] text-[#003366] px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              List Your Business
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}