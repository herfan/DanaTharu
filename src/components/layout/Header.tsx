import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-danatharu-green shadow-lg" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Danatharu">
            <img src="/danatharu-logo.png" alt="Danatharu" className="h-8 w-auto" />
            <span className="ml-2 text-white font-serif text-xl font-bold">Danatharu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            <Link to="/marketplace" className="text-white hover:text-danatharu-gold transition-colors duration-200 font-medium">
              Marketplace
            </Link>
            <Link to="/kalkulator" className="text-white hover:text-danatharu-gold transition-colors duration-200 font-medium">
              Kalkulator
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="hidden md:inline-flex items-center px-4 py-2 bg-danatharu-gold text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danatharu-gold"
            >
              Bandingkan
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="md:hidden p-2 text-white hover:text-danatharu-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-danatharu-gold rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-danatharu-gold border-opacity-30" aria-label="Mobile menu">
            <div className="flex flex-col space-y-3">
              <Link
                to="/marketplace"
                className="text-white hover:text-danatharu-gold transition-colors duration-200 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                to="/kalkulator"
                className="text-white hover:text-danatharu-gold transition-colors duration-200 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kalkulator
              </Link>
              <button
                type="button"
                className="text-left px-0 py-2 bg-danatharu-gold text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bandingkan
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
