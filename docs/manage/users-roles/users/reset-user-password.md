---
id: reset-user-password
title: Reset a User's Password
description: As an Admin, you can reset another user's password.
---


This topic describes how to reset another user's password. When you reset a user's password, Sumo Logic will send the user an email with a temporary password, which the user will be required to reset upon signing in.

The **Reset Password** option is only available if you are an admin, and is not available when SAML is [locked down](../../security/saml/set-up-saml.md).

:::note
Looking for instructions on resetting your own password? See [Changing Your Password.](../../../get-started/account-settings-preferences.md)
:::

To reset a user's password follow these steps:

1. Go to **Administration** > **Users and Roles** > **Users**.

    ![user-options-menu.png](/img/users-roles/reset-password.png)

1. Select the row for the user whose password you want to reset and choose **Reset Password** from the three-dot options menu. 
1. A new random password is generated and sent to the user at the email address listed in the user's details. When the user logs in with the reset password, the user is prompted to enter a new password.
