---
id: troubleshoot-azure-blob-storage-log-collection
title: Troubleshoot Azure Blob Storage Log Collection
sidebar_label: Troubleshooting
description: Follow these steps to learn why log data is not flowing into Sumo from Azure Blob Storage.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

If logs don't start flowing into Sumo Logic after you perform the [Collect Logs from Azure Blob Storage](collect-logs-azure-blob-storage.md) procedure, see the troubleshooting tips below.

## Error while deploying the ARM template

If you received the following error while deploying the ARM template: **The Resource 'X' under resource group 'Y' was not found.**

![Azure_ARM-template-error.png](/img/send-data/Azure_ARM-template-error.png)

If you attempted to redeploy the template after getting this error and used the **same storage account + resource group values** in the first failed deployment, follow these steps.

Refer to [this video](https://sumologic.link/6e020df8d1d7), then redeploy the template, in the following way: 

1. Go to the resource group where the deployment failed
1. Click on Failed deployment, and then click on Microsoft.Template(last deployment) in the next window.
1. Click **Redeploy**, provide the required fields, and click **Purchase**. You should see the successful deployment notification.

![Azure_ARM-template-troubleshoot.png](/img/send-data/Azure_ARM-template-troubleshoot.png)

If you get namespace invalid error make sure it follows the naming convention specified in this [doc](https://docs.microsoft.com/en-us/rest/api/servicebus/create-namespace).

```
{
 "code": "DeploymentFailed",
 "message": "At least one resource deployment operation failed. Please list deployment operations for details. Please see https://aka.ms/DeployOperations for usage details.",
 "details": [
 {
 "code": "BadRequest",
 "message": "{\r\n \"error\":
{\r\n \"message\": \"The specified service namespace is invalid. CorrelationId: fb6a08d9-fc78-4540-a79e-861f1d81fe2e\",\r\n \"code\": \"BadRequest\"\r\n }
\r\n}"
 },
 {
 "code": "BadRequest",
 "message": "{\r\n \"error\":
{\r\n \"message\": \"The specified service namespace is invalid. CorrelationId: fb6a08d9-fc78-4540-a79e-861f1d81fe2e\",\r\n \"code\": \"BadRequest\"\r\n }
\r\n}"
 }
 ]
```

For common deployment errors refer to the following [doc](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/common-deployment-errors). 

## AutoScaling producer function to handle huge load on creating tasks for consumer function

1. Go to the Producer function app.
1. Under **Settings** blade, select **Scale out (App Service plan)**.
1. Select **Rule Based Scaling**.
1. Add your rules based scaling configuration as defined in [Create your first autoscale setting](https://learn.microsoft.com/en-us/azure/azure-monitor/autoscale/autoscale-get-started#create-your-first-autoscale-setting).

<img src={useBaseUrl('img/send-data/autoscalling.png')} alt="autoscalling" style={{border: '1px solid black'}} width="800" />

## Verify configurations

Make sure that the resources you created in the [Collect Logs from Azure Blob Storage](collect-logs-azure-blob-storage.md) procedure were successfully created.

1. Go to Resource groups, and select the resource group you created or selected in [Step 3. Configure Azure resources using ARM Template](collect-logs-azure-blob-storage.md) of the "Collect Logs from Azure Blob Storage" page. You should see resources you created:
   * Two App Service plans. 
   * Three App Services.
   * A Service Bus Namespace.
   * An Event Hubs Namespace.
   * A Storage account.
1. In the left pane of the Azure Portal, click **AppServices**, and search for “SUMOBRTaskConsumer”. You should find the `“SUMOBRTaskConsumer\<random-string\>”` Function App. Click it. 
1. Click the **Application settings** link. Check that the value of the ** SumoLogEndpoint** field matches the HTTP source URL. 

## Verify Block Blob Create Events are getting published

1. Click **All Services**. Go to Event Grid Subscription services. 
1. Select Storage Account and region from the dropdown.
1. Select the Event Subscription created in Step 3 from the list.
1. Click **Metrics.**
1. On the Event Grid Metrics page, check that the **Publish Succeeded** and **Delivery Succeeded** counts are greater than zero.<br/>![event-grid-metrics.png](/img/send-data/event-grid-metrics.png)

## Verify Event Hub is receiving log messages

To verify that events are appearing in your event hub:

1. In the left pane of Azure Portal, Click **Eventhub**.
1. Search for `“SUMOBREventHubNamespace”`. You should find the `“SUMOBREventHubNamespace\<random-string>”` Event Hub Namespace. Click it. 
1. Click the **Messages** link.
1. Message summary information appears below the chart. Check that the **Incoming Messages** count is greater than zero.<br/>  ![eventhub-messages-metrics.png](/img/send-data/eventhub-messages-metrics.png)

## Verify Service Bus Queue is receiving tasks

Go to Service Bus Service from the Azure portal and click on `SUMOBRTaskQueueNamespace\<unique string>` Service Bus Namespace. Check that the incoming messages count is greater than zero.  

![service-bus-metrics.png](/img/send-data/service-bus-metrics.png)

## Verify with LiveTail

In Sumo, open a Live Tail tab and run a search to verify Sumo is receiving events. Search by the source category you assigned to the HTTP Source that receives the log data, for example: `_sourceCategory="azure/ad"`  

For more information about using Live Tail, see [Live Tail](/docs/search/live-tail). 

### Verify Azure Function is not getting Failed

1. Go to Function App.
1. Go to Application Insights.<br/>  ![app-insights](/img/send-data/app-insights.png)
1. Go to Failures section.<br/>  ![failures.png](/img/send-data/failures.png)
1. Click on the Function Name under Operation Name
1. In the top 3 exception types, click on the count it will open a sample exception.
1. Click on any exception it will open an end to end transaction details page where you can click on View all telemetry to view all the logs for that execution.<br/>  ![end-transaction.png](/img/send-data/end-transaction.png)

### Common Azure function errors

`ExitCode C0000005

ExitCodeString NATIVE ACCESS VIOLATION

Managed Exception = System.AccessViolationException:Attempted to read or
write protected memory. This is often an indication that other memory is corrupt.

CallStack - Managed Exception`

The above error occurs in certain situations the runtime initiates a host shutdown via `HostingEnvironment.InitiateShutdown`, for example, when an unhandled global exception occurs, when a function `TimeoutException` is thrown, or when performance counter thresholds are exceeded
(`HostHealthMonitor`).

If you're using this function for quite some time then we recommend redeploying the solution with new ARM templates.

If the error still persists, then

1. If you want to collect metrics only  you can migrate from Consumption plan to Premium plan by making changes in the ARM template.
    ```
    {
                "type": "Microsoft.Web/serverfarms",
                "kind": "app",
                "name": "[parameters('serverfarms_SumoAzureLogsAppServicePlan_name')]",
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
    .
    ```
2. If you want to collect only logs from Azure Monitor, we recommend switching to new [Cloud to Cloud collection for Event hub](../../hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source.md)

`Exception while executing function:  Functions.BlobTaskProducer
StorageError: The table specified does not exists 

RequestId: 87039a85-e002-0042-252ddb36f8000000 Time:2021-02-12T21:12:23`

This error occurs when the FileOffsetMap table is not created inside Table service.
