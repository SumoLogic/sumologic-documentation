---
id: office-365
title: Microsoft Office 365
sidebar_label: Microsoft Office Audit 365
description: The Sumo Logic App for Microsoft Office 365 ingests Microsoft Office 365 Audit logs for Azure Active Directory, Exchange, and SharePoint.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/365.png')} alt="thumbnail icon" width="75"/>

The Microsoft Office 365 App ingests Microsoft Office 365 Audit logs for Azure Active Directory, Exchange, and SharePoint. Preconfigured Dashboards allow you to monitor and analyze your complete Office 365 system for administrator and user activity.

## Log Types

For information on Microsoft APIs and message types, see Microsoft Office 365 Audit Source.

### Sample Log Messages

```json
{  
   "ClientIP":"62.68.137.155",
   "CreationTime":"2017-09-25T22:42:35",
   "Id":"9605876a-1c37-4337-ecbc-08d2409e6e9a",
   "Operation":"FileCopied",
   "OrganizationId":"fa0f55b5-3dac-425b-8e00-c58e5889499c",
   "RecordType":6,
   "UserKey":"i:0h.f|membership|10890000801fe866@live.com",
   "UserType":4,
   "Workload":"SharePoint",
   "ObjectId":"partner.acme.com/shared documents/foo/PurchaseOrder.xls",
   "UserId":"samir@acme.sharepoint.net",
   "EventSource":"SharePoint",
   "ItemType":"Folder",
   "Site":"7520eb33-0a76-4dfc-a56e-a835bb541aa0",
   "UserAgent":"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; InfoPath.3)",
   "DestinationFileName":"PurchaseOrder.xls",
   "DestinationRelativeUrl":"/my library/",
   "SiteUrl":"partner.acme.com",
   "SourceFileExtension":".xls",
   "SourceFileName":"PurchaseOrder.xls",
   "SourceRelativeUrl":"/shared documents/foo"
}
```

```
{  
   "CreationTime":"2017-09-25T22:37:35",
   "Id":"0df04c72-d3e1-4016-70ab-09f3333de0ca",
   "Operation":"FolderBind",
   "OrganizationId":"fa0f27b5-3dac-425b-8e00-c58e5889499c",
   "RecordType":2,
   "ResultStatus":"Succeeded",
   "UserKey":"10037FFE8EDD1D69",
   "UserType":2,
   "Workload":"Exchange",
   "UserId":"",
   "ClientIPAddress":"146.139.54.184",
   "ClientInfoString":"Client=WebServices;10.5.2.0ES10;",
   "ExternalAccess":false,
   "InternalLogonType":0,
   "LogonType":1,
   "LogonUserSid":"S-1-5-21-802669544-745651041-3938370137-2862061",
   "MailboxGuid":"6f541602-34c4-4846-9d98-40ce28ff6dc2",
   "MailboxOwnerSid":"S-1-5-21-802669544-745651041-3938370137-2707171",
   "MailboxOwnerUPN":"john@acme.com",
   "OrganizationName":"ACME.com",
   "OriginatingServer":"BLUPR02MB327 (15.02.0396.020)\r\n",
   "Item":{  
      "Id":"LgCDEFCvDwkeofbHT4Xu0aodZZIMAQBaMVsTsKq8RIhghXhDomkECDEFAAEUBCEB",
      "ParentFolder":{  
         "Id":"LgCDEFCvDwkeofbHT4Xu0aodZZIMAQBaMVsTsKq8RIhghXhDomkECDEFAAEUBCEB",
         "Path":"\\Recoverable Items\\Deletions"
      }
  }
```

### Sample Queries

```sql title="SharePoint Operations"
_sourceCategory=O365* CreationTime Workload ("\"Workload\":\"SharePoint\"" or "\"Workload\":\"OneDrive\"")
| json "Operation", "Workload"
| where Workload in ("SharePoint", "OneDrive")
| timeslice by 1h
| count _timeslice, operation
| transpose row _timeslice column operation
```

```sql title="Failed Activity by Workload"
_sourceCategory=O365* Workload Operation "ResultStatus" fail*
| json "Workload", "ResultStatus", "Operation"
| where resultstatus matches "*fail*" or resultstatus matches "*Fail*"
| timeslice 1h
| count _timeslice, workload
| transpose row _timeslice column workload
```

