"use client"

import * as React from "react"
import { cn } from "../lib/cn"

export interface GlobalLoadingBarProps extends React.HTMLAttributes<HTMLDivElement> {
  isPending?: boolean
  loading?: boolean
}

export const GlobalLoadingBar = React.forwardRef<HTMLDivElement, GlobalLoadingBarProps>(
  ({ isPending, loading, className, ...props }, ref) => {
    if (!loading && !isPending) return null

    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-none fixed top-0 left-0 right-0 z-[9999]",
          className
        )}
        {...props}
      >
        <div
          className="h-[2px] animate-progress-fast [background:linear-gradient(90deg,var(--info)_0%,var(--primary)_58%,color-mix(in_srgb,var(--primary)_72%,var(--warning))_100%)] shadow-[0_0_10px_rgb(var(--store-accent-rgb)/0.35)]"
          style={{
            width: isPending ? "70%" : "100%",
            transition: "width 0.4s ease-out",
          }}
        />
      </div>
    )
  }
)

GlobalLoadingBar.displayName = "GlobalLoadingBar"
