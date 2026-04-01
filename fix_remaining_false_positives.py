#!/usr/bin/env python3
"""Fix remaining specific false positives with content-based detection"""
import os
import re

base = '/Users/kpohas/sumologic-documentation'

# Patterns that indicate non-Sumo content
NON_SUMO_PATTERNS = [
    # FER metadata blocks
    r'^\s*Rule Name:',
    r'^\s*Applied at:',
    # IIS log format headers
    r'^#Fields: date time',
    # Container filter patterns (glob patterns, not queries)
    r'^\s*prod-\*,\s*!',
    r'^!\w+\*',
    # MariaDB/MySQL config files
    r'^\[mariadb\]',
    r'^\[mysqld\]',
    # Memcached shell commands / config
    r'^memcached\s+-d\s+-m',
    r'^PORT="',
    # PowerShell commands
    r'^\[System\.Environment\]::OSVersion',
    r'^\(Get-WmiObject\s',
    # T-SQL / SQL Server scripts
    r'^USE master;',
    r'^CREATE LOGIN\s',
    # Azure CLI commands
    r'^az\s+sql\s+',
    # Redshift/sample log lines
    r"^'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z UTC \[ db=",
    # IIS sample log lines (date IP method path)
    r'^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \d+\.\d+\.\d+\.\d+ (GET|POST|PUT|DELETE)',
]

def is_non_sumo(lines):
    for line in lines:
        for pat in NON_SUMO_PATTERNS:
            if re.search(pat, line):
                return True
    return False

def process_file(path):
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
            
            if is_non_sumo(block):
                new_lines[i] = indent + '```sql' + rest + '\n'
                changed += 1
        i += 1
    
    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
    return changed

total = 0
files_changed = 0

# Scan integrations dir
for root, dirs, files in os.walk(os.path.join(base, 'docs/integrations')):
    for fname in sorted(files):
        if not fname.endswith('.md'):
            continue
        path = os.path.join(root, fname)
        n = process_file(path)
        if n:
            rel = path.replace(base + '/', '')
            print(f"  {rel}: {n} reverted")
            total += n
            files_changed += 1

print(f"\nTotal: {total} blocks across {files_changed} files")
