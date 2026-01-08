---
id: microsoft-dynamics365-customer-insights
title: Microsoft Dynamics 365 Customer Insights
description: Learn about the Sumo Logic collection process for the Microsoft Dynamics 365 Customer Insights service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/microsoft-dynamics365-customer-insights.png')} alt="Thumbnail icon" width="50"/>

[Microsoft Dynamics 365 Customer Insights](https://learn.microsoft.com/en-us/dynamics365/customer-insights/overview) helps deliver personalized customer experiences by unifying customer data with operational and IoT data in real time. This integration tracks changes via the Dynamics 365 Customer Insights UI; creation, update, and deletion events of API calls; and monitoring the execution events of workflow.

## Log types

For Microsoft Dynamics 365 Customer Insights, you can collect the following types of logs:

* **Audit events**. API events to track the configuration changes on the service.
* Operational events
  * **Workflow events**. The execution events of a workflow.
  * **API events**. Events to track all API calls from the customer's instance to Dynamics 365 Customer Insights.

API events and workflow events have a common structure, but with a few differences. For more information, see [API event schema](https://learn.microsoft.com/en-us/dynamics365/customer-insights/diagnostics#api-event-schema) or [Workflow event schema](https://learn.microsoft.com/en-us/dynamics365/customer-insights/diagnostics#workflow-event-schema).

### Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/Dynamic365/Logs`

### Prerequisites

Follow the [prerequisites](https://learn.microsoft.com/en-us/dynamics365/customer-insights/diagnostics#prerequisites) before configuring the collection setup. We will be using Event hub as a destination resource, and more details about its limitations and permissions are described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. Create an Event Hubs namespace as described in step 2 of [Vendor configuration](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#vendor-configuration). Here, you do not have to create an Event Hub Instance in step 3 since `Microsoft Dynamics 365 Customer Insights` automatically creates the below two Event Hubs:
    * **insight-logs-audit**. It contains audit events.
    * **insight-logs-operational**. It contains operational events.
2. Create a [Shared Access Policy](https://docs.microsoft.com/en-us/azure/governance/policy/overview) for the entire namespace with the `Listen` claim or you can use the existing default `RootManageSharedAccessKey` policy. Copy the `Primary key` associated with this policy. For more details, refer to steps 4 and 5 of the [Vendor configuration section](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#vendor-configuration).
3. Create two Azure Event Hubs Sources using the instructions described [here](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#vendor-configuration). You can add both of them to the same Hosted Collector. Provide `insight-logs-audit` and `insight-logs-operational` as `Event Hubs Instance Name` in the two Azure Event Hubs Sources, respectively.
4. To create the Diagnostic settings in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/dynamics365/customer-insights/diagnostics#set-up-diagnostics-with-azure-monitor).
   1. Choose Event Hub as the `Resource type`.
   1. Select the Event Hub's `Subscription` name, `Resource group` name, and `Resource` name for the destination resource.

