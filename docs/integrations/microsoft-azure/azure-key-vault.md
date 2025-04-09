---
id: azure-key-vault
title: Azure Key Vault
description: Learn about the Sumo Logic collection process for the Azure Key Vault service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-key-vault.png')} alt="Thumbnail icon" width="50"/>

[Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/) is a cloud service that helps you securely store and manage secrets, keys, and certificates, you can use it to protect data for cloud apps and services. This integration helps in comprehensive monitoring of your key vaults operations, requests, failures, and latency.

## Log and metric types

For Azure Key Vault, you can collect the following logs and metrics:

* **Resource logs**. To learn more about the different resource log category types and schemas collected for Azure Key Vault, refer to [Azure documentation](https://learn.microsoft.com/en-gb/azure/key-vault/general/monitor-key-vault-reference#resource-logs).
* **Key Vault Metrics**. These metrics are available in [Microsoft.KeyVault/vaults](https://learn.microsoft.com/en-gb/azure/azure-monitor/essentials/metrics-supported#microsoftkeyvaultvaults) namespace.
* **Managed HSM Metrics**. These metrics are available in [Microsoft.KeyVault/managedhsms](https://learn.microsoft.com/en-gb/azure/azure-monitor/essentials/resource-logs-categories#microsoftkeyvaultmanagedhsms) namespace.

For more information on supported metrics and their units, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/key-vault/general/monitor-key-vault-reference#key-vault-metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Key Vault you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/KeyVault/Logs`, `Azure/KeyVault/Metrics`.

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
2. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
3. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Key Vault that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `AllMetrics`.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#create-diagnostic-settings) for Key Vault resource. Perform below steps for each Key Vault that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
