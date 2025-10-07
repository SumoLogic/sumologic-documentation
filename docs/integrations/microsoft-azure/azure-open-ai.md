---
id: azure-open-ai
title: Azure OpenAI
description: Learn about the Sumo Logic collection process for the Azure OpenAI service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-openai.png')} alt="Thumbnail icon" width="50"/>

[Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/overview) is a fully managed platform that provides access to cutting-edge generative AI models developed by OpenAI, such as GPT, Codex, and Embeddings, through Azure’s secure, enterprise-grade environment. It integrates seamlessly with Azure services like Cognitive Search, Machine Learning, and Logic Apps, as well as external applications and data sources, enabling powerful natural language, code generation, and reasoning capabilities. This integration enables the monitoring of key operational and performance metrics, including request volume, token usage, response latency, and error rates, ensuring efficient model utilization and reliable AI-driven application performance.

## Log and metric types

For Azure OpenAI, you can collect the following logs and metrics:

* **Resource logs**. To learn more about the different resource log category types and schemas collected for Azure OpenAI, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/monitor-openai-reference#resource-logs).

* **Platform Metrics for Azure OpenAI**. These metrics are available in the namespaces below:
    * [Microsoft.CognitiveServices/accounts](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/monitor-openai-reference#supported-metrics-for-microsoftcognitiveservicesaccounts)

For more information on supported metrics, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/monitor-openai-reference#metrics).

## Setup

Azure services send monitoring data to Azure Monitor, which can then [stream data to Event Hub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each OpenAI resource you want to monitor. You can forward logs to the same Event Hub, provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/OpenAI/Logs`, `Azure/OpenAI/Metrics`.

###  Configure collector

Create a hosted collector if not already configured and tag the `tenant_name` field. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name). Make sure you create the required sources in this collector. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

<MetricsSource/>

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

#### Diagnostic logs

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the diagnostic settings in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#create-diagnostic-settings). Perform the steps below for each Azure Event Hubs namespace that you want to monitor.
    1. Choose `Stream to an event hub` as the destination.
    1. Select `allLogs`.
    1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-openai-logs.png')} alt="Azure OpenAI logs" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with the right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure OpenAI Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity logs (optional)

import ActivityLogs from '../../reuse/apps/azure-activity-logs.md';

<ActivityLogs/>

## Installing the Azure OpenAI app

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
- `service_type`. The type of service that can be accessed with an Azure resource.
- `service_name`. Services that can be accessed with an Azure resource. (For example, in Azure Container Instances, the service is Subscriptions.)

## Viewing the Azure OpenAI dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Overview

The **Azure OpenAI - Overview** dashboard provides a high‑level view of the overall health, performance, usage, and safety signals of your Azure OpenAI service. It surfaces key indicators such as availability, request activity, token consumption, latency, and moderation events. Use this dashboard to monitor general service reliability, detect issues quickly, and understand workload patterns across your deployments.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureOpenAI/Azure-OpenAI-Overview.png')} alt="Azure OpenAI - Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### Models

The **Azure OpenAI - Models** dashboard enables a deep dive into individual model performance, usage, and health. Tracks model availability, request rates, operations, latency, throughput (tokens per second), and usage split by deployment, model name, and resources
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureOpenAI/Azure-OpenAI-Models.png')} alt="Azure OpenAI - Models" style={{border: '1px solid gray'}} width="800" />

### Performance and Latency

The **Azure OpenAI - Performance and Latency** dashboard focuses on the responsiveness of Azure OpenAI APIs and models. It tracks time-to-first-byte (TTFB), time-to-response, time-between-tokens for streaming performance, tokens-per-second speed, and time-to-last-byte. Use this dashboard to identify latency bottlenecks across models, deployments and to compare streaming vs non-streaming performance trends.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureOpenAI/Azure-OpenAI-Performance-and-Latency.png')} alt="Azure OpenAI - Performance and Latency" style={{border: '1px solid gray'}} width="800" />

### Reliability and Availability

The **Azure OpenAI - Reliability and Availability** dashboard provides visibility into the operational health of Azure OpenAI across deployments and models. It highlights metrics that track overall API availability, request success vs client/server errors, and throttled calls (429). Use this dashboard to quickly identify availability degradation, error spikes, or throttling events that may affect your applications.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureOpenAI/Azure-OpenAI-Reliability-and-Availability.png')} alt="Azure OpenAI - Reliability and Availability" style={{border: '1px solid gray'}} width="800" />

### Usage and Token Consumption

The **Azure OpenAI - Usage and Token Consumption** dashboard provides details on model utilization and token consumption across deployments. The dashboard surfaces prompt tokens (input), generated tokens (output), total tokens processed, and cache match rates. Use this dashboard for cost optimization and understanding workload trends across different models and regions.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureOpenAI/Azure-OpenAI-Usage-and-Token-Consumption.png')} alt="Azure OpenAI - Usage and Token Consumption" style={{border: '1px solid gray'}} width="800" />

### Content Safety

The **Azure OpenAI - Content Safety** dashboard provides metrics on responsible AI policies and content safety enforcement. It monitors harmful content detected, requests blocked by filters, abusive user identification, and system safety events. Use this dashboard for compliance, RAI monitoring, and auditing risky behaviors across workloads.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureOpenAI/Azure-OpenAI-Content-Safety.png')} alt="Azure OpenAI - Content Safety" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure OpenAI - Administrative Operations** dashboard provides details on the operational activities and status of your Azure OpenAI resources.

Use this dashboard to:
* Monitor the distribution of operation types and their success rates to ensure proper functioning of your OpenAI.
* Identify potential issues by analyzing the top operations causing errors and correlating them with specific users or applications.
* Track recent write and delete operations to maintain an audit trail of changes made to your OpenAI.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureOpenAI/Azure-OpenAI-Administrative-Operations.png')} alt="Azure OpenAI - Administrative Operations" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

The **Azure OpenAI - Policy and Recommendations** dashboard provides details on policy events and recommendations for your Azure OpenAI resources.

Use this dashboard to:
* Monitor the success and failure rates of policy events to ensure proper configuration and compliance.
* Track and analyze recent recommendations to improve the performance and security of your OpenAI setup.
* Identify trends in policy events and recommendations over time to proactively address potential issues.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureOpenAI/Azure-OpenAI-Policy-and-Recommendations.png')} alt="Azure OpenAI - Policy and Recommendations" style={{border: '1px solid gray'}} width="800" />

## Create monitors for Azure OpenAI

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure OpenAI alerts

These alerts are metric-based and will work for all Azure Storage.

| Alert Name | Alert Description and Conditions | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Azure OpenAI - Availability` | This alert is triggered when the availability of the resource drops below 100%. | Count < 100 | Count = 100 |
| `Azure OpenAI - Processed Inference Tokens` | This alert is triggered when inference token consumption crosses the value of 1000000 tokens. | Count > 1000000 | Count < = 1000000 |

## Upgrade/Downgrade the Azure OpenAI app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure OpenAI app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
