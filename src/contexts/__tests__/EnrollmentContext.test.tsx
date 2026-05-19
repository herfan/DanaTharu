import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { EnrollmentProvider, useEnrollment } from '../EnrollmentContext'

const TestConsumer = () => {
  const {
    currentStep,
    formData,
    isSubmitting,
    error,
    nextStep,
    prevStep,
    updateFormData,
    submitEnrollment,
    resetEnrollment,
  } = useEnrollment()

  return (
    <div>
      <span data-testid="step">{currentStep}</span>
      <span data-testid="submitting">{isSubmitting ? 'yes' : 'no'}</span>
      <span data-testid="error">{error ?? 'none'}</span>
      <span data-testid="nama">{formData.step1?.nama ?? ''}</span>
      <span data-testid="email">{formData.step1?.email ?? ''}</span>
      <button onClick={nextStep}>Next</button>
      <button onClick={prevStep}>Prev</button>
      <button onClick={() => updateFormData({ 
        step1: { nama: 'John', nik: '123456', tanggalLahir: '1990-01-01', noHP: '081234567890', email: 'john@test.com' },
        step2: { alamat: 'Jl. Test', kota: 'Jakarta', pekerjaan: 'Developer', penghasilan: 10000000 },
        step3: { ktpFile: new File([''], 'ktp.jpg'), selfieFile: new File([''], 'selfie.jpg') },
        bprId: 'bpr-1',
        produkId: 'prod-1-1',
      })}>
        Update
      </button>
      <button onClick={submitEnrollment}>Submit</button>
      <button onClick={resetEnrollment}>Reset</button>
    </div>
  )
}

const renderWithContext = () => {
  return render(
    <EnrollmentProvider>
      <TestConsumer />
    </EnrollmentProvider>
  )
}

describe('EnrollmentContext', () => {
  test('starts at step 1 with empty formData', () => {
    renderWithContext()
    expect(screen.getByTestId('step').textContent).toBe('1')
    expect(screen.getByTestId('nama').textContent).toBe('')
  })

  test('nextStep advances step up to max 4', () => {
    renderWithContext()
    fireEvent.click(screen.getByText('Update'))
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByTestId('step').textContent).toBe('2')
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByTestId('step').textContent).toBe('3')
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByTestId('step').textContent).toBe('4')
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByTestId('step').textContent).toBe('4')
  })

  test('prevStep goes back to min 1', () => {
    renderWithContext()
    fireEvent.click(screen.getByText('Update'))
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByTestId('step').textContent).toBe('3')
    fireEvent.click(screen.getByText('Prev'))
    expect(screen.getByTestId('step').textContent).toBe('2')
    fireEvent.click(screen.getByText('Prev'))
    expect(screen.getByTestId('step').textContent).toBe('1')
    fireEvent.click(screen.getByText('Prev'))
    expect(screen.getByTestId('step').textContent).toBe('1')
  })

  test('updateFormData merges new data', () => {
    renderWithContext()
    fireEvent.click(screen.getByText('Update'))
    expect(screen.getByTestId('nama').textContent).toBe('John')
    expect(screen.getByTestId('email').textContent).toBe('john@test.com')
  })

  test('submitEnrollment sets isSubmitting and returns success', async () => {
    renderWithContext()
    fireEvent.click(screen.getByText('Update'))
    fireEvent.click(screen.getByText('Submit'))
    expect(screen.getByTestId('submitting').textContent).toBe('yes')
    await waitFor(() => {
      expect(screen.getByTestId('submitting').textContent).toBe('no')
    }, { timeout: 2000 })
  })

  test('submitEnrollment clears error on success', async () => {
    renderWithContext()
    fireEvent.click(screen.getByText('Update'))
    fireEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(screen.getByTestId('error').textContent).toBe('none')
    }, { timeout: 2000 })
  })

  test('resetEnrollment resets all state', async () => {
    renderWithContext()
    fireEvent.click(screen.getByText('Update'))
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByTestId('step').textContent).toBe('2')
    expect(screen.getByTestId('nama').textContent).toBe('John')
    fireEvent.click(screen.getByText('Reset'))
    expect(screen.getByTestId('step').textContent).toBe('1')
    expect(screen.getByTestId('nama').textContent).toBe('')
  })

  test('does not persist to localStorage', () => {
    renderWithContext()
    fireEvent.click(screen.getByText('Update'))
    const keys = Object.keys(localStorage).filter(k => k.startsWith('danatharu'))
    expect(keys).toEqual([])
  })
})
