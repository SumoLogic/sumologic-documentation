---
id: miro-source
title: Miro Source
sidebar_label: Miro
description: Learn how to configure the Miro Source Cloud-to-Cloud connector for Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/miro-logo.png')} alt="img/send-data/miro-logo.png" width="50"/>

The Miro Source API integration ingests audit logs obtained from the [Audit log API](https://developers.miro.com/reference/get-logs). You will be able to collect audit logs activity from your Miro platform using our new Miro Cloud-to-Cloud Source connector.

## Data Sources

The Miro API integration consumes data of the Audit Logs and sends it to Sumo Logic. The polling interval time for integration is 5 minutes.

## Prerequisite

To collect audit logs, you must have a Miro Enterprise account.

## Setup and Configuration

In this configuration, you will set up a Miro source account with your Enterprise account and configure it to be authorized and authenticated to use audit logs from Miro API.

Complete the following steps to get the credentials and enable the required scope:
1. Log into the [Miro](https://miro.com/login/) with an Enterprise account.

2. Create a [Developer team](https://miro.com/app/settings/user-profile/apps) in your Miro Enterprise account.

 <img src={useBaseUrl('img/send-data/create-team.png')} alt="create-team.png" />

3. Click **+Create new app** from [Your apps](https://miro.com/app/settings/user-profile/apps) page.

 <img src={useBaseUrl('img/send-data/your-apps1.png')} alt="your-apps1.png" width="550" />

4. Provide **App Name** and **Select developer team for your app**. To enable the refresh token feature for your app, select the **Expire user authorization token** checkbox.

 <img src={useBaseUrl('img/send-data/create-app.png')} alt="create-app.png" width="450" />

5. After the app is created, go to the **Permissions** tab in app settings and select **auditlogs:read** checkbox to enable scope.

 <img src={useBaseUrl('img/send-data/enable-scope.png')} alt="enable-scope.png" width="500" />

6. To authorize the app, click **Install app to get OAuth token** and select your team from the dropdown.

 <img src={useBaseUrl('img/send-data/install-app.png')} alt="install-app.png" width="450" />

7. After the app is installed successfully, your access token and refresh token will be generated. See images below:
 **Access Token**

 <img src={useBaseUrl('img/send-data/get-access-token.png')} alt="get-access-token.png" width="450" />

 **Access Token** and **Refresh Token** pair

  <img src={useBaseUrl('img/send-data/get-token-pair.png')} alt="get-token-pair.png" width="450" />

8. Copy the **Client ID** and **Client Secret** from the **App Credentials** page.

 <img src={useBaseUrl('img/send-data/get-credentials.png')} alt="get-cedentials.png" width="500" />

:::info
Your **Client ID**, **Client Secret**, **Access Token** will be used as input in UI. However, **Refresh Token** will only be required if you have selected **Expire user authorization token** while creating the app.
:::
