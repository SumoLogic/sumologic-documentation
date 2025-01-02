---
id: 2-step-verification-admins
title: 2-Step Verification for Administrators
description: Set up and manage 2-Step Verification across your organization.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

These sections describe how to administer 2-Step Verification across your organization. 

## Configure the global 2-Step Verification policy

Configuring 2-Step Verification policy requires the role capability to [set up a password policy](set-password-policy.md).  See [About 2-Step Verification](about-2-step-verification.md) for an explanation of the **Required** and **Optional** options.

To configure the 2-Step Verification policy for your organization:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Password Policy**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Password Policy**. You can also click the **Go To...** menu at the top of the screen and select **Password Policy**. 
1. By default, 2-Step Verification is optional. Select **Required** if you want all users in the organization to authenticate using 2-Step Verification. <br/><img src={useBaseUrl('img/security/password-policy1.png')} alt="Password Policy tab" style={{border: '1px solid gray'}} width="600" />
1. Click **Save**.

## Manage 2-Step Verification for your organization

An administrator with the [role capability](../users-roles/roles/role-capabilities.md) to manage users and roles can perform the following 2-Step Verification management functions for an organization.

* **View 2-Step Verification status**. The **2SV** column on the **Users** page shows a green check mark if 2-Step Verification is enabled for a user. <br/><img src={useBaseUrl('img/security/2sv.png')} alt="Green check mark on the Users tab" style={{border: '1px solid gray'}} width="700" />
* **View the audit Log**. Audit log entries are created for configuration changes by administrators, when 2-Step Verification for a user is enabled or disabled, and when there is a failure to validate a 2-Step Verification code upon sign-in.
* **Disable 2-Step Verification for a user**. An administrator can disable 2-Step Verification for a user in case they’ve lost access to their 2-Step Verification token. This action resets the user account to pre-2-Step Verification state. If the 2-Step Verification policy is required, the user will be forced to configure 2-Step  perification when next signing in. 
   1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Users and Roles > Users**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Users**. You can also click the **Go To...** menu at the top of the screen and select **Users**. 
   1. Click the **More Actions** icon for the user and select **Disable 2-Step Verification**. <br/><img src={useBaseUrl('img/security/user-more-actions.png')} alt="Dropdown menu showing 'Disable 2-Step Verification'" style={{border: '1px solid gray'}} width="200" />
* **Remember browser**. The **Remember Browser** setting is on the **Password** **Policy** tab of the **Security** page and has these options:
   * **Disabled**. Users must enter their 2-Step Verification token each time they sign in to Sumo Logic.
   * **30 days**. On sign-in, users are presented with the **Remember this browser for 30 days** check box. If this option is selected, the browser stores a cookie with a secret code that functions as the second authentication factor for the next 30 days. During that period, the user isn't asked for the 2-Step Verification code on that browser. <br/><img src={useBaseUrl('img/security/mfa-remember-browser.png')} alt="Dropdown menu showing 'Remember Browser setting'" style={{border: '1px solid gray'}} width="200" />
