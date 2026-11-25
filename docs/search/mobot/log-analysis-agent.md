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

The Log Analysis Agent is one of DojoAI's specialized agents. It helps teams identify gaps in log monitoring so they can detect recurring issues sooner. It recommends monitors that you can review, customize, and create to improve reliability.

Monitoring coverage often grows after an incident, when a team builds the monitor it wished it had. The Log Analysis Agent works from your log data instead. It looks for patterns that no monitor covers, checks that an equivalent monitor does not already exist, and recommends a new monitor.

With the Log Analysis Agent, you can:

* Find gaps in your log monitoring.
* Review a ready-to-use monitor instead of building one from scratch.
* Decide what happens to each recommendation. Nothing changes until you apply it.

You reach the agent through DojoAI. You do not see it as a separate item. It surfaces through the Recommendations page and DojoAI Studio.

## Recommendations

Instead of waiting for a question, the agent analyzes logs, then suggests an action. You review each recommendation and decide what to do. Nothing changes automatically.

The agent has the following skills:

| Category | Recommendation | What the agent does |
|:--|:--|:--|
| Reliability | **Create monitor** | Spots emerging issues in your logs and recommends a monitor, including its query and alert threshold. |

### Work with a recommendation

Recommendations appear on the **Recommendations** page, where you review them. To open it, go to **DojoAI** > **Recommendations** in the left navigation. The agent refreshes recommendations daily. For more about filtering, rejecting, and applying recommendations, see [DojoAI Recommendations](/docs/search/mobot/dojoai-recommendations-preview).

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

* [DojoAI Recommendations](/docs/search/mobot/dojoai-recommendations-preview). Learn how the Log Analysis Agent proactively recommends ways to improve your Sumo Logic environment.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). How the Log Analysis Agent fits alongside DojoAI's other agents.
