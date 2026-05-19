import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error writing localStorage key "${key}":`, error)
    }
  }, [key, value])

  const handleStorage = useCallback((event: StorageEvent) => {
    if (event.key === key && event.newValue !== null) {
      try {
        setValue(JSON.parse(event.newValue) as T)
      } catch (error) {
        console.warn(`Error parsing storage event for key "${key}":`, error)
      }
    }
  }, [key])

  useEffect(() => {
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [handleStorage])

  return [value, setValue]
}
