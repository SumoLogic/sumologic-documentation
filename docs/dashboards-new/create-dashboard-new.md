---
id: create-dashboard-new
title: Create a Dashboard (New)
description: Learn how to create your own custom Dashboard (New) with a panel and query, then customize a chart and add the chart to the dashboard.
---

This page demonstrates how to create a Dashboard (New), add a query, and then add the chart to the dashboard. You create your Dashboard (New) by selecting template options from menus and dropdowns.

Dashboard (New) allows you to view logs and metrics data on the same dashboard in an integrated and seamless view. This gives you the same control over how your metrics and log data are visualized. Dashboard (New) template capabilities provide for easier data scoping and intuitive chart creation.

Rather watch a short micro lesson video?

<Iframe url="https://www.youtube.com/embed/A-O_E-NbxN8"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />


## Dashboard Auto-Save

When you rename or add a panel to a dashboard it is automatically saved in your Sumo Logic Personal folder. Likewise, ongoing changes and additions to the dashboard are saved. This ensures the integrity of your work and prevents any loss due to unforeseen interruptions or outages.

## Create a Dashboard (New)

In this step, you create a Dashboard (New), to which you will add panels and customize charts in later steps. You can use the **+ New** button or create a Dashboard (New) directly from the Log Search and Metrics pages.

To create a Dashboard (New) with the **+ New** button, do the following:

1. On the Home page, click **+ New**.  

    ![DataDojo_New_Dashboard.png](/img/dashboards-new/create-dashboard-new/DataDojo_New_Dashboard.png)

1. Select **Dashboard (New)** from the dropdown list.  

    ![new dashboard from new button.png](/img/dashboards-new/create-dashboard-new/new-dashboard-from-new-button.png)

1. Select the Dashboard text field at the top of the window and enter a unique name for your new dashboard.  

    ![Dashboard name.png](/img/dashboards-new/create-dashboard-new/Dashboard-name.png)

### Add a panel  

Now that you have created a new Dashboard (New), you can populate it with panels that visually display your data. This task shows you how to add a panel to your new dashboard and customize the display.

To add a panel to a new Dashboard (New), do the following:

1. Select a panel type by clicking the icon. See [choosing a panel type](/docs/dashboards-new/panels) for details.

    ![panel types.png](/img/dashboards-new/create-dashboard-new/panel-types.png)

1. You are prompted to provide a query.

## Add queries

You can create Log and Metric queries on the same panel.

<Tabs
  className="unique-tabs"
  defaultValue="log"
  values={[
    {label: 'Log Query', value: 'log'},
    {label: 'Metrics Query', value: 'metrics'},
    {label: 'Multiple Query', value: 'multiple'},
  ]}>

<TabItem value="log">

Enter your aggregate [search query](/docs/search/search-query-language/group-aggregate-operators) in the input field and press enter. A few important things to note are:

* Only search results that have been aggregated using a group or aggregate operator can be charted. See [Group or Aggregate Operators](/docs/search/search-query-language/group-aggregate-operators)for a list. 
* By default, the query builder is set to **Logs**. 
* Joining log queries in a separate query is not supported.

![Add log query.png](/img/dashboards-new/create-dashboard-new/Add-log-query.png)

</TabItem>
<TabItem value="metrics">

Click the left-most dropdown option and select **Metrics**. You should be familiar with the basics of creating [metrics queries](/docs/metrics/metrics-queries) to ensure successful results. By default, the query builder is set to **Logs**.

![Metrics selection for query builder.png](/img/dashboards-new/create-dashboard-new/Metrics-selection-for-query-builder.png)

To create a metrics query utilize the [Metrics Explorer](../metrics/metrics-queries/metrics-explorer.md).

</TabItem>
<TabItem value="multiple">

To add another query to a panel click the plus **+** icon on the last query row. Each query is assigned a letter for reference.

![add query.png](/img/dashboards-new/create-dashboard-new/add-query.png)

</TabItem>
</Tabs>

## Modify Chart

You can customize a chart on a dashboard panel in a variety of ways. To include changing the chart type to analyze the data in another format. See [Modify a Chart](./panels/modify-chart.md) for
details on all the available options.

## Add to Dashboard

Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.  

![Add to Dashboard button.png](/img/dashboards-new/create-dashboard-new/Add-to-Dashboard-button.png)

That's it, start using your Dashboard (New).  

## Delete a Panel

You can delete a panel that you no longer need.

1. Go to the Dashboard (New) in Sumo Logic that has the panel you want to delete.
1. Hover the cursor over the **Details** icon to display the pop-up menu.  

    ![details option.png](/img/dashboards-new/panels/delete-panel/details-option.png)

1. Select **Delete**.  

    ![delete a panel.png](/img/dashboards-new/panels/delete-panel/delete-a-panel.png)

## Log Search page

To create a Dashboard (New) from the [Log Search page](/docs/search):

1. From the Log Search page click the **Add to Dashboard** button on the Aggregates tab after running your aggregate query you want to add to a Dashboard (New) panel.  

    ![Add to dashboard new logs.png](/img/dashboards-new/create-dashboard-new/Add-to-dashboard-new-logs.png)

1. In the **Add Panel to Dashboard** window provide a **Panel Title** and a name for the **Dashboard**. Once the name is entered you will have an option to select **Create New Dashboard** with your name. Select that option.  

    ![Enter dashboard new name logs.png](/img/dashboards-new/create-dashboard-new/Enter-dashboard-new-name-logs.png)

1. In the updated window toggle the **Create as Dashboard (New)** option.  

    ![Create new dashboard new from search page.png](/img/dashboards-new/create-dashboard-new/Create-new-dashboard-new-from-search-page.png)

1. Click **Add** and your new Dashboard (New) is created.

## Metrics page

To create a Dashboard (New) from the [Metrics page](/docs/metrics/metrics-queries):

1. From the Metrics page click the **Add to Dashboard** button on the [Metrics Explorer](../metrics/metrics-queries/metrics-explorer.md).  

    ![metrics explorer add to dashboard.png](/img/dashboards-new/create-dashboard-new/metrics-explorer-add-to-dashboard.png)

1. In the **Add Panel to Dashboard** window provide a **Panel Title** and a name for the **Dashboard**. Once the name is entered you will have an option to select **Create New Dashboard** with your name. Select that option.  

    ![Enter dashboard new name logs.png](/img/dashboards-new/create-dashboard-new/Enter-dashboard-new-name-logs.png)

1. In the updated window toggle the **Create as Dashboard (New)** option.  

    ![Create new dashboard new from search page.png](/img/dashboards-new/create-dashboard-new/Create-new-dashboard-new-from-search-page.png)

1. Click **Add** and your new Dashboard (New) is created.


import Iframe from 'react-iframe';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
