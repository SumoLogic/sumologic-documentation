---
id: docusign-source
title: DocuSign
sidebar_label: DocuSign
description: Learn how to collect customer event data from the DocuSign and send it to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/docusign-icon.svg')} alt="Thumbnail icon" width="40"/>

DocuSign pioneered the development of e-signature technology, and today DocuSign helps organizations connect and automate how they prepare, sign, act on, and manage agreements. As part of the DocuSign Agreement Cloud, DocuSign offers eSignature, allowing you to sign documents electronically from most devices.

The DocuSign provides a secure endpoint to receive customer event data from the [DocuSign Monitor API](https://developers.docusign.com/docs/monitor-api/reference/monitor/dataset/getstream/). DocuSign Monitor helps organizations protect their agreements with round-the-clock activity tracking. The Monitor API delivers this activity tracking information directly to existing security stacks or data visualization tools—enabling teams to detect unauthorized activity, investigate incidents, and quickly respond to verified threats.

## Prerequisites

To collect event data from the DocuSign Monitor, you must meet the following criteria:
* **Administrator access to an organization**. To call the DocuSign Monitor endpoint, you must impersonate a user with administrator access to your organization.
   * Your organization must have access to DocuSign Monitor to call the endpoint.
* **Integration Key**. An integration key identifies your integration and links to its configuration values. [Create an integration key](https://developers.docusign.com/platform/configure-app/#how-to-get-an-integration-key)
* **Redirect Uri**. The redirect URI is the URI (URL) to which DocuSign will redirect the browser after authentication. [Set a redirect URI](https://developers.docusign.com/platform/configure-app/#how-to-set-a-redirect-uri)
* **RSA Key Pair**. [Add the RSA key pair](https://developers.docusign.com/platform/configure-app/#add-the-rsa-key-pair)
* **Application Consent**. Refer Step-1 of [Get an access token with JWT Grant](https://developers.docusign.com/platform/auth/jwt/jwt-get-token/)

## Data Source

The DocuSign API integration retrieves events data every 5 minutes.

## Setup and Configuration

In this configuration, you will set up the DocuSign account and configure it to be authorized and authenticated to use customer event data from DocuSign Monitor API. To obtain the DocuSign auth token and customer event data, you will need the following parameters:

### User ID

To get the User ID, follow the steps below:
1. Log in to **DocuSign** account.
2. Go to the **My Apps & Keys** page. <br/> <img src={useBaseUrl('img/send-data/docusign-home.png')} alt="<docusign-home.png>" width="600" />
3. Locate and copy the **User ID** available under **My Account Information**. <br/> <img src={useBaseUrl('img/send-data/docusign-user-id.png')} alt="<docusign-user-id.png>" width="600" />
:::note
You'll need to provide your DocuSign User ID while creating the [DocuSign Cloud-to-Cloud Source](#set-up-docusign-source).
:::

### App

You must first create an app to get integration key and configure RSA Key Pair and Redirect URI. This key is required to get access token which will be used to authenticate DocuSign API. To create an app follow the steps below:

1. Log in to your **DocuSign** account.
2. Go to the **My Apps & Keys** page. <br/> <img src={useBaseUrl('img/send-data/docusign-home.png')} alt="<docusign-home.png>" width="600" />
3. Navigate to **ADD APP AND INTEGRATION KEY**. <br/> <img src={useBaseUrl('img/send-data/docusign-add-app-integration-key.png')} alt="<docusign-add-app-integration-key.png>" width="600" />
4. Enter value for **App Name** in a dialog box, and click on **CREATE APP**. <br/> <img src={useBaseUrl('img/send-data/docusign-create-app.png')} alt="<docusign-create-app.png>" width="400" />
5. After creating your app, you'll be redirected to the app configuration page. Copy **Integration Key**. <br/> <img src={useBaseUrl('img/send-data/docusign-integration-key.png')} alt="<docusign-integration-key.png>" width="600" />
  :::note
  You'll need to provide your integration key while requesting [application consent](#app-consent) and creating the [DocuSign Cloud-to-Cloud Source](#set-up-docusign-source).
  :::
6. Click on **GENERATE RSA** under **Service Integration** to create new private and public key pair. <br/> <img src={useBaseUrl('img/send-data/docusign-generate-rsa.png')} alt="<docusign-generate-rsa.png>" width="450" />
7. Copy **Private Key** from dialog and close the dialog. <br/> <img src={useBaseUrl('img/send-data/docusign-private-key.png')} alt="<docusign-private-key.png>" width="600" />  
  :::note
  You'll need to provide RSA private key while creating the [DocuSign Cloud-to-Cloud Source](#set-up-docusign-source).
  :::
8. Under **Redirect URIs**, click **ADD URI**, then enter `http://localhost/` as your new redirect URI. <br/> <img src={useBaseUrl('img/send-data/docusign-redirect-uri.png')} alt="<docusign-redirect-uri.png>" width="400" />
  :::note
  You'll need a redirect URI while requesting [application consent](#app-consent).
  :::
9. Click **SAVE** to finish new app configuration.


### App Consent

Once your app is created, you need consent to make API calls. To request application consent, follow the steps below:
1. Copy the below URL based on your account environment in the browser and press enter. Replace **INTEGRATION_KEY** and **REDIRECT_URI** with the values you copied in steps 5 and 8 of the [App](#app) section, respectively.
   * For the development (demo) environment, use `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=INTEGRATION_KEY&redirect_uri=REDIRECT_URI`
   * For the production environment, use `https://account.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=INTEGRATION_KEY&redirect_uri=REDIRECT_URI`
2.  Click **ALLOW ACCESS** to provide your consent. This should redirect you to **REDIRECT_URI**.

## States

A DocuSign Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A DocuSign Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with DocuSign.
1. **Collecting**. The Source is actively collecting data from DocuSign.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Set up DocuSign Source

When you create a DocuSign Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the DocuSign source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select **DocuSign** icon.  <br/><img src={useBaseUrl('img/send-data/docusign-icon.svg')} alt="docusign-icon.svg" width="60" />
4. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional. <br/>   <img src={useBaseUrl('img/send-data/docusign-config-main.png')} alt="docusign-config-main.png" width="400" />
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
7. In **DocuSign Environment**, choose the environment of your DocuSign account.
8. In **User ID**, enter the User ID of your account. See [User ID](#user-id) section to help find your User ID.
9. In **Integration Key**, enter the integration key you generated. See step 5 of [App](#app) section.
10. In **RSA Private Key**, enter the rsa private key you generated. See step 7 of [App](#app) section.
11. When you are finished configuring the Source, click **Save**.

### Error types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows three possible error types. It tells the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs.                                     | Yes                                                   | The Source will retry indefinitely.                               | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry indefinitely.                   | FirstPartyGenericError |

### Restarting your Source

If your Source encounters ThirdPartyConfig errors, you can restart it from either the Sumo Logic UI or Sumo Logic API.

#### UI

To restart your source in the Sumo Logic platform, follow the steps below:
1. Open the Collection page, and go to **Manage Data** > **Collection** > **Collection**.
2. Select the source and click the **information** icon on the right side of the row.
3. The API usage information popup is displayed. Click the **Restart Source** button on the bottom left. <br/><img src={useBaseUrl('img/send-data/restart-source-button.png')} alt="restart-source-button.png" width="600" />
4. Click **Confirm** to send the restart request. <br/><img src={useBaseUrl('img/send-data/restart-source-confirm.png')} alt="restart-source-confirm.png" width="600" />
5. The bottom left of the platform will provide a notification informing you the request was successful.<br/><img src={useBaseUrl('img/send-data/restart-source-initiated.png')} alt="restart-source-initiated.png" width="600" />

#### API

To restart your source using the Sumo Management API, follow the instructions below:
* Method: POST
* Example endpoint: `https://api.sumologic.com/api/v1/collectors/{collector_id}/sources/{source_id}/action/restart`.

<details><summary>Which API endpoint should I use?</summary>

{@import ../../../reuse/api-endpoints.md}

</details>

### JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | na |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"DocuSign"}` for DocuSign Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for DocuSign Source. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `env` | String | Yes | Environment of the DocuSign application. | modifiable |
| `userId` | String | Yes | User ID of the DocuSign account. | modifiable |
| `integrationKey` | String | Yes | Integration Key of the app. | modifiable |
| `rsaPrivateKey` | String | Yes | RSA Private Key for the app. | modifiable |

### JSON Example

```json
{
   "api.version": "v1",
   "source": {
      "config": {
         "name": "DocuSign",
         "description": "Test Source",
         "category": "source_category",
         "env": "dev",
         "userId": "9cfb472b-ef1f-4116-8df2-17c538xxxxxx",
         "integrationKey": "215c96c6-19a6-48e9-955f-253593xxxxxx",
         "rsaPrivateKey": "-----BEGIN RSA PRIVATE KEY----- xxxxxxx xxxxxxx xxxxx== -----END RSA PRIVATE KEY-----"
      },
      "schemaRef": {
         "type": "DocuSign"
      },
      "sourceType": "Security"
   }
}
```
