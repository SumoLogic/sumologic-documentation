---
id: slack
title: Slack
sidebar_label: Slack
description: The Sumo Logic App for Slack provides monitoring and data analytics for Slack users, channels, access logs for workspaces with free, standard, and plus plans.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/slack.png')} alt="Thumbnail icon" width="50"/>

The Sumo Logic App for Slack provides monitoring and data analytics for Slack users, channels, access logs for workspaces with free, standard, plus, and enterprise plans. The app is focused on **public channels** only.

[Slack](https://slack.com/) is a cloud-based set of software tools and online services that provide for secure collaboration across teams, departments, offices, and countries.

## Log Types

Slack logs are in JSON format. The Slack App utilizes the following log types:

* User logs
* Public channel logs
* Public message logs
* Access logs
* Audit logs

Sumo Logic’s Slack collector enhances the logs by adding a few metadata fields so the raw logs from Slack APIs might differ in format. The availability of all types of logs is determined by the [slack plans](https://get.slack.help/hc/en-us/articles/115003205446-Slack-plans-and-features-).

<table>
  <tr>
   <td><strong>Log Type</strong>
   </td>
   <td><strong>Free plan</strong>
   </td>
   <td><strong>Standard plan</strong>
   </td>
   <td><strong> Plus plan</strong>
   </td>
   <td><strong>Enterprise plan</strong>
   </td>
  </tr>
  <tr>
   <td>User logs
   </td>
   <td>✓
   </td>
   <td>✓
   </td>
   <td>✓
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>Public Channel logs
   </td>
   <td>✓
   </td>
   <td>✓
   </td>
   <td>✓
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>Public Message logs
   </td>
   <td>✓
   </td>
   <td>✓
   </td>
   <td>✓
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>Access logs
   </td>
   <td>
   </td>
   <td>✓
   </td>
   <td>✓
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>Audit logs
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>✓
   </td>
  </tr>
</table>



### Sample log messages

The following table provides sample log messages for the different log types.

[User logs](https://api.slack.com/methods/users.list)
```json
{
  "id": "UM27LNGHK",
  "name": "test",
  "deleted": false,
  "real_name": "test",
  "tz": "Asia/Kolkata",
  "tz_label": "India Standard Time",
  "is_admin": false,
  "is_owner": false,
  "is_primary_owner": false,
  "is_restricted": false,
  "is_ultra_restricted": false,
  "is_bot": false,
  "is_app_user": false,
  "updated": 1565005724,
  "has_2fa": false,
  "teamName": "TestSlack",
  "email": "test@test.com",
  "billable": true,
  "logType": "UserLog"
}
```

[Public Channel logs](https://api.slack.com/methods/conversations.list)
```json
{
  "channel_id": "CKN1D8010",
  "channel_name": "testchannel",
  "members": 2,
  "logType": "ChannelDetail",
  "teamName": "TestSlack"
}
```

[Public Message logs](https://api.slack.com/methods/channels.history)
```json
{
  "type": "message",
  "text": "Test",
  "files": [
    {
      "name": "Test",
      "fileType": "epub",
      "fileSize": 1258,
      "urlPrivate": "https://files.slack.com/files-pri/TJ...htyhomsdconmps",
      "urlPrivateDownload": "https://files.slack.com/files-pri/TJ...htyhomsdconmps",
      "permalink": "https://testslack-xj11408.slack.com/...htyhomsdconmps"
    }
  ],
  "attachments": [
    {
      "id": 16,
      "text": "Test",
      "author_name": "",
      "author_link": "",
      "pretext": "",
      "fallback": "Messages Sent"
    }
  ],
  "upload": true,
  "user": "e65b0bd8",
  "display_as_bot": false,
  "ts": "1566215592",
  "client_msg_id": "23849274-580c-4644-9478-8328e5716b89",
  "userName": "roy",
  "channelId": "e65b0d0e",
  "channelName": "app-for-slack",
  "teamName": "TestSlack",
  "logType": "ConversationLog"
}
```

[Access logs	](https://api.slack.com/methods/team.accessLogs)
```json
{
  "user_id": "e65b0476",
  "username": "dave",
  "date_first": 1566215532,
  "date_last": 1566215532,
  "count": 2,
  "ip": "213.14.129.105",
  "user_agent": "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1467.0 Safari/537.36",
  "isp": "Inetbroadband",
  "country": "PA",
  "region": "EU",
  "teamName": "TestSlack",
  "logType": "AccessLog"
}
```

[Audit logs](https://api.slack.com/docs/audit-logs-api#the_audit_event)
```json
{
  "logType": "UserAuditLog",
  "id": "bdcb13e3-28a3-41f0-9ace-a20952def3a0",
  "date_create": 1566215192,
  "action": "user_created",
  "actor": {
    "type": "user",
    "user": {
      "id": "e65b0f5c",
      "name": "roy",
      "email": "aaron@demo.com"
    }
  },
  "entity": {
    "id": "e65b107e",
    "privacy": "public",
    "name": "BigCo ISP",
    "is_shared": false,
    "is_org_shared": false,
    "filetype": "text/csv",
    "title": "john",
    "is_distributed": false,
    "is_directory_approved": false,
    "scopes": [
      "identify",
      "bot",
      "incoming-webhook",
      "channels:read",
      "groups:read",
      "im:read",
      "users:read",
      "chat:write:bot",
      "users:read.email",
      "groups:write",
      "channels:write",
      "team:read",
      "chat:write:user"
    ]
  },
  "context": {
    "location": {
      "type": "workspace",
      "id": "e65b11aa",
      "name": "Docker",
      "domain": "Docker"
    },
    "ua": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:23.0) Gecko/20131011 Firefox/23.0",
    "ip_address": "120.188.0.246"
  },
  "details": {
    "id": "USLACKUSER",
    "name": "himanshu",
    "email": "kumar@demo.com"
  }
}
```

### Sample Query

The sample query is from the **Channel Summary** panel of **Slack - Public Channels** dashboard.

```sql
_sourceCategory=Labs/slack
| join ("logType":"channelDetail"
| json "channel_name", "channel_id", "teamName", "members" as Channel, ChannelId, Workspace, Members
| withtime Members
| most_recent(Members_withtime) as Members by Channel, ChannelId, Workspace) as T1,("logType":"ConversationLog" | json "user", "userName", "type", "subtype", "ts", "text", "channelId", "channelName", "teamName" as ID, User, Type, SubType, Time, Text, ChannelId, Channel, Workspace nodrop
| count_distinct(Time) as Messages by ID, ChannelId, Workspace) as T2 on T1.ChannelId = T2.ChannelId and T1.Workspace=T2.Workspace
| T2_Workspace as Workspace | T2_ID as User| T1_Channel as Channel
| where Workspace matches {{Workspace}} and Channel matches {{Channel}}
| T1_Members as %"Team Members"
| fields Workspace, Channel, User, %"Team Members" ,T2_Messages
| where [subquery:"logType":"UserLog"
| json "id", "name", "deleted", "is_bot", "teamName" as User, Name, Deleted, Bot, Workspace nodrop
| where Bot matches "false" and !(Name matches "slackbot") and Deleted matches "false"
| withtime Name
| most_recent(Name_withtime) as Name by User, Workspace
| compose User, Workspace]
| sum(T2_Messages) as %"Total Messages", count_distinct(User) as %"Members Posted Messages" by Workspace, Channel, %"Team Members"
| fields Workspace, Channel, %"Team Members", %"Total Messages", %"Members Posted Messages"
| sort by %"Total Messages"
| limit 20
```

## Collect logs for the Slack App

This legacy solution to pull logs from Slack to Sumo Logic has been replaced with a dedicated [Cloud-to-Cloud Integration Framework](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework). We recommend customers use the below [Slack Cloud-to-Cloud source](#create-slack-app-with-permissions) instead of the legacy Python collection method.

## Installing the Slack App

This section demonstrates how to install the Slack App.

{@import ../../reuse/apps/app-install.md}

## Viewing Slack Dashboards

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

You can use filters to drill down and examine the data on a granular level.

**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.


### Overview

The **Slack - Overview** dashboard provides an at-a-glance view of the number of workspaces, members, bots, admins, public channels, and public messages. Panels also show geographic access locations, and key statistics around public messages  and files.

Use this dashboard to:
* Monitor the admins, bots, and members across workspaces
* Identify the trends around public messages and files shared
* Monitor locations from which workspaces are being accessed

<img src={useBaseUrl('img/integrations/saas-cloud/Slack_Overview.png')} alt="Slack dashboards" />


### Members

The **Slack - Members** dashboard shows trends for total members, active members, and messages by workspace. Panels also show detailed member information, and breakdowns by workspace for roles, timezones, and two factor authentication (2FA).

Use this dashboard to:
* Monitor member activity across workspaces.
* Identify inactive members that have not accessed the workspace
* Identify members that do not have two factor authentication enabled

<img src={useBaseUrl('img/integrations/saas-cloud/Slack_Members.png')} alt="Slack dashboards" />


### Bots

The **Slack - Bots** dashboard displays information on bots, which are software applications that run automated tasks over the Internet. Panels show trends by workspace for all bots, active bots, and messages, as well as detailed information on bots, and a detailed bot summary.

Use this dashboard to:
* Monitor bots and bot activities across multiple workspaces

<img src={useBaseUrl('img/integrations/saas-cloud/Slack_Bots.png')} alt="Slack dashboards" />



### Public Channels

The **Slack - Public Channels** dashboard provides detailed information across all channels, as well as active channels. Panels also show information on the top ten channels by files and by attachments, and a summary of all channels.

Use this dashboard to:
* Monitor channel activity across multiple workspaces
* Identify inactive channels where messages are not being posted

<img src={useBaseUrl('img/integrations/saas-cloud/Slack_Public_Channels.png')} alt="Slack dashboards" />


### Public Messages

The **Slack - Public Messages** dashboard provides details around attachments, files shared and statistics around messages in Slack public channels.

Use this dashboard to:
* Monitor various file types being shared and identify those that pose the greatest risk
* Investigate the details of file shared via the URL links in the Recent File Shared panel

<img src={useBaseUrl('img/integrations/saas-cloud/Slack_Public_Messages_Investigation.png')} alt="Slack dashboards" />



### Access

The **Slack - Access** dashboard helps you monitor how users are accessing Slack and identifies access requests coming in from malicious domains.

Use this dashboard to:
* Identify all incoming threats detected via Sumo Logic Threat Intel
* Identify the kinds of mobile or desktop platforms that users are using to access Slack
* Identify trends for user access patterns across multiple workspaces

<img src={useBaseUrl('img/integrations/saas-cloud/Slack_Access.png')} alt="Slack dashboards" />


### Audit Overview Dashboard

The **Slack - Audit Overview **dashboard provides details around  Slack audit actions, and trends.

Use this dashboard to:
* Review audit actions and determine which are not approved or need to be corrected
* Identify and validate that top users performing audit actions

<img src={useBaseUrl('img/integrations/saas-cloud/Slack_Audit_Overview.png')} alt="Slack dashboards" />


### User Audit

The **Slack - User Audit** dashboard provides insight into  user and administrative audit actions and trends. Panels also display detailed information for members and guest members.

Use this dashboard to:
* Monitor audit actions across multiple workspaces.
* Monitor all role changes for workspaces and identify any suspicious behavior
* Monitor and validate that all guest activities are in line with what is expected

<img src={useBaseUrl('img/integrations/saas-cloud/Slack_User_Audit.png')} alt="Slack dashboards" />



### Workspace Audit

The **Slack - Workspace Audit** dashboard provides information on top users, top audit actions and audit trends. Panels also detail workspace sign on, exports, data retention and billing, and other admin activities.

Use this dashboard to:
* Monitor all workspace related activities.
* Monitor changes to single-sign-on settings including two factor authentication
* Monitor workspace related, data retention, or billing activities
* Monitor the exports that are performed on workspaces

<img src={useBaseUrl('img/integrations/saas-cloud/Slack_Workspace_Audit.png')} alt="Slack dashboards" />



### Channel Audit

The **Slack - Channel Audit** dashboard provides details on the top channel audit actions and trends. The panels also display information on top members and member activity, and top guest members and guest member activity.

Use this dashboard to:
* Monitor channel related activities for multiple workspaces
* Monitor all the private and public channels joined by members and guests
* Monitor all the private channels that are created, deleted, and archived by guests

<img src={useBaseUrl('img/integrations/saas-cloud/Slack_Channel_Audit.png')} alt="Slack dashboards" />


### File and App Audit

The **Slack - File and App Audit** dashboard displays file audit and app audit information. The panels show audit actions, top actions and file types or scopes, top users, and member activity.

Use this dashboard to:

* Monitor all application and file related activities across multiple workspaces
* Identify the top users who perform actions related to applications and files
* Identify all guests and members that share, install applications download and upload files across public and private channels
* Identify the top scopes under which applications are approved and installed

<img src={useBaseUrl('img/integrations/saas-cloud/Slack_File_And_App_Audit.png')} alt="Slack dashboards" />
