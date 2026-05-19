import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../Input'

describe('Input', () => {
  test('renders input element', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  test('renders label when provided', () => {
    render(<Input label="Email address" placeholder="email@example.com" />)
    expect(screen.getByText('Email address')).toBeInTheDocument()
  })

  test('renders with correct type', () => {
    render(<Input type="email" placeholder="Email" />)
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email')
  })

  test('renders as text type by default', () => {
    render(<Input placeholder="Text input" />)
    expect(screen.getByPlaceholderText('Text input')).toHaveAttribute('type', 'text')
  })

  test('renders with required attribute', () => {
    render(<Input required placeholder="Required" />)
    expect(screen.getByPlaceholderText('Required')).toBeRequired()
  })

  test('renders as disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled" />)
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled()
  })

  test('displays value when provided', () => {
    render(<Input value="test value" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveValue('test value')
  })

  test('calls onChange when value changes', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Input onChange={handleChange} placeholder="Type here" />)
    const input = screen.getByPlaceholderText('Type here')
    await user.type(input, 'hello')
    expect(handleChange).toHaveBeenCalled()
  })

  test('shows error message when error prop is provided', () => {
    render(<Input error="This field is required" placeholder="Error input" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  test('applies error styles when error prop is provided', () => {
    render(<Input error="Invalid email" placeholder="Error input" />)
    const input = screen.getByPlaceholderText('Error input')
    expect(input).toHaveClass('border-red-500')
  })

  test('shows helper text when provided', () => {
    render(<Input helperText="Must be at least 8 characters" placeholder="Password" />)
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument()
  })

  test('does not show error message when no error prop', () => {
    render(<Input label="Test Input" placeholder="No error" />)
    expect(screen.queryByText(/This field is required/)).not.toBeInTheDocument()
  })

  test('merges custom className', () => {
    render(<Input className="custom-class" placeholder="Custom" />)
    expect(screen.getByPlaceholderText('Custom')).toHaveClass('custom-class')
  })
})
