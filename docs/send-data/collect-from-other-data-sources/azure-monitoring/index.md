---
slug: /send-data/collect-from-other-data-sources/azure-monitoring
title: Azure Monitoring
description: Overview of strategy for collecting application and infrastructure data (logs and metrics) for Azure services using Azure Monitor.
---

This page has information about Sumo’s solution for obtaining application and infrastructure data (logs and metrics) for Azure services using Azure Monitor. This solution enables you to monitor:

* **Activity Logs**. Activity Logs are subscription-level logs that provide insight into the operations performed on resources in your subscription, for example, creating a virtual machine or deleting a logic app.
* **Diagnostics Logs**. Diagnostics Logs are resource-level logs that provide insight into operations that were performed within a resource itself, for example, getting a secret from a Key Vault.
* **Metrics**. Metrics provide performance statistics for different resources and the operating system in a virtual machine.

Sumo Logic’s serverless solution integrates with Azure Monitor, enabling users to monitor a comprehensive set of Azure Services. For information about metrics available from Azure Monitor and resource type-specific information about Azure Diagnostic logs, see the following topics in Azure help:

* [Supported metrics with Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-supported-metrics)
* [Supported categories for Azure Monitor resource logs](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories)

## Solution overview

Azure Monitor provides a pipeline for shipping monitoring data out of Azure to a partner monitoring tool like Sumo Logic. Logs and metrics for most Azure services can be obtained from Azure Monitor. Over time, all Azure services will report logs and metrics to Azure Monitor.  

:::tip
For a general discussion of Microsoft’s approach to sharing monitoring data from Azure Monitor with external apps, see [Stream Azure monitoring data to an event hub for consumption by an external tool](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitor-stream-monitoring-data-event-hubs).
:::

The diagram below illustrates the Azure-Sumo pipelines for Azure log and metric collection. [Monitoring data flow](#monitoring-data-flow) describes the flow of metrics from Azure services to Sumo Logic. [Pipeline Components](#pipeline-components) describes the actors in the flow.

![azure-overview.png](/img/send-data/azure-overview.png)

## Monitoring data flow

Here’s a summary of how logs and metrics from Azure services get into Sumo Logic:

1. Azure services send monitoring data (logs and metrics) to Azure Monitor.
1. Azure Monitor streams the logs to a logs event hub and metrics to a metrics event hub.
1. On receipt of data from Azure Monitor, an event hub triggers its Azure function to send the data onto an HTTP source on a hosted collector in the Sumo cloud.  
1. Upon being triggered by its event hub, an Azure function sends the monitoring data it received (either logs or metrics) to an appropriately configured HTTP source on a hosted collector in the Sumo cloud.  

## Pipeline components

The Azure-Sumo pipelines for Azure log and metric collection use event hubs and Sumo-provided Azure functions to get monitoring data from Azure Monitor to Sumo. Here’s what each component does:

* **Azure Monitor** collects logs and metrics for most Microsoft Azure services, and serves as a pipeline for accessing to monitoring data from an Azure environment,
* **Azure Event Hubs** is a data streaming platform and event ingestion service that you can use to integrate Azure Monitor with Sumo Logic. Azure Monitor streams monitoring data to an event hub which triggers a Sumo-provided Azure function.
* The **Sumo Azure functions** are small pieces of code that are triggered by an Event Hub to send monitoring data to a Sumo HTTP source. Each of the functions also maintains its own logs: one for recording failures (when logs could not be sent to Sumo for some reason) and another for function debug information.
* A **Sumo HTTP source** receives and ingests the monitoring data from the Azure function. There is one HTTP source for logs, and another for metrics. An HTTP source can be configured for metrics or logs, not both.

## About the configuration process

Sumo provides Azure Resource Manager (ARM) templates to build the pipelines, one for logs, one for metrics. Each template creates an event hub to which Azure Monitor streams logs or metrics, an Azure function for sending monitoring data on to Sumo, and storage accounts to which the function writes its own log messages about successful and failed transmissions.

You download an ARM template, edit it to add the URL of your HTTP source, copy the template into Azure Portal, and deploy it. Then, you can start pushing your monitoring data from Azure Monitor through the pipeline into Sumo.   

For instructions, see [Collect Logs from Azure Monitor](collect-logs-azure-monitor.md) and [Collect Metrics from Azure Monitor](collect-metrics-azure-monitor.md).

## Azure resource cost considerations

For information about Azure pricing, see [Event Hubs pricing](https://azure.microsoft.com/en-us/pricing/details/event-hubs/) and [Block Blob pricing](https://azure.microsoft.com/en-us/pricing/details/storage/blobs/).

## Azure Integration FAQs 

For answers to frequently asked questions about integrating Azure into an enterprise environment using ARM (Azure Resource Manager) architecture, see [Azure Integrations using ARM](/docs/integrations/microsoft-azure/arm-integration-faq).
