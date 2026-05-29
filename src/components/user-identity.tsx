import * as React from 'react'
import { User } from 'lucide-react'
import { cn } from '../lib/cn'

export interface UserIdentityProps extends React.ComponentProps<'div'> {
  name: string
  avatarSrc?: string | null
  avatarAlt?: string
  showPresence?: boolean
}

export function UserIdentity({
  name,
  avatarSrc,
  avatarAlt,
  showPresence = false,
  className,
  ...props
}: UserIdentityProps) {
  return (
    <div className={cn('flex min-w-0 flex-1 items-center gap-3.5', className)} {...props}>
      <div className="relative flex-shrink-0">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={avatarAlt || name}
            className="user-identity__avatar h-10 w-10 rounded-xl object-cover"
          />
        ) : (
          <div className="user-identity__avatar-fallback flex h-10 w-10 items-center justify-center rounded-xl">
            <User size={20} strokeWidth={2.5} />
          </div>
        )}
        {showPresence ? (
          <span className="user-identity__presence absolute -bottom-[2.5px] -right-[2.5px] z-10 h-3 w-3 rounded-full" />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <p className="truncate whitespace-nowrap text-[14px] font-bold text-foreground" title={name}>
          {name}
        </p>
      </div>
    </div>
  )
}
