import { render, screen, fireEvent } from '@testing-library/react'
import { Carousel } from '../Carousel'

describe('Carousel', () => {
  const slides = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>,
  ]

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('renders all slides', () => {
    render(<Carousel>{slides}</Carousel>)
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
  })

  test('shows first slide by default', () => {
    render(<Carousel>{slides}</Carousel>)
    const slideContainer = screen.getByTestId('carousel-container')
    expect(slideContainer).toHaveTextContent('Slide 1')
  })

  test('shows next slide when next button is clicked', () => {
    render(<Carousel showArrows>{slides}</Carousel>)
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)
    expect(screen.getByTestId('carousel-container')).toHaveTextContent('Slide 2')
  })

  test('shows previous slide when previous button is clicked', () => {
    render(<Carousel showArrows>{slides}</Carousel>)
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)
    const prevButton = screen.getByRole('button', { name: /previous/i })
    fireEvent.click(prevButton)
    expect(screen.getByTestId('carousel-container')).toHaveTextContent('Slide 1')
  })

  test('loops to first slide when next is clicked on last slide', () => {
    render(<Carousel showArrows>{slides}</Carousel>)
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)
    expect(screen.getByTestId('carousel-container')).toHaveTextContent('Slide 1')
  })

  test('loops to last slide when previous is clicked on first slide', () => {
    render(<Carousel showArrows>{slides}</Carousel>)
    const prevButton = screen.getByRole('button', { name: /previous/i })
    fireEvent.click(prevButton)
    expect(screen.getByTestId('carousel-container')).toHaveTextContent('Slide 3')
  })

  test('shows dot indicators when showDots is true', () => {
    render(<Carousel showDots>{slides}</Carousel>)
    const dots = screen.getAllByRole('button', { name: /go to slide/i })
    expect(dots).toHaveLength(3)
  })

  test('does not show dot indicators when showDots is false', () => {
    render(<Carousel showDots={false}>{slides}</Carousel>)
    const dots = screen.queryAllByRole('button', { name: /go to slide/i })
    expect(dots).toHaveLength(0)
  })

  test('does not show arrows when showArrows is false', () => {
    render(<Carousel showArrows={false}>{slides}</Carousel>)
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument()
  })

  test('navigates to slide when dot is clicked', () => {
    render(<Carousel showDots>{slides}</Carousel>)
    const dots = screen.getAllByRole('button', { name: /go to slide/i })
    fireEvent.click(dots[2])
    expect(screen.getByTestId('carousel-container')).toHaveTextContent('Slide 3')
  })

  test('highlights active dot', () => {
    render(<Carousel showDots>{slides}</Carousel>)
    const dots = screen.getAllByRole('button', { name: /go to slide/i })
    expect(dots[0]).toHaveAttribute('aria-current', 'true')
  })

  test('auto plays slides at specified interval', () => {
    render(<Carousel autoPlay interval={1000}>{slides}</Carousel>)
    vi.advanceTimersByTime(1000)
    expect(screen.getByTestId('carousel-container')).toHaveTextContent('Slide 2')
    vi.advanceTimersByTime(1000)
    expect(screen.getByTestId('carousel-container')).toHaveTextContent('Slide 3')
  })

  test('stops auto play on hover', () => {
    render(<Carousel autoPlay interval={1000}>{slides}</Carousel>)
    const container = screen.getByTestId('carousel-container')
    fireEvent.mouseEnter(container)
    vi.advanceTimersByTime(1000)
    expect(screen.getByTestId('carousel-container')).toHaveTextContent('Slide 1')
  })

  test('supports touch swipe navigation', () => {
    render(<Carousel>{slides}</Carousel>)
    const container = screen.getByTestId('carousel-container')
    fireEvent.touchStart(container, { touches: [{ clientX: 100 }] })
    fireEvent.touchEnd(container, { changedTouches: [{ clientX: 50 }] })
    expect(screen.getByTestId('carousel-container')).toHaveTextContent('Slide 2')
  })

  test('applies custom className', () => {
    render(<Carousel className="custom-class">{slides}</Carousel>)
    const container = screen.getByTestId('carousel-wrapper')
    expect(container).toHaveClass('custom-class')
  })
})
