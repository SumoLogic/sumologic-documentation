---
id: c2c-source  #example: druva-source
title: XYZ Source #example: Druva Source
sidebar_label: XYZ #example: Druva
description: Description goes here. #example: Learn how to configure the Druva Cloud-to-Cloud Source in your Sumo Logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

{{source icon}}

The {{source name}} collects {{data/event types}} from {{source of origin}}. {{what the app does}}

<!-- Example:
The Microsoft Graph Security API Source provides a secure endpoint to consume alerts from the Microsoft Graph Security API endpoint. It securely stores the required authentication, scheduling, and state tracking information. One threat event is reported for each affected device.-->


## Prerequisites

{{if any}}

<!-- Example:
You'll need a Dropbox App Key, App Secret, and Access Code to provide to Sumo Logic. To generate these credentials, ....
-->

## States

Sumo Logic Cloud-to-Cloud (C2C) Sources inform you, in real time, about Source health, start-up progress, and errors requiring user action (such as connection failures).

C2C Sources go through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Microsoft.
1. **Collecting**. The Source is actively collecting data from Microsoft.

If a Source encounters an issue during any of the above states, it is placed in an **Error** state. When you delete a Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

### Health Events

To view Health Events and Status for your Source, go to **Manage** > **Collection**> **Collection**. Under the Health column, you can click an **Error** status to open the  Health Events and investigate issues that may have occurred during collection.

![hover-c2c-error.png](/img/send-data/hover-c2c-error.png)

After you click on **Error**, you should see a **Health Events** popup modal containing all detected errors and warnings. Next, click the three-dot icon > **View Details** to open a Health Events panel with details on each detected issue.

## Setup and configuration

{{Configure source in Sumo Logic UI}} <!-- Example: https://help.sumologic.com/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/ms-graph-identity-protection-source/#create-amicrosoft-graph-identity-protection-source -->

{{Configure on source's website (not required for all sources)}} <!-- Example: https://help.sumologic.com/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/ms-graph-identity-protection-source/#set-up-a-service-application -->

## Error Types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows the possible error types, the reason for the error, if the source attempts to retry, and the event log name in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs. | Yes | The Source will retry indefinitely. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry indefinitely. | FirstPartyGenericError |

### Restarting your Source

<!--
Paste this line: {@import ../../reuse/restart-c2c-source.md}
-->

## JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [Using JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config | JSON Object  | Yes | Contains the configuration parameters for the Source. |   |
| schemaRef | JSON Object  | Yes | Set to `{"type":"MS Graph Azure AD Reporting"}`. | not modifiable |
| sourceType | String | Yes | Set to `Universal`. | not modifiable |

### Config parameters

The following table shows the **config** parameters for a {{source name}}.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `tenant_id` | String | Yes |  | Provide the Directory (tenant) ID you got after you registered (created) the Azure Application. | modifiable |
| `secret_key` | String | Yes |  | Provide the Application Client Secret Value you created in Azure. | modifiable |
| `application_id` | String | Yes |  | Provide the Application (client) ID you got after you registered (created) the Azure Application. | modifiable |
| `supported_apis` | Array of strings | Yes |  | Define one or more of the available APIs to collect: `Directory Audit`, `Sign-in`, and `Provisioning`. For example, for both you'd use: `["Directory Audit","Signin"]` | modifiable |

### Config example

```json
insert JSON config example
```
