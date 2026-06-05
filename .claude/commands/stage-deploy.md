# Stage Deploy — Deploy PR to Shared Staging

Deploy a PR branch to the shared Pantheon staging environment for external review (legal, compliance, product).

## When to use this command

- You need an external reviewer to preview a doc change in a live environment before merge.
- A PR author or reviewer asks for a staging link.

## Usage

```
/stage-deploy {pr-number-or-branch}
```

**Examples:**
- `/stage-deploy 6701`
- `/stage-deploy docs-update-jira-skill-fields`

## Staging environment

- **URL**: `https://helpdocs-sumo-logic.pantheonsite.io/help/`
- **HTTP basic auth protected**: Contact the docs team for credentials.
- **Single shared slot**: Only one PR can be staged at a time. Deploying overwrites the previous deployment.
- **Build time**: 5–10 minutes after the push triggers the workflow.

## Workflow

### Step 1: Resolve input to PR branch

- If input is numeric: run `gh pr view {number} --json headRefName --jq '.headRefName'` to get the branch name. Validate the PR exists and is open.
- If input is a branch name: use it directly. Look up the PR number with `gh pr list --head {branch} --json number --jq '.[0].number'`.

You need both the branch name (for the push) and the PR number (for the staging branch name and PR comment).

### Step 2: Check for conflicts

```bash
git ls-remote --heads origin 'refs/heads/staging/pr-*'
```

If staging branches exist, identify who owns each one (`gh pr view {n}`) and ask the user:

```
⚠️ Staging conflict detected!

Currently staged: PR #{n} — "{title}" (author: @{handle})
Branch: staging/pr-{n}
Preview: https://helpdocs-sumo-logic.pantheonsite.io/help/

1. Continue and overwrite (notifies #web-ops if Slack is configured)
2. Cancel and coordinate with @{handle} first
```

### Step 3: Detect article URL from PR files

```bash
gh pr view {pr-number} --json files --jq '.files[].path'
```

Convert changed doc paths to preview URLs:
- `docs/integrations/jira.md` → `/docs/integrations/jira/`

- Single doc changed: include direct article preview link.
- Multiple docs changed: link to the first `.md` file under `docs/`, or omit.
- No doc files changed: omit article preview link entirely.

### Step 4: Send Slack notification (optional)

Slack notifications require `$WEBOPS_SLACK_URL` to be exported in the local environment. Check first:

```bash
if [ -z "$WEBOPS_SLACK_URL" ]; then
  echo "⚠️ WEBOPS_SLACK_URL not set — skipping Slack notification. To enable, export the webhook URL: export WEBOPS_SLACK_URL=https://hooks.slack.com/..."
fi
```

If set, post to #web-ops:

```bash
curl -X POST "$WEBOPS_SLACK_URL" \
  -H 'Content-Type: application/json' \
  -d '{
    "text": "🚀 Staging deployment started for PR #{number}",
    "blocks": [{
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Staging deployment started*\n• PR: <{pr-url}|#{number} - {title}>\n• Author: {author}\n• Staging: <https://helpdocs-sumo-logic.pantheonsite.io/help/|helpdocs>\n• Preview: <https://helpdocs-sumo-logic.pantheonsite.io/help{article-path}|{article-name}>\n• Monitor: <{actions-url}|GitHub Actions>"
      }
    }]
  }'
```

If not set, skip silently and continue.

### Step 5: Push staging branch

```bash
git fetch origin {pr-branch}
git push origin origin/{pr-branch}:refs/heads/staging/pr-{number}
```

This pushes directly from the remote-tracking ref without touching local branch state.

### Step 6: Workflow triggers automatically

Pushing to `staging/**` triggers `workflow_deploy-to-pantheon-staging.yml`, which:
1. Builds the Docusaurus site from the staging branch.
2. Deploys to the `helpdocs` multidev environment.
3. Posts its own success/failure notification to Slack.

### Step 7: Post PR comment

Post a comment on the PR with:
- Staging URL
- Direct article preview link (if applicable)
- Note that the environment is shared and may be overwritten
- Link to the Actions run for build status

## Limitations

- **Single staging slot**: Only one PR deployed at a time.
- **No automatic cleanup**: Staging branches persist until explicitly deleted with `/stage-teardown`.
- **Slack optional**: Notifications only fire if `WEBOPS_SLACK_URL` is set locally.
- **Shared URL**: All reviewers see whatever was deployed last.
