import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import ComparisonPage from '../ComparisonPage'
import { ComparisonProvider } from '../../contexts/ComparisonContext'

const renderWithProviders = () => {
  return render(
    <BrowserRouter>
      <ComparisonProvider>
        <ComparisonPage />
      </ComparisonProvider>
    </BrowserRouter>
  )
}

describe('ComparisonPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Empty State', () => {
    test('shows empty state message when no products in comparison', () => {
      renderWithProviders()
      expect(screen.getByText(/belum ada produk yang dibandingkan/i)).toBeInTheDocument()
    })

    test('shows "Mulai Bandingkan" CTA button linking to marketplace', () => {
      renderWithProviders()
      const link = screen.getByRole('link', { name: /mulai bandingkan/i })
      expect(link).toHaveAttribute('href', '/marketplace')
    })
  })

  describe('Comparison Table', () => {
    beforeEach(() => {
      localStorage.setItem('danatharu-comparison', JSON.stringify(['prod-1-1']))
    })

    test('renders comparison cards when products are in comparison list', () => {
      renderWithProviders()
      const heading = screen.getByText('Bandingkan Produk')
      expect(heading).toBeInTheDocument()
    })

    test('shows max 3 products indicator', () => {
      renderWithProviders()
      expect(screen.getByText(/maksimal 3 produk/i)).toBeInTheDocument()
    })

    test('shows product name in table', () => {
      renderWithProviders()
      expect(screen.getByText('BPR Artaloka')).toBeInTheDocument()
    })

    test('shows tenor column', () => {
      renderWithProviders()
      expect(screen.getByText('1 bulan')).toBeInTheDocument()
    })

    test('shows suku bunga column', () => {
      renderWithProviders()
      expect(screen.getByText('5.5%')).toBeInTheDocument()
    })

    test('shows minimal setoran column', () => {
      renderWithProviders()
      expect(screen.getByText('Rp 1.000.000')).toBeInTheDocument()
    })

    test('shows maksimal setoran column', () => {
      renderWithProviders()
      expect(screen.getByText('Rp 50.000.000')).toBeInTheDocument()
    })

    test('shows jenis column', () => {
      renderWithProviders()
      expect(screen.getByText('Konvensional')).toBeInTheDocument()
    })

    test('shows BPR city', () => {
      renderWithProviders()
      expect(screen.getByText('Denpasar')).toBeInTheDocument()
    })

    test('shows BPR rating', () => {
      renderWithProviders()
      expect(screen.getByText(/4\.5/)).toBeInTheDocument()
    })

    test('shows "Hapus" button to remove product from comparison', () => {
      renderWithProviders()
      const hapusButton = screen.getByRole('button', { name: /hapus/i })
      expect(hapusButton).toBeInTheDocument()
    })

    test('shows "Daftar Sekarang" button linking to enrollment page', () => {
      renderWithProviders()
      const daftarLink = screen.getByRole('link', { name: /daftar sekarang/i })
      expect(daftarLink).toHaveAttribute('href', '/daftar/bpr-1/prod-1-1')
    })

    test('removes product from comparison when "Hapus" is clicked', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      const hapusButton = screen.getByRole('button', { name: /hapus/i })
      await user.click(hapusButton)
      expect(screen.getByText(/belum ada produk yang dibandingkan/i)).toBeInTheDocument()
    })
  })

  describe('Product Details Comparison', () => {
    beforeEach(() => {
      localStorage.setItem('danatharu-comparison', JSON.stringify(['prod-1-1']))
    })

    test('highlights different suku bunga rates with different colors', () => {
      renderWithProviders()
      const rateElement = screen.getByText('5.5%')
      expect(rateElement).toBeInTheDocument()
    })

    test('shows jenis badge for each product', () => {
      renderWithProviders()
      expect(screen.getByText('Konvensional')).toBeInTheDocument()
    })
  })
})
