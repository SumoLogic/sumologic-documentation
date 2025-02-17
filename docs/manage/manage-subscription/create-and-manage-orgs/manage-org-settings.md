---
id: manage-org-settings
title: Manage Organization Settings
sidebar_label: Manage Org Settings
description: An account owner can update org names, define customized subdomain names, delete orgs, and change the account owner.
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

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Account Overview**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Account** select **Account Overview**. You can also click the **Go To...** menu at the top of the screen and select **Account Overview**. 
1. Access the appropriate menu for your [account type](#availability):
     * Cloud Flex Credits: From the gear icon menu at the top, select **Change Organization Name**.
     * Cloud Flex: At the top, select **Manage Organization > Change Organization Name**.
1. At the prompt, enter a new organization name in the text field.
1. Click **Change Organization Name.** <br/><img src={useBaseUrl('img/manage/subscriptions/Change_Organization_Name_prompt.png')} alt="Change_Organization_Name_prompt.png" style={{border: '1px solid gray'}} width="300"/>

### Change account owner

:::important
After you make this change, you will not be able to edit the account owner.
:::

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Account Overview**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Account** select **Account Overview**. You can also click the **Go To...** menu at the top of the screen and select **Account Overview**.
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

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Account Overview**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Account** select **Account Overview**. You can also click the **Go To...** menu at the top of the screen and select **Account Overview**.
1. From the details icon at the top, click **Delete Org.**
1. In the prompt dialog, enter **DELETE** in the text field to confirm the action.
1. Click **Delete**. <br/><img src={useBaseUrl('img/manage/subscriptions/Delete_Organization_prompt.png')} alt="Delete_Organization_prompt.png" style={{border: '1px solid gray'}} width="300"/>

## Set up a custom subdomain

This section has instructions for setting up a custom subdomain for the URL you use to access Sumo Logic.

:::note
Custom subdomains are not currently available for Sumo Logic accounts created through third-party integrations that require authentication using those integrations, such as Heroku and Jfrog.
:::

By default, your Sumo Logic account has a "service" subdomain. For example, `service.sumologic.com`.

If you have multiple Sumo Logic accounts, you may find it useful to configure a custom subdomain for each of your Sumo Logic accounts.

Custom subdomains can help ensure that requests are authenticated to the right account when links are received. Once configured by your account owner, your custom subdomain will be used in the links Sumo generates when you share queries or dashboards, or the links in alerts and other emails you may receive from your account. These subdomain-enabled links will direct the user to the specified account for authentication.

When you use custom subdomains in combination with SAML integrations [configured with SP initiated login](/docs/manage/security/saml/set-up-saml), your SAML authentication options will be provided within your subdomain-enabled Sumo Logic login page.

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

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Account Overview**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Account** select **Account Overview**. You can also click the **Go To...** menu at the top of the screen and select **Account Overview**.
1. Select the details icon at the top.
1. Access the appropriate menu for your [account type](#availability):
     * Cloud Flex Credits: From the gear icon menu at the top, select **Change Account Subdomain**.
     * Cloud Flex: At the top, select **Manage Organization > Change Account Owner**.
1. Enter a new subdomain name. The name must be between 4 and 63 characters in length at least four characters in length, and can contain lower case letters, numbers, and dashes only. <br/><img src={useBaseUrl('img/manage/subscriptions/change-subdomain-name.png')} style={{border: '1px solid gray'}} alt="change-subdomain-name.png" width="700" />
1. Click **Change Subdomain** Name to update the name.
1. You will be automatically logged out and redirected to the new subdomain login page. 

## SSO for child organizations

When you create a new child organization, a subdomain is automatically created and single sign-on (SSO) is enabled, allowing you to sign in to the child organization without having to provide separate credentials.

### Enabling or disabling SSO

#### Enable SSO

If a subdomain exists, but SSO is disabled for the child organization, click **Enable SSO**:<br/><img src={useBaseUrl('img/manage/subscriptions/enable-sso-button.png')} alt="Enable SSO button" style={{border: '1px solid gray'}} width="250"/>

#### Disable SSO

When a child organization has SSO enabled, the child organization's details display the subdomain URL in the **Subdomain** field, and the **SSO** field says **Enabled**:<br/><img src={useBaseUrl('img/manage/subscriptions/subdomain-and-sso-enabled.png')} alt="SSO enabled for a child organization" style={{border: '1px solid gray'}} width="250"/>

If you want to require administrators to enter credentials to sign in to the child organization, click **Disable SSO** to turn off single sign-on.

#### Create a subdomain

If there is no subdomain defined for a child organization, hovering your mouse over the **Enable SSO** button displays the message **Set up custom subdomain before enabling SSO**:<br/><img src={useBaseUrl('img/manage/subscriptions/no-subdomain-defined.png')} alt="No subdomain defined" style={{border: '1px solid gray'}} width="300"/>

To set up a custom subdomain for the child organization, see [Set up a custom subdomain](#set-up-a-customsubdomain) above. Once you set up the subdomain, the subdomain's URL will appear and the **Enable SSO** button will be clickable.

### Sign in to a child organization automatically

When you open the details of a child organization, a link to the child organization appears under **Basic Details**. When you click the link, you are automatically signed in to the child organization. 

<img src={useBaseUrl('img/manage/subscriptions/mssp-sso-enabled.png')} alt="SSO enabled for a child organization" style={{border: '1px solid gray'}} width="300"/>

Automatic sign-in works because when you created the child organization, a [custom subdomain](#set-up-a-customsubdomain) was automatically added, and SSO was enabled by default. As a result, you are already provisioned as a user in the child organization and can access it at any time without needing to log in.

### Sign back in with parent org credentials

As an administrator, if you log out of a child organization that has SSO enabled, the following screen appears. Click the **Login with Parent Org** button to automatically log in using your credentials from the parent organization.

<img src={useBaseUrl('img/manage/subscriptions/mssp-login-with-parent-org.png')} alt="Login with Parent Org button" style={{border: '1px solid gray'}} width="300"/>