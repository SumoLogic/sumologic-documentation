---
id: changing-alerts
title: Changing Other Alerts
description: You can modify or cancel alerts that are no longer valuable to your organization if you have Edit permission.
---

The ability to modify or turn off alerts created by another user is now possible with Content Sharing. Sometimes the need or frequency of a log alert changes while the creator is unavailable and with Content Sharing you can give that ability to another Role or user within your Organization.

We strongly recommend sharing your scheduled searches with at least one Role or a user you trust to allow you more flexibility with alerts.

## Edit an alert

If you or your role has Edit permissions on a scheduled search you can modify the frequency and type of alert as well as the query if you need to make any adjustments such as the threshold or timeslice.

:::note
If you're using a search template with your saved search, you can't modify the query from the alert.
:::

To edit an alert:

1. Go to the Sumo Logic library by clicking the folder icon in the Sumo Logic UI.

    ![library-icon.png](/img/reuse/library-icon.png)

1. Click in the search area to display a list of library object types, and choose **Scheduled Searches**. 

    ![library-types.png](/img/content-sharing/library-types.png)

1. Select the edit icon in the library for the scheduled search you'd like to edit. 

    ![EditAlert.png](/img/content-sharing/EditAlert.png)

1. Click **Edit this search's schedule**.

    ![edit-search-schedule](/img/content-sharing/edit-search-schedule.png)

1. Modify the frequency, time range, and alert type as needed.

    ![EditAlert3.png](/img/content-sharing/EditAlert3.png)

1. Click **Update** to save your changes.

## Cancel alerts on a shared search

If you have Edit permissions on the shared search, you can stop recipients from receiving alerts by setting the run frequency to **Never**. We recommend doing this when a search is no longer relevant rather than deleting the search so that it can be available to you later if you need it. Deleting the shared search is possible, if you have Manage permissions, but does not allow you the ability to restore a scheduled search later if you need it.

1. Navigate to the scheduled search you want to edit, as described above in [Edit an alert](#edit-an-alert).
1. Select the edit icon in the library for the scheduled search.

    ![EditAlert.png](/img/content-sharing/EditAlert.png)

1. In the **Edit Search** dialog, click **Edit this search's schedule**.
1. From the **Run Frequency** menu, choose **Never** to cancel the scheduled search.
1. Click **Update** to save your changes.
