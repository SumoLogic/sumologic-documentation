---
id: duo-source
title: Duo Source
sidebar_label: Duo
description: The Duo Source provides a secure endpoint to receive authentication logs from the Duo Authentication Logs API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/duo.png')} alt="thumbnail icon" width="55"/>

The Duo Source provides a secure endpoint to receive authentication logs from the Duo [Authentication Logs API](https://duo.com/docs/adminapi#logs). It securely stores the required authentication, scheduling, and state tracking information.

:::note
This Source is available in the [Fed deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Authentication

You need to [create an **Admin API** app](https://duo.com/docs/adminapi#first-steps) and copy the **integration key**, **secret key**, and **domain** to provide to Sumo Logic when creating your Duo Source. Grant the **Admin API** permission to **read** **information**, **log**, and **resource**.

#### States

A Duo Source tracks errors, reports its health, and start-up progress.
You’re informed, in real-time, if the Source is having trouble
connecting, if there's an error requiring user action, or if it is
healthy and collecting by utilizing Health Events.

A Duo Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Duo.
1. **Collecting**. The Source is actively collecting data from Duo.

If the Source has any issues during any one of these states, it is placed
in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

![Duo health error.png](/img/send-data/Duo-health-error.png)

Hover your mouse over the status icon to view a tooltip with details on
the detected issue.

![health error generic.png](/img/send-data/health-error-generic.png)

#### Create a Duo Source

When you create a Duo Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/).

To configure a Duo Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Duo**.

   ![Duo source icon.png](/img/send-data/Duo-source-icon.png)

1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.

   ![duo create pane.png](/img/send-data/duo-create-pane.png)

1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:

   * `_siemVendor`: Duo
   * `_siemProduct`: MFA
   * `_siemFormat`: JSON
   * `_siemEventID`: `<eventType>` Where `<eventType>` is the value of the field from the JSON event, such as authentication or enrollment.

1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.


:::note
If you are using the Duo Federal edition service when connecting APIs, it's recommended to use `duofederal.com` instead of the default `duosecurity.com` domain. Our Duo C2C lets you allow to configure the API domain as it contains the specific customer ID information. For example, you can use `api-xxxx-duosecurity.com` or `api-xxxx-duofederal.com` if the Duo Federal edition service has been opted in. For more information, refer to the [Duo Federal Edition Guide](https://duo.com/docs/duo-federal-guide#duo-service-connectivity).
:::


1. **Duo Domain**. Provide your **API hostname**, such as `api-********.duosecurity.com`.

   ![Duo admin API reference.png](/img/send-data/Duo-admin-API-reference.png)

1. **Integration Key**. Provide the Duo Integration Key you want to use to authenticate collection requests.

1. **Secret Key**. Provide the Duo Secret Key you want to use to authenticate collection requests. 

1. (Optional) The **Polling Interval** is set for 300 seconds by default, you can adjust it based on your needs. This sets how often the Source checks for new data.

1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The
following table shows the three possible error types, the reason the
error would occur, if the Source attempts to retry, and the name of the
event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |
### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config | JSON Object  | Yes | Contains the configuration parameters for the Source. |   |
| schemaRef | JSON Object  | Yes | Use `{"type":"Duo"}` for a Duo Source. | not modifiable |
| sourceType | String | Yes | Use `Universal` for a Duo Source. | not modifiable |

The following table shows the **config** parameters for a Duo Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `domain` | String | Yes |  | Provide your API hostname, such as api-********.duosecurity.com.	modifiable
| `integration_key` | String | Yes |  | Provide the Duo Integration Key you want to use to authenticate collection requests. | modifiable |
| `secret_key` | String | Yes |  | Provide the Duo Secret Key you want to use to authenticate collection requests. | modifiable |
| `polling_interval` | Integer | No | 300 | This sets how often the Source checks for new data. | modifiable |

Duo Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Duo"
    },
    "config":{
      "name":"Duo",
      "description":"East field",
      "domain":"api-********.duosecurity.com",
      "integration_key":"********",
      "secret_key":"********",
      "fields":{
        "_siemForward":false
      },
      "category":"eastTeamF",
      "polling_interval":300
    },
    "sourceType":"Universal"
  }
}
```
