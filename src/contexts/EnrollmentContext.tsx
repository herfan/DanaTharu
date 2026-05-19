import { createContext, useContext, useState, useCallback } from 'react'
import { EnrollmentData } from '../types'

interface EnrollmentContextType {
  currentStep: number
  formData: Partial<EnrollmentData>
  isSubmitting: boolean
  error: string | null
  nextStep: () => void
  prevStep: () => void
  updateFormData: (data: Partial<EnrollmentData>) => void
  submitEnrollment: () => Promise<boolean>
  resetEnrollment: () => void
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined)

export function EnrollmentProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<EnrollmentData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 4))
  }, [])

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }, [])

  const updateFormData = useCallback((data: Partial<EnrollmentData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }, [])

  const submitEnrollment = useCallback(async (): Promise<boolean> => {
    setIsSubmitting(true)
    setError(null)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return true
    } catch {
      setError('Submission failed')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const resetEnrollment = useCallback(() => {
    setCurrentStep(1)
    setFormData({})
    setIsSubmitting(false)
    setError(null)
  }, [])

  return (
    <EnrollmentContext.Provider value={{ currentStep, formData, isSubmitting, error, nextStep, prevStep, updateFormData, submitEnrollment, resetEnrollment }}>
      {children}
    </EnrollmentContext.Provider>
  )
}

export function useEnrollment(): EnrollmentContextType {
  const context = useContext(EnrollmentContext)
  if (!context) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider')
  }
  return context
}
