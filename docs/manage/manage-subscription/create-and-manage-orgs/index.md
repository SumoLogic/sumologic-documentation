---
slug: /manage/manage-subscription/create-and-manage-orgs
title: Create and Manage Orgs
description: Learn how to create and manage your Sumo Logic organizations.
---

The topics in this guide provide information on how to create and manage your Sumo Logic orgs.

import useBaseUrl from '@docusaurus/useBaseUrl';

## Requirements for creating and managing orgs

There are several [role capabilities](/docs/manage/users-roles/roles/role-capabilities) that are required to work with orgs:

* **View Organizations**. This capability is required to view the Organizations UI.
* **Create Organizations**. This capability is required to create or provision child organizations.
* **Change Credits Allocation**. This capability is required to change the credits allocation and baselines for a child organization. 
* **Create Trial Organizations**. This capability is required to create and provision trial organizations. 
* **Upgrade Trial Organizations**. This capability is required to upgrade trial organizations. 

## Guides

In this section, we'll introduce the following concepts:

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/manage-subscription/create-and-manage-orgs/create-manage-orgs"><img src={useBaseUrl('img/icons/operations/manage.png')} alt="icon" width="40"/><h4>Create and Manage Orgs</h4></a>
  <p>Learn how to create and manage multiple Sumo Logic Orgs.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/manage-subscription/create-and-manage-orgs/create-manage-orgs-service-providers"><img src={useBaseUrl('img/icons/operations/manage.png')} alt="icon" width="40"/><h4>Create and Manage Orgs (Service Providers)</h4></a>
  <p>Learn how to group, provision, centrally manage, and monitor credits usage of multiple orgs.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/manage-subscription/create-and-manage-orgs/create-manage-orgs-flex"><img src={useBaseUrl('img/icons/operations/manage.png')} alt="icon" width="40"/><h4>Create and Manage Orgs (Flex)</h4></a>
  <p>Learn how to create and manage multiple Sumo Logic Orgs with Flex data.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/manage-subscription/create-and-manage-orgs/manage-org-settings"><img src={useBaseUrl('img/icons/operations/manage.png')} alt="icon" width="40"/><h4>Manage Org Settings</h4></a>
  <p>Learn how to update org names, define subdomain names, delete orgs, and change the account owner.</p>
  </div>
</div>
<!-- <div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/manage-subscription/create-and-manage-orgs/manage-orgs-for-mssps"><img src={useBaseUrl('img/icons/operations/manage.png')} alt="icon" width="40"/><h4>Manage Orgs for MSSPs</h4></a>
  <p>Learn how to manage organizations for Managed Security Service Providers (MSSPs).</p>
  </div>
</div> -->
</div>

## View a child org, child credits usage, and baseline

After creating the orgs, you can view the individual child orgs, view the detailed breakup of child credits usage, and view the baseline set for org.

### Access a child org

If a [custom subdomain](/docs/manage/manage-subscription/create-and-manage-orgs/manage-org-settings#set-up-a-customsubdomain) has been configured for a child org, and you have an account in the org, you can access it from the **Organizations** UI.

1.  [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Click the row for the org you want to access.
1. Click **Access Organization** in the right hand pane. <br/> <img src={useBaseUrl('img/manage/subscriptions/access-org.png')} alt="your description" style={{border:'1px solid gray'}} width="450"/>

### View child credits usage

You can access the child credits usage for a selected organization from the **Organizations** UI.

1.  [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Click the row for the org you want to access the credits usage.
1. You can see the total percentage of credits consumed out of the total number of credits allocated in the **Allocation & usage** section.
1. Click **Open in Account Overview** for a detailed child credit usage report for the selected organization.<br/> <img src={useBaseUrl('img/manage/subscriptions/child-credits-usage.png')} alt="child-credits-usage" style={{border:'1px solid gray'}} width="450"/>

### View baselines

Your estimates of ingest capacity required for each product variable are called as baselines. Sumo Logic’s throttling multipliers for logs and metrics are based on these estimates, you can access it from the **Organizations** UI.

1.  [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Click the row for the org you want to check the baselines.
1. Click **Edit** in the right hand pane. <br/> <img src={useBaseUrl('img/manage/subscriptions/edit-org-3.png')} style={{border:'1px solid gray'}} alt="your description" width="450" />
1. To view the baseline, click **View Baseline**.<br/> <img src={useBaseUrl('img/manage/subscriptions/baselines_3.png')} alt="baselines_2" style={{border:'1px solid gray'}} width="450"/>

## Deactivate a child org

You can deactivate the child org when it is no longer needed. Before deactivating the child org, make sure you:

- Exported the saved searches, dashboards, and/or lookup tables.
- Verified the credit balances. If there are any unused credits, these credits will automatically return to the parent once the org is marked **Inactive**.
- Notify the child org users.

Follow the below steps to deactivate a child org:

1.  [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Click the three-dot kebab icon to the right of the child org you'd like to deactivate, then click **Deactivate** from the dropdown. Or, click the row for the org you want to deactivate and click the **Deactivate** button in the right-side panel. <br/> <img src={useBaseUrl('img/manage/subscriptions/deactivate.png')} style={{border:'1px solid gray'}} alt="deactivate" width="800" />Or,<br/> <img src={useBaseUrl('img/manage/subscriptions/deactivate-right-panel.png')} style={{border:'1px solid gray'}} alt="deactivate-right-panel" width="450" />
1. Click **Deactivate** on the confirmation pop-up. Confirming this action will permanently deactive the selected child org.<br/> <img src={useBaseUrl('img/manage/subscriptions/deactivate-confirmation.png')} style={{border:'1px solid gray'}} alt="deactivate-confirmation" width="450" />

By deactivating the child org, you can see the below responses:

- All the UI logins and active sessions will be terminated.
- API keys, collector tokens, and ingest pipelines will be revoked.
- The child’s **Zuora** subscription will be cancelled and the respective bill-account is disabled.
- Any Flex credits still assigned to the child org are automatically returned to the parent org and will be visible in the parent’s allocation widget.
- The org’s status changes to **Deactivated** in **Manage Accounts**. You can still run usage reports against it.

## Delink a child org (Optional)

Delinking will remove the inactive org from the parent’s child orgs list, and will only be available after the cooling-off window ends. By default, cooling window ends in 48 hours.

:::note
A warning message will be displayed if you try to delink before the cooling-off window ends.
:::

Follow the below steps to delink the deactivated child org:

1.  [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Click the three-dot kebab icon to the right of the deactivated child org you'd like to delink, then click **Delink** from the dropdown. Or, click the row for the org you want to delink and click the **Delink** button in the right-side panel.<br/> <img src={useBaseUrl('img/manage/subscriptions/delink.png')} style={{border:'1px solid gray'}} alt="your description" width="800" />Or,<br/> <img src={useBaseUrl('img/manage/subscriptions/delink-right-panel.png')} style={{border:'1px solid gray'}} alt="your description" width="450" />
1. Click **Delink** on the confirmation pop-up. Confirming this action will permanently delink the selected child org.<br/> <img src={useBaseUrl('img/manage/subscriptions/delink-confirmation.png')} style={{border:'1px solid gray'}} alt="delink-confirmation" width="450" />


### Limitations

- Only **parent-org** users with Manage Child Orgs capability can initiate a deletion workflow.
- Compatible with Enterprise, Trial/PoV, and Free-Forever child orgs.





