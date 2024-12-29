---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/syslog
title: Syslog Source Template
sidebar_label: Syslog
description: Learn about the Sumo Logic Syslog source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/><img src={useBaseUrl('img/icons/operations/server.png')} alt="OTel thumbnail icon" width="30"/>

The Syslog source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent, the agent will start listening on the configured port for syslogs and send them to Sumo Logic.

## Create Syslog source template fields

If not already present, the following [Fields](/docs/manage/fields/) are created as part of source template creation.

<!-- localfile? -->
- **`sumo.datasource`**. Fixed value of **syslog**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the host resides, such as `dev`, `prod`, or `qa`.
- **`host.group`**. This is a collector level field and is user configured (at the time of collector installation). This identifies the group of hosts.
- **`host.name`**. This is tagged through the resourcedetection processor. It holds the value of the host name where the OTel collector is installed.

## Prerequisite
Ensure that the syslogs conform to the [RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424) protocol. Since we use the OpenTelemetry [syslog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/syslogreceiver) with this protocol, this will ensure proper parsing of the syslog metadata when ingested into Sumo Logic.

## Source template configuration

You can follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

In this step, you will configure the yaml required for Syslog Collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, sumo tags `_sourceCategory` with the value otel/syslog.
- **Protocol**. Select the protocol that your syslog-enabled devices are currently using to send syslog data, **UDP** or **TCP**.
- **Port**. Enter the port number for agent to listen to. Make sure the devices are sending to the same port.

**Processing Rules**. You can add processing rules for logs collected. To learn more, refer to [Processing Rules](../../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](changelog.md) for information on periodic updates to this source template.
:::
