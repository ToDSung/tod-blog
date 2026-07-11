# AGENTS.md

Guidance for coding agents (Claude Code, Codex, Antigravity) working in this repository. Claude Code reads this via `CLAUDE.md`, which imports this file. Keep this file lean — details live in `.agents/docs/` and are loaded on demand.

## Read-on-demand routing

Load these ONLY when the trigger applies. Do not preload them all.

| When you are about to… | Read first |
| --- | --- |
| Delegate work to a subagent, choose a model, or verify a result | [.agents/docs/model-dispatch.md](.agents/docs/model-dispatch.md) |
| Decide: retry vs. change approach, escalate, declare done, or ask the user | [.agents/docs/judgment-rubrics.md](.agents/docs/judgment-rubrics.md) |
| Write a delegation prompt (search / implement / refactor / research / review) | [.agents/docs/delegation-templates.md](.agents/docs/delegation-templates.md) |
| Edit any file under `.agents/` or this AGENTS.md itself | [.agents/docs/maintenance.md](.agents/docs/maintenance.md) |
| Add a backend / API / server to this repo | [.agents/docs/backend-roadmap.md](.agents/docs/backend-roadmap.md) |
| Start a long or ambitious session; or something feels off about these docs | [.agents/docs/letter-to-future-sessions.md](.agents/docs/letter-to-future-sessions.md) |
| Understand why these rules exist | [.agents/docs/harness-diagnosis.md](.agents/docs/harness-diagnosis.md) |

Lessons learned live in [.agents/docs/lessons.md](.agents/docs/lessons.md) — append new entries there per the format in maintenance.md.

## Repository overview

pnpm workspace monorepo (`packages/*`) — ToD's personal blog and AI-development testbed. The owner primarily develops via AI agents and uses this repo to probe their limits; expect experimental branches and agent-authored code.

- **`packages/tod-blog`** (`tod-blog`) — Next.js 15 App Router site, React 19, Tailwind CSS 4. Statically exported (`output: 'export'` → `out/`), sitemap via `next-sitemap` postbuild. Pages in `app/` (landing, `cv/`, `survey/`), shared UI in `components/`.
- **`packages/articles`** (`articles`) — Docusaurus 3 site: blog posts (`blog/`) and docs (`docs/`), Markdown/MDX, mostly Chinese.
- **`packages/leetcode`** (`@tod-workspace/leetcode`) — TypeScript LeetCode solutions. One folder per problem under `src/lib/` named `<number><ProblemName>` (e.g. `0020ValidParentheses`), each with solution + Jest test. Helpers in `src/sort/`, `src/structure/`, `src/utils/`.

TypeScript uses project references: each package's `tsconfig.json` extends `tsconfig.base.json` (strict, composite).

Never read these into context: `pnpm-lock.yaml` (694 KB), `node_modules/`, `out/`, `build/`, `.next/`, `.docusaurus/`. To check a dependency version, Grep the relevant `package.json`.

## Commands

Use **pnpm** from the repo root; target a package with `-F <name>`.

```sh
pnpm install                          # install all workspace deps

# tod-blog (Next.js)
pnpm -F tod-blog dev                  # dev server
pnpm -F tod-blog build                # static export + sitemap
pnpm -F tod-blog eslint:fix           # lint & fix this package

# articles (Docusaurus)
pnpm -F articles start                # dev server
pnpm -F articles build                # build to build/

# leetcode (Jest — the only package with tests)
pnpm -F @tod-workspace/leetcode test                                  # all tests
pnpm -F @tod-workspace/leetcode test src/lib/0020ValidParentheses     # single problem
pnpm -F @tod-workspace/leetcode test -- -t "test name"                # by test name

# lint everything (flat config at repo root)
npx eslint .
```

## Windows environment gotchas

This machine: Windows 11, Chinese locale (cp950), PowerShell 5.1 primary shell.

- **Hard rule: if the same command fails twice, stop retrying and change approach** (switch shell, rewrite the command, or split into steps). Do not retry a third time with cosmetic changes.
- Garbled output (`�` / boxes) from git or CLIs is an *encoding* artifact, not a failure. Check the exit code before reacting. For git, prefer `git log --oneline` / `--format=%s` and avoid piping Chinese text through `cmd`.
- PowerShell 5.1: no `&&` / `||` (use `A; if ($?) { B }`), no ternary/`??`/`?.`, default file encoding UTF-16 LE (always pass `-Encoding utf8` when writing files other tools will read), don't use `2>&1` on native executables.
- Prefer dedicated tools (Read/Grep/Glob/Edit/Write) over shell for file operations; use the Bash tool for POSIX one-liners like `diff -rq`.
- Paths: repo is `D:\code\tod-blog` (Git Bash: `/d/code/tod-blog`).

## Linting & formatting

- Root `eslint.config.mjs`: type-aware flat config (typescript-eslint + Prettier). Enforced: `import/order` (alphabetized groups, newlines between groups), `sort-imports` (member sorting), `@typescript-eslint/consistent-type-imports` (use `import type`).
- `packages/leetcode` and `packages/tod-blog` have their own `eslint.config.mjs` extending the root.
- Prettier config at root (`.prettierrc.json`); lint-staged runs `eslint --fix` + `prettier --write` on staged JS/TS.

## Git hooks & commits

- **Conventional Commits required** — enforced by commitlint (husky `commit-msg` hook).
- `pre-commit` runs lint-staged; if any staged file is under `packages/leetcode/`, it also runs `pnpm -F leetcode test --findRelatedTests` on those files. (`-F leetcode` filters by directory name and is equivalent to `-F @tod-workspace/leetcode` — both are valid; do not "fix" one into the other.) A failing related test blocks the commit. Never bypass hooks (`--no-verify`) without explicit user approval.

## Cross-agent skills

Skills are shared across Claude Code, Codex, and Antigravity:

- **`.agents/skills/` is the single source of truth** (read natively by Codex and Antigravity).
- **`.claude/skills/` contains full copies** (plain directories, NOT junctions/symlinks — verified 2026-07-11). They do not update automatically.
- After ANY change under `.agents/skills/`, sync: copy the changed skill dir over `.claude/skills/<name>` (delete on both sides when removing), then verify with `diff -rq .agents/skills .claude/skills` (Git Bash). If that diff is non-empty before you started, report it to the user instead of guessing which side wins.
- `skills-lock.json` tracks installed skills. Install with `npx skills@latest add <owner>/<repo> -a claude-code -a codex -a antigravity -y` (one `-s <name>` per skill; comma lists reportedly not parsed — from prior session experience, unverified against current CLI; if a comma list works, update this line); refresh with `npx skills update`.
- Known leftover: `.agents/skills/vercel-react-best-practices/` is still on disk/git but absent from the lockfile and `.claude/skills` — deletion candidate, confirm with user first.
