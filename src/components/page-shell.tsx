import * as React from 'react'
import { cn } from '../lib/cn'

export interface PageShellProps extends Omit<React.ComponentProps<'div'>, 'title'> {
  title: React.ReactNode
  headerActions?: React.ReactNode
  bodyClassName?: string
}

export function PageShell({
  title,
  headerActions,
  className,
  bodyClassName,
  children,
  ...props
}: PageShellProps) {
  return (
    <div className={cn('flex flex-col gap-9', className)} {...props}>
      <div className="flex flex-col justify-between gap-3.5 sm:flex-row sm:items-center">
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <h1 className="text-[2.15rem] font-bold leading-[1.02] tracking-[-0.035em] text-foreground">
              {title}
            </h1>
          </div>

          {headerActions ? <div className="flex shrink-0 items-center gap-3">{headerActions}</div> : null}
        </div>
      </div>

      <div className={cn(bodyClassName)}>{children}</div>
    </div>
  )
}
