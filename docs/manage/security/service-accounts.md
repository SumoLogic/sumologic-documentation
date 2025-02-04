---
id: service-accounts
title: Service Accounts
description: Service accounts allow you to create access keys that can be used in scripts or automation.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

A service account allows you to create [access keys](/docs/manage/security/access-keys/) that can be used in scripts or automation. Because access keys in a service account are not tied to an individual user, they can continue to be used even if the person who created the service account leaves the organization. Service accounts are an ideal way to ensure continuity of operation for critical services.

You might want to use services accounts to provide access keys for:
* Infrastructure as code (such as Terraform).
* SCIM user and role management from an identity provider.
* Third party integrations.

## Prerequisites

You'll need the following [role capabilities](/docs/manage/users-roles/roles/role-capabilities#security):
* **Create Access Keys** to create access keys on service accounts.
* **Manage Access Keys** to deactivate, reactivate, or delete access keys on service accounts.

Only administrators can create service accounts. If you are unsure whether you are an administrator, you can view your role in **Preferences** (see [Onboarding Checklists](/docs/get-started/onboarding-checklists/)).

## Create a service account

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Service Accounts**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Service Accounts**. You can also click the **Go To...** menu at the top of the screen and select **Service Accounts**.
1. At the top right of the table, click **+ Add Service Account**. 


## Edit, deactivate, or delete a service account