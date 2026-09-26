---
name: ui-component-review
description: First-pass review of a packages/ui component before the owner sees it. Spawns two fresh-context subagents in parallel — one checks cross-component consistency (spacing, sizing, focus rings, state styles) and API minimalism (sub-components, props and stories with no use case), the other rules on every test (keep / delete / rewrite / missing) and proves each keep with a mutation probe. Use this whenever a component, a family of sub-components, or a composed component under packages/ui/src has just been added or changed and its checks are green, before reporting it to the owner, even if nobody asked for a review. Also use it when the owner asks to review, audit or sweep existing ui components or their tests.
---

# ui-component-review

The owner does not read component code line by line. They look at Storybook and decide. This skill exists so that, by the time they look, the problems they have repeatedly sent back are already caught:

- values that drift from sibling components, such as a 3px focus ring after every other control moved to 2px;
- sub-components, props and stories copied from shadcn upstream with no use case in this repo;
- tests that would still pass if the component were replaced by a bare HTML element, or that re-test what Radix and Tailwind already guarantee.

Two reviewers who did not write the component do the checking, because the author's context is blind to the choices it made without noticing.

## When to run

- A component (with its family) is written and `npx eslint .`, `pnpm -F @tod-workspace/ui typecheck` and `pnpm -F @tod-workspace/ui test` are green, and you are about to report it to the owner.
- The owner asks to review or sweep an existing component. Review one component per run: the owner reviews one component at a time, and a batch of findings across five components loses their attention.

In the AlertDialog pilot each reviewer took 12–19 minutes and about 170–190k Sonnet tokens. Launch them in the background and keep working; you are notified when they finish.

## Steps

1. Collect the blanks the two prompts need:
   - the component name and its folder (`packages/ui/src/components/<Name>`; composed components live in `composed/`, theme components in `theme/`);
   - the shadcn registry name in kebab-case (for example `alert-dialog`), or "none" for composed components, plus the list of deliberate differences from upstream you made while implementing;
   - the component's test files;
   - a work directory outside the repo for the snapshot, the inventory, probe backups and both reports. In Claude Code use the session scratchpad. Reports are one-off artifacts and never go into the repo.
2. Record the working tree, run the class inventory and snapshot the target folder:

   ```sh
   git status --porcelain > <work>/before-status.txt
   git diff > <work>/before.diff
   node .agents/skills/ui-component-review/scripts/class-inventory.mjs packages/ui/src > <work>/inventory.md
   cp -r <target-folder> <work>/snapshot/
   ```

   The test reviewer mutates the target folder while probing. The design reviewer reads the snapshot instead, so it never sees a half-mutated file.
3. Spawn both reviewers in one message (`general-purpose`, model `sonnet`, in the background). Paste [references/design-review-prompt.md](references/design-review-prompt.md) and [references/test-review-prompt.md](references/test-review-prompt.md) verbatim and fill in only the blanks. Do not add framing such as "I just built this, it should be fine": it biases a reviewer toward approval. Do not edit the target folder until both reports are back.
4. Compare the working tree with step 2. A difference means a probe was not restored; restore from the snapshot before doing anything else.
5. Triage the two reports:
   - A rule violation that cites a written rule, or a test verdict backed by a probe: fix it, then rerun eslint, typecheck and the tests.
   - A finding that is reasoned but not demonstrated: first write a test or probe that fails because of the problem. If you cannot make it fail, drop the finding. A reviewer once reasoned that a cache was needed; the version without the cache passed the same test, so the cache was dead weight.
   - An undocumented divergence or a taste call: change nothing and list it under 需要你決定.
   - If the design reviewer proposes deleting a sub-component or prop, hold the test reviewer's "missing test" items for it until the owner decides whether it stays.
6. When the owner decides something, write it into `.agents/docs/ui-conventions.md` §六 or `specs/ui-library/spec.md` in the same session. A decision that lives only in the conversation is invisible to the next review, and the next reviewer will recommend undoing it. When the same visual rule is broken a second time, propose enforcing it with a `no-restricted-syntax` rule in the root `eslint.config.mjs`.

## Report to the owner

Write the report in Taiwan Traditional Chinese following `.agents/docs/writing-standards.md`; the reviewer reports themselves may be in English. Use these sections in this order:

1. 與上游的差異: a table of item, upstream, this version, reason.
2. 審查已修正: one line per fix, with its evidence (the probe result, or the `file:line` it was compared against).
3. 需要你決定: one line per question, with the recommended option and the components it affects.
4. 測試判定: how many tests were kept, deleted, rewritten and added, plus one line on the probe results.
5. 驗收: the results of eslint, typecheck, test and `storybook:build`.

## Without a subagent tool

Codex and Antigravity have no subagents. Run the two prompts yourself, one after the other, and make the first line of the report 「審查與實作在同一個 context，不算獨立審查」, so the owner knows the review had the author's blind spots.

## Bundled scripts

- `scripts/class-inventory.mjs [src-dir]`: for each class family (focus ring, height, radius, font size, gap, shadow, overlay…), lists which components use which value. Two values in one family is the signal to look closer.
- `scripts/probe.sh <file> <sed-expression> <test-path> [backup-dir]`: applies one mutation to a source file, runs that component's tests, restores the file byte for byte and prints the tests that failed.
- `scripts/upstream-source.mjs <registry-name> [style]`: prints the shadcn source for a registry item (style defaults to `radix-nova`, the preset this repo uses).
