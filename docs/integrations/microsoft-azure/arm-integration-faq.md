---
id: arm-integration-faq
title: Azure Integration with ARM FAQ
sidebar_label: Azure-ARM Integration FAQ
description: This guide provides answers to frequently asked questions about integrating Azure into an enterprise environment using ARM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-faq.png')} alt="thumbnail icon" width="75"/>

This guide provides answers to frequently asked questions (FAQ) about integrating Azure into an enterprise environment using ARM (Azure Resource Manager) architecture.

## Integration overview

For an introduction to Sumo Logic’s solution for obtaining application and infrastructure data (logs and metrics) for Azure services using Azure Monitor, see [Azure Monitoring](/docs/send-data/collect-from-other-data-sources/azure-monitoring).

For an introduction to Sumo Logic's solution for obtaining logs and metrics using an event-based pipeline for shipping monitoring data from Azure Blob Storage to an HTTP source on Sumo Logic, see [Azure Blog Storage](/docs/send-data/collect-from-other-data-sources/azure-blob-storage).


## General FAQ

This section provides answers for general questions regarding Azure integrations.

#### What types of logs does Azure support?

Azure provides a wide array of configurable security auditing and logging options, as listed in the [Azure logging and auditing](https://docs.microsoft.com/en-us/azure/security/fundamentals/log-audit) documentation.


#### Which node version is supported?

The Sumo Logic app has been tested on v0.10.40, the oldest supported version. The latest available version in Azure is v8.9.4. For information on how to change a node version, see the Azure [Changing node version](https://blogs.msdn.microsoft.com/azureossds/2016/04/20/nodejs-and-npm-versions-on-azure-app-services/) support article.


#### What happens if the template is re-deployed? Are the resources recreated? Is there any data loss?

* If the resource already exists in the resource group and its settings are unchanged, the operation results in no change.
* If you change the settings for a resource, the resource is provisioned with the new settings.
* If you attempt to update the location or type of an existing resource, the deployment fails with an error. Instead, deploy a new resource with the location or type that you need.


#### How do I route logs to different source categories based on log content?

To answer this question, we have to address Event Hub and Blob Storage separately.

For Event Hub, do the following:
1. Go to **SumoAzureLogsFunction** created by the ARM template.
2. Enable **Edit Mode** and edit the **setSourceCategory** function to set the source category. You can also use an if condition to set a different source category for a different message.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-FAQ_EventHub_Logs.png')} alt="Azure ARM FAQs" />

For Blob Storage, do the following:
1. Go to the **BlockTaskConsumer** function created by the ARM template.
2. Enable Edit Mode and edit the **getsourceCategory** function to set the source category based on the metadata(url ,containerName ,blobName ,storageName ,resourceGroupName ,subscriptionId ) present in **serviceBusTask.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-FAQ_BlobStorage_Logs.png')} alt="Azure ARM FAQs" />


#### How do I view Azure function logs?

Go to the function and click the **Logs** tab to view real time logs, as shown in the following example.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-FAQ_View-Logs.png')} alt="Azure ARM FAQs" />


#### How do I export Azure function logs?

To export Azure function logs, do the following:
1. Install [Azure Storage Explorer](https://azure.microsoft.com/en-in/features/storage-explorer/) from [here](https://docs.microsoft.com/en-us/azure/vs-azure-tools-storage-explorer-relnotes).
2. Click **Export**.


<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-FAQ_Export-logs.png')} alt="Azure ARM FAQs" />


### Common Error Messages

* For Event Hub, see  [Event Hub error messages](#event-hub-error-messages).
* For Blob Storage, see [Blob Reader error messages](#blob-reader-error-messages).

## Event Hub FAQs

This page provides answers for frequently asked integration questions about Azure Event Hub.

#### What log sources are supported by Event Hub?

1. Exporting data from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-overview-azure-monitor): Includes the majority of services, including Network Watcher, SQL DB, EventHubs, Cosmos DB, Data Factory, KeyVault, and Stream Analytics export their logs and metrics to Azure Monitor.
   * [Azure Diagnostic Logs](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-overview-of-diagnostic-logs): [Setup](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-stream-diagnostic-logs-to-event-hubs) [Supported Services](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-diagnostic-logs-schema)
   * Supported [Metrics](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-supported-metrics)
   * [Activity Logs](https://docs.microsoft.com/azure/monitoring-and-diagnostics/monitoring-overview-activity-logs): [Setup](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-stream-activity-logs-event-hubs)
1. Security Alerts from Azure Security Center: [Setup](https://docs.microsoft.com/en-us/azure/security-center/security-center-export-data-to-siem)
1. Azure SQL (audit logs are in preview, Diagnostic logs/Activity logs can be exported to event hub)
1. Virtual Machines Activity logs and Diagnostic logs [Setup](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/monitor#logs)
1. Guest OS Monitoring Data via Agent: [Setup](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitor-stream-monitoring-data-event-hubs#how-do-i-set-up-guest-os-monitoring-data-to-be-streamed-to-an-event-hub)
1. Azure Active Directory.


#### What if there is an existing storage account or Event Hub?

* The storage account creation limit per region, per subscription, is 200.
* The limit for the number of Event Hub per namespace is 10.
* You need to update ConnectionStrings (StorageConnectionString for storage account and AzureEventHubConnectionString for Event Hub) and remove the corresponding resource from the template.


#### How is the function scaled?

**To increase the number of parallel instances:** the number of messages are ordered in one partition. By default, messages are distributed in round robin manner. Each Function instance is backed by 1 EventProcessorHost (EPH). EventHub only allows 1 EPH to hold a lease on a partition, but >1 partition can be assigned an EPH. This means the number of EPH <= number of partitions in EventHub. Hence, increasing number of partitions in Event Hub(default maxlimit is 32. You have to raise a support request to increasing it, and this will increase the consumption rate. For more information, see the [Azure Trigger Scaling document](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs#trigger---scaling).

**To increase the number of fetched messages per function:** increase the maxBatchSize(The maximum event count received per receive loop) property in host.json(default is 64) For more information, see  the [Azure Trigger - host.json properties document](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs#trigger---hostjson-properties).


#### How much does it cost?

For specific details, see the following Azure pricing pages:

* [https://azure.microsoft.com/en-in/pricing/details/functions/](https://azure.microsoft.com/en-in/pricing/details/functions/)
* [https://azure.microsoft.com/en-in/pricing/details/event-hubs/](https://azure.microsoft.com/en-in/pricing/details/event-hubs/)
* [https://azure.microsoft.com/en-in/pricing/details/storage/blobs/](https://azure.microsoft.com/en-in/pricing/details/storage/blobs/)


Functions Example:

Function executes 3 million times during the month with  memory consumption of 512 MB, execution duration 1 sec and 64KB is the message size.

Resource consumption:  (512 MB / 1,024(in GB)) * 1sec  * 3 million = 1.5 million GB-sec - 4,00,000 GB-s(free plan) = 1.1 million GB-sec => x 0.000016$/GB-s = 17.6$

Execution consumption:3 million - 1 million(free plan) = 2 million => x 0.20$ = 0.40$

**Cost of Azure Function : 18$**

**Event Hub Example:**

Ingress events(billed in multiples of 64 KB): 3 million * $0.028 per million events = 0.084$

Throughput units(1TU = 1MB/sec ingress events + 2MB/sec egress events + 84GB event storage aggregated across all eventhubs in a namespace): $0.015/hour * 30*24 = 10.8$

**Cost of Event Hub = 10.88$**


**Storage Account Example:**


Assuming General purpose v2 storage accounts in hot tier and worst case scenario of storing all event in storage with 1 message processed per receive loop by azure function

Storage prices: $0.0208 per GB => x (64KB*3 million)*/(1024*1024) Gb per month = 3.66$

Operation prices write operation $0.05 per 10000 requests => * 3 million = 15$

**Cost of Storage Accounts = 18.66$**

**Total = 47.5$**


#### How do I troubleshoot an Event Hub Integration?

For detailed information, see the [Troubleshooting log collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-logs-azure-monitor#Troubleshooting_log_collection) section of the Collect logs for Azure Monitor page. This includes testing the function using **Sample** [Logs](https://s3.amazonaws.com/appdev-cloudformation-templates/TestPayload.json) & [Metrics](https://s3.amazonaws.com/appdev-cloudformation-templates/metrics_fixtures.json).


#### Where can I find historic logs for the Azure function?

1. Install[ Azure Storage Explorer](https://azure.microsoft.com/en-in/features/storage-explorer/).
1. Log in using your Azure Account credentials. Built-in logging uses the storage account specified by the connection string in the AzureWebJobsDashboard app setting.
1. Go to **functionname > Tables > AzureWebJobsHostLogs**. The ones with the "I" partition key are invocation logs, as shown in the previous example.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure_function_historic_logs.png')} alt="Azure ARM FAQs" />


#### What can I do if a function is timing out?


The default timeout for functions on a Consumption plan is 5 minutes. You can increase the value to 10 minutes for the Function App by changing the **functionTimeout** property in the **host.json** file.


#### How do I enable Application Insights?

Follow the instructions in the Microsoft Azure documentation for [Enabling Application Insights integration](https://docs.microsoft.com/en-us/azure/azure-functions/functions-monitoring#enable-application-insights-integration).


#### How can I debug using print statements?

1. Under the **Function app edit mode** section, change the edit mode in **Function App Settings**. You can now edit the function.
2. Enter context.log(“debug statements”) and save.
3. Run using sample logs, as described in [Troubleshooting log collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-logs-azure-monitor#Troubleshooting_log_collection).


#### How do I deploy the ARM template in Azure Gov cloud?

Use this [template](https://appdev-cloudformation-templates.s3.amazonaws.com/azuredeploy_gov_logs.json) which has been customized for Azure Gov cloud to deploy the resources.


#### How do I ensure that the Event Hub is receiving log messages?

If events are not getting into the Event Hub, the event grid subscription publisher settings are not configured properly.

Event Hub error messages:

* **Resources should be in the same region.** Resource `/subscriptions/c088dc46-d692-42ad-a4b6-9a542d28ad2a/resourceGroups/AzureAuditEventHub/providers/Microsoft.Network/networkSecurityGroups/testhimvm-nsg` is in region `eastus` and resource `/subscriptions/c088dc46-d692-42ad-a4b6-9a542d28ad2a/resourcegroups/testresourcegroup/providers/microsoft.eventhub/namespaces/sumoazureaudittf7grgv4prygw` is in region `westus`. This happens while exporting logs or metrics from Azure monitor to Event Hub. The service generating the logs and Event Hub should be deployed in the same region.
* **Create or update activity logprofilesfailure.** If you get this error message in Azure when setting up an Event Hub Export, do the following:
    1. Search for Subscriptions in all services.
    2. Select your subscription > Resource Providers.
    3. Search for and Enable **microsoft.insights**.


## Blob Storage FAQs

This page provides answers for frequently asked integration questions about Azure Blob Storage.


#### What is FileOffsetMap?

FileOffsetMap is a table created in Azure Table Storage that is used for internal bookkeeping. The events generated from Storage Account only contain the blob size, so the Azure functions receive  event messages containing sizes such as 30 bytes, 40 bytes, and 70 bytes in random order along with blob path. Sumo Logic stores a mapping for each file and the current offset to determine the next range.


#### How does the collection mechanism work?

For a summary of how various components are stitched together in the pipeline, see the [Monitoring data flow](/docs/send-data/collect-from-other-data-sources/azure-blob-storage#Monitoring_data_flow) section of the Azure Blog Storage page.


#### How do I scale the function?

From the Application settings page, you can do any of the following to scale the function:
* Increasing the **maxBatchSize** in the **BlobTaskProducer host.json** from function app settings. This fetches more events and creates larger blocks for reading.
* Increasing **maxConcurrentCalls** calls setting in the **BlobTaskConsumer host.json**. It is recommended that you increase it in smaller increments so as to not hit the throttling limit.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure_New_Host_Key.png')} alt="Azure ARM FAQs" />

* Increasing the **prefetchcount** to **2*maxBatchSize**.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-FAQ_Increase_BatchSize.png')} alt="Azure ARM FAQs" />


#### How do I ingest logs from Azure Blob Storage into multiple sourceCategories?

The following is a Field Extraction Rule (FER) solution.

You extract the container name in FERs  and override the `_sourceCategory`  with `_sourceCategory/<containername>` so that when a user searches the new sourcecategory is used. For example:

```
_sourceCategory = azure_logs | json auto | parse field=resource_id  "/NETWORKSECURITYGROUPS/*"
as nsg_name | concat('azure_logs/", nsg_name) as _sourceCategory
```

Another approach is to modify the function to send source category in headers. For more information, see [How do I route logs to different source categories based on log content?”](#how-do-i-route-logs-to-different-source-categories-based-on-log)


#### How do I filter events by container name?

To filter events by container name, do the following:

1. Go to **Event subscription > Filters** tab.
2. Enter the following in the Subject Begins With field, replacing `<container_name>` with the name of the container from where you want to export logs.
   ```sql
   /blobServices/default/containers/<container_name>/
   ```

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-FAQ_Event-Subscription.png')} alt="Azure ARM FAQs" />



#### How do I troubleshoot Blob Storage integration?

* Verify Block Blob Create Events are getting published - If events are not getting created, then either no new blobs are getting created or the event grid subscription subscriber settings is not configured right. For example, the regex for container does not match or the event grid service could be down.
* Verify Event Hub is receiving log messages - If events are not getting into the Event Hub, then the event grid subscription publisher settings are not configured properly.
* Verify Service Bus Queue is receiving tasks - If service bus is not receiving data. there might be something wrong with SUMOBRTaskProducer function. Check the function's invocation logs. For example, the event payload format may have been changed by Microsoft, it's not able to write to service bus, or the service bus may be down.
* Verify with live tail - If you are getting logs into sumo and everything else checked out, then there might be an issue in SUMOBRTaskConsumer function. Check the function's invocation logs. For example, it may not be able to read the from Storage Account, the blob may have been deleted before it was read, or the log format may not be supported.


## Blob Reader error messages

```
Error: The request is being throttled. at client.pipeline.error (D:\home\site\wwwroot\BlobTaskConsumer\node_modules\azure-arm-storage\lib\operations\storageAccounts.js:1444:19) at retryCallback (D:\home\site\wwwroot\BlobTaskConsumer\node_modules\ms-rest\lib\filters\systemErrorRetryPolicyFilter.js:89:9) at retryCallback (D:\home\site\wwwroot\BlobTaskConsumer\node_modules\ms-rest\lib\filters\exponentialRetryPolicyFilter.js:140:9) at D:\home\site\wwwroot\BlobTaskConsumer\node_module...FunctionName: BlobTaskConsumer
```

Solution: Increase the maxBatchSize in BlobTaskProducer's host.json This will fetch more events and will create larger blocks for reading. Then, decrease maxConcurrentCalls calls setting in BlobTaskConsumer's host.json. This will limit the number of concurrent invocations, reducing the number of read requests.

```
Error: HTDECK-JOBCOSTING-API__BE93-2019-05-08-14-e5260b.log"": [48255]} Exception while executing function: Functions.BlobTaskProducer Microsoft.Azure.WebJobs.Host. FunctionInvocationException : Exception while executing function: Functions.BlobTaskProducer ---> System.Exception : StorageError: The table specified does not exist. RequestId:3914a31a-e002-000e-1dad-05a995000000 Time:2019-05-08T14:48:29.9940095Z at async Microsoft.Azure.WebJobs.Script.Description.NodeFunctionInvoker.InvokeCore(Object[] parameters,FunctionInvocationContext context) at C:\projects\azure-webjobs-sdk-script\src\WebJobs.Script\Description\Node\NodeFunctionInvoker.cs : 196
```

Solution: This error comes when FileOffsetMap does not exists. Check and confirm whether you have created the following table in [Step 3: Configure Azure resources using ARM template](/docs/send-data/collect-from-other-data-sources/azure-blob-storage/collect-logs-azure-blob-storage#step-3-configure-azure-resources-using-arm-template), substep 11.

Error: You'll see a Deployment Failed error when roleAssignment is not unique but we are already using resourcegroup.id in a name that is unique. The error details are:  

Tenant ID, application ID, principal ID, and scope are not allowed to be updated. (Code: RoleAssignmentUpdateNotPermitted)

For more information, see the following articles:

* https://social.msdn.microsoft.com/Forums/en-US/5267ce3b-8e48-4b1b-8e40-276006ad23e4/create-roleassignment-fails-with-error-quottenant-id-application-id-principal-id-and-scope-are?forum=WindowsAzureAD
* http://answers.flyppdevportal.com/MVC/Post/Thread/afc10f35-fa20-467e-b927-aeefdbf35eaf?category=azurescripting
* https://social.msdn.microsoft.com/Forums/en-US/5267ce3b-8e48-4b1b-8e40-276006ad23e4/create-roleassignment-fails-with-error-quottenant-id-application-id-principal-id-and-scope-are?forum=WindowsAzureAD

Solution: Create a new resource group for the Sumo Logic collection resources. If that doesn't fix the problem, then change the variables in the ARM template from this:
```
"consumer_roleGuid": "[guid(parameters('sites_blobreaderconsumer_name'), uniqueString(deployment().name, resourceGroup().id))]", \
    "dlq_roleGuid": "[guid(parameters('sites_DLQProcessor_name'), uniqueString(deployment().name, resourceGroup().id))]", \
```

To this:
```
"consumer_roleGuid": "[guid(parameters('sites_blobreaderconsumer_name'), uniqueString(‘<random unique word>’, resourceGroup().id))]", \
    "dlq_roleGuid": "[guid(parameters('sites_DLQProcessor_name'), uniqueString(‘<random unique word>’, resourceGroup().id))]"
```

```
Error: Azure fails to install dependencies on a node.
System.AggregateException : One or more errors occurred.
---> Error: Cannot find module 'azure-storage' \
```

Solution: Run `npm install` from the console.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-FAQ_BlobTaskConsumer.png')} alt="Azure ARM FAQs" />

* Error: Subscription for Microsoft.EventGrid is not registered.

Solution: To register the provider do the following:
1. Go to subscriptions.
2. Select the subscription name where ARM template is deployed.
3. Select the Resource providers under settings on the left.
4. Search for Microsoft.EventGrid and register it.

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-FAQ_Subscriptions.png')} alt="Azure ARM FAQs" />
