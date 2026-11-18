---
id: collect-statsd-metrics
title: Collect StatsD Metrics
sidebar_label: StatsD
description: Steps to use the collectd agent with the StatsD plugin and Sumo Logic’s collectd output plugin to send StatsD metrics to the Sumo Logic service.
---


There are three basic parts to a StatsD implementation: application libraries, a simple protocol used to define the metrics, and a daemon/server that aggregates the metrics for a time window and flushes the aggregated metrics to a metrics back-end system. There are many StatsD libraries and StatsD daemons. If you want to add StatsD to your application and send your metrics to Sumo Logic, we recommend using collectd as your metrics collection agent, with the StatsD input enabled. With Sumo Logic’s collectd Plugin, you can add metadata to your metrics and send your metrics to Sumo Logic in a multi-dimensional, metrics 2.0 format. 

If you're using a different StatsD server, the most commonly available integration method is to install a Sumo Logic Collector agent on or near your StatsD server and stream your metrics to Sumo Logic in the Graphite format. For instructions to configure a streaming metrics source, see [Streaming Metrics Source](/docs/send-data/installed-collectors/sources/streaming-metrics-source.md).

This page has information about using the `collectd` agent with the StatsD plugin and Sumo Logic’s `collectd` output plugin to and StatsD metrics to the Sumo Logic service.

1. To implement this capability, follow the instructions Steps 1 through 4 in the [CollectD plugin README](https://github.com/SumoLogic/sumologic-collectd-plugin) to:

   1. Install the `collectd` agent.
   1. Download and install Sumo Logic’s `collectd` output plugin.
   1. Configure an HTTP source in Sumo Logic to receive metrics sent by the `collectd` output plugin.
   1. Configure the `collectd` agent to use Sumo Logic’s `collectd` output plugin.

1. Configure the collectd agent to use the StatsD input plugin, by adding the following element to the `collectd.conf` file in the `/etc/collectd/` directory.

    ```
    <Plugin statsd>
    Host "::"
    Port "8125"
    DeleteSets     true
    TimerPercentile 90.0
    </Plugin>
    ```

For information about other StatsD configuration options, see the [Plugin StatsD](https://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_statsd) section in `collectd` documentation.   
 
