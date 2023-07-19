---
id: get-started-metrics
title: Get Started with Metrics
sidebar_label: Getting Started
description: Learn how to get started with metrics and create your first visualization.
---

The easiest way get started with metrics is to add a Host Metrics Source, which allows you to collect data pertaining to the local Installed Collector host. Check out this webinar for an overview of what you can do with host metrics. For reference, the slides are available [here](http://www.slideshare.net/Sumo_Logic/sumo-logic-webinar-visibility-into-your-host-metrics).

:::note Metrics reported with a timestamp older than 24 hours ago or newer than 24 hours in the future from the time they are reported are dropped:::

<Iframe url="https://www.youtube.com/embed/WOeR_ukK01A"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe';

Then follow these steps to get started.

## 1. Add a Source to collect your data

The easiest way get started with metrics is to add a Host Metrics Source, which allows you to collect data pertaining to the local Installed Collector host.  

Watch these videos to see how to ingest Host Metrics from an Installed Collector, and see Collecting Host Metrics for Installed Collectors for full instructions. 

**Ingest Host Metrics by Upgrading an Existing Collector**

If you already have an Installed Collector, upgrade the Collector to start ingesting Host Metrics.

<Iframe url="https://www.youtube.com/embed/DrSBEM1jdW0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

**Ingest Host Metrics by Installing a Collector through the Setup Wizard**

If you don't have any installed metrics Sources, you can install one easily by using the Setup Wizard.

<Iframe url="https://www.youtube.com/embed/QBTI6phfAKI"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

Other metrics Source options are also available:

* **Amazon CloudWatch source.** Allows you to gather metrics data from an Amazon resource. First grant access to read the CloudWatch metrics, and then set up the Amazon CloudWatch Source. 
* **Streaming metrics source**. Receives data in the Graphite, Carbon 2.0, and Prometheus format sent over a TCP or UDP socket. See Streaming Metrics Source for instructions.

## 2. Query and visualize your data

After you set up a Source, metrics data is ingested automatically and available for query and visualization.

To get started quickly after installing your Collector and Sources, you can install the Host Metrics App with preconfigured searches and Dashboards, to analyze your metrics data. Watch this video to see how to set up a Host Metrics query and visualization, and see [Create a Metrics Query and Visualization](../metric-charts/create-metrics-visualization.md) for full instructions.

**Querying Your Host Metrics**

<Iframe url="https://www.youtube.com/embed/za-bmvrFvJQ"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

## 3. Add your data to a Dashboard

You can add a metrics visualization as a Panel in an existing Dashboard, or create a new Dashboard containing a metrics Panel. Watch this video to see how easy it is to add a metrics Panel to a Dashboard, and see [Add a Metrics Visualization to a Dashboard](../metric-charts/add-metrics-visualization-to-dashboard.md) for full instructions.

**Creating Metrics Dashboards**

<Iframe url="https://www.youtube.com/embed/sx5YNWhJc7Q"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />
