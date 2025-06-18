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

This article describes how to manage organizations for Managed Security Service Providers (MSSPs). MSSPs often consist of a parent organization with child organizations.

## Considerations

### Prerequisites

You must have the following [organization role capabilities](/docs/manage/users-roles/roles/role-capabilities/#organizations) to create and manage organizations as an MSSP administrator:

* Organizations
   * View Organizations
   * Create Organizations
   * Manage Organizations

### Multi-insights list page in Cloud SIEM

If you are logged in to a parent organization with child organizations that also use Cloud SIEM, the insights list page in Cloud SIEM allows you to [view insights in child organizations](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/#view-insights-in-child-organizations).

<!-- After this article is no longer beta, show the following text:
This multi-insights list page (also known as a "federated" page) shows insights just as in a normal insights list page. When you click an insight on the page, you are automatically signed in to the child organization (if SSO is enabled for the child organization), and the insight's details open in the child organization's UI. You can also use the board view on the multi-insights page to move insights to different statuses.

To be able to see insights in child organizations, add child organizations that use Cloud SIEM. Then when the parent organization user goes to their Cloud SIEM insights list page, all the child organizations' insights appear in the list.
-->

## Manage content in organizations

MSSP administrators must ensure that the content of their child organizations is properly configured. To ensure that content is consistent across your organizations, use the **Manage Content** tab to update content in target organizations with content from a source organization.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Select the **Manage Content** tab.<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-manage-content.png')} alt="Manage Content tab" style={{border: '1px solid gray'}} width="500"/>
1. In the **Source** field, select the organization that will provide the source data to be updated in target organizations.<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-source-org.png')} alt="Manage Content tab" style={{border: '1px solid gray'}} width="500"/>
1. In the **Content** bar, select the type of content to update:
   * **Cloud SIEM Rules**. For more information about Cloud SIEM rules, see [Cloud SIEM Rules](/docs/cse/rules/).<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-cse-rules.png')} alt="Cloud SIEM rules" style={{border: '1px solid gray'}} width="600"/>
   * **Cloud SIEM Rule Tuning**. For more information about Cloud SIEM rule tuning expressions, see [Rule Tuning Expressions](/docs/cse/rules/rule-tuning-expressions/).<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-cse-rule-tuning.png')} alt="Cloud SIEM rule tuning expressions" style={{border: '1px solid gray'}} width="600"/>
   * **Library**. For more information about Library items, see [Managing Your Sumo Logic Library](/docs/get-started/library/).<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-library.png')} alt="Library items" style={{border: '1px solid gray'}} width="600"/><br/>
       Items appear in **Library** only after they have been [shared with Administrator view access](/docs/manage/content-sharing/):<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-admin-view-access.png')} alt="Administrator view access" style={{border: '1px solid gray'}} width="600"/>
1. Select individual items to be updated, or all items.
1. Click **Update Selected Items**.<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-sync-selected-items.png')} alt="Update Selected Items button" style={{border: '1px solid gray'}} width="800"/>
1. On the **Update Selected Items** box, click **Destinations** to select the organizations to update the selected items to. You can update to all organizations, a single organization, or multiple organizations.<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-sync-selected-items-2.png')} alt="Update Selected Items dialog" style={{border: '1px solid gray'}} width="400"/>
1. Click **Update**. An **Updating in progress** dialog is displayed.

### Tips

* If you select **All Child Organizations**, you can then select organizations to exclude, allowing you to update to all organizations except those you select:<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-selected-organizations.png')} alt="Selected organizations" style={{border: '1px solid gray'}} width="300"/>
* Selected Library items are added to the [Admin Recommended](/docs/manage/content-sharing/admin-mode/#move-important-content-to-admin-recommended) folder.
* When you update rule tuning expressions, select **Include Associated Cloud SIEM Rules** to also update all the Cloud SIEM rules that the expressions are used on:<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-sync-associated-rules.png')} alt="Include Associated Cloud SIEM Rules checkbox" style={{border: '1px solid gray'}} width="200"/>
* When you update scheduled searches, select **Include and Update Connect** to create the scheduled searches in the target organizations if they don't already exist there. Select **Ignore Connection** only if you want to turn the added scheduled searches into saved searches.<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-update-scheduled-searches.png')} alt="Include and Update Connect checkbox" style={{border: '1px solid gray'}} width="400"/>

### Limitations

* If an item with the same name exists in the target organization, it will be replaced.
* Once an update is initiated, it cannot be reversed. Administrators should carefully review their selections before updating.
* If errors occur during update, administrators must manually re-attempt failed updates. To see failed updates, use [View History](#view-history).
* Update operations may take longer based on the volume of content being updated.
* Rule tuning expressions must be updated separately from rules.

### View history

1. Click **View History** in the upper-right corner of the page. <br/>A query for update history displays:<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-view-history-query.png')} alt="View History query" style={{border: '1px solid gray'}} width="800"/>
1. Click the search button. <img src={useBaseUrl('img/manage/subscriptions/search-button.png')} alt="Search button" width="75"/> <br/>The update history displays. The success or failure of the update appears in the **status** column. The email of the individual who performed the update appears in the **user_email** column. The updated items appear in the **content** column.
1. Investigate any updates that failed and re-run the update if needed.<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-view-history-query-results.png')} alt="View History query results" style={{border: '1px solid gray'}} width="800"/>

### View updates in the audit log

You can view all content management updates in the [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index/) by using the following query:

```sql
_index=sumologic_audit_events
| where eventname = "ContentSynced"
```

To see the results displayed the same as in [**View History**](#view-history), use this query:

```sql
_index=sumologic_audit_events
| where eventname = "ContentSynced"
| orchestratorJob.id as job_sync_id
| operator.email as user_email
| parseDate(eventTime, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX") as eventTimeInmilliseconds
| values(resourceIdentity.name) as content, values(resourceIdentity.type) as content_type, min(eventTimeInmilliseconds) as content_sync_job_time_ms, values(status) as all_status by job_sync_id, user_email
| if (contains(all_status, "Failed"), "Failed", "Success") as status
| sort by content_sync_job_time_ms
| formatDate(content_sync_job_time_ms, "yyyy-MM-dd") as content_sync_date
| formatDate(content_sync_job_time_ms, "HH:mm:ss") as content_sync_time
| fields content_sync_date, content_sync_time, job_sync_id, status, user_email, content_type, content
```

### FAQs

* **What happens if an item with the same name already exists in the target organization?**<br/>The item in the target organization will be replaced.
* **What happens if an item selected for update doesn't already exist in the target organization?**<br/>The item will be created in the target organization.
* **What if errors occur during updating?**<br/>Affected items will be skipped. Once the rest of the content is updated, you can review errors in [View History](#view-history) and retry.
* **Can I roll back changes after an update operation?**<br/>No, rollback is not supported. After an update operation is initiated, changes cannot be reversed.
* **How can I monitor update progress?**<br/>During an update, the system displays real-time status, including progress tracking, success or failure messages, and error logs.
* **How can I view update history?**<br/>Click [**View History**](#view-history) in the upper-right corner of the page. A query for update history will display, showing the email of the individual who performed the update and the updated items.
* **Who can I contact for additional questions or support?**<br/>Reach out to your  Sumo Logic representative with any questions, issues, or feedback.

#### Rules updates

**Are rule tuning expressions included?**<br/>No, they are not included, but can be updated separately.

#### Rule tuning expressions updates

* **What happens if the source tuning expression contains Cloud SIEM rules?**<br/>If the **Include Linked Cloud SIEM Rules** option is selected, existing rules with the same name in the destination organization will be linked to match the source tuning expression.
* **What if no matching Cloud SIEM rules are found in the destination organization?**<br/>The update will complete with a warning, and missing rules will be logged in the audit log. You can update those rules separately and re-run the tuning expression update.
