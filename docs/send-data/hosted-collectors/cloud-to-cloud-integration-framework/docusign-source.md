---
id: docusign-source
title: DocuSign
sidebar_label: DocuSign
tags:
  - cloud-to-cloud
  - docusign
description: Learn how to collect customer event data from the DocuSign and send it to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/docusign-icon.svg')} alt="Thumbnail icon" width="40"/>

DocuSign pioneered the development of e-signature technology, and today DocuSign helps organizations connect and automate how they prepare, sign, act on, and manage agreements. As part of the DocuSign Agreement Cloud, DocuSign offers eSignature, allowing you to sign documents electronically from most devices.

The DocuSign provides a secure endpoint to receive customer event data from the [DocuSign Monitor API](https://developers.docusign.com/docs/monitor-api/reference/monitor/dataset/getstream/). DocuSign Monitor helps organizations protect their agreements with round-the-clock activity tracking. The Monitor API delivers this activity tracking information directly to existing security stacks or data visualization tools—enabling teams to detect unauthorized activity, investigate incidents, and quickly respond to verified threats.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Customer event data](https://developers.docusign.com/docs/monitor-api/reference/monitor/dataset/getstream/) |

## Setup

### Vendor configuration

**Prerequisites**

To collect event data from the DocuSign Monitor, you must meet the following criteria:
* **Administrator access to an organization**. To call the DocuSign Monitor endpoint, you must impersonate a user with administrator access to your organization.
* **Enable DocuSign Monitor**. [Enable DocuSign Monitor](https://developers.docusign.com/docs/monitor-api/how-to/enable-monitor/) for your organization to call the endpoint.
* **Integration Key**. An integration key identifies your integration and links to its configuration values. [Create an integration key](https://developers.docusign.com/platform/configure-app/#how-to-get-an-integration-key)
* **Redirect Uri**. The redirect URI is the URI (URL) to which DocuSign will redirect the browser after authentication. [Set a redirect URI](https://developers.docusign.com/platform/configure-app/#how-to-set-a-redirect-uri)
* **RSA Key Pair**. [Add the RSA key pair](https://developers.docusign.com/platform/configure-app/#add-the-rsa-key-pair)
* **Application Consent**. Refer Step-1 of [Get an access token with JWT Grant](https://developers.docusign.com/platform/auth/jwt/jwt-get-token/)
In this configuration, you will set up the DocuSign account and configure it to be authorized and authenticated to use customer event data from DocuSign Monitor API. To obtain the DocuSign auth token and customer event data, you will need the following parameters:

#### User ID

To get the User ID, follow the steps below:
1. Log in to **DocuSign** account.
2. Go to the **My Apps & Keys** page. <br/> <img src={useBaseUrl('img/send-data/docusign-home.png')} alt="<docusign-home.png>" width="600" />
3. Locate and copy the **User ID** available under **My Account Information**. <br/> <img src={useBaseUrl('img/send-data/docusign-user-id.png')} alt="<docusign-user-id.png>" width="800" />
:::note
You'll need to provide your DocuSign User ID while creating the [DocuSign Cloud-to-Cloud Source](#source-configuration).
:::

#### App

You must first create an app to get integration key and configure RSA Key Pair and Redirect URI. This key is required to get access token which will be used to authenticate DocuSign API. To create an app follow the steps below:

1. Sign in to your **DocuSign** account.
2. Go to the **My Apps & Keys** page. <br/> <img src={useBaseUrl('img/send-data/docusign-home.png')} alt="<docusign-home.png>" width="600" />
3. Navigate to **ADD APP AND INTEGRATION KEY**. <br/> <img src={useBaseUrl('img/send-data/docusign-add-app-integration-key.png')} alt="<docusign-add-app-integration-key.png>" width="700" />
4. Enter value for **App Name** in a dialog box, and click on **CREATE APP**. <br/> <img src={useBaseUrl('img/send-data/docusign-create-app.png')} alt="<docusign-create-app.png>" width="400" />
5. After creating your app, you'll be redirected to the app configuration page. Copy **Integration Key**. <br/> <img src={useBaseUrl('img/send-data/docusign-integration-key.png')} alt="<docusign-integration-key.png>" width="700" />
  :::note
  You'll need to provide your integration key while requesting [application consent](#app-consent) and creating the [DocuSign Cloud-to-Cloud Source](#setup).
  :::
6. Leave **Authentication** settings as default as shown in below image. <br/> <img src={useBaseUrl('img/send-data/docusign-authetication.png')} alt="<docusign-integration-key.png>" width="400" />
7. Click on **GENERATE RSA** under **Service Integration** to create new private and public key pair. <br/> <img src={useBaseUrl('img/send-data/docusign-generate-rsa.png')} alt="<docusign-generate-rsa.png>" width="450" />
8. Copy **Private Key** from dialog and close the dialog. <br/> <img src={useBaseUrl('img/send-data/docusign-private-key.png')} alt="<docusign-private-key.png>" width="400" />  
  :::note
  You'll need to provide RSA private key while creating the [DocuSign Cloud-to-Cloud Source](#setup).
  :::
9. Under **Redirect URIs**, click **ADD URI**, then enter `http://localhost` as your new redirect URI. <br/> <img src={useBaseUrl('img/send-data/docusign-redirect-uri.png')} alt="<docusign-redirect-uri.png>" width="400" />
  :::note
  You'll need a redirect URI while requesting [application consent](#app-consent).
  :::
10. Click **SAVE** to finish new app configuration.

#### App Consent

Once your app is created, you need consent to make API calls. To request application consent, follow the steps below:
1. Copy the below URL based on your account environment in the browser and press enter. Replace **INTEGRATION_KEY** and **REDIRECT_URI** with the values you copied in steps 5 and 9 of the [App](#app) section, respectively.
   * For the development (demo) environment, use `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=INTEGRATION_KEY&redirect_uri=REDIRECT_URI`
   * For the production environment, use `https://account.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=INTEGRATION_KEY&redirect_uri=REDIRECT_URI`
2.  Click **ALLOW ACCESS** to provide your consent. This should redirect you to **REDIRECT_URI**.

### Source configuration

When you create a DocuSign Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the DocuSign source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Search for and select **DocuSign**.
4. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional.
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
7. In **DocuSign Environment**, choose the environment of your DocuSign account.
8. In **User ID**, enter the User ID of your account. See [User ID](#user-id) section to help find your User ID.
9. In **Integration Key**, enter the integration key you generated. See step 5 of [App](#app) section.
10. In **RSA Private Key**, enter the rsa private key you generated. See step 8 of [App](#app) section.
11. When you are finished configuring the Source, click **Save**.

## Metadata fields

If the integration is configured with the SIEM forward option, set the Metadata field `_siemparser` to `/Parsers/System/DocuSign/DocuSign Monitor`.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"DocuSign"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| env | String | Yes | `null` | Environment of the DocuSign application. |  |
| userId | String | Yes | `null` | User ID of the DocuSign account. |  |
| integrationKey | String | Yes | `null` | Integration Key of the app. |  |
| rsaPrivateKey | String | Yes | `null` | RSA Private Key for the app. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/docusign/example.json
```

### Terraform example

```hcl reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/docusign/example.tf
```


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
