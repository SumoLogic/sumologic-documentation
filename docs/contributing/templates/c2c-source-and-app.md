---
id: c2c-source-and-app #example: druva-source
title: App name #example: Druva
image: 'https://app_icons.s3.amazonaws.com/dropbox.svg' #replace with your app logo
sidebar_label: App Template #example: Druva
tags:
  - cloud-to-cloud
  - c2c-source #example: Druva-source
  - app-doc #example: Druva
description: Description goes here. #example: Learn how to configure, install, and view the Druva dashboards in your Sumo Logic environment.
---

import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<img src={useBaseUrl('path-to-your-icon.png')} alt="Thumbnail icon" width="45"/>

\Introduction\

The `{{source name}}` collects `{{data/event types}}` from `{{source of origin}}`. 

Example: The Microsoft Graph Security API Source provides a secure endpoint to consume alerts from the Microsoft Graph Security API endpoint. It securely stores the required authentication, scheduling, and state tracking information. One threat event is reported for each affected device.

The Sumo Logic app for `{{app name}}` enables you to track `{{What the app does}}`.

Example: The Sumo Logic app for Asana enables you to track user sign in activities, detect data access and export, and identify changes to security settings and user roles.

`{{Key features of the app}}`

\Depending on the availability in the Fed, add the below note.\

:::note
This source is **not** yet available in the [Fed deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Data collected

\Add all the data sources and respective polling interval information\

| Polling Interval | Data |
| :--- | :--- |
| `{{Polling time in minutes}}` | `{{Data sources}}` |

Example:

| Polling Interval | Data |
| --- | --- |
| 5 min |  [Team Events](https://www.dropbox.com/developers/documentation/http/teams#team_log-get_events)

### Sample log messages

```json title="example"
Enter the log message in json format with the title.
```

### Sample queries

```sql title="example"
Enter the log message in sql format with the title.
```

## Setup

To set up Cloud-to-Cloud Integration /source name/ Source for the /app name/ app, follow the instructions provided. These instructions will guide you through the process of creating a source using the /source name/ Source category, which you will need to use when installing the app. By following these steps, you can ensure that your /app name/ app is properly integrated and configured to collect and analyze your /app name/ data.

### Vendor configuration

#### Prerequisites

\NOTE: This section doesn't apply to all sources; use only where needed\

Example: You'll need a Dropbox App Key, App Secret, and Access Code to provide to Sumo Logic. To generate these credentials, ....

\Insert steps to configure the Source in the Vendor UI\

Example: https://help.sumologic.com/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/dropbox-source/#authentication

### Source configuration

\Insert steps to configure the Source in the Sumo Logic UI.\

Example: https://help.sumologic.com/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/dropbox-source/#create-a-dropboxsource

#### Metadata fields

\Insert metadata fields in the Sumo Logic UI. Update the below table accordingly.\

| Field | Value | Description |
| :--- | :--- | :--- |
| `{{field}}` | `{{value}}` | `{{Description}}` |

#### JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [How to Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for more details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"/*c2c-name*/"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration parameters](#config-object) | Yes | Source type specific values. |

#### Config object

\Add information about the configuration parameters. Update the below table accordingly.\

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| `{{Parameter}}` | `{{Type}}` | `{{Yes/No}}` | `null` | `{{Description}}` |  `{{Example}}` |

#### JSON example

\Create and add the JSON config in the dropbox and import it here.\

<CodeBlock language="json">component-name</CodeBlock>

#### Terraform example

\Create and add the Terraform config in the dropbox and import it here.\

<CodeBlock language="json">component-name</CodeBlock>

### Troubleshooting

\This section doesn't apply to all sources; use only where needed\

### FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::

## Installing the /app name/ app

\Reuse the below content\

import FilterDashboards from '../../reuse/filter-dashboards.md';

<FilterDashboards/>

## Viewing /app name/ dashboards

\Reuse the below content\

import AppInstall from '../../reuse/apps/app-install.md';

<AppInstall/>

### /Dashboard name/

\<Copy, paste, and fill in this dashboard section for each dashboard. Enter a dashboard description from above.\> Use this dashboard to:

* Enter a list of features. Example below.

Use this dashboard to:

* Monitor high severity threats and scan attacks.
* Review \<fill in\> for troubleshooting configuration issues.
* Understand how to fine-tune \<fill in your product name\> based on \<fill in panel names\>.

<img src='https:///Dashboard-S3-link.png' style={{border: '1px solid black'}} alt="Dashboard-name" />
