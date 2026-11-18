---
id: link-dashboards
title: Linking Multiple Dashboards
sidebar_label: Linking Dashboards
description: Learn how to quickly link dashboards together to view related data.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Linking multiple dashboards

You can link Sumo Logic dashboards together to quickly view related data. Each panel can have links to other dashboards. Links have options to include metadata and time range. When you select a data point on
a panel, you can click a linked dashboard. This lets you quickly open related dashboards to investigate.

1. Click **Add Dashboard Link** in the general settings menu when [modifying a chart in a panel](/docs/dashboards/panels/modify-chart).<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/add-link.png')} alt="add link" style={{border: '1px solid gray'}} width="300" />
1. Click in the **Dashboard Name** input area and select or enter the name of the dashboard you want the panel to link to.<br/><img src={useBaseUrl('/img/dashboards/panels/modify-chart/Add-dashboard-link.png')} alt="Add dashboard link" style={{border: '1px solid gray'}} width="300" />
    * Select **Include Metadata** if you want the linked dashboard to run against the metadata and variable values of this panel.
    * Select **Include Time Range** if you want the linked dashboard to run with the time range of this panel.

### Using links

When you click a data point on a dashboard chart, the **Summary** tab lists your linked dashboards.

* The following image shows a Summary panel from a selected log data point. The **Linked Dashboards** section is at the bottom.<br/><img src={useBaseUrl('/img/dashboards/drill-root-causes/summary-v2-logs.png')} alt="summary v2 logs" style={{border: '1px solid gray'}} width="300" />
* The following image shows a Summary panel from a selected metric data point. The **Linked Dashboards** section is at the bottom.<br/><img src={useBaseUrl('/img/dashboards/drill-root-causes/metrics-summary-v2.png')} alt="metrics summary v2" style={{border: '1px solid gray'}} width="300" />

## Link a custom dashboard to your stack

Stack linking connects a dashboard to [monitoring dashboards](/docs/dashboards/explore-view/) so you can view it when you explore infrastructure components.

You link a dashboard by specifying metadata key-value pairs:

* **Entity Type**. Predefined entity object representing a given part of your system and its related set of data (such as EC2 Instance, Application, MySQL Cluster).
* **Entity Name**. Name of a given entity, as displayed in the monitoring dashboards tab. An asterisk (`*`) can be used to match all entities of a given type.

The metadata keys assigned to your Dashboard Stack Linking need to be the same as the explored component for the dashboard to show as an option. For example, a component named `tablename` has `account`, `region`, and `namespace` metadata assigned to it, as shown in the following monitoring dashboards screenshot:<br/><img src={useBaseUrl('/img/dashboards/link-dashboard-explore/stack-linking-keys.png')} alt="stack linking keys" style={{border: '1px solid gray'}} width="800" />

The keys assigned to the Dashboard Stack Linking need to include those keys, as shown here:<br/><img src={useBaseUrl('/img/dashboards/link-dashboard-explore/dashboard-new-stack-link-keys.png')} alt="dashboard new stack link keys" style={{border: '1px solid gray'}} width="400" />

To link a custom dashboard to your stack in monitoring dashboards, do the following:

1. From your custom dashboard, click the three-dot kebab icon in the upper right corner of the window and select **Create Stack Linking** from the dropdown menu.
    :::info
    Make sure you have edit permission for a dashboard to create stack linking.
    :::
    <br/><img src={useBaseUrl('/img/dashboards/link-dashboard-explore/Create-Stack-Linking-option-from-Dashboard-New.png')} alt="Create Stack Linking option from Dashboard New" style={{border: '1px solid gray'}} width="300" />
1. In the **Dashboard Stack Linking** dialog, select the **Domain** where you want the key to be available.
1. Select an **Entity Type** for which you would like to display the dashboard.
1. To limit the dashboard to specific entities of a given type, enter the relevant **Entity Name** (as displayed in the monitoring dashboards tab). If you would like to see the dashboards for all entities of a given type, you can use (`*`) as the **Entity Name**. <br/><img src={useBaseUrl('img/dashboards/link-dashboard-explore/dashboard-stack-linking.png')} alt="Time series or categorical" width="600" style={{border: '1px solid gray'}} />
1. You can add more entity associations by clicking **Add another entity type/name pair**.
1. Click **Apply** to apply the stack link.
1. Now when you navigate in a monitoring dashboard to an entity with matching entity type and entity name, you will have the option to view your **Dashboard** in the monitoring dashboards view.

## View linked dashboards

In monitoring dashboards, when you navigate to a component, you can select other linked dashboards.

From the **Dashboards** dropdown menu, select the name of the linked dashboard to load it in monitoring dashboards. When you hover over an available dashboard, the tooltip shows its location and creator so you can identify it more easily.<br/><img src={useBaseUrl('/img/dashboards/link-dashboard-explore/explore-with-location-tooltip.png')} alt="explore with location tooltip" style={{border: '1px solid gray'}} width="400" />

