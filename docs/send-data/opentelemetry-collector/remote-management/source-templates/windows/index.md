---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/windows
title: Windows Source Template
sidebar_label: Windows
description: Learn about the Sumo Logic Windows source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/><img src={useBaseUrl('img/integrations/microsoft-azure/windows.png')} alt="Thumbnail icon" width="30"/>

The Windows source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent, you can ensure collection of Windows event log and metrics of Windows to Sumo Logic.

## Fields creation in Sumo Logic for Windows

If not already present, the following [fields](/docs/manage/fields/) are created as part of source template creation.

- **`sumo.datasource`**. Fixed value of **windows**.
- **`deployment.environment`**. User configured field at the time of collector installation. This identifies the environment where the Windows system resides. For example: `dev`, `prod`, or `qa`.
- **`host.group`**. This is a collector-level field that is user configured at the time of collector installation. It identifies the Windows host group.
- **`host.name`**. This is tagged through the resourcedetection processor. It holds the value of the host name where the OTel collector is installed.

## Prerequisites

### For logs collection
Ensure that the channel for collecting Windows event logs is installed and enabled on the monitored Windows machine.

## Source template configuration

Follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

In this step, you will configure the YAML required for Windows collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.

#### Logs Collection
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, Sumo Logic tags `_sourceCategory` with the value `otel/windows`.
- **Windows Event**. In this section you can select choose among the most widely used Windows event channel for which Windows event log collection will be enabled. You can also provide **Custom Event Channels** providing any customer event channel for which event logs are to be collected.
- **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse).

#### Metrics Collection
- **Metrics**. Select the metric scrappers you want to enable. By default, metric collection for CPU, memory, disk, load, file system, network and paging are enabled, and process metric collection is disabled.

##### Enable process metric collection (optional)

import ProcMetrics from '../../../../../reuse/apps/opentelemetry/process-metric-collection.md';

<ProcMetrics/>

- **Scan Interval**. The frequency at which the source is scanned.
- **Processing Rules**.  You can add processing rules for logs/metrics collected. To learn more, refer to [Processing Rules](/docs/send-data/opentelemetry-collector/remote-management/processing-rules/). For masking windows event logs,  refer to [Mask Rules for Windows Source Template](/docs/send-data/opentelemetry-collector/remote-management/processing-rules/mask-rules-windows).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](/docs/send-data/opentelemetry-collector/remote-management/source-templates/windows/changelog/) for information on periodic updates to this source template.
:::
