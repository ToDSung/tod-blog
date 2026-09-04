import { spawnSync } from 'node:child_process';
import { extname, resolve } from 'node:path';

const LINTED = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);

const raw = await new Promise(done => {
  let data = '';
  process.stdin.on('data', chunk => (data += chunk));
  process.stdin.on('end', () => done(data));
});

const file = JSON.parse(raw || '{}')?.tool_input?.file_path;
if (!file || !LINTED.has(extname(file))) {
  process.exit(0);
}

const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const result = spawnSync(
  process.execPath,
  [
    resolve(root, 'node_modules/eslint/bin/eslint.js'),
    '--no-warn-ignored',
    resolve(root, file),
  ],
  { cwd: root, encoding: 'utf8' }
);

if (result.status !== 0) {
  process.stderr.write(`${result.stdout}${result.stderr}`);
  process.exit(2);
}
