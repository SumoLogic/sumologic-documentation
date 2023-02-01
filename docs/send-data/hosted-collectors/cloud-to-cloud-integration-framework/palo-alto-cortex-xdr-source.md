---
id: palo-alto-cortex-xdr-source
title: Palo Alto Cortex XDR Source
sidebar_label: Palo Alto Cortex XDR
---


import useBaseUrl from '@docusaurus/useBaseUrl';

The Palo Alto Cortex XDR Source provides a secure endpoint to receive alerts from the [Get Alerts Incident Management API](https://docs.paloaltonetworks.com/cortex/cortex-xdr/cortex-xdr-api/cortex-xdr-apis/incident-management/get-alerts.html#idbad18e18-5c). It securely stores the required authentication, scheduling, and state tracking information.

## States

A Palo Alto Cortex XDR Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A Palo Alto Cortex XDR Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Symantec.
1. **Collecting**. The Source is actively collecting data from Symantec.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection.

![Cortex XDR error.png](/img/send-data/Cortex-XDR-error.png)

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings.

![hover c2c error.png](/img/send-data/hover-cortex-error.png)

You can click on the status icon to open a Health Events panel with details on each detected issue.

## Authentication

The Palo Alto Cortex XDR Source requires you to provide an **API Key**, **API Key ID**, and an **FQDN**. These are needed to use the Cortex XDR API. The steps to generate these can be found in the **Get Started with Cortex XDR APIs** section, which starts on page seven of the [Cortex XDR™ API Reference](https://docs.paloaltonetworks.com/content/dam/techdocs/en_US/pdf/cortex/cortex-xdr/cortex-xdr-api/cortex-xdr-api.pdf).

:::important
The **API Key** must be assigned the **Standard** security level.
:::

## Create a Palo Alto Cortex XDR Source

When you create a Palo Alto Cortex XDR Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Palo Alto Cortex XDR Source:

1. In Sumo Logic, select **Manage Data > Collection > Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.

1. Select **Palo Alto Cortex XDR**.

   ![palo alto XDR source icon.png](/img/send-data/palo-alto-XDR-source-icon.png)

1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.

   ![Cortex XDR June 2021.png](/img/send-data/Cortex-XDR.png)

1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:

   * `_siemVendor`: Palo Alto   
   * `siemProduct`: Cortex      
   * `siemFormat`: JSON        
   * `siemEventID`: `<category>`

1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

1. **API Key** and **API ID**. Provide the Palo Alto Cortex XDR authentication credentials you want to use to [Authenticate](#authentication) collection requests.

1. **Tenant FQDN**. Provide the FQDN you got when you generated the API Key and Key ID. The FQDN is a unique host and domain name   associated with each tenant.

1. (Optional) **Ingest Associated Events** enables the ingestion of all events associated with an alert as a separate set of log lines. Each alert will have all events ingested as individual log lines, each enriched with the original alert ID.

1. (Optional) **Duplicate Alerts for each alert host IP** will take all inbound alerts and flatten the host IP field in the alert data structure. Then a duplicate alert is ingested for each, which will be identical except for the host IP field that is flattened from an array. This simplifies working with the alert and the generation of rules or searches based on alert content.

1. (Optional) The **Polling Interval** is set for 600 seconds by default, you can adjust it based on your needs. This sets how often the Source checks for new data.

1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config            | JSON Object  | Yes | Contains the configuration parameters for the Source. |   |
| schemaRef         | JSON Object  | Yes | Use `{"type":"Palo Alto Cortex XDR"}` for a Palo Alto Cortex XDR Source. | not modifiable |
| sourceType        | String       | Yes | Use `Universal` for a Palo Alto Cortex XDR Source. | not modifiable |

The following table shows the **config** parameters for a Palo Alto
Cortex XDR Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `api_key` | String | Yes |  | Provide the API Key you want to use to authenticate collection requests.	modifiable
| `api_id` | String | Yes |  | Provide the API ID for the API Key that you want to use to authenticate collection requests. | modifiable |
| `fqdn` | String | Yes |  | The FQDN is a unique host and domain name associated with each tenant. When you generate the API Key and Key ID, you are assigned an individual FQDN. | modifiable |
| `ingest_events` | Boolean | No | False | When true the ingestion of all events associated with an alert as a separate set of log lines. Each alert will have all events ingested as individual log lines, each enriched with the original alert ID. | modifiable |
| `dup_alerts` | Boolean | No | False	When true all inbound alerts and flatten the host IP field in the alert data structure. Then a duplicate alert is ingested for each, which will be identical except for the host IP field that is flattened from an array. This simplifies working with the alert and the generation of rules or searches based on alert content. | modifiable |
| `polling_interval` | Integer | No | 600 | This sets how often the Source checks for new data. | modifiable |

Palo Alto Cortex XDR Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Palo Alto Cortex XDR"
    },
    "config":{
      "name":"Cortex XDR",
      "api_key":"********",
      "fields":{
        "_siemForward":false
      },
      "category":"c2c/xdr",
      "fqdn":"********",
      "api_id":"********"
    },
    "sourceType":"Universal"
  }
}
```
