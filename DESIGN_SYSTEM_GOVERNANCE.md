# Design System Governance

This document defines how shared UI should evolve across:

- `Platform.DesignUI`
- `Platform.AdminUI`
- `Platform.MerchantUI`
- `Platform.PortalUI`

## Goals

- keep visual consistency across apps
- allow each app to express its own brand surface
- prevent duplicate wrappers and utility drift
- make shared UI safe to change as more frontends are added

## Layer Model

Use the frontend stack in 4 layers.

### 1. Foundation

Owned by `Platform.DesignUI`.

Includes:

- `ThemeProvider`
- shared CSS reset and base styles
- primitive tokens such as `--background`, `--foreground`, `--border`, `--radius`
- shared helpers such as `cn`

Files today:

- `src/ThemeProvider.tsx`
- `src/tokens.css`
- `src/base.css`
- `src/index.css`
- `src/lib/cn.ts`

### 2. Semantic Design Tokens

Owned by `Platform.DesignUI`.

Includes reusable product-agnostic meaning such as:

- `--color-success`
- `--color-warning`
- `--color-danger`
- `--surface-muted`
- `--surface-elevated`
- `--text-subtle`

Rule:

- token names should describe intent, not app identity
- avoid names like `--admin-primary` or `--store-surface` in the shared package

### 3. Shared Components

Owned by `Platform.DesignUI`.

Includes:

- generic primitives and composed UI blocks
- variants that can be reused by more than one app
- components with no business-specific copy, layout, or flow assumptions

Examples:

- `Button`
- `Input`
- `Badge`
- `Dialog`
- `Table`
- `EmptyStatePanel`
- `FilterBar`
- `PillToggle`
- `GlobalLoadingBar`
- `CustomCursor`

Rule:

- if two apps need the same styling behavior, promote it here
- if a wrapper only adds a visual variant, prefer adding a variant to the shared component instead of recreating the wrapper locally

### 4. Brand and App Surface

Owned by each app.

Includes:

- editorial layout
- app-specific motion
- hero sections
- branded background effects
- workflow-specific component composition

Examples in this repo today:

- `Platform.AdminUI/src/index.css`
- `Platform.MerchantUI/src/app/globals.css`
- `Platform.PortalUI/src/app/globals.css`

Rule:

- apps may override shared tokens locally
- apps should not fork shared primitives unless behavior is materially app-specific

## Placement Rules

Put code in `Platform.DesignUI` when:

- it is reused across multiple apps
- it is business-agnostic
- it mainly defines a shared contract or visual primitive

Keep code in the app when:

- it is tied to one product flow
- it exists mainly to express one app's brand
- it combines generic components into a domain-specific section

## Wrapper Policy

Local wrappers are allowed only when they do at least one of these:

- add domain behavior
- add accessibility or integration behavior that the shared primitive should not own
- define an app-only presentation contract that is not expected to spread to other apps

Local wrappers should not exist only to:

- rename a shared component
- re-export `cn`
- duplicate shared default classes without adding real behavior

## Theming Policy

Use this split:

- shared package owns base tokens and theme mechanics
- each app owns brand tokens and page atmosphere

Recommended token pattern:

1. base tokens in shared package
2. semantic tokens in shared package
3. app-level alias tokens in each app

Example:

- shared: `--color-primary`, `--color-muted`, `--surface-elevated`
- app: `--brand-accent`, `--brand-glow`, `--brand-surface`
- app maps brand values onto shared semantic slots where needed

## Current Repo Recommendations

### Keep

- keep `ThemeProvider` and shared component exports in `Platform.DesignUI`
- keep app-level visual identity in each frontend app

### Reduce

- reduce duplicated utility files when `@platform/design-system` already exports the same helper
- reduce app-local wrappers that only restyle shared components

### Promoted Recently

We successfully promoted the following components/styles to the shared package:
- `EmptyStatePanel` (rebranded from `StoreEmptyState`)
- `GlobalLoadingBar` (reusable progress bar)
- `FilterBar` & `PillToggle` (generic filter headers)
- Glassmorphism token surface classes (`.ds-glass-panel`, `.ds-glass-card`)

### Promote Later

Promote to shared package when the same need appears in at least two apps:

- field shells with label, hint, and error layout
- skeleton conventions and complex skeleton list layouts

## Safe Evolution Checklist

Before adding something to `Platform.DesignUI`, ask:

1. Is it reusable in more than one app?
2. Is the naming semantic instead of app-branded?
3. Can the API stay small and stable?
4. Would moving it to shared reduce duplication instead of spreading coupling?

If the answer is mostly no, keep it local.

## Immediate Cleanup Priorities

1. use `@platform/design-system` as the single source for helpers like `cn`
2. review app-local wrappers and promote only the variants that are truly reusable
3. standardize how frontend apps consume `@platform/design-system` inside the monorepo so local development and CI do not drift
