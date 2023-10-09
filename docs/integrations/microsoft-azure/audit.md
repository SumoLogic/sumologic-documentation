---
id: audit
title: Azure Audit
sidebar_label: Azure Audit
description: The Sumo Logic app for Azure Audit allows you to collect Azure Audit logs and monitor the health of your Azure environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-audit.png')} alt="thumbnail icon" width="75"/>

The Azure Audit app allows you to collect data from the Azure Activity Log (formerly known as Azure Audit logs) and monitor the health of your Azure environment. This app provides preconfigured dashboards that allow you to monitor active directory activity, resource usage, service health, and user activity.

## Log type

The Azure Audit app uses the following log:

* [Azure Activity Log](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log?tabs=powershell)

## Collecting Logs for the Azure Audit app from Event Hub

In this step, you configure a pipeline for shipping logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) to an Event Hub. 

1. Sumo Logic supports several methods for collecting logs from Event Hub. You can choose any of them to collect logs.

    - [Azure Event Hubs Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/) (Recommended) 
    - Perform Steps 1 and Step 2 of [Collect Logs from Azure Monitor using Azure Functions](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-logs-azure-monitor/#configure-log-collection) 
    
    When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/AzureActivity/Logs`.

2. Push logs from Azure Monitor to Event Hub.
    1. In the search bar, search, and select **Activity Log**.
    1. In the **Activity Log** window, click **Export Activity Logs**.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/export-activity-log.png')} style={{border: '1px solid black'}} alt="activity-log" width="800"/>
    1. Select the log type in **Category details** that you want to ingest.
    1. Select the **Stream to an event hub** checkbox and then select the following:
        * **Subscription.** Pull-down, select a subscription.
        * **Event bub namespace.** If you have chosen Method 1 (Azure Event Hubs Source) for collecting logs, select the **EventHubNamespace** created manually, or else if you have chosen Method 2 (Collect logs from Azure monitor using Azure functions), then select `SumoAzureLogsNamespace<UniqueSuffix>` namespace created by the ARM template.
        * **Event hub name (optional).** If you have chosen Method 1 (Azure Event Hub Source) for collecting logs, select the event hub name, which you created manually, or if you have chosen Method 2 (Collect logs from Azure monitor using Azure functions), then select **insights-operational-logs**.
        * **Event hub policy name.** Leave the default policy, **RootManageSharedAccessKey**, or select another as desired.<br/> <img src={useBaseUrl('img/integrations/microsoft-azure/diagnostic-setting-audit.png')} style={{border: '1px solid black'}} alt="diagnostic-setting-audit.png" width="800"/>
    1. Click **Save.**

## Installing the Azure Audit app

Now that you have set up collection from the Azure Activity Log (previously known as Azure Audit logs), install the Azure Audit app to use the preconfigured searches and dashboards that provide insight into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing Azure Audit Dashboards

The predefined Dashboards on Azure Audit allow you to instantly monitor the activities and events. All the dashboards in the app, except the Azure Audit - Active Directory dashboard, support logs from both Event Hub and Insight API.

### Overview

Use this dashboard to get a high-level view of the Azure activity by location, and details of events.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureAudit/Overview.png')} alt="Overview" />

**Azure Activity by Source Location.** Performs a geo lookup operation to display the location of Azure activity by Source location on a map of the world for the last seven days.

**Events by Level.** Displays events by level in a pie chart for the last seven days.

**Events by Status.** Shows details on events by status in a stacked column chart on a timeline for the last seven days.

**Events by Caller.** Provides details on events by caller in a stacked column chart on a timeline for the last seven days.

**Events by Resource Group.** Displays details on events by Resource Group in a stacked column chart on a timeline for the last seven days.

**Events by Category.** Shows details on events by category in a stacked column chart on a timeline for the last seven days.

### Resource Usage

Use this dashboard to see the details on resource group and resource provider.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureAudit/ResourceUsage.png')} alt="Resource Usage" />

**Events by Resource Group.** Displays details on events by Resource Group across time in a stacked column chart on a timeline for the last seven days.

**Resource Group Events.** Shows Resource Group events in a pie chart for the last seven days.

**Resource Provider Events.** Shows information on Resource Provider events in a pie chart for the last seven days.

**Operations by Resource Group.** Shows details on operations by Resource Group by name and count in a stacked column chart for the last seven days.

**Operations by Resource Provider.** Shows details on operations by Resource Provider by name and count for last seven days.

**Resource Providers by Resource Group.** Displays details on Resource Providers by Resource Group by name and count in a stacked column chart for the last seven days.

**Events by Resource Provider.** Displays details on events by Resource Provider across time in a stacked column chart on a timeline for the last seven days.

### Service Health

Use this dashboard to see the details on Azure service health such as the level, status, and events.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureAudit/ServiceHealth.png')} alt="Service Health" />

**Level.** Displays information by level in a pie chart for the last seven days.

**Status.** Shows information by status in a pie chart for the last seven days.

**Events Details.** Provides information on Azure service health events in a table chart, including details such as operation name, description, level, correlation ID, event name, location, status, and time for the last seven days.

**Events Over Time.** Displays events over time in a column chart on a timeline for the last seven days.

**Unresolved Events.** Provides information on unresolved service health events in a table chart, including details on correlation ID, level, event name, location, status, and time for the last 30 days.

### User Activity
Use this dashboard to see the details on events, resources, and users.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureAudit/UserActivity.png')} alt="User Activity" />

**Events by Location.** Performs a geo lookup operation to display user activity events by IP address location on a map of the world for the last seven days.

**Resource Deletions.** Displays resource deletions in a pie chart for the last seven days.

**Resource Creations.** Provides details on resource creations in a pie chart for the last seven days.

**Top 10 Users.** Displays the top 10 users by name and event count in a bar chart for the last seven days.

**Resource Groups by Caller.** Shows Resource Groups by caller in a stacked bar chart by name and count for the last seven days.

**Events by User.** Provides details on events per user in an area chart on a timeline for the last seven days.

**Operations by User.** Displays operations by user in a stacked column chart by name and count for the last seven days.
