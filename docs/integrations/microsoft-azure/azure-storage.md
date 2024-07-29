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

:::note
Only metrics with category=Transaction can be exported from diagnostic settings export feature.
:::

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
* Activity Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/). It is recommended to create a separate source for activity logs. If you are already collecting these logs, you can skip this step.
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.


You must explicitly enable diagnostic settings for each storage service (blob,queue,table and file) and each storage account that you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/Storage/Logs`, `Azure/Storage/Metrics`.

### Configure field in field schema
1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. Kanso-->
2. Search for following fields:
    ||
    | --------------- |
    | tenant_name     |
    | location        |
    | subscription_id |
    | resource_group  |
    | provider_name   |
    | resource_type   |
    | resource_name   |
    | service_type    |

3. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields/#manage-fields).

### Configure Field Extraction Rules
Create a Field Extraction Rule (FER) for Azure Storage by following the instructions [here](/docs/manage/field-extractions/create-field-extraction-rule/).

* **Activity Logs Location Extraction FER**

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

* **Resource ID Extraction FER**

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
### Configure metric rules
* **Azure Observability Metadata Extraction Metric Rule Service Level**
```sql
Rule Name: AzureObservabilityMetadataExtractionMetricRuleServiceLevel
```

```sql title="Metric match expression"
resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/*/*/*/*/* tenant_name=*
```
| Fields extracted |
|------------------|
| subscription_id  |
| resource_group   |
| provider_name    |
| resource_type    |
| resource_name    |

* **Azure Observability Metadata Extraction Storage Account Level**
```sql
Rule Name: AzureObservabilityMetadataExtractionStorageAccountLevel
```

```sql title="Metric match expression"
resourceId=*/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/*/*/* tenant_name=* accountresourceid=*
```
| Fields extracted |
|------------------|
| subscription_id  |
| resource_group   |
| provider_name    |
| resource_type    |
| resource_name    |

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
2. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
3. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each storage service (blob,queue,table and file) and each storage account that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `Transaction`.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure logs collection

#### Diagnostic logs
In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform below steps for each storage service (blob,queue,table and file) and each storage account that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

#### Activity Logs
To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit).


## Installing the Azure Storage app

Now that you have set up data collection, install the Azure Storage Sumo Logic app to use the pre-configured [dashboards](#viewing-the-azure-storage-app-dashboards) that provide visibility into your environment for real-time analysis of overall usage.


import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Upgrading the Azure Storage app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Storage app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Viewing the Azure Storage app dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>


### Azure Storage - Overview

The **Azure Storage Overview** dashboard provides insights into transactions by storage account, storage type, and API name.

Use this dashboard to:
    * View transactions by storage account.
    * Monitor transactions by storage type.
    * Monitor transactions by API name.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Overview.png')} alt="Azure Storage Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### Azure Storage - Access

The **Azure Storage Access** dashboard provides insights into transactions by location, TLS version also it shows distribution by user agent and identity type.

Use this dashboard to:
    * View transactions by location.
    * View transactions by TLS version.
    * View distribution by user agent.
    * View distribution by identity type.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Access.png')} alt="Azure Storage Overview Access" style={{border: '1px solid gray'}} width="800" />

### Azure Storage - Operations

The **Azure Storage Operations** dashboard provides details like total write in bytes, total read, total ingress by storage account, total egress by storage account.
Also it gives storage account statistic insights like total read count, read bytes, max/avg read latency, total write count, write bytes, and max/avg write latency. It also shows status code trend.

Use this dashboard to:
    * View amount of write data in MB.
    * View amount of read data in MB.
    * Monitor total ingress by storage account.
    * Monitor total egress by storage account.
    * View storage account statistics.
    * View status code trend.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Operations.png')} alt="Azure Storage Overview Operations" style={{border: '1px solid gray'}} width="800" />

### Azure Storage - Blob Service

The **Azure Storage Blob Service** dashboard provides details like read bytes, write bytes, last 10 operations, read/write trend by service type, and top 10 read/write by resource name.

Use this dashboard to:
    * View amount of read data in MB.
    * View amount of write data in MB.
    * View last 10 operations.
    * Monitor read trend by service type.
    * Monitor write trend by service type.
    * View top 10 read by resource name.
    * View top 10 write by resource name.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Blob-Service.png')} alt="Azure Storage Blob Service dashboard" style={{border: '1px solid gray'}} width="800" />

### Azure Storage - File Service

The **Azure Storage File Service** dashboard provides details like read bytes, write bytes, last 10 operations, read/write trend by service type, and top 10 read/write by resource name.

Use this dashboard to:
    * View amount of read data in MB.
    * View amount of write data in MB.
    * View last 10 operations.
    * Monitor read trend by service type.
    * Monitor write trend by service type.
    * View top 10 read by resource name.
    * View top 10 write by resource name.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-File-Service.png')} alt="Azure Storage File Service dashboard" style={{border: '1px solid gray'}} width="800" />

### Azure Storage - Queue Service

The **Azure Storage Queue Service** dashboard provides details like read bytes, write bytes, last 10 operations, read/write trend by service type, and top 10 read/write by resource name.

Use this dashboard to:
    * View amount of read data in MB.
    * View amount of write data in MB.
    * View last 10 operations.
    * Monitor read trend by service type.
    * Monitor write trend by service type.
    * View top 10 read by resource name.
    * View top 10 write by resource name.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Queue-Service.png')} alt="Azure Storage Queue Service dashboard" style={{border: '1px solid gray'}} width="800" />

### Azure Storage - Table Service

The **Azure Storage Table Service** dashboard provides details like read bytes, write bytes, last 10 operations, read/write trend by service type, and top 10 read/write by resource name.

Use this dashboard to:
    * View amount of read data in MB.
    * View amount of write data in MB.
    * View last 10 operations.
    * Monitor read trend by service type.
    * Monitor write trend by service type.
    * View top 10 read by resource name.
    * View top 10 write by resource name.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Table-Service.png')} alt="Azure Storage Table Service dashboard" style={{border: '1px solid gray'}} width="800" />

### Azure Storage - Audit control plane operations

The **Azure Storage Audit control plane operations** dashboard provides details like Changes, Read/Write/Delete specific changes, different operations used, and top 10 operations that caused most errors and most common errors.

Use this dashboard to:
    * View last 24 hours changes.
    * View changes - read, write and delete.
    * View operations used.
    * Top 10 operations that caused the most errors.
    * Top 10 most common errors.
    * View requests with anonymous access.
    * view Operations that caused server-side throttling errors.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Audit-control-plane-operations.png')} alt="Azure Storage audit control plane operations dashboard" style={{border: '1px solid gray'}} width="800" />

### Azure Storage - Security and policy

The **Azure Storage Security and policy** dashboard provides details -
    
Use this dashboard to:
    * View recent security events.
    * View total security events.
    * View total denied policy events
    * View recent failed policy events
    * View recent success policy events
    * View total recommendation events
    * View recent recommendation events

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Security-and-policy.png')} alt="Azure Storage Security and policy dashboard" style={{border: '1px solid gray'}} width="800" />

### Azure Storage - health

The **Azure Storage health** dashboard provides details -
    
Use this dashboard to:
    * View recent service health incidents
    * Monitor service health by event type
    * View recent alerts
    * View total alerts
    * View alerts over time
    * View recent resource health incidents
    * Monitor resource health by event type

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Storage-Health.png')} alt="Azure Storage health dashboard" style={{border: '1px solid gray'}} width="800" />

### Azure Storage - Availability

The **Azure Storage Availability** metrics dashboard provides details like availability in percentage, availability by API name, and trend by API name and by storage type.

Use this dashboard to:
    * Monitor availability percentage
    * Monitor availability percentage by API name
    * Monitor availability trend by API name
    * Monitor availability trend by API storage type

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Availability.png')} alt="Azure storage availability dashboard" style={{border: '1px solid gray'}} width="800" />

### Azure Storage - Failures

The **Azure Storage Failures** metrics dashboard provides details like failing transactions by API name, by response type, by storage account, and by storage type.

Use this dashboard to:
    * Monitor failing transactions by API name
    * Monitor failing transactions by response type
    * Monitor failing transactions by storage account
    * Monitor failing transactions by service type
    * Monitor failing transactions by authentication

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Failures.png')} alt="Azure Storage Failures dashboard" style={{border: '1px solid gray'}} width="800" />

### Azure Storage - Performance

The **Azure Storage Performance** metrics dashboard provides details like failing transactions by API name, by response type, by storage account, and by storage type.

Use this dashboard to:
    * Monitor average success server latency
    * Monitor average success E2E latency
    * Monitor top success server latency by operation
    * Monitor top success E2E latency by operation

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Performance.png')} alt="Azure Storage Performance dashboard" style={{border: '1px solid gray'}} width="800" />


## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
