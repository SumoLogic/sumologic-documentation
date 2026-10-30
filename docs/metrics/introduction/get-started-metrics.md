---
id: get-started-metrics
title: Get Started with Metrics
sidebar_label: Getting Started
description: Learn how to get started with metrics and create your first visualization.
---

import Iframe from 'react-iframe';

The easiest way get started with metrics is to add a Host Metrics source, which allows you to collect data pertaining to the local installed collector host. 

:::note
Metrics reported with a timestamp older than 24 hours ago or newer than 24 hours in the future from the time they are reported are dropped.
:::

## 1. Add a source to collect your data

The easiest way get started with metrics is to add a [Host Metrics source](/docs/send-data/installed-collectors/sources/host-metrics-source/), which allows you to collect data pertaining to the local installed collector host.  

If you already have an installed collector, upgrade the collector to start ingesting Host Metrics.

Other metrics source options are also available:
* [**Amazon CloudWatch source for Metrics**](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics/). Allows you to gather metrics data from an Amazon resource. First grant access to read the CloudWatch metrics, and then set up the Amazon CloudWatch source. 
* [**Streaming Metrics source**](/docs/send-data/installed-collectors/sources/streaming-metrics-source/). Receives data in the Graphite, Carbon 2.0, and Prometheus format sent over a TCP or UDP socket.

## 2. Query and visualize your data

After you set up a source, metrics data is ingested automatically and available for query and visualization.

To get started quickly after installing your collector and sources, you can install the [AWS EC2 Host Metrics app](/docs/integrations/amazon-aws/ec2-host-metrics/) with preconfigured searches and dashboards, to analyze your metrics data. 

## 3. Add your data to a dashboard

You can add a metrics visualization as a panel in an existing dashboard, or [create a new dashboard containing a metrics panel](/docs/dashboards/create-dashboard-new/#metrics-page). 

