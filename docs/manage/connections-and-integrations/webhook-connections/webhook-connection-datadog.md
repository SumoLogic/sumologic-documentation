---
id: webhook-connection-for-datadog
---

# Webhook Connection for Datadog

Once you set up a webhook connection you can send a Sumo Logic alert to
your Datadog account. For information on how to build your webhook
payload refer to Datadog webhooks in
their [API Help](http://docs.datadoghq.com/integrations/webhooks/).

[Webhook
connections](Set_Up_Webhook_Connections.md "Set Up Webhook Connections") rely
on HTTP endpoints that tell Sumo Logic where to send data. You can set
up any number of connections.

Once you set up the webhook connection you'll have the option to use
it in a [Scheduled
Search](Schedule-Searches-for-Webhook-Connections.md "Schedule Searches for Webhook Connections") or [Monitor](../../../Visualizations-and-Alerts/Alerts/Monitors.md "Monitors").

### Set up a webhook connection for Datadog

You need the ********Manage connections******** [role
capability](../../Users-and-Roles/Manage-Roles/05-Role-Capabilities.md "Role Capabilities") to
create webhook connections.

1.  In the Sumo Logic, go to **Manage Data \> Monitoring�\> Connections**.
2.  On the Connections page click **Add**.
3.  Click **Datadog**.
4.  In the Create Connection dialog, enter the **Name** of the Connection.
5.  (Optional) Enter a **Description** for the Connection.
6.  Enter the **URL** for the endpoint.
7.  (Optional) ********Custom Headers********, enter up to five comma separated key-value pairs.
8.  Under **Payload**, enter a JSON object in the format required by Datadog. For details on variables that can be used as parameters within your JSON object, see [Webhook Payload Variables](Set_Up_Webhook_Connections.md "Set Up Webhook Connections"). 
