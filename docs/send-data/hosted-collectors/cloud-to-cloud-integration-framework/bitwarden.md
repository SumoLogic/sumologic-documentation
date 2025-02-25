---
id: bitwarden-source
title: Bitwarden Source
sidebar_label: Bitwarden
tags:
  - cloud-to-cloud
  - bitwarden
description: Learn how to collect event logs from the Bitwarden API.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/bitwarden/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/bitwarden/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/bitwarden/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/bitwarden.png')} alt="thumbnail icon" width="250"/>

The Bitwarden source collects event logs from their API. Many fields in the event log contain unique IDs, making it difficult to interpret the logs without contextual names. To enhance readability, this integration queries the group, member, and policy API endpoints before each poll cycle, ensuring up-to-date lookup information for event log IDs. The event log is then enriched with additional fields, such as group names, member names, member emails, and policy types.

## Data collected

| API Endpoint       | Data                                                                                                                                                           |
|:-------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/public/events`   | Ingests the events logs into Sumo Logic                                                                                                                        |
| `/public/groups`   | Gets the group names so we can include it in the event log data. The integration does not ingest logs directly from this endpoint.                      |
| `/public/members`  | Gets the member names and email addresses so we can include it in the event log data. The integration does not ingest logs directly from this endpoint. |
| `/public/policies` | Gets the policy type so we can include it in the event log data. The integration does not ingest logs directly from this endpoint.                      |

## Setup

### Vendor configuration

**Prerequisites**

To collect event logs from the Bitwarden API, you must have a Bitwarden Enterprise account. The integration uses OAuth 2.0 Client Credentials. Follow the authentication [instructions in the authentication section of the public API page](https://bitwarden.com/help/public-api/). 

:::important
If you are using a Self-Hosted installation, you must also provide your OAuth Token URL. For more details, see [Bitwarden's documentation](https://bitwarden.com/help/public-api/).
:::

### Source configuration

When you create a Bitwarden Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the Bitwarden Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Bitwarden** icon.
1. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **Bitwarden API Server Base URL**, enter the API Base URL for your Bitwarden installation.
1. (Optional) In **Self Hosted API Base URL**, enter the API Base URL for your Self-Hosted Bitwarden installation. This field is only available if you select `Self-Hosted` for the server base URL.
1. (Optional) In **OAuth 2.0 Token Url**, enter the OAuth 2.0 Token URL for your Self-Hosted Bitwarden installation. This field is only available if you select `Self-Hosted` for the server base URL.
1. In **OAuth 2.0 Client ID**, enter your Bitwarden OAuth 2.0 Client ID.
1. In **OAuth 2.0 Client Secret**, enter your Bitwarden OAuth 2.0 Client Secret.
1. (Optional) The **Polling Interval** is set for 15 minutes default, you can adjust it based on your needs.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [How to Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter  | Type        | Value                                         | Required | Description                      |
|:-----------|:------------|:----------------------------------------------|:---------|:---------------------------------|
| schemaRef  | JSON Object | `{"type":"Bitwarden"}`                        | Yes      | Define the specific schema type. |
| sourceType | String      | `"Universal"`                                 | Yes      | Type of source.                  |
| config     | JSON Object | [Configuration object](#configuration-object) | Yes      | Source type specific values.     |

### Configuration Object

| Parameter   | Type        | Required | Default | Description                                                                                                                                                                                                                              | Example                                       |
|:------------|:------------|:---------|:--------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------|
| name        | String      | Yes      | `null`  | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`.                                | `"Bitwarden C2C"`                             |
| description | String      | No       | `null`  | Type a description of the source.                                                                                                                                                                                                        | `"My Bitwarden event log collection"`         |
| category    | String      | No       | `null`  | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"bitwarden/eventlogs"`                       |
| fields      | JSON Object | No       | `null`  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.                                                                                          | `{"_siemForward": false, "fieldA": "valueA"}` |
| api_base_url             | String      | Yes         | `https://api.bitwarden.com` or ``https://api.bitwarden.eu` or `self-hosted`                      | The API Base URL for your Bitwarden installation. Use `self-hosted` here if you have a self-hosted Bitwarden installation.                                                                                                                                                             |
| api_self_base_url        | String      | Potentially | `https://your.domain.com/api`                    | Your self-hosted Bitwarden base URL.                                                                                                                                                                   |                                               |
| api_self_oauth_token_url | String      | Potentially | `https://your.domain.com/identity/connect/token` | Your self-hosted BitWarden OAuth token URL.                                                                                                                                                                                              |                                               |
| api_client_id            | String      | Yes         | `null`                                           | The Bitwarden OAuth 2.0 Client ID to use to authenticate requests.                                                                                                                                                                       |                                               |
| api_client_secret        | String      | Yes         | `null`                                           | The Bitwarden OAuth 2.0 Client Secret to use to authenticate requests.                                                                                                                                                                   |                                               |
| polling_interval         | String      | No          | `15m`                                            | This sets how often the Source checks for data. The polling interval value should be at 5 minutes.                                                                                                                                       |                                               |


### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/bitwarden/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/bitwarden/example.tf" target="_blank">Download example</a>
