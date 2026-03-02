---
id: manage-org-settings
title: Manage Organization Settings
sidebar_label: Manage Org Settings
description: An account owner can update organization names, define customized subdomain names, delete orgs, and change the account owner.
keywords:
    - subdomain
    - orgs
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Availability

| Account Type | Account Level |
|:--------------------|:--------------------------------------------------------------|
| Cloud Flex | Professional, Enterprise |
| Cloud Flex Credits | Enterprise Operations, Enterprise Security, Enterprise Suite |

## Change organization settings on the account

This section has information about the options available to your Sumo Logic account owner on the **Account Overview** tab. The options are at the top of the page under the details icon.

For Cloud Flex Credits:

<img src={useBaseUrl('img/manage/subscriptions/manage-org-links-cfc.png')} alt="Gear icon menu" style={{border: '1px solid gray'}} width="600" />

For Cloud Flex:

<img src={useBaseUrl('img/manage/subscriptions/manage-org-links.png')} alt="Manage Organization links" style={{border: '1px solid gray'}} width="600" />

### Change organization name

1.  [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu select **Administration**, and then under **Account** select **Account Overview**. You can also click the **Go To...** menu at the top of the screen and select **Account Overview**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Account Overview**. 
1. Access the appropriate menu for your [account type](#availability):
     * Cloud Flex Credits: From the gear icon menu at the top, select **Change Organization Name**.
     * Cloud Flex: At the top, select **Manage Organization > Change Organization Name**.
1. At the prompt, enter a new organization name in the text field.
1. Click **Change Organization Name.** <br/><img src={useBaseUrl('img/manage/subscriptions/Change_Organization_Name_prompt.png')} alt="Change_Organization_Name_prompt.png" style={{border: '1px solid gray'}} width="300"/>

### Change account owner

:::important
After you make this change, you will not be able to edit the account owner.
:::

1.  [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu select **Administration**, and then under **Account** select **Account Overview**. You can also click the **Go To...** menu at the top of the screen and select **Account Overview**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Account Overview**. 
1. Access the appropriate menu for your [account type](#availability):
     * Cloud Flex Credits: From the gear icon menu at the top, select **Change Account Owner**.
     * Cloud Flex: At the top, select **Manage Organization > Change Account Owner**.
1. In the prompt dialog, enter a new account owner in the text field.
1. click **Change Account Owner**. <br/><img src={useBaseUrl('img/manage/subscriptions/Change_account_owner_prompt.png')} alt="Change_account_owner_prompt.png" style={{border: '1px solid gray'}} width="300"/>

:::note
If the account owner leaves your organization and you cannot transfer the account ownership, please [submit a support ticket](https://support.sumologic.com/support/s) to transfer the account ownership.
:::

### Delete an organization

:::note
You can only delete an organization for Free and Trial accounts.
:::

1. [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu select **Administration**, and then under **Account** select **Account Overview**. You can also click the **Go To...** menu at the top of the screen and select **Account Overview**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Account Overview**. 
1. From the details icon at the top, click **Delete Org.**
1. In the prompt dialog, enter **DELETE** in the text field to confirm the action.
1. Click **Delete**. <br/><img src={useBaseUrl('img/manage/subscriptions/Delete_Organization_prompt.png')} alt="Delete_Organization_prompt.png" style={{border: '1px solid gray'}} width="300"/>

## Set up a custom subdomain

This section has instructions for setting up a custom subdomain for the URL you use to access Sumo Logic.

By default, your Sumo Logic account has a "service" subdomain. For example, `service.sumologic.com`.

If you have multiple Sumo Logic accounts, you may find it useful to configure a custom subdomain for each of your Sumo Logic accounts.

Custom subdomains can help ensure that requests are authenticated to the right account when links are received. Once configured by your account owner, your custom subdomain will be used in the links Sumo generates when you share queries or dashboards, or the links in alerts and other emails you may receive from your account. These subdomain-enabled links will direct the user to the specified account for authentication.

When you use custom subdomains in combination with SAML integrations [configured with SP initiated login](/docs/manage/security/saml/set-up-saml), your SAML authentication options will be provided within your subdomain-enabled Sumo Logic login page.

:::note
* While subdomains are the preferred method to provide access to multiple accounts, you can also use [multi-account access](/docs/manage/users-roles/users/multi-account-access/).
* Custom subdomains are not currently available for Sumo Logic accounts created through third-party integrations that require authentication using those integrations, such as Heroku and Jfrog.
:::

import TerraformLink from '../../../reuse/terraform-link.md';

:::tip
You can use Terraform to manage subdomains with the [`sumologic_subdomain`](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/subdomain) resource. 

<TerraformLink/>
:::

### Key considerations

Before changing your account subdomain, consider the following:  

* You are responsible for the subdomain name, including ensuring that use of the  subdomain doesn’t violate the intellectual property rights of another party. Sumo Logic recommends that you use your corporate domain name, or a variation of it, as your Sumo Logic account subdomain.
* Sumo Logic reserves the right to deactivate, change, or require you to change your account subdomain. 
* Shared URLs that contain a custom subdomain may no longer work after you change the subdomain. You’ll need to either manually edit the subdomain portion of out-of-date URLs or re-share the content after changing a subdomain name.  
* When you set up a subdomain for the first time, the pre-existing URLS for accessing Sumo Logic will continue to work; however, users will be asked to authenticate via the default service domain. We suggest updating any saved/stored links with the new subdomain to prevent this issue. 
* Once you update your subdomain to a new value, the previous subdomain will become immediately free for use by another account.
* After you update your subdomain, Sumo Logic users must re-authenticate using the new subdomain. Sumo Logic suggests you notify your users prior to changing your account subdomain. 
* Subdomain must be unique across ALL accounts and deployments. You cannot use a subdomain name that is already in use, even if the accounts reside in different deployment regions. If you try to change an account subdomain to a value that is already in use, you’ll be prompted to supply a different name.

### Change account subdomain 

:::note
You must be the account owner of the Sumo Logic account to change the account subdomain.
:::

1. [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu select **Administration**, and then under **Account** select **Account Overview**. You can also click the **Go To...** menu at the top of the screen and select **Account Overview**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Account Overview**. 
1. Select the details icon at the top.
1. Access the appropriate menu for your [account type](#availability):
     * Cloud Flex Credits: From the gear icon menu at the top, select **Change Account Subdomain**.
     * Cloud Flex: At the top, select **Manage Organization > Change Account Owner**.
1. Enter a new subdomain name. The name must be between 4 and 63 characters in length at least four characters in length, and can contain lower case letters, numbers, and dashes only. <br/><img src={useBaseUrl('img/manage/subscriptions/change-subdomain-name.png')} style={{border: '1px solid gray'}} alt="change-subdomain-name.png" width="700" />
1. Click **Change Subdomain** Name to update the name.
1. You will be automatically logged out and redirected to the new subdomain login page. 

## Manage and view access to child org

This section has instructions for managing and viewing the access for the selected child org.

By default, if you are a user with **Manage Organizations** capability you will be able to see all the child orgs in your parent org and you can configure the users with roles to SSO into child organizations. This helps you to define access on a per-child-org basis and precisely control over the sign in process.

But if you are user with only **View Organizations** capability you can see the child orgs with the default access and the child orgs that are assigned to you.

### Manage access to child org

Follow the steps below to manage access to the child org:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations > Manage Account**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu select **Administration**, and then under **Organizations** select **Manage Account**. You can also click the **Go To...** menu at the top of the screen and select **Manage Account**. 
1. Click the child org for which you want to restrict the access.
1. In the right hand pane, click on **More Actions** dropdown and select **Manage Access**.<br/><img src={useBaseUrl('img/manage/subscriptions/child-org-manage-access-button.png')} alt="Child Org Manage Access Button" style={{border: '1px solid gray'}} width="400"/>
1. When prompted, select the users and assign their respective roles for the selected child organization. This allows parent-organization administrators to manage default role assignments for users who access child organizations through SSO. Administrators can either assign a single role to all users or assign roles individually:
     - When access control is set to **All Users with View Organization Capability**, administrators can assign a custom role that applies to all users accessing the child organization.
     - When access control is set to **Only Selected Users**, administrators can assign specific roles to individual users for each child organization. <br/><img src={useBaseUrl('img/manage/subscriptions/select-users-prompt.png')} alt="Select Users Prompt" style={{border: '1px solid gray'}} width="400"/>

### View access to child org

Follow the below steps to view the child orgs access details:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations > Manage Account**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu select **Administration**, and then under **Organizations** select **Manage Account**. You can also click the **Go To...** menu at the top of the screen and select **Manage Account**. 
1. Click the child org for which you want to view the access details.
1. Scroll down in the right pane to the **Access Control** section. You can see one among the following:
     - **All users in the organization have Administrator access**. This will be displayed if the selected child org is configured with custom role for all users.
     - **[X] users has specified role**. This will be displayed if the selected child org is configured only for selected number of users. **X** indicates the total number of users who have access to the selected child org with specified role. Click on this number to get a full list of users with access.<br/><img src={useBaseUrl('img/manage/subscriptions/child-org-access-control.png')} alt="Child Org Access Control" style={{border: '1px solid gray'}} width="400"/>

## SSO for child organizations

When you create a new child organization, a subdomain is automatically created and single sign-on (SSO) is enabled, allowing you to sign in to the child organization without having to provide separate credentials. To use this feature you do not have to set up SAML for single sign-on for the child organization. 

If you choose not to use this SSO feature, click [Disable SSO](#disable-sso) on the child organizations. Then users log in with username and password, or you can manually [set up SAML for single sign-on](/docs/manage/security/saml/set-up-saml/) on the child organizations.

### Role assignment

By default, the `Administrator` role is used for on-demand user provisioning in child organizations. So when a user from a parent organization signs in to a child organization using the SSO option, they are provisioned with `Administrator` access. If you want to use another role such as `Analyst` instead of `Administrator` for users logging in to child organizations, you can edit the SAML configuration on child organizations and specify the `Analyst` role in on-demand roles provisioning. See [Configure on-demand roles provisioning](/docs/manage/security/saml/set-up-saml/#configure-on-demand-roles-provisioning).

If you have configured roles within your child organizations that match the roles within your parent, you can configure the SAML configuration to enable [on-demand role provisioning](/docs/manage/security/saml/set-up-saml/#configure-on-demand-roles-provisioning).

### Sign in to a child organization automatically

When you open the details of a child organization, a link to the child organization appears under **Basic Details**. When you click the link, you are automatically signed in to the child organization.

<img src={useBaseUrl('img/manage/subscriptions/mssp-sso-enabled.png')} alt="SSO enabled for a child organization" style={{border: '1px solid gray'}} width="400"/>

Automatic sign-in works because when the child organization was created, a [subdomain](#set-up-a-customsubdomain) was automatically added, and SSO was enabled by default. As a result, when you click the link to the child organization, you are provisioned as a user in the child organization and can access it at any time without needing to log in.

:::tip
If you want to change the automatically-generated subdomain name to a preferred domain name, you can sign in to the child organization as an administrator and [change the subdomain](/docs/manage/manage-subscription/create-and-manage-orgs/manage-org-settings/#change-account-subdomain).
:::

### Sign back in with parent organization credentials

As an administrator, if you log out of a child organization with SSO enabled, the following screen appears. Click **Login with Parent Org** to sign back in automatically using your parent organization credentials.

<img src={useBaseUrl('img/manage/subscriptions/mssp-login-with-parent-org.png')} alt="Login with Parent Org button" style={{border: '1px solid gray'}} width="300"/>

### Enabling or disabling SSO

Although anyone with the View Organizations role capability can access child organizations, only users with the [Manage Organizations role capability](/docs/manage/users-roles/roles/role-capabilities/#organizations) can enable or disable the SSO option.

#### Enable SSO

If a [subdomain](#set-up-a-customsubdomain) exists, but SSO is disabled for the child organization, click **Enable SSO**:<br/><img src={useBaseUrl('img/manage/subscriptions/enable-sso-button.png')} alt="Enable SSO button" style={{border: '1px solid gray'}} width="250"/>

If there is no subdomain defined for a child organization, hovering your mouse over the **Enable SSO** button displays the message **Set up custom subdomain before enabling SSO**:<br/><img src={useBaseUrl('img/manage/subscriptions/no-subdomain-defined.png')} alt="No subdomain defined" style={{border: '1px solid gray'}} width="300"/>

To set up a custom subdomain for the child organization, see [Set up a custom subdomain](#set-up-a-customsubdomain) above. Once you set up the subdomain, the subdomain's URL will appear and the **Enable SSO** button will be clickable.

#### Disable SSO

When a child organization has SSO enabled, the child organization's details display the subdomain URL in the **Subdomain** field, and the **SSO** field says **Enabled**:<br/><img src={useBaseUrl('img/manage/subscriptions/subdomain-and-sso-enabled.png')} alt="SSO enabled for a child organization" style={{border: '1px solid gray'}} width="250"/>

If you want to require administrators to enter credentials to sign in to the child organization, click **Disable SSO** to turn off single sign-on.
