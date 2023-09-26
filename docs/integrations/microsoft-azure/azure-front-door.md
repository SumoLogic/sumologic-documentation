# Overview

**Azure Front Door** is Microsoft’s modern cloud Content Delivery Network (CDN) that provides fast, reliable, and secure access between your users and your applications’ static and dynamic web content across the globe. This integration helps in monitoring your application, track requests and identify performance bottlenecks in your CDN.

For more details on Azure Front Door, refer to the Azure Front Door [documentation](https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview).

## Log and Metric types

For Azure Front Door, you can collect the following logs and metrics:

 * **Access logs** can be used to identify slow requests, determine error rates, and understand how Front Door's caching behavior is working for your solution.
 * **Web application firewall (WAF) logs** can be used to detect potential attacks, and false positive detections that might indicate legitimate requests that the WAF blocked. For more information on the WAF logs, see Azure Web Application Firewall monitoring and logging.
 * **Health probe logs** can be used to identify origins that are unhealthy or that don't respond to requests from some of Front Door's geographically distributed PoPs.

For more information on logs schema, refer below  documentation:
 * [Standard/Premimum tier](https://learn.microsoft.com/en-us/azure/frontdoor/front-door-diagnostics?pivots=front-door-standard-premium#logs)
 * [Classic](https://learn.microsoft.com/en-us/azure/frontdoor/front-door-diagnostics?pivots=front-door-classic#diagnostic-logging)

 * **Metrics** usage metrics from your CDN endpoint are in below namespaces:
    * [Microsoft.Network/frontdoors](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-network-frontdoors-metrics)

For more information on supported dimensions, refer below  documentation
 * [Standard/Premimum tier](https://learn.microsoft.com/en-us/azure/frontdoor/front-door-diagnostics?pivots=front-door-standard-premium#metrics).
 * [Classic](https://learn.microsoft.com/en-us/azure/frontdoor/front-door-diagnostics?pivots=front-door-classic#metrics).


# Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:
* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](https://help.sumologic.com/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](https://help.sumologic.com/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure Front Door profile you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/FrontDoor/Logs`, `Azure/FrontDoor/Metrics`.



### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. [Configure an HTTP Source](https://help.sumologic.com/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
2. [Configure and deploy the ARM Template](https://help.sumologic.com/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
3. [Export metrics to Event Hub](https://help.sumologic.com/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure Front Door profile that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `AllMetrics`.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the Policy name.


### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs cloud-to-cloud source in Sumo Logic portal, refer to our [Azure Event Hubs cloud-to-cloud source guide documentation](https://help.sumologic.com/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/frontdoor/standard-premium/how-to-logs#configure-logs). Perform below steps for each Azure Front Door profile that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select the log from `FrontDoorAccessLog, FrontDoorHealthProbeLog, and FrontDoorWebApplicationFirewallLog`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the Policy name.

# Troubleshooting

### Azure Event Hubs Source

Common error types are described [here](https://help.sumologic.com/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#error-types).

You can try [restarting](https://help.sumologic.com/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#restarting-your-source) the source for `ThirdPartyConfig` errors.

### HTTP Logs and Metrics Source used by Azure Functions

Follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](https://help.sumologic.com/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
