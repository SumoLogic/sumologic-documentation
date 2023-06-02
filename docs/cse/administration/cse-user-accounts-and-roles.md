---
id: cse-user-accounts-and-roles
title: Cloud SIEM User Accounts and Roles
sidebar_label: Cloud SIEM User Accounts and Roles
description: Learn how to create users and roles for Cloud SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about creating and managing user accounts and roles for Cloud SIEM. Cloud SIEM uses role-based access control (RBAC). An administrator controls access to capabilities by assigning capabilities or permissions to roles, and then assigning users to roles.  

## Create users and roles

Roles and capabilities are managed on the Sumo Logic platform. For instructions, see the following topics:
* [Create and Edit Users](/docs/manage/users-roles/users/create-edit-users.md). Follow the instructions in this topic to create user accounts. When you create a user account, you'll assign roles to it.
* [Create and Manage Roles](/docs/manage/users-roles/roles/create-manage-roles.md). You can assign multiple roles to a user. So, you might consider creating Cloud SIEM-specific roles for different Cloud SIEM user types, separate from roles you may define for Sumo Logic platform functionality.  
  :::note
  When you create roles, you have the option to set up a role search filter that specifies what log data users with the role may access. If you take advantage of that feature, be sure not to restrict Cloud SIEM users’ access to [indexes that contain Cloud SIEM Records](../records-signals-entities-insights/search-cse-records-in-sumo.md).
  :::

## Assign Cloud SIEM capabilities to a role

1. In the left navigation bar of Sumo Logic, select **Administration > Users and Roles**.
1. Click the **Roles** tab. 
1. Click **Add Role**.
1. In the **Create New Role** dialog, scroll down to **Cloud SIEM Enterprise**. 
1. Select **View Cloud SIEM Enterprise**. <br/><img src={useBaseUrl('img/cse/cloud-siem-role-capabilities.png')} alt="Cloud SIEM role capability categories" style={{border: '1px solid black'}} width="250"/>
1. Select capabilities from the categories:
   *  **Insights**. Provides capabilities to manage [Insights](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/). 
   *  **Content**. Provides capabilities to manage elements such as [rules](/docs/cse/rules/), [match lists](/docs/cse/match-lists-suppressed-lists/), [Entities](/cse/records-signals-entities-insights/view-manage-entities/), and more.
   *  **Configuration**. Provides capabilities to manage administrative elements such as [mappings](/docs/cse/ingestion/sumo-logic-ingest-mapping/), [tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules/), [automations](/docs/cse/automation-service/), and more.


:::tip
* If you select a “Manage” capability for an object (like **Manage Rules**) you also have to select the corresponding “View” capability (like **View Rules**). Users can't manage something without also being able to view it. 
* When we add new features to Cloud SIEM, capabilities for them are auto-enabled on the built-in **Administrator** role. However, if you create your own roles for Cloud SIEM, you must add those capabilities as needed to your custom roles. Follow our [Cloud SIEM release notes](/release-notes-cse/) for new features to determine if they have corresponding role capabilities you need to add to your roles.
:::
