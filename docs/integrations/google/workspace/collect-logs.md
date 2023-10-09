---
id: collect-logs
title: Collecting Logs for Google Workspace
sidebar_label: Collecting Logs
description: Instructions for configuring log collection from Google Workspace Apps and Alert Center, and how to ingest those logs into Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="thumbnail icon" width="150"/>

This procedure explains how to collect logs from Google Workspace and ingest them into Sumo Logic. You can configure two types of log collection: Google Workspace Alert Center and Google Workspace Audit Source.

## Log Types

**Google Workspace Apps** each have a log that records actions in JSON format. The logs are all structurally similar—most have an ID, actor, and an IP Address. The differences are in the events section of the JSON where the actions are recorded.

**Google Workspace Alert Center** alerts are in JSON format. Most of the alerts have a few common fields. The differences are in the data section of the JSON where the alert type specific details are recorded. For more information, see this Google Workspace [Alert document](https://developers.google.com/admin-sdk/alertcenter/reference/alert-types).


## Configure Collection for Google Workspace Apps Audit Source

This section provides instructions for configuring log collection for Google Workspace with Audit Source.

[Google Workspace](#configure-collection-for-google-workspace-audit-source): Monitors and analyzes the activity across all the Google Workspace Apps in one place. You can configure collection for each Google App for which you want to analyze events:
    * Google Admin
    * Google Drive
    * Google Login
    * Google Token

### About Source Configuration  

Currently, the source name for Google Workspace is still **Google Workspace Apps Audit Source**, which will be changed/updated shortly.

Configure one [Google Workspace Apps Audit Source](/docs/send-data/hosted-collectors/google-source/google-workspace-apps-audit-source) for each Google App from which you want to collect events:

* Google Admin
* Google Calendar
* Google Drive
* Google Login
* Google Token

Google Workspace Drive Audit events are only logged for files owned by users with Google Workspace Business, Enterprise, or Drive Enterprise licenses.

When you configure your Source Categories, you can configure and use them in two different ways.

**One Single Source Category for all Sources.** For users who are setting up the Google Workspace Apps Audit Source for the first time, we suggest that you use the same single Source Category for each Google Apps Audit Source. For example, **google_apps**.

**Different Source Categories for each Source.** You may configure a different Source Category for each Source, but we recommend that you use a naming convention for the Source Categories that allows you to apply a wildcard. For example, naming your Source Categories as follows would allow you to refer to all of them with the query **google_app***.
* google_app_admin
* google_app_calendar
* google_app_drive
* google_app_login
* Google_app_token

A Google Workspace Apps Audit Source uses the [Google Apps Reports API](https://developers.google.com/admin-sdk/reports/v1/get-start/getting-started) to ingest all audit logs via watchpoints. Activity from the following Google apps are supported in Sumo's Google Workspace App:
* Admin
* Calendar
* Drive
* Login
* Token

Only one Source should be configured per app. In other words, you might set up one Source to collect Calendar audit logs, another to collect Token audit logs, and so on.


### Google Authentication and Authorization  

This Source uses OAuth to integrate with the Google Apps Reports API. Therefore, your Google Apps credentials are never stored by Sumo Logic, and we have no visibility into the details of your Google Apps account.  Sumo Logic only stores OAuth tokens that are generated after authentication and authorization.

When creating or modifying a Google Workspace Apps Audit Source, you will be required to authenticate with Google using the credentials of a user that has access rights to the account, and to the Reports API. See Google's [Reports API: Prerequisites](https://developers.google.com/admin-sdk/reports/v1/guides/prerequisites) documentation for more details. During Google's OAuth consent flow, you will also be asked to grant the Sumo Logic app permission to use the Reports API.

:::note
Authentication must be with a new Google Workspace Apps Audit Source. We do not support re-authenticating existing sources.
:::

### Configure a Collector

Configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) for the Google workspace sources you will set up below.


### Configure Google Workspace Apps Audit Sources  

When you have set up a Hosted Collector and have your credentials ready, you're all set to configure the Sources. Perform the steps below for each Google Workspace App you want to monitor.  Before you configure the Sources, choose one of the source category strategies described in [About Source Configuration](#About_Source_Configuration), above.

:::note
We recommend that you use the same single Source Category for each Google Workspace Apps Audit Source. For example, **google_apps**.
:::

To configure a Google Workspace Apps Audit Source, do the following:

1. Configure a **Google Workspace Apps Audit** Source.
2. Configure the Source fields:
    1. **Name**. (Required) A name is required.
    2. **Description**. Optional.
    3. **Application**. Select the app that you’d like this Source to collect data from.
    4. **Source Category**. (Required)   
    5. **Sign in with Google**. Click to give permission to Sumo Logic to set up watchpoints using the Google Workspace Apps Reports API. Click **Accept**.
3. Click **Save**.


#### Google Workspace App Audit Known Issues  

The Google API has a few known issues that cannot be changed by Sumo Logic.

**Google Workspace license requirement**. Google Workspace Drive Audit events are only logged for files owned by users with Google Workspace Business, Enterprise, or Drive Enterprise licenses.

**Authentication token limit**. Google limits an application (such as Sumo Logic) to 25 active authentication tokens per Google Workspace Apps account. According to Google’s documentation, the oldest token is invalidated if a 26th token is created. However, during testing, we found that once the 26th token is issued, all previous 25 tokens become invalid. In this situation, the only workaround is to delete and recreate all Google Workspace Apps Audit Sources in Sumo Logic.

**Duplicate records**. The following situations might result in the collection of duplicate log messages:
* **Complex events**. When a complex an event is logged that contains multiple sub-events, such as a new calendar entry, a JSON object is created to log the event. That object will have an array of event details for each included action (such as inviting guests). When this happens, duplicate event logs might be created for each sub-action. So, if there is one event with three sub actions, the exact same message event data might be duplicated three times, most likely due to a bug in the Google API.
* **Watchpoint expiration**. Google API watchpoints expire after about one week. Unfortunately, there does not appear to be a method for refreshing the expiration of a watchpoint. Sumo Logic must keep track of when each watchpoint expires, and in very close sequence, create a new watchpoint and kill the old watchpoint. This results in a slight overlap, typically only a few seconds, when there are two watchpoints for the same application. This might result in duplicate logs during that overlapping period, both of which are collected (which is preferable to the possibility of losing some data).

**Service Availability**. Logging is dependent on the availability of Google services. In some cases, apps may stop producing logs for a period of time. We have observed this during our development and QA testing.

To provide feedback on these limitations and known issues, contact Google support or your Google account contact.


### Field Extraction Rules

* **Name**. A relevant name, such as "Google"
* **Scope**. `_sourceCategory=google*`
* **Parse Expression**.  
  ```sql
  | json "id","actor","events"  \
  | json field=actor "email", "profileId" \
  | json field=id "applicationName"
  ```

### Sample Log Message  

```json
{
   "kind": "admin#reports#activity",
   "id": {
      "time": "2017-02-10T19:14:24.519Z",
      "uniqueQualifier": "-123",
      "applicationName": "token",
      "customerId": "ABC123"
   },
   "etag": "\"xyz\"",
   "actor": {
      "email": "sumo@sumologic.com",
      "profileId": "123456789"
   },
   "events": [
      {
         "name": "authorize",
         "parameters": [
            {
               "name": "client_id",
               "value": "123.apps.googleusercontent.com"
            },
            {
               "name": "app_name",
               "value": "Dialpad"
            },
            {
               "name": "scope",
               "multiValue": [
                  "https://www.googleapis.com/sumo/userinfo.email",
                  "https://www.googleapis.com/sumo/userinfo.profile",
                  "https://www.google.com/sumo/feeds",
                  "https://www.googleapis.com/sumo/sumo.me"
               ]
            }
         ]
      }
   ]
}
```



### Sample Query

```sql title="Top 10 Apps by Count"
_source=google_* token
| json "id","actor", "events"
| json field=actor "email", "profileId"
| json field=id "applicationName"
| where applicationName="token"
| parse regex field=events "\[{\"name\":\"(?<token_action>.*?)\",\"parameters\"" nodrop
| parse regex field=events "{\"name\":\"app_name\",\"value\":\"(?<app_name>.*?)\"\}" nodrop
| count by app_name
| top 10 app_name by _count
```


```sql title="Logins from Multiple IPs"
_sourceCategory=google*
| json "actor","ipAddress"
| json "events"
| json field=actor "email", "profileId"
// Needed because a group by operator is required in dashboards
| count by email, ipAddress
| join (count by ipAddress, email) as t1, (count_distinct(ipAddress) by email) as t2 on t1.email=t2.email
| where t2__count_distinct >1
| t1_email as email
| t1_ipAddress as ipAddress
| count by email
| sort by _count desc, email asc
```

## Collect Logs for Google Workspace AlertCenter

To collect logs for Google Workspace AlertCenter, follow the instructions in [Google Workspace AlertCenter](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-workspace-alertcenter.md).
