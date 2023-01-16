---
id: jira-cloud
title: Webhook Connection for Jira Cloud
sidebar_label: Jira Cloud
description: Create Jira issues in Jira Cloud from alerts.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/jira.png')} alt="Thumbnail icon" width="40"/>

You can send JSON payloads from Sumo Logic alerts as an HTTP POST request to create Jira issues in Jira Cloud. Learn more about the Jira REST API in their [Jira Cloud platform Developer Reference](https://developer.atlassian.com/cloud/jira/platform/rest/v2/).

[Webhook connections](/docs/alerts/webhook-connections/set-up-webhook-connections) rely on HTTP endpoints that tell Sumo Logic where to send data. You can set up any number of connections.

## Prerequisite

To send webhook alerts to Jira Cloud you need to include a Basic Authentication Header with requests. This requires an API token, for reference on creating a token see [API tokens](https://confluence.atlassian.com/cloud/api-tokens-938839638.html) in Atlassian Cloud Support.

1. Generate an API token using your [Atlassian Account](https://id.atlassian.com/manage/api-token).
1. Using the email address of your Atlassian account and an API token, you can generate the Basic Authentication Header. In the following cURL command, replace `<me@example.com>` with your email address and `<my-api-token>` with your API token and run it:
    ```bash
    curl -v https://mysite.atlassian.net --user <me@example.com>:<my-api-token>
    ```    
1. Your response should look like the following image. You'll need the **Authorization** value when configuring the connection in Sumo Logic.<br/> ![Atlassian Basic Authentication.png](/img/connection-and-integration/Atlassian-Basic-Authentication.png)

## Configuration in Sumo Logic

In Sumo Logic, Scheduled Searches and Monitors send alerts to other tools via webhook connections. To send alerts from Sumo Logic to Jira Cloud:

1. [Create a Webhook Connection](#create-a-webhook-connection).
1. Use the Webhook Connection as the Alert Type in a [Scheduled Search](/docs/alerts/webhook-connections/schedule-searches-webhook-connections) or the Connection Type in a [Monitor](/docs/alerts/monitors).

## Create a Webhook Connection

:::note
You need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities.md) to create webhook connections.
:::

1. Go to **Manage Data** > **Monitoring** > **Connections**.
1. On the **Connections** page click the **+** icon at the top-right of the table.
1. Select the **Jira** option. In the **Create Jira Connection** dialog, fill out connection information.<br/>  ![Jira webhook button.png](/img/connection-and-integration/Jira-webhook-button.png)
1. Enter a **Name** for the Connection.
1. (Optional) Enter a **Description** for the Connection.
1. Enter a **URL** from the Jira REST API to create issues. For example, to create an issue:
   ```
   https://<jira_cloud_instance>/rest/api/2/issue
   ```
   :::note
   See the [Jira Cloud platform Developer Reference](https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-group-Issues) for details on acceptable request URLs.
   :::
1. Enter your **Authorization Header** from the prerequisite. It will be in the format: `Basic <random string>`
1. (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
1. The following input fields are automatically updated in the JSON **Payload** and vice versa. Update them to meet your requirements. At a minimum, you'll need to enter a valid Project Key.
   * **Issue Type**
   * **Project Key**
   * **Issue Summary**
   * **Priority** (optional)
   * **Issue Description**
1. The following JSON is an example of the default **Alert Payload**, you can customize it as needed. For details on the variables you can use as parameters within your JSON object, see [Webhook Payload Variables](/docs/alerts/webhook-connections/set-up-webhook-connections).
   ```
   {
   "fields": {
      "issuetype": {
         "name": "Bug"
      },
      "project": {
         "key": "Sumo_Logic
      },
      "summary": "{{Name}}",
      "priority": {
         "id": "3"
      },
      "description": "{{QueryUrl}}"
      }
   }
   ```
  Details on how to format your payload are available in the [Jira Cloud platform Developer Reference](https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-group-Issues).
1. To test the connection, click **Test Alert**. If successful, you'll see a `200 OK` response message.  
1. Click **Save**.

## Create a Scheduled Search

Scheduled searches are saved searches that run automatically at specified intervals. When a scheduled search is configured to send an alert, it can be sent to another tool using a webhook connection.

To set up a scheduled search for a webhook connection, follow the steps in the [Schedule Searches for Webhook Connections](/docs/alerts/webhook-connections/schedule-searches-webhook-connections) document.
