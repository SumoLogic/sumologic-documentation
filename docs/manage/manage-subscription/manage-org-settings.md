---
id: manage-org-settings
title: Manage Organizational Settings
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

This page has information about the options available to your Sumo Logic account owner on the **Account Overview** tab of the **Administration** > **Accounts** page. The options are at the top of the page under the details icon.

For Cloud Flex Credits:

![manage-org-links-cfc.png](/img/subscriptions/manage-org-links-cfc.png)

For Cloud Flex:

![manage-org-links.png](/img/subscriptions/manage-org-links.png)

## Change organization name

1. In the left navigation bar of the UI, select **Administration** > **Account**.
1. Select the details icon at the top and select **Manage Organization** > **Change Organization Name.**
1. At the prompt, enter a new organization name in the text field.
1. Click **Change Organization Name.** <br/><img src={useBaseUrl('img/subscriptions/Change_Organization_Name_prompt.png')} alt="Change_Organization_Name_prompt.png" width="450"/>

## Change account owner

:::important
After you make this change, you will not be able to edit the account owner.
:::

1. In the left navigation bar of the UI, select **Administration** > **Account**.
1. Select the details icon at the top and **Manage Organization** > **Change Account Owner.**
1. In the prompt dialog, enter a new account owner in the text field.
1. click **Change Account Owner**. <br/><img src={useBaseUrl('img/subscriptions/Change_account_owner_prompt.png')} alt="Change_account_owner_prompt.png" width="450"/>


## Delete an organization

:::note
You can only delete an organization for Free and Trial accounts.
:::

1. In the left navigation bar of the UI, select **Administration** > **Account**.
1. From the details icon at the top, click **Delete Org.**
1. In the prompt dialog, enter **DELETE** in the text field to confirm the action.
1. Click **Delete**. <br/><img src={useBaseUrl('img/subscriptions/Delete_Organization_prompt.png')} alt="Delete_Organization_prompt.png" width="450"/>


## Set up a custom subdomain

This section has instructions for setting up a custom subdomain for the URL you use to access Sumo Logic.

:::note
Custom subdomains are not currently available for Sumo Logic accounts created through third-party integrations that require authentication using those integrations, such as Heroku and Jfrog.
:::

By default, your Sumo Logic account has a "service" subdomain. For example, 

```
service.sumologic.com
```  

If you have multiple Sumo Logic accounts, you may find it useful to configure a custom subdomain for each of your Sumo Logic accounts.

Custom subdomains can help ensure that requests are authenticated to the right account when links are received. Once configured by your account owner, your custom subdomain will be used in the links Sumo generates when you share queries or dashboards, or the links in alerts and other emails you may receive from your account. These subdomain-enabled links will direct the user to the specified account for authentication.

When you use custom subdomains in combination with SAML integrations [configured with SP initiated login](../security/saml/set-up-saml.md), your SAML authentication options will be provided within your subdomain-enabled Sumo Logic login page.

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

1. Go to **Administration** > **Account** and select the details icon at the top.
1. Click the **Change Account Subdomain**.
1. Enter a new subdomain name. The name must be between 4 and 63 characters in length at least four characters in length, and can contain lower case letters, numbers, and dashes only. <br/><img src={useBaseUrl('img/subscriptions/change-subdomain-name.png')} alt="change-subdomain-name.png"/>
1. Click **Change Subdomain** Name to update the name.
1. You will be automatically logged out and redirected to the new subdomain login page. 
