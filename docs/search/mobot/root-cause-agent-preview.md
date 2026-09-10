---
id: root-cause-agent-preview
title: Root Cause Agent
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

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

import useBaseUrl from '@docusaurus/useBaseUrl';

The Root Cause Agent is Mobot's agentic AI investigator. It picks up an alert, gathers the relevant telemetry on its own, follows the signal across your logs and metrics, and returns a root cause along with the evidence it used to get there. Its output appears on the **AI Investigation** tab of your [alert response page](/docs/alerts/monitors/alert-response/).

Today, when a monitor fires, triage starts from a blank page. The on-call engineer decides which dashboard matters, runs a log search, pivots elsewhere, checks other systems, and lines up timestamps by hand. How long that takes depends largely on how well that engineer knows that service.

The Root Cause Agent runs that loop for you. It starts from the alert, forms hypotheses, queries your telemetry, follows the signal across both logs and metrics, and produces:

* **A verdict**. What it believes the root cause is, or a clear statement that it could not conclude.
* **Key findings**. The plain-language steps that led there.
* **The evidence behind each finding**. The exact query that produced it, one click away.

It is built for the DevOps and SRE workflow: it removes the "where do I start?" phase of triage and gives every responder context that today only your most experienced engineers carry.

<!-- add screenshots when available-->

## AI Verdict

Every investigation resolves to one of a small set of verdicts, so you always know how much weight to give it.

| Verdict | Meaning |
|:--|:--|
| **Root cause identified** | The agent reached a conclusion it is confident in, with supporting evidence. |
| **In progress** | The investigation is still running. |
| **Inconclusive** | The agent found relevant signal but could not land on a root cause it can stand behind. This usually happens when the findings point in conflicting directions, or the deciding data sits in a source the agent cannot reach. |
| **False positive** | The alert did not represent a real problem in the system. |

### Confidence

The agent surfaces a root cause only when it is confident in the conclusion. If it is not, it returns **Inconclusive** rather than a lower-confidence guess. The goal is a result you can trust every time, even if that means the agent concludes less often.

### Auditability

Each finding carries the query behind it. Open it and you land in the log search or metrics query that produced it, ready to run. The agent's job is to hand you verifiable evidence, not an opaque answer.

## AI Investigation tab

When a monitor fires, the agent investigates the alert automatically. The result is waiting on the **AI Investigation** tab of the [alert response page](/docs/alerts/monitors/alert-response/) when someone opens it.

1. From **Alerts**, open the alert you want to review.
1. Select the **AI Investigation** tab. The other tabs on the page (**Alert Detail**, **Relevant Alerts**, and **Monitor History**) are unchanged.

The tab has the following sections.

### AI Verdict

The verdict for the alert (**Root cause identified**, **Inconclusive**, **False positive**, or **In progress**), followed by a short explanation of the reasoning. The section also shows a recommendation, such as **Safe to Resolve** with a **Resolve** action, and when the investigation started and how long it took.

### What Happened

A plain-language summary of the alert and what the agent found, followed by the numbered steps it worked through. Use the thumbs-up and thumbs-down buttons to give feedback on the summary.

### Key Findings

The main points the investigation uncovered, written as plain statements and numbered in the order the agent established them. Each finding links to the log search or metrics query that produced it, so you can open the query and check the evidence yourself. Use the thumbs-up and thumbs-down buttons to give feedback on the findings.

### Recommended Actions

Suggested next steps, ranked, with the reasoning behind each one and its expected impact. These are recommendations for you to act on. The agent does not run them.

### Continue investigating in Mobot

Select **Ask Mobot** to continue the investigation conversationally in [Mobot](/docs/search/mobot/), with the verdict, findings, and context already loaded. The tab also offers suggested follow-up questions you can send straight to Mobot. Ask a plain-language question such as `Why is my checkout service down?` and get an investigation back in conversation.

## What is included in Private Preview

Private Preview covers the core loop: the agent investigating on its own, and a way to ask it questions.

