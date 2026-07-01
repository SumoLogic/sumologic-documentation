---
id: azure-front-door
title: Azure Front Door
description: Learn about the Sumo Logic collection process for the Azure Front Door service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-front-door.png')} alt="Azure Front Door icon" width="50"/>

[Azure Front Door](https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview) is Microsoft’s modern cloud Content Delivery Network (CDN) that provides fast, reliable, and secure access between your users and your applications’ static and dynamic web content across the globe. This integration helps in monitoring your application, tracking requests, and identifying performance bottlenecks in your CDN.

## Log and metric types

For Azure Front Door, you can collect the following logs and metrics:

* **Access logs**. These can be used to identify slow requests, determine error rates, and understand how Front Door's caching behavior is working for your solution.
* **Web application firewall (WAF) logs**. These can be used to detect potential attacks and false positive detections, which indicates legitimate requests that the WAF blocked. For more information on the WAF logs, see Azure Web Application Firewall monitoring and logging.
* **Health probe logs**. These can be used to identify origins that are unhealthy or that do not respond to requests from some of Front Door's geographically distributed PoPs.

For more information on logs schema, refer to the documentation below:
* [Standard/Premium tier](https://learn.microsoft.com/en-us/azure/frontdoor/front-door-diagnostics?pivots=front-door-standard-premium#logs)
* [Classic](https://learn.microsoft.com/en-us/azure/frontdoor/front-door-diagnostics?pivots=front-door-classic#diagnostic-logging)

For more information on metrics, refer to the documentation below. Usage metrics from your CDN endpoint are in the namespaces below:
* [Microsoft.Network/frontdoors](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-network-frontdoors-metrics)

For more information on supported dimensions, refer to the documentation below:
* [Standard/Premium tier](https://learn.microsoft.com/en-us/azure/frontdoor/front-door-diagnostics?pivots=front-door-standard-premium#metrics)
* [Classic](https://learn.microsoft.com/en-us/azure/frontdoor/front-door-diagnostics?pivots=front-door-classic#metrics)

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure Front Door profile you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/FrontDoor/Logs`, `Azure/FrontDoor/Metrics`.

### Configure metrics collection

import MetricsSource from \'../../reuse/metrics-source.md\';

<MetricsSource/>

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/frontdoor/standard-premium/how-to-logs#configure-logs). Perform the steps below for each Azure Front Door profile that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select the log from `FrontDoorAccessLog, FrontDoorHealthProbeLog, and FrontDoorWebApplicationFirewallLog`.
   * Use the Event hub namespace and Event hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
