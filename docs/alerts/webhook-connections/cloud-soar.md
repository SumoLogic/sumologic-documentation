---
id: cloud-soar
title: Webhook Connection for Cloud SOAR
sidebar_label: Cloud SOAR
description: Create incidents in Cloud SOAR from Monitor and Scheduled Search alerts.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/security/SOC.png')} alt="icon" width="50"/>

[Cloud SOAR](/docs/cloud-soar) can receive alerts from Sumo Logic Monitors and Scheduled Searches to create Incidents. First, you'll need to create a Cloud SOAR connection. Then you can use the connection as the Connection Type in a [Monitor](/docs/alerts/monitors) or the Alert Type in a [Scheduled Search](schedule-searches-webhook-connections.md).

:::caution before you begin
* You need to have Cloud SOAR enabled on your account for this connection to be available.
* You'll need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities) to create webhook connections.
:::

To create a webhook connection from Sumo Logic to Cloud SOAR:

1. In Sumo Logic, go to **Manage Data** > **Monitoring** > **Connections**.
1. Click **+ Add** and choose **Cloud SOAR** as the connection type.<br/> <img src={useBaseUrl('img/connection-and-integration/SOAR-webhook-icon.png')} alt="SOAR webhook icon.png" width="200"/>
1. Enter a **Name** and give an optional **Description** to the connection.
1. The **URL** and **Authorization Header** are automatically defined by Sumo Logic. You should not edit these.
1. The **Templates** dropdown shows a list of all incident templates, by name, configured in your Cloud SOAR environment.
1. The default **Payload** synchronizes with the selected template and the associated `template_id` field is automatically defined in the default payload. A `template_id` is required in the payload in order to configure the connection. For details on variables you can use as parameters within your JSON object, see [Webhook Payload Variables](set-up-webhook-connections.md).
1. Click **Save**.
