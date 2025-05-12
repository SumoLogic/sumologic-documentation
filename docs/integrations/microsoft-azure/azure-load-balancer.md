---
id: azure-load-balancer
title: Azure Load Balancer
description: Learn about the Sumo Logic collection process for the Azure Load Balancer service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-load-balancer.png')} alt="Thumbnail icon" width="50"/>

[Azure Load Balancer](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview) is an Azure service that allows you to evenly distribute incoming network traffic across a group of Azure VMs or instances in a Virtual Machine Scale Set. This integration helps in monitoring inbound and outbound data throughput, outbound flows, and the application endpoint health  of your Load Balancers.

## Log and metric types

For Azure Load Balancer, you can collect the following logs and metrics:

* **Load Balancer Health Event.** These health event logs are emitted when any issues affecting your load balancer’s health and availability are detected. [Learn more](https://techcommunity.microsoft.com/t5/azure-networking-blog/introducing-azure-load-balancer-health-event-logs/ba-p/4154362).
* **Load Balancer Metrics**. These metrics are available in [Microsoft.Network/loadBalancers](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-network-loadbalancers-metrics) namespace.

For more information on supported metrics, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/load-balancer/monitor-load-balancer-reference#metrics).

## Setup

:::note
This app only supports load balancers of **Standard** and **Gateway** SKUs.
:::

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Load Balancer you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example:  `Azure/LoadBalancer/Logs` and `Azure/LoadBalancer/Metrics`.

### Configure metrics collection

To set up the Azure Metrics source in Sumo Logic, refer to [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the diagnostic settings in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the steps below for each Azure load balancer account that you want to monitor.
   1. Choose **Stream to an event hub** as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
   <img src={useBaseUrl('img/send-data/azureloadbalancer-logs.png')} alt="Azure Load Balancer logs" style={{border: '1px solid gray'}} width="800" />
3. Tag the location field in the source with the right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Load Balancer Tag Location" style={{border: '1px solid gray'}} width="500" /> 

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Do not perform this step if you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, ensure that you do not tag this source with the location tag.
:::

## Installing the Azure Load Balancer app

Now that you have set up data collection, install the Azure Load Balancer Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

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

## Viewing the Azure Load Balancer dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Azure Load Balancer - Overview** dashboard provides collective information on Health Probe Status, Average Data Path Availability, Transmission Details, Connection Details, and SNAT Ports Utilization(%).

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureLoadBalancer/Azure-Load-Balancer-Overview.png')} alt="Azure Load Balancer Overview" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure Load Balancer - Administrative Operations** dashboard provides details like distribution by operation type, by operation, recent delete operations, top 10 operations that caused most errors, and users/applications by operation type.

Use this dashboard to:

- Identify top users performing administrative operations.
- View the top 10 operations that caused the most errors.
- View recent read, write, and delete operations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureLoadBalancer/Azure-Load-Balancer-Administrative-Operations.png')} alt="Azure Load Balancer Administrative Operations" style={{border: '1px solid gray'}} width="800" />

### Health

The **Azure Load Balancer - Health** dashboard provides details like total failed requests, failures by operation, health probe status trends, and unhealthy backends.

Use this dashboard to:

- Identify failed requests and operations.
- Detect when all backend instances in a pool are not responding to the configured health probes.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureLoadBalancer/Azure-Load-Balancer-Health.png')} alt="Azure Load Balancer Health" style={{border: '1px solid gray'}} width="800" />

### Network

The **Azure Load Balancer - Network** dashboard provides details like Packets Transmitted by the Load Balancer, TCP SYN packets by the Load Balancer, Bytes Transmitted by the Load Balancer, Average Data Path Availability Trend, SNAT Connection Count, SNAT Ports Utilization, Allocated SnatPorts, and Used SnatPorts.

Use this dashboard to:
- Detect high utilization of allocated ports.
- Detect when there is less data path availability than expected due to platform issues.
- Monitor data transmission (packets and bytes) through your load balancers.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureLoadBalancer/Azure-Load-Balancer-Network.png')} alt="Azure Load Balancer Network" style={{border: '1px solid gray'}} width="800" />

### Policy

The **Azure Load Balancer - Policy** dashboard provides details like total success policy events, success policy events, total failed policy events, and failed policy events.

Use this dashboard to: 
- Monitor policy events with warnings and errors.
- View recent failed policy events.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureLoadBalancer/Azure-Load-Balancer-Policy.png')} alt="Azure Load Balancer Policy" style={{border: '1px solid gray'}} width="800" />

### Azure Load Balancer alerts
These alerts are metric based and will work for all Azure Load Balancers.

| Alert Name                                      | Alert Description and Conditions                                                                                                                                     | Alert Condition  | Recover Condition |
|:------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------|:------------------|
| `Azure Load Balancer - Data Path Availability`  | This alert is triggered  when Data Path Availability is less than 100%.                                                                                              | percentage < 100 | percentage >= 100 |
| `Azure Load Balancer - Health Probe Status`     | This alert is triggered  when Health Probe Status is less than 100%.                                                                                                 | percentage < 100 | percentage >= 100 |
| `Azure Load Balancer - SNAT Connection Count`   | This alert is triggered when SNAT Connection count less than 1000. Also Working alert is triggered when SNAT Connection count less than 800                          | Count < 1000     | Count >= 1000     |
| `Azure Load Balancer - Used SNAT Ports`         | This alert is triggered when Used SNAT Ports count less than 900. Also Working alert is triggered when Used SNAT Ports count less than 800                           | Count < 900      | Count >= 900      |

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
