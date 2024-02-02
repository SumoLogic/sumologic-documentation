---
id: azure-app-service-environment
title: Azure App Service Environment
description: Learn about the Sumo Logic collection process for the Azure App Service Environment service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-service-environment.png')} alt="Thumbnail icon" width="50"/>

An [Azure App Service Environment](https://learn.microsoft.com/en-us/azure/app-service/environment/overview) is an Azure App Service feature that provides a fully isolated and dedicated environment for running App Service apps securely at high scale. This integration helps in monitoring your environments operational events such as upgrades, scaling, and suspensions.

The below instructions applies to App Service Environment v3.

## Log and metric types

For Azure App Service Environment, you can collect the following logs:

* **App Service Environment Platform Logs**. Logs are only emitted when your App Service Environment has an event (for example, a scale operation with an App Service plan) that triggers the logs. To learn more about the different situations and messages collected for Azure App Service Environment, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/app-service/environment/using#logging).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/).

You must explicitly enable diagnostic settings for each Azure App Service Environment you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/AppServiceEnvironment/Logs`, `Azure/AppServiceEnvironment/Metrics`.

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs cloud-to-cloud source in Sumo Logic portal, refer to our [Azure Event Hubs source documentation](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#create-diagnostic-settings). Perform below steps for each Azure App Service Environment that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `App Service Environment Platform Logs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### Azure Event Hubs Source

Common error types are described [here](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#error-types).

You can try [restarting](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#restarting-your-source) the source for `ThirdPartyConfig` errors.
