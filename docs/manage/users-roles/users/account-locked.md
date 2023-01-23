---
id: account-locked
title: What to Do if Your Account is Locked
description: Administrators can unlock a user's account, though they are not required to do so. Your account will be unlocked once the lockout period has passed.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/security/unlock.png')} alt="icon" width="70"/>

If you see the following message when you try to log into Sumo Logic, your account is locked: 

**"Unable to sign in. Your account has been locked out. Please contact your system administrator for details."**

If you try to log into your account several times and fail, you will be locked out of your account for security reasons. The default configured lockout period is 30 minutes, which occurs after six failed login attempts within a 10 minute period, though your account lockout settings may be configured differently. 

Administrators can [unlock a user's account](/docs/manage/users-roles/roles/role-capabilities), though they are not required to do so. Your account will be unlocked once the lockout period has passed.

You can always contact your administrator to determine the lockout period configured for your account if it has been customized. Lockout settings are configured by your Sumo Logic administrator via the **Administration > Security** > **Password Policy**.

After the lockout time period has elapsed, request a password reset from the Sumo Logic login page, and a new temporary password will be emailed to you. You can then use this new password to log into your account.
