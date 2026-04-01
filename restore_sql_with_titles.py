#!/usr/bin/env python3
"""Restore sql tags (including with title="...") where main had sql"""
import os
import subprocess
import re

base = '/Users/kpohas/sumologic-documentation'
changed_total = 0
files_changed = 0

dirs_to_scan = [
    'docs/integrations',
    'docs/metrics',
    'docs/observability',
    'docs/manage',
    'docs/search',
    'docs/send-data',
    'docs/security',
    'docs/platform-services',
    'docs/dashboards',
    'docs/apm',
    'docs/reuse',
]

def process_dir(scan_dir):
    global changed_total, files_changed
    full_dir = os.path.join(base, scan_dir)
    if not os.path.exists(full_dir):
        return
    for root, dirs, files in os.walk(full_dir):
        for fname in sorted(files):
            if not fname.endswith('.md'):
                continue
            path = os.path.join(root, fname)
            rel_path = path.replace(base + '/', '')
            
            result = subprocess.run(['git', 'show', f'main:{rel_path}'], 
                                  capture_output=True, text=True, cwd=base)
            if result.returncode != 0:
                continue
            
            main_lines = result.stdout.splitlines(keepends=True)
            
            with open(path, 'r', encoding='utf-8') as f:
                current_lines = f.readlines()
            
            if len(current_lines) != len(main_lines):
                continue
            
            new_lines = list(current_lines)
            changed = 0
            
            for i, (cur, main) in enumerate(zip(current_lines, main_lines)):
                cur_stripped = cur.rstrip('\n')
                main_stripped = main.rstrip('\n')
                
                # Match ```sumo (with or without title/attributes)
                cur_m = re.match(r'^(\s*)```sumo(.*)', cur_stripped)
                # Match ```sql (with or without title/attributes)
                main_m = re.match(r'^(\s*)```sql(.*)', main_stripped)
                
                if cur_m and main_m:
                    indent = cur_m.group(1)
                    main_rest = main_m.group(2)  # keep original title from main
                    new_lines[i] = indent + '```sql' + main_rest + '\n'
                    changed += 1
            
            if changed:
                with open(path, 'w', encoding='utf-8') as f:
                    f.writelines(new_lines)
                changed_total += changed
                files_changed += 1
                print(f"  {rel_path}: restored {changed} sql tags")

for d in dirs_to_scan:
    process_dir(d)

print(f"\nTotal: {changed_total} blocks restored across {files_changed} files")
