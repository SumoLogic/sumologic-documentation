---
id: mobot-multiturn-beta
title: Mobot (Beta)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

:::info
This feature is in Beta. For more information, contact your Sumo Logic account executive.
:::

Our new conversational experience in Mobot (formerly known as Copilot) lets you interact with queries the way you would with a chat assistant. You ask a question and can refine it with follow-ups, change units, and see the updated query and visualization without starting over. Mobot maintains your intent across turns, surfaces helpful suggestions, and makes it easy to explore related angles. This guide explains what's new in the UI and how the conversational flow works.

As we transition the feature name from *Copilot* to *Mobot*, some UI labels and screenshots may still show **Copilot**. Functionality is unchanged.

## What's new in Beta

* **Conversational flow**. Refine queries through natural, conversational follow-up questions without losing context. A sequence of related instructions that retains context and incrementally updates the query and output.
* **Automatic source detection**. Have Mobot choose a data source automatically based on your question or enter one yourself.
* **Improved accuracy**. Translations to Sumo Query Language are more reliable, especially for data sources with active dashboards.
* **Clarifications when needed**. If your request is ambiguous, Mobot may ask a follow-up question to narrow intent.
* **Smarter error handling**. Instead of generic errors, Mobot provides clearer messages and fallback suggestions for next steps.
* **Dashboard-aware translations (via Retrieval-Augmented Generation, or RAG)**. Mobot leverages queries from dashboards opened in your org in the last 90 days to better understand intent.
* **Guided exploration**. Intent cards summarize your current goal, and suggestion cards offer refinements you can apply with a click.
* **Integrated workflow**. A conversation pane shows your prompts and refinements, with queries rendered directly in the editor, live results, and the ability to branch or revisit past conversations.

## Typical workflow

The steps below outline a common conversational interaction pattern. You can apply the same approach to different logs, events, or dimensions.

### Step 1: Ask your initial question  

Use natural language to ask what you're looking for. You can start broad when you set a goal, or, for better results, include the name of the data source you're querying, and any related field names or values.

If you don't select a source, Mobot chooses one automatically based on your question. You can override it by typing the source name directly in your prompt, or by choosing it manually from the **Auto Source Selection** dropdown.

After this, an intent card appears in the conversation pane summarizing your goal. Mobot then surfaces suggestion cards with related refinements, which you can click. You'll also see an option to open your query in Log Search.

<!-- replace
We'll ask: `Show failed login attempts in the last 24 hours`.
<img src={useBaseUrl('img/search/mobot/initial-question.png')} alt="Mobot conversational experience showing initial query for failed login attempts in the last 24 hours" style={{border: '1px solid gray'}} width="700"/>
-->

### Step 2: Narrow the scope  

After clicking on a follow-up suggestion, Mobot refreshes the results and updates the intent card and query to reflect the new focus. With each subsequent refinement, Mobot adjusts the query, applies the refinements, and renders a visual chart.


<!--
The top reason in the table is `FailedScheduling`, so we'll select a follow-up suggestion, `Show failed scheduling events`.
<img src={useBaseUrl('img/search/mobot/narrow-scope.png')} alt="Mobot conversational experience showing refinement to failed scheduling events" style={{border: '1px solid gray'}} width="700"/>
Now, refine further by typing: `Break down failed scheduling events by namespace`.

<img src={useBaseUrl('img/search/mobot/narrow-scope-filter.png')} alt="Mobot conversational experience showing failed scheduling events broken down by namespace" style={{border: '1px solid gray'}} width="700"/>
-->

### Step 3: Drill into causes

As you go, Mobot presents new suggestion cards to help you pivot into related questions, such as analyzing trends of event reasons or identifying top namespaces.

You can also manually type a refinement (for example, `Add error messages`). The intent card expands to include the new scope and results now show new details.

<!--
Next, type `Add error messages`. Mobot translates this into: `Add error messages to the breakdown of failed scheduling events by namespace`.

<img src={useBaseUrl('img/search/mobot/drill-causes.png')} alt="Mobot conversational experience showing error messages for failed scheduling events" style={{border: '1px solid gray'}} width="700"/>
-->

### Step 4: Request a trend over time

If you type a time period (for example, `Show the trend over 24 hours`), the query applies a timeslice (for example, one-hour buckets) to group results over time.

:::tip
Ask Mobot to change units in your query. For example, `Convert GB to bytes`.
:::

<!--
Finally, type: `Show the trend over 24 hours`. Mobot translates this into: `Show the trend of failed scheduling events by namespace with error messages over 24 hours`.
<img src={useBaseUrl('img/search/mobot/trend-over-time.png')} alt="Mobot conversational experience showing trend over time" style={{border: '1px solid gray'}} width="700"/>

where the results appear in a table view, you can change the visualization to a time-series chart (for example, line or area) to see the trend more clearly over time.
-->

### Next steps

As with legacy Mobot, you can adjust the [time range](/docs/search/mobot/#time-range), switch [chart types](/docs/search/mobot/#chart-type), [edit the query logic](/docs/search/mobot/#edit-query-code), [open in Log Search](/docs/search/mobot/#step-4-open-in-log-search), or start over with a [new chat](/docs/search/mobot/#new-conversation).

## Best practices

* **Talk to it like a conversation**. Layer refinements instead of rewriting the whole question.  
* **Be specific**. Combine filters, units, and percentiles in clear language.
* **Ask about data tied to dashboards**. Mobot works best when you reference data sources that already have dashboards built on them. Ask questions using dashboard panel names or descriptions, even if built on unstructured logs.
* **Reuse queries from your conversation history**. Everything you ask is saved to your conversation history automatically. You can revisit, reuse, continue where you left off in prior conversations to compare or branch analyses.
* **Modify existing queries**. Add/remove fields, add `where`, `sort`, `avg()` clauses, etc.
* **Guide Mobot with feedback**. If the result isn't right, use natural language: `Don't do X, instead do Y`.
* **Fix broken queries**. Paste a syntactically invalid query. Mobot will correct it.

## FAQ

The questions below refer specifically to the conversational (Beta) experience. For general information about Mobot, see the [Mobot FAQ](/docs/search/mobot#faq).

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
</details>

## Additional resources

* [Mobot (formerly known as *Copilot*)](/docs/search/mobot)
* [Search Query Language](/docs/search/search-query-language)
* [Dashboards](/docs/dashboards)
