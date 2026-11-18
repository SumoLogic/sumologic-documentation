---
id: mobot-in-mcp-server
title: Mobot in the MCP Server
sidebar_label: Mobot in the MCP Server
description: Run Mobot investigations from Claude Code, GitHub Copilot, and other MCP clients through the Sumo Logic MCP server, with the same functionality as the UI.
keywords:
  - mobot
  - mcp server
  - dojoai
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/mobot.png')} alt="Mobot icon" width="35"/>

[Mobot](/docs/search/mobot), Sumo Logic's conversational AI assistant, is available as a tool in the [Sumo Logic MCP server](/docs/api/mcp-server). MCP-compatible clients such as Claude Code, GitHub Copilot, and Cursor can start, monitor, and cancel Mobot investigations across your logs, metrics, and telemetry, so you do not need to leave your IDE or terminal. Mobot's findings become part of the same session where you read source code, file Jira tickets, or check Slack threads.

Mobot in the MCP server:

- Uses the same engine, toolset, and functionality as Mobot in the Sumo Logic UI. Nothing is withheld or reduced.
- Works best with the Sumo Logic plugin for your client, which adds automatic routing and more reliable multi-turn conversations.
- Counts prompts toward the same daily Mobot limit as the UI.

## Prerequisites

- The Sumo Logic MCP server connected to your MCP client. See [Sumo Logic MCP Server](/docs/api/mcp-server).
- MCP Server access turned on for your org. It is on by default. See [How to enable or disable the MCP server](/docs/api/mcp-server#how-to-enable-or-disable-the-mcp-server).

## Set up Mobot with the Sumo Logic plugin

The Sumo Logic plugin is the recommended way to set up Mobot in the MCP server. It bundles the sumo-investigator skill with the MCP server connection. The skill adds routing logic and session guidance directly to your MCP client's context.

With the plugin installed:

- Queries route to Mobot automatically, so you do not need to include "use Mobot" in every query.
- Conversations stay connected more reliably across multiple turns.
- Session and context management is cleaner than with a raw MCP setup.

Plugins are available for these clients:

- Claude Code
- GitHub Copilot
- Claude, through the Claude Connectors Directory
- AWS DevOps Agent

Plugins for Cursor and Codex are coming soon.

For a client without a plugin, [download and install the sumo-investigator skill](/docs/api/mcp-server#improve-investigations-with-the-sumo-investigator-skill) manually, and then connect to the MCP server with a raw MCP configuration. See [Sumo Logic MCP Server](/docs/api/mcp-server) for setup steps.

## Mobot tools in the MCP server

The MCP server adds these tools for Mobot:

| Tool | Description |
| :--- | :---------- |
| `mobot_invoke` | Starts a Mobot investigation. You provide a natural-language query and, optionally, an existing `conversation_id` to continue a previous session. The call returns right away with an investigation ID while Mobot runs in the background. |
| `mobot_poll` | Checks the status of an investigation. The client calls this tool repeatedly with the investigation ID until it receives the completed result. |
| `mobot_cancel` | Cancels an investigation in progress, for example when you no longer need the result. Cancelling stops further work but does not refund the prompt. |
| `submit_hitl_feedback` | Submits your approval or rejection for a paused step. See [Approve Mobot steps from your MCP client](#approve-mobot-steps-from-your-mcp-client). |

You do not call these tools yourself. Your MCP client calls them for you.

## How MCP clients route queries to Mobot

The MCP server exposes both Mobot (`mobot_invoke`) and direct log search (`runLogSearch`) as tools. Your MCP client decides which one to call based on your query.

- **Investigative queries go to Mobot**. Phrases such as "investigate", "why are errors spiking", "analyze", "use Mobot", or "what's causing" route to `mobot_invoke`.
- **Direct search queries go to log search**. Phrases such as "run a log search" or "query logs for X" route to `runLogSearch`.
- **You confirm before Mobot runs**. Before an investigation starts, the client asks you to confirm, which prevents unintended use of your daily Mobot limit.

With the plugin installed, you can send any query to Mobot directly with the slash command:

```
/sumologic-mcp:mobot <query>
```

For example:

```
/sumologic-mcp:mobot Why are errors spiking in the checkout service?
```

<!--TODO: Add a screenshot of the client's confirmation prompt shown before a Mobot investigation runs, and of the investigation result returned in the client.
<img src={useBaseUrl('img/api/mcp/mobot-in-mcp-confirmation.png')} alt="MCP client asking for confirmation before running a Mobot investigation" style={{border: '1px solid gray'}} width="800" />
<img src={useBaseUrl('img/api/mcp/mobot-in-mcp-result.png')} alt="Mobot investigation result returned in an MCP client" style={{border: '1px solid gray'}} width="800" />
-->

Routing is more accurate when the [Sumo Logic plugin](#set-up-mobot-with-the-sumo-logic-plugin) is installed. Without it, you may need to include explicit investigative phrasing, such as "use Mobot to investigate", for consistent routing.

## Benefits of Mobot in the MCP server

- **Multi-turn conversations with persistent context**. Mobot keeps session context for the full length of a conversation, including field names, schema context, the investigation approach set earlier in the session, and hypotheses already explored. You can run extended investigations across many turns without re-priming Mobot.
- **Cross-tool orchestration**. Because Mobot runs inside your MCP client session, its findings are available as input to the other tools connected in that session, such as Jira, Slack, Confluence, code search, and cost analysis tools. You can go from a Mobot result to filing a Jira ticket or searching a codebase without switching context.

### Approve Mobot steps from your MCP client

When a step needs your sign-off, Mobot pauses and waits. Review the pending action in your MCP client, and then approve or reject it. The client sends your decision with the `submit_hitl_feedback` tool, and Mobot either continues or stops. You stay in control of complex, multi-step investigations without monitoring every query.

For example, Mobot can pause before it creates or updates a monitor or dashboard, or before it takes an action in an external integration such as creating a Jira ticket.

<!--TODO: Add a screenshot of a Mobot human-in-the-loop approval request in an MCP client. <img src={useBaseUrl('img/api/mcp/mobot-in-mcp-hitl-approval.png')} alt="MCP client showing a Mobot step paused for approval or rejection" style={{border: '1px solid gray'}} width="800" />
-->

### Resume MCP conversations in the Sumo Logic UI

Conversations you start through the MCP server appear in the **My Conversations** panel in Sumo Logic, next to conversations you started in the UI. To review or resume one, open Mobot and select it from the panel. See [Managing conversations](/docs/search/mobot/#managing-conversations).

<!--TODO: Add a screenshot of the My Conversations panel showing a conversation that was started from an MCP client. <img src={useBaseUrl('img/api/mcp/mobot-in-mcp-conversation-history.png')} alt="Mobot My Conversations panel showing a conversation started from an MCP client" style={{border: '1px solid gray'}} width="800" />
-->

## Mobot usage limits in the MCP server

Mobot in the MCP server uses the same limits as Mobot in the Sumo Logic UI. There is no separate MCP limit. Your daily Mobot allowance is shared across the UI, the MCP server, and any other place you use Mobot. When you reach the limit, your MCP client shows an error message. See [Is there a limit to how many prompts I can send?](/docs/search/mobot/#is-there-a-limit-to-how-many-prompts-i-can-send) for the current limit and when it resets.

Mobot calls are also subject to the [MCP server rate limits](/docs/api/mcp-server#what-are-the-mcp-server-rate-limits) that apply to all MCP tools. Clients poll about once a minute, so polling is unlikely to approach those limits.

## Audit Mobot activity from the MCP server

Mobot prompts and investigations started through the MCP server are recorded in Sumo Logic audit logs, the same way as Mobot interactions from the UI. Organizations that need an audit trail of AI-initiated queries and investigations have full coverage of MCP-originated activity. To query these events, see [Audit Mobot queries](/docs/search/mobot/#audit-mobot-queries).

## FAQ

### Is Mobot in the MCP server the same as Mobot in the Sumo Logic UI?

Yes. It uses the same engine, toolset, and functionality. The MCP server is a different way to reach Mobot, and nothing is withheld or reduced.

### Do I need the Sumo Logic plugin to use Mobot in the MCP server?

No, but it is recommended, and the `/sumologic-mcp:mobot` slash command requires it. Without the plugin, you can still connect to the MCP server and install the sumo-investigator skill manually. You may need to include explicit phrasing, such as "use Mobot to investigate", so your client routes the query to Mobot. See [Set up Mobot with the Sumo Logic plugin](#set-up-mobot-with-the-sumo-logic-plugin).

### How is Mobot different from the runLogSearch tool?

`runLogSearch` runs a log search query you describe and returns the results. Mobot runs a broader investigation across your data and keeps the context of the conversation. Your client chooses between them based on how you phrase the query. See [How MCP clients route queries to Mobot](#how-mcp-clients-route-queries-to-mobot).

### Does Mobot in the MCP server have its own prompt limit?

No. Mobot prompts from MCP count toward the same daily limit as Mobot in the UI. See [Mobot usage limits in the MCP server](#mobot-usage-limits-in-the-mcp-server).

### Can I continue an MCP conversation in the Sumo Logic UI?

Yes. Conversations started through the MCP server appear in your Mobot conversation history in the UI, where you can continue them.

### Are Mobot investigations from MCP audited?

Yes. They are recorded in Sumo Logic audit logs the same way as Mobot interactions from the UI. See [Audit Mobot activity from the MCP server](#audit-mobot-activity-from-the-mcp-server).

## Additional resources

- [Sumo Logic MCP Server](/docs/api/mcp-server)
- [Sumo Logic Mobot](/docs/search/mobot)
- [Mobot Example Prompts](/docs/search/mobot/example-prompts)
- [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning)
