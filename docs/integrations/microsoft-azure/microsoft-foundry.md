---
id: microsoft-foundry
title: Microsoft Foundry
description: Learn about the Sumo Logic collection process for the Microsoft Foundry service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-openai.png')} alt="Microsoft Foundry icon" width="50"/>

[Microsoft Foundry (formerly Azure AI Studio)](https://azure.microsoft.com/en-us/products/ai-foundry) is an interoperable AI platform that enables developers to build faster and smarter, while organizations gain fleetwide security and governance in a unified portal. It’s never been easier to build, deploy, and scale AI apps and agents that understand your business context and deliver business impact.


## Log and metric types

For Microsoft Foundry, you can collect the following logs and metrics:

* **Resource logs**. To learn more about the different resource log category types and schemas collected for Microsoft Foundry, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/ai-services/diagnostic-logging).

* **Platform Metrics for Azure Microsoft Foundry**. These metrics are available in the namespaces below:
    * [Microsoft.CognitiveServices/accounts](https://learn.microsoft.com/en-us/azure/foundry/openai/monitor-openai-reference)

For more information on supported metrics, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/foundry/openai/monitor-openai-reference).

## Setup

Azure services send monitoring data to Azure Monitor, which can then [stream data to Event Hub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Microsoft Foundry resource you want to monitor. You can forward logs to the same Event Hub, provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/Foundry/Logs`, `Azure/Foundry/Metrics`.

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
    1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-openai-logs.png')} alt="Microsoft Foundry logs" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with the right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Microsoft Foundry Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity logs (optional)

import ActivityLogs from '../../reuse/apps/azure-activity-logs.md';

<ActivityLogs/>

## Installing the Microsoft Foundry app

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

## Viewing the Microsoft Foundry dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Administrative Operations

The **Microsoft Foundry - Administrative Operations** dashboard provides insights into the operational activities and status of your Microsoft Foundry resources. Panels display information on operation type distribution, success rates, top operations causing errors, and recent write and delete operations to maintain an audit trail of configuration changes.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/MicrosoftFoundry/Microsoft-Foundry-Administrative-Operations.png')} alt="Microsoft Foundry - Administrative Operations" style={{border: '1px solid gray'}} width="800" />

### API Overview

The **Microsoft Foundry - API Overview** dashboard provides a high-level view of the overall health, performance, usage, and safety signals of your Microsoft Foundry service. Panels display information on availability, request activity, token consumption, latency, and moderation events across deployments.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/MicrosoftFoundry/Microsoft-Foundry-API-Overview.png')} alt="Microsoft Foundry - API Overview" style={{border: '1px solid gray'}} width="800" />

### Content Safety

The **Microsoft Foundry - Content Safety** dashboard provides insights into responsible AI policies and content safety enforcement. Panels display information on harmful content detected, requests blocked by filters, abusive user identification, and system safety events.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/MicrosoftFoundry/Microsoft-Foundry-Content-Safety.png')} alt="Microsoft Foundry - Content Safety" style={{border: '1px solid gray'}} width="800" />

### Models

The **Microsoft Foundry - Models** dashboard provides a deep dive into individual model performance, usage, and health. Panels display information on model availability, request rates, operations, latency, throughput (tokens per second), and usage split by deployment, model name, and resources.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/MicrosoftFoundry/Microsoft-Foundry-Models.png')} alt="Microsoft Foundry - Models" style={{border: '1px solid gray'}} width="800" />

### Overview

The **Microsoft Foundry - Overview** dashboard provides a high-level view of the overall health, performance, usage, and safety signals of your Microsoft Foundry service. Panels display information on availability, request activity, token consumption, latency, and moderation events across deployments.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/MicrosoftFoundry/Microsoft-Foundry-Overview.png')} alt="Microsoft Foundry - Overview" style={{border: '1px solid gray'}} width="800" />

### Performance and Latency

The **Microsoft Foundry - Performance and Latency** dashboard provides insights into the responsiveness of Microsoft Foundry APIs and models. Panels display information on time-to-first-byte (TTFB), time-to-response, time-between-tokens for streaming performance, tokens-per-second speed, and time-to-last-byte across models and deployments.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/MicrosoftFoundry/Microsoft-Foundry-Performance-and-Latency.png')} alt="Microsoft Foundry - Performance and Latency" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

The **Microsoft Foundry - Policy and Recommendations** dashboard provides insights into policy events and recommendations for your Microsoft Foundry resources. Panels display information on the success and failure rates of policy events, recent recommendations to improve performance and security, and trends in policy events over time.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/MicrosoftFoundry/Microsoft-Foundry-Policy-and-Recommendations.png')} alt="Microsoft Foundry - Policy and Recommendations" style={{border: '1px solid gray'}} width="800" />

### Reliability and Availability

The **Microsoft Foundry - Reliability and Availability** dashboard provides visibility into the operational health of Microsoft Foundry across deployments and models. Panels display information on overall API availability, request success vs client/server errors, and throttled calls (429) to help identify availability degradation, error spikes, and throttling events.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/MicrosoftFoundry/Microsoft-Foundry-Reliability-and-Availability.png')} alt="Microsoft Foundry - Reliability and Availability" style={{border: '1px solid gray'}} width="800" />

### Speech and Audio

The **Microsoft Foundry - Speech and Audio** dashboard provides insights into speech processing and audio workloads within your Microsoft Foundry resources. Panels display information on audio seconds transcribed, batch and fast transcription trends, audio translation seconds, synthesized characters, and speech workload hotspots across deployments.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/MicrosoftFoundry/Microsoft-Foundry-Speech-and-Audio.png')} alt="Microsoft Foundry - Speech and Audio" style={{border: '1px solid gray'}} width="800" />

### Traffic and Payload

The **Microsoft Foundry - Traffic and Payload** dashboard provides insights into the data traffic and payload volumes of your Microsoft Foundry service. Panels display information on data in vs out volumes, data ingress and egress trends, average latency, and payload distribution across operations and deployments.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/MicrosoftFoundry/Microsoft-Foundry-Traffic-and-Payload.png')} alt="Microsoft Foundry - Traffic and Payload" style={{border: '1px solid gray'}} width="800" />

### Translation and Document

The **Microsoft Foundry - Translation and Document** dashboard provides insights into text and document translation workloads within your Microsoft Foundry resources. Panels display information on text characters translated, document characters translated, one-document translation volumes, and translation resource utilization across deployments.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/MicrosoftFoundry/Microsoft-Foundry-Translation-and-Document.png')} alt="Microsoft Foundry - Translation and Document" style={{border: '1px solid gray'}} width="800" />

### Usage and Token Consumption

The **Microsoft Foundry - Usage and Token Consumption** dashboard provides insights into model utilization and token consumption across deployments. Panels display information on prompt tokens (input), generated tokens (output), total tokens processed, cache match rates, and workload trends across different models and regions.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/MicrosoftFoundry/Microsoft-Foundry-Usage-and-Token-Consumption.png')} alt="Microsoft Foundry - Usage and Token Consumption" style={{border: '1px solid gray'}} width="800" />

## Create monitors for Microsoft Foundry

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Microsoft Foundry alerts

| Alert Name | Alert Description and Conditions | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Microsoft Foundry - Availability` | This alert is triggered when the availability of the resource drops below 100%. | Count &lt; 100 | Count &gt;= 100 |
| `Microsoft Foundry - Azure OpenAI Requests` | This alert is triggered when the average Azure OpenAI request count exceeds the threshold. | Count &gt; 1000000 (Warning) / Count &gt; 2000000 (Critical) | Count &lt;= 1000000 (Warning) / Count &lt;= 2000000 (Critical) |
| `Microsoft Foundry - Latency` | This alert is triggered when the average latency exceeds the threshold. | Count &gt; 50000 (Warning) / Count &gt; 60000 (Critical) | Count &lt;= 50000 (Warning) / Count &lt;= 60000 (Critical) |
| `Microsoft Foundry - Processed Inference Tokens` | This alert is triggered when inference token consumption crosses the value of 1000000 tokens. | Count &gt;= 1000000 | Count &lt; 1000000 |
| `Microsoft Foundry - Total Errors` | This alert is triggered when total errors are detected. | Count &gt;= 1 | Count &lt; 1 |

## Upgrade/Downgrade the Microsoft Foundry app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Microsoft Foundry app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
