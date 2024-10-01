---
id: settings
title: Monitor and Alert Settings
sidebar_label: Monitor Settings
description: Monitors continuously query your logs or metrics and send alert notifications when specific events occur, such as critical, warning, and missing data.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The **Monitors** page allows you to view, create, manage, and organize your monitors.

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). To access the **Monitors** page, in the main Sumo Logic menu select **Manage Data > Monitoring > Monitors**.  

[**New UI**](/docs/get-started/sumo-logic-ui/). To access the Monitors page, in the main Sumo Logic menu select **Alerts > Monitors**. You can also click the **Go To...** menu at the top of the screen and select **Monitors**.

The page displays the following information:
* **Name**. Name of the monitor.
* **Status**. A monitor is considered **Normal** when none of the trigger conditions are met and your data is actively being monitored.
* **Type**. A monitor type is either Logs or metrics, based on the type of data being monitored.
* **Query**. The query the monitor is running to track your data.
* **Created By**. The user that created the monitor.
* **Last Modified**. The time the monitor was last updated.
* **Capacity Used**. The bottom of the table shows the number of Log and metric monitors in your account.

![monitors page](/img/monitors/monitors-page.png)

Open the [Alert List](alert-response.md) to view all of the triggered alerts from a monitor by hovering your cursor over its **Status** and clicking the icon.<br/><img src={useBaseUrl('img/monitors/monitors-shortcut.png')} alt="monitor shortcut" width="550" />

