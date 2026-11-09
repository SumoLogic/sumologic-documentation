---
id: sankey-charts
title: Sankey Charts
description: The Sankey diagram helps you understand the flow of the log events within a distributed system.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

A Sankey diagram is a type of flow diagram that uses the width of an arrow or stripe to show the proportion of a quantity. In Sumo Logic, a Sankey diagram can represent the flow within a distributed system. For example, you can use it to see how customers move through your website by state, where log events trigger the states. These states can show you how long customers take to complete purchases, or where users leave your site or app.

The Sankey chart works with the [`transaction`](/docs/search/search-query-language/transaction-analytics) operator. When you build your query, you define the edges of the chart's lines. Sumo Logic uses the states in your query to sort each transaction type into the correct flow line.<br/><img src={useBaseUrl('/img/dashboards/panels/sankey-chart/sankey_chart.png')} alt="sankey_chart" width="800" style={{border: '1px solid gray'}} />

After you create a Sankey diagram, hover over any line to see more details about the two states it connects, including loop backs. You can also click a line to run a drill-down search on only that data.

Sankey diagrams are named after Irish Captain Matthew Sankey, an engineer who used this type of diagram in 1898 to show the energy efficiency of a steam engine. (Source: [sankey-diagrams.com](https://www.sankey-diagrams.com/who-is-this-sankey-guy/).)

## Create a Sankey chart

To add a panel with a Sankey chart:
1. Create or open a dashboard and click **Add Panel > Categorical**. <br/><img src={useBaseUrl('/img/dashboards/panels/sankey-chart/panel_type.png')} alt="FlowDiagram" width="700" style={{border: '1px solid gray'}} />
1. Type a supported query in the Search box, including the `fromstate` and `tostate` arguments, and press **Enter** for it to run.
1. Once the search results appear, select **Sankey** from the **Chart Type** dropdown.<br/><img src={useBaseUrl('/img/dashboards/panels/sankey-chart/chart_type.png')} alt="chart_type" width="800" style={{border: '1px solid gray'}} />
1. [Modify the chart](/docs/dashboards/panels/modify-chart/) as desired.

### Loop back

The chart tracks **loop backs** in the order of states and displays them as red lines that loop over the states. Hover over a loop to see how many times each state returned to a previous state.<br/><img src={useBaseUrl('/img/search/searchquerylanguage/transaction-analytics/hover-loop-back.png')} alt="hover loop back" width="500" style={{border: '1px solid gray'}} />
