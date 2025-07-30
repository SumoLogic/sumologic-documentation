#!/usr/bin/env python3
import re
import sys
import os
import json
import requests
from pathlib import Path
from datetime import datetime, timedelta

def get_repo_root():
    """Get absolute path to repository root"""
    github_workspace = os.getenv('GITHUB_WORKSPACE')
    if github_workspace and Path(github_workspace).exists():
        return Path(github_workspace)
    return Path(__file__).parent.parent  # Move up from scripts/ directory

def debug_environment():
    """Debug workspace structure"""
    repo_root = get_repo_root()
    print("::group::⚙️ Environment Debug")
    print(f"📂 Repo root: {repo_root}")
    print(f"📂 Working dir: {os.getcwd()}")
    print("\n📁 Directory Structure:")
    os.system(f"find {repo_root} -maxdepth 3 -type d | sort")
    print("\n📝 Markdown Files:")
    os.system(f"find {repo_root} -name '*.md' | head -n 20")
    print("::endgroup::")
    return repo_root

def get_changed_files(repo_root):
    """Find Markdown files to validate"""
    # First try to read from changed_files.txt if it exists (from GitHub workflow)
    changed_files_path = repo_root / "changed_files.txt"
    if changed_files_path.exists():
        try:
            with open(changed_files_path) as f:
                files = [line.strip() for line in f if line.strip()]
                if files:
                    print(f"📦 Found {len(files)} changed Markdown files from workflow")
                    return [str(repo_root / f) for f in files]
        except Exception as e:
            print(f"::warning::Couldn't read changed_files.txt: {e}")
    
    # Try GitHub PR context
    if "GITHUB_EVENT_PATH" in os.environ:
        try:
            with open(os.environ["GITHUB_EVENT_PATH"]) as f:
                pr_files = [
                    str(repo_root / f['filename'])
                    for f in json.load(f).get('pull_request', {}).get('files', [])
                    if f['filename'].endswith('.md')
                ]
                if pr_files:
                    print(f"📦 Found {len(pr_files)} changed Markdown files")
                    return pr_files
        except Exception as e:
            print(f"::warning::Couldn't read PR data: {e}")

    # Fallback: Scan docs directory
    docs_dir = repo_root / "docs"
    if docs_dir.exists():
        md_files = list(docs_dir.rglob("*.md"))
        print(f"🔄 Scanning {len(md_files)} docs files")
        return [str(f) for f in md_files]

    print("::error::No Markdown files found in docs/ directory")
    return []

def extract_sql_queries(file_path):
    """Extract SQL code blocks from markdown files"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find SQL code blocks using regex
        sql_pattern = r'```(?:sql|sumo)\s*(?:title="[^"]*")?\s*\n(.*?)```'
        sql_blocks = re.findall(sql_pattern, content, re.DOTALL | re.IGNORECASE)
        
        queries = []
        for block in sql_blocks:
            # Clean up the query
            query = block.strip()
            if query and not query.startswith('#') and not query.startswith('//'):
                queries.append(query)
        
        return queries
    except Exception as e:
        print(f"::error::Error reading file {file_path}: {e}")
        return []

def validate_query_syntax(query):
    """Basic syntax validation for SumoLogic queries"""
    errors = []
    
    # Check for basic syntax issues
    if '|' in query:
        # Split by pipes to check operators
        parts = [part.strip() for part in query.split('|')]
        for i, part in enumerate(parts):
            if not part:
                errors.append(f"Empty pipe section at position {i}")
            
            # Check for common operator patterns
            if i > 0:  # Skip the first part (search expression)
                if not any(op in part.lower() for op in [
                    'where', 'parse', 'json', 'count', 'sum', 'avg', 'max', 'min',
                    'timeslice', 'sort', 'top', 'bottom', 'fields', 'if', 'lookup',
                    'join', 'extract', 'formatDate', 'toLowerCase', 'toUpperCase'
                ]):
                    # This might be a custom function or valid operator we don't know about
                    pass
    
    # Check for unmatched quotes
    single_quotes = query.count("'") - query.count("\\'")
    double_quotes = query.count('"') - query.count('\\"')
    
    if single_quotes % 2 != 0:
        errors.append("Unmatched single quotes")
    if double_quotes % 2 != 0:
        errors.append("Unmatched double quotes")
    
    # Check for unmatched parentheses
    paren_count = query.count('(') - query.count(')')
    if paren_count != 0:
        errors.append("Unmatched parentheses")
    
    # Check for unmatched brackets
    bracket_count = query.count('[') - query.count(']')
    if bracket_count != 0:
        errors.append("Unmatched square brackets")
    
    return errors

def validate_file(file_path):
    """Validate all SQL queries in a markdown file"""
    print(f"🔍 Validating: {file_path}")
    
    queries = extract_sql_queries(file_path)
    if not queries:
        print(f"   ℹ️  No SQL queries found")
        return True
    
    print(f"   📊 Found {len(queries)} SQL queries")
    
    all_valid = True
    for i, query in enumerate(queries, 1):
        errors = validate_query_syntax(query)
        if errors:
            all_valid = False
            print(f"   ❌ Query {i} has errors:")
            for error in errors:
                print(f"      - {error}")
            print(f"   Query preview: {query[:100]}...")
        else:
            print(f"   ✅ Query {i} passed basic syntax validation")
    
    return all_valid

def main():
    repo_root = debug_environment()
    changed_files = get_changed_files(repo_root)

    if not changed_files:
        print("::warning::No Markdown files to validate")
        sys.exit(0)

    print(f"📋 Validating {len(changed_files)} files...")
    
    validation_results = []
    total_queries = 0
    
    for file_path in changed_files:
        if os.path.exists(file_path):
            result = validate_file(file_path)
            validation_results.append((file_path, result))
            
            # Count queries for summary
            queries = extract_sql_queries(file_path)
            total_queries += len(queries)
        else:
            print(f"::warning::File not found: {file_path}")
    
    # Summary
    print("\n" + "="*60)
    print("📊 VALIDATION SUMMARY")
    print("="*60)
    
    passed_files = sum(1 for _, result in validation_results if result)
    failed_files = len(validation_results) - passed_files
    
    print(f"📁 Files processed: {len(validation_results)}")
    print(f"📊 Total SQL queries: {total_queries}")
    print(f"✅ Files passed: {passed_files}")
    print(f"❌ Files failed: {failed_files}")
    
    if failed_files > 0:
        print("\n❌ Files with validation errors:")
        for file_path, result in validation_results:
            if not result:
                print(f"   - {file_path}")
        
        print("\n::error::SQL query validation failed!")
        sys.exit(1)
    else:
        print("\n🎉 All SQL queries passed validation!")
        sys.exit(0)

if __name__ == "__main__":
    main()