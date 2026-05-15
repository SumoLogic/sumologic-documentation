# Stage Deploy Skill

Deploy PR branches to the shared Pantheon staging environment for external review.

## Purpose

Enable external reviewers (legal, compliance, product) to preview documentation changes in a live staging environment before merge. Uses the existing `helpdocs` staging environment and `staging/**` branch workflow.

## Usage

### Deploy a PR to Staging

```
/stage-deploy {pr-number-or-branch}
```

**Examples:**
- `/stage-deploy 6701`
- `/stage-deploy docs-update-jira-skill-fields`

### Remove a Staging Branch

```
/stage-teardown {pr-number-or-branch}
```

**Examples:**
- `/stage-teardown 6701`
- `/stage-teardown docs-update-jira-skill-fields`

## How It Works

### Deploy Flow

1. **Resolve input to PR branch**:
   - If input is numeric: look up PR and get head branch
   - If input is branch name: use directly
   - Validate PR exists and is open

2. **Check for conflicts**:
   ```bash
   # List existing staging/pr-* branches
   git ls-remote --heads origin 'refs/heads/staging/pr-*'
   ```
   - If staging branches exist, identify:
     - Which PR number(s) from branch names
     - Who created each branch (via gh pr view)
     - Preview URL from the PRs
   - Ask user if they want to:
     - Continue and overwrite existing staging
     - Cancel and coordinate with team

3. **Detect article URL from PR files**:
   ```bash
   # Get files changed in PR
   gh pr view {pr-number} --json files --jq '.files[].path'
   
   # Filter for docs markdown files
   # Convert docs/path/to/article.md → /docs/path/to/article/
   # Example: docs/integrations/jira.md → /docs/integrations/jira/
   ```

4. **Send Slack notification (deploy starting)**:
   ```bash
   # Post to #web-ops via webhook
   curl -X POST $WEBOPS_SLACK_URL \
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
   
   **Article URL detection**:
   - If PR modifies a single doc file: include direct preview link
   - If PR modifies multiple docs: list primary file or skip article link
   - If PR modifies non-doc files only: omit article preview

5. **Create/update staging branch**:
   ```bash
   git fetch origin {pr-branch}
   git branch -f staging/pr-{number} origin/{pr-branch}
   git push origin staging/pr-{number}
   ```

6. **Existing workflow automatically triggers**:
   - Push to `staging/**` triggers `workflow_deploy-to-pantheon-staging.yml`
   - Workflow builds site from staging branch
   - Deploys to `helpdocs` multidev environment
   - Workflow sends its own Slack notification on success/failure

7. **Post PR comment** with staging URL and instructions

### Teardown Flow

1. **Resolve to staging branch name**: `staging/pr-{number}` or `staging/{branch-name}`

2. **Verify branch exists**:
   ```bash
   git ls-remote --heads origin refs/heads/staging/pr-{number}
   ```
   - If not found, inform user and exit gracefully

3. **Send Slack notification (teardown)**:
   ```bash
   curl -X POST $WEBOPS_SLACK_URL \
     -H 'Content-Type: application/json' \
     -d '{
       "text": "🗑️ Staging environment torn down",
       "blocks": [{
         "type": "section",
         "text": {
           "type": "mrkdwn",
           "text": "*Staging environment removed*\n• Branch: staging/pr-{number}\n• Previous deployment remains live until next deploy"
         }
       }]
     }'
   ```

4. **Delete staging branch**:
   ```bash
   git push origin --delete staging/pr-{number}
   ```

5. **Post PR comment** confirming deletion

## Staging Environment

- **Single shared environment**: `https://helpdocs-sumo-logic.pantheonsite.io/help/`
- **HTTP basic auth protected**: Contact docs team for credentials
- **Only one PR at a time**: Deploying a new PR overwrites the previous deployment
- **Automatic coordination**: Skill checks for conflicts and posts to #web-ops Slack channel

## Conflict Detection

Before deploying, the skill checks for existing `staging/pr-*` branches:

```bash
# Example output if conflict detected:
⚠️ Staging environment conflict detected!

Currently staged PR(s):
• PR #6701 - "Update Jira skill fields"
  - Author: @mafsumo
  - Branch: staging/pr-6701
  - Preview: https://helpdocs-sumo-logic.pantheonsite.io/help/

Do you want to:
1. Continue and overwrite (will notify team in Slack)
2. Cancel and coordinate with @mafsumo first
```

This prevents accidentally overwriting a colleague's staging deployment.

## Limitations

- **Single staging slot**: Only one PR can be deployed to staging at a time
- **No automatic cleanup**: Staging branches persist until explicitly deleted
- **Manual coordination**: Team must communicate to avoid overwriting each other's deployments
- **Build time**: 5-10 minutes for this large Docusaurus site
- **Shared URL**: All reviewers see the same staging environment (whatever was deployed last)

## Slack Notifications

The skill posts to **#web-ops** Slack channel (same as existing workflows):

**On deploy start:**
```
🚀 Staging deployment started for PR #6701
• PR: #6701 - Update Jira skill fields
• Author: @mafsumo
• Staging: https://helpdocs-sumo-logic.pantheonsite.io/help/
• Preview: https://helpdocs-sumo-logic.pantheonsite.io/help/docs/integrations/jira/
• Monitor: [GitHub Actions]
```

If the PR modifies multiple docs, the preview link shows the primary changed file (first .md file in docs/).

**On teardown:**
```
🗑️ Staging environment torn down
• Branch: staging/pr-6701
• Previous deployment remains live until next deploy
```

**On deploy complete:** (via existing workflow)
```
🟢 helpdocs staging site deployed
[Link to staging site]
```

This ensures the team is always aware of staging environment changes.

## Slack Webhook

The skill uses the same `WEBOPS_SLACK_URL` secret as existing workflows. To access:

```bash
# Check if webhook is available (secret not exposed directly)
gh secret list --repo SumoLogic/sumologic-documentation | grep WEBOPS_SLACK_URL
```

If the secret is not accessible locally, the skill will:
1. Skip Slack notifications
2. Warn the user
3. Proceed with deployment (posting to #web-ops is optional, not blocking)

## Implementation Notes

This skill uses:
- **Git commands** for branch management
- **GitHub CLI (`gh`)** for PR metadata
- **curl** for Slack webhooks (optional)
- **Existing workflow** `workflow_deploy-to-pantheon-staging.yml` handles deployment

No new GitHub Actions workflows required.
