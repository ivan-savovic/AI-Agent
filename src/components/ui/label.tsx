import { LabelHTMLAttributes } from 'react'

export const Label = ({ className = '', ...props }: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={`block text-sm font-medium ${className}`} {...props} />
)