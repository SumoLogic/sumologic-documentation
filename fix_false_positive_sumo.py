#!/usr/bin/env python3
"""
Revert specific false-positive ```sumo blocks to plain ```.
Only touches blocks whose CONTENT matches known non-Sumo patterns.
Safe to run on top of partially-reverted files.
"""

import os, re, sys

DOCS_DIR = "/Users/kpohas/sumologic-documentation/docs/integrations"
DRY_RUN = "--dry-run" in sys.argv

# Content patterns that definitively identify non-Sumo blocks
NON_SUMO = [
    # TOML Telegraf configs
    re.compile(r'^\s*\[\[inputs\.', re.M),
    re.compile(r'^\s*\[inputs\.', re.M),
    re.compile(r'^\s*pid_tag\s*=', re.M),
    re.compile(r'^\s*use_sudo\s*=\s*true', re.M),
    # FER metadata
    re.compile(r'^Rule Name:\s+\S', re.M),
    # Terraform HCL
    re.compile(r'^\s*module\s+"[^"]+"\s*\{', re.M),
    re.compile(r'^\s*resource\s+"[^"]+"\s*"[^"]+"\s*\{', re.M),
    # PostgreSQL / DB config files
    re.compile(r'^\s*log_min_duration_statement\s*=', re.M),
    re.compile(r'^\s*log_destination\s*=', re.M),
    # YAML kubernetes labels/annotations (multi-line, colon syntax)
    # Only match when it looks like indented YAML (not Sumo inline filter)
    re.compile(r'^\s+(environment|db_system|db_cluster|webserver_system|proxy_system|messaging_system)\s*:', re.M),
    re.compile(r'^\s*(annotations|labels)\s*:\s*$', re.M),
    re.compile(r'^\s*tailing-sidecar\s*:', re.M),
    re.compile(r'telegraf\.influxdata\.com/', re.M),
    re.compile(r'prometheus\.io/scrape', re.M),
]


def process_file(fpath):
    with open(fpath, encoding='utf-8', errors='replace') as f:
        lines = f.readlines()

    new_lines = lines[:]
    fixes = []
    i = 0

    while i < len(lines):
        line = lines[i]
        m = re.match(r'^(\s*)(`{3,})sumo\b(.*)', line.rstrip('\n'))
        if m:
            indent = m.group(1)
            fence = m.group(2)
            rest = m.group(3)  # e.g. ' title="..."' or ''
            open_idx = i
            i += 1
            block_lines = []
            close_idx = None
            while i < len(lines):
                if re.match(r'^\s*' + re.escape(fence) + r'\s*$', lines[i].rstrip('\n')):
                    close_idx = i
                    i += 1
                    break
                block_lines.append(lines[i])
                i += 1
            block_text = ''.join(block_lines)

            for pattern in NON_SUMO:
                if pattern.search(block_text):
                    ending = '\r\n' if lines[open_idx].endswith('\r\n') else '\n'
                    new_tag = indent + fence + rest.rstrip() + ending if rest.strip() else indent + fence + ending
                    fixes.append((open_idx + 1, lines[open_idx].rstrip(), new_tag.rstrip()))
                    new_lines[open_idx] = new_tag
                    break
        else:
            i += 1

    if fixes and not DRY_RUN:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)

    return fixes


total_fixes = 0
total_files = 0

for root, dirs, files in os.walk(DOCS_DIR):
    dirs[:] = [d for d in dirs if not d.startswith('.')]
    for fname in sorted(files):
        if not (fname.endswith('.md') or fname.endswith('.mdx')):
            continue
        fpath = os.path.join(root, fname)
        try:
            fixes = process_file(fpath)
        except Exception as e:
            print(f"ERROR {fpath}: {e}", file=sys.stderr)
            continue
        if fixes:
            rel = os.path.relpath(fpath, "/Users/kpohas/sumologic-documentation/docs")
            total_files += 1
            total_fixes += len(fixes)
            for lineno, before, after in fixes:
                print(f"  {rel}:{lineno}  {before!r} → {after!r}")

action = "Would fix" if DRY_RUN else "Fixed"
print(f"\n{action} {total_fixes} block(s) across {total_files} file(s).")
