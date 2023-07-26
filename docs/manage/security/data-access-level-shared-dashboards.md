---
id: data-access-level-shared-dashboards
title: Data Access Level for Shared Dashboards
description: Enable the Data Access Level for Shared Dashboards security policy to ensure that a newly-created dashboard by default runs with the role search filter of a user with whom the dashboard is shared.
---

The **Data Access Level for Shared Dashboards** security policy allows you to set all newly created dashboards to run with the viewer's role access filter when the dashboards are shared. If you do not enable this policy, by default newly created dashboards will run with the creator's role access filter, so viewers might see data that their own role search filters do not grant access.

Setting this policy only affects dashboards that are created after the policy is enabled, not dashboards created before the policy is enabled.  

For more information about data access levels for dashboards, see [Set the Data Access Level for a Dashboard](/docs/dashboards-classic/get-started/set-data-access-level-dashboard.md).

:::note
You must have a role that grants you the Manage Org Settings [capability](../users-roles/roles/role-capabilities.md) to enable the **Data Access Level for Shared Dashboards** security policy.
:::

To enable that **Data Access Level for Shared Dashboards security policy:

1. Go to **Administration > **Security** > **Policies**.
1. Click the checkbox in the **Data Access Level for Shared Dashboards** section.

 
