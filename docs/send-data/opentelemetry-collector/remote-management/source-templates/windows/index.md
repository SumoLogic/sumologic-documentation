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

The Windows source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent, you can collect Windows event logs and metrics from Windows systems and send them to Sumo Logic.

## Fields created by the source template

When you create a source template, the following [fields](/docs/manage/fields/) are automatically added (if they don’t already exist):

- **`sumo.datasource`**. Fixed value of **windows**.
- **`deployment.environment`**. User configured field at the time of collector installation. This identifies the environment where the Windows system resides. For example: `dev`, `prod`, or `qa`.
- **`host.group`**. This is a collector-level field that is user configured at the time of collector installation. It identifies the Windows host group.
- **`host.name`**. This is tagged through the resourcedetection processor. It holds the value of the host name where the OTel collector is installed.

## Prerequisites

### For logs collection
Ensure that the channel for collecting Windows event logs is installed and enabled on the monitored Windows machine.

## Configuring the Windows source template

Follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

import WindowsConfigureSourceTemplate from '../../../../../reuse/send-data/windows-configure-source-template.md';

<WindowsConfigureSourceTemplate/>

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::note
If the agent crashes with the following error log:

`failed to start service: cannot start pipelines: failed to start "windowseventlog/(channel_name)" receiver: start stanza: failed to open local subscription, error: failed to subscribe to (channel_name) channel: The specified channel could not be found.;`

It means that the specified event channel name in the custom event channel list does not exist on the remote host where the source template is being pushed.
To resolve this issue, you can either remove the non-existent channel name from the source template (ST) or upgrade the Sumo Logic OpenTelemetry Collector agent to version 0.130.1 or later and the ST to version 8.0.0 or later.
:::

:::info
Refer to the [changelog](/docs/send-data/opentelemetry-collector/remote-management/source-templates/windows/changelog/) for information on periodic updates to this source template.
:::
