---
id: azure-network-interface
title: Azure Network Interface
keywords: 
 - azure network interface
 - azure network interface app
 - nic in azure
description: This document outlines what is Azure Network Interface, how to set it up with Sumo Logic, and how to install and view the pre-configured Sumo Logic Azure dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-network-interface.png')} alt="Azure Network Interface icon" width="50"/>

[Azure Network Interface (NIC)](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-network-interface) enables an Azure virtual machine (VM) to communicate with the internet, Azure, and on-premises resources. This integration helps in monitoring packet and data throughput.

## Metric types

For Azure Network Interface, you can collect the following metrics:

* **Platform Metrics for Azure Network Interface**. These metrics are available in [Microsoft.Network/networkInterfaces](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-network-networkinterfaces-metrics) namespace.

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Network Interface you want to monitor. You can forward metrics to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/NetworkInterface/Metrics`.

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

<MetricsSource/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).

## Additional resources

- Blog: [Azure monitoring and troubleshooting](https://www.sumologic.com/blog/azure-services-monitoring)
- Glossary: [Microsoft Azure](https://www.sumologic.com/glossary/microsoft-azure)