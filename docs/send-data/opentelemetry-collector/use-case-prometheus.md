---
id: use-case-prometheus
title: Monitoring Custom Metrics Using OpenTelemetry
sidebar_label: Use case - Prometheus
description: Learn how to import and monitor your existing Prometheus-formatted metrics into Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

If you're collecting metrics using Prometheus, a popular tool for monitoring app performance, it can be challenging to visualize and analyze that data in a single location.

With the Sumo Logic OpenTelemetry Collector, you can import your Prometheus-formatted metrics into Sumo Logic and create a custom dashboard for them. This diagram shows the flow of metrics data from a custom application which has been instrumented to provide Prometheus-formatted metrics.

<img src={useBaseUrl('img/send-data/opentelemetry-collector/prometheus.png')} alt="prometheus.png" width="600"/>

Metrics are scraped by our OpenTelemetry Collector using the `prometheus` receiver, then sent to Sumo Logic’s OLTP-compatible ingest API via the `sumologic` exporter. The data is stored and indexed by Sumo Logic, where it can then be queried and displayed in a custom dashboard within Sumo Logic.

The OpenTelemetry Collector is a vendor-agnostic agent that can collect, process, and export telemetry data to various backends. It supports various protocols, including Prometheus.

In this use case below, we'll use a simple simulator to provide some custom metrics, however, you can use anything that exports metrics in Prometheus format. You don't have to use Prometheus; receivers are available for all popular metrics formats and should work for whatever your device is producing.


## Step 1: Set up the Prometheus Metrics Server Simulator

