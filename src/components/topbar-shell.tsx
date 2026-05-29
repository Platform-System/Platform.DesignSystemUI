import * as React from 'react'
import { cn } from '../lib/cn'

export type TopbarShellProps = React.ComponentProps<'header'>

export function TopbarShell({ className, ...props }: TopbarShellProps) {
  return (
    <header
      className={cn(
        'topbar-surface sticky top-0 z-40 flex h-20 items-center justify-between px-10 max-lg:px-5',
        className
      )}
      {...props}
    />
  )
}
