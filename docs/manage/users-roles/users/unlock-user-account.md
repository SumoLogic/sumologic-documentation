---
id: unlock-user-account
title: Unlocking User Accounts
description: When a user is locked out of their account, an admin may manually unlock the account before the configured lockout period has expired.
---

If a user tries to log into their account several times and fails, their account will be locked out for security reasons. The default configured lockout period is 30 minutes, which occurs after six failed login attempts within a 10-minute period. After the designated lockout period expires, the user's account is automatically unlocked. These default settings may be configured by an administrator using the [Password Policy Settings](../../security/set-password-policy.md). 

When a user is locked out of their account, Sumo Logic sends an email to the user notifying them of the lockout. 

At this time, an administrator can:

* Allow the user to wait out the designated lockout period.
* **Optional:** Manually unlock the account before the configured lockout period has expired. 

**To unlock a user's account**

1. Go to **Administration > Users and Roles > Users**. 

    ![user-options-menu.png](/img/users-roles/user-options-menu.png)

1. Select the row for the user you want to unlock and choose **Unlock** from the three-dot options menu.

    :::noteIf you have configured SAML for single sign-on, and you have locked down SAML so that users must login using SAML, the **Unlock** option will not appear on the **More Actions** menu. To unlock the user account, you must first toggle the **Require SAML Sign In** option, and then re-enable lockdown. For more information, see [SAML Lockdown Limitations](../../security/saml/set-up-saml.md).
    :::
     
1. The user's account is unlocked, and Sumo Logic automatically sends an email to alert the user. 

:::note
During the lockout period, users can request a password reset from the login page, however this password will not allow access to the account until either the lockout period has expired or an administrator has unlocked the account.
:::
