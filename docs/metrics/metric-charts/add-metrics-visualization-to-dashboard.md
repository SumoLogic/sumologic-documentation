---
id: add-metrics-visualization-to-dashboard
title: Add a Metrics Chart to a Dashboard
sidebar_label: Add a Chart to a Dashboard
description: To save a metrics visualization, you must add the visualization as a new Panel in a Dashboard.
---

import ClassicMetricsNote from '../../reuse/classic-metrics-deprecation.md';

<ClassicMetricsNote/>

You can add a metrics visualization as a panel in a dashboard.

## Add a metric chart to a dashboard

1. First, [create a metrics query and visualization](create-metrics-visualization.md).
1. Choose **Add to Dashboard** from the three-dot kebab menu in the upper right corner of the metric chart  

    ![add-to-dashboard.png](/img/metrics/add-to-dashboard.png). 

1. To add the chart to to an existing dashboard, enter a title for the panel, select the dashboard from the **Dashboard** pulldown, and click **Add**.  
1. To create a new dashboard and add the chart to it:  
   1. Enter a title for the panel and a name for the new dashboard.
   1. Click the **Create New Dashboard** link to create the dashboard.  

        ![create-new-dashboard.png](/img/metrics/create-new-dashboard.png)

   1. On the **Add Panel to Dashboard** window, select the folder where you want to save the new dashboard, and click **Save**.  

        ![choose-dashboard-folder.png](/img/metrics/choose-dashboard-folder.png)

The dashboard opens to show the new Panel. 

## Work with Metrics Panels

Do any of the following from a Metrics Panel on a Dashboard.

* Click the time entry to select another interval.
* Click the Gear or **Show in Metrics** icon to reopen the Metrics page with the visualization displayed. You can modify settings on the Metrics page, and then add to the Dashboard again. It is not currently possible to replace the existing Panel with the modified settings. After adding the Panel with the updated settings, you can remove the older Panel from the Dashboard. To delete the Dashboard, hover over the Panel in Edit mode and click the **X** icon in the upper right corner.
* Click the **Filter** icon to use filters (See Use Filters in Dashboards for details):
    * (Edit mode only) Add filters for the metrics Panel.
    * (Non-Edit mode only) Click the **Filter** icon to apply a filter to the Metrics data.
* Click the **Show Panel** Information icon to display summary information about the data.
* (Non-Edit mode only) Hover over a chart line in the Panel to display details.  

    ![metrics_db_panel2.png](/img/metrics/metric-hover.png)
