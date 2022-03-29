---
id: webhook-connection-for-opsgenie
---

# Webhook Connection for Opsgenie

[Webhook
connections](Set_Up_Webhook_Connections.md "Set Up Webhook Connections") rely
on HTTP endpoints that tell Sumo Logic where to send data. You can set
up any number of connections. 

### Sumo Logic to Opsgenie Integration

Sumo Logic alerts can send webhook alerts to Opsgenie that acts as a
dispatcher and determines the right people to notify based on your
on-call schedule.

To add a Sumo Logic integration in Opsgenie, do the following:

1.  Go to [Opsgenie Integration Page](https://app.opsgenie.com/integration#/add/SumoLogic).
2.  Specify the following parameters:

* Provide the Name.
* Add the team who will be notified of Sumo Logic Alerts.
* Copy the **Integration Url**, it is used in Sumo Logic while setting up the Webhook Connection.

For **Free** and **Essentials** plans, you can only add the
integration from the Team Dashboard, use the alternative instructions:
To add an integration directly to a team, navigate to the Team Dashboard
and open the Integrations tab. Click **Add Integration** and search for
Sumo Logic and click **add**.

3.  Click **Save Integration**.

Your configuration in Opsgenie should look something like the following:

![Webhook_Intergration_Example2.png](../../static/img/Connections-and-Integrations/Webhook-Connections/Webhook_Connection_for_Opsgenie/Webhook_Intergration_Example2.png)

### Configuration in Sumo Logic

In Sumo Logic, scheduled searches send alerts to other tools via webhook
connections. To send alerts from Sumo Logic to Opsgenie :

1.  [Create a Webhook Connection](./Webhook_Connection_for_Opsgenie.md "Webhook Connection for Opsgenie").
2.  Once you set up the webhook connection you'll have the option to use it in a [Scheduled Search](Schedule-Searches-for-Webhook-Connections.md "Schedule Searches for Webhook Connections") or [Monitor](../../../Visualizations-and-Alerts/Alerts/Monitors.md "Monitors").

#### Create a Webhook Connection

You need the ********Manage connections******** [role
capability](../../Users-and-Roles/Manage-Roles/05-Role-Capabilities.md "Role Capabilities") to
create webhook connections.

This section demonstrates how to create a webhook connection from Sumo
Logic to Opsgenie.

1.  In Sumo Logic, go to **Manage Data \> Monitoring \> Connections**.
2.  Click **+ Add** and choose **Opsgenie** as the connection type.   ![Opsgenie webhook button.png](../../static/img/Connections-and-Integrations/Webhook-Connections/Webhook_Connection_for_Opsgenie/Opsgenie%20webhook%20button.png)
3.  Enter a **Name** and give an optional **Description** to the connection.
4.  Paste the **Integration Url** from Opsgenie into the **URL** field.
5.  (Optional) Enter an ****Authorization Header****, which may include an authorization token.
6.  (Optional) ********Custom Headers********, enter up to five comma separated key-value pairs.
7.  (Optional) Opsgenie uses the **Priority** value to define the priority of alerts. Edits to the **Priority** value are automatically updated in the JSON payload and vice versa.
8.  The following JSON is the default **Payload**, you can customize it as needed. For details on variables you can use as parameters within your JSON object, see [Webhook Payload Variables](Set_Up_Webhook_Connections.md "Set Up Webhook Connections").      `{       "searchName": "{{Name}}",        "searchDescription": "{{Description}}",        "searchQuery": "{{Query}}",        "searchQueryUrl": "{{QueryUrl}}",        "timeRange": "{{TriggerTimeRange}}",        "fireTime": "{{TriggerTime}}",        "ResultsJson": "{{ResultsJson}}",       "priority": "P3"     }`
9.  Click **Save**.
