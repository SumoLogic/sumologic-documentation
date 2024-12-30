---
id: create-manage-roles
title: Create and Manage Roles
description: You can create custom roles for your users.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for creating and managing Sumo Logic roles. The roles you assign to a user control what Sumo Logic capabilities are available to the user and what log data the user can access. This functionality is referred to as role-based access control.  

## Built-in Administrator and Analyst roles

There are two built-in roles in a Sumo Logic account: Administrator and Analyst. 

The Administrator role is a super user. It has all of the [capabilities](/docs/manage/users-roles/roles/role-capabilities/) that can be assigned to a role, and its role search filter enables access to all data in Sumo Logic. You cannot edit or delete the Administrator role. 

Users with the Analyst role have a single capability: View Collectors. Its role search filter enables access to all data in Sumo Logic. You can edit the Analyst role filter to change the capabilities assigned to it and to make the role filter more restrictive. You can also delete the Analyst role if desired. For more information, see [Edit a role](#create-a-role) and [Delete a role](#delete-a-role) below.

## Create a role

To create a role:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Administration > Users and Roles > Roles**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**. 
1. Click **+ Add Role** on the upper right side of the page.
1. The **Create New Role** pane appears on the right side of the page.<br/><img src={useBaseUrl('img/users-roles/create-new-role.png')} alt="Create a new role" style={{border: '1px solid gray'}} width="400"/>
1. **Name**. Enter a name for the role. 
1. **Description**. Enter a description of the role to help other Administrators understand the purpose or limitations of the role.
1. **Search Filter**. Select one of the following to create a filter that allows access to only the logs that match the defined conditions. Only one is allowed for each. For examples, see [Search Filter and Index Access examples](#search-filter-and-index-access-examples) below. (For general guidance on creating search filters, see [Construct a Search Filter for a Role](/docs/manage/users-roles/roles/construct-search-filter-for-role/).)
   * **Log Analytics data filter**. This filter applies to all the [partitions](/docs/manage/partitions/run-search-against-partition/) and [LiveTail](/docs/search/live-tail/). 
   * **Audit data filter**. This filter applies to all the logs in [Audit Indexes](/docs/manage/security/audit-indexes/) and [LiveTail](/docs/search/live-tail/). For example, you could include filters for `sumologic_audit_events`, `sumologic_search_events`, `sumologic_search_usage_per_query`, or `sumologic_system_events`, `sumologic_volume`, to name a few.
   * **Security data filter**. This filter applies on all logs in [Cloud SIEM security indexes](/docs/cse/records-signals-entities-insights/search-cse-records-in-sumo#partition-for-cloud-siem-signals).
1. **Index Access**. Allows or denies access to [search indexes](/docs/manage/partitions/data-tiers/). Select one of the following and choose the indexes in the **Select Indexes** box that appears:
   * **All indexes**. Allow access to all indexes.
   * **Allow few indexes**. Allow access to only the selected indexes. 
   * **Deny few indexes**. Deny access to the selected indexes. 
1. **Capabilities**. In this section, click the checkbox beside each capability you want to grant to users with this role. For information about what each capability enables, see [Role Capabilities](/docs/manage/users-roles/roles/role-capabilities/).
1. Click **Save**. 

### Restrict access using Search Filter and Index Access 

Follow this process to restrict access using the **Search Filter** and **Index Access** sections on the **Create New Role** pane:

1. Identify the dataset you would like to control access to. Test it out using a [search query](/docs/search/get-started-with-search/).
2. Create the role using the **Search Filter** and/or **Index Access** sections.   
3. Verify the dataset access is correct using [emulation](#test-a-role-with-search-filter-and-index-access-defined).
4. [Assign the role](#add-a-user-to-a-role) to the relevant users.

### Search Filter and Index Access examples

Following are examples for using the **Search Filter** and **Index Access** sections on the **Create New Role** pane:
* Let’s say you want to deny access to all logs that contain `error` in log analytics, and contain `malicious=high` in security logs. Select **Log Analytics data filter** and add `!error` to the filter, and then select **Security data filter** and add `!malicious=high` to the filter. 
* Let’s say you want to deny access to partition and security indexes. In our example environment, the `accessLogs` and `authenticationLogs` indexes give access to partitions, and the `sec_*` indexes give access to security information. To deny access to these indexes, click **Deny few indexes** and select those indexes.  
* Let’s say you want to deny access to all error logs in log analytics, and deny access to all audit indexes. In this case, you will have to create two roles. For role 1, select **Log Analytics filter** and add `!error` to the filter. For role 2, select **Index Access > Deny few indexes** and select all audit indexes. Then assign both roles to users.

Keep in mind that these are examples only, and you must adapt them for use in your environment. For general guidance on creating search filters, see [Construct a Search Filter for a Role](/docs/manage/users-roles/roles/construct-search-filter-for-role/).

### Index Access behavior when a user has multiple roles

A role can have one of the following Index Access settings:
   * **All indexes**. Allows access to all indexes.
   * **Allow few indexes**. Allows access to only the selected indexes. 
   * **Deny few indexes**. Denies access to the selected indexes. 

However, if a user is assigned multiple roles that each have different Index Access settings, following is how they are evaluated:
* **All indexes** + **Allow few indexes**. Indexes in the "Allow few indexes" list are allowed, and all other indexes are allowed.
* **All indexes** + **Deny few indexes**. Indexes in the deny list are denied, but all other indexes are allowed.
* **Allow few indexes** + **Deny few indexes**. Indexes in the "Allow few indexes" list are allowed, indexes in the deny list are denied, and all other indexes are denied.
* **All indexes** + **Deny few indexes** + **Allow few indexes**. Indexes in the "Allow few indexes" list are allowed, indexes in the deny list are denied, and the rest of the indexes are allowed.

### Test a role with Search Filter and Index Access defined

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu select **Administration > Users and Roles > Roles**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**. 
1. Select a role with **Search Filter** and/or **Index Access** defined. 
1. Click **Emulate log search**. The search will be emulated for the filtering defined in the role. (In the example below, an index access filter is defined.)<br/><img src={useBaseUrl('img/users-roles/emulate-log-search-index-based.png')} alt="Emulate log search for index filter" style={{border: '1px solid black'}} width="400"/>
1. Enter your search parameters in the log search emulation window. The search will return only what is allowed by filtering defined in the role.<br/><img src={useBaseUrl('img/users-roles/emulate-log-search-window.png')} alt="Emulate log search window" style={{border: '1px solid black'}} width="800"/>

## Add a user to a role

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Administration > Users and Roles > Roles**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**. 
1. Navigate to the role and click the number in the **Users** column.<br/><img src={useBaseUrl('img/users-roles/user-in-role-count.png')} alt="User in role count" width="800"/>
1. A list of users currently assigned to the role appears.<br/><img src={useBaseUrl('img/users-roles/users-assigned-to-role.png')} alt="Users assigned to role" width="350"/>
1. Click the **Assign Users** field. A list of users that are not currently assigned to the role appears. Click a user’s name to add the user to the role. 
1. Add additional users to the role, as desired.
1. Click **Save** when you are done adding users to the role.

:::important
When you add or remove a role from a user, it can take about an hour for the RBAC changes to take effect on an existing real-time alert. For example, when a user creates a real-time alert, the user’s search filter governs what log data is returned by the scheduled search. If an admin subsequently makes that user’s search filter more restrictive or removes that role from the user, for about an hour, alerts triggered by data that the user’s updated search filter now prohibits will still fire. (Changes take effect immediately for manually run searches.) 
:::

## Remove a user from a role

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Administration > Users and Roles > Roles**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**. 
1. Navigate to the role and click the number in the **Users** column.<br/><img src={useBaseUrl('img/users-roles/role-list.png')} alt="Role list" width="800"/>
1. A list of users currently assigned to the role appears. 
1. Navigate to the user you want to remove from the role, and click the trash can icon in that row.<br/><img src={useBaseUrl('img/users-roles/delete-user-from-role.png')} alt="Remove user from a role" width="350"/>
1. Click **Save** when you are done removing users from the role. 

:::important
When you add or remove a role from a user, it can take about an hour for the RBAC changes to take effect on an existing real-time alert. For example, when a user creates a real-time alert, the user’s search filter governs what log data is returned by the scheduled search. If an admin subsequently makes that user’s search filter more restrictive or removes that role from the user, for about an hour, alerts triggered by data that the user’s updated search filter now prohibits will still fire. (Changes take effect immediately for manually run searches.) 
:::

## See which users are assigned to a role

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Administration > Users and Roles > Roles**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**. <br/><img src={useBaseUrl('img/users-roles/user-in-role-count.png')} alt="Count of users in a role" width="800"/>
1. Navigate to the role and click the number in the **Users** column to see a list of users assigned to the role.

## Edit a role

To edit a role:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Administration > Users and Roles > Roles**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**. 
1. Click the row for the role you want to edit.
1. The current configuration of the role appears in a pane on the right side of the page.
1. Click **Edit** at the top of the right side of the page.
1. Make your edits. For information about edit options, see [Create a role](#create-a-role) above.
1. After editing the role, click **Save**.

## Delete a role

You can only delete a role to which no users are assigned. Before deleting a role, you must unassign any users currently assigned to it. For information about unassigning a user from a role, see [Remove a User from a Role](#remove-a-user-from-a-role).

To delete a role:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Administration > Users and Roles > Roles**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**. 
1. Click the row for the role you want to delete.
1. The current configuration of the role appears in a pane on the right side of the page.
1. Click **Delete** at the top of the right side of the page.
1. If there are users currently assigned to the role, an error message will appear. Otherwise, you’ll be prompted to confirm that you want to delete the role.
