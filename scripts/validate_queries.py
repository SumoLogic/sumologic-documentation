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
    # Try GitHub PR context first
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

def main():
    repo_root = debug_environment()
    changed_files = get_changed_files(repo_root)

    if not changed_files:
        print("::warning::No Markdown files to validate")
        sys.exit(0)

    print(f"Validating {len(changed_files)} files...")
    # Rest of your validation logic here

if __name__ == "__main__":
    main()