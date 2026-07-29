---
id: cse-user-accounts-and-roles
title: SIEM User Accounts and Roles
sidebar_label: SIEM User Accounts and Roles
description: Learn how to create users and roles for SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about creating and managing user accounts and roles for SIEM. SIEM uses role-based access control (RBAC). An administrator controls access to capabilities by assigning capabilities or permissions to roles, and then assigning users to roles.  

## Create users and roles

Roles and capabilities are managed on the Sumo Logic platform. For instructions, see the following topics:
* [Create and Edit Users](/docs/manage/users-roles/users/create-edit-users). Follow the instructions in this topic to create user accounts. When you create a user account, you'll assign roles to it.
* [Create and Manage Roles](/docs/manage/users-roles/roles/create-manage-roles). You can assign multiple roles to a user. So, you might consider creating SIEM-specific roles for different SIEM user types, separate from roles you may define for Sumo Logic platform functionality.  
  :::note
  When you create roles, you have the option to set up a role search filter that specifies what log data users with the role may access. If you take advantage of that feature, be sure not to restrict SIEM users’ access to [indexes that contain SIEM records](/docs/cse/records-signals-entities-insights/search-cse-records-in-sumo).
  :::

## Assign SIEM capabilities to a role

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu click **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Users and Roles**. 
1. Click the **Roles** tab.
1. Click **Add Role**.
1. In the **Create New Role** dialog, scroll down to [**SIEM**](/docs/manage/users-roles/roles/role-capabilities#siem).
1. Select **View SIEM**. <br/><img src={useBaseUrl('img/cse/siem-role-capabilities.png')} alt="SIEM role capability categories" style={{border: '1px solid gray'}} width="250"/>
1. Select capabilities from the categories:
   *  **Insights**. Provides capabilities to manage [insights](/docs/cse/get-started-with-siem/about-cse-insight-ui/).
   *  **Content**. Provides capabilities to manage elements such as [rules](/docs/cse/rules/), [match lists](/docs/cse/match-lists-suppressed-lists/), [entities](/docs/cse/records-signals-entities-insights/view-manage-entities/), and more.
   *  **Configuration**. Provides capabilities to manage administrative elements such as [mappings](/docs/cse/ingestion/sumo-logic-ingest-mapping/), [tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules/), [automations](/docs/cse/automation/), and more.

For descriptions of the capabilities in each category, see [Role Capabilities](/docs/manage/users-roles/roles/role-capabilities#siem).

:::tip
* If you select a “Manage” capability for an object (like **Manage Rules**) you also have to select the corresponding “View” capability (like **View Rules**). Users cannot manage something without also being able to view it.
* When we add new features to SIEM, capabilities for them are auto-enabled on the built-in **Administrator** role. However, if you create your own roles for SIEM, you must add those capabilities as needed to your custom roles. Follow our [SIEM release notes](/release-notes-cse/) for new features to determine if they have corresponding role capabilities you need to add to your roles.
:::
