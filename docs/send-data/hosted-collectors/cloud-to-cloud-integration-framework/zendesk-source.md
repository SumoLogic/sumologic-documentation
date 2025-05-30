---
id: zendesk-source
title: Zendesk Source
sidebar_label: Zendesk
tags:
  - cloud-to-cloud
  - zendesk
description: Learn how to collect audit logs using the Zendesk API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/zendesk-icon.png')} alt="Zendesk-icon" width="70" />

Zendesk is widely used across various industries, including technology, retail, healthcare, education, financial services, and many more. This platform is vital for its ease of use, scalability, and ability to integrate with other business tools and applications. The audit log shows various changes in the Zendesk account since the account was created. Records of these changes are saved indefinitely, and you can view the entire change history. This source collects the audit logs from the Zendesk API and ingests them into Sumo Logic.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Audit logs](https://developer.zendesk.com/api-reference/ticketing/account-configuration/audit_logs/) |

## Setup

### Vendor configuration

The Zendesk source requires you to provide the API Token. To generate the API token, refer to the [Zendesk documentation](https://support.zendesk.com/hc/en-us/articles/4408889192858-Managing-access-to-the-Zendesk-API#topic_tcb_fk1_2yb).

### Source configuration

When you create a Zendesk Source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Zendesk Source, follow the steps below:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Zendesk**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Base URL**. Enter the Base URL value `https://{subdomain}.zendesk.com`. Replace `subdomain` with your subdomain value. For example, `https://unityd.zendesk.com`.
1. **Email Address**. Enter your Zendesk account email address.
1. **API Token**. Enter the **API Token** for authorization collected from the [Zendesk platform](#vendor-configuration).
1. The **Polling Interval** is set for 5 minutes by default. You can adjust it based on your needs. This sets how often the Source checks for new data.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [How to Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for more details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Zendesk"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| baseURL | String | Yes | `null` | Your Zendesk instance domain.  |  |
| emailId | String | Yes | `null` | Email Address of your account. |  |
| apiToken | String | Yes | `null` | API Token created for your account in the Zendesk Admin center. |  |
| pollingInterval | Integer | No | `5 minutes` | Choose how often the Source checks for new data (In minutes). |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/zendesk/example.json
```

### Terraform example

```hcl reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/zendesk/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
