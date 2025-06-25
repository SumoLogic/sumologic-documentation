#!/usr/bin/env python3
"""
Validates SumoLogic queries in Markdown files during PRs
- Finds all SQL blocks in changed Markdown files
- Executes each query against SumoLogic API
- Fails PR if any query returns no results
"""

import re
import sys
import os
import json
import time
from pathlib import Path
from datetime import datetime, timedelta

# SumoLogic API Client (embedded for simplicity)
class SumoLogicClient:
    def __init__(self):
        self.api_url = os.getenv('SUMO_LOGIC_ENDPOINT', 'https://long-api.sumologic.com/api/v1')
        self.session = requests.Session()
        self.session.auth = (
            os.getenv('SUMO_LOGIC_ACCESS_ID'),
            os.getenv('SUMO_LOGIC_ACCESS_KEY')
        )
        self.session.headers.update({'Content-Type': 'application/json'})

    def test_query(self, query):
        """Execute query and verify it returns results"""
        print(f"⌛ Executing query (first 50 chars): {query[:50]}...")

        job_id = self._create_search_job(query)
        status = self._wait_for_job(job_id)

        if status != "DONE GATHERING RESULTS":
            raise Exception(f"Query failed with status: {status}")

        return self._check_results(job_id)

    def _create_search_job(self, query):
        """Start a search job with 1-hour time window"""
        time_range = {
            'from': (datetime.utcnow() - timedelta(hours=1)).isoformat() + 'Z',
            'to': datetime.utcnow().isoformat() + 'Z',
            'timeZone': 'UTC'
        }

        response = self.session.post(
            f"{self.api_url}/search/jobs",
            json={'query': query, **time_range}
        )
        response.raise_for_status()
        return response.json()['id']

    def _wait_for_job(self, job_id, timeout=60):
        """Wait for job completion with progress updates"""
        for i in range(timeout):
            response = self.session.get(f"{self.api_url}/search/jobs/{job_id}")
            response.raise_for_status()
            status = response.json()['state']

            if i % 5 == 0:  # Print progress every 5 seconds
                print(f"⏳ Query status: {status} ({i}/{timeout}s)")

            if status in ["DONE GATHERING RESULTS", "CANCELLED"]:
                return status
            time.sleep(1)
        return "TIMEOUT"

    def _check_results(self, job_id):
        """Check if query returned any results"""
        response = self.session.get(
            f"{self.api_url}/search/jobs/{job_id}/messages",
            params={'limit': 1}  # Only need to check if any results exist
        )
        response.raise_for_status()
        has_results = len(response.json().get('messages', [])) > 0
        print(f"🔍 Results found: {'✅ Yes' if has_results else '❌ No'}")
        return has_results

# Main Validation Logic
def debug_environment():
    """Print critical debugging information"""
    print("::group::⚙️ Environment Debug")
    print(f"📂 Workspace: {os.getcwd()}")
    print("\n📁 Directory Structure:")
    os.system("find . -type d | sort")
    print("\n📝 Markdown Files:")
    os.system("find . -name '*.md' | sort")
    print("::endgroup::")

def get_changed_files():
    """Get files changed in PR or all Markdown files"""
    # Try GitHub PR context first
    if "GITHUB_EVENT_PATH" in os.environ:
        try:
            with open(os.environ["GITHUB_EVENT_PATH"]) as f:
                pr_files = [
                    f['filename'] for f in json.load(f).get('pull_request', {}).get('files', [])
                    if f['filename'].endswith('.md')
                ]
                if pr_files:
                    print(f"📦 Found {len(pr_files)} changed Markdown files in PR")
                    return pr_files
        except Exception as e:
            print(f"::warning::⚠️ Couldn't read PR data: {e}")

    # Fallback: All Markdown files in repository
    all_files = [str(p) for p in Path('.').rglob('*.md')]
    print(f"🔄 Falling back to scanning all {len(all_files)} Markdown files")
    return all_files

def validate_files():
    """Main validation flow"""
    debug_environment()
    client = SumoLogicClient()
    failed = False

    for file_path in get_changed_files():
        try:
            content = Path(file_path).read_text()
            queries = re.findall(r'```sql\n(.*?)```', content, re.DOTALL)

            if not queries:
                print(f"ℹ️ No SQL blocks found in {file_path}")
                continue

            print(f"\n::group::🔎 Validating {len(queries)} queries in {file_path}")
            for i, query in enumerate(queries, 1):
                query = query.strip()
                if not query:
                    continue

                print(f"\n📋 Query {i} (first 50 chars): {query[:50]}...")
                try:
                    if not client.test_query(query):
                        print(f"::error file={file_path},title=Invalid Query::Query returned no results")
                        failed = True
                    else:
                        print("✅ Valid query")
                except Exception as e:
                    print(f"::error file={file_path},title=Query Failed::{str(e)}")
                    failed = True
            print("::endgroup::")

        except Exception as e:
            print(f"::error file={file_path},title=File Error::{str(e)}")
            failed = True

    if failed:
        print("\n❌ Validation failed - see errors above")
        sys.exit(1)

    print("\n🎉 All queries validated successfully")
    sys.exit(0)

if __name__ == "__main__":
    try:
        import requests
        validate_files()
    except ImportError:
        print("::error::❌ Missing required 'requests' package")
        sys.exit(1)
    except Exception as e:
        print(f"::error::💥 Critical error: {str(e)}")
        sys.exit(1)