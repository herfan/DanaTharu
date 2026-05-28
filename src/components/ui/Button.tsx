import { memo, type ButtonHTMLAttributes, type ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantClasses: Record<string, string> = {
  primary: 'bg-danatharu-green text-white hover:bg-opacity-90 focus:ring-danatharu-gold',
  secondary: 'bg-danatharu-gold text-white hover:bg-opacity-90 focus:ring-danatharu-green',
  outline: 'border-2 border-danatharu-green text-danatharu-green hover:bg-danatharu-green hover:text-white focus:ring-danatharu-green',
  ghost: 'bg-transparent text-danatharu-green hover:bg-gray-100 focus:ring-danatharu-green',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const Button = memo(function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        font-semibold rounded-lg transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  )
})
