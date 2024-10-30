---
id: azure-cosmos-db
title: Azure Cosmos DB
description: Learn about the Sumo Logic collection process for the Azure Cosmos DB service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-cosmos-db.png')} alt="Thumbnail icon" width="50"/>

[Azure Cosmos DB](https://learn.microsoft.com/en-us/azure/cosmos-db/introduction) is a fully managed NoSQL and relational database for modern app development offering single-digit millisecond response times, automatic and instant scalability, along with guaranteed speed at any scale. This integration helps in monitoring the overall performance, failures, capacity, and operational health of all your Azure Cosmos DB resources.

The below instructions applies to the following [database APIs](https://learn.microsoft.com/en-us/azure/cosmos-db/choose-api):

* NoSQL
* MongoDB
* Cassandra
* Gremlin
* Table

:::note
This app has been tested with MongoDB, Cassandra and NoSQL database account types.
:::

## Log and metric types

For Azure Cosmos DB, you can collect the following logs and metrics:

* **Resource logs**. To learn more about the different resource log category types and schemas collected for Azure Cosmos DB, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/monitor-reference#resource-logs).
* **Platform Metrics for Azure Cosmos DB**. For more information on supported metrics and dimensions, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/monitor-reference#metrics).
These metrics are available in following namespaces
   * Microsoft.DocumentDB/applicationGateways
   * Microsoft.DocumentDB/cassandraClusters
   * Microsoft.DocumentDB/mongoClusters

* **Activity logs**, provides insight into any subscription-level or management group level events that have occurred in the Azure. To learnmore, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log-schema).


## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure Cosmos DB account you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/CosmosDB/Logs`, `Azure/CosmosDB/Metrics`.


### Configure field in field schema

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**.
1. Search for the following fields:
   - `tenant_name`. This field is tagged at the collector level. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
   - `location`. The region to which the resource name belongs to.
   - `subscription_id`. ID associated with a subscription where the resource is present.
   - `resource_group`. The resource group name where the Azure resource is present.
   - `provider_name`. Azure resource provider name (for example, Microsoft.Network).
   - `resource_type`. Azure resource type (for example, storage accounts).
   - `resource_name`. The name of the resource (for example, storage account name).
   - `service_type`. Type of the service that can be accessed with a Azure resource.
   - `service_name`. Services that can be accessed with an Azure resource (for example, Azure SQL databases in Azure SQL Server).
1. Create the fields if they are not present. Refer to [Manage fields](/docs/manage/fields/#manage-fields).

### Configure Field Extraction Rules

Create the following field extraction rules (FER) for Azure Storage by following the instructions in [Create a Field Extraction Rule](/docs/manage/field-extractions/create-field-extraction-rule/).

#### Azure location extraction FER

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

#### Resource ID extraction FER

   ```sql
   Rule Name: AzureResourceIdExtractionFER
   Applied at: Ingest Time
   Scope (Specific Data): tenant_name=*
   ```

   ```sql title="Parse Expression"
   json "resourceId", "ResourceId" as resourceId1, resourceId2 nodrop
   | if (isBlank(resourceId1), resourceId2, resourceId1) as resourceId
   | toUpperCase(resourceId) as resourceId
   | parse regex field=resourceId "/SUBSCRIPTIONS/(?<subscription_id>[^/]+)" nodrop
   | parse field=resourceId "/RESOURCEGROUPS/*/" as resource_group nodrop
   | parse regex field=resourceId "/PROVIDERS/(?<provider_name>[^/]+)" nodrop
   | parse regex field=resourceId "/PROVIDERS/[^/]+(?:/LOCATIONS/[^/]+)?/(?<resource_type>[^/]+)/(?<resource_name>.+)" nodrop
   | parse regex field=resource_name "(?<parent_resource_name>[^/]+)(?:/PROVIDERS/[^/]+)?/(?<service_type>[^/]+)/?(?<service_name>.+)" nodrop
   | if (isBlank(parent_resource_name), resource_name, parent_resource_name) as resource_name
   | fields subscription_id, location, provider_name, resource_group, resource_type, resource_name, service_type, service_name
   ```

### Configure metric rules

Create the following metrics rules by following the instructions in [Create a metrics rule](/docs/metrics/metric-rules-editor/#create-a-metrics-rule).

#### Azure observability metadata extraction application gateway level

```sql
Rule Name: AzureObservabilityMetadataExtractionCosmosDBAccountLevel
```

```sql title="Metric match expression"
resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/MICROSOFT.DOCUMENTDB/*/* tenant_name=*
```
| Fields extracted  | Metric rule          |
|:------------------|:---------------------|
| subscription_id   | $resourceId._1       |
| resource_group    | $resourceId._2       |
| provider_name     | MICROSOFT.DOCUMENTDB |
| resource_type     | $resourceId._3       |
| resource_name     | $resourceId._4       |


### Configure metrics collection


In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Create hosted collector and tag tenant_name field. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />
1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
1. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure Cosmos DB account that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select all the metrics under `Metrics` section.
   * Use the Event hub namespace created by the ARM template in previous step. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/azurecosmosdb-metrics.png')} alt="Azure CosmosDB for NoSQL  Diagnostic Settings for metrics" style={{border: '1px solid gray'}} width="800" />

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. If you want to audit Azure Cosmos DB control plane operations, [disable the key based metadata write access](https://learn.microsoft.com/en-us/azure/cosmos-db/audit-control-plane-logs#disable-key-based-metadata-write-access).
3. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/monitor-resource-logs?tabs=azure-portal#create-diagnostic-settings). Perform below steps for each Azure Cosmos DB account that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select your preferred log categories depending upon your database API or select `allLogs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/cosmosdb-diagnostic-logs.png')} alt="Azure CosmosDB for NoSQL Diagnostic Settings for logs" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with right location value.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Storage Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity logs (optional)

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). If you are already collecting activity logs for a subscription, do not perform this step.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::

##### Enabling Microsoft Defender for Cloud

For Security events, make sure you enable [Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-databases-enable-cosmos-protections?tabs=azure-portal). In Defender Plans Settings page toggle the Databases status under Cloud Workload Protection section and select the resource types.

<img src={useBaseUrl('img/integrations/microsoft-azure/Microsoft-Cloud-Defender-Edit-Settings.png')} alt="Edit Settings" style={{border: '1px solid gray'}} width="800" />

<img src={useBaseUrl('img/integrations/microsoft-azure/Microsoft-Cloud-Defender-Plans-CosmosDB.png')} alt="Cloud Defender Plans" style={{border: '1px solid gray'}} width="800" />


## Installing the Azure CosmosDB for NoSQL app

This section provides instructions on how to install the Azure CosmosDB for NoSQL app, and shows examples of each of the preconfigured dashboards you can use to analyze your data.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing the Azure CosmosDB for NoSQL dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

## Upgrade/Downgrade the Azure CosmosDB for NoSQL app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure CosmosDB for NoSQL app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
