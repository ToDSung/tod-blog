# Model Dispatch Rules (model-dispatch)

Applies to: Claude Code's main conversation. Codex / Antigravity have no equivalent subagent mechanism; when they read this file, they only need §2 onwards — the reporting contract, the escalation path, and the rule that verification cannot be self-verification.

## 0. Environment facts (measured 2026-09-09 against the Agent tool schema in the session prompt; if stale, update per maintenance.md)

- Subagent types available to the Agent tool: `claude` (catch-all, all tools), `general-purpose` (all tools), `Explore` (read-only search), `Plan` (planning), `claude-code-guide` (Claude Code/API questions).
- The Agent tool's `model` parameter accepts: `haiku`, `sonnet`, `opus`, `fable`.
- It also takes `isolation` (`worktree` gives the subagent its own git worktree) and `run_in_background` (subagents run in the background by default).
- **There is still no per-subagent effort/thinking parameter.** Reasoning effort follows the session setting, controlled by the user via the model menu. Any requirement in a document to "run at maximum effort" can only be approximated by choosing a stronger model.
- A subagent is a cold start: it cannot see the main conversation, so the prompt must be self-contained (full paths, background, acceptance criteria).

## 1. Delegation is the exception, not the default

The main conversation does the work. Context compaction and session resume make a long main thread cheaper than a cold-start subagent, and a subagent that cannot see the conversation acts on a second-hand brief: when the prompt names the wrong behaviour, nothing in the subagent's context contradicts it.

Delegate only in these three cases:

1. **Broad search** — the answer needs sweeping many files or naming conventions and only the conclusion matters.
2. **Independent batch work** that runs in parallel and whose acceptance criteria are mechanically checkable.
3. **Fresh-context verification** — §5 requires a reviewer who did not write the thing.

Outside those three, do it yourself, however many files it touches. A delegation prompt longer than the change it describes is the signal not to delegate.

The session's own instructions may forbid the Agent tool unless the user asks for it. Those instructions win: ask the user rather than delegating against them.

When you do delegate, this is who gets what:

| Work | Delegate to | model |
| --- | --- | --- |
| Scanning the repo, finding files, answering "where is X / how does X work" | Explore | haiku (broad scope or first attempt failed → sonnet) |
| Extensive web research, reading documentation | general-purpose | sonnet |
| Batch mechanical edits (changing imports, renaming, applying lint fixes) | general-purpose | sonnet |
| Architecture decisions, cross-package refactor planning | Plan | opus |
| Reviewing someone else's output | general-purpose (fresh context) | sonnet |

## 2. The three required parts of a delegation (none optional)

Every subagent prompt must include:

1. **Goal and motivation** — what to do and why (so it can make the right call in edge cases on its own).
2. **Acceptance criteria** — a mechanically checkable definition of done (tests pass, `npx eslint .` is clean, a given file exists and contains a given section).
3. **Report format** — an explicit required output shape (see §3).

Templates are in [delegation-templates.md](delegation-templates.md) — copy them directly, don't improvise.

## 3. Reporting contract

- A subagent reports only: conclusions, `file:line` references, and a list of failures. **Do not paste back large chunks of file content.**
- Long artifacts (reports, diff explanations, lists over 30 lines) are written to `.agents/docs/` or scratchpad, and the path is returned.
- The report must end with a line reading `STATUS: done | partial | blocked`; partial/blocked must include "what's finished, what's stuck, suggested next step."
- After the commander receives the report, it relays whatever matters to the user — the user cannot see the subagent's words directly.

## 4. Escalation/de-escalation path

- **haiku errs once → escalate directly to sonnet** (don't give haiku a second chance; retrying costs more than escalating).
- **sonnet fails the same subtask twice in a row → escalate to opus**, and must attach the complete failure trace (both prompts, both outputs, where each went wrong) — an escalation without a trace is just a more expensive retry.
- **De-escalate a solved pattern for batch application**: once opus/sonnet solves the first instance, write the "verified approach" as steps and hand it to sonnet/haiku to replicate across the remaining instances.
- **At most two rounds of escalation/de-escalation for the same issue.** If it still doesn't work, stop and report the failure trace and your hypotheses to the user — do not start a third round.

## 5. Verification is not self-verification

The person who wrote it cannot be the one who accepts it (the same context is blind to its own mistakes).

- **File output**: delegate to a fresh-context subagent to read back the file and check it against acceptance criteria item by item.
- **Code**: run tests or actually run the app (`pnpm -F @tod-workspace/leetcode test`, `pnpm -F tod-blog build`). "It compiles" does not mean "the behavior is correct" — for behavior changes with no test coverage, require the reviewer to actually execute it once.
- **High-risk judgment calls** (deleting things, changing shared config, publishing externally): get a second opinion — have another subagent review from the stance of "find how this plan would fail," or produce 2 candidates and let a reviewing agent pick the better one.
- The reviewing agent's prompt should give only the acceptance criteria and the location of the output — **do not** include leading language like "I just made this, it should be fine."

## 6. Harness limits (honesty clause)

The mechanisms above can make up for execution quality. They cannot make up for:

- **Ambiguous requirements**: decomposition is not a substitute for clarification. When a requirement is ambiguous, the only criterion is judgment-rubrics.md §4b: only ask if "choosing wrong would waste more than 30 minutes of work" — otherwise pick the reasonable interpretation, proceed, and explain the choice in the report.
- **Taste judgments** (copy tone, visual aesthetics, architectural preference): reviewing multiple samples can narrow the range, but cannot make the call for the user. Approach: produce 2–3 candidates with their respective tradeoffs, and let the user choose.
- **Knowledge that ages beyond this document**: model names, tool parameters — all of these go stale. When a rule conflicts with reality, defer to what's actually measured and update this file per maintenance.md.
