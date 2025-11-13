---
id: mobot-multiturn-beta
title: Mobot (Beta)
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

:::info
This feature is in Beta. For more information, contact your Sumo Logic account executive.
:::

Get instant answers and create log queries using natural language—no syntax required. Mobot connects you to two specialized agents: Query Agent helps you write and refine log searches, while Knowledge Agent answers how-to questions about Sumo Logic. Work faster, learn as you go, and troubleshoot without leaving your workflow.

## What is Mobot?

Mobot is your conversational interface for Sumo Logic, letting you interact with the platform using natural language the same way you would with a chat assistant. Instead of memorizing syntax or searching through documentation, simply ask questions and get actionable results.

How it works:
* Mobot is the conversational interface you interact with—think of it as your personal assistant.
* Query Agent is the specialist Mobot calls on to translate your questions into log search queries.
* Knowledge Agent is the expert Mobot consults to answer how-to questions using official Sumo Logic documentation. Use it for setup guidance, troubleshooting steps, product concepts, and best practices.

Together, these agents help you troubleshoot faster, explore your data more intuitively, and learn the platform without friction.

## Which agent should I use?

Not sure where to start? Use this guide:

|  | Query Agent | Knowledge Agent |
|:---------|:-------------|:-----------------|
| **Purpose** | Create and refine log queries | Learn platform features |
| **Input** | Data questions and analysis requests | How-to and configuration questions |
| **Output** | Executable queries with live results | Documentation-based answers with links |
| **Best for** | Troubleshooting, investigating, analyzing trends | Onboarding, setup guidance, learning concepts |
| **Example** | "Show me 500 errors from the API service in the last hour" | "How do I set up a CloudTrail collector?" |

## Query agent

Select **Query Agent** to get help with Sumo Logic log search queries.

<img src={useBaseUrl('img/search/mobot/query-agent-select.png')} alt="Query Agent button selected in the Mobot UI" style={{border: '1px solid gray'}} width="600" />

import Iframe from 'react-iframe';

:::sumo Micro Lesson

<Iframe url="https://fast.wistia.net/embed/iframe/1gtkce8ayl?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Mobot and Query Agent: A Conceptual Overview"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

Query Agent builds on the query translation foundation of the previous Copilot experience, with significant improvements:

Core improvements:
- **Conversational flow**. Refine queries through natural follow-up questions without losing context. Each refinement builds on the last, so you can iterate toward the insight you need.
- **Improved accuracy**. Translations to Sumo Query Language are more reliable, especially for data sources with active dashboards.
- **Smarter error handling**. Instead of generic errors, Query Agent provides clear messages and actionable suggestions for next steps.

Advanced features:
- **Dashboard-aware translations via RAG**. Query Agent learns from dashboards opened in your org in the last 90 days to better interpret intent. This improves understanding of field names, data structure, and common queries, resulting in more accurate translations, especially for unstructured logs.
- **Automatic source detection**. Let Query Agent choose a data source based on your question, or enter one yourself for more control.
- **Clarifications when needed**. If your request is ambiguous, Query Agent asks follow-up questions to narrow intent rather than guessing.

Enhanced workflow:
- **Guided exploration**. Intent cards summarize your current goal, and suggestion cards offer refinements you can apply with a click.
- **Integrated interface**. A conversation pane shows your prompts and refinements, with queries rendered directly in the editor, live results, and the ability to branch or revisit past conversations.

### Example workflow

The steps below outline a typical conversational interaction pattern. You can apply the same approach to different logs, events, or dimensions. This type of investigation typically only takes a few minutes.

#### Step 1: Ask your initial question  

Use natural language to ask what you're looking for. For better results, include the name of the data source you're querying and any related fields or values. If you don't select a source, Query Agent chooses one automatically based on your question. You can override it by typing the source name directly or choosing from the **Auto Source Selection** dropdown.

For example, if you enter a broad question like "Show me AWS CloudTrail errors", your query will translate to Sumo Logic query language (something like `(_source="AWS CloudTrail") "error"`) and an intent card appears in the conversation pane summarizing your goal. Query Agent then surfaces suggestion cards with related refinements you can click. You'll also see an option to open your query in Log Search.

#### Step 2: Narrow the scope

