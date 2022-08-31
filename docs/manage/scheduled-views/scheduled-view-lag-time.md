---
id: scheduled-view-lag-time
title: Scheduled View Lag Time
---



When you view the details of a Scheduled View, you can see who created it, creation date, lag time, query, and any error messages that may have been generated.

Scheduled Views are updated at a frequency of 1 minute. Any lag time is represented by the progress bar. If the  progress bar is not completely full, the gap on the rightmost end is proportional to the lag time.

In the **View Details** dialog, lag time is also represented in hours, minutes, and seconds.

Lag time means that data is not up to date in the Scheduled View from (now) to (now - lag duration).

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
