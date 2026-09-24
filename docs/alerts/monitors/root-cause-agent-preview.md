---
id: root-cause-agent-preview
title: Root Cause Agent
sidebar_label: placeholder
description: The Root Cause Agent is Mobot's agentic AI investigator that picks up alerts, gathers the relevant telemetry across your logs and metrics, and returns a root cause with the evidence behind it.
keywords:
  - mobot
  - dojo ai
  - root cause agent
  - agentic ai
  - alerts
  - ai investigation
  - incident investigation
  - root cause analysis
  - devops
  - sre
---

<!-- when this goes GA: in sidebars.ts, add this file to both docs/search/mobot and docs/monitors/alerts -->

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

import useBaseUrl from '@docusaurus/useBaseUrl';

The Root Cause Agent-one of Mobot's agents that works behind the scenes-automatically investigates incidents the moment an alert fires, giving DevOps and SRE teams an evidence-backed observability starting point before anyone has to ask where to look. The agent gathers the relevant telemetry on its own, follows the signal across your logs and metrics, and posts its findings to the **AI Investigation** tab of an [alert's response page](/docs/alerts/monitors/alert-response/). From there, you can also open the investigation in Mobot to ask follow-up questions.

Monitors and alert rules are deterministic-they fire when a predefined threshold or condition is met. The Root Cause Agent is agentic: it takes the alert as a starting point, investigates across available signals, forms a hypothesis, and explains why it believes a particular cause is responsible. The monitor tells you something happened; the agent helps investigate why. It is complementary to monitoring, not a replacement for it.

The agent produces:

* **A verdict**. What it believes the root cause is, or a clear statement that it could not conclude.
* **Key findings**. The steps that led there, each backed by the query that produced it.
* **Recommended actions**. Suggested next steps for you to act on.

## AI Verdict

Every investigation resolves to one of a small set of verdicts, so you always know how much weight to give it.

| Verdict | Meaning |
|:--|:--|
| **Identified Root Cause** | The agent reached a conclusion it is confident in, with supporting evidence. |
| **In progress** | The investigation is still running. |
| **Inconclusive** | The agent found relevant signal but could not reach a conclusion it is confident in. This can happen when the findings point in conflicting directions, or the deciding data sits in a source the agent cannot reach. |
| **False positive** | The alert did not represent a real problem in the system. |

### Confidence

The agent surfaces a root cause only when it is confident in the conclusion. If it is not, it returns **Inconclusive** rather than a lower-confidence guess.

### Auditability

Each finding carries the query behind it. Open it and you land in the log search or metrics query that produced it, ready to run.

## AI Investigation tab

When a monitor fires, the agent investigates the alert automatically. The result is waiting on the **AI Investigation** tab of the [alert response page](/docs/alerts/monitors/alert-response/) when someone opens it.

