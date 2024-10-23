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

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Connections**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Monitoring** select **Connections**. You can also click the **Go To...** menu at the top of the screen and select **Connections**. 
1. Click **+** and choose **Cloud SOAR** as the connection type. The **Create Cloud SOAR Connection** dialog is displayed.<br/><img src={useBaseUrl('img/cloud-soar/CSOAR-connection1.png')} alt="New connection" style={{border: '1px solid gray'}} width="600"/>
1. Enter a **Name** and give an optional **Description** to the connection.
1. The **URL** field shows your [Sumo Logic API endpoint](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) followed by `/csoar/v3/incidents/`. For example, `https://api.us2.sumologic.com/api/csoar/v3/incidents/`
1. In **Authorization Header**, enter your basic authentication access information for the header. For example, `Basic <base64 encode <accessId>:<accessKey>>`. For more information, see [Basic Access (Base64 encoded)](/docs/api/getting-started#basic-access-base64-encoded).
1. Click **Save**. After save, the **Templates** dropdown shows a list of all incident templates by name configured in your Cloud SOAR environment.
1. Select a **Template**.
1. The default payload synchronizes with the selected template, and the **Alert Payload** field shows the associated `template_id` field automatically defined in the default payload. A `template_id` is required in the payload in order to configure the connection:

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
1. Click **Save**.
