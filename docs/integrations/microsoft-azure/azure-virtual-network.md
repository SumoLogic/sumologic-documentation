---
id: azure-virtual-network
title: Azure Virtual Network
sidebar_label: Azure Virtual Network
description: Learn about the Sumo Logic collection process for the Azure Virtual Network service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-virtual-network.png')} alt="Thumbnail icon" width="50"/>

[Azure Virtual Network](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview) is a service that provides the fundamental building block for your private network in Azure enabling many types of Azure resources to securely communicate with each other, using the internet, and on-premises networks. This integration helps in monitoring the outgoing and incoming traffic flows, dropped packets, bandwidth consumption, and verifying network isolation and compliance.

## Logs and metric types

For Azure Virtual Network, you can collect the following logs and metrics:

* **Virtual network flow logs**. It provides ingress and egress IP traffic flow with the following information:

   * Inbound and Outbound flows per Rule
   * NIC and traffic flow
   * 5-tuple information with respect to flow (Source/Destination IP and Port, Protocol)
   * Allowed/Denied traffic flow.
   * Encryption status of your traffic

   For more information, refer to the [virtual flow logs documentations](https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-overview).

* **Platform Metrics for Azure Virtual Network**. These metrics are available in [Microsoft.Network/virtualNetworks](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-network-virtualnetworks-metrics) namespace.


### Sample log messages

```json
{
    "acl_id": "/subscriptions/c088dd12-d692-42ad-a4b6-9a542d12ad2a/resourceGroups/hpalvnapp/providers/Microsoft.Network/networkSecurityGroups/MyLowCostVM-nsg",
    "bytes_sent_dest_to_src": "2572",
    "bytes_sent_src_to_dest": "2352",
    "category": "FlowLogFlowEvent",
    "dest_IP": "10.2.0.4",
    "dest_port": "22",
    "event_name": "FlowLogFlowEvent",
    "flowLogGUID": "b003d9f1-852e-419f-bed2-ec2d166d05e2",
    "flow_direction": "I",
    "flow_encryption_status": "NX",
    "flow_log_resource_id": "/SUBSCRIPTIONS/C088DD12-D692-42AD-A4B6-9A542D12AD2A/RESOURCEGROUPS/NETWORKWATCHERRG/PROVIDERS/MICROSOFT.NETWORK/NETWORKWATCHERS/NETWORKWATCHER_EASTUS/FLOWLOGS/MYLOWCOSTVM837_Z1-HPALVNAPP-FLOWLOG",
    "flow_state": "E",
    "mac": "000D3A130BFE",
    "num_packets_sent_dest_to_src": "11",
    "num_packets_sent_src_to_dest": "11",
    "protocol": "6",
    "rule_name": "UserRule_AllowMyIpAddressCustom8080Inbound",
    "src_ip": "91.118.39.74",
    "src_port": "55304",
    "target_resource_id": "/subscriptions/c088dd12-d692-42ad-a4b6-9a542d12ad2a/resourceGroups/hpalvnapp/providers/Microsoft.Network/networkInterfaces/mylowcostvm837_z1",
    "time": "1737500459279",
    "version": 4
}
```

### Sample queries

```sql title="Flow Traffic by Rule Name"
_sourceCategory=Azure/VirtualNetworkFlow/Logs
| json field=_raw "rule_name"
| json field=_raw "target_resource_id"
| json field=_raw "event_name"
| json field=_raw "mac"
| json field=_raw "src_ip"
| json field=_raw "dest_IP"
| json field=_raw "dest_port"
| json field=_raw "protocol"
| if(protocol="T","TCP", protocol) as protocol
| if(protocol="U","UDP", protocol) as protocol
| parse regex field=target_resource_id"(?<NSG>[\w-_.]+)$"
| json field=_raw "src_port"
| json field=_raw "flow_direction"
| json field=_raw "flow_state" as traffic_a_d
| timeslice 1h
|where if ("*" = "*", true, protocol matches "*") AND if ("*" = "*", true, src_ip matches "*") AND if ("*" = "*", true, mac matches "*") AND if ("*" = "*", true, dest_port matches "*") AND if ("*" = "*", true, traffic_a_d matches "*") AND if ("*" = "*", true, dest_ip matches "*") AND if ("*" = "*", true, rule_name matches "*") AND if ("*" = "*", true, flow_direction matches "*") AND if ("*" = "*", true, event_name matches "*") AND if ("*" = "*", true, nsg matches "*")
|count by rule_name,_timeslice
| transpose row _timeslice column rule_name
```


## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Virtual Network Flow Logs collection from Storage Account using our [Collect Logs from Azure Blob Storage](/docs/send-data/collect-from-other-data-sources/azure-blob-storage/block-blob/collect-logs) integration.
* Activity Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/). It is recommended to create a separate source for activity logs. If you are already collecting these logs, you can skip this step.
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.


You must explicitly enable diagnostic settings and network flow logs for each Virtual Network you want to monitor. You can forward metrics to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/VirtualNetwork/Metrics` and `Azure/VirtualNetwork/Logs`.

### Configure metrics collection

import MetricsSourceBeta from '../../reuse/metrics-source-beta.md';

<MetricsSourceBeta/>

### Configure logs collection

#### Configuration requirements

Before you begin configuring the Virtual Network Flow Log collection, make sure the following environment prerequisites are met:

* Your Storage Account must be of type General-purpose v2 or Blob storage.
* Your Network Security Group and Storage Account should be in the same resource location.
* You also need to have Microsoft Authorization/role Assignments/write permissions, so they should be a "User Access Administrator" or "Owner".
* Location: The storage account must be in the same region as the virtual network.
* Subscription: The storage account must be in the same subscription of the virtual network or in a subscription associated with the same Microsoft Entra tenant of the virtual network's subscription.
* Performance tier: The storage account must be standard. Premium storage accounts aren't supported.
* Self-managed key rotation: If you change or rotate the access keys to your storage account, virtual network flow logs stop working. To fix this problem, you must disable and then re-enable virtual network flow logs.

Resource group names should not contain underscores (`_`).

#### Step 1: Configure Azure Storage Account

In this step, you'll configure a storage account to export monitoring data for your Azure service.
The storage account must be a General-purpose v2 (GPv2) storage account. If you have a storage account with a container that you want to use for this purpose, make a note of its resource group, storage account name, and container name, and proceed to [step 2](#step-2-configure-an-http-source).

To configure an Azure storage account, do the following:

1. Create a new storage account General-purpose v2 (GPv2) storage account. For instructions, see [Create a storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-quickstart-create-account?tabs=portal) in Azure help.
2. Create a container(Optional) all services in Azure create containers automatically. This step is needed only when you are exporting custom logs in some container.
   * In the Azure portal, navigate to the storage account you just created (in the previous step).
   * Select **Blobs** under **Blob Service**.
      * Select **+ Container**,
      * Enter the Name
      * Select **Private** for the Public Access Level.
      * Click **OK**.

   Make a note of the container name. You will need to supply it later. By default, the flow logs are in `insights-logs-flowlogflowevent` container.
   If you have a storage account that you want to use for this purpose, make a note of its resource group, and storage account name, then proceed to [step 2](#step-2-configure-an-http-source).

#### Step 2: Configure an HTTP Source

This section demonstrates how to configure an HTTP source to receive logs from the Azure function.

To configure an HTTP source for Azure, do the following:
1. Select a hosted collector where you want to configure the HTTP source. If desired, create a new hosted collector, as described on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
2. Configure an HTTP source, as described on [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics). Make a note of the URL for the source, you will need it in the next step.
3. In **Advanced Options for Logs**, under **Timestamp Format**, click **Specify a format** and enter the following:
   * Specify Format as epoch
   * Specify Timestamp locator as `\"time\": (.*),`

#### Step 3: Configure Azure Resources using ARM template

