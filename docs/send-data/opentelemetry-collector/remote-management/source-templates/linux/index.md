---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/linux
title: Linux Source Template
sidebar_label: Linux
description: Learn about the Sumo Logic Linux source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/><img src={useBaseUrl('img/integrations/hosts-operating-systems/linux-transparent.png')} alt="Thumbnail icon" width="30"/>

The Linux source template generates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the configuration to the appropriate OpenTelemetry agent, you can ensure the collection of Linux logs and host metrics for Sumo Logic.

## Fields created by the source template

When you create a source template, the following [fields](/docs/manage/fields/) are automatically added (if they don’t already exist):

- **`sumo.datasource`**. Fixed value of **linux**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the Linux system resides, such as `dev`, `prod`, or `qa`.
- **`host.group`**. This is a collector-level field that is user-configured at the time of collector installation. It identifies the Linux host group.
- **`host.name`**. This is tagged through the resourcedetection processor. It holds the value of the host name where the OTel collector is installed.

## Prerequisites

### For logs collection
This app is based on the following log files from the Ubuntu Linux machine.

- auth.log
- syslog
- daemon.log
- dpkg.log
- kern.log
- CentOS, Amazon Linux, and Red Hat
- audit/audit.log
- secure
- messages
- yum.log

import LogsCollectionPrereqisites from '../../../../../reuse/apps/logs-collection-prereqisites.md';

<LogsCollectionPrereqisites/>

## Configuring the Linux source template

Follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

import LinuxConfigureSourceTemplate from '../../../../../reuse/send-data/linux-configure-source-template.md';

<LinuxConfigureSourceTemplate/>

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](changelog.md) for information on periodic updates to this source template.
:::
