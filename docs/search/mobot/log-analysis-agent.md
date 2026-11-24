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

The Log Analysis Agent is one of DojoAI's specialized agents. It spots emerging issues in log patterns and recommends monitors for them, so coverage gaps close before the next incident occurs to improve reliability.

You reach the agent through DojoAI. You do not see it as a separate item. It surfaces through the Recommendations page and DojoAI Studio.

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

For monitor recommendations, the agent looks at log patterns across the tenant's log data. It identifies coverage gaps and makes recommendations to create the missing monitor which detects anomalies proactively. It then checks whether an equivalent or substantially similar monitor already exists. If one does, it makes no recommendation.


### Work with a recommendation

Recommendations appear on the **Recommendations** page, where you review them. To open it, go to **DojoAI** > **Recommendations** in the left navigation. The agent refreshes recommendations daily.

For a monitor recommendation, you can click an item on **Recommendations** to open the preview drawer, which shows a plain-language summary, estimated outcome and the recommended actions. Then:

* **Apply**. Commits the fix in one click.
* **Change at source**. Review recommendation and customize it at the product page directly.
* **Contact owner**. Notifies the asset maintainer if the user lacks edit permission.
**Reject**. dismisses it with a reason tag. Rejections apply to everyone in the organization.
## Limitations

* **Logs only**. The agent does not cover metrics, traces, or other telemetry types.
* **Read-only analysis**. The agent can query and analyze data but cannot modify, delete, or ingest data, and it has no access to external systems.
* **Retained data only**. The agent works only with ingested data that is still within your retention window. 

## Additional resources

* [Mobot](/docs/search/mobot/). The conversational interface for Sumo Logic's AI agents.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). How the Log Analysis Agent fits alongside DojoAI's other agents.
