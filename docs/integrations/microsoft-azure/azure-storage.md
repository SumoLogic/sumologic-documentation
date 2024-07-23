---
id: azure-storage
title: Azure Storage
description: Learn about the Sumo Logic collection process for the Azure Storage service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-storage.png')} alt="Thumbnail icon" width="50"/>

[Azure Storage](https://learn.microsoft.com/en-us/azure/storage/common/storage-introduction) is Microsoft's cloud storage solution for modern data storage scenarios offering highly available, massively scalable, durable, and secure storage for a variety of data objects in the cloud. This integration helps in monitoring the transaction volume and read/write activity of all your storage accounts.

In Azure Storage, [storage accounts](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview) allow you to create and manage the following storage services:

* **[Blob storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview)** stores any type of text or binary data, such as a document, media file, or application installer. You can set Blob storage for private access or share contents publicly to the Internet. Blob storage serves the same purpose as both AWS S3 and EBS.
* **[Table storage](https://learn.microsoft.com/en-us/azure/storage/tables/table-storage-overview)**. Stores structured datasets. Table storage is a NoSQL key-attribute data store that allows for rapid development and fast access to large quantities of data. Similar to AWS SimpleDB and DynamoDB services.
* **[Queue storage](https://learn.microsoft.com/en-us/azure/storage/queues/storage-queues-introduction)**. Provides messaging for workflow processing and for communication between components of cloud services.
* **[File storage](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction)**. Offers shared storage for legacy applications using the standard Server Message Block (SMB) protocol. File storage is used in a similar manner to EFS in the AWS platform.

## Log and metric types

For Azure Storage, you can collect the following logs and metrics:

**Resource logs**, which provide an insight into operations that were performed within an Azure resource. For a complete schema for resource logs refer to the below documentation:
* [Azure Blob Storage schema](https://learn.microsoft.com/en-us/azure/storage/blobs/monitor-blob-storage-reference#resource-logs)
* [Azure File Storage schema](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-monitoring-reference#resource-logs)
* [Azure Queue Storage schema](https://learn.microsoft.com/en-us/azure/storage/queues/monitor-queue-storage-reference#resource-logs)
* [Azure File Storage schema](https://learn.microsoft.com/en-us/azure/storage/tables/monitor-table-storage-reference#resource-logs)

Requests made by the Blob storage service itself, such as log creation or deletion, aren't logged. For a full list of the logged data, see [Storage logged operations and status messages](https://learn.microsoft.com/en-us/rest/api/storageservices/storage-analytics-logged-operations-and-status-messages).

**Metrics** for Azure Storage are in below namespaces:
* [Microsoft.Storage/storageAccounts](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-storage-storageaccounts-metrics)
* [Microsoft.Storage/storageAccounts/blobServices](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-storage-storageaccounts-blobservices-metrics)
* [Microsoft.Storage/storageAccounts/fileServices](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-storage-storageaccounts-fileservices-metrics)
  * [Microsoft.Storage/storageAccounts/queueServices](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-storage-storageaccounts-queueservices-metrics)
  * [Microsoft.Storage/storageAccounts/tableServices](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-storage-storageaccounts-tableservices-metrics)

Click on the above namespaces to learn more about the supported metrics. For a complete list of the dimensions that Azure Storage supports, refer to the below documentation.

* [Azure Blob Storage Metrics dimensions](https://learn.microsoft.com/en-us/azure/storage/blobs/monitor-blob-storage-reference#metrics-dimensions)
* [Azure File Storage Metrics dimensions](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-monitoring-reference#metrics)
* [Azure Queue Storage Metrics dimensions](https://learn.microsoft.com/en-us/azure/storage/queues/monitor-queue-storage-reference#metrics)
* [Azure Table Storage Metrics dimensions](https://learn.microsoft.com/en-us/azure/storage/tables/monitor-table-storage-reference#metrics)

:::info
Capacity metrics are currently not supported via Diagnostic Settings.
:::

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Activity Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).  It is recommended to create a separate source for activity logs. In case you are already collecting these logs previously you can skip this step.
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each storage service (blob,queue,table and file) and each storage account that you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/Storage/Logs`, `Azure/Storage/Metrics`.

Metrics and logs in Azure Monitor support only Azure Resource Manager storage accounts. Azure Monitor doesn't support classic storage accounts. If you want to use metrics or logs on a classic storage account, you need to migrate to an Azure Resource Manager storage account. For more information, see [Migrate to Azure Resource Manager](https://learn.microsoft.com/en-us/azure/virtual-machines/migration-classic-resource-manager-overview).

## Configure Field in Field Schema
In the main Sumo Logic menu, select Manage Data > Logs > Fields.
Search for the “functionname” field.
If not present, create it. Learn how to create and manage fields [here](https://help.sumologic.com/docs/manage/fields/#manage-fields).

## Configure FER
Create a Field Extraction Rule for Azure Storage. Learn how to create a Field Extraction Rule [here](https://help.sumologic.com/docs/manage/field-extractions/create-field-extraction-rule/).
**ActivityLogsLocationExtraction**
```sql
Rule Name: AzureLocationExtractionFER
Applied at: Ingest Time
Scope (Specific Data): tenant_name=*
```

```sql title="Parse Expression"
json "location", "properties.resourceLocation", "properties.region" as location, resourceLocation, service_region nodrop
| replace(toLowerCase(resourceLocation), " ", "") as resourceLocation
| if (!isBlank(resourceLocation), resourceLocation, location) as location
| if (!isBlank(service_region), service_region, location) as location 
| if (isBlank(location), "global", location) as location
| fields location
```

```sql
Rule Name: AzureResourceIdExtractionFER
Applied at: Ingest Time
Scope (Specific Data): tenant_name=*
```

```sql title="Parse Expression"
json "resourceId"
| toUpperCase(resourceId) as resourceId
| parse regex field=resourceId "/SUBSCRIPTIONS/(?<subscription_id>[^/]+)" nodrop
| parse field=resourceId "/RESOURCEGROUPS/*/" as resource_group nodrop
| parse regex field=resourceId "/PROVIDERS/(?<provider_name>[^/]+)" nodrop
| parse regex field=resourceId "/PROVIDERS/[^/]+(?:/LOCATIONS/[^/]+)?/(?<resource_type>[^/]+)/(?<resource_name>.+)" nodrop
| parse regex field=resource_name "(?<parent_resource_name>[^/]+)(?:/PROVIDERS/[^/]+)?/(?<service_type>[^/]+)/?(?<child_service_name>.+)" nodrop
| if (isBlank(parent_resource_name), resource_name, parent_resource_name) as resource_name
| fields subscription_id, location, provider_name, resource_group, resource_type, resource_name, service_type
```

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
2. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
3. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each storage service (blob,queue,table and file) and each storage account that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `Transaction`.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure logs collection
**Diagnostic Logs**
In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform below steps for each storage service (blob,queue,table and file) and each storage account that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

**Activity Logs**
To collect activity logs follow the instruction in [azure audit app docs](https://help.sumologic.com/docs/integrations/microsoft-azure/audit/#collecting-logs-for-the-azure-audit-app-from-event-hub)


## Installing the Azure Storage app

Now that you have set up a collection for **Azure Storage**, install the Sumo Logic app to use the pre-configured [dashboards](#viewing-the-rds-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Upgrading the Azure Storage app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Storage app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Viewing the Azure Storage app dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

We highly recommend you view these dashboards in the Azure Storage.

### Azure Storage - Overview

The **Azure Storage Overview** dashboard provides insights into transactions by storage account, storage type and api name.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Overview.png')} alt="Azure Storage Overview dashboard" />

### Azure Storage - Access

The **Azure Storage Access** dashboard provides insights into transactions by location, TLS version also it shows distribution by user agent and identity type.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Access.png')} alt="Azure Storage Overview Access" />

### Azure Storage - Operations

The **Azure Storage Operations** dashboard provides details like total write in bytes, total read, total ingress by storage account, total egress by storage account.
Also it gives storage account statistic insights like total read count, read bytes, max/avg read latency, total write count, write bytes, max/avg write latency etc., Along with this it shows status code trend

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Operations.png')} alt="Azure Storage Overview Operations" />

### Azure Storage - Blob Service

The **Azure Storage Blob Service** dashboard provides details like read bytes, write bytes, last 10 operations, read/write trend by service type etc., top 10 read/write by resource name etc.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Blob-Service.png')} alt="Azure Storage Blob Service dashboard" />

### Azure Storage - File Service

The **Azure Storage File Service** dashboard provides details like read bytes, write bytes, last 10 operations, read/write trend by service type etc., top 10 read/write by resource name etc.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-File-Service.png')} alt="Azure Storage File Service dashboard" />

### Azure Storage - Queue Service

The **Azure Storage Queue Service** dashboard provides details like read bytes, write bytes, last 10 operations, read/write trend by service type etc., top 10 read/write by resource name etc.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Queue-Service.png')} alt="Azure Storage Queue Service dashboard" />

### Azure Storage - Table Service

The **Azure Storage Table Service** dashboard provides details like read bytes, write bytes, last 10 operations, read/write trend by service type etc., top 10 read/write by resource name etc.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Table-Service.png')} alt="Azure Storage Table Service dashboard" />

### Azure Storage - Audit control plane operations

The **Azure Storage Audit control plane operations** dashboard provides details like Changes, Read/Write/Delete specific changes, different operations used, top 10 operations that caused most errors and most common errors etc.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Audit-control-plane-operations.png')} alt="Azure Storage audit control plane operations dashboard" />


### Azure Storage - Security and policy

The **Azure Storage Security and policy** dashboard provides details -
    1. Security: Recent security events, total security events.
    2. Policy: Recent failed policy events, recent success policy events
    3. Recommendation: Total recommendation events, Recent recommendation events

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Security-and-policy.png')} alt="Azure Storage Security and policy dashboard" />


### Azure Storage - health

The **Azure Storage health** dashboard provides details -
    1. Service Health: Recent service health incidents, service health by event type.
    2. Alerts: Recent alerts, total alerts, alerts over time
    3. Resource Health: Recent resource health incidents, resource health by event type

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Storage-health.png')} alt="Azure Storage health dashboard" />


### Azure Storage - Availability

The **Azure Storage Availability** metrics dashboard provides details like availability in percentage, availability by API name and trend by api name, by storage type etc.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Availability.png')} alt="Azure storage availability dashboard" />


### Azure Storage - Failures

The **Azure Storage Failures** metrics dashboard provides details like failing transactions by API name, by response type, by storage account and by storage type etc.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Failures.png')} alt="Azure Storage Failures dashboard" />


## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