* **Automatic investigation of alerts**, across your logs and metrics. When a monitor fires, the agent investigates with no manual trigger, and the result is ready on the alert when someone opens it.
* **Results on the AI Investigation tab**, with the full detail: verdict, what happened, key findings with supporting evidence, and recommended actions.
* **Ask Mobot**. Continue an investigation in conversation, or ask a plain-language question to start one.

Private Preview investigates the telemetry you already send to Sumo Logic. Support for external sources and Slack is planned for a later preview phase.

## Connecting your own context and telemetry sources

The Root Cause Agent starts from the telemetry you already send to Sumo Logic. The deciding evidence often lives somewhere else: the metric that spiked, the flag that flipped, the deploy that went out, the page that woke someone up.

In a later preview phase, you will be able to connect those sources so the agent investigates across them rather than stopping at the edge of Sumo Logic. Examples of the kinds of sources in scope include AWS CloudWatch, GitHub, PagerDuty, and Slack, alongside feature flag and deployment tooling and other third-party telemetry platforms. Interoperability with external agents over open protocols such as MCP is in active development.

For which sources are available to you and when, contact your account team.

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

The agent operates with read-only access to your logs and metrics data in Sumo Logic. Agent-level governance covering permissions, roles, and scoping is planned for general availability. Compliance and security reviews go through the standard review path with your account team.

## FAQ

### How is this different from asking a chat assistant about my alerts?

A chat assistant is a surface you type into. The Root Cause Agent is a purpose-built investigator with its own tools, its own reasoning depth, and structured output that attaches to the alert. You can ask it questions in conversation, and it also runs unattended against alerts, which a chat assistant alone does not do.

### How is this different from the SOC Analyst Agent?

Both are agentic investigators in Dojo AI, aimed at different workflows. The [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent) triages Cloud SIEM insights for security teams and returns a malicious, suspicious, or benign verdict. The Root Cause Agent triages monitor alerts for DevOps and SRE teams, investigates across your logs and metrics, and returns a root cause. Both let you continue the investigation in Mobot.

### Will it run on every alert automatically?

During Private Preview, the agent investigates alerts from Sumo Logic monitors automatically. Controls to scope automatic investigation by alert, alert name, monitor, or tag are planned for a later preview phase, so you can point the agent at the monitors that matter to you.

### Can I use it from Slack?

Slack support is planned for a later preview phase, alongside the official Sumo Logic Slack app. Private Preview covers automatic investigation in the product and asking Mobot in conversation.

### Can it investigate alerts that did not originate in Sumo Logic?

Not during Private Preview, which covers alerts from Sumo Logic monitors. Investigation from external alerts is planned for a later phase.

### Can I connect my own tools and data sources?

Not during Private Preview. Connecting external context and telemetry sources is planned for a later preview phase. See [Connecting your own context and telemetry sources](#connecting-your-own-context-and-telemetry-sources).

### How does the agent avoid inventing a root cause?

Two ways. First, the confidence policy: if the agent cannot reach a conclusion it can defend, it returns **Inconclusive** rather than a plausible-sounding guess. Second, evidence-first output: every finding shows the query behind it, so you can disprove it in one click. Reducing spurious correlation is an ongoing focus of the agent's development.

### How is it priced?

Pricing and packaging are being finalized. Your account team will have details before general availability.

### How do I get early access?

Customers are nominated for Private Preview by their account teams. Contact your account team to express interest. The cohort is intentionally limited so the team can gather structured feedback on accuracy and usefulness.

### Which deployments is it available in?

Availability is rolling out per deployment. Check with your account team for yours.

## Additional resources

* [Alert Response](/docs/alerts/monitors/alert-response/). The alert page that hosts the AI Investigation tab.
* [Mobot](/docs/search/mobot). The conversational interface for Sumo Logic's AI agents.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). How Sumo Logic's AI agents fit alongside Mobot, the SOC Analyst Agent, and the Sumo Logic MCP server.
* [Preview Releases](/docs/preview). How Sumo Logic's customer preview program works.
