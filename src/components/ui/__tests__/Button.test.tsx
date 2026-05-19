import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  test('renders with children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  test('renders as button element with type="button" by default', () => {
    render(<Button>Submit</Button>)
    const button = screen.getByRole('button', { name: /submit/i })
    expect(button).toHaveAttribute('type', 'button')
  })

  test('renders with custom type', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button', { name: /submit/i })).toHaveAttribute('type', 'submit')
  })

  test('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button', { name: /click me/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('is disabled when disabled prop is true', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button disabled onClick={handleClick}>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeDisabled()
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('applies primary variant styles by default', () => {
    render(<Button>Primary</Button>)
    const button = screen.getByRole('button', { name: /primary/i })
    expect(button).toHaveClass('bg-danatharu-green')
  })

  test('applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button', { name: /secondary/i })
    expect(button).toHaveClass('bg-danatharu-gold')
  })

  test('applies outline variant styles', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button', { name: /outline/i })
    expect(button).toHaveClass('border-2')
  })

  test('applies ghost variant styles', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const button = screen.getByRole('button', { name: /ghost/i })
    expect(button).toHaveClass('bg-transparent')
  })

  test('applies sm size styles', () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByRole('button', { name: /small/i })
    expect(button).toHaveClass('px-3')
    expect(button).toHaveClass('py-1.5')
    expect(button).toHaveClass('text-sm')
  })

  test('applies md size styles by default', () => {
    render(<Button>Medium</Button>)
    const button = screen.getByRole('button', { name: /medium/i })
    expect(button).toHaveClass('px-4')
    expect(button).toHaveClass('py-2')
    expect(button).toHaveClass('text-base')
  })

  test('applies lg size styles', () => {
    render(<Button size="lg">Large</Button>)
    const button = screen.getByRole('button', { name: /large/i })
    expect(button).toHaveClass('px-6')
    expect(button).toHaveClass('py-3')
    expect(button).toHaveClass('text-lg')
  })

  test('merges custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole('button', { name: /custom/i })
    expect(button).toHaveClass('custom-class')
  })
})
