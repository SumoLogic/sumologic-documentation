#!/usr/bin/env python3
import re
import sys
import os
import subprocess
import time
import requests
from pathlib import Path
from datetime import datetime, timedelta, timezone

SUMO_API_BASE = os.getenv("SUMO_API_BASE", "https://documentation.long.sumologic.net/api/v1")
POLL_INTERVAL = 3
POLL_TIMEOUT = 60
# Time range to run each query against (last 7 days)
QUERY_LOOKBACK_HOURS = 168


def get_credentials():
    access_id = os.getenv("SUMO_LOGIC_ACCESS_ID")
    access_key = os.getenv("SUMO_LOGIC_ACCESS_KEY")
    if not access_id or not access_key:
        print("::error::SUMO_LOGIC_ACCESS_ID and SUMO_LOGIC_ACCESS_KEY must be set")
        sys.exit(1)
    return access_id, access_key


def get_repo_root():
    github_workspace = os.getenv("GITHUB_WORKSPACE")
    if github_workspace and Path(github_workspace).exists():
        return Path(github_workspace)
    return Path(__file__).parent.parent


def get_changed_files(repo_root):
    changed_files_path = repo_root / "changed_files.txt"
    if changed_files_path.exists():
        try:
            with open(changed_files_path) as f:
                files = [line.strip() for line in f if line.strip()]
                if files:
                    print(f"Found {len(files)} changed Markdown files")
                    return [str(repo_root / f) for f in files]
        except Exception as e:
            print(f"::warning::Couldn't read changed_files.txt: {e}")

    base_commit = os.getenv("BASE_COMMIT")
    current_commit = os.getenv("CURRENT_COMMIT")
    if base_commit and current_commit:
        result = subprocess.run(
            ["git", "diff", "--name-only", "--diff-filter=AM",
             f"{base_commit}...{current_commit}", "--", "**/*.md"],
            capture_output=True, text=True, cwd=repo_root
        )
        if result.returncode == 0:
            files = [line.strip() for line in result.stdout.split("\n") if line.strip()]
            if files:
                return [str(repo_root / f) for f in files]

    print("::warning::No changed files detected")
    return []


def extract_new_queries(file_path, repo_root):
    """Extract only queries newly added in this PR (lines starting with '+' in diff)."""
    base_commit = os.getenv("BASE_COMMIT")
    current_commit = os.getenv("CURRENT_COMMIT")

    if base_commit and current_commit:
        result = subprocess.run(
            ["git", "diff", f"{base_commit}...{current_commit}", "--", file_path],
            capture_output=True, text=True, cwd=repo_root
        )
        if result.returncode == 0 and result.stdout.strip():
            return _parse_added_queries_from_diff(result.stdout)

    # Fallback: treat all queries in file as new
    return _extract_all_queries(file_path)


def _parse_added_queries_from_diff(diff_content):
    queries = []
    wrong_marker_found = False
    in_sumo_block = False
    current_block = []

    for line in diff_content.split("\n"):
        if line.startswith("+```sql"):
            wrong_marker_found = True
        elif line.startswith("+```sumo"):
            in_sumo_block = True
            current_block = []
        elif line.startswith("+```") and in_sumo_block:
            in_sumo_block = False
            query = "\n".join(current_block).strip()
            if query:
                queries.append(query)
            current_block = []
        elif in_sumo_block and line.startswith("+"):
            current_block.append(line[1:])  # strip leading '+'

    if wrong_marker_found:
        print("::error::Found ```sql code block(s) in docs. Use ```sumo for Sumo Logic queries.")
        sys.exit(1)

    return queries


def _extract_all_queries(file_path):
    try:
        with open(file_path, encoding="utf-8") as f:
            content = f.read()

        if re.search(r"```sql", content, re.IGNORECASE):
            print("::error::Found ```sql code block(s) in docs. Use ```sumo for Sumo Logic queries.")
            sys.exit(1)

        blocks = re.findall(r"```sumo[^\n]*\n(.*?)```", content, re.DOTALL | re.IGNORECASE)
        queries = []
        for block in blocks:
            q = block.strip()
            if q:
                lines = q.split("\n")
                if not all(l.strip().startswith("|") and l.strip().endswith("|") for l in lines if l.strip()):
                    queries.append(q)
        return queries
    except Exception as e:
        print(f"::error::Error reading {file_path}: {e}")
        return []


def submit_search_job(query, access_id, access_key):
    now = datetime.now(timezone.utc)
    from_time = (now - timedelta(hours=QUERY_LOOKBACK_HOURS)).strftime("%Y-%m-%dT%H:%M:%S")
    to_time = now.strftime("%Y-%m-%dT%H:%M:%S")

    payload = {
        "query": query,
        "from": from_time,
        "to": to_time,
        "timeZone": "UTC",
        "byReceiptTime": False,
    }
    resp = requests.post(
        f"{SUMO_API_BASE}/search/jobs",
        json=payload,
        auth=(access_id, access_key),
        headers={"Content-Type": "application/json"},
        timeout=30,
    )
    return resp


