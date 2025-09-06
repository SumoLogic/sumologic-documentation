---
id: mobot-multiturn-beta
title: Sumo Logic Mobot Multi-turn Conversations (Beta)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

:::info
This feature is in Beta. For more information, contact your Sumo Logic account executive.
:::

Our new conversational experience in Sumo Logic Mobot (formerly known as Copilot) lets you interact with queries the way you would with a chat assistant. You ask a question and can refine it with follow-ups, change units, and see the updated query and visualization without starting over. Mobot maintains your intent across turns, surfaces helpful suggestions, and makes it easy to explore related angles. This guide explains what's new in the UI, how the multi-turn flow works, and shows example workflows.

## What's new in Beta

* **Multi-turn conversations**. Refine queries through natural, conversational follow-up questions without losing context.
* **Improved accuracy**. Translations to Sumo Query Language are more reliable, especially for data sources with active dashboards.
* **Clarifications when needed**. If your request is ambiguous, Mobot may ask a follow-up question to narrow intent.
* **Smarter error handling**. Instead of generic errors, Mobot provides clearer messages and fallback suggestions for next steps.
* **Dashboard-aware translations (via RAG)**. Mobot leverages queries from dashboards opened in your org in the last 90 days to better understand intent.
* **Guided exploration**. Intent cards summarize your current goal, and suggestion cards offer refinements you can apply with a click.
* **Integrated workflow**. A conversation pane shows your prompts and refinements, with queries rendered directly in the editor, live results, and the ability to branch or revisit past conversations.

## Example workflow

In the below example, we'll use the following key concepts:

* **Multi-turn conversation**. A sequence of related instructions that retains context and incrementally updates the query and output.  
* **Intent card**. Visual summary of what you're asking Mobot to do in this session.  
* **Suggestion cards**. Recommended refinements or adjacent analyses you can apply with a click.

This example workflow demonstrates the multi-turn interaction pattern; you can apply the same steps to other logs, events, or dimensions.

### Step 1: Ask your initial question  

Start broad when you set a goal. We'll ask: `Show failed login attempts in the last 24 hours`.

An intent card appears in the conversation pane that summarizes your goal. Mobot also surfaces suggestion cards with related refinements you can click, and gives you the option to open the query in Log Search.

<img src={useBaseUrl('img/search/mobot/initial-question.png')} alt="Mobot multi-turn conversation showing initial query, failed login attempts in the last 24 hours" width="700"/>

### Step 2: Narrow the scope  

The top reason in the table is `FailedScheduling`, so we'll select a follow-up suggestion, `Show failed scheduling events`. Mobot refreshes the results and updates the intent card and query to reflect the new focus.

<img src={useBaseUrl('img/search/mobot/narrow-scope.png')} alt="Mobot multi-turn conversation showing refinement, failed scheduling events" width="700"/>

Now, refine further by typing: `Break down failed scheduling events by namespace`

<img src={useBaseUrl('img/search/mobot/narrow-scope-filter.png')} alt="Mobot multi-turn conversation showing refinement, failed scheduling events by namespace" width="700"/>

Mobot adjusts the query, applies the refinements, and renders a visual chart.

### Step 3: Drill into causes

Next, type `Add error messages`. Mobot translates this into: `Add error messages to the breakdown of failed scheduling events by namespace`. The intent card expands to include the new scope, and results now show error message details.

<img src={useBaseUrl('img/search/mobot/drill-causes.png')} alt="Mobot multi-turn conversation showing error messages" width="700"/>

### Step 4: Request a trend over time

Finally, type: `Show the trend over 24 hours`. Mobot translates this into: `Show the trend of failed scheduling events by namespace with error messages over 24 hours`. The query applies a timeslice (for example, one-hour buckets) to group results over time.

<img src={useBaseUrl('img/search/mobot/trend-over-time.png')} alt="Mobot multi-turn conversation showing trend over time" width="700"/>

Mobot also presents new suggestion cards to help you pivot into related questions, such as analyzing trends of event reasons or identifying top namespaces.

### Next steps

As with legacy Mobot, you can adjust the [time range](/docs/search/mobot/#time-range), switch to a different [chart type](/docs/search/mobot/#chart-type), or make other refinements. For example, in the previous step, where the results appear in a table view, you can change the visualization to a time-series chart (for example, line or area) to see the trend more clearly over time.

You can also [edit the query logic](/docs/search/mobot/#edit-query-code), [open in Log Search](/docs/search/mobot/#step-4-open-in-log-search), or start over with a [new chat](/docs/search/mobot/#new-conversation).

## Best practices

* **Talk to it like a conversation**. Layer refinements instead of rewriting the whole question.  
* **Be specific**. Combine filters, units, and percentiles in clear language.
* **Ask about data tied to dashboards**. Mobot works best when you reference data sources that already have dashboards built on them.
* **Use suggestions**. Leverage the surfaced cards to pivot or drill down without manual query construction.  
* **Reuse history**. Open prior conversations to compare or branch analyses.

## FAQ

The questions below refer specifically to the multi-turn conversion (beta) experience. For general information about Mobot, see the [Mobot FAQ](/docs/search/mobot#faq).

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
* Multi-turn Mobot is available for log-based searches only. Metrics and Metric Searches are not supported in this Beta.
</details>

## Additional resources

* [Mobot](/docs/search/mobot)
* [Search Query Language](/docs/search/search-query-language)
* [Dashboards](/docs/dashboards)
