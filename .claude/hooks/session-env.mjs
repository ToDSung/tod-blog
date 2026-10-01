import { appendFileSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const envFile = process.env.CLAUDE_ENV_FILE;
const versionsDir = join(process.env.APPDATA ?? '', 'fnm', 'node-versions');
if (!envFile || !existsSync(versionsDir)) {
  process.exit(0);
}

const toParts = version => version.replace(/^v/, '').split('.').map(Number);
const [latest] = readdirSync(versionsDir)
  .filter(name => /^v\d+\.\d+\.\d+$/.test(name))
  .sort((a, b) => {
    const [x, y] = [toParts(a), toParts(b)];
    return y[0] - x[0] || y[1] - x[1] || y[2] - x[2];
  });
const installDir = latest && join(versionsDir, latest, 'installation');
if (!installDir || !existsSync(join(installDir, 'pnpm'))) {
  process.exit(0);
}

// Git Bash sources this file, so the path must be POSIX-style (C:\x → /c/x).
const posixDir = installDir
  .replace(/^([A-Za-z]):/, (_, drive) => `/${drive.toLowerCase()}`)
  .replaceAll('\\', '/');
const line = `export PATH="${posixDir}:$PATH"\n`;
const current = existsSync(envFile) ? readFileSync(envFile, 'utf8') : '';
if (!current.includes(line)) {
  appendFileSync(envFile, line);
}
