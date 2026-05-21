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
        "flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none",
        className
      )}
      {...props}
    >
      {/* All Option */}
      <button
        onClick={() => onItemChange(null)}
        type="button"
        className={cn(
          "px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer",
          activeItem === null || activeItem === "All"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
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
              "px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer",
              activeItem === item
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
            )}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}
