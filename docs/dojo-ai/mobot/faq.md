---
id: faq
title: Mobot FAQ
sidebar_label: Mobot FAQ ✨
description: Find answers to frequently asked questions about Mobot, including prompt limits, cost, data privacy, availability, and how to handle unexpected results.
keywords:
  - mobot
  - dojoai
  - faq
  - prompt limits
  - data privacy
---

### What is Sumo Logic Mobot?

Mobot is an AI-powered conversational assistant integrated into the Sumo Logic Log Analytics Platform. It enables natural language log analysis and how-to answers, helping you extract actionable insights from logs and learn the platform without switching tools. Mobot does not process or share your log data with any third party.

### Do I need to select an agent or mode?

No. Mobot determines whether your prompt is a log data question or a how-to question and responds accordingly. You interact with a single conversational interface.

### Is there a limit to how many prompts I can send?

Yes. Each user can send up to 10 prompts to Mobot per day, per Sumo Logic Org ID. A prompt is any single message you type and send to Mobot; every message counts, including follow-up replies within a conversation.

As you approach the limit, Mobot shows a heads-up banner with the time remaining until your limit resets. When you reach the limit, Mobot stops responding to new prompts and shows a "try again in X hours" message.

Limits reset daily at midnight US Pacific Time. The "try again in X hours" message is calculated from this reset time, converted to your local time zone.

If you need a higher limit, contact your account team.

### Is there a character limit for a Mobot prompt?

Yes. A single prompt can be up to 40,000 characters.

### Does Mobot's licensing model and limits apply to SOC Analyst Agent investigations?

