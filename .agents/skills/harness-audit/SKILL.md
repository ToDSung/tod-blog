---
name: harness-audit
description: Audit this repo's AI-agent harness — its instruction files, skills, settings and hooks — and propose ranked, evidence-backed fixes. Use when the setup has grown by accretion and nobody knows which parts still earn their keep.
disable-model-invocation: true
argument-hint: "Anything to focus on, or the name of a team repo convention to respect"
---

# Harness Audit

An agent harness accumulates. Someone adds a rule after a bad session, someone else installs a pack of skills, a hook gets written and never wired up. None of it is removed, because removing things needs evidence and adding things does not. A year in, the instruction files describe a system that no longer exists.

This audit finds the gap between what the harness claims and what it does, and closes it. The through-line: **a rule the harness can enforce should not be prose asking an agent to remember.** Most of what you find will be prose doing a machine's job, or a machine doing nothing at all.

The deliverable is a report. In a repo you do not own, stop there and let the owners choose. Only make edits when the person running this asks for them.

## Step 1: Map before judging

Do not assume this repo looks like any other. Find out what is actually here.

```sh
ls -a                                   # AGENTS.md? CLAUDE.md? .cursorrules? .github/copilot-instructions.md?
ls -R .claude .agents .cursor 2>/dev/null | head -50
cat .claude/settings.json .claude/settings.local.json 2>/dev/null
ls ~/.claude/settings.json              # user-level settings also shape every session here
git log --oneline -15 -- '*AGENTS.md' '*CLAUDE.md' .claude
```

Read the always-loaded instruction file end to end. Read the files it points to only if it points to them — that is the first thing you are auditing.

Note which agents this repo serves. A repo used by Claude Code, Codex and Cursor at once has a portability constraint that a single-agent repo does not: a fix that only Claude honours leaves the others on stale rules.

## Step 2: Measure

Numbers first, judgment second. Without them, an audit is just taste.

```sh
wc -c AGENTS.md CLAUDE.md .agents/docs/*.md      # adjust paths to what Step 1 found
git ls-files <skills-dir> | wc -l
grep -c '^## ' <lessons-or-changelog-file>
```

Separate what loads **every session** from what loads **on demand**. Only the first costs tokens at rest, and it is usually small. Optimising an on-demand file for size is wasted effort — optimise it for correctness instead.

For skills, count only the ones the model can invoke. A skill with `disable-model-invocation: true` contributes nothing to the system prompt; it is a slash command. An inventory that counts both together will overstate the cost and send you trimming things that are free.

## Step 3: The six things to look for

Each has a detection method and a shape of evidence. Report a finding only when you have run the check.

**1. Dead configuration.** A file that exists and nothing loads. Hooks are the usual case: the script is written, committed, and registered nowhere.

```sh
grep -rl "<hook-filename>" .claude ~/.claude/settings.json 2>/dev/null
```

Empty result means it has never run. Check custom commands, agent definitions and MCP configs the same way.

**2. Prose doing a machine's job.** Walk every imperative in the always-loaded file and ask: could a hook, a permission rule, a linter, a git hook, or CI enforce this instead? "Never read the lockfile" is a `permissions.deny` entry. "Run the linter before you finish" is a `PostToolUse` hook. "Keep the two directories in sync" is a script. Each conversion removes a rule the agent has to remember and replaces it with one that cannot be forgotten.

Before converting, time the mechanism. A check that takes 30 seconds should run async so it reports without blocking; a check that takes 30 seconds and blocks every edit will be disabled within a week.

**3. Generated content under version control.** Two directory trees kept in step by hand. Detect by looking for duplicate structure, then compare properly — hash both trees rather than trusting a file count, and do not trust a comparison command that never finishes:

```sh
git ls-files <dir-a> | wc -l; git ls-files <dir-b> | wc -l
```

The fix is to pick one source of truth, generate the other, gitignore it, and untrack it with `git rm -r --cached`. Drift stops being a rule to follow and becomes impossible.

**4. Documentation contradicting the live harness.** Two kinds. Stale environment facts — model names, tool parameters, directory listings, "verified" claims older than the tools they describe. And rules that fight the current harness: an instruction file demanding a workflow the session prompt forbids, or the reverse. Verify each factual claim against something you can observe now, and date the measurement when you correct it.

