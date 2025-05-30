---
id: snowflake-logs-source
title: Snowflake Logs Source
sidebar_label: Snowflake Logs
tags:
  - cloud-to-cloud
  - snowflake-logs
description: Learn how to collect the row data from the supported global tables (QUERY_HISTORY, LOGIN_HISTORY, SESSIONS, GRANTS_TO_USERS, DATA_TRANSFER_HISTORY, STAGES, and Custom Events) and send it to Sumo Logic.
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/snowflake-logs/example.json';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/snowflake.png')} alt="logo" width="150" />

Snowflake is a leading cloud data platform known for its scalable, innovative data warehousing, and analytics solutions. It provides organizations with reliable and flexible tools to support data-driven decision-making. Snowflake enables seamless access to essential tables, allowing you to efficiently retrieve data, monitor key metrics, optimize data management processes, and enhance visibility and control over your Snowflake environment.

## Data collected

The data will be collected from Snowflake's database using the connection string from the following log types and their respective tables:

| Polling Interval | Data |
| :--- | :--- |
| 5 minutes | Query History Logs |
| 5 minutes | Security Logs |
| 5 minutes | Custom Event Logs |

## Setup

### Vendor configuration

The Snowflake Logs source requires you to provide the following data to setup the integration:

- **Account Identifier**. An account identifier uniquely identifies a Snowflake account within your organization, as well as throughout the global network of Snowflake-supported cloud platforms and cloud regions. For more information, see [Account identifiers](https://docs.snowflake.com/en/user-guide/admin-account-identifier).
- **Username**. Snowflake account's login username. For example, `SUMOLOGIC`.
- **Password**. Snowflake account's login password. For example, `yufncixxxxxxxxxp55hbdy7`.

Once you have all the required values, set up the source configuration to collect your desired log types available in the configuration section.

### Source configuration

When you create a Snowflake Logs source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Trend Micro source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Trend Micro**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Snowflake Username**. Enter your Snowflake login [username](#vendor-configuration).
1. **Snowflake Password**. Enter your Snowflake login [password](#vendor-configuration).
1. **Snowflake Account Identifier**. Enter your Snowflake account [name](#vendor-configuration).
1. **Log Types**. Select the types of logs you want to collect data from:
    - **Collect Query History Logs**. For example, `SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY`.
    - **Collect Security Logs**. For example, `SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY`, `SNOWFLAKE.ACCOUNT_USAGE.SESSIONS`, `SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_USERS`, `SNOWFLAKE.ACCOUNT_USAGE.DATA_TRANSFER_HISTORY`, and `SNOWFLAKE.ACCOUNT_USAGE.STAGES`.
    - **Collect Custom Event Logs (Format: DATABASE.SCHEMA.TABLE)**. Your custom event tables. For example, `DATABASE.SCHEMA.TABLE`.
        :::note
        The Snowflake Custom Events feature does not support timestamps with time zones when storing generated data in custom tables. Consequently, data is stored according to the Snowflake account's current time zone. Changing the account's time zone after a source has been configured to collect custom events can lead to data duplication or loss. Therefore, it is recommended not to change the time zone setting once the source has been configured to collect custom events.
        :::
1. **Polling Interval**. The polling interval is set for 5 minutes by default and can be configured to a maximum of 60 minutes. You can adjust it based on your needs. This sets how often the source checks for new data.
1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Snowflake Logs"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| userName | String | Yes | `null` | Snowflake account login username. | `SUMOLOGIC` |
| password | String | Yes | `null` | Snowflake account login password. | `yufncixxxxxxxxxp55hbdy7` |
| accountIdentifier | String | Yes | `null` | Snowflake account name. | `qabbxxr-hj65789` |
| collectQueryHistory | Boolean | No | `false` | The boolean value to collect the query history tables. | `SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY` |
| collectSecurity | Boolean | No | `false` | The boolean value to collect the security tables. | - `SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY`<br/>- `SNOWFLAKE.ACCOUNT_USAGE.SESSIONS`<br/>- `SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_USERS`<br/>- `SNOWFLAKE.ACCOUNT_USAGE.DATA_TRANSFER_HISTORY`<br/>- `SNOWFLAKE.ACCOUNT_USAGE.STAGES` |
| collectEventTable | Boolean | No | `false` | The boolean value to collect the custom event tables. | `DATABASE.SCHEMA.TABLE` |
| customEventTables | String | No | `null` | List of custom table names from which the data should be collected. |  |
| pollingInterval | Integer | Yes | `5 minutes` | Time interval (in minutes) after which the source will check for new data. |  |

## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/snowflake-logs/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/snowflake-logs/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/snowflake-logs/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/snowflake-logs/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
