---
id: google-workspace-source
title: Google Workspace User Inventory Source
sidebar_label: Google Workspace User Inventory
description: This document explains Google Workspace User Inventory source setup and configuration information.
keywords:
    - google-workspace
    - cloud-SIEM-enterprise
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/google-workspace/example.json';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="thumbnail icon" width="150"/>

The Google Workspace User Inventory source collects a list of users from the Google Workspace [Users API](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/list). It securely stores the required authentication, scheduling, and state tracking information.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 24 hours |  [Users](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/list) |

## Setup

### Vendor configuration

In this configuration, you will set up a Google Workspace User Inventory source account and configure it to be authorized and authenticated to use Google Workspace User Inventory. To set up a Google Workspace User Inventory account, you need to configure Google service account credentials. You may refer to the [Google Documentation](https://developers.google.com/admin-sdk/directory/v1/guides/delegation) for more information.

#### Creating Service Account

To create service account credentials, follow the steps below:
1. Navigate to the [Google Console service account](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts?pli=1&supportedpurview=project) page.
1. Log in with your credentials.
1. Create a new project or select from the existing projects.<br/> <img src={useBaseUrl('img/send-data/workspace-setup1.png')} alt="workspace-setup1.png" width="600" />
1. Enable **Admin SDK API** to have an administrator access. To locate this setting, you can search for **Admin SDK** in the search bar. Then select the **Enable** button.<br/> <img src={useBaseUrl('img/send-data/workspace-setup2.png')} alt="workspace-setup2.png" width="500" />
1. You will be redirected to the Admin dashboard page. Select the **Credentials** option from the left navigation. <br/> <img src={useBaseUrl('img/send-data/select-credentials.png')} alt="select-credentials.png" width="700" />
1. Click the <img src={useBaseUrl('img/send-data/create-cred-button.png')} alt="create-cred-button.png" width="150" /> button at the menu bar of the Google Console page, and select Service account from the options that appear.<br/> <img src={useBaseUrl('img/send-data/create-credentials-service.png')} alt="create-credentials-service.png" width="600" />
1. After entering the service account details, you may leave the **Optional** fields and continue to click **Done**. <br/> <img src={useBaseUrl('img/send-data/service-account-details.png')} alt="login-service-account-details.png" width="500" />
1. To create JSON for the service account, you must create a key. Select the service account email to navigate to the **Keys** tab.<br/><img src={useBaseUrl('img/send-data/google_workspace_service_account_create_key.png')} alt="google_workspace_service_account_create_key.png" width="600" />.
1. Click **Keys** tab on the same service account page. <br/><img src={useBaseUrl('img/send-data/add-key.png')} alt="add-key.png" width="500" />
1. From **Add Key** dropdown, select **Create new key**. At the prompt, select **JSON** and click **Create** to create a key <br/><img src={useBaseUrl('img/send-data/generate-key.png')} alt="generate-key.png" width="600" />
1. JSON for the service account is automatically downloaded. Use this JSON file while configuring the Google Workspace User Inventory source.

#### Domain-wide Delegation

To add domain-wide delegation to your service account using the client ID or Key generated in above section, follow the steps below:
1. Navigate to the [Google Console service account](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts?pli=1&supportedpurview=project) page.
1. Select your service account.
1. Go to **Advanced** settings section.
1. Under **Domain-wide delegation**, find your service account's **Client ID**. Click ![Copy](/img/send-data/copy-button.png) to copy the client ID value to your clipboard.<br/><img src={useBaseUrl('img/send-data/domain-delegation.png')} alt="domain-delegation.png" width="600" />
1. If you have super administrator access to the relevant Google Workspace account, click **View Google Workspace Admin Console**, then sign in using a super administrator user account and continue following the steps in the section below.
 :::note
 If you do not have super administrator access to the relevant Google Workspace account, contact a super administrator for that account and send them your service account's Client ID and list of OAuth Scopes so they can complete the following steps in the Admin console.
 :::

#### Adding OAuth Scope

OAuth Scope enables delegated access to a user's resources on a service, such as Google, without exposing the user's credentials to the third-party application. By adding the necessary OAuth scopes, you are specifying the level of access the service account has to your resources, while also ensuring security and privacy.
1. From the [Google admin console](https://console.cloud.google.com/projectselector2/iam-admin), go to **Security** section, then click **API Controls**.<br/><img src={useBaseUrl('img/send-data/google_workspace_adding_scope1.png')} alt="google_workspace_adding_scope1.png" width="800" />
1. To add the OAuth scopes, locate the settings under **Manage Domain Wide Delegation** section. <br/><img src={useBaseUrl('img/send-data/manage-domainwide-delegation.png')} alt="manage-domainwide-delegation.png" width="700" />
1. Click **Add new**.
1. In the **Client ID** field, paste the client ID you copied in step 5 of the [Creating Service Account](#creating-service-account) section.
1. In the **OAuth Scopes** field, enter a comma-delimited list of the scopes required by your application. <br/><img src={useBaseUrl('img/send-data/google_workspace_adding_scope2.png')} alt="google_workspace_adding_scope2.png" width="600" />.

You can add any of the following OAuth scopes. Note the ones you select, you'll need to provide them when configuring the Sumo Logic Google Workspace Source.
  ```
   https://www.googleapis.com/auth/admin.directory.user
   https://www.googleapis.com/auth/admin.directory.user.readonly
   https://www.googleapis.com/auth/cloud-platform

  ```
:::note
To ensure that you are authorized to fetch the users' details, it is recommended to add an OAuth scope to your Google Workspace service account. Adding the appropriate OAuth scope(s) maintains security and privacy for your users.
:::

Learn more about OAuth scopes:
  * [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2)
  * [Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849?hl=en)

### Source configuration

When you create a Google User Inventory source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Google Workspace User Inventory source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Google Workspace: User Inventory**.
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/) so it becomes part of User Inventory. <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped. 
1. The **Delegated User Email** is the email address of the user you want to call the API on behalf of. This user should have the necessary [permissions](https://support.google.com/a/answer/7519580?hl=en) to view the details of other users in your Google Workspace domain, such as an Admin role. At a minimum, the user should have the `Users:Read permission`.
   Learn more about Domain-Wide Delegation of Authority:
    * [Domain-Wide Delegation of Authority](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority).
    * [Google's Delegate domain-wide authority to your service account document](https://developers.google.com/admin-sdk/directory/v1/guides/delegation#delegate_domain-wide_authority_to_your_service_account).
1. **Google Workspace Credentials**. You can authenticate your service account credentials directly by uploading a JSON file credentials instead of breaking down the file into different sections for the UI schema. Click **Upload** and select the JSON file that you downloaded in the [Service Account Credentials section](#vendor-configuration).
1. Provide the same **Scope** you defined for your service account during the [Adding OAuth Scope](#adding-oauth-scope) above.
1. The **Query Parameter for Collecting User Data** section provides two options, **Customer** or **Domain Parameter**. See the [Directory API documentation](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/list#query-parameters) from Google for details.
   * **Customer ID**. The unique ID for the customer's Google Workspace account. In the case of a multi-domain account, to fetch all groups for a customer, fill this field instead of domain. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/admin-sdk/directory/v1/reference/users).
   * **Domain**. The domain name. Use this field to get fields from only one domain. To return all domains for a customer account, use the `customer` query parameter instead.
1. **Processing Rules for Logs**. (Optional) Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Google` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Workspace` | Set when **Forward To SIEM** is checked. |
| `_siemDataType` | `Inventory` | Set when **Forward To SIEM** is checked and specific to the API collected. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Google Workspace User Inventory"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| clientEmail | String | Yes | `null` | Provide the Client Email you got in the JSON file after you created service account credentials |  |
| delegatedUserEmail | String | Yes | `null` | Provide the super-administrator email address for the domain that granted access to the service account you created. |  |
| credentialsJson | String | Yes |`null` |Authentication service account's credentials to access Google Workspace Platform. |  |
| scope | String | Yes | `null` | Provide the same Scope you defined for your service account |  |
| queryParam | Boolean | No | true | By default, the Customer parameter is selected with a `CustomerID` value of `my_customer.` To assign a different CustomerID provide the `customerID` parameter. Set to `false` to use the Domain parameter. You need to provide the domain parameter when `false`. |  |
| customerID | String | No | my_customer | The unique ID for the customer's Google Workspace account.| |
| domain | String | No | (except when queryParam is set to false.) | The domain name. Use this field to get fields from only one domain. | |

## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/google-workspace/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/google-workspace/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/google-workspace/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/google-workspace/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
