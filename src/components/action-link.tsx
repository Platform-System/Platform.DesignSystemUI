import * as React from 'react'
import { cn } from '../lib/cn'

export interface ActionLinkProps extends React.ComponentProps<'a'> {
  emphasis?: 'default' | 'strong'
}

export function ActionLink({ emphasis = 'default', className, ...props }: ActionLinkProps) {
  return (
    <a
      className={cn(
        'action-link-accent',
        emphasis === 'strong' ? 'inline-flex items-center gap-1.5 font-bold' : 'shrink-0 text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}
