---
id: abnormal-security-source
title: Abnormal Security Source
sidebar_label: Abnormal Security
tags:
  - cloud-to-cloud
  - abnormal-security
description: Learn how to collect abnormal threat and case logs from the Abnormal Security source.
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/abnormal-security-logo.png')} alt="abnormal-security-logo" width="90" />

Abnormal Security is a behavioral AI-based email security platform that learns the behavior of every identity in a cloud email environment and analyzes the risk of every event to block the most sophisticated attacks.

The Abnormal Security integration ingests threat data and case data identified by the abnormal threat log and cases using the [Abnormal Security API](https://app.swaggerhub.com/apis-docs/abnormal-security/abx/1.4.1).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Threat ID](https://app.swaggerhub.com/apis-docs/abnormal-security/abx/1.4.1#/Threats/get_threats)|
| 5 min |  [Threat Details](https://app.swaggerhub.com/apis-docs/abnormal-security/abx/1.4.1#/Threats/get_threats__threatId_)|
| 5 min |  [Cases](https://app.swaggerhub.com/apis-docs/abnormal-security/abx/1.4.1#/Cases/get_cases)|

## Setup

### Vendor configuration

The Abnormal Security source requires you to provide an authentication token. To obtain the token, follow the steps below.
1. Sign in to the [Abnormal Security](https://portal.abnormalsecurity.com/) platform.
1. In the **Manage** section, click on the **Settings** option.
1. In the **Settings** section, click on the **Integrations** option.<br/><img src={useBaseUrl('img/send-data/abnormal-settings.png')} alt="abnormal-settings" style={{border: '1px solid gray'}} width="300" />
1. Scroll down to the **Additional Integrations** section and click **+ Connect** on the **Abnormal REST API** card to display an integration page for your organization.<br/><img src={useBaseUrl('img/send-data/additional-integrations.png')} alt="additional-integrations" style={{border: '1px solid gray'}} width="200" />
1. In the **IP Safelist** field, enter the [IP addresses](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/#static-ip-addresses) for your deployment.<br/><img src={useBaseUrl('img/send-data/integrations.png')} alt="integrations" style={{border: '1px solid gray'}} width="800" />
1. Copy and save the **Access token**.

### Source configuration

When you create an Abnormal Security Source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Abnormal Security Source, follow the steps below:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Abnormal Security**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema, it is ignored, also known as dropped.
1. Enter the **Access Token** for authorization collected from the [Abnormal Security platform](#vendor-configuration).
1. Additionally, if you like to collect the case data, enter **cases** in the **Supported APIs to collect** section. Threat data will be collected by default. But, if you like to collect only case data, you can unselect **threats** from the **Supported APIs to collect** section.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Abnormal Security"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:---|:---|:---|:---|:---|:---|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| accessToken | String | Yes | `null`| Access token used to retrieve abnormal threats. |  |
| datacollection | array | Yes | `threats`| List of APIs to fetch the data from. | `threats, cases` |

## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/abnormal-security/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/abnormal-security/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/abnormal-security/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/abnormal-security/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>