**5. Standing rules mixed with one-off artifacts.** Research notes, review reports and migration plans filed alongside the rules. Detect by asking which files the routing table or index actually references — the orphans are artifacts. Move them out. Then fix whatever produced them there, or the next one lands in the same place.

**6. Ritual that costs a step and buys nothing.** A required action whose benefit something else already provides — a mandated backup of files git already tracks, a verification step nobody can run, a checklist that restates the tool's own behaviour. Ritual is expensive precisely because it looks like diligence.

## Step 4: Rank and report

Order by value, not by the order you found them. Value is roughly: how often the failure bites, times how bad it is, divided by the cost of the fix. Dead config and hand-kept duplication are usually top; prose trimming is usually bottom.

Use this shape for each finding:

```
## <Finding, stated as the problem not the fix>

<What you measured, with the command output or file:line that proves it.>

做法：<the specific change, concrete enough to execute>
```

Say plainly which findings you are confident in and which are judgment calls the owner should decide. If a fix needs the owner's consent under the repo's own rules, say so and do not pre-empt it.

## Step 5: Team repos

A team repo changes the calculus, because the cost of a change is paid by people who are not in this conversation.

1. **Shared config and personal config are different files.** In Claude Code, `.claude/settings.json` is committed and applies to everyone; `.claude/settings.local.json` is gitignored and personal. Never promote someone's personal permission allowlist into the shared file — it grants their conveniences to the whole team. Put hooks and deny rules in the shared file, permissions in the personal one.

2. **A shared hook runs on every teammate's machine.** It must not assume a tool is installed, a shell is available, or a path exists, and it must behave on the slowest laptop on the team. A 30-second blocking hook that one person chose for themselves is hostile when pushed to eight people. Prefer async, and make failures loud rather than silent.

3. **Do not delete a rule you cannot explain.** Find out why it is there before proposing its removal:

   ```sh
   git log -S '<distinctive phrase from the rule>' --oneline -- <file>
   ```

   In a team repo a strange rule often encodes an incident you were not present for. Report what you found, propose the removal in the pull request, and let the people who were there decide.

4. **A rule nobody enforces is not a rule.** If the instruction file says a check always runs and CI does not run it, you have found a false claim, not a standard. Either wire it into CI or weaken the claim to match reality. Leaving it as-is teaches every reader that the file can be ignored.

5. **Land it as a reviewable pull request.** One concern per commit, with the measurement in the commit body, so a reviewer can accept the dead-hook fix and reject the doc restructuring independently. A single sweeping commit that rewrites shared governance is nearly impossible to review and will either be rubber-stamped or rejected whole.

6. **Check ownership.** `CODEOWNERS`, or the git history of the file, tells you who to ask. Governance files often have an owner who is not the person who asked for this audit.

## What a good audit does not do

It does not propose replacing the system with a better one. The instruction files encode decisions someone made for reasons; your job is to find the ones that no longer hold, not to relitigate all of them.

It does not add rules. A finding whose fix is "write a rule telling the agent to be more careful" is not a finding — that is the failure mode you are auditing. If the answer is not a mechanism, a deletion, or a correction, it is probably not worth reporting.

It does not report a problem it did not measure. "This file seems too long" is taste. "This file is 9.3 KB and loads every session, and 44% of the directory it routes to is never referenced" is a finding.

## Proving the fixes

If the owner asks you to apply the fixes, each one needs evidence that it works, not just that it was written:

- **A hook**: trigger it. Introduce a violation the hook should catch, confirm it reports, then remove the violation. A hook that was registered but never fired is the same dead config you started with.
- **A permission rule**: attempt the denied action once and confirm it is refused. Pick a cheap target — deny rules apply before the file is read, so a small file proves it as well as a large one.
- **A generated directory**: hash both trees and compare.
- **A moved file**: resolve every inbound link, and fix whatever template or rule would recreate the file in its old location.
- **A deleted rule**: grep for every other file that referenced it. Governance files cross-reference heavily, and a half-deleted rule is worse than the rule.
