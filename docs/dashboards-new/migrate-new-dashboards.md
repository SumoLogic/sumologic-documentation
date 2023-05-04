---
id: migrate-to-new-dashboards
title: Migrate to Dashboards (New)
description: Learn how to migrate Dashboards (Classic) to Dashboards (New) functionality.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The **Migrate to New Dashboards** functionality allows you to transform **Dashboards (Classic)** to the **Dashboards (New)** format, with minimal intervention from post-migration activity.

## Advantages

**Dashboards (New)**:

* Are continuously released and updated with new feature additions.
* Provide the unique ability to analyze metrics metadata and logs data on the same dashboard, in an integrated seamless view. This is exactly what you need to monitor and manage a Kubernetes environment effectively.
* Give you control over the visual display of metric and logs data.
* Streamline dashboard configuration and on-the-fly analytic visualizations with its new templating features.

## Changes after migration

This table shows the complete list of features that are changed after the implementation of the **Migrate to New Dashboards** feature.

| Features |  Supported    |   Not Supported   |
| :--------   | :-------------    |   :------------  |  
| Theme      | No effect, migrated as it is | NA  |
| Dashboard Layout | <ul> <li>Panel position in the grid stay the same</li> <li>Panel heights might slightly differ</li> </ul> | NA |
| Chart colors | <ul> <li>Exact color won’t be preserved, although color families will be preserved.</li> </ul> |  NA |
| Table Panels | <ul><li>Font size conversion:</li> <ul> <li>Small **>8**</li> <li>Normal **>12**</li> <li>Large **>16**</li> </ul> </ul> | Text Truncation |
| Bar/Column panel | <ul><li>Stacking settings:</li> <ul> <li>None - default</li>  <li>Normal - stacked</li> <li>Percent - stacked percent</li> </ul> <li>Legend Position</li> <li>Axis settings</li> <li>Multi-series support (Enabled in new dashboards as overrides)</li></ul> | <ul> <li>Color by range </li> <li>Label truncation </li> </ul> |
| Line/Area panel | <ul><li>Stacking settings:</li> <ul> <li>None - default</li>  <li>Normal - stacked</li> <li>Percent - stacked percent</li> </ul> <li>Line settings </li> <ul> <li>Marker type</li> <li>Line Thickness</li> <li>Marker size</li> <li>Smooth lines</li></ul> <li>Legend Position</li> <li>Axis settings</li> <li>Multi-series support (Enabled in new dashboards as overrides)</li> </ul> | <ul><li> Color by range</li> <li>Label truncation</li> <li>Grideline settings</li> </ul> |
| Pie/Donut panel | <ul> <li>Number of slices</li> <li>Legend position</li> <li>Converted to pie panel by default</li> </ul> | <ul><li>Donut panels are not supported on new dashboards</li> <li>Border settings</li> </ul> |
| SVP panel | <ul> <li>Show/hide number</li> <li>Unit (called “label” in new dashboard)</li> <li>No data behavior</li> <li>Color by range (called “thresholds” in new dashboard</li> </ul> |    <ul><li>Label title</li> <li>Background color</li> </ul> |
| Map panel |  Migrated as is |  NA |
| Text/Title panel | Migrated as is | NA |
| Box plot / Sankey | <ul><li>Added functionalities to support the chart types, refer to [Limitation](#limitations)</li> </ul> | ❌ |
| Panel time ranges | Migrated as is |   NA  |
| Dashboard time range | Migrated as is |  NA |
| Metrics query data interpolation | NA  |  ❌  |
| Metrics series  | <ul><li>Visibility on legend</li> <li>Axis settings</li> </ul>
| Metrics panel (Line) | <ul><li>Line width</li> <li>Axis settings</li> </ul> | <ul> <li>Chart stepping</li> </ul> |
| Metrics panel (Area) | <ul> <li>Line width</li> <li>Chart stacking</li> <li>Axis settings</li> </ul> |
| Metrics panel (Single Value) | <ul> <li>Statistic Type</li> <li>Label</li> <li>Show/hide value</li>  <li>No data behavior</li> <li>Thresholds</li> <li>Show color as: Text</li> </ul> | <ul><li>Rounding</li> <li>Show color as: Background</li> </ul> |
| Metrics panel (Single Value (Gauge) | <ul><li>Statistic Type</li> <li>Label</li>  <li>Show/hide value</li>  <li>No data behavior</li> <li>Thresholds</li> <li>Gauge range settings</li> </ul> |
| Metrics panel (Single Value (Sparkline) | <ul> <li>Statistic Type</li> <li>Label</li>  <li>Show/hide value</li>  <li>No data behavior</li> <li>Thresholds</li> <li>Show color as: Text</li> </ul>| <ul><li>Rounding</li> <li>Show color as: Background</li> </ul>


## Migration Steps

:::caution
We do not guarantee 100% conversion from classic to new dashboard, although we do provide an exhaustive list of incompatibilities that need to be taken care of. You can still keep your old dashboard after migration.
:::

This section explains to you the step-by-step process to migrate your dashboards.

1. Navigate to any of your classic dashboards or create a new one. Click **Migrate to new dashboards** link.<br/><img src={useBaseUrl('img/dashboards-new/migrate-dashboard1.png')} alt="dashboard" width="600"/>
2. A dialog box appears. Click **Migrate to New Dashboard** as shown below.<br/><img src={useBaseUrl('img/dashboards-new/migrate-dashboard2.png')} alt="dashboard" width="600"/>
3. Click **Open Dashboard** to view the migrated dashboard, given the migration is successful.<br/><img src={useBaseUrl('img/dashboards-new/migrate-dashboard3.png')} alt="dashboard" width="600"/> <br/>The following dialog can have 2 other states:
    1. **Warning State.** Showing any warnings during migrations: warnings don’t fail the migration process, however, it might be something that you have to fix on your own or is a feature that is not yet supported on the new dashboard.<br/><img src={useBaseUrl('img/dashboards-new/migrate-dashboard4.png')} alt="dashboard" width="600"/>
    2. **Error State.** The process can sometimes run into an error state, this fails the migration and the new dashboard is not created.<br/><img src={useBaseUrl('img/dashboards-new/migrate-dashboard5.png')} alt="dashboard" width="600"/>


### Bulk Migration

The bulk migration feature is an extension to the dashboard migration feature that allows the user to migrate multiple classic dashboards at once:

1. Go to **Library**, and select two or more **Dashboards**. Click **Migrate Dashboards** link.<br/><img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/Bulk+Migration/Screenshot-1.png')} alt="dashboard" width="600"/>
2. A dialog box appears. Click **Migrate to New Dashboard** as shown.<br/><img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/Bulk+Migration/Screenshot-2.png')} alt="dashboard" width="600"/>
3. The bottom right corner shows real-time information on the migration process.<br/><img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/Bulk+Migration/Screenshot-3.png')} alt="dashboard" width="600"/>
4. The following information is populated once the migration is complete.
    * Summary of the process.
    * Hovering on the error (if any) shows the error information in the tooltip.
    * The dashboard's blue names are clickable and open up the dashboard.<br/><img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/Bulk+Migration/Screenshot-4.png')} alt="dashboard" width="600"/>

:::important
Choosing more than fifty dashboards will disable the **Migrate** button.<br/><img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/Bulk+Migration/Screenshot-5.png')} alt="dashboard" width="600"/>
:::

## Limitations

| Incompatibility | Description |   
| :-----------------| :--------------|
| Panels | <li>Incompatible panels are automatically migrated to **text** panels with all the information about the panel preserved in the panel</li> <li>Retained information in text panel:</li> <ul> <li>Query</li> <li>Time range</li> <li>Panel title</li></ul> </ul> |
| Public dashboards | <ul><li>Public dashboards are not yet supported by New Dashboards</li> </ul> |
