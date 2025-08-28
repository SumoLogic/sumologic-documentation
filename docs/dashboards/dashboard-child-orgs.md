---
id: dashboard-child-orgs
title: Create a Dashboard for Child Orgs (MSSPs)
description: Learn how to create your own custom Dashboard with a panel and query to child org level, then customize a chart and add the chart to the dashboard.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The **Dashboard** page allows you to view log data on the same dashboard in an integrated and seamless view. This article demonstrates on how to create a dashboard, a panel query, and then add a panel to the dashboard at the child orgs level. 

## Create a dashboard

There are two ways to create a dashboard, either by using the following method or by creating it directly from the [Log Search page](#log-search-page). Follow the steps below to create a dashboard under a selected child org:

1.  [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and select **Dashboard**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Dashboards > New Dashboard**. You can also click the **Go To...** menu at the top of the screen and select **New Dashboard**. 
1. Select the **Dashboard** text field at the top of the window and enter a unique name for your new dashboard.
1. From the **Select Org** dropdown, select the child org under which you need to create the dashboard.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/select-org-for-dashboard.png')} alt="select-org-for-dashboard" style={{border: '1px solid gray'}} width="800" />

## Add a panel

Now that you have created a new dashboard, you can populate it with panels that visually display your data. This task shows you how to add a panel to your new dashboard and customize the display.

To add a panel to a new dashboard, do the following:

1. Select a panel type by clicking the corresponding icon. To learn more about panels, refer to [Dashboard types](/docs/dashboards/panels).<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/panel-types.png')} alt="panel types" style={{border: '1px solid gray'}} width="600" />
1. You are prompted to [provide a query](#add-a-log-query). 
1. If you have selected the parent org while creating the dashboard, you will be able to select the child org under which the panel query needs to run.
    :::note
    The autocomplete feature while writing the query will run with respect to the selected child org.
    :::
1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.  <br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-to-Dashboard-button.png')} alt="Add to Dashboard button" style={{border: '1px solid gray'}} width="300" />
1. Once the panel is added the the dashboard, panel query will display the results based on the [default org set for the dashboard](#set-a-default-org).

You can customize a chart on a dashboard panel in a variety of ways. To include changing the chart type to analyze the data in another format. See [Modify a Chart](./panels/modify-chart.md) for details on all the available options.

:::note
- Currently, this capability is limited only to log data.
- We only support selecting one child org to perform the log search.
:::

## Add a log query

Enter your aggregate [search query](/docs/search/search-query-language/group-aggregate-operators) in the input field and press enter. A few important things to note are:

* Only search results that have been aggregated using a group or aggregate operator can be charted. See [Group or Aggregate Operators](/docs/search/search-query-language/group-aggregate-operators) for a list. 
* By default, the query builder is set to **Logs**. 
* Joining log queries in a separate query is not supported.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-log-query.png')} alt="Add log query" style={{border: '1px solid gray'}} width="800" />

## Set a default org

Follow the below steps to change the default child org:

1. In the **Select Org** dropdown, select the org of your choice.
1. Click the kebab icon against the **Select Org** option, and select **Set as Default**.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/set-as-default.png')} alt="set-as-default" style={{border: '1px solid gray'}} width="400" />

## Log Search page

To create a Dashboard from the [Log Search page](/docs/search):

1. **Classic UI.** Go to the **Log Search** page.
	**New UI.** In the main Sumo Logic menu, select **Logs** > **Log Search**. You can also click the **Go To...** menu at the top of the screen and select **Log Search**.
1. Click the <img src={useBaseUrl('img/search/get-started-search/search-page/child-org-select-button.png')} alt="child-org-select-button" style={{border: '1px solid gray'}} width="30"/>    button to select the child org where you want to query. <br/><img src={useBaseUrl('img/search/get-started-search/search-page/child-org-dropdown.png')} alt="child-org-dropdown" style={{border: '1px solid gray'}} width="800"/>   
1. Enter the required query and click the search button to obtain the search results.
1. From the Log Search page click the **Add to Dashboard** button on the Aggregates tab after running your aggregate query you want to add to a Dashboard panel.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-to-dashboard-new-logs.png')} alt="Add to dashboard new logs" style={{border: '1px solid gray'}} width="700" />
1. In the **Add Panel to Dashboard** window provide a **Panel Title** and a name for the **Dashboard**. Once the name is entered you will have an option to select **Create New Dashboard** with your name. Select that option.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Enter-dashboard-new-name-logs.png')} alt="Enter dashboard new name logs" style={{border: '1px solid gray'}} width="400" />
1. In the updated window toggle the **Create as Dashboard** option.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Create-new-dashboard-new-from-search-page.png')} alt="Create new dashboard new from search page" style={{border: '1px solid gray'}} width="400" />
1. Click **Add** and your new Dashboard is created.

## Delete a Panel

You can delete a panel that you no longer need.

1. Go to the Dashboard in Sumo Logic that has the panel you want to delete.
1. Hover the cursor over the **Details** icon to display the pop-up menu.<br/><img src={useBaseUrl('/img/dashboards/panels/delete-panel/details-option.png')} alt="details option" style={{border: '1px solid gray'}} width="700" />
1. Select **Delete**.<br/><img src={useBaseUrl('/img/dashboards/panels/delete-panel/delete-a-panel.png')} alt="delete a panel" style={{border: '1px solid gray'}} width="700" />

## Share a dashboard

If required, toggle off the **Include current variable values in the URL** option to hide the variables and organiation details from the URL when you share the dashboard.

## Limitations

- Public dashboards are not supported in MSSP environments.
- Scheduled reports are only supported at the parent organization level, not for child orgs.

