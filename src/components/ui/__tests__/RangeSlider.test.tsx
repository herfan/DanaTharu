import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RangeSlider } from '../RangeSlider'

describe('RangeSlider', () => {
  const defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    values: [20, 80] as [number, number],
    onChange: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders with label', () => {
    render(<RangeSlider {...defaultProps} label="Deposit Amount" />)
    expect(screen.getByText('Deposit Amount')).toBeInTheDocument()
  })

  test('renders two slider inputs', () => {
    render(<RangeSlider {...defaultProps} />)
    const sliders = screen.getAllByRole('slider')
    expect(sliders).toHaveLength(2)
  })

  test('displays current values above sliders', () => {
    render(<RangeSlider {...defaultProps} />)
    expect(screen.getByText('Rp 20')).toBeInTheDocument()
    expect(screen.getByText('Rp 80')).toBeInTheDocument()
  })

  test('applies min and max attributes to sliders', () => {
    render(<RangeSlider {...defaultProps} />)
    const [minSlider, maxSlider] = screen.getAllByRole('slider')
    expect(minSlider).toHaveAttribute('min', '0')
    expect(minSlider).toHaveAttribute('max', '100')
    expect(maxSlider).toHaveAttribute('min', '0')
    expect(maxSlider).toHaveAttribute('max', '100')
  })

  test('applies step attribute to sliders', () => {
    render(<RangeSlider {...defaultProps} step={5} />)
    const sliders = screen.getAllByRole('slider')
    sliders.forEach(slider => {
      expect(slider).toHaveAttribute('step', '5')
    })
  })

  test('sets initial values on sliders', () => {
    render(<RangeSlider {...defaultProps} />)
    const [minSlider, maxSlider] = screen.getAllByRole('slider')
    expect(minSlider).toHaveValue('20')
    expect(maxSlider).toHaveValue('80')
  })

  test('calls onChange when min slider changes', async () => {
    render(<RangeSlider {...defaultProps} />)
    const [minSlider] = screen.getAllByRole('slider')
    fireEvent.change(minSlider, { target: { value: '30' } })
    expect(defaultProps.onChange).toHaveBeenCalledWith([30, 80])
  })

  test('calls onChange when max slider changes', async () => {
    render(<RangeSlider {...defaultProps} />)
    const [, maxSlider] = screen.getAllByRole('slider')
    fireEvent.change(maxSlider, { target: { value: '90' } })
    expect(defaultProps.onChange).toHaveBeenCalledWith([20, 90])
  })

  test('applies custom className', () => {
    render(<RangeSlider {...defaultProps} className="custom-class" />)
    const container = screen.getByTestId('range-slider-container')
    expect(container).toHaveClass('custom-class')
  })

  test('has accessible aria-labels on sliders', () => {
    render(<RangeSlider {...defaultProps} label="Amount Range" />)
    const [minSlider, maxSlider] = screen.getAllByRole('slider')
    expect(minSlider).toHaveAttribute('aria-label', 'Minimum Amount Range')
    expect(maxSlider).toHaveAttribute('aria-label', 'Maximum Amount Range')
  })

  test('supports keyboard navigation with arrow keys', async () => {
    const user = userEvent.setup()
    render(<RangeSlider {...defaultProps} />)
    const [minSlider] = screen.getAllByRole('slider')
    minSlider.focus()
    await user.keyboard('{ArrowRight}')
    expect(defaultProps.onChange).toHaveBeenCalled()
  })

  test('prevents min value from exceeding max value', async () => {
    render(<RangeSlider {...defaultProps} />)
    const [minSlider] = screen.getAllByRole('slider')
    fireEvent.change(minSlider, { target: { value: '90' } })
    const lastCall = (defaultProps.onChange as ReturnType<typeof vi.fn>).mock.calls.at(-1)
    if (lastCall) {
      const [newValues] = lastCall
      expect(newValues[0]).toBeLessThanOrEqual(newValues[1])
    }
  })

  test('prevents max value from going below min value', async () => {
    render(<RangeSlider {...defaultProps} />)
    const [, maxSlider] = screen.getAllByRole('slider')
    fireEvent.change(maxSlider, { target: { value: '10' } })
    const lastCall = (defaultProps.onChange as ReturnType<typeof vi.fn>).mock.calls.at(-1)
    if (lastCall) {
      const [newValues] = lastCall
      expect(newValues[1]).toBeGreaterThanOrEqual(newValues[0])
    }
  })
})
