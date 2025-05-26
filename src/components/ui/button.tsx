import { forwardRef, ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', className = '', ...props }, ref) => {
    const base = 'rounded-lg font-medium transition'
    const variantStyles =
      variant === 'default'
        ? 'bg-amber-600 hover:bg-amber-500 text-black'
        : 'border border-gray-600 text-amber-100 hover:bg-gray-800'
    const sizeStyles = size === 'sm' ? 'text-sm px-2 py-1' : 'px-3 py-2'
    return (
      <button ref={ref} className={`${base} ${variantStyles} ${sizeStyles} ${className}`} {...props} />
    )
  }
)