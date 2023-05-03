---
id: audit
title: Azure Audit
sidebar_label: Azure Audit
description: The Sumo Logic App for Azure Audit allows you to collect Azure Audit logs and monitor the health of your Azure environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-audit.png')} alt="thumbnail icon" width="75"/>

The Azure Audit App allows you to collect data from the Azure Activity Log (formerly known as Azure Audit logs) and monitor the health of your Azure environment. The App provides preconfigured Dashboards that allow you to monitor Active Directory activity, resource usage, service health, and user activity.  Logs can be collected in two ways - from Event Hub, and from Azure Insight API using Sumo Powershell scripts.

This guide walks you through the tasks you'll perform to [collect Azure Audit logs from Event Hub](#Collect-Logs-for-the-Azure-Audit-App-from-Event-Hub):
1. Create an Event Hub.
2. Export activity logs to the Event Hub.
3. Create a Function App.
4. Define the required environment variables.
5. Deploy the function.
6. Then, [install the Sumo Logic App for Azure Audit](#Install-the-Azure-Audit-App).

To install the Sumo Logic App for Azure Audit, you must sign up for a Sumo Logic Account, if you have not already done so. To sign up, go to [https://www.sumologic.com/pricing/](https://www.sumologic.com/pricing/) and select your account type or click **Free Trial** to sign up for a Sumo Logic Free account.

## Log Types

The Azure Audit App uses the following logs:

* Local Windows Event Source Logs
* [Azure Activity Log](https://azure.microsoft.com/en-us/updates/audit-logs-in-azure-preview-portal/)
* (Optional) [Azure Active Directory Audit Reports](https://azure.microsoft.com/en-us/documentation/articles/active-directory-view-access-usage-reports/)


## Collecting Logs for the Azure Audit App from Event Hub

This section has instructions for configuring a pipeline for shipping Azure Audit logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) to an Event Hub, on to an Azure Function, and finally to an HTTP source on a hosted collector in Sumo Logic.

The sections below are either for FedRamp Sumo Logic deployments or if you have been advised by the Sumo Logic support team to not use the Cloud to Cloud Integration based on your Azure environments.

Here’s how the solution fits together:

* Azure Monitor collects logs for most Microsoft Azure services, including Azure Audit, and streams the data to an Azure Event Hub.
* Azure Event Hubs is a data streaming platform and event ingestion service. In this pipeline, an Event Hub streams the logs collected by Azure Monitor to an Azure function.
* The Azure function is a small piece of code that is triggered by Event Hub to send logs to the Sumo HTTP Source, function logs to one Storage Account, and failover data to another.

<img src={useBaseUrl('img/integrations/microsoft-azure/CollectLogsforAzureAudit.png')} alt="CollectLogsforAzureAD" />

### Configure an HTTP source

In this step, you configure an HTTP source to which the Azure function will send Azure Activity logs.

1. Select a hosted collector where you want to configure the HTTP source. If desired, create a new hosted collector, as described on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
2. Configure an HTTP source, as described on [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics).


### Configure Azure resources using ARM template

In this step, you use a Sumo-provided Azure Resource Manager (ARM) template to create an Event Hub, an Azure function and two Storage Accounts. The Azure function is triggered by Event Hub. Two storage accounts are used to store log messages from the Azure function and failover data from Event Hub.

1. Download the [azuredeploy_logs.json](https://s3.amazonaws.com/appdev-cloudformation-templates/azuredeploy_logs.json) ARM template.
2. Go to **Template deployment** in the Azure Portal.
3. Click **Create**.
4. On the **Custom deployment** blade, click **Build your own template in the editor.**
5. Copy the contents of `azuredeploy_logs.json`, and paste it into the editor window.
6. Click **Save.**
7. Now you are back on the **Custom deployment** blade.
    * Create a new Resource Group (recommended) or select an existing one.
    * Choose Location.
    * In the **Sumo Endpoint URL** field, enter the URL of the HTTP Source you configured in [Step 1](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-logs-azure-monitor#Step_1._Configure_an_HTTP_source).
    * Agree to the terms and conditions.
    * Click **Purchase**.
8. Verify the deployment was successful by looking at **Notifications** at the top right corner of Azure Portal.
9. **(Optional)** In the same window, you can click **Go to resource group** to verify all resources have been created successfully. You will see something like this: \
10. Go to **Storage accounts** and search for “sumofailmsg”. Click on `sumofailmsg_<random-string>`.
11. Under **Blob Service**, click **Containers**, then click **+ Container**, enter the Name** azureaudit-failover**, and select **Private** for the **Public Access Level**. Click **OK**.

### Export Activity Logs to Event Hub

1. In the search bar, search, and select **Activity Log.
2. In the **Activity log** window, click **Diagnostic Settings**.

3. In the Diagnostic Settings window, click **Add Diagnostic settings.
4. Select the log type in **Category details** that you want to ingest.
    * Select the **Stream to an event hub** checkbox and then select the following:
        * **Subscription.** Pull-down, select a subscription.
        * **Event Hub Namespace.** Pull-down, select the `SumoAzureLogsNamespace<UniqueSuffix>` namespace created by the ARM template in [Step 2](#Step_2._Configure_Azure_resources_using_ARM_template).
        * **Event Hub name (optional).** Select `"insights-operational-logs"`.
        * **Event hub policy name. **Leave the default policy,** RootManageSharedAccessKey**, or select another as desired.
    * Click **Save.**


### Troubleshooting

If logs are not flowing into Sumo Logic, see [Troubleshooting](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-logs-azure-monitor#Troubleshooting_log_collection).

## Installing the Azure Audit App

Now that you have set up collection from the Azure Activity Log (previously known as Azure Audit logs), install the Azure Audit App to use the preconfigured searches and dashboards that provide insight into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing Azure Audit Dashboards

The predefined Dashboards on Azure Audit allow you to instantly monitor the activities and events. All the dashboards in the App, except the Azure Audit - Active Directory dashboard, support logs from both Event Hub and Insight API.


### Overview

Use this dashboard to get a high-level view of the Azure activity by location, and details of events.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureAudit/Overview.png')} alt="Overview" />

**Azure Activity by Source Location. **Performs a geo lookup operation to display the location of Azure activity by Source location on a map of the world for the last seven days.

**Events by Level.** Displays events by level in a pie chart for the last seven days.

**Events by Status.** Shows details on events by status in a stacked column chart on a timeline for the last seven days.

**Events by Caller.** Provides details on events by caller in a stacked column chart on a timeline for the last seven days.

**Events by Resource Group.** Displays details on events by Resource Group in a stacked column chart on a timeline for the last seven days.

**Events by Category.** Shows details on events by category in a stacked column chart on a timeline for the last seven days.


### Resource Usage

Use this dashboard to see the details on resource group and resource provider.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureAudit/ResourceUsage.png')} alt="Resource Usage" />

**Events by Resource Group. **Displays details on events by Resource Group across time in a stacked column chart on a timeline for the last seven days.

**Resource Group Events.** Shows Resource Group events in a pie chart for the last seven days.

**Resource Provider Events.** Shows information on Resource Provider events in a pie chart for the last seven days.

**Operations by Resource Group.** Shows details on operations by Resource Group by name and count in a stacked column chart for the last seven days.

**Operations by Resource Provider.** Shows details on operations by Resource Provider by name and count for last seven days.

**Resource Providers by Resource Group.** Displays details on Resource Providers by Resource Group by name and count in a stacked column chart for the last seven days.

**Events by Resource Provider. **Displays details on events by Resource Provider across time in a stacked column chart on a timeline for the last seven days.


### Service Health
Use this dashboard to see the details on Azure service health such as the level, status, and events.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureAudit/ServiceHealth.png')} alt="Service Health" />


**Level.** Displays information by level in a pie chart for the last seven days.

**Status.** Shows information by status in a pie chart for the last seven days.

**Events Details. **Provides information on Azure service health events in a table chart, including details such as operation name, description, level, correlation ID, event name, location, status, and time for the last seven days.

**Events Over Time.** Displays events over time in a column chart on a timeline for the last seven days.

**Unresolved Events.** Provides information on unresolved service health events in a table chart, including details on correlation ID, level, event name, location, status, and time for the last 30 days.


### User Activity
Use this dashboard to see the details on events, resources, and users.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureAudit/UserActivity.png')} alt="User Activity" />

**Events by Location.** Performs a geo lookup operation to display user activity events by IP address location on a map of the world for the last seven days.

**Resource Deletions.** Displays resource deletions in a pie chart for the last seven days.

**Resource Creations.** Provides details on resource creations in a pie chart for the last seven days.

**Top 10 Users. **Displays the top 10 users by name and event count in a bar chart for the last seven days.

**Resource Groups by Caller. **Shows Resource Groups by caller in a stacked bar chart by name and count for the last seven days.

**Events by User. **Provides details on events per user in an area chart on a timeline for the last seven days.

**Operations by User.** Displays operations by user in a stacked column chart by name and count for the last seven days.
