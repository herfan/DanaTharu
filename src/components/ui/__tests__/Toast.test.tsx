import { render, screen, fireEvent } from '@testing-library/react'
import { Toast } from '../Toast'

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('renders with message', () => {
    render(<Toast message="Success!" onClose={vi.fn()} />)
    expect(screen.getByText('Success!')).toBeInTheDocument()
  })

  test('renders with success type', () => {
    render(<Toast message="Success!" type="success" onClose={vi.fn()} />)
    const toast = screen.getByRole('status')
    expect(toast).toHaveClass('bg-green-500')
  })

  test('renders with error type', () => {
    render(<Toast message="Error!" type="error" onClose={vi.fn()} />)
    const toast = screen.getByRole('status')
    expect(toast).toHaveClass('bg-red-500')
  })

  test('renders with warning type', () => {
    render(<Toast message="Warning!" type="warning" onClose={vi.fn()} />)
    const toast = screen.getByRole('status')
    expect(toast).toHaveClass('bg-yellow-500')
  })

  test('renders with info type', () => {
    render(<Toast message="Info!" type="info" onClose={vi.fn()} />)
    const toast = screen.getByRole('status')
    expect(toast).toHaveClass('bg-blue-500')
  })

  test('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn()
    render(<Toast message="Toast" onClose={handleClose} />)
    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  test('auto dismisses after duration', () => {
    const handleClose = vi.fn()
    render(<Toast message="Auto dismiss" onClose={handleClose} duration={2000} />)
    vi.advanceTimersByTime(2000)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  test('does not auto dismiss when duration is 0', () => {
    const handleClose = vi.fn()
    render(<Toast message="No dismiss" onClose={handleClose} duration={0} />)
    vi.advanceTimersByTime(5000)
    expect(handleClose).not.toHaveBeenCalled()
  })

  test('has slide-in animation class', () => {
    render(<Toast message="Animated" onClose={vi.fn()} />)
    const toast = screen.getByRole('status')
    expect(toast).toHaveClass('animate-slide-in')
  })

  test('applies custom className', () => {
    render(<Toast message="Custom" onClose={vi.fn()} className="custom-class" />)
    const toast = screen.getByRole('status')
    expect(toast).toHaveClass('custom-class')
  })

  test('renders with default type (info)', () => {
    render(<Toast message="Default" onClose={vi.fn()} />)
    const toast = screen.getByRole('status')
    expect(toast).toHaveClass('bg-blue-500')
  })
})
