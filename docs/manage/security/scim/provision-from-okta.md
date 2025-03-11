---
id: provision-from-okta 
title: Provision from Okta
sidebar_label: Provision from Okta
description: Learn how to provision users into Sumo Logic from Okta. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article describes how to provision users into Sumo Logic from Okta.

## Configure provisioning from Okta

### Step 1: Create the app

1. [Login to Okta](https://login.okta.com/) as an administrator.
1. Navigate to **Applications > Applications** and click **Create App Integration**.<br/><img src={useBaseUrl('img/security/provision-okta-create-app.png')} alt="Create app integration" style={{border: '1px solid gray'}} width="700" />
1. Select **SAML 2.0** and click **Next**.<br/><img src={useBaseUrl('img/security/provision-okta-select-saml-20.png')} alt="Select SAML 2.0" style={{border: '1px solid gray'}} width="550" />
1. Provide a name in the **App Name** field and click **Next**.<br/><img src={useBaseUrl('img/security/provision-okta-app-name.png')} alt="App Name field" style={{border: '1px solid gray'}} width="500" />
1. Enter the **Single sign-on URL** and **Audience URI (SP Entity ID)**:<br/><img src={useBaseUrl('img/security/provision-okta-configure-saml.png')} alt="Configure SAML for the app" style={{border: '1px solid gray'}} width="600" /><br/>You can obtain the single sign-on URL (Assertion Consumer URL) and entity ID from the [SAML configuration](/docs/manage/security/saml/set-up-saml/#review-saml-configuration) of the Sumo Logic tenant where you will provision users:<br/><img src={useBaseUrl('img/security/provision-sumo-logic-saml-settings.png')} alt="ACS and entity ID from Sumo Logic" style={{border: '1px solid gray'}} width="800" />
1. Click **Next** and click **Finish**. The app displays in Okta.

### Step 2: Configure provisioning

1. Click the **General** tab for the app.
1. In the upper-right corner of the **App Settings** dialog for the app, click **Edit**. 
1. For **Provisioning** select **SCIM** and click **Save**.<br/><img src={useBaseUrl('img/security/provision-okta-scim-provisioning-setting.png')} alt="SCIM provisioning setting for the app" style={{border: '1px solid gray'}} width="800" />
1. 

