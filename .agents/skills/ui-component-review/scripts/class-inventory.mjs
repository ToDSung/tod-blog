import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? 'packages/ui/src');

const families = [
  ['focus ring', /focus-visible\]?:ring-(\d|\[.+\])$/],
  ['invalid ring', /aria-invalid(?:=true\]\])?:ring-(\d|\[.+\])$/],
  ['hover and active ring', /(?:^|:)(?:hover|active):ring-(\d|\[.+\])$/],
  ['static ring', /^ring-(\d)$/],
  ['height', /^h-(.+)$/],
  ['size', /^size-(.+)$/],
  ['min width', /^min-w-(.+)$/],
  ['max width', /^(?:.*:)?max-w-(.+)$/],
  ['radius', /^rounded(-.+)?$/],
  ['font size', /^(?:md:)?text-(xs|sm|base|lg|xl|2xl|\[[^\]]+\])$/],
  ['svg size', /_svg.*:size-(.+)$/],
  ['gap', /^gap(?:-[xy])?-(.+)$/],
  ['padding', /^p[xytblr]?-(.+)$/],
  ['shadow', /^shadow(-.+)?$/],
  ['overlay', /^bg-black\/(\d+)$/],
];

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory())
      return entry.name === '__screenshots__' ? [] : walk(full);
    return /\.tsx$/.test(entry.name) &&
      !/\.(test|stories)\.tsx$/.test(entry.name)
      ? [full]
      : [];
  });

const table = new Map();
for (const file of walk(root)) {
  const component = path.basename(file, '.tsx');
  const source = fs.readFileSync(file, 'utf8');
  const literals = source.match(/'[^'\n]*'|"[^"\n]*"|`[^`]*`/g) ?? [];
  for (const literal of literals) {
    for (const token of literal.slice(1, -1).split(/\s+/)) {
      for (const [family, pattern] of families) {
        if (!pattern.test(token)) continue;
        const values = table.get(family) ?? new Map();
        const users = values.get(token) ?? new Set();
        users.add(component);
        values.set(token, users);
        table.set(family, values);
      }
    }
  }
}

for (const [family] of families) {
  const values = table.get(family);
  if (!values) continue;
  console.log(`\n## ${family}\n`);
  console.log('| class | count | components |\n| --- | --- | --- |');
  for (const [token, users] of [...values].sort(
    (a, b) => b[1].size - a[1].size
  )) {
    console.log(
      `| \`${token}\` | ${users.size} | ${[...users].sort().join(', ')} |`
    );
  }
}
