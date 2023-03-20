---
id: slack-source
title: Slack Source
sidebar_label: Slack
description: Install the Slack Source for Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/slack.png')} alt="Thumbnail icon" width="60"/>

This topic describes the Slack Source, part of Sumo Logic's [Cloud-to-Cloud Integration Framework](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework).

## Data Sources

The Slack Source uses the following Slack APIs to ingest web and audit events.

- [Slack Web API](https://api.slack.com/web)
- [Slack Audit API](https://api.slack.com/admins/audit-logs)


The source collects the following API endpoints and routes.

| API       | Req Scope        | Route                                                                        | Free      | Standard  | Plus      | Enterprise |
|:-----------|:------------------|:------------------------------------------------------------------------------|:-----------|:-----------|:-----------|:------------|
| Web API   | admin            | [team.accessLogs](https://api.slack.com/methods/team.accessLogs)             | Collected | Collected | Collected | Collected  |
| Web API   | team:read        | [team.info](https://api.slack.com/methods/team.info)                         | Collected | Collected | Collected | Collected  |
| Web API   |                  | [team.billableInfo](https://api.slack.com/methods/team.billableInfo)         | Collected | Collected | Collected | Collected  |
| Web API   | users:read       | [users.list](https://api.slack.com/methods/users.list)                       | Collected | Collected | Collected | Collected  |
| Web API   | channels:read    | [conversations.list](https://api.slack.com/methods/conversations.list)       | Collected | Collected | Collected | Collected  |
| Web API   | channels:history | [conversations.replies](https://api.slack.com/methods/conversations.replies) | Collected | Collected | Collected | Collected  |
| Web API   | channels:history | [conversations.history](https://api.slack.com/methods/conversations.history) | Collected | Collected | Collected | Collected  |
| Web API   | admin.teams:read | [admin.teams.list](https://api.slack.com/methods/admin.teams.list)           | N/A       | N/A       | N/A       | Collected  |
| Audit API | auditlogs:read   | [audit-logs](https://api.slack.com/admins/audit-logs-call)                   | N/A       | N/A       | N/A       | Collected  |

## Metadata Fields
The **SIEM forward** option, which causes collected information to be forwarded to Cloud SIEM Enterprise, is not currently supported.

## Setup and Configuration Overview
The Slack source can collect data from Slack's [Web API](https://api.slack.com/web) and
[Audit API](https://api.slack.com/admins/audit-logs). The Web API is used to collect standard channel, user, and message information from a specific workspace. The Audit API is used to collect security audit events across the entire account
including all workspaces, but it requires a Slack Enterprise Grid license. Each  API collects different information; collect from both if you have a Slack Enterprise Grid license.

We recommend creating a Slack App for each Slack Workspace you want to monitor. This requires a Sumo Logic Slack C2C per Slack Workspace. If you have a Slack Enterprise Grid account, you can create an additional Slack app, install it on the Enterprise Grid instead of a Workspace and create another Sumo Logic C2C to monitor your Enterprise Grid audit logs from the Audit API.

**Process overview**

1. Create the Slack App with the correct permissions.
2. Install the Slack app on a specific workspace to monitor Web API logs or install the app on the Enterprise Grid to monitor Audit API logs.
3. Install the Sumo Logic Slack C2C using your credentials from the installed Slack App.

### Create Slack App with Permissions
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

### Install the Slack App on a Workspace for Web API Logs
Only follow these steps if you are installing a Slack App on a specific workspace to monitor Web API logs. Please ensure
you have followed the prior steps for creating the Slack app with the appropriate permissions before continuing to this
section.

1. On the app settings page, click **Install App** and the **Install to Workspace** button. <br/><img src={useBaseUrl('img/send-data/slack-install-app-to-workspace.png')} alt="slack-install-app-to-workspace.png" width="650"/>
2. Allow your new Slack App to monitor your workspace. <br/><img src={useBaseUrl('img/send-data/slack-app-allow.png')} alt="Allow App to Monitor Workspace" width="450"/>
3. Save the generated access token. This will be used by the Sumo Logic  configuration for access. <br/><img src={useBaseUrl('img/send-data/slack-copy-user-token.png')} alt="Copy Token" width="500"/>

### Install the Slack App on the Enterprise Grid for Audit API Logs
Only follow these steps if you are installing a Slack App on the Enterprise to monitor Audit API logs. Make sure you have followed the prior steps for creating the Slack app with the appropriate permissions before continuing to this
section. A Slack Enterprise Grid account is required.

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

### Install and Configure the Sumo Logic Slack C2C
1. Add a new source on a Sumo Hosted Collector
2. Search for and select Slack for the source
3. Provide a name for the source
4. Select the Slack collection API you want to collect logs from (Web or Audit)
5. Paste your Slack App access token from the previous steps
