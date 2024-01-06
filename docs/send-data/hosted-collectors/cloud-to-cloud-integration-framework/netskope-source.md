---
id: netskope-source
title: Netskope Source
sidebar_label: Netskope
tags:
  - cloud-to-cloud
  - netskope
description: The Netskope Source provides a secure endpoint to receive event data from the Netskope API.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/netskope/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/netskope/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/netskope/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/netskope.png')} alt="thumbnail icon" width="75"/>

The Netskope Source provides a secure endpoint to receive event data from the [Netskope API](https://docs.netskope.com/en/get-events-data.html). It securely stores the required authentication, scheduling, and state tracking information.

The following event types are available to collect:

* alert events from `/alerts` are always collected
* application
* audit
* infrastructure
* network
* page

:::note
This source is available in the [Fed deployment](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 sec |  [Event data](https://docs.netskope.com/en/get-events-data.html) |

## Setup

### Vendor configuration

#### Netskope REST API v2

(This API is used by Sumo Logic Netskope source v2.0.0 and later).
Netskope REST APIv2 provides an easy way to extend the Netskope platform to build to use-cases specific to your organization. Endpoints cover key areas such as Events, Alerts, Reports, Clients and more.

To obtain a Netskope REST API v2 auth token, do the following:

1. Log in to Netskope as the Tenant Admin.
1. Go to the API portion of the Netskope, **Settings** > **Tools** > **Rest API v2**.
1. Click "New Token", provide the token name and expiration duration, then add the following endpoints with READ privilege: `/api/v2/events/dataexport/events/alert`, `/api/v2/events/dataexport/events/page`, `/api/v2/events/dataexport/events/infrastructure`, `/api/v2/events/dataexport/events/application`, `/api/v2/events/dataexport/events/network`, `/api/v2/events/dataexport/events/audit`, and `/api/v2/events/data/alert`
1. Copy the token in the next dialog box and save it somewhere as it won't be visible after.

#### Netskope REST API v1 (Deprecated)

:::warning Deprecated
This is used only for Sumo Logic Netskope source v1.3.1 or lower, please upgrade to v2.0.0.
:::

Netskope RESTv1 APIs use an auth token to make authorized calls to the
API. This section demonstrates how to obtain a token from the Netskope
user interface (UI).

To obtain a Netskope auth token, do the following:

1. Login to Netskope as the Tenant Admin.
1. Go to the API portion of the Netskope, **Settings** > **Tools** > **Rest API v1**.
1. Copy the existing token to your clipboard, or you can generate a new token and copy that token.

### Source configuration

When you create a Netskope Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Netskope Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Netskope**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM.
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped. 
1. Enter your Netskope customer specific **Tenant ID**. Do not provide the entire URL, just the Tenant ID.
1. Enter the Netskope **API Token** you want to use to authenticate requests.
1. **Event Types** (Optional). By default, all event types are collected. You can specify certain event types to collect. Click in the text area to view and select from the following options, **All**, **Page**, **Application**, **Infrastructure**, **Audit**, and **Network**. Alerts are always collected. The **All** option indicates you want Page, Application, Infrastructure, and Audit event types collected. If this field is empty all event types are collected.
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Netskope` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Security Cloud` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `<eventType>` | Where eventType is one of the above event types with one exception. If the eventType is audit and the description contains logon/login or logoff/logout the eventType field will be the eventType with the value -logon or -logoff added respectively, such as, audit-logon or audit-logoff. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Netskope"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| tenantID | String | Yes | `null` | Netskope customer specific Tenant ID. Do not provide the entire URL, just the Tenant ID. |  |
| apiToken | String | Yes | `null` | The Netskope API Token you want to use to authenticate requests. |  |
| eventTypes | Array of Strings | No | all | Defines the types of events to collect. Accepted values are all, page, application, infrastructure, audit, and network. Alerts are always collected. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

[Download example](/files/c2c/netskope/example.json)

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

[Download example](/files/c2c/netskope/example.tf)

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::