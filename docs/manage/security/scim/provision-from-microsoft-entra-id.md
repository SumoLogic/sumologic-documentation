---
id: provision-from-microsoft-entra-id 
title: Provision from Microsoft Entra ID
sidebar_label: Provision from Microsoft Entra ID
description: Learn how to provision users into Sumo Logic from Microsoft Entra ID (formerly Azure Active Directory). 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article describes how to provision users into Sumo Logic from Microsoft Entra ID (formerly Azure Active Directory).

## Prerequisites

### Set up SAML

If it is not already set up, [set up SAML for single sign-on](/docs/manage/security/saml/set-up-saml) for Microsoft Azure Entra ID in the Sumo Logic instance where you will provision users. This will allow connection to Sumo Logic for provisioning. Copy the single sign-on URL (Assertion Consumer URL) from your Sumo Logic [SAML configuration](/docs/manage/security/saml/set-up-saml/#review-saml-configuration). You will use it when you set up provisioning.

<img src={useBaseUrl('img/security/provision-azure-assertion-consumer-url.png')} alt="Assertion Consumer URL" style={{border: '1px solid gray'}} width="700" />

### Create an access key

Create an [access key](/docs/manage/security/access-keys/) using a service account. This access key will provide authorization to provision users into Sumo Logic.

When you create the access key, copy its access ID and access key values. You will enter these when you set up provisioning to use one of the following authorization methods:
* Basic authentication
   * Username: Access ID
   * Password: Access key
* Bearer token<br/>Use [Base64 encoding](https://www.base64encode.org/) to Base64 encode `<access ID>:<access key>`.

## Configure provisioning from Microsoft Entra ID

### Step 1: Create the app

1. Log in to Microsoft Azure.
1. Navigate to Microsoft Entra ID. (You can use the search bar to locate it.)
1. Navigate to **Manage > Enterprise Applications**.
1. Click **New application**.<br/><img src={useBaseUrl('img/security/provision-azure-new-app.png')} alt="Create new application" style={{border: '1px solid gray'}} width="800" />
1. Click **Create your own application**.<br/><img src={useBaseUrl('img/security/provision-azure-create-your-own-app.png')} alt="Create your own application" style={{border: '1px solid gray'}} width="400" />
1. Enter a name for the app, select **Integrate any other application you don't find in the gallery (Non-gallery)**. <br/><img src={useBaseUrl('img/security/provision-azure-name-app.png')} alt="Name your application" style={{border: '1px solid gray'}} width="400" />
1. Click **Create**. The app displays in Entra ID.<br/><img src={useBaseUrl('img/security/provision-azure-app.png')} alt="App in Entra ID" style={{border: '1px solid gray'}} width="600" />

### Step 2: Configure provisioning

1. Select **Set up single sign-on**.<br/><img src={useBaseUrl('img/security/provision-azure-set-up-sso.png')} alt="Set up single sign on" style={{border: '1px solid gray'}} width="600" />
1. Select **SAML**.<br/><img src={useBaseUrl('img/security/provision-azure-select-saml.png')} alt="Select SAML" style={{border: '1px solid gray'}} width="600" />
1. Click **Edit** in **Basic SAML Configuration**.<br/><img src={useBaseUrl('img/security/provision-azure-edit-basic-saml-config.png')} alt="Edit in Basic SAML Configuration" style={{border: '1px solid gray'}} width="600" />
1. In the **Basic SAML Configuration** pane, enter the **Identity (Entity ID)** and **Reply URL (Assertion Consumer Service URL)** for your Sumo Logic instance:<br/><img src={useBaseUrl('img/security/provision-azure-basic-saml-configuration.png')} alt="Basic SAML Configuration" style={{border: '1px solid gray'}} width="600" /><br/>Obtain the Assertion Consumer URL from the SAML configuration of the Sumo Logic tenant where you will provision users (see [Prerequisites](#prerequisites)).<br/><img src={useBaseUrl('img/security/provision-azure-assertion-consumer-url.png')} alt="Assertion Consumer URL" style={{border: '1px solid gray'}} width="700" /><br/>
   :::tip
   The entity ID is typically the same as the Assertion Consumer Service URL without `/consume` in the URL.
   :::
1. Click **Save** at the top of the pane, and then close the pane. 
