---
id: azure-public-ipAddress
title: Azure Public IP Addresses
description: Learn about the Sumo Logic collection process for the Azure Public IP Addresses service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-public-ipAddress.png')} alt="Azure Public IP Address icon" width="50"/>

[Azure Public IP Addresses](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-addresses) are used by internet resources to communicate inbound to resources in Azure. A public IP address is a resource with its own properties and can be associated with other Azure resources like NAT gateways, Application gateways, and more. This integration helps in monitoring DDoS notification events, packet dropped rate, TCP, and UDP data throughput.

## Log and metric types

For Azure Public IP addresses, you can collect the following logs and metrics:

* **Resource logs**. To learn more about the different resource log category types collected for Azure Public IP addresses, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-logs/microsoft-network-publicipaddresses-logs).
* **Platform Metrics for Azure Public IP addresses**. These metrics are available in [Microsoft.Network/publicIPAddresses](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-network-publicipaddresses-metrics) namespace.
For more information on supported metrics, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/monitor-public-ip-reference#metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Public IP resource you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/PublicIP/Logs`, `Azure/PublicIP/Metrics`.

### Configure metrics collection

import MetricsSource from \'../../reuse/metrics-source.md\';

<MetricsSource/>

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/monitor-public-ip#creating-a-diagnostic-setting). Perform the steps below for each Public IP resource that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs`.
   * Use the Event hub namespace and Event hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
