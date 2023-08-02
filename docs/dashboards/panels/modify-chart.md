---
id: modify-chart
title: Modify a Chart
description: Learn how to customize a chart's type and visual display characteristics.
---

You can customize a chart on a dashboard panel in a variety of ways. You can even change the chart type to analyze the data in another format. This section shows you how to customize a chart or change the chart type entirely. 

## Customize a chart

You can customize each chart by modifying the available settings. The
settings you can change vary according to the chart type. This
page shows you how to edit a panel and customize General, Display,
Display Overrides, Axes, Legend, and JSON chart settings.

## Select a chart to edit

You begin the customization process by selecting the dashboard panel
with the chart you wish to modify.

To edit a panel, do the following:

1. On the chart panel, click the **Details** icon. 
1. Select **Edit** from the dropdown list.

![edit new panel.png](/img/dashboards-new/panels/modify-chart/edit-new-panel.png)

The **Chart** page appears with the chart settings menu bar on the far right. The **Display** options are shown by default.

![edit panel options.png](/img/dashboards-new/panels/modify-chart/edit-panel-options.png)

## Modify general settings

To modify general settings click the **General** icon in the menu bar.

![mar 21 general settings.png](/img/dashboards-new/panels/modify-chart/mar-21-general-settings.png)

* To change the name of the chart, click in the **Chart Title** field and enter a new name.
* To change the font size click the **Title Font Size** arrows up or down. 
* To add a helpful description, click in the **Description** field and enter a brief explanation of the chart's purpose.

To save your settings and return to the dashboard, click **Update Dashboard** in the upper right corner of the window. 

![MC_Update_Dashboard.png](/img/dashboards-new/panels/modify-chart/MC_Update_Dashboard.png)

### Logs Settings

You have the option to use the [receipt time](../../search/get-started-with-search/build-search/use-receipt-time.md)or the default message time.

![dashboard new time settings.png](/img/dashboards-new/panels/modify-chart/dashboard-new-time-settings.png)

You can toggle [Auto Parse Mode](../../search/get-started-with-search/build-search/dynamic-parsing.md).

![dashboard new auto parse.png](/img/dashboards-new/panels/modify-chart/dashboard-new-auto-parse.png)

### Link dashboards

You can configure links to other dashboards on a panel. When you [select a data point on the panel](../drill-down-to-discover-root-causes.md) you will have an option to click on linked dashboards. This allows you to quickly reference other related dashboards to investigate. 

1. Click the **Add Dashboard Link** from the bottom of the general settings menu.

![mar 21 add dashboard link.png](/img/dashboards-new/panels/modify-chart/mar-21-add-dashboard-link.png)

1. Click in the **Dashboard Name** input area and select or enter the name of the dashboard you want the panel to link to.

    * Select to **Include Metadata** if you want the linked dashboard to run against the metadata and variable values of this panel.
    * Select to **Include Time Range** if you want the linked dashboard to run with the time range of this panel.

![Add dashboard link.png](/img/dashboards-new/panels/modify-chart/Add-dashboard-link.png)

## Modify display settings

The customizable display settings vary according to the panel and chart type. In our example, we are modifying a time series chart.

To customize the visual display of a chart, do the following:

1. Click the **Display** icon in the menu bar.

    ![display settings dashboard new.png](/img/dashboards-new/panels/modify-chart/display-settings-dashboard-new.png)

1. You can change the **Panel Type** by selecting another type icon.

    ![panel type change.png](/img/dashboards-new/panels/modify-chart/panel-type-change.png)

1. To change the format of the chart click **Chart Type** and make a selection from the dropdown list.

    ![MC_Display_ChartType.png](/img/dashboards-new/panels/modify-chart/MC_Display_ChartType.png)

1. To change the colors of the chart display click **Color Palette** and make a selection from the dropdown list.

    ![MC_Display_Format_ColorPalette.png](/img/dashboards-new/panels/modify-chart/MC_Display_Format_ColorPalette.png)

1. Make selections for the other format options available for the chart type.

    ![MC_Display_modify-results.png](/img/dashboards-new/panels/modify-chart/MC_Display_modify-results.png)

1. To save your customized settings and return to the dashboard, click **Update Dashboard** in the upper right corner of the window. 

![MC_Update_Dashboard.png](/img/dashboards-new/panels/modify-chart/MC_Update_Dashboard.png)

### Group by setting

Honeycomb charts and categorical column and bar charts from metrics queries have a Group By setting. Use the **Group By** setting to group the data shown in your chart by a dimension already displayed in the output data.

![group by setting.png](/img/dashboards-new/panels/modify-chart/group-by-setting.png)

## Override dashboard displays

The ability to override dashboard displays allows you to create panel visualizations that make charts easier to assess and form conclusions. You can override selected dashboard displays to create a visual story that highlights what is most important to monitor.

For example, you may want to set a specific time-series to red to signify that it represents errors, or overlay two different metrics with different axis ranges so it is easy to correlate across them. You may also want to rename the legend and tooltip values of a chart for readability and ease of use.

To override select dashboard displays, do the following:

1. Click the Display Overrides icon in the far right menu bar.

    ![MC_Display_Overrides_icon.png](/img/dashboards-new/panels/modify-chart/MC_Display_Overrides_icon.png)

1. Enter a **Query or series name** you want to override. This is the letter of the row the query is assigned to, for example **#A** and **#B**.  

    The following image shows a metrics and logs query charted together. In the **Display Overrides** menu the Logs query is referenced as **#B** to assign an alias and red color.   

    ![Logs and Metrics.png](/img/dashboards-new/panels/modify-chart/Logs-and-Metrics.png)