1. Go to your [Alert List](/docs/alerts/monitors/alert-response/#alert-list) and click any alert to open its details.
1. Select the **AI Investigation** tab. The other tabs on the page (**Alert Details**, **Relevant Alerts**, and **Monitor History**) are unchanged.

To continue the investigation conversationally, use either:
- **Ask Mobot** (top right of the page) — opens [Mobot](/docs/search/mobot/) with the investigation already loaded.
- **Continue investigating in Mobot** (bottom of the tab) — suggested follow-up questions based on the investigation. Click one to open it in Mobot, or type your own question.

The tab has the following sections. Each one carries its own thumbs-up and thumbs-down feedback buttons.

### AI Verdict

A box showing the verdict (for example, **Identified Root Cause**) alongside a plain-language explanation of the root cause. Below that, a **Recommendation** line shows a suggested next action (for example, **Benign Remediation**).

### What Happened

An expandable section with structured subsections: **Summary**, **Timeline**, **Root Cause of the Spike**, **Secondary Observations**, and **What Was Ruled Out**.

### Key Findings

The main points the investigation uncovered, each with a short title and a plain-language explanation of what it means and how it was established.

### Recommended Actions

A list of suggested actions, each with a title and explanation. These are recommendations for you to act on. The agent does not run them.

## Preview phases

Private Preview covers the core investigation experience: automatic investigation of Sumo Logic alerts across logs and metrics, with verdict, key findings, supporting evidence, and recommended actions. Ask Mobot is also available.

Additional preview phases are planned. Contact your account team for the latest availability information.

## Connecting your own context and telemetry sources

The Root Cause Agent starts from the telemetry you already send to Sumo Logic. Support for connecting external context and telemetry sources is planned for a future preview phase. Contact your account team for availability.

## Limitations

The following apply during Private Preview:

* **Remediation execution**. The agent investigates and recommends. It does not take corrective action on your systems.
* **Traces and APM-based investigation**. Investigation runs across logs and metrics. Distributed trace reasoning and service map awareness are not part of Private Preview.
* **Deduplication of investigations**. If the same incident arrives through more than one alert, you may see more than one investigation.

Some limits are not tied to the preview phase:

* **It is not conclusive on every alert**. A meaningful share of investigations return **Inconclusive** by design. See [Confidence](#confidence).
* **It is only as good as the telemetry it can reach**. If the deciding data is not in Sumo Logic and the source is not connected, the agent cannot see it.
* **It does not replace your on-call**. It compresses the first phase of triage. The engineer still owns the decision.

## Permissions and data access

The agent operates with read-only access to your logs and metrics data in Sumo Logic. Each investigation is recorded as an audit event in the Sumo Logic audit index, which you can search to track agent activity. Agent-level governance covering permissions, roles, and scoping is planned for a future release. Compliance and security reviews go through the standard review path with your account team.

## FAQ

### How is this different from asking a chat assistant about my alerts?

A chat assistant is a surface you type into. The Root Cause Agent runs automatically when an alert fires and posts its findings to the **AI Investigation** tab on the alert — you do not have to ask it to investigate. When you open an alert, the result is already there. From the tab, you can also continue the investigation conversationally in Mobot.

### How is this different from the SOC Analyst Agent?

Both are agentic investigators in Dojo AI, aimed at different workflows. The [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent) triages Cloud SIEM insights for security teams and returns a malicious, suspicious, or benign verdict. The Root Cause Agent triages monitor alerts for DevOps and SRE teams, investigates across your logs and metrics, and returns a root cause. Both let you continue the investigation in Mobot.

### Will it run on every alert automatically?

During Private Preview, the agent investigates alerts from Sumo Logic monitors automatically. Controls to scope automatic investigation are planned for a future preview phase.

### Can I use it from Slack?

Slack support is planned for a future preview phase. Private Preview covers automatic investigation in the product and asking Mobot in conversation.

### Can it investigate alerts that did not originate in Sumo Logic?

Not during Private Preview, which covers alerts from Sumo Logic monitors. Investigation from external alerts is planned for a future preview phase.

### Can I connect my own tools and data sources?

Not during Private Preview. Connecting external context and telemetry sources is planned for a future preview phase. See [Connecting your own context and telemetry sources](#connecting-your-own-context-and-telemetry-sources).

### How does this relate to Sumo Logic monitors?

Monitors and alert rules are deterministic: they fire when a predefined threshold or condition is met. The Root Cause Agent is agentic: it takes the alert as a starting point, investigates across available signals, forms a hypothesis, and explains why it believes a particular cause is responsible. The monitor tells you something happened; the agent helps investigate why. It is complementary to monitoring, not a replacement for it.

### How does the agent avoid inventing a root cause?

Two ways. First, the confidence policy: if the agent cannot reach a conclusion it can defend, it returns **Inconclusive** rather than a plausible-sounding guess. Second, every finding shows the query behind it, so you can verify or disprove it in one click.

### How is it priced?

Pricing and packaging are being finalized. Your account team will have details before general availability.

### Is my data used to train AI models?

No. Customer data is not used to train shared models.

### Which deployments is it available in?

Availability is rolling out per deployment. Check with your account team for yours.

## Additional resources

* [Alert Response](/docs/alerts/monitors/alert-response/). The alert page that hosts the AI Investigation tab.
* [logs](/docs/search)
*
* [Mobot](/docs/search/mobot). The conversational interface for Sumo Logic's AI agents.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). How Sumo Logic's AI agents fit alongside Mobot, the SOC Analyst Agent, and the Sumo Logic MCP server.
* [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent). The security counterpart to Root Cause Agent, SOC Analyst Agent investigates security insights in Cloud SIEM.
