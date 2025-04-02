---
id: azure-event-grid
title: Azure Event Grid
description: Learn about the Sumo Logic collection process for the Azure Event Grid service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-event-grid.png')} alt="Thumbnail icon" width="50"/>

[Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/overview) is a highly scalable, fully managed Pub Sub message distribution service that offers flexible message consumption patterns using the MQTT and HTTP protocols. This integration helps in monitoring data plane requests, delivery failures and publish failures of Event Grid resources - custom topics, system topics and domains.

## Log and metric types

For Azure Event Grid, you can collect the following logs and metrics:

* **Resource Logs**. Publish and delivery failure logs by Event Grid resources. It also includes audit traces for data plane operations including public and private access operations. The schema for resource logs is described [here](https://learn.microsoft.com/en-us/azure/event-grid/monitor-push-reference#resource-logs).
* **Metrics**. Metrics for Azure Event Grid are in below namespaces:
  * [Microsoft.EventGrid/domains](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-eventgrid-domains-metrics)
  * [Microsoft.EventGrid/systemTopics](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-eventgrid-systemtopics-metrics)
  * [Microsoft.EventGrid/topics](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-eventgrid-topics-metrics)
  * [Microsoft.EventGrid/namespaces](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-eventgrid-namespaces-metrics)
  * [Microsoft.EventGrid/extensionTopics](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-eventgrid-extensiontopics-metrics)
  * [Microsoft.EventGrid/eventSubscriptions](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-eventgrid-eventsubscriptions-metrics)

For more information on supported dimensions, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/event-grid/monitor-push-reference#metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each domain, namespaces, custom topic, and system topic you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/EventGrid/Logs`, `Azure/EventGrid/Metrics`.

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
   - `service_name`. Services that can be accessed with an Azure resource (for example, in Azure Event Grid service is Subscriptions).
1. Create the fields if they are not present. Refer to [Manage fields](/docs/manage/fields/#manage-fields).

### Configure field extraction rules

Create the following Field Extraction Rule(s) (FER) for Azure Storage by following the instructions in [Create a Field Extraction Rule](/docs/manage/field-extractions/create-field-extraction-rule/).

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

#### Azure observability metadata extraction service level

If this rule already exists, there is no need to create it again.

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

#### Azure observability metadata extraction event grid level

   ```sql
   Rule Name: AzureObservabilityMetadataExtractionAzureEventGridLevel
   ```
   
   ```sql title="Metric match expression"
   resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/MICROSOFT.EVENTGRID/*/* tenant_name=*
   ```
   | Fields extracted  | Metric rule         |
   |:------------------|:--------------------|
   | subscription_id   | $resourceId._1      |
   | resource_group    | $resourceId._2      |
   | provider_name     | MICROSOFT.EVENTGRID |
   | resource_type     | $resourceId._3      |
   | resource_name     | $resourceId._4      |

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Create a hosted collector and tag the `tenant_name` field. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name). <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />
1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
1. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure Event Grid namespace that you want to monitor.
   1. Choose `Stream to an event hub` as destination.
   1. Select `AllMetrics`.
   1. Use the Event Hub namespace created by the ARM template in Step 2 above. You can create a new Event Hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-event-grid-metrics.png')} alt="Azure event grid metrics" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Event Grid Tag Location" style={{border: '1px solid gray'}} width="400" />

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.
#### Diagnostic logs
1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#create-diagnostic-settings). Perform below steps for each Azure Event Grid namespace that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-eventgrid-logs.png')} alt="Azure Event Grid logs" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Event Grid Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Do not perform this step in case you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::

## Installing the Azure Event Grid app

Now that you have set up data collection, install the Azure Event Grid Sumo Logic app to use the pre-configured [dashboards](#viewing-the-azure-event-grid-dashboards) that provide visibility into your environment for real-time analysis of azure resources.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing the Azure Event Grid dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

**Azure Event Grid - Overview** dashboard provides details on the performance, authentication, and delivery status of your Azure Event Grid service.

Use this dashboard to:
* Monitor request patterns by location and network access type to optimize resource allocation and improve latency.
* Analyze authentication types to ensure proper security measures are in place and identify potential unauthorized access attempts.
* Track delivery and publish failures by topic to quickly identify and resolve issues affecting event distribution.
* Correlate publish success latency with destination processing duration to optimize end-to-end event handling performance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureEventGrid/Azure-Event-Grid-Overview.png')} alt="Azure Event Grid - Overview" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

**Azure Event Grid - Administrative Operations** dashboard provides details on the operational activities and status of your Azure Event Grid resources.

Use this dashboard to:
* Monitor the distribution of operation types and their success rates to ensure proper functioning of your Event Grid system.
* Identify potential issues by analyzing the top operations causing errors and correlating them with specific users or applications.
* Track recent write and delete operations to maintain an audit trail of changes made to your Event Grid configuration.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureEventGrid/Azure-Event-Grid-Administrative-Operations.png')} alt="Azure Event Grid - Administrative Operations" style={{border: '1px solid gray'}} width="800" />

### Errors

**Azure Event Grid - Errors** dashboard provides details on various error types, failed deliveries, and dropped events in your Azure Event Grid service.

Use this dashboard to:
* Identify the most common error types affecting event publishing and delivery, such as "NotFound" and "Cancelled" errors.
* Analyze trends in delivery attempt failures and correlate them with specific resource groups or topics to pinpoint problematic areas.
* Monitor dropped event counts over time and investigate the reasons behind event drops to improve system reliability.
* Track the top failed topics and delivery destinations to prioritize troubleshooting efforts and optimize event routing.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureEventGrid/Azure-Event-Grid-Errors.png')} alt="Azure Event Grid - Errors" style={{border: '1px solid gray'}} width="800" />

### Operations

**Azure Event Grid - Operations** dashboard provides details on the performance and reliability of your Event Grid service, including processing times, success rates, and failure percentages.

Use this dashboard to:
* Monitor the average destination processing duration to identify potential bottlenecks or performance issues in event delivery.
* Track delivery failure percentages over time to quickly spot and address any spikes in unsuccessful event transmissions.
* Analyze the correlation between unmatched event percentages and advanced filter evaluation counts to optimize event routing and filtering.
* Identify trends in publish success latency and failure rates to ensure efficient event publishing and processing.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureEventGrid/Azure-Event-Grid-Operations.png')} alt="Azure Event Grid - Operations" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

**Azure Event Grid - Policy and Recommendations** dashboard provides details on policy events and recommendations for your Azure Event Grid resources.

Use this dashboard to:
* Monitor the success and failure rates of policy events to ensure proper configuration and compliance.
* Track and analyze recent recommendations to improve the performance and security of your Event Grid setup.
* Identify trends in policy events and recommendations over time to proactively address potential issues.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureEventGrid/Azure-Event-Grid-Policy-and-Recommendations.png')} alt="Azure Event Grid - Policy and Recommendations" style={{border: '1px solid gray'}} width="800" />

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
