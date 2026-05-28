"use client"

import * as React from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { cn } from "../lib/cn"

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeCategory: string
  setActiveCategory: (category: string) => void
  categories: string[]
  searchPlaceholder?: string
  allCategoryLabel?: string
  includeAllOption?: boolean
  variant?: "panel" | "inline"
}

export const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      className,
      searchQuery,
      setSearchQuery,
      activeCategory,
      setActiveCategory,
      categories,
      searchPlaceholder = "Tìm kiếm...",
      allCategoryLabel = "Tất cả",
      includeAllOption = false,
      variant = "panel",
      ...props
    },
    ref
  ) => {
    const resolvedCategories =
      includeAllOption && !categories.includes(allCategoryLabel)
        ? [allCategoryLabel, ...categories]
        : categories

    const isInline = variant === "inline"
    const searchInputClassName = cn(
      "ds-filter-bar__input h-12 border border-border bg-background/50 pl-12 text-foreground shadow-none placeholder:text-muted-foreground/70 focus-visible:border-primary/50 focus-visible:bg-background transition-all",
      isInline ? "rounded-2xl" : "rounded-xl"
    )
    const filterWrapperClassName = cn(
      "ds-filter-bar__filter flex h-12 w-full items-center gap-2 border border-border bg-background/50 pl-3 pr-2 text-foreground shadow-none sm:w-56 transition-all",
      isInline ? "rounded-2xl" : "justify-center rounded-xl py-2 sm:justify-start"
    )
    const filterTriggerClassName = cn(
      "ds-filter-bar__trigger flex-grow justify-between border-0 bg-transparent text-foreground shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg]:opacity-60",
      isInline ? "h-9 rounded-xl px-3" : "h-8 rounded-lg px-3"
    )
    const clearButtonClassName = cn(
      "ds-filter-bar__clear flex h-12 w-full items-center justify-center gap-2 border-0 bg-transparent px-4 text-sm text-muted-foreground shadow-none transition-all duration-200 hover:bg-[rgb(var(--store-accent-rgb)/0.1)] hover:text-foreground sm:w-auto",
      isInline ? "rounded-2xl" : "rounded-xl"
    )

    return (
      <div
        ref={ref}
        className={cn(
          "ds-filter-bar",
          isInline ? "ds-filter-bar--inline" : "ds-filter-bar--panel",
          isInline
            ? "flex w-full flex-col gap-3 xl:max-w-[620px] xl:flex-row xl:items-center"
            : "flex w-full flex-col items-center justify-between gap-4 md:flex-row",
          className
        )}
        {...props}
      >
        <div className={cn("ds-filter-bar__search w-full flex-grow", isInline && "flex-1")}>
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            startAdornment={<Search className="h-5 w-5" />}
            wrapperClassName="border-0 shadow-none outline-none"
            endAdornment={searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            ) : undefined}
            className={cn(searchInputClassName, searchQuery && "pr-10")}
            style={{
              outline: "none",
              boxShadow: "none",
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />
        </div>

        <div
          className={cn(
            "ds-filter-bar__actions flex w-full shrink-0 flex-col items-center gap-3 sm:flex-row",
            isInline ? "xl:w-auto" : "md:w-auto"
          )}
        >
          <div
            className={filterWrapperClassName}
            style={{
              outline: "none",
              boxShadow: "none",
            }}
          >
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Lọc:</span>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger
                className={filterTriggerClassName}
                style={{
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  WebkitAppearance: "none",
                  appearance: "none",
                }}
              >
                <SelectValue placeholder="Tất cả danh mục" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-xl">
                <SelectGroup>
                  {resolvedCategories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="cursor-pointer rounded-lg py-2.5 focus:bg-[rgb(var(--store-accent-rgb)/0.1)] focus:text-foreground"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {(searchQuery || activeCategory !== allCategoryLabel) && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery("")
                setActiveCategory(allCategoryLabel)
              }}
              className={clearButtonClassName}
            >
              <X className="h-4 w-4" />
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </div>
    )
  }
)

FilterBar.displayName = "FilterBar"
