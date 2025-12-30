---
id: cloud-soar
title: Webhook Connection for Cloud SOAR
sidebar_label: Cloud SOAR
description: Create incidents in Cloud SOAR from Monitor and Scheduled Search alerts.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/security/SOC.png')} alt="icon" width="50"/>

[Cloud SOAR](/docs/cloud-soar) can receive alerts from Sumo Logic Monitors and Scheduled Searches to create Incidents. First, you'll need to create a Cloud SOAR connection. Then you can use the connection as the Connection Type in a [Monitor](/docs/alerts/monitors) or the Alert Type in a [Scheduled Search](schedule-searches-webhook-connections.md).

:::warning before you begin
* You need to have Cloud SOAR enabled on your account for this connection to be available.
* You'll need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities) to create webhook connections.
:::

You can configure a webhook connection to allow you to send an alert from a scheduled search to Sumo Logic Cloud SOAR using an incident template.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Monitoring > Connections**. You can also click the **Go To...** menu at the top of the screen and select **Connections**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Connections**. 
1. On the **Connections** page, click **+ Add**.
1. For **Connection Type**, select **Cloud SOAR** from the dropdown.
1. In the **Connection Settings** dialog, enter:
    * **Name**. Enter a name for the connection.
    * (Optional) **Description**. Enter a description for the connection.
    * **URL**. The URL field displays your [Sumo Logic API endpoint](/docs/api/about-apis/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) followed by `/csoar/v3/incidents/`. For example, `https://api.us2.sumologic.com/api/csoar/v3/incidents/`.
    * **Authorization Header**. Enter your basic authentication access information for the header. For example, `Basic <base64 encode <accessId>:<accessKey>>`. For more information, see [Basic Access (Base64 encoded)](/docs/api/about-apis/getting-started#basic-access-base64-encoded).
    * Select a template from the **Templates** dropdown.
      The **Templates** dropdown shows a list of all incident templates by name configured in your Cloud SOAR environment.
1. Under **Alert and Recovery Payloads**, the default payload synchronizes with the selected template, and the **Alert Payload** field shows the associated `template_id` field automatically defined in the default payload.
A `template_id` is required in the payload in order to configure the connection:

    ```
    {
      "template_id": <Template ID>,
     "fields": {
        "incidentid": "Incident Id"
      }
    }
    ```

    You can add additional variables. For example:

    ```
    {
      "fields": {
        "description": "string",
        "additional_info": "string",
        "starttime": "ISO-8601 datetime string",
        "incident_kind": <ID incident kind>,
        "incident_category": <ID incident category>,
        "status": <ID incident status>,
        "restriction": <ID incident restriction>
      }
    }
    ```
    :::note
    * For details on variables you can use as parameters within your JSON object, see [Configure Webhook Payload Variables](/docs/alerts/webhook-connections/set-up-webhook-connections/#configure-webhook-payload-variables).
    * For information on additional fields, please refer to the [Cloud SOAR APIs](/docs/api/cloud-soar/) documentation.
    * The preceding example shows an `ISO-8601 datetime string`. For information about how to configure it, see [parser documentation](https://dateutil.readthedocs.io/en/stable/parser.html#dateutil.parser.isoparse).
    :::
1. Click **Test Alert**. If the connection is made to your Cloud SOAR function successfully, you will see a `200 OK` response message.
1. Click **Save**.