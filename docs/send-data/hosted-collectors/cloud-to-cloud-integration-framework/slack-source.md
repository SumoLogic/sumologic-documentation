---
id: slack-source
title: Slack Source
sidebar_label: Slack
description: Install the Slack Source for Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/slack.png')} alt="Thumbnail icon" width="60"/>

This topic describes the Slack Source, part of Sumo Logic's [Cloud-to-Cloud Integration Framework](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 24 hours | Web Team Info |
| 24 hours | Web Users List |
| 24 hours | Conversations List |
| 5 mins | Web Team Access Logs |
| 5 mins | Messages |
| 5 mins | Audit Logs |

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

Each Slack API endpoint specifies a [tier rate limit](https://api.slack.com/docs/rate-limits) limiting the C2C in the number of calls it can make to Slack.

## Setup

### Vendor configuration

The Slack source can collect data from Slack's [Web API](https://api.slack.com/web) and
[Audit API](https://api.slack.com/admins/audit-logs). The Web API is used to collect standard channel, user, and message information from a specific workspace. The Audit API is used to collect security audit events across the entire account
including all workspaces, but it requires a Slack Enterprise Grid license. Each  API collects different information; collect from both if you have a Slack Enterprise Grid license.

We recommend creating a Slack App for each Slack Workspace you want to monitor. This requires a Sumo Logic Slack C2C per Slack Workspace. If you have a Slack Enterprise Grid account, you can create an additional Slack app, install it on the Enterprise Grid instead of a Workspace and create another Sumo Logic C2C to monitor your Enterprise Grid audit logs from the Audit API.

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
Only follow these steps if you are installing a Slack App on a specific workspace to monitor Web API logs. Please ensure
you have followed the prior steps for creating the Slack app with the appropriate permissions before continuing to this
section.

1. On the app settings page, click **Install App** and the **Install to Workspace** button. <br/><img src={useBaseUrl('img/send-data/slack-install-app-to-workspace.png')} alt="slack-install-app-to-workspace.png" width="650"/>
2. Allow your new Slack App to monitor your workspace. <br/><img src={useBaseUrl('img/send-data/slack-app-allow.png')} alt="Allow App to Monitor Workspace" width="450"/>
3. Save the generated access token. This will be used by the Sumo Logic  configuration for access. <br/><img src={useBaseUrl('img/send-data/slack-copy-user-token.png')} alt="Copy Token" width="500"/>

#### Install the Slack App on the Enterprise Grid for Audit API Logs
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

### Source configuration

When you create a Slack Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Create a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Slack Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Slack**.
1. Enter a **Name** for the Source. The **Description** is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **API Auth Bearer Token**. Enter the Slack App access token from the previous steps.
1. **Slack API Collection**. Select the Slack collection API you want to collect logs from (Web or Audit).
1. **Polling Interval in Minutes**. Enter the frequency in minutes for collecting the data. Default is 5 mins.

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/slack/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/slack/example.tf
```

## Limitation

While ingesting web events, this source supports a maximum of 16,000 active Slack channels, exceeding this limit may cause the source to return a `FIRST-PARTY-GENERIC` error type. Archived Slack channels are not supported while ingesting the web events.

## Troubleshoot

Collecting real-time Slack messages from Slack channels and understanding the C2C polling interval is a common question.

The C2C is limited in the number of API calls it can make to the Slack API documented in the [Slack API rate limits page](https://api.slack.com/docs/rate-limits). The C2C will gather a list of your non-archived Slack channels and collect new messages from each channel for the polling interval. The default polling interval is 5 minutes. The rate limits on the Slack API for these endpoints use their "Web API Tier 3" limit, which is 50 requests per minute.

This means if you have 1000 active Slack channels, it will take the C2C a minimum of 20 minutes to iterate through all the channels checking for new messages. The poll cycle will not start again until last one finishes. Let's say the poll cycle starts at 10:00 and does not complete until 10:20, then the next poll cycle will start immediately at 10:20. Additionally more time may be added if the C2C has to paginate to gather more than 1000 Slack messages from a single channel.

Each page adds to the overall number of API calls needed and adds time due to the Slack API rate limits. Sumo Logic recommends you archive any Slack channels no longer used. This will prevent the C2C from checking for new messages in channels without activity.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
