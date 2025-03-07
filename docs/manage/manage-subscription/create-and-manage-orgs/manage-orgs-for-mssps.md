---
id: manage-orgs-for-mssps
title: Manage Organizations for MSSPs
sidebar_label: Manage Orgs for MSSPs
description: Learn how to manage organizations for Managed Security Service Providers (MSSPs).
---

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

This article describes how to manage organizations for Managed Security Service Providers (MSSPs). MSSP administrators must ensure that the content of their child organizations is properly configured. MSSPs often consist of a parent organization with child organizations that use [Cloud SIEM](/docs/cse/).

## Prerequisites

### Roles

You must have the following [organization role capabilities](/docs/manage/users-roles/roles/role-capabilities/#organizations) to create and manage organizations as an MSSP administrator:

* Organizations
   * View Organizations
   * Create Organizations
   * Manage Organizations

## Update content in child organizations

To ensure that content is consistent across child organizations, use the **Content Management** tab. 

You can update the following:
* Cloud SIEM [rules](/docs/cse/rules/)
* Cloud SIEM [rule tuning expressions](/docs/cse/rules/rule-tuning-expressions/)

To update content:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Select the **Content Management** tab.
1. In the **Source** field, select the organization that will provide the source data to be updated in other organizations.
1. In the **Content** bar, select the content to be updated:
   * **Cloud SIEM Rules**
   * **Rule Tuning Expressions**
1. Select individual items to be updated, or all items.
1. Click **Update Selected Items**.<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-sync-selected-items.png')} alt="Update Selected Items button" style={{border: '1px solid gray'}} width="800"/>
1. On the **Update Selected Items** box, click **Destinations** to select the organizations to update the selected items to. You can update to all organizations, a single child organization, or multiple child organizations.<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-sync-selected-items-2.png')} alt="Update Selected Items dialog" style={{border: '1px solid gray'}} width="400"/><br/>Tips: 
   * If you select **All Child Organizations**, you can then select organizations to exclude, allowing you to update to all organizations except those you select:<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-selected-organizations.png')} alt="Selected organizations" style={{border: '1px solid gray'}} width="300"/>
   * When you update rule tuning expressions, select **Include Associated Cloud SIEM Rules** to also update all the Cloud SIEM rules that the expressions are used on:<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-sync-associated-rules.png')} alt="Include Associated Cloud SIEM Rules checkbox" style={{border: '1px solid gray'}} width="200"/>
1. Click **Update**. An **Updating in progress** dialog is displayed. 

## View history

1. Click **View History** in the upper-right corner of the page. <br/>A query for update history displays:<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-view-history-query.png')} alt="View history query" style={{border: '1px solid gray'}} width="800"/>
1. Click the search button. <img src={useBaseUrl('img/manage/subscriptions/search-button.png')} alt="Search button" width="75"/> <br/>The update history displays. The email of the individual who performed the update appears in the **user_email** column, and the updated items appear in the **content** column. <br/><img src={useBaseUrl('img/manage/subscriptions/mssp-view-history-query-results.png')} alt="View history query results" style={{border: '1px solid gray'}} width="800"/>
1. Investigate any updates that failed and re-run the update if needed. 

## FAQs

### What to expect when updating Cloud SIEM rules

* **Are rule tuning expressions included?**<br/>No, they are not included, but can be updated separately.
* **What happens when a rule with the same name already exists?**<br/>It will be replaced in the child organization.
* **What if errors occur during updating?**<br/>Affected items will be skipped. Once the rest of the content is updated, you can review errors in log search and retry.

### What to expect when updating Cloud SIEM rule tuning expressions

* **What happens if a tuning expression with the same name already exists?**<br/>It will be replaced in the child organization.
* **What if errors occur during updating?**<br/>Affected items will be skipped. Once the rest of the content is updated, you can review errors in log search and retry.
* **What happens if the source tuning expression contains Cloud SIEM rules?**<br/>If the **Include Linked Cloud SIEM Rules** option is selected, existing rules with the same name in the destination organization will be linked to match the source tuning expression.
* **What if no matching Cloud SIEM rules are found in the destination organization?**<br/>The update will complete with a warning, and missing rules will be logged in the audit log. You can update those rules separately and re-run the tuning expression update.
   

## Multi-insights list page in Cloud SIEM

If you are logged in to a parent organization with child organizations that also use Cloud SIEM, the insights list page in Cloud SIEM allows you to [view insights in child organizations](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/#view-insights-in-child-organizations). 

<!-- After this article is no longer beta, show the following text:
This multi-insights list page (also known as a "federated" page) shows insights just as in a normal insights list page. When you click an insight on the page, you are automatically signed in to the child organization (if SSO is enabled for the child organization), and the insight's details open in the child organization's UI. You can also use the board view on the multi-insights page to move insights to different statuses.

To be able to see insights in child organizations, add child organizations that use Cloud SIEM. Then when the parent organization user goes to their Cloud SIEM insights list page, all the child organizations' insights appear in the list.
-->
