---
id: symantec-endpoint-security-source
title: Symantec Endpoint Security Source
sidebar_label: Symantec Endpoint Security
tags:
  - cloud-to-cloud
  - symantec-endpoint-security
description: Learn how to collect incident and incident events using the Symantec Endpoint Security source.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/symantec-logo.svg')} alt="icon" width="125"/>

Symantec Endpoint Protection is a client-server solution that protects laptops, desktops, and servers in networks against malware, risks, and vulnerabilities. Symantec Endpoint Protection combines virus protection with advanced threat protection to proactively secure client computers against known and unknown threats. This integration collects this information using the [Symantec Incidents API](https://apidocs.securitycloud.symantec.com/#/doc?id=edr_incidents) and ingests it into Sumo Logic.

## Data collected

| Polling Interval | Data Source | Description |
| :--- | :--- |  :--- |
| 5 min |  Incidents | Used to retrieve incidents and incident events. |
| 5 min |  Incident Events | Used to retrieve incident related events based on time range filter. |

## Setup

### Vendor configuration

The Symantec Endpoint Security source requires you to provide credentials. To obtain the client secret, follow the steps below.
1. Sign in to the [Symantec Endpoint Security](https://login.broadcom.com/) platform.
1. Go to **Integration** and select **Client Applications**.
1. Click on **Add Client Application**.
1. Enter any name for the application and press the **Add** button. The client application details screen appears.
1. Select required privileges for the client application and click **Save**.
1. Click the **More Options** icon and select **Client Secret**.

### Source configuration

When you create a Symantec Endpoint Security Source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Symantec Endpoint Security Source, follow the steps below:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Symantec Endpoint Security**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema, it is ignored, also known as dropped.
1. In **Client ID**, enter the Client ID you generated from the Symantec Endpoint Security platform.
2. In **Client Secret**, enter the Client Secret you generated from the Symantec Endpoint Security platform.
3. (Optional) In **Initial LookBack**, enter the first collection start time. Default is 1 day and maximum is 30 days.
4. **Include Events**. Select this checkbox if you want to collect events from incidents.
5. (Optional) The **Polling Interval** is set for 24 hours by default. You can adjust it based on your needs.
6. (Optional) **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in Create a Processing Rule.
7. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Symantec Endpoint Security"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:---|:---|:---|:---|:---|:---|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| clientID | String | No | `null`| Client ID generated from the Symantec Endpoint Security platform. |  |
| clientSecret | String | No | `null`| Client Secret generated from the Symantec Endpoint Security platform. | |
| incidentsIncludeEvents | String | No | false | Select the checkbox to include the incident events. | `5 minutes` |
| incidentsInitialLookback | Integer | No | 1 day | First collection start time. |  |
| pollingInterval | String | No | 5 minutes | This sets how often the Source checks for data. | `5 minutes` |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/symantec-endpoint-security/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/symantec-endpoint-security/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
