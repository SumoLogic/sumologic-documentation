---
id: modify-chart
title: Modify a Dashboard Panel Chart
sidebar_label: Modify a Panel Chart
description: Learn how to customize a chart's type and visual display characteristics.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

You can customize a chart on a Sumo Logic dashboard panel in many ways by changing its settings. You can even change the chart type to analyze the data in another format. This page shows you how to edit a panel and customize General, Display, Display Overrides, Axes, Legend, and JSON chart settings.

:::info
Settings vary according to the chart type.
:::

Start by selecting the dashboard panel that has the chart you want to modify.

## Edit a panel

To edit a panel, do the following:

1. On the chart panel, click the kebab icon.
1. Select **Edit** from the dropdown list.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/edit-new-panel.png')} style={{border: '1px solid gray'}} alt="edit new panel" width="300"/>
    <br/>The **Chart** page appears with the panel settings menu bar on the far right. The **Display** options are shown by default.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/edit-panel-options.png')} style={{border: '1px solid gray'}} alt="edit panel options" width="700"/>

## Modify the panel query

You can modify the panel query to customize the chart. While editing the panel, you can view the applied dashboard variables and edit their values to see how they affect the panel query.

After you adjust the values, re-run the panel query to apply the modified variables.

:::info
Changes you make to variable values in the panel affect only the current editing session. They are not saved to the dashboard when you finish editing the panel.
:::

## Modify general settings

To modify general settings, click the **General** icon in the menu bar.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/mar-21-general-settings.png')} style={{border: '1px solid gray'}} alt="mar 21 general settings" width="400"/>

* To change the name of the chart, click in the **Chart Title** text box and enter a new name.
* To change the font size, click the up or down arrows in **Title Font Size**.
* To add a helpful description, click in the **Description** text box and enter a brief explanation of the chart's purpose.

To save your settings and return to the dashboard, click **Update Dashboard** in the upper right corner of the window.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/MC_Update_Dashboard.png')} style={{border: '1px solid gray'}} alt="MC Update dashboard" width="300"/>

### Logs settings

You can use [receipt time](../../search/get-started-with-search/build-search/use-receipt-time.md), [searchable time](../../search/get-started-with-search/build-search/use-searchable-time.md), or the default message time.

You can choose the parsing mode: manual or [Auto Parse Mode](../../search/get-started-with-search/build-search/dynamic-parsing.md).

<img src={useBaseUrl('/img/dashboards/panels/modify-chart/dashboard-new-time-settings.png')} style={{border: '1px solid gray'}} alt="dashboard new time settings" width="400"/>

### Link dashboards

You can configure links to other dashboards on a panel. When you [select a data point on the panel](../drill-down-to-discover-root-causes.md) you can click a linked dashboard. This lets you quickly open related dashboards to investigate further.

1. Click **Add Dashboard Link** at the bottom of the general settings menu.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/mar-21-add-dashboard-link.png')} style={{border: '1px solid gray'}} alt="mar 21 add dashboard link" width="400"/>
1. Click in the **Dashboard Name** input area and select or enter the name of the dashboard you want the panel to link to.
    * Select **Include Metadata** if you want the linked dashboard to run with the metadata and variable values of this panel.
    * Select **Include Time Range** if you want the linked dashboard to run with the time range of this panel.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/Add-dashboard-link.png')} style={{border: '1px solid gray'}} alt="Add dashboard link" width="400"/>

## Modify display settings

The customizable display settings vary according to the panel and chart type. In this example, you modify a time series chart.

To customize the visual display of a chart, do the following:

1. Click the **Display** icon in the menu bar.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/display-settings-dashboard-new.png')} style={{border: '1px solid gray'}} alt="display settings dashboard new" width="400"/>
1. You can change the **Panel Type** by selecting another type icon.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/panel-type-change.png')} style={{border: '1px solid gray'}} alt="panel type change" width="400"/>
1. To change the format of the chart, click **Chart Type** and select an option from the dropdown list.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/MC_Display_ChartType.png')} style={{border: '1px solid gray'}} alt="MC_Display_ChartType" width="400"/>
1. To change the colors of the chart, click **Color Palette** and select an option from the dropdown list.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/MC_Display_Format_ColorPalette.png')} style={{border: '1px solid gray'}} alt="MC_Display_Format_ColorPalette" width="300"/>
1. Make selections for the other format options available for the chart type.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/MC_Display_modify-results.png')} style={{border: '1px solid gray'}} alt="MC_Display_modify" width="700"/>
1. To save your customized settings and return to the dashboard, click **Update Dashboard** in the upper right corner of the window.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/MC_Update_Dashboard.png')} style={{border: '1px solid gray'}} alt="MC_Update_Dashboard" width="300"/>

### Group by setting

Honeycomb charts and categorical column and bar charts from metrics queries have a **Group By** setting. Use it to group the data in your chart by a dimension that already appears in the output data.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/group-by-setting.png')} style={{border: '1px solid gray'}} alt="group by setting" width="300"/>

## Override dashboard displays

Display overrides let you create panel visualizations that are easier to assess and draw conclusions from. You can override selected display settings to highlight what is most important to monitor.

For example, you may want to set a specific time series to red to show that it represents errors, or overlay two metrics with different axis ranges so you can correlate them. You may also want to rename the legend and tooltip values of a chart for readability and ease of use.

To override dashboard display settings, do the following:

1. Click the **Display Overrides** icon in the far right menu bar.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/MC_Display_Overrides_icon.png')} style={{border: '1px solid gray'}} alt="MC_Display_Overrides_icon" width="400"/>
1. Enter the **Query or series name** you want to override. This is the letter of the row the query is assigned to, for example **#A** or **#B**. The following image shows a metrics and logs query charted together. In the **Display Overrides** menu the Logs query is referenced as **#B** to assign it an alias and the color red.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/Logs-and-Metrics.png')} style={{border: '1px solid gray'}} alt="Logs and Metrics" width="700"/>
1. Enter an **Alias**, as necessary. **Metrics** monitors let you specify output metadata as a variable in double curly brackets, `{{ }}`. For example, if your output metrics have `environment`, you can specify it in your alias as `{{ metric }} on {{ deployment }}`.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/Monitor-with-metrics-using-metadata-in-alias.png')} style={{border: '1px solid gray'}} alt="Monitor with metrics using metadata in alias" width="700"/>
1. Select a **Property** from the dropdown list. You can add as many properties as needed.
1. Optionally, add another override by selecting **Add New Override** and completing steps 2 to 4.
1. To save your customized settings and return to the dashboard, click **Update Dashboard** in the upper right corner of the window.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/MC_Update_Dashboard.png')} style={{border: '1px solid gray'}} alt="MC_Update_Dashboard" width="300"/>

## Modify the thresholds

:::note
This feature is only applicable for [table charts](/docs/dashboards/panels/table-charts).
:::

Thresholds let you define warning and critical levels for a table chart.

