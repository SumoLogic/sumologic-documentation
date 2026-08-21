---
name: docs-pr-reviewer
description: Provides a guided, end-to-end review experience for a sumologic-documentation pull request for a subject matter expert (PM, engineer, or other stakeholder) who doesn't have git experience and may have no local dev environment at all. Resolves a PR URL or Jira ticket to the right branch, shows the reviewer what changed as rendered screenshots (and, on request, a real clickable staging preview), applies any requested edits directly, holding them to the same style-guide and placement review as any other docs PR change, pushes them back to the branch, and submits the reviewer's GitHub approval when they're satisfied.
disable-model-invocation: true
allowed-tools: Bash Read Edit Write Glob Grep WebFetch mcp__github__pull_request_read mcp__github__search_pull_requests mcp__github__search_issues mcp__github__pull_request_review_write
argument-hint: [PR URL or Jira ticket key, e.g. DOCS-1234]
---

# Docs PR Preview

Lets a PM, engineer, or other Sumo Logic stakeholder review a `sumologic-documentation` pull request as rendered output (not raw markdown) and, if they want to poke around it themselves, a real live staging site — without installing anything. You do the git, build, and GitHub work; they just look at output and tell you what to change.

This skill assumes you're running in a Claude Code **cloud/remote session** (desktop's cloud mode, or Claude Code on the web) — that's the point of it. The container already has Git, Node, Yarn, and a headless Chromium preinstalled, and it authenticates to GitHub as the reviewer's own connected account, so there's no SSH key, Homebrew, or Node/Yarn setup to walk anyone through. If you're ever running this in a plain local CLI session instead, the same steps still work against whatever clone is already on disk — you just can't assume a fresh, pre-provisioned container.

## Guardrails (read before doing anything)