After you click a follow-up suggestion or type a refinement, Query Agent refreshes the results and updates the intent card and query to reflect the new focus. With each refinement, Query Agent adjusts the query, applies the changes, and renders a visual chart.

For example, clicking a suggestion like "Show me trend of errors each minute" would apply a timeslice to group the results over time.

#### Step 3: Drill into causes

As you go, Query Agent presents new suggestions to help you pivot into related questions, such as analyzing trends of event reasons or identifying top namespaces. The intent card expands each time to include the new scope, and results show additional details.

For example, you could refine further by clicking a suggestion like "Show the count of error logs per minute, grouped by error code".

#### Step 4: Request a trend over time

If you type a time period, Query Agent would apply a timeslice to group results over time. For example, if you type "Show the trend over 24 hours", results would be divided into 1-hour buckets.

#### Next steps

In just a few conversational turns, you went from a broad question to a detailed analysis showing error trends grouped by error code over time.

From here, you can continue refining or explore different angles like [switching the chart type](/docs/search/mobot/#chart-type), [opening the query in Log Search](/docs/search/mobot/#step-4-open-in-log-search), [adjusting the time range](/docs/search/mobot/#time-range), [editing the query logic](/docs/search/mobot/#edit-query-code), or [starting over with a new chat](/docs/search/mobot/#new-conversation).

### Tips for better answers

Get the most out of Query Agent by following these tips:

* **Talk to it like a conversation**. Layer refinements instead of rewriting the whole question. For example, start with "Show me API errors" then follow up with "group by status code" and "show the last 6 hours."  
* **Be specific**. Combine filters, units, and percentiles in clear language. Instead of "show me errors," try "show me 500 errors from the API service in the last hour." Query Agent performs better with explicit filters, time ranges, and field names.
* **Ask about data tied to dashboards**. Query Agent works best when you reference data sources that already have dashboards built on them. Try asking questions using dashboard panel names or descriptions, even if built on unstructured logs.
* **Change chart types**. When results appear in a table view, change the visualization to a time-series chart (for example, line or area) to see the trend more clearly over time.
* **Change units in your query**. For example, "Convert GB to bytes".
* **Reuse queries from your conversation history**. Everything you ask is saved to your conversation history automatically. You can revisit, reuse, continue where you left off in prior conversations to compare or branch analyses.
* **Modify existing queries**. Add/remove fields, add `where`, `sort`, `avg()` clauses, and more.
* **Guide Query Agent with feedback**. If the result isn't right, use natural language. For example, "Don't filter by namespace, instead group by error type" or "Use P90 instead of P50."
* **Fix broken queries**. Paste a syntactically invalid query and Query Agent will correct it for you.

### FAQ

The questions below refer specifically to the conversational (Beta) experience. For general information, see [Mobot FAQ](/docs/search/mobot#faq).

<details>
<summary>Is any user or org data sent outside our environment?</summary>

No. All processing happens within your region's cluster. RAG context is scoped to dashboards in your own org—no cross-org data leakage.
</details>

<details>
<summary>What's the impact on query latency?</summary>

Typical end-to-end response time remains under 2 seconds for most queries. Very large result sets or percentile calculations over broad ranges may take up to 5 seconds. During Beta, full query generation may take 6 to 7 seconds, but Mobot streams the first token (intent interpretation) within 2 seconds.
</details>

<details>
<summary>How do I debug a failed translation?</summary>

If a translation fails, Mobot generates a contextual error message tailored to the situation. The message includes the generated query, explains why it failed, and suggests how to fix it (for example, `Try narrowing your time window` or `Simplify your filter expression`).

Here are some common cases:

* **No or delayed results**. Give Mobot a few seconds to process complex refinements.  
* **Output too broad**. Add more context (for example, specify a client or namespace).  
* **Unexpected numbers**. If results look off, be more explicit. For example, ask `show in milliseconds` or `convert to seconds` to adjust units, or say `show P90` / `switch back to P50 over 1 minute` to refine percentiles.  
</details>

<details>
<summary>What are the current limitations?</summary>

* For dashboard-aware translations via RAG, support is limited to the `sourceCategory` filter (selection in the source picker) at launch. Other expressions like `_index=` or `_sourceHost=` are not yet supported.  
* RAG only considers dashboards that have been opened in the last 90 days when interpreting your query.
* Very large or highly complex queries may time out or trigger structured fallback responses.
* The conversational experience is available for log-based searches only. Metrics and Metric Searches are not supported in this Beta.
* Mobot cannot currently refer to the output of a log search directly in subsequent queries. Each follow-up must be expressed in terms of query refinements rather than referencing previous results. This is an important limitation to be aware of when constructing multi-turn conversations.
</details>

## Knowledge agent

Select **Knowledge Agent** to get help using Sumo Logic.

<img src={useBaseUrl('img/search/mobot/knowledge-agent-select.png')} alt="Knowledge Agent button selected in the Mobot UI" style={{border: '1px solid gray'}} width="600" />

Knowledge Agent is your in-platform assistant for learning how to use Sumo Logic. Instead of searching through documentation or filing support tickets, simply ask questions and get clear, accurate answers sourced directly from official help docs without leaving your workflow.

Enter a question about Sumo Logic, such as "How do I add a collector for AWS CloudTrail?", "What are the API endpoints for Sumo Logic?", or anything else you need help with. The Knowledge agent returns an answer, including any relevant steps and links to the help documentation that served as the basis for the response.

Then ask follow-up questions. Knowledge Agent retains your conversation context for 24 hours from the time you ask your first question. After 24 hours, the session resets and prior context is no longer available. However, any new question will begin a new 24-hour session with its own preserved context. This means if you ask a question and follow up within 24 hours, Knowledge Agent remembers and continues the conversation seamlessly.

Here are some example questions:

<details>
<summary>Setup and configuration</summary>
- "How do I install a collector on Linux?"
- "How do I configure SAML for single sign-on?"
- "How do I set up log forwarding to an S3 bucket?"
</details>

<details>
<summary>Learning concepts</summary>
- "What's the difference between a metadata field and a parsed field?"
- "How does data tiering work in Sumo Logic?"
- "What are Field Extraction Rules?"
</details>

<details>
<summary>Troubleshooting</summary>
- "Why isn't my collector sending data?"
- "How do I fix authentication errors with AWS integration?"
- "My dashboard panels aren't loading—what should I check?"
</details>

<details>
<summary>Best practices</summary>
- "What's the recommended way to structure log queries for performance?"
- "How should I organize my folder structure?"
- "What are best practices for dashboard design?"
</details>

### Tips for better answers

* **Ask complete questions**. Instead of typing "Collectors", try "How do I install a collector on Windows?"
* **Provide context for troubleshooting**. For example, "I'm getting a 403 error when setting up AWS integration—what could be wrong?"
* **Follow up naturally**. If the initial answer is close but not quite right, ask follow-up questions like "What about for Azure instead of AWS?"
* **Reference specific features**. Use proper names when you know them: "How do I use Field Extraction Rules?" works better than "How do I extract fields?"

### FAQ

<details>
<summary>Does Knowledge Agent use my data to train external models?</summary>

Mobot and Knowledge Agent run on Amazon Bedrock, an approved and secure subprocessor that complies with Sumo Logic's privacy, security, and data-handling standards.

No customer data is ever used for model training. All processing happens within the secure boundaries of Sumo Logic's architecture, maintaining the same high level of data protection customers already trust.

</details>

<details>
<summary>Is my data safe when I use Knowledge Agent?</summary>

Yes. Knowledge Agent only processes what you provide during your session, and this data remains inside Sumo Logic's secure environment. Nothing is sent to external LLM providers for training or storage.

</details>

<details>
<summary>How does Knowledge Agent ensure accuracy?</summary>

Knowledge Agent pulls directly from Sumo Logic's official product documentation. Responses are always grounded in our published help content, making them accurate, citable, and aligned with the latest platform behavior.

No information is generated from unreliable external sources.

</details>

<details>
<summary>Can Knowledge Agent answer questions outside Sumo Logic's documentation?</summary>

No. Knowledge Agent is intentionally scoped to use Sumo Logic's internal documentation and resources only. This ensures answers remain trustworthy and consistent with product behavior.

</details>


## Additional resources

* [Mobot (formerly *Copilot*)](/docs/search/mobot)
* [Search Query Language](/docs/search/search-query-language)
* [Dashboards](/docs/dashboards)
