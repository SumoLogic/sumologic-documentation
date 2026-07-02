---
id: azure-relay
title: Azure Relay
description: Learn about the Sumo Logic collection process for the Azure Relay service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-relay.png')} alt="Azure Relay icon" width="50"/>

The [Azure Relay](https://learn.microsoft.com/en-us/azure/azure-relay/relay-what-is-it) service enables you to securely expose services that run in your corporate network to the public cloud. This integration helps in monitoring  everything that happens with operations and actions that are conducted against your Azure Relay namespace by using the API, or through language SDK.

## Log and metric types

For Azure Relay, you can collect the following logs and metrics:

* **Diagnostic Logs**. To learn more about the different resource log category types and schemas collected for Azure Relay, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-relay/diagnostic-logs).
* **Azure Relay Metrics**. These metrics are available in [Microsoft.Relay/namespaces](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-relay-namespaces-metrics) namespace.
For more information on supported metrics, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-relay/relay-metrics-azure-monitor).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure Relay namespace you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/Relay/Logs`, `Azure/Relay/Metrics`.

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

<MetricsSource/>

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-relay/diagnostic-logs#enable-diagnostic-logs). Perform the steps below for each Azure Relay namespace that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `HybridConnectionsEvent`.
   * Use the Event hub namespace and Event hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
