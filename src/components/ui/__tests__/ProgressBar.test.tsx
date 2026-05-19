import { render, screen } from '@testing-library/react'
import { ProgressBar } from '../ProgressBar'

describe('ProgressBar', () => {
  test('renders with default variant', () => {
    render(<ProgressBar value={50} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toBeInTheDocument()
    expect(bar).toHaveClass('bg-danatharu-green')
  })

  test('renders with value', () => {
    render(<ProgressBar value={75} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '75')
  })

  test('renders with label', () => {
    render(<ProgressBar value={50} label="Upload Progress" />)
    expect(screen.getByText('Upload Progress')).toBeInTheDocument()
  })

  test('shows value when showValue is true', () => {
    render(<ProgressBar value={65} showValue />)
    expect(screen.getByText('65%')).toBeInTheDocument()
  })

  test('does not show value when showValue is false', () => {
    render(<ProgressBar value={65} showValue={false} />)
    expect(screen.queryByText('65%')).not.toBeInTheDocument()
  })

  test('applies success variant styles', () => {
    render(<ProgressBar value={50} variant="success" />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveClass('bg-green-500')
  })

  test('applies warning variant styles', () => {
    render(<ProgressBar value={50} variant="warning" />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveClass('bg-yellow-500')
  })

  test('applies custom className', () => {
    render(<ProgressBar value={50} className="custom-class" />)
    const container = screen.getByTestId('progress-bar-container')
    expect(container).toHaveClass('custom-class')
  })

  test('has correct aria attributes', () => {
    render(<ProgressBar value={40} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
    expect(bar).toHaveAttribute('aria-valuenow', '40')
  })

  test('clamps value to 0-100 range', () => {
    const { rerender } = render(<ProgressBar value={-10} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')

    rerender(<ProgressBar value={150} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })

  test('renders with 0 value', () => {
    render(<ProgressBar value={0} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '0')
  })

  test('renders with 100 value', () => {
    render(<ProgressBar value={100} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '100')
  })
})
