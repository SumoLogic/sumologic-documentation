---
id: manage-orgs-for-mssps
title: Manage Organizations for MSSPs
sidebar_label: Manage Orgs for MSSPs
description: Learn how to manage library content for Managed Security Service Providers (MSSPs).
---

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

<!-- Originally added as a beta article with DOCS-637. -->

This article describes how to manage organizational library content for Managed Security Service Providers (MSSPs). MSSP administrators must ensure that the content of their child organizations is properly configured. MSSPs often consist of a parent organization with child organizations that use [Cloud SIEM](/docs/cse/).

## Considerations

### Roles

You must have the following [organization role capabilities](/docs/manage/users-roles/roles/role-capabilities/#organizations) to create and manage organizations as an MSSP administrator:

* Organizations
   * View Organizations
   * Create Organizations
   * Manage Organizations

## Manage content in organizations

To ensure that [Library](/docs/get-started/library) content is consistent across child organizations, use the **Manage Content** tab to push content in target organizations with content from a source organization.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**.
1. Select the **Manage Content** tab.
1. In the **Source Org** field, select the organization that will provide the source data to be pushed in other organizations.
1. In the **Content** bar, select **Library**. For more information about Library items, refer to [Managing Your Sumo Logic Library](/docs/get-started/library).
1. Select individual items to be pushed, or all items.
1. Click **Push Selected Items**.<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-sync-selected-items.png')} alt="Push Selected Items button" style={{border: '1px solid gray'}} width="800"/>
1. On the **Push Selected Content** box, navigate to the **Destinations** section to select the organizations to push the selected items to. You can push to all organizations, a single child organization, or multiple child organizations.<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-sync-selected-items-2.png')} alt="Push Selected Items dialog" style={{border: '1px solid gray'}} width="400"/>
1. Click **Push**. A **Pushing in progress** dialog is displayed.

### Tips

* If you select **All Child Organizations**, you can then select organizations to exclude, allowing you to push to all organizations except those you select:<br/><img src={useBaseUrl('img/manage/subscriptions/mssp-orgs-selected-organizations.png')} alt="Selected organizations" style={{border: '1px solid gray'}} width="300"/>
* Selected Library items are added to the [Admin Recommended](/docs/manage/content-sharing/admin-mode/#move-important-content-to-admin-recommended) folder. Additionally, you can only select the Library contents in Source Organization under the Admin Recommended folder.
* **Scheduled Searches Connection**. Select **Include Connection** to create the scheduled searches in the target organizations if they don't already exist there. Select **Ignore Connection** only if you want to turn the added scheduled searches into saved searches.
* **Scheduled Reports**. Select **Include Scheduled Reports** to create the scheduled reports in the target organizations if they don't already exist there. Select **Ignore Scheduled Reports** only if you want to turn the added scheduled reports into saved reports. 
   :::note
   Both **Scheduled Searches Connection** and **Scheduled Reports** will be available only when you select a library *folder*.
   :::

### Limitations

- If an item with the same name exists in the target organization, it will be replaced.
- Once a push is initiated, it cannot be reversed. Administrators should carefully review their selections before updating.
- If errors occur during the push, administrators must manually re-attempt the failed push. To see failed pushes, use [View History](/docs/manage/manage-subscription/create-and-manage-orgs/manage-orgs-for-mssps-csiem-rules#view-history).
- Push operations may take longer based on the volume of content being pushed.
- Rule tuning expressions must be pushed separately from rules.
- *Cloud SIEM Legacy Rule Type* is not supported for sync or push.

:::info
To learn how to view history and view updates in the audit log​, refer to [Manage Organizations for MSSPs - Cloud SIEM](/docs/manage/manage-subscription/create-and-manage-orgs/manage-orgs-for-mssps-csiem-rules).
:::

## FAQs

* **What happens when a item with the same name already exists?**<br/>It will be replaced in the child organization.
* **What happens if an item selected for push doesn't already exist in the target organization?**<br/>The item will be created in the target organization.
* **What if errors occur during pushing?**<br/>Affected items will be skipped. Once the rest of the content is pushed, you can review errors in [View History](/docs/manage/manage-subscription/create-and-manage-orgs/manage-orgs-for-mssps-csiem-rules#view-history) and retry.
* **Can I roll back changes after a push operation?**<br/>No, rollback is not supported. After a push operation is initiated, changes cannot be reversed.
* **How can I monitor push progress?**<br/>During a push, the system displays real-time status, including progress tracking, success or failure messages, and error logs.
* **How can I view push history?**<br/>Click **View History** in the upper-right corner of the page. A query for push history will display, showing the email of the individual who performed the push and the pushed items.
* **Who can I contact for additional questions or support?**<br/>Reach out to your  Sumo Logic representative with any questions, issues, or feedback.
