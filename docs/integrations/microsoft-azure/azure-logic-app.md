---
id: azure-logic-app
title: Azure Logic App
description: Learn about the Sumo Logic collection process for the Azure Logic App service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-logic-app.png')} alt="Thumbnail icon" width="50"/>

[Azure Logic App](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview) is a cloud platform where you can create and run automated workflows with little to no code. This integration helps in monitoring logic app workflow's run status, trigger history, run history, and performance. It also helps in tracking successful delivery or receipt, errors, and properties for business-to-business (B2B) messages.

## Log and metric types

For Azure Logic App, you can collect the following logs and metrics:

* **Workflow runtime diagnostic events**. To learn more about the different resource log category types and schemas collected for Azure Logic App, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/key-vault/general/monitor-key-vault-reference#resource-logs).
* **Integration Account track events**. To learn more about the different tracking schemas for integration accounts, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/logic-apps/tracking-schemas-as2-x12-custom).
* **Logic App Workflow Metrics**. These metrics are available in [Microsoft.Logic/Workflows](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-logic-workflows-metrics) namespace.
* **Integration Account Metrics**. These metrics are available in [Microsoft.Logic/IntegrationServiceEnvironments](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-logic-integrationserviceenvironments-metrics) namespace.

For more information on supported metrics and their units, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/key-vault/general/monitor-key-vault-reference#key-vault-metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Logic App and integration account you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/LogicApp/Logs`, `Azure/LogicApp/Metrics`. The below setup instructions applies to both Consumption and Standard plan based Logic Apps.

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
2. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
3. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Logic App and integration account that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `AllMetrics`.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs cloud-to-cloud source in Sumo Logic portal, refer to our [Azure Event Hubs source documentation](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/logic-apps/monitor-workflows-collect-diagnostic-data?tabs=consumption#add-a-diagnostic-setting) for Logic App resource and [this documentation](https://learn.microsoft.com/en-us/azure/logic-apps/monitor-b2b-messages-log-analytics#set-up-azure-monitor-logs) for integration accounts. Perform below steps for each Logic App that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs` for Logic App or `IntegrationAccountTrackingEvents` for integration account.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### Azure Event Hubs Source

Common error types are described [here](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#error-types).

You can try [restarting](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#restarting-your-source) the source for `ThirdPartyConfig` errors.

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
