#!/usr/bin/env python3
"""
Detect fenced code blocks containing Sumo Logic syntax that are NOT tagged with 'sumo'.
"""

import os
import re
import sys

DOCS_DIR = "/Users/kpohas/sumologic-documentation/docs"

# Sumo Logic metadata fields
METADATA_FIELDS = [
    r'_sourceCategory\s*[=!<>]',
    r'_dataTier\s*[=!<>]',
    r'_collector\s*[=!<>]',
    r'_index\s*[=!<>]',
    r'_messageTime\s*[=!<>]',
    r'_raw\s*[=!<>]',
    r'_source\s*[=!<>]',
    r'_sourceHost\s*[=!<>]',
    r'_sourceName\s*[=!<>]',
    r'_view\s*[=!<>]',
    # Also match bare usage without operator (e.g., "| fields _sourceCategory")
    r'\b_sourceCategory\b',
    r'\b_dataTier\b',
    r'\b_collector\b',
    r'\b_messageTime\b',
    r'\b_sourceHost\b',
    r'\b_sourceName\b',
]

# Sumo Logic URL schemes
URL_SCHEMES = [
    r'asn://',
    r'geo://',
    r'path://',
    r'sumo://',
]

# Pipe-chained Sumo Logic operators
PIPE_OPERATORS = [
    r'\|\s*parse\b',
    r'\|\s*where\b',
    r'\|\s*count\b',
    r'\|\s*timeslice\b',
    r'\|\s*lookup\b',
    r'\|\s*fields\b',
    r'\|\s*sort\b',
    r'\|\s*limit\b',
    r'\|\s*join\b',
    r'\|\s*dedup\b',
    r'\|\s*outlier\b',
    r'\|\s*logreduce\b',
    r'\|\s*logcompare\b',
    r'\|\s*transpose\b',
    r'\|\s*bin\b',
    r'\|\s*accum\b',
]

ALL_PATTERNS = [re.compile(p, re.IGNORECASE) for p in METADATA_FIELDS + URL_SCHEMES + PIPE_OPERATORS]

def contains_sumo_syntax(content):
    for pattern in ALL_PATTERNS:
        if pattern.search(content):
            return True
    return False

def parse_fenced_blocks(lines):
    """
    Yields (start_line_1indexed, lang_tag, block_content) for each fenced code block.
    Handles both ``` and ~~~ fences.
    """
    i = 0
    while i < len(lines):
        line = lines[i]
        # Match opening fence: ``` or ~~~, optional language tag
        m = re.match(r'^(```+|~~~+)(\S*)\s*$', line.rstrip('\n'))
        if m:
            fence_char = m.group(1)[0]  # ` or ~
            fence_len = len(m.group(1))
            lang_tag = m.group(2)
            start_line = i + 1  # 1-indexed
            i += 1
            block_lines = []
            # Collect until closing fence of same type and length
            while i < len(lines):
                close_line = lines[i].rstrip('\n')
                # Closing fence: same char, same or more length, nothing after
                close_m = re.match(r'^(' + re.escape(fence_char * fence_len) + r'+)\s*$', close_line)
                if close_m:
                    i += 1
                    break
                block_lines.append(lines[i])
                i += 1
            yield start_line, lang_tag, ''.join(block_lines)
        else:
            i += 1

def scan_file(filepath):
    results = []
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"ERROR reading {filepath}: {e}", file=sys.stderr)
        return results

    for start_line, lang_tag, content in parse_fenced_blocks(lines):
        # Skip blocks tagged as 'sumo'
        if lang_tag.lower() == 'sumo':
            continue
        # Check if content contains Sumo Logic syntax
        if contains_sumo_syntax(content):
            results.append((filepath, start_line, lang_tag))
    return results

def main():
    all_results = []
    for root, dirs, files in os.walk(DOCS_DIR):
        # Skip hidden dirs
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for fname in files:
            if fname.endswith('.md') or fname.endswith('.mdx'):
                fpath = os.path.join(root, fname)
                results = scan_file(fpath)
                all_results.extend(results)

    # Sort by file path then line number
    all_results.sort(key=lambda x: (x[0], x[1]))

    print(f"{'FILE':<90} {'LINE':>6}  {'LANG_TAG'}")
    print("-" * 110)
    for fpath, line_no, lang_tag in all_results:
        rel = os.path.relpath(fpath, DOCS_DIR)
        tag_display = lang_tag if lang_tag else '(none)'
        print(f"{rel:<90} {line_no:>6}  {tag_display}")

    print()
    print(f"Total: {len(all_results)} code block(s) found across {len(set(r[0] for r in all_results))} file(s).")

if __name__ == '__main__':
    main()
