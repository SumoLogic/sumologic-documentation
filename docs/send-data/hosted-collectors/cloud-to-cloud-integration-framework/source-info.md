---
id: source-info
title: Cloud to Cloud Info
slug: /c2c/info
tags:
  - cloud-to-cloud
---

## States

When you create a C2C Source, it goes through the following states:
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source is successfully authenticated with the vendor API(s).
1. **Collecting**. The Source is actively collecting data from the vendor API(s).

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection.

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings. You can click on the status icon to open a Health Events panel with details on each detected issue.

## Error Types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry indefinitely. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry indefinitely. | FirstPartyGenericError |

## Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

## JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources), or [Sumo Logic Terraform Resource](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/cloud_to_cloud_source) if you are using Terraform,for more details.