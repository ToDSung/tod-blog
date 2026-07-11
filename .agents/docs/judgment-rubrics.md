# Judgment Rubrics (for the executing model, to use when deciding)

Usage: when you encounter the situation described by a heading, read that section and follow its criteria. Each rule comes with a positive/negative example — if your situation more closely matches the negative example, don't apply that rule.

## 1. When to escalate to a stronger model

"Escalate" has only two executable actions: (i) specify a stronger model when dispatching a subagent (see the table in model-dispatch §1); (ii) stop and suggest the user switch to a stronger model before continuing — you cannot switch the session's own model yourself.

**Criteria: escalate if any of the following hold —**
(a) the task requires reasoning that stays consistent across 3 or more files/packages at once;
(b) you have used up your retry budget per model-dispatch §4;
(c) you notice you are "guessing" rather than "deriving" (your stated reasoning contains words like "should" or "probably" and can't be verified).

- ✅ Positive example: changing the composite setting in `tsconfig.base.json` affects the build of three packages at once — escalate, or dispatch a Plan agent.
- ❌ Negative example: a single Jest test fails and the error message clearly states the expected value — this is a mechanical fix, no escalation needed, just fix it.

## 2. When something actually counts as done

**Criteria: all of the following must hold —**
(a) every acceptance criterion is checked off individually (not "roughly met");
(b) there is verification evidence from outside your own context (test output, a fresh agent's read-back, an actual run's screenshot/log);
(c) no invisible half-finished work is left as "handle later" — if there is, state it explicitly and tell the user.

- ✅ Positive example: after adding a new LeetCode solution, you ran `pnpm -F @tod-workspace/leetcode test src/lib/XXXX`, pasted the passing output, and eslint is clean — done.
- ❌ Negative example: "all the files are changed, logically it should be fine" — missing (b), doesn't count as done. "The build passed" also doesn't count on its own: for a statically exported page, you must actually open it or build the corresponding HTML to have verified the behavior.

## 3. Signals that you're going the wrong way and should change approach rather than retry

**Criteria: if any of the following signals appear, stop and change approach (different method/tool/re-read the requirements) rather than patching the current approach —**
(a) the same error appears a second time, and your fix is only a surface change (different quoting, different path syntax);
(b) fixing A breaks B, then fixing B breaks A again (seesawing);
(c) to make the approach work, you keep needing more and more exceptions;
(d) you are fighting the framework/tool's default behavior (e.g., trying to make a statically exported Next.js app run server code).

- ✅ Positive example: writing a file in PowerShell fails with encoding errors twice in a row — switch to the Write tool or a Bash heredoc, rather than tweaking the `-Encoding` parameter a third time.
- ❌ Negative example: tests fail but each time with a different error, and each one represents progress (first an import error, then a type error, then an assertion off by 1) — this is normal convergence, keep going.

## 4. When to stop and ask the user

**Criteria: ask if any of the following hold; otherwise proceed autonomously —**
(a) the action is irreversible and exceeds the scope of the original request (deleting a file you didn't create, force push, publishing externally);
(b) the requirement has two or more reasonable interpretations, and choosing wrong would waste more than 30 minutes of work;
(c) it involves the user's taste/preference with no existing precedent to follow (design style, choice of deployment platform).

- ✅ Positive example: "add a comments feature to the blog" — third-party service or build it yourself? The cost differs by an order of magnitude, so ask first (you may attach a one-line tradeoff for each option).
- ❌ Negative example: while fixing a lint error, you notice the same kind of error on the next line — just fix it too and mention it in your report; don't ask "should I also fix that one?"

## 5. How to verify the quality floor (the bare minimum — cannot be reduced further)

General rule: a verification command failing to run because the **environment is missing a tool** (e.g., pnpm not on PATH) ≠ the change failing — report to the user "could not verify + reason"; don't conclude failure, and don't skip verification while pretending it passed.

Before delivering any change:

1. **Changed JS/TS** → `npx eslint .` is clean for that scope; changed leetcode → the relevant tests pass.
2. **Changed a tod-blog page** → `pnpm -F tod-blog build` succeeds (the static export has zero tolerance for server-only APIs; the build is the only cheap behavioral verification).
3. **Changed articles content** → `pnpm -F articles build` succeeds (Docusaurus will catch broken links).
4. **Changed a `.agents/` governance file** → follow [maintenance.md](maintenance.md): backup first, read-back after.
5. **Wrote a new rule/document** → ask yourself "could a Sonnet that hasn't read this conversation follow it?" — an observable definition: it doesn't need to ask any clarifying questions and can produce output that passes the acceptance criteria. If any part would require guessing, add a concrete example.

- ✅ Positive example: after changing one shared component in `components/`, you ran the tod-blog build and confirmed the three pages referencing it all exported successfully.
- ❌ Negative example: "it's just a Markdown change, no need to verify" — Docusaurus's MDX is sensitive to syntax; one broken tag fails the whole site build. Verify per item 3.

## 6. The honest exit when you can't be confident

When none of the above resolves it, choose one in order — do not force a result:
(1) produce your best attempt with uncertain sections explicitly marked, and hand the decision to the user;
(2) dispatch a second-opinion agent to review (see model-dispatch §5);
(3) state plainly that you cannot do it and why. Fabricating an answer that looks complete is the one and only unacceptable failure mode in this system.
