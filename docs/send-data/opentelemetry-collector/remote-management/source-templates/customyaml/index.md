---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/customyaml
title: Custom Yaml Source Template
sidebar_label: Custom Yaml
description: Learn about the Sumo Logic Custom Yaml source template for OpenTelemetry.
---

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


The Custom Yaml source template creates an OpenTelemetry configuration based on a provided Opentelemetry config yaml, that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). It lets you directly define and manage collector configurations in YAML format for more flexibility. By creating this source template and pushing the config to the appropriate OpenTelemetry agent, you can collect telemetry data to send to Sumo Logic.

:::note
This source template works with sumo remotely managed opentelemetry collector version >= 0.136.0
:::

## Configuring the source template

Follow these steps to set up and deploy the source template to a remotely managed OpenTelemetry collector.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

In this step, you will configure the yaml required for Apache Collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **YAML Configuration**. You can directly provide your Opentelemetry configurations in YAML format.

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](changelog.md) for information on periodic updates to this source template.
:::
