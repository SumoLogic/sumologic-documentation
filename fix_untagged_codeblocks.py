#!/usr/bin/env python3
"""
Fix untagged (language = none) fenced code blocks that contain Sumo Logic syntax.
Changes ``` opening fences to ```sumo where the block contains Sumo Logic query syntax.
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
        m = re.match(r'^(`{3,}|~{3,})', line.rstrip('\n'))
        if m:
            fence_char = m.group(1)[0]
            fence_len = len(m.group(1))
            rest = line.rstrip('\n')[fence_len:].strip()
            lang_tag = rest.split()[0] if rest else ''
            start_line = i + 1  # 1-indexed
            i += 1
            block_lines = []
            while i < len(lines):
                close_line = lines[i].rstrip('\n')
                close_m = re.match(r'^(' + re.escape(fence_char * fence_len) + r'+)\s*$', close_line)
                if close_m:
                    i += 1
                    break
                block_lines.append(lines[i])
                i += 1
            yield start_line, lang_tag, ''.join(block_lines)
        else:
            i += 1


def find_fixable_blocks(filepath):
    """Find all blocks in a file that need to be fixed (lang_tag is empty and content has Sumo syntax)."""
    results = []
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"ERROR reading {filepath}: {e}", file=sys.stderr)
        return results, []

    for start_line, lang_tag, content in parse_fenced_blocks(lines):
        if lang_tag.lower() == 'sumo':
            continue
        if lang_tag == '' and contains_sumo_syntax(content):
            results.append(start_line)

    return results, lines


def fix_file(filepath):
    """
    Fix all untagged Sumo Logic code blocks in a file.
    Returns list of (line_number, before, after) for each fix made.
    """
    fixable_lines, lines = find_fixable_blocks(filepath)
    if not fixable_lines:
        return []

    fixes = []
    errors = []

    for line_no in fixable_lines:
        idx = line_no - 1  # 0-indexed
        original_line = lines[idx]
        stripped = original_line.rstrip('\n').rstrip()

        # Verify it's exactly ``` (three backticks, nothing else, possibly with trailing whitespace)
        if re.match(r'^```\s*$', stripped):
            # Preserve original line ending
            ending = ''
            if original_line.endswith('\r\n'):
                ending = '\r\n'
            elif original_line.endswith('\n'):
                ending = '\n'
            elif original_line.endswith('\r'):
                ending = '\r'

            new_line = '```sumo' + ending
            fixes.append((line_no, original_line.rstrip('\n'), new_line.rstrip('\n')))
            lines[idx] = new_line
        else:
            errors.append(f"  Line {line_no}: expected bare ``` but found: {original_line.rstrip()!r}")

    if fixes:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.writelines(lines)
        except Exception as e:
            print(f"ERROR writing {filepath}: {e}", file=sys.stderr)
            return []

    if errors:
        for err in errors:
            print(f"WARNING in {filepath}:{err}", file=sys.stderr)

    return fixes


def main():
    total_fixes = 0
    total_files_fixed = 0
    all_fixes_sample = []
    error_files = []

    all_results = []

    for root, dirs, files in os.walk(DOCS_DIR):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for fname in sorted(files):
            if fname.endswith('.md') or fname.endswith('.mdx'):
                fpath = os.path.join(root, fname)
                try:
                    fixes = fix_file(fpath)
                    if fixes:
                        total_files_fixed += 1
                        total_fixes += len(fixes)
                        for line_no, before, after in fixes:
                            all_results.append((fpath, line_no, before, after))
                except Exception as e:
                    error_files.append((fpath, str(e)))
                    print(f"ERROR processing {fpath}: {e}", file=sys.stderr)

    print("=" * 80)
    print("FIX SUMMARY")
    print("=" * 80)
    print(f"Total blocks fixed : {total_fixes}")
    print(f"Total files fixed  : {total_files_fixed}")
    print()

    if error_files:
        print(f"Files with errors ({len(error_files)}):")
        for fpath, err in error_files:
            rel = os.path.relpath(fpath, DOCS_DIR)
            print(f"  {rel}: {err}")
        print()

    if all_results:
        sample = all_results[:5]
        print(f"Sample of changes (showing first {len(sample)} of {total_fixes}):")
        print("-" * 80)
        for fpath, line_no, before, after in sample:
            rel = os.path.relpath(fpath, DOCS_DIR)
            print(f"  File : {rel}")
            print(f"  Line : {line_no}")
            print(f"  Before: {before!r}")
            print(f"  After : {after!r}")
            print()
    else:
        print("No changes were made.")


if __name__ == '__main__':
    main()
