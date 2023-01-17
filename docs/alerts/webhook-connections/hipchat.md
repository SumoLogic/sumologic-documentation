---
id: hipchat
title: Webhook Connection for HipChat
sidebar_label: HipChat
description: Send data from alerts to HipChat rooms.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/connection-and-integration/hipchat-logo-vector.svg')} alt="icon" width="55"/>

HipChat webhook connections allow you to send Sumo Logic alert results to HipChat rooms. For information on how to build your webhook payload refer to HipChat Webhooks in the [HipChat API documentation](https://developer.atlassian.com/server/hipchat/integrating-with-hipchat/).

Once you set up the webhook connection, you'll have the option to use it in a [Scheduled Search](schedule-searches-webhook-connections.md) or [Monitor](/docs/alerts/monitors).

:::note
[Webhook connections](set-up-webhook-connections.md) rely on HTTP endpoints that tell Sumo Logic where to send data. You can set up any number of connections.
:::

:::note
You'll need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities.md) to create webhook connections.
:::

To set up a webhook connection for HipChat:

1. In Sumo Logic, go to **Manage Data** > **Monitoring** > **Connections**.
1. On the **Connections** page click **Add**.
1. Click **HipChat**.
1. In the **Create Connection** dialog, enter the **Name** of the connection.
1. (Optional) Enter a **Description** for the connection.
1. Enter the **URL** for the endpoint. Find this URL and token in the HipChat integration field **Send messages to this room by posting to this URL**. The URL uses the format: 
    ```
    https://[username].hipchat.com/v2/room/[Room API ID]/notification?auth_token=[token]
    ```
    For more information, see [HipChat API documentation](https://www.hipchat.com/docs/apiv2).
1. (Optional) **Authorization Header**, not required for HipChat. 
1. (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
1. Under **Payload**, enter a JSON object in the format required by HipChat. A default HipChat Payload is provided. For details on variables that can be used as parameters within your JSON object, see [Webhook Payload Variables](set-up-webhook-connections.md). 
1. Click **Save**.
