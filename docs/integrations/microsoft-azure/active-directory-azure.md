---
id: active-directory-azure
title: Azure Active Directory
sidebar_label: Azure Active Directory
description: The Sumo Logic app for Azure Active Directory provides insight into your Azure Active Directory activity, including management of roles, users, groups, directories, and applications.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/ad.png')} alt="thumbnail icon" width="40"/>

Azure Active Directory is a cloud-based directory and identity management service that provides directory services, application access management, and identity protection. The Sumo Logic app for Azure helps you to monitor activity in the Azure Active Directory. These dashboards provide insight into role management, user management, group management, successful and failed sign-in events, directory management, and application management data that helps you understand your users' experience.

## Log types

The app uses the following log types:

* [Audit and Sign-in logs](https://docs.microsoft.com/en-us/azure/active-directory/reporting-azure-monitor-diagnostics-overview#supported-reports)

Only global administrators, security administrators, security readers, and report readers can view sign-ins and enable collection for Sign-in Events.

The Sumo Logic app for Azure Active Directory presents information about activity in Azure Active Directory, including role management, user management, group management, directory management, and application management.

## Collect Logs for the Azure Active Directory app

Sumo Logic supports several methods for collecting logs from Event Hub. You can choose any of them to collect logs.

- [Azure Event Hubs Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/) (Recommended) 
- Perform Steps 1 and Step 2 of [Collect Logs from Azure Monitor using Azure Functions](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-logs-azure-monitor/#configure-log-collection)

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/AAD/Logs`.

### Prerequisites

* An Azure subscription must be associated (attached) to AAD. For more information, see this [Azure Active Directory documentation](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-subscriptions-associated-directory).
* To export Azure Activity logs to reports, be sure you have met the [Azure Active Directory requirements](https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/concept-activity-logs-azure-monitor).


### Export Azure Active Directory logs to Event Hub

In this task, you export logs for your Azure Active Directory app. For related information see [Send Logs to Azure Monitor](https://learn.microsoft.com/en-us/azure/active-directory/reports-monitoring/howto-integrate-activity-logs-with-log-analytics#send-logs-to-azure-monitor) in the Azure help documentation.

While exporting logs for an Azure Active Directory app, do the following:
* **Event hub namespace.** If you have chosen Method 1 (Azure Event Hubs Source) for collecting logs, select the **EventHubNamespace** created manually, or else if you have chosen Method 2 (Collect logs from Azure monitor using Azure functions), then select `SumoAzureLogsNamespace<UniqueSuffix>` namespace created by the ARM template.
* **Event hub name (optional).** If you have chosen Method 1 (Azure Event Hub Source) for collecting logs, select the event hub name, which you created manually, or if you have chosen Method 2 (Collect logs from Azure monitor using Azure functions), then select **insights-operational-logs**.
<br/> <img src={useBaseUrl('img/integrations/microsoft-azure/diagnostic-setting.png')} style={{border: '1px solid black'}} alt="diagnostic-setting" width="800"/>

## Install the Azure Active Directory app

Now that you have set up collection for the Azure Active Directory, install the Sumo Logic app to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

{@import ../../reuse/apps/app-install.md}

## Viewing Azure Active Directory Dashboards

### Overview

See an overview of Azure Active Directory activity, including operation names, audit event categories, log levels, and result types.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Overview.png')} alt="Azure-Active-Directory-Overview" />

**Operation Name.** Shows the name of operations, and a count of how many times they happened on a bar chart, for the last 24 hours.

**Operation Name - One Day Time Comparison.** Shows an aggregation table with the names of operations that have happened in the last 24 hours along with a count, and compares it to the count of operations from one day before.

**Log Level Breakdown.** Shows a breakdown of the level of logs on a pie chart for the last 24 hours.

**Audit Event Category Breakdown.** Shows a breakdown of the category of audit events along with a count on a bar chart for the last 24 hours.

**Audit Event Category - One Day Time Comparison.** Shows an aggregation table with the categories of audit events in the last 24 hours along with a count, and compares it to the count of categories from one day before.

**ResultType Breakdown.** Shows a breakdown of the types of results (success or failure) on a pie chart, for the last 24 hours.

**Geo Location of Events.** Performs a geo lookup query and displays the location and number of events on a map of the world for the last 24 hours.

**Category Breakdown.** Shows a breakdown of the categories on a pie chart for the last 24 hours.

### Role Management

See information about role management in Azure Activity Directory, including role updates, successful events, and users added or removed from roles.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Role-Management.png')} alt="Azure-Active-Directory-Role-Management" />

**Operation Name.** Shows the name of role management operations, and a count of how many times they happened on a bar chart, for the last 24 hours.

**Operation Name - One Day Time Comparison.** Shows an aggregation table with the names of role management operations that have happened in the last 24 hours along with a count, and compares it to the count of operations from one day before.

**Operation Name Over Time.** Shows a count of role management operations along with the name on a line chart for the last 24 hours.

**Failed Events.** Shows an aggregation table of failed events with columns for the operation names, result types, result description identity, and count for the last 24 hours.

**Successful Events.** Shows an aggregation table of successful events with columns for the operation names, result types, result description identity, target name, and target source name for the last 24 hours.

**Breakdown by Results.** Shows a breakdown of the types of results (success or failure) on a pie chart, for the last 24 hours.

**Role Updates.** Shows an aggregation table of role updates with columns for the operation names, result types, result description identity, role name, target source name, and count for the last 24 hours.

**Added/Removed User from Role.** Shows an aggregation table of users added or removed from a role with columns for the operation names, result types, result description identity, user name, and target source name for the last 24 hours.

### User Management

See information about user management in Azure Activity Directory, including external user invites, updated and deleted users, users added and outliers in user management events.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-User-Management.png')} alt="Azure-Active-Directory-User-Management" />

**Operation Name.** Shows the name of user management operations, and a count of how many times they happened on a bar chart, for the last 24 hours.

**Operation Name - One Day Time Comparison.** Shows an aggregation table with the names of user management operations that have happened in the last 24 hours along with a count, and compares it to the count of operations from one day before.

**Operation Name Over Time.** Shows a count of user management operations along with the name on a line chart for the last 24 hours.

**Failed Events.** Shows an aggregation table of failed events with columns for the operation names,  result types, result descriptions, identity, and count for the last 24 hours.

**Successful Events.** Shows an aggregation table of successful events with columns for the operation names, identity, result types, and count for the last 24 hours.

**Breakdown by Results.** Shows a breakdown of the types of results (success or failure) on a pie chart, for the last 24 hours.

**Invite External User.** Shows an aggregation table of successful events with columns for the time, operation names, result types, target source name, identity, result description, and count for the last 24 hours.

**Add User.** Shows an aggregation table of added users with columns for the time, operation names, result types, target source name, identity, and count for the last 24 hours.

**Updated User.** Shows an aggregation table of updated users with columns for the time, operation names, result types, target source name, identity, and count for the last 24 hours.

**Deleted User.** Shows an aggregation table of deleted users with columns for the time, operation names, result types, target source name, identity, and count for the last 24 hours.

**User Management Events - Outlier.** Shows outliers in user management events with count and thresholds on a line chart, for the last 24 hours.

### Application Management

See information about application management in Azure Activity Directory, including application consent, deleted applications, applications added or updated, and service principal updates.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Application-Management.png')} alt="Azure-Active-Directory-Application-Management" />

**Operation Name.** Shows the name of application management operations, and a count of how many times they happened on a bar chart, for the last 24 hours.

**Operation Name - One Day Time Comparison.** Shows an aggregation table with the names of application management operations that have happened in the last 24 hours along with a count, and compares it to the count of operations from one day before.

**Operation Name Over Time.** Shows a count of application management operations along with the name on a line chart for the last 24 hours.

**Failed Events.** Shows an aggregation table of failed events with columns for the operation names,  result types, result descriptions, identity, and count for the last 24 hours.

**Successful Events.** Shows an aggregation table of successful events with columns for the operation names,  result types, result descriptions, identity, and count for the last 24 hours.

**Breakdown by Results.** Shows a breakdown of the types of results (success or failure) on a pie chart, for the last 24 hours.

**Application Management Events - Outlier.** Shows outliers in application management events with count and thresholds on a line chart, for the last 24 hours.

**Deleted Applications.** Shows an aggregation table of deleted applications with columns for the operation names, result types, result descriptions, identity, target source name, and count for the last 24 hours.

**Service Principal Updates.** Shows an aggregation table of service principal updates with columns for the operation names, result types, result descriptions, identity, target source name, and count for the last 24 hours.

**Consent Given to Application.** Shows an aggregation table of consent given to applications with columns for the operation names,result types, result descriptions, identity, target source name, and count for the last 24 hours.

**Applications Added or Updated.** Shows an aggregation table of applications added or updated with columns for the operation names, result types, result descriptions, identity, target source name, and count for the last 24 hours.

### Directory Management

See information about directory management in Azure Activity Directory, including failed events, successful events, and disables desktop SSOs.** Operation Name.** Shows the name of directory management operations, and a count of how many times they happened on a bar chart, for the last 24 hours.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Directory-Management.png')} alt="Azure-Active-Directory-Directory-Management" />

**Operation Name - One Day Time Comparison.** Shows an aggregation table with the names of directory management operations that have happened in the last 24 hours along with a count, and compares it to the count of operations from one day before.

**Operation Name Over Time.** Shows a count of directory management operations along with the name on a line chart for the last 24 hours.

**Failed Events.** Shows an aggregation table of failed events with columns for the operation names,  result types, result descriptions, identity, and count for the last 24 hours.

**Successful Events.** Shows an aggregation table of successful events with columns for the operation names, result types, result descriptions, identity, and count for the last 24 hours.

**Breakdown by Results.** Shows a breakdown of the types of results (success or failure) on a pie chart, for the last 24 hours.

**Disable Desktop SSO.** Shows an aggregation table of disabled desktop SSOs with columns for the operation names, result types, result descriptions, identity, target source name, and count for the last 24 hours.

### Group Management

See information about group management in Azure Activity Directory, including groups added, and a list of members added or removed from groups.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Group-Management.png')} alt="Azure-Active-Directory-Group-Management" />

**Operation Name.** Shows the name of group management operations, and a count of how many times they happened on a bar chart, for the last 24 hours.

**Operation Name - One Day Time Comparison.** Shows an aggregation table with the names of group management operations that have happened in the last 24 hours along with a count, and compares it to the count of operations from one day before.

**Operations Over Time.**  Shows a count of group management operations along with the name on a line chart for the last 24 hours.

**Failed Events.** Shows an aggregation table of failed events with columns for the operation names,  result types, result descriptions, identity, and count for the last 24 hours.

**Successful Events.** Shows an aggregation table of successful events with columns for the operation names,  result types, result descriptions, identity, and count for the last 24 hours.

**Members Added/Removed.** Shows an aggregation table of successful events with columns for the time, operation names,  result types, target source name, identity, display name, and count for the last 24 hours.

**Groups Added.** Shows an aggregation table of groups added with columns for the time, operation names, result types, target source name, identity, and count for the last 24 hours.

**Breakdown by Results.** Shows a breakdown of the types of results (success or failure) on a pie chart, for the last 24 hours.

### Authorization/Authentication/Other

See information about Authorization in Azure Active Directory including the name of authorization operations done, successful and failed authorization events, and breakdown of results.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Authorization-Authentication-Other.png')} alt="Azure-Active-Directory-Authorization-Authentication-Othe" />

**Operation Name.** Shows the name of authorizations or authentication, and a count of how many times they happened on a bar chart, for the last 24 hours.

**Operation Name - One Day Time Comparison.**  Shows an aggregation table with the names of authorizations or authentication that have happened in the last 24 hours along with a count, and compares it to the count of operations from one day before.

**Operations Over Time.** Shows a count of authorizations or authentication along with the name on a line chart for the last 24 hours.

**Successful Events.** Shows an aggregation table of successful events with columns for the operation names,  result types, result descriptions, target source name, identity, and count for the last 24 hours.

**Failed Events.** Shows an aggregation table of failed events with columns for the operation names,  result types, result descriptions, identity, target source name, and count for the last 24 hours.

**Breakdown by Results.** Shows a breakdown of the types of results (success or failure) on a pie chart, for the last 24 hours.

### Successful Sign-In Events

See information about successful sign-in events in your Azure AD, including the geo-location of sign-in activity, risky sign-ins, breakdown by browser & application, and any anomalies in the login count.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Successful-Sign-In-Events.png')} alt="Azure-Active-Directory-Successful-Sign-In-Events" />

**Geo Location of Sign-in.** Performs a geo lookup query and displays the location and number of successful sign-in events on a map of the world for the last 24 hours.

**Sign-In by User - One Day Time Comparison.** Shows an aggregation table with the names of users with successful sign-in events in the last 24 hours along with a count, and compares it to the count of operations from one day before.

**Breakdown by OS.** Shows breakdown of the operating system that is the source of sign-in events.

**Risky Sign In.** Shows risky successful sign-in events.

**Top 10 Active Users.** Shows top 10 active users with successful sign-ins.

**Break Down by Browser.** Shows breakdown of the browser that is the source of sign-in events.

**Sign In by User Over Time.** Shows trend of successful sign-in events over time.

**Breakdown by Country, State, City.** Shows breakdown by country, state, and city.

**Sign in by Application.** Shows successful sign-in events by Application.

**Anomaly in Total Login Count.** Shows any Anomaly in the total successful login count over 7 days.

### Failure Sign-in Events

See information about failure sign-in events in your Azure AD, including the geo-location of sign-in activity, risky sign-ins, breakdown by browser & application, and any anomalies in the login count.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-Active-Directory/Azure-Active-Directory-Failure-Sign-In-Events.png')} alt="Azure-Active-Directory-Failure-Sign-In-Events" />

**Geo Location of Sign-in.** Performs a geo lookup query and displays the location and number of failure sign-in events on a map of the world for the last 24 hours.

**Sign-In by User - One Day Time Comparison.** Shows an aggregation table with the names of users with failed sign-in events in the last 24 hours along with a count, and compares it to the count of operations from one day before.

**Breakdown by OS.** Shows breakdown of the operating system that is the source of sign-in events.

**Failure Sign In Table.** Shows an aggregation table of failure sign-in events with columns for the date time, identity,  error code, description, IP address, state, city, country, and source application name with the count for the last 24 hours.

**Risky Sign In.** Shows risky failure sign-in events.

**Top 10 Active Users.** Shows top 10 active users with failure sign-in events.

**Break Down by Browser.** Shows breakdown of the browser that is the source of sign-in events.

**Sign In by User Over Time.** Shows trend of failure sign-in events over time.

**Breakdown by Country, State, City.** Shows breakdown by country, state, and city.

**Sign in by Application.** Shows failure sign-in events by Application.

**Anomaly in Total Login Count.** Shows any Anomaly in the total failure login count over 7 days.