---
id: create-manage-roles
title: Create and Manage Roles
description: You can create custom roles for your users.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for creating and managing Sumo Logic roles. The roles you assign to a user control what Sumo Logic capabilities are available to the user and what log data the user can access. This functionality is referred to as role-based access control.  

## Built-in Administrator and Analyst roles

There are two built-in roles in a Sumo Logic account: Administrator and Analyst. 

The Administrator role is a super user. It has all of the [capabilities](/docs/manage/users-roles/roles/role-capabilities/) that can be assigned to a role, and its [role search filter]v enables access to all data in Sumo Logic. You cannot edit or delete the Administrator role. 

Users with the Analyst role have a single capability: View Collectors. Its role search filter enables access to all data in Sumo Logic. You can edit the Analyst role filter to change the capabilities assigned to it and to make the role filter more restrictive. You can also delete the Analyst role if desired. For more information, see [Edit a role](#create-a-role) and [Delete a role](#delete-a-role) below.

## Create a role

To create a role:

1. Go to **Administration** > **Users and Roles** > **Roles**.
1. Click **+ Add Role** on the upper right side of the page.
1. The **Create New Role** pane appears on the right side of the page.<br/><img src={useBaseUrl('img/users-roles/create-new-role.png')} alt="Create a new role" style={{border: '1px solid black'}} width="400"/>
1. **Name**. Enter a name for the role. 
1. **Description**. Enter a description of the role to help other Administrators understand the purpose or limitations of the role.
1. **Search Filter**. Use this option to control what log data users with this role can access. A search filter for a role defines what log data a user with that role can access. You can define an **Index based** filter to allow access to search indexes, or an **Advanced filter** to allow access only to the logs that match the search filter. You can filter for index keywords, wildcards, metadata fields, and logical operators. Sumo prepends the search filter to each query that a user with the role runs. The search filter is invisible to the user, but limits the log results that are returned. See [Construct a Search Filter for a Role](/docs/manage/users-roles/roles/construct-search-filter-for-role/) for details and examples on constructing search filters for roles. 
1. **Capabilities**. In this section, click the checkbox beside each capability you want to grant to users with this role. For information about what each capability enables, see [Role Capabilities](/docs/manage/users-roles/roles/role-capabilities/).
1. Click **Save**. 

## Add a user to a role

1. Go to **Administration** > **Users and Roles** > **Roles**.
1. Navigate to the role and click the number in the **Users** column.<br/><img src={useBaseUrl('img/users-roles/user-in-role-count.png')} alt="User in role count" width="800"/>
1. A list of users currently assigned to the role appears.<br/><img src={useBaseUrl('img/users-roles/users-assigned-to-role.png')} alt="Users assigned to role" width="350"/>
1. Click the A**ssign Users** field. A list of users that are not currently assigned to the role appears. Click a user’s name to add the user to the role. 
1. Add additional users to the role, as desired.
1. Click **Save** when you are done adding users to the role.

:::important
When you add or remove a role from a user, it can take about an hour for the RBAC changes to take effect on an existing real-time alert. For example, when a user creates a real-time alert, the user’s search filter governs what log data is returned by the scheduled search. If an admin subsequently makes that user’s search filter more restrictive or removes that role from the user, for about an hour, alerts triggered by data that the user’s updated search filter now prohibits will still fire. (Changes take effect immediately for manually run searches.) 
:::

## Remove a user from a role

1. Go to **Administration** > **Users and Roles **\> **Roles**.
1. Navigate to the role and click the number in the **Users** column.<br/><img src={useBaseUrl('img/users-roles/role-list.png')} alt="Role list" width="800"/>
1. A list of users currently assigned to the role appears. 
1. Navigate to the user you want to remove from the role, and click the trash can icon in that row.<br/><img src={useBaseUrl('img/users-roles/delete-user-from-role.png')} alt="Remove user from a role" width="350"/>
1. Click **Save** when you are done removing users from the role. 

:::important
When you add or remove a role from a user, it can take about an hour for the RBAC changes to take effect on an existing real-time alert. For example, when a user creates a real-time alert, the user’s search filter governs what log data is returned by the scheduled search. If an admin subsequently makes that user’s search filter more restrictive or removes that role from the user, for about an hour, alerts triggered by data that the user’s updated search filter now prohibits will still fire. (Changes take effect immediately for manually run searches.) 
:::

## See which users are assigned to a role

1. Go to **Administration** > **Users and Roles** > **Roles**.<br/><img src={useBaseUrl('img/users-roles/user-in-role-count.png')} alt="Count of users in a role" width="800"/>
1. Navigate to the role and click the number in the **Users** column to see a list of users assigned to the role.

## Edit a role

To edit a role:

1. Go to **Administration** > **Users and Roles** > **Roles**.
1. Click the row for the role you want to edit.
1. The current configuration of the role appears in a pane on the right side of the page.
1. Click **Edit** at the top of the right side of the page.
1. Make your edits. For information about edit options, see [Create a role](#create-a-role) above.
1. After editing the role, click **Save**.

## Delete a role

You can only delete a role to which no users are assigned. Before deleting a role, you must unassign any users currently assigned to it. For information about unassigning a user from a role, see [Add or Remove Users from a Role](/docs/manage/users-roles/roles/add-remove-users-role/).

To delete a role:

1. Go to **Administration** > **Users and Roles** > **Roles**.
1. Click the row for the role you want to delete.
1. The current configuration of the role appears in a pane on the right side of the page.
1. Click **Delete** at the top of the right side of the page.
1. If there are users currently assigned to the role, an error message will appear. Otherwise, you’ll be prompted to confirm that you want to delete the role.
