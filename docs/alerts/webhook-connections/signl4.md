---
id: signl4
title: Webhook Connection for SIGNL4
sidebar_label: SIGNL4
description: Send alerts to SIGNL4 from scheduled searches.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('https://raw.githubusercontent.com/signl4/signl4-logo/main/signl4.png')} alt="Thumbnail icon" width="50"/>


You can set up [webhook connections](/docs/alerts/webhook-connections/set-up-webhook-connections) rely on HTTP endpoints that tell Sumo Logic where to send data.

## Sumo Logic to SIGNL4 Integration

Sumo Logic alerts can send webhook alerts to SIGNL4, a mobile alerting and incident management solution that determines the right people to alert based on your on-call schedule, severity, and topic.

To add a Sumo Logic integration in SIGNL4, do the following:

1. Go to the [SIGNL4 Integration Hub](https://account.signl4.com/manage/IntegrationHub?tabName=installedApps).
1. Select an existing webhook integration or create a new one for the Sumo Logic integration.
1. In the integration tile, copy the URL including integration or team secret.

You'll need the webhook URL for Sumo Logic configuration, which you'll do in the next section.

You can find more information on the [SIGNL4 site](https://www.signl4.com/blog/portfolio_item/sumo_logic_mobile_alerting/).

## Configuration in Sumo Logic

In Sumo Logic, scheduled searches send alerts to other tools via webhook connections. To send alerts from Sumo Logic to SIGNL4:

1. [Create a Webhook Connection](#create-a-webhook-connection).
1. Once you set up the webhook connection, you'll have the option to use it in a [Scheduled Search](/docs/alerts/webhook-connections/schedule-searches-webhook-connections)  or [Monitor](/docs/alerts/monitors).

## Create a Webhook Connection

:::note
You need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities) to create webhook connections.
:::

This section demonstrates how to create a webhook connection from Sumo Logic to SIGNL4.

To create a webhook:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Connections**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Monitoring** select **Connections**. You can also click the **Go To...** menu at the top of the screen and select **Connections**. 
1. Click **+ Add** and choose **Webhook** as connection type.
1. For the name, enter **Sumo Logic SIGNL4** and give an optional description to the connection.
1. Paste the SIGNL4 webhook URL (from the step above) into the **URL** field.
1. Enter the following content in the **Alert Payload** field:
    ```json
    {
      "AlertName": "{{AlertName}}",
      "Description": "{{Description}}",
      "action": "create",
      "AlertURL": "{{AlertResponseURL}}",
      "Query": "{{Query}}",
      "QueryURL": "{{QueryURL}}",
      "TriggerTime": "{{TriggerTime}}",
      "TriggerTimeRange": "{{TriggerTimeRange}}",
      "TriggerCondition": "{{TriggerCondition}}",
      "TriggerValue": "{{TriggerValue}}",
      "TriggerType": "{{TriggerType}}",
      "ResultsJson": "{{ResultsJSON}}",
      "DetectionMethod": "{{DetectionMethod}}",
      "MonitorType": "{{MonitorType}}",
      "NumQueryResults": "{{NumQueryResults}}",
      "SourceURL": "{{SourceURL}}",
      "X-S4-ExternalID": "{{IncidentKey}}",
      "X-S4-Status": "new",
      "X-S4-SourceSystem": "SumoLogic"

    }
    ```
1. Under the **Recovery Payload**:
   * This part is optional for closing alerts in SIGNL4 if the incident is recovered in Sumo Logic.
   ```json
   {
      "X-S4-ExternalID": "{{IncidentKey}}",
      "X-S4-Status": "resolved",
      "X-S4-SourceSystem": "SumoLogic"
    }
    ```
     :::note
     Do not update the `X-S4-...` fields, otherwise recovery notifications will not be generated.
     :::
1. To test the connection, click **Test Alert**. If successful, you'll see a `201 OK` response message.
1. Click **Save**.

### Configure a Scheduled Search

Scheduled searches are saved searches that run automatically at specified intervals. When a scheduled search is configured to send an alert, it can be sent to another tool using a webhook connection.

To set up a scheduled search for a webhook connection follow the steps in [Schedule Searches for Webhook Connections](/docs/alerts/webhook-connections/schedule-searches-webhook-connections).