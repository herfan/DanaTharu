import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useComparison } from '../../contexts/ComparisonContext'

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/kalkulator', label: 'Kalkulator' },
]

function NavLink({ to, label, mobile = false, onClick }: { to: string; label: string; mobile?: boolean; onClick?: () => void }) {
  const location = useLocation()
  const isActive = location.pathname === to

  const baseClasses = mobile
    ? `font-medium py-2 transition-colors duration-200 ${isActive ? 'text-danatharu-green font-semibold' : 'text-danatharu-blue hover:text-danatharu-green'}`
    : `font-medium transition-colors duration-200 relative ${isActive ? 'text-danatharu-green' : 'text-danatharu-blue hover:text-danatharu-green'}`

  return (
    <Link to={to} className={baseClasses} onClick={onClick}>
      {label}
      {!mobile && isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-danatharu-gold rounded-full" />
      )}
    </Link>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { comparisonList } = useComparison()
  const comparisonCount = comparisonList.length

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Danatharu">
            <img src="/danatharu-transparent-edit-400x388.png" alt="Danatharu" className="h-16 w-auto" />
            <span className="ml-2 font-serif text-2xl font-bold">
              <span className="text-danatharu-green">Dana</span>
              <span className="text-danatharu-gold">tharu</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} label={link.label} />
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Link
              to="/bandingkan"
              className="hidden md:inline-flex items-center px-4 py-2 bg-danatharu-green text-white font-semibold rounded-lg hover:bg-danatharu-blue transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danatharu-green relative"
            >
              Bandingkan
              {comparisonCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {comparisonCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="md:hidden p-2 text-danatharu-blue hover:text-danatharu-green transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-danatharu-green rounded-lg"
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
          <nav className="md:hidden py-4 border-t border-gray-200" aria-label="Mobile menu">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  mobile
                  onClick={() => setMobileMenuOpen(false)}
                />
              ))}
              <Link
                to="/bandingkan"
                className="relative px-4 py-2 bg-danatharu-green text-white font-semibold rounded-lg hover:bg-danatharu-blue transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bandingkan
                {comparisonCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                    {comparisonCount}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
