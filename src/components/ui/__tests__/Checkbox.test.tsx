import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../Checkbox'

describe('Checkbox', () => {
  test('renders checkbox input', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  test('renders label text', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  test('renders as checked when checked prop is true', () => {
    render(<Checkbox label="Checked" checked onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  test('renders as unchecked when checked prop is false', () => {
    render(<Checkbox label="Unchecked" checked={false} onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  test('renders as disabled when disabled prop is true', () => {
    render(<Checkbox label="Disabled" disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  test('calls onChange when clicked', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Checkbox label="Click me" onChange={handleChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test('does not call onChange when disabled', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Checkbox label="Disabled" disabled onChange={handleChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(handleChange).not.toHaveBeenCalled()
  })

  test('merges custom className', () => {
    render(<Checkbox label="Custom" className="custom-class" />)
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class')
  })
})
