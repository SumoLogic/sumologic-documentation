---
id: root-cause-agent-preview
title: Root Cause Agent
description: Root Cause Agent, agentic AI investigator, automatically investigates Sumo Logic alerts the moment they fire, and immediately returns evidence-backed root causes based on relevant telemetry across your logs and metrics.
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

<!-- when this goes GA: add to docs/monitors/alerts AND docs/search/mobot sidebars -->

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

Sumo Logic's Root Cause Agent is an agentic AI investigator that works behind the scenes, automatically investigating incidents the moment an alert fires. DevOps and SRE teams get an evidence-backed observability starting point before anyone has to ask where to look. The agent gathers relevant telemetry on its own, follows the signal across your logs and metrics, and posts its findings to the **AI Investigation** tab of an alert's details page.

Monitors and alert rules are deterministic - they fire when a predefined threshold or condition is met. The Root Cause Agent is agentic: it takes the alert as a starting point, investigates across available signals, forms a hypothesis, and explains why it believes a particular cause is responsible. The monitor tells you something happened; the agent helps investigate why. It is complementary to monitoring, not a replacement for it.

The Root Cause Agent performs three distinct jobs:
* **Auto-investigation**. Automatically delivers an evidence-backed root cause on every alert as it fires, without requiring engineer action.
   * **AI verdict**. What it believes the root cause is, or a clear statement that it could not conclude.
   * **Key findings**. The steps that led there, each backed by the query that produced it.
   * **Recommended actions**. Suggested next steps for you to act on.
* **Conversational follow-up (via Mobot)**. Lets you continue the investigation in [Mobot](/docs/search/mobot/), with the full context of the AI investigation already loaded.
* **Audit trail**. Logs every query the agent runs to the Sumo Logic audit index, so you can review exactly what it did and how it reached its verdict.

