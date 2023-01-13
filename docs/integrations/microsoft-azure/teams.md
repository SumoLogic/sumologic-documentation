---
id: teams
title: Sumo Logic App for Microsoft Teams
sidebar_label: Microsoft Teams
description: The Microsoft Teams app provides out-of-the-box dashboards to monitor users, teams, channels and permission changes.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/MSTeams.png')} alt="thumbnail icon" width="75"/>

The Microsoft Teams app provides out-of-the-box dashboards to monitor users, teams, channels and permission changes.


## Log Types  

The Teams app provides visibility into the logging that Microsoft exposes in the Office 365 Audit Logs for Microsoft Teams. Logged events are grouped into the following categories:

* User Sessions
* Teams
* Channels
* Users and Roles

For more information, see Microsoft’s [list of Teams Activities](https://docs.microsoft.com/en-us/microsoftteams/audit-log-events#teams-activities).


### Sample Log Message

```json
"CreationTime":"2020-10-30T14:00:51",
"Id":"e40689dc-7ea9-4f75-8fdd-8c3c9f9bf647",
"Operation":"TeamCreated",
"OrganizationId":"984e32e5-f98a-4600-aa32-27c3f948abe3",
"RecordType":25,
"UserKey":"d9d7d5ac-4d64-43df-8205-fa6f46388fcb",
"UserType":0,
"Version":1,
"Workload":"MicrosoftTeams",
"UserId":"email@domain.com",
"TeamGuid":"19:caac0ef5091e431aa45a6b6ec4a6723a@thread.tacv2",
"TeamName":"My Team"
```

### Sample Query
```sql
_sourceCategory="O365/General"
| json "Workload", "Operation" , "UserId" as workload, operation, email
| where workload = "MicrosoftTeams"
| count by operation
```

## Collecting Logs

This section has instructions for collecting logs for the Sumo App for Teams.

### Collection process overview

To collect logs for Microsoft Teams, please configure an Office 365 Audit Source. The Teams logs will be present in the “Office 365 General Logs” context. Note, that if you are already collecting logs for Office 365, you can simply make note of the source category configured for the aforementioned context.


## Installing the Microsoft Teams App   

This section has instructions for installing the Microsoft Teams app and descriptions of each of the app dashboards.

This section shows you how to install the Sumo Logic App for Microsoft Teams.

To install the app, do the following:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.

Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](/docs/get-started/apps-integrations#install-apps-from-the-library)

3. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Microsoft Teams Dashboards  

### Overview

The Teams - Overview dashboard provides an at-a-glance view of the state of your Teams environment in terms of user sessions, teams and channel activity, and user role changes

Use this dashboard to:
* Identify user sessions relative to their locations.
* Report the top users creating teams and channels.
* Identify the top team bots and channels connectors being used.
* Report on the top users and objects relative to role changes.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/MicrosoftTeams/Teams+-+Overview.png')} alt="Overview" />

### User Sessions

The Teams - User Sessions dashboard provides an in depth view of the user logins and related statistics in your Teams environment

Use this dashboard to:
* Identify user sessions relative to their locations and compare login statistics over time.
* Understand the client platforms and versions that are being used.
* Report on login IP addresses correlated to potential threats via Crowdstrike.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/MicrosoftTeams/Teams+-+User+Sessions.png')} alt="User Sessions" />

### Team Statistics

The Teams - Team Statistics dashboard offers complete details on the Team activity occurring in your organization.

Use this dashboard to:
* Gain insight into teams being added and removed.
* Understand the team setting changes.
* Keep track of the team Bots being installed.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/MicrosoftTeams/Teams+-+Team+Statistics.png')} alt="Team Statistics" />


### Channel Statistics

The Teams - Channel  Statistics dashboard offers complete visibility into the Channel activity occurring in your Teams.

Use this dashboard to:
* Gain insight into the channels being added and removed.
* Understand the channel settings being modified.
* Monitor channel tab activity.
* Monitor and report on channel connectors being added and removed.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/MicrosoftTeams/Teams+-+Channel+Statistics.png')} alt="Channel Statistics" />


### User and Role Changes

The Teams - User and Role Changes dashboard provides insight on the user and role changes being applied in your environment.

Use this dashboard to:
* Report on the users making role changes and the top object types being affected.
* Understand how members are being added, removed, and changed by object name.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/MicrosoftTeams/Teams+-+User+and+Role+Changes.png')} alt="User and Role Changes" />
