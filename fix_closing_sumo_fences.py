#!/usr/bin/env python3
"""
Fix erroneous ```sumo closing fences.
A closing code fence must be plain ``` (no language tag).
Any line that is exactly ```sumo while inside an open code block is wrong.
This script replaces those lines with plain ```.
"""

import os
import re
import sys

DOCS_DIR = "/Users/kpohas/sumologic-documentation/docs"


def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"ERROR reading {filepath}: {e}", file=sys.stderr)
        return []

    new_lines = []
    fixes = []
    in_block = False
    fence_marker = None  # e.g. '```'

    for i, line in enumerate(lines):
        stripped = line.rstrip('\n')

        if not in_block:
            # Check for opening fence: ```anything or ~~~anything
            m = re.match(r'^(`{3,}|~{3,})', stripped)
            if m:
                in_block = True
                fence_marker = m.group(1)
            new_lines.append(line)
        else:
            # Inside a block — look for closing fence
            # A valid closing fence is fence_marker (same chars, same or more length) + optional whitespace only
            close_pattern = re.compile(r'^' + re.escape(fence_marker[0]) + r'{' + str(len(fence_marker)) + r',}\s*$')
            if close_pattern.match(stripped):
                # Valid closing fence
                in_block = False
                fence_marker = None
                new_lines.append(line)
            elif re.match(r'^`{3,}sumo\s*$', stripped):
                # Erroneous ```sumo closing fence — fix it
                ending = ''
                if line.endswith('\r\n'):
                    ending = '\r\n'
                elif line.endswith('\n'):
                    ending = '\n'
                elif line.endswith('\r'):
                    ending = '\r'
                fixed_line = '```' + ending
                fixes.append((i + 1, stripped, '```'))
                in_block = False
                fence_marker = None
                new_lines.append(fixed_line)
            else:
                new_lines.append(line)

    if fixes:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.writelines(new_lines)
        except Exception as e:
            print(f"ERROR writing {filepath}: {e}", file=sys.stderr)
            return []

    return fixes


def main():
    total_fixes = 0
    total_files = 0

    for root, dirs, files in os.walk(DOCS_DIR):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for fname in sorted(files):
            if not (fname.endswith('.md') or fname.endswith('.mdx')):
                continue
            fpath = os.path.join(root, fname)
            fixes = fix_file(fpath)
            if fixes:
                total_files += 1
                total_fixes += len(fixes)
                rel = os.path.relpath(fpath, DOCS_DIR)
                for lineno, before, after in fixes:
                    print(f"  {rel}:{lineno}  {before!r} → {after!r}")

    print()
    print(f"Fixed {total_fixes} closing fence(s) across {total_files} file(s).")


if __name__ == '__main__':
    main()
