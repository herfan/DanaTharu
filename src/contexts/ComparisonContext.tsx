import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const MAX_COMPARISON_ITEMS = 3

interface ComparisonContextType {
  comparisonList: string[]
  addToComparison: (productId: string) => void
  removeFromComparison: (productId: string) => void
  clearComparison: () => void
  isInComparison: (productId: string) => boolean
  canAddMore: boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [comparisonList, setComparisonList] = useLocalStorage<string[]>('danatharu-comparison', [])

  const addToComparison = useCallback((productId: string) => {
    setComparisonList(prev => {
      if (prev.includes(productId) || prev.length >= MAX_COMPARISON_ITEMS) {
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

  const canAddMore = comparisonList.length < MAX_COMPARISON_ITEMS

  const contextValue = useMemo(() => ({
    comparisonList,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    canAddMore,
  }), [comparisonList, addToComparison, removeFromComparison, clearComparison, isInComparison, canAddMore])

  return (
    <ComparisonContext.Provider value={contextValue}>
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