At the top of the page, you can:
* **Search Monitors**. Use the search field to filter monitors by name and status. For example, you can view all monitors that are currently triggered in the system by clicking the **Status: All Triggered**. <br/><img src={useBaseUrl('img/monitors/search-monitors-input.png')} alt="search monitors input" width="175"/>
* **Add** > **New Folder**. Create a folder to organize your monitors.
* **Add** > **New Monitor**. Create a [new monitor](/docs/alerts/monitors/create-monitor).
* **Add** > **Import**. Import monitors from the exported JSON you copied from the **More Actions** menu in the [Details pane](#details-pane) of the original monitor.<br/><img src={useBaseUrl('img/monitors/Add-monitors-page.png')} alt="Add monitors page" width="115"/>

:::important
The **Import** function is provided for you to transfer data immediately. The Sumo Logic JSON format may change without notice. There is no guarantee that you will be able to import the JSON in the future.
:::

## Quick menu

The quick menu allows you to make changes to the monitor without opening the Details pane. Find and hover your mouse over a monitor in the monitors table. A three-dot kebab icon appears on the right of the row. Click the three-dot kebab icon to view a menu with all of the options available in the [Details pane](#details-pane).<br/>![quick menu](/img/monitors/quick-menu-monitors.png)

## Details pane

The details pane provides additional information about a selected monitor, like its query, trigger conditions, and notification preferences. For the monitors listed, select a row to view its details. A details pane appears to the right of the table.<br/><img src={useBaseUrl('img/monitors/monitor-details.png')} alt="monitor-details.png" width="300"/>

In the details pane, you'll see the following details for a monitor:

* **Name**. Shows the name of the monitor.
* **Status**. Shows the status of the monitor - **Normal, Critical, Warning, or Missing Data**. A monitor can be in multiple states at the same time.
* **Description**. Shows the description, if any.
* **Type**. Shows the type of monitor, either Logs or metrics.
* **Path**. Shows the Library location where the monitor is located.
* **Query**. It is used to track your data. 
* **Trigger Conditions** Thresholds value that must met for monitor to trigger an alert. These values are set when you create a monitor and can be based on a variety of metrics such as CPU usage, network latency, application response time. Applicable values include Critical, Warning, and Missing Data.
* **Notifications**. These are configured on the monitor.
* The timestamp and user that **Created** and last **Modified** the monitor. The alert response page will show alert details in the time zone designated in your user preferences.

### View in Metrics Explorer

The **View in Metrics Explorer** button on the Monitors Details page allows you to view the threshold values of a monitor in Metrics Explorer. When you click on this button, it takes you to the Metrics Explorer page with the same thresholds values applied. This helps you to see how your monitor's thresholds values are translating into the metrics, and easily compare the threshold values set in monitor with the data displayed in the Metrics Explorer graph.

To view the thresholds translating values in your metrics explorer, follow the steps below:
1. Select monitor from the **Monitoring** page.
1. On the Monitors Details pane, navigate to the **Trigger Conditions** section and note the thresholds values defined for Critical and Warning data conditions. All other parameters will be set to default, such as the window to 15 minutes and the "at all times" box checked. <br/><img src={useBaseUrl('img/monitors/view-in-explorer-page.png')} alt="view-in-explorer-page" width="450" />
1. Click the **View in Metrics Explorer** button <img src={useBaseUrl('img/monitors/view-in-explorer-icon.png')} alt="view-in-explorer-icon" width="150" />. The Metrics Explorer page will display with the same threshold values applied to the panel and graph.
1. On the **Panel settings** page, click threshold <img src={useBaseUrl('img/monitors/thresholds-icon.png')} alt="thresholds-icon" width="40" /> icon to view the values that you have defined for the monitor.
1. To view the values on chart, you may need to change the window time range in the graph to some other as the default is 15 minutes. <br/><img src={useBaseUrl('img/monitors/thresholds-graph.png')} alt="thresholds-graph" width="950" />

:::note
Note that the same threshold translating functionality supports to [Creating Monitor from the Metrics Explorer](/docs/alerts/monitors/create-monitor/#from-metrics-explorer) and [Opening Alerts Response Page in the Metrics Explorer](/docs/alerts/monitors/alert-response/#translating-thresholds)
:::

## Edit, Disable, More Actions

* **Edit** button. Use this to make changes to the selected monitor.
* **Disable** button. Puts the monitor in a disabled state so it will not fire any notifications.
* **More Actions** menu:
  * **Disable** and **Enable**. A monitor that is in a disabled state will not fire any notifications.
  * **Copy Path**. Copy the path of the monitor to your computer clipboard.
  * **Duplicate**. Make another monitor based on the same settings.
  * **Move**. Move the monitor to a different path.
  * **Export**. Provides JSON of the monitor, allowing you to transfer content within Sumo Logic by copying this JSON, then pasting it into the import dialog in the [Library](/docs/get-started/library) location you choose. This JSON format may change without notice. 
  * **Edit Permissions**.
  * **Delete**.
  * **Subscribe**.
  * **Copy Link**.<br/><img src={useBaseUrl('img/monitors/monitor-actions.png')} alt="monitor more actions" width="400"/>

## Tags

Tags allow you to categorize, search, filter, and correlate your monitors and alerts more effectively. They are key/value pairs that add metadata beyond the basic name and description of your monitors and alerts. Example tag: `team=alerting`, where the key is `team` and the value is `alerting`.

### How to create and use tags

You can create and use tags at different stages:

#### Adding tags while creating a monitor

When setting up a new monitor, follow the steps in the [Monitor Details](/docs/alerts/monitors/create-monitor/#step-5-monitor-details) section to add tags in the `key=value` format.

#### Adding tags to existing monitors

You can also add tags to monitors that are already created.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Monitors**. [**New UI**](/docs/get-started/sumo-logic-ui). Go to **Alerts > Monitors** from the main menu, or use the **Go To...** menu at the top of the screen to navigate to **Monitors**.
1. Select a monitor from the list and double-click on it.
1. In the side panel, click **Edit**.
1. Under the **Monitor details** step, create a tag using the `key=value` format, following these syntax rules:
   - Tag keys cannot start with the prefixes `sumo.` or `_`
   - Tag keys can only contain letters, numbers, and/or the symbols `_`, `.`, `/`, `+`, `-`, `@`
   - Tag values can only contain letters, white spaces, numbers, and/or the symbols `_`, `.`, `/`, `=`, `+`, `-`, `@`
   - A maximum of 50 tags can be associated with each monitor.
1. Click **Save**.

#### Viewing and using tags in alerts

After you’ve created tags for a monitor, these tags will be applied to future alerts generated by the monitor. You can view and use tags in different places:

* **Alert List**. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Navigate to the **Alerts** section by clicking the notification bell icon at the top of your Sumo Logic dashboard. [**New UI**](/docs/get-started/sumo-logic-ui). Select **Alerts > Alert List** or click the **Go To...** menu at the top of the screen and select **Alert List**. You'll see a **Tags** column, and you can filter by tags at the top.<br/><img src={useBaseUrl('img/alerts/alerts-list-tags.png')} alt="Alerts list page showing a column labeled 'Tags' next to alert details" style={{border: '1px solid gray'}} width="800" />
* **Alert Response**. Click on any alert in your **Alerts List** page to see more details, including tags in the **Tags** section.<br/><img src={useBaseUrl('img/alerts/alert-response-tags.png')} alt="Alert Response page displaying graphs with tags shown in the tags section" style={{border: '1px solid gray'}} width="800" />


## Monitor folder permissions

This section describes permissions for monitor folders. This feature is not enabled by default in all accounts. To request access, contact Support.

Access to folders that contain monitors is controlled by permissions. If you have the **Manage Monitors** role capability, you can grant one or more roles permissions to folders that you have created. If you have the **Admin Monitors** capability you can manage permission to all folders on the **Monitors** page. The permissions you can set are:

* **Read**. View-only access to monitors in the folder.
* **Update**. Ability to edit monitors in the folder.
* **Create**. Ability to create new monitors in the folder.
* **Delete**. Ability to delete monitors from the folder.
* **Manage**. Ability to move folders and to grant other roles permissions to the folder. If you grant this permission, the permissions listed above will be granted as well.

To set permissions for a monitors folder:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Monitors**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Alerts > Monitors**. You can also click the **Go To...** menu at the top of the screen and select **Monitors**.
2. Right-click on the folder whose permissions you want to set, and click **Edit Permissions**.
This option is present only if you have been granted **Manage** permission for the folder.
3. On the edit popup, note that the user who created the folder, and roles with the **Admin Monitors** capability, automatically have all permissions to the folder.  
4. You can make the following edits:
    * You can use the checkboxes to change the permissions currently assigned to a role that was explicitly added to the folder. (You can’t change the permissions to the **Administrator** and **Monitors Admin** role.)
    * You can click **Add Role** to add a role to the folder. You’ll be prompted with the "Your Entire Organization" option, and a list of roles. Select "Your Entire Organization" or one or more more roles, and checkmark the permissions you want to grant. If you grant access to a specific role in addition to "Your Entire Organization" users of that role will be granted the least restrictive access defined by the two permission sets.
    * You can remove a role that was explicitly added to the folder. To do so, mouse over the role in the edit popup, and click the **X** that appears.

The permissions you set for a folder are inherited by that folder’s subfolders. When a user views permissions for such subfolders, the inherited permissions will be grayed out. It is not possible to deselect inherited permissions, but you can add additional permissions. Inherited permissions can only be removed by removing them from the higher level folder where they were assigned.

## Monitor History

In the **Monitor History** tab, you can view the history of all triggered alerts of your selected monitor.<br/><img src={useBaseUrl('img/monitors/monitor-history.png')} alt="monitor-history.png" width="300"/>
