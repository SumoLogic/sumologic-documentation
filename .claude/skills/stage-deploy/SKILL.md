# Stage Deploy Skill

Deploy PR branches to ephemeral Pantheon staging environments for external review.

## Purpose

Enable external reviewers (legal, compliance, product) to preview documentation changes in a live environment before merge, without requiring local setup or waiting for production deployment.

## Usage

### Deploy a Staging Environment

User provides a PR number or branch name:
```
/stage-deploy 6701
/stage-deploy docs-update-jira-skill-fields
```

### Tear Down a Staging Environment

User provides a PR number:
```
/stage-teardown 6701
```

## Implementation

### Deploy Flow

1. **Resolve input to PR number**:
   - If input is numeric: use as PR number
   - If input is branch name: resolve via `gh pr list --head {branch} --json number -q '.[0].number'`
   - Validate PR exists and is open

2. **Check for existing environment**:
   - Look for label `staging-deployed` on PR
   - If exists, inform user that redeploying will update the existing environment

3. **Dispatch workflow**:
   ```bash
   gh workflow run workflow_stage-deploy.yml \
     --repo SumoLogic/sumologic-documentation \
     --field pr_number={pr_number}
   ```

4. **Get run ID and provide feedback**:
   ```bash
   gh run list \
     --repo SumoLogic/sumologic-documentation \
     --workflow workflow_stage-deploy.yml \
     --limit 1 \
     --json databaseId,url
   ```
   
   Tell user:
   - Deployment started with link to Actions run
   - Expected URL: `https://pr-{pr_number}-sumo-logic.pantheonsite.io/help/`
   - Build takes ~5-10 minutes (large Docusaurus site)
   - Deployment URL will be posted as a PR comment when complete
   - HTTP basic auth credentials: Share via Slack/email (not posted publicly)
   - To monitor: watch the Actions run

### Teardown Flow

1. **Resolve PR number**: Same as deploy flow

2. **Confirm teardown**: Ask user to confirm (environment will be deleted)

3. **Dispatch teardown workflow**:
   ```bash
   gh workflow run workflow_stage-teardown.yml \
     --repo SumoLogic/sumologic-documentation \
     --field pr_number={pr_number}
   ```

4. **Provide feedback**:
   - Teardown started
   - Confirmation comment will be posted to PR when complete
   - Alternative: User can comment `/stage-teardown` directly on the PR

## Environment Naming Convention

Format: `pr-{number}` (e.g., `pr-6701`)
- Fits Pantheon's 11-character limit
- Human-memorable
- Stable across PR updates
- URL pattern: `https://pr-{number}-sumo-logic.pantheonsite.io/help/`

## Credentials

HTTP basic auth credentials are **not posted publicly**. Documentation team must:
- Share credentials with external reviewers via Slack or email
- Use credentials from repository secrets (`PANTHEON_AUTH_USER` / `PANTHEON_AUTH_PASSWORD`)
- Same credentials apply to all staging environments

## State Tracking

- **GitHub Deployments API**: Each deployment creates a record visible in PR's "Deployments" sidebar
- **PR label**: `staging-deployed` indicates an active staging environment
- **Query active environments**: `gh pr list --label staging-deployed --repo SumoLogic/sumologic-documentation`

## Limitations

- **Pantheon multidev limit**: 10-20 environments per site (plan-dependent)
- **Build time**: 5-10 minutes for this large Docusaurus site
- **Manual teardown required**: Environments persist until explicitly torn down
- **One environment per PR**: Redeploying to same PR updates existing environment

## GitHub Comment Triggers

Users with write access can trigger operations directly from PR comments:
- Comment `/stage-deploy` to deploy
- Comment `/stage-teardown` to tear down

This enables review workflows without requiring Claude Code.

## Error Handling

- **PR not found**: Validate PR exists and is open before dispatching
- **gh CLI not available**: Check for `gh` command and provide clear error if missing
- **Workflow dispatch fails**: Provide error message and suggest checking GitHub Actions permissions
- **Environment limit reached**: If deployment fails due to Pantheon multidev limit, suggest tearing down old environments

## Examples

**Deploy PR #6701**:
```
User: /stage-deploy 6701
Claude: ✅ Deploying PR #6701 to staging...

Deployment started: https://github.com/SumoLogic/sumologic-documentation/actions/runs/123456

Expected URL (available in ~5-10 minutes):
https://pr-6701-sumo-logic.pantheonsite.io/help/

A PR comment will be posted with the URL when deployment completes. Share HTTP basic auth credentials with reviewers via Slack/email.
```

**Deploy current branch**:
```
User: /stage-deploy docs-update-jira-skill-fields
Claude: Resolving branch to PR number...
Found PR #6701

✅ Deploying PR #6701 to staging...
[same output as above]
```

**Tear down with confirmation**:
```
User: /stage-teardown 6701
Claude: ⚠️ This will delete the staging environment for PR #6701.

Are you sure you want to tear it down? (y/n)

User: y
Claude: ✅ Tearing down staging environment for PR #6701...

Teardown started: https://github.com/SumoLogic/sumologic-documentation/actions/runs/123457

A confirmation comment will be posted to the PR when teardown completes.
```

## Testing Checklist

After merging workflows to `main`:

- [ ] Test deploy with PR number: `/stage-deploy {test-pr}`
- [ ] Test deploy with branch name: `/stage-deploy {test-branch}`
- [ ] Verify URL is accessible with basic auth
- [ ] Verify PR comment is posted
- [ ] Verify GitHub Deployment is created
- [ ] Verify label is added
- [ ] Test redeploy to same PR (should update, not create new)
- [ ] Test teardown: `/stage-teardown {test-pr}`
- [ ] Verify environment is deleted from Pantheon
- [ ] Verify deployment status updated to inactive
- [ ] Verify label removed
- [ ] Test GitHub comment triggers: `/stage-deploy` and `/stage-teardown` in PR
- [ ] Test permission denial (non-write user commenting `/stage-teardown`)
