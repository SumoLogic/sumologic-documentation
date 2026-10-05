---
id: audit
title: Azure Audit
sidebar_label: Azure Audit
description: The Sumo Logic app for Azure Audit allows you to collect Azure Audit logs and monitor the health of your Azure environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-audit.png')} alt="Azure Audit icon" width="75"/>

The Azure Audit app allows you to collect data from the Azure Activity Log (formerly known as Azure Audit logs) and monitor the health of your Azure environment. This app provides preconfigured dashboards to monitor Active Directory activity, resource usage, service health, and user activity.

## Log type

The Azure Audit app uses the following log:

* [Azure Activity Log](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log?tabs=powershell)

## Collecting logs for the Azure Audit app from Event Hub

In this step, you configure a pipeline for shipping logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) to an Event Hub. 

1. To set up the logs collection in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
    
    When you configure the Event Hubs source, plan your source category to simplify querying. A hierarchical approach allows you to make use of wildcards. For example: `Azure/AzureActivity/Logs`.

2. Push logs from Azure Monitor to Event Hub.
    1. In the search bar, search and select **Activity Log**.
    1. In the **Activity Log** window, click **Export Activity Logs**.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/export-activity-log.png')} style={{border: '1px solid gray'}} alt="Activity log" width="800"/>
    1. Select the log type in **Category details** that you want to ingest.
    1. Select the **Stream to an event hub** checkbox and then select the following:
        * **Subscription**. Select a subscription.
        * **Event hub namespace**. Select the namespace.
        * **Event hub name (optional)**. Select the hub name.
        * **Event hub policy name**. Leave the default policy, **RootManageSharedAccessKey**, or select another as desired.
          <br/> <img src={useBaseUrl('img/integrations/microsoft-azure/diagnostic-setting-audit.png')} style={{border: '1px solid gray'}} alt="Diagnostic setting audit" width="800"/>
    1. Click **Save.**

## Installing the Azure Audit app

Now that you have set up collection from the Azure Activity Log (previously known as Azure Audit logs), install the Azure Audit app to use the preconfigured searches and dashboards that provide insight into your data.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Azure Audit dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

Use this dashboard to get a high-level view of Azure activity by location, along with event details.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureAudit/Overview.png')} alt="Overview" />

**Azure Activity by Source Location**. Performs a geo lookup to display the location of Azure activity by Source location on a world map for the last seven days.

**Events by Level**. Displays events by level in a pie chart for the last seven days.

**Events by Status**. Shows event details by status in a stacked column chart on a timeline for the last 7 days.

**Events by Caller**. Provides details on events by caller in a stacked column chart on a timeline for the last seven days.

**Events by Resource Group**. Displays event details by Resource Group in a stacked column chart on a timeline for the last 7 days.

**Events by Category**. Shows event details by category in a stacked column chart on a timeline for the last seven days.

### Resource Usage

Use this dashboard to view details on resource groups and resource providers.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureAudit/ResourceUsage.png')} alt="Resource Usage" />

**Events by Resource Group**. Displays event details by Resource Group over time in a stacked column chart on a timeline for the last 7 days.

**Resource Group Events**. Shows Resource Group events in a pie chart for the last seven days.

**Resource Provider Events**. Shows Resource Provider events in a pie chart for the last seven days.

**Operations by Resource Group**. Shows details on operations by Resource Group by name and count in a stacked column chart for the last seven days.

**Operations by Resource Provider**. Shows details on operations by Resource Provider by name and count for the last seven days.

**Resource Providers by Resource Group**. Displays details on Resource Providers by Resource Group by name and count in a stacked column chart for the last seven days.

**Events by Resource Provider**. Displays event details by Resource Provider over time in a stacked column chart on a timeline for the last seven days.

### Service Health

Use this dashboard to view details about Azure service health, including level, status, and events.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureAudit/ServiceHealth.png')} alt="Service Health" />

**Level**. Displays information by level in a pie chart for the last seven days.

**Status**. Shows status information as a pie chart for the last seven days.

**Events Details**. Provides information on Azure service health events in a table, including operation name, description, level, correlation ID, event name, location, status, and time for the last seven days.

