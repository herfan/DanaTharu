import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface ComparisonContextType {
  comparisonList: string[]
  addToComparison: (productId: string) => void
  removeFromComparison: (productId: string) => void
  clearComparison: () => void
  isInComparison: (productId: string) => boolean
  canAddMore: () => boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [comparisonList, setComparisonList] = useLocalStorage<string[]>('danatharu-comparison', [])

  const addToComparison = useCallback((productId: string) => {
    setComparisonList(prev => {
      if (prev.includes(productId) || prev.length >= 3) {
        return prev
      }
      return [...prev, productId]
    })
  }, [setComparisonList])

  const removeFromComparison = useCallback((productId: string) => {
    setComparisonList(prev => prev.filter(id => id !== productId))
  }, [setComparisonList])

  const clearComparison = useCallback(() => {
    setComparisonList([])
  }, [setComparisonList])

  const isInComparison = useCallback((productId: string) => {
    return comparisonList.includes(productId)
  }, [comparisonList])

  const canAddMore = useCallback(() => {
    return comparisonList.length < 3
  }, [comparisonList])

  return (
    <ComparisonContext.Provider value={{ comparisonList, addToComparison, removeFromComparison, clearComparison, isInComparison, canAddMore }}>
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison(): ComparisonContextType {
  const context = useContext(ComparisonContext)
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider')
  }
  return context
}
