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

<!--
<img src={useBaseUrl('path-to-your-icon.png')} alt="Thumbnail icon" width="45"/>

The {{source name}} collects {{data/event types}} from {{source of origin}}. {{What the app does}}.

Example: The Microsoft Graph Security API Source provides a secure endpoint to consume alerts from the Microsoft Graph Security API endpoint. It securely stores the required authentication, scheduling, and state tracking information. One threat event is reported for each affected device.-->


## Prerequisites

<!-- NOTE: This section doesn't apply to all sources; use only where needed

Example: You'll need a Dropbox App Key, App Secret, and Access Code to provide to Sumo Logic. To generate these credentials, ....
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

We need to configure on source's website before configuring source in sumo logic. For example, we may be needed to collect API key from customer platform for authorization and use it when configuring source in sumo logic.

### Configure on {{source}}

<!-- NOTE: This section doesn't apply to all sources; only where needed

Insert steps to configure on source's website

Example: https://help.sumologic.com/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/ms-graph-identity-protection-source/#set-up-a-service-application
-->


### Configure {{source}} on Sumo Logic

<!--
Insert steps to configure the Source in the Sumo Logic UI

Example: https://help.sumologic.com/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/ms-graph-identity-protection-source/#create-amicrosoft-graph-identity-protection-source
-->

### Error Types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows the possible error types, the reason for the error, whether the source attempts to retry, and the event log name in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs. | Yes | The Source will retry indefinitely. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry indefinitely. | FirstPartyGenericError |

### Restarting your Source

<!--
Paste this line: {@import ../../reuse/restart-c2c-source.md}
-->

## JSON Source configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [Using JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| {{`Parameter`}} | {{Type}} | {{Yes/No}} | {{Description}} |   |

### JSON config parameters

The following table shows the JSON **config** parameters for a {{source name}}.

| Parameter | Type | Required | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| {{`Parameter`}} | {{Type}}  | {{Yes/No}} |  | {{Description}} |  |

### JSON config example

```json
insert JSON config example
```
