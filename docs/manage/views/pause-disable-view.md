---
id: pause-disable-view
title: Pause or Disable a View
description: Management tools are built in to the Views page.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Pausing a view stops new data from being indexed. You can resume indexing at any time.

## Pause a scheduled view

1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Logs > Views**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the top menu select **Configuration**, and then under **Logs** select **Views**. You can also click the **Go To...** menu at the top of the screen and select **Views**. Kanso-->
1. Scroll through or search to identify the required index. Click the index to open the right side pane.
1. Click the **Pause** <img src={useBaseUrl('/img/scheduled-views/pause-button.png')} alt="pause-button" style={{border:'1px solid gray'}} width="30"/> button against the required scheduled view or scheduled search.

To resume indexing at a later time, click the **Start** <img src={useBaseUrl('/img/scheduled-views/start-button.png')} alt="start-button" style={{border:'1px solid gray'}} width="30"/> button.

## Disable a scheduled view

Once disabled, no additional data can be indexed in a scheduled view. A disabled scheduled view is not technically deleted, but it cannot be re-enabled. If you disable a view and later create a new view with the same name, you won't see duplicate results; instead all the data from both scheduled views are treated as one.

If you disable a view, it is no longer visible in Sumo Logic. If you create a new view with that same name, any query spanning the time range where both (the old and the new scheduled view) exist will search the union of the two scheduled views.

To disable a scheduled view:

1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Logs > Views**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the top menu select **Configuration**, and then under **Logs** select **Views**. You can also click the **Go To...** menu at the top of the screen and select **Views**. Kanso-->
1. Scroll through or search to identify the required index. Click the index to open the right side pane.
1. Click the **Disable** <img src={useBaseUrl('/img/scheduled-views/disable-button.png')} alt="disable-button" style={{border:'1px solid gray'}} width="30"/> button against the required scheduled view or scheduled search.
