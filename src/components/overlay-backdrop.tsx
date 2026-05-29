import * as React from 'react'
import { cn } from '../lib/cn'

export type OverlayBackdropProps = React.ComponentProps<'div'>

export function OverlayBackdrop({ className, ...props }: OverlayBackdropProps) {
  return <div className={cn('overlay-backdrop', className)} {...props} />
}
