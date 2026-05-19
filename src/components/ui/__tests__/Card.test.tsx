import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Card } from '../Card'

describe('Card', () => {
  test('renders children content', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  test('renders title when provided', () => {
    render(<Card title="Card Title">Content</Card>)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  test('renders subtitle when provided', () => {
    render(<Card title="Title" subtitle="Card Subtitle">Content</Card>)
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument()
  })

  test('applies default styles with padding, rounded corners, and shadow', () => {
    render(<Card>Styled Card</Card>)
    const card = screen.getByText('Styled Card').closest('div')
    expect(card).toHaveClass('bg-white')
    expect(card).toHaveClass('rounded-xl')
    expect(card).toHaveClass('shadow-md')
    expect(card).toHaveClass('p-6')
  })

  test('applies interactive variant styles when variant is interactive', () => {
    render(<Card variant="interactive">Interactive Card</Card>)
    const card = screen.getByText('Interactive Card').closest('div')
    expect(card).toHaveClass('hover:shadow-lg')
    expect(card).toHaveClass('transition-shadow')
  })

  test('renders as button when onClick is provided', () => {
    render(<Card onClick={() => {}}>Clickable Card</Card>)
    expect(screen.getByRole('button', { name: /clickable card/i })).toBeInTheDocument()
  })

  test('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Card onClick={handleClick}>Click me</Card>)
    await user.click(screen.getByRole('button', { name: /click me/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('renders as div when no onClick provided', () => {
    render(<Card>Non-clickable</Card>)
    const element = screen.getByText('Non-clickable')
    expect(element.closest('div')).not.toHaveAttribute('role', 'button')
  })

  test('merges custom className', () => {
    render(<Card className="custom-class">Custom Card</Card>)
    const card = screen.getByText('Custom Card').closest('div')
    expect(card).toHaveClass('custom-class')
  })
})
