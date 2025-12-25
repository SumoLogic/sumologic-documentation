---
id: jira-service-desk
title: Webhook Connection for Jira Service Desk
sidebar_label: Jira Service Desk
description: Create Jira issues in Jira Service Desk from alerts.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/jira.png')} alt="Thumbnail icon" width="40"/>

You can send JSON payloads from Sumo Logic alerts as an HTTP POST request to create Jira issues in Jira Service Desk. Learn more about the REST API in their [Jira Cloud platform Developer Reference](https://developer.atlassian.com/cloud/jira/platform/rest/v2/).

[Webhook connections](/docs/alerts/webhook-connections/set-up-webhook-connections) rely on HTTP endpoints that tell Sumo Logic where to send data. You can set up any number of connections.

## Prerequisites

To send webhook alerts to Jira Service Desk you need to include a Basic Authentication Header with requests. This requires an API token, for reference on creating a token see [API tokens](https://confluence.atlassian.com/cloud/api-tokens-938839638.html) in Atlassian Cloud Support.

1. Generate an API token using your [Atlassian Account](https://id.atlassian.com/manage/api-tokens).
1. Using the email address of your Atlassian account and an API token, you can generate the Basic Authentication Header. In the following cURL command replace `<me@example.com>` with your email address and `<my-api-token>` with your API token and run it:
   ```bash
   curl -v https://mysite.atlassian.net --user <me@example.com>:<my-api-token>
   ```
1. Your response should look like the following image. You'll need the **Authorization** value when configuring the connection in Sumo Logic.<br/><img src={useBaseUrl('img/connection-and-integration/Atlassian-Basic-Authentication.png')} alt="Atlassian Basic Authentication" style={{border: '1px solid gray'}} width="800" />

## Configuration in Sumo Logic

In Sumo Logic, Scheduled Searches and Monitors send alerts to other tools via webhook connections. To send alerts from Sumo Logic to Jira Service Desk:

1. [Create a Webhook Connection](#create-a-webhook-connection).
1. Use the Webhook Connection as the Alert Type in a [Scheduled Search](/docs/alerts/webhook-connections/schedule-searches-webhook-connections) or the Connection Type in a [Monitor](/docs/alerts/monitors).

## Create a Webhook Connection

:::note
You need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities.md) to create webhook connections.
:::

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Monitoring > Connections**. You can also click the **Go To...** menu at the top of the screen and select **Connections**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Connections**. 
1. On the **Connections** page, click **+ Add**.
1. For **Connection Type**, select **Jira** from the dropdown.
1. In the **Connection Settings** dialog, enter:
   * **Name**. Enter a name for the Connection.
   * (Optional) **Description**. Enter a Description for the Connection.
   * **URL**. Enter a **URL** from the Jira REST API to create issues. For example, to create an issue:
      ```
      https://<jira_cloud_instance>/rest/api/2/issue
      ```
      :::note
      See the [Jira Cloud platform Developer Reference](https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-group-Issues) for details on acceptable request URLs.
      :::
   * **Authorization Header**. Enter your **Authorization Header** from the [prerequisites](#prerequisites). For example, `Basic <random string>`.
   * (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
   * The following input fields are automatically updated in the JSON **Payload** and vice versa. Update them to meet your requirements. At a minimum, you'll need to enter a valid Project Key.
      * **Issue Type**
      * **Project Key**
      * **Issue Summary**
      * (optional) **Priority**
      * **Issue Description**
1. The following JSON is an example of the default **Alert Payload**, which you can customize. For details on the variables you can use as parameters within your JSON object, see [Webhook Payload Variables](/docs/alerts/webhook-connections/set-up-webhook-connections).
   ```json
   {
   "fields": {
      "issuetype": {
         "name": "IT Help"
      },
      "project": {
         "key": "DEMO"
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

To set up a scheduled search for a webhook connection follow the steps in the [Schedule Searches for Webhook Connections](/docs/alerts/webhook-connections/schedule-searches-webhook-connections) document.
