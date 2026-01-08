---
slug: /send-data/collect-from-other-data-sources/azure-blob-storage/block-blob
title: Azure Blob Storage (block blobs)
description: This Sumo Logic integration provides a event-based pipeline for shipping monitoring data from Azure Blob Storage to an HTTP source on Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

This page describes a Sumo Logic integration that provides an event-based pipeline for shipping monitoring data from Azure Blob Storage (stored as block blobs) to an HTTP source on Sumo Logic.

This solution is good for monitoring Azure services that do not support exporting logs to Azure Event Hubs. If your service supports exporting to Event Hub, then use [Azure Event Hubs Source for Logs
](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

:::note
This solution is for newly created blobs only (not for existing blobs).
:::

For step-by-step instructions for configuring the Azure-Sumo Logic pipeline, see [Collect Logs from Azure Blob Storage (block blobs)](/docs/send-data/collect-from-other-data-sources/azure-blob-storage/block-blob/collect-logs).

:::sumo Micro Lesson

Watch this tutorial for an overview of collecting logs from Azure Blob Storage.

<Iframe url="https://fast.wistia.net/embed/iframe/v0i3vtfdya?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Tutorial: Collecting Logs From Azure Block Blob Storage Account Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

## Azure information resources

To learn more about exporting monitoring data from Azure services to Azure Blob Storage, see the following topics in Azure help.

| Azure feature | Learn about it | Set up logging |
|:--|:--|:--|
| Flow Logging | [Introduction to flow logging for network security groups](https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-nsg-flow-logging-overview) | [Tutorial: Log network traffic to and from a virtual machine using the Azure portal](https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-nsg-flow-logging-portal) |

## Azure-Sumo Logic pipeline

The diagram below illustrates the Azure-Sumo Logic pipeline for Azure logs collection(stored as block blobs) from Azure Blob Storage. Monitoring data flow describes the flow of logs from Azure Blob Storage to Sumo Logic.  Pipeline components describes the actors in the flow.

<img src={useBaseUrl('/img/send-data/BlockBlobReader.png')} alt="Azure-Sumo Logic pipeline" style={{border: '1px solid gray'}} width="800" />

## Monitoring data flow

Here’s a summary of how various components are stitched together in the pipeline.

1. Azure services send monitoring data (logs as append blobs type) to Azure Blob containers in a storage account. General-purpose v2 (GPv2) and Blob storage accounts are supported.
1. An Event subscription is configured with Azure Blob container as the publisher and Event Hub as the subscriber. Event Grid then routes all the create block events to Event Hub.
1. On receipt of data from Event Grid, an event hub triggers its Azure function named TaskProducer to create a task. (This is a JSON object that includes the file path, container name, storage name, start and end byte of the block blob). These tasks are then pushed to Azure Service Bus Queue.
1. Another Azure function named TaskConsumer is triggered in response to a new task in Azure Service Bus Queue. This function reads the data in the given range (from start byte to end byte), transforms the data, and sends it to an HTTP source on a hosted collector in Sumo Logic. Each of the three Azure functions sends their logs to storage accounts (named `sumobrlogs<unique_prefix>`) created by an Azure Resource Template (ARM).
1. If the TaskConsumer function is unable to process or send the message, (due to throttling or failure),  upon reaching a MaxDeliveryCount threshold of 10, it sends the message to secondary sub-queue, called a dead-letter queue (DLQ). Another Azure function named DLQTaskConsumer is triggered every 5 minutes by a timer trigger to retry sending the messages.

:::note
There is no automatic cleanup of the DLQ. Messages remain in the DLQ until you explicitly retrieve them.
:::

## Pipeline components

The table below describes the key components in the Azure-Sumo Logic pipeline.

| Component Description     | Description |
|:--|:--|
| Azure Event Grid | A fully-managed intelligent event routing service that allows for uniform event consumption using a publish-subscribe model. You select the Azure resource you would like to subscribe to, and specify the event handler or webhook endpoint to which to send the event.  |
| Azure Event Hubs | A data streaming platform and event ingestion service capable of receiving, storing. and processing millions of events per second. Event Grid routes “create block blob” events to an event hub, which triggers a Sumo Logic-provided Azure function. |
| Sumo Logic-provided Azure functions | Small pieces of code that are triggered by an Event Hub to send monitoring data to a Sumo Logic HTTP source. Each of the functions also maintains its own logs for function debug information. |
| Sumo Logic HTTP source | A Sumo Logic HTTP source on a hosted collector receives the monitoring data from the TaskConsumer Azure function.  |
| Azure Blob Storage | Microsoft's object storage solution for the cloud, optimized for storing large amounts of unstructured data, such as text or binary data. |
| Azure Service Bus Queue | A generic, cloud-based, one-directional messaging system for connecting resources—applications, services, and devices—regardless of location. Each queue acts as an intermediary (sometimes called a broker) that stores sent messages until they are received. Each message is received by a single recipient. |

## About the configuration process

Sumo Logic provides an Azure Resource Management (ARM) template to build most of the components in the pipeline. The template creates:

* An event hub to which Azure Event Grid routes create block blobs events.
* A Service Bus for storing tasks.
* Three Azure functions — BlobTaskProducer, BlobTaskConsumer, and DLQTaskConsumer that are responsible for sending monitoring data to Sumo Logic.
* A storage account to which the Azure functions write their log messages about successful and failed transmissions.

You download the Sumo Logic-provided ARM template, upload the template to the Azure Portal, set the parameters that identify the URL of your Sumo Logic HTTP source, and the name of the Azure Storage Account and its resource group (where Azure services export their logs), and deploy the template.

After deployment if you want to collect from multiple storage accounts, you create an Event Grid subscription with an Azure Storage Account as a publisher and the event hub created by the ARM template as the subscriber.You can also specify prefix/suffix filters to filter the events based container name and blob name.

For more information, see [Filtering events](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-event-overview#filtering-events) in Azure help. Then, you can start exporting your monitoring data from the Azure Service to Azure Blob Storage.

:::note
It is assumed that:

* The Azure service updates the blob (adding new blocks) in small chunks and has been tested with block blobs.
* Any JSON file in the JSON lines format that is uploaded into a storage account will result in JSON objects being extracted and sent to Sumo Logic.
* Log files have a file extension of .csv, .json, .blob, or .log.
  * In .csv files, it is assumed the delimiting character is a comma (,). The .csv files are converted to JSON and sent to Sumo Logic.
  * If the file is .json, the JSON objects are extracted and sent to Sumo Logic.
  * If the file is .blob, the JSON objects are extracted and sent to Sumo Logic.
  * If the file is .log, log lines are sent to Sumo Logic as is.
:::

For instructions, see [Collect Logs from Azure Blob Storage (block blobs)](/docs/send-data/collect-from-other-data-sources/azure-blob-storage/block-blob/collect-logs).