To get started, we need to have some Prometheus-formatted metrics to work with. We will use the [IBM Prometheus Metrics Server Simulator](https://github.com/IBM/prometheus-metrics-server-simulator) to generate sample metrics.

1. Install the simulator by following the instructions in the [official repository](https://github.com/IBM/prometheus-metrics-server-simulator).
1. Once you have installed the simulator, start it up with the following command:
   ```bash
   docker run -p 8080:8080 \
   -v $(pwd)/example:/etc/conf \
   -it ibmcom/prometheus-metrics-server-simulator
   ```
1. Confirm that the simulator starts with the default configuration. You can modify that configuration to produce whatever custom metrics you want to mock.
   ```bash title="cat examples/config.yaml"
   counters:
     - prefix: mock_metric_counter
       number: 3
       labels:
       - name: app
         valueset:
         - "prometheus-mock-metrics-server"
       - name: client_addr
         valueset:
         - "client1"
         - "client2"
         - "client3"
     - prefix: mock_metric_request_total
       labels:
       - name: app
         valueset:
         - "prometheus-mock-metrics-server"
     valuemode: http

   gauges:
     - prefix: mock_metric_gauges
       number: 4
       range:
         upper: 1000
         lower: 2
       labels:
       - name: app
         valueset:
         - "prometheus-mock-metrics-server"
       - name: client_addr
         valueset:
         - "client1"
         - "client2"
         - "client3"%
   ```
1. To verify that it's up and running, curl the metrics endpoint to see the Prometheus-formatted metrics it is generating. You should see something like this:
   ```bash
   curl localhost:8080/metrics
   # HELP mock_metric_counter_0
   # TYPE mock_metric_counter_0 counter
   mock_metric_counter_0{app="prometheus-mock-metrics-server",client_addr="client3"} 5448
   # HELP mock_metric_counter_1
   # TYPE mock_metric_counter_1 counter
   mock_metric_counter_1{app="prometheus-mock-metrics-server",client_addr="client2"} 5424
   # HELP mock_metric_counter_2
   # TYPE mock_metric_counter_2 counter
   mock_metric_counter_2{app="prometheus-mock-metrics-server",client_addr="client2"} 5362
   # HELP mock_metric_gauges_0
   # TYPE mock_metric_gauges_0 gauge
   mock_metric_gauges_0{app="prometheus-mock-metrics-server",client_addr="client1"} 71
   # HELP mock_metric_gauges_1
   # TYPE mock_metric_gauges_1 gauge
   mock_metric_gauges_1{app="prometheus-mock-metrics-server",client_addr="client2"} 44
   # HELP mock_metric_gauges_2
   # TYPE mock_metric_gauges_2 gauge
   mock_metric_gauges_2{app="prometheus-mock-metrics-server",client_addr="client3"} 4
   # HELP mock_metric_gauges_3
   # TYPE mock_metric_gauges_3 gauge
   mock_metric_gauges_3{app="prometheus-mock-metrics-server",client_addr="client3"} 41
   # HELP mock_metric_request_total
   # TYPE mock_metric_request_total counter
   mock_metric_request_total{app="prometheus-mock-metrics-server"} 0
   ```

## Step 2: Add Prometheus receiver to your OpenTelemetry Collector configuration

Next, we'll configure the [Sumo Logic OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) to receive metrics from the Prometheus Metrics Server Simulator, and then forward them to Sumo Logic.

1. Install the [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/).
2. Create a new configuration file for the OpenTelemetry Collector called **/etc/otelcol-sumo/conf.d/prom.yaml** and paste in the following snippet:
   ```yml
   receivers:
     prometheus:
       config:
         scrape_configs:
           - job_name: 'mock-metrics'
             scrape_interval: 10s
             static_configs:
               - targets: ['localhost:8080']
   service:
     pipelines:
       metrics:
         receivers: [prometheus]
         exporters: [sumologic]
   ```
    In this configuration, we:
    - Define a `prometheus` receiver that scrapes metrics from the Prometheus Metrics Server Simulator running on `localhost:8080`.
    - Define a metrics pipeline that uses the `prometheus` receiver to scrape the metrics.
    - Send the metrics to Sumo Logic via the `sumologic` exporter.
3. Save the configuration file as `/etc/otelcol-sumo/conf.d/prom.yaml`.
4. Start the OpenTelemetry Collector with the following command:
   ```bash
   sudo otelcol-sumo \
   --config=/etc/otelcol-sumo/sumologic.yaml \
   --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
   ```

This will start the collector with the configuration you defined, and you'll begin receiving and exporting metrics to Sumo Logic.


## Step 3: Create a New Dashboard in Sumo Logic

Finally, we will create a new dashboard in Sumo Logic to visualize the custom Prometheus-formatted metrics we are receiving.

To create a new dashboard:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui/). Go to the Sumo Logic **Home** tab and select **Dashboard**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu, select **Dashboards > New Dashboard**. You can also click the **Go To...** menu at the top of the screen and select **New Dashboard**.
1. Click the name of the dashboard and write in a unique title like **Custom Metrics Dashboard**.<br/><img src={useBaseUrl('img/dashboards/create-dashboard/custom-dashboard.png')} alt="custom-dashboard.png" width="350"/>
1. Click the **Time Series** button to create a time series chart panel.<br/><img src={useBaseUrl('img/dashboards/create-dashboard/time-series.png')} alt="time-series.png" width="350"/>
1. Select the icon next to the query box to choose a **Metrics** query.<br/><img src={useBaseUrl('img/dashboards/create-dashboard/custom-metrics.png')} alt="custom-metrics.png" width="300"/>
1. Select **mock_metric_counter_0** from the drop down (of course, this could be any metric. This is just an example).<br/><img src={useBaseUrl('img/dashboards/create-dashboard/mock-counter.png')} alt="mock-counter.png" width="500" />
1. From filters, choose the **client_addr** dimension. This will let us only show the metrics for specific client(s).<br/><img src={useBaseUrl('img/dashboards/create-dashboard/client-addr.png')} alt="client-addr.png" width="400" />
1. Choose the `=() In` operator. This will let us specify a list of clients we want to include on the chart.<br/><img src={useBaseUrl('img/dashboards/create-dashboard/client-addr-0.png')} alt="client-addr-0.png" width="400"/>
1. Select the desired clients. In this case, there’s only a single client, **client3**.<br/><img src={useBaseUrl('img/dashboards/create-dashboard/client3.png')} alt="client3.png" width="400" />
1. Click the search button (magnifying glass) to execute the search and see example output.<br/><img src={useBaseUrl('img/dashboards/create-dashboard/client3-search.png')} alt="client3-search.png" />
1. You should see something like this below.<br/><img src={useBaseUrl('img/dashboards/create-dashboard/add-to-dash.png')} alt="add-to-dash.png" /><br/>If it looks right, click **Add to Dashboard**.
1. Now we have a new dashboard in our Library called **Custom Metrics Dashboard** with the time-series chart showing just the clients we want to observe.<br/><img src={useBaseUrl('img/dashboards/create-dashboard/custom-dash-final.png')} alt="custom-dash-final.png" width="500"/>  


## Step 4: Set up alerts

Next, [set up a monitor](/docs/alerts/monitors/create-monitor) so that you get alert emails when a particular metric (for example, room temperature) exceeds a threshold and stays above that value for (2 cycles or 10 minutes, not sure which is doable).
