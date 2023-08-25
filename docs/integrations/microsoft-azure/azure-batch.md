---
id: azure-batch
title: Azure Batch
description: Learn about the collection process for the Azure Batch service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-batch.png')} alt="Thumbnail icon" width="50"/>

**Azure Batch** runs large-scale parallel and high-performance computing (HPC) batch jobs efficiently in Azure. This integration helps in monitoring health of the nodes; creation, update, and deletion events of individual Batch resources, such as a pool or task; and tracking the state (start/fail/complete) of jobs and tasks.

For more details on Azure Batch, refer to the Azure Batch [documentation](https://learn.microsoft.com/en-us/azure/batch/).

## Log and Metric types

For Azure Batch, you can collect the following logs and metrics:

* **Service Logs**: Events emitted by the Batch service during the lifetime of an individual resource such as a pool or task. Logs events collected are listed [here](https://learn.microsoft.com/en-us/azure/batch/batch-diagnostics#service-log-events).

* **Batch account metrics**: Metrics at the Batch account level. Metrics collected are listed [here](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-batch-batchaccounts-metrics).


## Setup

Azure service sends monitoring data to Azure Monitor which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using [Azure Event Hubs source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/) and metrics collection using [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Batch account you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: Azure/Batch/Logs, Azure/Batch/Metrics.


### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

[Step 1: Configure HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source)

[Step 2: Configure and Deploy ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template)

[Step 3: Export Metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub)
Choose `Stream to an event hub` as destination and select `allMetrics`. Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new eventhub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as Policy name.


### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

**Step 1.** To set up the Azure Event Hubs cloud-to-cloud source in Sumo Logic portal, please refer to the documentation provided by the official [Azure Event Hubs cloud-to-cloud source guide](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/).

**Step 2.** To create the Diagnostic settings in Azure portal, please refer to the [documentation](https://learn.microsoft.com/en-us/azure/batch/batch-diagnostics#enable-collection-of-batch-diagnostic-logs) and choose `Stream to an event hub` as destination and select `allLogs` and `audit`. Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as Policy name.

## Troubleshooting

### Azure Event Hubs Source

Common error types are described [here](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#error-types).

You can try [restarting](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#restarting-your-source) the source for `ThirdPartyConfig` errors.

### HTTP Logs and Metrics Source used by Azure Functions
Follow the instructions in [this](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection) section.