**Events Over Time**. Displays events over time in a column chart on a timeline for the last seven days.

**Unresolved Events**. Provides information on unresolved service health events in a table chart, including details on correlation ID, level, event name, location, status, and time for the last 30 days.

### User Activity
Use this dashboard to see the details on events, resources, and users.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureAudit/UserActivity.png')} alt="User Activity" />

**Events by Location**. Performs a geo lookup to display user activity events by IP address location on a world map for the last 7 days.

**Resource Deletions**. Displays resource deletions in a pie chart for the last seven days.

**Resource Creations**. Provides a pie chart of resource creations for the last seven days.

**Top 10 Users**. Displays the top 10 users by name and event count in a bar chart for the last seven days.

**Resource Groups by Caller**. Shows Resource Groups by caller in a stacked bar chart by name and count for the last seven days.

**Events by User**. Provides details on events per user in an area chart on a timeline for the last seven days.

**Operations by User**. Displays operations by user in a stacked column chart by name and count for the last seven days.

## Create monitors for the Azure Audit app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Audit alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Azure Audit - Critical or Error Events Detected` | This alert is triggered when Azure Activity Log events with Critical or Error severity level are detected. These events indicate significant operational failures, resource provisioning errors, or service-level problems that require immediate investigation. | Count > 0 | Count < = 0 |
| `Azure Audit - Mass Resource Deletion` | This alert is triggered when a high volume of resource deletion operations are detected within a short time window. Mass deletions may indicate a compromised account being used to destroy infrastructure, ransomware activity, or an accidental bulk deletion event that requires immediate response. | Count > 0 | Count < = 0 |
| `Azure Audit - Service Health Incident` | This alert is triggered when Azure Service Health reports a Critical or Error-level incident. These events indicate active Azure platform issues such as service outages, degraded performance, or planned maintenance that may affect your workloads and require attention or mitigation. | Count > 0 | Count < = 0 |
| `Azure Audit - Network Security Group Rule Changed` | This alert is triggered when Network Security Group (NSG) rules are created, modified, or deleted. Unauthorized changes to NSG rules can expose resources to the internet, open sensitive ports, or weaken network segmentation, potentially leading to unauthorized access or data exfiltration. | Count > 0 | Count < = 0 |
| `Azure Audit - Policy Assignment Deleted` | This alert is triggered when an Azure Policy assignment is deleted. Policy assignments enforce compliance rules across resources. Deleting them may weaken the organization's security posture, allow non-compliant resource configurations, or indicate an attacker removing guardrails before making malicious changes. | Count > 0 | Count < = 0 |
| `Azure Audit - Resource Lock Removed` | This alert is triggered when a resource lock (`CanNotDelete` or `ReadOnly`) is removed from an Azure resource. Resource locks prevent accidental or malicious deletion of critical infrastructure. Their removal may be a precursor to unauthorized resource destruction or indicate a compromised privileged account. | Count > 0 | Count < = 0 |
| `Azure Audit - Excessive Failed Operations` | This alert is triggered when a high number of failed Azure operations are detected from a single user or IP address. A sudden spike in failures may indicate misconfigured automation, unauthorized access attempts, permission escalation probing, or a brute-force attack against Azure resource management APIs. | Count > 0 | Count < = 0 |
| `Azure Audit - Excessive Resource Creation` | This alert is triggered when a high volume of resource creation (WRITE) operations are detected from a single user or IP address. Excessive resource creation may indicate cryptomining deployment, unauthorized infrastructure provisioning, cost abuse, or a compromised service principal spinning up attacker-controlled resources. | Count > 0 | Count < = 0 |
| `Azure Audit - Key Vault Access Policy Changed` | This alert is triggered when Azure Key Vault access policies are modified. Key Vaults store secrets, certificates, and encryption keys. Unauthorized changes to access policies can grant attackers access to sensitive credentials, enable data decryption, or facilitate lateral movement across the environment. | Count > 0 | Count < = 0 |

## Upgrade/Downgrade the Azure Audit app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Audit app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
