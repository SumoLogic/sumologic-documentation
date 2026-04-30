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
Access requires a signed AI addendum. This applies to all future stages (public preview and GA) because Mobot processes raw log data. Contact your account team if you have not yet signed the addendum.
:::

This preview introduces a new iteration of [Sumo Logic Mobot](/docs/search/mobot/) that functions as a conversational intelligence layer between you and your data. It understands intent from open-ended questions, plans and executes multi-step analysis behind the scenes, and delivers structured, narrative-driven answers with suggested next steps. Because Mobot carries context across turns, follow-up questions, refinements, and changes in direction feel part of the same flow.

Your feedback directly shapes the product. See [Feedback](#feedback) below.

## What's new

Features and behavior described here are subject to change before general availability.

| | Before | Now |
|:--|:--|:--|
| **[Interface and routing](#united-interface)** | Separate Query Agent and Knowledge Agent with manual selection | Unified interface with automatic routing to the right skill |
| **[Reasoning](#thinking-and-planning)** | Natural language to log query translation | Higher-order reasoning, planning, and implicit log analysis |
| **[Results rendering](#results-rendering)** | Query results open in Log Search | Query results render as structured table summaries inline in the conversation, plus option to open in Log Search |
| **[Anomaly surfacing](#results-rendering)** | Not available | Highlights unusual patterns and suggests next steps |
| **[Missing data sources](#configuration-gap-detection)** | Returns no results or an error | Detects missing partitions or indexes and provides setup guidance |
| **[Log support](#unstructured-logs-support)** | Structured and semi-structured logs | Structured, semi-structured, and unstructured logs |
| **[Conversation history](#conversation-history)** | 24 hours | Retained indefinitely (subject to change) |
| **[Feedback](#feedback)** | Thumbs up/down | Thumbs up/down + shareable conversation URL |

### United interface

You no longer need to choose between Query Agent and Knowledge Agent. Mobot handles this for you.

Open Mobot by clicking **Mobot** in the left nav. Then type your question in the **Ask Something** field.

<img src={useBaseUrl('img/search/mobot/ask-something-mobotv2.png')} alt="Mobot interface showing unified prompt input" style={{border: '1px solid gray'}} width="600" />

Try asking:

* A log analysis question about errors, trends, anomalies, or security events (for example, `Show me logs from last 15 minutes`).
* A platform how-to question about configuration, setup, or best practices (for example, `How do I set up an OTel Collector?`).

Mobot automatically routes your question to the appropriate skill, as seen here:

<img src={useBaseUrl('img/search/mobot/platform-how-to-mobotv2.png')} alt="Mobot platform how-to answer" style={{border: '1px solid gray'}} width="700" />

### Thinking and planning

While Mobot processes your question, it displays a **Thinking...** or **Planning...** indicator showing that it is identifying relevant data sources and analyzing the problem. Behind the scenes, Mobot selects relevant data sources, schema, lookup tables, and saved queries, infers time ranges based on context, and retrieves log data enriched with environmental context.

### Multi-step analysis

Mobot orchestrates multi-step analysis automatically. It translates your question into the appropriate analytical steps, applies multi-step reasoning to synthesize findings, and presents results as a structured response with suggested next steps.

### Results rendering

When Mobot returns results, they appear summarized inline as structured tables directly in the conversation, plus a shortcut button to expand on results in a separate Log Search view.

In this example, Mobot summarizes what stands out at the bottom of the response, labeled **Notable**. For example, if `WARN` entries share an unusual pattern, Mobot flags them, explains what they may indicate, and asks whether you want to investigate further.

<img src={useBaseUrl('img/search/mobot/inline-results-mobotv2.png')} alt="Mobot inline results with thinking state" style={{border: '1px solid gray'}} width="700" />

Here's another example showing Mobot displaying inline results and summarizing key observations below it:

<img src={useBaseUrl('img/search/mobot/inline-results-summary-mobotv2.png')} alt="Mobot inline results table with key observations" style={{border: '1px solid gray'}} width="700" />

### Clarification prompts

Mobot interprets natural language questions even when they are incomplete or ambiguous. If your question is unclear, Mobot asks a targeted follow-up question to narrow intent before running a search.

For example, asking `Show me logs from last 15 minutes` or `Show me all logs from the last 24 hours` without specifying a source prompts Mobot to ask which application, service, or log source you are interested in, with inline examples such as `kubernetes`, `nginx`, or `auth_logs`.

<img src={useBaseUrl('img/search/mobot/clarification-prompt-mobotv2.png')} alt="Mobot clarification prompt" style={{border: '1px solid gray'}} width="600" />

<img src={useBaseUrl('img/search/mobot/clarification-prompt-logs-mobotv2.png')} alt="Mobot clarification prompt" style={{border: '1px solid gray'}} width="600" />

Respond with a source name, source category expression, or any keyword related to what you are looking for. If your question falls outside available data or system capabilities, Mobot clarifies or redirects rather than returning an error.

### Configuration gap detection

When you request data from a source that has not been configured, Mobot detects the missing partition or index and provides step-by-step setup guidance rather than returning an empty result.

For example, asking `Show me Cloud SIEM network records grouped by action` when Cloud SIEM is not enabled prompts Mobot to explain what is missing and walks you through how to enable it.

This detection works reactively. When you ask a question that requires a specific data source, Mobot attempts the query and detects if the partition or data does not exist. Mobot cannot proactively scan your environment or generate a list of all unconfigured integrations.

You can also use this capability on demand. For example:

* `Do I have AWS CloudTrail data?`
* `Is Kubernetes data flowing in?`
* `Do I have any threat intel lookups set up?`

### Unstructured logs support

Previously, Mobot worked best on structured (JSON) logs. With this preview release, Mobot automatically applies parsing logic to unstructured logs, even if no FERs are configured.

Now it has built-in support for unstructured logs (raw, text-based log data that does not follow a structured format like JSON). You can ask questions in plain English and get meaningful results from nearly any log data, without requiring Field Extraction Rules (FERs).

At this stage, Mobot prioritizes unstructured logs that are already used in dashboards, allowing it to surface insights from high-value log sources out-of-the-box. This means it will not interpret all raw logs yet, but support is actively being expanded beyond dashboards.

* **Broader coverage**. Mobot parses and generates insights from unstructured log formats, even without FERs, making it useful for environments that include custom or inconsistent log types.
* **Improved usability**. Ask questions in natural language. Mobot interprets your intent and suggests relevant searches, even for raw, non-JSON logs.
* **Performance and reliability**. Response times and suggestion accuracy are consistent with Mobot's structured log experience.
* **Security and compliance**. The same strict data handling and privacy standards apply. Unstructured logs support builds on Mobot's secure foundation.

#### Common use cases

* **General log exploration**. Ask questions about unstructured logs already used in your dashboards, even if they lack predefined fields.
* **Error triage**. Investigate frequently visualized log data to surface patterns and recurring issues in unstructured formats.
* **Security insights**. Detect anomalies or signs of failed logins by querying raw logs already powering security dashboards.
* **Smarter prioritization**. Mobot focuses on unstructured logs that are visualized in dashboards, helping you get meaningful insights from high-value data sources.

### Conversation history

Mobot retains your conversation history indefinitely. To resume a previous investigation, open the **My Conversations** list and select the conversation.

## Example prompts

Mobot works best when you start with a business question, not a query. Ask questions the way you naturally think about a problem, then refine through conversation. Here are some tips:
- Start broad, then refine with follow-up questions.
- Do not worry about structure. Mobot will guide you.
- If Mobot needs more context, provide a hint such as a data source, lookup table, or field name.

### Developer and SRE

* `What does the error trend look like for my service over the past 24 hours?`

* `Are any services consistently breaching indexing latency SLOs?`

Follow-up:

* `Which instances are most impacted?`

* `When did this start?`

### Security analyst

* `Have there been any recent phishing attempts?`

* `Are there any unusual authentication patterns in our environment?`

Follow-up:

* `Which users are involved?`

* `Is this activity increasing over time?`

### Product and research

* `What integrations does Sumo Logic support for cloud security?`

## Limitations

Mobot is in Extended Preview and has the following known limitations.

**Use cases**
- Currently limited to log analysis.
- No support for metrics, traces, or other telemetry types.
- Capabilities are constrained by available skills. Domain intelligence and planning capabilities are still evolving.

**Access and actions**
- Read-only. Mobot can query and analyze data but cannot modify, delete, or ingest data.
- Cannot create or manage dashboards, monitors, or scheduled searches.
- No access to external systems such as CRM, databases, APIs, or third-party tools.

**Data and query constraints**
- Only works with data that has been ingested and is still within your retention period.
- Large time ranges (30 or more days) may be slow or time out.
- Very complex or deeply nested queries may hit platform limits.

**Experience**
- Performance and latency may vary depending on query complexity.
- Responses may not always be fully accurate or complete.
- Ambiguous questions may require clarification before Mobot can proceed.
- No memory across sessions. Each conversation starts fresh.

## FAQ

<details>
<summary>What's new in this preview release?</summary>

This release replaces the manual Query Agent and Knowledge Agent selection with a unified interface and automated routing. It adds higher-order reasoning, multi-step analysis, support for unstructured logs, and extended conversation history.
</details>

<details>
<summary>Do I need to select an agent? What happened to Query Agent and Knowledge Agent?</summary>

No. The underlying capabilities are still there, but you no longer select them manually. Mobot automatically routes data questions to log analysis and how-to questions to platform guidance based on what you ask.
</details>

<details>
<summary>Can Mobot detect what sources or integrations I do not have set up?</summary>

Mobot can detect missing sources or partitions reactively. When you ask a question that requires a specific data source, Mobot attempts the query and detects if the partition or data does not exist, then provides setup guidance. Mobot cannot proactively scan your environment and generate a list of all unconfigured integrations.
</details>


<details>
<summary>Does Mobot retain memory across sessions?</summary>

No. Mobot does not retain memory across sessions. Each new conversation starts fresh. Conversation history is retained so you can review past sessions, but Mobot does not carry context from one conversation into another.
</details>

<details>
<summary>When should I start a new conversation instead of continuing the same one?</summary>

Start a new conversation when you are switching to a completely different topic, the current thread has gone in the wrong direction, or you want to reset context. Continue the same conversation when you are refining or digging deeper into the same question, or exploring a problem through multiple follow-up questions. If you find yourself re-explaining the problem or correcting earlier assumptions, it is usually better to start a new conversation.
</details>

<details>
<summary>How long is conversation history retained?</summary>

Mobot currently retains conversation history indefinitely. Retention limits are being evaluated and may change before General Availability.
</details>

<details>
<summary>Will Mobot interpret all my unstructured logs?</summary>

Mobot prioritizes unstructured logs that are already used in dashboards. This improves the relevance of insights and helps focus on high-value data sources.
</details>

<details>
<summary>How is unstructured log support different from structured log support?</summary>

Structured logs have predefined fields, allowing Mobot to map queries directly. For unstructured logs, Mobot uses AI and parsing techniques to infer structure on the fly.
</details>

<details>
<summary>Will Mobot support additional capabilities over time?</summary>

Yes. Mobot is designed to be extensible. Over time, more skills can be added as teams across the platform contribute new capabilities. The current preview focuses on log analysis and platform how-to guidance, with additional skills planned for future releases.
</details>

## Feedback

Your feedback directly shapes Mobot before general availability. Use the thumbs up and thumbs down icons in the conversation to rate individual responses.

To report an issue, copy the conversation URL and share it with your Sumo Logic contact. When sharing feedback, it helps to note:

- What you asked.
- What you expected.
- What Mobot returned instead.
- Whether the issue was prompt comprehension, context understanding, answer accuracy, answer clarity, or something else.
