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

### Step 1: Resolve input to PR number

- If input is numeric: validate the PR exists and is open with `gh pr view {number} --json state --jq '.state'`.
- If input is a branch name: look up the PR number with `gh pr list --head {branch} --json number --jq '.[0].number'`.

You need the PR number for the review branch name, the PR comment, and to fetch the PR's head commit in Step 4. The branch name itself isn't needed for the push — see Step 4 for why.

### Step 2: Check for conflicts

```bash
git ls-remote --heads origin 'refs/heads/review/pr-*'
```

Exclude `review/pr-{number}` for the PR you're currently deploying from the results — redeploying the same PR after new commits isn't a conflict with itself, and shouldn't trigger the overwrite comment below on the PR's own thread.

If one or more *other* review branches remain, identify who owns each one (`gh pr view {n}` for every match) and list all of them for the user:

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
gh pr view {pr-number} --json files --jq '.files[] | select(.changeType != "REMOVED") | .path'
```

Excluding removed files matters: a deleted doc's path won't exist on the deployed branch, and would otherwise turn into a preview link that 404s.

Convert the remaining changed doc paths to preview URLs:
- `docs/integrations/jira.md` → `/docs/integrations/jira/`

- Single doc changed: include direct article preview link.
- Multiple docs changed: link to the first `.md` file under `docs/`, or omit.
- No doc files changed (or only removed ones): omit article preview link entirely.

### Step 4: Push review branch

```bash
git fetch origin "refs/pull/{number}/head"
git push --force origin FETCH_HEAD:refs/heads/review/pr-{number}
```

Fetching `refs/pull/{number}/head` instead of a branch name works for every PR, including fork-based contributions — this is an open-source repo, and a fork's branch lives on the fork's remote, not `origin`, so `git fetch origin {pr-branch}` fails with "couldn't find remote ref" for those PRs. GitHub maintains `refs/pull/{number}/head` on `origin` automatically for every open PR regardless of where its branch actually lives. `--force` is required on the push: the target ref already exists from a previous deploy, and the PR branch may have been amended, rebased, or force-pushed since then (routine when addressing review feedback), so the update isn't guaranteed to be a fast-forward.

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
