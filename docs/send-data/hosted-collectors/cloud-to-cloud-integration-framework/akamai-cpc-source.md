---
id: akamai-cpc-source
title: Akamai CPC Source
sidebar_label: Akamai CPC
tags:
  - cloud-to-cloud
  - akamai-cpc
description: Learn how to fetch CPC-Configs, CPC-Alerts, and CPC-Alert Details from the Akamai platform and send it to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/akamai.svg')} alt="Thumbnail icon" width="90"/>

Akamai Client-Side Protection and Compliance (CPC) is a security solution designed to monitor and protect against client-side threats such as JavaScript-based data skimming and formjacking. It provides visibility into third-party script behavior and enforces security policies to ensure compliance with data protection standards.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 12 hours |  CPC-Configs |
| 5 minutes |  CPC-Alerts |

## Setup

### Vendor configuration

You'll need a **Host Name**, **Client Token**, **Client Secret**, and **Access Token**. To generate these, follow these steps:

- **Host Name**. The Akamai API base URL used to sending authenticated requests.
- Refer to the [Akamai Documentation](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials) to generate **Client Token**, **Client Secret**, and **Access Token**.

### Source configuration

When you create an Akamai CPC Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Akamai CPC Source:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Akamai CPC**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="green check circle.png" width="20"/> A green circle with a checkmark is shown when the field exists in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="orange exclamation point.png" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored (that is, dropped).
1. **Client Token**. Enter the Client token value collected from the Akamai platform.
1. **Client Secret**. Enter the Client secret value collected from the Akamai platform.
1. **Access Token**. Enter the Access token value collected from the Akamai platform.
1. **API Host Name**. Enter the API Host Name value collected from the Akamai platform.
1. (Optional) **Collect Alert Logs**. Select this checkbox to collect the alert logs from the Akamai platform.
    1. (Optional) **Supported Severity Level**. Select the severity of the alert logs from the dropdown.
    1. (Optional) **Supported Alert Type**. Select the type of alerts from the dropdown.
    1. (Optional) **Supported Alert Status**. Select the status of the alerts from the dropdown.
1. (Optional) **Collect Alert Details**. Select this checkbox to collect the alert details from the Akamai platform.
1. The **CPC Configs Polling Interval** is set to 12 hours by default, you can adjust it based on your needs.
1. (Optional) **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

## JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Akamai CPC"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:---|:---|:---|:---|:---|:---|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| clientToken | String | Yes | `null` | A unique identifier used to authenticate API requests. |  |
| clientSecret | String | Yes | `null` | User account secret which will be used in authentication. |  |
| accessToken | String | Yes | `null` | Token granting access to the Akamai CPC API on behalf of a client. |  |
| akamaiHostName | String | Yes | `null` | The base URL of the Akamai API endpoint used to interact with CPC services. |  |
| collectAlertsLogs | Boolean | No | `null` | Specify if we need to collect the alert logs. |  |
| severityLevel | String Array | No | `null` | Specify the alert logs severity |  |
| alertType | String Array | No | `null` | Specify the type of alerts. |  |
| alertStatus | String Array | No | `null` | Specify the status of the alerts. |  |
| pollingIntervalAlertsMin | Integer | No | `5 minutes` | Time interval (in minutes) after which the source will check for new data.<br/>**Minimum**: 5 minutes<br/>**Maximum**: 60 minutes |  |
| collectAlertDetails | Boolean | No | `false` | Specify if we need to collect the alert details. |  |
| pollingIntervalCPCConfigsHrs | Integer | Yes | `12 hours` | Time interval (in minutes) after which the source will check for new data.<br/>**Minimum**: 1 hour<br/>**Maximum**: 24 hours |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/akamai-cpc/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/akamai-cpc/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