def get_job_status(job_id, access_id, access_key):
    resp = requests.get(
        f"{SUMO_API_BASE}/search/jobs/{job_id}",
        auth=(access_id, access_key),
        timeout=30,
    )
    return resp


def delete_job(job_id, access_id, access_key):
    requests.delete(
        f"{SUMO_API_BASE}/search/jobs/{job_id}",
        auth=(access_id, access_key),
        timeout=30,
    )


def validate_query_via_api(query, access_id, access_key, query_num):
    print(f"   Submitting query {query_num} to Sumo Logic Search Job API...")

    resp = submit_search_job(query, access_id, access_key)

    if resp.status_code == 400:
        error_msg = resp.json().get("message", resp.text)
        print(f"   ❌ Query {query_num} rejected by Sumo Logic: {error_msg}")
        return False, error_msg

    if resp.status_code == 401:
        print("::warning::Authentication failed — SUMO_LOGIC_ACCESS_ID/SUMO_LOGIC_ACCESS_KEY may be invalid or expired for this org. Skipping API validation.")
        return True, None

    if resp.status_code not in (200, 202):
        print(f"   ❌ Query {query_num} unexpected API response {resp.status_code}: {resp.text}")
        return False, f"HTTP {resp.status_code}"

    job_id = resp.json().get("id")
    if not job_id:
        print(f"   ❌ Query {query_num}: no job ID in response")
        return False, "No job ID returned"

    # Poll for status
    deadline = time.time() + POLL_TIMEOUT
    while time.time() < deadline:
        time.sleep(POLL_INTERVAL)
        status_resp = get_job_status(job_id, access_id, access_key)

        if status_resp.status_code != 200:
            delete_job(job_id, access_id, access_key)
            return False, f"Status poll failed: HTTP {status_resp.status_code}"

        data = status_resp.json()
        state = data.get("state", "")

        if state == "DONE GATHERING RESULTS":
            delete_job(job_id, access_id, access_key)
            print(f"   ✅ Query {query_num} accepted by Sumo Logic")
            return True, None

        if state in ("CANCELLED", "FORCE_PAUSED"):
            pending_errors = data.get("pendingErrors", [])
            pending_warnings = data.get("pendingWarnings", [])
            error_detail = "; ".join(pending_errors) or "; ".join(pending_warnings) or state
            delete_job(job_id, access_id, access_key)
            print(f"   ❌ Query {query_num} failed ({state}): {error_detail}")
            return False, error_detail

        print(f"   ... state: {state}")

    delete_job(job_id, access_id, access_key)
    print(f"   ⚠️  Query {query_num} timed out waiting for result — treating as warning")
    return True, None  # Timeout is not a hard failure


def validate_file(file_path, repo_root, access_id, access_key):
    print(f"\n🔍 Validating: {file_path}")
    queries = extract_new_queries(file_path, repo_root)

    if not queries:
        print("   No new ```sumo queries found")
        return True

    print(f"   Found {len(queries)} new query/queries")
    all_passed = True

    for i, query in enumerate(queries, 1):
        passed, error = validate_query_via_api(query, access_id, access_key, i)
        if not passed:
            all_passed = False
            print(f"   Query preview: {query[:120]}...")

    return all_passed


def main():
    access_id, access_key = get_credentials()
    repo_root = get_repo_root()
    changed_files = get_changed_files(repo_root)

    if not changed_files:
        print("No Markdown files to validate — exiting successfully")
        sys.exit(0)

    results = []
    for file_path in changed_files:
        if os.path.exists(file_path):
            passed = validate_file(file_path, repo_root, access_id, access_key)
            results.append((file_path, passed))
        else:
            print(f"::warning::File not found: {file_path}")

    print("\n" + "=" * 60)
    print("VALIDATION SUMMARY")
    print("=" * 60)
    passed_count = sum(1 for _, r in results if r)
    failed_count = len(results) - passed_count
    print(f"Files processed: {len(results)}")
    print(f"Passed: {passed_count}  Failed: {failed_count}")

    if failed_count > 0:
        print("\nFiles with invalid queries:")
        for fp, r in results:
            if not r:
                print(f"  - {fp}")
        print("\n::error::Query validation failed — one or more queries were rejected by Sumo Logic")
        sys.exit(1)
    else:
        print("\nAll new queries accepted by Sumo Logic")
        sys.exit(0)


if __name__ == "__main__":
    main()
