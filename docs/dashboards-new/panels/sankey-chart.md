---
id: sankey-charts
title: Sankey Charts
description: The Sankey diagram helps you understand the flow of the log events within a distributed system. 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Sankey diagrams, a specific type of flow diagram, uses the width of an arrow or stripe to show the proportion of a quantity. In Sumo Logic, Flow Diagrams can show the flow within a distributed system, for example, it can be used to see how customers flow through your website via states, which are triggered by log events. These states can show you how long customers take to complete purchases, or even where users are dropping off your site or app.

The Sankey chart works with the [transaction](/docs/search/search-query-language/transaction-analytics) operator. When constructing your query, you will define the edges of the chart's lines; Sumo Logic sorts each transaction type into the correct flow line using the states defined in your query.

![flow diagram](/img/reuse/query-search/Flow_Diagram_example.png)

After creating a Flow Diagram, you can hover over any line in the diagram to see additional details between the two states, including loop backs. Additionally, you can click a line to run a drill down search on just that data.

Sankey diagrams are named after Irish Captain Matthew Sankey, an engineer who used this type of diagram in 1898 to show the energy efficiency of a steam engine. (Source: [sankey-diagrams.com](http://www.sankey-diagrams.com/who-is-this-sankey-guy/).)

## Create a Sankey chart

To add a panel with a Sankey chart:
1. Create or open a Dashboard (New) and click on **Add Panel > Categorical**. 
1. Type a supported query in the Search box, including `fromstate` and `tostate` arguments and press **Enter** for it to run.
1. Once the search results appear, select **Sankey** from the **Chart Type** dropdown.<br/><img src={useBaseUrl('//img/reuse/query-search/FlowDiagram.png')} alt="FlowDiagram" width="700"/>
1. [Modify the chart](/docs/dashboards-new/panels/modify-chart/) as desired.

### Loop back

**Loop backs** in the flow (order) of states are tracked and displayed as red lines looping over the respective states in the flow diagram. You can hover over the loops to view the number of occurrences respective states had returned to a previous state.<br/><img src={useBaseUrl('/img/search/searchquerylanguage/transaction-analytics/hover-loop-back.png')} alt="hover loop back" width="700"/>
