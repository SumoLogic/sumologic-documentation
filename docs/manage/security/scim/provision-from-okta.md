---
id: provision-from-okta 
title: Provision from Okta
sidebar_label: Provision from Okta
description: Learn how to provision users into Sumo Logic from Okta. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article describes how to provision users into Sumo Logic from Okta.

## Prerequisites

### Set up SAML

If it is not already set up, [set up SAML for single sign-on](/docs/manage/security/saml/set-up-saml) in the Sumo Logic instance where you will provision users. This will allow connection to Sumo Logic for provisioning. Copy the single sign-on URL (Assertion Consumer URL) and entity ID from your Sumo Logic [SAML configuration](/docs/manage/security/saml/set-up-saml/#review-saml-configuration). You will use them when you set up provisioning.

### Create an access key

Create an [access key](/docs/manage/security/access-keys/) using a service account. This access key will provide authorization for Okta to provision users into Sumo Logic.

When you create the access key, copy its access ID and access key values. You will enter these when you set up provisioning to use one of the following authorization methods:
* Basic authentication
   * Username: Access ID
   * Password: Access key
* Bearer token<br/>Use [Base64 encoding](https://www.base64encode.org/) to Base64 encode `<access ID>:<access key>`.

## Configure provisioning from Okta

### Step 1: Create the app

1. [Login to Okta](https://login.okta.com/) as an administrator.
1. Navigate to **Applications > Applications** and click **Create App Integration**.<br/><img src={useBaseUrl('img/security/provision-okta-create-app.png')} alt="Create app integration" style={{border: '1px solid gray'}} width="700" />
1. Select **SAML 2.0** and click **Next**.<br/><img src={useBaseUrl('img/security/provision-okta-select-saml-20.png')} alt="Select SAML 2.0" style={{border: '1px solid gray'}} width="550" />
1. Provide a name in the **App Name** field and click **Next**.<br/><img src={useBaseUrl('img/security/provision-okta-app-name.png')} alt="App Name field" style={{border: '1px solid gray'}} width="500" />
1. Enter the **Single sign-on URL** and **Audience URI (SP Entity ID)** for your Sumo Logic instance:<br/><img src={useBaseUrl('img/security/provision-okta-configure-saml.png')} alt="Configure SAML for the app" style={{border: '1px solid gray'}} width="600" /><br/>Obtain the single sign-on URL (Assertion Consumer URL) and entity ID from the SAML configuration of the Sumo Logic tenant where you will provision users (see [Prerequisites](#prerequisites)).<br/><img src={useBaseUrl('img/security/provision-sumo-logic-saml-settings.png')} alt="ACS and entity ID from Sumo Logic" style={{border: '1px solid gray'}} width="800" />
1. Click **Next** and click **Finish**. The app displays in Okta.

### Step 2: Configure provisioning

1. Configure the general settings for the app:
   1. Click the **General** tab.
   1. Click **Edit** in the upper-right corner of the **App Settings** dialog for the app. 
   1. For **Provisioning**, select **SCIM**.<br/><img src={useBaseUrl('img/security/provision-okta-scim-provisioning-setting.png')} alt="SCIM provisioning setting for the app" style={{border: '1px solid gray'}} width="800" />
   1. Click **Save**. A **Provisioning** tab appears for the app.
1. Configure provisioning integration settings:
   1. Click the **Provisioning** tab. 
   1. Click **Integration** in the left menu, and then click **Edit**.
   1. **SCIM connector base URL**. Enter the [API endpoint for your deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for the SCIM API using the format `<api-endpoint>/v1/scim/`. For example, `https://api.sumologic.com/api/v1/scim`.
   1. **Unique identifier field for users**. Enter `userName`.
   1. **Supported provisioning actions**. Select:
      * **Import New Users and Profile Updates**
      * **Push New Users**
      * **Push Profile Updates**
   1. **Authentication Mode**. Select one of these authentication methods and enter your Sumo Logic access key credentials (see [Prerequisites](#prerequisites)):
         * **Basic Auth**. Basic authentication method. If you choose this method, enter your access key credentials in the fields that appear:
            * **Username**. Enter your access ID.
            * **Password**. Enter your access key.
         * **HTTP Header**. HTTP authorization header method. If you choose this option, use [Base64 encoding](https://www.base64encode.org/) to encode `<access ID>:<access key>` and enter the resulting value into the **Authorization | Bearer Token** fields that appears.<br/><img src={useBaseUrl('img/security/provision-okta-provisioning-tab.png')} alt="Provisioning tab" style={{border: '1px solid gray'}} width="800" />
    1. Click **Test Connector Configuration**. The results display:<br/><img src={useBaseUrl('img/security/provision-okta-test-connection.png')} alt="Test connector configuration" style={{border: '1px solid gray'}} width="300" />
    1. Click **Close** on the **Test Connector Configuration** dialog.
    1. Click **Save** to save the app provisioning integration settings.
1. Configure provisioning **To App** settings:
   1. Click the **Provisioning** tab. 
   1. Click **To App** in the left menu, and then click **Edit**.
   1. Select **Enable** on:
      * **Create Users**
      * **Update User Attributes**
      * **Deactivate Users**
    1. Click **Save**.<br/><img src={useBaseUrl('img/security/provision-okta-provisioning-to-app.png')} alt="Provisioning to app" style={{border: '1px solid gray'}} width="700" />

### Step 3: Set up roles

1. Add the **Roles** attribute to the default Okta user profile:
   1. Navigate to **Directory > Profile Editor** and select **Okta User (default)**.<br/><img src={useBaseUrl('img/security/provision-okta-users.png')} alt="Okta Users tab" style={{border: '1px solid gray'}} width="700" />
   1. In the **Profile Editor**, click **Add Attribute**.<br/><img src={useBaseUrl('img/security/provision-okta-add-attribute.png')} alt="Add Attribute button" style={{border: '1px solid gray'}} width="700" />
   1. Fill out the **Add Attribute** dialog:
      1. **Data type**. Select **string**.
      1. **Display name**. Enter `Roles`.
      1. **Variable name**. Enter `roles`.
      1. For **Enum** select **Define enumerated list of values** and enter the following:
         | Display name | Value |
         | :-- | :-- |
         | `User` | `user` |
         | `Administrator` | `administrator` |
         | `Analyst` | `analyst` |
      1. **User permission**. Select **Read-Write**.
      1. Click **Save**.<br/><img src={useBaseUrl('img/security/provision-okta-add-roles-attribute.png')} alt="Add roles attribute to Okta user" style={{border: '1px solid gray'}} width="500" />
1. Add the **Roles** attribute to the provisioning app user profile:
   1. Navigate to **Directory > Profile Editor** and select the user for the app you created in [Step 1](#step-1-create-the-app).<br/><img src={useBaseUrl('img/security/provision-okta-scim-app-user.png')} alt="Add roles attribute to provisioning app user" style={{border: '1px solid gray'}} width="700" />
   1. In the **Profile Editor**, click **Add Attribute**.<br/><img src={useBaseUrl('img/security/provision-okta-add-attribute-to-provisioning-user.png')} alt="Add Attribute button" style={{border: '1px solid gray'}} width="700" />
1. Fill out the **Add Attribute** dialog:
      1. **Data type**. Select **string**.
      1. **Display name**. Enter `Roles`.
      1. **Variable name**. Enter `roles`.
      1. **External name**. Enter `roles.^[primary==true].value`.
      1. **External namespace**. Enter `urn:ietf:params:scim:schemas:core:2.0:User`.
      1. For **Enum** select **Define enumerated list of values** and enter the following:
         | Display name | Value |
         | :-- | :-- |
         | `User` | `user` |
         | `Administrator` | `administrator` |
         | `Analyst` | `analyst` |
      1. **Attribute type**. Select **Group**.
      1. Click **Save**.
   1. Click **Save**.<br/><img src={useBaseUrl('img/security/provision-okta-add-role-attribute-to-provisioning-user.png')} alt="Add roles attribute to provisioning app user" style={{border: '1px solid gray'}} width="500" />
