---
id: mobot-preview
title: Sumo Logic Mobot (Extended Preview)
description: Mobot is Sumo Logic's next-generation AI assistant that unifies log analysis and platform guidance in a single conversational interface with automated routing and higher-order reasoning.
keywords:
  - mobot
  - ai assistant
  - artificial intelligence
  - log analysis
  - unstructured logs
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-extended">Extended Preview</span></a></p>

:::info Participation requirement
Access requires a signed AI addendum. This applies to all future stages (public preview and GA) because Mobot uses AI to make inferences on log data. Contact your account team if you have not yet signed the addendum.
:::

This preview introduces a new iteration of [Sumo Logic Mobot](/docs/search/mobot/) that functions as a conversational intelligence layer between you and your data. It understands intent from open-ended questions, plans and executes multi-step analysis behind the scenes, and delivers structured, narrative-driven answers with suggested next steps. Because Mobot carries context across turns, follow-up questions, refinements, and changes in direction feel part of the same flow.

Your feedback directly shapes the product. See [Feedback](#feedback) below.

## What's new

Features and behavior described here are subject to change before general availability.

| | Before | Now |
|:--|:--|:--|
| **[Interface and routing](#unified-interface-and-intent-understanding)** | Separate Query Agent and Knowledge Agent with manual selection | Agent automatically uses available capabilities behind the scenes |
| **[Reasoning and complex log analysis](#reasoning-and-complex-log-analysis)** | Natural language to log query translation | Higher-order reasoning, planning, and implicit log analysis |
| **[Results rendering](#results-rendering)** | Query results open in Log Search | Query results render as narrative summaries with structured tables inline in the conversation, plus an option to open in Log Search |
| **[Log support](#unstructured-logs-support)** | Structured and semi-structured logs | Structured, semi-structured, and [unstructured logs](#unstructured-logs-support) |

### Unified interface and intent understanding

With Mobot's new unified interface, you no longer need to choose between Query Agent (for log analysis questions) and Knowledge Agent (platform how-to questions).

Just [open Mobot](/docs/search/mobot#getting-started) and enter a question in the **Ask Something** field.

<img src={useBaseUrl('img/search/mobot/ask-something-mobotv2.png')} alt="Mobot interface showing unified prompt input" style={{border: '1px solid gray'}} width="600" />

Try asking a log analysis question (errors, trends, anomalies, or security events) or a platform how-to question (configuration, setup, or best practices). Mobot automatically routes your question to the appropriate capability. Here are some example questions:

<details>
<summary><b>Q:</b> <code>I'm getting reports that users can't log in. Is auth-service having issues?</code></summary>

<img src={useBaseUrl('img/search/mobot/auth-service-issues-mobotv2.png')} alt="Mobot log analysis answer showing auth service error trend" style={{border: '1px solid gray'}} width="800" />

</details>

<details>
<summary><b>Q:</b> <code>What does the error trend look like for my service over the past 24 hours?</code></summary>

<img src={useBaseUrl('img/search/mobot/org-service-errors-mobotv2.png')} alt="Mobot log analysis answer showing service error trend over 24 hours" style={{border: '1px solid gray'}} width="800" />

</details>

### Reasoning and complex log analysis

While Mobot processes your question, it displays a **Thinking...** or **Planning...** indicator showing that it is identifying relevant data sources and analyzing the problem. Behind the scenes, Mobot selects relevant data sources and saved queries, infers time ranges based on context, and retrieves log data.

Mobot orchestrates multi-step analysis automatically. It translates your question into the appropriate analytical steps, applies multi-step reasoning to synthesize findings, and presents results as a structured response with suggested next steps.

### Results rendering

When Mobot returns query results, they appear as structured narratives, basic visualization like table summaries, plus a shortcut button to expand on results in a separate Log Search view.

In this example, Mobot summarizes what stands out at the bottom of the response, labeled **Notable**. For example, if `WARN` entries share an unusual pattern, Mobot flags them, explains what they may indicate, and asks whether you want to investigate further.

<img src={useBaseUrl('img/search/mobot/inline-results-mobotv2.png')} alt="Mobot inline results with thinking state" style={{border: '1px solid gray'}} width="700" />

Here's another example showing Mobot displaying inline results and summarizing key observations below it:

<img src={useBaseUrl('img/search/mobot/inline-results-summary-mobotv2.png')} alt="Mobot inline results table with key observations" style={{border: '1px solid gray'}} width="700" />

### Clarification prompts

Mobot interprets natural language questions even when they are incomplete or ambiguous. If your question is unclear, Mobot asks a targeted follow-up question to narrow intent before running a search.

For example, asking `Show me logs from last 15 minutes` or `Show me all logs from the last 24 hours` without specifying a source prompts Mobot to ask which application, service, or log source you are interested in, with inline examples such as `kubernetes`, `nginx`, or `auth_logs`.

<img src={useBaseUrl('img/search/mobot/clarification-prompt-mobotv2.png')} alt="Mobot clarification prompt" style={{border: '1px solid gray'}} width="600" />

<img src={useBaseUrl('img/search/mobot/clarification-prompt-logs-mobotv2.png')} alt="Mobot clarification prompt asking for a log source" style={{border: '1px solid gray'}} width="600" />

Respond with a source name, source category expression, or any keyword related to what you are looking for. If your question falls outside available data or system capabilities, Mobot clarifies or redirects rather than returning an error.

### Unstructured logs support

Previously, Mobot worked best on structured (JSON) logs. With this preview release, Mobot can apply parsing logic to unstructured logs, even if no FERs are configured.

Now it has built-in support for unstructured logs (raw, text-based log data that does not follow a structured format like JSON). You can ask questions in plain English and get meaningful results from nearly any log data, without requiring Field Extraction Rules (FERs).

At this stage, Mobot prioritizes unstructured logs that are already used in dashboards, allowing it to surface insights from high-value log sources out-of-the-box. This means it will not interpret all raw logs yet, but support is actively being expanded beyond dashboards.

* **Broader coverage**. Mobot parses and generates insights from unstructured log formats, even without FERs, making it useful for environments that include custom or inconsistent log types.
* **Performance and reliability**. Response times and suggestion accuracy are consistent with Mobot's structured log experience.
* **Security and compliance**. The same strict data handling and privacy standards apply. Unstructured logs support builds on Mobot's secure foundation.

#### Common use cases

* **General log exploration**. Ask questions about unstructured logs already used in your dashboards, even if they lack predefined fields.
* **Error triage**. Investigate frequently visualized log data to surface patterns and recurring issues in unstructured formats.
* **Security insights**. Detect anomalies or signs of failed logins by querying raw logs already powering security dashboards.
* **Smarter prioritization**. Mobot focuses on unstructured logs that are visualized in dashboards, helping you get meaningful insights from high-value data sources.

## Example prompts

Mobot works best when you start with a business question, not a query. Ask questions the way you naturally think about a problem, then refine through conversation. Here are some tips:
- Start broad, then refine with follow-up questions.
- Do not worry about structure. Mobot will guide you.
- If Mobot needs more context, provide a hint such as a data source, lookup table, or field name.

### Developer and SRE

* `What does the error trend look like for my service over the past 24 hours?`
   * Follow up: `Which instances are most impacted?`

* `Which services have the worst P99 latency trend lately — anything persistent?`
   * Follow up: `When did this start?`

* `Show me pod crash behavior over the last 7 days.`
   * Follow up: `Are there any patterns worth paying attention to?`

* `Any pipelines failing on first run, but passing on retry this week?`
   * Follow up: `What's the flakiness pattern?`

* `Checkout-service depends on inventory-service — give me a health snapshot of both.`

### Security analyst

* `Have there been any recent phishing attempts?`
   * Follow up: `Which users are involved?`

* `Are there any unusual authentication patterns in our environment?`
   * Follow up: `Is this activity increasing over time?`

* `Any unusual login patterns or access spikes from threat intel IPs in the last 24 hours?`

### Product and research

* `What integrations does Sumo Logic support for cloud security?`

## Limitations

Mobot is in Extended Preview and has the following known limitations.

**Use cases**
* Log analysis only. Metrics, traces, and other telemetry types are not supported.
* Domain intelligence and planning are still evolving.

**Access and actions**
* Read-only. Mobot can query and analyze data but cannot modify, delete, ingest data, manage dashboards or monitors, or access external systems.

**Data and query constraints**
* Only works with data that has been ingested and is still within your retention period.
* Large time ranges (30 or more days) or deeply nested queries may be slow, time out, or hit platform limits.

**Experience**
* Performance and latency may vary depending on query complexity.
* Responses may not always be fully accurate or complete.
* No memory across sessions. Each conversation starts fresh.

## FAQ

### What's new in this preview release?

This release replaces the manual Query Agent and Knowledge Agent selection with a unified interface and automated routing. It adds higher-order reasoning, multi-step analysis, and support for unstructured logs.

### Do I need to select an agent? What happened to Query Agent and Knowledge Agent?

No. The underlying capabilities are still there, but you no longer select them manually. Mobot automatically routes data questions to log analysis and how-to questions to platform guidance based on what you ask.

### Can Mobot detect what sources or integrations I do not have set up?

Mobot can detect missing sources or partitions reactively. When you ask a question that requires a specific data source, Mobot attempts the query and detects if the partition or data does not exist, then provides setup guidance. Mobot cannot proactively scan your environment and generate a list of all unconfigured integrations.

### When should I start a new conversation instead of continuing the same one?

Start a new conversation when you are switching to a completely different topic, the current thread has gone in the wrong direction, or you want to reset context. Continue the same conversation when you are refining or digging deeper into the same question, or exploring a problem through multiple follow-up questions. If you find yourself re-explaining the problem or correcting earlier assumptions, it is usually better to start a new conversation.

### Will Mobot interpret all my unstructured logs?

Mobot prioritizes unstructured logs that are already used in dashboards. This improves the relevance of insights and helps focus on high-value data sources.

### How is unstructured log support different from structured log support?

Structured logs have predefined fields, allowing Mobot to map queries directly. For unstructured logs, Mobot uses AI and parsing techniques to infer structure on the fly.

### Will Mobot support additional capabilities over time?

Yes. Mobot is designed to be extensible. Over time, more capabilities can be added as teams across the platform contribute new features. The current preview focuses on log analysis and platform how-to guidance, with additional capabilities planned for future releases.

## Feedback

Your input directly shapes Mobot before general availability. For ways to rate responses or report issues, see [Feedback](/docs/search/mobot#feedback).
