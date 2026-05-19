import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Footer from '../Footer'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Footer', () => {
  test('renders logo and tagline', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByText(/simpan dana anda dengan aman dan menguntungkan/i)).toBeInTheDocument()
  })

  test('renders quick links section', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('heading', { name: /navigasi/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /marketplace/i })).toHaveAttribute('href', '/marketplace')
    expect(screen.getByRole('link', { name: /kalkulator/i })).toHaveAttribute('href', '/kalkulator')
    expect(screen.getByRole('link', { name: /bandingkan/i })).toHaveAttribute('href', '/bandingkan')
    expect(screen.getByRole('link', { name: /bantuan/i })).toHaveAttribute('href', '/bantuan')
  })

  test('renders legal links section', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('heading', { name: /legal/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /tentang kami/i })).toHaveAttribute('href', '/tentang')
    expect(screen.getByRole('link', { name: /kebijakan privasi/i })).toHaveAttribute('href', '/privasi')
    expect(screen.getByRole('link', { name: /syarat & ketentuan/i })).toHaveAttribute('href', '/syarat')
  })

  test('renders copyright bar with OJK and LPS text', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByText(/terdaftar dan diawasi oleh ojk/i)).toBeInTheDocument()
    expect(screen.getByText(/dijamin oleh lps/i)).toBeInTheDocument()
    expect(screen.getByText(/© 2026 danatharu/i)).toBeInTheDocument()
  })

  test('renders social media icons', () => {
    renderWithRouter(<Footer />)
    const socialLinks = screen.getAllByRole('link', { name: /follow us on/i })
    expect(socialLinks.length).toBeGreaterThan(0)
  })

  test('has dark background color', () => {
    renderWithRouter(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-danatharu-blue')
  })

  test('renders 3 column layout on desktop', () => {
    renderWithRouter(<Footer />)
    const columns = screen.getAllByRole('heading', { level: 3 })
    expect(columns.length).toBe(3)
  })
})
