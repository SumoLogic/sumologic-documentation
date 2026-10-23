# Review Teardown — Remove a Review Deployment

Delete a review branch to free the shared Pantheon review slot.

## When to use this command

- Article review is complete and the review branch is no longer needed.
- A PR was closed or merged and the review slot should be cleared for the next deployment.

## Usage

```
/review-teardown {pr-number-or-branch}
```

**Examples:**
- `/review-teardown 6701`
- `/review-teardown docs-update-jira-skill-fields`

## Workflow

### Step 1: Resolve to review branch name

- If input is numeric: review branch is `review/pr-{number}`.
- If input is a branch name: look up the PR number with `gh pr list --head {branch} --json number --jq '.[0].number'`, then use `review/pr-{number}`.

### Step 2: Verify the branch exists

```bash
git ls-remote --heads origin refs/heads/review/pr-{number}
```

If the branch is not found, inform the user and exit — nothing to delete.

### Step 3: Delete the review branch

```bash
git push origin --delete review/pr-{number}
```

### Step 4: Post PR comment

Post a comment on the PR confirming the review branch was deleted and noting that the review URL may still serve the old build until the next deployment.

## Limitations

- **No Slack notifications from this command**: out of scope. Claude Code running locally can't read the `WEBOPS_SLACK_URL` webhook, or any Slack bot token, from GitHub Actions secrets — secrets are write-only once set. The PR comment in Step 4 covers coordination instead.
