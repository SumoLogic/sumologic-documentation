---
id: flow-diagrams
title: Flow Diagrams
---

The Sankey diagram, a specific type of flow diagram, uses the width of an arrow or stripe to show the proportion of a quantity. In Sumo Logic, Flow Diagrams can show the flow within a distributed system, for example, or can be used to see how customers flow through your website via states, which are triggered by log events. These states can show you how long customers take to complete purchases, or even where users are dropping off your site or app.

Flow diagrams can be used as part of a saved search, or in a [dashboard](/docs/dashboards/panels/sankey-charts/).

The Sankey chart works with the [`transaction`](/docs/search/search-query-language/transaction-analytics) operator. When constructing your query, you will define the edges of the chart's lines; Sumo Logic sorts each transaction type into the correct flow line using the states defined in your query.

![flow diagram](/img/reuse/query-search/Flow_Diagram_example.png)

After creating a Flow Diagram, you can hover over any line in the diagram to see additional details between the two states, including loop backs. Additionally, you can click a line to run a drill down search on just that data.

Sankey diagrams are named after Irish Captain Matthew Sankey, an engineer who used this type of diagram in 1898 to show the energy efficiency of a steam engine. (Source: [sankey-diagrams.com](http://www.sankey-diagrams.com/who-is-this-sankey-guy/).)

## Creating Flow Diagrams

1. Run a search using a transaction operator. Make sure to include `fromstate` arguments to order the data properly.
1. In the Aggregates tab of the **Search** page, click the **Flow Diagram** icon.<br/>  ![FlowDiagram.png](/img/reuse/query-search/FlowDiagram.png)
1. Save the search as a Flow Diagram to run again later.

## Drilling down into Flow Diagram lines

Once you've built a Flow Diagram, you can launch a search by clicking
any line in the diagram.

To drill down in a Flow Diagram:

1. After running a transaction operator query, hover over a line in the Flow Diagram.<br/>  ![diagram](/img/reuse/query-search/Flow_Diagram_drilldown.png)
1. Click the line.
1. A new search tab opens, and the query that represents the states of the flow runs.

## Loop back

**Loop backs** in the flow (order) of states are tracked and displayed as red lines looping over the respective states in the flow diagram. You can hover over the loops to view the number of occurrences respective states had returned to a previous state.

![hover loop back.png](/img/search/searchquerylanguage/transaction-analytics/hover-loop-back.png)
