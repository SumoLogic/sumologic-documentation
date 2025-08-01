---
id: cato-networks-source
title: Cato Networks Source
sidebar_label: Cato Networks
tags:
    - cato-networks
description: Learn how to configure the Cato Networks Source Cloud-to-Cloud connector for Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/cato-logo.png')} alt="cato logo" width="50"/>

Cato Networks is a cloud-native, global SD-WAN provider that delivers a secure, optimized, and agile global network for businesses of all sizes. Cato's cloud-based platform converges multiple network and security functions into a unified solution that includes SD-WAN, network security, cloud security, and secure access service edge (SASE) capabilities.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min | [Security events](https://support.catonetworks.com/hc/en-us/articles/360019839477-Cato-API-EventsFeed-Large-Scale-Event-Monitoring) |
| 5 min | [Audit events](https://support.catonetworks.com/hc/en-us/articles/360017900857-Cato-API-AuditFeed) |

## Setup

### Vendor configuration

In this configuration, you will set up the Cato Networks API Key and Account ID parameter to access the Cato networks API.

- In the Cato Management Application, only account administrators with the **Editor** privilege can generate keys. (CMA).
- To ingest security events, you must enable the events feeds on your account. To enable the events feed, follow the steps below:
    1. In the navigation panel, select **System > API Access Management**.
    1. Select **Event Feed Enabled**. After this, your account starts sending events to the Cato API server. <br/><img src={useBaseUrl('img/send-data/cato-networks-enable-events-feed.png')} alt="cato-networks-enable-events-feed.png" width="700" />

#### API Key

All access to Cato networks require an API Key. Follow the below instructions to set up an API Key.

1. In the navigation menu, click **Administration > API Management**. <br/><img src={useBaseUrl('img/send-data/cato-networks-administration.png')} alt="cato-networks-administration.png" width="700" />
1. On the **API Keys** tab, click **New**. The **Create API Key** panel opens.
1. Enter a **Key Name**. <br/><img src={useBaseUrl('img/send-data/cato-networks-new-api-key.png')} alt="cato-networks-new-api-key.png" width="250" />
1. Select **View** in the **API Permission**.
1. Select **Any IP** to allow this API key for any IP address under the **Allow Access from IPs** section.
1. (Optional) Select a date when the API key expires. If you select an expiration date, then you need to update the source configuration with a new API key, or else an unauthorized error will be received.
1. Click **Apply**. The API key is added, and a pop-up window containing the new API key is displayed.
1. Copy the API Key generated by the Cato Management Application and save it in a secure location.
   :::note
   The API key value will not be available after closing this window. Kindly ensure that you copy and securely save the API key before closing the window.
   :::
1. Click **OK** to close the pop-up window.

#### Account ID

All API calls require an account ID parameter. When logged into the Cato account, look for a four-digit integer in the URL and take note of the account ID. . <br/><img src={useBaseUrl('img/send-data/cato-networks-account-id.png')} alt="cato-networks-account-id.png" width="700" />

### Source configuration

When you create an Cato Networks Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Cato Networks Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Cato Networks**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="green check circle.png" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="orange exclamation point.png" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. Enter the **API Key** for Cato Networks account.
1. Enter the **Account ID** for Cato Networks account.
1. Select the **Data Types**. You can select one or both of the data sources.
   - If **All** is selected, the integration will fetch both security and audit events. By default, **All** will be selected.
   - If **Security Events** is selected, the integration will fetch security data.
   - If **Audit Events** is selected, the integration will fetch audit data.
1. When you are finished configuring the Source, click **Save**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemParser` | `/Parsers/System/Cato Networks/Cato Networks` | Set when **Forward To SIEM** is checked. |

## JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration parameters](#configuration-object) of the Source. | na |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Cato Networks"}` for Cato Networks Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Cato Networks Source. | not modifiable |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| accountID | String | Yes | `null` | Account ID of the account. |  |
| apikey | String | Yes | `null` | API key of the account. |  |
| dataTypes | String Array | Yes | `null` | Select the datatype for which you want to ingest data. Possible values are All, Security Events or Audit Events.|  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/cato-networks/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/cato-networks/example.tf
```


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
