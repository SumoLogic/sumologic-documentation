---
id: microsoft-teams
title: Webhook Connection for Microsoft Teams
sidebar_label: Microsoft Teams
description: Send notifications from alerts to Microsoft Teams.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/MSTeams.png')} alt="thumbnail icon" width="50"/>

[Webhook connections](set-up-webhook-connections.md) rely on HTTP endpoints that tell Sumo Logic where to send data. You can set up any number of connections. 

## Prerequisite

See how to [create an incoming webhook](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) in Microsoft's documentation. Make sure that you **copy and save the URL** from Microsoft, you'll need to provide it to Sumo Logic in the **URL** input field when you create the Microsoft Teams Connection.

## Configuration in Sumo Logic

In Sumo Logic, Scheduled Searches and Monitors send alerts to other tools via webhook connections. To send alerts from Sumo Logic to Microsoft Teams:

1. [Create a Microsoft Teams Connection](#create-a-microsoft-teams-connection).
1. Use the Webhook Connection as the Alert Type in a [Scheduled Search](schedule-searches-webhook-connections.md) or the Connection Type in a [Monitor](/docs/alerts/monitors).

## Create a Microsoft Teams Connection

:::note
You need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities.md) to create webhook connections.
:::

This section demonstrates how to create a webhook connection from Sumo Logic to Microsoft Teams.

1. In Sumo Logic, go to **Manage Data** > **Monitoring** > **Connections**.
1. Click **+ Add** and choose **Microsoft Teams** as the connection type.<br/> ![Microsoft Teams webhook connection tile.png](/img/connection-and-integration/ms-teams-webhook-connection-tile.png)
1. Enter a **Name** and give an optional **Description** to the connection.
1. Paste the **URL** from Microsoft Teams into the **URL** field.
1. (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
1. Customize the **Activity Title** if desired, the default is `Monitor Alert: {{TriggerType}} on {{Name}}`.
1. (Optional) Customize the **Activity Subtitle** if desired, the default is `Created On Date: {{TriggerTime}}`.
1. (Optional) Customize the **Card Text** if desired, the default is `{{Description}}`.
    :::note
    Edits to the **Activity Title**, **Activity Subtitle**, and **Card Text** values are automatically updated in the JSON payload and vice versa.
    :::
1. The following JSON is the default **Alert Payload**, which you can customize as needed. For details on variables you can use as parameters within your JSON object, see [Webhook Payload Variables](set-up-webhook-connections.md).
    ```json
    {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "#000099",
    "summary": "Monitor Alert: {{TriggerType}} on {{Name}}",
    "sections": [
        {
        "activityTitle": "Monitor Alert: {{TriggerType}} on {{Name}}",
        "activitySubtitle": "Created On Date: {{TriggerTime}}",
        "activityImage": "https://www.sumologic.com/wp-content/uploads/sumo-logic-logo.png",
        "text": "{{Description}}",
        "facts": [
            {
            "name": "Monitor Query",
            "value": "{{Query}}"
            },
            {
            "name": "Trigger Condition",
            "value": "{{TriggerCondition}}"
            },
            {
            "name": "Trigger Value",
            "value": "{{TriggerValue}}"
            },
            {
            "name": "Trigger Time Range",
            "value": "{{TriggerTimeRange}}"
            },
            {
            "name": "Results",
                "value": "{{ResultsJson}}"
            }
        ],
        "markdown":"true"
        }
    ],
    "potentialAction": [
        {
        "@type": "OpenUri",
        "name": "View Monitor Query",
        "targets": [
            {
            "os": "default",
            "uri": "{{QueryURL}}"
            }
        ]
        }
    ]
    }
    ```
1. In the **Recovery Payload** section, you can customize your recovery notification.
1. To test the connection, click **Test Alert or Test Recovery**. If successful, you'll see a `200 OK` response message.
1. Click **Save**.
