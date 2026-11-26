---
id: mobot-in-mcp-server
title: Use Mobot in the Sumo Logic MCP Server
sidebar_label: Mobot in the MCP Server
description: Run Mobot investigations from Claude Code, GitHub Copilot, and other MCP clients through the Sumo Logic MCP server, with the same functionality as the UI.
keywords:
  - mobot
  - mcp server
  - dojoai
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/mobot.png')} alt="Mobot icon" width="35"/>

[Mobot](/docs/search/mobot), Sumo Logic's conversational AI assistant, is available as a tool in the [Sumo Logic MCP server](/docs/api/mcp-server). MCP-compatible clients such as Claude Code and GitHub Copilot can start, monitor, and cancel Mobot investigations across your logs, metrics, and telemetry, so you do not need to leave your integrated development environment (IDE) or terminal. Mobot's findings become part of the same session where you read source code, file Jira tickets, or check Slack threads.

Mobot in the MCP server uses the same engine, toolset, and functionality as Mobot in the Sumo Logic UI.

## Prerequisites

- The Sumo Logic MCP server connected to your MCP client. See [Sumo Logic MCP Server](/docs/api/mcp-server).
- MCP Server access turned on for your org. It is on by default. See [How to enable or disable the MCP server](/docs/api/mcp-server#how-to-enable-or-disable-the-mcp-server).
- **AI features** turned on for your org. The Mobot tools use the same **AI features** setting as Mobot in the UI.

## Set up Mobot with the Sumo Logic plugin

The Sumo Logic plugin bundles the sumo-investigator skill with the MCP server connection. With the Mobot skill updates, queries route to Mobot automatically, and conversations stay connected more reliably across multiple turns.

For the clients that have a plugin, and how each one is set up, see [Choose a setup path](/docs/api/mcp-server/mcp-server-client-setup#choose-a-setup-path).

:::note
The GitHub Copilot plugin and the Claude plugin include Mobot support. The AWS DevOps Agent update is in progress. Until it is available, connect AWS DevOps Agent to the MCP server without the plugin and include "use Mobot" in your query, for example, "Use Mobot to investigate why errors are spiking." For setup steps, see [Set Up MCP Clients for Sumo Logic](/docs/api/mcp-server/mcp-server-client-setup).
:::

Plugins for Cursor and Codex are coming soon.

## Mobot tools in the MCP server

The MCP server adds these tools for Mobot:

| Tool | Description |
| :--- | :---------- |
| `mobot_invoke` | Starts a Mobot investigation. You provide a natural-language query and, optionally, an existing `conversation_id` to continue a previous session. The call returns right away with an investigation ID while Mobot runs in the background. |
| `mobot_poll` | Checks the status of an investigation. The client calls this tool repeatedly with the investigation ID until it receives the completed result. |
| `mobot_cancel` | Cancels an investigation in progress, for example when you no longer need the result. Cancelling stops further work but does not refund the prompt. |
| `submit_hitl_feedback` | Submits your approval or rejection for a paused step. See [Approve Mobot steps from your MCP client](#approve-mobot-steps-from-your-mcp-client). |

You do not call these tools yourself. Your MCP client calls them for you.

The Mobot tools do not require a specific role capability to appear. What Mobot can do when you use them is still limited by your role-based access control (RBAC) capabilities, the scopes of the OAuth client in use, and the scopes requested during the OAuth flow.

## How MCP clients route queries to Mobot

The MCP server exposes both Mobot (`mobot_invoke`) and direct log search (`runLogSearch`) as tools. Your MCP client decides which one to call based on your query.

- **Investigative queries go to Mobot**. Phrases such as "investigate", "why are errors spiking", "analyze", "use Mobot", or "what's causing" route to `mobot_invoke`.
- **Direct search queries go to log search**. Phrases such as "run a log search" or "query logs for X" route to `runLogSearch`.
- **You confirm before Mobot runs**. Before an investigation starts, the client asks you to confirm, which prevents unintended use of your daily Mobot limit. If you set the Mobot tools to **Always allow** in your client, they run without asking.

With the plugin installed, you can send any query to Mobot directly with the slash command:

```text
/sumologic-mcp:mobot <query>
```

For example:

```text
/sumologic-mcp:mobot Why are errors spiking in the checkout service?
```

## Benefits of Mobot in the MCP server

- **Multi-turn conversations with persistent context**. Mobot keeps session context for the full length of a conversation, including field names, schema context, the investigation approach set earlier in the session, and hypotheses already explored. You can run extended investigations across many turns without re-priming Mobot.
- **Cross-tool orchestration**. Because Mobot runs inside your MCP client session, its findings are available as input to the other tools connected in that session, such as Jira, Slack, Confluence, code search, and cost analysis tools. You can go from a Mobot result to filing a Jira ticket or searching a codebase without switching context.
- **Finds your data for you**. Say "checkout service" and Mobot works out which logs you mean. You do not need to know the exact source names.
- **Learns how your team works**. Mobot picks up the searches and sources your team already uses, so results fit your setup.
- **Draws on your own knowledge**. Mobot looks through your runbooks and docs and remembers past findings, so answers reflect your environment.
- **Built for Sumo Logic**. Mobot writes correct Sumo Logic searches and uses purpose-built tools for logs, metrics, alerts, dashboards, and security.
- **Investigates end to end**. Ask an open-ended question such as "Why is checkout slow?" and Mobot works through logs, metrics, and alerts to find the cause.
- **Keeps you in control**. Your data stays in Sumo Logic, sensitive data is protected, and Mobot asks for your approval before important actions.

## Approve Mobot steps from your MCP client

When a step needs your sign-off, Mobot pauses and waits. Review the pending action in your MCP client, and then approve or reject it. The client sends your decision with the `submit_hitl_feedback` tool, and Mobot either continues or stops. You stay in control of complex, multi-step investigations without monitoring every query.

For example, Mobot can pause before it creates or updates a monitor or dashboard, or before it takes an action in an external integration such as creating a Jira ticket.

## Resume MCP conversations in the Sumo Logic UI

Conversations you start through the MCP server appear in the **My Conversations** panel in Sumo Logic, next to conversations you started in the UI. To review or resume one, open Mobot and select it from the panel. See [Managing conversations](/docs/search/mobot/#managing-conversations).

## Mobot usage limits in the MCP server

Mobot in the MCP server shares the daily Mobot prompt limit with the Sumo Logic UI and any other place you use Mobot. There is no separate MCP limit. For credit-based customers, Mobot usage through the MCP server also counts toward overall credit usage. When you reach the limit, your MCP client shows an error message. See [Is there a limit to how many prompts I can send?](/docs/search/mobot/#is-there-a-limit-to-how-many-prompts-i-can-send) for the current limit and when it resets.

Mobot calls are also subject to the [MCP server rate limits](/docs/api/mcp-server#what-are-the-mcp-server-rate-limits) that apply to all MCP tools. Clients poll about once a minute, so polling is unlikely to approach those limits.

## Audit Mobot activity from the MCP server

Mobot prompts and investigations started through the MCP server are recorded in Sumo Logic audit logs, the same way as Mobot interactions from the UI. The `operator.interface` field shows where the activity started, `MCP` for the MCP server. For example, to find Mobot activity started from the MCP server:

```sumo
_index=sumologic_audit_events
| where invocationdetails.agentname in ("mobot")
| json field=_raw "operator.interface" as iface
| where iface = "MCP"
```

For the prerequisites and other audit queries, see [Audit Mobot queries](/docs/search/mobot/#audit-mobot-queries).

## FAQ

### Do I need the plugin to use Mobot in the MCP server?

No. Without the plugin, you can still connect to the MCP server and include explicit phrasing, such as "use Mobot to investigate", so your client routes the query to Mobot. The `/sumologic-mcp:mobot` slash command requires a plugin with Mobot support. See [Set up Mobot with the Sumo Logic plugin](#set-up-mobot-with-the-sumo-logic-plugin).

### How is Mobot different from the runLogSearch tool?

`runLogSearch` runs a log search query you describe and returns the results. Mobot runs a broader investigation across your data and keeps the context of the conversation. Your client chooses between them based on how you phrase the query. See [How MCP clients route queries to Mobot](#how-mcp-clients-route-queries-to-mobot).

### Can I continue an MCP conversation in the Sumo Logic UI?

Yes. Conversations started through the MCP server appear in your Mobot conversation history in the UI, where you can continue them.

### Are Mobot investigations from MCP audited?

Yes. They are recorded in Sumo Logic audit logs the same way as Mobot interactions from the UI. See [Audit Mobot activity from the MCP server](#audit-mobot-activity-from-the-mcp-server).

## Additional resources

- [Sumo Logic MCP Server](/docs/api/mcp-server)
- [Set Up MCP Clients for Sumo Logic](/docs/api/mcp-server/mcp-server-client-setup)
- [Sumo Logic Mobot](/docs/search/mobot)
- [Mobot Example Prompts](/docs/search/mobot/example-prompts)
- [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning)
