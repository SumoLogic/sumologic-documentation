#!/usr/bin/env python3
import re
import sys
from pathlib import Path
from sumologic_client import SumoLogicClient

def find_sql_blocks_in_pr():
    """Detect changed SQL blocks without file modifications"""
    changed_files = sys.argv[1:] if len(sys.argv) > 1 else [
        str(p) for p in Path("docs").rglob("*.md")
        if "search-query-language" in str(p)
    ]

    sql_blocks = []
    for file in changed_files:
        content = Path(file).read_text()
        sql_blocks.extend([
            (file, sql.strip())
            for sql in re.findall(r'```sql\n(.*?)```', content, re.DOTALL)
        ])
    return sql_blocks

def validate_queries():
    client = SumoLogicClient()
    failed = False

    for file, query in find_sql_blocks_in_pr():
        print(f"Validating SQL in {file}...")
        try:
            if not client.test_query(query):
                print(f"::error file={file},title=Query Validation Failed::Query returned no results")
                failed = True
        except Exception as e:
            print(f"::error file={file},title=Query Execution Failed::{str(e)}")
            failed = True

    if failed:
        sys.exit(1)

if __name__ == "__main__":
    validate_queries()