The Root Cause Agent provides the following functionality:
* [AI Investigation tab on alerts](#ai-investigation-tab)
* [Continuing the investigation in Mobot](#continue-investigating-in-mobot)

## Permissions and data access

The agent operates with read-only access to your logs and metrics data. It investigates and recommends, but does not take corrective action on your systems.

Each investigation is recorded as an audit event in the Sumo Logic audit index, which you can search to track agent activity. Agent-level governance covering permissions, roles, and scoping is planned for a future release. Compliance and security reviews go through the standard review path with your account team.

## AI Investigation tab

When a monitor fires, the Root Cause Agent investigates the alert automatically. The result is waiting on the **AI Investigation** tab of the [alert response page](/docs/alerts/monitors/alert-response/) when someone opens it.

1. Go to your [Alert List](/docs/alerts/monitors/alert-response/#alert-list).
1. Click any alert to open its details. For example:<br/><img src={useBaseUrl('img/alerts/root-cause-agent-alert-list.png')} alt="Alert List with example alert highlighted" style={{border: '1px solid gray'}} width="700" />
1. Select the **AI Investigation** tab.<br/><img src={useBaseUrl('img/alerts/root-cause-agent-investigation-tab.png')} alt="AI Investigation tab showing verdict, key findings, and recommended actions" style={{border: '1px solid gray'}} width="700" />

The tab has the following sections. Each section carries its own thumbs-up and thumbs-down feedback buttons.

### AI Verdict

A box showing the verdict alongside a plain-language explanation of the root cause, and a **Recommendation** line for a suggested next action.

| Verdict | Meaning |
|:--|:--|
| **Identified Root Cause** | The agent reached a conclusion it is confident in, with supporting evidence. |
| **In progress** | The investigation is still running. |
| **Inconclusive** | The agent found relevant signal but could not reach a conclusion it is confident in. This can happen when findings point in conflicting directions, or the deciding data sits in a source the agent cannot reach. |
| **False positive** | The alert did not represent a real problem in the system. |

The agent surfaces a root cause only when it is confident in the conclusion. If it is not, it returns **Inconclusive** rather than a lower-confidence guess.

### What Happened

An expandable section describing what happened, the conditions that confirmed the root cause, what was ruled out, and other relevant context. The subsections vary based on the type of investigation.<br/><img src={useBaseUrl('img/alerts/root-cause-agent-investigation-tab-what-happened.png')} alt="What Happened section of the AI Investigation tab" style={{border: '1px solid gray'}} width="800" />

### Key Findings

The main points the investigation uncovered, each with a short title and a plain-language explanation of what it means and how it was established. Each finding includes a link to the query that produced it.<br/><img src={useBaseUrl('img/alerts/root-cause-agent-investigation-tab-key-findings.png')} alt="Key Findings section of the AI Investigation tab" style={{border: '1px solid gray'}} width="800" />

### Recommended Actions

A list of suggested actions, each with a title and explanation. These are recommendations for you to act on. The agent does not run them.<br/><img src={useBaseUrl('img/alerts/root-cause-agent-recommended-actions.png')} alt="Recommended Actions section of the AI Investigation tab" style={{border: '1px solid gray'}} width="800" />

### Continue investigating in Mobot

From here, you can continue the investigation conversationally in [Mobot](/docs/search/mobot/), with the full context of the investigation already loaded.

Click one of the suggested follow-up questions to autopopulate it in Mobot.<br/><img src={useBaseUrl('img/alerts/root-cause-agent-continue-mobot.png')} alt="Continue investigating in Mobot suggested questions at the bottom of the AI Investigation tab" style={{border: '1px solid gray'}} width="800" />

Alternatively, you can open the investigation in Mobot by navigating back to the top of the alert page and clicking **Ask Mobot**.

Upon opening, Mobot shows all AI investigation details. From here, ask a follow-up question specific to the alert you're investigating.<br/><img src={useBaseUrl('img/alerts/root-cause-agent-mobot.png')} alt="Root cause investigation loaded in Mobot" style={{border: '1px solid gray'}} width="800" />

Another action you can take is expanding **Key Findings** and clicking the provided chips to see query details.<br/><img src={useBaseUrl('img/alerts/root-cause-agent-mobot-key-findings.png')} alt="Root cause investigation loaded in Mobot" style={{border: '1px solid gray'}} width="800" />

Here are more examples to get you started. For the most useful responses, ask questions specific to the alert you are investigating.

* `Give me a summary of what happened during this incident`
* `What services were affected?`
* `Show me logs related to the root cause`
* `Are there other alerts that correlate with this one?`

After each step, Mobot retains the context of your investigation and presents suggested follow-up questions. At any point, click **Open Alert** to return to the alert's details page.

## Limitations

The following apply during Private Preview:

* **Remediation execution**. The agent investigates and recommends. It does not take corrective action on your systems.
* **Traces and APM-based investigation**. Investigation runs across logs and metrics. Distributed trace reasoning and service map awareness are not part of Private Preview.
* **Deduplication of investigations**. If the same incident arrives through more than one alert, you may see more than one investigation.
* **External alerts**. Private Preview covers alerts from Sumo Logic monitors. Investigation from external alerting systems is planned for a future phase.

Some limits are not tied to the preview phase:

* **Not conclusive on every alert**. A meaningful share of investigations return **Inconclusive** by design. See [AI Verdict](#ai-verdict).
* **Only as good as the telemetry it can reach**. If the deciding data is not in Sumo Logic, the agent cannot see it.
* **Does not replace your on-call**. It compresses the first phase of triage. The engineer still owns the decision.

## FAQ

### What is the Sumo Logic Root Cause Agent?

The Root Cause Agent is part of [Sumo Logic Dojo AI](/docs/get-started/ai-machine-learning/#dojo-ai). It applies agentic AI reasoning to observability triage — automatically investigating monitor alerts, gathering evidence across logs and metrics, and returning an evidence-backed root cause. When deeper analysis is needed, you continue the same investigation conversationally in [Mobot](/docs/search/mobot/), Dojo AI's chat interface.

### How is this different from asking a chat assistant about my alerts?

A chat assistant is a surface you type into. The Root Cause Agent runs automatically when an alert fires and posts its findings to the **AI Investigation** tab — you do not have to ask it to investigate. When you open an alert, the result is already there. From the tab, you can continue the investigation conversationally in Mobot.

### How is this different from the SOC Analyst Agent?

Both are agentic investigators in Dojo AI, aimed at different workflows. The [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent) triages Cloud SIEM insights for security teams and returns a malicious, suspicious, or benign verdict. The Root Cause Agent triages monitor alerts for DevOps and SRE teams, investigates across logs and metrics, and returns a root cause. Both let you continue the investigation in Mobot.

### How is this different from Sumo Logic monitors?

Monitors and alert rules are deterministic: they fire when a predefined threshold or condition is met. The Root Cause Agent is agentic: it takes the alert as a starting point, investigates across available signals, forms a hypothesis, and explains why it believes a particular cause is responsible. The monitor tells you something happened; the agent helps investigate why. It complements monitoring; it does not replace it.

### How does the agent avoid inventing a root cause?

Two ways. First, the confidence policy: if the agent cannot reach a conclusion it can defend, it returns **Inconclusive** rather than a plausible-sounding guess. Second, every finding shows the query behind it, so you can verify or disprove it in one click.

### Will it run on every alert automatically?

During Private Preview, the agent investigates every Sumo Logic monitor alert automatically. Configurable auto-investigation triggers — scoped by alert, alert name, monitor, or tag — are planned for Extended Preview, so you can focus the agent on the monitors that matter most rather than running it against everything.

### Can I trigger an investigation manually?

Not during Private Preview, where investigation is automatic. On-demand investigation, for teams that want a human in the loop before any automated work runs, is planned for Extended Preview.

### Can I use it from Slack?

Slack support is planned for Extended Preview, arriving alongside the official Sumo Logic Slack app. Private Preview covers automatic investigation in the product and asking Mobot in conversation.

### Can it investigate alerts that did not originate in Sumo Logic?

Not during Private Preview, which covers alerts from Sumo Logic monitors. Investigation from external alerting systems is planned for Extended Preview.

### Can I connect my own tools and data sources?

Not during Private Preview. Connecting external context and telemetry sources — such as AWS CloudWatch, GitHub, PagerDuty, feature flag tools, and additional telemetry platforms — is planned for Extended Preview. Contact your account team for availability.

### Can I audit what the agent did during an investigation?

Yes. Each investigation is recorded as an audit event in the Sumo Logic audit index.

### How is it priced?

Pricing and packaging are being finalized. Your account team will have details before general availability.

### Is my data used to train AI models?

No. Customer data is not used to train shared models.

### Which deployments is it available in?

Availability is rolling out per deployment. Check with your account team for yours.

## Additional resources

* [Example Prompts for Mobot](/docs/search/mobot/example-prompts). Find more example prompts here to continue your root cause observability investigation.
* [Sumo Logic | Dojo AI](https://www.sumologic.com/solutions/dojo-ai). Learn about Dojo AI, Sumo Logic's multi-agent AI platform, and the other specialized agents alongside the Root Cause Agent.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). How Sumo Logic's AI agents fit alongside Mobot, the SOC Analyst Agent, and the Sumo Logic MCP server.
* [Alert Response](/docs/alerts/monitors/alert-response/). The alert page that hosts the AI Investigation tab.
* [Mobot](/docs/search/mobot/). The conversational interface for Sumo Logic's AI agents.
* [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent). The security counterpart to the Root Cause Agent — investigates Cloud SIEM insights for security teams.
