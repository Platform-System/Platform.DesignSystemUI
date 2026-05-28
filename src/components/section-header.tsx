import * as React from 'react'
import { cn } from '../lib/cn'

export interface SectionHeaderProps extends React.ComponentProps<'div'> {
  title: React.ReactNode
  actions?: React.ReactNode
}

export function SectionHeader({ title, actions, className, ...props }: SectionHeaderProps) {
  return (
    <div
      className={cn('flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between', className)}
      {...props}
    >
      <div>
        <h2 className="text-[1.9rem] font-semibold tracking-[-0.03em] text-foreground">{title}</h2>
      </div>

      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}
