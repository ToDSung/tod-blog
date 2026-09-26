# Test reviewer prompt

The coordinator pastes everything inside the fence into the Agent prompt and fills in the `{}` blanks. Add nothing else.

```text
Goal: rule on every test of the {component name} component ({test file paths}) — keep, delete or rewrite — and find the tests that are missing. The bar is "precise and efficient". Precise: every test fails when this component's own code breaks. Efficient: no two tests prove the same thing, and no test re-proves what Radix, Tailwind or the browser already guarantee.

Background: the repo is D:\code\tod-blog. `packages/ui` is a shadcn component library on Radix. Tests run on vitest 4 with React Testing Library: `*.test.tsx` in jsdom, `*.browser.test.tsx` in a real Chromium through Playwright. The owner does not read the code line by line and relies on the tests to prove each component correct. That makes a test that still passes after the component is swapped for a bare element worse than no test: it looks like protection and is not.

Read first:
- `.agents/docs/ui-conventions.md` §五. Items 1 and 7–10 are the rules; the steps below only break them into something you can apply one test at a time.
- The two entries in `.agents/docs/lessons.md` titled 「照著審查者的推理改，加了一段沒有東西能證明的快取」 and 「委派 prompt 指定錯行為，測試就測到原生繼承來的那一份」. They are the two ways test reviews have gone wrong here before.
- The target's source in {target folder}.
- The source of the Radix primitive it wraps, from GitHub: `https://github.com/radix-ui/primitives/tree/main/packages/react/<primitive>/src` (for example `alert-dialog`, `dialog`). Read only the part you need to confirm. Do not read `node_modules`: AGENTS.md forbids it and `.claude/settings.json` denies it.

Rules, applied to each `it`:
1. Ownership: which of these four provides the behaviour the test proves? This component's own code (classes, defaults, prop mapping and forwarding, how sub-components are composed); the wrapped primitive; native browser or jsdom semantics; Tailwind's conversion of a class into a value.
2. Only the first is a candidate to keep. The other three are "delete", with one exception: each family that wraps a primitive keeps one wiring test that fails when the primitive is replaced by a bare element, proving the component is actually connected to it (§五 item 7).
3. Tautology: a test that asserts what it put in itself — render a child, assert the child is there — is "delete" (§五 item 8).
4. Duplication: if two tests fail for the same set of changes and only for that set, keep the clearer one and mark the other "delete".
5. Queries and assertions: an element that has a role or accessible name but is found by test id, class name or DOM structure is "rewrite" (§五 item 1). Layout slots with no role, such as Header and Footer `div`s, may be found by their existing `data-slot`. Class-string assertions and values measured in browser tests follow §五 item 9: keep, rewrite as a jsdom `toHaveClass`, or delete.
6. Missing: every decision this repo made in the component's own code — a default that differs from upstream, a prop added or removed, a behaviour spec §5 describes — needs a test that fails when that decision breaks. List each gap as "missing".

Probe before every "keep":
1. Before the first probe, record `git status --porcelain` and `git diff --stat`.
2. For each test you intend to keep, make the smallest change that removes the behaviour it claims to prove — delete the class, change the default, replace the primitive with a bare element — and run it through the bundled script:

   bash .agents/skills/ui-component-review/scripts/probe.sh <source file> '<sed -E expression>' <test path relative to packages/ui> {probe backup directory}

   The script backs the file up, applies the edit, runs that folder's tests (about 4 seconds), restores the file byte for byte and prints the failing tests. It exists because the component under review may not be committed yet, so `git checkout` would wipe it; and because editing through the Edit or Write tools would trigger the repo's lint hook and send the probe's temporary errors to the coordinator.
3. Expect exactly this test, or this small group, to fail. If nothing fails, the test does not prove what it claims: change the verdict to "rewrite" or "delete".
4. When all probes are done, `git status --porcelain` and `git diff --stat` must match step 1. If they do not, you left a change behind; fix it before reporting.

Do not:
- modify tests or components other than through probe.sh, commit, or install packages;
- ask for a new test because something "could plausibly break". Every "missing" item names the line of code whose breakage the new test would catch.

Acceptance criteria: every test has a verdict; every "keep" names its probe (which line was changed to what, and which tests failed); every "delete" and "rewrite" names its rule number and one sentence of reasoning; the working tree ends as it began.

Report format:
- One table: test name, `file:line`, verdict (keep / delete / rewrite / missing), rule number, evidence (probe result or reasoning).
- After the table, one line of counts (keep, delete, rewrite, missing) and the folder's test run time.
- One line on the before/after working-tree comparison.
- If the report runs past 30 lines, write it to {report path} and return the path.
- The last line is always STATUS: done | partial | blocked. For partial or blocked, say what is finished, what is stuck and the suggested next step.
```
