#!/usr/bin/env python3
import re
import sys
import os
import json
from pathlib import Path
from sumologic_client import SumoLogicClient

def debug_environment():
    """Print critical debugging info"""
    print("::group::Debug Information")
    print(f"Current directory: {os.getcwd()}")
    print("Directory contents:")
    os.system("ls -R")
    print(f"Environment: {dict(os.environ)}")
    print("::endgroup::")

def get_changed_files():
    """Get changed files from GitHub or fallback to full scan"""
    # Try GitHub Actions event data first
    if "GITHUB_EVENT_PATH" in os.environ:
        try:
            with open(os.environ["GITHUB_EVENT_PATH"]) as f:
                event_data = json.load(f)
                return [
                    f for f in
                    [f.get('filename') for f in event_data.get('pull_request', {}).get('files', [])]
                    if f and f.endswith('.md')
                ]
        except Exception as e:
            print(f"::warning::Failed to read GitHub event: {str(e)}")

    # Fallback: Scan all documentation files
    return [str(p) for p in Path(".").rglob("*.md") if "search-query-language" in str(p)]

def find_sql_blocks_in_pr():
    """Detect changed SQL blocks with better debugging"""
    print("::group::Detecting SQL blocks")  # GitHub Actions log grouping

    # Get changed files from environment if running in GitHub Actions
    changed_files = sys.argv[1:] if len(sys.argv) > 1 else []
    if not changed_files and "GITHUB_ACTIONS" in os.environ:
        try:
            with open(os.environ["GITHUB_EVENT_PATH"]) as f:
                event_data = json.load(f)
                changed_files = [
                    f"docs/{f['filename']}" for f in
                    event_data.get("pull_request", {}).get("files", [])
                    if f['filename'].endswith('.md')
                ]
        except Exception as e:
            print(f"::warning::Couldn't get changed files: {str(e)}")

    if not changed_files:
        changed_files = [
            str(p) for p in Path("docs").rglob("*.md")
            if "search-query-language" in str(p)
        ]

    print(f"Files to scan: {changed_files}")
    return changed_files

def validate_queries():
    debug_environment()

    changed_files = get_changed_files()
    print(f"::group::Files to validate")
    print("\n".join(changed_files) or "No files found")
    print("::endgroup::")

    if not changed_files:
        print("::warning::No Markdown files found to validate")
        return
    print("::group::Starting validation")
    client = SumoLogicClient()
    failed = False

    for file, query in find_sql_blocks_with_content():
        print(f"\n🔍 Validating query in {file}")
        print(f"Query sample:\n{query[:200]}...")  # Show first 200 chars

        try:
            print("Calling Sumo Logic API...")
            if not client.test_query(query):
                print(f"::error file={file},title=Query Validation Failed::Query returned no results")
                failed = True
            else:
                print("✅ Query validated successfully")
        except Exception as e:
            print(f"::error file={file},title=Query Execution Failed::{str(e)}")
            failed = True

    print("::endgroup::")
    if failed:
        sys.exit(1)

def find_sql_blocks_with_content():
    """Yields (file_path, query) tuples with better error handling"""
    for file in find_sql_blocks_in_pr():
        try:
            content = Path(file).read_text()
            queries = re.findall(r'```sql\n(.*?)```', content, re.DOTALL)
            for query in queries:
                query = query.strip()
                if query:  # Skip empty queries
                    yield (file, query)
        except Exception as e:
            print(f"::warning file={file}::Error processing file: {str(e)}")

if __name__ == "__main__":
    validate_queries()