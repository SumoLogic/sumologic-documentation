---
id: add-remove-users-role
title: Add or Remove Users from a Role
description: You can change the default assignment of roles to users.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for added users to a role, and removing users from a role.

### Add a user to a role

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Administration > Users and Roles > Roles**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**. 
1. Navigate to the role and click the number in the **Users** column. <br/><img src={useBaseUrl('img/users-roles/user-in-role-count.png')} alt="Number displayed in the Users column" style={{border: '1px solid gray'}} width="600" />
1. A list of users currently assigned to the role appears. <br/><img src={useBaseUrl('img/users-roles/users-assigned-to-role.png')} alt="Assigned users list" style={{border: '1px solid gray'}} width="300" />
1. Click the **Assign Users** field. A list of users that are not currently assigned to the role appears. Click a user’s name to add the user to the role. 
1. Add additional users to the role, as desired.
1. Click **Save** when you are done adding users to the role.

:::important
When you add or remove a role from a user, it can take about an hour for the RBAC changes to take effect on an existing real-time alert. For example, when a user creates a real-time alert, the user’s search filter governs what log data is returned by the scheduled search. If an admin subsequently makes that user’s search filter more restrictive or removes that role from the user, for about an hour, alerts triggered by data that the user’s updated search filter now prohibits will still fire. (Changes take effect immediately for manually run searches.) 
:::

### Remove a user from a role

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Administration > Users and Roles > Roles**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**. 
1. Navigate to the role and click the number in the **Users** column. <br/><img src={useBaseUrl('img/users-roles/role-list.png')} alt="Numbers in Users column" style={{border: '1px solid gray'}} width="700" />
1. A list of users currently assigned to the role appears. 
1. Navigate to the user you want to remove from the role, and click the trash can icon in that row. <br/><img src={useBaseUrl('img/users-roles/delete-user-from-role.png')} alt="Trash can icon on user row" style={{border: '1px solid gray'}} width="300" />
1. Click **Save** when you are done removing users from the role. 

:::important
When you add or remove a role from a user, it can take about an hour for the RBAC changes to take effect on an existing real-time alert. For example, when a user creates a real-time alert, the user’s search filter governs what log data is returned by the scheduled search. If an admin subsequently makes that user’s search filter more restrictive or removes that role from the user, for about an hour, alerts triggered by data that the user’s updated search filter now prohibits will still fire. (Changes take effect immediately for manually run searches.) 
:::
