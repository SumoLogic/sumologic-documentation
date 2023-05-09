---
id: active-directory-azure
title: Azure Active Directory
sidebar_label: Azure Active Directory
description: The Sumo Logic App for Azure Active Directory presents information about activity in Azure Active Directory, including role management, user management, group management, directory management, and application management.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/ad.png')} alt="thumbnail icon" width="75"/>

Azure Active Directory is a cloud-based directory and identity management service that provides directory services, application access management, and identity protection. The Sumo Logic App for Azure helps you monitor activity in the Azure Active Directory. The dashboards provide insight into role management, user management, group management, successful and failed sign-in events, directory management, and application management data that helps you understand your users' experience.

* Azure Monitor collects logs for Azure Active Directory and streams the data to an Azure Event Hub.
* Event Hub streams the logs collected by Azure Monitor to an Azure function.
* The Azure function is a small piece of code that is triggered by Event Hub to send Azure Active Directory logs to the Sumo HTTP Source. The function also logs to one Storage Account and logs failover data to another.

<img src={useBaseUrl('img/integrations/microsoft-azure/CollectLogsforAzureAD.png')} alt="CollectLogsforAzureAD" />

## Prerequisites

* An Azure subscription must be associated (attached) to AAD. For more information, see this [Azure Active Directory documentation](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-subscriptions-associated-directory).
* To export Azure Activity logs to reports, be sure you have met the [Azure Active Directory requirements](https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/concept-activity-logs-azure-monitor).

## Log Types

The app uses the following log types:
* Audit and Sign-in logs

Only global administrators, security administrators, security readers, and report readers can view sign-ins and enable collection for Sign-in Events.

## Collecting Logs for Azure Active Directory

This section has instructions for setting up the ingestion pipeline from Azure Active Directory to Sumo Logic.

The sections below are either for FedRamp Sumo Logic deployments or if you have been advised by the Sumo Logic support team to not use the Cloud to Cloud Integration based on your Azure environments.

### Configure an HTTP Source

In this step, you configure an HTTP Source to receive logs from the Azure function.
1. Select a Hosted Collector where you want to configure the HTTP Source. If desired, create a new Hosted Collector, as described on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
2. Configure an HTTP source, as described on [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics).

### Configure Azure Resources using ARM template

In this step, you use a Sumo-provided Azure Resource Manager (ARM) template to create an Event Hub, an Azure function and two Storage Accounts. The Azure function is triggered by Event Hub. Two storage accounts are used to store log messages from the Azure function and failover data from Event Hub.

