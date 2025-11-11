---
id: mobot-multiturn-beta
title: Mobot (Beta)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Our new conversational experience in Mobot (formerly known as Copilot) lets you interact with queries the way you would with a chat assistant. You ask a question and can refine it with follow-ups, change units, and see the updated query and visualization without starting over. Mobot maintains your intent across turns, surfaces helpful suggestions, and makes it easy to explore related angles. This guide explains what's new in the UI and how the conversational flow works.

<!-- What is Mobot? consists of query agent which does xxxx and knowledge agent which does xxx -->

* **Conversational flow**. Refine queries through natural, conversational follow-up questions without losing context. A sequence of related instructions that retains context and incrementally updates the query and output.
* **Automatic source detection**. Have Mobot choose a data source automatically based on your question or enter one yourself.
* **Improved accuracy**. Translations to Sumo Query Language are more reliable, especially for data sources with active dashboards.
* **Clarifications when needed**. If your request is ambiguous, Mobot may ask a follow-up question to narrow intent.
* **Smarter error handling**. Instead of generic errors, Mobot provides clearer messages and fallback suggestions for next steps.
* **Dashboard-aware translations (via Retrieval-Augmented Generation, or RAG)**. Mobot leverages queries from dashboards opened in your org in the last 90 days to better understand intent.
* **Guided exploration**. Intent cards summarize your current goal, and suggestion cards offer refinements you can apply with a click.
* **Integrated workflow**. A conversation pane shows your prompts and refinements, with queries rendered directly in the editor, live results, and the ability to branch or revisit past conversations.

## Query Agent

Select **Query Agent** to get help with Sumo Logic queries.

<img src={useBaseUrl('img/search/mobot/mobot-logs-agent-button.png')} alt="Query Agent button selected in the Mobot UI" style={{border: '1px solid gray'}} width="600" />

### Typical workflow

The steps below outline a common conversational interaction pattern. You can apply the same approach to different logs, events, or dimensions.

#### Step 1: Ask your initial question  

Use natural language to ask what you're looking for. You can start broad when you set a goal, or more specific (i.e., specifying the data source and any related fields or values).

If you don't select a source, Mobot chooses one automatically based on your question. You can override it by typing the source name directly in your prompt (as demonstrated below) or by choosing it from the **Auto Source Selection** dropdown.

For example, enter a broad question: `Show me Bedrock errors`.

An intent card appears in the conversation pane summarizing your goal. Mobot then surfaces suggestion cards with related refinements, which you can click. You'll also see an option to open your query in Log Search.

#### Step 2: Narrow the scope

<img src={useBaseUrl('img/search/mobot/initial-question.png')} alt="Mobot conversational experience showing initial query" style={{border: '1px solid gray'}} width="700"/>

After you click a follow-up suggestion or type a refinement, Mobot refreshes the results and updates the intent card and query to reflect the new focus. With each refinement, Mobot adjusts the query, applies the changes, and renders a visual chart.

For example, clicking the suggestion `Show me trend of errors each minute` applies a timeslice to group the results over time.

<img src={useBaseUrl('img/search/mobot/narrow-scope.png')} alt="Mobot conversational experience showing refinement to trend of errors each minute" style={{border: '1px solid gray'}} width="700"/>

#### Step 3: Drill into causes

As you go, Mobot presents new suggestions to help you pivot into related questions, such as analyzing trends of event reasons or identifying top namespaces. The intent card expands each time to include the new scope, and results show additional details.

We'll refine further by clicking the suggestion `Show the count of error logs per minute, grouped by error code`.

<img src={useBaseUrl('img/search/mobot/narrow-scope-filter.png')} alt="Mobot conversational experience showing the count of error logs per minute, grouped by error code" style={{border: '1px solid gray'}} width="700"/>

<!--
Next, type `Add error messages`. Mobot translates this into: `Add error messages to the breakdown of failed scheduling events by namespace`.

<img src={useBaseUrl('img/search/mobot/drill-causes.png')} alt="Mobot conversational experience showing error messages for failed scheduling events" style={{border: '1px solid gray'}} width="700"/>
-->

#### Step 4: Request a trend over time

If you type a time period (for example, `Show the trend over 24 hours`), the query applies a timeslice (for example, one-hour buckets) to group results over time.

:::tip
Ask Mobot to change units in your query. For example, `Convert GB to bytes`.
:::

<!--
Finally, type: `Show the trend over 24 hours`. Mobot translates this into: `Show the trend of failed scheduling events by namespace with error messages over 24 hours`.
<img src={useBaseUrl('img/search/mobot/trend-over-time.png')} alt="Mobot conversational experience showing trend over time" style={{border: '1px solid gray'}} width="700"/>

where the results appear in a table view, you can change the visualization to a time-series chart (for example, line or area) to see the trend more clearly over time.
-->

#### Next steps

As with legacy Mobot, you can adjust the [time range](/docs/search/mobot/#time-range), switch [chart types](/docs/search/mobot/#chart-type), [edit the query logic](/docs/search/mobot/#edit-query-code), [open in Log Search](/docs/search/mobot/#step-4-open-in-log-search), or start over with a [new chat](/docs/search/mobot/#new-conversation).

### Best practices

* **Talk to it like a conversation**. Layer refinements instead of rewriting the whole question.  
* **Be specific**. Combine filters, units, and percentiles in clear language.
* **Ask about data tied to dashboards**. Mobot works best when you reference data sources that already have dashboards built on them. Ask questions using dashboard panel names or descriptions, even if built on unstructured logs.
* **Reuse queries from your conversation history**. Everything you ask is saved to your conversation history automatically. You can revisit, reuse, continue where you left off in prior conversations to compare or branch analyses.
* **Modify existing queries**. Add/remove fields, add `where`, `sort`, `avg()` clauses, and more.
* **Guide Mobot with feedback**. If the result isn't right, use natural language: `Don't do X, instead do Y`.
* **Fix broken queries**. Paste a syntactically invalid query. Mobot will correct it.
