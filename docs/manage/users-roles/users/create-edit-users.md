---
id: create-edit-users
title: Create and Edit Users
description: Create, edit, and view user accounts.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for creating and editing users in Sumo Logic. For information about deleting a user, see [Delete a User](delete-user.md).

## Create a user

To create a user:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Users and Roles > Users**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Users**. You can also click the **Go To...** menu at the top of the screen and select **Users**. 
1. Click the **+ Add User** on the upper right side of the page.
1. The **Create New User** pane appears on the right side of the page. <br/><img src={useBaseUrl('img/users-roles/create-new-user.png')} alt="Create New User pane" style={{border: '1px solid gray'}} width="300" />
1. **First Name**. Enter the user’s first name.
1. **Last Name**. Enter the user’s last name.
1. **Email**. Enter the user’s email address. We recommend that the email match one of your corporate domains of your Sumo Logic account and not be sent to a personal account. For new users, Sumo Logic automatically sends a temporary password to the user at the email address you've entered. A user who logs in to Sumo Logic for the first time is prompted to change the temporary password.
1. **Assigned Roles**. Click in this field to display a list of Sumo Logic roles. Click a role to assign it to the user. For more information about roles, see [Role-Based Access Control](../roles/role-based-access-control.md). If you select multiple roles, the user is given highest level of access of all the assigned roles.
1. Repeat the previous step to assign additional roles to the user.
1. Click **Save** when you are done assigning roles to the user.

:::important
When you add or remove a role from a user, it can take about an hour for the RBAC changes to take effect on an existing real-time alert. For example, when a user creates a real-time alert, the user’s search filter governs what log data is returned by the scheduled search. If an admin subsequently makes that user’s search filter more restrictive or removes that role from the user, for about an hour, alerts triggered by data that the user’s updated search filter now prohibits will still fire. (Changes take effect immediately for manually run searches.) 
:::

## View a user

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Users and Roles > Users**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Users**. You can also click the **Go To...** menu at the top of the screen and select **Users**. 
1. Click the row for the user you want to view.
1. A pane appears on the right side of the page with the user's details. <br/><img src={useBaseUrl('img/users-roles/view-user.png')} alt="User details" style={{border: '1px solid gray'}} width="300" />
<br/>The page displays:

    * The user's first and last name, and email address.
    * The roles assigned the user.
    * The user's account status.
    * Whether or not 2-step verification is enabled for the user.
    * The user's role search filter.
    * The capabilities that the user's roles grant.

## Edit a user

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Users and Roles > Users**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Users**. You can also click the **Go To...** menu at the top of the screen and select **Users**. <br/><img src={useBaseUrl('img/users-roles/user-options-menu.png')} alt="Kebab menu option highlighted on Users tab" style={{border: '1px solid gray'}} width="700" />
1. Select the row for the user you want to edit and choose **Edit** from the three-dot kebab options menu.
1. An edit pane appears on the right side of the page. For information about edit options, see [Create a user](#create-a-user) above.
1. After editing the user, click **Save**.

## Test a user's log access rights

A user's permissions in Sumo Logic are determined by the [roles the user is assigned](/docs/manage/users-roles/roles/add-remove-users-role/). After assigning roles to a user, you can test the user to see if it displays the expected log access behavior based on its assigned roles. (You can also test a role. See [Test a role's log access rights](/docs/manage/users-roles/roles/create-manage-roles/#test-a-roles-log-access-rights).)

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu select **Administration > Users and Roles > Users**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Users and Roles** select **Users**. You can also click the **Go To...** menu at the top of the screen and select **Users**. 
1. Select a user. 
1. Click **More Actions > Emulate log search**. The search will be emulated for the permissions of the user.<br/><img src={useBaseUrl('img/users-roles/select-emulate-log-search.png')} alt="Emulate log search for a user" style={{border: '1px solid black'}} width="200"/>
1. Enter your search parameters in the log search emulation window. The search will return only what is allowed for the user.<br/><img src={useBaseUrl('img/users-roles/emulate-log-search-as-user.png')} alt="Emulate log search window" style={{border: '1px solid black'}} width="800"/>
