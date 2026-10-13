---
id: edit-cancel
title: Edit or Cancel a Scheduled Search
sidebar_label: Edit or Cancel a Scheduled Search
description: You can edit or cancel a Scheduled Search at any time.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can edit or cancel a Scheduled Search at any time from your [Library](/docs/get-started/library). If you cancel a scheduled search, it will revert to a saved search.

:::important
If the user who "owns" a Scheduled Search is removed from your org, the Scheduled Search will no longer run. For details, see [Delete a User](/docs/manage/users-roles/users/delete-user.md). 
:::

## Cancel a Scheduled Search

1. Go to your **Library** and find the scheduled search you want to cancel. For information about finding an item in the Library, see [Search the Library](/docs/get-started/library#search-the-library). 
1. Click the more options menu to the right of the scheduled search and select **Edit**. <br/><img src={useBaseUrl('img/alerts/list-of-sched-searches.png')} alt="Library scheduled search edit" style={{border: '1px solid gray'}} width="800" />
1. In the **Edit Search** dialog, click **Edit this search's schedule**.<br/><img src={useBaseUrl('img/alerts/edit-search.png')} alt="Edit search" style={{border: '1px solid gray'}} width="500" />
1. From the **Run Frequency** menu, choose **Never** to cancel the scheduled search.
1. Click **Update**.

## Edit the schedule for a scheduled search

1. Go to your **Library** and find the scheduled search you want to cancel. For information about finding an item in the Library, see [Search the Library](/docs/get-started/library#search-the-library). 
1. Click the more options menu to the right of the scheduled search and select **Edit**. 
1. In the **Edit Search** dialog, click **Edit this search's schedule**.
1. Make the changes, and then click **Update**.
:::info
Modifying the query will apply your data access level to the scheduled search. Your data access level might be broader than users who can view the results of this search through the configured notification. They might see data that their roles don't allow them to view.
:::
:::note
It may take up to 20 minutes for changes in alert conditions to take effect. If you cannot wait 20 minutes, one option is to create a new scheduled search using the *Save As* query option in the search UI.
:::
If Sumo Logic presents a **Confirm Save** dialog, refer to the section below.

### Edit permissions

A scheduled search runs in the context of the Sumo user that scheduled the search. In other words, when the search is shared with other users, the scheduler's role filter governs what data is returned by the search. 

When you try to edit a scheduled search's query, add a schedule to a saved search, or edit a saved search's schedule, and you don't have the **Change Data Access Level** role capability, Sumo Logic shows a **Confirm Save** dialog with two options to resolve the issue. 

<img src={useBaseUrl('img/alerts/confirm-save-scheduled-search.png')} alt="Confirm Save dialog" style={{border: '1px solid gray'}} width="500" />

* **Request or update permissions.** Click **Manage Roles** to add the **Change Data Access Level** role capability to your role. If you can't manage roles yourself, ask your Sumo Logic administrator to [edit your role](/docs/manage/users-roles/roles/create-manage-roles/#edit-a-role) to add it under **Capabilities**.
* **Save as a new search.** Click **Save as Copy** to save your edits into a new copy of the search, where you become the owner.

