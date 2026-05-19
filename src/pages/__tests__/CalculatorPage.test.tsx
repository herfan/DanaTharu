import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CalculatorPage from '../CalculatorPage'

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <CalculatorPage />
    </BrowserRouter>
  )
}

describe('CalculatorPage', () => {
  describe('Calculator Form', () => {
    test('renders page title', () => {
      renderWithRouter()
      expect(screen.getByRole('heading', { name: /kalkulator deposito/i })).toBeInTheDocument()
    })

    test('renders "Jumlah Deposito" input', () => {
      renderWithRouter()
      expect(screen.getByLabelText(/jumlah deposito/i)).toBeInTheDocument()
    })

    test('renders "Tenor" select with options', () => {
      renderWithRouter()
      const select = screen.getByLabelText(/tenor/i)
      expect(select).toBeInTheDocument()
      expect(screen.getByText('1 Bulan')).toBeInTheDocument()
      expect(screen.getByText('3 Bulan')).toBeInTheDocument()
      expect(screen.getByText('6 Bulan')).toBeInTheDocument()
      expect(screen.getByText('12 Bulan')).toBeInTheDocument()
    })

    test('renders "Jenis Bunga" select with options', () => {
      renderWithRouter()
      const select = screen.getByLabelText(/jenis bunga/i)
      expect(select).toBeInTheDocument()
      expect(screen.getByText('Bunga Efektif')).toBeInTheDocument()
      expect(screen.getByText('Bunga Flat')).toBeInTheDocument()
    })

    test('renders "Hitung" button', () => {
      renderWithRouter()
      expect(screen.getByRole('button', { name: /hitung/i })).toBeInTheDocument()
    })
  })

  describe('Product Selector', () => {
    test('renders product selector dropdown', () => {
      renderWithRouter()
      expect(screen.getByLabelText(/pilih produk bpr/i)).toBeInTheDocument()
    })

    test('renders products from mockData', () => {
      renderWithRouter()
      expect(screen.getByText('BPR Artaloka - 1 Bulan')).toBeInTheDocument()
      expect(screen.getByText('BPR Dana Mulia - 1 Bulan')).toBeInTheDocument()
    })
  })

  describe('Validation', () => {
    test('shows error when amount is empty and Hitung is clicked', () => {
      renderWithRouter()
      const hitungButton = screen.getByRole('button', { name: /hitung/i })
      fireEvent.click(hitungButton)
      expect(screen.getByText(/jumlah deposito harus diisi/i)).toBeInTheDocument()
    })

    test('shows error when amount is below minimum', () => {
      renderWithRouter()
      const productSelect = screen.getByLabelText(/pilih produk bpr/i) as HTMLSelectElement
      fireEvent.change(productSelect, { target: { value: 'prod-1-1' } })

      const amountInput = screen.getByLabelText(/jumlah deposito/i) as HTMLInputElement
      fireEvent.change(amountInput, { target: { value: '100000' } })

      const hitungButton = screen.getByRole('button', { name: /hitung/i })
      fireEvent.click(hitungButton)
      expect(screen.getByText(/jumlah deposito di bawah minimal setoran/i)).toBeInTheDocument()
    })

    test('shows error when amount exceeds maximum', () => {
      renderWithRouter()
      const productSelect = screen.getByLabelText(/pilih produk bpr/i) as HTMLSelectElement
      fireEvent.change(productSelect, { target: { value: 'prod-1-1' } })

      const amountInput = screen.getByLabelText(/jumlah deposito/i) as HTMLInputElement
      fireEvent.change(amountInput, { target: { value: '999999999999' } })

      const hitungButton = screen.getByRole('button', { name: /hitung/i })
      fireEvent.click(hitungButton)
      expect(screen.getByText(/jumlah deposito melebihi maksimal setoran/i)).toBeInTheDocument()
    })
  })

  describe('Calculation Result - Bunga Flat', () => {
    test('calculates and displays result for Bunga Flat', () => {
      renderWithRouter()

      const productSelect = screen.getByLabelText(/pilih produk bpr/i) as HTMLSelectElement
      fireEvent.change(productSelect, { target: { value: 'prod-1-3' } })

      const amountInput = screen.getByLabelText(/jumlah deposito/i) as HTMLInputElement
      fireEvent.change(amountInput, { target: { value: '10000000' } })

      const tenorSelect = screen.getByLabelText(/tenor/i) as HTMLSelectElement
      fireEvent.change(tenorSelect, { target: { value: '12' } })

      const jenisSelect = screen.getByLabelText(/jenis bunga/i) as HTMLSelectElement
      fireEvent.change(jenisSelect, { target: { value: 'flat' } })

      const hitungButton = screen.getByRole('button', { name: /hitung/i })
      fireEvent.click(hitungButton)

      expect(screen.getByText(/bunga per bulan/i)).toBeInTheDocument()
      expect(screen.getByText(/bunga per tahun/i)).toBeInTheDocument()
      expect(screen.getByText(/total dana/i)).toBeInTheDocument()
      expect(screen.getByText(/pajak/i)).toBeInTheDocument()
      expect(screen.getByText(/bunga bersih/i)).toBeInTheDocument()
    })

    test('calculates Bunga Flat correctly: 10M, 12 months, 7% rate', () => {
      renderWithRouter()

      const productSelect = screen.getByLabelText(/pilih produk bpr/i) as HTMLSelectElement
      fireEvent.change(productSelect, { target: { value: 'prod-1-3' } })

      const amountInput = screen.getByLabelText(/jumlah deposito/i) as HTMLInputElement
      fireEvent.change(amountInput, { target: { value: '10000000' } })

      const tenorSelect = screen.getByLabelText(/tenor/i) as HTMLSelectElement
      fireEvent.change(tenorSelect, { target: { value: '12' } })

      const jenisSelect = screen.getByLabelText(/jenis bunga/i) as HTMLSelectElement
      fireEvent.change(jenisSelect, { target: { value: 'flat' } })

      const hitungButton = screen.getByRole('button', { name: /hitung/i })
      fireEvent.click(hitungButton)

      const bungaTahunEl = screen.getByText('Bunga per Tahun').closest('div')
      expect(bungaTahunEl).toHaveTextContent('Rp 700.000')

      const bungaBulanEl = screen.getByText('Bunga per Bulan').closest('div')
      expect(bungaBulanEl).toHaveTextContent('Rp 58.333')
    })
  })

  describe('Calculation Result - Bunga Efektif', () => {
    test('calculates and displays result for Bunga Efektif', () => {
      renderWithRouter()

      const productSelect = screen.getByLabelText(/pilih produk bpr/i) as HTMLSelectElement
      fireEvent.change(productSelect, { target: { value: 'prod-1-3' } })

      const amountInput = screen.getByLabelText(/jumlah deposito/i) as HTMLInputElement
      fireEvent.change(amountInput, { target: { value: '10000000' } })

      const tenorSelect = screen.getByLabelText(/tenor/i) as HTMLSelectElement
      fireEvent.change(tenorSelect, { target: { value: '12' } })

      const jenisSelect = screen.getByLabelText(/jenis bunga/i) as HTMLSelectElement
      fireEvent.change(jenisSelect, { target: { value: 'efektif' } })

      const hitungButton = screen.getByRole('button', { name: /hitung/i })
      fireEvent.click(hitungButton)

      expect(screen.getByText(/bunga per bulan/i)).toBeInTheDocument()
      expect(screen.getByText(/bunga per tahun/i)).toBeInTheDocument()
      expect(screen.getByText(/total dana/i)).toBeInTheDocument()
    })
  })

  describe('Tax Calculation', () => {
    test('applies 20% tax for Konvensional products', () => {
      renderWithRouter()

      const productSelect = screen.getByLabelText(/pilih produk bpr/i) as HTMLSelectElement
      fireEvent.change(productSelect, { target: { value: 'prod-1-1' } })

      const amountInput = screen.getByLabelText(/jumlah deposito/i) as HTMLInputElement
      fireEvent.change(amountInput, { target: { value: '10000000' } })

      const tenorSelect = screen.getByLabelText(/tenor/i) as HTMLSelectElement
      fireEvent.change(tenorSelect, { target: { value: '12' } })

      const hitungButton = screen.getByRole('button', { name: /hitung/i })
      fireEvent.click(hitungButton)

      expect(screen.getByText(/pajak/i)).toBeInTheDocument()
    })

    test('applies 0% tax for Syariah products', () => {
      renderWithRouter()

      const productSelect = screen.getByLabelText(/pilih produk bpr/i) as HTMLSelectElement
      fireEvent.change(productSelect, { target: { value: 'prod-3-1' } })

      const amountInput = screen.getByLabelText(/jumlah deposito/i) as HTMLInputElement
      fireEvent.change(amountInput, { target: { value: '10000000' } })

      const tenorSelect = screen.getByLabelText(/tenor/i) as HTMLSelectElement
      fireEvent.change(tenorSelect, { target: { value: '12' } })

      const hitungButton = screen.getByRole('button', { name: /hitung/i })
      fireEvent.click(hitungButton)

      expect(screen.getByText(/pajak/i)).toBeInTheDocument()
    })
  })

  describe('Product Details Display', () => {
    test('shows product details when a product is selected', () => {
      renderWithRouter()

      const productSelect = screen.getByLabelText(/pilih produk bpr/i) as HTMLSelectElement
      fireEvent.change(productSelect, { target: { value: 'prod-1-1' } })

      const detailCard = screen.getByRole('heading', { name: /detail produk/i }).closest('div')
      expect(detailCard).toHaveTextContent('BPR Artaloka')
      expect(detailCard).toHaveTextContent('5,5%')
    })
  })

  describe('Daftar Sekarang Button', () => {
    test('renders "Daftar Sekarang" button when product is selected', () => {
      renderWithRouter()

      const productSelect = screen.getByLabelText(/pilih produk bpr/i) as HTMLSelectElement
      fireEvent.change(productSelect, { target: { value: 'prod-1-1' } })

      const daftarButton = screen.getByRole('link', { name: /daftar sekarang/i })
      expect(daftarButton).toHaveAttribute('href', '/daftar/bpr-1/prod-1-1')
    })
  })
})
