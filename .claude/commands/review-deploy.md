# Review Deploy — Deploy PR to the Review Environment

Deploy a PR branch to the shared Pantheon review environment for quick, temporary article review (legal, compliance, product, ad hoc feedback).

## When to use this command

- You need a reviewer to preview a doc change in a live environment before merge, and the change is a normal content/article update rather than a UX/UI or site-wide feature.
- A PR author or reviewer asks for a quick review link.

For staging larger UX/UI or site-wide feature work, use `/stage-deploy` instead — that targets the separate `helpdocs` environment reserved for feature previews.

## Usage

```
/review-deploy {pr-number-or-branch}
```

**Examples:**
- `/review-deploy 6701`
- `/review-deploy docs-update-jira-skill-fields`

## Review environment

- **URL**: `https://docs-review-sumo-logic.pantheonsite.io/help/`
- **HTTP basic auth protected**: Contact the docs team for credentials.
- **Single shared slot**: Only one PR can be in review at a time. Deploying overwrites the previous deployment.
- **Build time**: 5–10 minutes after the push triggers the workflow.

## Workflow

### Step 1: Resolve input to PR branch

- If input is numeric: run `gh pr view {number} --json headRefName --jq '.headRefName'` to get the branch name. Validate the PR exists and is open.
- If input is a branch name: use it directly. Look up the PR number with `gh pr list --head {branch} --json number --jq '.[0].number'`.

You need both the branch name (for the push) and the PR number (for the review branch name and PR comment).

### Step 2: Check for conflicts

```bash
git ls-remote --heads origin 'refs/heads/review/pr-*'
```

If review branches exist, identify who owns each one (`gh pr view {n}`) and ask the user:

```
⚠️ Review environment conflict detected!

Currently in review: PR #{n} — "{title}" (author: @{handle})
Branch: review/pr-{n}
Preview: https://docs-review-sumo-logic.pantheonsite.io/help/

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
    "text": "🚀 Review deployment started for PR #{number}",
    "blocks": [{
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Review deployment started*\n• PR: <{pr-url}|#{number} - {title}>\n• Author: {author}\n• Review site: <https://docs-review-sumo-logic.pantheonsite.io/help/|docs-review>\n• Preview: <https://docs-review-sumo-logic.pantheonsite.io/help{article-path}|{article-name}>\n• Monitor: <{actions-url}|GitHub Actions>"
      }
    }]
  }'
```

If not set, skip silently and continue.

### Step 5: Push review branch

```bash
git fetch origin {pr-branch}
git push origin origin/{pr-branch}:refs/heads/review/pr-{number}
```

This pushes directly from the remote-tracking ref without touching local branch state.

### Step 6: Workflow triggers automatically

Pushing to `review/**` triggers `workflow_deploy-to-pantheon-review.yml`, which:
1. Builds the Docusaurus site from the review branch.
2. Deploys to the `docs-review` multidev environment.
3. Posts its own success/failure notification to Slack.

### Step 7: Post PR comment

Post a comment on the PR with:
- Review URL
- Direct article preview link (if applicable)
- Note that the environment is shared and may be overwritten
- Link to the Actions run for build status

## Limitations

- **Single review slot**: Only one PR deployed at a time.
- **No automatic cleanup**: Review branches persist until explicitly deleted with `/review-teardown`.
- **Slack optional**: Notifications only fire if `WEBOPS_SLACK_URL` is set locally.
- **Shared URL**: All reviewers see whatever was deployed last.
- **Separate from `/stage-deploy`**: This environment is for quick article-level review. UX/UI and site-wide feature work should use `/stage-deploy`, which targets the dedicated `helpdocs` environment.
