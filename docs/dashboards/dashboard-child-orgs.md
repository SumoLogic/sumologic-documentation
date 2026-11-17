---
id: dashboard-child-orgs
title: Create a Dashboard for Child Orgs (MSSPs)
description: Learn how to create a custom Sumo Logic dashboard at the child org level by adding a panel and query, customizing the chart, and saving it.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The **Dashboard** page lets you view log data from your Sumo Logic dashboards in one integrated view. This page shows how to create a dashboard at the child org level, add a panel query, and add the panel to the dashboard.

## Create a dashboard

You can create a dashboard at the child org level in two ways: with the following steps or directly from the [Log Search page](#log-search-page). To create a dashboard under a selected child org:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and select **Dashboard**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Dashboards > New Dashboard**. You can also click the **Go To...** menu at the top of the screen and select **New Dashboard**.
1. Select the **Dashboard** text box at the top of the window and enter a unique name for your new dashboard.
1. From the **Select Org** dropdown, select the child org for the dashboard. You can select one or more child orgs.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/select-org-for-dashboard.png')} alt="Select org for dashboard" style={{border: '1px solid gray'}} width="800" />

## Add a panel

Now that you have created a new dashboard, you can populate it with panels that visually display your data. This task shows you how to add a panel to your new dashboard and customize the display.

To add a panel to a new dashboard, do the following:

1. Select a panel type by clicking the corresponding icon. To learn more about panels, refer to [Panel types](/docs/dashboards/panels).<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/panel-types.png')} alt="panel types" style={{border: '1px solid gray'}} width="600" />
1. You are prompted to [provide a query](#add-a-log-query).
1. If you selected the parent org when you created the dashboard, you can select the child org or orgs where the panel query runs.
    :::note
    Query autocomplete uses the selected child org or orgs.
    :::
1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-to-Dashboard-button.png')} alt="Add to Dashboard button" style={{border: '1px solid gray'}} width="300" />
1. After you add the panel to the dashboard, the panel query displays results based on the [default org set for the dashboard](#set-a-default-org).

You can customize a chart on a dashboard panel in a variety of ways, including changing the chart type to analyze the data in another format. See [Modify a Chart](./panels/modify-chart.md) for details on all the available options.

:::note
- Currently, this capability supports only log data.
:::

## Add a log query

Enter your aggregate [search query](/docs/search/search-query-language/group-aggregate-operators) in the text box and press enter.

Two errors can occur when you run queries across multiple child orgs:

- **Partial success**. This occurs when you run a query across all child orgs, and while some child orgs run the query successfully, one or more fail. The dashboard still displays aggregate results from the child orgs that succeeded. To resolve the failure, refer to the audit logs ([`_index=sumologic_system_events`](/docs/manage/security/audit-indexes/system-event-index/)) for details about the failed query.
- **Error**. This occurs when you run a query across all child orgs, and the query fails in every child org, so no child org returns results. To resolve the failure, refer to the audit logs (`_index=sumologic_system_events`) for details about the failed query.

Note the following:
* Only search results that have been aggregated using a group or aggregate operator can be charted. See [Group or Aggregate Operators](/docs/search/search-query-language/group-aggregate-operators) for a list.
* By default, the query builder is set to **Logs**.
* Joining log queries in a separate query is not supported.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-log-query.png')} alt="Add log query" style={{border: '1px solid gray'}} width="800" />

## Set a default org

To change the default child org:

1. In the **Select Org** dropdown, select the org of your choice.
1. Click the kebab icon on the **Select Org** option, and select **Set as Default**.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/set-as-default.png')} alt="Set as default" style={{border: '1px solid gray'}} width="400" />

## Log Search page

To create a dashboard from the [Log Search page](/docs/search/search-across-child-orgs/):

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Log Search** page.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Logs** > **Log Search**. You can also click the **Go To...** menu at the top of the screen and select **Log Search**.
1. Click the <img src={useBaseUrl('img/search/get-started-search/search-page/child-org-select-button.png')} alt="Child org select button" style={{border: '1px solid gray'}} width="30"/> button to select the child org you want to query. You can select one or more child orgs. <br/><img src={useBaseUrl('img/search/get-started-search/search-page/child-org-dropdown.png')} alt="Child org dropdown" style={{border: '1px solid gray'}} width="800"/>
1. Enter the required query and click the search button to obtain the search results.
1. From the Log Search page, after you run your aggregate query, click the **Add to Dashboard** button on the **Aggregates** tab.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-to-dashboard-new-logs.png')} alt="Add to dashboard new logs" style={{border: '1px solid gray'}} width="700" />
1. In the **Add Panel to Dashboard** window provide a **Panel Title** and a name for the **Dashboard**. After you enter the name, select the **Create New Dashboard** option that appears with that name.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Enter-dashboard-new-name-logs.png')} alt="Enter dashboard new name logs" style={{border: '1px solid gray'}} width="400" />
1. In the updated window, toggle the **Create as Dashboard** option.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Create-new-dashboard-new-from-search-page.png')} alt="Create new dashboard new from search page" style={{border: '1px solid gray'}} width="400" />
1. Click **Add**. Sumo Logic creates your new dashboard.

## Delete a panel

You can delete a panel that you no longer need.

1. Go to the dashboard in Sumo Logic that has the panel you want to delete.
1. Hover the cursor over the **Details** icon to display the pop-up menu.<br/><img src={useBaseUrl('/img/dashboards/panels/delete-panel/details-option.png')} alt="details option" style={{border: '1px solid gray'}} width="700" />
1. Select **Delete**.<br/><img src={useBaseUrl('/img/dashboards/panels/delete-panel/delete-a-panel.png')} alt="delete a panel" style={{border: '1px solid gray'}} width="700" />

## Share a dashboard

If required, toggle off the **Include current variable values in the URL** option to hide the variables and organization details from the URL when you share the dashboard.

## Create scheduled reports

You can create a scheduled report to receive an email copy of the dashboard at your preferred frequency. To set one up, refer to [Scheduled Reports](/docs/dashboards/scheduled-report/).

To ensure the scheduled report reflects data for the intended child organization, select the required child org(s) from the **Organization** dropdown under the **Select Variables** section.<br/><img src={useBaseUrl('/img/dashboards/scheduled_reports/select-child-org.png')} alt="Select child org from Organization dropdown" style={{border: '1px solid gray'}} width="300" />


## Limitations

- Public dashboards are not supported in MSSP environments.
- Scheduled reports are only supported at the parent organization level, not for child orgs.
- Variable values generated by Log Search are populated using the parent organization.
- Metrics and span queries are supported only at the parent organization level, not for child organizations.
- Panels containing metrics or span queries will display no data if you switch from the parent organization to any child organization.
- When exporting a dashboard at the child organization level, panels with metrics or span queries will also show no data.
