---
id: netskope-webtx-source
title: Netskope WebTx Source
sidebar_label: Netskope WebTx
description: Our Netskope WebTx API integration ingests Web Transaction logs from Netskope Event Stream.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/netskope.png')} alt="thumbnail icon" width="75"/>

The [Netskope WebTx API](https://docs.netskope.com/en/transaction-event-fields.html) integration ingests Web Transaction logs from Netskope Event Stream.

## States

A Netskope WebTx API Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing [Health Events](/docs/manage/health-events).

An Netskope WebTx API Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
2. **Started**. A collection task is created on the Hosted Collector.
3. **Initialized**. The task configuration is complete in Sumo Logic.
4. **Authenticated**. The Source successfully authenticated with Symantec.
5. **Collecting**. The Source is actively collecting data from Symantec.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the [Health](/docs/manage/health-events#collection-page) and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events) to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.


Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings.



You can click on the status icon to open a Health Events panel with details on each detected issue.


## Data Sources

The netskope-webtx access a PubSub lite service hosted by Google to retrieve web transaction logs using the [v2 dataexport Iterator Endpoint](https://docs.netskope.com/en/using-the-rest-api-v2-dataexport-iterator-endpoints.html). Details on what is ingested can be found [here](https://docs.netskope.com/en/transaction-event-fields.html).


## Setup and Configuration

Netskope Web Transactions integration needs to be configured using Netskope Streaming credentials. You can collect the subscription path and credentials [here](https://docs.netskope.com/en/netskope-transaction-events.html).


### Create an Netskope WebTx API Source

When you create an Netskope WebTx API Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

**To configure an Netskope WebTx API Source:**

1. In Sumo Logic, select** Manage Data > Collection > Collection**.
1. On the Collection page, click **Add Source** next to a Hosted** **Collector.
1. Select **Netskope WebTx API**.
1. Enter a **Name** to display the Source in the Sumo web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
2. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM Enterprise](/docs/cse). When configured with the **Forward to SIEM** option, the following metadata fields are set:

<table>
  <tr>
   <td>
Field Name
   </td>
   <td>Value
   </td>
  </tr>
  <tr>
   <td>_siemVendor
   </td>
   <td>Netskope
   </td>
  </tr>
  <tr>
   <td>_siemProduct
   </td>
   <td>WebTx
   </td>
  </tr>
  <tr>
   <td>_siemFormat
   </td>
   <td>JSON
   </td>
  </tr>
  <tr>
   <td>_siemEventID
   </td>
   <td>webtx
   </td>
  </tr>
</table>




1. (Optional) **Fields**. Click the **+Add** link to add custom log metadata [Fields](/docs/manage/fields).
    * Define the fields you want to associate, each field needs a name (key) and value.
        * A green circle with a check-mark is shown when the field exists and is enabled in the Fields table schema.
        * An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
2. You will need a subscription endpoint URL and subscription key to access the streamed events. Log in to your Netskope UI and go to **Settings > Tools > Event Streaming**. Copy your subscription endpoint and generate your download key from the Event Streaming page.

The **REGENERATE ENDPOINT** button generates a new subscription path. After a new subscription path is generated, a new subscription key must be generated by clicking on the **GENERATE AND DOWNLOAD KEY **button.
The old subscription path and key expire. With a new subscription path, event streaming will start fresh from the beginning of the retention period which is 7 days by default.



3. After the transaction events feature is enabled in your account, you’ll be able to consume the data from the subscription endpoint.
4. To receive the events from the subscription, refer to the [Receiving messages from Lite subscriptions link](https://cloud.google.com/pubsub/lite/docs/subscribing). You can receive messages with various [Client libraries](https://cloud.google.com/pubsub/lite/docs/reference/libraries). Netskope retains transaction events for seven days by default if not consumed.
5. When you are finished configuring the file, upload the JSON file.


## Error types

When Sumo Logic detects an issue it is tracked by [Health Events](/docs/manage/health-events). The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

<table>
  <tr>
   <td>Type
   </td>
   <td>Reason
   </td>
   <td>Retries
   </td>
   <td>Retry Behavior
   </td>
   <td>Health Event Name
   </td>
  </tr>
  <tr>
   <td>ThirdPartyConfig
   </td>
   <td>Normally due to an invalid configuration. You'll need to review your Source configuration and make an update.
   </td>
   <td>No retries are attempted until the Source is updated.
   </td>
   <td>Not applicable
   </td>
   <td>ThirdPartyConfigError
   </td>
  </tr>
  <tr>
   <td>ThirdPartyGeneric
   </td>
   <td>Normally due to an error communicating with the third party service APIs.
   </td>
   <td>Yes
   </td>
   <td>The Source will retry for up to 90 minutes, after which it quits.
   </td>
   <td>ThirdPartyGenericError
   </td>
  </tr>
  <tr>
   <td>FirstPartyGeneric
   </td>
   <td>Normally due to an error communicating with the internal Sumo Logic APIs.
   </td>
   <td>Yes
   </td>
   <td>The Source will retry for up to 90 minutes, after which it quits.
   </td>
   <td>FirstPartyGenericError
   </td>
  </tr>
</table>


### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


## JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required?</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Access</strong>
   </td>
  </tr>
  <tr>
   <td>config
   </td>
   <td>JSON Object
   </td>
   <td>Yes
   </td>
   <td>Contains the <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/okta-source#configParameters">configuration parameters</a> for the Source.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>schemaRef
   </td>
   <td>JSON Object
   </td>
   <td>Yes
   </td>
   <td>Use <code>&#123;"type":"Netskope WebTx API"&#125;</code> for a Netskope WebTx API Source.
   </td>
   <td>not modifiable
   </td>
  </tr>
  <tr>
   <td>sourceType
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>Use <code>Universal</code> for a Netskope WebTx API Source.
   </td>
   <td>not modifiable
   </td>
  </tr>
</table>

The following table shows the **config** parameters for a Netskope WebTx API Source.

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required</strong>
   </td>
   <td><strong>Default</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Access</strong>
   </td>
  </tr>
  <tr>
   <td>name
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the <a href="/docs/search/get-started-with-search/search-basics/built-in-metadata">metadata</a> field <code>_source</code>.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>description
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>null
   </td>
   <td>Type a description of the Source.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>category
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>null
   </td>
   <td>Type a category of the source. This value is assigned to the <a href="/docs/search/get-started-with-search/search-basics/built-in-metadata">metadata</a> field <code>_sourceCategory</code>. See <a href="/docs/send-data/best-practices#good-and-bad-source-categories">best practices</a> for details.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>fields
   </td>
   <td>JSON

Object
   </td>
   <td>No
   </td>
   <td>
   </td>
   <td>JSON map of key-value fields (metadata) to apply to the Collector or Source.

Use the boolean field <code>_siemForward</code> to enable forwarding to SIEM.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>credentialsJson
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Its the authentication credentials to access Netskope webtx Event Streaming service
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>subscriptionPath
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>A subscription path is needed for the event streaming to start.
   </td>
   <td>modifiable
   </td>
  </tr>
</table>


## Netskope WebTx Source JSON example

```json
{
  "api.version":"v1",
  "source":{
    "state":{
    "config":{
      "name":"webtx-test",
      "subscriptionPath":"projects/webtx-test",
      "startFromBeginning":false,
      "fields":{
        "_siemForward":false
      },
      "category":"webtx",
      "credentialsJson":"********"
    },
    "schemaRef":{
      "type":"Netskope WebTx"
    },
    "sourceType":"Universal"
  }
}
