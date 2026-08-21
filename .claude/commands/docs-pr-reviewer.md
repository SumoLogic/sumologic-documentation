# Docs PR Reviewer — Apply an SME's Edit to an Existing PR

Lets a PM, engineer, or other Sumo Logic stakeholder (an SME) apply their own requested change directly to an already-open `sumologic-documentation` PR, without git experience and without a local dev environment. Claude does the git and build work; the SME just says what to change and looks at a quick screenshot to confirm it.

**This is not a preview tool and not an approval tool.** Docs PRs at Sumo Logic are opened on a `review/**`-named branch, which already triggers a live staging deploy (`.github/workflows/workflow_deploy-to-pantheon-review.yml`) the moment the PR is opened — the tech writer shares that staging link directly, and the SME clicks around it in their own browser. None of that involves Claude Code. Likewise, if the SME has no changes, they approve directly on the PR page — also nothing to do with Claude Code. This command exists for exactly one case: **the SME wants to make the edit themselves** instead of leaving a comment for the tech writer to apply. Once pushed, the commit lands on the same `review/**` branch, which automatically redeploys the same staging site the SME was already looking at.

This command assumes you're running in a Claude Code **cloud/remote session** — that's the point of it. This is about the *environment*, not which interface you're typing into: desktop's cloud mode, Claude Code on the web, and Claude Code CLI pointed at a remote/cloud environment all qualify equally, since the CLI is just as capable of running against a remote container as it is against a local machine. The container already has Git, Node, Yarn, and a headless Chromium preinstalled, and it authenticates to GitHub as the reviewer's own connected account, so there's no SSH key, Homebrew, or Node/Yarn setup to walk anyone through. If you're ever running this in a session pointed at the reviewer's own local machine instead (Desktop or CLI, it doesn't matter which), the same steps still work against whatever clone is already on disk — you just can't assume a fresh, pre-provisioned container.

## What this command does

When you invoke `/docs-pr-reviewer <PR URL or Jira ticket key>`, Claude will:

1. **Confirm GitHub access**. Make sure the SME's own GitHub account can reach the repo
2. **Resolve the target**. Turn a PR URL or a Jira ticket key (e.g. `DOCS-1234`) into the right branch — this branch is very likely already named `review/xxx` and already has a live staging deploy; that's expected, not something this command sets up
3. **Show the current page**. A quick rendered screenshot of the page being edited, so the SME can confirm they're looking at the right thing before and after the change — a sanity check, not a substitute for the staging site they already have
4. **Apply the requested edit**, held to the same style-guide and placement review as any other docs PR change
5. **Push back a single, clean commit** to the PR's branch — which, since it's already `review/**`, automatically refreshes the SME's existing staging link within the usual ~15-20 minutes

## When to use this command

* An SME wants to apply their own edit to an existing PR, rather than leaving a comment for the tech writer to act on
* The SME has no local dev environment and no git experience

## When NOT to use this command

* **Just viewing the PR's rendered pages** — the tech writer's staging link already does this; opening Claude Code isn't necessary
* **Just approving** — that happens directly on the PR page in GitHub; this command doesn't submit reviews or approvals
* **Starting brand-new work with no existing PR** — this command resolves an *existing* PR or ticket; it doesn't create one from scratch
* **A full editorial audit** — use `/audit-doc` or `/seo-audit` instead

---

## Guardrails (read before doing anything)

- **This has to be running as the SME's own GitHub identity, not a shared one.** Every push below is attributed to whoever this session is authenticated as. If you're not sure whose account this session is connected to, ask before pushing.
- **Never commit or push directly to `main`.** Always confirm you're on the PR's own branch first.
- **Never force-push without showing the user what's changing and getting an explicit go-ahead.** Pushing to someone else's PR branch is not reversible for them.
- **Assume zero git literacy.** Narrate what you're doing ("I'm pulling down the latest version of this PR now") rather than showing raw command output as the primary communication.
- **The staging deploy this push triggers is a single shared slot across the whole team (`docs-review`), not one per branch.** Pushing here refreshes it to reflect this branch again, which is expected — but if someone else's `review/**` PR was staged more recently, this push effectively reclaims the shared slot back to this content. Worth a heads-up to the SME/tech writer if the timing might collide with someone else's active review.

## Workflow

### Step 1: Confirm GitHub account access

This is a one-time, mostly manual identity step that has nothing to do with which environment you're running in. Ask the user to confirm they've done this (most reviewers who've been at Sumo Logic a while already have), and only walk them through it if they haven't:

1. Sign up at [github.com](https://github.com) if they don't have an account yet.
2. Sign in to Sumo Logic Okta, find **GitHub Enterprise Cloud**, and open it. This SSO's them into the [Sumo Logic GitHub org](https://github.com/SumoLogic) automatically. If it's not in their Okta app list, they need a Help Desk ticket.
3. Associate their Sumo Logic email address with their GitHub account.
4. Sign the [Sumo Logic Docs CLA](https://forms.gle/TKeF6cgNP2amHD9AA).
5. Ask the docs team to grant them Write access to the [Sumo Docs repo](https://github.com/SumoLogic/sumologic-documentation) and add their GitHub username to `.clabot`.
6. Make sure *this* Claude Code session is connected to that same GitHub account (desktop app account settings, or the CLI's `gh`/GitHub connector), not a shared or different identity.

None of this is scriptable — it's identity verification and a human granting access — so just confirm it's done and move on.

### Step 2: Confirm the workspace

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

`yarn install` is required every time, even in a pre-provisioned cloud container — the toolchain (Node/Yarn/Chromium) comes with the container, but this repo's own `node_modules` does not, and is missing on a fresh clone.

Confirm the tools you'll need in Step 3 are present:

```bash
node -v && yarn -v
npx playwright --version 2>&1 || echo "playwright CLI not found — will fall back to installing it in Step 3"
```

### Step 3: Resolve what the user wants to edit

Ask for, or accept, one of:
- **A GitHub PR URL** (e.g. `https://github.com/SumoLogic/sumologic-documentation/pull/1234`), or
- **A Jira ticket key** (e.g. `DOCS-1234`)

#### If given a PR URL

Pull the PR number out of the URL — the number right after `/pull/`, not just "the last path segment" (a URL copied from the **Files changed** tab ends in `/pull/1234/files`, where the last segment is `files`, not the number).

Look up the PR's head branch with the GitHub MCP tool rather than hand-parsing JSON:

```
mcp__github__pull_request_read (method: "get", owner: "SumoLogic", repo: "sumologic-documentation", pullNumber: <PR-number>)
```

Take the head branch name from the result, then fetch and check it out. Note the head repo may be a fork (some internal contributors push from their own fork rather than a branch on this repo directly) — check `head.repo.full_name` in the result above before assuming `origin` has the branch:

```bash
git fetch origin <branch-name>
git checkout <branch-name>
```

If the fetch fails with "couldn't find remote ref" (expected whenever the head repo is a fork), fall back to fetching the PR directly by its pull-request ref, which works regardless of fork vs. same-repo and even with read-only access:

```bash
git fetch origin refs/pull/<PR-number>/head:<branch-name>
git checkout <branch-name>
```

If that also fails, the user needs repo access — point them back to Step 1.

#### If given a Jira ticket key instead of a PR URL

Per team convention, branches are often named after their Jira ticket (e.g. ticket `DOCS-1234` → branch `DOCS-1234`, or a `review/DOCS-1234` variant). Try the plain ticket name directly first:

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

### Step 4: Show the current page

Get the list of changed files:

```
mcp__github__pull_request_read (method: "getFiles", owner: "SumoLogic", repo: "sumologic-documentation", pullNumber: <PR-number>)
```

For the page the SME wants to edit, check its frontmatter for a `slug:` override (Docusaurus otherwise derives the route from the file's path relative to the docs root), so you know the real route to render.

Build the site and serve it locally *inside the container* (this never needs to reach the reviewer's own browser — it's just for Claude's own screenshot, a quick sanity check alongside the real staging site the SME already has):

```bash
yarn build
npx serve build -l 5000 &
```

Screenshot the relevant route using Playwright's own CLI, not a `require('playwright')` script — the `playwright` npm package isn't a dependency of this repo, so requiring it from a standalone script fails with `MODULE_NOT_FOUND` even though the CLI itself resolves fine:

```bash
npx playwright screenshot --viewport-size=1280,900 --wait-for-timeout=1500 http://localhost:5000/<route> <output-path>.png
```

Share the image inline in chat. If `npx playwright --version` failed in Step 2, install the browser once before using the CLI above:

```bash
npx playwright install chromium
```

### Step 5: Apply the requested edit

1. Ask what needs to change, in plain terms.
2. Open the actual file(s) in question and make the edit directly.
3. Before treating the edit as finished, hold it to the same bar any other docs PR change gets: check it against the Sumo Logic style guide (the `sumo-style` skill covers voice, terminology, formatting) and confirm placement is still correct (right directory, frontmatter fields, sidebar entry). An SME-requested edit doesn't skip this just because it happened outside a normal PR-writing flow.
4. Re-run Step 4's screenshot for the affected page and report back what changed, rather than just saying "done."

Repeat for as many rounds as the SME wants. Don't touch files they didn't ask about. When they confirm they're done, move to Step 6.

### Step 6: Consolidate and push

Confirm you're still on the PR's own branch, not `main` or anything else:

```bash
git branch --show-current
```

Confirm there's actually something to commit:

```bash
git status --porcelain
```

If empty, something's off — the SME thought a change was made that wasn't. Don't force a commit just to have something to push.

If it shows changes, check whether the branch already has a commit before staging anything (staging doesn't move `HEAD`, so this has to happen first):

```bash
git log --oneline origin/main..HEAD
```

**If that shows a commit**, check who it belongs to before amending — `--amend` always targets whatever `HEAD` currently is, and it could be the PR author's own commit, or a follow-up from an earlier session:

```bash
git log -1 --format="%an <%ae> — %s"
```

If it's clearly the PR author's own commit, amend into it:

```bash
git add -A
git commit --amend --no-edit
```

If this fails with "doing so would make it empty," the edit exactly reversed the branch's existing diff against `main` — the SME's fix brought the content back to identical with `main`, so there's nothing left to push. Don't force an empty commit. Tell the SME plainly: with this change applied, the branch no longer differs from `main` — confirm whether they meant something else.

If it isn't clearly the author's own commit (different author, or reads like a prior session's edit), don't amend — commit normally instead, same as the empty-log case:

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

### Step 7: Wrap up

Tell the SME the change is pushed and link them straight to the PR (`https://github.com/SumoLogic/sumologic-documentation/pull/<PR-number>`). Since the branch is already `review/**`, the push automatically re-triggers the staging deploy — remind them the same staging link they already have will reflect the change in the usual ~15-20 minutes, and that approving or merging still happens directly on GitHub, not through this command.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `git fetch`/`git push` fails with a permission error | This session's connected GitHub account doesn't have Write access to the repo yet | Point back to Step 1 |
| `git fetch origin <branch-name>` fails with "couldn't find remote ref" | The PR's head repo is a fork, not this repo directly | Fall back to `git fetch origin refs/pull/<PR-number>/head:<branch-name>`, which works either way |
| `mcp__github__*` tool calls fail or aren't found | GitHub MCP server isn't connected in this session | Retry after a moment; if it's still down, resolve the PR/branch manually via the GitHub web UI in the meantime |
| `yarn build` fails | Usually a real content/config error introduced by an edit in Step 5 | Read the actual build error, don't assume it's environmental — cloud containers come pre-provisioned, so version mismatches are rare here |
| Playwright screenshot fails with a missing browser error | Chromium wasn't preinstalled in this particular environment | `npx playwright install chromium`, then retry |
| `require('playwright')` fails with `MODULE_NOT_FOUND` | The `playwright` npm package isn't a dependency of this repo, even though the CLI resolves | Use `npx playwright screenshot`, not a script that requires the module |
| Push rejected after amend | History was rewritten locally | Use `git push --force-with-lease`, never plain `--force` |
| Push lands on a branch that doesn't match the PR, or creates a new one | Local branch was a Jira-ticket alias, not the PR's real remote branch name | Look up the real remote branch name via `mcp__github__pull_request_read` and push to that name |
| Amending fails with "doing so would make it empty" | The SME's edit exactly reverses the branch's existing diff against `main` | Don't force an empty commit — tell the SME the branch no longer differs from `main` and confirm whether they meant something else |
| SME expects Claude to show them a live, clickable staging site | This command only produces a quick static screenshot for confirmation | Point them to the staging link the tech writer already shared (`review/**` branches deploy automatically on PR open) — that's the real preview, not this command |
