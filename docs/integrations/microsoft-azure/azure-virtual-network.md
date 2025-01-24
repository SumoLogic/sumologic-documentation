---
id: azure-virtual-network
title: Azure Virtual Network
sidebar_label: Azure Virtual Network
description: Learn about the Sumo Logic collection process for the Azure Virtual Network service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-virtual-network.png')} alt="Thumbnail icon" width="50"/>

[Azure Virtual Network](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview) is a service that provides the fundamental building block for your private network in Azure enabling many types of Azure resources to securely communicate with each other, using the internet, and on-premises networks. This integration helps in monitoring the round trip time, failed pings, inbound dropped packets, and inbound bytes.

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

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Create hosted collector and tag `tenant_name` field. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Storage Tag Tenant Name" style={{border: '1px solid gray'}} width="800" />
2. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
2. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
3. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each storage service (blob,queue,table and file) and each storage account that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `AllMetrics`.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.
4. Tag the location field in the source with right location value.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Storage Tag Location" style={{border: '1px solid gray'}} width="500" />

### Configure logs collection

#### Configuration requirements

Before you begin configuring Virtual Network Flow Log collection, make sure the following environment prerequisites are met:

* Your Storage Account must be of type General-purpose v2 or Blob storage.
* Your Network Security Group and Storage Account should be in same resource location.
* You also need to have Microsoft Authorization/role Assignments/write permissions, so they should be a "User Access Administrator" or "Owner".

Resource group names should not contains underscores (`_`).

#### Step 1: Configure Azure Storage Account

In this step, you'll configure a storage account to export monitoring data for your Azure service.
The storage account must be a General-purpose v2 (GPv2) storage account. If you have a storage account with a container that you want to use for this purpose, make a note of its resource group, storage account name, and container name, and proceed to [step 2](#step-2-configure-an-http-source).

To configure an Azure storage account, do the following:

1. Create a new storage account General-purpose v2 (GPv2) storage account. For instructions, see [Create a storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-quickstart-create-account?tabs=portal) in Azure help.
2. Create a container(Optional) all services in azure create containers automatically. This step is needed only when you are exporting custom logs in some container.
   * In the Azure portal, navigate to the storage account you just created (in the previous step).
   * Select **Blobs** under **Blob Service**.
      * Select **+ Container**,
      * Enter the Name
      * Select **Private** for the Public Access Level.
      * Click **OK**.

   Make a note of the container name. You will need to supply it later. By default, the flow logs are in `insights-logs-flowlogflowevent` container.
   If you have a storage account that you want to use for this purpose, make a note of its resource group, storage account name, then proceed to [step 2](#step-2-configure-an-http-source).

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

#### Activity logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Skip this step if you are already collecting activity logs for a subscription.

:::note
Since this source includes logs from multiple regions, avoid tagging it with a location tag.
:::


## Installing the Azure Virtual Network app

Now that you have set up data collection, install the Azure Virtual Network Sumo Logic app to use the pre-configured [dashboards](#viewing-the-azure-virtual-network-app-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing the Azure Virtual Network app dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

## Upgrade/Downgrade the Azure Virtual Network app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Virtual Network app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).

