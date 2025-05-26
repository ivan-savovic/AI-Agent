import { forwardRef, InputHTMLAttributes } from 'react'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`rounded-md px-3 py-2 bg-gray-900 border border-gray-700 text-amber-100 focus:outline-none focus:ring-amber-500 ${className}`}
      {...props}
    />
  )
)