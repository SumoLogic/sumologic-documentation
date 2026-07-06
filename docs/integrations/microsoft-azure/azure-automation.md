---
id: azure-automation
title: Azure Automation
description: Learn about the Sumo Logic collection process for the Azure Automation service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import MetricsSource from '../../reuse/metrics-source.md';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-automation.png')} alt="Azure Automation icon" width="50"/>

[Azure Automation](https://learn.microsoft.com/en-us/azure/automation/overview) delivers a cloud-based automation, operating system updates, and configuration service that supports consistent management across your Azure and non-Azure environments. It includes process automation, configuration management, update management, shared capabilities, and heterogeneous features. This integration helps in monitoring create, update and delete operations for the Automation runbooks, jobs and automation assets like connection, credential, variable, and certificate. It also gives insights into the status of your Automation jobs.

## Log and metric types

For Azure Automation, you can collect the following logs and metrics:

* **Platform logs**. To learn more about the different log category types and schemas collected for Azure Automation, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/automation/automation-manage-send-joblogs-log-analytics#azure-monitor-log-records).
* **Platform Metrics for Azure Automation**. These metrics are available in [Microsoft.Automation/automationAccounts](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-automation-automationaccounts-metrics) namespace.

## Setup

### Configure collector

Create a [hosted collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) if not already configured. Make sure you create the required sources in this collector.

### Configure logs collection

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Event Hub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

You must explicitly enable diagnostic settings for each Azure Automation account you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/Automation/Logs`.

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/automation/automation-manage-send-joblogs-log-analytics#configure-diagnostic-settings-in-azure-portal). Perform the steps below for each Azure Automation account that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `allLogs`.
   1. Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure metrics collection

When you configure the Azure Metrics Source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/Automation/Metrics`.

<MetricsSource/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
