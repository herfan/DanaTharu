import { render, screen } from '@testing-library/react'
import { Badge } from '../Badge'

describe('Badge', () => {
  test('renders children text', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  test('applies default variant styles', () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText('Default')
    expect(badge).toHaveClass('bg-gray-100')
    expect(badge).toHaveClass('text-gray-800')
  })

  test('applies success variant styles', () => {
    render(<Badge variant="success">Success</Badge>)
    const badge = screen.getByText('Success')
    expect(badge).toHaveClass('bg-green-100')
    expect(badge).toHaveClass('text-green-800')
  })

  test('applies warning variant styles', () => {
    render(<Badge variant="warning">Warning</Badge>)
    const badge = screen.getByText('Warning')
    expect(badge).toHaveClass('bg-yellow-100')
    expect(badge).toHaveClass('text-yellow-800')
  })

  test('applies error variant styles', () => {
    render(<Badge variant="error">Error</Badge>)
    const badge = screen.getByText('Error')
    expect(badge).toHaveClass('bg-red-100')
    expect(badge).toHaveClass('text-red-800')
  })

  test('applies info variant styles', () => {
    render(<Badge variant="info">Info</Badge>)
    const badge = screen.getByText('Info')
    expect(badge).toHaveClass('bg-blue-100')
    expect(badge).toHaveClass('text-blue-800')
  })

  test('applies pill shape with rounded-full', () => {
    render(<Badge>Rounded</Badge>)
    const badge = screen.getByText('Rounded')
    expect(badge).toHaveClass('rounded-full')
  })

  test('applies small text size', () => {
    render(<Badge>Small Text</Badge>)
    const badge = screen.getByText('Small Text')
    expect(badge).toHaveClass('text-xs')
  })

  test('merges custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>)
    const badge = screen.getByText('Custom')
    expect(badge).toHaveClass('custom-class')
  })
})
