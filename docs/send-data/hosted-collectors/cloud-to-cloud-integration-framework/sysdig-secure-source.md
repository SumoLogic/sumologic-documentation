---
id: sysdig-secure-source
title: Sysdig Secure Source
sidebar_label: Sysdig Secure
tags:
  - cloud-to-cloud
  - sysdig-secure
description: The Sysdig Secure Source aims to collect the scan results from the scanner using Sysdig API and send them to Sumo Logic.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/misc/sysdig-logo.png')} alt="icon" width="125"/>

Sysdig Secure is a comprehensive security platform that provides continuous security and compliance monitoring for cloud-native environments. This is designed specifically to address the security needs of modern containerised and Kubernetes infrastructures. Sysdig Secure enables organisations to detect, prevent, and respond to security threats and ensure compliance in real-time.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 24 hours | Runtime Scan Result |
| 5 minutes | Full Scan Result |

:::note Access the API documents
1. Sign in to your Sysdig platform.
1. On the bottom left of the page, click **Secure Operations**.
1. Click **Next Gen API Docs** under the **Help** menu. <br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Sysdig/Sysdig+API+docs.png')} alt="Next-Gen-API-Docs" width="500" />
:::

## Setup

### Vendor configuration

The Sysdig Secure Source supports API token-based authentication and requires you to provide the Sysdig Secure Base URL and API token to access the data.

#### Base URL

The **Base URL** is the Sysdig Secure domain URL that corresponds to the region in which the account is created. For example, `https://api.us2.sysdig.com`.

#### Bearer token

The **Bearer Token** is the API security token used to authenticate with Sysdig HTTP API. Follow the steps below to collect your Sysdig API token:

1. Sign in to the **Sysdig Secure** platform.
1. Select **Settings** from the **User Menu**.
1. In the **Settings** page, select **User Profile** to view the Sysdig Secure API token in the UI.
1. Copy the token or click the **Reset Token** button to generate a new one.

:::info
When a token is reset, the previously issued token will immediately become invalid.
:::

### Source configuration

When you create a Sysdig Secure Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Sysdig Secure Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Sysdig Secure**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema is ignored, known as dropped.
1. **Base URL**. Enter the [Sysdig Secure platform](#base-url) Base URL. For example, `https://api.us2.sysdig.com`.
1. **Bearer Token**. Enter the Sysdig Secure API token collected from the [Sysdig Secure](#bearer-token) platform. For example, `t3fPdsbxxxxxxxxxp4D6hbi4`.
1. (Optional) **Filters**. Click the **+Add** button to define the filters you want to associate. Each filter needs a **Field Name** (key) and **Field Value** (value). For key-value pairs, the length is set to 256 characters and the API accepts a maximum length of 1024 characters for the filter.
1. (Optional) The **Polling Interval** is set for 24 hours by default. You can adjust it upto 168 hours based on your needs.
1. (Optional) **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

:::info
Each detailed log will be broken down into two logs, one for packages and one for vulnerabilities based on the size of the messages. These broken down packages and vulnerabilities logs will be tied with `resultId`, `resourceId`, `assetType`, `metadata`, and `stage` separately and this newly created object will be sent to Sumo Logic.
- `resultId` and `resourceId` will be collected from the **Runtime Result API**.
- `assetType`, `metadata`, and `stage` will be collected from the **Result API**.
:::

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{“type”: “Sysdig Secure”}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the collector or source. Use the boolean field `_siemForward` to enable forwarding to SIEM.| `{"_siemForward": false, "fieldA": "valueA"}` |
| baseURL | String | Yes | `null` | The Sysdig base URL of your region. | `https://api.us2.sysdig.com` |
| apiToken | String | Yes | `null` | The API token of your Sysdig account. | `t3fPdsbxxxxxxxxxp4D6hbi4` |
| filters | Array | No | `null` | An array of key-value pairs to filter the data. For key-value pairs, the length is set to 256 characters and the API accepts a maximum length of 1024 characters for the filter. |  |
| pollingIntervalRuntimeResultHrs | String | Yes | `24 Hours` | This sets how often the source checks for data. <br/>**Default**: 24 hours<br/>**Minimum**: 24 hours<br/>**Maximum**: 168 hours |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/sysdig-secure/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/sysdig-secure/example.tf
```

## Limitation

While ingesting runtime `resultId`, this source supports a maximum of 9,000 active instances of `resultId`. Exceeding this limit may cause the source to return a `FIRST-PARTY-GENERIC` error type.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
