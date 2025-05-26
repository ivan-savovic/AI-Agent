import { HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-xl border p-4 ${className}`} {...props} />
}

export function CardHeader({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mb-4 ${className}`} {...props} />
}

export function CardTitle({ className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={`text-xl font-bold ${className}`} {...props} />
}

export function CardDescription({ className = '', ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-sm ${className}`} {...props} />
}

export function CardContent({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`space-y-4 ${className}`} {...props} />
}

export function CardFooter({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`pt-4 ${className}`} {...props} />
}