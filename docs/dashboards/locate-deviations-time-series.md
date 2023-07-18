---
id: locate-deviations-time-series
title: Locate Deviations in a Time Series
description: Learn how to create charts that locate deviations in a time series and the graph outliers.
---

An **outlier** is a data point that is outside the range of expected values. This page shows you how to locate deviations beyond thresholds in a time series. 

:::note
Currently, the feature is only available for logs queries. For information on outliers in metrics queries, see the [Metrics Outliers](/docs/metrics/metric-charts/metrics-outliers) page.
:::

## Graphing log queries to find outliers

You can graph log queries to determine where there are deviations from normal behavior in a time series. Locating outliers can help you understand the behavior trends of a time series. For more  in-depth information, see [outlier operator](/docs/search/search-query-language/search-operators/outlier).

To graph a log query and determine outliers, do the following:

1. In Sumo Logic, go to and open a Dashboard.
1. In the upper right corner click **Add Panel** and select **Time Series** as the panel type.

    ![example time series.png](/img/dashboards-new/locate-deviations/example-time-series.png)

1. By default, the query builder is set for a **Logs** query.

    ![Add_Panel_Logs_Query_option.png](/img/dashboards-new/locate-deviations/Add_Panel_Logs_Query_option.png)

1. Enter your log query in the text field on the right and press **Return** to run the query. We used the following query for our example.

    ```sql
    (_sourceCategory=airflow-service)
    | parse "in time *" as response_time
    | timeslice 10m
    | max(response_time) as response_time by _timeslice
    | outlier response_time window=5,threshold=3,consecutive=2,direction=+-
    ```

1. Adjust the time interval as needed by selecting the **time display** next to the **clock icon** in the upper right corner and choosing an option from the dropdown list. We selected a 24 hour time interval for our example.

    ![select time range.png](/img/dashboards-new/locate-deviations/select-time-range.png)

    The outlier graph appears in the window below, with the outlier series shown in the legend.

    ![Outlier_graph2.png](/img/dashboards-new/locate-deviations/Outlier_graph2.png)

## Customizing the graph

You can easily modify the look of the chart by changing the color palette, line type, and thickness, to name a few of the customizing options. For outlier graphs, there is a separate set of options you can choose from to modify the look of your chart.

To customize the visual appearance of the graph, do the following:

1. Go to the far right panel and click the **Display** icon, if it is not already selected.

    ![Outlier_Graph_Display_icon.png](/img/dashboards-new/locate-deviations/Outlier_Graph_Display_icon.png)

1. Make **Format** selections in the right panel as described in [Customizing a chart](create-dashboard-new.md).

![Chart_Type_Settings.png](/img/dashboards-new/locate-deviations/Chart_Type_Settings.png)

1. Make **Outlier Visual Settings** selections for the following:

    * Band Color. The fill that defines the outlier region.
    * Line Type. Boundary line of the outlier region.
    * Fill Opacity. Denseness of the fill color in the outlier region.
    * Line Thickness. Thickness of the line bordering the outlier region.
    * Marker Color. Color of the marker for an outlier peak value.

    ![Outlier_Visual_Settings.png](/img/dashboards-new/locate-deviations/Outlier_Visual_Settings.png)

1. In the upper right corner, click **Add to Dashboard**. 

    ![AddPanel_Add_to_Dashboard.png](/img/dashboards-new/locate-deviations/AddPanel_Add_to_Dashboard.png)

    The panel appears on your dashboard.  

    ![Outlier_Panel_on_Dashboard.png](/img/dashboards-new/locate-deviations/Outlier_Panel_on_Dashboard.png)
