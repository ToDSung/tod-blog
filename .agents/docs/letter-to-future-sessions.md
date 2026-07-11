# A Letter to Future Sessions

Written 2026-07-11, during the Fable 5 session that established this governance system. You (the reader) are most likely Sonnet or a smaller model — this system was designed for you. Just follow it; you don't need to be smarter than its designer.

## Three things nobody asks about, but that matter most

**1. Durable knowledge must go into the repo, not just into Claude's memory.**
The user works with Claude Code, Codex, and Antigravity at the same time. Claude's auto-memory (`~/.claude/projects/...`) is only visible to Claude; Codex and Antigravity start from a blank slate every time. So: any fact all three agents should know → goes into AGENTS.md or `.agents/docs/`; only preferences specific to the Claude workflow belong in memory. If you can't tell which it is, write it in both places.

**2. A governance file that isn't committed effectively doesn't exist.**
At the end of this session, CLAUDE.md, AGENTS.md, and `.agents/docs/*` are all on the `chore/matt-skills` branch, and some are still uncommitted. If you find these files aren't on main, your first priority is to remind the user to merge — otherwise the entire governance system evaporates on the next checkout. Likewise, for any change you make to a governance file, remind the user to commit before the turn ends.

**3. The number of skills installed is itself a token tax.**
There are currently 21 effectively installed mattpocock skills (`.agents/skills/` has 22 directories on disk — the extra one is the leftover `vercel-react-best-practices` pending deletion; `.claude/skills/` has 21). Each one's description gets loaded into every Claude session's system prompt, and several overlap in function (`code-review`/`review`/`security-review`; `grilling`/`grill-me`/`grill-with-docs`). If you observe that the user actually only uses a handful of them, propose trimming the rest (remove via `npx skills` + sync both directories). Trimming requires the user's consent (maintenance.md §1).

## Known unfinished items (handoff checklist)

- `.agents/skills/vercel-react-best-practices/` leftover (git still tracks its 49 files) — pending user go-ahead to delete + commit.
- The backend hasn't been started yet; when it is, start from the three questions in [backend-roadmap.md](backend-roadmap.md).
- (Verified 2026-07-11: `.claude/settings.local.json` is not tracked by git, no action needed; the copies in `.claude/skills/` are tracked, which is the skills CLI's expected behavior.)

## The most likely ways this system will degrade (and how to prevent it)

1. **Rule bloat creeping back**: AGENTS.md grows back past 300 lines, and the per-session tax returns. → maintenance.md §4's 150-line threshold; extract into a docs file once it's crossed.
2. **Documentation drifting from reality**: model names (haiku/sonnet/opus), tool parameters, and the skills list will all change; the docs won't update themselves. → whenever an "environment fact" is disproven by measurement, fix it on the spot per maintenance.md §1 and attach the date; don't quietly work around wrong documentation — the next session will just hit the same wall again.
3. **Ritualized busywork**: a weak model copies the delegation template but fills the acceptance criteria with "do it a bit better." → the template's anti-patterns section exists exactly for this; acceptance criteria must be mechanically checkable — if you can't write one, that means the task isn't actually well understood yet; go back to judgment-rubrics §4 to decide whether to ask.
4. **Verification degrading into self-endorsement**: under time pressure, fresh-context review is the first thing to get cut. → the floor: the five items in judgment-rubrics §5 are "the bare minimum, cannot be reduced further" — ask the user before dropping any of them.
5. **lessons.md turning into a junk drawer**: entries only get added, never cleaned up, and eventually nobody reads it. → the 30-entries/300-lines threshold triggers consolidation (maintenance.md §4); consolidation is a formal task, not something to do in passing.

## Honesty clause (quoted from model-dispatch §6, repeated here because it's the easiest thing to forget)

Decomposition, templates, and fresh-context verification can bring execution quality close to this session's level. What they cannot make up for: clarifying ambiguous requirements, making taste calls, or knowledge that has aged past what's written in this document. When you hit one of these three, the exit is always the same: ask the user, offer multiple candidates, or state plainly that you can't do it. Faking understanding is the one unacceptable failure mode.
