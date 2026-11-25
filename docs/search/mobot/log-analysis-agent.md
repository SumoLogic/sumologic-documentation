---
id: log-analysis-agent
title: Log Analysis Agent
sidebar_label: Log Analysis Agent ✨
description: Log Analysis Agent is the DojoAI agent that helps teams identify gaps in log monitoring so they can detect recurring issues sooner. It recommends monitors that you can review, customize, and create.
keywords:
  - log analysis agent
  - query agent
  - recommendations
  - mobot
  - dojoai
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
Log Analysis Agent is in Private Preview. To participate, contact your Sumo Logic account representative.
:::

The Log Analysis Agent is one of DojoAI's specialized agents. It spots emerging issues in log patterns and recommends monitors for them, so coverage gaps are closed to improve reliability.

You reach the agent through DojoAI. You do not see it as a separate item. It surfaces through the Recommendations page and DojoAI Studio.


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

Recommendations appear on the **Recommendations** page, where you review them. To open it, go to **DojoAI** > **Recommendations** in the left navigation. The agent refreshes recommendations daily. For more about filtering, rejecting, and applying recommendations, see the [Recommendations page](/docs/search/mobot/dojoai-recommendations-preview) doc.

<img src={useBaseUrl('img/search/mobot/log-analysis-agent-recommendations.png')} alt="Recommendations page listing monitor recommendations with Category, Impact, Status, and Generated columns" style={{border: '1px solid gray'}} width="800" />

Monitor recommendations start with **Create a monitor for** and have the **Reliability** category. Each row shows the recommendation, its category, impact, status, and when it was generated.

To review a monitor recommendation, click it on the **Recommendations** page to open the preview drawer.

<img src={useBaseUrl('img/search/mobot/log-analysis-agent-monitor-recommendation.png')} alt="Preview drawer for a monitor recommendation showing the expected outcome, recommended actions, and the recommended monitor name, query, and threshold" style={{border: '1px solid gray'}} width="800" />

The drawer shows:

* **Expected Outcome**. What the monitor helps you detect.
* **Recommended Actions**. How often the threshold would have triggered over the last seven days, with a reminder to configure a notification channel.
* **Recommended Monitor**. The monitor name, query, and alert threshold.

You can click the thumbs up or thumbs down icon under **Was this Recommendation useful?** to give feedback. Then choose one of the following:

* **Apply**. Creates the recommended monitor immediately.
* **Change at Source**. Opens the recommendation in the product so you can review and customize it before saving.
* **Contact owner**. Notifies the asset maintainer if you lack edit permission.
* **Reject**. Dismisses the recommendation with a reason tag. Rejections apply to everyone in the organization.

## Limitations

* **Logs only**. The agent does not cover metrics, traces, or other telemetry types.
* **Read-only analysis**. The agent can analyze data but cannot modify, delete, or ingest data, and it has no access to external systems.
* **Retained data only**. The agent works only with ingested data that is still within your retention window.

## Additional resources

* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). How the Log Analysis Agent fits alongside DojoAI's other agents.
