import { memo, type ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default'
  className?: string
}

const variantClasses: Record<string, string> = {
  success: 'bg-danatharu-green/10 text-danatharu-green',
  warning: 'bg-danatharu-gold/10 text-danatharu-gold',
  error: 'bg-red-100 text-red-800',
  info: 'bg-danatharu-blue/10 text-danatharu-blue',
  default: 'bg-gray-100 text-gray-800',
}

export const Badge = memo(function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
})
