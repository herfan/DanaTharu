import { render, screen, fireEvent } from '@testing-library/react'
import { ComparisonProvider, useComparison } from '../ComparisonContext'

const TestConsumer = () => {
  const { comparisonList, addToComparison, removeFromComparison, clearComparison, isInComparison, canAddMore } = useComparison()

  return (
    <div>
      <span data-testid="count">{comparisonList.length}</span>
      <span data-testid="can-add">{canAddMore ? 'yes' : 'no'}</span>
      <button onClick={() => addToComparison('product-1')}>Add 1</button>
      <button onClick={() => addToComparison('product-2')}>Add 2</button>
      <button onClick={() => addToComparison('product-3')}>Add 3</button>
      <button onClick={() => addToComparison('product-4')}>Add 4</button>
      <button onClick={() => removeFromComparison('product-1')}>Remove 1</button>
      <button onClick={() => clearComparison()}>Clear</button>
      <span data-testid="in-1">{isInComparison('product-1') ? 'yes' : 'no'}</span>
      <span data-testid="in-2">{isInComparison('product-2') ? 'yes' : 'no'}</span>
    </div>
  )
}

const renderWithContext = () => {
  return render(
    <ComparisonProvider>
      <TestConsumer />
    </ComparisonProvider>
  )
}

describe('ComparisonContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('starts with empty comparison list', () => {
    renderWithContext()
    expect(screen.getByTestId('count').textContent).toBe('0')
  })

  test('canAddMore returns true when list is empty', () => {
    renderWithContext()
    expect(screen.getByTestId('can-add').textContent).toBe('yes')
  })

  test('addToComparison adds product to list', () => {
    renderWithContext()
    fireEvent.click(screen.getByText('Add 1'))
    expect(screen.getByTestId('count').textContent).toBe('1')
    expect(screen.getByTestId('in-1').textContent).toBe('yes')
  })

  test('addToComparison ignores duplicate product', () => {
    renderWithContext()
    fireEvent.click(screen.getByText('Add 1'))
    fireEvent.click(screen.getByText('Add 1'))
    expect(screen.getByTestId('count').textContent).toBe('1')
  })

  test('addToComparison ignores when max 3 products reached', () => {
    renderWithContext()
    fireEvent.click(screen.getByText('Add 1'))
    fireEvent.click(screen.getByText('Add 2'))
    fireEvent.click(screen.getByText('Add 3'))
    fireEvent.click(screen.getByText('Add 4'))
    expect(screen.getByTestId('count').textContent).toBe('3')
    expect(screen.getByTestId('in-1').textContent).toBe('yes')
    expect(screen.getByTestId('in-2').textContent).toBe('yes')
    expect(screen.getByTestId('can-add').textContent).toBe('no')
  })

  test('removeFromComparison removes product from list', () => {
    renderWithContext()
    fireEvent.click(screen.getByText('Add 1'))
    fireEvent.click(screen.getByText('Add 2'))
    expect(screen.getByTestId('count').textContent).toBe('2')
    fireEvent.click(screen.getByText('Remove 1'))
    expect(screen.getByTestId('count').textContent).toBe('1')
    expect(screen.getByTestId('in-1').textContent).toBe('no')
    expect(screen.getByTestId('in-2').textContent).toBe('yes')
  })

  test('clearComparison clears all products', () => {
    renderWithContext()
    fireEvent.click(screen.getByText('Add 1'))
    fireEvent.click(screen.getByText('Add 2'))
    expect(screen.getByTestId('count').textContent).toBe('2')
    fireEvent.click(screen.getByText('Clear'))
    expect(screen.getByTestId('count').textContent).toBe('0')
    expect(screen.getByTestId('can-add').textContent).toBe('yes')
  })

  test('persists to localStorage with key danatharu-comparison', () => {
    renderWithContext()
    fireEvent.click(screen.getByText('Add 1'))
    fireEvent.click(screen.getByText('Add 2'))
    const stored = localStorage.getItem('danatharu-comparison')
    expect(stored).toBe(JSON.stringify(['product-1', 'product-2']))
  })

  test('loads from localStorage on init', () => {
    localStorage.setItem('danatharu-comparison', JSON.stringify(['product-1', 'product-3']))
    renderWithContext()
    expect(screen.getByTestId('count').textContent).toBe('2')
    expect(screen.getByTestId('in-1').textContent).toBe('yes')
  })
})
