---
id: dragos-source
title: Dragos Source
sidebar_label: Dragos
tags:
    - Dragos
description: Collect address, asset, vulnerability, and zone details from the Dragos API and send them to Sumo Logic.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/dragos/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/dragos/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/dragos/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/dragos-logo.png')} alt="dragos-logo" width="80" />

Dragos is a cybersecurity platform with an ecosystem tailored for industrial environments, including Industrial Control Systems (ICS), Supervisory Control and Data Acquisition (SCADA), Distributed Control System (DCS), and Operational Technology (OT) environments.
Dragos's Operational Technology (OT) offers clear visibility into your Industrial Control System (ICS) assets and communications. It monitors networks, detects threats, and addresses vulnerabilities without causing disruptions or shutdowns, helping you respond confidently to potential threats.

The Dragos source collects address, asset, vulnerability, and zone details from the Dragos API and sends it to Sumo Logic for streamlined analysis.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min | Vulnerability |
| 24 hrs | Addresses |
| 24 hrs | Zones |
| 24 hrs | Assets |

## Setup

### Vendor configuration

The Dragos source supports API token-based authentication and requires you to provide the **Endpoint URL**, **API ID**, and **API Secret** to access the data.

#### Endpoint URL

You can use the Hostname to create the Endpoint URL. For example, `https://<hostname>/`.

#### API ID and API Secret

Follow the instructions below to generate the API ID and API Secret:

1. Open the Dragos platform and navigate to the **Admin** > **User**.
1. Click **ADD NEW API KEY** under the **API Keys** section.
1. Enter the name of the API Key in the **Name** field and then click **GENERATE KEY**.
1. Copy the **API ID** and **API Secret**.

### Source configuration

When you create a Dragos Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Dragos Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Dragos**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema is ignored, known as dropped.
1. Enter the **Endpoint URL** of Dragos platform. For example, `https://test.cxc.dragos.cloud/`.
1. Enter the following details for authorization:
    1. **API ID**. API ID of your account. For example, `036fxxxx-b642-xxxx-99d3-fcxxxx2exxxx`.
    1. **API Secret**. API Secret of your account. For example, `xxxU1TxxxxxxxxKSJwHYOpK37xxxxxxxxrEHAkU91xxxxxxxxxFrrJ06xxx`.
1. Check the following boxes to collect the required data:
    1. **Collect Vulnerability**
    1. **Collect Addresses**
    1. **Collect Zones**
    1. **Collect Assets**
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Dragos"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the collector or source. Use the boolean field _siemForward to enable forwarding to SIEM.| `{"_siemForward": false, "fieldA": "valueA"}` |
| requestEndpoint | String | Yes | `null` | The API URL to fetch the data from the Dragos log source. | `https://sumologic-dragos.cxc.dragos.cloud/` |
| apiID | String | Yes | `null` | API ID of your account for authorization. | `036fxxxx-b642-xxxx-99d3-fcxxxx2exxxx` |
| apiSecret | String | Yes | `null` | API Secret of your account for authorization. | `xxxU1TxxxxxxxxKSJwHYOpK37xxxxxxxxrEHAkU91xxxxxxxxxFrrJ06xxx` |
| pollingIntervalVulnerabilityMin | String | Yes | `5 mins` | Time interval (in minutes) after which the source will check for new data for API.
Default: 5 min
Min: 5 min
Max: 60 min |  |
| pollingIntervalAddressesHour | String | Yes | `24 hrs` | Time interval (in hours) after which the source will check for new data for API.
Default: 24 hrs
Min: 12 hrs
Max: 24 hrs |  |
| pollingIntervalZonesHour | String | Yes | `24 hrs` | Time interval (in hours) after which the source will check for new data for API.
Default: 24 hrs
Min: 12 hrs
Max: 24 hrs |  |
| pollingIntervalAssetsHour | String | Yes | `24 hrs` | Time interval (in hours) after which the source will check for new data for API.
Default: 24 hrs
Min: 12 hrs
Max: 24 hrs |  |
| collectAddressDetails | Boolean | No | `True` | Specify if you need to collect the address details. |  |
| collectZoneDetails | Boolean | No | `True` | Specify if you need to collect the zone details. |  |
| collectDeviceDetails | Boolean | No | `True` | Specify if you need to collect the assets details. |  |
| collectVulnerabilityDetails | Boolean | No | `True` | Specify if you need to collect the vulnerability details. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/dragos/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/dragos/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::


