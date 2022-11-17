---
id: google-workspace-alertcenter
title: Google Workspace AlertCenter
sidebar_label: Google Workspace AlertCenter
description: Configure Google Workspace AlertCenter Cloud-to-Cloud connector.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

This topic has information about the Google Workspace AlertCenter Cloud-to-Cloud Source, part of Sumo Logic's [Cloud-to-Cloud Integration Framework](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework).

## Data Sources

The Google Workspace AlertCenter Source consumes data from the [Alerts API](https://developers.google.com/admin-sdk/alertcenter/reference/rest/v1beta1/alerts/list).

The Source periodically fetches data from the API. The polling interval is 5 minutes.

## Metadata

If the Source is configured with the **SIEM forward** option, the metadata field `_siemparser`  will be set to */Parsers/System/Google/GSuite Alert Center*.

## Configuration overview

In this configuration, you'll set up a Google service account, and configure the Google Workspace AlertCenter source  to use this account to authenticate and be authorized to access the Google Alerts API.

## Step 1: Create service account Credentials

**To create service account credentials**

1. Select the project or create a new one. Enable *Google Workspace Alert Center API* for the Alert API. You can search for "Google Workspace Alert Center API" in the search bar. Then select the "Enable" button. <br/><img src={useBaseUrl('img/send-data/google_workspace_alert_center_API_sdk.png')} alt="api-sdk" width="550"/>
2. You will be redirected to the dashboard page. Select the **Credentials** tab in the left panel. <br/><img src={useBaseUrl('img/send-data/google_workspace_credentials.PNG')} alt="credentials" width="350"/>
3. Click **Create Credentials**, and select **Service Account** to create service account credentials. Later you'll supply the account details and click **Done** to create a service account. <br/><img src={useBaseUrl('img/send-data/google_workspace_service_account.PNG')} alt="<service-account>" width="<insert-pixel-number>"/>
4. Navigate to the **Keys** tab on the same page. To create JSON for the service account you must create a key. Click **Add key** and select **Create new key**. At the prompt select **JSON** and click **Create**. <br/><img src={useBaseUrl('img/send-data/google_workspace_service_account_key.PNG')} alt="service-account-key" width="<insert-pixel-number>"/>
5. JSON for the service account is automatically downloaded. To see what the JSON looks like, and how the JSON fields map to the fields you'll configure, see [Service account JSON](#Service-account-JSON) below. <br/>
:::note
If you don't add the scope to the service account you won't be authorized to fetch alert details.
:::
7. For delegated user email, you need to add the email of the user whom you want to delegate for API calls.

### Service account JSON

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
Here is how the JSON fields map to the input form.

  | Field from JSON | Input field |
  | --- | --- |
  | client_email | Client Email |
  | private_key | Private Key |
  | token_uri | Token URL |

## Step 2: Configure the Google Workspace AlertCenter Source

1. In Sumo Logic, go to **Manage Data > Collection > Collection**.
1. On the **Collectors page**, click **Add Source** next to a Hosted Collector.
1. Select **Google Workspace AlertCenter**. <br/> <img src={useBaseUrl('img/send-data/alert-center-source.png')} alt="<alert-center-source" width="575"/>
1. **Name.** Enter a name for the Source
1. **Description.** (Optional)
1. **Source Category.** Enter a string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM.** Click if you want the Source to forward the logs it ingests to Cloud SIEM Enterprise.
1. **Fields.** (Optional) Click **+Add Field** to define the fields you want to associate, each field needs a name (key) and value. For more information, see [Fields](docs/manage/fields.md).
1. **Delegated User Email.** Enter the admin email address for the domain.
1. **Client Email.** Enter the value of the `client_email` key from the [Service account JSON](#service-account-json) above.
1. **Private Key.** Enter the value of the `private-key` key from the [Service account JSON](#service-account-json) above.
1. **Token URL.** Enter the value of the `auth_provider_x509_cert_url` key from the [Service account JSON](#service-account-json) above.
1. **Exclude Alert Types.** (Optional)
