#!/usr/bin/env python3
"""Revert confirmed false positives: sumo -> sql at specific file:line locations"""
import re

base = '/Users/kpohas/sumologic-documentation/docs'

# (file, line_number_1based)
TARGETS = [
    # Sample log lines
    ("integrations/app-development/jenkins.md", 191),
    ("integrations/app-development/opentelemetry/puppet-opentelemetry.md", 245),
    ("integrations/databases/opentelemetry/cassandra-opentelemetry.md", 146),
    ("integrations/microsoft-azure/opentelemetry/active-directory-json-opentelemetry.md", 123),
    ("integrations/web-servers/opentelemetry/squid-proxy-opentelemetry.md", 154),
    ("integrations/web-servers/opentelemetry/varnish-opentelemetry.md", 128),
    # GCP log filters (alloydb missed by earlier script)
    ("integrations/google/cloud-alloydb-for-postgresql.md", 26),
    ("integrations/google/cloud-alloydb-for-postgresql.md", 31),
    # AWS Metrics Rule definition
    ("integrations/amazon-aws/api-gateway.md", 237),
    # JSON field list (not a query)
    ("integrations/amazon-aws/security-hub.md", 174),
]

total = 0
for rel, lineno in TARGETS:
    path = f"{base}/{rel}"
    with open(path, 'r') as f:
        lines = f.readlines()
    idx = lineno - 1
    line = lines[idx]
    m = re.match(r'^(\s*)```sumo(.*\n)', line)
    if m:
        lines[idx] = m.group(1) + '```sql' + m.group(2)
        with open(path, 'w') as f:
            f.writelines(lines)
        print(f"  {rel}:{lineno}")
        total += 1
    else:
        print(f"  SKIP (not sumo): {rel}:{lineno} -> {line.rstrip()}")

print(f"\nReverted {total} blocks")
