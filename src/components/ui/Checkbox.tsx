import type { InputHTMLAttributes, ReactNode } from 'react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
  className?: string
}

export function Checkbox({
  label,
  className = '',
  disabled = false,
  id,
  ...rest
}: CheckboxProps) {
  const checkboxId = id || `checkbox-${typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : ''}`

  return (
    <div className="flex items-center">
      <input
        id={checkboxId}
        type="checkbox"
        disabled={disabled}
        className={`
          h-4 w-4 rounded border-gray-300 text-danatharu-green
          focus:ring-danatharu-gold focus:ring-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...rest}
      />
      <label htmlFor={checkboxId} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
  )
}
