---
id: jfrog-xray-source
title: JFrog Xray Source
sidebar_label: JFrog Xray
tags:
  - cloud-to-cloud
  - jfrog
  - xray
description: Learn how to collect data from the JFrog Xray platform.
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/jfrog-xray/example.json';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/jfrog.png')} alt="thumbnail icon" width="85"/>

Our JFrog Xray source collects JFrog Xray violations by querying the API for new policy violations when they occur.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 minutes |  [Get Violations Endpoint](https://jfrog.com/help/r/xray-rest-apis/get-violations)|


## Setup

### Vendor configuration

Make sure that you've set up Xray's policies correctly. This source will capture violation logs triggered by those policies. To configure this source, you'll need the domain of your JFrog instance and your JFrog username/password. We recommend creating a dedicated user account specifically for this purpose.

### Source configuration

When you create a JFrog Xray Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the JFrog Xray Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select the **JFrog Xray** icon.
1. Enter a **Name** to display for the Source in Sumo Logic. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **JFrog Base URL**, enter your JFrog instance domain (for example, `https://acme.jfrog.io`).
1. In **HTTP Basic Auth Username**, enter your JFrog username you created.
1. In **HTTP Basic Auth Password**, enter your JFrog password you created.
1. In **Collect Violation Details**, only toggle this on if you need the full violation details. This will require 1 extra API call per violation log.
1. (Optional) The **Polling Interval** is set for 5 minutes by default. You can adjust it based on your needs.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [How to Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"JFrog Xray"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| base_url | String | Yes | `null` | Your JFrog instance domain. | `"https://acme.jfrog.io"` |
| username | String | Yes | `null` | Your JFrog account username. | `"sumo-collection"` |
| password | String | Yes |  `null`| Your JFrog account password. |  |
| collect_violation_details | Boolean | No |  `false`| This will require 1 extra API call per violation log. |  |
| pollingInterval | String | No | 5m | This sets how often the Source checks for data. | `"30m"` |

## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/jfrog-xray.md/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/jfrog-xray.md/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/jfrog-xray.md/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/jfrog-xray.md/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