1. Click the **Thresholds** icon in the far right menu bar.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/Threshold_icon.png')} style={{border: '1px solid gray'}} alt="Threshold_icon" width="400"/>
1. Click the toggle in the **Thresholds** pane.<br/><img src={useBaseUrl('/img/metrics/thresholds-toggle.png')} style={{border: '1px solid gray'}} alt="Thresholds_icon" width="400"/>
1. You can set the thresholds in two ways, **Classic** or **Conditional**:
    - **Classic:**
        1. Configure the appropriate comparator and threshold values, based on your data and requirements. You can choose from the following comparators.
            - **greater than**. Any value greater than the value you specify will violate the threshold.
            - **greater than or equal to**. Any value greater than or equal to the value you specify will violate the threshold.
            - **less than**. Any value less than the value you specify will violate the threshold.
            - **less than or equal**. Any value less than or equal to the value you specify will violate the threshold.
            - **includes**. Any value between the two values you specify will violate the threshold.
            - **excludes**. Any value outside the two values you specify will violate the threshold.
        1. If you toggle the **Fill remaining area as green** option, the portion of the chart with no thresholds is shaded in green.<br/><img src={useBaseUrl('/img/metrics/thresholds-default.png')} style={{border: '1px solid gray'}} alt="Thresholds_Classic_icon" width="400"/>
    - **Conditional:**
        1. **Column**. Select the column for which the threshold condition should apply.
        1. **Threshold Display**. Select how to highlight the table when the condition is breached.
            - **Row Background**. Highlights the entire row for which the threshold value is breached.
            - **Row Text**. Highlights the text of the entire row for which the threshold value is breached.
            - **Cell Background**. Highlights the cell of the selected column for which the threshold value is breached.
            - **Cell Text**. Highlights only the cell text of the selected column for which the threshold value is breached.
        1. **Threshold**. Select the color to display when the breach occurs. Then configure the comparator and threshold values.
            - **equals**. Any value equal to the value you specify will violate the threshold.
            - **contains**. Any value containing the value you specify will violate the threshold.
            - **does not contain**. Any value not containing the value you specify will violate the threshold.
            - **greater than**. Any value greater than the value you specify will violate the threshold.
            - **greater than or equal to**. Any value greater than or equal to the value you specify will violate the threshold.
            - **less than**. Any value less than the value you specify will violate the threshold.
            - **less than or equal**. Any value less than or equal to the value you specify will violate the threshold.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/Threshold_Conditional_icon.png')} style={{border: '1px solid gray'}} alt="Threshold_Conditional_icon" width="400"/>
            :::note
            You can add up to 10 threshold conditions.
            :::

:::info
If both thresholds and display overrides are applied to a table chart, display overrides take precedence.
:::

## Modify chart axes

You can change how the X and Y axes appear.

To change the chart axes, do the following:

