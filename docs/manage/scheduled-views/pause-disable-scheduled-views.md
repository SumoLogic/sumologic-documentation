---
id: pause-disable-scheduled-views
title: Pause or Disable Scheduled Views
description: Management tools are built in to the Scheduled Views page.
---

Pausing a view stops new data from being indexed. You can resume indexing at any time.

## Pause a scheduled view

1. Go to **Manage Data** > **Logs** > **Scheduled Views**.
1. Click the three-dot icon to the right of the scheduled view, then click **Pause** from the menu.

To resume indexing at a later time, click **Start**.


## Disable a scheduled view

Once disabled, no additional data can be indexed in a scheduled view. A disabled scheduled view is not technically deleted, but it can't be re-enabled. If you disable a view and later create a new view with the same name, you won't see duplicate results; instead all the data from both scheduled views are treated as one.

If you disable a view, it is no longer visible in Sumo Logic. If you create a new view with that same name, any query spanning the time range where both (the old and the new scheduled view) exist will search the union of the two scheduled views.

To disable a scheduled view:

1. Go to **Manage Data** > **Logs** > **Scheduled Views**.
1. Click the three-dot icon to the right of the scheduled view you'd like to disable, then choose **Disable** from the menu.
