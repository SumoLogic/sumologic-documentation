#!/usr/bin/env python3
"""Restore sql tags in docs/metrics/ files where main had sql (currently we changed sumo -> plain)"""
import os
import subprocess
import re

base = '/Users/kpohas/sumologic-documentation'
metrics_dir = os.path.join(base, 'docs/metrics')
changed_total = 0
files_changed = 0

for root, dirs, files in os.walk(metrics_dir):
    for fname in sorted(files):
        if not fname.endswith('.md'):
            continue
        
        path = os.path.join(root, fname)
        rel_path = path.replace(base + '/', '')
        
        # Get main version
        result = subprocess.run(['git', 'show', f'main:{rel_path}'], 
                              capture_output=True, text=True, cwd=base)
        if result.returncode != 0:
            continue
        
        main_lines = result.stdout.splitlines(keepends=True)
        
        with open(path, 'r', encoding='utf-8') as f:
            current_lines = f.readlines()
        
        # Only process if line counts match
        if len(current_lines) != len(main_lines):
            continue
        
        new_lines = list(current_lines)
        changed = 0
        
        for i, (cur, main) in enumerate(zip(current_lines, main_lines)):
            cur_stripped = cur.rstrip('\n')
            main_stripped = main.rstrip('\n')
            
            # If current has plain ``` and main had ```sql, restore sql
            if re.match(r'^\s*```\s*$', cur_stripped) and re.match(r'^\s*```sql\s*$', main_stripped):
                indent = re.match(r'^(\s*)', cur_stripped).group(1)
                new_lines[i] = indent + '```sql\n'
                changed += 1
        
        if changed:
            with open(path, 'w', encoding='utf-8') as f:
                f.writelines(new_lines)
            changed_total += changed
            files_changed += 1
            print(f"  {rel_path}: restored {changed} sql tags")

print(f"\nTotal: {changed_total} blocks restored across {files_changed} metrics files")
