---
id: provision-from-microsoft-entra-id 
title: Provision from Microsoft Entra ID
sidebar_label: Provision from Microsoft Entra ID
description: Learn how to provision users into Sumo Logic from Microsoft Entra ID (formerly Azure Active Directory). 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article describes how to provision users into Sumo Logic with Microsoft Entra ID (formerly Azure Active Directory).

## Prerequisites

### Create an access key

Create an [access key](/docs/manage/security/access-keys/) using a service account. This access key will provide authorization to provision users from Okta into Sumo Logic.

When you create the access key, copy its access ID and access key values. You will enter these when you use [Base64 encoding](https://www.base64encode.org/) to Base64 encode `<access ID>:<access key>` to generate a token.

## Configure provisioning with Microsoft Entra ID

### Step 1: Create the app

1. Log in to [Microsoft Azure](http://portal.azure.com/) as an administrator.
1. Navigate to Microsoft Entra ID. (You can use the search bar to locate it.)
1. Navigate to **Manage > Enterprise Applications**.
1. Click **New application**.<br/><img src={useBaseUrl('img/security/provision-azure-new-app.png')} alt="Create new application" style={{border: '1px solid gray'}} width="800" />
1. Click **Create your own application**.<br/><img src={useBaseUrl('img/security/provision-azure-create-your-own-app.png')} alt="Create your own application" style={{border: '1px solid gray'}} width="400" />
1. Enter a name for the app, select **Integrate any other application you don't find in the gallery (Non-gallery)**. <br/><img src={useBaseUrl('img/security/provision-azure-name-app.png')} alt="Name your application" style={{border: '1px solid gray'}} width="400" />
1. Click **Create**. The app displays in Entra ID.<br/><img src={useBaseUrl('img/security/provision-azure-app.png')} alt="App in Entra ID" style={{border: '1px solid gray'}} width="600" />

### Step 2: Set up single sign-on

Follow the directions in [Configure Sumo as an Enterprise App in Azure AD](/docs/manage/security/saml/integrate-sumo-with-azure-ad/#configure-saml-in-sumo-logic) beginning with the step where you select **Set up single sign-on**. 

<img src={useBaseUrl('img/security/provision-azure-set-up-sso.png')} alt="Set up single sign on" style={{border: '1px solid gray'}} width="600" />

When you [configure SAML in Sumo Logic](/docs/manage/security/saml/integrate-sumo-with-azure-ad/#configure-saml-in-sumo-logic):
* Select **Disable Requested Authentication Context**
* Do not select the **On Demand Provisioning** checkbox. You will set up provisioning later. 

### Step 3: Assign users to the app

1. In the app, select **Manage > Users and groups**. 
1. Select **Add user/group**.<br/><img src={useBaseUrl('img/security/provision-azure-add-users.png')} alt="Add users" style={{border: '1px solid gray'}} width="600" />
1. Select **Users**.
1. From the list of available users, select users to add to the app.
1. Click **Select**.
1. Click **Assign**.

### Step 4: Set up provisioning

1. In the app select **Manage > Provisioning**.<br/><img src={useBaseUrl('img/security/provision-azure-provisioning.png')} alt="Connect your application" style={{border: '1px solid gray'}} width="600" />
1. For **Provisioning Mode** select **Automatic**.
1. Enter **Admin Credentials**:
   1. In **Tenant URL**, enter the [API endpoint for your deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for the SCIM API using the format `<api-endpoint>/v1/scim/`. For example, `https://api.sumologic.com/api/v1/scim`.
   1. For **Secret Token**, use [Base64 encoding](https://www.base64encode.org/) to encode `<access ID>:<access key>` (see [Prerequisites](#prerequisites)). Enter the resulting value into the **Secret Token** field.
   1. Click **Test Connection**. If successful, a message like this appears: **Testing connection to `<app name>`. The supplied credentials are authorized to enable provisioning**.
1. Set up mappings:
   1. Select **Mappings** and **Provision Microsoft Entra Users**.<br/><img src={useBaseUrl('img/security/provision-azure-mappings.png')} alt="Provision mappings" style={{border: '1px solid gray'}} width="600" />
   1. At the bottom of the **Attribute Mapping** dialog, select **Add New Mapping**.
   1. Fill out the **Edit Attribute** dialog:
      1. For **Mapping type** select **Expression**.
      1. For **Expression** enter `AppRoleAssignments([appRoleAssignments])`.
      1. For **Target attribute** select `roles[primary eq "True"].value`.
      1. Click **OK**.<br/><img src={useBaseUrl('img/security/provision-azure-role-attribute.png')} alt="Edit attribute" style={{border: '1px solid gray'}} width="600" />
   1. On the **Attribute Mapping** dialog, delete all the attributes except:
      * userName
      * active
      * emails[type eq "work"].value
      * name.givenName
      * name.familyName
      * roles[primary eq "True"].value
   1. Click **Save**.<br/><img src={useBaseUrl('img/security/provision-azure-attribute-mappings.png')} alt="Attribute mappings" style={{border: '1px solid gray'}} width="600" />
1. Click the **Home > `<app name>` | Provisioning** link in the top left corner of the screen. This returns you to the **Provisioning** tab.

### Step 5: Test provisioning

1. In the app, select **Manage > Provisioning**.
1. For **Provisioning Status** select **On** to enable provisioning.
1. Click **Save**.<br/><img src={useBaseUrl('img/security/provision-azure-provisioning-status.png')} alt="Provisioning status" style={{border: '1px solid gray'}} width="600" />
1. Select **Overview**.
1. Select **Provision on demand**.<br/><img src={useBaseUrl('img/security/provision-azure-provision-on-demand.png')} alt="Provision on demand" style={{border: '1px solid gray'}} width="600" />
1. Users assigned the app will be provisioned into Sumo Logic. 

As long as the app's provisioning status is on, the app runs auto provisioning every 40 minutes.

:::note
By default, users will be assigned the `User` role in Sumo Logic. (The `User` role must already be set up in Sumo Logic to allow users to be provisioned with that role.)
:::

## Syncing between Microsoft Entra ID and Sumo Logic

When you modify the name or email of a user assigned the app in Microsoft Entra ID, the changes will be synced to the corresponding user in Sumo Logic.

If you unassign a user from the app in Microsoft Entra ID, the corresponding user is deactivated in Sumo Logic. (If you later try to reassign that same user to the app, it will result in an error in Sumo Logic. You must delete the old user from Sumo Logic first so that the user can be provisioned once again from Microsoft Entra ID.)