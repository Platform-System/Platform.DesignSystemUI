import * as React from 'react'
import { cn } from '../lib/cn'

export interface InfoPanelProps extends React.ComponentProps<'div'> {
  subtle?: boolean
}

export function InfoPanel({ subtle = false, className, ...props }: InfoPanelProps) {
  return (
    <div
      className={cn(
        subtle ? 'admin-info-panel-subtle' : 'admin-info-panel',
        className
      )}
      {...props}
    />
  )
}