1. Click the **Axes** icon in the far right menu bar.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/Axes-option.png')} style={{border: '1px solid gray'}} alt="Axes option" width="400"/>
1. The **Y-Axis** has a standard **Left Y-Axis** and an optional second **Right Y-Axis**. The **Y-Axis** has the following main options:
    * **Label Font Size**. Size of the label font
    * **Unit Font Size**. Size of the unit font
    * **Gridline**. Color for the gridline

    The **Left Y-Axis** is the secondary axis created from your query. It is displayed by default.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/Left-Y-axis-input.png')} style={{border: '1px solid gray'}} alt="Left Y-axis input" width="400"/>

    Enter or modify the following options, as necessary:

   * **Scale**. Options vary according to chart type
   * **Range**. Range of data for the axis
   * **Label**. The name applied to the data.
   * **Unit**. How the data measurement is expressed. You can choose from various units of measurement.
   * **Decimals**. Sets the precision of the units displayed. Select the number of decimals to show with a unit, up to 9.

    The **Right Y-Axis** has the same options as the **Left Y-Axis**. If you have created a [Display Override](#overridedashboard-displays) and set the **YAxisType** property to **Right Y-Axis** for a query, you can modify the **Right Y-Axis** here.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/display-override-right-y-axis.png')} style={{border: '1px solid gray'}} alt="display override right y-axis" width="400"/>

    To display the right Y-axis, select the **show axis** checkbox.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/show-right-y-axis.png')} style={{border: '1px solid gray'}} alt="show right y-axis" width="400"/>

1. For the **X-Axis**, you have the following options:
    * **Label**. The name applied to the data.
    * **Label Font Size**. Size of the label font.
    * **Unit Font Size**. Size of the unit font.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/X-axis-input.png')} style={{border: '1px solid gray'}} alt="X axisinput" width="300"/>

1. To save your customized settings and return to the dashboard, click **Update Dashboard** in the upper right corner of the window.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/MC_Update_Dashboard.png')} style={{border: '1px solid gray'}} alt="MC_Update_Dashboard" width="300"/>

## Modify chart legend

You can turn the chart legend on or off, choose where it appears, and modify its display properties.

To modify the chart legend, do the following:

1. Click the **Legend** icon in the far right menu bar.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/MC_Legend_icon.png')} style={{border: '1px solid gray'}} alt="MC_Legend_icon" width="400"/>
1. To hide the legend, move the **Show Legend** toggle to the left. To show it again, move the toggle to the right.
1. Specify the **Position** of the legend by clicking **Right** or **Bottom**.
1. Modify the following **Display Properties**, as needed:
    * **Font Size**. Size of the legend font.
    * **Max Height**. Maximum height of the legend.
    * **Show as Table**. Turns the table display on or off.
    * **Wrap Text**. Turns text wrapping on or off.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/MC_Legend_DisplayProperties.png')} style={{border: '1px solid gray'}} alt="MC_Legend_DisplayProperties" width="300"/>
1. To save your customized settings and return to the dashboard, click **Update Dashboard** in the upper right corner of the window.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/MC_Update_Dashboard.png')} style={{border: '1px solid gray'}} alt="MC_Update_Dashboard" width="300"/>

## Modify chart JSON

You can edit the JSON for each chart to customize visual settings beyond the options in the Sumo Logic user interface. You can add settings from [canvasJS](https://canvasjs.com/docs/charts/basics-of-creating-html5-chart/) to the `visualSettings` section of the JSON.

Sumo Logic does not support changes to chart JSON. You make them at your own risk.

To use custom canvasJS properties on a specific series, add a `unsafeCanvasJSProperties` block to any display override block.

To modify the JSON of a chart, do the following:<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/apply-changes.png')} style={{border: '1px solid gray'}} alt="apply changes" width="800"/>

1. Click **Update Dashboard** in the upper right corner of the window to save your chart customizations.
1. Click the **JSON** icon in the menu bar.
1. Modify the JSON as necessary.
1. Click **Update Preview** or **Copy To Clipboard**.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/DB_CustomChart_JSON-option.png')} style={{border: '1px solid gray'}} alt="DB_CustomChart_JSON option" width="400"/>
1. To save your customized settings and return to the dashboard, click **Update Dashboard** in the upper right corner of the window.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/MC_Update_Dashboard.png')} style={{border: '1px solid gray'}} alt="MC Update Dashboard option" width="300"/>

### Values in chart

To view values inside the chart so you do not need to hover over the chart:<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/data-in-chart.png')} style={{border: '1px solid gray'}} alt="data in chart" width="700"/>

use the following JSON:

```json
"overrides": [
    {
    "series": [],
    "queries": [
        "A"
        ],
    "userProvidedChartType": false,
    "properties": {
        "type": "column"
        },
    "unsafeCanvasJSProperties": {
        "bevelEnabled": true,
        "indexLabelPlacement": "inside",
        "indexLabel": "{y}",
        "indexLabelOrientation": "vertical"
        }
    }
]
```

### Marker visibility

To make markers more visible in a time series:<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/enhanced-markers-in-chart.png')} style={{border: '1px solid gray'}} alt="enhanced markers in chart" width="700"/>

use the following JSON:

```json
"overrides": [
    {
        "series": [],
        "queries": [
            "A"
            ],
        "userProvidedChartType": false,
        "properties": {
            "type": "area",
            "name": "area"
            },
        "unsafeCanvasJSProperties": {
            "markerType": "triangle",
            "markerColor": "black",
            "markerBorderColor": "red",
            "markerSize": 10,
            "markerBorderThickness": 2
            }
        }
]
```

### Outside values

To place values outside the chart so you do not need to hover over the chart:<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/outside-chart-values.png')} style={{border: '1px solid gray'}} alt="outside chart values" width="700"/>

use the following JSON:

```json
"overrides": [
    {
        "series": [],
        "queries": [
            "A"
            ],
        "userProvidedChartType": false,
        "properties": {
            "type": "bar"
            },
        "unsafeCanvasJSProperties": {
            "bevelEnabled": true,
            "indexLabelPlacement": "outside",
            "indexLabel": "{y}",
            "indexLabelOrientation": "vertical"
            }
    }
]
```

### Resize data label font size

To change the font size of data labels in a pie chart: <br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/data-label-font-size.png')} style={{border: '1px solid gray'}} alt="Data label font size" width="600"/>

add this line under the general section:

```json
"general": {
...
"indexLabelFontSize": 8
},

```
