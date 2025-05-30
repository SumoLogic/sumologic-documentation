---
id: cybereason-source
title: Cybereason Source
sidebar_label: Cybereason
tags:
  - cloud-to-cloud
  - cybereason
description: Learn how to collect authentication logs from the Cybereason Malops API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/cybereason-logo.png')} alt="cybereason-logo" width="70" />

The Cybereason Source provides a secure endpoint to receive authentication logs from the Cybereason [Malops API](https://nest.cybereason.com/documentation/api-documentation/all-versions/retrieve-all-malops-all-types#getmalopsmalware). It securely stores the required authentication, scheduling, and state tracking information.

:::important
The Cybereason API documentation is not public and can only be accessed by partners or customers.
:::

If you want to explicitly allow the static IP addresses used for this Source on Cybereason, see our [table of static IP addresses by deployment](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/#static-ip-addresses).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min | [Authentication logs](https://nest.cybereason.com/documentation/api-documentation/all-versions/retrieve-all-malops-all-types#getmalopsmalware) |

## Setup

### Vendor configuration

You need to have a Cybereason username and password as well as your customer-specific host, such as `mydomain.cybereason.net`. If you have a customer-specific port this should be included, such as `mydomain.cybereason.net:8443`.

### Source configuration

When you create a Cybereason Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Cybereason Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu, select **Configuration**, and then under **Data Collection**, select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Cybereason**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields.** Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema.
1. Enter your **Cybereason Host**, such as `mydomain.cybereason.net`. If using a custom port, append it like `mydomain.cybereason.net:8443`.
1. Enter your **User Email** and **Password** to authenticate.
1. (Optional) Adjust the **Polling Interval** (default is 300 seconds).
1. (Optional) Set a **Back Collection Interval** in hours (up to 720).
1. (Optional) Enable **Duplicate On Fields** for `dup_machines` and `dup_users` as needed.
1. When finished, click **Submit**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object | `{"type":"Cybereason"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Unique name of the source. | `"mySource"` |
| description | String | No | `null` | Description of the source. | `"Testing source"` |
| category | String | No | `null` | Metadata `_sourceCategory`. | `"mySource/test"` |
| fields | JSON Object | No | `null` | Key-value fields metadata. | `{"_siemForward": false}` |
| client_user | String | Yes | `null` | Email address for authentication. |  |
| client_password | String | Yes | `null` | Password for authentication. |  |
| polling_interval | Integer | No | 300 | Polling frequency in seconds. |  |
| back_collection_hours | Integer | No | 0 | Prior data collection in hours. |  |
| dup_machines | Boolean | No | false | Duplicate logs by machine values. |  |
| dup_users | Boolean | No | false | Duplicate logs by user values. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/cybereason/example.json
```

### Terraform example

```hcl reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/cybereason/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
