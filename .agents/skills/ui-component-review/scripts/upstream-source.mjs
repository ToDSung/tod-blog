const [name, style = 'radix-nova'] = process.argv.slice(2);

// process.exit() while fetch's socket is closing crashes libuv on Windows.
const fail = message => {
  console.error(message);
  process.exitCode = 1;
};

if (!name) {
  fail(
    'usage: node upstream-source.mjs <registry-name> [style], e.g. alert-dialog'
  );
} else {
  const response = await fetch(
    `https://ui.shadcn.com/r/styles/${style}/${name}.json`
  );
  if (!response.ok) {
    fail(`${response.status} ${response.statusText}`);
  } else {
    const item = await response.json();
    for (const file of item.files ?? []) {
      console.log(`// ===== ${file.path}\n${file.content}`);
    }
  }
}