No. When you click **Ask Mobot** from an Investigated Insight, those interactions are governed by [SOC Analyst Agent licensing](/docs/dojo-ai/agents/soc-analyst-agent/#availability) — up to 30 prompts per user per day — not the standard Mobot limit above.

### Is there a cost to use Mobot?

No. Mobot is included at no additional cost for any Sumo Logic customer on an active credit-based subscription ([Flex](/docs/manage/partitions/flex) or [tiered](/docs/manage/partitions/data-tiers/searching-data-tiers/)). There is no upfront consumption charge, and each account receives a fair-use capacity designed to cover the vast majority of use cases.

When Mobot runs a log analysis, the underlying data scan is charged the same way as a user-initiated search. See [Search behavior and data tier access](/docs/dojo-ai/mobot/about#search-behavior-and-data-tier-access).

If your organization previously turned off Sumo Logic AI or an earlier version of Mobot, an administrator needs to turn it back on before you can use it. See [Opting out](/docs/dojo-ai/mobot/about#opting-out).

### What happened to Query Agent and Knowledge Agent?

They're still here, working behind the scenes, but renamed and repositioned as their capabilities have evolved. As with the original agents, you do not select between them; Mobot routes your prompt to the right one automatically.

* **Query Agent → Log Analysis Agent**. The original Query Agent helped users write Sumo Logic queries. The Log Analysis Agent goes further, interpreting intent, guiding investigations, and surfacing relevant data through natural language.
* **Knowledge Agent → Platform Optimization Agent**. The original Knowledge Agent answered how-to questions from product documentation. The Platform Optimization Agent expands on that, helping users troubleshoot issues, optimize queries, understand data usage, and generally get more from the platform.
* **Summary Agent → part of SOC Analyst Agent**. The Summary Agent is no longer a separate agent. Its signal summarization is now a core part of how the [SOC Analyst Agent](/docs/dojo-ai/agents/soc-analyst-agent) contextualizes and presents its findings.

Log Analysis Agent and Platform Optimization Agent aren't names you'll see anywhere in the UI; you always interact with them through Mobot's single chat interface. Don't confuse the Log Analysis Agent with [search autocomplete](/docs/search/get-started-with-search/search-basics/search-autocomplete) or [AI Parse Assist](/docs/search/search-query-language/parse-operators/parse-predictable-patterns-using-an-anchor#ai-parse-assist), which are UI features you use directly on the Search page rather than through a conversation.

### Can Mobot detect what sources or integrations I don't have set up?

Mobot can detect missing sources or partitions reactively. When you ask a question that requires a specific data source, Mobot attempts the query and detects if the partition or data doesn't exist, then lets you know. Mobot cannot proactively scan your environment and generate a list of all unconfigured integrations.

### Can I use Mobot to analyze unstructured logs?

Yes. Mobot can extract relevant insights from unstructured logs, including those without Field Extraction Rules (FERs) applied, prioritizing sources already used in dashboards. It also supports semi-structured logs (JSON with unstructured payloads).

### Can I use Mobot in a language other than English?

Mobot's underlying model natively supports multiple languages, and many customers use it successfully in their preferred language. However, Sumo Logic does not actively develop or formally support non-English languages at this time.

### Does Mobot save search history?

Yes. Mobot retains conversation and search history for 60 days, allowing you to resume investigations with context and continuity.

### What role does AI play in Mobot?

Mobot is an ensemble of Generative AI (GenAI) and classical machine learning (ML) techniques. GenAI interprets natural language questions and generates responses. Classical ML is used for capabilities such as anomaly detection in alerts.

### Does Mobot access customer log data?

Mobot does not process or analyze customer log content. Schema and field samples are used to provide context to the AI model, but your log content is not read or stored by the model.

### What types of customer data or PII does Mobot process?

Mobot processes schema and field samples to provide context to the AI. While field values can contain PII or confidential data (for example, email addresses or IP addresses), these values are used solely to enable insights and are protected under strict compliance and security reviews.

### Is customer data used to train AI models?

No. Customer data and PII are not used to train AI models. Mobot operates using a foundation model served via Amazon Bedrock, ensuring your data remains private and secure.

### How long does Mobot store customer data or PII?

Certain features rely on conversation history stored on a rolling basis for performance optimization. Data is systematically expired to maintain privacy.

### Is any user or org data sent outside our environment?

No. All processing happens within your region's cluster. RAG context is scoped to dashboards in your own org with no cross-org data leakage.

### Does a fourth party have access to Mobot customer data?

No. Mobot uses foundation models securely hosted through Amazon Bedrock. See our [AI Trust and Data FAQ](/docs/dojo-ai/trust-data-faq/#does-any-third-party-have-access-to-dojoai-customer-data) for more information.

### Does Mobot use any open-source libraries, GenAI providers, or cloud providers?

For Generative AI, Mobot uses a foundation model served by Amazon Bedrock. Classical ML features leverage open-source Python libraries approved by Sumo Logic.

### Is there a human in the loop for Mobot?

Yes. The on-call developer or security engineer troubleshooting an incident is the expected user. They interact with Mobot using natural language questions.

### Does Sumo Logic hold any AI-specific certifications or accreditations?

See our [AI Trust and Data FAQ](/docs/dojo-ai/trust-data-faq/#does-sumo-logic-hold-any-ai-specific-certifications-or-accreditations) for more information.

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

### Why doesn't Mobot always give the same answer to a similar question?

AI is not deterministic. Mobot generates responses based on probability, context, and intent rather than retrieving fixed answers, so phrasing may vary between similar questions. The core guidance and accuracy stay consistent, and Mobot grounds how-to answers in official Sumo Logic documentation to help ensure reliability. If an answer seems incorrect or unclear, use the [feedback](/docs/dojo-ai/mobot/about#feedback) buttons to help us improve quality.

### What are the RAG limitations for dashboard-aware translations?

For dashboard-aware translations via RAG, Mobot's source expression needs to share at least one common key-value pair with your dashboard queries. For example, `_sourcecategory=abcd "error"` matches a dashboard query like `_sourcecategory=abcd | count`, but does not match `_source=abcd | count` because there is no shared key-value pair. RAG only considers dashboards that have been opened in the last 90 days.

### How do I opt out of Mobot?

An administrator can turn Mobot off for your organization from the **Feature Management** page. See [Opting out](/docs/dojo-ai/mobot/about#opting-out).
