---
id: sophos-central-source
title: Sophos Central Source
sidebar_label: Sophos Central
description: The Sophos Central Source provides a secure endpoint to receive authentication logs from the Sophos Central APIs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/sophos.jpeg')} alt="icon" width="60"/>

The Sophos Central Source provides a secure endpoint to receive authentication logs from the [Sophos Central APIs](https://developer.sophos.com/). It securely stores the required authentication, scheduling, and state tracking information.

The Sophos Central Source ingests:
 * Alerts from the Sophos [Alerts API Endpoint](https://developer.sophos.com/docs/common-v1/1/routes/alerts/get).
    * Endpoint data is consumed for alerts with a product value of type `endpoint` from the Sophos [Endpoint API](https://developer.sophos.com/docs/endpoint-v1/1/routes/endpoints/get).
 * Events from the Sophos [Events API Endpoint](https://developer.sophos.com/docs/siem-v1/1/routes/events/get)

:::note
To link the endpoint data to the alert, you can map the `alert.ManagedAgent.ID` field from the alert response with the `endpointID` field from the endpoint response.
:::
:::note
This Source is not available in the [Fed deployment](/docs/api/troubleshooting#Deployments-and-Sumo-Logic-Endpoints).
:::

## States

A Sophos Central Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing [Health Events](/docs/manage/health-events).

A Sophos Central Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Sophos Central.
1. **Collecting**. The Source is actively collecting data from Sophos Central.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the [Health](/docs/manage/health-events#collection-page) and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events) to investigate issues with collection.

![sophos health error icon.png](/img/send-data/sophos-health-error-icon.png)

Hover your mouse over the status icon to view a tooltip with details on the detected issue.

![health error generic.png](/img/send-data/health-error-generic.png)

## Prerequisite

This setup requires a Sophos account.

1. From the [Sophos Homepage](https://www.sophos.com/en-us/solutions/oem-solutions.aspx) navigate to **My Account** and log in.
1. On the [Sophos Central Partner Dashboard](https://cloud.sophos.com/manage/partner/dashboard) (depending on your account you may instead have an **Organization** dashboard).
1. In the left-hand toolbar, navigate to **Settings & Policies > API Credentials > Add Credential**.
1. Give the credential a name, and save the generated **Client ID** and **Client Secret**, these are used to configure the integration in Sumo Logic.

## Create a Sophos Central Source

When you create a Sophos Central Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Sophos Central Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Sophos Central**.<br/><img src={useBaseUrl('img/send-data/sophos-central-source-icon.png')} alt="sophos-central-source-icon" width="100"/>
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.<br/><img src={useBaseUrl('img/send-data/sophos-central-source.png')} alt="sophos-central-source" width="400"/>
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM Enterprise](/docs/cse). When configured with the **Forward to SIEM** option the following metadata fields are set:
   * `_siemVendor`: Sophos
   * `_siemProduct`: Sophos Central
   * `_siemFormat`: JSON
   * `_siemEventID`: `<eventId>` Where `<eventId>` is populated by the alert category. This will be one of the following values: azure, adSync, applicationControl, appReputation, blockListed, connectivity, cwg, denc, downloadReputation, endpointFirewall, fenc, forensicSnapshot, general, iaas, iaasAzure, isolation, malware, mtr, mobiles, policy, protection, pua, runtimeDetections, security, smc, systemHealth, uav, uncategorized, updating, utm, virt, wireless, or xgEmail.
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **Client ID**. Provide the Sophos Central Client ID you want to use to authenticate collection requests.
1. **Client Secret**. Provide the Sophos Central Client Secret you want to use to authenticate collection requests.
1. **Supported APIs to collect**. Select one or more of the available APIs, **Alerts** and **Events**.
1. (Optional) The **Polling Interval** is set for 300 seconds by default, you can adjust it based on your needs. This sets how often the Source checks for new data.
1. **Processing Rules for Logs (Optional)**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in Create a Processing Rule.
1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the [Health Event](/docs/manage/health-events) Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config            | JSON Object  | Yes               | Contains the [configuration parameters](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sophos-central-source#config-parameters) for the Source. |                |
| schemaRef         | JSON Object  | Yes               | Use `{"type":"Sophos Central"}` for a Sophos Source.                                                        | not modifiable |
| sourceType        | String       | Yes               | Use `Universal` for a Sophos Source.                                                                        | not modifiable |

#### Config Parameters

The following table shows the **config** parameters for a Sophos
Central Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `clientId` | String | Yes |  | Provide the Sophos Client ID you want to use to authenticate collection requests. | modifiable |
| `clientSecret` | String | Yes |  | Provide the Sophos Secrete you want to use to authenticate collection requests. | modifiable |
| `supported_apis` | Array of strings | Yes |  | Define one or more of the available APIs to collect: Events, and Alerts.<br/>For example, for both you'd use: `["Events","Alerts"]` | modifiable |
| `pollingInterval` | Integer | No | 300 | This sets how often the Source checks for new data. | modifiable |

Sophos Central Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Sophos Central"
    },
    "config":{
      "name":"Sophos",
      "description":"East field",
      "clientId":"********",
      "clientSecret":"********",
      "supported_apis": ["Events", "Alerts"],
      "fields":{
        "_siemForward":false
      },
      "category":"eastTeamF",
      "pollingInterval":300
    },
    "sourceType":"Universal"
  }
}
```
