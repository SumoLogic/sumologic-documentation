---
id: cybereason-source
title: Cybereason Source
sidebar_label: Cybereason
description: The Cybereason Source provides a secure endpoint to receive authentication logs from the Cybereason Malops API.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/cybereason/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/cybereason/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/cybereason/example.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/cybereason-logo.png')} alt="icon" width="70"/>

The Cybereason Source provides a secure endpoint to receive authentication logs from the Cybereason [Malops API](https://nest.cybereason.com/documentation/api-documentation/all-versions/retrieve-all-malops-all-types#getmalopsmalware). It securely stores the required authentication, scheduling, and state tracking information.

:::important
The Cybereason API documentation is not public and can only be accessed by partners or customers.
:::

If you want to explicitly allow the static IP addresses used for this Source on Cybereason see our [table of static IP addresses by deployment](cloud-to-cloud-source-versions.md).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Authentication logs](https://nest.cybereason.com/documentation/api-documentation/all-versions/retrieve-all-malops-all-types#getmalopsmalware) |

## Setup

### Vendor configuration

You need to have a Cybereason username and password as well as your customer-specific host, such as `mydomain.cybereason.net`. If you have a customer-specific port this should be included, such as `mydomain.cybereason.net:8443.`

### Source configuration

When you create a Cybereason Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Cybereason Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Cybereason**.
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **Cybereason Host**. Provide your customer-specific host, such as `mydomain.cybereason.net`. If you have a customer-specific port this should be included, such as `mydomain.cybereason.net:8443`.
1. **User email** and **password**. Provide the Cybereason user credentials you want to use to authenticate collection requests.
1. (Optional) The **Polling Interval** is set for 300 seconds by default, you can adjust it based on your needs. This sets how often the Source checks for new data.
1. (Optional) The **Back Collection Interval** allows you to set, in hours, ingestion for up to 30 days of prior MalOps.
1. (Optional) **Duplicate On Fields**, when enabled, each value in the array of machines or users is put into its own log. The entire log is duplicated for each value in the array, where each log gets one value. For example,

    ```
    {
        "data": 1,
        "machine": [1, 2, 3]
    }
    ```

    Would be processed into three logs, each with a single value from the machine array, like this:

    ```
    {
        "data": 1,
        "machine": 1
    }
    {
        "data": 1,
        "machine": 2
    }
    {
        "data": 1,
        "machine": 3
    }
    ```

1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Cybereason` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Endpoint Security` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `<eventType>` | Where `event_type` is the value of the field malopDetectionType from the JSON event. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Cybereason"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| client_user | String | Yes | `null` | Provide the email address you want to use to authenticate collection requests. |  |
| client_password | String | Yes | `null` | Provide the password for the user that you want to use to authenticate collection requests. |  |
| polling_interval | Integer | No | 300 | This sets how often the Source checks for new data. |  |
| back_collection_hours | Integer | No | 0 | Sets the number of hours of prior MalOps to collect. Supports 0 to 720. |  |
| dup_machines | Boolean | No | False | Set to true to duplicate logs for each element in the machine array. |  |
| dup_users | Boolean | No | False | Set to true to duplicate logs for each element in the users array. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/cybereason/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/cybereason/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
