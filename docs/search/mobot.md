---
id: mobot
title: Sumo Logic Mobot
sidebar_label: Mobot ✨
description: Accelerate troubleshooting and platform learning with Mobot, Sumo Logic's AI-powered conversational assistant. Ask questions in plain English to analyze log data or get answers sourced from official documentation.
keywords:
  - copilot
  - mobot
  - artificial intelligence
  - ai
  - machine learning
  - ml
  - dojo ai
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

Mobot is Sumo Logic's AI-powered conversational assistant. Ask a question in plain English and Mobot handles the rest: it performs higher-level reasoning to understand your intent, asks follow-up questions when needed, analyzes log data behind the scenes, and surfaces findings directly in the conversation.

You do not need to select an agent or know which query to write. Mobot automatically determines whether your question is a data analysis request or a platform how-to question and responds accordingly. For data questions, Mobot identifies relevant sources, correlates information across logs, and returns inline results with anomaly callouts and suggested next steps. For how-to questions, Mobot returns structured answers sourced from Sumo Logic documentation, with reference links for deeper reading.

Mobot tracks your intent across a conversation, so you can refine, pivot, and dig deeper without starting over.

:::training Sumo Logic Academy

import SumoAcademy from '../reuse/sumo-logic-academy.md';

<SumoAcademy/>

