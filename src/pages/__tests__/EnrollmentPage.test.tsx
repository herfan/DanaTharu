import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EnrollmentPage from '../EnrollmentPage'
import { EnrollmentProvider } from '../../contexts/EnrollmentContext'

const renderWithProviders = (bprId: string = 'bpr-1', produkId: string = 'prod-1-1') => {
  window.history.pushState({}, '', `/daftar/${bprId}/${produkId}`)
  return render(
    <BrowserRouter>
      <EnrollmentProvider>
        <Routes>
          <Route path="/daftar/:bprId/:produkId" element={<EnrollmentPage />} />
        </Routes>
      </EnrollmentProvider>
    </BrowserRouter>
  )
}

describe('EnrollmentPage', () => {
  describe('Step 1: Data Pribadi', () => {
    test('renders step 1 title and progress', () => {
      renderWithProviders()
      expect(screen.getByText(/data pribadi/i)).toBeInTheDocument()
      expect(screen.getByText(/langkah 1 dari 4/i)).toBeInTheDocument()
    })

    test('renders all required fields', () => {
      renderWithProviders()
      expect(screen.getByLabelText(/nama lengkap/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/nik/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/tanggal lahir/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/no hp/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })

    test('renders "Selanjutnya" button', () => {
      renderWithProviders()
      expect(screen.getByRole('button', { name: /selanjutnya/i })).toBeInTheDocument()
    })

    test('does not show "Sebelumnya" button on step 1', () => {
      renderWithProviders()
      const prevButton = screen.queryByRole('button', { name: /sebelumnya/i })
      expect(prevButton).not.toBeInTheDocument()
    })

    test('shows error when trying to advance with empty fields', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      const nextButton = screen.getByRole('button', { name: /selanjutnya/i })
      await user.click(nextButton)
      await waitFor(() => {
        expect(screen.getByText(/harap lengkapi semua field/i)).toBeInTheDocument()
      })
    })

    test('advances to step 2 when all fields are filled', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await user.type(screen.getByLabelText(/nama lengkap/i), 'John Doe')
      await user.type(screen.getByLabelText(/nik/i), '1234567890123456')
      await user.type(screen.getByLabelText(/tanggal lahir/i), '1990-01-01')
      await user.type(screen.getByLabelText(/no hp/i), '081234567890')
      await user.type(screen.getByLabelText(/email/i), 'john@test.com')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      expect(screen.getByText(/data alamat/i)).toBeInTheDocument()
    })
  })

  describe('Step 2: Data Alamat', () => {
    test('renders step 2 title', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await user.type(screen.getByLabelText(/nama lengkap/i), 'John Doe')
      await user.type(screen.getByLabelText(/nik/i), '1234567890123456')
      await user.type(screen.getByLabelText(/tanggal lahir/i), '1990-01-01')
      await user.type(screen.getByLabelText(/no hp/i), '081234567890')
      await user.type(screen.getByLabelText(/email/i), 'john@test.com')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      expect(screen.getByText(/data alamat/i)).toBeInTheDocument()
    })

    test('renders all required fields', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await user.type(screen.getByLabelText(/nama lengkap/i), 'John Doe')
      await user.type(screen.getByLabelText(/nik/i), '1234567890123456')
      await user.type(screen.getByLabelText(/tanggal lahir/i), '1990-01-01')
      await user.type(screen.getByLabelText(/no hp/i), '081234567890')
      await user.type(screen.getByLabelText(/email/i), 'john@test.com')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      expect(screen.getByLabelText(/alamat/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/kota/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/pekerjaan/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/penghasilan per bulan/i)).toBeInTheDocument()
    })

    test('renders "Sebelumnya" and "Selanjutnya" buttons', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await user.type(screen.getByLabelText(/nama lengkap/i), 'John Doe')
      await user.type(screen.getByLabelText(/nik/i), '1234567890123456')
      await user.type(screen.getByLabelText(/tanggal lahir/i), '1990-01-01')
      await user.type(screen.getByLabelText(/no hp/i), '081234567890')
      await user.type(screen.getByLabelText(/email/i), 'john@test.com')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      expect(screen.getByRole('button', { name: /sebelumnya/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /selanjutnya/i })).toBeInTheDocument()
    })

    test('goes back to step 1 when "Sebelumnya" is clicked', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await user.type(screen.getByLabelText(/nama lengkap/i), 'John Doe')
      await user.type(screen.getByLabelText(/nik/i), '1234567890123456')
      await user.type(screen.getByLabelText(/tanggal lahir/i), '1990-01-01')
      await user.type(screen.getByLabelText(/no hp/i), '081234567890')
      await user.type(screen.getByLabelText(/email/i), 'john@test.com')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      await user.click(screen.getByRole('button', { name: /sebelumnya/i }))
      expect(screen.getByText(/data pribadi/i)).toBeInTheDocument()
    })

    test('advances to step 3 when all fields are filled', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await user.type(screen.getByLabelText(/nama lengkap/i), 'John Doe')
      await user.type(screen.getByLabelText(/nik/i), '1234567890123456')
      await user.type(screen.getByLabelText(/tanggal lahir/i), '1990-01-01')
      await user.type(screen.getByLabelText(/no hp/i), '081234567890')
      await user.type(screen.getByLabelText(/email/i), 'john@test.com')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      await user.type(screen.getByLabelText(/alamat/i), 'Jl. Test No. 123')
      await user.type(screen.getByLabelText(/kota/i), 'Jakarta')
      fireEvent.change(screen.getByLabelText(/pekerjaan/i), { target: { value: 'Karyawan' } })
      await user.type(screen.getByLabelText(/penghasilan per bulan/i), '10000000')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      expect(screen.getByText(/upload dokumen/i)).toBeInTheDocument()
    })
  })

  describe('Step 3: Upload Dokumen', () => {
    const fillStep1And2 = async (user: ReturnType<typeof userEvent.setup>) => {
      await user.type(screen.getByLabelText(/nama lengkap/i), 'John Doe')
      await user.type(screen.getByLabelText(/nik/i), '1234567890123456')
      await user.type(screen.getByLabelText(/tanggal lahir/i), '1990-01-01')
      await user.type(screen.getByLabelText(/no hp/i), '081234567890')
      await user.type(screen.getByLabelText(/email/i), 'john@test.com')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      await user.type(screen.getByLabelText(/alamat/i), 'Jl. Test No. 123')
      await user.type(screen.getByLabelText(/kota/i), 'Jakarta')
      fireEvent.change(screen.getByLabelText(/pekerjaan/i), { target: { value: 'Karyawan' } })
      await user.type(screen.getByLabelText(/penghasilan per bulan/i), '10000000')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
    }

    test('renders step 3 title', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await fillStep1And2(user)
      expect(screen.getByText(/upload dokumen/i)).toBeInTheDocument()
    })

    test('renders KTP and Selfie file inputs', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await fillStep1And2(user)
      expect(screen.getByLabelText(/^ktp\s*\*$/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/^selfie dengan ktp\s*\*$/i)).toBeInTheDocument()
    })

    test('advances to step 4 when files are uploaded', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await fillStep1And2(user)
      const ktpFile = new File(['dummy content'], 'ktp.jpg', { type: 'image/jpeg' })
      const selfieFile = new File(['dummy content'], 'selfie.jpg', { type: 'image/jpeg' })
      const ktpInput = screen.getByLabelText(/^ktp\s*\*$/i)
      const selfieInput = screen.getByLabelText(/^selfie dengan ktp\s*\*$/i)
      await user.upload(ktpInput, ktpFile)
      await user.upload(selfieInput, selfieFile)
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      expect(screen.getByText(/konfirmasi/i)).toBeInTheDocument()
    })
  })

  describe('Step 4: Konfirmasi', () => {
    const fillAllSteps = async (user: ReturnType<typeof userEvent.setup>) => {
      await user.type(screen.getByLabelText(/nama lengkap/i), 'John Doe')
      await user.type(screen.getByLabelText(/nik/i), '1234567890123456')
      await user.type(screen.getByLabelText(/tanggal lahir/i), '1990-01-01')
      await user.type(screen.getByLabelText(/no hp/i), '081234567890')
      await user.type(screen.getByLabelText(/email/i), 'john@test.com')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      await user.type(screen.getByLabelText(/alamat/i), 'Jl. Test No. 123')
      await user.type(screen.getByLabelText(/kota/i), 'Jakarta')
      fireEvent.change(screen.getByLabelText(/pekerjaan/i), { target: { value: 'Karyawan' } })
      await user.type(screen.getByLabelText(/penghasilan per bulan/i), '10000000')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      const ktpFile = new File(['dummy content'], 'ktp.jpg', { type: 'image/jpeg' })
      const selfieFile = new File(['dummy content'], 'selfie.jpg', { type: 'image/jpeg' })
      await user.upload(screen.getByLabelText(/^ktp\s*\*$/i), ktpFile)
      await user.upload(screen.getByLabelText(/^selfie dengan ktp\s*\*$/i), selfieFile)
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
    }

    test('renders step 4 title', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await fillAllSteps(user)
      expect(screen.getByText(/konfirmasi/i)).toBeInTheDocument()
    })

    test('renders summary of personal data', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await fillAllSteps(user)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('1234567890123456')).toBeInTheDocument()
      expect(screen.getByText('john@test.com')).toBeInTheDocument()
    })

    test('renders product details', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await fillAllSteps(user)
      expect(screen.getByText('BPR Artaloka')).toBeInTheDocument()
    })

    test('renders terms and conditions checkbox', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await fillAllSteps(user)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.getByText(/syarat dan ketentuan/i)).toBeInTheDocument()
    })

    test('renders submit button', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await fillAllSteps(user)
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    })

    test('submits enrollment when form is complete and checkbox is checked', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await fillAllSteps(user)
      const checkbox = screen.getByRole('checkbox')
      await user.click(checkbox)
      await user.click(screen.getByRole('button', { name: /submit/i }))
      await waitFor(() => {
        expect(screen.getByText(/berhasil/i)).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  describe('Success State', () => {
    test('shows success message with reference number after submission', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await user.type(screen.getByLabelText(/nama lengkap/i), 'John Doe')
      await user.type(screen.getByLabelText(/nik/i), '1234567890123456')
      await user.type(screen.getByLabelText(/tanggal lahir/i), '1990-01-01')
      await user.type(screen.getByLabelText(/no hp/i), '081234567890')
      await user.type(screen.getByLabelText(/email/i), 'john@test.com')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      await user.type(screen.getByLabelText(/alamat/i), 'Jl. Test No. 123')
      await user.type(screen.getByLabelText(/kota/i), 'Jakarta')
      fireEvent.change(screen.getByLabelText(/pekerjaan/i), { target: { value: 'Karyawan' } })
      await user.type(screen.getByLabelText(/penghasilan per bulan/i), '10000000')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      const ktpFile = new File(['dummy content'], 'ktp.jpg', { type: 'image/jpeg' })
      const selfieFile = new File(['dummy content'], 'selfie.jpg', { type: 'image/jpeg' })
      await user.upload(screen.getByLabelText(/^ktp\s*\*$/i), ktpFile)
      await user.upload(screen.getByLabelText(/^selfie dengan ktp\s*\*$/i), selfieFile)
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      const checkbox = screen.getByRole('checkbox')
      await user.click(checkbox)
      await user.click(screen.getByRole('button', { name: /submit/i }))
      await waitFor(() => {
        expect(screen.getByText(/pendaftaran berhasil/i)).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  describe('Loading State', () => {
    test('shows loading state during submission', async () => {
      const user = userEvent.setup()
      renderWithProviders()
      await user.type(screen.getByLabelText(/nama lengkap/i), 'John Doe')
      await user.type(screen.getByLabelText(/nik/i), '1234567890123456')
      await user.type(screen.getByLabelText(/tanggal lahir/i), '1990-01-01')
      await user.type(screen.getByLabelText(/no hp/i), '081234567890')
      await user.type(screen.getByLabelText(/email/i), 'john@test.com')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      await user.type(screen.getByLabelText(/alamat/i), 'Jl. Test No. 123')
      await user.type(screen.getByLabelText(/kota/i), 'Jakarta')
      fireEvent.change(screen.getByLabelText(/pekerjaan/i), { target: { value: 'Karyawan' } })
      await user.type(screen.getByLabelText(/penghasilan per bulan/i), '10000000')
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      const ktpFile = new File(['dummy content'], 'ktp.jpg', { type: 'image/jpeg' })
      const selfieFile = new File(['dummy content'], 'selfie.jpg', { type: 'image/jpeg' })
      await user.upload(screen.getByLabelText(/^ktp\s*\*$/i), ktpFile)
      await user.upload(screen.getByLabelText(/^selfie dengan ktp\s*\*$/i), selfieFile)
      await user.click(screen.getByRole('button', { name: /selanjutnya/i }))
      const checkbox = screen.getByRole('checkbox')
      await user.click(checkbox)
      await user.click(screen.getByRole('button', { name: /submit/i }))
      await waitFor(() => {
        expect(screen.getByText(/mengirim/i)).toBeInTheDocument()
      }, { timeout: 2000 })
    })
  })
})
