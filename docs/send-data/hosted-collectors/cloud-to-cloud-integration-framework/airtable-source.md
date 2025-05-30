---
id: airtable-source
title: Airtable Source
sidebar_label: Airtable
tags:
  - cloud-to-cloud
  - airtable
description: Learn how to retrieve Airtable audit logs into the Sumo Logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';

<img src={useBaseUrl('img/send-data/airtable-icon.png')} alt="Airtable icon" width="50" />


The Airtable API integration ingests audit logs periodically from the Airtable app platform into the Sumo Logic environment for storing and analyzing data.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 minutes |  [Audit Logs](https://airtable.com/developers/web/api/audit-log-events) |

## Setup

### Vendor configuration

:::note
Make sure you have an Airtable admin account and Enterprise billing plan to collect audit logs from the Airtable application.
:::

Airtable's API uses token-based authentication, it allows you to authenticate API requests by inputting your access tokens into the HTTP authorization bearer token header. You need to create a `Personal Access token` that will be used to authenticate API requests.

Complete the following steps to create service account credentials:
1. Go to the [Airtable application](https://airtable.com/) and navigate to **Create Token**.
1. Click the **Create new token** button to create a new personal access token.
1. Give your token a unique name. This name will be visible in the record revision history.
1. Choose the scope **enterprise.auditLogs:read** to grant your token. This controls what API endpoints the token will be able to use.
1. Click **add a base** to grant the token access to a base or workspace.
1. You can grant access to any number and combination of **bases** and **workspaces** associated with your account. Ensure that the token can only read and write data within the bases and workspaces that have been assigned to it.

### Source configuration

In this configuration, you will set up an Airtable source account with your Enterprise account and configure it to be authorized and authenticated to use audit logs from Airtable API.

To configure an Airtable Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a **Hosted Collector**.
1. Search for and select **Airtable**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse).  <br/><ForwardToSiem/>
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a checkmark is shown when the field exists in the Fields table schema.
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. In **Account ID**, enter an account ID that will be a unique identifier for your enterprise account.
1. In **Personal Access Token**, enter the access token that you have generated in the [Vendor configuration](#vendor-configuration) section.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Airtable"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:---|:---|:---|:---|:---|:---|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| accountId | String | Yes | `null` | Account ID is a unique identifier for your Enterprise Account. |  |
| personalAccessTokens | String | Yes | `null` | Used to authenticate API requests. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/airtable/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/airtable/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
