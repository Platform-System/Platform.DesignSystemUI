import * as React from 'react'
import { Monitor } from 'lucide-react'
import { AppLinkItem } from './app-link-item'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { cn } from '../lib/cn'

export interface PlatformSwitcherItem {
  id: string
  name: string
  icon: React.ReactNode
  href?: string
  active?: boolean
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
}

export interface PlatformSwitcherMenuProps {
  items: PlatformSwitcherItem[]
  currentPlatformId?: string
  hideCurrentPlatform?: boolean
  triggerTitle?: string
  triggerAriaLabel?: string
  triggerClassName?: string
  contentClassName?: string
  align?: 'start' | 'center' | 'end'
}

export function PlatformSwitcherMenu({
  items,
  currentPlatformId,
  hideCurrentPlatform = true,
  triggerTitle = 'Cổng ứng dụng',
  triggerAriaLabel = 'Cổng ứng dụng',
  triggerClassName,
  contentClassName,
  align = 'end',
}: PlatformSwitcherMenuProps) {
  const visibleItems = hideCurrentPlatform && currentPlatformId
    ? items.filter((item) => item.id !== currentPlatformId)
    : items

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn('size-[40px] rounded-xl text-foreground', triggerClassName)}
          title={triggerTitle}
          aria-label={triggerAriaLabel}
        >
          <Monitor size={15} className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        className={cn('w-[210px] rounded-2xl p-3', contentClassName)}
      >
        <DropdownMenuLabel className="sr-only">{triggerTitle}</DropdownMenuLabel>
        <div className="flex flex-col gap-1">
          {visibleItems.map((item) => (
            <DropdownMenuItem key={item.id} disabled={item.active === false} className="p-0 focus:bg-transparent">
              <AppLinkItem
                icon={item.icon}
                inactive={item.active === false}
                href={item.active === false ? undefined : item.href}
                target={item.active === false ? undefined : item.target}
                rel={item.active === false ? undefined : item.rel}
              >
                {item.name}
              </AppLinkItem>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
