---
id: set-password-policy
---

# Set the Password Policy

Account admins with the Manage Password Policy capability can set the account's password policy on the **Administration** \> **Security** \> **Password Policy**.

For details on password policies and Multi-account Access, see [Multi-account Access](../users-and-roles/users/multi-account-access.md). 

## Changing the password policy

Admins with Manage Password Policy capability can make changes at any time for users in their organization. The updated settings are applied to each user's account the next time he or she changes their password.

To change the password policy:

1. Go to **Administration** \> **Security** \> **Password Policy**.
1. Change any of the following:

    ![Set_Passwod_Policy.png](/img/security/Set_Passwod_Policy.png) 
    
    * **Passwords expire in.** This setting allows an admin to set the number of days after a user’s password was last changed to when the user is forced to change their password. The minimum is **30 days**. 
    * **Password reuse after.** This setting is the number of times a password must be changed before a previously used password can be reused. From the menu, select the number of changes. For example, if you choose **5 Changes**, a password can be reused after five new passwords have been used in a user's account.
    * **Password must contain.** Below are the character classes defined that users must provide as a part of their password. When none of the options below are selected, users will not be required to use any specific characters within their passwords. 
      * Upper case letters (A-Z) 
      * Lower case letters (a-z) 
      * Numbers (0-9) 
      * Special characters (#, $, %, &, etc)
    * **Users locked out after.** With these options, you can determine when users are locked out of their Sumo Logic accounts using the three menus: number of failed attempts, amount of time during which the incorrect password is entered, and the amount of time a user will be locked out of his or her account after entering the set number of incorrect passwords. 

    For example, we choose **4 Failed Attempts** from the first menu, **Within 5 Minutes** from the second menu, and **For 60 Minutes** from the third menu. This means that if a user enters four incorrect passwords in the space of five minutes, that user will be unable to log back into his or her account for 60 minutes. 

1. Click **Save**.
