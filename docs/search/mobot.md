---
id: mobot
title: Sumo Logic Mobot
sidebar_label: Mobot ✨
description: Ask questions in plain English to analyze logs or get platform guidance from Mobot, Sumo Logic's AI assistant with a single conversational interface.
keywords:
  - mobot
  - ai assistant
  - artificial intelligence
  - log analysis
  - unstructured logs
  - dojo ai
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

Mobot is Sumo Logic's AI-powered conversational assistant. Ask a question in plain English and Mobot handles the rest: it performs higher-level reasoning to understand your intent, asks follow-up questions when needed, analyzes log data behind the scenes, and surfaces findings directly in the conversation.

You do not need to select an agent or know which query to write. Mobot automatically determines whether your question is a log data analysis request or a platform how-to question and responds accordingly. For log data questions, Mobot identifies relevant sources, correlates information across logs, and returns inline results with anomaly callouts and suggested next steps. For how-to questions, Mobot returns structured answers sourced from Sumo Logic documentation, with reference links for deeper reading.

Mobot tracks your intent across a conversation, so you can refine, pivot, and dig deeper without starting over.

:::info Participation requirement
Access requires a signed AI addendum, since Mobot uses AI to make inferences on your log data. Contact your account team if you have not yet signed the addendum.
:::

## At a glance

- **What it is**: Sumo Logic's AI-powered conversational assistant for log investigation and platform guidance.
- **How it works**: Ask a question in plain English. Mobot determines whether it's a log data question or a how-to question and responds accordingly—no need to select a mode.
- **Response time**: Typically under 2 seconds for most queries.
- **Compatible log types**: Structured, semi-structured, and unstructured logs. Unstructured logs already used in dashboards do not require Field Extraction Rules.
- **AI provider**: Amazon Bedrock (no customer data used for training).

:::training Sumo Logic Academy

import SumoAcademy from '../reuse/sumo-logic-academy.md';

<SumoAcademy/>

