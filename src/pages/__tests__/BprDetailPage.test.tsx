import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BprDetailPage from '../BprDetailPage'
import { ComparisonProvider } from '../../contexts/ComparisonContext'

const renderWithProviders = (bprId: string = 'bpr-1') => {
  window.history.pushState({}, '', `/bpr/${bprId}`)
  return render(
    <BrowserRouter>
      <ComparisonProvider>
        <Routes>
          <Route path="/bpr/:id" element={<BprDetailPage />} />
        </Routes>
      </ComparisonProvider>
    </BrowserRouter>
  )
}

describe('BprDetailPage', () => {
  describe('Header', () => {
    test('renders BPR name', () => {
      renderWithProviders()
      expect(screen.getByText('BPR Artaloka')).toBeInTheDocument()
    })

    test('renders BPR city and province', () => {
      renderWithProviders()
      expect(screen.getByText('Denpasar, Bali')).toBeInTheDocument()
    })

    test('renders BPR rating', () => {
      renderWithProviders()
      expect(screen.getByText('4.5')).toBeInTheDocument()
    })

    test('renders OJK badge', () => {
      renderWithProviders()
      expect(screen.getByText('OJK')).toBeInTheDocument()
    })

    test('renders LPS badge', () => {
      renderWithProviders()
      expect(screen.getByText('LPS')).toBeInTheDocument()
    })

    test('renders back button to marketplace', () => {
      renderWithProviders()
      const backButton = screen.getByRole('link', { name: /kembali/i })
      expect(backButton).toHaveAttribute('href', '/marketplace')
    })
  })

  describe('Product Table', () => {
    test('renders product table with columns', () => {
      renderWithProviders()
      expect(screen.getByText('Tenor')).toBeInTheDocument()
      expect(screen.getByText('Suku Bunga')).toBeInTheDocument()
      expect(screen.getByText('Min. Setoran')).toBeInTheDocument()
      expect(screen.getByText('Max. Setoran')).toBeInTheDocument()
      expect(screen.getByText('Jenis')).toBeInTheDocument()
      expect(screen.getByText('Aksi')).toBeInTheDocument()
    })

    test('renders all products for the BPR', () => {
      renderWithProviders()
      expect(screen.getByText('1 bulan')).toBeInTheDocument()
      expect(screen.getByText('3 bulan')).toBeInTheDocument()
      expect(screen.getByText('12 bulan')).toBeInTheDocument()
    })

    test('renders interest rates', () => {
      renderWithProviders()
      expect(screen.getByText('5.50%')).toBeInTheDocument()
      expect(screen.getByText('6.00%')).toBeInTheDocument()
      expect(screen.getByText('7.00%')).toBeInTheDocument()
    })

    test('renders minimum deposit amounts', () => {
      renderWithProviders()
      const minDeposits = screen.getAllByText('Rp 1.000.000')
      expect(minDeposits.length).toBeGreaterThan(0)
    })

    test('renders maximum deposit amounts', () => {
      renderWithProviders()
      const maxDeposits = screen.getAllByText('Rp 50.000.000')
      expect(maxDeposits.length).toBeGreaterThan(0)
    })

    test('renders product type', () => {
      renderWithProviders()
      const konvensionalBadges = screen.getAllByText('Konvensional')
      expect(konvensionalBadges.length).toBeGreaterThan(0)
    })
  })

  describe('Actions', () => {
    test('renders "Pilih" button for each product', () => {
      renderWithProviders()
      const pilihButtons = screen.getAllByRole('button', { name: /pilih/i })
      expect(pilihButtons.length).toBeGreaterThan(0)
    })

    test('renders comparison checkbox per product', () => {
      renderWithProviders()
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBeGreaterThan(0)
    })

    test('adds product to comparison when checkbox is checked', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      const checkbox = screen.getAllByRole('checkbox')[0]
      await user.click(checkbox)
      expect(checkbox).toBeChecked()
    })
  })

  describe('Syariah BPR', () => {
    test('renders Syariah BPR products', () => {
      renderWithProviders('bpr-3')
      expect(screen.getByText('BPR Syariah Amanah Umat')).toBeInTheDocument()
      const syariahBadges = screen.getAllByText('Syariah')
      expect(syariahBadges.length).toBeGreaterThan(0)
    })
  })

  describe('Not Found', () => {
    test('shows message for invalid BPR ID', () => {
      renderWithProviders('invalid-id')
      expect(screen.getByText(/bpr tidak ditemukan/i)).toBeInTheDocument()
    })
  })
})
