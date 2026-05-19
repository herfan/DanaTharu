import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '../Modal'

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Test Modal',
    children: <div>Modal content</div>,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('renders when isOpen is true', () => {
    render(<Modal {...defaultProps} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  test('displays title', () => {
    render(<Modal {...defaultProps} />)
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
  })

  test('displays children content', () => {
    render(<Modal {...defaultProps} />)
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  test('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<Modal {...defaultProps} />)
    const closeButton = screen.getByRole('button', { name: /close/i })
    await user.click(closeButton)
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  test('calls onClose when backdrop is clicked', async () => {
    render(<Modal {...defaultProps} />)
    const backdrop = screen.getByTestId('modal-backdrop')
    fireEvent.click(backdrop)
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  test('calls onClose when Escape key is pressed', async () => {
    const user = userEvent.setup()
    render(<Modal {...defaultProps} />)
    await user.keyboard('{Escape}')
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  test('applies sm size class', () => {
    render(<Modal {...defaultProps} size="sm" />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('max-w-sm')
  })

  test('applies md size class by default', () => {
    render(<Modal {...defaultProps} />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('max-w-md')
  })

  test('applies lg size class', () => {
    render(<Modal {...defaultProps} size="lg" />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('max-w-lg')
  })

  test('applies xl size class', () => {
    render(<Modal {...defaultProps} size="xl" />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('max-w-xl')
  })

  test('has accessible role and aria-modal', () => {
    render(<Modal {...defaultProps} />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  test('has aria-labelledby pointing to title', () => {
    render(<Modal {...defaultProps} />)
    const dialog = screen.getByRole('dialog')
    const title = screen.getByText('Test Modal')
    expect(dialog).toHaveAttribute('aria-labelledby', title.id)
  })

  test('prevents body scroll when open', () => {
    render(<Modal {...defaultProps} />)
    expect(document.body).toHaveStyle({ overflow: 'hidden' })
  })

  test('restores body scroll when closed', () => {
    const { rerender } = render(<Modal {...defaultProps} />)
    expect(document.body).toHaveStyle({ overflow: 'hidden' })
    rerender(<Modal {...defaultProps} isOpen={false} />)
    expect(document.body).toHaveStyle({ overflow: '' })
  })
})