- **This has to be running as the reviewer's own GitHub identity, not a shared one.** Every push, comment, and approval below is attributed to whoever this session is authenticated as. If you're not sure whose account this cloud session is connected to, ask before doing anything that writes to GitHub.
- **Never commit or push directly to `main`.** Always confirm you're on the PR's own branch first.
- **Never force-push without showing the user what's changing and getting an explicit go-ahead.** Pushing to someone else's PR branch is not reversible for them.
- **Assume zero git literacy.** Narrate what you're doing ("I'm pulling down the latest version of this PR now") rather than showing raw command output as the primary communication.
- **`docs-review` is a single shared staging slot, not one per PR.** If the reviewer asks for the live clickable preview (Step 4's second tier), warn them upfront that pushing to it may overwrite whatever anyone else currently has staged there.
- **Submitting an approval via the API is still the reviewer approving, not you.** Only call the GitHub review-write tool after the reviewer has explicitly said, in their own words, that they're approving — never infer it from "looks fine" or silence.

## Step 1: Confirm GitHub account access

This is a one-time, mostly manual identity step that has nothing to do with which environment you're running in. Ask the user to confirm they've done this (most reviewers who've been at Sumo Logic a while already have), and only walk them through it if they haven't:

1. Sign up at [github.com](https://github.com) if they don't have an account yet.
2. Sign in to Sumo Logic Okta, find **GitHub Enterprise Cloud**, and open it. This SSO's them into the [Sumo Logic GitHub org](https://github.com/SumoLogic) automatically. If it's not in their Okta app list, they need a Help Desk ticket.
3. Associate their Sumo Logic email address with their GitHub account.
4. Sign the [Sumo Logic Docs CLA](https://forms.gle/TKeF6cgNP2amHD9AA).
5. Ask the docs team to grant them Write access to the [Sumo Docs repo](https://github.com/SumoLogic/sumologic-documentation) and add their GitHub username to `.clabot`.
6. Make sure *this* Claude Code session is connected to that same GitHub account (desktop app account settings, or the CLI's `gh`/GitHub connector), not a shared or different identity.

None of this is scriptable — it's identity verification and a human granting access — so just confirm it's done and move on.

## Step 2: Confirm the workspace

In a cloud session this should already be true, but don't assume:

```bash
pwd && git remote -v
```

If you're not already inside a clone of `sumologic-documentation`, clone it fresh:

```bash
git clone https://github.com/SumoLogic/sumologic-documentation.git
cd sumologic-documentation
```

Make sure you're not sitting on stale state before doing anything else:

```bash
git checkout main
git pull origin main
yarn install
```

Confirm the tools you'll need in Step 4 are present. Node/Yarn come with the environment; Chromium is preinstalled for headless screenshots but confirm it resolves before relying on it:

```bash
node -v && yarn -v
npx playwright --version 2>&1 || echo "playwright CLI not found — will fall back to installing it in Step 4"
```

## Step 3: Resolve what the user wants to review

Ask for, or accept, one of:
- **A GitHub PR URL** (e.g. `https://github.com/SumoLogic/sumologic-documentation/pull/1234`), or
- **A Jira ticket key** (e.g. `DOCS-1234`)

### If given a PR URL

Pull the PR number out of the URL — the number right after `/pull/`, not just "the last path segment" (a URL copied from the **Files changed** tab ends in `/pull/1234/files`, where the last segment is `files`, not the number).

Look up the PR's head branch with the GitHub MCP tool rather than hand-parsing JSON:

```
mcp__github__pull_request_read (method: "get", owner: "SumoLogic", repo: "sumologic-documentation", pullNumber: <PR-number>)
```

Take the head branch name from the result, then fetch and check it out:

```bash
git fetch origin <branch-name>
git checkout <branch-name>
```

If the fetch fails with "couldn't find remote ref," fall back to fetching the PR directly by its pull-request ref, which works even with read-only access:

```bash
git fetch origin refs/pull/<PR-number>/head:<branch-name>
git checkout <branch-name>
```

If that also fails, the user needs repo access — point them back to Step 1.

### If given a Jira ticket key instead of a PR URL

Per team convention, branches are often named after their Jira ticket (e.g. ticket `DOCS-1234` → branch `DOCS-1234`). Try that directly first:

```bash
git fetch origin DOCS-1234 2>&1 && git checkout DOCS-1234
```

If that fails, search for an open PR referencing the ticket instead:

```
mcp__github__search_issues (query: "repo:SumoLogic/sumologic-documentation DOCS-1234 in:title,body type:pr")
```

If that finds a PR, fetch it by PR ref (this makes `DOCS-1234` a purely local alias — look up and hold onto the *real* remote branch name via `mcp__github__pull_request_read`, since you'll need it, not the alias, for the push in Step 6):

```bash
git fetch origin refs/pull/<PR-number>/head:DOCS-1234
git checkout DOCS-1234
```

If the search returns nothing, tell the user plainly: there's no open PR for that ticket yet, and confirm whether they meant a different ticket or want to start new work instead (a different flow than this one).

## Step 4: Show the reviewer what changed

Get the list of changed files:

```
mcp__github__pull_request_read (method: "getFiles", owner: "SumoLogic", repo: "sumologic-documentation", pullNumber: <PR-number>)
```

For each changed content file, check its frontmatter for a `slug:` override (Docusaurus otherwise derives the route from the file's path relative to the docs root), so you know the real route to render.

### Tier 1 — rendered screenshots (default, ~1-2 minutes, always available)

Build the site and serve it locally *inside the container* (this never needs to reach the reviewer's own browser, since Claude is the one looking at it):

```bash
yarn build
npx serve build -l 5000 &
```

Then use a headless browser to screenshot each changed page's route and share the images inline in chat. If `npx playwright --version` failed in Step 2, install the browser once before using it:

```bash
npx playwright install chromium
```

This is the fast path and should be the default — don't make the reviewer wait for Step 4's second tier unless they specifically want to click around themselves.

### Tier 2 — real clickable staging site (opt-in, ~15-20 minutes, shared resource)

If the reviewer wants to actually click around the live site in their own browser rather than look at screenshots, explain the tradeoff first: it's slower, and it uses the single shared `docs-review` staging environment, so it may overwrite whatever anyone else currently has staged there. Only proceed on explicit request.

Push the PR's current commit to a `review/**`-prefixed branch — this doesn't touch the PR's real branch, it just creates a parallel ref that triggers `.github/workflows/workflow_deploy-to-pantheon-review.yml`:

```bash
git push origin HEAD:review/<ticket-or-PR-number>
```

Tell the reviewer the deploy is running (GitHub Actions → the `docs-review` workflow, or the team's Slack channel posts a link when it finishes) and that it typically takes 15-20 minutes. The URL follows the pattern `https://docs-review-<PANTHEON_SITE_ID>.pantheonsite.io/help/` — if you don't already know this team's `PANTHEON_SITE_ID` value from a prior run, ask the user once rather than guessing, since it's a GitHub Actions repo variable, not something in the code.

## Step 5: Take the reviewer's requested changes, or their approval

As soon as Step 4 has shown them something, ask directly: does this need changes, or does it look good to approve? Don't wait for an edit loop to ask, and don't assume — some reviewers will just say "looks good."

**If they approve with no changes needed:**

Confirm they mean it as a real approval, not just "looks fine" in passing, then submit it:

```
mcp__github__pull_request_review_write (method: "create", owner: "SumoLogic", repo: "sumologic-documentation", pullNumber: <PR-number>, event: "APPROVE", body: "<optional comment>")
```

If that tool isn't available in this session (MCP server not connected), fall back to walking them through it in the browser instead — don't block on it:
1. Open the PR → **Files changed** → **Review changes** → **Approve** → **Submit review**.

Before moving to Step 7, confirm there's nothing uncommitted sitting around from earlier in this session:

```bash
git status --porcelain
```

If this is empty, go to Step 7. If it isn't, stop and figure out where the change came from before doing anything with it — it never went through the style/placement check below.

**If they want changes:**

1. Ask what needs to change, in plain terms.
2. Open the actual file(s) in question and make the edit directly.
3. Before treating the edit as finished, hold it to the same bar any other docs PR change gets: check it against the Sumo Logic style guide (the `sumo-style` skill covers voice, terminology, formatting) and confirm placement is still correct (right directory, frontmatter fields, sidebar entry). A live-review edit doesn't skip this just because it happened outside a normal PR-writing flow.
4. Re-run Step 4's screenshot tier for the affected page and report back what changed, rather than just saying "done."

Repeat for as many rounds as the reviewer wants. Don't touch files they didn't ask about. When they confirm they're done, ask once more whether it's good now or needs another pass, then move to Step 6.

## Step 6: Consolidate and push

Only reach this step once every edit from Step 5 has cleared the style-guide and placement check. Confirm you're still on the PR's own branch, not `main` or anything else:

```bash
git branch --show-current
```

Confirm there's actually something to commit:

```bash
git status --porcelain
```

If empty, something's off — the reviewer thought a change was made that wasn't. Don't force a commit just to have something to push.

If it shows changes, check whether the branch already has a commit before staging anything (staging doesn't move `HEAD`, so this has to happen first):

```bash
git log --oneline origin/main..HEAD
```

**If that shows a commit**, check who it belongs to before amending — `--amend` always targets whatever `HEAD` currently is, and it could be the PR author's own commit, or a follow-up from an earlier review session:

```bash
git log -1 --format="%an <%ae> — %s"
```

If it's clearly the PR author's own commit, amend into it:

```bash
git add -A
git commit --amend --no-edit
```

If it isn't (different author, or reads like a prior reviewer's edit), don't amend — commit normally instead, same as the empty-log case:

```bash
git add -A
git commit -m "<short summary of what changed and why>"
```

Show the user a diff summary and get an explicit yes before pushing:

```bash
git diff origin/<remote-branch-name>..HEAD --stat
```

```bash
git push origin HEAD:<remote-branch-name>
```

If the commit was amended, a plain push will be rejected — use `--force-with-lease`, which refuses to overwrite anyone else's work that landed on the branch since you last fetched it:

```bash
git fetch origin <remote-branch-name>
git push --force-with-lease=<remote-branch-name> origin HEAD:<remote-branch-name>
```

## Step 7: Wrap up

**If they approved with no changes:** confirm the review shows as submitted on the PR. Merging still follows the repo's normal requirements (other reviewers, checks, the merge-window rules in `pr.yml`) — this skill only handled the preview and the approval itself.

**If changes were made and pushed:** link them straight to the PR (`https://github.com/SumoLogic/sumologic-documentation/pull/<PR-number>`) so they can see the update reflected there. Remind them it still needs the normal peer review and merge.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `git fetch`/`git push` fails with a permission error | This session's connected GitHub account doesn't have Write access to the repo yet | Point back to Step 1 |
| `mcp__github__*` tool calls fail or aren't found | GitHub MCP server isn't connected in this session | Fall back to the manual browser steps noted in Step 5; retry the MCP tool later |
| `yarn build` fails | Usually a real content/config error introduced by an edit in Step 5 | Read the actual build error, don't assume it's environmental — cloud containers come pre-provisioned, so version mismatches are rare here |
| Playwright screenshot fails with a missing browser error | Chromium wasn't preinstalled in this particular environment | `npx playwright install chromium`, then retry |
| Push rejected after amend | History was rewritten locally | Use `git push --force-with-lease`, never plain `--force` |
| Push lands on a branch that doesn't match the PR, or creates a new one | Local branch was a Jira-ticket alias, not the PR's real remote branch name | Look up the real remote branch name via `mcp__github__pull_request_read` and push to that name |
| Reviewer wants the Tier 2 staging link but doesn't know if `docs-review` is already in use | It's a single shared slot with no built-in "is this free" check | Ask in the team's Slack channel before pushing, or just accept it may get overwritten |
| Don't know the `PANTHEON_SITE_ID` for the staging URL | It's a GitHub Actions repo variable, not in the codebase | Ask the user or check GitHub → repo Settings → Actions → Variables (needs admin access) |
