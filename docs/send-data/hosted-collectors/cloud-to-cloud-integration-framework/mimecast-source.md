---
id: mimecast-source
title: Mimecast Source
sidebar_label: Mimecast
tags:
  - cloud-to-cloud
  - mimecast
description: The Mimecast source collects SIEM, DLP, Audit, and Hold Message List data from the Mimecast API.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/mimecast/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/mimecast/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/mimecast/example.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/Mimecast-icon.png')} alt="icon" width="50"/>

The Mimecast Source supports collecting SIEM, DLP, Audit, and Hold Message List data from the [Mimecast API](https://developer.services.mimecast.com/apis). It securely stores the required authentication, scheduling, and state tracking information.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [SIEM Logs](https://developer.services.mimecast.com/docs/threatssecurityeventsanddataforcg/1/routes/v1/siem/events/cg/get) |
| 5 min |  [DLP Logs](https://developer.services.mimecast.com/docs/securityevents/1/routes/api/dlp/get-logs/post) |
| 5 min |  [Audit Events](https://developer.services.mimecast.com/docs/auditevents/1/routes/api/audit/get-audit-events/post) |
| 5 min |  [Hold Message List](https://developer.services.mimecast.com/docs/cloudgateway/1/routes/api/gateway/get-hold-message-list/post) |

## Setup

### Vendor configuration

To configure the integration, you must use a Client ID and Secret Key. Additionally, the user account associated with your Mimecast credentials must have `basic administrator` access.

Refer to the [Mimecast documentation](https://developer.services.mimecast.com/api-overview#application-registration-credential-management) for guidance to create the Client ID and Client Secret key.

:::note
Enhanced logging needs to be enabled on the Mimecast side in order for the expected logs to be created and sent to Sumo Logic via the above channels. See [Understanding SIEM Logs](https://integrations.mimecast.com/documentation/tutorials/understanding-siem-logs/) in the Mimecast documentation. 
:::

### Source configuration

When you create a Mimecast Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Mimecast Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Mimecast**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped. 
1. **Client ID**. Enter the Client ID of the app. Refer to the [Mimecast documentation](https://developer.services.mimecast.com/api-overview#application-registration-credential-management) for guidance to create the Client ID.
1. **Client Secret**. Enter the Client Secret key of the app. Refer to the [Mimecast documentation](https://developer.services.mimecast.com/api-overview#application-registration-credential-management) for guidance to create the Client Secret.
1. **Supported API to collect**. Select the type of Mimecast data source that you want to collect.
1. **Processing Rules for Logs (Optional)**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Mimecast` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Mimecast` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `receipt, process, delivery, jrnl, dlp, or ttp` | The SIEM event ID is populated by the suffix of the file name, which references the log type. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Mimecast"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| clientID | String | Yes | `null` | Client Id for your Mimecast app. |  |
| clientSecret | String | Yes | `null`| Secret Key for your Mimecast app. |  |
| dataCollection | String | Yes |  | Supported API. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/mimecast/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/mimecast/example.tf" target="_blank">Download example</a>

## Troubleshooting

After configuring your source, you should check the status of the source in the **Collectors** page > **Status** column. If the source is not functioning as expected, you may see an error next to the Source Category column as shown below: 

**Error Code**: `401` <br />
**Error Details**:
```
{
    "error": "Client credentials are invalid"
}
```

To resolve these errors:
- Make sure correct **Client ID or Secret Key** is used to configure the source.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
