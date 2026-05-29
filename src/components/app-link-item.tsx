import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../lib/cn'

export interface AppLinkItemProps extends React.ComponentProps<'a'> {
  icon: React.ReactNode
  inactive?: boolean
  asChild?: boolean
}

export function AppLinkItem({
  icon,
  inactive = false,
  asChild = false,
  className,
  children,
  ...props
}: AppLinkItemProps) {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      className={cn(
        'app-link-item flex w-full items-center gap-1.5 rounded-xl border-0 px-1.5 py-1.5 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
        inactive ? 'pointer-events-none cursor-not-allowed opacity-40' : 'cursor-pointer',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'app-link-item__icon flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
          inactive && 'app-link-item__icon--inactive'
        )}
      >
        {icon}
      </div>
      <span className="min-w-0 text-[12.5px] font-semibold text-foreground">{children}</span>
    </Comp>
  )
}
