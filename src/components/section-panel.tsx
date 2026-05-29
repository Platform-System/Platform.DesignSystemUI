import * as React from 'react'
import { Card } from './card'
import { cn } from '../lib/cn'

export type SectionPanelProps = React.ComponentProps<typeof Card>

export function SectionPanel({ className, ...props }: SectionPanelProps) {
  return (
    <Card
      className={cn(
        'panel-surface relative flex flex-col gap-5 overflow-hidden rounded-2xl px-5 py-4 md:px-6 md:py-5',
        className
      )}
      {...props}
    />
  )
}
