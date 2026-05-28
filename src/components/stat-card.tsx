import * as React from 'react'
import { Card } from './card'
import { cn } from '../lib/cn'

export interface StatCardProps extends React.ComponentProps<'div'> {
  value: React.ReactNode
  icon?: React.ReactNode
  label?: React.ReactNode
  variant?: 'light' | 'dark'
  emphasis?: 'primary' | 'secondary'
}

export function StatCard({
  value,
  icon,
  label,
  variant = 'light',
  emphasis = 'secondary',
  className,
  ...props
}: StatCardProps) {
  const isDark = variant === 'dark'
  const isPrimary = emphasis === 'primary'

  return (
    <Card
      className={cn(
        'relative flex min-h-[120px] select-none overflow-hidden rounded-2xl border px-6 py-6 shadow-none',
        isDark
          ? 'border-foreground bg-foreground text-background'
          : isPrimary
            ? 'border-foreground bg-card text-card-foreground shadow-sm'
            : 'border-foreground/12 bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="space-y-2">
          <span
            className={cn(
              'block text-[3rem] font-bold leading-none tracking-[-0.05em]',
              isDark ? 'text-background' : 'text-foreground'
            )}
          >
            {value}
          </span>
        </div>

        {icon ? (
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border',
              isDark
                ? 'border-background/20 bg-background/10 text-background'
                : isPrimary
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-foreground/12 bg-muted text-foreground'
            )}
          >
            {icon}
          </div>
        ) : null}

        {!icon && label ? (
          <div
            className={cn(
              'inline-flex min-h-8 shrink-0 items-center rounded-xl border px-4 text-[0.75rem] font-medium',
              isDark
                ? 'border-background/20 bg-background/10 text-background'
                : isPrimary
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-foreground/12 bg-muted text-foreground'
            )}
          >
            {label}
          </div>
        ) : null}
      </div>
    </Card>
  )
}
