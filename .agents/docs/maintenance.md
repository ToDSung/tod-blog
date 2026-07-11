# Governance File Maintenance Protocol

Covers: AGENTS.md, CLAUDE.md, `.agents/docs/*`, `.agents/skills/*`. Purpose: let a weak model update governance safely, without breaking it.

## 1. Permission tiers

**May edit directly (just report it after editing):**
- Appending a lesson to [lessons.md](lessons.md) (format per §3).
- Correcting an "environment fact" (model name, tool parameter, path) that measurement has disproven — must include the verification method and date at the point of change.
- Fixing typos, broken links, stale filename references.

**Ask the user first:**
- Deleting or substantially rewriting any rule (including ones you believe are "obviously outdated" — explain your reasoning and let the user press delete).
- Changing the structure of AGENTS.md's routing table, or adding content that would be loaded every session (this directly affects the token cost of every future session).
- Touching `.agents/skills/` (install/remove/content changes), `skills-lock.json`, `.claude/settings.local.json`, husky hooks.
- Any change that moves in the direction of "loosening verification requirements."

## 2. Change process (steps cannot be skipped)

1. **Backup** (Git Bash, one line, `cp` won't create the directory itself so `mkdir -p` is required):
   `mkdir -p .agents/backup/$(date +%F) && cp <file> .agents/backup/$(date +%F)/`
2. Make the change. For large new content → open a new file + add one line to AGENTS.md's routing table; don't stuff long content into the body of AGENTS.md itself.
3. **Read-back**: re-read the changed file to confirm it's complete and links are valid (referenced files actually exist).
4. Cross-agent sync check: if you changed `.agents/skills/`, sync `.claude/skills/` too (see the "Cross-agent skills" section in AGENTS.md).

## 3. Writing back lessons (lessons.md)

After hitting a snag (wasted >10 minutes, or the same kind of mistake happens a second time), append to the end of lessons.md using this fixed format:

```markdown
## YYYY-MM-DD {one-line title}
- Context: {what you were doing}
- Mistake: {what actually happened, with the key line of the error message}
- Fix: {how it was ultimately resolved, with copy-pasteable commands/steps}
- Codified?: {no / proposed / written into <filename> §<section>}
```

Criterion for "Codified?": if the same kind of snag happens a second time → propose upgrading it into a formal rule in AGENTS.md or the relevant docs file (the upgrade itself follows the permission tiers in §1).

## 4. Pruning cycle

- lessons.md exceeds **30 entries or 300 lines** → do a consolidation pass: merge duplicates, remove entries that have already been codified (the rule already lives in a formal file, the lessons file doesn't need to keep a copy too), mark entries unseen for over a year in a since-changed environment as stale and delete them. Back up first (§2 step 1).
- `.agents/backup/` keeps only the most recent **3 backups** per file; delete anything older.
- AGENTS.md exceeds **150 lines** → check what content can be extracted into a docs file plus a one-line route.

## 5. Conflict resolution

- Rules conflicting between files: precedence is **AGENTS.md > individual docs files > lessons.md**; immediately log a "conflict found" entry in lessons.md and propose a fix.
- Documentation conflicting with reality (command doesn't exist, path is wrong): defer to what's actually measured, and fix the doc following the "may edit directly" process in §1.
- Documentation conflicting with the user's current instruction: the user's instruction wins, but if the instruction would permanently change governance, confirm with one line: "is this a one-time exception, or should the rule change?"
