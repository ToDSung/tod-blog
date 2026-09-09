import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, '.agents/skills');
const target = resolve(root, '.claude/skills');

if (!existsSync(source)) {
  console.log('no .agents/skills to sync');
  process.exit(0);
}

mkdirSync(target, { recursive: true });

const names = readdirSync(source, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name);
const wanted = new Set(names);

for (const entry of readdirSync(target, { withFileTypes: true })) {
  if (!wanted.has(entry.name)) {
    rmSync(resolve(target, entry.name), { recursive: true, force: true });
  }
}

for (const name of names) {
  // rm first so an installer-created symlink is replaced by a real copy
  rmSync(resolve(target, name), { recursive: true, force: true });
  cpSync(resolve(source, name), resolve(target, name), { recursive: true });
}

console.log(`synced ${names.length} skills to .claude/skills`);
