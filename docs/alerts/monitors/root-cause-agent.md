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

<!-- insert RCA Dojo AI icon-->

<!-- SME REVIEW NEEDED before this goes to PR. Open items from DOCS-1928:
1. Trigger model: this draft says on-demand (per Jira meeting notes and the Figma Alert Listing "Start Investigation" link). DIRECT CONFLICT, two sources: (a) the internal DojoAI FAQs doc (Root Cause Agent tab, as of its Oct 26, 2026 Extended Preview target) describes Private Preview as auto-triggered on alert firing, with "configurable auto-investigation triggers" landing at Extended Preview - not a switch from auto to on-demand, just more configurability; (b) the public sumologic.com site copy reads "Root Cause Agent: from alert to root cause, automatically / Investigates observability alerts automatically and delivers evidence-backed verdicts." SMEs are unsure which is correct as of this writing (per user, 2026-10-26) - do NOT assert "automatically" in this draft until SMEs confirm. Keeping on-demand pending explicit SME confirmation, but this needs to be resolved before publish, not assumed.
2. Recommended Actions "Execute" button: Figma shows some recommended actions with a one-click Execute button. DIRECT CONFLICT: the internal DojoAI FAQs doc (Root Cause Agent tab) lists "Remediation execution" under both "Known limitations until GA" and the "Beyond GA" capabilities table, stating explicitly: "Through GA the agent investigates and recommends. It does not take corrective action on your systems." Keeping the Execute button claim in this draft pending explicit SME confirmation, but this looks likely wrong and needs resolution before publish.
3. Verdict label inconsistency in Figma: some frames say "Root Cause Identified", others say "Identified Root Cause". This draft uses "Root Cause Identified" (matches the Alert Listing column and most AI Investigation frames) - confirm final copy.
4. Pricing: this doc now points to the DojoAI Credits section in ai-machine-learning.md rather than answering inline. That section still needs SME confirmation on RCA's specific credit cost, the 60-day promo/daily caps, and overage/cap behavior expected end of Nov - see the SME comment there, not here.
5. Limitations list carried over from Private Preview (dedup, traces/APM, external alerts, 10 alerts/min) - confirm which still apply at GA.
6. File path: this draft stays at docs/alerts/monitors/root-cause-agent.md per main. DOCS-1975 (PR #7243, open) will later move agent docs to docs/dojo-ai/agents/ - reconcile paths when that merges.
7. GA timing: the internal DojoAI FAQs doc (Root Cause Agent tab) targets GA for Nov 30, 2026, with Extended Preview targeted Oct 26, 2026. This draft should stay unpublished/held until GA is confirmed imminent - do not merge or publish as a GA doc while the product is still in preview. The accompanying release note (blog-service/2026-11-30-search.md) is dated to match and should be held the same way.
-->


import useBaseUrl from '@docusaurus/useBaseUrl';

The Root Cause Agent is one of the specialized agents in [Sumo Logic DojoAI](/docs/get-started/ai-machine-learning/#dojoai), each built for a different job. Root Cause Agent investigates observability alerts: DevOps and SRE teams can start an investigation directly from the **Alerts** list or an alert's details page, and the agent gathers relevant telemetry on its own, follows the signal across your logs and metrics, and posts its findings to the **AI Investigation** tab.

Monitors and alert rules are deterministic — they fire when a predefined threshold or condition is met. The Root Cause Agent is agentic: it takes the alert as a starting point, investigates across available signals, forms a hypothesis, and explains why it believes a particular cause is responsible. The monitor tells you something happened; the agent helps investigate why. It is complementary to monitoring, not a replacement for it.

The Root Cause Agent performs the following jobs:
* **On-demand investigation**. Start an investigation from the **Alerts** list or an alert's details page to get an evidence-backed root cause without manually digging through logs and metrics.
   * **AI verdict**. What it believes the root cause is, or a clear statement that it could not conclude.
   * **What happened**. A narrative summary of what occurred, backed by the knowledge sources the agent consulted.
   * **Key findings**. The steps that led there, each backed by the log search or metrics query that produced it.
   * **Recommended actions**. Suggested next steps for you to act on.
* **Conversational follow-up (via Mobot)**. Lets you continue the investigation in [Mobot](/docs/search/mobot/), with the full context of the AI investigation already loaded.
* **Investigation trace**. A step-by-step, auditable record of what the agent checked, what it found, and how it reached its verdict, in addition to the audit event Sumo Logic logs for every investigation.
* **Related context**. Correlate the current alert with other alerts on the same entity or in the same time window, and review how often this monitor has fired and for how long.

The Root Cause Agent provides the following functionality:
* [Run a root cause analysis](#run-a-root-cause-analysis)
* [Review related alerts and monitor history](#review-related-alerts-and-monitor-history)
* [Continuing the investigation in Mobot](#continue-investigating-in-mobot)

## Run a root cause analysis

You start investigations on demand, either from the **AI Verdict** column on the **Alerts** list or from the **AI Investigation** tab on an alert's details page. <!-- SME: confirm whether an automatic, trigger-configured mode (investigate automatically when an alert matches a condition you configure) is in GA scope, per the existing ai-machine-learning.md Root Cause Agent summary, or still planned for a later phase. --> The Root Cause Agent runs one investigation per alert and posts its findings to the **AI Investigation** tab of the [alert response page](/docs/alerts/monitors/alert-response/).

1. From your left navigation, click **Alerts**.
1. In the **AI Verdict** column, click **Start Investigation** on any alert that hasn't been investigated yet, or click on the alert's row to open its response page and start one from there.
1. On the alert response page, select the **AI Investigation** tab, then click **Start Investigation**. The agent runs in the background and updates the tab when complete.

The **AI Investigation** tab includes the following sections.

### AI Verdict

A box showing the verdict alongside a plain-language explanation of the root cause, when the investigation started, and how long it took. A **Recommendation** line suggests a next action, such as resolving the alert or reviewing the recommended actions below.

| Verdict | Meaning |
|:--|:--|
| **Not Investigated** | No investigation has been run for this alert yet. |
| **In Progress** | The investigation is currently running. |
| **Investigation Error** | The investigation couldn't complete. Click **Retry Investigation** to run it again. |
| **Root Cause Identified** | The agent reached a conclusion it is confident in, with supporting evidence. |
| **Inconclusive** | The agent found relevant signal but could not reach a conclusion it is confident in. This can happen when findings point in conflicting directions, or the deciding data sits in a source the agent cannot reach. |
| **False Positive** | The alert did not represent a real problem in the system. |

The agent surfaces a root cause only when it is confident in the conclusion; if it is not, it returns **Inconclusive** rather than a lower-confidence guess. Every finding also links to the log search or metrics query behind it, and to the full investigation trace, so you can verify or disprove the verdict yourself.

The same verdict also appears in the **AI Verdict** column of the **Alerts** list, so you can scan investigation status across alerts without opening each one.

### What Happened

A narrative summary of what happened, the conditions that confirmed the root cause, and a numbered list of the key signals that led there. Each investigation also lists the **Knowledge Sources** it drew on, such as runbooks associated with the monitor.

Click **View Full Investigation Process** to open the investigation trace. See [Investigation trace](#investigation-trace).

### Key Findings

The main points the investigation uncovered, each with a short statement of what it means. Findings link out to the evidence that produced them, labeled **Log Search** or **Metrics Query**, so you can open the underlying query and verify the result yourself.

### Recommended Actions

A list of suggested actions, each with a title and explanation. <!-- SME: confirm whether all, or only some, recommended actions carry an Execute button that runs the action directly, and what "running" an action does. --> Some recommended actions include an **Execute** button to carry out that action directly; others are recommendations for you to act on yourself. The agent does not take action on your systems unless you choose to run a recommended action.

### Investigation trace

Click **View Full Investigation Process** from the **What Happened** section to open the investigation trace, a step-by-step record of what the agent checked, what came back, and where it hit dead ends, for the alert's underlying entity. Each step in the trace shows what was checked, the findings at that point, and what the agent checked next, so you can follow exactly how it reached its verdict.

Every investigation is also logged as an audit event in the Sumo Logic audit index, so you can review agent activity outside the trace view.

### Permissions and data access

The agent operates with read-only access to your logs and metrics data. It investigates and recommends, and only takes action on your systems when you run a recommended action yourself.

Each investigation is recorded as an audit event in the Sumo Logic audit index, which you can search to track agent activity. Agent-level governance covering permissions, roles, and scoping is planned for a future release. Compliance and security reviews go through the standard review path with your account team.

## Review related alerts and monitor history

Two additional tabs on the alert response page give you more context alongside the AI investigation:

* **Related Alerts**. Alerts related to the current one, grouped either by **Entity** (other alerts on the same entity) or by **Time** (other alerts that share a time window with this one). Each related alert shows its own AI verdict, severity, status, and duration, so you can spot a broader incident without leaving the page.
* **Monitor History**. How often this monitor has fired over the last 30 days, shown as a frequency heatmap, along with the median alert duration and a list of past firings and their verdicts. Use this to judge whether the current alert is a one-off or part of a recurring pattern.

The **Alert Detail** tab also surfaces **Log Fluctuations**, comparing log activity for the alert's query between the current window and a prior one, so you can see what's new, missing, or changed before diving into the AI investigation.

### Continue investigating in Mobot

From the **AI Investigation** tab, you can continue the investigation conversationally in [Mobot](/docs/search/mobot/), with the full context of the investigation already loaded.

Click one of the suggested follow-up questions to autopopulate it in Mobot, or click **Ask Mobot** at the top of the alert page. When Mobot opens, it shows all AI investigation details. From here, ask a follow-up question specific to the alert you're investigating.

Here are more examples to get you started. For the most useful responses, ask questions specific to the alert you are investigating.

* `Give me a summary of what happened during this incident.`
* `What services were affected?`
* `Show me logs related to the root cause.`
* `Are there other alerts that correlate with this one?`

After each response, Mobot retains the context of your investigation and presents suggested follow-up questions. At any point, click **Open Alert** to return to the alert's details page.

## Best practices

* **Verify findings against the telemetry**. The agent is only as good as the telemetry it can reach: if the deciding data isn't in Sumo Logic, it can't see it. Check key findings against the log search or metrics query behind them before acting.
* **Keep your on-call in the loop**. The agent compresses the first phase of triage, but the engineer still owns the decision.


## Limitations

<!-- SME: confirm which of these still apply at GA versus were specific to Private Preview. -->

* **Traces and APM-based investigation**. Investigation runs across logs and metrics. Distributed trace reasoning and service map awareness are not currently part of the investigation.
* **Deduplication of investigations**. If the same incident arrives through more than one alert, you may see more than one investigation.
* **External alerts**. Investigation covers alerts from Sumo Logic monitors. Investigation from external alerting systems is planned for a future release.
* **Alerts**. Limit of 10 alerts investigated per minute.
* **Not conclusive on every alert**. A meaningful share of investigations return **Inconclusive** by design. See [AI Verdict](#ai-verdict).

## FAQ

### What is the Sumo Logic Root Cause Agent?

The Root Cause Agent is part of [Sumo Logic DojoAI](/docs/get-started/ai-machine-learning/#dojoai). It applies agentic AI reasoning to observability triage — investigating observability alerts on demand, gathering evidence across logs and metrics, and returning an evidence-backed root cause. When deeper analysis is needed, you continue the same investigation conversationally in [Mobot](/docs/search/mobot/), DojoAI's chat interface.

### How is this different from asking a chat assistant about my alerts?

A chat assistant like Mobot is a surface you type into: you ask a question, it answers. The Root Cause Agent is an investigator you launch from the **Alerts** list or an alert's details page. You start an investigation, the agent gathers evidence across your logs and metrics on its own, and the findings appear on the **AI Investigation** tab. From there, you can continue the investigation conversationally in Mobot, now with that evidence already loaded.

### How is this different from the SOC Analyst Agent?

Both are agentic investigators in DojoAI, aimed at different workflows. The [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent) triages Cloud SIEM insights for security teams and returns malicious, suspicious, or benign verdicts. The Root Cause Agent triages observability alerts for DevOps and SRE teams, investigates across logs and metrics, and returns a root cause. Both let you continue the investigation in Mobot.

### Can I connect my own tools and data sources?

<!-- SME: confirm current status for GA. The "not yet, planned for a future release" direction is corroborated by the internal DojoAI FAQs doc, which lists "External context and telemetry sources" as an Extended Preview capability. But the specific tool list below (AWS CloudWatch, GitHub, PagerDuty, feature flag tools) is NOT corroborated by that doc, the public sumologic.com copy, or the Figma designs - none of them name these tools. This list is carried over unverified from the original DOCS-1874 Private Preview doc. Confirm the list is still accurate, or genericize to match the internal doc's own wording ("external systems and data sources"). -->

Not yet. Connecting external context and telemetry sources — such as AWS CloudWatch, GitHub, PagerDuty, feature flag tools, and additional telemetry platforms — is planned for a future release. Contact your account team for availability.

### How is it priced?

Root Cause Agent investigations draw from your organization's [DojoAI Credits](/docs/get-started/ai-machine-learning/#dojoai-credits) pool, the same shared pool Mobot and the SOC Analyst Agent use. Contact your account team for pricing and promotional details.

### Is my data used to train AI models?

No. See [Is customer data or PII used to train AI models?](/docs/get-started/ai-machine-learning/#is-customer-data-or-pii-used-to-train-ai-models) in our AI and Machine Learning FAQ.

## Additional resources

* [Example Prompts for Mobot](/docs/search/mobot/example-prompts). Find more example prompts here to continue your root cause observability investigation.
* [Sumo Logic | DojoAI](https://www.sumologic.com/solutions/dojo-ai). Learn about DojoAI, Sumo Logic's multi-agent AI platform, and the other specialized agents alongside the Root Cause Agent.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). How Sumo Logic's AI agents fit alongside Mobot, the SOC Analyst Agent, and the Sumo Logic MCP server.
* [Alert Response](/docs/alerts/monitors/alert-response/). The alert page that hosts the AI Investigation tab.
* [Mobot](/docs/search/mobot/). The conversational interface for Sumo Logic's AI agents.
* [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent). The security counterpart to the Root Cause Agent — investigates Cloud SIEM insights for security teams.
