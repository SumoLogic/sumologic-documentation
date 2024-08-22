---
id: azure-functions
title: Azure Functions
sidebar_label: Azure Functions
description: The Sumo Logic app for Azure Functions helps you monitor activity in Azure Functions.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-functions.png')} alt="thumbnail icon" width="75"/>

[Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview) is a serverless solution that allows you to write less code, maintain less infrastructure, and save on costs. This integration helps in monitoring the health, tracking executions, and estimating cost of your function apps.

## Log and metric types

The Sumo Logic app for Azure Functions app uses the following log types:

* FunctionApplicationLogs
* AppServiceAuthenticationLogs
* AllMetrics

For Azure Functions, you can collect the following logs and metrics:

To learn more about configuring monitoring for azure functions, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-functions/configure-monitoring)

* **Azure Functions specific metrics**. These are metrics specific to Functions like execution count and execution units.
For more information on supported metrics, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-functions/monitor-functions-reference#azure-functions-specific-metrics).

* **General App Service metrics**. Metrics which App Service platform implements. These metrics are available in `Microsoft.Web/sites` namespace. For more information on supported metrics, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/app-service/web-sites-monitor#understand-metrics).

### Sample queries

```sql title="Error by function app"
tenant_name=* subscription_id=* location=* resource_group=* provider_name=microsoft.web resource_type=sites  resource_name=* (metric=Http4xx or metric=Http5xx) statistic=total
```

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure Functions you want to monitor. Diagnostic Settings are not supported for function apps running on version 1.x. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/FunctionApp/Logs`, `Azure/FunctionApp/Metrics`.

### Configure field in field schema
1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. Kanso-->
2. Search for following fields:
   - `tenant_name`. This field is tagged at the collector level and you can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
   - `location`. The region to which the resource name belongs to.
   - `subscription_id`. Id associated with a subscription where resource is present.
   - `resource_group`. The resource group name where the Azure resource is present.
   - `provider_name`. Azure resource provider name (for example, Microsoft.WEB).
   - `resource_type`. Azure resource type (for example, SITES).
   - `resource_name`. The name of the resource (for example, Azure Function App name).

3. Create the fields if it is not present. Refer to [create and manage fields](/docs/manage/fields/#manage-fields).

### Configure Field Extraction Rules

Create a Field Extraction Rule (FER) by following the instructions [here](/docs/manage/field-extractions/create-field-extraction-rule/). If the FER already exists with same name, then skip this step.

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
   | fields subscription_id, location, provider_name, resource_group, resource_type, resource_name, service_type,service_name
   ```


### Configure metric rules

  * **Azure Observability Metadata Extraction Service Level**

      If this rule already exists, there's no need to create it again.

      ```sql
      Rule Name: AzureObservabilityMetadataExtractionFunctionAppLevel
      ```

      ```sql title="Metric match expression"
      resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/*/SITES/* tenant_name=*
      ```
      | Fields extracted | Metric rule    |
      |:------------------|:----------------|
      | subscription_id  | $resourceId._1 |
      | resource_group   | $resourceId._2 |
      | provider_name    | $resourceId._3 |
      | resource_type    | SITES |
      | resource_name    | $resourceId._4 |


### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
2. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
3. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure Functions that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `AllMetrics`.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure logs collection


#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform below steps for each Azure Functions that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `AllMetrics`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

   <img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Functions-Configure-Diagnostic-Metrics.png')} alt="Azure Storage Tag Location" style={{border: '1px solid gray'}} width="800" />

1. Tag the location field in the source with right location value.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Storage Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). If you are already collecting activity logs for a subscription, do not perform this step.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::

##### Enabling Microsoft Defender for Cloud

