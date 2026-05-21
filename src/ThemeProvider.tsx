'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'

export const THEMES = ['light', 'dark', 'system'] as const

export type Theme = (typeof THEMES)[number]
export type ResolvedTheme = Exclude<Theme, 'system'>

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

type ThemeProviderProps = PropsWithChildren<{
  defaultTheme?: Theme
  storageKey?: string
}>

const ThemeContext = createContext<ThemeContextValue | null>(null)

const DEFAULT_STORAGE_KEY = 'platform-theme'

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyThemeToDocument(theme: ResolvedTheme, preferredTheme: Theme) {
  if (typeof document === 'undefined') {
    return
  }

  const root = document.documentElement

  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  root.dataset.theme = theme
  root.dataset.themePreference = preferredTheme
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = DEFAULT_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme
    }

    const storedTheme = window.localStorage.getItem(storageKey) as Theme | null
    return storedTheme && THEMES.includes(storedTheme) ? storedTheme : defaultTheme
  })
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme())
  const resolvedTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    applyThemeToDocument(resolvedTheme, theme)
  }, [resolvedTheme, theme])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleThemeChange = () => {
      setSystemTheme(getSystemTheme())
    }

    mediaQuery.addEventListener('change', handleThemeChange)

    return () => mediaQuery.removeEventListener('change', handleThemeChange)
  }, [])

  const setTheme = (nextTheme: Theme) => {
    const nextResolvedTheme = nextTheme === 'system' ? getSystemTheme() : nextTheme

    setThemeState(nextTheme)
    applyThemeToDocument(nextResolvedTheme, nextTheme)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, nextTheme)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside a ThemeProvider.')
  }

  return context
}

export const THEME_LABELS: Record<Theme, string> = {
  light: 'Sáng',
  dark: 'Tối',
  system: 'Hệ thống',
}
