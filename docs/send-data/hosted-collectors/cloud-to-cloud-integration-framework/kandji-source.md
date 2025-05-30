---
id: kandji-source
title: Kandji Source
sidebar_label: Kandji
tags:
  - cloud-to-cloud
  - kandji-edr
description: The Kandji Source provides a secure endpoint to receive threat details, devices list, device activities, device details, and device app information from the Kandji platform.
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/kandji/example.json';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/kandji-logo.png')} alt="icon" width="50"/>

Kandji is the Apple device management and security platform that empowers secure and productive global work. With Kandji, Apple devices transform themselves into enterprise-ready endpoints, with all the right apps, settings, and security systems in place. Through advanced automation and thoughtful experiences, Kandji brings much-needed harmony to the way IT, InfoSec, and Apple device users work.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Threat Details](https://api-docs.kandji.io/#d041043a-ea47-47d5-b6f1-234ef422494d) |
| 12 hours |  [List Devices](https://api-docs.kandji.io/#78209960-31a7-4e3b-a2c0-95c7e65bb5f9) |
| 12 hours |  [Device Activities](https://api-docs.kandji.io/#80710108-fbdb-4dfd-af84-50adf15c5a23) |
| 12 hours |  [Device Details](https://api-docs.kandji.io/#efa2170d-e5f7-4b97-8f4c-da6f84ba58b5) |
| 12 hours |  [Device Apps](https://api-docs.kandji.io/#f8cd9733-89b6-40f0-a7ca-76829c6974df) |

## Setup

### Vendor configuration

The Kandji source requires you to provide the Endpoint URL and Bearer Token. Follow the below steps to generate the required values:

- To generate the **Endpoint URL**, follow the instructions mentioned in the [Kandji documentation](https://api-docs.kandji.io/#intro).
- To generate the **Bearer Token**, follow the instructions mentioned in the [Kandji documentation](https://support.kandji.io/support/solutions/articles/72000560412-kandji-api).

### Source configuration

:::note
- Threat Details endpoint is only available for EDR customers.
- For iPhone and iPad, the preinstalled Apple device apps will not be reported.
:::

:::info
While retrieving threats, the source can face data loss due to API limitations and improper pagination support. If you face any such discrepancies, contact [Sumo Logic Support](https://support.sumologic.com/support/s/).
:::

When you create a Kandji Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure Kandji Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select the **Kandji** icon.
1. Enter a **Name** to display for the Source in Sumo Logic. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **Endpoint URL**, enter the endpoint URL collected from the Kandji platform.
1. In **Bearer Token**, enter the bearer token collected from the Kandji platform.
1. Select the **Collect Threat Details** checkbox to collect threat data. By default, **Collect Threat Details** checkbox will be selected.
1. The **Threat Details Interval** is set for 5 minutes by default. You can adjust it based on your needs.
1. In the Devices section, select the type of devices data: **Collect Devices**, **Collect Device Activities**, **Collect Device Details**, and/or **Collect Device Apps**.
1. The **Devices Interval** is set for 12 hours hours by default. You can adjust it based on your needs.
1. **Processing Rules**. Configure any desired filters, such as allowlist, deny list, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Kandji"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| requestEndpoint | String | Yes | `null` | The API URL to fetch the data from the Kandji EDR log source. | `https://SubDomain.api.kandji.io` |
| bearerToken | String | Yes | `null` | API Token created for the user account in the Kandji portal. |  |
| pollingIntervalMin | Integer | Yes | 5 mins | Time interval (in minutes) after which the source will check for new data for API: Threat Details. |  |
| pollingIntervalHour | Integer | Yes | 12 hours | Time interval (in hours) after which the source will check for new data for API: List Devices, Collect Activities, and Collect Details. |  |
| collectThreatDetails | Boolean | No | `null` | Specify if we need to collect the tenant's threat details. |  |
| collectDevices | Boolean | No | `null` | Specify if we need to collect the tenant's devices. |  |
| collectDeviceActivities | Boolean | No | `null` | Specify if we need to collect the Device activity of the tenant. |  |
| collectDeviceDetails | Boolean | No | `null` | Specify if we need to collect the Device details of the tenant. |  |
| collectDeviceApps | Boolean | No | `null` | Specify if we need to collect the Device apps of the tenant. |  |

## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/kandji/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/kandji/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/kandji/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/kandji/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
