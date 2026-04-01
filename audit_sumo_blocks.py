#!/usr/bin/env python3
"""
Audit all ```sumo blocks and report ones that don't contain Sumo Logic syntax.
Optionally auto-revert them to plain ```.
"""

import os
import re
import sys

DOCS_DIR = "/Users/kpohas/sumologic-documentation/docs"
AUTO_FIX = "--fix" in sys.argv

METADATA_FIELDS = [
    r'\b_sourceCategory\b', r'\b_dataTier\b', r'\b_collector\b',
    r'\b_index\b', r'\b_messageTime\b', r'\b_raw\b', r'\b_source\b',
    r'\b_sourceHost\b', r'\b_sourceName\b', r'\b_view\b',
    r'\b_siemDataType\b', r'\b_messageId\b',
]
URL_SCHEMES = [r'asn://', r'geo://', r'path://', r'sumo://']
PIPE_OPERATORS = [
    r'\|\s*parse\b', r'\|\s*where\b', r'\|\s*count\b', r'\|\s*timeslice\b',
    r'\|\s*lookup\b', r'\|\s*fields\b', r'\|\s*sort\b', r'\|\s*limit\b',
    r'\|\s*join\b', r'\|\s*dedup\b', r'\|\s*outlier\b', r'\|\s*logreduce\b',
    r'\|\s*logcompare\b', r'\|\s*transpose\b', r'\|\s*bin\b', r'\|\s*accum\b',
    r'\|\s*json\b', r'\|\s*csv\b', r'\|\s*kv\b', r'\|\s*xml\b',
    r'\|\s*num\b', r'\|\s*toLong\b', r'\|\s*toInt\b', r'\|\s*sum\b',
    r'\|\s*avg\b', r'\|\s*min\b', r'\|\s*max\b', r'\|\s*pct\b',
    r'\|\s*stddev\b', r'\|\s*first\b', r'\|\s*last\b', r'\|\s*values\b',
    r'\|\s*concat\b', r'\|\s*if\b', r'\|\s*formatDate\b', r'\|\s*most_recent\b',
    r'\|\s*tourl\b', r'\|\s*withtime\b', r'\|\s*urlencode\b',
    r'\|\s*order\b', r'\|\s*top\b', r'\|\s*bottom\b',
    r'\|\s*diff\b', r'\|\s*predict\b', r'\|\s*smooth\b',
    r'\|\s*fillmissing\b', r'\|\s*geo\b', r'\|\s*threatip\b', r'\|\s*threatlookup\b',
    r'\|\s*trace\b', r'\|\s*subquery\b', r'\|\s*save\b', r'\|\s*append\b',
    r'\|\s*compare\b', r'\|\s*now\b', r'\|\s*round\b',
    r'\|\s*split\b', r'\|\s*replace\b', r'\|\s*substring\b',
    r'\|\s*urldecode\b', r'\|\s*queryStartTime\b', r'\|\s*queryEndTime\b',
    r'\|\s*transaction\b', r'\|\s*transactionize\b',
]

ALL_PATTERNS = [re.compile(p, re.IGNORECASE) for p in
                METADATA_FIELDS + URL_SCHEMES + PIPE_OPERATORS]


def contains_sumo_syntax(content):
    for pattern in ALL_PATTERNS:
        if pattern.search(content):
            return True
    return False


def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        lines = f.readlines()

    flagged = []  # (line_no, tag_line, content)
    new_lines = lines[:]
    i = 0

    while i < len(lines):
        line = lines[i]
        # Match ```sumo or ```sumo title="..."
        m = re.match(r'^(\s*)(`{3,})sumo(\b.*)?$', line.rstrip('\n'))
        if m:
            indent = m.group(1)
            fence = m.group(2)
            rest = m.group(3) or ''
            open_lineno = i + 1
            i += 1
            block_lines = []
            close_idx = None
            while i < len(lines):
                close = lines[i].rstrip('\n')
                if re.match(r'^\s*' + re.escape(fence) + r'\s*$', close):
                    close_idx = i
                    i += 1
                    break
                block_lines.append(lines[i])
                i += 1
            content = ''.join(block_lines)
            if not contains_sumo_syntax(content):
                flagged.append((open_lineno, line.rstrip('\n'), content.strip()[:120]))
                if AUTO_FIX:
                    new_lines[open_lineno - 1] = indent + fence + rest.lstrip() + '\n' if rest.strip() else indent + fence + '\n'
        else:
            i += 1

    if AUTO_FIX and flagged:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)

    return flagged


def main():
    total = 0
    for root, dirs, files in os.walk(DOCS_DIR):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for fname in sorted(files):
            if not (fname.endswith('.md') or fname.endswith('.mdx')):
                continue
            fpath = os.path.join(root, fname)
            try:
                flagged = process_file(fpath)
            except Exception as e:
                print(f"ERROR {fpath}: {e}", file=sys.stderr)
                continue
            if flagged:
                rel = os.path.relpath(fpath, DOCS_DIR)
                for lineno, tag_line, snippet in flagged:
                    print(f"{rel}:{lineno}")
                    print(f"  tag:     {tag_line.strip()}")
                    print(f"  content: {snippet!r}")
                    print()
                    total += 1

    action = "fixed" if AUTO_FIX else "found"
    print(f"Total {action}: {total} sumo block(s) without Sumo syntax")
    if not AUTO_FIX:
        print("Run with --fix to auto-revert to plain ```")


if __name__ == '__main__':
    main()
