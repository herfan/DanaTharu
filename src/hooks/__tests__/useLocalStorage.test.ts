import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('returns initialValue when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))

    expect(result.current[0]).toBe('default')
  })

  it('reads existing value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'))

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))

    expect(result.current[0]).toBe('stored-value')
  })

  it('updates state and localStorage on setValue', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    act(() => {
      result.current[1]('new-value')
    })

    expect(result.current[0]).toBe('new-value')
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'))
  })

  it('handles complex objects', () => {
    const complexValue = { name: 'John', age: 30, active: true }
    const { result } = renderHook(() => useLocalStorage('user', complexValue))

    expect(result.current[0]).toEqual(complexValue)

    const updated = { name: 'Jane', age: 25, active: false }
    act(() => {
      result.current[1](updated)
    })

    expect(result.current[0]).toEqual(updated)
    expect(JSON.parse(localStorage.getItem('user')!)).toEqual(updated)
  })

  it('handles JSON parse errors gracefully', () => {
    localStorage.setItem('bad-key', 'invalid json{{{')
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { result } = renderHook(() => useLocalStorage('bad-key', 'fallback'))

    expect(result.current[0]).toBe('fallback')
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  it('handles JSON serialize errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const circular: any = {}
    circular.self = circular

    const { result } = renderHook(() => useLocalStorage('circular', 'initial'))

    act(() => {
      result.current[1](circular as any)
    })

    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  it('syncs across tabs via storage event', () => {
    const { result } = renderHook(() => useLocalStorage('shared-key', 'initial'))

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'shared-key',
          newValue: JSON.stringify('from-other-tab'),
        })
      )
    })

    expect(result.current[0]).toBe('from-other-tab')
  })

  it('ignores storage events for different keys', () => {
    const { result } = renderHook(() => useLocalStorage('my-key', 'initial'))

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'other-key',
          newValue: JSON.stringify('ignored'),
        })
      )
    })

    expect(result.current[0]).toBe('initial')
  })

  it('handles null values in localStorage', () => {
    localStorage.setItem('null-key', JSON.stringify(null))

    const { result } = renderHook(() => useLocalStorage('null-key', 'default'))

    expect(result.current[0]).toBeNull()
  })

  it('removes storage event listener on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useLocalStorage('cleanup-key', 'value'))

    unmount()

    expect(addEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function))

    addEventListenerSpy.mockRestore()
    removeEventListenerSpy.mockRestore()
  })
})
