---
id: crowdstrike-filevantage-source
title: CrowdStrike FileVantage Source
sidebar_label: CrowdStrike FileVantage
tags:
  - cloud-to-cloud
  - crowdstrike-filevantage
description: Learn how to collect file integrity monitoring logs from the CrowdStrike FileVantage platform.
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/crowdstrike-filevantage/example.json';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="85"/>

The CrowdStrike FileVantage source will collect CrowdStrike FileVantage logs by querying the API for file changes resource IDs. It will then make another API call using those resource IDs to obtain the file changelogs and ingest them into Sumo Logic.

:::important
The CrowdStrike API documentation is not public and can only be accessed by partners or customers.
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 15 minutes |  [highVolumeQueryChanges Endpoint](https://www.falconpy.io/Service-Collections/FileVantage.html#highvolumequerychanges) - Retrieves log resource IDs|
| 15 minutes |  [getChanges Endpoint](https://www.falconpy.io/Service-Collections/FileVantage.html#getchanges) - Retrieves file changelogs from resource IDs from previous endpoint|


## Setup

### Vendor configuration

**Prerequisites**

To collect file integrity monitoring data from the CrowdStrike platform, you must have an authorized CrowdStrike account. CrowdStrike APIs use an OAuth 2.0 authorization token to make authorized API calls. The CrowdStrike API client is required to get the OAuth 2.0 authorization token. To define a CrowdStrike API client, you must be designated as a `CrowdStrike Falcon Administrator` role.

In this configuration, you will set up the CrowdStrike FileVantage and configure it to be authorized and authenticated to collect logs from the FileVantage API. To obtain the auth token, you will need the following parameters.

#### API Client and API Secret

The **API security token** is used to authenticate with CrowdStrike FileVantage API. After successfully creating the API client, you will get the **Client Id**, **Client Secret**, and **Base URL**.

To get the **CrowdStrike API Client**, follow the steps below:
1. Access the [CrowdStrike Platform](https://falcon.crowdstrike.com/login/).
1. Sign in using your email address and password. After you've completed the two-factor authentication, you'll be directed to the application dashboard.
1. From the CrowdStrike console, select the **Support and resources** option from the menu.
1. In the **Resources and tools** section, select the **API clients and keys** option. You can then view existing clients or add new API clients from there.
1. Click **Add new API client**. You will be prompted to give a descriptive name and select the appropriate API scopes.
1. Provide a proper name and description and select the **Falcon FileVantage:read** scope. Click on `ADD` to complete the process.
1. After you click on `ADD` a dialogue box will appear with the **Client ID**, **Client Secret** and **Base URL**. Copy and save the Client Id, Client Secret and Base URL to a folder location because you will need them when creating the [CrowdStrike FileVantage source](#source-configuration).

#### Region

Identify your **Region** based on your **Base URL**. The region can be selected from the list below.

   | Region | Base URL                    |
   | :------ | :-------------------------- |
   | US-1    | https://api.crowdstrike.com |
   | US-2    | https://api.us-2.crowdstrike.com  |
   | EU-1    | https://api.eu-1.crowdstrike.com  |
   | US-GOV-1    | https://api.laggar.gcw.crowdstrike.com |

### Source configuration

When you create a CrowdStrike FileVantage Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the CrowdStrike FileVantage Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **CrowdStrike FileVantage** icon.
1. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **CrowdStrike Base URL**, choose the region as per your Base URL. See [Region](#region) section to know your region.
1. In **API Client ID**, enter the Client ID you generated and secured from the [API Client](#api-client-and-api-secret) section.
1. In **API Client Secret**, enter the Client Secret you generated and secured from the [API Secret](#api-client-and-api-secret) section.
1. (Optional) The **Polling Interval** is set for 15 minutes default, you can adjust it based on your needs.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [How to Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"CrowdStrike FileVantage"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| base_url | String | Yes | `null` | The API base url for the region of your CrowdStrike account. |  |
| client_id | String | Yes | `null` | The CrowdStrike Client ID you want to use to authenticate collection requests. |  |
| client_secret | String | Yes |  `null`| The CrowdStrike Client Secret you want to use to authenticate collection requests. |  |
| pollingInterval | String | No | 15m | This sets how often the Source checks for data. The polling interval value should be atleast one minute. |  |

## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/crowdstrike-filevantage.md/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/crowdstrike-filevantage.md/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/crowdstrike-filevantage.md/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/crowdstrike-filevantage.md/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>


### Limitation

- This source supports a maximum of 65000 resourceIDs. Exceeding this resourceIDs limit may cause the source to return a `FIRST-PARTY-GENERIC` error type.
