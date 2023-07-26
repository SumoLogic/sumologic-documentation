---
id: opsgenie-legacy
title: Webhook Connection for Opsgenie (Legacy)
sidebar_label: Opsgenie (Legacy)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/opsgenie.png')} alt="Thumbnail icon" width="50"/>

[Webhook connections](set-up-webhook-connections.md) rely on HTTP endpoints that tell Sumo Logic where to send data. You can set up any number of connections. 

## Sumo Logic to Opsgenie Integration

You can monitor your infrastructure using Sumo Logic’s schedule search and send Webhook alerts to Opsgenie which manages these alerts and determines the right on-call person to notify.

To add a Sumo Logic integration in Opsgenie, do the following:

1. Go to [Opsgenie Integration Page](https://app.opsgenie.com/integration#/add/SumoLogic).
1. Specify the following parameters:
   * Provide the Name.
   * Add the team who will be notified of Sumo Logic Alerts.
   * Copy the Integration URL, to be used in Sumo Logic while setting up the Webhook Connection.
   :::note
   For **Free** and **Essentials** plans, you can only add the integration from the Team Dashboard. Use the alternative instructions. To add an integration directly to a team, navigate to the Team Dashboard and open the Integrations tab. Click **Add Integration** and search for Sumo Logic and click **add**.
   :::
1. Click **Save Integration**.

Your final configurations at Opsgenie should look like this:

![Webhook_Intergration_Example2.png](/img/connection-and-integration/opsgenie-legacy.png)

## Configuration on Sumo Logic

In Sumo Logic, scheduled searches send alerts to other tools via webhook connections. To send alerts from Sumo Logic to Opsgenie :

1. [Create a Webhook](#create-a-webhook).
1. [Use the Webhook in a Sumo scheduled search configuration](#configure-a-scheduled-search).

### Create a webhook

:::note
You need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities.md) to create webhook connections.
:::

This section demonstrates how to create a webhook connection from Sumo Logic to Opsgenie.

To create a webhook:

1. In Sumo Logic, go to **Manage Data > Alerts > Connections**.
1. Click **+ Add** and choose **Webhook** as connection type.
1. For the name, enter **Sumo Logic Opsgenie** and give an optional description to the connection.
1. Paste the URL (used in [step 2](#configure-a-scheduled-search)) into the **URL** field.
1. Enter the following content in the **Alert Payload** field:
    :::note
    Opsgenie uses the priority value in the Payload field to define the priority of alerts. For this reason, you should change the priority to match your needs.
    :::
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
      "SourceURL": "{{SourceURL}}"
    }
    ```
1. To test the connection, click **Test Alert**. If successful, you'll see a `200 OK` response message.
1. Click **Save**.

### Configure a Scheduled Search

Scheduled searches are saved searches that run automatically at specified intervals. When a scheduled search is configured to send an alert, it can be sent to another tool using a webhook connection.

To set up a scheduled search for a webhook connection follow the steps in the [Schedule Searches for Webhook Connections](schedule-searches-webhook-connections.md) document.
