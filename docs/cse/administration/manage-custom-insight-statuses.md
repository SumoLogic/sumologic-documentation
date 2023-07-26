---
id: manage-custom-insight-statuses
title: Managing Custom Insight Statuses
sidebar_label: Custom Insight Statuses
description: Learn how to create and manage custom Insight statuses.
---

This page has information about creating and managing custom Insight statuses.

## View Insight statuses

To view Insight statuses:

1. Click the gear icon near the top of the CSE UI and choose **Workflow** under **Users**.
1. This screenshot of the **Workflow** page shows the three Insight statuses that are preconfigured:
    * **New**
    * **In Progress**
    * **Closed**  

        ![workflow-page.png](/img/cse/workflow-page.png)

Preconfigured Insight statuses cannot be edited or deleted. You can however create custom statuses, as described in the following section.

## Create a custom Insight status

To create a custom Insight status:

1. Click the gear icon near the top of the CSE UI and choose **Workflow** under **Users**.
1. On the **Workflow** page, click **Create Status**.
1. On the **New Status** popup, enter a name and description for the status.  <br/>  ![new-status.png](/img/cse/new-status.png)
1. Click **Create**.

## Change the order of Insight statuses

You can change the status of an Insight on the **Details** pane of the page for the Insight. Note that the items in the **Status** dropdown appear in the same order as they do on the **Workflow** page.

![status-dropdown.png](/img/cse/status-dropdown.png)

To change the order that the statuses appear in the **Status** dropdown, you can reorder them on the **Workflow** page, except for **New** and **Closed**. **New** must always be the first status, and **Closed** must always be the last.

To change the order of Insight statuses:

1. Click the gear icon near the top of the CSE UI and choose **Workflow** under **Users**.
1. On the **Workflow** page, each status that can be moved has a handle to the left of its name.  <br/>  ![reorder-icons.png](/img/cse/reorder-icons.png)
1. To move a status to a different location on the list, use your mouse to drag it to the desired location.

## Edit or delete a custom Insight status

On the **Workflow** page, you can edit or delete any of the custom Insight statuses that have been created. 

The edit and delete icons are only available for custom statuses.

When you edit a custom status, you can change both the status name and the status description.

When you click the delete icon for a custom status, you’ll be prompted to confirm that you want to delete the status. If there are any Insights that currently have the status you will not be able to delete the status. 

:::tip
On the **Insights** page, you can search for Insights by status to identify the Insights that have the status that you want to delete. Once you assign a different status to those Insights, you’ll be able to delete the status.
:::
