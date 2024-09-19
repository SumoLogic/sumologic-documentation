---
id: snowflake-sql-api-source
title: Snowflake SQL API Source
sidebar_label: Snowflake SQL API
keywords:
  - snowflake
  - snowflake-sql-api
description: Learn how to collect metrics from Snowflake SQL aggregation queries.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/snowflake-sql-api/example.json';
import MetricsSchemaJSON from '!!raw-loader!/files/c2c/snowflake-sql-api/metrics_schema.json';
import MetricsExampleJSON from '!!raw-loader!/files/c2c/snowflake-sql-api/metrics_example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/snowflake-sql-api/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/snowflake-sql-api/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/snowflake.png')} alt="thumbnail icon" width="150"/>

The Snowflake SQL API source can be used to execute SQL queries with aggregation fields and translate the results to metrics. This source only collects metrics and does not currently collect any log data.

## Data collected
Customers can provide custom SQL queries for the source to execute and a configuration to translate the results to custom metrics data.

## Setup

### Vendor configuration

To collect metric data from the Snowflake SQL API, you must have an authorized Snowflake account. We suggest setting up a dedicated user account with the correct permissions for accessing the SQL tables with the data you are interested in collecting.

1. Create a user account with the correct permissions for accessing the SQL tables you plan to query.
1. Take note of your admin account identifier following the instructions [here](https://docs.snowflake.com/en/user-guide/admin-account-identifier). The identifier should look something like this: `wp00000.us-east-2.aws`.
1. Take note of the database name you plan to query.
1. Optional additional information such as a role, warehouse, or schema name can also be configured with the source.

### Source configuration

When you create a Snowflake SQL API source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the Snowflake SQL API Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Snowflake SQL API** icon.
1. Enter a **Name** to display for the source in the Sumo Logic web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **Snowflake Username**, enter your Snowflake account username
1. In **Snowflake Password**, enter the Snowflake account password associated with your user.
1. In **Snowflake Account Identifier**, enter your Snowflake account identifier obtained from the vendor configuration above. The identifier should look something like this: `wp00000.us-east-2.aws`.
1. In **Snowflake Database**, enter your Snowflake database. Separate sources are required to query separate databases.
1. In **SQL Statement Metric Configuration**, upload a JSON file containing the SQL queries to execute, their polling interval, and additional configuration for translating the results to metrics.
1. In (Optional) **Snowflake Role**, provide a database role if required
1. In (Optional) **Snowflake Warehouse**, provide a database warehouse name if required
1. In (Optional) **Snowflake Schema**, provide a database schema name if required
1. When you are finished configuring the source, click **Save**.

### Metrics JSON Configuration
This source requires you upload a JSON configuration containing the details for which SQL queries to execute, the polling interval for how often to execute each query, and additional configuration for translating the results into metrics using the Prometheus format. 

:::note
This metrics JSON file is not the entire source configuration. It is a separate JSON config file that specifically directs the C2C which queries should be executed, how often, and how to translate the results into metric data. You can use the JSON schema provided below to validate the file you upload matches the structure the C2C expects with any JSON schema validator website such as [https://jsonschema.dev](https://jsonschema.dev/).
:::

:::note
The metric format used by this source is Prometheus. All metric and labels must follow the [Prometheus naming convention](https://prometheus.io/docs/concepts/data_model/). The source will validate this on start up and will stop if validation fails.
:::

Here is the schema expected from this JSON file:
<CodeBlock language="json">{MetricsSchemaJSON}</CodeBlock>

Here is a small example with one SQL statement with multiple metrics. Notice the `where` clause in the SQL statement matches the poll interval.
<CodeBlock language="json">{MetricsExampleJSON}</CodeBlock>

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter  | Type        | Value                                         | Required | Description                      |
|:-----------|:------------|:----------------------------------------------|:---------|:---------------------------------|
| schemaRef  | JSON Object | `{"type":"Snowflake SQL API"}`                | Yes      | Define the specific schema type. |
| sourceType | String      | `"Universal"`                                 | Yes      | Type of source.                  |
| config     | JSON Object | [Configuration object](#configuration-object) | Yes      | Source type specific values.     |

### Configuration Object

| Parameter | Type   | Required | Default | Description                                                                                                                                                                                               | Example      |
|:----------|:-------|:---------|:--------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------|
| name      | String | Yes      | `null`  | Type a desired name of the source. The name must be unique per collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the collector or source. | |
| username | String | Yes | `null` | Your Snowflake user account. |  |
| password | String | Yes | `null` | Your Snowflake user password. |  |
| accountIdentifier | String | Yes | `null` | Your Snowflake admin account identifier. | `wp00000.us-east-2.aws` |
| database | String | Yes | `null` | Your Snowflake database name. | `SNOWFLAKE` |
| MetricConfigSection | String | Yes | `null` | A stringified JSON of the metrics configuration. | See above documentation for examples. |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/snowflake-sql-api/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/snowflake-sql-api/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
