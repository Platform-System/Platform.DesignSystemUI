import * as React from 'react'
import { cn } from '../lib/cn'

export interface BrandMarkProps extends React.ComponentProps<'div'> {
  letter: React.ReactNode
}

export function BrandMark({ letter, className, ...props }: BrandMarkProps) {
  return (
    <div
      className={cn(
        'brand-mark-surface flex h-[42px] w-[42px] items-center justify-center rounded-xl font-black text-2xl',
        className
      )}
      {...props}
    >
      <span>{letter}</span>
    </div>
  )
}
