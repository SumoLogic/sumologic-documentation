---
id: webhook-connection-for-microsoft-azure-functions
---

# Webhook Connection for Microsoft Azure Functions

You can trigger an Azure Function directly from a Sumo Logic alert by
configuring a webhook connection. Once you set up the webhook connection
you'll have the option to use it in a [Scheduled
Search](Schedule-Searches-for-Webhook-Connections.md "Schedule Searches for Webhook Connections") or [Monitor](../../../Visualizations-and-Alerts/Alerts/Monitors.md "Monitors").

For example, you can create a scheduled search that triggers an Azure
function when an administrator changes a user’s permissions. This
function can then update a database to document the changes for audit
purposes.

### Create an Azure function

First, create an HTTP-triggered Azure function. For more information,
see:\<https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhoo\>

1.  Create an Azure function using the template **HttpTrigger-Powershell**.
2.  Copy and paste code of the Azure function into the code field. The following example is an HTTP-triggered PowerShell function:

&nbsp;
 $requestBody = Get-Content $req -Raw | ConvertFrom-Json
 "Webhook Triggered"
 $requestBody.text $requestBody.raw $requestBody.num $requestBody.agg

 Out-File -Encoding Ascii -FilePath $res -inputObject "Hello Sumo Logic, from Azure Function"

3.  Click **Save**.
4.  Copy the function URL, as you will need it in the next section.

### Create a Webhook connection

You need the ********Manage connections******** [role
capability](../../Users-and-Roles/Manage-Roles/05-Role-Capabilities.md "Role Capabilities") to
create webhook connections.

Configure the Webhook connection to trigger the Azure function.

1.  Go to **Manage Data \> Monitoring \> Connections**.
2.  On the **Connections** page click **Add**.
3.  Select **Azure Functions**.
4.  In the **Create Connection** dialog, configure: 1.  **Name.** Enter the name of the connection. 2.  (Optional) **Description**, enter a description for the     connection. 3.  **URL.** Enter the function URL for the endpoint from the     previous section. 4.  (Optional) **Authorization Header,** enter an authorization     header, which may include an authorization token. 5.  (Optional) ****Custom Headers****, enter up to five comma     separated key-value pairs. 6.  **Payload.** Enter a JSON object in the format required. For     details on variables that can be used as parameters within your     JSON object, see [Webhook Payload     Variables](Set_Up_Webhook_Connections.md "Set Up Webhook Connections"). 
5.  Click **Test Connection**. If the connection is made, you will see a 200 OK response message.
6.  Click **Save**.
