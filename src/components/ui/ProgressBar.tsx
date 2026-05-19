export interface ProgressBarProps {
  value: number
  label?: string
  showValue?: boolean
  variant?: 'default' | 'success' | 'warning'
  className?: string
}

const variantClasses: Record<string, string> = {
  default: 'bg-danatharu-green',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
}

export function ProgressBar({
  value,
  label,
  showValue = false,
  variant = 'default',
  className = '',
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div data-testid="progress-bar-container" className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showValue && <span className="text-sm font-medium text-gray-700">{clampedValue}%</span>}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          className={`h-full rounded-full transition-all duration-300 ease-in-out ${variantClasses[variant]}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}
