import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from '../LandingPage'

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  )
}

describe('LandingPage', () => {
  describe('Hero Section', () => {
    test('renders hero headline', () => {
      renderWithRouter()
      expect(screen.getByRole('heading', { name: /simpan dana anda dengan aman dan menguntungkan/i })).toBeInTheDocument()
    })

    test('renders hero subheadline', () => {
      renderWithRouter()
      expect(screen.getByText(/bandingkan suku bunga deposito dari bpr terpercaya yang terdaftar di ojk/i)).toBeInTheDocument()
    })

    test('renders "Mulai Bandingkan" CTA button linking to /marketplace', () => {
      renderWithRouter()
      const button = screen.getByRole('link', { name: /mulai bandingkan/i })
      expect(button).toHaveAttribute('href', '/marketplace')
    })

    test('renders "Hitung Bunga" secondary CTA button linking to /kalkulator', () => {
      renderWithRouter()
      const button = screen.getByRole('link', { name: /hitung bunga/i })
      expect(button).toHaveAttribute('href', '/kalkulator')
    })
  })

  describe('Key Benefits Section', () => {
    test('renders benefits section heading', () => {
      renderWithRouter()
      expect(screen.getByRole('heading', { name: /mengapa memilih danatharu/i })).toBeInTheDocument()
    })

    test('renders "Terdaftar & Diawasi OJK" benefit', () => {
      renderWithRouter()
      expect(screen.getByText(/terdaftar & diawasi ojk/i)).toBeInTheDocument()
    })

    test('renders "Dijamin LPS" benefit', () => {
      renderWithRouter()
      expect(screen.getByText(/dijamin lps/i)).toBeInTheDocument()
    })

    test('renders "Suku Bunga Kompetitif" benefit', () => {
      renderWithRouter()
      expect(screen.getByText(/suku bunga kompetitif/i)).toBeInTheDocument()
    })

    test('renders "Proses Digital Cepat" benefit', () => {
      renderWithRouter()
      expect(screen.getByText(/proses digital cepat/i)).toBeInTheDocument()
    })
  })

  describe('Featured BPRs Section', () => {
    test('renders featured BPRs section heading', () => {
      renderWithRouter()
      expect(screen.getByRole('heading', { name: /bpr dengan suku bunga tertinggi/i })).toBeInTheDocument()
    })

    test('renders top 3 BPRs by highest interest rate', () => {
      renderWithRouter()
      const featuredSection = screen.getByRole('heading', { name: /bpr dengan suku bunga tertinggi/i })
      const section = featuredSection.closest('section')!
      expect(section).toHaveTextContent(/bpr dana mulia/i)
      expect(section).toHaveTextContent(/bpr syariah berkah madani/i)
      expect(section).toHaveTextContent(/bpr artaloka/i)
    })

    test('renders BPR city information', () => {
      renderWithRouter()
      const featuredSection = screen.getByRole('heading', { name: /bpr dengan suku bunga tertinggi/i })
      const section = featuredSection.closest('section')!
      expect(section).toHaveTextContent(/jakarta/i)
      expect(section).toHaveTextContent(/yogyakarta/i)
      expect(section).toHaveTextContent(/denpasar/i)
    })

    test('renders "Lihat Semua" button linking to /marketplace', () => {
      renderWithRouter()
      const button = screen.getByRole('link', { name: /lihat semua/i })
      expect(button).toHaveAttribute('href', '/marketplace')
    })
  })

  describe('How It Works Section', () => {
    test('renders how it works section heading', () => {
      renderWithRouter()
      expect(screen.getByRole('heading', { name: /cara kerja/i })).toBeInTheDocument()
    })

    test('renders step 1: "Pilih BPR & Produk"', () => {
      renderWithRouter()
      expect(screen.getByText(/pilih bpr & produk/i)).toBeInTheDocument()
    })

    test('renders step 2: "Bandingkan Suku Bunga"', () => {
      renderWithRouter()
      const headings = screen.getAllByRole('heading', { name: /bandingkan suku bunga/i })
      expect(headings.length).toBeGreaterThan(0)
    })

    test('renders step 3: "Daftar Online"', () => {
      renderWithRouter()
      expect(screen.getByText(/daftar online/i)).toBeInTheDocument()
    })
  })

  describe('Trust Indicators Section', () => {
    test('renders "50+ BPR Partner" statistic', () => {
      renderWithRouter()
      expect(screen.getByText('50+')).toBeInTheDocument()
      const bprPartnerTexts = screen.getAllByText(/bpr partner/i)
      expect(bprPartnerTexts.length).toBeGreaterThan(0)
    })

    test('renders "Rp 100M+ Dana Terkelola" statistic', () => {
      renderWithRouter()
      expect(screen.getByText('Rp 100M+')).toBeInTheDocument()
      expect(screen.getByText(/dana terkelola/i)).toBeInTheDocument()
    })

    test('renders "10,000+ Nasabah" statistic', () => {
      renderWithRouter()
      expect(screen.getByText('10,000+')).toBeInTheDocument()
      expect(screen.getByText(/nasabah/i)).toBeInTheDocument()
    })

    test('renders OJK badge', () => {
      renderWithRouter()
      const ojkBadges = screen.getAllByText(/terdaftar di ojk/i)
      expect(ojkBadges.length).toBeGreaterThan(0)
    })

    test('renders LPS badge', () => {
      renderWithRouter()
      const lpsBadges = screen.getAllByText(/dijamin oleh lps/i)
      expect(lpsBadges.length).toBeGreaterThan(0)
    })
  })
})
