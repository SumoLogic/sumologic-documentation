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

### Step 3: Send Slack notification (optional)

Slack notifications require `$WEBOPS_SLACK_URL` to be exported in the local environment. Check first:

```bash
if [ -z "$WEBOPS_SLACK_URL" ]; then
  echo "⚠️ WEBOPS_SLACK_URL not set — skipping Slack notification."
fi
```

If set, post to #web-ops:

```bash
curl -X POST "$WEBOPS_SLACK_URL" \
  -H 'Content-Type: application/json' \
  -d '{
    "text": "🗑️ Review environment torn down",
    "blocks": [{
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Review environment removed*\n• Branch: review/pr-{number}\n• Note: previous deployment remains live at the review URL until the next deployment overwrites it"
      }
    }]
  }'
```

### Step 4: Delete the review branch

```bash
git push origin --delete review/pr-{number}
```

### Step 5: Post PR comment

Post a comment on the PR confirming the review branch was deleted and noting that the review URL may still serve the old build until the next deployment.
