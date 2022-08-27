---
id: role-based-access-control
title: Role-Based Access Control
---

#

Sumo Logic supports Role-Based Access Control (RBAC) to control access to Sumo Logic functionality and to limit the data that users may view.  

:::note
To manage users and roles, you must have the Administrator role or your role must have been assigned the [manage users and roles capability](role-capabilities.md).
:::

With RBAC, you don’t assign permissions directly to users. Instead, you assign permissions to roles, and then assign roles to users. Specifically, when you create a role, you assign it a set of capabilities and a role search filter. 

A [capability](role-capabilities.md) is the right to perform a particular function in Sumo Logic, for instance “Manage connections”, “View collectors” and “Manage password policy”. 

A [role search filter](construct-search-filter-for-role.md) limits what log data a user with that role may view—it’s essentially a log query. Like any other log query, a search filter can use Sumo Logic built-in metadata fields, keywords, and logical operators. You can assign multiple roles to a particular user. When a user has multiple Sumo roles, Sumo combines the role filters from each of the roles using OR to come up with the combined role filter. When a Sumo Logic user runs a log query, Sumo Logic silently prepends the user’s query with the user’s combined role filter. Note that, when multiple roles filters are applied to a query, the least restrictive filter takes precedence.  
