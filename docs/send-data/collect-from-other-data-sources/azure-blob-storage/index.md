---
slug: /send-data/collect-from-other-data-sources/azure-blob-storage
title: Azure Blob Storage
description: This Sumo integration provides a event-based pipeline for shipping monitoring data from Azure Blob Storage to an HTTP source on Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

[Azure Blob Storage](https://learn.microsoft.com/en-gb/azure/storage/blobs/storage-blobs-overview) is Microsoft's object storage solution for the cloud.The storage service offers three types of blobs, block blobs, append blobs, and page blobs. Refer Azure [docs](https://learn.microsoft.com/en-us/rest/api/storageservices/understanding-block-blobs--append-blobs--and-page-blobs) for more details.
Logs and metrics for most Azure services can be exported to an Azure Storage Account. Sumo Logic supports collecting logs from Azure Blob Storage with below two solutions for append and block blobs.

1. [Collect Logs from Azure Blob Storage (block blobs)](/docs/send-data/collect-from-other-data-sources/azure-blob-storage/block-blob/collect-logs/)
1. [Collect Logs from Azure Blob Storage (append blobs)](/docs/send-data/collect-from-other-data-sources/azure-blob-storage/append-blob/collect-logs/)

In this section, we'll introduce the following concepts:

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/azure-blob-storage/block-blob"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Azure Blob Storage (block blobs)</h4></a>
  <p>Learn about event-based pipeline to ship block blob data from Azure Blob Storage to an HTTP source.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/azure-blob-storage/append-blob"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Azure Blob Storage (append blobs)</h4></a>
  <p>Learn about event-based pipeline to ship append blob data from Azure Blob Storage to an HTTP source.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/azure-blob-storage/troubleshoot-log-collection"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Troubleshoot Azure Storage Log Collection</h4></a>
  <p>Learn why log data is not flowing into Sumo Logic from Azure Blob Storage.</p>
  </div>
</div>
</div>
