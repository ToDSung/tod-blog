# Cross-agent skills

Skills are shared across Claude Code, Codex, and Antigravity:

- **`.agents/skills/` is the single source of truth** (read natively by Codex and Antigravity).
- **`.claude/skills/` is generated, not edited** — it is gitignored and rebuilt from `.agents/skills/` by `scripts/sync-skills.mjs`. Run `pnpm skills:sync` after any change under `.agents/skills/` and after any `npx skills` install; `pnpm install` runs it too. It deletes each target directory before copying, so a symlink the skills CLI leaves behind is replaced by a real copy.
- `iso-24495-skill` is a **local skill**, deliberately not in `skills-lock.json`: it was cloned from `git@github.com:danyuchn/iso-24495-skill.git` at commit `113656b` and vendored (nested `.git` removed) rather than installed through the skills CLI, so `npx skills update` will not touch it and must not be expected to. To take upstream changes, re-clone into a temp dir, copy the content over `.agents/skills/iso-24495-skill/`, run `pnpm skills:sync`, and update the commit noted here. It backs [writing-standards.md](writing-standards.md).
- `skills-lock.json` tracks CLI-installed skills. Install with `npx skills@latest add <owner>/<repo> -a claude-code -a codex -a antigravity -y` (one `-s <name>` per skill; comma lists reportedly not parsed — from prior session experience, unverified against current CLI; if a comma list works, update this line); refresh with `npx skills update`.
- `vercel-react-best-practices`, `vercel-composition-patterns` and `shadcn` (official) are CLI-installed: all three are in `skills-lock.json` and have full copies under `.claude/skills`. They serve the `packages/ui` work (specs/ui-library/).
