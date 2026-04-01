#!/usr/bin/env python3
"""
Revert sumo -> sql ONLY for blocks that:
1. Are in docs/metrics/ (metrics query syntax, not log search)
2. Contain clear non-Sumo patterns (GCP resource.type filters, Terraform HCL, shell cmds, etc.)
"""
import os
import re

base = '/Users/kpohas/sumologic-documentation'

# Non-Sumo content patterns (these indicate the block is NOT a Sumo log search query)
NON_SUMO_PATTERNS = [
    # GCP log filter syntax
    r'resource\.type\s*=\s*\w',
    r'resource\.labels\.\w+\s*=',
    # Terraform HCL
    r'connection_type\s*=\s*"',
    r'connection_id\s*=\s*"',
    r'run_for_trigger_types\s*=',
    r'recipients\s*=\s*\[',
    r'payload_override\s*=',
    # Metric Rule definitions (not queries)
    r'^Rule name:',
    r'^Metric match expression:',
    r'^Variable name:',
    r'^Tag sequence:',
    r'^\s*Save it\s*$',
    # Azure CLI commands
    r'^az\s+\w+',
    # Sample log lines (Jenkins console log format)
    r'^\[20\d\d-\d\d-\d\d \d\d:\d\d:\d\d,',
]

def is_non_sumo(lines):
    """Returns True if any line in the block matches a non-Sumo pattern"""
    for line in lines:
        for pat in NON_SUMO_PATTERNS:
            if re.search(pat, line, re.MULTILINE):
                return True
    return False

def process_file(path, revert_all_to_sql=False):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    new_lines = list(lines)
    changed = 0
    i = 0
    
    while i < len(lines):
        line = lines[i].rstrip('\n')
        # Detect opening sumo fence
        m = re.match(r'^(\s*)```sumo(.*)', line)
        if m:
            indent = m.group(1)
            rest = m.group(2)  # title etc.
            # Collect block content until closing fence
            block_lines = []
            j = i + 1
            while j < len(lines):
                cl = lines[j].rstrip('\n')
                if re.match(r'^\s*```\s*$', cl):
                    break
                block_lines.append(cl)
                j += 1
            
            should_revert = revert_all_to_sql or is_non_sumo(block_lines)
            
            if should_revert:
                new_lines[i] = indent + '```sql' + rest + '\n'
                changed += 1
        i += 1
    
    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
    return changed

total_changed = 0
total_files = 0

# 1. Revert ALL sumo -> sql in docs/metrics/ (metrics syntax != log search)
metrics_dir = os.path.join(base, 'docs/metrics')
for root, dirs, files in os.walk(metrics_dir):
    for fname in sorted(files):
        if not fname.endswith('.md'):
            continue
        path = os.path.join(root, fname)
        n = process_file(path, revert_all_to_sql=True)
        if n:
            rel = path.replace(base + '/', '')
            print(f"  [metrics] {rel}: {n} reverted")
            total_changed += n
            total_files += 1

# 2. Revert specific false-positive patterns in docs/integrations/
# Only the GCP google/cloud-*.md files (all use resource.type= filter syntax)
google_dir = os.path.join(base, 'docs/integrations/google')
for fname in sorted(os.listdir(google_dir)):
    if not fname.endswith('.md'):
        continue
    path = os.path.join(google_dir, fname)
    n = process_file(path, revert_all_to_sql=False)
    if n:
        rel = path.replace(base + '/', '')
        print(f"  [google] {rel}: {n} reverted")
        total_changed += n
        total_files += 1

# 3. Revert other specific integration files with known false positives
specific_files = [
    'docs/integrations/hosts-operating-systems/host-process-metrics.md',  # Terraform HCL
    'docs/integrations/amazon-aws/network-load-balancer.md',  # Metric Rule definitions
    'docs/integrations/amazon-aws/rds.md',  # Metric Rule definitions
    'docs/integrations/microsoft-azure/azure-functions.md',  # metric= query (not log search)
    'docs/integrations/microsoft-azure/sql.md',  # Azure CLI command
    'docs/integrations/containers-orchestration/opentelemetry/vmware-opentelemetry.md',  # Metric Rule + metrics query
    'docs/integrations/amazon-aws/redshift-ulm.md',  # Sample log lines
]
for rel in specific_files:
    path = os.path.join(base, rel)
    if os.path.exists(path):
        n = process_file(path, revert_all_to_sql=False)
        if n:
            print(f"  [specific] {rel}: {n} reverted")
            total_changed += n
            total_files += 1

print(f"\nTotal: {total_changed} blocks reverted across {total_files} files")
