import * as React from 'react'
import { cn } from '../lib/cn'

export interface SidebarShellProps extends React.ComponentProps<'aside'> {
  open?: boolean
}

export function SidebarShell({
  open = false,
  className,
  children,
  ...props
}: SidebarShellProps) {
  return (
    <aside
      className={cn(
        'sidebar-surface fixed inset-y-0 left-0 z-50 flex w-[288px] flex-col lg:translate-x-0',
        open ? 'sidebar-surface--open max-lg:translate-x-0' : 'max-lg:-translate-x-full',
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}
