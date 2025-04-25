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
You need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities) to create webhook connections.
:::

This section demonstrates how to create a webhook connection from Sumo Logic to Microsoft Teams using Microsoft's Workflows.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Connections**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Monitoring** select **Connections**. You can also click the **Go To...** menu at the top of the screen and select **Connections**. 
1. Click **+ Add** and choose **Microsoft Teams** as the connection type.<br/> ![Microsoft Teams webhook connection tile.png](/img/connection-and-integration/ms-teams-webhook-connection-tile.png)
1. Enter a **Name** and give an optional **Description** to the connection.
1. Paste the **URL** from Microsoft Teams into the **URL** field.
1. (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
1. (Optional) Customize the alert and resolution payloads to include just the information you need.
   One helpful tool to preview changes is [Microsoft's Adaptive Card Designer](https://adaptivecards.io/designer/). The best way to use the tool is to copy the contents of the `"content"` field (including the enclosing curly braces) from the below default payload and work from there.
1. The following JSON is the default **Alert Payload**, which you can customize as needed.  For details on variables you can use as parameters within your JSON object, see [Configure Webhook payload variables](/docs/alerts/webhook-connections/set-up-webhook-connections/#configure-webhook-payload-variables).
    ```json
    {
      "type": "message",
      "attachments": [
        {
          "contentType": "application/vnd.microsoft.card.adaptive",
          "contentUrl": null,
          "content": {
            "type": "AdaptiveCard",
            "body": [
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "Image",
                        "style": "Person",
                        "url": "https://www.sumologic.com/wp-content/uploads/sumo-logic-logo.png",
                        "altText": "Sumo Logic",
                        "size": "Small"
                      }
                    ],
                    "width": "auto"
                  },
                  {
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                      {
                        "type": "TextBlock",
                        "spacing": "None",
                        "text": "Monitor Alert: {{TriggerType}} on {{Name}}",
                        "weight": "Bolder",
                        "wrap": true
                      },
                      {
                        "type": "TextBlock",
                        "text": "Created On Date: {{TriggerTime}}",
                        "wrap": true
                      }
                    ]
                  }
                ]
              },
              {
                "type": "FactSet",
                "facts": [
                  {
                    "title": "Description",
                    "value": "{{Description}}"
                  },
                  {
                    "title": "Monitor Query",
                    "value": "{{Query}}"
                  },
                  {
                    "title": "Trigger Condition",
                    "value": "{{TriggerCondition}}"
                  },
                  {
                    "title": "Trigger Value",
                    "value": "{{TriggerValue}}"
                  },
                  {
                    "title": "Trigger Time Range",
                    "value": "{{TriggerTimeRange}}"
                  },
                  {
                    "title": "Results",
                    "value": "{{ResultsJson}}"
                  }
                ]
              }
            ],
            "schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.4",
            "actions": [
              {
                "type": "Action.OpenUrl",
                "title": "View Alert",
                "url": "{{AlertResponseURL}}"
              }
            ]
          }
        }
      ]
    }
    ```
1. In the **Recovery Payload** section, you can customize your recovery notification. Here is the default payload:
    ```json
    {
      "type": "message",
      "attachments": [
        {
          "contentType": "application/vnd.microsoft.card.adaptive",
          "contentUrl": null,
          "content": {
            "type": "AdaptiveCard",
            "body": [
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "Image",
                        "style": "Person",
                        "url": "https://www.sumologic.com/wp-content/uploads/sumo-logic-logo.png",
                        "altText": "Sumo Logic",
                        "size": "Small"
                      }
                    ],
                    "width": "auto"
                  },
                  {
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                      {
                        "type": "TextBlock",
                        "spacing": "None",
                        "text": "Monitor Alert: {{TriggerType}} on {{Name}}",
                        "weight": "Bolder",
                        "wrap": true
                      },
                      {
                        "type": "TextBlock",
                        "text": "Created On Date: {{TriggerTime}}",
                        "wrap": true
                      }
                    ]
                  }
                ]
              },
              {
                "type": "FactSet",
                "facts": [
                  {
                    "title": "Description",
                    "value": "{{Description}}"
                  },
                  {
                    "title": "Monitor Query",
                    "value": "{{Query}}"
                  },
                  {
                    "title": "Trigger Condition",
                    "value": "{{TriggerCondition}}"
                  },
                  {
                    "title": "Trigger Value",
                    "value": "{{TriggerValue}}"
                  },
                  {
                    "title": "Trigger Time Range",
                    "value": "{{TriggerTimeRange}}"
                  },
                  {
                    "title": "Results",
                    "value": "{{ResultsJson}}"
                  }
                ]
              }
            ],
            "schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.4",
            "actions": [
              {
                "type": "Action.OpenUrl",
                "title": "View Alert",
                "url": "{{AlertResponseURL}}"
              }
            ]
          }
        }
      ]
    }
    ```
1. To test the connection, click **Test Alert or Test Recovery**. If the message is sent to Teams successfully, you'll see a `202` response message. Check Teams to ensure the message appears as expected.
1. Click **Save**.


## Create a Microsoft Teams Connection using Connectors

This section demonstrates how to create a webhook connection from Sumo Logic to Microsoft Teams using Microsoft's Connectors.

Microsoft has announced that using Connectors for integration is on the path to deprecation.
The suggested way to integrate is by using Workflows.
If you still require integration using a Connector, follow the directions above but substitute the following default payloads:

1. The following JSON is the default **Alert Payload**, which you can customize as needed. For details on variables you can use as parameters within your JSON object, see [Configure Webhook payload variables](/docs/alerts/webhook-connections/set-up-webhook-connections/#configure-webhook-payload-variables).
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
1. In the **Recovery Payload** section, you can customize your recovery notification. Here is the default payload:
    ```json
    {
        "@type": "MessageCard",
        "@context": "http://schema.org/extensions",
        "themeColor": "569E0D",
        "summary": "Monitor Alert: {{TriggerType}} on {{AlertName}}",
        "sections": [{
            "activityTitle": "Monitor Alert: {{TriggerType}} on {{AlertName}}",
            "activitySubtitle": "Created On Date : {{TriggerTime}}",
            "activityImage": "https://www.sumologic.com/wp-content/uploads/sumo-logic-logo.png",
            "text": "The monitor has resolved",
            "facts": [{
                    "name": "Monitor Query",
                    "value": "{{Query}}"
                }, {
                    "name": "Resolution Condition",
                    "value": "{{TriggerCondition}}"
                },
                {
                    "name": "Resolution Value",
                    "value": "{{TriggerValue}}"
                },
                {
                    "name": "Resolution Time Range",
                    "value": "{{TriggerTimeRange}}"
                }
            ],
            "markdown": true
        }],
        "potentialAction": [{
            "@type": "OpenUri",
            "name": "View Monitor Query",
            "targets": [{
                "os": "default",
                "uri": "{{QueryURL}}"
            }]
        }]
    }
    ```
