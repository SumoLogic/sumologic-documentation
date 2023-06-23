---
id: carbon-black-inventory-source
title: Carbon Black Inventory Source
sidebar_label: Carbon Black Inventory
description: The Carbon Black Inventory Source provides a secure endpoint to receive data from the CB Devices API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/vmcarecb.png')} alt="thumbnail icon" width="55"/>

The Carbon Black Inventory Source provides a secure endpoint to receive data from the [CB Devices API](https://developer.carbonblack.com/reference/carbon-black-cloud/platform/latest/devices-api/). It securely stores the required authentication, scheduling, and state tracking information.

[See how inventory data is used in Cloud SIEM Enterprise](/docs/cse/records-signals-entities-insights/view-manage-entities.md).

## Authentication

To grant access to your data you'll need to provide credentials from Carbon Black. The Carbon Black Inventory Source requires an API key with `Custom` access that has `read` rights to the Devices API, specifically the `General Information` permission.

## States

A Carbon Black Inventory Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing [Health Events](/docs/manage/health-events.md).

A Carbon Black Inventory Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Carbon Black.
1. **Collecting**. The Source is actively collecting data from Carbon Black.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.<br/> ![Carbon Black Defense error.png](/img/send-data/Carbon-Black-Defense-error.png)

Hover your mouse over the status icon to view a tooltip with details on the detected issue. <br/>  ![health error generic.png](/img/send-data/health-error-generic.png)

## Create a Carbon Black Inventory Source

When you create a Carbon Black Inventory Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Carbon Black Inventory Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Select **Carbon Black Inventory**.<br/>  ![cb inventory icon.png](/img/send-data/cb-inventory-icon.png)
1. Enter a **Name** for the Source. The description is optional.<br/> ![CB inventory create pane.png](/img/send-data/CB-inventory-create-pane.png)
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata.md) is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM Enterprise](/docs/cse). When configured with the **Forward to SIEM** option the following metadata fields are set:
    * `_siemVendor`: CarbonBlack
    * `_siemProduct`: Inventory
    * `_siemFormat`: JSON
    * `_siemDataType`: Inventory
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **CB Cloud Domain**. Enter your Carbon Black domain, such as `dev-prod05.conferdeploy.net`. See [this knowledge base article](https://community.carbonblack.com/t5/Knowledge-Base/Carbon-Black-Cloud-What-URLs-are-used-to-access-the-api/ta-p/67346) to determine which domain to use.
1. **API Key**. Enter the Carbon Black API Key you want to use to authenticate requests. Ensure the key is granted the required permissions for all the APIs listed in the [Authentication](#authentication) section.
1. **API ID**. Enter your Carbon Black API ID correlated to your API key.
1. **Org Key**. Enter your Carbon Black Org key, found in your Carbon Black product console under **Settings > API Access > API Keys.**
1. The **Polling Interval** is set to 300 seconds by default, you can adjust it based on your needs.
1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue, it's tracked by [Health Events](/docs/manage/health-events.md). The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required? | Description | Access |
|:--|:--|:--|:--|:--|
| config | JSON Object  | Yes | Contains the [configuration parameters](#config-parameters) for the Source. |   |
| schemaRef | JSON Object  | Yes | Use `{"type":"Carbon Black Inventory"}` for a Carbon Black Inventory Source. | not modifiable |
| sourceType | String | Yes | Use `Universal` for a Carbon Black Inventory Source. | not modifiable |

#### Config Parameters

The following table shows the **config** parameters for a Carbon Black Inventory Source.

| Parameter | Type | Required |  Description | Access |
|:--|:--|:--|:--|:--|
| `name` | String | Yes	 | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | modifiable |
| `description` | String | No |  Type a description of the Source. | modifiable |
| `category` | String | No |  Type a category of the source. This value is assigned to the metadata field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `domain` | String | Yes | Enter your Carbon Black Cloud domain, such as, `dev-prod05.conferdeploy.net`. See this [knowledge base article](https://community.carbonblack.com/t5/Knowledge-Base/Carbon-Black-Cloud-What-URLs-are-used-to-access-the-api/ta-p/67346) to determine which domain to use. | modifiable |
| `api_key` | String | Yes | The Carbon Black Cloud API Key you want to use to authenticate requests. Ensure the key is granted the required permissions for all the APIs listed in the above [Authentication section](/docs/send-data/use-json-configure-sources). | modifiable |
| `api_id` | String | Yes | The Carbon Black Cloud API ID correlated to your API key. | modifiable |
| `org_key` | String | Yes | Your Carbon Black Cloud Org key, found in your Carbon Black product console under Settings > API Access > API Keys. | modifiable |
| `pollingInterval` | Integer | No | This sets how many seconds the Source checks for new data. The default is 60 seconds. | modifiable |

Carbon Black Inventory Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Carbon Black Inventory"
    },
    "state":{
      "state":"Collecting"
    },
    "config":{
      "api_id":"********",
      "name":"CB Inv E",
      "domain":"defense.conferdeploy.net",
      "org_key":"ABCDEFG1",
      "polling_interval":600,
      "api_key":"********",
      "fields":{
        "_siemForward":false
      },
      "category":"c2c/cb_inv"
    },
    "sourceType":"Universal"
  }
}
```
