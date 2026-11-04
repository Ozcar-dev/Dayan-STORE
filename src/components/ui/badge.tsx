import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'limited' | 'sold-out'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-secondary text-secondary-foreground',
  limited: 'bg-accent text-accent-foreground',
  'sold-out': 'bg-foreground text-background',
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-3 py-1 text-xs font-bold',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}