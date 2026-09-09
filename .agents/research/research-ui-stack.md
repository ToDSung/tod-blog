# Research: shared UI package stack (shadcn/ui + Tailwind v4 + motion) in a pnpm monorepo

Researched 2026-07-13 for a future `packages/ui` in this repo (pnpm workspaces, Next.js 15 App Router with `output: 'export'`, React 19, Tailwind 4.1.18 at the workspace root).

## TL;DR

- Pin: `tailwindcss@^4.3.2`, `shadcn@^4.13.0` (CLI), `radix-ui@^1.6.2` (unified package, not per-primitive `@radix-ui/react-*`), `motion@^12.42.2` (import from `motion/react`, package name is `motion` not `framer-motion`), `tw-animate-css@^1.4.0`. All support React 19 (radix-ui and motion peer-deps explicitly allow `^19.0.0`; shadcn/ui components were updated to drop `forwardRef` for React 19).
- Structure: `packages/ui` with its own `components.json` (style `new-york`, the current default), consumed by `packages/tod-blog` via a `@workspace/ui` (or repo-specific) import alias and a second app-level `components.json`; scaffold with `pnpm dlx shadcn@latest init --monorepo` or configure by hand to match this repo's existing non-Turborepo pnpm-workspace layout.
- Tailwind v4 is CSS-first: no `tailwind.config.ts`, theme tokens live in `@theme`/`@theme inline` blocks in a shared `packages/ui/src/styles/globals.css`, colors are OKLCH, and `tw-animate-css` replaces the old `tailwindcss-animate` plugin. The consuming app must add `@source "../../packages/ui"` (or equivalent relative path) in its own globals.css so Tailwind's scanner picks up class names used inside `packages/ui`.
- motion (ex-framer-motion) is a client-only library — every file that imports `motion/react` needs `'use client'` in Next.js App Router — but it is fully compatible with `output: 'export'` since Client Components are simply pre-rendered to static HTML at build time; no server-only shadcn feature (Server Actions, dynamic routes, Route Handlers with Request) is used by shadcn/ui components themselves, so nothing here conflicts with static export.
- Radix exit/enter animations need `forceMount` + `AnimatePresence` per Motion's own Radix guide; this is a separate animation mechanism from `tw-animate-css`'s `data-state`-driven CSS animations, and mixing both on the same element is unverified/likely redundant (see Open Questions).

## Version compatibility matrix

| Package | Version found (2026-07-13) | Source | React 19 support |
| --- | --- | --- | --- |
| `tailwindcss` | 4.3.2 | https://registry.npmjs.org/tailwindcss/latest | N/A (build tool, not React-coupled) |
| `shadcn` (CLI) | 4.13.0 | https://registry.npmjs.org/shadcn/latest ; https://ui.shadcn.com/docs/changelog/2026-03-cli-v4 | Generates React-19-compatible components (see below) |
| `radix-ui` (unified package) | 1.6.2 | https://registry.npmjs.org/radix-ui/latest | Yes — peerDeps `react`/`react-dom`: `^16.8 \|\| ^17.0 \|\| ^18.0 \|\| ^19.0 \|\| ^19.0.0-rc` |
| `motion` | 12.42.2 | https://registry.npmjs.org/motion/latest | Yes — peerDeps (optional) `react`/`react-dom`: `^18.0.0 \|\| ^19.0.0` |
| `tw-animate-css` | 1.4.0 | https://registry.npmjs.org/tw-animate-css/latest ; https://github.com/Wombosvideo/tw-animate-css | N/A (pure CSS) |

Notes tied to the matrix:
- shadcn/ui's Tailwind v4 migration doc states components had `forwardRef` removed and now use `React.ComponentProps`, and that the change is "non-breaking" — v3/React 18 projects keep working. Source: https://ui.shadcn.com/docs/tailwind-v4
- As of the Feb 2026 shadcn/ui changelog, the `new-york` style now imports Radix primitives from the single `radix-ui` package (e.g. `import { Dialog as DialogPrimitive } from "radix-ui"`) instead of many `@radix-ui/react-*` packages; a `pnpm dlx shadcn@latest migrate radix` command exists for older projects. Source: https://ui.shadcn.com/docs/changelog/2026-02-radix-ui
- shadcn CLI v4 (March 2026) added a `--base` flag to choose the primitive layer at init time (`init --base radix` vs Base UI), plus `--monorepo`, `--dry-run`, `--diff`, `--view`, `info`, and `docs` subcommands. Source: https://ui.shadcn.com/docs/changelog/2026-03-cli-v4
- `new-york` became the default style (the plain `default` style was deprecated) as of the March 12, 2025 Tailwind v4 update. Source: https://ui.shadcn.com/docs/tailwind-v4
- Root `package.json` in this repo already has `tailwindcss@^4.1.18`; the caret range is compatible with 4.3.2 — no root bump strictly required, but consider aligning to `^4.3.2` when `packages/ui` is added. Source: `D:\code\tod-blog\package.json` (local file, not a citation but stated for context).

