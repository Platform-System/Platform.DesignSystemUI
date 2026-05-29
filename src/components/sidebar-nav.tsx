import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../lib/cn'

export interface SidebarSectionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  expanded?: boolean
}

export function SidebarSectionTrigger({
  expanded = false,
  className,
  children,
  ...props
}: SidebarSectionTriggerProps) {
  return (
    <button
      type="button"
      className={cn(
        'sidebar-section-trigger flex w-full items-center justify-between bg-transparent px-1.5 text-left text-[10px] font-extrabold uppercase tracking-[0.22em]',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        size={14}
        className={cn(
          'sidebar-section-trigger__chevron -rotate-90',
          expanded && 'sidebar-section-trigger__chevron--expanded rotate-0'
        )}
      />
    </button>
  )
}

export interface SidebarNavItemProps extends Omit<React.ComponentProps<'button'>, 'disabled'> {
  icon: React.ReactNode
  active?: boolean
  disabled?: boolean
  asChild?: boolean
  trailing?: React.ReactNode
}

export function SidebarNavItem({
  icon,
  active = false,
  disabled = false,
  asChild = false,
  trailing,
  className,
  children,
  ...props
}: SidebarNavItemProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        'sidebar-nav-item relative flex items-center justify-start gap-2.5 overflow-hidden rounded-2xl px-2.5 py-2.5 text-left text-sm font-semibold no-underline outline-none transition-all duration-250',
        active && 'sidebar-nav-item--active bg-transparent',
        disabled && 'sidebar-nav-item--disabled cursor-not-allowed opacity-45',
        className
      )}
      {...props}
      >
        <div
          className={cn(
            'sidebar-nav-item__icon flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-250',
            active && 'sidebar-nav-item__icon--active'
          )}
        >
          {icon}
        </div>
      <span className="min-w-0 text-left">{children}</span>
      {trailing ? <span className="ml-auto">{trailing}</span> : null}
    </Comp>
  )
}
