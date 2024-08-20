---
id: azure-application-gateway
title: Azure Application Gateway
description: Learn about the Sumo Logic collection process for the Azure Application Gateway service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-application-gateway.png')} alt="Thumbnail icon" width="50"/>

[Azure Application Gateway](https://learn.microsoft.com/en-us/azure/application-gateway/overview) is a web traffic load balancer that enables you to manage traffic to your web applications. It works on application layer (OSI layer 7) and supports URL based routing. This integration helps in analyzing access patterns, tracking performance information for each instance, including total requests served, throughput in bytes, healthy and unhealthy backend instance count.

## Log and metric types

For Azure Application Gateway, you can collect the following logs and metrics:

* **Access log**. These logs provide information on access patterns including the caller's IP, requested URL, response latency, return code, and bytes in and out.
* **Performance log**. These log captures performance information for each instance, including total requests served, throughput in bytes, total requests served, failed request count, and healthy and unhealthy backend instance count. The Performance log is available only for the v1 SKU. For the v2 SKU, use Metrics for performance data.
* **Firewall log**. You can use this log to view the requests that are logged through either detection or prevention mode of an application gateway that is configured with the web application firewall.

To learn more about the different resource log category types and schemas collected for Azure Application Gateway, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/application-gateway/application-gateway-diagnostics#diagnostic-logging).

* **Platform Metrics for Azure Application Gateway**. These metrics are available in [Microsoft.Network/applicationGateways](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftnetworkapplicationgateways) namespace.
For more information on supported metrics in Azure Application Gateway v1 and Azure Application Gateway v2, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/application-gateway/application-gateway-metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure Application Gateway you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/ApplicationGateway/Logs`, `Azure/ApplicationGateway/Metrics`.


### Configure field in field schema
1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. Kanso-->
1. Search for following fields:
   - `tenant_name`. This field is tagged at the collector level and users can get the tenant name using the instructions here https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name
   - `location`. The region to which the resource name belongs to.
   - `subscription_id`. Id associated with a subscription where resource is present.
   - `resource_group`. The resource group name where the Azure resource is present.
   - `provider_name`. Azure resource provider name (for  ex Microsoft.Network).
   - `resource_type`. Azure resource type (for ex storageaccounts).
   - `resource_name`. The name of the resource (for ex storage account name).


3. Create the fields if it is not present. Refer to [create and manage fields](/docs/manage/fields/#manage-fields).

### Configure Field Extraction Rules

Create a Field Extraction Rule (FER) for Azure Storage by following the instructions [here](/docs/manage/field-extractions/create-field-extraction-rule/).

* **Azure Location Extraction FER**

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
   | parse regex field=resource_name "(?<parent_resource_name>[^/]+)(?:/PROVIDERS/[^/]+)?/(?<service_type>[^/]+)/?(?<service_name>.+)" nodrop
   | if (isBlank(parent_resource_name), resource_name, parent_resource_name) as resource_name
   | fields subscription_id, location, provider_name, resource_group, resource_type, resource_name, service_type, service_name
   ```
### Configure metric rules

  * **Azure Observability Metadata Extraction Service Level**

      In case this rule is already exists then no need to create again.
```sql
Rule Name: AzureObservabilityMetadataExtractionServiceLevel    
```

```sql title="Metric match expression"
resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/*/*/*/*/* tenant_name=*
```
| Fields extracted | Metric rule    |
|------------------|----------------|
| subscription_id  | $resourceId._1 |
| resource_group   | $resourceId._2 |
| provider_name    | $resourceId._3 |
| resource_type    | $resourceId._4 |
| resource_name    | $resourceId._5 |
| service_type     | $resourceId._6 |
| service_name     | $resourceId._7 |

* **Azure Observability Metadata Extraction Application Gateway Level**
```sql
Rule Name: AzureObservabilityMetadataExtractionAppGatewayLevel
```

```sql title="Metric match expression"
resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/*/APPLICATIONGATEWAYS/* tenant_name=*
```
| Fields extracted | Metric rule         |
|------------------|---------------------|
| subscription_id  | $resourceId._1      |
| resource_group   | $resourceId._2      |
| provider_name    | $resourceId._3      |
| resource_type    | APPLICATIONGATEWAYS |
| resource_name    | $resourceId._4      |

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. 1. Create hosted collector and tag tenant_name field
   <img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="800" />
2. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
2. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
3. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure Application Gateway that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `AllMetrics`.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform below steps for each azure application gateway account that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
3. Tag the location field in the source with right location value.
   <img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Application Gateway Tag Location" style={{border: '1px solid gray'}} width="800" />
   
#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Do not perform this step in case you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions make sure that you do not tag this source with the location tag.
:::


## Installing the Azure Application Gateway app

Now that you have set up data collection, install the Azure Application Gateway Sumo Logic app to use the pre-configured [dashboards](#viewing-the-azure-application-gateway-app-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Upgrading the Azure Application Gateway app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Application Gateway app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>


## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
