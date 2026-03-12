---
id: datadog
title: Webhook Connection for Datadog
sidebar_label: Datadog
description: Datadog webhook connections allow you to alert and connect to your Datadog services from Sumo Logic alert results.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src='https://upload.wikimedia.org/wikipedia/en/7/7e/Datadog_logo.svg' alt="icon" width="50"/>

Once you set up a webhook connection, you can send a Sumo Logic alert to your Datadog account. For information on how to build your webhook
payload refer to Datadog webhooks in their [API Help](https://docs.datadoghq.com/integrations/webhooks/).

[Webhook connections](set-up-webhook-connections.md) rely on HTTP endpoints that tell Sumo Logic where to send data. You can set up any number of connections.

Once you set up the webhook connection, you'll have the option to use it in a [Scheduled Search](schedule-searches-webhook-connections.md) or [Monitor](/docs/alerts/monitors).

:::note
You'll need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities) to create webhook connections.
:::

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Monitoring > Connections**. You can also click the **Go To...** menu at the top of the screen and select **Connections**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Connections**.
1. On the **Connections** page, click **+ Add**.
1. For **Connection Type**, select **Datadog** from the dropdown.<br/><img src={useBaseUrl('img/connection-and-integration/datadog-dropdown.png')} alt="Thumbnail icon" style={{border: '1px solid gray'}} width="500" />
1. In the **Connection Settings** dialog, enter:
    * **Name**. Enter a name for the connection.
    * (Optional) **Description**. Enter a description for the connection.
    * **URL**. Enter the **URL** for the endpoint.
    * (Optional) **Custom Headers**. Enter up to five comma separated key-value pairs.
        <img src={useBaseUrl('img/connection-and-integration/create-new-connection-datadog.png')} alt="Thumbnail icon" style={{border: '1px solid gray'}} width="500" />
1. Under **Alert Payload**, enter a JSON object in the format required by Datadog. For details on variables that can be used as parameters within your JSON object, see [Webhook Payload Variables](set-up-webhook-connections.md). 
1. Click **Test Alert** to test the connection. If the connection is made to your Datadog function successfully, you will see a `200 OK` response message.
1. Click **Save**.
