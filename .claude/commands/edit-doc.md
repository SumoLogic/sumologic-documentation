# Edit Doc — Submit Your Own Small Change

Lets a PM, engineer, or other Sumo Logic stakeholder (an SME) submit their own edit to an **already-published** doc — a typo, a correction, a short update — with no git experience and no local dev environment, ending in a real PR opened under their own name. Claude finds the file, applies the change, and handles the git/GitHub mechanics; the SME just says what to change.

This is the counterpart to `/docs-pr-reviewer`, but for the opposite starting point: `/docs-pr-reviewer` acts on a PR that already exists; this command creates a new one. Once this command hands off a PR, `/docs-pr-reviewer` is what applies any further round of edits an SME wants to make to it themselves.

This command assumes a Claude Code **cloud/remote session** — desktop's cloud mode, Claude Code on the web, or CLI pointed at a remote environment all qualify equally; this is about the environment, not the interface. The container comes with Git, Node, Yarn, and headless Chromium preinstalled, and authenticates to GitHub as the SME's own connected account (via Connectors → GitHub in Claude Code), so there's no SSH key, Homebrew, or Node/Yarn setup involved. In a session pointed at the SME's own local machine instead, the same steps work against whatever's already on disk — just without the "nothing to install" guarantee.

## What this command does

When you invoke `/edit-doc <description of the change>`, Claude will:

1. **Confirm GitHub access**, including that the GitHub connector is enabled for this session
2. **Locate the page** the SME wants to change, from a description, a URL, or a Jira ticket
3. **Show the current page** as a quick screenshot, to confirm it's the right one
4. **Apply the edit**, held to the same style-guide and placement review as any other docs PR change
5. **Ask whether a live staging preview is worth it** before merge — a real yes/no, not automatic
6. **Push a new branch and open the PR**, filled in from `.github/PULL_REQUEST_TEMPLATE.md`, under the SME's own name

## When to use this command

* An SME wants to submit a small, self-contained fix to an existing doc themselves, rather than filing a request and waiting on a tech writer
* There's no existing PR yet — if one already exists, use `/docs-pr-reviewer` instead

## When NOT to use this command