## shadcn/ui + Tailwind v4: what changed vs v3

- **CSS-first theming**: no `tailwind.config.js/ts`. Theme tokens are CSS custom properties under `:root`/`.dark`, exposed to Tailwind's engine via `@theme` / `@theme inline` blocks in the global stylesheet (e.g. `@theme inline { --color-background: var(--background); }`), which Tailwind then turns into utilities like `bg-background`, `text-foreground`, `border-border`, `ring-ring`. `components.json`'s `tailwind.cssVariables: true` (the default) is what selects this mode. Source: https://ui.shadcn.com/docs/theming, https://ui.shadcn.com/docs/tailwind-v4
- **Colors**: HSL values were converted to OKLCH (e.g. `--primary: oklch(0.205 0 0)`); dark-mode palette was also revisited for accessibility. Source: https://ui.shadcn.com/docs/tailwind-v4
- **Animation plugin**: `tailwindcss-animate` (a Tailwind v3-era plugin) is deprecated in favor of `tw-animate-css`, described by its own README as "TailwindCSS v4.0 compatible replacement for tailwindcss-animate." New shadcn projects include it by default via `@import "tw-animate-css";` in globals.css. Source: https://ui.shadcn.com/docs/tailwind-v4, https://github.com/Wombosvideo/tw-animate-css
- **Default style**: `new-york` (the `default` style is deprecated for new projects). Source: https://ui.shadcn.com/docs/tailwind-v4
- **React 19**: components no longer use `forwardRef`; they use `React.ComponentProps<...>` typing instead. Migration is stated as non-breaking for existing v3/React 18 setups. Source: https://ui.shadcn.com/docs/tailwind-v4

## Official monorepo support

