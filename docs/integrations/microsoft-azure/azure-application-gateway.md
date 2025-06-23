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

* **Activity logs**, provides insight into any subscription-level or management group level events that have occurred in the Azure. To learnmore, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log-schema).

* **Platform Metrics for Azure Application Gateway**. These metrics are available in [Microsoft.Network/applicationGateways](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftnetworkapplicationgateways) namespace.
For more information on supported metrics in Azure Application Gateway v1 and Azure Application Gateway v2, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/application-gateway/application-gateway-metrics).

## Setup

:::note
This app supports only Application Gateway V2 since Application Gateway V1 will soon be deprecated.
:::

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure Application Gateway you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/ApplicationGateway/Logs`, `Azure/ApplicationGateway/Metrics`.

### Configure metrics collection

import MetricsSourceBeta from '../../reuse/metrics-source-beta.md';

<MetricsSourceBeta/>

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the steps below for each Azure application gateway account that you want to monitor.
   1. Choose **Stream to an event hub** as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azureapplicationgateway-logs.png')} alt="Azure Application Gateway logs" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Application Gateway Tag Location" style={{border: '1px solid gray'}} width="400" /> 

:::note
WAF logs and metrics will be available for WAF V2 tier and only after a WAF Policy has been associated with application gateway. Refer to the azure docs for more information.
Go to **Settings -> Configuration** to check your application gateway tier
<img src={useBaseUrl('img/integrations/microsoft-azure/appgatway-tier-setting.png')} alt="Application Gateway Tier Settings" width="750"/>
:::

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Do not perform this step in case you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::

## Installing the Azure Application Gateway app

Now that you have set up data collection, install the Azure Application Gateway Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallIndexV2 from '../../reuse/apps/app-install-index-option.md';

<AppInstallIndexV2/>

As part of the app installation process, the following fields will be created by default:

- `tenant_name`. This field is tagged at the collector level. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
- `location`. The region to which the resource name belongs to.
- `subscription_id`. ID associated with a subscription where the resource is present.
- `resource_group`. The resource group name where the Azure resource is present.
- `provider_name`. Azure resource provider name (for example, Microsoft.Network).
- `resource_type`. Azure resource type (for example, storage accounts).
- `resource_name`. The name of the resource (for example, storage account name).
- `service_type`. Type of the service that can be accessed with a Azure resource.
- `service_name`. Services that can be accessed with an Azure resource (for example, in Azure Container Instances the service is Subscriptions).

## Viewing the Azure Application Gateway dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Overview

The **Azure Application Gateway - Overview** dashboard provides details like requests by location, current capacity units, failed requests count, average new connections per second, throughput - average bytes per second, unhealthy host count, current connections, and connections/sec trends.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApplicationGateway/Azure-Application-Gateway-Overview.png')} alt="Azure Application Gateway Overview" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure Application Gateway - Administrative Operations** dashboard provides details like Changes, Read/Write/Delete specific changes, different operations used, top 10 operations that caused most errors, and most common errors.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApplicationGateway/Azure-Application-Gateway-Administrative-Operations.png')} alt="Azure Application Gateway Administrative Operations" style={{border: '1px solid gray'}} width="800" />

### Backend

The **Azure Application Gateway - Backend** dashboard provides insights like unhealthy host count, server response, backend pool details, healthy host count trend, unhealthy host count trend, chart by backend status code, and backend response status for 2xx, 3xx, 4xx, 5xx.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApplicationGateway/Azure-Application-Gateway-Backend.png')} alt="Azure Application Gateway Backend" style={{border: '1px solid gray'}} width="800" />

### Billing

The **Azure Application Gateway - Billing** dashboard provides insights like current capacity units, fixed capacity units, variable capacity units, estimated billed capacity units trend, current capacity units trend, fixed billable capacity units trend, and variable capacity units trend.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApplicationGateway/Azure-Application-Gateway-Billing.png')} alt="Azure Application Gateway Billing" style={{border: '1px solid gray'}} width="800" />

### Failures

The **Azure Application Gateway - Failures** dashboard provides insights like top 10 application gateways with error, top 10 backend pool names with errors, top 10 rule names with error, top 10 errors by error info, chart by error code and error info, and failed requests by user agent and HTTP method.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApplicationGateway/Azure-Application-Gateway-Failures.png')} alt="Azure Application Gateway Failures" style={{border: '1px solid gray'}} width="800" />

### Health

The **Azure Application Gateway - Health** dashboard provides details like recent alerts, resource health incidents, recent resource health status by resource name, trend by event type, downtime by causes, trend of unavailable, degraded, and available.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApplicationGateway/Azure-Application-Gateway-Health.png')} alt="Azure Application Gateway Health" style={{border: '1px solid gray'}} width="800" />

### Latency
The **Azure Application Gateway - Latency** dashboard provides insights into the application gateway total time, application gateway total time versus backend last byte response time, backend connect time versus backend first byte response time, and backend first byte response time versus backend last byte response time.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApplicationGateway/Azure-Application-Gateway-Latency.png')} alt="Azure Application Gateway Latency" style={{border: '1px solid gray'}} width="800" />

### Performance

The **Azure Application Gateway - Performance** dashboard provides insights into the total request rate, failed request rate, application gateway details, average active connections, capacity units, capacity unit utilization, current connections trend, throughput trend, sent bytes, and received bytes.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApplicationGateway/Azure-Application-Gateway-Performance.png')} alt="Azure Application Gateway Performance" style={{border: '1px solid gray'}} width="800" />

### Security and Policy

The **Azure Application Gateway - Security and Policy** dashboard provides details into the total security events, recent security events, total denied policy events, total success policy events, total failed policy events, total recommendation events, and recent recommendation events.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApplicationGateway/Azure-Application-Gateway-Security-and-Policy.png')} alt="Azure Application Gateway Security and Policy" style={{border: '1px solid gray'}} width="800" />

### Traffic

The **Azure Application Gateway - Traffic** dashboard provides details into the requests by client IP location, total requests, failed requests, requests by TLS version, chart by HTTP status code, response status trends for 2xx, 3xx, 4xx, 5xx, and so on.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApplicationGateway/Azure-Application-Gateway-Traffic.png')} alt="Azure Application Gateway Security" style={{border: '1px solid gray'}} width="800" />

## Upgrade/Downgrade the Azure Application Gateway app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Application Gateway app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

### Azure Application Gateway alerts
These alerts are metric based and will work for all Azure Application Gateways.

| Alert Name                                           | Alert Description and Conditions                                                                                                                                                           | Alert Condition  | Recover Condition |
|:-----------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------|:------------------|
| `Azure Application Gateway - Current Capacity Units` | This alert is triggered  when Average Capacity Units count is greater than 75. Also, a warning type alert will be triggered when Average Capacity Units count is greater than 65.          | percentage >= 75 | percentage < 75   |
| `Azure Application Gateway - Current Compute Units`  | This alert is triggered  when Average Compute Units count is greater than 75. Also, a warning type alert will be triggered when Average Compute Units count is greater than 65.            | percentage >= 75 | percentage < 75   |
| `Azure Application Gateway - Failed Requests`        | This alert is triggered when Failed Requests count greater than 1.                                                                                                                         | Count >= 1       | Count < 1         |
| `Azure Application Gateway - Healthy Host Count`     | This alert is triggered when Healthy Host Count is less than 1.                                                                                                                            | Count < 1        | Count >= 1        |
| `Azure Application Gateway - UnHealthy Host Count`   | This alert is triggered when UnHealthy Host Count is greater than 1                                                                                                                        | Count >= 1       | Count < 1         |

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