## Collecting Logs for the Office 365 App

This section provides instructions for configuring log collection for the Microsoft Office 365 App, as well as providing sample log messages and queries.

To collect logs for the Microsoft Office 365 App, do the following:

1. One [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
2. One [Microsoft Office 365 Audit Source](/docs/send-data/hosted-collectors/ms-office-audit-source.md) for each content type you want to collect logs for. For example:
    * Office 365 Azure AD logs
    * Office 365 Exchange logs
    * Office 365 SharePoint logs
    * Office 365 General logs
    * Office 365 Data Loss Prevention (DLP) event logs

For complete details, see [Microsoft Office 365 Audit Source](/docs/send-data/hosted-collectors/ms-office-audit-source.md).

We recommend the following Source Category naming convention:
* **Azure AD:** O365/Azure
* **Exchange: **O365/Exchange
* **SharePoint: **O365/SharePoint
* **General:** O365/SharePoint
* **DLP**: O365/DLP


## Installing the Microsoft Office 365 App

Now that you have configured Office 365, install the Sumo Logic App for Microsoft Office 365 to take advantage of the preconfigured searches and dashboards to analyze your data.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**

1. From the **App Catalog**, search for and select the app.
2. Select the version of the service you're using and click **Add to Library**. Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library](/docs/get-started/apps-integrations#install-apps-from-the-library).
3. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app.
    2. **Data Source.** Choose **Enter a Custom Data Filter**, and enter `_sourceCategory=O365/*`
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

To see your data in the panels of Office 365 - SharePoint - Shared Content Non-Domain Activities dashboard, open the queries of each panel.

Add your domain in all the queries in the highlighted section as shown below. Click **Update Dashboard** to save the queries. You will now see your data in the Panels.


## Viewing Office 365 Dashboards

The Sumo Logic App for Microsoft Office 365 provides insights for Azure Active Directory, Exchange, and SharePoint. The pre-configured dashboards allow you to monitor the failures, successes, and other operations in Office 365 system.


### Overview

Shows details of Office 365 successful and failed activities, and SharePoint, Exchange, and Azure operations.

<img src={useBaseUrl('img/integrations/microsoft-azure/Office365Overview.png')} alt="Microsoft Office 365 dashboards" />

**Successful Activity by Workload. **Compare your overall Office 365 workload activity by service as an area chart on a timeline for the last 24 hours.

**Failed Activity by Workload. **See any failed activity by Office 365 workload as a column chart on a timeline for the last three days.

**SharePoint Operations. **See the number of all SharePoint operations by name  as a line chart for the last 24 hours.

**Exchange Operations. **See the Exchange operations activity by name and count on a stacked bar chart for the last 24 hours.

**Azure AD Operations Trends. **See the Azure AD operations activity by action and count as a stacked column chart on a timeline for the last 24 hours.


### General

#### Usage by Location

Shows Office 365, Azure Active Directory, Exchange, Share Point and One Drive transactions by location.

<img src={useBaseUrl('img/integrations/microsoft-azure/Office365-UsageByLocation.png')} alt="Microsoft Office 365 dashboards" />

**Office 365 Transaction by Client Location**. Performs a geo lookup operation and displays Office 365 transactions by client location on a map of the world for the last 30 days.

**Azure AD Transactions by Client Location**. Performs a geo lookup operation and provides Azure AD transactions by client location on a map of the world for the last 30 days.

**SP and OD Transactions by Client Location**. Performs a geo lookup operation and shows SharePoint and OneDrive transactions by client location on a map of the world for the last 30 days.

**Exchange Transactions by Client Location**. Performs a geo lookup operation and displays Exchange transactions by client location on a map of the world for the last 30 days.


### Azure Active Directory


#### Active Directory - Login Locations

Shows the failed and successful logins by location.

<img src={useBaseUrl('img/integrations/microsoft-azure/Office365-ActiveDirectory-LoginLocations.png')} alt="Microsoft Office 365 dashboards" />

**Failed Logins from US.** See the map of US having the failed logins in the last 24 hours.

**Failed Logins Outside the US.** See the world map having the failed logins in the last 24 hours.

**Successful Logins from US.** See the map of US having the successful logins in the last 24 hours.

**Successful Logins Outside the US.** See the world map having the successful logins in the last 24 hours.


#### Active Directory - Login Monitoring

Shows details such as count, client IP, and errors of the failed and successful logins.

<img src={useBaseUrl('img/integrations/microsoft-azure/Office365-ActiveDirectory-LoginMonitoringSuccessfulLogins.png')} alt="Microsoft Office 365 dashboards" />

**Successful Logins.** See the count of successful logins in the last 6 hours.

**Successful Logins**. See a table having the details of successful logins such as time, operation, object ID, User ID, Client IP and event count in the last 6 hours.

**Successful Logins by ClientIP**. See a bar chart with the successful logins by Client IP and count in the last 6 hours.

**Successful Logins by Operation**. See a pie chart with the operations that resulted in successful logins in the last 6 hours.

**Logins Attempts from Multiple ClientIPs (within 15m)**. See a table with details of login attempts from multiple Client IPs within 15 minutes such as the object ID, user ID, time, and count of unique client IPs.


#### Failed Logins

<img src={useBaseUrl('img/integrations/microsoft-azure/Office-365-ActiveDirectory-LoginMonitoringFailedLogins.png')} alt="Microsoft Office 365 dashboards" />

**Login Failures.** See the count of login failures in the last 24 hours.

**Login Failures.** See a table having the details of login failures such as time, operation, object ID, User ID, Client IP and event count in the  last 24 hours.

**Login Failures by ClientIP.** See a bar chart with the login failures by Client IP and count in the last 24 hours.

**Login Failures by User - Trend.** See a stacked bar chart with the count of login failures per user every hour over the last 24 hours.

**Login Failures by Operation.** See a pie chart with the operations that caused login failures in the last 24 hours.

**Login Failures by Error.** See a bar chart with the errors for login failures in the last 24 hours with count.

**Login Failure Outlier.** See a line chart with the login failure count for every hour over the last 7 days along with the threshold values.


### Active Directory - User, Account Monitoring

Shows details of Added and Deleted Users, Password Resets and Changes, and Added or Removed Members from Group.

<img src={useBaseUrl('img/integrations/microsoft-azure/Office365-ActiveDirectory-User,AccountMonitoring.png')} alt="Microsoft Office 365 dashboards" />

**Added and Deleted Users.** See a table with details of added and deleted users in the last 7 days such as time, operation, object ID, and status.

**Added and Deleted Users - Trend.** See a stacked column chart of the count of the delete and add user operations along with their success/failure statuses over the last 7 days.

**Password Resets and Changes**. See a table of the password change and password reset operations along with the time, object ID, and status, for the last 7 days.

**Password Resets and Changes - Trend**. See a stacked column chart of the count of the password reset and change operations along with their success/failure statuses over the last 7 days.

**Added or Removed Members from Group**. See a table with the details of member addition and removal from a group such as the time, object ID, user ID, group name, status, and event count, for the last 7 days.


#### Active Directory Activity

Shows details such as admin activity, transaction by client location, operations, client IPs, and failed activity over time.

<img src={useBaseUrl('img/integrations/microsoft-azure/Office365-ActiveDirectoryActivity.png')} alt="Microsoft Office 365 dashboards" />

**Top Users by AAD Admin Activity**. See the top users by Azure AD administrator activity in a table chart including details on the user ID and the count for the last 24 hours.

**AD Transactions by Client Location**. Uses a geo lookup operation to display AD transactions by client location on a map of the world for the last 24 hours.

**AD Operations**. See the AD operations activities by name and count as a line chart on a timeline for the last 24 hours.

**Top Client IPs**. See the details on the top client IP address in a stacked column chart on a timeline for the last 24 hours.

**Failed Activity Over Time**. See the failed activities in an area chart on a timeline for the last 24 hours.


### Exchange

#### Exchange - Admin Audit

Shows details of operations, user types, and configuration changes in Exchange.

<img src={useBaseUrl('img/integrations/microsoft-azure/Office365-Exchange-AdminAudit.png')} alt="Microsoft Office 365 dashboards" />

**Top 10 Operations**. See the top 10 operations in a table chart including details on operation and frequency for the last 14 days.

**Top 10 Active Users**. See the top 10 active users in a table chart including details on user ID and frequency for the last 14 days.

**User Types**. See the information on user types in a table chart including details on user type and frequency for the last 14 days.

**Users Making Configuration Changes**. See all users making configuration changes in a table chart including details on user ID and frequency for the last 14 days.

**Configuration Changes by External Access**. See a table with the details of the configuration changes that were made using external access such as the user ID, object ID, originating server, operation, name, value, and frequency for the last 14 days.

**Recent Parameter Changes**. See the details on recent parameter changes in a table chart including information on the name and frequency for the last 14 days.

**Configuration Changes (All)**. See the details on all configuration changes in a table chart, including information on user ID, object ID, originating server, operation, name, value, and frequency for the last 14 days.


#### Exchange - Group Audit

Shows the active users, operations, folders and recent activities.

<img src={useBaseUrl('img/integrations/microsoft-azure/Office365-Exchange-GroupAudit.png')} alt="Microsoft Office 365 dashboards" />

**Top 10 Operations.** See the top 10 operations by name and frequency in a column chart for the last six hours.

**Top 10 Active Users**. See the top 10 active users by user ID and frequency in a column chart for the last six hours.

**Top 10 Clients**. See the details on the top 10 clients by name and frequency in a bar chart for the last six hours.

**Folders**. See the folders accessed in a pie chart for the last six hours.

**Recent Activities (All)**. See all recent activity in a table chart including details on time, user ID, client IP address, originating server, operation, client process name, client version, and logon type for the last six hours.

**Logon Types**. See information on logon types in a pie chart for the last six hours.

**Recent Activities (External Access)**. See a table of details of recent activities through external access such as time, user ID, client IP, originating server, operation, client process name, client version, and logon type.


### Exchange - Mailbox Audit

Shows the details of users, operations, IPs, client, logon types, and external access.

<img src={useBaseUrl('img/integrations/microsoft-azure/Office365-Exchange-MailboxAudit.png')} alt="Microsoft Office 365 dashboards" />

**Top 10 Operations.** See the top 10 operations by operation name and frequency in a bar chart for the last 24 hours.

**Top 10 IPs**. See the top 10 IP addresses by IP and frequency in a bar chart for the last 24 hours.

**Top 10 Users**. See the details on the top 10 users by user ID and frequency in a bar chart for the last 24 hours.

**Top 10 Clients**. See the top 10 clients accessed in a table chart including details on the client process name, client version, and frequency for the last 24 hours.

**Top 10 Email Client Used**. See information on the top 10 email clients used in a table chart including details on email client, version, and frequency for the last 24 hours.

**Logon Types**. See logon types in a pie chart for the last 24 hours.

**External Access**. See a table with details on external access such as client IP address, originating server, Organization name, Mailbox owner UPN, logon type, user type, user ID, and operation.


### Exchange - Mailbox Audit - Client Locations

Shows the clients by locations and over time.

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/MicrosoftOffice365/Office365-Exchange-MailboxAudit-ClientLocations.png')} alt="Exchange - Mailbox Audit - Client Locations" />

**Worldwide Clients**. Performs a geo lookup operation to display worldwide client IP address locations on a map of the world for the last 24 hours.

**United States Clients**. Performs a geo lookup operation to display United States client IP address locations on a map of the world for the last 24 hours.

**Clients by Country Over Time**. See clients by country in a stacked column chart on a timeline for the last 24 hours.

**Clients by State Over Time**. See clients by state in a stacked column chart on a timeline for the last 24 hours.


### SharePoint

#### SharePoint - Content Insight

Shows details of URLs accessed, downloaded, uploaded, viewed, checked in, and checked out content.

<img src={useBaseUrl('img/integrations/microsoft-azure/Office365-SharePoint-ContentInsight.png')} alt="Microsoft Office 365 dashboards" />

**Top 10 SiteUrl Accessed**. See the top 10 SiteUrls accessed in a table chart including details on siteurl and count for the last 24 hours.

**Top SharePoint Resources**. See the top SharePoint resources accessed in a table chart including details on the source relative URL, source file name, and count for the last 24 hours.

**File Type Accessed**. See details on the file type accessed in a table chart including details on the file type and count for the last 24 hours.

**Most Downloaded Contents**. See the most downloaded content in a table chart including details on the source relative URL, source file name, and frequency for the last 24 hours.  

**Recently Uploaded Contents**. See the recently uploaded content in a table chart including details on the source relative URL, source file name, user ID for the last 24 hours.

**Top 10 Most Viewed Contents**. See the details on the top 10 most viewed content in a table chart including details on source relative URL, source file name, and frequency for the last 24 hours.

**Contents CheckedIn-CheckedOut Recently**. See the information on content that was checked in and checked out recently in a table chart, including details on source relative URL and source file name for the last 24 hours.


#### SharePoint - Shared Content Non-Domains Activities

Shows details of non-domain users' accesses, uploads, downloads, and views.

<img src={useBaseUrl('img/integrations/microsoft-azure/Office365-SharePoint-SharedContentNon-DomainsActivities.png')} alt="Microsoft Office 365 dashboards" />

To see your data in this dashboard, open the queries of each panel and add your domain in the queries as mentioned [here](#Installing-the-Microsoft-Office-365-App).


**Top 10 Users Sharing Outside Domain**. See the top 10 users sharing content outside the domain in a table chart including details on user ID and frequency for the last seven days.

**Top 10 Non-Domain Users With Access**. See the information on top 10 non-domain users with access in a table chart including details on user shared with and frequency for the last seven days.

**Top 10 Non-Domain Users Downloading**. See information on the top 10 non-domain users downloading content in a table chart including user ID and frequency for the last seven days.

**Top 10 Contents Downloaded by Non-Domain Users**. See the top 10 contents downloaded by non-domain users in a table chart including details on the source relative URL, source file name, and frequency for the last seven days.

**Top 10 Non-Domain Users Uploading**. See the top 10 non-domain users uploading content in a table chart including details on user ID and frequency for the last seven days.

**Recent Uploads by Non-Domain Users**. See the details on recent uploads by non-domain users in a table chart including information on source relative URL and source file name for the last seven days.

**Top 10 Non-Domain Users Viewing Contents**. See the top 10 non-domain users who have viewed content in a table chart, including details on user ID and frequency for the last seven days.

**Top 10 Contents Viewed by Non-Domain Users**. See the top 10 content items viewed by non-domain users in a table chart, including details on source relative URL, source file name, and frequency for the last seven days.


#### SharePoint - User Activity

Shows details of active users, active IPs, and count of user sharing content.

<img src={useBaseUrl('img/integrations/microsoft-azure/Office365-SharePoint-UserActivity.png')} alt="Microsoft Office 365 dashboards" />

**Top 10 Active Users**. See the top 10 active users in a table chart including details on user ID and count for the last 24 hours.

**Top 10 Active IPs**. See the top 10 active IP address in a table chart including details on the client IP and count for the last 24 hours.

**Top Sharing Activities by User ID**. See the information on the top sharing activities by user ID in a table chart including details on user ID, count, and operation for the last 24 hours.

**Top 10 Users Involved in Sharing Operations**. See the top 10 users who have performed sharing operations in a table chart, including details on user ID and count for the last 24 hours.

**Top 10 Users Downloading Content**. See the top 10 users who have downloaded content in a table chart including details on user ID and frequency for the last 24 hours.

**Top 10 Users Uploading Content**. See the details on the top 10 users who have uploaded content in a table chart including details on user ID and frequency for the last 24 hours.


#### SharePoint - Visitor Locations

Shows details of visitors to the SharePoint by location and over time.

<img src={useBaseUrl('img/integrations/microsoft-azure/Office365-SharePoint-VisitorLocations.png')} alt="Microsoft Office 365 dashboards" />

**Worldwide Visitors**. Performs a geo lookup operation to display worldwide client IP address locations on a map of the world for the last 24 hours.

**United States Visitors**. Performs a geo lookup operation to display United States client IP address locations on a map of the world for the last 24 hours.

**Visits by Country Over Time**. Displays visitors by country in a stacked column chart on a timeline for the last 24 hours.

**Visits by State Over Time**. Shows clients by state in a stacked column chart on a timeline for the last 24 hours.


### Searches

To use the following searches, you will need to edit the search query to add the specific IP address or user email as needed.

**Demo - Geo Lookup on Suspicious IP**. Performs a geo lookup operation on a suspicious IP address that you specify.

**Demo - Honing on Suspicious User**. Provides information on a suspicious user that you identify.

**Demo - LogReduce on Suspicious IP**. Performs a LogReduce operation on a suspicious IP address that you specify.

**Demo - Outlier**. Performs an outlier operation on an IP address that you specify.