* **Self-paced**: [Mobot Essentials Self Paced](https://learn.sumologic.com/mobot-101)
* **Instructor-led virtual classes**: [Workshops: Mobot Essentials](https://www.sumologic.com/learn/training?_workshops=mobot-essentials#section-2)
:::

## Key capabilities

* **Unified conversational interface**. Ask log data questions and platform how-to questions in the same conversation. Mobot routes each question to the appropriate capability automatically.
* **Clarification when intent is ambiguous**. If your question could match multiple sources or interpretations, Mobot asks a targeted follow-up with examples to narrow intent before running the analysis.
* **Configuration gap detection**. When you request data from a source that hasn't been configured, Mobot detects the missing partition or index and lets you know so you can set it up.
* **Inline results and anomaly detection**. Results render directly in the conversation as structured tables. Mobot summarizes notable findings, such as unexpected warning patterns or missing services, and suggests where to investigate next.
* **Higher-level reasoning and implicit analysis**. Mobot plans and executes complex analyses behind the scenes, correlating information across data sources and applying multi-step reasoning to synthesize findings without requiring you to specify each step.
* **Contextual understanding**. Mobot considers relevant data sources, schema, lookup tables, historical queries, dashboards, and time range to improve accuracy.
* **Auto-visualization**. Generate charts automatically from search results and add them to dashboards.
* **Broad log compatibility**. Works with structured, semi-structured, and unstructured logs. Mobot applies parsing logic to unstructured logs without requiring Field Extraction Rules, prioritizing sources already used in dashboards. See [Compatible log formats](#compatible-log-formats) for details.
* **Dashboard-aware translations (via RAG)**. Mobot learns from dashboards opened in your org in the last 90 days to better understand your intent and data structure.
* **Documentation-grounded how-to answers**. Platform questions return answers sourced from official Sumo Logic documentation, with reference links.
* **Conversation history**. Conversations are saved automatically so you can resume, revisit, or branch prior investigations without losing context.

## Who benefits from Mobot?

Mobot is useful across experience levels:

* **On-call engineers and security teams**. Accelerate incident resolution by surfacing troubleshooting and security insights rapidly without writing queries from scratch.
* **Early career professionals**. Investigate incidents without needing to learn query syntax.
* **Practitioners**. Speed up workflows with context-aware analysis for frequent tasks.
* **Experts**. Get assistance crafting complex queries and correlating across data sources efficiently.

## Getting started

There are two ways to open Mobot:
- **Left nav**. Click **Mobot** in the left navigation menu.<br/><img src={useBaseUrl('img/search/mobot/left-nav.png')} alt="Mobot in the left navigation menu" width="650" />
- **Home page**. Go to **Home**, select the **Home** tab, then click the **Mobot** tile.<br/><img src={useBaseUrl('img/search/mobot/home-nav.png')} alt="Mobot tile on the Home page" width="650" />

### Ask a question

Type your question in the **Ask Something** field and press Enter or click the send button.

<img src={useBaseUrl('img/search/mobot/ask-something-mobotv2.png')} alt="Mobot interface showing unified prompt input" style={{border: '1px solid gray'}} width="600" />

You can ask a question about your log data (for example, `Show me logs from last 15 minutes`) or a platform question (for example, `How do I set up an OTel Collector?`).

### Clarification prompts

If your question is ambiguous or does not match a specific source, Mobot asks a targeted follow-up question before running the analysis. The clarification message explains what additional information is needed and provides inline examples you can reference or type directly.

For example, asking `Show me logs from last 15 minutes` without specifying a source prompts Mobot to ask which application, service, or log source you are interested in, with inline examples such as `kubernetes`, `nginx`, or `auth_logs`.

<img src={useBaseUrl('img/search/mobot/clarification-prompt-mobotv2.png')} alt="Mobot clarification prompt" style={{border: '1px solid gray'}} width="600" />

<img src={useBaseUrl('img/search/mobot/clarification-prompt-logs-mobotv2.png')} alt="Mobot clarification prompt asking for a log source" style={{border: '1px solid gray'}} width="600" />

Respond with a source name, source category expression, or any keyword related to what you are looking for.

### Execution steps and inline results

After you respond, Mobot displays a **Thinking...** or **Planning...** indicator while it identifies relevant data sources and analyzes the problem. Results render as a structured table directly in the conversation, along with an option to open the query in Log Search.

<img src={useBaseUrl('img/search/mobot/inline-results-mobotv2.png')} alt="Mobot inline results with thinking state" style={{border: '1px solid gray'}} width="700" />

### Notable findings

After returning results, Mobot summarizes anything that stands out at the bottom of the response, labeled **Notable**. For example, if two `WARN` entries share an unusual pattern, Mobot flags them, explains what they may indicate, and asks whether you want to investigate further.

<img src={useBaseUrl('img/search/mobot/inline-results-summary-mobotv2.png')} alt="Mobot inline results table with key observations" style={{border: '1px solid gray'}} width="700" />

### Follow-up guidance

Mobot suggests follow-up questions to guide you through the next steps of your investigation. These suggestions appear in the interface and help you explore the data without needing to formulate queries from scratch. You can click a suggestion or type your own question to continue the conversation.

## Example workflow: Log analysis

Prompt: `I'm getting reports that users can't log in. Is auth-service having issues?`<br/><img src={useBaseUrl('img/search/mobot/auth-service-issues-mobotv2.png')} alt="Mobot log analysis answer showing auth service error trend" style={{border: '1px solid gray'}} width="700" />

Prompt: `What does the error trend look like for my service over the past 24 hours?`<br/><img src={useBaseUrl('img/search/mobot/org-service-errors-mobotv2.png')} alt="Mobot log analysis answer showing service error trend over 24 hours" style={{border: '1px solid gray'}} width="700" />

## Example workflow: Cloud SIEM investigation

You're a SecOps engineer using [Cloud SIEM](/docs/cse/) and receive an alert about suspicious network activity. Here's how to investigate using natural language.

### Review network activity

**Ask**: "Show me Cloud SIEM network records grouped by action"

Mobot returns network activity categorized by action type (Allowed, Blocked, Malicious, etc.).

<img src={useBaseUrl('img/search/mobot/cloud-siem-1-mobotv2.png')} alt="Mobot showing Cloud SIEM network records grouped by action type" style={{border: '1px solid gray'}} width="500" />

### Focus on malicious events

Notice "Malicious" appears in the results. **Ask**: "Show me only the malicious activity"

Mobot filters to show just the malicious network events.

<img src={useBaseUrl('img/search/mobot/cloud-siem-2-mobotv2.png')} alt="Mobot Cloud SIEM results filtered to show only malicious network activity" style={{border: '1px solid gray'}} width="800" />

:::note
If searching doesn't return results, try "Malicious*" with a wildcard. Searches are case-sensitive.
:::

### Identify affected resources

**Ask**: "Which URLs and users are involved?"

Mobot breaks down the malicious activity by target URLs and affected user accounts, helping you identify attack patterns and compromised credentials.

<img src={useBaseUrl('img/search/mobot/cloud-siem-3-mobotv2.png')} alt="Mobot Cloud SIEM breakdown showing affected URLs and user accounts from malicious activity" style={{border: '1px solid gray'}} width="800" />

### Next steps

In three conversational turns, you went from a general alert to:

* Reviewing all network activity types
* Isolating malicious events
* Identifying specific URLs targeted and users affected

Even if the activity was blocked, investigate the affected users in Cloud SIEM's endpoint records to check for lateral movement or other indicators of compromise.

## Example workflow: Platform how-to

For platform questions, Mobot returns a structured answer sourced from official Sumo Logic documentation.

For example, asking `How do I set up an OTel Collector?` returns:

* A brief explanation of what the OTel Collector is and what it collects.
* Numbered installation steps with navigation paths for both the new UI and Classic UI.
* A table of supported platforms and installation methods.
* A key features summary.
* Reference links to the relevant documentation pages.

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

Mobot automatically visualizes data results, or you can change it to a different chart type, such as **Table**, **Bar**, **Column**, **Line**, **Area**, **Pie**, **Scatter**, **Map**, or **Bubble**. In this example, we convert the table data to a map visualization.

<img src={useBaseUrl('img/search/mobot/geo-chart-mobotv2.png')} alt="Mobot displaying log data as a geographic map visualization with regional data points" style={{border: '1px solid gray'}} width="800" />

Mobot uses the following rules to deduce chart type automatically:
* If both latitude and longitude fields exist, it returns a MAP chart type.
* If there is only one field and one record, it returns an SVP chart type.
* If a `sort` operator is present and there are string fields, it returns a TABLE.
* If there is a `_timeslice` field, it returns a LINE chart if there are numeric fields, or a TABLE if there are string fields.
* If there is one string field, one numeric field, and the record count is less than 6, it returns a PIE chart.
* If there is one string field, less than 3 numeric fields, and the record count is less than 20, it returns a LINE chart.
* If none of the above conditions are met, it defaults to a TABLE chart type.

Click **Add to Dashboard** to export an AI-generated dashboard for root cause analysis.

<img src={useBaseUrl('img/search/mobot/add-to-dashboard.png')} alt="Mobot 'Add to Dashboard' button for exporting visualizations to dashboards" style={{border: '1px solid gray'}} width="500" />

### Edit query code

You can manually change the log search query generated by Mobot by clicking in the code editor field, editing your query, then clicking the save button (magnifying glass).

<img src={useBaseUrl('img/search/mobot/code-editor-mobotv2.png')} alt="Mobot code editor showing generated query with save button (magnifying glass icon)" style={{border: '1px solid gray'}} width="500" />

:::tip
New to Sumo Logic query language? [Learn more](/docs/search/search-query-language).
:::

### Open in Log Search

Open your query in [Log Search](/docs/search) to access full search functionality, take action, or save the search for later. There are two ways to do this:

From your conversation, click on a results bubble.<br/><img src={useBaseUrl('img/search/mobot/open-in-log-search-view-results-mobotv2.png')} alt="Mobot conversation bubble showing clickable results to open in Log Search" style={{border: '1px solid gray'}} width="700" />

Or, from the query section, click the **Open in Log Search** icon.<br/><img src={useBaseUrl('img/search/mobot/open-in-log-search.png')} alt="Open in Log Search icon button in Mobot query section" style={{border: '1px solid gray'}} width="500" />

### My conversations

To resume a conversation, go to the **My Conversations** panel and click the one you want.

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

## Example prompts

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

### How-to questions

* `How do I add a collector for AWS CloudTrail?`
* `What's the difference between a scheduled search and a real-time alert?`
* `Why isn't my collector sending data?`
* `What are the API endpoints for Sumo Logic?`

## Additional considerations

### Compatible log formats

Mobot works with JSON logs, partial JSON logs, and unstructured logs. It cannot query metrics or trace telemetry.

Mobot applies parsing logic to unstructured logs (raw, text-based log data that doesn't follow a structured format like JSON) without requiring Field Extraction Rules (FERs). It prioritizes unstructured logs that are already used in dashboards, so it may not interpret every raw log source right away—support continues to expand beyond dashboards over time.

* **Broader coverage**. Mobot parses and generates insights from unstructured log formats, even without FERs, making it useful for environments with custom or inconsistent log types.
* **Performance and reliability**. Response times and suggestion accuracy are consistent with Mobot's structured log experience.
* **Security and compliance**. The same strict data handling and privacy standards apply.

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

### What is Sumo Logic Mobot?

Mobot is an AI-powered conversational assistant integrated into the Sumo Logic Log Analytics Platform. It enables natural language log analysis and platform how-to answers, helping you extract actionable insights from logs and learn the platform without leaving your workflow. Mobot does not process or share your log data with any third party.

### Do I need to select an agent or mode?

No. Mobot determines whether your question is a log data analysis request or a platform how-to question and responds accordingly. You interact with a single conversational interface.

### Can Mobot detect what sources or integrations I don't have set up?

Mobot can detect missing sources or partitions reactively. When you ask a question that requires a specific data source, Mobot attempts the query and detects if the partition or data doesn't exist, then lets you know. Mobot cannot proactively scan your environment and generate a list of all unconfigured integrations.

### Can I use Mobot to analyze unstructured logs?

Yes. Mobot can extract relevant insights from unstructured logs, including those without Field Extraction Rules (FERs) applied, prioritizing sources already used in dashboards. It also supports semi-structured logs (JSON with unstructured payloads).

### Does Mobot save search history?

Yes. Mobot retains conversation and search history, allowing you to resume investigations with context and continuity.

### What role does AI play in Mobot?

Mobot is an ensemble of Generative AI (GenAI) and classical machine learning (ML) techniques. GenAI interprets natural language questions and generates responses. Classical ML is used for capabilities such as anomaly detection in alerts.

### How can I opt out of Mobot?

Contact our [support team](https://support.sumologic.com/support/s/). Your account will be updated accordingly.

### Does Mobot access customer log data?

Mobot does not process or analyze customer log content. Schema and field samples are used to provide context to the AI model, but your log content is not read or stored by the model.

### What types of customer data or PII does Mobot process?

Mobot processes schema and field samples to provide context to the AI. While field values can contain PII or confidential data (for example, email addresses or IP addresses), these values are used solely to enable insights and are protected under strict compliance and security reviews.

### Is customer data used to train AI models?

No. Customer data and PII are not used to train AI models. Mobot operates using a foundation model served via Amazon Bedrock, ensuring your data remains private and secure.

### How long does Mobot store customer data or PII?

Certain features rely on query history stored on a rolling basis for performance optimization. Data is systematically expired to maintain privacy.

### Is any user or org data sent outside our environment?

No. All processing happens within your region's cluster. RAG context is scoped to dashboards in your own org with no cross-org data leakage.

### Does a fourth party have access to Mobot customer data?

No. Mobot uses foundation models securely hosted through Amazon Bedrock. Customer inputs and outputs are treated as Customer Content under AWS terms and are not used to train models or shared with third-party model providers (such as Anthropic). Customer data processed through Mobot remains within Sumo Logic's secure environment and is used only to deliver results for that customer.

### Does Mobot use any open-source libraries, GenAI providers, or cloud providers?

For Generative AI, Mobot uses a foundation model served by Amazon Bedrock. Classical ML features leverage open-source Python libraries approved by Sumo Logic.

### Is there a human in the loop for Mobot?

Yes. The on-call developer or security engineer troubleshooting an incident is the expected user. They interact with Mobot using natural language questions.

### Does Sumo Logic hold any AI-specific certifications or accreditations?

Sumo Logic is currently reviewing AI compliance within a rapidly evolving regulatory landscape, including ISO 42001, which is designed to help organizations implement AI responsibly.

All Sumo Logic AI capabilities operate within our existing industry-recognized security and compliance framework, including FedRAMP Moderate, SOC 2 Type 2, HIPAA, PCI DSS 4.0.1, and ISO 27001:2022. These attestations govern the confidentiality, integrity, and protection of customer data across our platform, including AI features.

Availability of specific AI capabilities may vary by deployment region based on compliance boundary requirements.

### Which Mobot capabilities are available in FED deployments?

Current GA versions of Mobot are available in the FED deployment. Contact your account team for details on specific capability availability.

### What is the typical Mobot response time?

Typical end-to-end response time remains under two seconds for most queries. Very large result sets or percentile calculations over broad ranges may take up to five seconds. Very complex queries may take longer or trigger a structured fallback response.

### How do I handle a failed or unexpected result?

If a result is not what you expected, use natural language to correct it. Common approaches:

* **No or delayed results**. Give Mobot a few seconds to process. Expand the time range if needed.
* **Output too broad**. Add more context (for example, specify a service or namespace).
* **Unexpected numbers**. Be more explicit. For example, "show in milliseconds" or "use P90 instead of P50."
* **Wrong query logic**. Tell Mobot what to change. For example, "Do not filter by namespace, group by error type instead."

### What are the RAG limitations for dashboard-aware translations?

For dashboard-aware translations via RAG, Mobot's source expression needs to share at least one common key-value pair with your dashboard queries. For example, `_sourcecategory=abcd "error"` matches a dashboard query like `_sourcecategory=abcd | count`, but does not match `_source=abcd | count` because there is no shared key-value pair. RAG only considers dashboards that have been opened in the last 90 days.

## Feedback

Let us know what you think by clicking the thumbs up icon to confirm a useful result, or the thumbs down icon to tell us how to improve.

<img src={useBaseUrl('img/search/mobot/feedback-thumbs.png')} alt="Thumbs up and thumbs down feedback buttons in Mobot interface" style={{border: '1px solid gray'}} width="400" />

You can also share a specific conversation by copying the conversation URL from the interface. This can be useful for reporting issues or sharing examples with your team.

## Opting out

To opt out of Mobot, contact our [Support team](https://support.sumologic.com/support/s/).

## Additional resources

* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning)
* [Search Query Language](/docs/search/search-query-language)
* [Dashboards](/docs/dashboards)
* [Dojo AI overview](https://www.sumologic.com/solutions/dojo-ai). Learn about Dojo AI, the collective system of Sumo Logic agents and assistants, including Mobot, SOC Analyst Agent, MCP Server, and more.
