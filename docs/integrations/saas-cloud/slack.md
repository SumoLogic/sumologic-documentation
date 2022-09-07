---
id: slack
title: Sumo Logic App for Slack
sidebar_label: Slack
description: The Sumo Logic App for Slack provides monitoring and data analytics for slack users, channels, access logs for workspaces with free, standard, and plus plans.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/slack.png')} alt="Thumbnail icon" width="100"/>

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

This section explains how to collect logs from Slack and ingest them into Sumo Logic for use with the Slack App predefined dashboards and searches.


### Collection overview

Sumo Logic enables you to collect logs from Slack via the Slack API. You can then configure various log types to collect. The logs are then forwarded to a Sumo Logic [HTTP Source](#Step_2:_Add_a_Hosted_Collector_and_HTTP_Source). By default the collection starts from the current date and time, but this can be configurable. Please see the [Advanced Configuration](#Advanced-Configuration) section for more details. Configuring log collection for the Slack App includes the following tasks:

* Create a Slack API token for log collection
* Add a Hosted Collector and HTTP Source
* Configure collection for Slack


### Create a Slack API token for log collection

This section demonstrates how to generate a Slack API token for all types of Slack plans, and is organized based on the type of Slack plan and log type. Identify your Slack plan and generate the Slack API token, as described in the following steps.


### General Guidelines

<table>
  <tr>
   <td>Guideline
   </td>
   <td>Enterprise plan
   </td>
   <td>Other plans
   </td>
  </tr>
  <tr>
   <td>Token Generation Permission
   </td>
   <td>Owner
   </td>
   <td>Admin
   </td>
  </tr>
  <tr>
   <td>Number of tokens
   </td>
   <td>One for Audit Logs
<p>One per workspace in Enterprise organization for access, user and channel logs</p>
   </td>
   <td>One for all logs as per plans
   </td>
  </tr>
  <tr>
   <td>Collection Installation
   </td>
   <td>One per token generation
   </td>
   <td>One per token generation
   </td>
  </tr>
</table>



### Token for Users, channels, and access logs

You must have admin privileges to perform this task. The token generated in the following steps can be used by all Slack plans to collect the mentioned [log types](#Log-types).

**To generate a Slack API token for users, channels and access logs, do the following:

1. Go to the [Apps](https://api.slack.com/apps) page.
2. Click **Create New App.**


1.  Enter the **App Name** and select the **Development Slack Workspace** for which you need to generate a token and collect logs.

1. Click **Create App**.
2. In the **Basic Information** section for the app created above, click **Permissions**.


1. In the **Scopes** section, add the following permissions in **User Token Scopes** to collect logs, and then click **Save**. Logs will be collected based on these permissions:

<table>
  <tr>
   <td>
<strong>Permission</strong>
   </td>
   <td><strong>Log Collected</strong>
   </td>
   <td><strong>Slack Plan</strong>
   </td>
  </tr>
  <tr>
   <td>admin
   </td>
   <td>Access Logs
   </td>
   <td>All
   </td>
  </tr>
  <tr>
   <td>channels:history
   </td>
   <td>Public Message Logs
   </td>
   <td>All
   </td>
  </tr>
  <tr>
   <td>channels:read
   </td>
   <td>Public Channel Logs
   </td>
   <td>All
   </td>
  </tr>
  <tr>
   <td>Users:read
<p>users:read.email</p></td>
   <td>Users Logs
   </td>
   <td>All
   </td>
  </tr>
  <tr>
   <td>team:read
   </td>
   <td>Team name in all logs.
   </td>
   <td>All
   </td>
  </tr>
</table>


1. Go to **Install App** and click **Install App to Workspace**.

The app prompts you for permission to install based on your selected permission.

1. Click **Allow **to install the app to workspace.


1. Copy the generated token. You will need to use this token when configuring the Slack collector.


1. Verify that the generated token is valid with the following commands. If the token is valid, the output will have "ok":true in the response. Replace the `<API_TOKEN>` variable with the generated token you copied in the previous step.


```bash
curl -X GET -H "Authorization: Bearer <API_TOKEN>" -H "Accept: application/json" "https://slack.com/api/team.info?pretty=1"
curl -X GET -H "Authorization: Bearer <API_TOKEN>" -H "Accept: application/json" "https://slack.com/api/users.list?limit=5&pretty=1"
curl -X GET -H "Authorization: Bearer <API_TOKEN>" -H "Accept: application/json" "https://slack.com/api/conversations.list?limit=2&pretty=1"
```


#### Generate a token for Audit logs

This generated token can only be used by the Enterprise Slack plan to collect audit logs.


You must have owner privileges to perform this task.

**To generate a Slack API token for audit logs, do the following:

1. For the Sumo Slack app you created in [Users, channels, and access logs](#Users.2C_channels.2C_and_access_logs), Go To **OAuth and Permission.**
2. Go to **Redirect URLs **and add a Redirect URL as [https://localhost](http://localhost/),** **then click **Save URLs**.


1. Go To **Manage Distribution** > **Share Your App with Other Workspaces**
2. Open the ​**Remove Hard Coded Information** ​section on the same page and check the **I’ve reviewed and removed any hard-coded information ​checkbox**.

1. Click the **Activate Public Distribution**.
2. Copy the **Shareable URL** and append **auditlogs:read** at the end. Such as in the following example:


```bash
https://slack.com/oauth/authorize?client_id=12345686.853580033397&scope=admin,channels:history,channels:read,team:read,users:read,users:read.email,auditlogs:read
```


1. Open a new tab in your browser, paste the modified URL and press **Enter**.
2. Select the drop-down menu in the upper right corner and choose the correct organization.


1. Click **Allow**.
2. Ignore the error message and copy the **Code** in the URL field, as shown in the following example.


1. Get the client ID and client secret from the Basic information of your Slack app. Replace the variables in brackets (`< >`) in the following URL:
```bash
https://slack.com/api/oauth.access?code=<CODE>&client_id=<CLIENT_ID>&client_secret=<CLIENT_SECRET>
```


If **v2**  appears in the URL used for the **share URL** in [step 6,](#Step-6---Shareable-URL) (i.e., https://slack.com/oauth/v2/authorize), use this URL:
```bash
https://slack.com/api/oauth.v2.access?code=<CODE>&client_id=<CLIENT_ID>&client_secret=<CLIENT_SECRET>
```


1. Open a new browser tab and paste the URL from the previous step into the URL field, then press **Enter**.
2. From the response, copy the token value from the field **access_token.**

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

1. Verify that the generated token is valid with the following commands. If the token is valid, the output will have "ok":true in the response. Replace the `<API_TOKEN>` variable with the generated token you copied in the previous step.
```bash
curl -X GET -H "Authorization: Bearer <API_TOKEN>" -H "Accept: application/json" "https://slack.com/api/team.info?pretty=1"
curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" https://api.slack.com/audit/v1/logs?limit=5&pretty=1
```


#### Add a Hosted Collector and HTTP Source

This section demonstrates how to add a hosted Sumo Logic collector and HTTP Logs source, to collect logs for Slack.

When you configure the HTTP Source, make sure to save the HTTP Source Address URL. You will need this to configure in the configuration file.

Identify an existing Sumo Logic Hosted Collector you want to use, or create a new Hosted Collector as described in the following task

**To add a hosted collector and HTTP source, do the following:
1. Create a new Sumo Logic Hosted Collector by performing the steps in [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
2. Create a new HTTP Log Source in the hosted collector created above by following [these instructions.](/docs/send-data/hosted-collectors/http-logs-metrics-source)


#### Configure collection for Slack

This section covers the various ways in which to collect logs from Slack and send them to Sumo Logic. The logs are then shown in dashboards as part of the Slack App. You can configure a Sumo Logic collector for Slack in Amazon Web Services (AWS) using AWS Lambda service, or use a script on a Linux machine with a CRON job. Choose the method that is best suited for your environment:
* AWS Lambda based collection via a Serverless Application Model (SAM) application
* Script based collection


#### Sumo Logic Slack SAM application

In this collection method, you deploy the SAM application, which creates the necessary resources in your AWS account.

To deploy the Sumo Logic Slack SAM application, do the following:
1. Go to [https://serverlessrepo.aws.amazon.com/applications](https://serverlessrepo.aws.amazon.com/applications).
2. Search for **sumologic-slack** and make sure the checkbox next to the text **Show apps that create custom IAM roles or resource policies** is selected, then click the app link when it appears.


1. When the page for the Sumo app appears, click **Deploy**.


1. In the **AWS Lambda > Functions >** **Application Settings** panel, enter the following parameters in the corresponding text fields:
* **HTTPLogsEndpoint.** Copy and paste the URL for the HTTP log source from [Step 2](#Step_2:_Add_a_Hosted_Collector_and_HTTP_Source).
* **Token.** Copy and paste the Authorization token from [Step 1](#Step_1:_Create_a_Sumo_Logic_app_in_Slack).
* **BackfillDays.** Number of days before the event collection will start. If the value is 1, then events are fetched from yesterday to today
* **Database Name.** DynamoDB Table Name. Use the table name to identify the Slack Workspace for which you are collecting logs. Do not use the same DataBase Name across multiple installations.
* **EnableInfrequentChannels.** Default is false.
    * Select true > Enable dividing channels into frequent and infrequent based on the last message time.                     
    * Select false > Send all public channels messages.
* **CreateSecret.** Default is No.
    * Select yes > Encrypt the Provided Environment variables HTTP_LOGS_ENDPOINT, TOKEN using KMS and Secret Manager.
    * Select No > No encryption.
* **AwsKmsKeyARN.** Provide an existing KMS Key ARN to encrypt the Environment variables HTTP_LOGS_ENDPOINT, TOKEN. If kept empty, a new KMS Key ID will be created if **CreateSecret** is **Yes**.

1. Click **Deploy.**


#### Configuring collection for multiple Slack Workspaces

This section shows you how to configure collection for multiple projects assuming you are already collecting Slack data for one project.

To configure collection for multiple projects, do the following:

1. [Deploy the SAM application](#Sumo_Logic_Slack_SAM_application) with the configuration for a new slack workspace.
2. Modify the **DatabaseName** and **Token** parameter during the SAM configuration to identify the slack workspace.


#### Sumo Logic Slack Script-based collection

This section provides instructions for deploying script-based collection for the Sumo Logic Slack App.

The _sumologic-slack_ script is compatible with python 3.7 and has been tested on Ubuntu 18.04 LTS.


#### Prerequisites

* You must have successfully added a [Hosted Collector and HTTP source](#Step_2:_Add_a_Hosted_Collector_and_HTTP_Source) and copied configuration parameter (token) from Slack, as described in [Step 1](#Step_1:_Create_a_Sumo_Logic_app_in_Slack) and [Step 2](#Step_2:_Add_a_Hosted_Collector_and_HTTP_Source).
* You must be logged in to the user account with which you will install the collector. If you are not, use this command to switch to that account:  
```
sudo su <user_name>
```


#### Configure the script on a Linux machine

This task shows you how to install the script on a Linux machine.

For python 3, use pip3 install **sumologic-slack** (step 3). For operating systems where the default is not python3, use **/usr/bin/python3 -m sumoslack.main** (step 6).

To deploy the script, do the following:
1. If **pip** is not already installed, follow the instructions in the [pip documentation](https://pip.pypa.io/en/stable/installing/) to download and install **pip**.
2. Log in to a Linux machine (compatible with Python 3.7.)
3. **For Python 3**, run the following command:
```
pip3 install sumologic-slack
```
4. Create a configuration file **slackcollector.yaml** in the home directory as shown in the following example and specify the parameters where indicated.
```yml
Slack:
 TOKEN: <Paste the Token collected from Slack App from step 1.>
 ENABLE_INFREQUENT_CHANNELS: < Default is 'false'.
                               'true' -> Enable dividing channels into frequent and infrequent based on the last message time.
                               'false' -> Send all public channels messages.>
 INFREQUENT_CHANNELS_THRESHOLD_IN_HOURS: < Default is 72.
                                           Threshold in hours to make channels as infrequent based on last message time.
                                           For eg,12 hours means if the message is not received for 12 hours, channel will be marked as infrequent.>
 INFREQUENT_CHANNELS_MESSAGES_FETCH_TIME_IN_HOURS: < Default is 12.
                                                     Time in hours to fetch messages for InFrequent channels.
                                                     For eg, 12 hours means send infrequent channels messages every 12 hours.>
Collection:
 BACKFILL_DAYS: <Enter the Number of days before the event collection will start.>
 DBNAME: <Enter the Database Name.>
SumoLogic:
 HTTP_LOGS_ENDPOINT: <Paste the URL for the HTTP Logs source from step 2.>
```



1. Create a cron job  to run the collector every 5 minutes, (use the `crontab -e` option). Do one of the following:
**For Python 3**, add the following line to your crontab:
```bash
*/5 * * * *  /usr/bin/python3 -m sumoslack.main > /dev/null 2>&1
```


#### Configuring collection for multiple projects

This section shows you how to configure collection for multiple projects assuming you are already collecting Slack data for one project.

To configure collection for multiple projects, do the following:

1. After configuring the script on a Linux machine, go to your configuration file.
2. Change the DB_NAME in the **slackcollector.yaml** file, as indicated in the following example:

```yml
Slack:
  TOKEN: <Paste the Token collected from Slack App from step 1.>
  ENABLE_INFREQUENT_CHANNELS: >-
    < Default is 'false'. 'true' -> Enable dividing channels into frequent and
    infrequent based on the last message time. 'false' -> Send all public
    channels messages.>
  INFREQUENT_CHANNELS_THRESHOLD_IN_HOURS: >-
    < Default is 72. Threshold in hours to make channels as infrequent based on
    last message time. For eg, 12 hours means if the message is not received for
    12 hours, channel will be marked as infrequent.>
  INFREQUENT_CHANNELS_MESSAGES_FETCH_TIME_IN_HOURS: >-
    < Default is 12. Time in hours to fetch messages for InFrequent channels.
    For eg, 12 hours means send infrequent channels messages every 12 hours.>
Collection:
  BACKFILL_DAYS: <Enter the Number of days before the event collection will start.>
  DBNAME: <New Database Name.>
SumoLogic:
  HTTP_LOGS_ENDPOINT: <Paste the URL for the HTTP Logs source from step 2.>

```



#### Advanced Configuration

This section is common for both [AWS Lambda based collection](#Sumo-Logic-Slack-SAM-application) and [script based collection](#Sumo-Logic-Slack-Script-based-collection).

The following table provides a list of variables for Slack that you can optionally define in the configuration file.


<table>
  <tr>
   <td>Variable
   </td>
   <td>Usage
   </td>
  </tr>
  <tr>
   <td>LOG_TYPES in Slack Section
<p>Remove logs based on the type of token used.</p>
   </td>
   <td><strong>LOG_TYPES</strong>:
<p>-USER_LOGS</p>
<p>ACCESS_LOGS</p>
<p>CHANNELS_LOGS</p>
<p>CHANNELS_MESSAGES_LOGS</p>
<p>AUDIT_LOGS</p>
<p>The following audit logs can be excluded. Use the exact action name from <a href="https://api.slack.com/docs/audit-logs-api#audit_logs_actions">Slack</a>.</p>
<p>ExcludeAuditLogs:</p>
<p>Exclude_action_name1</p>
<p>Exclude_action_name2</p>
   </td>
  </tr>
  <tr>
   <td>ACCESS_LOGS_PAGE_COUNTER in Slack Section
   </td>
   <td>Number of Access Logs pages that can be fetched. Max pages that can be fetched is 100. Default is to fetch 2 Access Logs pages.
   </td>
  </tr>
  <tr>
   <td>BACKFILL_DAYS in Collection Section
   </td>
   <td>Number of days before the event collection will start. If the value is 1, then events are fetched from yesterday to today.
   </td>
  </tr>
  <tr>
   <td>LOG_FORMAT in Logging Section
   </td>
   <td>Log format used by the python logging module to write logs in a file.
   </td>
  </tr>
  <tr>
   <td>ENABLE_LOGFILE in Logging Section
   </td>
   <td>Set to TRUE to write all logs and errors to a log file.
   </td>
  </tr>
  <tr>
   <td>ENABLE_CONSOLE_LOG in Logging Section
   </td>
   <td>Enables printing logs in a console.
   </td>
  </tr>
  <tr>
   <td>LOG_FILEPATH in Logging Section
   </td>
   <td>Path of the log file used when ENABLE_LOGFILE is set to TRUE.
   </td>
  </tr>
  <tr>
   <td>NUM_WORKERS in Collection Section
   </td>
   <td>Number of threads to spawn for API calls.
   </td>
  </tr>
  <tr>
   <td>MAX_RETRY in Collection Section
   </td>
   <td>Number of retries to attempt in case of request failure.
   </td>
  </tr>
  <tr>
   <td>BACKOFF_FACTOR in Collection Section
   </td>
   <td>A backoff factor to apply between attempts after the second try. If the backoff_factor is 0.1, then sleep() will sleep for [0.0s, 0.2s, 0.4s, ...] between retries.
   </td>
  </tr>
  <tr>
   <td>TIMEOUT in Collection Section
   </td>
   <td>Request time out used by the requests library.
   </td>
  </tr>
  <tr>
   <td>HTTP_LOGS_ENDPOINT in SumoLogic section
   </td>
   <td>HTTP source endpoint URL created in Sumo Logic for ingesting Logs.
   </td>
  </tr>
</table>



#### Troubleshooting

This section shows you how to run the function manually and then verify that log messages are being sent from Slack.

**To run the function manually, do the following:

1. For **Python 3**, use this command:
```
python3 -m sumoslack.main
```
2. Check the automatically generated logs in  **/tmp/sumoapiclient.log** to verify whether the function is getting triggered or not.
3. If you get an **OAuth Error: team_not_authorized** error when you try to add scopes to your slack app, remove **auditlogs:read** scope from the app.



## Installing the Slack App

This section provides instructions on how to install the Slack App, as well as examples of each of the dashboards. The App's pre-configured searches and [dashboards](#viewing-dashboards) provide easy-to-access visual insights into your data.

This section shows you how to install the Sumo Logic App for Slack.

To install the app, do the following:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.


Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](/docs/get-started/library/install-apps)

3. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Slack Dashboards

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

You can use filters to drill down and examine the data on a granular level.

**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.


### Overview

The **Slack - Overview** dashboard provides an at-a-glance view of the number of workspaces, members, bots, admins, public channels, and public messages. Panels also show geographic access locations, and key statistics around public messages  and files.

Use this dashboard to:
* Monitor the admins, bots, and members across workspaces.
* Identify the trends around public messages and files shared
* Monitor locations from which workspaces are being accessed

<img src={useBaseUrl('img/integrations/saas-cloud/Slack_Overview.png')} alt="Slack dashboards" />



### Members

The **Slack - Members** dashboard shows trends for total members, active members, and messages by workspace. Panels also show detailed member information, and breakdowns by workspace for roles, timezones, and two factor authentication (2FA).

Use this dashboard to:
* Monitor member activity across workspaces.
* Identify inactive members that have not accessed the workspace.
* Identify members that do not have two factor authentication enabled

<img src={useBaseUrl('img/integrations/saas-cloud/Slack_Members.png')} alt="Slack dashboards" />


### Bots

The **Slack - Bots** dashboard displays information on bots, which are software applications that run automated tasks over the Internet. Panels show trends by workspace for all bots, active bots, and messages, as well as detailed information on bots, and a detailed bot summary.

Use this dashboard to:
* Monitor bots and bot activities across multiple workspaces.

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
