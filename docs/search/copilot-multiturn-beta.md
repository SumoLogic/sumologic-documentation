---
id: copilot-multiturn-beta
title: Sumo Logic Copilot Multiturn Conversations (Beta)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

use multi-turn conversation to refine and visualize queries

The new conversational experience in Copilot lets you interact with your queries the way you would with a chat assistant: you ask a question, refine it with follow-ups, change units or metrics, and see the updated query and visualization without starting over. Copilot maintains your intent across turns, surfaces helpful suggestions, and makes it easy to explore related angles.

This guide explains what’s new in the UI, how the multi-turn flow works, and shows example workflows. The examples—such as refining a latency query for an SLO or counting warning events—are illustrative. You can apply the same interaction pattern to any data or metric you care about.

## what’s new (before vs after)

* **Conversational refinement**. Before you had to reissue full queries for each change. Now you give follow-up instructions (for example, narrow scope, change units, switch percentiles) and the system updates the existing query while preserving prior context.  
* **Goal/intent cards**. Your current objective appears as a card (for example, "count critical warning events by namespace and threat actor"), making it easy to see what Copilot is working on and adjust it.  
* **Suggested next steps**. The UI surfaces related refinement suggestions you can click to explore alternate groupings, sorts, or filters without crafting new language from scratch.  
* **Integrated conversation pane**. A sidebar shows the flow of your prompts, current goal, and refinements, giving visibility into the multi-turn state.  
* **Immediate editable query**. Natural language instructions are translated into a query that appears in the editor with syntax highlighting; you can edit it directly or keep iterating via conversation.  
* **Live results and visuals**. Tables, charts, and other outputs update in place as you refine, with smooth transitions when changing things like percentiles or units.  
* **History and branching**. You can start a new conversation, revisit past ones, or branch off to compare different perspectives.

<!--Screenshot comparison (before vs after).  
Caption suggestion: "Before: flat query editing with no preserved conversational context. After: chat-style multi-turn pane with goal card, suggestions, generated query, and live results." -->

## key concepts

* **multi-turn conversation**. A sequence of related instructions you give so the system retains context and incrementally updates the query and output.  
* **intent card**. Visual summary of what you’re asking Copilot to do in this session.  
* **suggestion cards**. Recommended refinements or adjacent analyses you can apply with a click.  
* **timeslice**. Fixed interval (like one minute) used to bucket time-series data.  
* **percentile**. A metric summary such as P50 (median) or P90 that describes distribution behavior.

## example workflow: refining a latency query (illustrative)

> This is an example to demonstrate the interaction pattern. The same approach works for other metrics, logs, or event types.

### step 1 ask your initial question

Example:  
> What is the fetch latency for my SLO monitor?

The system translates your question into a query and displays it on the canvas. You see the generated query and the initial result.  
Screenshot placeholder: initial natural language question with generated latency query.*

### Step 2 narrow the scope

Example follow-up:  
> Only show results for the logs client.

Copilot updates the existing query to apply that filter and refreshes the results accordingly.  
Screenshot placeholder: query now filtered to the specific client.*

### step 3 change units

Example follow-up:  
> Convert latency from seconds to milliseconds.

The query logic and display adapt so the metric is expressed in milliseconds.  
Screenshot placeholder: unit conversion reflected in query and output.*

### step 4 request a percentile over time

Example follow-up:  
> Show me P50 latency over one-minute intervals as a graph.

Copilot adjusts the query to compute the P50 percentile in 1-minute timeslices and renders a visual chart.  
Screenshot placeholder: graph showing P50 latency trend.*

### step 5 switch percentile

Example follow-up:  
> Now show P90 instead.

The system updates both the query and chart to reflect the new percentile while preserving prior filters and unit conversions.  
Screenshot placeholder: updated chart with P90 latency.*

### Sample query patterns (replace with your actual fields)

#### Latency in milliseconds for a specific client

```sql
_sourceCategory="your-slo-category" sloName="your-slo-name" client="logs"
| measure avg(fetch_latency_seconds) as latency_seconds
| eval latency_ms = latency_seconds * 1000
```

```sql title="P50 latency over one-minute intervals"
_sourceCategory="your-slo-category" sloName="your-slo-name" client="logs"
| measure avg(fetch_latency_seconds) as latency_seconds
| eval latency_ms = latency_seconds * 1000
| timeslice 1m
| percentile(latency_ms, 50) by _timeslice
| sort _timeslice
```

switch to P90

```sql
... same as above ...
| percentile(latency_ms, 90) by _timeslice
```

example workflow: count critical warning events

step 1 set the goal
Ask:

Count the number of critical warning events by namespace and threat actor.

Copilot creates a goal card and generates an initial query that filters warning events and groups by relevant dimensions.
Screenshot placeholder: goal card with generated query and result table.

step 2 explore refinements
Use suggestions such as:

"Get count of critical warning events by namespace and manager sorted by highest count"

"Count warning events by namespace and the component that generated them"

Clicking or rephrasing applies those refinements instantly.
Screenshot placeholder: suggestion panel with related refinements.

sample query (from screenshot)

```sql
_sourcecategory=us2-primary-eks/events
| where %"object.type" == "Warning"
| count by %"object.metadata.namespace", %"object.metadata.managedfields[0].manager"
```

interpretation
The result shows each namespace, the managing component, and the count of warning events. You can further ask follow-ups like "show the top 5 namespaces by warning volume" or "filter to only high-severity namespaces."

## Best practices
talk to it like a conversation. Layer refinements instead of rewriting the whole question.

be specific. Combine filters, metrics, units, and percentiles in clear language.

use suggestions. Leverage the surfaced cards to pivot or drill down without manual query construction.

reuse history. Open prior conversations to compare or branch analyses.

## Troubleshooting

no or delayed results. Give Copilot a few seconds to process complex refinements.

output too broad. Add more context (specific client, namespace, metric).

unit is wrong. Explicitly ask "show in milliseconds" or "convert to seconds."

percentile isn't what you expected. Clarify by saying "show P90" or "switch back to P50 over 1 minute."

## Feedback

Share feedback where?. Your input helps improve the experience as it evolves toward wider availability.

alt text examples.

Before image: "Legacy flat query editor with no retained conversational context and static suggestions."

After image: "Chat-style multi-turn pane showing goal card, refinement suggestions, generated query, and updated results table."
