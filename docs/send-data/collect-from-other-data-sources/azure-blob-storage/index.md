---
slug: /send-data/collect-from-other-data-sources/azure-blob-storage
title: Azure Blob Storage
description: This Sumo integration provides a event-based pipeline for shipping monitoring data from Azure Blob Storage to an HTTP source on Sumo Logic.
---

Logs and metrics for most Azure services can be exported to Azure Storage Account as block blobs. This page describes a Sumo integration that provides an event-based pipeline for shipping monitoring data from Azure Blob Storage to an HTTP source on Sumo Logic. 

This solution is good for monitoring Azure services that do not support exporting logs to Azure Monitor, for example, Azure Web Apps and Azure Storage Accounts.

:::note
This solution is for newly created blobs only (not for existing blobs). 
:::

For step-by-step instructions for configuring the Azure-Sumo pipeline, see [Collect Logs from Azure Blob Storage](collect-logs-azure-blob-storage.md).

## Azure information resources

To learn more about exporting monitoring data from Azure services to Azure Blob Storage, see the following topics in Azure help.  

| Azure feature | Learn about it | Set up logging |
|:--|:--|:--|
| Flow Logging | [Introduction to flow logging for network security groups.](https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-nsg-flow-logging-overview) | [Tutorial: Log network traffic to and from a virtual machine using the Azure portal](https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-nsg-flow-logging-portal) |

## Azure-Sumo pipeline

The diagram below illustrates the Azure-Sumo pipeline for Azure logs collection from Azure Blob Storage. Monitoring data flow describes the flow of logs from Azure Blob Storage to Sumo Logic.  Pipeline components describes the actors in the flow.

![Azure-Sumo-pipeline-Sumologic.png](/img/send-data/Azure-Sumo-pipeline-Sumologic.png)

## Monitoring data flow

Here’s a summary of how various components are stitched together in the pipeline.

1. Azure services send monitoring data (logs and metrics) to Azure Blob containers in a storage account. General-purpose v2 (GPv2) and Blob storage accounts are supported.
1. An Event subscription is configured with Azure Blob container as the publisher and Event Hub as the subscriber. Event Grid then routes all the create block events to Event Hub. 
1. On receipt of data from Event Grid, an event hub triggers its Azure function named TaskProducer to create a task. (This is a JSON object that includes the start and end byte of the block blob).These tasks are then pushed to Azure Service Bus Queue.
1. Another Azure function named TaskConsumer is triggered in response to a new task in Azure Service Bus Queue. This function reads the data in the given range (from start byte to end byte), transforms the data, and sends it to an HTTP source on a hosted collector in Sumo. Each of the three Azure functions sends their logs to storage accounts (named `sumobrlogs<unique_prefix>`) created by an Azure Resource Template (ARM).
1. If the TaskConsumer function is unable to process or send the message, (due to throttling or failure,  upon reaching a MaxDeliveryCount threshold of 10, it sends the message to secondary sub-queue, called a dead-letter queue (DLQ). Another Azure function named DLQTaskConsumer is triggered every 5 minutes by a timer trigger to retry sending the messages.

:::note
There is no automatic cleanup of the DLQ. Messages remain in the DLQ until you explicitly retrieve them.
:::

## Pipeline components

The table below describes the key components in the Azure-Sumo pipeline.

| Component Description     | Description |
|:--|:--|
| Azure Event Grid | A fully-managed intelligent event routing service that allows for uniform event consumption using a publish-subscribe model. You select the Azure resource you would like to subscribe to, and specify the event handler or WebHook endpoint to which to send the event.  |
| Azure Event Hubs | A data streaming platform and event ingestion service capable of receiving, storing. and processing millions of events per second. Event Grid routes “create block blob” events to an event hub, which triggers a Sumo-provided Azure function. |
| Sumo-provided Azure functions | Small pieces of code that are triggered by an Event Hub to send monitoring data to a Sumo HTTP source. Each of the functions also maintains its own logs for function debug information. |
| Sumo HTTP source | A Sumo HTTP source on a hosted collector receives the monitoring data from the TaskConsumer Azure function.  |
| Azure Blob Storage | Microsoft's object storage solution for the cloud, optimized for storing large amounts of unstructured data, such as text or binary data. |
| Azure Service Bus Queue | A generic, cloud-based, one-directional messaging system for connecting resources—applications, services, and devices—regardless of location. Each queue acts as an intermediary (sometimes called a broker) that stores sent messages until they are received. Each message is received by a single recipient. |

## About the configuration process

Sumo provides an Azure Resource Management (ARM) template to build most of the components in the pipeline. The template creates: 

* An event hub to which Azure Event Grid routes create block blobs events. 
* A Service Bus for storing tasks.
* Three Azure functions—TaskProducer, TaskConsumer, and DLQTaskConsumer—that are responsible for sending monitoring data to Sumo.
* A storage account to which the Azure functions write their log messages about successful and failed transmissions.

You download the Sumo-provided ARM template, upload the template to the Azure Portal, set the parameters that identify the URL of your Sumo HTTP source, and the connection string of for the Azure Storage Account (where Azure services export their logs), and deploy the template.

After deployment, you create an Event Grid subscription with an Azure Storage Account as a publisher and the event hub created by the ARM template as the subscriber. You can also specify prefix/suffix filters to filter the events based container name and blob name.

For more information, see [Filtering events](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-event-overview#filtering-events) in Azure help. Then, you can start exporting your monitoring data from the Azure Service to Azure Blob Storage.   

:::note
It is assumed that:

* The Azure service updates the blob (adding new blocks) in small chunks and has been tested with block blobs.
* Any JSON file in the JSON lines format that is uploaded into a storage account will result in JSON objects being extracted and sent to Sumo.
* Log files have a file extension of .csv, .json, .blob, or .log.
  * In .csv files, it is assumed the delimiting character is a comma (,). The .csv files are converted to JSON and sent to Sumo.
  * If the file is .json, the JSON objects are extracted and sent to Sumo.
  * If the file is .blob, the JSON objects are extracted and sent to Sumo.
  * If the file is .log, log lines are sent to Sumo as is.  
:::

For instructions, see [Collect Logs from Azure Blob Storage](collect-logs-azure-blob-storage.md).
