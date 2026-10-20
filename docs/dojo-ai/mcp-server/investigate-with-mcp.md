---
id: investigate-with-mcp
title: Investigate with MCP
sidebar_label: Investigate with MCP ✨
description: Use the sumo-investigator skill and example multi-step prompts to investigate alerts, insights, and logs through the MCP server.
keywords:
  - mcp server
  - sumo-investigator
  - investigation
  - skill
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Once your AI client is [connected to the Sumo Logic MCP server](/docs/ai/mcp-server/connect-mcp-client), you can investigate alerts, insights, and logs by asking questions in plain language. This page shows how to get more consistent results with the sumo-investigator skill, and gives example multi-step prompts for common investigation tasks, such as triage, threat hunting, and incident response. For the tools your client can call, see the [MCP tools reference](/docs/ai/mcp-server/mcp-tools-reference).

## Improve investigations with the sumo-investigator skill

A skill gives an AI agent standing instructions and workflow context that persist across every conversation, so you do not need to repeat detailed prompting each time you ask a question. For Claude Code, a skill is a folder containing a `SKILL.md` file that documents how to approach a class of tasks, in this case, investigating Sumo Logic data through the MCP server's tools.

Claude Code can invoke a skill in two ways:
* **Automatically**. Claude matches your question against the `description` and `when_to_use` context defined in the skill's frontmatter and invokes the skill without you needing to reference it directly.
* **Explicitly**. Type a slash command that matches the skill's folder name, for example, `/sumo-investigator`.

The skill linked below is a starting point based on Sumo Logic's internal testing of MCP tool workflows. It defines the agent's tool-use workflow (discover → sample → target) for log searches, plus guidance for triaging alerts, insights, and detection rules. Treat it as a foundation you can customize for your environment, or use as a model for additional skills of your own.

:::note
As the Sumo Logic MCP server evolves, for example, as tools are added, removed, or renamed, you may need to update this skill to match.
:::

1. Download <a href={useBaseUrl('files/sumo-investigator/SKILL.md')} download="SKILL.md" target="_blank">SKILL.md</a>.
1. In Claude Code, create a `sumo-investigator` folder in your skills directory: `.claude/skills/` for a project-specific skill available only in the current directory, or `~/.claude/skills/` to make it available across all projects. Move the downloaded file into that folder. The result should be a `SKILL.md` file at `.claude/skills/sumo-investigator/SKILL.md` (or the equivalent path under `~/.claude/skills/`).
1. If this is the first skill you've added, restart Claude Code so it picks up the new skills directory. Otherwise, run `/mcp` to confirm the Sumo Logic MCP server is still connected.
1. Invoke the skill automatically by asking an investigation question, or explicitly with `/sumo-investigator`.

For more information about configuring, managing, and distributing skills, see [Extend Claude with skills](https://code.claude.com/docs/en/skills) in the Claude Code documentation.

## Example workflows

These prompts demonstrate multi-step investigations that chain multiple tools together in a single session.

### Triage and investigation

* `Show me all critical insights from the last 7 days that are still open, then tell me which involved entities appear most frequently.`

* `Get insight <id>, show me its signals and involved entities, then run a log search for that IP address in the last 24 hours to find raw events.`

* `Find all insights assigned to <username> that are in-progress, and list any created more than 3 days ago.`

### Threat hunting

* `Search logs for any outbound connections to port 4444 in the last 48 hours, extract the source hostnames, then check if any of those hostnames appear as entities in open insights.`

* `Find all insights tagged 'ransomware' or 'lateral-movement' from the past 30 days, get the signals for each, and run a log search aggregating activity by user account involved.`

* `Look up all insights where entity type is 'username' and the value contains 'svc-' (service accounts), then search logs for those accounts' authentication events in the last week.`

### Incident response

* `Get insight <id>, pull its full signal list and all involved entities, then search raw logs for each entity in the last 6 hours.`

* `Find all insights that were closed as 'False Positive' in the last 30 days, group them by rule ID, and search logs to see if those same patterns are still occurring today.`

* `Get insight <id> and search logs for the 30-minute window around when it was first created.`

### Escalation and assignment

* `Find all unassigned high-severity insights and assign them to <username>.`

* `Find all insights that have been sitting in 'in progress' status for more than 7 days, list them with assignee names, and reassign any unowned ones to <team>.`

### Situational awareness

* `List all triggered critical alerts right now, then search logs for the top affected source IP to see what it's been doing.`

* `Summarize all insights created in the last 24 hours: how many per severity, which entities are involved, and who they're assigned to.`

* `Show me all triggered critical alerts from the last hour, and check if their source entities also appear in open insights.`

### Entity-centric investigation

* `Given IP address <x.x.x.x>, find all insights where it appears as an entity, then search logs for its full activity in the last 24 hours.`

* `Find the most active entity by insight count in the last 14 days, get all its insights with full signal details, then build a timeline dashboard of its activity.`

* `Look up insights for hostname <server-name>, then search logs for any privilege escalation events on that host in the same timeframe.`

### Alert and monitor deep dives

* `Find all alerts from monitor <name>, then search logs during the last trigger window to determine if it's noisy or legitimate.`

* `Find all muted monitors with active Critical alerts, then search logs to see if the underlying condition has actually resolved.`

### Cross-tool correlation

* `Find all alerts that fired in the last hour, check if any of them are related to existing open insights, and for those that aren't, search logs to determine if a new insight should be escalated manually.`

* `Compare insight volume week-over-week: pull insights from the last 7 days vs the 7 days before that, broken down by severity, and identify any rules that are newly firing this week.`

* `Get all Critical and High insights from today, and for any with no assignee, assign them to <team>.`

### Team operations and reporting

* `Find all open insights assigned to the security team and show the oldest unresolved one.`

* `Generate a weekly report: count insights by severity and status, show the top 5 most triggered monitors from alerts, and list the 3 most common entity types involved in new insights.`

### Dashboard and data

* `Search for the top 10 source IPs generating authentication errors in the last hour, then create a dashboard panel showing those results.`

* `Get the current SIEM overview dashboard, add a new panel for open Critical insights count, and save it.`

### Detection rule management

* `List all enabled threshold rules and show me which ones have the highest signal counts in the last 7 days.`

* `Find all rules in the 'lateral-movement' category and check if any are disabled.`

* `Create a new match rule that detects SSH brute force attempts by looking for more than 5 failed SSH authentication events from the same source IP within 10 minutes.`

* `Get all rules tagged 'ransomware' and flag any that haven't fired in 30 days.`

* `Find all custom rules (ruleSource = 'custom'), get their details including tuning expressions, and create a summary report of which ones are actively generating insights.`
