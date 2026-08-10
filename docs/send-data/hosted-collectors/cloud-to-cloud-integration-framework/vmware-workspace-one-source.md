---
id: vmware-workspace-one-source
title: VMware Workspace One Source
sidebar_label: VMware Workspace One
tags:
    - vmware-workspace-one
description: Collect the device details and corresponding list of applications for the devices from the VMware Workspace One platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/vmware_workspace_one.png')} alt="VMware Workspace ONE logo" width="60" />

VMware Workspace ONE is a comprehensive digital workspace platform that combines unified endpoint management, access management, and application management capabilities. It enables organizations to securely deliver and manage any app on any device, providing a seamless and productive user experience. Workspace ONE empowers IT teams to simplify device management, enhance security, and increase workforce productivity through a unified and integrated process.


The VMware Workspace One source collects the device details and corresponding list of applications for the devices from the VMware Workspace One platform and send them to Sumo Logic.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 24 hours | [Devices](https://cn135.awmdm.com/API/help/Docs/Explore?urls.primaryName=MDM%20API%20V3#/DevicesV3/DevicesV3_SearchAsync) |
| 24 hours | [Device Applications](https://cn135.awmdm.com/API/help/Docs/Explore?urls.primaryName=MDM%20API%20V2#/AppsV2/AppsV2_GetAppListForDevicesAsync) |

## Setup

### Vendor configuration

The VMware Workspace One source supports [O-Auth-based authentication](https://docs.omnissa.com/bundle/WorkspaceONE-UEM-Console-BasicsVSaaS/page/UsingUEMFunctionalityWithRESTAPI.html#create_an_oauth_client_to_use_for_api_commands_saas) and requires you to provide the **Endpoint URL**, **Auth URL**, **Client ID**, and **Client Secret** key to access the data.

#### Endpoint URL

The endpoint URL will be the domain URL of the VMware Workspace console.


#### Auth URL

:::note
VMware is transitioning `*.uemauth.vmwservices.com` domain URLs to legacy status and recommends using the new `*.uemauth.workspaceone.com ` domain URLs instead. The legacy `*.uemauth.vmwservices.com` URLs may be removed in a future update. For more information, see [Workspace ONE domain migration guide](https://kb.omnissa.com/s/article/6001352).
:::

The following table lists the Auth URLs by region. Use the **Auth URL (Recommended)** column for all new and existing configurations. We recommend migrating from the legacy `*.vmwservices.com` URLs to the new `*.workspaceone.com` URLs to avoid any disruption when the legacy URLs are removed.

| Region | Auth URL (Recommended) | Legacy Auth URL (Deprecated) |
|:--|:--|:--|
| All UAT Environments | `https://uat.uemauth.workspaceone.com` | `https://uat.uemauth.vmwservices.com` |
| Australia | `https://apac.uemauth.workspaceone.com` | `https://apac.uemauth.vmwservices.com` |
| Canada | `https://na.uemauth.workspaceone.com` | `https://na.uemauth.vmwservices.com` |
| Germany | `https://emea.uemauth.workspaceone.com` | `https://emea.uemauth.vmwservices.com` |
| Hong Kong | `https://apac.uemauth.workspaceone.com` | `https://apac.uemauth.vmwservices.com` |
| India | `https://apac.uemauth.workspaceone.com` | `https://apac.uemauth.vmwservices.com` |
| Japan | `https://apac.uemauth.workspaceone.com` | `https://apac.uemauth.vmwservices.com` |
| Singapore | `https://apac.uemauth.workspaceone.com` | `https://apac.uemauth.vmwservices.com` |
| United Kingdom | `https://emea.uemauth.workspaceone.com` | `https://emea.uemauth.vmwservices.com` |
| United States | `https://na.uemauth.workspaceone.com` | `https://na.uemauth.vmwservices.com` |

#### Client ID and Client Secret

To generate the Client ID and Client Secret, refer to the [Create an OAuth Client to Use for API Commands (SaaS)](https://docs.omnissa.com/bundle/WorkspaceONE-UEM-Console-BasicsVSaaS/page/UsingUEMFunctionalityWithRESTAPI.html#create_an_oauth_client_to_use_for_api_commands_saas) section.

### Source configuration

When you create a VMware Workspace One Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a VMware Workspace One Source:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu, select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **VMware Workspace One**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and a value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field sent to Sumo Logic does not exist in the Fields schema, it is ignored and considered dropped.
1. **Endpoint URL**. Enter the [VMware Workspace One platform](#vendor-configuration) endpoint URL.
1. **Auth URL**. Enter the API region URL to fetch the auth token collected from the [VMware Workspace One platform](#auth-url). For example, `https://uat.uemauth.workspaceone.com`.
1. **Client ID**. Enter the Client ID of your account collected from the [VMware Workspace One platform](#client-id-and-client-secret). For example, `cfea26d59bd542488ea706b025564d42`.
1. **Client Secret**. Enter the Client Secret key of your account collected from the [VMware Workspace One platform](#client-id-and-client-secret). For example, `E2220271xxxxxxxxxxxxxxxxxxxxx4556634`.
1. (Optional) **Device Type**. Enter the list of device types to collect information.
1. Select the **Collect Apps Details** checkbox to collect the apps' details.
1. When you are finished configuring the Source, click **Submit**.

:::info
After configuring the VMware Workspace One source, consider installing the Sumo Logic app for [VMware Workspace One](/docs/integrations/saas-cloud/vmware-workspace-one/) to visualize and analyze the collected data using prebuilt dashboards and monitor alerts.
:::

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
| requestEndpoint | String | Yes | `null` | The base URL to fetch the data from the VMware Workspace One source. |  |
| authURL | String | Yes | `null` | The API URL to fetch the authentication token from the VMware Workspace One source. | `https://uat.uemauth.workspaceone.com` |
| clientID | String | Yes | `null` | Client ID of your account. | `cfea26d59bd542488ea706b025564d42` |
| clientSecret | String | Yes | `null` | Client Secret of your account. | `E2220271xxxxxxxxxxxxxxxxxxxxx4556634` |
| deviceType | String | No | `null` | Platform type of the device. | `Apple, Android, and/or Windows PC` |
| pollingIntervalVulnerabilityMin | String | Yes | `24 hours` | Time interval (in minutes) after which the source will check for new data.<br/>**Default**: 24 hours<br/>**Minimum**: 12 hours<br/>**Maximum**: 24 hours |  |
| collectAppsDetails | Boolean | No | `False` | Specify if you need to collect the app details. |  |


### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/vmware-workspace-one/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/vmware-workspace-one/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
