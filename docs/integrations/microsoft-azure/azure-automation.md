---
id: azure-automation
title: Azure Automation
description: Learn about the Sumo Logic collection process for the Azure Automation service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-automation.png')} alt="Thumbnail icon" width="50"/>

[Azure Automation](https://learn.microsoft.com/en-us/azure/automation/overview) delivers a cloud-based automation, operating system updates, and configuration service that supports consistent management across your Azure and non-Azure environments. It includes process automation, configuration management, update management, shared capabilities, and heterogeneous features. This integration helps in monitoring create, update and delete operations for the Automation runbooks, jobs and automation assets like connection, credential, variable, and certificate. It also gives insights into the status of your Automation jobs.

## Log and metric types

For Azure Automation, you can collect the following logs and metrics:

* **Platform logs**. To learn more about the different log category types and schemas collected for Azure Automation, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/automation/automation-manage-send-joblogs-log-analytics#azure-monitor-log-records).
* **Platform Metrics for Azure Automation**. These metrics are available in [Microsoft.Automation/automationAccounts](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-automation-automationaccounts-metrics) namespace.

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure Automation account you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/Automation/Logs`, `Azure/Automation/Metrics`.

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Create hosted collector and tag tenant_name field. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />
1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
1. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure Automation account that you want to monitor.
   1. Choose `Stream to an event hub` as destination.
   1. Select `AllMetrics`.
   1. Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/automation/automation-manage-send-joblogs-log-analytics#configure-diagnostic-settings-in-azure-portal). Perform below steps for each Azure Automation account that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `allLogs`.
   1. Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
