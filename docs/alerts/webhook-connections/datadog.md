---
id: datadog
title: Webhook Connection for Datadog
sidebar_label: Datadog
description: Datadog webhook connections allow you to alert and connect to your Datadog services from Sumo Logic alert results.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src='https://upload.wikimedia.org/wikipedia/en/7/7e/Datadog_logo.svg' alt="icon" width="50"/>

Once you set up a webhook connection, you can send a Sumo Logic alert to your Datadog account. For information on how to build your webhook
payload refer to Datadog webhooks in their [API Help](http://docs.datadoghq.com/integrations/webhooks/).

[Webhook connections](set-up-webhook-connections.md) rely on HTTP endpoints that tell Sumo Logic where to send data. You can set up any number of connections.

Once you set up the webhook connection, you'll have the option to use it in a [Scheduled Search](schedule-searches-webhook-connections.md) or [Monitor](/docs/alerts/monitors).

:::note
You'll need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities) to create webhook connections.
:::

1. In the Sumo Logic, go to **Manage Data** > **Monitoring** > **Connections**.
1. On the Connections page click **Add**.
1. Click **Datadog**.
1. In the Create Connection dialog, enter the **Name** of the Connection.
1. (Optional) Enter a **Description** for the Connection.
1. Enter the **URL** for the endpoint.
1. (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
1. Under **Alert Payload**, enter a JSON object in the format required by Datadog. For details on variables that can be used as parameters within your JSON object, see [Webhook Payload Variables](set-up-webhook-connections.md). 
1. To test the connection, click **Test Alert**. If successful, you'll see a `200 OK` response message.
1. Click **Save**.
