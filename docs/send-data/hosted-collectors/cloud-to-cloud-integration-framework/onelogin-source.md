---
id: onelogin-source
title: OneLogin Source
sidebar_label: OneLogin
tags:
  - cloud-to-cloud
  - onelogin-source
description: Learn how to collect the users list from the OneLogin API and send it to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/onelogin.png')} alt="logo" width="100" />

OneLogin is a leading identity and access management (IAM) provider that offers secure, centralized access to applications and devices through single sign-on (SSO) and multi-factor authentication (MFA). Its cloud-based platform integrates with a wide range of applications, simplifying IT operations, enhancing security, and supporting compliance. OneLogin also provides tools for provisioning, lifecycle management, and directory synchronization to streamline user administration.

## Data collected

The data will be collected from the OneLogin database using the following log:

| Polling Interval | Data |
| :--- | :--- |
| 24 hours | [Users List](https://developers.onelogin.com/api-docs/2/users/list-users) |

## Setup

### Vendor configuration

The OneLogin source requires you to provide the **Account URL**, **Client ID**, and **Client Secret** to set up the integration.

#### Subdomain

The subdomain is the account URL used to retrieve the source data from the OneLogin API. For example, `https://{subdomain}.onelogin.com`. [Learn more](https://developers.onelogin.com/api-docs/2/getting-started/dev-overview) to obtain the subdomain URL.

#### Client ID and client secret

To generate the client ID and client secret, see [Creating an API Credential Pair](https://developers.onelogin.com/api-docs/2/getting-started/working-with-api-credentials).

Once you have all the required values, set up the source configuration to collect your desired log types available in the configuration section.

### Source configuration

When you create a OneLogin source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a OneLogin source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **OneLogin**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but isn’t present or enabled in the schema, it’s ignored and marked as **Dropped**.
1. **Sub Domain**. Enter your [subdomain URL](#vendor-configuration).
1. **Client ID**. Enter your [client ID](#vendor-configuration).
1. **Client Secret**. Enter your [client secret](#vendor-configuration).
1. **Polling Interval**. The polling interval is set for 24 hours by default and can be configured from a minimum of 1 hour to a maximum of 24 hours. You can adjust it based on your needs. This sets how often the source checks for new data.
1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{“type”: “OneLogin”}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| subDomain | String | Yes | `null` | The base URL to fetch the data from the OneLogin API. | `https://{subdomain}.onelogin.com` |
| clientId | String | Yes | `null` | The client identifier of your account. |  |
| clientSecret | String | Yes | `null` | The client secret of your account. |  |
| pollingInterval | Integer | Yes | `24 hours` | Time interval (in hours) after which the source will check for new data. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/onelogin/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/onelogin/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
