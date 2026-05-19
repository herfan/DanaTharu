import type { SelectHTMLAttributes } from 'react'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  error?: string
  className?: string
}

export function Select({
  label,
  options,
  error,
  className = '',
  disabled = false,
  required = false,
  id,
  ...rest
}: SelectProps) {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`
  const descriptionId = `${selectId}-description`

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={selectId}
        disabled={disabled}
        required={required}
        aria-describedby={error ? descriptionId : undefined}
        aria-invalid={!!error}
        className={`
          w-full px-4 py-2 border rounded-lg transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-danatharu-gold focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={descriptionId} className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
