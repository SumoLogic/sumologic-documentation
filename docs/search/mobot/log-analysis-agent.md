---
id: log-analysis-agent
title: Log Analysis Agent
sidebar_label: Log Analysis Agent ✨
description: See how the Log Analysis Agent guides log analysis through Mobot and recommends monitors and ingest savings from repeated searches and duplicate or debug logs.
keywords:
  - log analysis agent
  - query agent
  - recommendations
  - mobot
  - dojoai
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<p><a href={useBaseUrl('docs/preview')}><span className="preview-public">Public Preview</span></a></p>

:::info
Agent recommendations are in Public Preview. To participate, contact your Sumo Logic account representative.
:::

The Log Analysis Agent is one of DojoAI's specialized agents. It guides log analysis from plain-language questions, so you do not need deep knowledge of your data schema or the Sumo Logic query language. In the background, it recommends monitors for searches your team keeps repeating and flags duplicate and debug logs that add to your ingest volume.

You reach the agent through [Mobot](/docs/search/mobot/), which routes your prompt to it automatically. You do not see the agent's name in the UI. It was formerly the Query Agent, and query writing is one of its skills, alongside conversational content and recommendations.

## Analyze logs with Mobot

Ask Mobot a question in plain language, such as `Show me services with the highest error rates in the last hour`. The agent interprets your intent, finds the right data, runs a multi-step analysis, and returns findings with suggested next steps. See [Mobot](/docs/search/mobot/) to work with results and [Mobot Example Prompts](/docs/search/mobot/example-prompts) for more prompts.

To create a monitor from a conversation, see [Create a Monitor with Mobot](/docs/alerts/monitors/create-monitor-with-mobot).

:::note
Do not confuse the Log Analysis Agent with [search autocomplete](/docs/search/get-started-with-search/search-basics/search-autocomplete) or [AI Parse Assist](/docs/search/search-query-language/parse-operators/parse-predictable-patterns-using-an-anchor#ai-parse-assist). Those are UI features you use directly on the Search page, not through a conversation.
:::

## Recommendations

Instead of waiting for a question, the agent analyzes how your team searches and what you ingest, then suggests an action. You review each recommendation and decide what to do. Nothing changes automatically.

| Category | Recommendation | What the agent does |
|:--|:--|:--|
| Reliability | **Create monitor** | Spots emerging issues in your logs and recommends what to monitor, so coverage gaps close before the next incident. |
| Cost efficiency | **Remove duplicate logs** | Detects identical log streams that are ingested more than once. |
| Cost efficiency | **Reduce debug log ingestion** | Flags debug logs that run continuously in production, so you can trim unneeded log volume. |

For monitor recommendations, the agent looks at how often a query runs, how many unique users run it, how recently, and incident context. It makes no recommendation if an equivalent or similar monitor already exists. It favors precise suggestions over volume, so some repeated searches do not produce one.

Each monitor recommendation shows:

* **Observation**. What the agent noticed, for example a query that 11 users ran 186 times across four services.
* **Reasoning and confidence**. Why a monitor is worthwhile and how confident the agent is.
* **Suggested monitor**. A name, the query, and an alert threshold.

### Work with a recommendation

Recommendations appear on the **Recommendations** page, where you review them. To open it, go to **DojoAI** > **Recommendations** in the left navigation. The agent refreshes recommendations daily.

For a monitor recommendation, you can:

* **Create monitor**. Opens the monitor creation window with the query and suggested threshold filled in, so you can save the monitor or customize it first.
* **Change at source**. Review recommendation and customize it at the product page directly.
* **Dismiss**. Removes the recommendation from the active list.
**Reject**. dismisses it with a reason tag. Rejections apply to everyone in the organization.
## Limitations

* **Logs only**. The agent does not cover metrics, traces, or other telemetry types.
* **Read-only analysis**. The agent can query and analyze data but cannot modify, delete, or ingest data, and it has no access to external systems.
* **Retained data only**. The agent works only with ingested data that is still within your retention window. 

## Additional resources

* [Mobot](/docs/search/mobot/). The conversational interface for Sumo Logic's AI agents.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). How the Log Analysis Agent fits alongside DojoAI's other agents.
