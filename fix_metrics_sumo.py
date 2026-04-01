#!/usr/bin/env python3
"""Revert ```sumo tags in docs/metrics/ back to plain ``` (they use different syntax from log search)"""
import os
import re

metrics_dir = '/Users/kpohas/sumologic-documentation/docs/metrics'
changed = 0
files_changed = 0

for root, dirs, files in os.walk(metrics_dir):
    for fname in files:
        if not fname.endswith('.md'):
            continue
        path = os.path.join(root, fname)
        with open(path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        new_lines = []
        in_block = False
        fence_char = None
        fence_len = 0
        modified = False
        
        for line in lines:
            stripped = line.rstrip('\n')
            m = re.match(r'^(\s*)(`{3,}|~{3,})', stripped)
            if m:
                indent = m.group(1)
                fence = m.group(2)
                fc = fence[0]
                fl = len(fence)
                rest = stripped[len(indent)+fl:].strip()
                
                if not in_block:
                    # Opening fence
                    lang_tag = rest.split()[0] if rest else ''
                    if lang_tag == 'sumo':
                        # Check if there's a title attribute
                        title_part = rest[len('sumo'):].strip()
                        if title_part:
                            new_line = indent + fence + title_part + '\n'
                        else:
                            new_line = indent + fence + '\n'
                        new_lines.append(new_line)
                        modified = True
                        changed += 1
                        in_block = True
                        fence_char = fc
                        fence_len = fl
                    else:
                        new_lines.append(line)
                        if lang_tag != '' or rest:
                            in_block = True
                            fence_char = fc
                            fence_len = fl
                        else:
                            # plain opening
                            in_block = True
                            fence_char = fc
                            fence_len = fl
                else:
                    # Possible closing fence
                    if fc == fence_char and fl >= fence_len and not rest:
                        in_block = False
                        fence_char = None
                        fence_len = 0
                    new_lines.append(line)
            else:
                new_lines.append(line)
        
        if modified:
            with open(path, 'w', encoding='utf-8') as f:
                f.writelines(new_lines)
            files_changed += 1
            print(f"Updated {path.replace('/Users/kpohas/sumologic-documentation/', '')}")

print(f"\nReverted {changed} sumo tags across {files_changed} metrics files")
