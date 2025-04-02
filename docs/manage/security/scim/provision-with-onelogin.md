---
id: provision-with-onelogin 
title: Provision with OneLogin
sidebar_label: Provision with OneLogin
description: Learn how to provision users in Sumo Logic with OneLogin. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article describes how to provision users in Sumo Logic with OneLogin.

## Prerequisites

### Create an access key

Create an [access key](/docs/manage/security/access-keys/). (We recommend using a service account to create the access key.) This access key will provide authorization to provision users from OneLogin into Sumo Logic.

When you create the access key, copy its access ID and access key values. You will enter these when you use [Base64 encoding](https://www.base64encode.org/) to Base64 encode `<access ID>:<access key>` to generate a token.

## Configure provisioning with OneLogin

### Step 1: Create the app

1. Log in to your [OneLogin](https://www.onelogin.com/) account as an administrator.
1. Select **Applications > Applications**.
1. Click **Add App**.<br/><img src={useBaseUrl('img/security/provision-onelogin-add-app.png')} alt="Add app button" style={{border: '1px solid gray'}} width="700" />
1. Select **SCIM Provisioner with SAML (SCIM v2 Enterprise)**.
1. Change the **Display Name** to the name you want to use for your app.
1. Click **Save**.<br/><img src={useBaseUrl('img/security/provision-onelogin-rename-app.png')} alt="Display name of the app" style={{border: '1px solid gray'}} width="700" />

### Step 2: Set up single sign-on

Follow the directions in [Configure a SAML app in OneLogin](/docs/manage/security/saml/integrate-onelogin/#configure-a-saml-app-in-onelogin) beginning with the step where you configure the **SSO** tab.

<img src={useBaseUrl('img/security/provision-onelogin-sso-tab.png')} alt="SSO tab" style={{border: '1px solid gray'}} width="700" />

When you follow these instructions, on the **Configuration** tab you'll add the **SAML Audience URL** and **SAML Consumer URL**. Obtain these values from the assertion consumer URL and entity ID on the [SAML configuration](/docs/manage/security/saml/integrate-onelogin/#configure-saml-in-sumo) of the Sumo Logic tenant where you will provision users. <br/><img src={useBaseUrl('img/security/provision-onelogin-sumologic-saml-settings.png')} alt="ACS and entity ID from Sumo Logic" style={{border: '1px solid gray'}} width="800" />

:::note
Also on the **Configuration** tab, for **SCIM Base URL** enter the [API endpoint for your deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for the [SCIM User Management APIs](/docs/api/scim-user/) using the format `<api-endpoint>/v1/scim/`. For example, `https://api.sumologic.com/api/v1/scim/`. You will perform additional configuration of the app later.
:::

### Step 3: Set up roles

1. Add a custom role field:
   1. From the main menu, select **Users > Custom User Fields**.
   1. Click **New User Field**.
   1. For **Name** enter `roles`.
   1. For **Short name** enter `roles`.
   1. Click **Save**.<br/><img src={useBaseUrl('img/security/provision-onelogin-role-field.png')} alt="New role field" style={{border: '1px solid gray'}} width="400" />
1. Navigate to **Applications > Applications**.
1. Select the application you created in Step 1.<br/><img src={useBaseUrl('img/security/provision-onelogin-app.png')} alt="New app" style={{border: '1px solid gray'}} width="700" />
1. Select **Parameters**.<br/><img src={useBaseUrl('img/security/provision-onelogin-parameters.png')} alt="Parameters" style={{border: '1px solid gray'}} width="700" />
1. Add the `role` parameter:
   1. Click **+**.
   1. In **Name** enter `roles`.
   1. Select **Include in SAML Assertion**.
   1. Click **Save**.
   1. In **Value** select **roles (Custom)**.
   1. Click **Save**.<br/><img src={useBaseUrl('img/security/provision-onelogin-role-parameter.png')} alt="Role parameter field" style={{border: '1px solid gray'}} width="400" />
1. Add the rest of the parameters as shown. When you add the custom parameters, select **Include in SAML assertion**.<br/><img src={useBaseUrl('img/security/provision-onelogin-all-parameters.png')} alt="All parameters" style={{border: '1px solid gray'}} width="700" />

### Step 4: Set up provisioning

1. In the app, select **Configuration**.
1. Configure the app:
   1. Enter the **SAML Audience URL** (entity ID) and **SAML Consumer URL** (assertion consumer URL) for your Sumo Logic instance:<br/><img src={useBaseUrl('img/security/provision-onelogin-configuration.png')} alt="Configuration for the app" style={{border: '1px solid gray'}} width="700" /><br/>Obtain the assertion consumer URL and entity ID from the SAML configuration of the Sumo Logic tenant where you will provision users. You set up this [SAML configuration](/docs/manage/security/saml/integrate-onelogin/#configure-saml-in-sumo) in Step 2.<br/><img src={useBaseUrl('img/security/provision-onelogin-sumologic-saml-settings.png')} alt="ACS and entity ID from Sumo Logic" style={{border: '1px solid gray'}} width="800" />
   1. For **API Status**, click **Enable**.
   1. For **SCIM Base URL**, ensure that you have entered the [API endpoint for your deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for the [SCIM User Management APIs](/docs/api/scim-user/) using the format `<api-endpoint>/v1/scim/`. For example, `https://api.sumologic.com/api/v1/scim/`.
   1. For **SCIM JSON Template**, enter the following:
      ```json
      {
        "schemas": [
          "urn:ietf:params:scim:schemas:core:2.0:User"
        ],
        "userName": "{$parameters.scimusername}",
        "name": {
          "familyName": "{$user.lastname}",
          "givenName": "{$user.firstname}"
        },
        "emails": [{
          "value": "{$user.email}",
          "type": "work",
          "primary": true
        }],
       "roles": [{
            "value": "{$user.custom_fields.roles}",
            "primary": true
          }]
      }
      ```
   1. For **Custom Headers**, enter:
      ```
      Accept: application/scim+json
      Content-Type: application/scim+json
      ```
   1. For **SCIM Bearer Token**, use [Base64 encoding](https://www.base64encode.org/) to encode `<access ID>:<access key>` (see [Prerequisites](#prerequisites)). Enter the resulting value into the **SCIM Bearer Token** field.
   1. Click **Save**. 
1. Enable provisioning:
   1. In the app, select **Provisioning**.
   1. Select **Enable Provisioning**.
   1. Click **Save**.<br/><img src={useBaseUrl('img/security/provision-onelogin-enable-provisioning.png')} alt="Enable provisioning" style={{border: '1px solid gray'}} width="800" />

### Step 5: Assign users to the app

1. Create a new user:
   1. From the main menu, select **Users > Users**.
   1. Click **New User**.
   1. Enter **First Name**, **Last Name**, and **Email**.
   1. Under **Custom Fields**, for **roles** enter `Administrator`.
   1. Click **Save User**.<br/><img src={useBaseUrl('img/security/provision-onelogin-new-user.png')} alt="New user" style={{border: '1px solid gray'}} width="800" />
1. Assign the app to the user:
   1. While viewing the user, click **Applications**. 
   1. Click **+**.
   1. Select the app you created in Step 1.
   1. Click **Continue**.
   1. Click **Save**.<br/><img src={useBaseUrl('img/security/provision-one-login-add-user-to-app.png')} alt="Add app to user" style={{border: '1px solid gray'}} width="800" />
1. Approve the user for provisioning:
   1. From the main menu, select **Applications > Applications**.
   1. Select the application you created in Step 1.
   1. Select **Users**.
   1. Click **Pending** on the user you want to approve for provisioning.<br/><img src={useBaseUrl('img/security/provision-onelogin-approve-user.png')} alt="Pending user" style={{border: '1px solid gray'}} width="800" />
   1. Click **Approve**.<br/><img src={useBaseUrl('img/security/provision-onelogin-approve-dialog.png')} alt="Approve dialog" style={{border: '1px solid gray'}} width="400" />
   1. The user is provisioned to Sumo Logic.

### Step 6: Verify provisioning

Users assigned to the app are provisioned into Sumo Logic. 

1. Verify in OneLogin:
   1. In the main menu, select **Provisioning** and then select the **Monitoring** tab.
   1. The events for provisioned users should appear. Click an event for details.
1. Verify in Sumo Logic:
   1. Log in to the Sumo Logic instance that you linked to the provisioning app in Step 2 when you provided the Assertion Consumer URL and entity ID.
   1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Users and Roles > Users**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Users**. You can also click the **Go To...** menu at the top of the screen and select **Users**. 
   1. Search for the users provisioned from OneLogin. 
   1. You should see the users listed, and with the role given to when you assigned them to the app in OneLogin.

## Syncing between OneLogin and Sumo Logic

When you modify the name, email, or role of a user assigned the app in OneLogin, the changes will be synced to the corresponding user in Sumo Logic.

If you unassign a user from the app in OneLogin, the corresponding user is deactivated in Sumo Logic. (If you later try to reassign that same user to the app, it will result in an error in Sumo Logic. You must delete the old user from Sumo Logic first so that the user can be provisioned once again from OneLogin.)