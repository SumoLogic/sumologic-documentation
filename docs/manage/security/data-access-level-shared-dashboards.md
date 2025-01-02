---
id: data-access-level-shared-dashboards
title: Data Access Level for Shared Dashboards
description: Enable the Data Access Level for Shared Dashboards security policy to ensure that a newly-created dashboard by default runs with the role search filter of a user with whom the dashboard is shared.
---

The **Data Access Level for Shared Dashboards** security policy allows you to set all newly created dashboards to run with the viewer's role access filter when the dashboards are shared. If you do not enable this policy, by default newly created dashboards will run with the creator's role access filter, so viewers might see data that their own role search filters do not grant access.

Setting this policy only affects dashboards that are created after the policy is enabled, not dashboards created before the policy is enabled.  

For more information about data access levels for dashboards, see [Set the Data Access Level for a Dashboard](/docs/dashboards/set-data-access-level).

:::note
You must have a role that grants you the Manage Org Settings [capability](../users-roles/roles/role-capabilities.md) to enable the **Data Access Level for Shared Dashboards** security policy.
:::

To enable the Data Access Level for Shared Dashboards security policy:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Policies**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Policies**. 
1. Click the checkbox in the **Data Access Level for Shared Dashboards** section.

 
