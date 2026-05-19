import type { ReactNode, ButtonHTMLAttributes, HTMLAttributes } from 'react'

export interface CardProps {
  children: ReactNode
  title?: string
  subtitle?: string
  variant?: 'default' | 'interactive'
  className?: string
  onClick?: () => void
}

export function Card({
  children,
  title,
  subtitle,
  variant = 'default',
  className = '',
  onClick,
}: CardProps) {
  const baseClasses = 'bg-white rounded-xl shadow-md p-6'
  const interactiveClasses = variant === 'interactive' ? 'hover:shadow-lg transition-shadow duration-200 cursor-pointer' : ''

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} ${interactiveClasses} ${className} text-left w-full`}
      >
        {title && <h3 className="text-lg font-semibold font-serif text-danatharu-blue">{title}</h3>}
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        {children}
      </button>
    )
  }

  return (
    <div className={`${baseClasses} ${interactiveClasses} ${className}`}>
      {title && <h3 className="text-lg font-semibold font-serif text-danatharu-blue">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      {children}
    </div>
  )
}
