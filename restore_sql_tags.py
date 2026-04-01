#!/usr/bin/env python3
"""
For files in docs/integrations/, find lines where:
  - current state is plain ``` (no language tag)
  - the same line in main is ```sql (or ```sql title=...)
And restore them to the original ```sql tag.
"""

import os, re, subprocess, sys

DOCS_DIR = "/Users/kpohas/sumologic-documentation/docs/integrations"
REPO_ROOT = "/Users/kpohas/sumologic-documentation"
DRY_RUN = "--dry-run" in sys.argv

total_fixes = 0
total_files = 0

for root, dirs, files in os.walk(DOCS_DIR):
    dirs[:] = [d for d in dirs if not d.startswith('.')]
    for fname in sorted(files):
        if not (fname.endswith('.md') or fname.endswith('.mdx')):
            continue
        fpath = os.path.join(root, fname)
        rel = os.path.relpath(fpath, REPO_ROOT)

        # Get main version
        result = subprocess.run(
            ["git", "show", f"main:{rel}"],
            capture_output=True, text=True, cwd=REPO_ROOT
        )
        if result.returncode != 0:
            continue

        main_lines = result.stdout.splitlines(keepends=True)

        with open(fpath, encoding='utf-8', errors='replace') as f:
            current_lines = f.readlines()

        if len(current_lines) != len(main_lines):
            # Line counts differ — skip (too risky to match positionally)
            continue

        new_lines = current_lines[:]
        fixes = []

        for i, (cur, main) in enumerate(zip(current_lines, main_lines)):
            cur_s = cur.rstrip('\n')
            main_s = main.rstrip('\n')
            # Current is plain ``` (possibly indented), main is ```sql
            cur_is_plain = bool(re.match(r'^\s*`{3,}\s*$', cur_s))
            main_is_sql = bool(re.match(r'^\s*`{3,}sql\b', main_s))
            if cur_is_plain and main_is_sql:
                ending = '\r\n' if cur.endswith('\r\n') else '\n'
                restored = main_s + ending
                fixes.append((i + 1, cur_s, main_s))
                new_lines[i] = restored

        if fixes:
            total_files += 1
            total_fixes += len(fixes)
            for lineno, before, after in fixes:
                print(f"  {rel}:{lineno}  {before!r} → {after!r}")
            if not DRY_RUN:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.writelines(new_lines)

action = "Would restore" if DRY_RUN else "Restored"
print(f"\n{action} {total_fixes} sql tag(s) across {total_files} file(s).")
