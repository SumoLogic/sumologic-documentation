---
id: smartsheet-source
title: Smartsheet Source
sidebar_label: Smartsheet
keywords:
  - smartsheet
  - cloud-to-cloud
description: Learn how to collect events from Smartsheet platform.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/smartsheet/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/smartsheet/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/smartsheet/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/smartsheet.png')} alt="thumbnail icon" width="55"/>

Smartsheet is used to collaborate on project timelines, documents, calendars, tasks, and other works. Smartsheet integrates and connects with many of the systems teams use today. This allows for efficient information sharing, improved collaboration, and decision-making across teams’ tech stack. The Smartsheet source collects and ingests the events that are occurring in your Smartsheet organization account. Examples of events are creation, update, load, and delete of sheets, reports, dashboards, attachments, and users.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| User entered |  [List Events](https://smartsheet.redoc.ly/tag/events/#operation/list-events) |

## Setup

### Vendor configuration

To collect data from Smartsheet, you need a Smartsheet account with admin privileges that would allow the creation of an app via a developer account. See [steps in the Smartsheet documentation](https://smartsheet.redoc.ly/#section/OAuth-Walkthrough/First-Steps) to create a developer account in Smartsheet.

### Source configuration

When you create a Smartsheet source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure Smartsheet Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Smartsheet** icon.
1. Enter a **Name** to display for the source in the Sumo Logic web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **Application (client) ID**, paste in the Client ID from the vendor's setup "Create a Developer Account and Register an App" steps.
1. In **Client Secret**, paste in the Client Secret from the vendor's setup "Create a Developer Account and Register an App" steps.
1. In **Oauth 2.0 Authorization Code**, paste in the Authorization Code from the vendor's setup "Create a Developer Account and Register an App" steps.
1. **Polling Interval**. You have the option to select how often to poll for events in minutes. Default is 10 minutes.
1. When you are finished configuring the source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Smartsheet"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`\ |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| app_client_id | String | Yes | `null` | The Smartsheet app client ID to collect from Smartsheet platform. |  |
| client_secret | String | Yes | `null` | The Smartsheet app client secret to collect from Smartsheet platform. |  |
| authorization_code | String | Yes | `null` | The Smartsheet app client OAuth2 authorization code to collect from Smartsheet platform. |  |
| polling_interval | Integer | Yes | 10 | How frequently the integration should poll to Smartsheet. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/smartsheet/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/smartsheet/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
