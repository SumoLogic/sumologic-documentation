#!/usr/bin/env python3
"""Revert sumo -> sql for remaining Google Cloud GCP log filter blocks"""
import os
import re

base = '/Users/kpohas/sumologic-documentation'
google_dir = os.path.join(base, 'docs/integrations/google')

# GCP log filter patterns
GCP_PATTERNS = [
    r'resource\.type',
    r'resource\.labels\.',
    r'logName=',
]

def has_gcp_pattern(lines):
    for line in lines:
        for pat in GCP_PATTERNS:
            if re.search(pat, line):
                return True
    return False

total = 0
files = 0

for fname in sorted(os.listdir(google_dir)):
    if not fname.endswith('.md'):
        continue
    path = os.path.join(google_dir, fname)
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    new_lines = list(lines)
    changed = 0
    i = 0
    while i < len(lines):
        line = lines[i].rstrip('\n')
        m = re.match(r'^(\s*)```sumo(.*)', line)
        if m:
            indent = m.group(1)
            rest = m.group(2)
            block = []
            j = i + 1
            while j < len(lines) and not re.match(r'^\s*```\s*$', lines[j].rstrip('\n')):
                block.append(lines[j].rstrip('\n'))
                j += 1
            if has_gcp_pattern(block):
                new_lines[i] = indent + '```sql' + rest + '\n'
                changed += 1
        i += 1
    
    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        total += changed
        files += 1
        print(f"  {fname}: {changed} reverted")

print(f"\nTotal: {total} blocks across {files} files")
