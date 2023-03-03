---
id: set-password-policy
title: Set the Password Policy
description: The Search Audit Index is populated with log messages and the message contains search usage and activities for your account.
---

Account admins with the Manage Password Policy capability can set the account's password policy on the **Administration** > **Security** > **Password Policy**.

For details on password policies and Multi-account Access, see [Multi-account Access](../users-roles/users/multi-account-access.md). 

## Changing the password policy

Admins with Manage Password Policy capability can make changes at any time for users in their organization. The updated settings are applied to each user's account the next time he or she changes their password.

To change the password policy:

1. Go to **Administration** > **Security** > **Password Policy**.
2. Change any of the following:

    ![Set_Passwod_Policy.png](/img/security/Set_Passwod_Policy.png)

    * **Passwords expire in.** This setting allows an admin to set the number of days after a user’s password was last changed to when the user is forced to change their password. The minimum is **30 days**.
    * **Password reuse after.** This setting is the number of times a password must be changed before a previously used password can be reused. From the menu, select the number of changes. For example, if you choose **5 Changes**, a password can be reused after five new passwords have been used in a user's account.
    * **Password must contain.** Below are the character classes defined that users must provide as a part of their password. When none of the options below are selected, users will not be required to use any specific characters within their passwords.
      * Upper case letters (A-Z)
      * Lower case letters (a-z)
      * Numbers (0-9)
      * Special characters (#, $, %, &, etc)
    * **Users locked out after.** With these options, you can determine when users are locked out of their Sumo Logic accounts using the three menus: number of failed attempts, amount of time during which the incorrect password is entered, and the amount of time a user will be locked out of their account after entering the set number of incorrect passwords. 
      * For example, we choose **7 Failed Attempts** from the first menu, **Within 10 Minutes** from the second menu, and **For 60 Minutes** from the third menu. This means that if a user enters four incorrect passwords in the space of five minutes, that user will be unable to log back into their account for 60 minutes. 
    * **2-Step Verification for My Org.** Select if 2-Step Verification (MFA) is optional or required. If set to **required** users will be required to configure MFA. If set to **optional** users can enable/disable MFA via their user preferences.
    * **Remember Browser.** Provides users an option to select to remember the MFA on the browser for 30 days. If set to **disabled**, users will be required to enter their MFA code upon every login.

3. Click **Save**.
