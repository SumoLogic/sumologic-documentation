---
id: azure-machine-learning
title: Azure Machine Learning
description: Learn about the Sumo Logic collection process for the Azure Machine Learning service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-machine-learning.png')} alt="Thumbnail icon" width="50"/>

[Azure Machine Learning](https://learn.microsoft.com/en-us/azure/machine-learning/overview-what-is-azure-machine-learning) is a cloud service for accelerating and managing the machine learning project lifecycle that includes training, deploying, and monitoring models. This integration helps in monitoring the training runs, model deployments, and resource utilization of the nodes present in your workspace.

## Log and metric types

For Azure Machine Learning, you can collect the following logs and metrics:

* **Resource logs**. These logs contain information about clusters, nodes, jobs, deployments, models, and pipeline events. To learn more about the different [log category types](https://learn.microsoft.com/en-us/azure/machine-learning/monitor-azure-machine-learning?view=azureml-api-2#analyzing-logs) and [schemas](https://learn.microsoft.com/en-us/azure/machine-learning/monitor-resource-reference?view=azureml-api-2#schemas) collected for Azure Machine Learning, refer to the documentation.
* **Platform Metrics for Azure Machine Learning**. These metrics are available in [Microsoft.MachineLearningServices/workspaces](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-machinelearningservices-workspaces-metrics) namespace.
For more information on supported metrics and dimensions, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/machine-learning/monitor-resource-reference?view=azureml-api-2#metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Machine Learning Workspace you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/MachineLearning/Logs`, `Azure/MachineLearning/Metrics`.

###  Configure collector

Create a hosted collector if not already configured and tag the `tenant_name` field. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name). Make sure you create the required sources in this collector. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

<MetricsSource/>

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.
#### Diagnostic logs
1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#create-diagnostic-settings). Perform the steps below for each Azure Machine Learning namespace that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-machinelearning-logs.png')} alt="Azure Machine Learning logs" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with the right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Machine Learning Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity logs (optional)

import ActivityLogs from '../../reuse/apps/azure-activity-logs.md';

<ActivityLogs/>

## Installing the Azure Machine Learning app

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

## Viewing the Azure Machine Learning dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Overview

The **Azure Machine Learning - Overview** dashboard provides comprehensive details on events, operations and details such as overall number of errors, failures, model usage and quota utilization, operation types, ingress and egress of network data

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureMachineLearning/Azure-Machine-Learning-Overview.png')} alt="Azure Machine Learning - Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### Model

The **Azure Machine Learning - Model** dashboard provides information on model details and model inference operations related to your Azure Machine Learning.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureMachineLearning/Azure-Machine-Learning-Model.png')} alt="Azure Machine Learning - Model dashboard" style={{border: '1px solid gray'}} width="800" />

### Compute

The **Azure Machine Learning - Compute** dashboard provides details on compute operations, events and usage such as CPU, GPU, Disk or memory to your Azure Machine Learning.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureMachineLearning/Azure-Machine-Learning-Compute.png')} alt="Azure Machine Learning - Compute dashboard" style={{border: '1px solid gray'}} width="800" />

### Data Events

The **Azure Machine Learning - Data Events** dashboard provides details on all Data events such as DateSet, DataStore, DataLabel read/change events with results details and also environment data events related to your Azure Machine Learning.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureMachineLearning/Azure-Machine-Learning-Data-Events.png')} alt="Azure Machine Learning - Data Events dashboard" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure Machine Learning - Administrative Operations** dashboard provides details on the operational activities and status of your Azure Machine Learning resources.

Use this dashboard to:
* Monitor the distribution of operation types and their success rates to ensure proper functioning of your Machine Learning.
* Identify potential issues by analyzing the top operations causing errors and correlating them with specific users or applications.
* Track recent write and delete operations to maintain an audit trail of changes made to your Machine Learning.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureMachineLearning/Azure-Machine-Learning-Administrative-Operations.png')} alt="Azure Machine Learning - Administrative Operations dashboard" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

The **Azure Machine Learning - Policy and Recommendations** dashboard provides details on policy events and recommendations for your Azure Machine Learning resources.

Use this dashboard to:
* Monitor the success and failure rates of policy events to ensure proper configuration and compliance.
* Track and analyse recent recommendations to improve the performance and security of your VM setup.
* Identify trends in policy events and recommendations over time to proactively address potential issues.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureMachineLearning/Azure-Machine-Learning-Policy-and-Recommendations.png')} alt="Azure Machine Learning - Policy and Recommendations dashboard" style={{border: '1px solid gray'}} width="800" />

### Jobs and Pipelines

The **Azure Machine Learning - Jobs and Pipelines** dashboard provides details on operations, events and failures in jobs and pipelines of your Azure Machine Learning.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureMachineLearning/Azure-Machine-Learning-Jobs-and-Pipelines.png')} alt="Azure Machine Learning - Jobs and Pipelines dashboard" style={{border: '1px solid gray'}} width="800" />

### Quota

The **Azure Machine Learning - Quota** dashboard provides details on quota related to your Azure Machine Learning such as Quota Utilization, Active Node, Active Cores, Idle Cores, etc.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureMachineLearning/Azure-Machine-Learning-Quota.png')} alt="Azure Machine Learning - Quota dashboard" style={{border: '1px solid gray'}} width="800" />

### Run

The **Azure Machine Learning - Run** dashboard provides details on running experiments such as failed runs, errors in runs, completed or in-progress or started run

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureMachineLearning/Azure-Machine-Learning-Run.png')} alt="Azure Machine Learning - Run dashboard" style={{border: '1px solid gray'}} width="800" />

## Create monitors for Azure Machine Learning app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Machine Learning alerts
These alerts are metric based and will work for all Machine Learning.

| Alert Name                                                     | Description                                                                                                     | Alert Condition | Recover Condition |
|:---------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------|:----------------|:------------------|
| `Azure Machine Learning - Failed Runs`                         | This alert is triggered when Failed Runs are detected in Machine Learning workspace.                            | Count >= 1      | Count < 1         |

## Upgrade/Downgrade the Azure Machine Learning app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Machine Learning app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).