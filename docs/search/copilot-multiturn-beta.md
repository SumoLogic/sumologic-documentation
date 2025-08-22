---
id: copilot-multiturn-beta
title: Sumo Logic Copilot Multi-turn Conversations (Beta)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

Our new conversational experience in Sumo Logic Copilot lets you interact with queries the way you would with a chat assistant. You ask a question, refine it with follow-ups, change units or metrics, and see the updated query and visualization without starting over. Copilot maintains your intent across turns, surfaces helpful suggestions, and makes it easy to explore related angles.

This guide explains what's new in the UI, how the multi-turn flow works, and shows example workflows. The examples, such as refining a latency query for an SLO or counting warning events, are illustrative. You can apply the same interaction pattern to any data, log, or metric you care about.

## What's new in Beta

* **Contextual multi-turn**. Refine queries through natural, conversational follow-up questions without losing prior context.
* **Improved accuracy**. Copilot better translates natural language into Sumo Query Language, grounded in your org's dashboards and past activity.
* **Ask back for clarification**. If a request is ambiguous, Copilot may ask clarifying questions to narrow down intent.
* **Better error handling**. When Copilot cannot translate, it provides clearer error messages and suggestions for next steps.
* **Dashboard-aware translations (via RAG)**. Copilot leverages recent dashboard queries in your org to improve translation accuracy and better understand your intent.
* **Structured fallback and descriptive errors**. Get clear, actionable messages instead of generic errors when Copilot hits a limit or cannot translate.
* **Goal/intent cards**. Your current objective appears as a card (for example, `count critical warning events by namespace and threat actor`), making it easy to see what Copilot is working on and adjust it.
* **Suggested next steps**. The UI surfaces related refinement suggestions you can click to explore alternate groupings, sorts, or filters without crafting new language.
* **Integrated conversation pane**. A sidebar shows the flow of your prompts, current goal, and refinements, giving visibility into the multi-turn state.
* **Immediate editable query**. Natural language instructions are translated into a query that appears in the editor with syntax highlighting; you can edit it directly or keep iterating via conversation.
* **Live results and visuals**. Tables, charts, and other outputs update in place as you refine, with smooth transitions when changing things like percentiles or units.
* **History and branching**. You can start a new conversation, revisit past ones, or branch off to compare different perspectives.


## Example workflow

In the below example, we'll use the following key concepts:

* **Multi-turn conversation**. A sequence of related instructions that retains context and incrementally updates the query and output.  
* **Intent card**. Visual summary of what you're asking Copilot to do in this session.  
* **Suggestion cards**. Recommended refinements or adjacent analyses you can apply with a click.

This workflow demonstrate the multi-turn interaction pattern; you can apply the same steps to other metrics, logs, events, or dimensions.

### Step 1: Ask your initial question  

Start broad when you set a goal: `Show failed login attempts in the last 24 hours`. An intent card appears at the top, summarizing your goal. Copilot also surfaces suggestion cards with related refinements you can click, and gives you the option to open the query in Log Search.

<img src={useBaseUrl('img/search/copilot/initial-question.png')} alt="Copilot multi-turn conversation showing initial query, failed login attempts in the last 24 hours" width="700"/>

### Step 2: Narrow the scope  

The top reason in the table is `FailedScheduling`, so we'll select a follow-up suggestion, `Show failed scheduling events`. Copilot refreshes the results and updates the intent card and query to reflect the new focus.

<img src={useBaseUrl('img/search/copilot/narrow-scope.png')} alt="Copilot multi-turn conversation showing refinement, failed scheduling events" width="700"/>

Now, refine further by typing: `Break down failed scheduling events by namespace`

<img src={useBaseUrl('img/search/copilot/narrow-scope-filter.png')} alt="Copilot multi-turn conversation showing refinement, failed scheduling events by namespace" width="700"/>

Copilot adjusts the query, applies the refinements, and renders a visual chart.

### Step 3: Drill into causes

Next, type `Add error messages`. Copilot translates this into: `Add error messages to the breakdown of failed scheduling events by namespace`. The intent card expands to include the new scope, and results now show error message details.