1. Enter an **Alias**, as necessary. **Metrics** monitors allow you to specify output metadata as a variable wrapped in double curly brackets, `{{ }}`. For example, if my output metrics has `environment`, I can specify it in my alias as `{{ metric }} on {{ deployment }}`.  

    ![Monitor with metrics using metadata in alias.png](/img/dashboards-new/panels/modify-chart/Monitor-with-metrics-using-metadata-in-alias.png)

1. Select a **Property** from the dropdown list. You can add as many properties and needed.
1. Optionally, add another override by selecting **Add New Override** and completing steps 2 - 4.
1. To save your customized settings and return to the dashboard, click **Update Dashboard** in the upper right corner of the window. 

![MC_Update_Dashboard.png](/img/dashboards-new/panels/modify-chart/MC_Update_Dashboard.png)

## Modify chart axes

You can easily change the displays of the X and Y axes.

To change chart axes displays, do the following:

1. Click the **Axes** icon in the far right menu bar.

    ![Axes option.png](/img/dashboards-new/panels/modify-chart/Axes-option.png)

1. For the **Y-Axis**, you have the standard **Left Y-Axis** as well as options for a second **Right Y-Axis**. The **Y-Axis** starts with the following main options:

    * **Label Font Size**. Size of the label font
    * **Unit Font Size**. Size of the unit font
    * **Gridline**. Color for the gridline

    The **Left Y-Axis** is the secondary axis created from your query. It is displayed by default.

    ![Left Y-axis input.png](/img/dashboards-new/panels/modify-chart/Left-Y-axis-input.png)

    Enter or modify the following options, as necessary:

   * **Scale**. Options vary according to chart type
   * **Range**. Range of data for the axis
   * **Label**. The name applied to the data.
   * **Unit**. How the data measurement is expressed. You have various
       units of measurements to select from. 
   * **Decimals**. Sets the precision of units displayed. Select the
       number of decimals to show with a unit, up to 9.

    The **Right Y-Axis** has the same options as the **Left Y-Axis**. If you have created a [Display Override](#override-dashboard-displays) and set the **YAxisType** property to **Right Y-Axis** for a query you will have the option to modify the **Right Y-Axis** here.

    ![display override right y-axis.png](/img/dashboards-new/panels/modify-chart/display-override-right-y-axis.png)

    To display the right Y-axis you need to select the **show axis** checkbox.

    ![show right y-axis.png](/img/dashboards-new/panels/modify-chart/show-right-y-axis.png)

1. For the **X-Axis**, you have the following options:

    ![X axisinput.png](/img/dashboards-new/panels/modify-chart/X-axis-input.png)

    * **Label**. The name applied to the data.
    * **Label Font Size**. Size of the label font
    * **Unit Font Size**. Size of the unit font

1. To save your customized settings and return to the dashboard, click **Update Dashboard** in the upper right corner of the window. 

    ![MC_Update_Dashboard.png](/img/dashboards-new/panels/modify-chart/MC_Update_Dashboard.png)

## Modify chart legend

You can toggle the chart Legend display on and off, where it appears, as well as modifying the legend display properties.

To modify the chart legend, do the following:

1. Click the **Legend** icon in the far right menu bar.

![MC_Legend_icon.png](/img/dashboards-new/panels/modify-chart/MC_Legend_icon.png)

1. To turn **OFF** the legend display, toggle **Show Legend** to the **Left**. To turn the legend display back **ON**, toggle **Show Legend** to the **Right**.
1. Specify the **Position** of the Legend by clicking **Right** or **Bottom**.
1. Modify the following **Display Properties**, as needed:

    * **Font Size**. Size of the legend font
    * **Max Height**. Maximum height of the legend
    * **Show as Table**. Table display, toggle On or Off
    * **Wrap Text**. Text display, toggle On or Off

    ![MC_Legend_DisplayProperties.png](/img/dashboards-new/panels/modify-chart/MC_Legend_DisplayProperties.png)

1. To save your customized settings and return to the dashboard, click **Update Dashboard** in the upper right corner of the window. 

    ![MC_Update_Dashboard.png](/img/dashboards-new/panels/modify-chart/MC_Update_Dashboard.png)

## Modify chart JSON 

The JSON for each chart is available for you to customize the visual settings beyond the options Sumo Logic provides in the user interface. You can add settings from [canvasJS](https://canvasjs.com/docs/charts/basics-of-creating-html5-chart/) to the `visualSettings` section of the JSON.

Changes made to chart JSON are not supported by Sumo Logic and are done at your own risk.

To leverage custom canvasJS properties on a specific series add a `unsafeCanvasJSProperties` block to any display override block.

To modify the JSON of a chart, do the following:

![apply changes.png](/img/dashboards-new/panels/modify-chart/apply-changes.png)

1. Click **Update Dashboard** in the upper right corner of the window to save your chart customizations.
1. Click the **JSON** icon in the menu bar.
1. Modify the JSON as necessary.
1. Click **Update Preview** or **Copy To Clipboard**.  

    ![DB_CustomChart_JSON-option.png](/img/dashboards-new/create-dashboard-new/DB_CustomChart_JSON-option.png)

1. To save your customized settings and return to the dashboard, click **Update Dashboard** in the upper right corner of the window.

    ![MC_Update_Dashboard.png](/img/dashboards-new/panels/modify-chart/MC_Update_Dashboard.png)

### Values in chart

To view values inside the chart so you don't have to hover on the chart:

![data in chart.png](/img/dashboards-new/panels/modify-chart/data-in-chart.png)

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

To enhance markers in a time series:

![enhanced markers in chart.png](/img/dashboards-new/panels/modify-chart/enhanced-markers-in-chart.png)

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

To place values outside the chart so you don't have to hover on the chart:

![outside chart values.png](/img/dashboards-new/panels/modify-chart/outside-chart-values.png)

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
 