* **A change already has an open PR** — use `/docs-pr-reviewer`
* **New pages, restructuring, or anything spanning multiple files** — this is for small, self-contained edits to one existing page; bigger work should go through the normal [Documentation Support request](https://sumologic.atlassian.net/servicedesk/customer/portal/26) so a tech writer is involved from the start
* **The SME isn't sure this is a good idea** — when in doubt, file the request instead; this command doesn't second-guess that judgment call for them

---

## Guardrails (read before doing anything)

- **This has to be running as the SME's own GitHub identity, not a shared one.** Every push and PR below is attributed to whoever this session is authenticated as. If you're not sure whose account this session is connected to, ask before doing anything that writes to GitHub.
- **Never commit or push to `main`.** Always work on a new branch.
- **Assume zero git literacy.** Narrate what you're doing rather than showing raw command output as the primary communication.
- **Don't touch anything the SME didn't ask about.** One page, one change, unless they explicitly ask for more.
- **The Jira ticket requirement (Step 6) is currently paused** — pending a decision on whether it's actually needed for this flow. Don't ask for or offer to create a ticket until it's re-enabled; see Step 6's note for what to do instead.
- **The live staging preview is a single shared slot across the whole team (`docs-review`), not one per PR.** If the SME opts into it, warn them that pushing to it may overwrite whatever anyone else currently has staged there.

## Workflow

### Step 1: Confirm GitHub account access

This is a one-time, mostly manual identity step. Ask the user to confirm they've done this — most people who've been at Sumo Logic a while already have — and only walk them through it if they haven't:

1. Sign up at [github.com](https://github.com) if they don't have an account yet.
2. Sign in to Sumo Logic Okta, find **GitHub Enterprise Cloud**, and open it. This SSO's them into the [Sumo Logic GitHub org](https://github.com/SumoLogic) automatically. If it's not in their Okta app list, they need a Help Desk ticket.
3. Associate their Sumo Logic email address with their GitHub account.
4. Sign the [Sumo Logic Docs CLA](https://forms.gle/TKeF6cgNP2amHD9AA).
5. Ask the docs team to grant them Write access to the [Sumo Docs repo](https://github.com/SumoLogic/sumologic-documentation) and add their GitHub username to `.clabot`.
6. In Claude Code, go to **Connectors** and enable the **GitHub** connector. This is the step that actually lets Claude Code push and open PRs as them — without it, everything below will fail with a permission error even if steps 1–5 are done.

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

Start from a clean, current `main`:

```bash
git checkout main
git pull origin main
yarn install
```

`yarn install` is required every time, even in a pre-provisioned cloud container — the toolchain comes with the container, but this repo's own `node_modules` does not.

Confirm Playwright resolves for the screenshot in Step 4:

```bash
npx playwright --version 2>&1 || echo "playwright CLI not found — will fall back to installing it in Step 4"
```

### Step 3: Locate the page

The SME may give you a description ("the Help page"), a live URL (`https://www.sumologic.com/help/docs/get-started/help`), or a Jira ticket that already describes the request.

- **From a description**: search `docs/` for a matching title or filename:
  ```bash
  grep -ril "<keyword>" docs/ --include="*.md" --include="*.mdx"
  ```
  If more than one file plausibly matches, show the SME the candidates (title + path) and ask which one.
- **From a live URL**: strip the domain and `/help` prefix to get the route (e.g. `/docs/get-started/help`), then check whether any file's frontmatter `slug` matches that route exactly. Most pages don't set `slug`, so absent a match, the route usually maps directly to `docs/<same path>.md` or `.mdx`.
- **From a Jira ticket key** (e.g. `DOCS-1234`): fetch the ticket for its description and any **Existing Tech Docs Link** field, then resolve that link the same way as the live-URL case above.

If nothing matches confidently, don't guess — ask the SME to paste the exact page URL or file path.

### Step 4: Show the current page

Build and serve the site, then screenshot the page's route to confirm it with the SME before changing anything:

```bash
yarn build
npx serve build -l 5000 &
```

```bash
npx playwright screenshot --viewport-size=1280,900 --wait-for-timeout=1500 http://localhost:5000/<route> <output-path>.png
```

Use Playwright's CLI here, not a `require('playwright')` script — the `playwright` npm package isn't a dependency of this repo, so requiring it fails with `MODULE_NOT_FOUND` even though the CLI itself resolves fine. If the version check in Step 2 failed, install the browser once first:

```bash
npx playwright install chromium
```

Share the screenshot and confirm: "Is this the page you meant?"

### Step 5: Apply the edit

1. Ask what needs to change, in plain terms, if it isn't already fully clear from how the command was invoked.
2. Open the file and make the edit directly.
3. Before treating it as finished, hold it to the same bar any other docs PR change gets: check it against the Sumo Logic style guide (the `sumo-style` skill covers voice, terminology, formatting) and confirm placement is still correct (frontmatter, sidebar entry) if the edit touches either.
4. Re-run Step 4's screenshot for the changed page and show the SME what actually changed, not just "done."
5. Ask if this needs another round, or if it's ready to submit. Repeat as needed.

### Step 6: Get a Jira ticket — PAUSED, pending a decision on whether it's actually required

<!--
Disabled 2026-08-21: smoke-testing this command surfaced that Jira/Atlassian
isn't reachable from every Claude Code account (e.g. a personal account can't
connect the org's Atlassian connector), and CLAUDE.md's own rule reads as
ticket creation being optional for quick fixes, not the ticket itself being
mandatory ("Ask for ticket number - Always ask for a Jira ticket before
creating a PR. If the user doesn't have one, offer to create it using the
Atlassian Jira MCP (optional for quick typo fixes)."). Kim is checking with
her manager on whether a ticket should actually be required here before this
gets re-enabled. Original step, for reference:

Per this repo's PR rules, every PR needs a ticket number before it's created.

- If the SME already has one (e.g. from a Documentation Support request), use it.
- If not, offer to create one on the spot — this is explicitly fine for a quick typo/small fix per CLAUDE.md. Use the jira skill's ticket-creation pattern: sentence-case title, action verb, under 10 words; benefit-driven description under 150 words; set Technical Area from the file path/content; populate Existing Tech Docs Link with the page's production URL, since this touches an existing article.

Hold onto the ticket key (DOCS-xxxx) — it's needed for both the branch name and the PR title.
-->

**While this is paused**: skip straight to Step 7. Don't ask the SME for a ticket, don't offer to create one. Use a short, descriptive branch name (e.g. `edit-doc-help-clarify-wording`) instead of a ticket key, and a plain descriptive PR title instead of `TICKET - Description`.

### Step 7: Ask about a live staging preview

Ask directly: does this need a second set of eyes on a real, clickable preview before merging, or is it obvious enough to just submit?

- **No** → use the descriptive branch name from Step 6's paused note above (or `review/<same-descriptive-name>` for the yes case below)
- **Yes** → prefix that branch name with `review/`, which automatically triggers `.github/workflows/workflow_deploy-to-pantheon-review.yml` on push. Remind them this shares one staging slot (`docs-review`) across the whole team, and can overwrite someone else's active review.

<!-- Once Step 6 is re-enabled, restore the DOCS-xxxx / review/DOCS-xxxx branch-naming logic here. -->

### Step 8: Commit and push

```bash
git checkout -b <branch-name>
git status --porcelain
```

Confirm there's something to commit, then show the SME a diff summary and get an explicit yes before committing or pushing:

```bash
git diff --stat
```

```bash
git add -A
git commit -m "<short summary of what changed and why>"
git push -u origin <branch-name>
```

### Step 9: Open the PR

Read `.github/PULL_REQUEST_TEMPLATE.md` fresh — don't reuse a remembered version, its checkbox labels can change. Fill it in and create the PR:

```
mcp__github__create_pull_request (owner: "SumoLogic", repo: "sumologic-documentation", title: "<short description>", head: "<branch-name>", base: "main", body: "<template filled in>")
```

<!-- While Step 6 is paused: title format: "TICKET - Description" per this repo's PR rules. -->
- Title format: a plain, short description — no ticket prefix while Step 6 is paused.
- Body: copy the template's exact checkbox labels, pre-check the one that applies (almost always "Minor Changes" for this kind of edit), leave all four listed. Note in the "Ticket (if applicable)" section that none was filed.

`create_pull_request` has no `assignees` parameter, and neither does `update_pull_request` — assign the PR with a separate call instead. Get the SME's actual username first (don't assume it), then assign:

```
mcp__github__get_me ()
mcp__github__issue_write (method: "update", owner: "SumoLogic", repo: "sumologic-documentation", issue_number: <PR-number>, assignees: ["<login-from-get_me>"])
```

If the Jira MCP is available and Step 6 produced a ticket, update its **GitHub Pull Request** field with the new PR URL. If it isn't authorized in this session, tell the SME to paste the link in themselves — don't block on it.

### Step 10: Wrap up

Hand the SME the PR link. If they chose the staging preview in Step 7, remind them it's ready in the usual ~15-20 minutes at the team's existing staging URL. Either way, remind them this still goes through the normal peer review and merge process — this command only got the change submitted, not merged.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Everything fails with a permission error, even though steps 1–5 look done | The GitHub connector isn't actually enabled for this session | Check Claude Code → Connectors → GitHub is on, and connected to the SME's own account |
| Can't find the file for a described page | Search terms too generic, or the page title differs from the URL slug | Ask the SME for the exact page URL instead of a description |
| `yarn build` fails | A real content/config error introduced by the edit | Read the actual build error — don't assume it's environmental, the container is pre-provisioned |
| Playwright screenshot fails with a missing browser error | Chromium wasn't preinstalled in this particular environment | `npx playwright install chromium`, then retry |
| `require('playwright')` fails with `MODULE_NOT_FOUND` | The `playwright` npm package isn't a repo dependency, even though the CLI resolves | Use `npx playwright screenshot`, not a script that requires the module |
| PR creation fails or looks wrong | Template checkbox labels were guessed instead of read fresh | Re-read `.github/PULL_REQUEST_TEMPLATE.md` before creating the PR, every time |
| SME expects a live clickable preview from Step 4 | Step 4 is a static screenshot only, for confirmation | The real live preview is the opt-in staging deploy from Step 7, not Step 4 |
