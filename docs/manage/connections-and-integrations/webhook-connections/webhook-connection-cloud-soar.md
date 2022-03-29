---
id: webhook-connection-for-cloud-soar
---

# Webhook Connection for Cloud SOAR

[Cloud
SOAR](https://www.sumologic.com/solutions/cloud-soar/ "https://www.sumologic.com/solutions/cloud-soar/") can
receive alerts from Sumo Logic Monitors and Scheduled Searches to create
Incidents. First, you'll need to create a Cloud SOAR connection. Then
you can use the connection as the Connection Type in a
[Monitor](../../../Visualizations-and-Alerts/Alerts/Monitors.md "Monitors") or
the Alert Type in a [Scheduled
Search](Schedule-Searches-for-Webhook-Connections.md "Schedule Searches for Webhook Connections").

You need to have [Cloud
SOAR](https://www.sumologic.com/solutions/cloud-soar/ "https://www.sumologic.com/solutions/cloud-soar/")
enabled on your account for this connection to be available.

#### Create a Cloud SOAR Connection

You need the ********Manage connections******** [role
capability](../../Users-and-Roles/Manage-Roles/05-Role-Capabilities.md "Role Capabilities") to
create webhook connections.

This section demonstrates how to create a webhook connection from Sumo
Logic to Cloud SOAR.

1.  In Sumo Logic, go to **Manage Data \> Monitoring \> Connections**.
2.  Click **+ Add** and choose **Cloud SOAR** as the connection type.   ![SOAR webhook icon.png](../../static/img/Connections-and-Integrations/Webhook-Connections/Webhook_Connection_for_Cloud_SOAR/SOAR%20webhook%20icon.png)
3.  Enter a **Name** and give an optional **Description** to the connection.
4.  The **URL** and **Authorization Header** are automatically defined by Sumo Logic. You should not edit these.
5.  The **Templates** dropdown shows a list of all incident templates, by name, configured in your Cloud SOAR environment.
6.  The default **Payload** synchronizes with the selected template and the associated `template_id` field is automatically defined in the default payload. A `template_id` is required in the payload in order to configure the connection. For details on variables you can use as parameters within your JSON object, see [Webhook Payload Variables](Set_Up_Webhook_Connections.md "Set Up Webhook Connections").
7.  Click **Save**.
