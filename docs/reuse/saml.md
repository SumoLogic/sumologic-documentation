You can create multiple SAML configurations in Sumo. To create an additional SAML configuration, click the plus (**+**) icon to create a new configuration. Enter the settings for the new configuration, as described the previous section.

![saml-config-list.png](/img/security/saml-config-list.png) 

### Require SAML for sign-in

After you create a SAML configuration, you can require users to sign in using SAML and prevent users from bypassing SAML with a username and password for login. Before you do so, follow the instructions in Check SAML Usage.

### Check SAML Usage

If you intend to require Sumo users to sign-in using SAML, as described in the following section, Require SAML for sign-in, it is a best practice to first check whether some users are still logging in directly, instead of using SAML. You can run the following query to see, for a particular time range, whether users signed in using SAML or with their username and password:

```sql
_index=sumologic_audit action=login | count by class, sourceuser
```

:::important
This query depends upon data in the Sumo audit index. If the audit index is not enabled, the query will not return results. To enable the index, follow the instructions in Enable and Manage the Audit Index.
:::

The query results show, for each user that has accessed Sumo over the time range, the number of times they have logged in using SAML or by entering a Sumo username and password. In the class column:

* "SAML" indicates the user signed in using SAML.  
* "SESSION" indicates the user authenticated by entering a username and password.  

If the same user accessed Sumo using both methods (SAML and direct logon) during the time range, the query results will include a row for each method, showing how many times each method was used.

![saml-use-query.png](/img/security/saml-use-query.png) 

### Require SAML for sign-in
Click Require SAML Sign In to require users to sign in using SAML.

:::tip
After you lock down SAML, any new users you allowlist will have to select Forgot Password from the login screen to recover their credentials. This is because a SAML-locked down user does NOT have a password.
:::

![require-saml](/img/security/require-saml.png)

Sumo automatically adds your account under **Allow these users to sign in using passwords in addition to SAML** as an allowlisted user as a preventative measure to ensure you’re still able to access Sumo if you run into issues.

Having only one user able to bypass SAML may not be convenient or practical if you have a global company or a large team. You can add additional allowlisted users by clicking the (+) icon next to **Allow these users to sign in using passwords in addition to SAML**:

![allow-users](/img/security/allow-users.png)

We do not recommend denying all users password access to Sumo even if you want to enforce log in by SAML. If you attempt to delete your last remaining allowlisted user, you will receive a warning that this is not a recommended practice:

![prevent-password-based-login](/img/security/prevent-password-based-login.png)

### SAML lockdown limitations
There are user account changes an admin cannot perform when the **Require SAML Sign In** option is selected:

* You cannot change a user's login email address when SAML is locked down.
* You cannot reset a user's password when SAML is locked down.
* If a user's account has been locked as a result of too many failed login attempts, you cannot unlock the account while SAML is locked down.

To make these changes, you must toggle off the **Require SAML Sign In** option, make the updates, and then turn **Require SAML Sign In** back on.
