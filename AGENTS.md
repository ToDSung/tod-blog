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
| Add or modify a component under `packages/ui/src/` (including any `shadcn add`) | [.agents/docs/ui-conventions.md](.agents/docs/ui-conventions.md) |
| Write or modify source code in any package (comments, JSDoc, `eslint-disable`, `@ts-expect-error`) | [.agents/docs/code-comments.md](.agents/docs/code-comments.md) |
| Add a backend / API / server to this repo | [.agents/docs/backend-roadmap.md](.agents/docs/backend-roadmap.md) |
| Start a long or ambitious session; or something feels off about these docs | [.agents/docs/letter-to-future-sessions.md](.agents/docs/letter-to-future-sessions.md) |
| Understand why these rules exist | [.agents/docs/harness-diagnosis.md](.agents/docs/harness-diagnosis.md) |
| Write or revise any document (`specs/`, `.agents/docs/`, READMEs) | [.agents/docs/writing-standards.md](.agents/docs/writing-standards.md) |
| Install, update, or edit a skill (`.agents/skills/`, `skills-lock.json`); never edit `.claude/skills/` — it is generated | [.agents/docs/skills.md](.agents/docs/skills.md) |

Prose written in this repo — internal documents and replies to the owner alike — follows that writing standard: Taiwan Traditional Chinese usage, sparing Markdown emphasis, every "done" backed by evidence. It builds on the `iso-24495-skill` plain-language skill; read the standard before writing a document, not after.

Lessons learned live in [.agents/docs/lessons.md](.agents/docs/lessons.md) — append new entries there per the format in maintenance.md.

## Repository overview

pnpm workspace monorepo (`packages/*`) — ToD's personal blog and AI-development testbed. The owner primarily develops via AI agents and uses this repo to probe their limits; expect experimental branches and agent-authored code.

Never read these into context: `pnpm-lock.yaml` (694 KB), `node_modules/`, `out/`, `build/`, `.next/`, `.docusaurus/`. To check a dependency version, Grep the relevant `package.json`.

## Commands

Use **pnpm** from the repo root; target a package with `-F <name>`.

## Windows environment gotchas

This machine: Windows 11, Chinese locale (cp950), PowerShell 5.1 primary shell.

- **Hard rule: if the same command fails twice, stop retrying and change approach** (switch shell, rewrite the command, or split into steps). Do not retry a third time with cosmetic changes.
- Garbled output (`�` / boxes) from git or CLIs is an *encoding* artifact, not a failure. Check the exit code before reacting. For git, prefer `git log --oneline` / `--format=%s` and avoid piping Chinese text through `cmd`.
- PowerShell 5.1: no `&&` / `||` (use `A; if ($?) { B }`), no ternary/`??`/`?.`, default file encoding UTF-16 LE (always pass `-Encoding utf8` when writing files other tools will read), don't use `2>&1` on native executables.
- Prefer dedicated tools (Read/Grep/Glob/Edit/Write) over shell for file operations; use the Bash tool for POSIX one-liners like `diff -rq`.
- Paths: repo is `D:\code\tod-blog` (Git Bash: `/d/code/tod-blog`).
- **pnpm not on agent-shell PATH** (husky hooks need it — commit fails with exit 127 otherwise). Before `git commit` in Git Bash: `export PATH="/c/Users/user/AppData/Roaming/fnm/node-versions/v24.11.1/installation:$PATH"` (version segment changes on Node upgrades — `ls /c/Users/user/AppData/Roaming/fnm/node-versions` for the current one). `gh` is not installed and the remote is SSH: for PRs, push the branch and give the user a prefilled `https://github.com/ToDSung/tod-blog/compare/main...<branch>?quick_pull=1&title=...` link.

## Git hooks & commits

- **Commit only when the user asks.** Finish the change, verify it, report what you did, and leave the result in the working tree for the user to read; the user decides when it becomes a commit. The same holds for anything that rewrites or publishes history (`commit --amend`, `rebase`, `reset`, `push`). Subagents never commit — say so in the delegation prompt (see [.agents/docs/delegation-templates.md](.agents/docs/delegation-templates.md)).
- **Conventional Commits required** — enforced by commitlint (husky `commit-msg` hook).
- `pre-commit` runs lint-staged; if any staged file is under `packages/leetcode/`, it also runs `pnpm -F leetcode test --findRelatedTests` on those files. (`-F leetcode` filters by directory name and is equivalent to `-F @tod-workspace/leetcode` — both are valid; do not "fix" one into the other.) A failing related test blocks the commit. Never bypass hooks (`--no-verify`) without explicit user approval.
