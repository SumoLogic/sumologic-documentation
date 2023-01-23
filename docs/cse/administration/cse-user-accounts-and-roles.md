---
id: cse-user-accounts-and-roles
title: CSE User Accounts and Roles
sidebar_label: CSE User Accounts and Roles
description: Learn how to create users and roles for CSE.
---

This topic has information about creating and managing user accounts and roles for CSE. CSE uses role-based access control (RBAC). An administrator controls access to capabilities by assigning capabilities or permissions to roles, and then assigning users to roles.  

Roles and capabilities are managed on the Sumo Logic platform. For instructions, see the following topics:

* [Create and Manage Roles](/docs/manage/users-roles/roles/create-manage-roles.md). You can assign multiple roles to a user. So, you might consider creating CSE-specific roles for different CSE user types, separate from roles you may define for Sumo Logic platform functionality. The CSE-related capabilities you can assign to roles are listed in the Cloud SIEM Enterprise section of the **Role Capabilities** page. 
  :::note
  When you create roles, you have the option to set up a role search filter that specifies what log data users with the role may access. If you take advantage of that feature, be sure not to restrict CSE users’ access to [indexes that contain CSE Records](../records-signals-entities-insights/search-cse-records-in-sumo.md).
  :::

* [Create and Edit Users](/docs/manage/users-roles/users/create-edit-users.md). Follow the instructions in this topic to create user accounts. When you create a user account, you'll assign roles to it.





 
