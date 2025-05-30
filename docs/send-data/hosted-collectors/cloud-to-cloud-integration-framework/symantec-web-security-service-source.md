---
id: symantec-web-security-service-source
title: Symantec Web Security Service Source
sidebar_label: Symantec Web Security Service
tags:
  - cloud-to-cloud
  - symantec-web-security-service
description: The Symantec Web Security Service Source provides a secure endpoint to receive WSS Access logs from the Symantec WSS API.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/symantec-logo.svg')} alt="icon" width="125"/>

The Symantec Web Security Service Source provides a secure endpoint to receive WSS Access logs from the Symantec WSS API. It securely stores the required authentication, scheduling, and state tracking information.

* See the [Access Log Format](https://techdocs.broadcom.com/us/en/symantec-security-software/web-and-network-security/web-security-service/help/wss-reference/accesslogformats-ref.html) for reference.
* Logs are ingested in batches of 1,000.
* Logs are polled every five minutes.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [WSS Access logs](https://techdocs.broadcom.com/us/en/symantec-security-software/web-and-network-security/web-security-service/help/wss-reference/accesslogformats-ref.html) |

## Setup

### Vendor configuration

:::note
You need to configure a WSS agent on the machine you want to collect data from. The WSS agent will collect your access data and the Symantec Web Security Service Source will receive that data using the Symantec WSS API. To configure and install the agent, follow the instructions in the [Web Security Service documentation](https://techdocs.broadcom.com/us/en/symantec-security-software/web-and-network-security/web-security-service/help/conn-matrix/conn-about-wssa.html).
:::

You need to have a Symantec Web Security Service username and password. To create a User API Key that serves as the username and password in the Sync API syntax follow these steps:

1. Navigate to **Account Configuration > API Credentials**.
1. Click **Add API Credentials**.
1. WSS displays the **Add API Credential** dialog, which contains the random characters **Username** and **Password**.<br/> ![Symantec generate api creds.png](/img/send-data/Symantec-generate-api-creds.png)
   1. Copy the **Username** and **Password** keys into a text file.
   1. Select the API **Expiry** you'd like to set.
      * Time-based—You define the date and time when this token expires.
      * Never expires.
   1. For the **Access** option, select **Reporting Access Logs**.
1. Click **Save**.

See [Symantec Security Software documentation](https://techdocs.broadcom.com/us/en/symantec-security-software/web-and-network-security/web-security-service/Help/API_8/api-keys.html) for further details on generating API credentials.

### Source configuration

When you create a Symantec Web Security Service Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Symantec Web Security Service Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Symantec Web Security Service**.<br/> ![symantec source icon.png](/img/send-data/symantec-source-icon.png)
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.<br/> ![Symantec WSS version 1.2.3.png](/img/send-data/Symantec-WSS.png)
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **API Username** and **Password**. Provide the Symantec Web Security Service user credentials you want to use to authenticate collection requests. This was copied during the [Vendor configuration](#vendor-configuration) steps above.
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Symantec` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Web Security Service` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `proxy-messages` | Set when **Forward To SIEM** is checked and specific to the API collected. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Symantec Web Security Service"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| apiUsername | String | Yes | `null` | Provide the username you want to use to authenticate collection requests. |  |
| apiPassword | String | Yes | `null` | Provide the password for the username that you want to use to authenticate collection requests. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/symantec-web-security-service/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/symantec-web-security-service/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
