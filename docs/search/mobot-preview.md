---
id: mobot-preview
title: Sumo Logic Mobot
sidebar_label: Mobot (Preview) ✨
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

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. Features and behavior described here are subject to change before general availability.

**Participation requirement**: Access requires a signed AI addendum. This applies to all future stages (extended preview, public preview, and GA) because Mobot processes raw log data. Contact your account team if you have not yet signed the addendum.

Your feedback directly shapes the product. See [Feedback](#feedback) below.
:::

This page covers what is new in Mobot for Private Preview participants. For full reference documentation on the current GA version of Mobot, see [Sumo Logic Mobot](/docs/search/mobot/).

Mobot is Sumo Logic's next-generation AI assistant for log analysis and investigation. It serves as the unified "AI front door" for all natural language questions, automatically routing your requests to the right capability without requiring you to manually select an agent.

Mobot functions as a collaborative thinking partner. It understands intent from open-ended questions, plans and executes multi-step analysis behind the scenes, and delivers structured, narrative-driven answers with suggested next steps. Whether you're troubleshooting an incident, analyzing trends, or exploring your data, Mobot helps analysts of all skill levels reach decisions faster.

## What's new

| | Before | Now |
|:--|:--|:--|
| **Interface** | Separate Query Agent and Knowledge Agent selection | Unified interface with no manual agent selection required |
| **Routing** | Manual | Automatic routing to the right skill based on your question |
| **Reasoning** | Natural language to log query translation | Higher-order reasoning, planning, and implicit log analysis |
| **Results rendering** | Query results open in Log Search | Results render as structured tables inline in the conversation |
| **Anomaly surfacing** | Not available | Notable findings callout flags patterns and suggests next steps |
| **Missing data sources** | Returns no results or an error | Detects missing partitions or indexes and provides setup guidance |
| **Log support** | Structured and semi-structured logs | Structured, semi-structured, and unstructured logs |
| **Conversation history** | 24 hours | Retained indefinitely (subject to change) |
| **Follow-up guidance** | Suggested follow-up queries | Suggested follow-up questions guiding next investigation steps |
| **Feedback** | Thumbs up/down | Thumbs up/down + shareable conversation URL |

## Getting started

To open Mobot, click **Mobot** in the left nav.

Type your question in the **Ask Something** field and press Enter or click the send button. You can ask a data question (for example, `Show me logs from last 15 minutes`) or a platform question (for example, `How do I set up an OTel Collector?`).

<img src={useBaseUrl('img/search/mobot/ask-something-mobotv2.png')} alt="Mobot interface showing unified prompt input" style={{border: '1px solid gray'}} width="700" />

## How Mobot works

### Automated routing

Mobot automatically routes your question to the appropriate skill:

- **Log analysis**. For questions about your data, including errors, trends, anomalies, and security events.
- **Platform how-to**. For questions about using Sumo Logic, including configuration, setup, and best practices.

You no longer need to choose between Query Agent and Knowledge Agent. Mobot handles this for you.

### Understanding and guiding intent

Mobot interprets natural language questions even when they are incomplete or ambiguous. If your question falls outside available data or system capabilities, Mobot clarifies or redirects rather than returning an error.

### Thinking and planning

While Mobot processes your question, it displays a thinking or planning indicator showing that it is identifying relevant data sources and analyzing the problem. Behind the scenes, Mobot selects relevant data sources, schema, and lookup tables, infers time ranges based on context, and retrieves log data enriched with environmental context.

<img src={useBaseUrl('img/search/mobot/inline-results-mobotv2.png')} alt="Mobot inline results with thinking state" style={{border: '1px solid gray'}} width="700" />

### Clarification prompts

If your question is ambiguous, Mobot asks a targeted follow-up question to narrow intent before running a search. For example, asking `Show me logs from last 15 minutes` without specifying a source prompts Mobot to ask which application, service, or log source you are interested in, with inline examples such as `kubernetes`, `nginx`, or `auth_logs`.

Respond with a source name, source category expression, or any keyword related to what you are looking for.

<img src={useBaseUrl('img/search/mobot/clarification-prompt-mobotv2.png')} alt="Mobot clarification prompt" style={{border: '1px solid gray'}} width="700" />

### Multi-step analysis

Mobot orchestrates multi-step analysis automatically. It translates your question into the appropriate analytical steps, applies multi-step reasoning to synthesize findings, and presents results as a structured response with suggested next steps.

### Notable findings

After returning results, Mobot summarizes anything that stands out at the bottom of the response, labeled **Notable**. For example, if `WARN` entries share an unusual pattern, Mobot flags them, explains what they may indicate, and asks whether you want to investigate further.

### Follow-up guidance

After each result, Mobot suggests follow-up questions to guide your investigation forward. Click a suggestion to continue the conversation, or type your own refinement.

### Platform how-to answers

When your question is about using Sumo Logic rather than your data, Mobot routes it automatically to platform guidance without requiring you to switch agents.

<img src={useBaseUrl('img/search/mobot/platform-how-to-mobotv2.png')} alt="Mobot platform how-to answer" style={{border: '1px solid gray'}} width="700" />

### Configuration gap detection

When you request data from a source that has not been configured, Mobot detects the missing partition or index and provides step-by-step setup guidance rather than returning an empty result.

For example, asking `Show me Cloud SIEM network records grouped by action` when Cloud SIEM is not enabled prompts Mobot to explain what is missing and walk you through how to enable it.

This detection works reactively. When you ask a question that requires a specific data source, Mobot attempts the query and detects if the partition or data does not exist. Mobot cannot proactively scan your environment or generate a list of all unconfigured integrations.

You can also use this capability on demand. For example:

- "Do I have AWS CloudTrail data?"
- "Is Kubernetes data flowing in?"
- "Do I have any threat intel lookups set up?"

### Conversation history

Mobot retains your conversation history indefinitely. To resume a previous investigation, open the **My Conversations** list and select the conversation.

:::note
Mobot does not retain memory across sessions. Each new conversation starts fresh with no context from previous sessions. If you find yourself re-explaining a problem or correcting earlier assumptions, start a new conversation.
:::

### Share a conversation

To share feedback or collaborate on an investigation, copy the conversation URL directly from the interface.

## Unstructured logs support

Mobot includes built-in support for unstructured logs (raw, text-based log data that does not follow a structured format like JSON). You can ask questions in plain English and get meaningful results from nearly any log data, without requiring Field Extraction Rules (FERs).

### What's new

Previously, Mobot worked best on structured (JSON) logs. With this preview release, Mobot automatically applies parsing logic to unstructured logs, even if no FERs are configured.

At this stage, Mobot prioritizes unstructured logs that are already used in dashboards, allowing it to surface insights from high-value log sources out-of-the-box. This means it will not interpret all raw logs yet, but support is actively being expanded beyond dashboards.

- **Broader coverage**. Mobot parses and generates insights from unstructured log formats, even without FERs, making it useful for environments that include custom or inconsistent log types.
- **Improved usability**. Ask questions in natural language. Mobot interprets your intent and suggests relevant searches, even for raw, non-JSON logs.
- **Performance and reliability**. Response times and suggestion accuracy are consistent with Mobot's structured log experience.
- **Security and compliance**. The same strict data handling and privacy standards apply. Unstructured logs support builds on Mobot's secure foundation.

### Common use cases

- **General log exploration**. Ask questions about unstructured logs already used in your dashboards, even if they lack predefined fields.
- **Error triage**. Investigate frequently visualized log data to surface patterns and recurring issues in unstructured formats.
- **Security insights**. Detect anomalies or signs of failed logins by querying raw logs already powering security dashboards.
- **Smarter prioritization**. Mobot focuses on unstructured logs that are visualized in dashboards, helping you get meaningful insights from high-value data sources.

## Example prompts

Mobot works best when you start with a business question, not a query. Ask questions the way you naturally think about a problem, then refine through conversation.

**Tips:**
- Start broad, then refine with follow-up questions.
- Do not worry about structure. Mobot will guide you.
- If Mobot needs more context, provide a hint such as a data source, lookup table, or field name.

### Developer and SRE

- "What does the error trend look like for my service over the past 24 hours?"
- "Are any services consistently breaching indexing latency SLOs?"

Follow-up examples:
- "Which instances are most impacted?"
- "When did this start?"

### Security analyst

- "Have there been any recent phishing attempts?"
- "Are there any unusual authentication patterns in our environment?"

Follow-up examples:
- "Which users are involved?"
- "Is this activity increasing over time?"

## Limitations

Mobot is in Private Preview and has the following known limitations.

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
- Legal, safety, and content guardrails are in progress and will continue to be strengthened.

## Example workflows

### Log investigation

1. Ask a broad question, for example: `Show me API errors from the last hour`.<br/>Mobot returns error logs from the relevant source, showing `ERROR` and `WARN` level entries with timestamps, status codes, and error messages.
1. Refine the results, for example: `Filter to 500 errors only`.<br/>The Notable findings callout flags the most common error pattern and suggests investigating further.
1. Dig deeper, for example: `Group by endpoint and count`.<br/>Results narrow the investigation to the specific API route generating most errors.
1. Correlate, for example: `Show me deployment logs around that time`.<br/>Mobot retrieves deployment events and identifies a deployment that occurred shortly before the error spike.

### Observability investigation

1. Type a question in plain English, for example: `Show me error trends for the payment service over the last 24 hours`.
1. Mobot identifies the relevant data source, runs the analysis, and returns results.
1. Review the results and click a suggested follow-up to drill deeper, for example: `Which error codes are most common?`
1. Continue refining conversationally until you reach a conclusion.

### Cloud SIEM security investigation

1. Specify the Cloud SIEM source in your question, for example: `Show me malicious network activity from _index=sec_record_network`.
1. Mobot routes the question to log analysis and returns results.
1. Click a suggested follow-up or type a refinement to identify patterns.
1. Continue the investigation to isolate affected users or IPs.

## FAQ

<details>
<summary>What's new in this preview release?</summary>

This release replaces the manual Query Agent and Knowledge Agent selection with a unified interface and automated routing. It adds higher-order reasoning, multi-step analysis, support for unstructured logs, and extended conversation history.
</details>

<details>
<summary>Do I need to select an agent?</summary>

No. Mobot automatically determines the best way to answer your question based on what you ask.
</details>

<details>
<summary>What happened to Query Agent and Knowledge Agent?</summary>

The underlying capabilities are still there, but you no longer select them manually. Mobot routes data questions and how-to questions automatically based on your input.
</details>

<details>
<summary>Can Mobot detect what sources or integrations I do not have set up?</summary>

Mobot can detect missing sources or partitions reactively. When you ask a question that requires a specific data source, Mobot attempts the query and detects if the partition or data does not exist, then provides setup guidance. Mobot cannot proactively scan your environment and generate a list of all unconfigured integrations.
</details>

<details>
<summary>Is Mobot an investigation or SRE agent?</summary>

No. Mobot is a unified conversational interface for interacting with your data, with initial capabilities focused on log analysis. It can support investigation-style workflows such as troubleshooting and pattern exploration, but that is one type of outcome, not its primary role. The goal is to let you talk to your data, explore and refine answers conversationally, and let Mobot guide analysis and retrieve relevant log data.
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
<summary>How do I share feedback?</summary>

Use the thumbs up or thumbs down icons to rate results, or copy the conversation URL from the interface to share a specific session with your account representative.
</details>

## Feedback

Your feedback directly shapes Mobot before general availability. Use the thumbs up and thumbs down icons in the conversation to rate individual responses.

To report an issue, copy the conversation URL and share it with your Sumo Logic contact. When sharing feedback, it helps to note:

- What you asked.
- What you expected.
- What Mobot returned instead.
- Whether the issue was prompt comprehension, context understanding, answer accuracy, answer clarity, or something else.

## Additional resources

- [Sumo Logic Mobot](/docs/search/mobot/).
- [Search Query Language](/docs/search/search-query-language).
- [Dashboards](/docs/dashboards).
