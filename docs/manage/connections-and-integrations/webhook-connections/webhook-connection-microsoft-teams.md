---
id: webhook-connection-for-microsoft-teams
---

# Webhook Connection for Microsoft Teams

[Webhook
connections](Set_Up_Webhook_Connections.md "Set Up Webhook Connections") rely
on HTTP endpoints that tell Sumo Logic where to send data. You can set
up any number of connections. 

### Prerequisite

See how to [create an incoming
webhook](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook "https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook") in
Microsoft's documentation. Make sure that you ****copy and save the
URL**** from Microsoft, you'll need to provide it to Sumo Logic in
the **URL** input field when you create the Microsoft Teams Connection.

### Configuration in Sumo Logic

In Sumo Logic, Scheduled Searches and Monitors send alerts to other
tools via webhook connections. To send alerts from Sumo Logic to
Microsoft Teams:

1.  [Create a Microsoft Teams Connection](./Webhook_Connection_for_Microsoft_Teams.md "Webhook Connection for Microsoft Teams").
2.  Use the Webhook Connection as the Alert Type in a [Scheduled Search](Schedule-Searches-for-Webhook-Connections.md "Schedule Searches for Webhook Connections") or the Connection Type in a [Monitor](../../../Visualizations-and-Alerts/Alerts/Monitors.md "Monitors").

#### Create a Microsoft Teams Connection

You need the ********Manage connections******** [role
capability](../../Users-and-Roles/Manage-Roles/05-Role-Capabilities.md "Role Capabilities") to
create webhook connections.

This section demonstrates how to create a webhook connection from Sumo
Logic to Microsoft Teams.

1.  In Sumo Logic, go to **Manage Data \> Monitoring \> Connections**.
2.  Click **+ Add** and choose **Microsoft Teams** as the connection type.   ![Microsoft Teams webhook connection tile.png](../../static/img/Connections-and-Integrations/Webhook-Connections/Webhook_Connection_for_Microsoft_Teams/Microsoft%20Teams%20webhook%20connection%20tile.png)
3.  Enter a **Name** and give an optional **Description** to the connection.
4.  Paste the **URL** from Microsoft Teams into the **URL** field.
5.  (Optional) ********Custom Headers********, enter up to five comma separated key-value pairs.
6.  Customize the **Activity Title** if desired, the default is `Monitor Alert: {{TriggerType}} on {{Name}}`.
7.  (Optional) Customize the **Activity Subtitle** if desired, the default is `Created On Date: {{TriggerTime}}`.
8.  (Optional) Customize the **Card Text** if desired, the default is `{{Description}}`. Edits to the **Activity Title**, **Activity Subtitle**, and **Card Text** values are automatically updated in the JSON payload and vice versa.
9.  The following JSON is the default **Payload**, you can customize it as needed. For details on variables you can use as parameters within your JSON object, see [Webhook Payload Variables](Set_Up_Webhook_Connections.md "Set Up Webhook Connections").      `{       "@type": "MessageCard",       "@context": "http://schema.org/extensions",       "themeColor": "#000099",       "summary": "Monitor Alert: {{TriggerType}} on {{Name}}",       "sections": [         {           "activityTitle": "Monitor Alert: {{TriggerType}} on {{Name}}",           "activitySubtitle": "Created On Date: {{TriggerTime}}",           "activityImage": "https://www.sumologic.com/wp-content/uploads/sumo-logic-logo.png",           "text": "{{Description}}",           "facts": [             {               "name": "Monitor Query",               "value": "{{Query}}"             },             {               "name": "Trigger Condition",               "value": "{{TriggerCondition}}"             },             {               "name": "Trigger Value",               "value": "{{TriggerValue}}"             },             {               "name": "Trigger Time Range",               "value": "{{TriggerTimeRange}}"             },             {                "name": "Results",                 "value": "{{ResultsJson}}"             }           ],           "markdown":"true"         }       ],       "potentialAction": [         {           "@type": "OpenUri",           "name": "View Monitor Query",           "targets": [             {               "os": "default",               "uri": "{{QueryURL}}"             }           ]         }       ]     }`    
10. Click **Save**.
