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

2. **Create/update staging branch**:
   ```bash
   git fetch origin {pr-branch}
   git branch -f staging/pr-{number} origin/{pr-branch}
   git push origin staging/pr-{number}
   ```

3. **Existing workflow automatically triggers**:
   - Push to `staging/**` triggers `workflow_deploy-to-pantheon-staging.yml`
   - Workflow builds site from staging branch
   - Deploys to `helpdocs` multidev environment
   - Sends Slack notification on success/failure

4. **Post PR comment** with staging URL and instructions

### Teardown Flow

1. **Resolve to staging branch name**: `staging/pr-{number}` or `staging/{branch-name}`

2. **Delete staging branch**:
   ```bash
   git push origin --delete staging/pr-{number}
   ```

3. **Post PR comment** confirming deletion

## Staging Environment

- **Single shared environment**: `https://helpdocs-sumo-logic.pantheonsite.io/help/`
- **HTTP basic auth protected**: Contact docs team for credentials
- **Only one PR at a time**: Deploying a new PR overwrites the previous deployment
- **Manual coordination required**: Team should communicate before deploying to staging

## Limitations

- **Single staging slot**: Only one PR can be deployed to staging at a time
- **No automatic cleanup**: Staging branches persist until explicitly deleted
- **Manual coordination**: Team must communicate to avoid overwriting each other's deployments
- **Build time**: 5-10 minutes for this large Docusaurus site
- **Shared URL**: All reviewers see the same staging environment (whatever was deployed last)

## Implementation Notes

This skill uses **git commands only** - no new GitHub Actions workflows required. The existing `workflow_deploy-to-pantheon-staging.yml` handles all deployment logic automatically when it detects a push to `staging/**` branches.
