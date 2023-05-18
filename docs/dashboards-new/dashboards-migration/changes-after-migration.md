---
id: changes-after-migration
title: Supported Features
description: Visualize the list of features that are changed after the implementation of the **Migrate to New Dashboards** feature.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

This table shows the complete list of features that are changed after the implementation of the **Migrate to New Dashboards** feature.

| Features |  Supported    |   Not Supported   |
| :--------   | :-------------    |   :------------  |  
| Theme      | No effect, migrated as it is | NA  |
| Dashboard Layout | <ul> <li>Panel position in the grid stay the same</li> <li>Panel heights might slightly differ</li> </ul> | NA |
| Chart colors | <ul> <li>Exact color won’t be preserved, although color families will be preserved.</li> </ul> |  NA |
| Table Panels | <ul><li>Font size conversion:</li> <ul> <li>Small **>8**</li> <li>Normal **>12**</li> <li>Large **>16**</li> </ul> </ul> | Text Truncation |
| Bar/Column panel | <ul><li>Stacking settings:</li> <ul> <li>None - default</li>  <li>Normal - stacked</li> <li>Percent - stacked percent</li> </ul> <li>Legend Position</li> <li>Axis settings</li> <li>Multi-series support (Enabled in new dashboards as overrides)</li></ul> | <ul> <li>Label truncation </li> </ul> |
| Line/Area panel | <ul><li>Stacking settings:</li> <ul> <li>None - default</li>  <li>Normal - stacked</li> <li>Percent - stacked percent</li> </ul> <li>Line settings </li> <ul> <li>Marker type</li> <li>Line Thickness</li> <li>Marker size</li> <li>Smooth lines</li></ul> <li>Legend Position</li> <li>Axis settings</li> <li>Multi-series support (Enabled in new dashboards as overrides)</li> </ul> | <ul> <li>Label truncation</li> <li>Grideline settings</li> </ul> |
| Pie/Donut panel | <ul> <li>Number of slices</li> <li>Legend position</li> <li>Converted to pie panel by default</li> </ul> | <ul><li>Donut panels are not supported on new dashboards</li> <li>Border settings</li> </ul> |
| SVP panel | <ul> <li>Show/hide number</li> <li>Unit (called “label” in new dashboard)</li> <li>No data behavior</li> <li>Color by range (called “thresholds” in new dashboard</li> </ul> |    <ul><li>Label title</li> <li>Background color</li> </ul> |
| Map panel |  Migrated as is |  NA |
| Text/Title panel | Migrated as is | NA |
| Panel time ranges | Migrated as is |   NA  |
| Metrics query data interpolation | NA  |  ❌  |
| Metrics series  | <ul><li>Visibility on legend</li> <li>Axis settings</li> </ul>
| Metrics panel (Line) | <ul><li>Line width</li> <li>Axis settings</li> </ul> | <ul> <li>Chart stepping</li> </ul> |
| Metrics panel (Area) | <ul> <li>Line width</li> <li>Chart stacking</li> <li>Axis settings</li> </ul> |
| Metrics panel (Single Value) | <ul> <li>Statistic Type</li> <li>Label</li> <li>Show/hide value</li>  <li>No data behavior</li> <li>Thresholds</li> <li>Show color as: Text</li> </ul> | <ul><li>Rounding</li> <li>Show color as: Background</li> </ul> |
| Metrics panel (Single Value (Gauge) | <ul><li>Statistic Type</li> <li>Label</li>  <li>Show/hide value</li>  <li>No data behavior</li> <li>Thresholds</li> <li>Gauge range settings</li> </ul> |
| Metrics panel (Single Value (Sparkline) | <ul> <li>Statistic Type</li> <li>Label</li>  <li>Show/hide value</li>  <li>No data behavior</li> <li>Thresholds</li> <li>Show color as: Text</li> </ul>| <ul><li>Rounding</li> <li>Show color as: Background</li> </ul>

## Color Mapping

Dashboards (Classic) had 6 color schemes, while Dashboards (New) have 11 color schemes. The color mapping from the Classic to the New dashboard is shown in the image below.

:::info
You can choose the starting color in the Classic dashboard, but you do not get this choice in the New dashboard.
:::

<img src={useBaseUrl('img/dashboards-new/color-mapping.png')} alt="icon" width="800"/>
