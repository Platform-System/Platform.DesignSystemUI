import * as React from 'react'
import { Card } from './card'
import { cn } from '../lib/cn'

export interface RecordCardProps extends React.ComponentProps<typeof Card> {
  tone?: 'default' | 'warning' | 'danger'
  density?: 'comfortable' | 'compact'
}

export function RecordCard({
  tone = 'default',
  density = 'comfortable',
  className,
  ...props
}: RecordCardProps) {
  return (
    <Card
      className={cn(
        'admin-record-card relative flex flex-col overflow-hidden rounded-2xl',
        density === 'compact' ? 'gap-4 px-5 py-4 md:px-6 md:py-5' : 'gap-5 p-5 md:px-6 md:py-5',
        tone === 'warning' && 'admin-record-card--warning',
        tone === 'danger' && 'admin-record-card--danger',
        className
      )}
      {...props}
    />
  )
}
