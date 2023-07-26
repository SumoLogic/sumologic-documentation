---
id: collect-logs-azure-monitor
title: Collect Logs from Azure Monitor
sidebar_label: Collecting Logs
description: Instructions for configuring a pipeline for shipping logs available from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP source on an hosted collector in Sumo Logic.
---

To collect logs from the Azure Monitor, if you are not using the Sumo Logic FedRamp deployment,  use the new [Cloud to Cloud Integration for Azure](../../hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source.md) to create the source and use the same source category while installing the app. 

:::note
The sections below are either for FedRamp Sumo Logic deployments or if you have been advised by the Sumo Logic support team to not use the Cloud to Cloud Integration based on your Azure environments. 
:::

This page provides instructions for setting up log collection from Azure. Click a link to jump to a topic:

 * [Solution](#solution)
 * [Configure log collection](#configure-log-collection)
 * [Troubleshooting log collection](#troubleshooting-log-collection)
 * [Azure error when exporting logs](#azure-error-when-exporting-logs)
 * [Common Azure function errors.](#common-azure-function-errors)
 * [Azure Integration FAQs](#azure-integration-faqs)

## Solution

Here’s how the solution fits together:

* Azure Monitor collects logs for most Microsoft Azure services and streams the data to an Azure Event Hub. 
* Azure Event Hubs is a data streaming platform and event ingestion service. In this pipeline, an Event Hub streams the logs collected by Azure Monitor to an Azure function. 
* The Azure function is a small piece of code that is triggered by Event Hub to send logs to the Sumo HTTP Source, function logs to one Storage Account, and failover data to another.

For more information about the solution strategy, see [Azure Monitoring](/docs/send-data/collect-from-other-data-sources/azure-monitoring).

![Azure-logs.png](/img/send-data/Azure-logs.png)

:::note
This section has instructions for configuring a pipeline for shipping logs available from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a Hosted Collector in Sumo Logic. Azure Monitor collects metrics and as well as logs. The pipeline described below is for logs, not metrics.
:::

## Configure log collection 

This section has instructions for setting up the ingestion pipeline, from Azure Monitor all the way to Sumo Logic.  

### Step 1. Configure an HTTP Source 

In this step, you configure an HTTP Source to receive logs from the Azure function.

1. Select a hosted collector where you want to configure the HTTP Source. If desired, create a new hosted collector, as described on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
1. Configure an HTTP Source, as described on [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics). 

### Step 2. Configure Azure resources using ARM template

In this step, you use a Sumo-provided Azure Resource Manager (ARM) template to create an Event Hub, an Azure function and two Storage Accounts. The Azure function is triggered by Event Hub. Two storage accounts are used to store log messages from the Azure function and failover data from Event Hub.

1. Download the [azuredeploy_logs.json ](https://s3.amazonaws.com/appdev-cloudformation-templates/azuredeploy_logs.json) ARM template.
1. Go to **Template deployment** in the Azure Portal.

    ![azure-template-deploy.png](/img/send-data/azure-template-deploy.png)

1. Click **Create**.
1. On the **Custom deployment** blade, click **Build your own template in the editor.**
1. Copy the contents of `azuredeploy_logs.json`, and paste it into the editor window.

    ![copy-azure-deploy.png](/img/send-data/copy-azure-deploy.png)

1. Click **Save.**
1. Now you are back on the **Custom deployment** blade.

   1. Create a new Resource Group (recommended) or select an existing one.
   1. Choose Location.
   1. In the **Sumo Endpoint URL** field, enter the URL of the HTTP Source you configured in [Step 1](#step-1-configure-an-http-source).
   1. Agree to the terms and conditions.
   1. Click **Purchase**.

    ![pipeline-custom-deployment.png](/img/send-data/azure-custom-deployment.png)

1. Verify the deployment was successful by looking at **Notifications** at the top right corner of Azure Portal.

    ![go-to-resource-group.png](/img/send-data/go-to-resource-group.png)

1. **(Optional)** In the same window, you can click **Go to resource group** to verify all resources have been created successfully. You will see something like this:

    ![view-azure-resources.png](/img/send-data/view-azure-resources.png)

1. Go to **Storage accounts** and search for “sumofailmsg”. Click on `“sumofailmsg<random-string>”`.

    ![storage-accts-azure.png](/img/send-data/storage-accts-azure.png)

1. Under **Blob Service**, click **Containers**, then click **+ Container**, enter the Name** azureaudit-failover**, and select **Private** for the **Public Access Level**. Click **OK**.

    ![azure-containers.png](/img/send-data/azure-containers.png)

### Step 3. Push logs from Azure Monitor to Event Hub

Various Azure Services connect to Azure Monitor to send monitoring data to an Event Hub. For more information, see [Azure Monitor: Send monitoring data to an eventhub](https://azure.microsoft.com/en-us/blog/azure-monitor-send-monitoring-data-to-an-event-hub/) and How do I set up [Azure platform monitoring data to be streamed to an event hub?](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitor-stream-monitoring-data-event-hubs#how-do-i-set-up-azure-platform-monitoring-data-to-be-streamed-to-an-event-hub) in Azure help.

We will use **Azure Active Directory** Service as an example to push Audit logs to Event Hub with Azure Monitor.  

1. Login into Azure Portal.
1. Click **Azure Active Directory > Activity > Audit** logs.
1. Click **Export Settings**.
1. You will see the **Diagnostic Settings** blade which will show all your existing settings if any already exist. Click **Edit Setting** if you want to change your existing settings, or click **Add diagnostic setting** to add a new one. You can have a maximum of three settings.
1. Check the **Stream to an event hub box** and click on **Event hub / Configure**.
1. Select an Azure subscription.
1. Select the Event Hubs namespace you created in [Step 2](#step-2-configure-azure-resources-using-arm-template). It should start with `“SumoAzureLogsNamespace<UniqueSuffix>”`. 
1. Select **insights-operational-logs** from the **Select event hub name** dropdown.
1. Select **RootManageSharedAccessKey** from **Select event hub policy name** dropdown.
1. Click **OK** to exit event hub configuration.
1. Check the box under “Logs” labeled “Audit”. 
1. Click **Save**.

    ![diagonostic-settings](/img/send-data/diagonostic-settings.png)

### Troubleshooting log collection

If logs are not flowing into Sumo Logic, follow the steps below to investigate the problem.

#### Verify Configurations

First, make sure that the resources you created above were successfully created.

1. Go to **Resource groups**, and select the resource group you created or selected in [Step 2. Configure Azure resources using ARM Template](#step-2-configure-azure-resources-using-arm-template). You should see the five resources you created: an App Service plan, an App Service, an Event Hubs Namespace, and two Storage accounts.

    ![azure-resources.png](/img/send-data/azure-resources.png)

1. From the left pane of Azure Portal, Click **AppServices**, search for “SumoAzureLogsFunctionApp”. You should find the “SumoAzureLogsFunctionApp\<random-string\>” Function App. Click it. 
1. On the** Function Apps** blade, click **Integrate**. Verify that the **Triggers** field value is “Azure Event Hubs” and the **Outputs** field value is “Azure Blob Storage”.

    ![triggers.png](/img/send-data/azure-triggers.png)

1. In the same window, click the **function app settings** link. Check that the value of the **SumoLogsEndpoint** field matches the HTTP Source URL. 

    ![application-settings.png](/img/send-data/logs-function-app.png)

#### Verify Event Hub is receiving log messages

To verify that events are appearing in your event hub:

1. Navigate to the event hub in the Azure Portal.
1. Click the **Messages** link.
1. Message summary information appears below the chart. Check that the **Incoming Messages** count is greater than zero.

    ![event-hub-messages.png](/img/send-data/event-hub-messages.png)

#### Run the function manually

Perform the steps below to verify that the Azure function is sending messages to Sumo.

1. Click **EventHubs_Logs** under the **Function** blade.
1. Copy and paste the [sample payload](https://s3.amazonaws.com/appdev-cloudformation-templates/TestPayload.json "https://s3.amazonaws.com/appdev-cloudformation-templates/TestPayload.json") into the **Request Body** window 
1. Click **Run**. This sends the test payload to the URL for the HTTP Source you configured.
1. Check the output, and make sure you see “Successfully sent to Sumo” log messages.

    ```
    2018-04-17T20:30:09.681 [Info] Successfully sent to Sumo
    2018-04-17T20:30:09.681 [Info] Sent all data to Sumo. Exit now.
    2018-04-17T20:30:09.681 [Info] Function completed (Success, Id=b6ee4119-dd3e-4ba6-9cbd-484a57f822a0, Duration=90ms)
    ```

1. In Sumo, open a Live Tail tab and make sure you receive the event. Search by the source category you assigned to the HTTP Source that receives the log data, for example:

    `_sourceCategory="azure/ad"`

    ![livetail.png](/img/send-data/livetail.png)

### Azure error when exporting logs 

If you receive an Azure error similar to the following when exporting logs, it means that Azure Active Directory is not associated with an Azure subscription. Follow the instructions to [Associate or add an Azure subscription to your Azure Active Directory tenant](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-subscriptions-associated-directory).

```
An Azure subscription is required to use this capability.
Please create an Azure subscription to get started.
```

### Common Azure function errors.

ExitCode C0000005

ExitCodeString NATIVE ACCESS VIOLATION

Managed Exception = System.AccessViolationException:Attempted to read or write protected memory. This is often an indication that other memory is corrupt.

CallStack - Managed Exception

The above error occurs in certain situations the runtime initiates a host shutdown using HostingEnvironment.InitiateShutdown, for example, when an unhandled global exception occurs, when a function TimeoutException is thrown, or when performance counter thresholds are exceeded (HostHealthMonitor).

If you're using this function for quite some time then we recommend redeploying the solution with new ARM templates.

If the error still persists in BlobTaskProducer function and failure rate > 1% then

\> Increase the time out of the BlobTaskProducer Function to 30 min in host.json by clicking on Appfiles 

![error](/img/send-data/azure-error1.png)

\> Increase the number of min instances in app service plan of the BlobTaskProducer function

1. Go to Monitor > Autoscale

1. Select the resource group in which you deployed the ARM template and select app service plan `(SUMOBRProducerPlan\<suffix\>)` in resource type

    ![arm-template-suffix](/img/send-data/arm-template-suffix.png)

1. Click on Manual scale and set min instance count to 2. You can also use auto scaling to save on costs.

    ![azure-manual-scale](/img/send-data/azure-manual-scale.png)

If the error still persists in BlobTaskConsumer function and failure rate > 1% then you can migrate from Consumption plan to Premium plan by making changes in the ARM template 

```
{
            "comments": "Generalized from resource: '/subscriptions/c088dc46-d692-42ad-a4b6-9a542d28ad2a/resourceGroups/BlobReaderGroup/providers/Microsoft.Web/serverfarms/ConsumerPlan'.",
            "type": "Microsoft.Web/serverfarms",
            "kind": "app",
            "name": "[parameters('serverfarms_ConsumerPlan_name')]",
            "apiVersion": "2018-02-01",
            "location": "[resourceGroup().location]",
            "sku": {
                "name": "P1v2",
                "tier": "PremiumV2",
                "size": "P1v2",
                "family": "Pv2",
                "capacity": 2
            },
            "properties": {
                "maximumElasticWorkerCount": 1,
                "perSiteScaling": false,
                "targetWorkerCount": 0,
                "targetWorkerSizeId": 0,
                "reserved": false,
                "isSpot": false,
                "isXenon": false,
                "hyperV": false
            },
            "dependsOn": []
        },
```

### Azure Integration FAQs 

For answers to frequently asked questions (FAQs) about integrating Azure into an enterprise environment using ARM (Advanced RISC Machine) architecture, see [Azure Integrations using ARM](/docs/integrations/microsoft-azure/arm-integration-faq).
