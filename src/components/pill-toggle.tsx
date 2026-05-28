"use client"

import * as React from "react"
import { cn } from "../lib/cn"

export interface PillToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  items: string[]
  activeItem: string | null
  onItemChange: (item: string | null) => void
  allLabel?: string
}

export function PillToggle({
  items,
  activeItem,
  onItemChange,
  allLabel = "All",
  className,
  ...props
}: PillToggleProps) {
  const normalizedAllLabel = allLabel === "All" ? "Tất cả" : allLabel

  return (
    <div
      className={cn(
        "inline-flex h-10 w-full flex-nowrap items-center gap-2 bg-transparent p-0 overflow-x-auto scrollbar-none sm:w-auto",
        className
      )}
      {...props}
    >
      {/* All Option */}
      <button
        onClick={() => onItemChange(null)}
        type="button"
        className={cn(
          "flex h-full shrink-0 min-w-[96px] items-center justify-center rounded-xl border border-transparent px-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer",
          activeItem === null || activeItem === "All"
            ? "border-[rgb(var(--store-border-rgb)/0.9)] bg-[rgb(var(--store-accent-rgb)/0.05)] text-foreground"
            : "bg-transparent text-muted-foreground hover:text-foreground"
        )}
      >
        {normalizedAllLabel}
      </button>

      {/* Custom Options */}
      {items.map((item) => {
        if (item === "All") return null
        return (
          <button
            key={item}
            onClick={() => onItemChange(item)}
            type="button"
            className={cn(
              "flex h-full shrink-0 min-w-[96px] items-center justify-center rounded-xl border border-transparent px-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer",
              activeItem === item
                ? "border-[rgb(var(--store-border-rgb)/0.9)] bg-[rgb(var(--store-accent-rgb)/0.05)] text-foreground"
                : "bg-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}
