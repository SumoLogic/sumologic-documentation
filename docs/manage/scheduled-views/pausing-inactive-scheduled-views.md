---
id: pausing-inactive-scheduled-views
title: Pausing Unused Scheduled Views
description: Lean about the autopausing of scheduled views after 90 days of inactivity.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Scheduled Views accelerate searches on small and historical subsets of your data by functioning as a pre-aggregated or pre-compute index. 

Starting **October 15**, Scheduled View(s) that have not been queried or referred for **90** consecutive days will be flagged for review, this helps with optimizing the system performance and resource usage. 

In-app warning and email notifications will be sent to Scheduled View owners and all active account administrators with the list of Scheduled Views that are flagged. These notifications will be sent 21 days and 7 days prior to the date of pausing. 

If no action is taken, the Scheduled View(s) will be automatically paused on the 90th day and a final notification will be sent. To avoid pausing, make sure your Scheduled Views are regularly queried.

## View AutoPause Details

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Scheduled Views**. You can also click the **Go To...** menu at the top of the screen and select **Scheduled Views**.<br/> [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Scheduled Views**. 
1. Navigate and open the required Scheduled View.
1. The Scheduled Views details are displayed on the right side of the page.
1. Scroll down to view the timeline details.
    1. **Last Accessed**. Displays the timestamp of when the Scheduled View was last accessed.
    1. **AutoPause Status**. Indicates whether Auto-Pause is currently enabled or disabled for the Scheduled View. This will be enabled by default. To disable, refer to [Disable the AutoPause](#disable-the-autopause).
    1. **Scheduled AutoPause Date**. Displays when the selected Scheduled View is scheduled to be auto-paused.

<img src={useBaseUrl('/img/scheduled-views/AutoPause-Details.png')} alt="scheduled-view-autopause-details" style={{border:'1px solid gray'}} width="400"/>

## View Scheduled Views to be AutoPaused in 7 days

Follow the below steps to view the Scheduled Views that is scheduled to be paused in next 7 days:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Scheduled Views**. You can also click the **Go To...** menu at the top of the screen and select **Scheduled Views**.<br/> [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Scheduled Views**. 
1. To refine the table with Scheduled Views that are scheduled to be paused in the next 7 days, use the **Add a filter** section located above the table and select **Views to be AutoPaused in 7 days** from the dropdown.

<img src={useBaseUrl('/img/scheduled-views/Scheduled-Filter.png')} alt="scheduled-view-page-filter" style={{border:'1px solid gray'}} width="800"/>

## Disable the AutoPause

Autopause will be auto enabled for all the Scheduled Views created. Follow the below steps to disable the Scheduled Views autopause:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Scheduled Views**. You can also click the **Go To...** menu at the top of the screen and select **Scheduled Views**.<br/> [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Scheduled Views**. 
1. Navigate and open the required Scheduled View.
1. The Scheduled Views details are displayed on the right side of the page.
1. Click **Edit** to open the pane for editing.
1. Scroll down and uncheck the **Enable AutoPause** checkbox.

<img src={useBaseUrl('/img/scheduled-views/Enable-AutoPause.png')} alt="enable-autopause-scheduled-view" style={{border:'1px solid gray'}} width="400"/>

## Re-start the Scheduled View

If a Scheduled View is still needed but has been paused, you can manually re-enable at any time by following the below steps:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Scheduled Views**. You can also click the **Go To...** menu at the top of the screen and select **Scheduled Views**.<br/> [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Scheduled Views**. 
1. To refine the table with Scheduled View paused results, use the **Add a filter** section located above the table and select **Status:Paused** from the dropdown.
1. Click on the required Scheduled View and click **Start** button to resume.

<img src={useBaseUrl('/img/scheduled-views/Restart-SV.png')} alt="restart-scheduled-view-page" style={{border:'1px solid gray'}} width="400"/>

