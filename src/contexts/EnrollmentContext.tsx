import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import type { EnrollmentData } from '../types'

type EnrollmentStep = 1 | 2 | 3 | 4

interface EnrollmentContextType {
  currentStep: EnrollmentStep
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
  const [currentStep, setCurrentStep] = useState<EnrollmentStep>(1)
  const [formData, setFormData] = useState<Partial<EnrollmentData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateStep = useCallback((step: EnrollmentStep, data: Partial<EnrollmentData>): boolean => {
    switch (step) {
      case 1:
        return !!(data.step1?.nama && data.step1?.nik && data.step1?.email && data.step1?.noHP)
      case 2:
        return !!(data.step2?.alamat && data.step2?.kota && data.step2?.pekerjaan)
      case 3:
        return !!(data.step3?.ktpFile && data.step3?.selfieFile)
      case 4:
        return !!(data.bprId && data.produkId && (data as any).step4?.agreed)
      default:
        return false
    }
  }, [])

  const nextStep = useCallback(() => {
    if (!validateStep(currentStep, formData)) {
      setError('Harap lengkapi semua field yang wajib diisi')
      return
    }
    setError(null)
    setCurrentStep(prev => Math.min(prev + 1, 4) as EnrollmentStep)
  }, [currentStep, formData, validateStep])

  const prevStep = useCallback(() => {
    setError(null)
    setCurrentStep(prev => Math.max(prev - 1, 1) as EnrollmentStep)
  }, [])

  const updateFormData = useCallback((data: Partial<EnrollmentData>) => {
    setFormData(prev => ({ ...prev, ...data }))
    setError(null)
  }, [])

  const submitEnrollment = useCallback(async (): Promise<boolean> => {
    setIsSubmitting(true)
    setError(null)
    try {
      if (!validateStep(currentStep, formData)) {
        throw new Error('Incomplete form data')
      }
      
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) {
            resolve(true)
          } else {
            reject(new Error('Network error'))
          }
        }, 1000)
      })
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Submission failed'
      setError(message)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [currentStep, formData, validateStep])

  const resetEnrollment = useCallback(() => {
    setCurrentStep(1)
    setFormData({})
    setIsSubmitting(false)
    setError(null)
  }, [])

  const contextValue = useMemo(() => ({
    currentStep,
    formData,
    isSubmitting,
    error,
    nextStep,
    prevStep,
    updateFormData,
    submitEnrollment,
    resetEnrollment,
  }), [currentStep, formData, isSubmitting, error, nextStep, prevStep, updateFormData, submitEnrollment, resetEnrollment])

  return (
    <EnrollmentContext.Provider value={contextValue}>
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
