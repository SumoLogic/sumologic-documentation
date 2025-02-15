---
id: manage-orgs-for-mssps
title: Manage Organizations for MSSPs
sidebar_label: Manage Orgs for MSSPs
description: Learn how to manage organizations for Managed Security Service Providers (MSSPs).
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article describes how to manage organizations for Managed Security Service Providers (MSSPs). MSSPs in Sumo Logic use [Cloud SIEM](/docs/cse/), and consist of a parent organization with child organizations that have content synced across the organizations, such as Cloud SIEM rules and rule tuning expressions.

## Prerequisites

### Roles

You must have the following [organization role capabilities](/docs/manage/users-roles/roles/role-capabilities/#organizations) to create and manage organizations as an MSSP administrator:

* Organizations
   * View Organizations
   * Create Organizations
   * Manage Organizations

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
1. On the **Sync Selected Items** box, click **Destinations** to select the organizations to sync the selected items to. You can sync to all organizations, a single child organization, or multiple child organizations.<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-sync-selected-items-2.png')} alt="Sync Selected Items dialog" style={{border: '1px solid gray'}} width="400"/><br/>Tips: 
   * If you select **All Child Organizations**, you can then select organizations to exclude, allowing you to sync to all organizations except those you select:<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-selected-organizations.png')} alt="Selected organizations" style={{border: '1px solid gray'}} width="150"/>
   * When you sync rule tuning expressions, select **Include Associated Cloud SIEM Rules** to also sync all the Cloud SIEM rules that the expressions are used on:<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-sync-associated-rules.png')} alt="Include Associated Cloud SIEM Rules checkbox" style={{border: '1px solid gray'}} width="200"/>
1. Click **Sync**. A **Syncing in progress** dialog is displayed. 

### How syncing works

* When items with the same name already exist in the child organizations, they will be replaced.
* When errors occur during syncing, attached items will be skipped. After the rest of the items are synchronized, you can investigate the errors in log search and try again.

## Multi-insights list page in Cloud SIEM

If you are logged in to a parent organization with child organizations that also use Cloud SIEM, the insights list page in Cloud SIEM allows you to [view insights in child organizations](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/#view-insights-in-child-organizations). 

This multi-insights list page (also known as a "federated" page) shows insights just as in a normal insights list page. When you click an insight on the page, you are automatically signed in to the child organization (if [SSO is enabled for the child organization](#create-a-child-organization-with-sso-enabled)), and the insight's details open in the child organization's UI. You can also use the board view on the multi-insights page to move insights to different statuses.

To be able to see insights in child organizations, add child organizations that use Cloud SIEM. Then when the parent organization user goes to their Cloud SIEM insights list page, all the child organizations' insights appear in the list.
