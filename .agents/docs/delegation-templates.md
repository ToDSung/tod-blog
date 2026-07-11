# Delegation Prompt Templates

Usage: pick the task type → copy the whole block → fill in the `{...}` blanks → choose the subagent type and model per [model-dispatch.md](model-dispatch.md) §1. You may delete lines that don't apply, but you may not delete "Acceptance criteria" or "Report format."

Ending shared by all templates (must be attached to every prompt):

```text
Report format:
- Report only conclusions and "file:line" references — do not paste large chunks of file content.
- Any artifact over 30 lines should be written to {output file path} and the path returned instead.
- The last line must always be: STATUS: done | partial | blocked.
  For partial/blocked, include: what's finished, what's stuck, suggested next step.
```

## 1. Search (Explore, model: haiku; use sonnet for broad scope)

```text
Goal: answer "{specific question, e.g., where does the data go after the survey page's form is submitted}".
Motivation: {one sentence on why the main conversation needs this answer}.
Scope: search within {D:\code\tod-blog or a specific package}; search breadth {medium (single package, roughly know the location) / very thorough (cross-package, or unsure of naming conventions and need to scan multiple variants)}.
Do not: do not modify any files; do not read pnpm-lock.yaml, node_modules, out, build.
Acceptance criteria: every conclusion must be backed by at least one file:line reference; if not found, say "not found" explicitly plus the keywords and directories already searched — do not speculate.
```

## 2. Implementation (general-purpose, model: sonnet)

```text
Goal: {feature to build / bug to fix, one sentence} + {why it's needed}.
Starting point: relevant files {list of paths}; existing convention to follow {path to a similar existing implementation}.
Spec: {inputs/outputs/edge cases, itemized}.
Follow: AGENTS.md's lint and commit rules; use import type for type-only imports; do not add new dependencies (if a new dependency is needed, stop and report, STATUS: blocked).
Acceptance criteria (all must pass to count as done):
- {test command, e.g., pnpm -F @tod-workspace/leetcode test src/lib/XXXX} passes; paste the last 10 lines of output.
- npx eslint . has no errors within the changed scope.
- {if pages are involved} pnpm -F tod-blog build succeeds.
Do not: do not commit; do not modify files outside the spec; if you find a contradiction in the spec, stop and report it instead of deciding on your own.
```

## 3. Refactor (general-purpose, model: sonnet; for cross-package planning, dispatch Plan/opus first)

```text
Goal: change {target} from {current state} to {target shape}. Behavior must not change.
Motivation: {why this refactor is worth doing}.
Safety net: run {test/build command} first and record the baseline result; the result after refactoring must match.
Step constraints: one kind of transformation at a time (move first, then rename, then consolidate); the code must compile between each step.
Acceptance criteria:
- The baseline command's result matches before and after (paste both for comparison).
- git diff contains no behavior changes (adding new if statements/logic branches counts as a violation — report it).
- npx eslint . is clean.
Do not: do not "opportunistically" fix bugs or change anything beyond formatting — if you find a bug, note its location and report it as a separate task.
```

## 4. Research (general-purpose, model: sonnet; state explicitly when web lookups are needed)

```text
Goal: research "{question}", to support {what downstream decision}.
Source priority: official docs > source code > high-credibility blogs; every conclusion must cite a source URL or file:line.
Recency requirement: {e.g., information applicable to Next.js 15 / React 19; articles predating 2024 must be verified as still valid}.
Output: write to Markdown at {.agents/docs/research-{topic}.md}, including: TL;DR (≤5 lines), an options comparison table, recommendation with rationale, and a list of open questions.
Acceptance criteria: the TL;DR must let someone who hasn't read the full document make a decision directly; mark anything not found as "not found" rather than leaving it blank or guessing.
```

## 5. Review (general-purpose, model: sonnet; fresh context, the author must not review their own work)

```text
Goal: review {branch/diff range/file list}, from the stance of "find how this would fail," not "confirm it works."
Background: this change claims {original requirements/acceptance criteria, copied in item by item}.
Checklist:
- Verify each claimed acceptance criterion by actually running it (tests/build/read-back — "looks right" is not acceptable).
- Edge cases: {empty input, Chinese-character paths, Windows path separators, static-export limitations… pick based on the task}.
- Conflicts with AGENTS.md rules (lint, conventional commits, skills sync).
Acceptance criteria: every finding must include a file:line reference plus a one-sentence failure scenario (what input/state triggers it); if there are no findings, list what was verified and how — a bare "LGTM" is not acceptable.
```

## Anti-patterns (if you catch yourself writing these, go back and refill the template)

- "Take a look at X for me" — no acceptance criteria, the subagent will respond with a wall of prose.
- Pasting the entire main-conversation history into the prompt — a subagent only needs self-contained task information; pasting history just leaks tokens to it.
- "Do your best" — replace with a checkable condition, otherwise it's the same as saying nothing.
