---
id: syslog
title: Syslog Source Template (Beta)
sidebar_label: Syslog
description: Learn about the Sumo Logic Syslog source template for OpenTelemetry.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/>

The Syslog source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent, the agent will start listening on the configured port for syslogs and send them to Sumo Logic.
		
## Fields creation in Sumo Logic for Syslog

If not already present, the following [Fields](/docs/manage/fields/) are created as part of source template creation.

- **`sumo.datasource`**. Fixed value of **localfile**.
- **`deployment.environment`**. User configured field at the time of collector installation. This identifies the environment where the host resides. For example: dev, prod, or qa.
- **`host.group`**. This is a collector level field and is user configured (at the time of collector installation). Through this, the group of host are identified.
- **`host.name`**. This is tagged through the resourcedetection processor. It holds the value of the host name where the OTel collector is installed.

## Prerequisite
Ensure that the syslogs conform to the [RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424) protocol. Since we use the OpenTelemetry [syslog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/syslogreceiver) with this protocol, this will ensure proper parsing of the syslog metadata when ingested into Sumo Logic.

## Source template configuration
		
You can follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.
		
### Step 1: Set up remotely managed OpenTelemetry collector
		
import CollectorInstallation from '../../../../reuse/apps/opentelemetry/collector-installation.md';
		
<CollectorInstallation/>
		
### Step 2: Configure the source template
		
In this step, you will configure the yaml required for Syslog Collection.
		
Below are the inputs required:
		
- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default sumo tags _sourceCategory with the value otel/localfile
- **Protocol**. Select the protocol that your syslog-enabled devices are currently using to send syslog data, **UDP** or **TCP**. 
- **Port**. Enter the port number for agent to listen to. Make sure the devices are sending to the same port.

You can add processing rules for logs collected. More details can be found [here](../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>
