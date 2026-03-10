---
id: azure-subscription
title: Azure Subscription
keywords: 
 - azure subscription
 - subscription in azure
 - azure subscription monitoring
 - azure subscription metrics
description: This document outlines what Azure Subscription is, how to set it up with Sumo Logic, and how to install and view the pre-configured Sumo Logic Azure dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-firewall.png')} alt="Thumbnail icon" width="50"/>

[Azure Subscription](https://learn.microsoft.com/en-us/azure/firewall/overview) is a cloud-native and intelligent network firewall security service that provides threat protection for your cloud workloads running in Azure. It's a fully stateful firewall as a service with built-in high availability and unrestricted cloud scalability. This integration helps in monitoring firewall health, network rules, application rules, threat intelligence, and IDPS (Intrusion Detection and Prevention System) events.

## Log and metric types

For Azure Subscription, you can collect the following logs and metrics:

For more information on supported metrics and logs schema, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/firewall/monitor-firewall-reference).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Event Hub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure Subscription you want to monitor. You can forward logs to the same event hub, provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/Subscription/Logs` and `Azure/Subscription/Metrics`.

### Configure collector

Create a hosted collector if not already configured and tag the `tenant_name` field. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name). Make sure you create the required sources in this collector. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

<MetricsSource/>

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the diagnostic settings in the Azure portal, refer to [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics).
3. Follow the steps below for each Azure Subscription that you want to monitor.
    1. Choose **Stream to an event hub** as the destination.
    1. Select the log categories you want to collect
    1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
       <img src={useBaseUrl('img/send-data/azure-firewall-diagnostic-settings.png')} alt="Azure Subscription diagnostic settings" style={{border: '1px solid gray'}} width="800" />
4. Tag the location field in the source with the right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Subscription Tag Location" style={{border: '1px solid gray'}} width="500" />

#### Activity logs (optional)

import ActivityLogs from '../../reuse/apps/azure-activity-logs.md';

<ActivityLogs/>

## Installing the Azure Subscription app

Now that you have set up data collection, install the Azure Subscription Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallIndexV2 from '../../reuse/apps/app-install-index-option.md';

<AppInstallIndexV2/>

As part of the app installation process, the following fields will be created by default:

- `tenant_name`. This field is tagged at the collector level. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
- `location`. The region to which the resource name belongs.
- `subscription_name`. name associated with a subscription where the resource is present.
- `provider_name`. Azure resource provider name (for example, Microsoft.Network).
- `resource_type`. Azure resource type (for example, azureSubscriptions).

As part of the app installation process, the following FERs will be created by default:
### Azure location extraction FER

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

## Viewing the Azure Subscription dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Latency

The **Azure Subscription - Latency** dashboard provides details like average subscription latency, operational latency and region based api latency of subscription API.

Use this dashboard to:

- Monitor firewall health status, SNAT port utilization, and average latency to ensure optimal performance.
- Track threat intelligence matches, IDPS alerts, and network rule actions for security posture assessment.
- Analyze throughput, capacity units, data processed, and rule hit counts for capacity planning and optimization.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureSubscription/Azure-Subscription-Latency.png')} alt="Azure Subscription Latency" style={{border: '1px solid gray'}} width="800" />

### Traffic

The **Azure Subscription - Traffic** dashboard provides details like average subscription traffic, operational traffic and region based api traffic of subscription API.

Use this dashboard to:

- Monitor the distribution of operation types (Read, Write, Delete) and their success rates to ensure proper functioning of your firewall.
- Identify potential issues by analysing the top 10 operations causing errors and correlating them with specific users or applications.
- Track recent write and delete operations to maintain an audit trail of configuration changes made to your firewall resource.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureSubscription/Azure-Subscription-Traffic.png')} alt="Azure Subscription Traffic" style={{border: '1px solid gray'}} width="800" />


## Create monitors for Azure Subscription

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Subscription alerts

These alerts are metric-based and will work for all Azure Subscriptions.

| Alert Name | Alert Description and Conditions | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Azure Subscription - Health State` | This alert is triggered when the average Subscription health state is less than 80% and triggers a warning when the average Subscription health state is less than 90%. | Critical: `< 80`<br/>Warning: `< 90` | Critical: `>= 80`<br/>Warning: `>= 90` |
| `Azure Subscription - SNAT Port Utilization (%)` | This alert is triggered when the average SNAT port utilization is greater than 80% and triggers a warning if SNAT port utilization is greater than 70%. | Critical: `> 80`<br/>Warning: `> 70` | Critical: `<= 80`<br/>Warning: `<= 70` |
| `Azure Subscription - Average Latency Probe (Milliseconds)` | This alert is triggered when the average Latency Probe is greater than 10 milliseconds and triggers a warning when the average Latency Probe is greater than 5 milliseconds. | Critical: `> 10`<br/>Warning: `> 5` | Critical: `<= 10`<br/>Warning: `<= 5` |
| `Azure Subscription - Network Rule Hit Count` | This alert is triggered when the total Network rules hit count is greater than 500, and triggersa  warning when the Network rules hit count is greater than 300. | Critical: `> 500`<br/>Warning: `> 300` | Critical: `<= 500`<br/>Warning: `<= 300` |
| `Azure Subscription - Average Throughput (bits per second)` | This alert is triggered when the average Throughput is greater than 100000 bits/second and triggers a warning when the average Throughput is greater than 50000 bits/second. | Critical: `> 100000`<br/>Warning: `> 50000` | Critical: `<= 100000`<br/>Warning: `<= 50000` |

## Upgrade/Downgrade the Azure Subscription app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Subscription app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).

## Additional resources

- Blog: [Azure monitoring and troubleshooting](https://www.sumologic.com/blog/azure-services-monitoring)
- Glossary: [Microsoft Azure](https://www.sumologic.com/glossary/microsoft-azure)
