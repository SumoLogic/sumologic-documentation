---
id: manage-custom-insight-resolutions
title: Manage Custom Insight Resolutions
sidebar_label: Manage Custom Insight Resolutions
description: Learn how to create custom sub-resolutions that you can select when closing an Insight.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about custom Insight resolutions and how to create and manage them.

## About Insight resolutions

When you close an Insight, Cloud SIEM prompts you to select a resolution that indicates why you closed it. There are four built-in resolutions:

* Duplicate — The insight has triggered before on the same entity and is a duplicate.
* False Positive—An insight triggered and it is legitimate activity.
* No Action—An insight triggered and it might not be an incident but is also not a false positive.
* Resolved — An incident occurred and was resolved.

You can define custom *sub-resolutions* for any of the built-in resolutions. This enables you to create more granular resolutions that indicate more clearly why an Insight was closed. For example, you might want to create a “Remediated” sub-resolution under “Resolved”.

## Create a custom sub-resolution

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Workflow** select **Resolutions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Workflow** select **Insight Resolutions**. You can also click the **Go To...** menu at the top of the screen and select **Insight Resolutions**.  
1. On the **Insight Resolutions** page, click **Create**. 
1. The **Create Insight Resolution** page appears.
    1. **Name**. Enter a meaningful name for the new resolution.
    1. **Parent Resolution**. Display the dropdown list and select a built-in resolution.
    1. **Description**. (Optional) Enter a description that will help other users understand when to use the new resolution.
    1. Click **Create**. <br/><img src={useBaseUrl('img/cse/create-insight-resolution.png')} alt="Create Insight resolution dialog" style={{border: '1px solid gray'}} width="400"/>
    1. The new resolution appears on the **Insight Resolutions** page, indented below the parent resolution. 

## Close an Insight using a custom resolution

1. After navigating to an Insight, you can close it by either clicking the **Close Insight** button or by selecting **Closed** from the **Status** pulldown.  <br/><img src={useBaseUrl('img/cse/close-options.png')} alt="Close options" style={{border: '1px solid gray'}} width="300"/> <br/>The **Close Insight** dialog box appears.<br/><img src={useBaseUrl('img/cse/close-insight.png')} alt="Close Insight dialog" style={{border: '1px solid gray'}} width="400"/>
1. Click **Resolution**. The list of resolutions appears, including any custom sub-resolutions that have been defined. <br/><img src={useBaseUrl('img/cse/resolution-options-2.png')} alt="Close Insight dialog" style={{border: '1px solid gray'}} width="400"/>
1. Click the appropriate resolution for the Insight.
1. In **Additional Comments** add a comment if desired. 
1. Click **Close Insight** to apply the selected resolution and close the Insight.

## Filter Insights by custom resolution

You can filter Insights by custom resolution.

1. On the **Insights** page, check the **Filters** area and make sure that the **Status** filter is not set to “is not closed”.  
1. Click in the **Filters** area and select **Custom Resolution**.  <br/><img src={useBaseUrl('img/cse/filter-option.png')} alt="Filter options" style={{border: '1px solid gray'}} width="400"/>
1. You’re prompted to select an operator: **is** or **is not**. 
1. After you choose an operator, you're prompted to select a custom resolution.  
1. Select a resolution to view Insights that have that resolution.