<img src={useBaseUrl('img/search/copilot/drill-causes.png')} alt="Copilot multi-turn conversation showing error messages" width="700"/>

### Step 4: Request a trend over time

Finally, type: `Show the trend over 24 hours`. Copilot translates this into: `Show the trend of failed scheduling events by namespace with error messages over 24 hours`. The query applies a timeslice (for example, one-hour buckets) to group results over time.

<img src={useBaseUrl('img/search/copilot/trend-over-time.png')} alt="Copilot multi-turn conversation showing trend over time" width="700"/>

Copilot also presents new suggestion cards to help you pivot into related questions, such as analyzing trends of event reasons or identifying top namespaces.

### Next steps

As with legacy Copilot, you can adjust the [time range](/docs/search/copilot/#time-range), switch to a different [chart type](/docs/search/copilot/#chart-type), or make other refinements. For example, in the previous step, where the results appear in a table view, you can change the visualization to a time-series chart (for example, line or area) to see the trend more clearly over time.

You can also [edit the query logic](/docs/search/copilot/#edit-query-code), [open in Log Search](/docs/search/copilot/#step-4-open-in-log-search), or start over with a [new chat](/docs/search/copilot/#new-conversation).

## Best practices

* **Talk to it like a conversation**. Layer refinements instead of rewriting the whole question.  
* **Be specific**. Combine filters, metrics, units, and percentiles in clear language.
* **Ask about data tied to dashboards**. Copilot works best when you reference data sources that already have dashboards built on them.
* **Use suggestions**. Leverage the surfaced cards to pivot or drill down without manual query construction.  
* **Reuse history**. Open prior conversations to compare or branch analyses.

## FAQ

### Telemetry and success metrics

<details>
<summary>What usage data do we collect?</summary>
We track:
* number of multi-turn sessions started
* average turns per session
* RAG hits vs. misses
* structured fallback occurrences
</details>

### Security and compliance

<details>
<summary>Is any user or org data sent outside our environment?</summary>
No. All processing happens within your region's cluster. RAG context is scoped to dashboards in your own org—no cross-org data leakage.
</details>

<details>
<summary>Who can access multi-turn?</summary>
Only users with the standard Copilot feature flag in enabled Beta orgs. Admins can toggle access via the feature-flag UI.
</details>

### Performance considerations

<details>
<summary>What's the impact on query latency?</summary>
Typical end-to-end response time remains under 2s for most queries. Very large result sets or percentile calculations over broad time ranges may take up to 5s, after which a structured fallback suggests narrowing the window.
</details>


### Known issues and troubleshooting

<details>
<summary>How do I debug a failed translation?</summary>
If a translation fails, Copilot will return a structured error with an error code and suggested next steps for debugging (for example, "try narrowing your time window" or "simplify your filter expression").

* **No or delayed results**. Give Copilot a few seconds to process complex refinements.  
* **Output too broad**. Add more context (specific client, namespace, metric).  
* **Unit is wrong**. Explicitly ask `show in milliseconds` or `convert to seconds`.
* **Percentile isn't what you expected**. Clarify by saying `show P90` or `switch back to P50 over 1 minute`.
</details>

<details>
<summary>What are the current limitations?</summary>
* RAG support is limited to `sourceCategory` filter (selection in source picker) at launch. Other expressions like `_index=` or `_sourceHost=` are not yet supported.
* Dashboards must have been opened in the last 90 days to be considered in RAG context.
* Very large or highly complex queries may time out or trigger structured fallback responses.
</details>

### Future roadmap

<details>
<summary>What's coming after this Beta?</summary>
A: We plan to add support for RAG on additional sources (for example, `_index`, `_sourceHost`), expand dashboard lookback beyond 90 days, and introduce API/CLI access for scripted workflows.
</details>

### Opt-in / opt-out

<details>
<summary>Can I opt out of multi-turn while remaining on Copilot?</summary>
Yes. Contact your Sumo Logic support engineer to disable it if needed.
</details>

## Feedback

Share feedback ***with AE or directly in the product?*** Your input helps improve the experience as it evolves toward wider availability.

## Additional resources

* [Search Query Language](/docs/search/search-query-language)