- Recommended layout (from shadcn/ui's own monorepo doc):
  ```
  apps/web          # Next.js app, consumes shared UI
  packages/ui        # Shared component library
  ```
  Source: https://ui.shadcn.com/docs/monorepo
- Each workspace gets its **own** `components.json`. `apps/web/components.json` points component installs at the app; `packages/ui/components.json` governs the shared package. Both must agree on `style`, `iconLibrary`, and `baseColor`. Source: https://ui.shadcn.com/docs/monorepo
- Cross-workspace alias: `packages/ui`'s components are referenced via an alias such as `"ui": "@workspace/ui/components"` in the app's `components.json`, and consumed as `import { Button } from "@workspace/ui/components/button"`. `@workspace/ui` here is just the shared package's own `name` field in its `package.json` — in this repo it would become whatever scope this project uses (existing packages are unscoped, e.g. `tod-blog`, `articles`, `@tod-workspace/leetcode` — so the eventual name should follow the `@tod-workspace/*` convention already used by the leetcode package, e.g. `@tod-workspace/ui`). Source: https://ui.shadcn.com/docs/monorepo; local convention cross-checked in `D:\code\tod-blog\packages\leetcode\package.json` (name field).
- Scaffolding command: `pnpm dlx shadcn@latest init --monorepo` scaffolds a **Turborepo**-based starter with both workspaces pre-wired. This repo does not use Turborepo — the scaffold would need adapting to the existing plain pnpm-workspaces (`workspaces: ["packages/*"]` in root `package.json`, no `turbo.json`) rather than adopted wholesale. Source: https://ui.shadcn.com/docs/monorepo; local repo structure.
- Adding components from the app still targets the shared package automatically: run `pnpm dlx shadcn@latest add <component>` from `apps/web` (or the repo equivalent) and the CLI decides whether a base primitive lands in `packages/ui` or an app-specific block lands in the app's own components dir. Source: https://ui.shadcn.com/docs/monorepo
- For Tailwind v4 specifically, the monorepo doc says to leave the `tailwind` key empty in `components.json` (no config path to point at, since there is no `tailwind.config`), and to keep one shared stylesheet at `packages/ui/src/styles/globals.css` that app workspaces reference via the `css` path in their own `components.json`. Source: https://ui.shadcn.com/docs/monorepo
- **Getting the app's Tailwind scanner to see `packages/ui`'s class names** requires Tailwind v4's `@source` directive (this is a Tailwind concern, not a shadcn one, and isn't fully spelled out on the shadcn monorepo page — cross-referenced against Tailwind's own docs): in the app's global CSS, add something like
  ```css
  @import "tailwindcss";
  @source "../../../packages/ui";
  ```
  or, if the build runs from a different working directory, set the import's base explicitly with `@import "tailwindcss" source("../src");`. There's also `@source not "<path>"` to exclude directories, and `@import "tailwindcss" source(none);` to disable auto-detection entirely and rely only on explicit `@source` lines (useful if a repo has multiple independent Tailwind stylesheets). Source: https://tailwindcss.com/docs/detecting-classes-in-source-files

## motion + shadcn/Radix integration patterns

- Package/import: install `motion` (not `framer-motion`); import components as `import { motion } from "motion/react"`. The framer-motion → motion migration is described as a drop-in rename with "no breaking changes in Motion for React in version 12" (breaking changes, if any, are in the underlying vanilla-JS API, not the React wrapper). Source: https://motion.dev/docs/react-upgrade-guide
- Next.js App Router: `motion/react` is a client-only API. Any file using it needs `'use client'` at the top, or you wrap usage in a Client Component boundary; Motion also documents a `LazyMotion` pattern to shrink bundle size, which still requires a client boundary. Source: https://motion.dev/docs/react-installation (per search summary); confirmed pattern also standard Next.js behavior per https://nextjs.org/docs/app/api-reference/directives/use-client
- Animating Radix primitives (official Motion guide, https://motion.dev/docs/radix):
  - Use Radix's `asChild` to render a `motion.*` element as the actual DOM node Radix controls (e.g. `<Toast.Root asChild><motion.div initial=... animate=... /></Toast.Root>`).
  - For components with an open/close lifecycle (Dialog, Popover, Tooltip, Toast), hoist `open`/`onOpenChange` state yourself and wrap the conditionally-rendered content in `AnimatePresence`, with `forceMount` set on the Portal/Content so Radix keeps the node mounted during Motion's exit animation instead of unmounting it immediately. Source: https://motion.dev/docs/radix; corroborated by https://www.radix-ui.com/primitives/docs/guides/animation and community writeups (https://github.com/radix-ui/primitives/discussions/1058, https://github.com/radix-ui/primitives/issues/1061).
  - Motion's official guide's worked examples cover Toast, Tooltip, and Tabs explicitly; Dialog/Popover follow the same `forceMount` + `AnimatePresence` pattern per the Radix animation guide and community sources, but is not exhaustively demoed with live code on motion.dev's own guide page as fetched.
- **tw-animate-css overlap/conflict**: not found in any official source. Radix components ship `data-state="open"/"closed"` attributes that `tw-animate-css`/`tailwindcss-animate` target with CSS `@keyframes` + `animate-in`/`animate-out` utility classes — a purely CSS mechanism, independent of Motion's JS-driven `AnimatePresence`/`forceMount` approach. Neither shadcn/ui's docs nor Motion's Radix guide discuss using both on the same element; treat "which one owns enter/exit for a given component" as a design decision to make explicitly (see Open Questions), not a documented pattern.

## Next.js static export (`output: 'export'`) constraints

- Per Next.js's own static-export docs, Client Components are simply pre-rendered to static HTML at `next build` time — this is exactly how shadcn/ui and Motion should be used from the start, so no changes are needed to use them under `output: 'export'`. Source: https://nextjs.org/docs/app/guides/static-exports
- The documented **unsupported** feature list is: Dynamic Routes with `dynamicParams: true` or without `generateStaticParams()`, Route Handlers that rely on `Request`, `cookies()`, Rewrites, Redirects, Headers, Proxy, ISR, `next/image`'s default loader (a custom loader is required), Draft Mode, Server Actions, and Intercepting Routes. None of these are things shadcn/ui components or `motion/react` require — shadcn is just React components + Tailwind classes, and Motion is a client-side animation library — so **shadcn + motion are static-export-safe by construction**. Source: https://nextjs.org/docs/app/guides/static-exports
- Practical corollary already true of this repo's existing patterns: any shadcn component or motion usage that needs `window`/`localStorage`/etc. must guard access inside `useEffect` (same rule Next.js states generally for static export), not because of shadcn/motion specifically. Source: https://nextjs.org/docs/app/guides/static-exports
- One tangential finding: the Next.js docs page fetched during this research was stamped `version: 16.2.10`, i.e. current Next.js docs describe Next 16, while this repo pins `next@^15.1.4`. The static-export behavior documented (Client Components prerendered, same unsupported-feature list) has been stable since Next 13.4–14.0 per the page's own "Version History" table, so it should still apply to Next 15, but this was not independently verified against Next 15-specific docs. Flagged as an open question below rather than assumed.

## Recommended monorepo structure sketch

```
tod-blog/                          (pnpm workspace root; workspaces: ["packages/*"])
├── package.json                   (tailwindcss ^4.3.2 could live here or per-package)
├── packages/
│   ├── ui/                        (new) @tod-workspace/ui — shared shadcn component library
│   │   ├── components.json        (style: new-york, cssVariables: true, base: radix)
│   │   ├── src/
│   │   │   ├── components/        (shadcn-generated components, e.g. button.tsx)
│   │   │   ├── lib/                (cn() helper, etc.)
│   │   │   └── styles/
│   │   │       └── globals.css     (@import "tailwindcss"; @import "tw-animate-css"; @theme{...}; :root{...})
│   │   └── package.json           (name: "@tod-workspace/ui", exports map per component or barrel)
│   ├── tod-blog/                  (existing Next.js app)
│   │   ├── components.json        (aliases.ui -> "@tod-workspace/ui/components")
│   │   └── app/globals.css        (@import "tailwindcss" source("../.."); @source "../../../packages/ui/src";
│   │                                @import "@tod-workspace/ui/styles/globals.css";)
│   ├── articles/                  (Docusaurus — likely does not consume packages/ui)
│   └── leetcode/                  (unrelated — no UI)
```

Key structural choices this implies, each traceable to a cited source above:
1. Two `components.json` files (app + `packages/ui`), kept in sync on `style`/`baseColor`/`iconLibrary` — https://ui.shadcn.com/docs/monorepo
2. `packages/ui` package name should follow this repo's existing `@tod-workspace/*` scoping convention rather than shadcn's own example `@workspace/ui` — local convention, `packages/leetcode/package.json`
3. `@source` (or `@import ... source(...)`) wiring in the app's `globals.css` so Tailwind's scanner reaches `packages/ui/src` — https://tailwindcss.com/docs/detecting-classes-in-source-files
4. `tw-animate-css` imported once in the shared stylesheet, not duplicated per app — https://ui.shadcn.com/docs/tailwind-v4
5. No `tailwind.config.ts` anywhere in the tree — CSS-first only — https://ui.shadcn.com/docs/theming

## Open questions (not found / not fully verifiable from official sources)

- **Non-Turborepo compatibility of `shadcn init --monorepo`**: the official scaffold assumes Turborepo. Whether the generated `components.json` aliasing and package resolution works unmodified in a plain pnpm-workspaces repo (no `turbo.json`) is not documented — likely fine since it's really just pnpm workspace protocol resolution, but unverified.
- **Motion + tw-animate-css on the same Radix component**: no official guidance found on whether to let `tw-animate-css`'s CSS `data-state` animations handle a component's open/close, or Motion's `AnimatePresence`/`forceMount`, or how to avoid double-animating if both are present. Recommend picking one mechanism per component type and documenting the choice locally when `packages/ui` is built.
- **Next 15 vs Next 16 static-export parity**: the static-export doc fetched is stamped for Next.js 16.2.10 docs; behavior is stated to be stable since v13.4–14.0, but no Next-15-specific static-export page was checked separately to confirm no v15→v16 regressions/changes in this area.
- **shadcn CLI `--base` default in non-interactive/monorepo init**: confirmed the flag exists (`--base radix`/Base UI), but the CLI's *default* base when unspecified in a monorepo scaffold was not explicitly confirmed from a fetched source (only that `new-york` style now defaults to the unified `radix-ui` package).
- **Dialog/Popover-specific Motion+Radix worked examples**: motion.dev's own Radix guide demos Toast, Tooltip, and Tabs; Dialog/Popover exit-animation code was only corroborated via Radix's own animation guide and third-party/community posts (GitHub discussions, blog posts), not motion.dev's official examples directly.