To deploy the ARM template-based Blob Storage collection, refer to step 3 of [Collect Logs from Azure Blob Storage(block blobs)](/docs/send-data/collect-from-other-data-sources/azure-blob-storage/block-blob/collect-logs#step-3-configure-azure-resources-using-arm-template). If you want to collect only flow logs from the storage account, you can add the filter `/blobServices/default/containers/insights-logs-flowlogflowevent/`.

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-virtual-network/networkflowlogs-template-deployment.png')} alt="Configure ARM Template for Azure Blob Storage(block blobs) collection" style={{border: '1px solid gray'}} width="800" />

#### Step 4: Enable Virtual Network flow logs via the Azure Portal

Follow the steps detailed in the [Microsoft Azure Virtual Network documentation](https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-portal#create-a-flow-log) to enable the flow logs to point to the storage account you configured in the [Configure Azure Storage Account](#step-1-configure-azure-storage-account) section. You can select any target resources (available options are: Virtual network, Subnet, and Network interface) based on your requirements.

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-virtual-network/virtualnetworkflowlogs.png')} alt="Configure Virtual Network Flow Logs" style={{border: '1px solid gray'}} width="800" />

If you have multiple virtual networks, you can configure virtual network flow logs using a [built-in policy](https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-policy#deploy-and-configure-virtual-network-flow-logs-using-a-built-in-policy) for each location and subscriptions.

#### Activity logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Skip this step if you are already collecting activity logs for a subscription.

:::note
Since this source includes logs from multiple regions, avoid tagging it with a location tag.
:::

In order to find virtual networks without any flow log resource, you can audit flow logs configuration for virtual networks using a [built-in policy](https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-policy#audit-flow-logs-configuration-for-virtual-networks-using-a-built-in-policy).


## Installing the Azure Virtual Network app

Now that you have set up data collection, install the Azure Virtual Network Sumo Logic app to use the pre-configured [dashboards](#viewing-the-azure-virtual-network-app-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallIndexV2 from '../../reuse/apps/app-install-index-option.md';

<AppInstallIndexV2/>

As part of the app installation process, the following fields will be created by default:

- `tenant_name`. This field is tagged at the collector level. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
- `location`. The region the resource name belongs to.
- `subscription_id`. ID associated with a subscription where the resource is present.
- `resource_group`. The resource group name where the Azure resource is present.
- `provider_name`. Azure resource provider name (for example, Microsoft.Network).
- `resource_type`. Azure resource type (for example, storage accounts).
- `resource_name`. The name of the resource (for example, storage account name).
- `service_type`. Type of the service that can be accessed with an Azure resource.
- `service_name`. Services that can be accessed with an Azure resource (for example, in Azure Container Instances the service is Subscriptions).

Also FER `AzureVirtualNetworkTargetResourceIdExtractionFER` will be created as part of the app installation process itself.

## Viewing the Azure Virtual Network app dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Overview

**Azure Virtual Network - Overview** dashboard provides details on network traffic flows, including accepted and rejected connections, geographical distribution, and data access patterns across different network boundaries.

Use this dashboard to:
* Monitor the geographical distribution of source and destination traffic to identify unusual patterns or potential security threats.
* Analyze the accepted to rejected flows ratio, and investigate the top rejected destination ports to troubleshoot connectivity issues.
* Compare the current network usage with historical averages to detect anomalies or assess capacity planning needs.
* Examine data access across borders, both North-South and East-West, to optimize network segmentation and security policies.
* Identify top resources by bytes sent and the top TCP destination ports to prioritize network optimization efforts.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureVirtualNetwork/Azure-Virtual-Network-Overview.png')} alt="Azure Virtual Network - Overview" style={{border: '1px solid gray'}} width="800" />

### Accepted Traffic Flow

**Azure Virtual Network - Accepted Traffic Flow** dashboard provides details on incoming and outgoing network traffic, packet flows, and security group rules applied to traffic flows.

Use this dashboard to:
* Visualize and compare incoming and outgoing traffic patterns across various geographical locations to identify potential network bottlenecks or unusual activity.
* Monitor accepted flow traffic by resource name over time to detect spikes or drops in network usage, which could indicate performance issues or security concerns.
* Analyze the top accepted source and destination IP addresses and ports to understand common traffic patterns and potentially identify unauthorized or suspicious connections.
* Review accepted flow traffic by resource name and Access Control List (ACL) to ensure that network security group rules are properly configured and functioning as intended.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureVirtualNetwork/Azure-Virtual-Network-Accepted-Traffic-Flow.png')} alt="Azure Virtual Network - Accepted Traffic Flow" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

**Azure Virtual Network - Administrative Operations** dashboard provides details on various administrative actions performed on Azure Virtual Network resources, including their operation types, status, and associated errors.

Use this dashboard to:
* Monitor the distribution of operation types (Read, Write, Delete) to understand the most common actions performed on your virtual network resources.
* Analyze the distribution of operation statuses to identify potential issues, focusing on failures and their root causes.
* Track user and application activity by examining the breakdown of operations per entity, helping to detect unusual patterns or unauthorized access.
* Investigate specific errors by reviewing the top operations causing issues, enabling swift troubleshooting and resolution.
* Audit recent write and delete operations to ensure compliance with organizational policies and detect any suspicious activities.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureVirtualNetwork/Azure-Virtual-Network-Administrative-Operations.png')} alt="Azure Virtual Network - Administrative Operations" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

**Azure Virtual Network - Policy and Recommendations** dashboard provides details on policy events and recommendations for Azure Virtual Networks.

Use this dashboard to:
* Monitor and analyze both successful and failed policy events across your Azure Virtual Network resources to ensure compliance and security.
* Identify potential security risks by correlating failed policy events with specific resource groups and locations, enabling targeted mitigation.
* Review and implement recommendations to enhance the operational excellence and security of your Azure Virtual Network infrastructure.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureVirtualNetwork/Azure-Virtual-Network-Policy-and-Recommendations.png')} alt="Azure Virtual Network - Policy and Recommendations" style={{border: '1px solid gray'}} width="800" />

### DDOS Protection

**Azure Virtual Network - DDOS Protection** dashboard provides details on DDoS attacks and packet rates for virtual networks in Azure. Use this dashboard to:
* Monitor and track the frequency of DDoS attacks on your virtual networks over time to assess ongoing threats.
* Analyze the overall packet rate during DDoS attacks to gauge the scale and impact of the attack.
* Compare TCP and UDP packet rates during an attack to determine the attack type, allowing you to tailor your mitigation strategies more effectively.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureVirtualNetwork/Azure-Virtual-Network-DDOS-Protection.png')} alt="Azure Virtual Network - DDOS Protection" style={{border: '1px solid gray'}} width="800" />

### Denied Traffic Flow

**Azure Virtual Network - Denied Traffic Flow** dashboard provides details on blocked network traffic across your Azure virtual networks, including geographical distribution, resource-specific denials, and encryption status.

Use this dashboard to:
* Identify geographical hotspots of denied traffic to pinpoint potential security threats or misconfigurations within specific regions.
* Analyze denied traffic patterns by subnet, virtual network, and network interface to refine your network security group rules and access control lists.
* Monitor encryption-related traffic denials to ensure proper implementation of encryption policies across your virtual network.
* Correlate spikes in denied traffic flow with specific source and destination IP addresses to investigate potential security incidents.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureVirtualNetwork/Azure-Virtual-Network-Denied-Traffic-Flow.png')} alt="Azure Virtual Network - Denied Traffic Flow" style={{border: '1px solid gray'}} width="800" />

### Azure Virtual Network alerts
These alerts are metric based and will work for all Virtual Networks.

| Alert Name | Description                                                                     | Alert Condition | Recover Condition |
|:--|:--------------------------------------------------------------------------------|:----------------|:------------------|
| `Azure Virtual Network - Under DDoS attack` | This alert is triggered when maximum DDoS attack count is greater than 1.0785.  | Count > 1.0785  | Count < = 1.0785  |

## Upgrade/Downgrade the Azure Virtual Network app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Virtual Network app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).

