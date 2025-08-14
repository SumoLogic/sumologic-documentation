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

## Beta release highlights

* **Contextual multi-turn**. Refine queries through natural, conversational follow-up questions without losing prior context.  
* **Dashboard-aware translations (via RAG)**. Copilot leverages recent dashboard queries in your org to improve translation accuracy and better understand your intent.  
* **Structured fallback & descriptive errors**. Get clear, actionable messages instead of generic errors when Copilot hits a limit or cannot translate.  
* **Pro tip**. For best results, ask questions about data sources that already have dashboards built on them, Copilot performs best with those contexts.

## What's new (before and after)

* **Conversational refinement**. Before, you had to reissue full queries for each change. Now you give follow-up instructions (for example, narrow scope, change units, switch percentiles) and the system updates the existing query while preserving context.  
* **Goal/intent cards**. Your current objective appears as a card (for example, `count critical warning events by namespace and threat actor`), making it easy to see what Copilot is working on and adjust it.  
* **Suggested next steps**. The UI surfaces related refinement suggestions you can click to explore alternate groupings, sorts, or filters without crafting new language.  
* **Integrated conversation pane**. A sidebar shows the flow of your prompts, current goal, and refinements, giving visibility into the multi-turn state.  
* **Immediate editable query**. Natural language instructions are translated into a query that appears in the editor with syntax highlighting; you can edit it directly or keep iterating via conversation.  
* **Live results and visuals**. Tables, charts, and other outputs update in place as you refine, with smooth transitions when changing things like percentiles or units.  
* **History and branching**. You can start a new conversation, revisit past ones, or branch off to compare different perspectives.

<div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
  <figure style={{flex: 1, minWidth: 300}}>
    <img src={useBaseUrl('/img/copilot-multiturn/before.png')} alt="Legacy flat query editor with no preserved conversational context and static suggestions" />
    <figcaption>before: flat query editing with no preserved multi-turn context</figcaption>
  </figure>
  <figure style={{flex: 1, minWidth: 300}}>
    <img src={useBaseUrl('/img/copilot-multiturn/after.png')} alt="Chat-style multi-turn pane showing goal card, suggested refinements, generated query, and live results" />
    <figcaption>after: conversation pane with intent, suggestions, query, and updated results</figcaption>
  </figure>
</div>

* **Alt text examples**.  
  * before image: legacy flat query editor with no retained conversational context and static suggestions.  
  * after image: chat-style multi-turn pane showing intent card, suggested refinements, generated query, and live results table.  


In the below examples, we'll use the following key concepts:

* **Multi-turn conversation**. A sequence of related instructions that retains context and incrementally updates the query and output.  
* **Intent card**. Visual summary of what you're asking Copilot to do in this session.  
* **Suggestion cards**. Recommended refinements or adjacent analyses you can apply with a click.  
* **Timeslice**. Fixed interval (for example, one minute) used to bucket time-series data.  
* **Percentile**. A metric summary such as P50 (median) or P90 that describes distribution behavior.

## Example workflow: Refining a latency query

:::note
This workflow is only an example of the multi-turn interaction pattern. You can apply the same steps to other metrics, logs, events, or dimensions.
:::

### Step 1: Ask your initial question  

Example: `What is the fetch latency for my SLO monitor?`

Copilot translates your question into a query and displays it on the canvas. You see the generated query and the initial result.  
*Screenshot placeholder: initial natural language question with generated latency query.*

### Step 2: Narrow the scope  

Example follow-up: `Only show results for the logs client.`

Copilot updates the existing query to apply that filter and refreshes the results accordingly.  
*Screenshot placeholder: query now filtered to the specific client.*

### Step 3: Change units

Example follow-up: `Convert latency from seconds to milliseconds.`

The query logic and display adapt so the metric is expressed in milliseconds.  
*Screenshot placeholder: unit conversion reflected in query and output.*

### Step 4: Request a percentile over time

Example follow-up: `Show me P50 latency over one-minute intervals as a graph.`

Copilot adjusts the query to compute the P50 percentile in one-minute timeslices and renders a visual chart.  
*Screenshot placeholder: graph showing P50 latency trend.*

### Step 5: Switch percentile

Example follow-up: `Now show P90 instead.`

Copilot updates both the query and chart to reflect the new percentile while preserving prior filters and unit conversions.  
*Screenshot placeholder: updated chart with P90 latency.*

### Sample query patterns (replace with your actual fields)

#### Latency in milliseconds for a specific client

```sql
_sourceCategory="your-slo-category" sloName="your-slo-name" client="logs"
| measure avg(fetch_latency_seconds) as latency_seconds
| eval latency_ms = latency_seconds * 1000
```

#### P50 latency over one-minute intervals
```sql
_sourceCategory="your-slo-category" sloName="your-slo-name" client="logs"
| measure avg(fetch_latency_seconds) as latency_seconds
| eval latency_ms = latency_seconds * 1000
| timeslice 1m
| percentile(latency_ms, 50) by _timeslice
| sort _timeslice
```

#### Switch to P90

```sql
... same as above ...
| percentile(latency_ms, 90) by _timeslice
```

## Example workflow: count critical warning events

### Step 1: Set the goal

Ask: `Count the number of critical warning events by namespace and threat actor.`

Copilot creates an intent card and generates an initial query that filters for warning events and groups by the relevant dimensions.  
*Screenshot placeholder: goal card with generated query and result table.*

### Step 2: Explore refinements  

Use suggestions such as:  
* `Get count of critical warning events by namespace and manager sorted by highest count`  
* `Count warning events by namespace and the component that generated them`

Clicking a suggestion or typing a follow-up applies those refinements instantly.  
*Screenshot placeholder: suggestion panel with related refinements.*

### Sample query (from screenshot)

```sql
_sourcecategory=us2-primary-eks/events
| where %"object.type" == "Warning"
| count by %"object.metadata.namespace", %"object.metadata.managedfields[0].manager"
```

### Interpretation  

The result shows each namespace, the managing component, and the count of warning events. You can further ask follow-ups like `show the top 5 namespaces by warning volume` or `filter to only high-severity namespaces`.

## Best practices

* **Talk to it like a conversation**. Layer refinements instead of rewriting the whole question.  
* **Be specific**. Combine filters, metrics, units, and percentiles in clear language.  
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
