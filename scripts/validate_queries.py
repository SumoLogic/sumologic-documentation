#!/usr/bin/env python3
import re
import sys
import os
import json
import subprocess
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

    # Use git diff to find changed files as fallback
    try:
        base_commit = os.getenv('BASE_COMMIT')
        current_commit = os.getenv('CURRENT_COMMIT')
        
        if base_commit and current_commit:
            print(f"🔍 Using git diff fallback: {base_commit}...{current_commit}")
            result = subprocess.run([
                'git', 'diff', '--name-only', '--diff-filter=AM',
                f'{base_commit}...{current_commit}', '--', '**/*.md'
            ], capture_output=True, text=True, cwd=repo_root)
            
            if result.returncode == 0:
                files = [line.strip() for line in result.stdout.split('\n') if line.strip()]
                if files:
                    print(f"� Found {len(files)} changed files via git diff")
                    return [str(repo_root / f) for f in files]
    except Exception as e:
        print(f"::warning::Git diff fallback failed: {e}")

    print("::warning::No changed files detected, exiting successfully")
    return []

def extract_changed_sql_queries(file_path, base_commit, current_commit):
    """Extract only the SQL queries that were actually changed in this commit"""
    try:
        # Get the git diff for this specific file
        diff_cmd = ["git", "diff", f"{base_commit}...{current_commit}", "--", file_path]
        result = subprocess.run(diff_cmd, capture_output=True, text=True, cwd=get_repo_root())
        
        if result.returncode != 0:
            print(f"::warning::Could not get git diff for {file_path}, validating all SQL queries")
            return extract_sql_queries(file_path)
        
        diff_content = result.stdout
        if not diff_content.strip():
            print(f"::info::No changes found in {file_path}")
            return []
        
        # Extract only the SQL content that was added/modified
        changed_queries = []
        lines = diff_content.split('\n')
        
        for line in lines:
            # Look for added lines that contain SQL-like content
            if line.startswith('+') and not line.startswith('+++'):
                content = line[1:].strip()  # Remove the '+' prefix
                
                # Check if this line looks like a SQL query
                if content and any(keyword in content.lower() for keyword in [
                    '_collector=', 'metric=', '| where', '| parse', '| count', 
                    '| sum', '| avg', '| json', '| timeslice'
                ]):
                    changed_queries.append(content)
        
        if changed_queries:
            print(f"📊 Found {len(changed_queries)} changed SQL queries in diff")
            return changed_queries
        else:
            print(f"ℹ️  No SQL query changes detected in {file_path}")
            return []
        
    except Exception as e:
        print(f"::error::Error parsing git diff for {file_path}: {e}")
        return extract_sql_queries(file_path)  # Fallback

def extract_sql_queries(file_path):
    """Extract SQL code blocks from markdown files (fallback method)"""
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

def get_git_commits():
    """Get base and current commit from environment variables"""
    base_commit = os.getenv('BASE_COMMIT', '')
    current_commit = os.getenv('CURRENT_COMMIT', '')
    
    if not base_commit or not current_commit:
        print("::warning::Git commit information not available, falling back to all queries validation")
        return None, None
    
    return base_commit, current_commit

def validate_file(file_path, base_commit=None, current_commit=None):
    """Validate SQL queries in a markdown file"""
    print(f"🔍 Validating: {file_path}")
    
    # Try to get only changed queries if git info is available
    if base_commit and current_commit:
        queries = extract_changed_sql_queries(file_path, base_commit, current_commit)
        query_type = "changed SQL queries"
    else:
        # Fallback to all queries in the file
        queries = extract_sql_queries(file_path)
        query_type = "SQL queries"
    
    if not queries:
        print(f"   ℹ️  No {query_type} found")
        return True
    
    print(f"   📊 Found {len(queries)} {query_type}")
    
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

    # Get git commit information for diff-based validation
    base_commit, current_commit = get_git_commits()
    
    if base_commit and current_commit:
        print(f"� Using git diff mode: {base_commit}...{current_commit}")
        print("�📋 Validating only added/modified SQL queries...")
    else:
        print("📋 Validating all SQL queries in changed files...")
    
    validation_results = []
    total_queries = 0
    
    for file_path in changed_files:
        if os.path.exists(file_path):
            result = validate_file(file_path, base_commit, current_commit)
            validation_results.append((file_path, result))
            
            # Count queries for summary
            if base_commit and current_commit:
                queries = extract_changed_sql_queries(file_path, base_commit, current_commit)
            else:
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
    if base_commit and current_commit:
        print(f"📊 Changed SQL queries: {total_queries}")
    else:
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
        if base_commit and current_commit:
            print("\n🎉 All changed SQL queries passed validation!")
        else:
            print("\n🎉 All SQL queries passed validation!")
        sys.exit(0)

if __name__ == "__main__":
    main()