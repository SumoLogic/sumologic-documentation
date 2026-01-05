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

<img src={useBaseUrl('img/connection-and-integration/opsgenie-legacy.png')} alt="Webhook integration example" style={{border: '1px solid gray'}} width="800" />

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

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Monitoring > Connections**. You can also click the **Go To...** menu at the top of the screen and select **Connections**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Connections**. 
1. On the **Connections** page, click **+ Add**.
1. For **Connection Type**, select **Webhook** from the dropdown.
1. In the **Connection Settings** dialog, enter:
    * **Name**. Enter **Sumo Logic Opsgenie** as the name for the connection.
    * (Optional) **Description**. Enter a description for the connection.
    * **URL**. Enter the URL (used in [step 2](#configure-a-scheduled-search)) into the **URL** field.
    * (Optional) **Authorization Header**. Enter an authorization header, which may include an authorization token.
    * (Optional) **Custom Headers**. Enter up to five comma separated key-value pairs.
1. Enter the following content in the **Alert Payload** field:
    :::note
    Opsgenie uses the priority value in the payload field to define the priority of alerts. For this reason, you should change the priority to match your needs.
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
1. Under **Recovery Payload**, you can customize your recovery notification.
1. Click **Test Alert** or **Test Recovery** to test the connection. If successful, you'll see a `200 OK` response message.
1. Click **Save**.

### Configure a Scheduled Search

Scheduled searches are saved searches that run automatically at specified intervals. When a scheduled search is configured to send an alert, it can be sent to another tool using a webhook connection.

To set up a scheduled search for a webhook connection follow the steps in the [Schedule Searches for Webhook Connections](schedule-searches-webhook-connections.md) document.
