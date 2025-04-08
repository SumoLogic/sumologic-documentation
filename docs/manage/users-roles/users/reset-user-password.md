---
id: reset-user-password
title: Reset a User's Password
description: As an Admin, you can reset another user's password.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic describes how to reset another user's password. When you reset a user's password, Sumo Logic will send the user an email with a temporary password, which the user will be required to reset upon signing in.

The **Reset Password** option is only available if you are an admin, and is not available when SAML is [locked down](/docs/manage/security/saml/set-up-saml).

:::note
Looking for instructions on resetting your own password? See [Changing Your Password.](../../../get-started/account-settings-preferences.md)
:::

To reset a user's password follow these steps:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Users and Roles > Users**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Users**. You can also click the **Go To...** menu at the top of the screen and select **Users**. <br/><img src={useBaseUrl('img/users-roles/reset-password.png')} alt="Reset Password option selected on the kebab menu on the Users page" style={{border: '1px solid gray'}} width="700" />
1. Select the row for the user whose password you want to reset and choose **Reset Password** from the three-dot kebab options menu. 
1. A new random password is generated and sent to the user at the email address listed in the user's details. When the user logs in with the reset password, the user is prompted to enter a new password.