* **Self-paced**: [Mobot Essentials Self Paced](https://learn.sumologic.com/mobot-101)
* **Instructor-led virtual classes**: [Workshops: Mobot Essentials](https://www.sumologic.com/learn/training?_workshops=mobot-essentials#section-2)
:::

## Key capabilities

* **Unified conversational interface**. Ask data questions and platform how-to questions in the same conversation. Mobot routes each question to the appropriate capability automatically.
* **Clarification when intent is ambiguous**. If your question could match multiple sources or interpretations, Mobot asks a targeted follow-up with examples to narrow intent before running the analysis.
* **Configuration gap detection**. When you request data from a source that hasn't been configured, Mobot detects the missing partition or index and provides step-by-step setup guidance to enable it.
* **Inline results and anomaly detection**. Results render directly in the conversation as structured tables. Mobot summarizes notable findings, such as unexpected warning patterns or missing services, and suggests where to investigate next.
* **Higher-level reasoning and implicit analysis**. Mobot plans and executes complex analyses behind the scenes, correlating information across data sources and applying multi-step reasoning to synthesize findings without requiring you to specify each step.
* **Contextual understanding**. Mobot considers relevant data sources, schema, lookup tables, historical queries, dashboards, and time range to improve accuracy.
* **Auto-visualization**. Generate charts automatically from search results and add them to dashboards.
* **Broad log compatibility**. Works with structured and semi-structured logs. To analyze unstructured logs (for example, Palo Alto Firewall), apply Field Extraction Rules first.
* **Dashboard-aware translations (via RAG)**. Mobot learns from dashboards opened in your org in the last 90 days to better understand your intent and data structure.
* **Documentation-grounded how-to answers**. Platform questions return answers sourced from official Sumo Logic documentation, with reference links.
* **Conversation history**. All conversations are saved automatically for 30 days. Resume, revisit, or branch prior investigations without losing context.

## Who benefits from Mobot?

Mobot is useful across experience levels:

* **On-call engineers and security teams**. Accelerate incident resolution by surfacing troubleshooting and security insights rapidly without writing queries from scratch.
* **Early career professionals**. Investigate incidents without needing to learn query syntax.
* **Practitioners**. Speed up workflows with context-aware analysis for frequent tasks.
* **Experts**. Get assistance crafting complex queries and correlating across data sources efficiently.

## Getting started

To open Mobot, click **Mobot** in the left nav.

### Ask a question

Type your question in the **Ask Something** field and press Enter or click the send button.

<img src={useBaseUrl('img/search/mobot/ask-something.png')} alt="Mobot 'Ask Something' text input field for entering natural language questions" style={{border: '1px solid gray'}} width="500" />

You can ask a data question (for example, "Show me logs from last 15 minutes") or a platform question (for example, "How do I set up an OTel Collector?").

### Clarification prompts

If your question is ambiguous or does not match a specific source, Mobot asks a targeted follow-up question before running the analysis. The clarification message explains what additional information is needed and provides inline examples you can reference or type directly.

For example, asking "Show me logs from last 15 minutes" without specifying a source prompts Mobot to ask which application, service, or log source you are interested in, with inline examples such as `kubernetes`, `nginx`, `us2/logs`, or `auth_logs`.

<img src={useBaseUrl('img/search/mobot/clarification-prompt.png')} alt="Mobot clarification prompt asking user to specify data source with inline examples" style={{border: '1px solid gray'}} width="600" />

Respond with a source name, source category expression, or any keyword related to what you are looking for.

### Execution steps and inline results

After you respond, Mobot displays a thinking or planning indicator while it identifies relevant data sources and analyzes the problem. Once complete, Mobot displays the steps it performed as pill-style indicators in the conversation (for example, **Recent logs from service**). Results render as a structured table directly in the conversation, including Timestamp, Level, Logger, and Message columns for log results.

<img src={useBaseUrl('img/search/mobot/inline-results.png')} alt="Mobot conversation showing inline log results in table format with timestamp, level, and message columns" style={{border: '1px solid gray'}} width="400" />

### Notable findings

After returning results, Mobot summarizes anything that stands out. For example, if two `WARN` entries share an unusual pattern, Mobot flags them, explains what they may indicate, and asks whether you want to investigate further.

This callout appears at the bottom of the response, labeled **Notable**.

### Follow-up guidance

Mobot suggests follow-up questions to guide you through the next steps of your investigation. These suggestions appear in the interface and help you explore the data without needing to formulate queries from scratch. You can click a suggestion or type your own question to continue the conversation.

## Example workflow: Log investigation

This example demonstrates investigating API errors using conversational refinements. Each step builds on the previous context without repeating filters.

### Identify the issue

You receive an alert about elevated error rates in your API service. Start broadly:

**You ask**: "Show me API errors from the last hour"

Mobot returns error logs from `_sourceCategory=api/production`, showing ERROR and WARN level entries with timestamps, status codes, and error messages.

### Narrow to specific errors

Review the results and notice a pattern of 500 errors. Refine:

**You ask**: "Filter to 500 errors only"

Mobot updates the query to show only 500-level server errors. In the Notable findings callout, Mobot flags that 87% of these errors reference "database connection timeout" and suggests investigating connection pool saturation.

### Identify the scope

**You ask**: "Group by endpoint and count"

Results show that `/api/v2/users/profile` accounts for 73% of the 500 errors, while other endpoints remain healthy. This narrows the investigation to a specific API route.

### Analyze timing

**You ask**: "Show error count per minute as a line chart"

The visualization reveals that errors spiked starting at 14:23 UTC and have remained elevated. This timing correlation helps identify when the issue began.

### Correlate with deployments

**You ask**: "Show me deployment logs around 14:20"

Switching context, Mobot retrieves deployment events and identifies that the user-service was deployed at 14:18 UTC—just five minutes before the error spike began.

### Next steps

In five conversational turns, you moved from a vague alert to:

* Identifying the specific error type (500 errors with database timeouts)
* Isolating the affected endpoint (`/api/v2/users/profile`)
* Establishing the timeline (spike at 14:23 UTC)
* Correlating with a recent deployment (14:18 UTC)

From here, [open the query in Log Search](#open-in-log-search) to create a monitor, investigate the deployment diff, or roll back the change.

## Example workflow: Cloud SIEM investigation

You're a SecOps engineer using [Cloud SIEM](/docs/cse/) and receive an alert about suspicious network activity. Here's how to investigate using natural language.

### Review network activity

**Ask**: "Show me Cloud SIEM network records grouped by action"

Mobot returns network activity categorized by action type (Allowed, Blocked, Malicious, etc.).

<img src={useBaseUrl('img/search/mobot/cloud-siem-1.png')} alt="Mobot showing Cloud SIEM network records grouped by action type" style={{border: '1px solid gray'}} width="500" />

### Focus on malicious events

Notice "Malicious" appears in the results. **Ask**: "Show me only the malicious activity"

Mobot filters to show just the malicious network events.

<img src={useBaseUrl('img/search/mobot/cloud-siem-2.png')} alt="Mobot Cloud SIEM results filtered to show only malicious network activity" style={{border: '1px solid gray'}} width="800" />

:::note
If searching doesn't return results, try "Malicious*" with a wildcard. Searches are case-sensitive.
:::

### Identify affected resources

**Ask**: "Which URLs and users are involved?"

Mobot breaks down the malicious activity by target URLs and affected user accounts, helping you identify attack patterns and compromised credentials.

<img src={useBaseUrl('img/search/mobot/cloud-siem-3.png')} alt="Mobot Cloud SIEM breakdown showing affected URLs and user accounts from malicious activity" style={{border: '1px solid gray'}} width="800" />

### Next steps

In three conversational turns, you went from a general alert to:

* Reviewing all network activity types
* Isolating malicious events
* Identifying specific URLs targeted and users affected

Even if the activity was blocked, investigate the affected users in Cloud SIEM's endpoint records to check for lateral movement or other indicators of compromise.

## Example workflow: Detecting missing data sources

Mobot can detect when you request data from a source that hasn't been configured yet and provide setup guidance. This works across security and platform use cases.

### Cloud SIEM example

**Ask**: "Show me Cloud SIEM network records grouped by action"

If Cloud SIEM isn't enabled in your environment, Mobot detects the missing `sec_record_network` partition and explains what's needed:

1. **Enable Cloud SIEM** — go to Administration → Cloud SIEM Enterprise
2. **Set up log mappings** — map your network data sources (firewalls, proxies, IDS/IPS) to the Network record type under Cloud SIEM → Log Mappings
3. **Forward logs** — ensure collectors tag logs with `_siemForward=true`

Once configured, `_index=sec_record_network` becomes available.

### Platform data example

**Ask**: "Do I have AWS CloudTrail data?"

If CloudTrail isn't configured, Mobot checks common source categories and partitions, then provides setup guidance:

1. **Create an AWS CloudTrail source** — configure an S3 source to collect CloudTrail logs from your S3 bucket
2. **Verify IAM permissions** — ensure the role has `s3:GetObject` and `s3:ListBucket` permissions
3. **Set source category** — tag the source with a category like `aws/cloudtrail` for easy querying

Use natural language to ask what you're looking for. For better results, include the name of the data source you're querying and any related fields or values. If you don't select a source, Query Agent chooses one automatically based on your question.

For example, if you enter "Show me recent user-service logs", Query Agent selects the correct source category and returns recent events. An intent card appears in the conversation pane summarizing your goal. Query Agent then surfaces suggested follow-up queries with related refinements you can click.

#### Identify patterns

After you click a follow-up suggestion or type a refinement, Query Agent refreshes the results and updates the intent card and query to reflect the new focus. With each refinement, Query Agent adjusts the query, applies the changes, and renders a visual chart.

For example, asking "What's the request volume by service?" would aggregate traffic by service. Query Agent might surface that user-service has 3× higher requests than baseline, while other services remain healthy—suggesting a traffic surge on one service.

#### Analyze geographic distribution

As you go, Query Agent presents new suggestions to help you pivot into related questions. The intent card expands each time to include the new scope, and results show additional details.

For example, asking "Where are these requests coming from?" aggregates by geography. Query Agent might reveal that 80% of requests originate from France, with elevated activity from China, Netherlands, and India—a geographic clustering pattern consistent with coordinated attacks.

#### Examine error patterns and sources

Query Agent maintains context from previous questions, so you can continue refining without repeating filters. For example, asking "What status codes are returned by the register API?" shows that over 85% of requests are failing with 503 errors. Following up with "Which IPs are behind these 503 errors?" reveals that two IPs account for over 97% of the failed traffic.

#### Validate with threat intelligence

You can enrich findings by asking Query Agent to cross-reference with external data. For example, "Check these IPs against threat intel" would reveal if the source IPs are flagged as known malicious actors, confirming whether the incident is an attack or organic load.

#### Next steps

In just a few conversational turns, we went from an initial alert to confirming a DDoS attack with:

* Identified affected services and APIs
* Traced attack origin to specific geographic regions and IPs
* Validated malicious actors using threat intelligence
* Quantified impact on latency and error rates

From here, you can continue refining or take action like blocking malicious IPs, [opening the query in Log Search](#open-in-log-search), [adjusting the time range](#time-range), [editing the query logic](#edit-query-code), or [starting over with a new chat](#new-conversation).

### Working with Query Agent

#### Time range

By default, Query Agent searches run with a 15-minute time range. If your search does not return any results, consider expanding the time range.

Click the clock icon (see below), select your desired time range from the dropdown, then click the blue search button.

<img src={useBaseUrl('img/search/mobot/time-period.png')} alt="Mobot time period" style={{border: '1px solid gray'}} width="400" />

#### Chart type

Query Agent automatically visualizes your data. For example, a query like "Top ip by geo" triggers a geo lookup and displays results on a map.

<img src={useBaseUrl('img/search/mobot/geo-chart.png')} alt="Mobot chart types" style={{border: '1px solid gray'}} width="800" />

Select your preferred chart type, such as **Table**, **Bar**, **Column**, or **Line** view to visualize your results. You can also click **Add to Dashboard** to export an AI-generated dashboard for root cause analysis.

<img src={useBaseUrl('img/search/mobot/add-to-dashboard.png')} alt="Mobot add to dashboard button" style={{border: '1px solid gray'}} width="500" />

The following rules are used to deduce chart type:
* If both latitude and longitude fields exist, it returns a MAP chart type.
* If there is only one field and one record, it returns an SVP chart type. Example query: `(_sourceCategory=ic/linux/gcp) | count by %"_sourcename" | count`
* If a `sort` operator is present and there are string fields, it returns a TABLE. Given that there is a `sort` operator, probably the user is interested in `count`. Query: `(_sourceCategory=ic/linux/gcp) | count by %"_sourcename" | sort by _count`
* If there is a `_timeslice` field, it returns a LINE chart type if there are numeric fields or a TABLE chart type if there are string fields.
* If there is one string field, one numeric field, and record count is less than 6, it returns a PIE chart type. Query: `(_sourceCategory=ic/linux/gcp) | count by %"_sourcename"`.
* If there is one string field, less than 3 numeric fields, and record count is less than 20, it returns a LINE chart.
* If none of the above conditions are met, it defaults to returning a TABLE chart type.

#### Edit query code

Optionally, you can manually edit your log search query code.

:::tip
This detection works for any data source — Kubernetes logs, application metrics, custom integrations. When you ask for data that doesn't exist, Mobot helps you understand why and what to do.
:::

## Example workflow: Platform how-to

For platform questions, Mobot returns a structured answer sourced from official Sumo Logic documentation.

For example, asking "How do I set up an OTel Collector?" returns:

* A brief explanation of what the OTel Collector is and what it collects.
* Numbered installation steps with navigation paths for both the new UI and Classic UI.
* A table of supported platforms and installation methods.
* A key features summary.
* Reference links to the relevant documentation pages.

<img src={useBaseUrl('img/search/mobot/platform-how-to.png')} alt="Mobot platform how-to response showing structured answer with installation steps and documentation links" style={{border: '1px solid gray'}} width="500" />

How-to responses are sourced directly from Sumo Logic documentation. Mobot does not generate answers from external sources.

:::note
Mobot maintains conversation context for how-to questions for 24 hours. You can ask follow-up questions naturally without starting over.
:::

## Working with Mobot

### Time range

By default, searches run with a 15-minute time range. If a search does not return results, expand the time range.

Click the clock icon, select your desired time range from the drop-down, then click the blue search button.

<img src={useBaseUrl('img/search/mobot/time-period.png')} alt="Mobot time range selector dropdown with clock icon and search button" style={{border: '1px solid gray'}} width="400" />

Mobot understands relative time expressions. Use "last X" or "past X" with time units for rolling time windows:

* "within the last 60 minutes"
* "in the last 6 months"
* "over the last 7 days"
* "in the last 24 hours"
* "last 48 hours", "last 90 days", "last 12 months"
* "last week", "last month", "last night" (as rolling ranges)

### Chart type

Mobot automatically visualizes data results, or you can change it to different chart type, such as **Table**, **Bar**, **Column**, **Line**, **Area**, **Pie**, **Scatter**, **Map**, or **Bubble**. In this example, we convert to table data to a map visualization.

<img src={useBaseUrl('img/search/mobot/geo-chart.png')} alt="Mobot displaying log data as a geographic map visualization with regional data points" style={{border: '1px solid gray'}} width="800" />

Click **Add to Dashboard** to export an AI-generated dashboard for root cause analysis.

<img src={useBaseUrl('img/search/mobot/add-to-dashboard.png')} alt="Mobot 'Add to Dashboard' button for exporting visualizations to dashboards" style={{border: '1px solid gray'}} width="500" />

### Edit query code

You can manually change the log search query generated by Mobot by clicking in the code editor field, edit your query, then clicking the save button (magnifying glass).

<img src={useBaseUrl('img/search/mobot/code-editor.png')} alt="Mobot code editor showing generated query with save button (magnifying glass icon)" style={{border: '1px solid gray'}} width="500" />

:::tip
New to Sumo Logic query language? [Learn more](/docs/search/search-query-language).
:::

### Open in Log Search

Open your query in [Log Search](/docs/search) to access full search functionality, take action, or save the search for later. There a two ways to do this:

From your conversation, click on a results bubble.<br/><img src={useBaseUrl('img/search/mobot/open-in-log-search-view-results.png')} alt="Mobot conversation bubble showing clickable results to open in Log Search" style={{border: '1px solid gray'}} width="700" />

Or, from the query section, click the **Open in Log Search** icon.<br/><img src={useBaseUrl('img/search/mobot/open-in-log-search.png')} alt="Open in Log Search icon button in Mobot query section" style={{border: '1px solid gray'}} width="500" />

### My conversations

To resume a conversation, go to the **My Conversations** panel and click the one you want. Conversations are retained for 30 days.

Mobot automatically titles conversations based on your first question. You can rename a conversation by hovering over it in the **My Conversations** panel and clicking the pencil icon.

Conversation history is useful when working on multiple incidents at the same time. Revisit earlier turns to compare or branch analyses without repeating prior steps.

### New conversation

To start a fresh session, click **New Conversation** in the top right. This clears the current session and starts with a clean slate.

<img src={useBaseUrl('img/search/mobot/new-conversation.png')} alt="New Conversation button in top right of Mobot interface" style={{border: '1px solid gray'}} width="600" />


### View Mobot queries (admins)

Account administrators can audit queries generated by Mobot using the search audit index.

**Prerequisites**:
* You need to be an account administrator.
* The [search audit index](/docs/manage/security/audit-indexes/search-audit-index) needs to be enabled for your organization.

To view Mobot queries:
1. Open **Log Search**.
1. Use the following query:
   ```sumo
   _view=sumologic_search_usage_per_query
   | where query_type in ("Query Agent")
   | count user_name, query
   ```
1. Set your time range to cover the period when queries were run (for example, last 24 hours).

## Tips for better results

### Data questions

* **Talk to it like a conversation**. Layer refinements instead of rewriting the whole question. Start with "Show me API errors" and follow up with "group by status code" and "show the last 6 hours".
* **Be specific**. Include filters, units, and field names. "Show me 500 errors from the API service, grouped by status code" performs better than "Show me errors".
* **Start broad**. Begin with "Show me the most recent logs" to understand available fields, then refine from there.
* **Reference dashboards**. Mobot works well when you reference data sources that already have dashboards. Try using dashboard panel names or descriptions in your question.
* **Disambiguate field names**. If similar field names cause confusion, specify the field explicitly (for example, `<field_name>`).
* **Change chart types**. When results appear in table view, switch to a time-series chart to see trends more clearly.
* **Change units**. For example, "Convert GB to bytes" or "show in milliseconds."
* **Reuse conversation history**. Everything you ask is saved. Revisit, reuse, or continue prior conversations to compare or branch analyses.
* **Modify existing queries**. Add or remove fields, add `where`, `sort`, or `avg()` clauses, and more.
* **Correct Mobot with natural language**. If the result is not right, say so. For example, "Do not filter by namespace, instead group by error type" or "Use P90 instead of P50."
* **Fix broken queries**. Paste a syntactically invalid query and Mobot will correct it.

### How-to questions

* **Ask complete questions**. Instead of typing "Collectors", try "How do I install a Collector on Windows?"
* **Provide context for troubleshooting**. For example, "I'm getting a 403 error when setting up AWS integration. What could be wrong?"
* **Follow up naturally**. If the initial answer is close but not quite right, ask a follow-up such as "What about for Azure instead of AWS?"
* **Reference specific features**. Use proper names when you know them: "How do I use Field Extraction Rules?" works better than "How do I extract fields?"

## Example queries

### Basic patterns

* `Count logs by [field(s)]` and `Group logs by [field(s)]` produce the same result.
* `Sort by [field(s)] [in descending order]`
* `Percentage by [field] values`
* `Find [stat] for [field] (max, min, standard deviation, and so on)`
* `Apply logreduce to logs`
* `Filter by [field] contains [keyword]`

:::note
Keyword searches are case-sensitive.
:::

### Common use cases

Detecting malicious activity:
```
Count logs by action. Sort the results.
Filter results by action contains Malicious.
```

Advanced analysis with users and URLs:
```
Count logs by action, url, user.
Sort the results. Filter results by action contains Malicious.
```

Root cause analysis for latency:
```
Calculate 95th percentile latency by service and API.
```

Network activity analysis:
```
Analyze risk and severity of network activity
Identify top application categories accessed
```

## Additional considerations

### Compatible log formats

Mobot works with JSON logs, partial JSON logs, and unstructured logs with Field Extraction Rules applied. It cannot query metrics or trace telemetry.

:::tip
If a log file contains a mix of JSON and non-JSON formatting, isolate the JSON portion by adding a left curly brace (`{`) to the source expression: `(_sourceCategory=monitor-manager "{") | count by %"customerid"`
:::

### Role-based access control

Role-based access control (RBAC) is not supported for contextual suggestions and autocompletions. A user blocked by [log search RBAC](/docs/manage/users-roles/roles/construct-search-filter-for-role/) may see suggestions for unpermitted source expressions, but those searches will not execute.

### Search behavior and data tier access

Mobot follows the same search behavior as standard log search and respects your account's data configuration.

**Flex pricing**: If you are on [Flex pricing](/docs/manage/partitions/flex), all data is stored in a single intelligent layer and pricing is based on the volume of data scanned.

**Tiered pricing**: If you are on a [tiered pricing](/docs/manage/partitions/data-tiers/searching-data-tiers/) plan, Mobot searches across continuous data tiers only, unless you specify otherwise. To query a specific tier, include the `_dataTier` field in your prompt. For example:
```sumo
_dataTier=Infrequent
```

### Known limitations

Mobot continues to evolve. Current limitations include:

**Use cases**
* Log analysis only. Metrics, traces, and other telemetry types are not supported.
* Capabilities are constrained by available skills. Domain intelligence and planning capabilities are still evolving.

**Access and actions**
* Read-only. Mobot can query and analyze data but cannot modify, delete, or ingest data.
* Cannot create or manage dashboards, monitors, or scheduled searches.
* No access to external systems (for example, CRM, databases, APIs, PagerDuty, Jira, or Splunk).

**Data and query constraints**
* Only works with data that has been ingested and is still within your retention window.
* Large time ranges (30 or more days) may be slow or time out.
* Very complex or deeply nested queries may hit platform limits.

**Experience**
* Performance and latency vary depending on query complexity.
* Responses may not always be fully accurate or complete.
* Ambiguous questions may require clarification (for example, "search performance" could have multiple meanings).
* No memory across sessions. Each conversation starts fresh.

**Guardrails**
* Responses are based only on available log data.
* Legal, safety, and content guardrails are in progress and will continue to be strengthened.

## Security and compliance

Mobot leverages foundational models provided by Amazon Bedrock, inheriting their compliance and security posture. For detailed information, refer to:

* [Security in Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/security.html)
* [Amazon Bedrock Security and Privacy](https://aws.amazon.com/bedrock/faqs/#security--ny85yy)

All aspects of the Sumo Logic service, including Mobot, adhere to the security and compliance requirements outlined in our [service agreement](https://www.sumologic.com/service-agreement) or in individually negotiated contracts.

* **Customer data privacy**. No customer data or PII is used to train the AI models. Context for AI processing is limited to schema and field samples, reviewed for legal and compliance purposes.
* **Rolling data expiration**. Some features may store query history temporarily for performance, but data is expired on a rolling basis.
* **AI provider**. Mobot uses a foundation model served by Amazon Bedrock. The provider has no access to your data.

## FAQ

### General

<details>
<summary>What is Sumo Logic Mobot?</summary>

Mobot is an AI-powered conversational assistant integrated into the Sumo Logic Log Analytics Platform. It enables natural language log analysis and platform how-to answers, helping you extract actionable insights from logs and learn the platform without leaving your workflow. Mobot does not process or share your log data with any third party.
</details>

<details>
<summary>Do I need to select an agent or mode?</summary>

No. Mobot determines whether your question is a data analysis request or a platform how-to question and responds accordingly. You interact with a single conversational interface.
</details>

<details>
<summary>Can Mobot detect what sources or integrations I don't have set up?</summary>

Mobot can detect missing sources or partitions reactively, but not proactively.

**Reactive detection**: When you ask a question that requires a specific data source (for example, Cloud SIEM network records or AWS CloudTrail data), Mobot attempts the query and detects if the partition or data doesn't exist. It then provides setup guidance.

**What Mobot cannot do**: Mobot cannot proactively scan your environment and generate a list of missing integrations or unconfigured features. It has no visibility into account configuration or enabled features without actively querying for them.

**On-demand checks**: You can ask Mobot to check for specific sources or data. For example:
- "Do I have AWS CloudTrail data?"
- "Is Kubernetes data flowing in?"
- "Do I have any threat intel lookups set up?"

Mobot will actively probe and give you a definitive answer about whether that data exists.
</details>

<details>
<summary>Can I use Mobot to analyze unstructured logs?</summary>

Yes. Mobot can extract relevant insights from unstructured logs, provided Field Extraction Rules (FERs) are applied. It also supports semi-structured logs (JSON with unstructured payloads).
</details>

<details>
<summary>Does Mobot save search history?</summary>

Yes. Mobot retains conversation and search history, allowing you to resume investigations with context and continuity.
</details>

<details>
<summary>What role does AI play in Mobot?</summary>

Mobot is an ensemble of Generative AI (GenAI) and classical machine learning (ML) techniques. GenAI interprets natural language questions and generates responses. Classical ML is used for capabilities such as anomaly detection in alerts.
</details>

<details>
<summary>How can I opt out of Mobot?</summary>

Contact our [support team](https://support.sumologic.com/support/s/). Your account will be updated accordingly.
</details>

### Security and privacy

<details>
<summary>Does Mobot access customer log data?</summary>

Mobot does not process or analyze customer log content. Schema and field samples are used to provide context to the AI model, but your log content is not read or stored by the model.
</details>

<details>
<summary>What types of customer data or PII does Mobot process?</summary>

Mobot processes schema and field samples to provide context to the AI. While field values can contain PII or confidential data (for example, email addresses or IP addresses), these values are used solely to enable insights and are protected under strict compliance and security reviews.
</details>

<details>
<summary>Is customer data used to train AI models?</summary>

No. Customer data and PII are not used to train AI models. Mobot operates using a foundation model served via Amazon Bedrock, ensuring your data remains private and secure.
</details>

<details>
<summary>How long does Mobot store customer data or PII?</summary>

Certain features rely on query history stored on a rolling basis for performance optimization. Data is systematically expired to maintain privacy.
</details>

<details>
<summary>Is any user or org data sent outside our environment?</summary>

No. All processing happens within your region's cluster. RAG context is scoped to dashboards in your own org with no cross-org data leakage.
</details>

<details>
<summary>Does a fourth party have access to Mobot customer data?</summary>

No. Mobot uses foundation models securely hosted through Amazon Bedrock. Customer inputs and outputs are treated as Customer Content under AWS terms and are not used to train models or shared with third-party model providers (such as Anthropic). Customer data processed through Mobot remains within Sumo Logic's secure environment and is used only to deliver results for that customer.
</details>

### Technical

<details>
<summary>Does Mobot use any open-source libraries, GenAI providers, or cloud providers?</summary>

For Generative AI, Mobot uses a foundation model served by Amazon Bedrock. Classical ML features leverage open-source Python libraries approved by Sumo Logic.
</details>

<details>
<summary>Is there a human in the loop for Mobot?</summary>

Yes. The on-call developer or security engineer troubleshooting an incident is the expected user. They interact with Mobot using natural language questions.
</details>

<details>
<summary>Does Sumo Logic hold any AI-specific certifications or accreditations?</summary>

Sumo Logic is currently reviewing AI compliance within a rapidly evolving regulatory landscape, including ISO 42001, which is designed to help organizations implement AI responsibly.

All Sumo Logic AI capabilities operate within our existing industry-recognized security and compliance framework, including FedRAMP Moderate, SOC 2 Type 2, HIPAA, PCI DSS 4.0.1, and ISO 27001:2022. These attestations govern the confidentiality, integrity, and protection of customer data across our platform, including AI features.

Availability of specific AI capabilities may vary by deployment region based on compliance boundary requirements.
</details>

<details>
<summary>Which Mobot capabilities are available in FED deployments?</summary>

Current GA versions of Mobot are available in the FED deployment. Contact your account team for details on specific capability availability.
</details>

### Performance and limitations

<details>
<summary>What is the typical Mobot response time?</summary>

Typical end-to-end response time remains under two seconds for most queries. Very large result sets or percentile calculations over broad ranges may take up to five seconds. Very complex queries may take longer or trigger a structured fallback response.
</details>

<details>
<summary>How do I handle a failed or unexpected result?</summary>

If a result is not what you expected, use natural language to correct it. Common approaches:

* **No or delayed results**. Give Mobot a few seconds to process. Expand the time range if needed.
* **Output too broad**. Add more context (for example, specify a service or namespace).
* **Unexpected numbers**. Be more explicit. For example, "show in milliseconds" or "use P90 instead of P50."
* **Wrong query logic**. Tell Mobot what to change. For example, "Do not filter by namespace, group by error type instead."
</details>

<details>
<summary>What are the RAG limitations for dashboard-aware translations?</summary>

For dashboard-aware translations via RAG, Mobot's source expression needs to share at least one common key-value pair with your dashboard queries. For example, `_sourcecategory=abcd "error"` matches a dashboard query like `_sourcecategory=abcd | count`, but does not match `_source=abcd | count` because there is no shared key-value pair. RAG only considers dashboards that have been opened in the last 90 days.
</details>

## Feedback

Let us know what you think by clicking the thumbs up icon to confirm a useful result, or the thumbs down icon to tell us how to improve.

<img src={useBaseUrl('img/search/mobot/feedback-thumbs.png')} alt="Thumbs up and thumbs down feedback buttons in Mobot interface" style={{border: '1px solid gray'}} width="800" />

You can also share a specific conversation by copying the conversation URL from the interface. This is useful for reporting issues or sharing examples with your team.


## Opting out

To opt out of Mobot, contact our [Support team](https://support.sumologic.com/support/s/).

## Additional resources

* [Search Query Language](/docs/search/search-query-language)
* [Dashboards](/docs/dashboards)
* [Dojo AI overview](https://www.sumologic.com/solutions/dojo-ai). Learn about Dojo AI, the collective system of Sumo Logic agents and assistants, including Mobot, SOC Analyst Agent, MCP Server, and more.
