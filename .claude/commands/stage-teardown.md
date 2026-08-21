# Stage Teardown — Remove a Staging Deployment

Delete a staging branch to free the shared Pantheon staging slot.

## When to use this command

- External review is complete and the staging branch is no longer needed.
- A PR was closed or merged and the staging slot should be cleared for the next deployment.

## Usage

```
/stage-teardown {pr-number-or-branch}
```

**Examples:**
- `/stage-teardown 6701`
- `/stage-teardown docs-update-jira-skill-fields`

## Workflow

### Step 1: Resolve to staging branch name

- If input is numeric: staging branch is `staging/pr-{number}`.
- If input is a branch name: look up the PR number with `gh pr list --head {branch} --json number --jq '.[0].number'`, then use `staging/pr-{number}`.

### Step 2: Verify the branch exists

```bash
git ls-remote --heads origin refs/heads/staging/pr-{number}
```

If the branch is not found, inform the user and exit — nothing to delete.

### Step 3: Delete the staging branch

```bash
git push origin --delete staging/pr-{number}
```

### Step 4: Post PR comment

Post a comment on the PR confirming the staging branch was deleted and noting that the staging URL may still serve the old build until the next deployment.

## Limitations

- **No Slack notifications from this command**: out of scope. Claude Code running locally can't read the `WEBOPS_SLACK_URL` webhook, or any Slack bot token, from GitHub Actions secrets — secrets are write-only once set. The PR comment in Step 4 covers coordination instead.
