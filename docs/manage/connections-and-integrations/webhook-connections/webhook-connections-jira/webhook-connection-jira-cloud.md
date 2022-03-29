---
id: webhook-connection-for-jira-cloud
---

# Webhook Connection for Jira Cloud

You can send JSON payloads from Sumo Logic alerts as an HTTP POST request to create Jira issues in Jira Cloud. Learn more about the Jira REST API in their [Jira Cloud platform Developer Reference](https://developer.atlassian.com/cloud/jira/platform/rest/v2/).

[Webhook connections](../Set_Up_Webhook_Connections.md "Set Up Webhook Connections") rely on HTTP endpoints that tell Sumo Logic where to send data. You can set up any number of connections.

## Prerequisite

To send webhook alerts to Jira Cloud you need to include a Basic Authentication Header with requests. This requires an API token, for reference on creating a token see [API tokens](https://confluence.atlassian.com/cloud/api-tokens-938839638.html) in Atlassian Cloud Support.

1. Generate an API token using your [Atlassian Account](https://id.atlassian.com/manage/api-token).
1. Using the email address of your Atlassian account and an API token you can generate the Basic Authentication Header. In the following cURL command replace `<me@example.com>` with your email address and `<my-api-token>` with your API token and run it: 

   ```
   curl -v https://mysite.atlassian.net --user <me@example.com>:<my-api-token>
   ```    

1. Your response should look like the following image. You'll need the **Authorization** value when configuring the connection in Sumo Logic.

   ![Atlassian Basic Authentication.png](../../../static/img/Connections-and-Integrations/Webhook-Connections/Webhook_Connections_for_Jira/Webhook_Connection_for_Jira_Cloud/Atlassian%20Basic%20Authentication.png)

## Configuration in Sumo Logic

In Sumo Logic, Scheduled Searches and Monitors send alerts to other
tools via webhook connections. To send alerts from Sumo Logic to
Jira Cloud:

1. [Create a Webhook Connection](./Webhook_Connection_for_Jira_Cloud.md).
1. Use the Webhook Connection as the Alert Type in a [Scheduled Search](../Schedule-Searches-for-Webhook-Connections.md "Schedule Searches for Webhook Connections") or the Connection Type in a [Monitor](../../../../Visualizations-and-Alerts/Alerts/Monitors.md "Monitors").

### Create a Webhook Connection

:::note
You need the **Manage connections** [role capability] (../../../Users-and-Roles/Manage-Roles/05-Role-Capabilities.md) to create webhook connections.
:::

1. Go to **Manage Data \> Monitoring \> Connections**.
1. On the **Connections** page click the **+** icon at the top-right of the table.
1. Select the **Jira** option.   ![Jira webhook button.png](../../../static/img/Connections-and-Integrations/Webhook-Connections/Webhook_Connections_for_Jira/Webhook_Connection_for_Jira_Cloud/Jira%20webhook%20button.png)
1. In the **Create Jira Connection** dialog: 1.  Enter a **Name** for the Connection. 2.  (Optional) Enter a **Description** for the Connection. 3.  Enter a **URL** from the Jira REST API to create issues. For example, to create an issue: `https:/\<jira_cloud_instanc\>/rest/api/2/``issue` See the [Jira Cloud platform Developer Reference](https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-group-Issues "https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-group-Issues") for details on acceptable request URLs. 4.  Enter your **Authorization Header** from the prerequisite. It should be in the format: `  Basic\<random strin\>`   5.  (Optional) **Custom Headers**, enter up to five comma     separated key-value pairs. 6.  The following input fields are automatically updated in the     JSON **Payload** and vice versa. Update them to meet your     requirements. At a minimum, you'll need to enter a valid Project     Key.     * **Issue Type**     * **Project Key**     * **Issue Summary**     * **Priority** (optional)     * **Issue Description** 7.  The following JSON is an example of the default **Payload**, you     can customize it as needed. For details on the variables you can     use as parameters within your JSON object, see [Webhook Payload     Variables](../Set_Up_Webhook_Connections.md "Set Up Webhook Connections").              `{           "fields": {             "issuetype": {               "name": "Bug"             },             "project": {               "key": "Sumo_Logic             },             "summary": "{{Name}}",             "priority": {               "id": "3"             },             "description": "{{QueryUrl}}"           }         }`              Details on how to format your payload are available in the [Jira     Cloud platform Developer     Reference](https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-group-Issues "https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-group-Issues").         8.  Click **Save**.

### Create a Scheduled Search

Scheduled searches are saved searches that run automatically at specified intervals. When a scheduled search is configured to send an alert, it can be sent to another tool using a webhook connection.

To set up a scheduled search for a webhook connection follow the steps in the [Schedule Searches for Webhook Connections](../Schedule-Searches-for-Webhook-Connections.md) document.
