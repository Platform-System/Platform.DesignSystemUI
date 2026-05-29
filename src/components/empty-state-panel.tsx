"use client"

import * as React from "react"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "./empty"
import { cn } from "../lib/cn"

export interface EmptyStatePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  title: string
  description: string
  primaryActionNode?: React.ReactNode
  secondaryActionNode?: React.ReactNode
  variant?: "default" | "framed"
  panelClassName?: string
  iconClassName?: string
  descriptionClassName?: string
}

export function EmptyStatePanel({
  icon,
  title,
  description,
  primaryActionNode,
  secondaryActionNode,
  variant = "default",
  className,
  panelClassName,
  iconClassName,
  descriptionClassName,
  ...props
}: EmptyStatePanelProps) {
  return (
    <div
      className={cn(
        "ds-glass-panel flex w-full max-w-none flex-col items-center rounded-[32px] px-6 py-20 text-center shadow-[0_16px_48px_rgb(0_0_0/0.1)]",
        variant === "framed" && "empty-panel-surface",
        panelClassName
      )}
      {...props}
    >
      <Empty className={cn("border-none bg-transparent p-0", className)}>
        <EmptyMedia
          variant="icon"
          className={cn(
            "store-surface-soft store-muted-text mx-auto flex h-20 w-20 items-center justify-center rounded-full shadow-[0_10px_28px_rgb(0_0_0/0.08)]",
            variant === "framed" && "empty-panel-icon",
            iconClassName
          )}
        >
          {icon}
        </EmptyMedia>
        <EmptyTitle className="text-xl font-semibold text-foreground">{title}</EmptyTitle>
        <EmptyDescription className={cn("store-muted-text mt-3 max-w-md leading-7", descriptionClassName)}>
          {description}
        </EmptyDescription>
      </Empty>

      {(primaryActionNode || secondaryActionNode) && (
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {primaryActionNode}
          {secondaryActionNode}
        </div>
      )}
    </div>
  )
}
