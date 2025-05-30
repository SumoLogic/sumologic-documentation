---
id: carbon-black-inventory-source
title: Carbon Black Inventory Source
sidebar_label: Carbon Black Inventory
tags:
    - carbon-black-inventory
    - cloud-to-cloud
description: The Carbon Black Inventory Source provides a secure endpoint to receive data from the CB Devices API.
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/carbon-black-inventory/example.json';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/vmcarecb.png')} alt="thumbnail icon" width="55"/>

The Carbon Black Inventory Source provides a secure endpoint to receive data from the [CB Devices API](https://developer.carbonblack.com/reference/carbon-black-cloud/platform/latest/devices-api/). It securely stores the required authentication, scheduling, and state tracking information.

[See how inventory data is used in Cloud SIEM](/docs/cse/records-signals-entities-insights/view-manage-entities.md).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 10 hours |  [Device data](https://developer.carbonblack.com/reference/carbon-black-cloud/platform/latest/devices-api/) |

## Setup

### Vendor configuration

To grant access to your data you'll need to provide credentials from Carbon Black. The Carbon Black Inventory Source requires an API key with `Custom` access that has `read` rights to the Devices API, specifically the `General Information` permission.

### Source configuration

When you create a Carbon Black Inventory Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Carbon Black Inventory Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Carbon Black Inventory**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata.md) is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **CB Cloud Domain**. Enter your Carbon Black domain, such as `dev-prod05.conferdeploy.net`. See [this knowledge base article](https://community.carbonblack.com/t5/Knowledge-Base/Carbon-Black-Cloud-What-URLs-are-used-to-access-the-api/ta-p/67346) to determine which domain to use.
1. **API Key**. Enter the Carbon Black API Key you want to use to authenticate requests. Ensure the key is granted the required permissions for all the APIs listed in the [Vendor configuration](#vendor-configuration) section.
1. **API ID**. Enter your Carbon Black API ID correlated to your API key.
1. **Org Key**. Enter your Carbon Black Org key, found in your Carbon Black product console under **Settings > API Access > API Keys.**
1. The **Polling Interval** is set to 300 seconds by default, you can adjust it based on your needs.
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemDataType` | `Inventory` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Inventory` | Set when **Forward To SIEM** is checked. |
| `_siemVendor` | `CarbonBlack` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Carbon Black Inventory"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

The following table shows the **config** parameters for a Carbon Black Inventory Source.

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| domain | String | Yes |  `null` | Enter your Carbon Black Cloud domain, such as: `dev-prod05.conferdeploy.net`. See this [knowledge base article](https://community.carbonblack.com/t5/Knowledge-Base/Carbon-Black-Cloud-What-URLs-are-used-to-access-the-api/ta-p/67346) to determine which domain to use. |  |
| api_key | String | Yes |  `null` | The Carbon Black Cloud API Key you want to use to authenticate requests. Ensure the key is granted the required permissions for all the APIs. |  |
| api_id | String | Yes |  `null` | The Carbon Black Cloud API ID correlated to your API key. |  |
| org_key | String | Yes |  `null` | Your Carbon Black Cloud Org key, found in your Carbon Black product console under Settings > API Access > API Keys. |  |
| pollingInterval | Integer | No |  300 | This sets how many seconds the Source checks for new data. The default is 60 seconds. |  |

## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/carbon-black-inventory/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/carbon-black-inventory/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/carbon-black-inventory/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/carbon-black-inventory/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
