---
id: azure-virtual-machine
title: Azure Virtual Machine
description: Learn about the Sumo Logic collection process for the Azure Virtual Machine service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-vm-icon.png')} alt="Thumbnail icon" width="50"/>


[Azure Virtual Machine](https://learn.microsoft.com/en-us/azure/virtual-machines/) is a virtualized computing environment on Microsoft's cloud platform, Azure, that allows users to run applications and tasks on a dedicated, scalable, and on-demand basis. Azure VM provides scalable computing capacity in the Azure Cloud. You can use Azure VM to launch as many or as few virtual servers as you need, configure security and networking, and manage storage.

The Sumo Logic app for Azure Virtual Machine allows you to collect your VM instance metrics and display them using predefined dashboards. The app provides dashboards to display analysis of VM instance metrics for CPU, disk, network, cache, and memory. Also, it provides detailed insights into all audit events associated with VM instances and specifically helps identify changes, errors, and user activities.



## Log and metric types

For Azure Virtual Machine, you can collect the following logs and metrics:

* **Activity logs**. To learn more about the different Activity log category types and schemas collected for Azure Virtual Machine, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/virtual-machines/monitor-vm-reference#activity-log).
* **Virtual Machine Metrics**. These metrics are available in [Microsoft.Compute/virtualMachines, Microsoft.Compute/virtualmachineScaleSets](https://learn.microsoft.com/en-us/azure/virtual-machines/monitor-vm-reference#metrics) namespace.

For more information on supported metrics and their units, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/virtual-machines/monitor-vm-reference#supported-metrics-for-microsoftcomputevirtualmachines).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

You must explicitly enable diagnostic settings for each Virtual Machine you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/VM/ActivityLogs`, `Azure/VM/Metrics`.

### Configure metric rules

* **Azure Observability Metadata Extraction VMName**

  In case this rule already exists, then no need to create it again.
```sql
Rule Name: AzureObservabilityMetadataExtractionVMName
```

```sql title="Metric match expression"
tenant_name=* namespace=Microsoft.Compute/virtualMachines resource_name=*
```

| Fields extracted | Metric rule    |
|:------------------|:----------------|
| `vmname`  | `$resource_name._1` |

### Configure metrics collection

:::note
Sumo Logic Metrics source is currently in Beta, to participate, contact your Sumo Logic account executive.
:::

1. To set up the Azure Metrics source in Sumo Logic, refer to the shared beta documentation.
1. In the Sumo Logic Azure Metrics source configuration, configure namespaces as `Microsoft.Compute/virtualMachines` and `Microsoft.Compute/virtualMachineScaleSets`.
<img src={useBaseUrl('img/integrations/microsoft-azure/azure-virtual-machine-namespaces.png')} alt="Azure Virtual Machine Namespaces" style={{border: '1px solid gray'}} width="500" />

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.
#### Diagnostic logs
1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#create-diagnostic-settings). Perform the steps below for each Azure Virtual Machine namespace that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-eventgrid-logs.png')} alt="Azure Event Grid logs" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with the right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Virtual Machine Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity Logs

To collect activity logs, refer to the [Collecting Logs for the Azure Audit App from Event Hub](/docs/integrations/microsoft-azure/audit) section in the Azure Audit documentation. Do not perform this step in case you are already collecting activity logs for a subscription.
:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::


## Installing the Azure Virtual Machine app

Now that you have set up data collection, install the Azure Virtual Machine Sumo Logic app to use the pre-configured [dashboards](#viewing-the-azure-virtual-machine-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing the Azure Virtual Machine dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

**Azure Virtual Machine - Overview** dashboard allows you to monitor and analyze your VM's usage metrics such as VM Availability, CPU usage, read/write ops, cache hits, VM usage, and average latencies. Gain insights into the performance of your VMs.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureVM/Azure+VM+-+Overview.png')} alt="Azure Key Vault - Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### OS/Disk

**Azure VM  - OS/Disk** dashboard provides details on the operational activities and status of your Azure VM OS and Data disks

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureVM/Azure+VM+-+OS%3AData+Disk.png')} alt="Azure Key Vault  - Operations Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### Network

**Azure VM - Network** dashboard provides detailed information about VM network activities based on incoming and outgoing packets and bytes.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureVM/Azure+VM+-+Network.png')} alt="Azure Key Vault - Operations Detailed dashboard" style={{border: '1px solid gray'}} width="800" />

### Disk

The **Azure VM - Disk** dashboard provides details on the operational activities and status of your Azure VM disks and premium disks.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureVM/Azure+VM+-+Disk.png')} alt="Azure Key Vault - Errors and Failures dashboard" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure VM - Administrative Operations** dashboard provides details on the operational activities and status of your Azure Virtual Machine resources. Use this dashboard to:
* Monitor the distribution of operation types and their success rates to ensure proper functioning of your Virtual Machine.
* Identify potential issues by analyzing the top operations causing errors and correlating them with specific users or applications.
* Track recent write and delete operations to maintain an audit trail of changes made to your Virtual Machine.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureVM/Azure+VM+-+Administrative+Operations.png')} alt="Azure Key Vault - Administrative Operations dashboard" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

The **Azure Virtual Machine - Policy and Recommendations** dashboard provides details on policy events and recommendations for your Azure Virtual Machine resources. Use this dashboard to:
* Monitor the success and failure rates of policy events to ensure proper configuration and compliance.
* Track and analyse recent recommendations to improve the performance and security of your Vaults setup.
* Identify trends in policy events and recommendations over time to proactively address potential issues.
  
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureVM/Azure+VM+-+Policy+and+Recommendations.png')} alt="Azure Key Vault - Policy and Recommendations dashboard" style={{border: '1px solid gray'}} width="800" />

### CPU

The **Azure VM - CPU** dashboard provides details on the CPU metrics and usage of your Azure VM CPU.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureVM/Azure+VM+-+CPU.png')} alt="Azure Key Vault - Vault Health dashboard" style={{border: '1px solid gray'}} width="800" />

### Cache

The **Azure VM - Cache** dashboard provides details on the status and usage of your Azure VM cache resources.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureVM/Azure+VM+-+Cache.png')} alt="Azure Key Vault - Compliance dashboard" style={{border: '1px solid gray'}} width="800" />

### Temp Disk

The **Azure VM - Temp Disk** dashboard provides details on the operational activities and status of your Azure VM Temp Disk.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureVM/Azure+VM+-+Temp+Disk.png')} alt="Azure Key Vault - Compliance dashboard" style={{border: '1px solid gray'}} width="800" />

## Create monitors for Azure Virtual Machine app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>