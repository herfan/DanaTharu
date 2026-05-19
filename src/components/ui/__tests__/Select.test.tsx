import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from '../Select'

describe('Select', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  test('renders select element', () => {
    render(<Select options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  test('renders label when provided', () => {
    render(<Select label="Choose option" options={options} />)
    expect(screen.getByText('Choose option')).toBeInTheDocument()
  })

  test('renders all options', () => {
    render(<Select options={options} />)
    const select = screen.getByRole('combobox')
    const optionElements = select.querySelectorAll('option')
    expect(optionElements).toHaveLength(3)
  })

  test('renders as disabled when disabled prop is true', () => {
    render(<Select disabled options={options} />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  test('renders with required attribute', () => {
    render(<Select required options={options} />)
    expect(screen.getByRole('combobox')).toBeRequired()
  })

  test('displays selected value when provided', () => {
    render(<Select options={options} value="option2" onChange={() => {}} />)
    expect(screen.getByRole('combobox')).toHaveValue('option2')
  })

  test('calls onChange when selection changes', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Select options={options} onChange={handleChange} />)
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'option2')
    expect(handleChange).toHaveBeenCalled()
  })

  test('shows error message when error prop is provided', () => {
    render(<Select options={options} error="Please select an option" />)
    expect(screen.getByText('Please select an option')).toBeInTheDocument()
  })

  test('applies error styles when error prop is provided', () => {
    render(<Select options={options} error="Selection required" />)
    const select = screen.getByRole('combobox')
    expect(select).toHaveClass('border-red-500')
  })

  test('merges custom className', () => {
    render(<Select options={options} className="custom-class" />)
    expect(screen.getByRole('combobox')).toHaveClass('custom-class')
  })
})
