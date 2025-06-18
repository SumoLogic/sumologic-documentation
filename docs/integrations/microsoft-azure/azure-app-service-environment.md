---
id: azure-app-service-environment
title: Azure App Service Environment
description: Learn about the Sumo Logic collection process for the Azure App Service Environment service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-service-environment.png')} alt="Thumbnail icon" width="50"/>

An [Azure App Service Environment](https://learn.microsoft.com/en-us/azure/app-service/environment/overview) is an Azure App Service feature that provides a fully isolated and dedicated environment for running App Service apps securely at high scale. This integration helps in monitoring your environments operational events such as upgrades, scaling, and suspensions.

The below instructions applies to App Service Environment v3.

## Log types

For Azure App Service Environment, you can collect the following logs:

* **Activity logs**, provides insight into any subscription-level or management group level events that have occurred in the Azure. To learn more, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log-schema).

* **App Service Environment Platform Logs**. Logs are only emitted when your App Service Environment has an event (for example, a scale operation with an App Service Environment) that triggers the logs. To learn more about the different situations and messages collected for Azure App Service Environment, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/app-service/environment/using#logging).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

You must explicitly enable diagnostic settings for each Azure App Service Environment you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/AppServiceEnvironment/Logs`.

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the **Diagnostic setting** in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the below steps for each Azure App Service Environment that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `App Service Environment Platform Logs`.
   1. Use the Event Hub namespace and Event Hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
   <img src={useBaseUrl('img/send-data/Azure-App-Service-Plan-Configure-Diagnostic-Logs.png')} alt="Azure App Service Environment logs" style={{border: '1px solid gray'}} width="800" />
3. Tag the location field in the source with right location value.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure App Service Environment Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity logs (optional)

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). If you are already collecting activity logs for a subscription, do not perform this step.

## Installing the Azure App Service Environment app

This section provides instructions on how to install the Azure App Service Environment app, and shows examples of each of the preconfigured dashboards you can use to analyze your data.

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

## Viewing Azure App Service Environment dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Overview

The **Azure App Service Environment - Overview** dashboard provides comprehensive information of all the service health incidents or resource health events associated with Azure App Service Environments in your azure account.

Use this dashboard to:
* View recent resource and service health incidents.
* View distribution of service and resource health by incident type.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-AppServiceEnvironment/Azure-App-Service-Environment-Overview.png')} alt="Azure AppServiceEnvironment Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### Operations

The **Azure App Service Environment - Operations** dashboard offers comprehensive insights into the scaling, upgrade events for your Azure App Service Environment.

Use this dashboard to:
*  Analyze scaling and upgrade events for your App Service Environment
*  Identify potential operations issues affecting your app service environment.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-AppServiceEnvironment/Azure-App-Service-Environment-Operations.png')} alt="Azure AppServiceEnvironment Operations dashboard" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure App Service Environment - Administrative Operations** dashboard provides details on read/write/delete specific changes, different operations used, top 10 operations that caused most errors, and users performing admin operations.

Use this dashboard to:
* Identify top users performing administrative operations.
* View Top 10 operations that caused the most errors.
* View recent read, write, and delete operations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-AppServiceEnvironment/Azure-App-Service-Environment-Administrative-Operations.png')} alt="Azure AppServiceEnvironment Administrative Operations dashboard" style={{border: '1px solid gray'}} width="800" />

## Upgrading the Azure App Service Environment app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure App Service Environment app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
