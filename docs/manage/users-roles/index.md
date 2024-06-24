---
slug: /manage/users-roles
title: Users and Roles
description: Learn how to manage users and roles in Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/business/user-permissions.png')} alt="icon" width="50"/>

These topics have information about creating and managing Sumo Logic roles and users. In Sumo Logic,  an administrator controls access to capabilities and data by assigning capabilities and search filters to roles, and then assigning user to roles. For more information, see [Role-Based Access Control](roles/role-based-access-control.md).

<!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> To access the Users and Roles page, in the main Sumo Logic menu select **Administration > Users and Roles**. 
<!--Kanso 
[**New UI**](/docs/get-started/sumo-logic-ui-new/). To access the Users and Roles page, in the top menu select **Administration**, and then under **Users and Roles** select either **Users** or **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Users** or **Roles**. 
 Kanso-->

:::note
To manage users and roles, you must have the Administrator role or your role must have been assigned the [manage users and roles capability](roles/role-capabilities.md).
:::

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
