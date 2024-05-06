---
id: azure-api-management
title: Azure API Management
description: Learn about the Sumo Logic collection process for the Azure API Management service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-api-management.png')} alt="Thumbnail icon" width="50"/>

[Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts) is a hybrid multicloud management platform for APIs across all environments. As a platform-as-a-service, API Management supports the complete API lifecycle. This integration provides near real-time visibility into the state and health of your APIs with rich information about API Management operations that are important for auditing.

## Log and metric types

For Azure API Management, you can collect the following logs and metrics:

* **Resource logs**. To learn more about the resource log schema for Azure API Management, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/api-management/gateway-log-schema-reference). The Consumption tier doesn't support the collection of resource logs.
* **Platform Metrics for Azure API Management**. These metrics are available in [Microsoft.ApiManagement/service](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-apimanagement-service-metrics) namespace.

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure API Management service you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/APIManagement/Logs`, `Azure/APIManagement/Metrics`.

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
2. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
3. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure API Management service that you want to monitor.
   1. Choose `Stream to an event hub` as destination.
   1. Select `AllMetrics`.
   1. Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/api-management/api-management-howto-use-azure-monitor#resource-logs). Perform below steps for each Azure API Management service that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `allLogs`.
   1. Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
3. By default, logging is enabled for all APIs, to modify the [logging settings](https://learn.microsoft.com/en-us/azure/api-management/diagnostic-logs-reference), refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/api-management/api-management-howto-use-azure-monitor#modify-api-logging-settings).
4. To log API Management events using [log-to-eventhub](https://learn.microsoft.com/en-us/azure/api-management/log-to-eventhub-policy) policy, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/api-management/api-management-howto-log-event-hubs?tabs=arm).

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
