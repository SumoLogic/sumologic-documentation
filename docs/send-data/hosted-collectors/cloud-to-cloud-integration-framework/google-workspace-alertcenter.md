---
id: google-workspace-alertcenter
title: Google Workspace AlertCenter
sidebar_label: Google Workspace
description: Configure Google Workspace AlertCenter Cloud-to-Cloud connector.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

This topic has information about the Google Workspace AlertCenter Cloud-to-Cloud Source, part of Sumo Logic's [Cloud-to-Cloud Integration Framework](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework).

## Data Sources

The Google Workspace AlertCenter Source consumes data from the [Alerts API](https://developers.google.com/admin-sdk/alertcenter/reference/rest/v1beta1/alerts/list).

## Metadata

If the Source is configured with the **SIEM forward** option, the metadata field `_siemparser`  will be set to */Parsers/System/Google/GSuite Alert Center*.

## Setup and Configuration

The Source periodically fetches data from the Alerts API. The polling interval is 5 minutes.

**To create service account credentials**

1. Select the project or create a new one. Enable *Google Workspace Alert Center API* for the Alert API. You can search for "Google Workspace Alert Center API" in the search bar. Then select the "Enable" button. <br/><img src={useBaseUrl('img/send-data/google_workspace_alert_center_API_sdk.png')} alt="api-sdk" width="<insert-pixel-number>"/>
2. You will be redirected to the dashboard page. Select the **Credentials** tab in the left panel. <br/><img src={useBaseUrl('img/send-data/google_workspace_credentials.PNG')} alt="credentials" width="<insert-pixel-number>"/>
3. Click **Create Credentials**, and select **Service Account** to create service account credentials. Later you'll supply the account details and click **Done** to create a service account. <br/><img src={useBaseUrl('img/send-data/google_workspace_service_account.PNG')} alt="<service-account>" width="<insert-pixel-number>"/>
4. Navigate to the **Keys** tab on the same page. To create JSON for the service account you must create a key. Click **Add key** and select **Create new key**. At the prompt select **JSON** and click **Create**. <br/><img src={useBaseUrl('img/send-data/google_workspace_service_account_key.PNG')} alt="service-account-key" width="<insert-pixel-number>"/>
5. JSON for the service account is automatically downloaded. To see what the JSON looks like, and how the JSON fields map to the fields you'll configure, see [Service account JSON](#Service-account-JSON) below. <br/>
:::note
If you don't add the scope to the service account you won't be authorized to fetch alert details.
:::
7. For delegated user email, you need to add the email of the user whom you want to delegate for API calls.

## Service account JSON

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
