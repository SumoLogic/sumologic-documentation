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

If one or more review branches exist, identify who owns each one (`gh pr view {n}` for every match) and list all of them for the user:

```
⚠️ Review environment conflict detected!

Currently in review:
• PR #{n1} — "{title1}" (author: @{handle1})
• PR #{n2} — "{title2}" (author: @{handle2})
  (one line per review/pr-* branch found — there can be more than one if an earlier deployment was never torn down)
Preview: https://docs-review-sumo-logic.pantheonsite.io/help/

1. Continue and overwrite (posts a heads-up comment on every PR listed above)
2. Cancel and coordinate with the author(s) first
```

Only the branch from the most recent push is actually live on the shared URL. Older entries are stale leftovers from deployments that were never torn down with `/review-teardown` — flag this to the user and suggest cleaning them up.

If the user chooses to continue and overwrite, post a heads-up comment on each displaced PR listed above (not the PR you're about to deploy):

```
⚠️ This review deployment was overwritten by PR #{new-number} ({new-title}). The docs-review environment now serves that PR's build instead of this one.
```

This comment is separate from the Step 6 comment, which goes on the PR you're deploying.

### Step 3: Detect article URL from PR files

```bash
gh pr view {pr-number} --json files --jq '.files[].path'
```

Convert changed doc paths to preview URLs:
- `docs/integrations/jira.md` → `/docs/integrations/jira/`

- Single doc changed: include direct article preview link.
- Multiple docs changed: link to the first `.md` file under `docs/`, or omit.
- No doc files changed: omit article preview link entirely.

### Step 4: Push review branch

```bash
git fetch origin {pr-branch}
git push --force origin origin/{pr-branch}:refs/heads/review/pr-{number}
```

This pushes directly from the remote-tracking ref without touching local branch state. `--force` is required: the target ref already exists from a previous deploy, and the PR branch may have been amended, rebased, or force-pushed since then (routine when addressing review feedback), so the update isn't guaranteed to be a fast-forward.

### Step 5: Workflow triggers automatically

Pushing to `review/**` triggers `workflow_deploy-to-pantheon-review.yml`, which builds the Docusaurus site from the review branch, deploys it to the `docs-review` multidev environment, and posts its own success/failure notification to Slack.

### Step 6: Post PR comment

Post a comment on the PR with:
- Review URL
- Direct article preview link (if applicable)
- Note that the environment is shared and may be overwritten
- Link to the Actions run for build status

## Limitations

- **Single review slot**: Only one PR deployed at a time.
- **No automatic cleanup**: Review branches persist until explicitly deleted with `/review-teardown`.
- **No Slack notifications from this command**: out of scope. Claude Code running locally can't read the `WEBOPS_SLACK_URL` webhook, or any Slack bot token, from GitHub Actions secrets — secrets are write-only once set, with no CLI or API path to retrieve them. The PR comment in Step 6 covers coordination instead. (The workflow's own build success/failure ping to Slack, noted in Step 5, is separate, existing infrastructure and unaffected by this.)
- **Shared URL**: All reviewers see whatever was deployed last.
- **Separate from `/stage-deploy`**: This environment is for quick article-level review. UX/UI and site-wide feature work should use `/stage-deploy`, which targets the dedicated `helpdocs` environment.