1. Download the [azuredeploy_logs.json](https://s3.amazonaws.com/appdev-cloudformation-templates/azuredeploy_logs.json) ARM template.
2. Go to **Template deployment** in the Azure Portal.
3. Click **Create**.
4. On the **Custom deployment** blade, click **Build your own template in the editor**.
5. Copy the contents of `azuredeploy_logs.json`, and paste it into the editor window.
6. Click **Save**.
7. Now you are back on the **Custom deployment** blade.
    1. Create a new Resource Group (recommended) or select an existing one.
    2. Choose Location.
    3. In the **Sumo Endpoint URL** field, enter the URL of the HTTP Source you configured in [Step 1](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-logs-azure-monitor#Step_1._Configure_an_HTTP_source).
    4. Agree to the terms and conditions.
    5. Click **Purchase**.
8. Verify the deployment was successful by looking at **Notifications** at the top right corner of Azure Portal.
9. **(Optional)** In the same window, you can click **Go to resource group** to verify all resources have been created successfully. You will see something like this:
10. Go to **Storage accounts** and search for “sumofailmsg”. Click on `sumofailmsg_<random-string>`.
11. Under **Blob Service**, click **Containers**, then click **+ Container**, enter the Name **azureaudit-failover**, and select **Private** for the **Public Access Level**. Click **OK**.

### Troubleshooting the log collection

If logs are not flowing into Sumo Logic, follow the steps in Troubleshooting log collection in the following [document](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-logs-azure-monitor#troubleshooting-log-collection).

## Installing the Azure Active Directory App

Now that you have set up collection for the Azure Active Directory, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

{@import ../../reuse/apps/app-install.md}

## Viewing Azure Active Directory Dashboards

### Overview

See an overview of Azure Active Directory activity, including operation names, audit event categories, log levels, and result types.<br/> <img src={useBaseUrl('img/integrations/microsoft-azure/azure-ad-overview.png')} alt="Azure Active Directory dashboards" />

- **Operation Name.** Shows the name of operations, and a count of how many times they happened on a bar chart.
- **Operation Name - One Day Time Comparison.** Shows an aggregation table with the names of operations along with a count, and compares it to the count of operations from one day before.
- **Log Level Breakdown.** Shows a breakdown of the level of logs on a pie chart.
- **Audit Event Category Breakdown.** Shows a breakdown of the category of audit events along with a count on a bar chart.
- **Audit Event Category - One Day Time Comparison.** Shows an aggregation table with the categories of audit events along with a count, and compares it to the count of categories from one day before.
- **ResultType Breakdown.** Shows a breakdown of the types of results (success or failure) on a pie charts.
- **Geo Location of Events.** Performs a geo lookup query and displays the location and number of events on a map of the world .
- **Category Breakdown.** Shows a breakdown of the categories on a pie chart.

### Role Management

See information about role management in Azure Activity Directory, including role updates, successful events, and users added or removed from roles.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-AD-Role-Management.png')} alt="Azure Active Directory dashboards" />

- **Operation Name.** Shows the name of role management operations, and a count of how many times they happened on a bar chart.
- **Operation Name - One Day Time Comparison.** Shows an aggregation table with the names of role management operations along with a count, and compares it to the count of operations from one day before.
- **Operation Name Over Time.** Shows a count of role management operations along with the name on a line chart.
- **Failed Events.** Shows an aggregation table of failed events with columns for the operation names, result types, result description identity, and count.
- **Successful Events.** Shows an aggregation table of successful events with columns for the operation names, result types, result description identity, target name, and target source name.
- **Breakdown by Results.** Shows a breakdown of the types of results (success or failure) on a pie chart.
- **Role Updates.** Shows an aggregation table of role updates with columns for the operation names, result types, result description identity, role name, target source name, and count.
- **Added/Removed User from Role.** Shows an aggregation table of users added or removed from a role with columns for the operation names, result types, result description identity, user name, and target source name.

### User Management

See information about user management in Azure Activity Directory, including external user invites, updated and deleted users, users added and outliers in user management events.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-AD-User-Management.png')} alt="Azure Active Directory dashboards" />

- **Operation Name.** Shows the name of user management operations, and a count of how many times they happened on a bar chart.
- **Operation Name - One Day Time Comparison.** Shows an aggregation table with the names of user management operations along with a count, and compares it to the count of operations from one day before.
- **Operation Name Over Time.** Shows a count of user management operations along with the name on a line chart.
- **Failed Events.** Shows an aggregation table of failed events with columns for the operation names, result types, result descriptions, identity, and count.
- **Successful Events.** Shows an aggregation table of successful events with columns for the operation names, identity, result types, and count.
- **Breakdown by Results.** Shows a breakdown of the types of results (success or failure) on a pie chart.
- **Invite External User.** Shows an aggregation table of successful events with columns for the time, operation names, result types, target source name, identity, result description, and count.
- **Add User.** Shows an aggregation table of added users with columns for the time, operation names, result types, target source name, identity, and count.
- **Updated User.** Shows an aggregation table of updated users with columns for the time, operation names, result types, target source name, identity, and count.
- **Deleted User.** Shows an aggregation table of deleted users with columns for the time, operation names, result types, target source name, identity, and count.
- **User Management Events - Outlier.** Shows outliers in user management events with count and thresholds on a line chart.

### Application Management

See information about application management in Azure Activity Directory, including application consent, deleted applications, applications added or updated, and service principal updates.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-ActiveDirectory-Application-Management.png')} alt="Azure Active Directory dashboards" />

- **Operation Name.** Shows the name of application management operations, and a count of how many times they happened on a bar chart.
- **Operation Name - One Day Time Comparison.** Shows an aggregation table with the names of application management operations along with a count, and compares it to the count of operations from one day before.
- **Operation Name Over Time.** Shows a count of application management operations along with the name on a line chart.
- **Failed Events.** Shows an aggregation table of failed events with columns for the operation names,  result types, result descriptions, identity, and count.
- **Successful Events.** Shows an aggregation table of successful events with columns for the operation names,  result types, result descriptions, identity, and count.
- **Breakdown by Results.** Shows a breakdown of the types of results (success or failure) on a pie chart.
- **Summary.** Shows an aggregation table of activity types with columns for the operation names, logged by service, level, result type, result reason, identity, target resource name, and frequency.

### Directory Management

See information about directory management in Azure Activity Directory, including failed events, successful events, and disables desktop SSOs.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure_Active_Directory-Directory_Management.png')} alt="Azure Active Directory dashboards" />

- **Operation Name.** Shows the name of directory management operations, and a count of how many times they happened on a bar chart.
- **Operation Name - One Day Time Comparison.** Shows an aggregation table with the names of directory management operations along with a count, and compares it to the count of operations from one day before.
- **Operation Name Over Time.** Shows a count of directory management operations along with the name on a line chart.
- **Failed Events.** Shows an aggregation table of failed events with columns for the operation names, result types, result descriptions, identity, and count.
- **Successful Events.** Shows an aggregation table of successful events with columns for the operation names, result types, result descriptions, identity, and count.
- **Breakdown by Results.** Shows a breakdown of the types of results (success or failure) on a pie chart.
- **Disable Desktop SSO.** Shows an aggregation table of disabled desktop SSOs with columns for the operation names, result types, result descriptions, identity, target source name, and count.

### Group Management

See information about group management in Azure Activity Directory, including groups added, and a list of members added or removed from groups.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-ActiveDirectory-Group-Management.png')} alt="Azure Active Directory dashboards" />

- **Operation Name.** Shows the name of group management operations, and a count of how many times they happened on a bar chart.
- **Operation Name - One Day Time Comparison.** Shows an aggregation table with the names of group management operations along with a count, and compares it to the count of operations from one day before.
- **Operations Over Time.** Shows a count of group management operations along with the name on a line chart.
- **Failed Events.** Shows an aggregation table of failed events with columns for the operation names,  result types, result descriptions, identity, and count.
- **Successful Events.** Shows an aggregation table of successful events with columns for the operation names,  result types, result descriptions, identity, and count.
- **Members Added/Removed.** Shows an aggregation table of successful events with columns for the time, operation names,  result types, target source name, identity, display name, and count.
- **Groups Added.** Shows an aggregation table of groups added with columns for the time, operation names, result types, target source name, identity, and count.
- **Breakdown by Results.** Shows a breakdown of the types of results (success or failure) on a pie chart.

### Authorization/Authentication/Other

See information about Authorization in Azure Active Directory including the name of authorization operations done, successful and failed authorization events, and breakdown of results.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Active-Directory-Authorization_Authentication_Other.png')} alt="Azure Active Directory dashboards" />

- **Operation Name.** Shows the name of authorizations or authentication, and a count of how many times they happened on a bar chart.
- **Operation Name - One Day Time Comparison.**  Shows an aggregation table with the names of authorizations or authentication along with a count, and compares it to the count of operations from one day before.
- **Operations Over Time.** Shows a count of authorizations or authentication along with the name on a line chart.
- **Successful Events.** Shows an aggregation table of successful events with columns for the operation names,  result types, result descriptions, target source name, identity, and count.
- **Failed Events.** Shows an aggregation table of failed events with columns for the operation names,  result types, result descriptions, identity, target source name, and count.
- **Breakdown by Results.** Shows a breakdown of the types of results (success or failure) on a pie chart.

### Successful Sign-In Events

See information about successful sign-in events in your Azure AD, including the geo-location of sign-in activity, risky sign-ins, breakdown by browser & application, and any anomalies in the login count.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/azure-ad-successful-sign-in-events.png')} alt="Azure Active Directory dashboards" />

- **Geo Location of Sign-in.** Performs a geo lookup query and displays the location and number of successful sign-in events on a map of the world.
- **Sign-In by User - One Day Time Comparison.** Shows an aggregation table with the names of users with successful sign-in events along with a count, and compares it to the count of operations from one day before.
- **Breakdown by OS.** Shows breakdown of the operating system that is the source of sign-in events.
- **Risky Sign In.** Shows risky successful sign-in events.
- **Top 10 Active Users.** Shows top 10 active users with successful sign-ins.
- **Break Down by Browser.** Shows breakdown of the browser that is the source of sign-in events.
- **Sign In by User Over Time.** Shows trend of successful sign-in events over time.
- **Breakdown by Country, State, City.** Shows breakdown by country, state, and city.
- **Sign in by Application.** Shows successful sign-in events by Application.
- **Anomaly in Total Login Count.** Shows any Anomaly in the total successful login count.

### Failure Sign-in Events

See information about failure sign-in events in your Azure AD, including the geo-location of sign-in activity, risky sign-ins, breakdown by browser & application, and any anomalies in the login count.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/azure-ad-failure-sign-in-event.png')} alt="Azure Active Directory dashboards" />

- **Geo Location of Sign-in.** Performs a geo lookup query and displays the location and number of failure sign-in events on a map of the world.
- **Sign-In by User - One Day Time Comparison.** Shows an aggregation table with the names of users with failed sign-in events along with a count, and compares it to the count of operations from one day before.
- **Breakdown by OS.** Shows breakdown of the operating system that is the source of sign-in events.
- **Failure Sign In Table.** Shows an aggregation table of failure sign-in events with columns for the date time, identity,  error code, description, IP address, state, city, country, and source application name with the count.
- **Risky Sign In.** Shows risky failure sign-in events.
- **Top 10 Active Users.** Shows top 10 active users with failure sign-in events.
- **Break Down by Browser.** Shows breakdown of the browser that is the source of sign-in events.
- **Sign In by User Over Time.** Shows trend of failure sign-in events over time.
- **Sign-Ins Breakdown by Country, State, City.** Shows breakdown by country, state, and city.
- **Sign in by Application.** Shows failure sign-in events by Application.
- **Anomaly in Total Login Count.** Shows any Anomaly in the total failure login count.
