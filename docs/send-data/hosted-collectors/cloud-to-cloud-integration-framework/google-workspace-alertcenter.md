---
id: google-workspace-alertcenter
title: Google Workspace AlertCenter Source
sidebar_label: Google Workspace AlertCenter
keywords:
    - google-workspace-alertcenter
    - cloud-SIEM-enterprise
description: Configure Google Workspace AlertCenter Cloud-to-Cloud connector.
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/google-workspace-alertcenter/example.json';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="thumbnail icon" width="150"/>

<head>
  <meta name="robots" content="noindex" />
</head>

This topic has information about the Google Workspace AlertCenter Cloud-to-Cloud Source, part of Sumo Logic's [Cloud-to-Cloud Integration Framework](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 minutes | [Alerts data](https://developers.google.com/admin-sdk/alertcenter/reference/rest/v1beta1/alerts/list) |

## Setup

### Vendor configuration

Follow the below steps to create Google Workspace AlertCenter service account credentials:

1. From [Google Cloud console](https://console.cloud.google.com), select your project or create a new one.
1. Enable **Google Workspace Alert Center API** for the Alert API. To locate this setting, you can search for "Google Workspace Alert Center API" in the search bar. Then select the **Enable** button. <br/><img src={useBaseUrl('img/send-data/google_workspace_alert_center_API_sdk.png')} alt="api-sdk" width="450"/>
1. You will be redirected to the dashboard page. Select the **Credentials** tab in the left panel. <br/><img src={useBaseUrl('img/send-data/google_workspace_credentials.PNG')} alt="credentials" width="200"/>
1. Click **Create Credentials**, and select **Service Account** to create service account credentials. Later you'll supply the account details and click **Done** to create a service account. <br/><img src={useBaseUrl('img/send-data/google_workspace_service_account.PNG')} alt="<service-account>" width="400"/>
1. To create JSON for the service account, you must create a key. Click the service account email to navigate to the Keys tab.<br/> <img src={useBaseUrl('img/send-data/google_workspace_service_account_create_key.png')} alt="service-account-create_key.png" width="800"/>
1. Click **Add key** and select **Create new key**. At the prompt, select **JSON** and click **Create** to create a key. <br/><img src={useBaseUrl('img/send-data/google_workspace_service_account_key.PNG')} alt="<service-account-key>" width="600"/>
1. JSON for the service account is automatically downloaded. To see what the JSON looks like, and how the JSON fields map to the fields you'll configure, see the [service account JSON example](#examples) below.
1. Add domain-wide delegation to your service account using the client ID generated in step 5.
1. From the Google admin console, add your OAuth scope to the service account using the instructions [here](https://developers.google.com/workspace/guides/create-credentials#optional_set_up_domain-wide_delegation_for_a_service_account) and select it in the input form. The OAuth scope for alert API is:
   ```
   https://www.googleapis.com/auth/apps.alerts
   ```
   :::note
   If you do not add an OAuth scope to your Google Workspace service account, you won't be authorized to fetch alert details. Learn more about OAuth scopes:
   * [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2)
   * [Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849?hl=en)
   :::
1. For delegated user email, you need to add the email of the user whom you want to delegate for API calls.

### Source configuration

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the **Collectors page**, click **Add Source** next to a Hosted Collector.
1. Search for and select **Google Workspace AlertCenter**.
1. **Name.** Enter a name for the Source.
1. **Description.** (Optional). Enter the description of the Source.
1. **Source Category.** Enter a string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Click if you want the Source to forward the logs it ingests to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. **Fields.** (Optional) Click **+Add Field** to define the fields you want to associate, each field needs a name (key) and value. For more information, see [Fields](/docs/manage/fields).
    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a checkmark is shown when the field exists in the Fields table schema.
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored (i.e., dropped).
1. **Delegated User Email.** Enter the admin email address for the domain. This email should be the address that is configured for the specific service account in the Google Cloud console.
1. **Google Workspace AlertCenter Credentials**. You can authenticate your service account credentials directly by uploading a JSON file credentials instead of breaking down the file into different sections for the UI schema. Click **Upload** and select the JSON file that you downloaded in the [Service Account Credentials section](#vendor-configuration).
1. **Exclude Alert Types**. (Optional) Enter the data alert types and scope that you do not want to send to Sumo Logic.
   :::note
   All alert types are selected by default unless you exclude some of the alert types in the config JSON schema.
   :::
1. **Processing Rules for Logs**. (Optional) Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

## Metadata

If the Source is configured with the **SIEM forward** option, then the metadata field `_siemparser` will be set to */Parsers/System/Google/GSuite Alert Center*.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Google Workspace AlertCenter"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| delegatedUserEmail | String | Yes | `null` | Provide the super-administrator email address for the domain that granted access to the service account you created. | |
| credentialsJson | String | Yes | `null` | Authentication service account's credentials to access Google Workspace Platform. |  |
| excludedAlertTypes | Array of Strings | No |  | Defines the types of alerts which the user want to exclude. |  |

## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/google-workspace-alertcenter.md/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/google-workspace-alertcenter.md/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/google-workspace-alertcenter.md/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/google-workspace-alertcenter.md/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
