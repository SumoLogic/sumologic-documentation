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


### Setup and Configuration Overview

The Slack source can collect data from Slack's [Web API](https://api.slack.com/web) and [Audit API](https://api.slack.com/admins/audit-logs). The Web API is used to collect standard channel, user, and message information from a specific workspace. The Audit API is used to collect security audit events across the entire account
including all workspaces, but it requires a Slack Enterprise Grid license. Each  API collects different information; collect from both if you have a Slack Enterprise Grid license.

We recommend creating a Slack App for each Slack Workspace you want to monitor. This requires a Sumo Logic Slack C2C per Slack Workspace. If you have a Slack Enterprise Grid account, you can create an additional Slack app, install it on the **Enterprise Grid** instead of a **Workspace** and create another Sumo Logic C2C to monitor your Enterprise Grid audit logs from the Audit API.

**Process overview**

1. Create the Slack App with the correct permissions.
2. Install the Slack app on a specific workspace to monitor Web API logs or install the app on the Enterprise Grid to monitor Audit API logs.
3. Install the Sumo Logic Slack C2C using your credentials from the installed Slack App.

#### Create Slack App with Permissions

1. Navigate to the [Slack Apps](https://api.slack.com/apps) page.
2. Click **Create New App**. <br/><img src={useBaseUrl('img/send-data/slack-create-app-button.png')} alt="Create a new Slack app button]" width="<insert-pixel-number>"/>
3. Select **From scratch** if asked how you would like to configure your Slack app. <br/><img src={useBaseUrl('img/send-data/slack-create-app-from-scratch.png')} alt="From Scratch App]" width="450"/>
4. Provide a **App Name** for your Slack App and select the Workspace you want to monitor and install the Slack App in.
The Sumo Logic collector will monitor logs from your workspace you select here. If you want to install the app on the
Enterprise Grid instead of a workspace to monitor the Audit API logs, select a workspace for now, and you will see
instructions later for migrating it. <br/><img src={useBaseUrl('img/send-data/slack-create-app-name.png')} alt="App Name and Workspace Assignment]" width="450"/>
5. Click **Create App**.
6. You are now presented with the basic information about your Slack app. Click  **Permissions** in the **Add features and functionality** section. <br/><img src={useBaseUrl('img/send-data/slack-basic-info-permissions.png')} alt="App Name and Workspace Assignment]" width="450"/>
7. Scroll down to the **Scopes** section add multiple **User Token Scopes** depending on your Slack account type. <br/><img src={useBaseUrl('img/send-data/slack-scope-add.png')} alt="App Name and Workspace Assignment]" width="450"/>

Use the table below to reference the required scope permissions you need to add depending on the Slack API you want to collect along with your Slack account type:

| Slack API | Slack Account Type   | Required Scopes                                                                                 |
|:----------|:----------------------|:-------------------------------------------------------------------------------------------------|
| Web API   | Free Plan            | admin, team:read, users:read, users:read.email, channels:read, channels:history                 |
| Web API   | Pro                  | admin, team:read, users:read, users:read.email, channels:read, channels:history                 |
| Web API   | Business+            | admin, team:read, users:read, users:read.email, channels:read, channels:history                 |
| Web API   | Enterprise Grid Plan | admin, team:read, users:read, users:read.email, channels:read, channels:history                 |
| Audit API | Enterprise Grid Plan |  auditlogs:read |

#### Install the Slack App on a Workspace for Web API Logs

Only follow these steps if you are installing a Slack App on a specific workspace to monitor Web API logs. Ensure that you have followed the prior steps for creating the Slack app with the appropriate permissions before continuing to this section.

1. On the app settings page, click **Install App** and the **Install to Workspace** button. <br/><img src={useBaseUrl('img/send-data/slack-install-app-to-workspace.png')} alt="slack-install-app-to-workspace.png" width="650"/>
2. Allow your new Slack App to monitor your workspace. <br/><img src={useBaseUrl('img/send-data/slack-app-allow.png')} alt="Allow App to Monitor Workspace" width="450"/>
3. Save the generated access token. This will be used by the Sumo Logic  configuration for access. <br/><img src={useBaseUrl('img/send-data/slack-copy-user-token.png')} alt="Copy Token" width="500"/>

#### Install the Slack App on the Enterprise Grid for Audit API Logs

Only follow these steps if you are installing a Slack App on the Enterprise to monitor Audit API logs. Make sure you have followed the prior steps for creating the Slack app with the appropriate permissions before continuing to this section. A Slack Enterprise Grid account is required.

1. On the app settings page, click **OAuth & Permissions**. <br/><img src={useBaseUrl('img/send-data/slack-oath-perm-link.png')} alt="Oauth Permissions" width="250"/>
2. Scroll down to **Redirect URLs**. Add a new redirect URL as `https://localhost` and click **Save URLs**. <br/><img src={useBaseUrl('img/send-data/slack-redirect-url.png')} alt="Redirect URL" width="500"/>
3. Go to **Manage Distribution > Share Your App with Other Workspaces**
4. Open the **Remove Hard Coded Information** section on the same page and check the
**I’ve reviewed and removed any hard-coded information** checkbox. Click the **Activate Public Distribution** button. <br/><img src={useBaseUrl('img/send-data/slack-activate-public-distro.png')} alt="Activate Public Distribution" width="550"/>
5. Copy the shareable link and ensure the permissions are correct from the prior table.
6. Open a new tab in your browser, paste the URL and press Enter.
7. Select the dropdown menu in the upper right corner and choose the correct organization. <br/><img src={useBaseUrl('img/send-data/slack-select-org-menu.png')} alt="Select Org Menu" width="<insert-pixel-number>"/>
8. Click **Allow**.
9. Ignore the error message and copy the **Code in the URL** field, as shown in the following example. <br/><img src={useBaseUrl('img/send-data/slack-copy-url-code.png')} alt="Copy URL code" width="<insert-pixel-number>"/>
10. Get the client ID and client secret from the Basic information of your Slack app. Replace the `<CODE>`, `<CLIENT_ID>`
and `<CLIENT_SECRET>` variables in the following URL. <br/> `https://slack.com/api/oauth.v2.access?code=<CODE>&client_id=<CLIENT_ID>&client_secret=<CLIENT_SECRET>`
11. Open a new browser tab and paste the URL from the previous step into the URL field, then press Enter.
12. From the response, save the token value from the field `access_token` as it will be used for the Sumo source.

```json
{
  "ok": true,
  "access_token": "xoxp-1236544616-Example-Access-Token5bf71298dad60d941f2a44b371",
  "scope": "admin,identify,channels:history,groups:history,im:history,channels:read,team:read,users:read,users:read.email,auditlogs:read",
  "user_id": "WA7PQK3U5",
  "team_id": "EFSFVS",
  "enterprise_id": "EASFEF",
  "team_name": "Test Slack App"
}
```

#### Install and Configure the Sumo Logic Slack Cloud-to-Cloud

1. Add a new source on a Sumo Hosted Collector
2. Search for and select Slack for the source
3. Provide a name for the source
4. Select the Slack collection API you want to collect logs from (Web or Audit)
5. Paste your Slack App access token from the previous steps


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
