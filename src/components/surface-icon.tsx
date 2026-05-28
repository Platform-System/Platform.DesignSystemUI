import * as React from 'react'
import { cn } from '../lib/cn'

export interface SurfaceIconProps extends React.ComponentProps<'div'> {
  tone?: 'surface' | 'tint' | 'warning'
  size?: 'sm' | 'md'
  elevated?: boolean
}

export function SurfaceIcon({
  tone = 'surface',
  size = 'md',
  elevated = false,
  className,
  ...props
}: SurfaceIconProps) {
  return (
    <div
      className={cn(
        'shrink-0 overflow-hidden rounded-2xl flex items-center justify-center',
        size === 'sm' ? 'h-12 w-12' : 'h-14 w-14',
        tone === 'surface' && 'admin-icon-surface',
        tone === 'tint' && 'admin-icon-tint',
        tone === 'warning' && 'admin-icon-warning',
        elevated && 'admin-icon-elevated',
        className
      )}
      {...props}
    />
  )
}
