import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500))

    expect(result.current).toBe('hello')
  })

  it('returns debounced value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )

    expect(result.current).toBe('initial')

    rerender({ value: 'updated', delay: 500 })

    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current).toBe('updated')
  })

  it('uses default delay of 500ms', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'test' } }
    )

    rerender({ value: 'changed' })

    act(() => {
      vi.advanceTimersByTime(499)
    })
    expect(result.current).toBe('test')

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(result.current).toBe('changed')
  })

  it('resets timer when value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'first' } }
    )

    rerender({ value: 'second' })
    act(() => {
      vi.advanceTimersByTime(200)
    })

    rerender({ value: 'third' })
    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(result.current).toBe('first')

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toBe('third')
  })

  it('works with different value types', () => {
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: 42 } }
    )

    numberRerender({ value: 100 })
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(numberResult.current).toBe(100)

    const { result: objectResult, rerender: objectRerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: { a: 1 } } }
    )

    const newObj = { a: 2, b: 2 }
    objectRerender({ value: newObj })
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(objectResult.current).toEqual(newObj)

    const { result: arrayResult, rerender: arrayRerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: [1, 2] } }
    )

    const newArr = [3, 4]
    arrayRerender({ value: newArr })
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(arrayResult.current).toEqual(newArr)
  })

  it('cleans up timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('test', 500))

    unmount()

    act(() => {
      vi.advanceTimersByTime(500)
    })
  })
})
