---
id: link-dashboards
title: Linking Multiple Dashboards (New)
sidebar_label: Linking Dashboards (New)
description: Learn how to quickly link dashboards together to view related data.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Linking multiple dashboards

You can link dashboards together to quickly view related data. Each panel can have links to other dashboards. Links have options to include metadata and time range. When you select a data point on
the panel you will have an option to click on linked dashboards. This allows you to quickly reference other related dashboards to investigate. 

1. Click the **Add Dashboard Link** from the general settings menu when [modifying a chart in a panel](/docs/dashboards-new/panels/modify-chart).<br/>  ![add link.png](/img/dashboards-new/panels/modify-chart/add-link.png)
1. Click in the **Dashboard Name** input area and select or enter the name of the dashboard you want the panel to link to.
    * Select to **Include Metadata** if you want the linked dashboard to run against the metadata and variable values of this panel.
    * Select to **Include Time Range** if you want the linked dashboard to run with the time range of this panel.<br/>![Add dashboard link.png](/img/dashboards-new/panels/modify-chart/Add-dashboard-link.png)

### Using links

When you click a data point on a Dashboard (New) chart the Summary tab provides your Linked Dashboards.

* The following image shows a Summary panel from a selected log data point. The **Linked Dashboards** section is at the bottom.<br/>  ![summary v2 logs.png](/img/dashboards-new/drill-root-causes/summary-v2-logs.png)
* The following image shows a Summary panel from a selected metric data point. The **Linked Dashboards** section is at the bottom.<br/>  ![metrics summary v2.png](/img/dashboards-new/drill-root-causes/metrics-summary-v2.png)

## Link a custom Dashboard (New) to your stack in Explore

Stack linking connects Dashboard (New) to Explore so you can view dashboards when exploring infrastructure components.

You link a Dashboard (New) to your stack in Explore by specifying metadata key-value pairs:

* **Entity Type**. Predefined entity object representing a given part of your system and its related set of data (such as EC2 Instance, Application, MySQL Cluster).
* **Entity Name**. Name of a given entity, as displayed in the Explore tab. An asterisk (`*`) can be used to match all entities of a given type.

The metadata keys assigned to your Dashboard (New) Stack Linking must be the same as the explored component for the dashboard to show as an option. For example, if your component is named `tablename`, and has `account`, `region`, and `namespace` metadata assigned to it, as seen in the following Explore screenshot:

![stack linking keys.png](/img/dashboards-new/link-dashboard-explore/stack-linking-keys.png)

The keys assigned to the Dashboard (New) Stack Linking would need to include those, for example:

![dashboard new stack link keys.png](/img/dashboards-new/link-dashboard-explore/dashboard-new-stack-link-keys.png)

To link a custom Dashboard (New) to your stack in Explore, do the following:

1. From your custom dashboard, click the three-dot icon in the upper right corner of the window and select **Create Stack Linking** from the dropdown menu.<br/>
    :::info
    Make sure you have edit permission for a dashboard to create stack linking.
    :::<br/>
    ![Create Stack Linking option from Dashboard New.png](/img/dashboards-new/link-dashboard-explore/Create-Stack-Linking-option-from-Dashboard-New.png)
1. In the **Dashboard Stack Linking** dialog, set the **Domain** you want the key available in.
1. Select an **Entity Type** for which you would like to display the dashboard.
1. If you would like to further specify for which entities of a given type the dashboard is displayed, you can input the relevant **Entity Name** (as displayed in the Explore tab). If you would like to see the dashboards for all entities of a given type, you can use (`*`) as the **Entity Name**. <br/><img src={useBaseUrl('img/dashboards-new/link-dashboard-explore/dashboard-stack-linking.png')} alt="time-series-or-categorical" width="600"/>
1. You can add more entity associations by clicking **Add another entity type/name pair**.
1. Click **Apply** to apply the stack link.
1. Now when you navigate in **Explore** to an entity with matching entity type and entity name, you will have the option to view your **Dashboard (New)** in the **Explore**.  
     
## View linked dashboards

In **Explore**, when navigating to components you will have the option to select other dashboards that are linked. 

From the **Dashboards** dropdown menu, select the name of the linked dashboard to load it in Explore. When hovering over available dashboards the tooltip provides the location and creator so it is easier to identify.

![explore with location tooltip.png](/img/dashboards-new/link-dashboard-explore/explore-with-location-tooltip.png)
