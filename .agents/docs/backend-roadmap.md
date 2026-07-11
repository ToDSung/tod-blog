# Backend Adoption Readiness Plan (backend-roadmap)

Status: **not started**. The user has flagged that a backend may be adopted in the future. This document gives a future session a starting point so the first step doesn't pick the wrong architecture. Before starting work, the three "needs user confirmation" questions must be answered.

## Key premise (the fact that determines everything)

`packages/tod-blog` is a static export (`output: 'export'`) — **there is no server runtime**. Under the current deployment, no API route, server action, or dynamic rendering will run. So the first decision in "adding a backend" is not which framework to pick, but which topology to use.

## Three paths

**A. Add a standalone API package (default recommendation)** — `packages/api`, using a lightweight TS framework (e.g. Hono, which can run on both Node and serverless). The blog stays purely static; the frontend hits the API with `fetch`.
- Pros: doesn't touch the deployment of the two existing sites; the backend can be experimented with and deployed independently (fits the "testing AI's ceiling" experimental-playground positioning); all monorepo conventions carry over unchanged.
- Cost: one more deployment target to manage + CORS configuration.

**B. Convert tod-blog to server mode** — remove `output: 'export'`, use Next.js route handlers / server actions.
- Only worth it when backend functionality is tightly coupled to pages (e.g. personalized pages behind login).
- List of costs (weak models take note — these will break in a chain reaction): the current static host can no longer be used, a Node deployment target is needed instead; the `next-sitemap` postbuild config needs changing; the `out/` directory disappears, and every script/CI assumption about it needs to be checked.

**C. BaaS (Supabase / Firebase)** — when the requirement is only single-table-level, like "store survey form data" or "add comments," don't build it yourself.
- Cost: external service dependency + key management (keys must never go into git; under static export, only an anon/public key can be used, protected by RLS).

## Needs user confirmation (must ask before starting, see judgment-rubrics §4b/4c)

1. What exactly is the first backend requirement? (determines A/B/C)
2. Where will it be deployed? (Cloudflare Workers / Vercel / VPS — affects framework and runtime choice)
3. Is a database needed? If so, is a managed service (Neon/Supabase) acceptable, or must it be self-managed?

## Wiring checklist if path A is chosen (monorepo integration steps)

1. `packages/api/package.json`: name it `@tod-workspace/api`, add it to the pnpm workspace (`pnpm-workspace.yaml` already covers `packages/*`, no change needed there).
2. `tsconfig.json` extends `../../tsconfig.base.json`, composite; if referenced by other packages, add a project reference on the referencing side.
3. `eslint.config.mjs` follows `packages/leetcode/eslint.config.mjs`'s pattern of extending the root config.
4. Tests follow the leetcode pattern: Jest + `jest.config.base.js`; note the pre-commit hook currently only runs related tests for `packages/leetcode/` — whether the new package should be included requires changing `.husky/pre-commit` (ask the user before touching hooks, see maintenance.md §1).
5. Use `api` as the Conventional Commit scope (e.g. `feat(api): add survey endpoint`).
6. Environment variables: confirm `.env*` is in `.gitignore`; the frontend can only read `NEXT_PUBLIC_*`, and those get baked into the static output — secrets belong on the backend only, always.
