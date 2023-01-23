---
id: edit-cancel
title: Edit or Cancel a Scheduled Search
sidebar_label: Edit or Cancel a Scheduled Search
description: You can edit or cancel a Scheduled Search at any time.
---

In the [**Library**](/docs/get-started/library), you can edit or cancel a scheduled search at any time. If you cancel a scheduled search, the search reverts to a saved search.

:::important
If the user who "owns" a Scheduled Search is deleted, the Scheduled Search will no longer run. For details, see [Delete a User](/docs/manage/users-roles/users/delete-user.md). 
:::

## Cancel a Scheduled Search

1. From the Library, find the scheduled search you want to cancel. For information about finding an item in the Library, see [Search the Library](/docs/get-started/library#search-the-library). 
1. Click the more options menu to the right of the scheduled search and select **Edit**. <br/>![Library scheduled search edit](/img/alerts/list-of-sched-searches.png)
1. In the **Edit Search** dialog, click **Edit this search's schedule**.<br/>![edit search](/img/alerts/edit-search.png)
1. From the **Run Frequency** menu, choose **Never** to cancel the scheduled search.
1. Click **Update**.

## Edit the schedule for a scheduled search

1. From the Library, find the scheduled search. For information about finding an item in the Library, see [Search the Library](/docs/get-started/library#search-the-library). 
1. Click the more options menu to the right of the scheduled search and select **Edit**. 
1. In the **Edit Search** dialog, click **Edit this search's schedule**.
1. Make the changes, and then click **Update**. If Sumo presents a "Cannot Edit Scheduled Search" message, see the following section.
:::note
It may take up to 20 minutes for changes in alert conditions to take effect. If you cannot wait 20 minutes, one option is to create a new scheduled search using the *Save As* query option in the search UI.
:::

### Edit permissions

A scheduled search runs in the context of the Sumo user that scheduled the search. In other words, when the search is shared with other users, the scheduler's role filter governs what data is returned by the search. 

When you try to edit a scheduled search query, add a schedule to a saved search, or edit a saved search's schedule, you will not be allowed to edit the scheduled search unless you have the **Change Data Access Level** role capability. 

You have two options to resolve the issue:

* You can duplicate the scheduled search and edit the copy.
* If you have the **Change Data Access Level** role capability, you can change the data access level for the scheduled search. Note that, after the data access level for a scheduled search is changed, the search results will be different for users that run the search if their role search filter is more restrictive than the user who originally scheduled the search.

:::note
If you don’t have the **Change Data Access Level** capability, your Sumo Logic administrator will need to update your role to include it.
:::

![edit search](/img/alerts/cannot-edit-scheduled-search.png)
