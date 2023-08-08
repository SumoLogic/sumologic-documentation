---
id: microsoft-azure-functions
title: Webhook Connection for Microsoft Azure Functions
sidebar_label: Microsoft Azure Functions
description: You can trigger an Azure Function directly from a Sumo Logic alert by configuring a webhook connection.
---

You can trigger an Azure Function directly from a Sumo Logic alert by configuring a webhook connection. Once you set up the webhook connection, you can use it in a [Scheduled Search](schedule-searches-webhook-connections.md). Currently, Azure functions are not supported in [Monitors](/docs/alerts/monitors).

For example, you can create a scheduled search that triggers an Azure function when an administrator changes a user’s permissions. This function can then update a database to document the changes for audit purposes.

## Create an Azure function

First, create an HTTP-triggered Azure function. For more information, see [Azure Functions HTTP triggers and bindings overview](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook?tabs=in-process%2Cfunctionsv2&pivots=programming-language-csharp).

1. Create an Azure function using the template **HttpTrigger-Powershell**.
1. Copy and paste code of the Azure function into the code field. The following example is an HTTP-triggered PowerShell function:
    ```
    $requestBody = Get-Content $req -Raw | ConvertFrom-Json

    "Webhook Triggered"

    $requestBody.text
    $requestBody.raw
    $requestBody.num
    $requestBody.agg

    Out-File -Encoding Ascii -FilePath $res -inputObject "Hello Sumo Logic, from Azure Function"
    ```
1. Click **Save**.
1. Copy the function URL, as you will need it in the next section.

## Create a Webhook connection

You need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities) to create webhook connections.

Configure the Webhook connection to trigger the Azure function:

1. Go to **Manage Data** > **Monitoring** > **Connections**.
1. On the **Connections** page click **Add**.
1. Select **Azure Functions**.
1. In the **Create Connection** dialog, configure:
    * **Name.** Enter the name of the connection.
    * (Optional) **Description**, enter a description for the connection.
    * **URL.** Enter the function URL for the endpoint from the previous section.
    * (Optional) **Authorization Header,** enter an authorization header, which may include an authorization token.
    * (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
    * **Alert Payload**. Enter a JSON object in the format required. For details on variables that can be used as parameters within your JSON object, see [Webhook Payload Variables](set-up-webhook-connections.md). 
    * In the **Recovery Payload** section, you can customize your recovery notification.
1. To test the connection, click **Test Alert or Test Recovery**. If successful, you'll see a `200 OK` response message.
1. Click **Save**.
