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

### Configure field extraction rules

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

Create the following metrics rules by following the instructions in [Create a metrics rule](/docs/metrics/metric-rules-editor/#create-a-metrics-rule). 

#### Azure observability metadata extraction service level

If this rule already exists, there is no need to create it again.

```sql
Rule Name: AzureObservabilityMetadataExtractionServiceLevel    
```

```sql title="Metric match expression"
resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/*/*/*/*/* tenant_name=*
```
| Fields extracted  | Metric rule     |
|:------------------|:----------------|
| subscription_id   | $resourceId._1  |
| resource_group    | $resourceId._2  |
| provider_name     | $resourceId._3  |
| resource_type     | $resourceId._4  |
| resource_name     | $resourceId._5  |
| service_type      | $resourceId._6  |
| service_name      | $resourceId._7  |

#### Azure observability metadata extraction application gateway level

```sql
Rule Name: AzureObservabilityMetadataExtractionAppGatewayLevel
```

```sql title="Metric match expression"
resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/*/APPLICATIONGATEWAYS/* tenant_name=*
```
| Fields extracted  | Metric rule          |
|:------------------|:---------------------|
| subscription_id   | $resourceId._1       |
| resource_group    | $resourceId._2       |
| provider_name     | $resourceId._3       |
| resource_type     | APPLICATIONGATEWAYS  |
| resource_name     | $resourceId._4       |

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Create hosted collector and tag tenant_name field. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />
2. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
3. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
3. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure Application Gateway that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `AllMetrics`.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.
![azureapplicationgateway-metrics.png](/img/send-data/azureapplicationgateway-metrics.png)

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the **Diagnostic setting** in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the steps below for each Azure application gateway account that you want to monitor.
   * Choose **Stream to an event hub** as the destination.
   * Select `allLogs`.
   * Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
3. Tag the location field in the source with right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Application Gateway Tag Location" style={{border: '1px solid gray'}} width="400" />
    ![azureapplicationgateway-logs.png](/img/send-data/azureapplicationgateway-logs.png)

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Do not perform this step in case you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::


## Installing the Azure Application Gateway app

Now that you have set up data collection, install the Azure Application Gateway Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Upgrading the Azure Application Gateway app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Application Gateway app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Viewing the Azure Application Gateway dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>


### Audit Control Plane Operations

The **Azure Application Gateway - Audit Control Plane Operations** dashboard provides details like changes, changes by operations, top 10 operations that caused the most errors, count by user operations etc.
Use this dashboard to:
   * Changes
   * Changes by operations
   * Top 10 Operations that caused the  most errors
   * Count - user operations

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-gateway/Azure-Application-Gateway-Audit-Control-Plane-Operations.png')} alt="Azure Application Gateway Audit Control Plane Operations" style={{border: '1px solid gray'}} width="800" />

### Backend

The **Azure Application Gateway - Backend** dashboard provides insights like unhealthy host count, server response, backend pool details, healthy host count trend, unhealthy host count trend, chart by backend status code, backend response status 2xx, 3xx, 4xx, 5xx
Use this dashboard to:
   * View UnHealthy host count
   * View Server response
   * View Healthy host count
   * View UnHealthy host count trend
   * View Backend pool details
   * View Chart by backend status code
   * View Backend response status trends for 2xx, 3xx, 4xx, 5xx

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-gateway/Azure-Application-Gateway-Backend.png')} alt="Azure Application Gateway Backend" style={{border: '1px solid gray'}} width="800" />

### Billing

The **Azure Application Gateway - Billing** dashboard provides insights like current capacity units, fixed capacity units, variable capacity units, estimated billed capacity units trend, current capacity units trend, fixed billable capacity units trend, variable capacity units trend

Use this dashboard to:
   * View Current capacity units
   * View Fixed capacity units
   * View Variable capacity units
   * View Estimated billed capacity units trend
   * View Current capacity units trend
   * View Fixed billable capacity units trend
   * View Variable capacity units trend

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-gateway/Azure-Application-Gateway-Billing.png')} alt="Azure Application Gateway Billing" style={{border: '1px solid gray'}} width="800" />


### Connections

The **Azure Application Gateway - Connections** dashboard provides insights like connections per second and current connections

Use this dashboard to:
   * View Connections per second
   * View Current connections


<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-gateway/Azure-Application-Gateway-Connections.png')} alt="Azure Application Gateway Connections" style={{border: '1px solid gray'}} width="800" />

### Failures

The **Azure Application Gateway - Failures** dashboard provides insights like top 10 application gateways with error, top 10 backend pool names with errors, top 10 rule names with error, top 10 errors by error info, chart by error code & error info and failed requests by user agent & http method

Use this dashboard to:
   * View Top 10 application gateways with error
   * View Top 10 backend pool names with errors
   * View Top 10 rule names with error
   * View Top 10 errors by error info
   * View Chart by error code & error info
   * View Failed requests by user agent & http method

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-gateway/Azure-Application-Gateway-Failures.png')} alt="Azure Application Gateway Failures" style={{border: '1px solid gray'}} width="800" />


### Health

The **Azure Application Gateway - Health** dashboard provides details like recent alerts, resource health incidents, recent resource health status by resource name, trend by event type, downtime by causes, trend of unavailable, degraded,  available etc.
Use this dashboard to:
* View Recent alerts
* View Resource health incidents
* View Recent resource health status by resource name
* View Trend by event type
* View Downtime by causes
* View Trend of unavailable, degraded,  available etc.

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-gateway/Azure-Application-Gateway-Health.png')} alt="Azure Application Gateway Health" style={{border: '1px solid gray'}} width="800" />

### Latency
The **Azure Application Gateway - Latency** dashboard provides insights like application gateway total time, application gateway total Time vs backend last byte response time, backend connect time vs backend first byte response time and backend first byte response time vs backend last byte response time
Use this dashboard to:
   * View Application gateway total time
   * View Application gateway total Time vs backend last byte response time
   * View Backend connect time vs backend first byte response time 
   * View Backend first byte response time vs backend last byte response time

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-gateway/Azure-Application-Gateway-Latency.png')} alt="Azure Application Gateway Latency" style={{border: '1px solid gray'}} width="800" />

### Overview
The **Azure Application Gateway - Overview** dashboard provides details like requests by location, current capacity units, failed requests count, average new connections per second, throughput - average bytes per second, unhealthy host count and current connections trend
Use this dashboard to:
   * View Requests by location
   * View Current capacity units
   * View Failed requests count
   * View Average new connections per second
   * View Throughput - average bytes per second
   * View Unhealthy host count
   * View Current connections trend

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-gateway/Azure-Application-Gateway-Overview.png')} alt="Azure Application Gateway Overview" style={{border: '1px solid gray'}} width="800" />

### Performance
The **Azure Application Gateway - Performance** dashboard provides insights like total request rate, failed request rate, application gateway details, average active connections, capacity units, capacity unit utilization, current connections trend, throughput trend, sent bytes, received bytes
Use this dashboard to:
   * View Total request rate
   * View Failed request rate
   * View Application gateway details
   * View Average active connections
   * View Capacity units
   * View Capacity unit utilization
   * View Current connections trend
   * View Throughput trend
   * View Sent bytes, received bytes

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-gateway/Azure-Application-Gateway-Performance.png')} alt="Azure Application Gateway Performance" style={{border: '1px solid gray'}} width="800" />

### Security and Policy
The **Azure Application Gateway - Security and Policy** and Policy dashboard provides details like total security events, recent security events, total denied policy events, total success policy events, total failed policy events, total recommendation events and recent recommendation events etc.
Use this dashboard to:
   * View Total security events
   * View Recent security events
   * View Total denied policy events
   * View Total success policy events
   * View Total failed policy events
   * View Total recommendation events
   * View Recent recommendation events etc.

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-gateway/Azure-Application-Gateway-Security-and-Policy.png')} alt="Azure Application Gateway Security and Policy" style={{border: '1px solid gray'}} width="800" />

### Traffic
The **Azure Application Gateway - Traffic** dashboard provides insights like
* View Requests by client ip location
* View Total requests
* View Failed requests
* View Requests by TLS version
* View Chart by HTTP status code
* View  Response status trends for 2xx, 3xx, 4xx, 5xx etc.

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-gateway/Azure-Application-Gateway-Traffic.png')} alt="Azure Application Gateway Security" style={{border: '1px solid gray'}} width="800" />

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
