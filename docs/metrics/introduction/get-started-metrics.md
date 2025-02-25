---
id: get-started-metrics
title: Get Started with Metrics
sidebar_label: Getting Started
description: Learn how to get started with metrics and create your first visualization.
---

import Iframe from 'react-iframe';

The easiest way get started with metrics is to add a Host Metrics Source, which allows you to collect data pertaining to the local Installed Collector host. 

:::note
Metrics reported with a timestamp older than 24 hours ago or newer than 24 hours in the future from the time they are reported are dropped.
:::

## 1. Add a Source to collect your data

The easiest way get started with metrics is to add a [Host Metrics Source](/docs/send-data/installed-collectors/sources/host-metrics-source/), which allows you to collect data pertaining to the local Installed Collector host.  

If you already have an Installed Collector, upgrade the Collector to start ingesting Host Metrics.

Other metrics Source options are also available:
* [**Amazon CloudWatch Source for Metrics**](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics/). Allows you to gather metrics data from an Amazon resource. First grant access to read the CloudWatch metrics, and then set up the Amazon CloudWatch Source. 
* [**Streaming Metrics Source**](/docs/send-data/installed-collectors/sources/streaming-metrics-source/). Receives data in the Graphite, Carbon 2.0, and Prometheus format sent over a TCP or UDP socket. See Streaming Metrics Source for instructions.

## 2. Query and visualize your data

After you set up a Source, metrics data is ingested automatically and available for query and visualization.

To get started quickly after installing your Collector and Sources, you can install the [Host Metrics app](/docs/integrations/amazon-aws/ec2-host-metrics/) with preconfigured searches and Dashboards, to analyze your metrics data. 

## 3. Add your data to a Dashboard

You can add a metrics visualization as a Panel in an existing Dashboard, or [create a new Dashboard containing a metrics Panel](/docs/dashboards/create-dashboard-new/#metrics-page). 

