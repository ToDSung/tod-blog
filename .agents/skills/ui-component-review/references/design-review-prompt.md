# Design reviewer prompt

The coordinator pastes everything inside the fence into the Agent prompt and fills in the `{}` blanks. Add nothing else.

```text
Goal: review the {component name} component in `packages/ui` and find (1) where it is out of step with the rest of the library — spacing, sizing, radius, focus and invalid rings, state styles — and (2) sub-components, props, variants and stories that were built without a use case. Your stance is "find what the owner would send back", not "confirm it works".

Background: the repo is D:\code\tod-blog. `packages/ui` is a component library built from shadcn (radix-nova preset) on Radix, Tailwind v4 and cva. shadcn hard-codes values in each component file instead of sharing tokens, so consistency across components only exists if someone compares them. The owner reviews every component in Storybook, and the components they have sent back fall into exactly those two groups: values that drift from sibling components, and upstream sub-components or props copied in with no use case. Your job is to catch both before the owner sees the component.

Read first:
- The target component's source from the snapshot at {snapshot path}. Another reviewer is temporarily mutating the live folder {target folder} while you work, so read the target only from the snapshot; read every other component from the repo as usual. Cite repo paths, not snapshot paths, in your report.
- `.agents/docs/ui-conventions.md`, especially §五 item 3 (story rules) and §六 (API conventions and visual baselines).
- `specs/ui-library/spec.md` §2 (decisions such as D14–D16) and §5 (which sub-components each family keeps and how it differs from upstream).
- The class inventory at {inventory path}: for each Tailwind class family, which components use which value.
- The upstream source: run `node .agents/skills/ui-component-review/scripts/upstream-source.mjs {registry name}` (skip this for composed components, which have no upstream).
- The differences from upstream the implementer made on purpose: {deliberate differences, or "none"}.

Check 1: consistency across components
1. Put the target in a role group and use the group's existing members as the baseline. The groups today are below; if the target fits none of them, say which components you compared it with and why.
   - Text entry: Input, Textarea, SelectTrigger, InputGroup
   - Buttons: Button, IconButton, InputGroupButton, AlertDialogAction, AlertDialogCancel
   - Selection controls: Checkbox, RadioGroupItem, Switch, Slider
   - Modal content: DialogContent, AlertDialogContent, SheetContent, with their Header, Footer, Title, Description and Overlay
   - Menu surfaces: DropdownMenuContent, SelectContent, with their Item, Label and Separator
   - Field text: Label, FieldLabel, FieldDescription, FieldError
2. Compare the target's values in the inventory with the group, family by family: height for each of sm/md/lg, horizontal padding, radius, font size, icon size, gap, focus ring width, invalid ring width, min-width, shadow, overlay opacity. If the group already disagrees internally in a family, report that too.
3. State coverage: list the states the group styles (hover, focus-visible, disabled, aria-invalid, read-only, data-checked, data-state=indeterminate, open) and confirm the target styles every one of them with the same values.
4. Matching parts across families: the corresponding sub-components of sibling families (for example DialogFooter, AlertDialogFooter, SheetFooter) should agree on padding, gap, button arrangement and background.
5. For every divergence, decide whether a written rule supports it: a decision in spec §2, a component note in spec §5, or ui-conventions §六. A divergence with written support is not a finding. Upstream disagreeing with itself is not written support: this repo copies each upstream file separately, so an upstream inconsistency becomes this repo's inconsistency. Report it.

Check 2: API minimalism
1. List every export of the target (`index.ts`), every prop it declares, every cva variant value and every story.
2. Mark where each came from: copied from upstream, added in this repo, or dropped from upstream.
3. For each sub-component that was copied or added, decide whether it has a use case. It has one if any of these holds: it appears in one of the family's stories (the stories show how the family is meant to be composed); another kept sub-component renders it internally (as Content renders Overlay and Portal); or code outside `packages/ui`, or a component in `packages/ui/src/composed`, uses it. If none holds and only tests use it, mark it "candidate for deletion", citing spec §5: sub-components are kept only when they have a use case. Never propose adding a story just to make an unused sub-component visible; that inverts the rule.
4. Apply the same test to props and variant values: one that no story shows and nothing outside `packages/ui` uses is a "candidate for deletion".
5. A prop whose type was copied from upstream but whose shape serves an integration this repo does not use (for example an array of react-hook-form error objects) is a "candidate for simplification". Write the simpler type.
6. Stories: per ui-conventions §五 item 3, each story shows one prop value or state of this component. A story that only varies the children, or shows what another story already shows, is a "candidate for deletion".

Do not:
- modify any file or commit;
- propose new abstractions, new variants or "while we're here" improvements. Every recommendation is one of: align with the group, delete, or simplify;
- comment on anything ESLint already enforces (import order, arrow functions, prop ordering).

Acceptance criteria: every finding carries (a) the target's `file:line` with the class or code quoted, (b) the evidence it contradicts — a sibling's `file:line`, or the spec or ui-conventions clause, and (c) a category. For every check that produced no finding, state what you checked, how, and the result. "Looks fine" is not acceptable.

Categories (there are only three):
- Rule violation: contradicts a written rule. The coordinator fixes these directly.
- Undocumented divergence: out of step with the group, with no written rule on either side. Say which side you would align to and why; the owner decides.
- Taste: a visual judgement with no group baseline to compare against. List it without a verdict.

Report format:
- One table of findings: number, category, target `file:line`, evidence, one-sentence description, smallest fix (which class to change or which export to delete, in one line).
- After the table, one line per check that produced no finding.
- If the report runs past 30 lines, write it to {report path} and return the path.
- The last line is always STATUS: done | partial | blocked. For partial or blocked, say what is finished, what is stuck and the suggested next step.
```
