---
id: create-dashboard-new
title: Create a Dashboard
description: Learn how to create your own custom Dashboard with a panel and query, then customize a chart and add the chart to the dashboard.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

This page demonstrates how to create a Dashboard, add a query, and then add the chart to the dashboard. You create your Dashboard by selecting template options from menus and dropdowns.

Dashboard allows you to view logs and metrics data on the same dashboard in an integrated and seamless view. This gives you the same control over how your metrics and log data are visualized. Dashboard template capabilities provide for easier data scoping and intuitive chart creation.

:::sumo Micro Lesson

Rather watch a short micro lesson video?

<Iframe url="https://fast.wistia.net/embed/iframe/xqz4whg781?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Create a Simple Dashboard Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

## Dashboard AutoSave

When you rename or add a panel to a dashboard it is automatically saved in your Sumo Logic Personal folder. Likewise, ongoing changes and additions to the dashboard are saved. This ensures the integrity of your work and prevents any loss due to unforeseen interruptions or outages.

## Create a Dashboard

There are two ways to create a **Dashboard**, either by using the following method, or by creating it directly from the [Log Search page](#log-search-page) or [Metrics page](#metrics-page). Panels and customized charts will be added in later steps.

1.  [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and select **Dashboard**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Dashboards > New Dashboard**. You can also click the **Go To...** menu at the top of the screen and select **New Dashboard**.  
1. Select the Dashboard text field at the top of the window and enter a unique name for your new dashboard.<br/>

## Add a panel  

Now that you have created a new Dashboard, you can populate it with panels that visually display your data. This task shows you how to add a panel to your new dashboard and customize the display.

To add a panel to a new Dashboard, do the following:

1. Select a panel type by clicking the corresponding icon.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/panel-types.png')} alt="panel types" style={{border: '1px solid gray'}} width="600" />
1. You are prompted to provide a query.

See [Choosing a panel type](/docs/dashboards/panels) for details.

## Add queries

You can create Log and Metric queries on the same panel.

### Log Query

Enter your aggregate [search query](/docs/search/search-query-language/group-aggregate-operators) in the input field and press enter. A few important things to note are:

* Only search results that have been aggregated using a group or aggregate operator can be charted. See [Group or Aggregate Operators](/docs/search/search-query-language/group-aggregate-operators) for a list. 
* By default, the query builder is set to **Logs**. 
* Joining log queries in a separate query is not supported.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-log-query.png')} alt="Add log query" style={{border: '1px solid gray'}} width="800" />

### Metrics Query

Click the left-most dropdown option and select **Metrics**. You should be familiar with the basics of creating [metrics queries](/docs/metrics/metrics-queries) to ensure successful results. By default, the query builder is set to **Logs**.

To create a metrics query utilize the [Metrics Explorer](../metrics/metrics-queries/metrics-explorer.md).

### Multiple Query

To add another query to a panel click the plus **+** icon on the last query row. Each query is assigned a letter for reference.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/add-query.png')} alt="add query" style={{border: '1px solid gray'}} width="800" />

## Modify Chart

You can customize a chart on a dashboard panel in a variety of ways. To include changing the chart type to analyze the data in another format. See [Modify a Chart](./panels/modify-chart.md) for details on all the available options.

## Add to Dashboard

Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.  <br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-to-Dashboard-button.png')} alt="Add to Dashboard button" style={{border: '1px solid gray'}} width="300" />

That's it, start using your Dashboard.  

## Delete a Panel

You can delete a panel that you no longer need.

1. Go to the Dashboard in Sumo Logic that has the panel you want to delete.
1. Hover the cursor over the **Details** icon to display the pop-up menu.<br/><img src={useBaseUrl('/img/dashboards/panels/delete-panel/details-option.png')} alt="details option" style={{border: '1px solid gray'}} width="700" />
1. Select **Delete**.<br/><img src={useBaseUrl('/img/dashboards/panels/delete-panel/delete-a-panel.png')} alt="delete a panel" style={{border: '1px solid gray'}} width="700" />

## Log Search page

To create a Dashboard from the [Log Search page](/docs/search):

1. From the Log Search page click the **Add to Dashboard** button on the Aggregates tab after running your aggregate query you want to add to a Dashboard panel.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-to-dashboard-new-logs.png')} alt="Add to dashboard new logs" style={{border: '1px solid gray'}} width="700" />
1. In the **Add Panel to Dashboard** window provide a **Panel Title** and a name for the **Dashboard**. Once the name is entered you will have an option to select **Create New Dashboard** with your name. Select that option.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Enter-dashboard-new-name-logs.png')} alt="Enter dashboard new name logs" style={{border: '1px solid gray'}} width="400" />
1. In the updated window toggle the **Create as Dashboard** option.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Create-new-dashboard-new-from-search-page.png')} alt="Create new dashboard new from search page" style={{border: '1px solid gray'}} width="400" />
1. Click **Add** and your new Dashboard is created.

## Metrics page

To create a Dashboard from the [Metrics page](/docs/metrics/metrics-queries):

1. From the Metrics page click the **Add to Dashboard** button on the [Metrics Explorer](../metrics/metrics-queries/metrics-explorer.md).<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/metrics-explorer-add-to-dashboard.png')} alt="metrics explorer add to dashboard" style={{border: '1px solid gray'}} width="800" />
1. In the **Add Panel to Dashboard** window provide a **Panel Title** and a name for the **Dashboard**. Once the name is entered you will have an option to select **Create New Dashboard** with your name. Select that option.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Enter-dashboard-new-name-logs.png')} alt="Enter dashboard new name logs" style={{border: '1px solid gray'}} width="400" />
1. In the updated window toggle the **Create as Dashboard** option.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Create-new-dashboard-new-from-search-page.png')} alt="Create new dashboard new from search page" style={{border: '1px solid gray'}} width="400" />
1. Click **Add** and your new Dashboard is created.
