---
id: pause-disable-scheduled-views
title: Pause or Disable Scheduled Views
description: Learn about pausing and disabling the Scheduled Views.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page outlines the procedures for pausing a scheduled view, manually or automatically, which stops new data from being indexed. It also details the steps to restart a paused scheduled view and to permanently disable a scheduled view when it is no longer required.

## AutoPause a Scheduled View

By default, all scheduled views are enabled with the AutoPause feature. This mechanism automatically flags scheduled views that have not been queried or referred for *90* consecutive days for potential pausing. This helps with optimizing the system performance and resource usage. 

Scheduled View creators/owners and all active account administrators will receive an in-app warning and email notifications with the list of Scheduled Views that are flagged for inactivity. These notifications are sent 21 days and 7 days prior to the scheduled pause. If no action is taken, the Scheduled Views will be automatically paused on the 90th day with a final notification. 

| In-app notification | Details section notification |
| :-- | :-- |
| <img src={useBaseUrl('/img/scheduled-views/in-app-notification.png')} alt="in-app-notification" style={{border:'1px solid gray'}} width="400"/> | <img src={useBaseUrl('/img/scheduled-views/notification-details-page.png')} alt="notification-details-page.png" style={{border:'1px solid gray'}} width="400"/> |

### Disable the AutoPause

Autopause will be enabled for all the Scheduled Views created. Follow the below steps to disable the Scheduled Views autopause:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Scheduled Views**. You can also click the **Go To...** menu at the top of the screen and select **Scheduled Views**.<br/> [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Scheduled Views**. 
1. Navigate and open the required Scheduled View.
1. The Scheduled Views details are displayed on the right side of the page.
1. Click **Edit** to open the pane for editing.
1. Scroll down and uncheck the **Enable AutoPause** checkbox.

<img src={useBaseUrl('/img/scheduled-views/Enable-AutoPause.png')} alt="enable-autopause-scheduled-view" style={{border:'1px solid gray'}} width="400"/>

### Re-start the Scheduled View

If a paused Scheduled View is still required, you can manually re-enable at any time by following the below steps:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Scheduled Views**. You can also click the **Go To...** menu at the top of the screen and select **Scheduled Views**.<br/> [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Scheduled Views**. 
1. To refine the table with Scheduled View paused results, use the **Add a filter** section located above the table and select **Status:Paused** from the dropdown.
1. Click on the required Scheduled View and click **Start** button to resume.

<img src={useBaseUrl('/img/scheduled-views/Restart-SV.png')} alt="restart-scheduled-view-page" style={{border:'1px solid gray'}} width="400"/>

## Manually pause a scheduled view

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Scheduled Views**. You can also click the **Go To...** menu at the top of the screen and select **Scheduled Views**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Scheduled Views**. 
1. Click the three-dot kebab icon to the right of the scheduled view, then click **Pause** from the menu.

To resume indexing at a later time, click **Start**.

## Disable a scheduled view

Once disabled, no additional data can be indexed in a scheduled view. A disabled scheduled view is not technically deleted, but it cannot be re-enabled. If you disable a view and later create a new view with the same name, you won't see duplicate results; instead all the data from both scheduled views are treated as one.

If you disable a view, it is no longer visible in Sumo Logic. If you create a new view with that same name, any query spanning the time range where both (the old and the new scheduled view) exist will search the union of the two scheduled views.

To disable a scheduled view:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Scheduled Views**. You can also click the **Go To...** menu at the top of the screen and select **Scheduled Views**.<br/> [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Scheduled Views**. 
1. Click the three-dot kebab icon to the right of the scheduled view you'd like to disable, then choose **Disable** from the menu.

