---
id: integrate-sumo-logic-with-okta
title: Integrate Sumo Logic with Okta
description: You can integrate Sumo Logic's SAML 2.0 API with Okta to allow users to log into Sumo Logic using their Single Sign-On (SSO) credentials.
---

## Availability

| Account Type | Account Level |
|:--------------|:---------------------------------------------------------------------------------|
| Cloud Flex   | Trial, Enterprise                                                               |
| Credits      | Trial, Essentials, Enterprise Operations, Enterprise Security, Enterprise Suite |

Okta is a cloud-based identity management provider that can be
integrated with Sumo Logic’s SAML 2.0 API to allow users to log into
Sumo Logic using their Single Sign-On (SSO) credentials.

## Before you start

* Read the "Limitations section" on [Set Up SAML for Single Sign-On](set-up-saml.md).
* If you plan to manage Sumo role assignments on Okta, before you proceed, make sure that you have: 

  * Configured an Okta group for each Sumo role, with the same name as the Sumo role. For example, you should have an “Administrator” group in Okta, just as you have an “Administrator” role in Sumo.
  * Assigned your Sumo users to the appropriate Okta groups, based on the Sumo roles you want to assign to each user.  

## Install the Sumo Logic SAML App in Okta

1. Open the Okta Administration pages.
1. In the left-nav, select **Applications > Applications**.
1. Click the **Browse App Catalog** button.

    ![browse-app-catalog.png](/img/security/browse-app-catalog.png)
1. Enter "Sumo Logic" in the search bar, and select the **Sumo Logic** SAML, SWA integration.

    ![browse.png](/img/security/browse.png)
1. On the Sumo Logic app overview page, select **Add.**
1. On the **General Settings** tab: * **App label**. Enter a name for the Sumo Logic integration app.

   * **Application Visibility**. Use these options if you don’t want the Sumo Logic integration app to appear to users in the Okta portal or mobile app.
   * Click **Next**.    

    ![general-settings-2.png](/img/security/general-settings-2.png)
1. On the **Sign-on Options** tab, select **View Setup Instructions.

    ![sign-on-options.png](/img/security/sign-on-options.png)
1. Follow the instructions on the **View Setup Instructions** page to configure the Sumo Logic SAML integration. The information that appears is similar to the content of the [How to Configure SAML 2.0 for Sumo Logic](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Sumologic.html) in Okta help.  The page includes instructions on how to configure on-demand user account provisioning and SP-initiated login.

### Configure Okta to send role assignments to Sumo (Optional)

In this step, you configure Okta to send group membership information in the SAML assertions it sends, so that Sumo Logic can assign roles to a user at each logon. This allows you to manage Sumo role assignments via Okta. If you don’t want to manage Sumo roles via Okta, skip these steps and proceed to [Add Okta users to the Sumo Logic app in Okta](#add-okta-users-to-the-sumo-logic-app-in-okta) below.

These instructions assume that:

* You have configured a set of groups on Okta whose names match the names of the roles defined in Sumo.
* You have assigned each user in Okta to the Okta groups that maps to the roles you want the user to have.

There are two sides to the configuration. You'll configure a **Group Attribute Statement i**n Okta and a **Roles Attribute** in Sumo Logic, each with the same value. 

1. Select the **Sign-On** tab of your Sumo Logic application in Okta.
1. Click **Edit** in the Settings.
1. Click the arrow icon to the left of **Attributes (Optional)** to expand the attributes form.
1. In the **Group Attribute Statements** section, enter a name for the attribute that will contain your Okta groups. For example, "**roles**". Note the name you supply will be used when configuring the **Roles Attribute** in your Sumo Logic SAML configuration. Sumo Logic only accepts a single role attribute name when configuring the **Roles Attribute** in Sumo Logic.

    ![group-attributes-2.png](/img/security/group-attributes-2.png)

1. **Name Format**. Leave unspecified.
1. **Filter**. In the left-side field, choose one of the options from the pulldown, to select the type of match expression you are going to enter:

    1. **Starts with**. Useful if all the names of the Okta groups with Sumo users all begin with the same string.
    1. **Equals**. Useful if there is a single Okta group for Sumo users.
    1. **Contains**. Useful if all the names of the Okta groups with Sumo users all contain the same string.
    1. **Matches regex.** Use this option if you can’t specify your groups using any of the other filter types.  For example regex `Foo|A.*` will match the Okta group “Foo” and groups whose names begin with the letter “A”. If you are entering a regular expression, you must enter the case correctly. Regular expressions are case-sensitive.
1. Click **Save **at the bottom of the **Create SAML Integration** page.
1. Go to **Administration > Security > SAML** in Sumo Logic.
1. Click your Okta configuration in the **Configuration List** and then click the edit icon (![pencil](/img/security/pencil.png)) in the details pane.
1. Select the **Roles Attribute** checkbox and enter the name of the attribute name you created on the the **Group Attribute Statements** section above. 

    ![roles-attribute.png](/img/security/roles-attribute.png)
1. **Save** the configuration.

### Add Okta users to the Sumo Logic app in Okta 

1. In Okta, go to the **Assignments** tab for your Sumo Logic app.

    ![assignments-tab.png](/img/security/assignments-tab.png)
1. Click the **Assign** button and select either **assign to people** or **assign to groups**.
1. Select the **Assign** link next to the users or groups you want to have access to Sumo Logic. 
1. Once all users or groups have been assigned, click **Done**.

The Sumo Logic app you configured should now appear on the users' Okta dashboard. To check that the integration works, have the user click the app icon, and verify that they are logged onto Sumo Logic. 

### Lock down SAML

If you want to force users to access Sumo Logic using SAML, as opposed to also being able to log in with a username and password, follow the instructions in this section.

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

Having only one user able to bypass SAML may not be convenient or practical if you have a global company or a large team. You can add additional allowlisted users by clicking the (+) icon by **Allow these users to sign in using passwords in addition to SAML**:

![allow-users](/img/security/allow-users.png)

We do not recommend denying all users password access to Sumo even if you want to enforce log in by SAML. If you attempt to delete your last remaining allowlisted user, you will receive a warning that this is not a recommended practice:

![prevent-password-based-login](/img/security/prevent-password-based-login.png)

## SAML lockdown limitations
There are user account changes an admin cannot perform when the **Require SAML Sign In** option is selected:

* You cannot change a user's login email address when SAML is locked down.
* You cannot reset a user's password when SAML is locked down.
* If a user's account has been locked as a result of too many failed login attempts, you cannot unlock the account while SAML is locked down.

To make these changes, you must toggle off the **Require SAML Sign In** option, make the updates, and then turn **Require SAML Sign In** back on.
