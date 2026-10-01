#!/usr/bin/env bash
# Usage: probe.sh <source-file> <sed -E expression> <test-path relative to packages/ui> [backup-dir]
# Applies one mutation, runs that component's tests, restores the file byte for byte.
set -u

if [ $# -lt 3 ]; then
  echo "usage: probe.sh <source-file> <sed -E expression> <test-path> [backup-dir]" >&2
  exit 1
fi

file=$1
expression=$2
tests=$3
backup_dir=${4:-${TMPDIR:-/tmp}/ui-component-review-probe}

# Agent shells on this machine do not inherit the fnm-activated PATH (see AGENTS.md).
if ! command -v pnpm >/dev/null 2>&1 && [ -n "${APPDATA:-}" ]; then
  versions="$(cygpath -u "$APPDATA")/fnm/node-versions"
  latest=$(ls "$versions" 2>/dev/null | sort -V | tail -1)
  [ -n "$latest" ] && export PATH="$versions/$latest/installation:$PATH"
fi

mkdir -p "$backup_dir"
backup="$backup_dir/$(basename "$file").orig"
cp "$file" "$backup"
trap 'cp "$backup" "$file"' EXIT

sed -i -E "$expression" "$file"
if cmp -s "$file" "$backup"; then
  echo "probe changed nothing: the sed expression did not match $file"
  exit 2
fi

repo=$(git rev-parse --show-toplevel)
output=$(cd "$repo" && pnpm -F @tod-workspace/ui test "$tests" 2>&1)

cp "$backup" "$file"
if cmp -s "$file" "$backup"; then
  echo "restored: yes"
else
  echo "restored: NO, copy $backup back to $file"
  exit 3
fi

echo "failing tests:"
echo "$output" | grep -E '^\s*×' | sed -E 's/^\s*/  /' | sort -u
echo "$output" | grep -E 'Tests +[0-9]'
