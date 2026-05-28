import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/cn'
import { Spinner } from './spinner'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-neutral-950 text-white hover:bg-neutral-900 disabled:bg-neutral-950/50 disabled:text-white/60',
        brand:
          'bg-neutral-950 text-white hover:bg-neutral-900 disabled:bg-neutral-950/50 disabled:text-white/60',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 disabled:bg-destructive/45 disabled:text-white',
        'danger-ghost':
          'text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:text-muted-foreground',
        outline:
          'border border-[rgb(var(--store-border-rgb)/0.95)] bg-background text-foreground shadow-[0_10px_24px_rgb(0_0_0/0.06)] hover:bg-[rgb(var(--store-accent-rgb)/0.1)] hover:text-foreground disabled:border-[rgb(var(--store-border-rgb)/0.72)] disabled:bg-[rgb(var(--store-surface-strong-rgb)/0.72)] disabled:text-muted-foreground',
        secondary: 'bg-white text-neutral-950 hover:bg-neutral-100 disabled:bg-white/50 disabled:text-neutral-950/60 shadow-[0_4px_12px_rgba(0,0,0,0.08)]',
        ghost: 'hover:bg-[rgb(var(--store-accent-rgb)/0.1)] hover:text-foreground disabled:text-muted-foreground',
        link: 'text-primary underline-offset-4 hover:underline disabled:text-primary/55',
        black: 'bg-neutral-950 text-white hover:bg-neutral-900 disabled:bg-neutral-950/50 disabled:text-white/60',
        white: 'bg-white text-neutral-950 hover:bg-neutral-100 disabled:bg-white/50 disabled:text-neutral-950/60 shadow-[0_4px_12px_rgba(0,0,0,0.08)]',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-xl px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  startIcon,
  endIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  if (asChild) {
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {React.isValidElement(children) ? (
          React.cloneElement(children as React.ReactElement<{ children?: React.ReactNode }>, undefined, (
            <>
              {loading ? <Spinner className="size-4" /> : startIcon ? <span className="inline-flex shrink-0">{startIcon}</span> : null}
              {(children as React.ReactElement<{ children?: React.ReactNode }>).props.children}
              {!loading && endIcon ? <span className="inline-flex shrink-0">{endIcon}</span> : null}
            </>
          ))
        ) : (
          children
        )}
      </Comp>
    )
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner className="size-4" /> : startIcon ? <span className="inline-flex shrink-0">{startIcon}</span> : null}
      {children}
      {!loading && endIcon ? <span className="inline-flex shrink-0">{endIcon}</span> : null}
    </Comp>
  )
}

export { Button, buttonVariants }
