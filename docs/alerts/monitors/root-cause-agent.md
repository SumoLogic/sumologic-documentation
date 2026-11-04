---
id: root-cause-agent
title: Root Cause Agent
sidebar_label: Root Cause Agent ✨
description: Root Cause Agent, one of Sumo Logic's DojoAI agents, investigates observability alerts on demand and returns evidence-backed root causes based on relevant telemetry across your logs and metrics.
keywords:
  - mobot
  - dojoai
  - root cause agent
  - agentic ai
  - alerts
  - ai investigation
  - incident investigation
  - root cause analysis
  - devops
  - sre
---

<!--
- Automatic or on-demand investigation?
- RCA's specific DojoAI Credits cost and overage/cap behavior
- Are Limitations the same for ga?
-->

import useBaseUrl from '@docusaurus/useBaseUrl';

The Root Cause Agent is one of the specialized agents in [Sumo Logic DojoAI](/docs/get-started/ai-machine-learning/#dojoai), each built for a different job. Root Cause Agent investigates [observability alerts](/docs/alerts). After getting an alert, DevOps and SRE teams can launch an AI-driven investigation directly from an alert's details page. The Root Cause Agent gathers relevant telemetry on its own, follows the signal across your logs and metrics, and posts its findings to the alert's **AI Investigation** tab.

Monitors and alert rules are deterministic - they fire when a predefined threshold or condition is met. The Root Cause Agent is agentic - it takes the alert as a starting point, investigates across available signals, forms a hypothesis, and explains why it believes a particular cause is responsible. The monitor tells you something happened; the agent helps investigate why. It is complementary to monitoring, not a replacement for it.

The Root Cause Agent performs the following jobs:
* **On-demand investigation**. Start an investigation from an alert's details page to get an evidence-backed root cause without manually digging through logs and metrics.
   * **AI Verdict**. What it believes the root cause is, or a clear statement that it could not conclude.
   * **What Happened**. A narrative summary of what occurred, backed by the knowledge sources the agent consulted.
   * **Key Findings**. The steps that led there, each backed by the log search or metrics query that produced it.
   * **Recommended Actions**. Suggested next steps for you to act on.
* **Conversational follow-up (via Mobot)**. Lets you continue the investigation in [Mobot](/docs/search/mobot/), with the full context of the AI investigation already loaded.
* **Related context**. Correlate the current alert with other alerts on the same entity or in the same time window, and review how often this monitor has fired and for how long.

The Root Cause Agent provides the following functionality:
* [Run a root cause analysis](#run-a-root-cause-analysis)
* [Review relevant alerts and monitor history](#review-relevant-alerts-and-monitor-history)
* [Continuing the investigation in Mobot](#continue-investigating-in-mobot)

## Run a root cause analysis

You start investigations on demand from an alert's details page. The Root Cause Agent runs one investigation per alert and posts its findings to the **AI Investigation** tab of each individual alert's details page.

1. From your left navigation, click **Alerts**.
1. In your **Alert List**, the **AI Verdict** column shows whether the alert has been investigated. Click any alert row to open its details.<br/><img src={useBaseUrl('img/alerts/monitors/root-cause-agent-alerts.png')} alt="Alert List with the AI Verdict column" style={{border: '1px solid gray'}} width="800" />
1. Click the **AI Investigation** tab > **Start Investigation**.<br/><img src={useBaseUrl('img/alerts/monitors/root-cause-agent-ai-investigation-tab.png')} alt="Root Cause Agent investigation running with a progress bar" style={{border: '1px solid gray'}} width="800" />

Full results populate in the **AI Investigation** tab.

### AI Verdict

When an investigation finishes, you'll see a box showing the AI verdict with a plain-language explanation of the root cause.

<img src={useBaseUrl('img/alerts/monitors/root-cause-agent-identified.png')} alt="AI Investigation tab with full investigation results" style={{border: '1px solid gray'}} width="800" /><br/>

| Verdict | Meaning |
|:--|:--|
| **Not Investigated** | No investigation has been run for this alert yet. |
| **In Progress** | The investigation is currently running. |
| **Investigation Error** | The investigation could not complete. Click **Retry Investigation** to run it again. |
| **Root Cause Identified** | The agent reached a conclusion it is confident in, with supporting evidence. |
| **Inconclusive** | The agent found relevant signal but could not reach a conclusion it is confident in. This can happen when findings point in conflicting directions, or the deciding data sits in a source the agent cannot reach. |
| **False Positive** | The alert did not represent a real problem in the system. |

The verdict also appears in the **AI Verdict** column of the **Alert List**, so you can scan investigation status across alerts without opening each one.

The agent surfaces a root cause only when it is confident in the conclusion; otherwise, it returns an **Inconclusive** status rather than a lower-confidence guess.

### What Happened

The **What Happened** section shows a summary, a confirmed root cause, a baseline check that compares the alert to earlier activity, and the causes the agent ruled out. Each investigation also lists the **Knowledge sources** it drew on, such as runbooks associated with the monitor.

<img src={useBaseUrl('img/alerts/monitors/root-cause-agent-what-happened.png')} alt="What Happened section with the investigation summary and knowledge sources" style={{border: '1px solid gray'}} width="800" />

### Execution history

The **Execution History** table lists each run of the underlying monitor query, including the data scanned and credits consumed, so you can see the usage pattern that led to the alert.

<img src={useBaseUrl('img/alerts/monitors/root-cause-agent-ex-history.png')} alt="Execution History timeline for an investigation" style={{border: '1px solid gray'}} width="800" />

### What was ruled out

**What was ruled out** lists the causes the agent considered and excluded, so you can see what did not explain the alert.

<img src={useBaseUrl('img/alerts/monitors/root-cause-agent-ruled-out.png')} alt="Causes the agent ruled out during the investigation" style={{border: '1px solid gray'}} width="800" />

### Key Findings

**Key Findings** section lists the main points uncovered by investigation, each with a short statement of what it means. Each finding lists the evidence that produced it as chips named for the underlying query, so you can verify the result yourself.

<img src={useBaseUrl('img/alerts/monitors/root-cause-agent-key-findings.png')} alt="Key Findings section with evidence chips for each finding" style={{border: '1px solid gray'}} width="800" />

### Recommended Actions

**Recommended Actions** lists suggested actions, each with a title and explanation, such as adding a time range to a query or reviewing a monitor definition. For some of the actions, you can run them by clicking **Execute** (not pictured). The agent will never execute without your consent.

<img src={useBaseUrl('img/alerts/monitors/root-cause-agent-rec-actions.png')} alt="Recommended Actions list with suggested next steps" style={{border: '1px solid gray'}} width="800" />

## Permissions and data access

The agent operates with read-only access to your logs and metrics data. It investigates and recommends, and does not take action on your systems.

Each investigation is recorded as an audit event in the Sumo Logic audit index, which you can search to track agent activity. Agent-level governance covering permissions, roles, and scoping is planned for a future release. Compliance and security reviews go through the standard review path with your account team.

## Review relevant alerts and monitor history

Two additional tabs on the alert response page give you more context alongside the AI investigation:

* **Relevant Alerts**. Alerts related to the current one, grouped either by **Entity** (other alerts on the same entity) or by **Time** (other alerts that share a time window with this one). Each related alert shows its own AI verdict, severity, status, and duration, so you can spot a broader incident without leaving the page.
* **Monitor History**. How often this monitor has fired over the last 30 days, shown as a frequency heatmap, along with the median alert duration and a list of past firings and their verdicts. Use this to judge whether the current alert is a one-off or part of a recurring pattern.

The **Alert Details** tab also surfaces **Log Fluctuations**, comparing log activity for the alert's query between the current window and a prior one, so you can see what's new, missing, or changed before diving into the AI investigation.

## Continue investigating in Mobot

From the **AI Investigation** tab, you can continue the investigation conversationally in [Mobot](/docs/search/mobot/), with the full context of the investigation already loaded.

<img src={useBaseUrl('img/alerts/monitors/root-cause-agent-mobot.png')} alt="Continuing an investigation conversationally in Mobot" style={{border: '1px solid gray'}} width="800" />

Click one of the suggested follow-up questions to autopopulate it in Mobot, or click **Ask Mobot** at the top of the alert page. When Mobot opens, it shows all AI investigation details. From here, ask a follow-up question specific to the alert you're investigating.

Here are more examples to get you started. For the most useful responses, ask questions specific to the alert you are investigating.

* `Give me a summary of what happened during this incident.`
* `What services were affected?`
* `Show me logs related to the root cause.`
* `Are there other alerts that correlate with this one?`

After each response, Mobot retains the context of your investigation and presents suggested follow-up questions. At any point, click **Open Alert** to return to the alert's details page.

## Best practices

* **Verify findings against the telemetry**. The agent is only as good as the telemetry it can reach: if the deciding data is not in Sumo Logic, it cannot see it. Check key findings against the log search or metrics query behind them before acting.
* **Keep your on-call in the loop**. The agent compresses the first phase of triage, but the engineer still owns the decision.


## Limitations

<!-- confirm which of these still apply -->

* **Traces and APM-based investigation**. Investigations run across logs and metrics. Distributed trace reasoning and service map awareness are not currently part of the investigation.
* **Deduplication of investigations**. If the same incident arrives through more than one alert, you may see more than one investigation.
* **External alerts**. Investigation covers alerts from Sumo Logic monitors. Investigation from external alerting systems is planned for a future release.
* **Alerts**. Limit of 10 alerts investigated per minute.
* **Not conclusive on every alert**. A meaningful share of investigations return **Inconclusive** by design. See [AI Verdict](#ai-verdict).

## FAQ

### What is the Sumo Logic Root Cause Agent?

The Root Cause Agent is part of [Sumo Logic DojoAI](/docs/get-started/ai-machine-learning/#dojoai). It applies agentic AI reasoning to observability triage — investigating observability alerts on demand, gathering evidence across logs and metrics, and returning an evidence-backed root cause. When deeper analysis is needed, you continue the same investigation conversationally in [Mobot](/docs/search/mobot/), DojoAI's chat interface.

### How is this different from asking a chat assistant about my alerts?

A chat assistant like Mobot is a surface you type into: you ask a question, it answers. The Root Cause Agent is an investigator you launch from an alert's details page. You start an investigation from an alert's details page, the agent gathers evidence across your logs and metrics on its own, and presents a root cause. From there, you can continue the investigation conversationally in Mobot, now with that evidence already loaded.

### How is this different from the SOC Analyst Agent?

Both are agentic investigators in DojoAI, aimed at different workflows. The [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent) triages Cloud SIEM insights for security teams and returns malicious, suspicious, or benign verdicts. The Root Cause Agent triages observability alerts for DevOps and SRE teams, investigates across logs and metrics, and returns a root cause. Both let you continue the investigation in Mobot.

### How is it priced?

Root Cause Agent investigations draw from your organization's [DojoAI Credits](/docs/get-started/ai-machine-learning/#dojoai-credits) pool, the same shared pool Mobot and the SOC Analyst Agent use. Contact your account team for pricing and promotional details.

### Is my data used to train AI models?

No. See [Is customer data or PII used to train AI models?](/docs/get-started/ai-machine-learning/#is-customer-data-or-pii-used-to-train-ai-models) in our AI FAQ.

## Additional resources

* [Example Prompts for Mobot](/docs/search/mobot/example-prompts). Find more example prompts here to continue your root cause observability investigation.
* [Sumo Logic | DojoAI](https://www.sumologic.com/solutions/dojo-ai). Learn about DojoAI, Sumo Logic's multi-agent AI platform, and the other specialized agents alongside the Root Cause Agent.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). How Sumo Logic's AI agents fit alongside Mobot, the SOC Analyst Agent, and the Sumo Logic MCP server.
* [Alert Response](/docs/alerts/monitors/alert-response/). The alert page that hosts the AI Investigation tab.
* [Mobot](/docs/search/mobot/). The conversational interface for Sumo Logic's AI agents.
* [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent). The security counterpart to the Root Cause Agent — investigates Cloud SIEM insights for security teams.
