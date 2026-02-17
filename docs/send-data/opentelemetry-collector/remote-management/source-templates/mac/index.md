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

## Fields created by the source template

When you create a source template, the following [fields](/docs/manage/fields/) are automatically added (if they don’t already exist):

- **`sumo.datasource`**. Fixed value of **mac**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the Mac system resides, such as `dev`, `prod`, or `qa`.
- **`host.group`**. This is a collector level field and is user configured (at the time of collector installation). This identifies the mac host group.
- **`host.name`**. This is tagged through the resourcedetection processor. It holds the value of the host name where the OTel collector is installed.

## Prerequisites

### For logs collection
Log collection is pre-populated with default paths for common mac system log files.Please modify the list of files as required or leave the default values.

### For metrics collection
Host metrics for CPU and disk are not supported by otel as of now.

## Configuring the Mac source template

Follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

import MacConfigureSourceTemplate from '../../../../../reuse/send-data/mac-configure-source-template.md';

<MacConfigureSourceTemplate/>

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](changelog.md) for information on periodic updates to this source template.
:::
