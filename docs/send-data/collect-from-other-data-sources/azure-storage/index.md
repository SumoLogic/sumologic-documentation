---
slug: /send-data/collect-from-other-data-sources/azure-storage
title: Azure Storage
description: This Sumo integration provides a event-based pipeline for shipping monitoring data from Azure Blob Storage to an HTTP source on Sumo Logic.
---

import Iframe from 'react-iframe';

Logs and metrics for most Azure services can be exported to Azure Storage Account as block blobs. This page describes a Sumo integration that provides an event-based pipeline for shipping monitoring data from Azure Blob Storage to an HTTP source on Sumo Logic. 

This solution is good for monitoring Azure services that do not support exporting logs to Azure Monitor, for example, Azure Web Apps and Azure Storage Accounts.

:::note
This solution is for newly created blobs only (not for existing blobs). 
:::

For step-by-step instructions for configuring the Azure-Sumo pipeline, see [Collect Logs from Azure Blob Storage](/docs/send-data/collect-from-other-data-sources/azure-storage/azure-blob-storage/collect-logs).

Watch this tutorial for an overview of collecting logs from Azure Blob Storage.

<Iframe url="https://www.youtube.com/embed/_-N3QGxrn9k?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />
