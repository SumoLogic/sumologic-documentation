---
id: c2c-source  #example: druva-source
title: C2C Source #example: Druva Source
image: 'https://app_icons.s3.amazonaws.com/dropbox.svg' #replace with your app logo
sidebar_label: C2C Template #example: Druva
tags:
  - cloud-to-cloud
  - c2c-source  #example: Druva
description: Description goes here. #example: Learn how to configure the Druva Cloud-to-Cloud Source in your Sumo Logic environment.
---

import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<img src={useBaseUrl('path-to-your-icon.png')} alt="Thumbnail icon" width="45"/>

\Itroduction\

The {{source name}} collects {{data/event types}} from {{source of origin}}. {{What the app does}}.

Example: The Microsoft Graph Security API Source provides a secure endpoint to consume alerts from the Microsoft Graph Security API endpoint. It securely stores the required authentication, scheduling, and state tracking information. One threat event is reported for each affected device.

\Depending on the availability in the Fed, add the below note.\

:::note
This source is **not** yet available in the [Fed deployment](https://help.sumologic.com/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Data collected

\Add all the data sources and respective pollig iterval information\

| Polling Interval | Data |
| :--- | :--- |
| {{Polling time in minutes}} | {{Data sources}} | 

Example:
| Polling Interval | Data |
| --- | --- |
| 5 min |  [Team Events](https://www.dropbox.com/developers/documentation/http/teams#team_log-get_events)


## Setup

### Vendor configuration

#### Prerequisites

\NOTE: This section doesn't apply to all sources; use only where needed\
  
Example: You'll need a Dropbox App Key, App Secret, and Access Code to provide to Sumo Logic. To generate these credentials, ....

\Insert steps to configure the Source in the Vendor UI\

Example: https://help.sumologic.com/docs/c2c/dropbox/#vendor-configuration

### Source configuration

\Insert steps to configure the Source in the Sumo Logic UI\

Example: https://help.sumologic.com/docs/c2c/dropbox/#source-configuration

## Metadata fields

\Insert meta deta fields in the Sumo Logic UI. Update the below table accordingly.\

| Field | Value | Description |
| :--- | :--- | :--- |
| {{`field`}} | {{value}} | {{Description}} |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for more details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"/*c2c-name*/"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration parameters](#config-object) | Yes | Source type specific values. |

### Config Object

\Add information about the configuration parameters. Update the below table accordingly.\

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| {{`Parameter`}} | {{Type}} | {{Yes/No}} | `null` | {{Description}} |  {{Example}} |

### JSON example

\Create and add the JSON config in the dropbox and import it here.\

<CodeBlock language="json">component-name</CodeBlock>

[Download example](file-path)


### Terraform example

\Create and add the Terraform config in the dropbox and import it here.\

<CodeBlock language="json">component-name}</CodeBlock>

[Download example](file-path)

## Troubleshooting

\This section doesn't apply to all sources; use only where needed\

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud to Cloud sources.
:::
