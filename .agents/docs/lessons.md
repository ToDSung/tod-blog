# Lessons (record of past mistakes)

Format and pruning rules are in [maintenance.md](maintenance.md) §3–§4. New entries are appended at the end of the file.

## 2026-07-11 .claude/skills are copies, not junctions
- Context: auditing the cross-agent skills-sharing mechanism.
- Mistake: both AGENTS.md and the memory file claimed `.claude/skills/` consists of NTFS junctions; measurement (`fsutil reparsepoint query` reported "not a reparse point") showed they are full directory copies instead; also, `vercel-react-best-practices` had only been deleted from the `.claude` side — `.agents/skills/` still had a leftover copy that git was still tracking.
- Fix: established `.agents/skills/` as the single source of truth + manual sync after edits + run `diff -rq .agents/skills .claude/skills` before starting work.
- Codified?: written into AGENTS.md's "Cross-agent skills" section.

## 2026-07-11 garbled git output under Chinese locale
- Context: running `git log` in a Git Bash pipeline.
- Mistake: Chinese commit messages and cmd output came out garbled (`���~ 4390`), which is easily misread as a command failure and triggers pointless retries.
- Fix: check the exit code first; use `git log --oneline` or `--format=%s` to inspect commits; avoid piping Chinese output through `cmd /c` again.
- Codified?: written into AGENTS.md's "Windows environment gotchas" section.

## 2026-07-11 pnpm/gh not on agent-shell PATH; pnpm lives in the fnm install dir
- Context: committing from an agent session; the husky commit-msg hook runs `pnpm dlx commitlint` and failed with exit 127 (`pnpm: command not found`).
- Mistake: agent shells don't inherit the user's fnm-activated PATH; pnpm is not globally installed. `gh` is not installed at all, so PRs cannot be created via CLI (and no HTTPS GitHub credential is stored — remote is SSH).
- Fix: prepend the fnm installation dir before committing:
  `export PATH="/c/Users/user/AppData/Roaming/fnm/node-versions/v24.11.1/installation:$PATH"` (contains pnpm/pnpm.CMD; the version segment changes when Node is upgraded — `ls /c/Users/user/AppData/Roaming/fnm/node-versions` to find the current one). For PRs, push the branch and give the user a prefilled `https://github.com/ToDSung/tod-blog/compare/main...<branch>?quick_pull=1&title=...&body=...` link instead.
- Codified?: no (second occurrence should promote this into AGENTS.md's gotchas section).
