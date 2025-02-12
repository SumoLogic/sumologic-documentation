---
slug: /manage/manage-subscription/create-and-manage-orgs
title: Create and Manage Orgs
description: Learn about how to upgrade your Sumo Logic account plans.
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