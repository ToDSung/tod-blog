# Harness Quick Diagnosis (2026-07-11, established by a Fable 5 session)

This document is the basis for all subsequent governance files that follow. The three biggest problems, ranked by severity, each come with "Evidence → Fix → Referencing files".

## Problem 1: Files shared across the three agents have already drifted, and the docs no longer match reality (easiest to get wrong)

**Evidence (measured 2026-07-11):**

- The old AGENTS.md claimed `.claude/skills/` consists of NTFS junctions pointing to `.agents/skills/`. Measured (`fsutil reparsepoint query`, `cmd /c dir`): they are **full directory copies**, not junctions.
- `.agents/skills/` has 22 directories, `.claude/skills/` has only 21: commit `6b54b7d` ("chore: delete vercel-react-best-practices") only deleted the `.claude` side. `.agents/skills/vercel-react-best-practices/` is still on disk and git still tracks its 49 files, but `skills-lock.json` no longer includes it.
- The user's Claude memory file also, for a while, recorded the same wrong fact ("junctions").

**Why this is dangerous:** A weak model treats documentation as fact. If it believes these are junctions, it will "only edit the `.agents/skills/` copy" and let `.claude/skills/` silently go stale. The three agents (Claude Code, Codex, Antigravity) would each end up reading a different version of a skill.

**Fix (now codified):**

1. `.agents/skills/` is the single source of truth. Any skill content change is made only here.
2. After editing, sync must happen: `Copy-Item -Recurse -Force .agents\skills\<name> .claude\skills\` (PowerShell) or `cp -rf .agents/skills/<name> .claude/skills/` (bash). When deleting, delete on both sides and update `skills-lock.json`.
3. Before touching skills, always run a drift check first: `diff -rq .agents/skills .claude/skills` (Git Bash). If there is a difference, report it to the user first — do not guess which side is correct.
4. TODO (needs user confirmation): clean up the leftover `.agents/skills/vercel-react-best-practices/`.

## Problem 2: The main conversation does the work itself, burning context on large reads (biggest token leak)

**Evidence:** Every session starts by loading CLAUDE.md → AGENTS.md, the memory index, and descriptions of 21 skills. On top of that, if the main conversation also Reads entire files itself, scans the repo, or reads large files like `pnpm-lock.yaml` (694 KB), context fills up within a few turns, and afterward the model starts forgetting earlier instructions and re-asking already-answered questions.

**Fix (now codified, see [model-dispatch.md](model-dispatch.md) for details):**

- Large reads, repo scans, web lookups, and batch file edits are always delegated to a subagent (Explore / general-purpose); the main conversation only receives conclusions and `file:line` references.
- Never Read: `pnpm-lock.yaml`, `node_modules/`, `out/`, `build/`, `.next/`. To check a dependency version, use `Grep` or read that package's own `package.json`.
- Before reading a file, first think "do I need the whole file or just a section?"; for files over 300 lines, locate with Grep first, then read with an offset/limit.

## Problem 3: Windows + PowerShell 5.1 pitfalls causing wasted, spinning retries (biggest cause of losing focus)

**Evidence:** This machine is Windows 11 with a Chinese system locale (cp950). Measured: Chinese `git log` output becomes garbled in a pipeline (`���~ 4390`); PowerShell 5.1 has no `&&`/`||`, its default file encoding is UTF-16 LE, and `2>&1` wraps a native command's stderr into an ErrorRecord. When a weak model hits these error messages, the common behavior is to retry as-is or retry with different quoting, burning an entire round of context while making no progress.

**Fix (now written into AGENTS.md's environment-gotchas table):**

- The same command failing twice = stop retrying, switch approach (different Bash tool, different syntax, or break into steps). This is a hard rule, not a suggestion.
- Command substitution table: see the "Windows environment gotchas" section in AGENTS.md.
- Seeing garbled text (`�` or box characters) does not by itself mean the command failed — check the exit code first, then decide whether encoding needs handling.

## Cross-references

| File | Role |
| --- | --- |
| [model-dispatch.md](model-dispatch.md) | Fixes Problem 2: delegation, model selection, reporting contract |
| [judgment-rubrics.md](judgment-rubrics.md) | Fixes Problem 3: when to stop retrying, when to escalate |
| [maintenance.md](maintenance.md) | Fixes Problem 1: update and sync rules for shared files |
| AGENTS.md | The routing + environment-gotchas table loaded every session |
