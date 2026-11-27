---
id: root-cause-agent
title: Root Cause Agent
sidebar_label: Root Cause Agent ✨
description: Root Cause Agent, one of Sumo Logic's DojoAI agents, investigates observability alerts automatically (if configured) or on demand and returns evidence-backed root causes based on relevant telemetry across your logs and metrics.
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

import useBaseUrl from '@docusaurus/useBaseUrl';

The Root Cause Agent is one of the specialized agents in [Sumo Logic DojoAI](/docs/get-started/ai-machine-learning/#dojoai). It investigates [observability alerts](/docs/alerts) for DevOps and SRE teams. The agent gathers telemetry from your logs and metrics, follows the signal to a likely cause, and posts its findings, with supporting evidence, to the **AI Investigation** tab of the alert.

You can start an investigation from an alert, or you can have Dojo Studio start one automatically when an alert is created. After an investigation, you can continue the conversation in [Mobot](/docs/search/mobot/) with the full context already loaded.

A monitor tells you that something happened. The Root Cause Agent takes that alert as a starting point and helps you understand why it happened. It complements your monitors and does not replace them.

## Run a root cause analysis

Investigations start in one of two ways. You can start one on demand from an alert's sidebar or details page, or you can use Triggers in Dojo Studio to start them automatically. The agent runs one investigation per alert.

Follow these steps to start an investigation on demand.

1. From your left navigation, click **Alerts**.
1. In your **Alert List**, the **AI Verdict** column shows whether the alert has been investigated. Click any alert row to open its sidebar, or open the alert's details page.<br/><img src={useBaseUrl('img/alerts/monitors/root-cause-agent-alerts.png')} alt="Alert List with the AI Verdict column" style={{border: '1px solid gray'}} width="800" />
1. In the sidebar or on the details page, click **Investigate**. On the details page, the button is in the alert header and the **AI Investigation** tab shows **Not Investigated** until you run one.<br/><img src={useBaseUrl('img/alerts/monitors/root-cause-agent-ai-investigation-tab.png')} alt="Root Cause Agent investigation running with a progress bar" style={{border: '1px solid gray'}} width="800" />

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

### View the investigation trace

The investigation trace is a step-by-step record of what the agent checked, what came back, and how it reached its verdict. Use it to verify a verdict without re-running the investigation yourself. Anyone who can view the alert can view its trace.

On the **AI Investigation** tab, click **View Full Investigation Process** in the **AI Verdict** box.<br/><img src={useBaseUrl('img/alerts/monitors/root-cause-agent-trace-link.png')} alt="AI Verdict box with the View Full Investigation Process link highlighted" style={{border: '1px solid gray'}} width="800" />

The trace opens in a side panel next to the alert, titled **How this investigation got to its answer**. While an investigation is running, the panel adds steps as the agent works. The panel includes the following sections.

* **Steps**. Numbered steps show what the agent checked, in order, with the explanation for each step and the queries it ran.
* **Verdict**. The last step shows the verdict, followed by the written report the agent produced.
* **Confidence**. How confident the agent is in the verdict, and why.
* **Integrations Consulted**. The integrations the agent considered, and whether it queried them.

Click **View Alert in Sumo Logic** at the bottom of the panel to return to the alert.

### What Happened

This section shows a summary, a confirmed root cause, a baseline check that compares the alert to earlier activity, and the causes the agent ruled out. Each investigation also lists the **Knowledge sources** it drew on, such as runbooks associated with the monitor, knowledge you provide in Dojo Studio, and what the agent learned from previous investigations.

<img src={useBaseUrl('img/alerts/monitors/root-cause-agent-what-happened.png')} alt="What Happened section with the investigation summary and knowledge sources" style={{border: '1px solid gray'}} width="800" />

### Execution history

This table lists each run of the underlying monitor query, including the data scanned and credits consumed, so you can see the usage pattern that led to the alert.

<img src={useBaseUrl('img/alerts/monitors/root-cause-agent-ex-history.png')} alt="Execution History timeline for an investigation" style={{border: '1px solid gray'}} width="800" />

### What was ruled out

This section lists the causes the agent considered and excluded, so you can see what did not explain the alert.

<img src={useBaseUrl('img/alerts/monitors/root-cause-agent-ruled-out.png')} alt="Causes the agent ruled out during the investigation" style={{border: '1px solid gray'}} width="800" />

### Key Findings

This section lists the main points uncovered by the investigation, each with a short statement of what it means. Each finding lists the evidence that produced it as chips named for the underlying query, so you can verify the result yourself.

<img src={useBaseUrl('img/alerts/monitors/root-cause-agent-key-findings.png')} alt="Key Findings section with evidence chips for each finding" style={{border: '1px solid gray'}} width="800" />

### Recommended Actions

After the Root Cause Agent investigates an alert, it generates contextually appropriate **Recommended Actions** that you can review without leaving the alert page. Each action has a title and an explanation, such as adding a time range to a query or reviewing a monitor definition. The agent generates recommendations for every investigated alert, and they update as the agent uncovers more context when you continue the investigation in Mobot. The agent does not take remediation actions on its own. Executing a recommended action by clicking **Execute**, which requires your explicit approval, is in [Private Preview](/docs/cse/get-started-with-cloud-siem/soc-recommendation-and-response/).

<img src={useBaseUrl('img/alerts/monitors/root-cause-agent-rec-actions.png')} alt="Recommended Actions list with suggested next steps" style={{border: '1px solid gray'}} width="800" />

## Permissions and data access

The agent has read-only access to your logs and metrics data.

Investigations run with the permissions of the following users.
* **Automatic investigations**. The agent owner, if one is configured. Otherwise, the monitor's creator.
* **Manual investigations**. The user who starts the investigation.

Each investigation is recorded as an audit event in the Sumo Logic audit index, which you can search to track agent activity. Agent-level governance covering permissions, roles, and scoping is planned for a future release. Compliance and security reviews go through the standard review path with your account team.

## Review relevant alerts and monitor history

Two additional tabs on the alert details page give you more context alongside the AI investigation.

* **Relevant Alerts**. Other alerts on the same entity or in the same time window, each with its own AI verdict.
* **Monitor History**. How often this monitor has fired over the past 30 days, and the verdicts of past firings.

Learn more about these tabs in [Alert Response](/docs/alerts/monitors/alert-response/).

## Continue investigating in Mobot

From the **AI Investigation** tab, you can continue the investigation conversationally in [Mobot](/docs/search/mobot/), with the full context of the investigation already loaded.

<img src={useBaseUrl('img/alerts/monitors/root-cause-agent-mobot.png')} alt="Continuing an investigation conversationally in Mobot" style={{border: '1px solid gray'}} width="800" />

Click **Ask Mobot** at the top of the alert page to continue with the Root Cause Agent. To switch to a custom agent, click the dropdown next to **Ask Mobot** and select it.<br/><img src={useBaseUrl('img/alerts/monitors/root-cause-agent-ask-mobot.png')} alt="Ask Mobot button with the dropdown for switching agents highlighted" style={{border: '1px solid gray'}} width="400" />

You can also click one of the suggested follow-up questions to autopopulate it in Mobot. The full AI investigation appears in Mobot under the selected agent. From here, ask a follow-up question specific to the alert you're investigating.

Here are more examples to get you started. For the most useful responses, ask questions specific to the alert you are investigating.

* `Give me a summary of what happened during this incident.`
* `What services were affected?`
* `Show me logs related to the root cause.`
* `Are there other alerts that correlate with this one?`

After each response, Mobot retains the context of your investigation and presents suggested follow-up questions. At any point, click **Open Alert** to return to the alert's details page.

## Best practices

* **Verify findings against the telemetry**. The agent can only use the telemetry it can reach, so it cannot see deciding data that is not in Sumo Logic. Check key findings against the log search or metrics query behind them before acting.
* **Keep your on-call in the loop**. The agent compresses the first phase of triage, but the engineer still owns the decision.


## Limitations

* **Traces and APM-based investigation**. Investigations run across logs and metrics. Distributed trace reasoning and service map awareness are not currently part of the investigation.
* **Deduplication of investigations**. If the same incident arrives through more than one alert, you may see more than one investigation.
* **External alerts**. The **AI Investigation** tab covers alerts from Sumo Logic monitors. You can investigate alerts from external alerting systems in [Mobot](/docs/search/mobot/), but those investigations do not appear on the alert response page.
* **Investigation limit**. Your organization can run 5 investigations per day, shared between automatic and manual investigations.

## FAQ

### How is this different from asking a chat assistant about my alerts?

With a chat assistant like Mobot, you ask a question and it answers. The Root Cause Agent works on its own once you launch it from an alert. It gathers the evidence and presents a root cause, and you can then continue in Mobot with that evidence already loaded.

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
* [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent). The security counterpart to the Root Cause Agent. Investigates Cloud SIEM insights for security teams.
