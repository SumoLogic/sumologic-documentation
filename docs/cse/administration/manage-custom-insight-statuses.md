---
id: manage-custom-insight-statuses
title: Managing Custom Insight Statuses
sidebar_label: Custom Insight Statuses
description: Learn how to create and manage custom insight statuses.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page has information about creating and managing custom insight statuses.

## View insight statuses

To view insight statuses:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Workflow** select **Statuses**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Workflow** select **Insight Statuses**. You can also click the **Go To...** menu at the top of the screen and select **Insight Statuses**. 
1. This screenshot of the **Insight Statuses** tab shows the three insight statuses that are preconfigured:
    * **New**. Insights that have not been worked on yet.
    * **In Progress**. Insights that are being investigated. If you want to create custom statuses to represent different types of "in progress" states, you can click the **Enabled** toggle to disable the default **In Progress** status to reduce confusion.
    * **Closed**. Insights whose investigations are complete.  <br/><img src={useBaseUrl('img/cse/workflow-page.png')} alt="Statuses page" style={{border: '1px solid gray'}} width="700"/>

Preconfigured insight statuses cannot be edited or deleted. You can however create custom statuses, as described in the following section.

## Create a custom insight status

To create a custom insight status:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the top menu select **Configuration**, and then under **Workflow** select **Statuses**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Workflow** select **Insight Statuses**. You can also click the **Go To...** menu at the top of the screen and select **Insight Statuses**. 
1. On the **Insight Statuses** tab, click **+ Add Status**.
1. On the **Add Insight Status** popup, enter a name and description for the status. 
1. Click **Color** to select a color for the status. The color will appear on the status on the [Heads Up Display](/docs/cse/get-started-with-cloud-siem/cse-heads-up-display).

## Change the order of insight statuses

You can change the status of an insight on the **Details** pane of the page for the insight. Note that the items in the **Status** dropdown appear in the same order as they do on the **Insight Statuses** tab.

<img src={useBaseUrl('img/cse/status-dropdown.png')} alt="Status dropdown" style={{border: '1px solid gray'}} width="300"/>

To change the order that the statuses appear in the **Status** dropdown, you can reorder them on the **Insight Statuses** tab, except for **New** and **Closed**. **New** must always be the first status, and **Closed** must always be the last.

To change the order of insight statuses:

 
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Workflow** select **Statuses**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Workflow** select **Insight Statuses**. You can also click the **Go To...** menu at the top of the screen and select **Insight Statuses**.  
1. On the **Insight Statuses** tab, each status that can be moved has a handle to the left of its name.  <br/><img src={useBaseUrl('img/cse/reorder-icons.png')} alt="Reorder icons" style={{border: '1px solid gray'}} width="600"/>
1. To move a status to a different location on the list, use your mouse to drag it to the desired location.

## Edit or delete a custom insight status

On the **Insight Statuses** tab, you can edit or delete any of the custom insight statuses that have been created. 

The edit and delete icons are only available for custom statuses.

When you edit a custom status, you can change both the status name and the status description.

When you click the delete icon for a custom status, you’ll be prompted to confirm that you want to delete the status. If there are any insights that currently have the status you will not be able to delete the status. 

:::tip
On the **Insights** page, you can search for insights by status to identify the insights that have the status that you want to delete. Once you assign a different status to those insights, you’ll be able to delete the status.
:::
