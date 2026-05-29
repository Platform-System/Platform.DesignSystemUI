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
        tone === 'surface' && 'surface-icon-shell',
        tone === 'tint' && 'surface-icon-shell--tint',
        tone === 'warning' && 'surface-icon-shell--warning',
        elevated && 'surface-icon-shell--elevated',
        className
      )}
      {...props}
    />
  )
}
