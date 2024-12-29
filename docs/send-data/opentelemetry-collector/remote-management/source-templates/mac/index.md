---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/mac
title: Mac Source Template
sidebar_label: Mac
description: Learn about the Sumo Logic Mac source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/><img src={useBaseUrl('img/integrations/hosts-operating-systems/mac-apple-icon.png')} alt="Thumbnail icon" width="30"/>

The Mac source template generates an OpenTelemetry configuration that can be sent to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and deploying the configuration to the appropriate OpenTelemetry agent, you can ensure the collection of Mac logs and host metrics to Sumo Logic.

## Create Mac source template fields

If not already present, the following [Fields](/docs/manage/fields/) are created as part of source template creation.

- **`sumo.datasource`**. Fixed value of **mac**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the Mac system resides, such as `dev`, `prod`, or `qa`.
- **`host.group`**. This is a collector level field and is user configured (at the time of collector installation). This identifies the mac host group.
- **`host.name`**. This is tagged through the resourcedetection processor. It holds the value of the host name where the OTel collector is installed.

## Prerequisites

### For logs collection
Log collection is pre-populated with default paths for common mac system log files.Please modify the list of files as required or leave the default values.

### For metrics collection
Host metrics for CPU and disk are not supported by otel as of now.

## Source template configuration

Follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

In this step, you will configure the yaml required for Mac Collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.

#### Logs Collection
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, sumo tags `_sourceCategory` with the value otel/mac.
- **Logs**. The following fields are pre-populated with default paths for common log files that are used in different Mac distributions. Not all paths might be relevant for your operating system. Modify the list of files as required or leave the default values.

#### Metrics Collection
- **Metrics**. Select the metric scrappers you want to enable. By default, metric collection for memory, load, file system, network and paging are enabled and process metric collection is disabled.

##### Enable process metric collection (Optional)

import ProcMetrics from '../../../../../reuse/apps/opentelemetry/process-metric-collection.md';

<ProcMetrics/>

- **Scan Interval**. The frequency at which the source is scanned.
- **Processing Rules**. You can add processing rules for logs/metrics collected. To learn more, refer to [Processing Rules](../../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](changelog.md) for information on periodic updates to this source template.
:::
