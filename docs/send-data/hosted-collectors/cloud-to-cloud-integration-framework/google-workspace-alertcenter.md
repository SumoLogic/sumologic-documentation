---
id: google-workspace-alertcenter
title: Google Workspace AlertCenter Source
sidebar_label: Google Workspace AlertCenter
description: Configure Google Workspace AlertCenter Cloud-to-Cloud connector.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="thumbnail icon" width="150"/>

<head>
  <meta name="robots" content="noindex" />
</head>

This topic has information about the Google Workspace AlertCenter Cloud-to-Cloud Source, part of Sumo Logic's [Cloud-to-Cloud Integration Framework](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework).

## Data Sources

The Google Workspace AlertCenter Source consumes data from the [Alerts API](https://developers.google.com/admin-sdk/alertcenter/reference/rest/v1beta1/alerts/list).

The Source periodically fetches data from the API. The polling interval is 5 minutes.

## Metadata

If the Source is configured with the **SIEM forward** option, the metadata field `_siemparser`  will be set to */Parsers/System/Google/GSuite Alert Center*.

## Configuration overview

In this configuration, you'll set up a Google service account, and configure the Google Workspace AlertCenter source  to use this account to authenticate and be authorized to access the Google Alerts API.

## Step 1: Create service account Credentials

To create Google Workspace AlertCenter service account credentials:

1. From [Google Cloud console](https://console.cloud.google.com), select your project or create a new one.
1. Enable **Google Workspace Alert Center API** for the Alert API. To locate this setting, you can search for "Google Workspace Alert Center API" in the search bar. Then select the **Enable** button. <br/><img src={useBaseUrl('img/send-data/google_workspace_alert_center_API_sdk.png')} alt="api-sdk" width="450"/>
1. You will be redirected to the dashboard page. Select the **Credentials** tab in the left panel. <br/><img src={useBaseUrl('img/send-data/google_workspace_credentials.PNG')} alt="credentials" width="200"/>
1. Click **Create Credentials**, and select **Service Account** to create service account credentials. Later you'll supply the account details and click **Done** to create a service account. <br/><img src={useBaseUrl('img/send-data/google_workspace_service_account.PNG')} alt="<service-account>" width="400"/>
1. To create JSON for the service account, you must create a key. Click the service account email to navigate to the Keys tab.<br/> <img src={useBaseUrl('img/send-data/google_workspace_service_account_create_key.png')} alt="service-account-create_key.png" width="800"/>
1. Click **Add key** and select **Create new key**. At the prompt, select **JSON** and click **Create** to create a key. <br/><img src={useBaseUrl('img/send-data/google_workspace_service_account_key.PNG')} alt="<service-account-key>" width="600"/>
1. JSON for the service account is automatically downloaded. To see what the JSON looks like, and how the JSON fields map to the fields you'll configure, see the [Service account JSON](#example-of-service-account-json) example below.
1. Add domain-wide delegation to your service account using the client ID generated in step 5.
1. From the Google admin console, add your OAuth scope to the service account using the instructions [here](https://developers.google.com/workspace/guides/create-credentials#optional_set_up_domain-wide_delegation_for_a_service_account) and select it in the input form. The OAuth scope for alert API is:
  ```
  https://www.googleapis.com/auth/apps.alerts
  ```
  :::note
   If you don't add an OAuth scope to your Google Workspace service account, you won't be authorized to fetch alert details. Learn more about OAuth scopes:
   * [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2)
   * [Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849?hl=en)
  :::
1. For delegated user email, you need to add the email of the user whom you want to delegate for API calls.

## Step 2: Configure the Google Workspace AlertCenter Source

1. In Sumo Logic, go to **Manage Data** > **Collection** > **Collection**.
1. On the **Collectors page**, click **Add Source** next to a Hosted Collector.
1. Select **Google Workspace AlertCenter**. <br/> <img src={useBaseUrl('img/send-data/alertcenter-icon.png')} alt="<alertcenter-icon" width="140"/>
1. **Name.** Enter a name for the Source
1. **Description.** (Optional). Enter the description of the Source.
1. **Source Category.** Enter a string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM.** Click if you want the Source to forward the logs it ingests to Cloud SIEM Enterprise.
1. **Fields.** (Optional) Click **+Add Field** to define the fields you want to associate, each field needs a name (key) and value. For more information, see [Fields](/docs/manage/fields.md).
    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a checkmark is shown when the field exists in the Fields table schema.
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored (i.e., dropped).
1. **Delegated User Email.** Enter the admin email address for the domain.
1. **Google Workspace AlertCenter Credentials**. You can authenticate your service account credentials directly by uploading a JSON file credentials instead of breaking down the file into different sections for the UI schema. Click **Upload** and select the JSON file that you downloaded in the [Service Account Credentials section](#step-1-create-service-account-credentials). <br/> <img src={useBaseUrl('img/send-data/alertcenter-config-main.png')} alt="<alert-center-source" width="400"/>
1. **Exclude Alert Types**. (Optional) Enter the data alert types and scope that you don't want to send to Sumo Logic.
:::note
All alert types are selected by default unless you exclude some of the alert types in the config JSON schema.
:::
1. **Processing Rules for Logs**. (Optional) Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Google Workspace AlertCenter"}` for Google Workspace AlertCenter Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Google Workspace AlertCenter Source. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| delegatedUserEmail | String | Yes | Provide the super-administrator email address for the domain that granted access to the service account you created. | modifiable |
| credentialsJson | String | Yes | Authentication service account's credentials to access Google Workspace Platform. | modifiable |
| excludedAlertTypes | Array of Strings | No | Defines the types of alerts which the user want to exclude. | modifiable |

### Example of Service account JSON

```json
  {
    "type": "service_account",
    "project_id": "sample_project",
    "private_key_id": "asdfgh1234556",
    "private_key": "-----BEGIN PRIVATE KEY-----\nsample_private_key\n-----END PRIVATE KEY-----\n",
    "client_email": "sample_project@sample_service_account.com",
    "client_id": "12345678",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/sample_url.com"
  }
```
