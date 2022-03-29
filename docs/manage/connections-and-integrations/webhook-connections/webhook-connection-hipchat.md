---
id: webhook-connection-for-hipchat
---

# Webhook Connection for HipChat

HipChat webhook connections allow you to send Sumo Logic
alert results to HipChat rooms. For information on how to build
your webhook payload refer to HipChat Webhooks in the [HipChat API
documentation](https://developer.atlassian.com/server/hipchat/integrating-with-hipchat/ "https://developer.atlassian.com/server/hipchat/integrating-with-hipchat/").

Once you set up the webhook connection you'll have the option to use
it in a [Scheduled
Search](Schedule-Searches-for-Webhook-Connections.md "Schedule Searches for Webhook Connections") or [Monitor](../../../Visualizations-and-Alerts/Alerts/Monitors.md "Monitors").

### Set up HipChat webhook connections

[Webhook
connections](Set_Up_Webhook_Connections.md "Set Up Webhook Connections")
rely on HTTP endpoints that tell Sumo Logic where to send data. You can
set up any number of connections.

You need the ****Manage connections**** [role
capability](../../Users-and-Roles/Manage-Roles/05-Role-Capabilities.md "Role Capabilities")
to create webhook connections.

**To set up a webhook connection for HipChat**

1.  In Sumo Logic, go to **Manage Data \> Monitoring�\> Connections**.
2.  On the **Connections** page click **Add**.
3.  Click **HipChat**.
4.  In the **Create Connection** dialog, enter the **Name** of the connection.
5.  (Optional) Enter a **Description** for the connection.
6.  Enter the **URL** for the endpoint. Find this URL and token in the HipChat integration field **Send messages to this room by posting to this URL**. The URL uses the format: `https://[username].hipchat.com/v2/room/[Room API ID]/notification?auth_token=[token]`    (For more information, see [HipChat API documentation](https://www.hipchat.com/docs/apiv2).)
7.  (Optional)** Authorization Header**, not required for HipChat. 
8.  (Optional) ****Custom Headers****, enter up to five comma separated key-value pairs.
9.  Under **Payload**, enter a JSON object in the format required by HipChat. A default HipChat Payload is provided. For details on variables that can be used as parameters within your JSON object, see [Webhook Payload Variables](Set_Up_Webhook_Connections.md "Set Up Webhook Connections"). 
10. Click **Save**.
