---
id: manage-orgs-for-mssps
title: Manage Organizations for MSSPs
sidebar_label: Manage Orgs for MSSPs
description: Learn how to manage organizations for Managed Security Service Providers (MSSPs).
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article describes how to manage organizations for Managed Security Service Providers (MSSPs). MSSPs in Sumo Logic use [Cloud SIEM](/docs/cse/), and consist of a parent organization with child organizations that have content synced across the organizations, such as Cloud SIEM rules and rule tuning expressions.

## Sync content in child organizations

If you want to ensure that content in one organization is copied to other organizations, you can use the **Content Management** tab to sync the content. You can sync Cloud SIEM [rules](/docs/cse/rules/) and [rule tuning expressions](/docs/cse/rules/rule-tuning-expressions/).

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Select the **Content Management** tab.
1. In the **Source** field, select the organization that will provide the source data to be synced to other organizations.
1. In the **Content** bar, select the content to be synced:
   * **Cloud SIEM Rules**
   * **Rule Tuning Expressions**
1. Select individual items to be synced, or all items.
1. Click **Sync Selected Items**.<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-sync-selected-items.png')} alt="Sync Selected Items button" style={{border: '1px solid gray'}} width="800"/>
1. On the **Sync Selected Items** box, click **Selected Organizations** to select the organizations to sync the selected items to. <br/>You can select **All Child Organizations**, a single child organization, or multiple child organizations. If you select **All Child Organizations**, you can then select organizations to exclude, allowing you to sync to all organizations except those you select.<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-selected-organizations.png')} alt="Selected organizations" style={{border: '1px solid gray'}} width="400"/>
1. Click **Sync**. A **Syncing in progress** dialog is displayed. 

### How syncing works

* When items with the same name already exist in the child organizations, they will be replaced.
* When errors occur during syncing, attached items will be skipped. After the rest of the items are synchronized, you can investigate the errors in log search and try again.

## Multi-insights list page in Cloud SIEM

If you are logged in to a parent organization with child organizations that also use Cloud SIEM, the [insights list page in Cloud SIEM](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/#insights-list-page) shows all insights across all your child organizations.

This multi-insights list page (also known as a "federated" page) shows insights just as in a normal insights list page. However, when you click an insight on the page, it opens the insight's details in the child organization's UI. You can also use the board view on the multi-insights page to move insights to different statuses.

To be able to see insights in child organizations, [add child organizations](/docs/manage/manage-subscription/create-manage-orgs/) that use Cloud SIEM. Then when the parent organization user goes to their Cloud SIEM insights list page, all the child organizations' insights appear in the list.