:::note
For Security events, make sure you enable [Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/azure-sql/database/azure-defender-for-sql?view=azuresql#enable-microsoft-defender-for-sql). If you have an existing settings, click **Edit Settings**.
:::

<img src={useBaseUrl('img/integrations/microsoft-azure/Microsoft-Cloud-Defender-Edit-Settings.png')} alt="Edit Settings" style={{border: '1px solid gray'}} width="800" />

<img src={useBaseUrl('img/integrations/microsoft-azure/Microsoft-Cloud-Defender-Plans-AppService.png')} alt="Cloud Defender Plans" style={{border: '1px solid gray'}} width="800" />

##### Enabling Health Check Metric

:::note
For getting health check metric, make sure you enable health check by going to Monitoring tab.
:::

<img src={useBaseUrl('img/integrations/microsoft-azure/Enable-Health-Check-Metric.png')} alt="Cloud Defender Plans" style={{border: '1px solid gray'}} width="800" />


## Installing the Azure Functions app

This section provides instructions on how to install the Azure Functions app, and shows examples of each of the preconfigured dashboards you can use to analyze your data.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Upgrading the Azure Functions app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Functions app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Viewing the Azure Functions dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Azure Functions - Overview** dashboard provides information of any service health incidents or resource health events associated with Azure Functions in your azure account.

Use this dashboard to:
    * View recent resource and service health incidents.
    * View distribution of service and resource health by incident type.


<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-Health.png')} alt="Azure SQL health dashboard" style={{border: '1px solid gray'}} width="800" />


### Cost

The **Azure Functions - Cost** dashboard provides information on the expenses associated with your Azure Functions. This includes details on the cost of resources, usage trends, and cost management insights.

Use this dashboard to:
* Monitor and analyze your spending on Azure Functions.
* Review cost trends and identify areas where you can optimize spending.
* Access detailed billing information and cost breakdowns.


### Error

The **Azure Functions - Error** dashboard provides insights into errors encountered by your Azure Functions. This includes error rates, types of errors, and patterns over time.

Use this dashboard to:
* Track and investigate error occurrences in your Azure Functions.
* Identify and diagnose recurring error patterns.
* Review error logs and detailed reports to improve function reliability.


### Memory

The **Azure Functions - Memory** dashboard provides information on memory usage and consumption by your Azure Functions. This includes metrics on memory allocation, usage patterns, and any potential memory issues.

Use this dashboard to:
* Monitor memory consumption and efficiency of your Azure Functions.
* Identify and address memory-related performance issues.
* Analyze trends in memory usage to optimize function performance.


### Network

The **Azure Functions - Network** dashboard provides details on network traffic and connectivity related to your Azure Functions. This includes data on inbound and outbound traffic, network latency, and potential network issues.

Use this dashboard to:
* Track network activity and performance of your Azure Functions.
* Diagnose network-related issues and connectivity problems.
* Monitor network usage and optimize network configuration.


### Operations

The **Azure Functions - Operations** dashboard provides an overview of operational metrics and activities related to your Azure Functions. This includes operational health, deployment status, and function execution details.

Use this dashboard to:
* Monitor the operational status and health of your Azure Functions.
* Review deployment activities and execution metrics.
* Analyze operational trends and optimize function management.


### OS Statistics

The **Azure Functions - OS Statistics** dashboard provides information on operating system metrics and statistics relevant to your Azure Functions. This includes details on CPU usage, disk I/O, and other OS-level performance indicators.

Use this dashboard to:
* Track OS-level performance metrics impacting your Azure Functions.
* Monitor CPU, memory, and disk usage for optimal performance.
* Identify and address OS-related performance issues.


### Performance

The **Azure Functions - Performance** dashboard provides insights into the performance of your Azure Functions. This includes metrics on execution times, throughput, and overall function efficiency.

Use this dashboard to:
* Monitor and analyze the performance of your Azure Functions.
* Identify performance bottlenecks and optimize function execution.
* Review performance metrics and trends to ensure optimal function performance.


### Health

The **Azure Functions - Health** dashboard provides information of any service health incidents or resource health events associated with Azure Functions in your azure account.

Use this dashboard to:
    * View recent resource and service health incidents.
    * View distribution of service and resource health by incident type.


<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-Health.png')} alt="Azure SQL health dashboard" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

The **Azure Functions - Policy and Recommendations** dashboard provides information of all effect action operations performed by Azure Policy and recommendations events from Azure Advisor.

Use this dashboard to:
    * Monitor policy events with warnings and errors.
    * View recent failed policy events.
    * View total recommendation events.
    * Identify High Impact recommendations.
    * View recent recommendation events and navigate to the affected resource.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-Policy-and-Recommendations.png')} alt="Azure SQL - Policy and Recommendations dashboard" style={{border: '1px solid gray'}} width="800" />


### Administrative Operations

The **Azure SQL - Administrative Operations** dashboard provides details on read/write/delete specific changes, different operations used, top 10 operations that caused most errors, and users performing admin operations.

Use this dashboard to:
    * Identify top users performing administrative operations.
    * View Top 10 operations that caused the most errors.
    * View recent read, write, and delete operations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-Administrative-Operations.png')} alt="Azure SQL Administrative Operations dashboard" style={{border: '1px solid gray'}} width="800" />
