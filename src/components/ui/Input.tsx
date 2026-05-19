import type { InputHTMLAttributes, ReactNode } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  className?: string
}

export function Input({
  label,
  error,
  helperText,
  className = '',
  disabled = false,
  required = false,
  type = 'text',
  id,
  ...rest
}: InputProps) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-2 border rounded-lg transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-danatharu-gold focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...rest}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {!error && helperText && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}
