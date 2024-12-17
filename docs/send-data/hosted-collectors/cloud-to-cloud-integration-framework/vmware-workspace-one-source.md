---
id: vmware-workspace-one-source
title: VMware Workspace One Source
sidebar_label: VMware Workspace One
tags:
    - vmware-workspace-one
description: Collect the device details and corresponding list of applications for the devices from the VMware Workspace One platform.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/vmware-workspace-one/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/vmware-workspace-one/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/vmware-workspace-one/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/vmware_workspace_one.png')} alt="vmware-workspace-one-logo" width="60" />

VMware is a leading software company specializing in virtualization and cloud technologies. It offers solutions that enhance IT infrastructure, streamline operations, and improve efficiency across various industries.


The VMware Workspace One source collects the details of the devices and the corresponding applications of each device and send them to Sumo Logic.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 24 hours | [Devices](https://cn135.awmdm.com/API/help/Docs/Explore?urls.primaryName=MDM%20API%20V3#/DevicesV3/DevicesV3_SearchAsync) |
| 24 hours | [Device Applications](https://cn135.awmdm.com/API/help/Docs/Explore?urls.primaryName=MDM%20API%20V2#/AppsV2/AppsV2_GetAppListForDevicesAsync) |

## Setup

### Vendor configuration

The VMware Workspace One source supports [O-Auth-based authentication](https://docs.omnissa.com/bundle/WorkspaceONE-UEM-Console-BasicsVSaaS/page/UsingUEMFunctionalityWithRESTAPI.html#create_an_oauth_client_to_use_for_api_commands_saas) and requires you to provide the **Endpoint URL**, **Auth URL**, **Client ID**, and **Client Secret** key to access the data.

#### Endpoint URL

The integration requires the configuration of the VMware Workspace One request endpoint URL, which will be the domain URL of the VMware Workspace console.

Sample Values are:
- `https://as135.awmdm.com`
- `https://techp.awmdm.com`

#### Auth URL

The integration requires the configuration of the VMware Workspace One Authentication domain.

VMware Workspace One API Regions are:

| Region | Auth URL |
|:--|:--|
| All UAT Environment | `https://uat.uemauth.vmwservices.com/connect/token` |
| Australia | `https://apac.uemauth.vmwservices.com/connect/token` |
| Canada | `https://na.uemauth.vmwservices.com/connect/token` |
| Germany | `https://emea.uemauth.vmwservices.com/connect/token` |
| Hong Kong	 | `https://apac.uemauth.vmwservices.com/connect/token` |
| India | `https://apac.uemauth.vmwservices.com/connect/token` |
| Japan | `https://apac.uemauth.vmwservices.com/connect/token` |
| Singapore | `https://apac.uemauth.vmwservices.com/connect/token` |
| United Kingdom | `https://emea.uemauth.vmwservices.com/connect/token` |
| United States | `https://na.uemauth.vmwservices.com/connect/token` |

#### Client ID and Client Secret

Follow the steps mentioned under the [Create an OAuth Client to Use for API Commands (SaaS)](https://docs.omnissa.com/bundle/WorkspaceONE-UEM-Console-BasicsVSaaS/page/UsingUEMFunctionalityWithRESTAPI.html#create_an_oauth_client_to_use_for_api_commands_saas) section to generate the Client ID and Client Secret.

### Source configuration

When you create a VMware Workspace One Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a VMware Workspace One Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **VMware Workspace One**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema is ignored, known as dropped.
1. **Endpoint URL**. Enter the [VMware Workspace One platform](#vendor-configuration) endpoint URL. For example, `https://as135.awmdm.com`.
1. **Auth URL**. Enter the API URL to fetch the auth token collected from the [VMware Workspace One platform](#vendor-configuration). For example, `https://uat.uemauth.vmwservices.com`.
1. **Client ID**. Enter the Client ID of your account collected from the [VMware Workspace One platform](#vendor-configuration). For example, `cfea26d59bd542488ea706b025564d42`.
1. **Client Secret**. Enter the Client Secret key of your account collected from the [VMware Workspace One platform](#vendor-configuration). For example, `E2220271xxxxxxxxxxxxxxxxxxxxx4556634`.
1. (Optional) **Device Type**. Enter the list of device types to collect their information.
1. Select the **Collect Apps Details** checkbox to collect the apps details.
1. When you are finished configuring the Source, click **Submit**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"VMware Workspace One"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the collector or source. Use the boolean field `_siemForward` to enable forwarding to SIEM.| `{"_siemForward": false, "fieldA": "valueA"}` |
| requestEndpoint | String | Yes | `null` | The base URL to fetch the data from the VMware Workspace One source. | `https://as135.awmdm.com` |
| authURL | String | Yes | `null` | API URL to fetch the auth token from the VMware Workspace One source. | `https://uat.uemauth.vmwservices.com` |
| clientID | String | Yes | `null` | Client ID of your account. | `cfea26d59bd542488ea706b025564d42` |
| clientSecret | String | Yes | `null` | Client Secret of your account. | `E2220271xxxxxxxxxxxxxxxxxxxxx4556634` |
| deviceType | String | No | `null` | Platform type of the device. | `Apple, Android, WindowsPC` |
| pollingIntervalVulnerabilityMin | String | Yes | `24 hours` | Time interval (in minutes) after which the source will check for new data for API.<br/>**Default**: 24 hours<br/>**Minimum**: 12 hours<br/>**Maximum**: 24 hours |  |
| collectAppsDetails | Boolean | No | `False` | Specify if you need to collect the app details. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/vmware-workspace-one/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/vmware-workspace-one/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::