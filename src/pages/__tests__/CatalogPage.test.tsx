import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import CatalogPage from '../CatalogPage'
import { ComparisonProvider } from '../../contexts/ComparisonContext'

const renderWithProviders = () => {
  return render(
    <BrowserRouter>
      <ComparisonProvider>
        <CatalogPage />
      </ComparisonProvider>
    </BrowserRouter>
  )
}

describe('CatalogPage', () => {
  describe('Search', () => {
    test('renders search input', () => {
      renderWithProviders()
      expect(screen.getByRole('textbox', { name: /cari bpr/i })).toBeInTheDocument()
    })

    test('filters BPRs by name when searching', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      const searchInput = screen.getByRole('textbox', { name: /cari bpr/i })
      await user.type(searchInput, 'Artaloka')
      await waitFor(() => {
        expect(screen.getByText('BPR Artaloka')).toBeInTheDocument()
        expect(screen.queryByText('BPR Dana Mulia')).not.toBeInTheDocument()
      }, { timeout: 1000 })
    })

    test('filters BPRs by city when searching', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      const searchInput = screen.getByRole('textbox', { name: /cari bpr/i })
      await user.type(searchInput, 'Bandung')
      await waitFor(() => {
        expect(screen.getByText('BPR Syariah Amanah Umat')).toBeInTheDocument()
      }, { timeout: 1000 })
    })
  })

  describe('Filters', () => {
    test('renders jenis filter dropdown', () => {
      renderWithProviders()
      expect(screen.getByLabelText(/jenis/i)).toBeInTheDocument()
    })

    test('renders sort dropdown', () => {
      renderWithProviders()
      expect(screen.getByLabelText(/urutkan/i)).toBeInTheDocument()
    })

    test('filters by Syariah type', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      const jenisSelect = screen.getByLabelText(/jenis/i)
      await user.selectOptions(jenisSelect, 'Syariah')
      expect(screen.getByText('BPR Syariah Amanah Umat')).toBeInTheDocument()
      expect(screen.getByText('BPR Syariah Berkah Madani')).toBeInTheDocument()
      expect(screen.queryByText('BPR Artaloka')).not.toBeInTheDocument()
    })

    test('filters by Konvensional type', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      const jenisSelect = screen.getByLabelText(/jenis/i)
      await user.selectOptions(jenisSelect, 'Konvensional')
      expect(screen.getByText('BPR Artaloka')).toBeInTheDocument()
      expect(screen.queryByText('BPR Syariah Amanah Umat')).not.toBeInTheDocument()
    })
  })

  describe('BPR Cards', () => {
    test('renders BPR cards grid', () => {
      renderWithProviders()
      expect(screen.getByText('BPR Artaloka')).toBeInTheDocument()
      expect(screen.getByText('BPR Dana Mulia')).toBeInTheDocument()
      expect(screen.getByText('BPR Syariah Amanah Umat')).toBeInTheDocument()
    })

    test('renders BPR city and province', () => {
      renderWithProviders()
      expect(screen.getByText('Denpasar, Bali')).toBeInTheDocument()
      expect(screen.getByText('Jakarta, DKI Jakarta')).toBeInTheDocument()
    })

    test('renders rating for each BPR', () => {
      renderWithProviders()
      expect(screen.getByText('4.5')).toBeInTheDocument()
      expect(screen.getByText('4.3')).toBeInTheDocument()
    })

    test('renders OJK badge for registered BPRs', () => {
      renderWithProviders()
      const ojkBadges = screen.getAllByText('OJK')
      expect(ojkBadges.length).toBeGreaterThan(0)
    })

    test('renders LPS badge for LPS-guaranteed BPRs', () => {
      renderWithProviders()
      const lpsBadges = screen.getAllByText('LPS')
      expect(lpsBadges.length).toBeGreaterThan(0)
    })

    test('renders highest interest rate', () => {
      renderWithProviders()
      expect(screen.getByText('7%')).toBeInTheDocument()
      expect(screen.getByText('7.5%')).toBeInTheDocument()
    })

    test('card links to BPR detail page', () => {
      renderWithProviders()
      const link = screen.getByRole('link', { name: /bpr artaloka/i })
      expect(link).toHaveAttribute('href', '/bpr/bpr-1')
    })
  })

  describe('Comparison Checkbox', () => {
    test('renders comparison checkbox on each card', () => {
      renderWithProviders()
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBeGreaterThan(0)
    })

    test('adds product to comparison when checked', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      const checkbox = screen.getAllByRole('checkbox')[0]
      await user.click(checkbox)
      expect(checkbox).toBeChecked()
    })
  })

  describe('Pagination', () => {
    test('does not render pagination when all items fit on one page', () => {
      renderWithProviders()
      expect(screen.queryByText(/halaman/i)).not.toBeInTheDocument()
    })

    test('shows all items when within page limit', () => {
      renderWithProviders()
      const cards = screen.getAllByRole('link', { name: /bpr /i })
      expect(cards.length).toBe(5)
    })
  })

  describe('Empty State', () => {
    test('shows message when no BPRs match search', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      const searchInput = screen.getByRole('textbox', { name: /cari bpr/i })
      await user.type(searchInput, 'xyznonexistent')
      await waitFor(() => {
        expect(screen.getByText(/tidak ada bpr yang ditemukan/i)).toBeInTheDocument()
      }, { timeout: 1000 })
    })
  })
})
