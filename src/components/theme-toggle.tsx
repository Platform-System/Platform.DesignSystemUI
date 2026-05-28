'use client'

import * as React from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme, THEMES, THEME_LABELS } from '../ThemeProvider'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'

export interface ThemeToggleProps {
  buttonVariant?: 'ghost' | 'outline' | 'default' | 'secondary'
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon'
  buttonClassName?: string
  align?: 'start' | 'center' | 'end'
  children?: React.ReactNode
}

export function ThemeToggle({
  buttonVariant = 'ghost',
  buttonSize = 'icon',
  buttonClassName,
  align = 'end',
  children,
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            variant={buttonVariant}
            size={buttonSize}
            className={buttonClassName}
            title="Chuyển theme"
          >
            {resolvedTheme === 'dark' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Chuyển theme</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-36">
        {THEMES.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption}
            onClick={() => setTheme(themeOption)}
            className="flex items-center gap-2 cursor-pointer"
          >
            {themeOption === 'light' && <Sun className="h-4 w-4" />}
            {themeOption === 'dark' && <Moon className="h-4 w-4" />}
            {themeOption === 'system' && <Monitor className="h-4 w-4" />}
            <span className="flex-1">{THEME_LABELS[themeOption]}</span>
            {theme === themeOption && (
              <span className="ml-auto text-[10px] font-bold opacity-70">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
