---
id: lag-time
title: Scheduled View Lag Time
description: In the View Details dialog, lag time is represented in hours, minutes, and seconds.
---

When you view the details of a Scheduled View, you can see who created it, creation date, lag time, query, and any error messages that may have been generated.

Scheduled Views are updated frequently.  Based on the start time chosen during Scheduled View Creation, the pre-computed data for the duration is backfilled. The successful data backfill is reflected in green on the Progress bar. As the data is being back-filled, if the progress bar is not completely full, the gap on the rightmost end is proportional to the lag time.

To view the lag time for the selected scheduled view:
1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Logs > Views**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the top menu select **Configuration**, and then under **Logs** select **Views**. You can also click the **Go To...** menu at the top of the screen and select **Views**. Kanso-->
1. Scroll through or search to identify the required index. Click the index to open the right side pane.
1. Click the drop down against the scheduled view to view the lag time details.

Lag time is represented in hours, minutes, and seconds. Lag time means that data is not up to date in the Scheduled View from (now) to (now - lag duration).

It can be caused by:

* An error in the Scheduled View query
* Search performance issues on the Sumo Logic side
* Data spike on the customer’s side
* A high number of Scheduled Views

:::note
If your Scheduled View has failed, see the View Details dialog for the error message provided.
:::

To prevent lag time, you can optimize your query, but to do so will require you to delete the existing Scheduled View and create a new one.

If you have optimized your query, and the Scheduled View still has a significant lag time, contact Support.
