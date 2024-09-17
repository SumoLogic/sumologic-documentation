---
id: collect-logs
title: Collect Logs from Azure Blob Storage (append blobs)
sidebar_label: Collect Logs using ARM
description: Configure a pipeline to ship logs from the Azure Blob Storage to an HTTP source on a hosted collector in Sumo Logic.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::info
This section has instructions for configuring a pipeline for shipping logs available from Azure Blob Storage to an Event Hub, on to an Azure Function, and finally to an HTTP source on a hosted collector in Sumo Logic.
:::

## Requirements

* Only General-purpose v2 (GPv2) and Blob storage accounts are supported. This integration does not support General-purpose v1 (GPv1) accounts.
* Configure your storage account in the same location as your Azure Service.
* This solution supports only log files from Blob storage that have file extensions of .csv, .json, .blob, or .log.
* You also need to have Microsoft Authorization/role Assignments/write permissions, so they should be a "User Access Administrator" or "Owner".

## Functional overview

1. You configure the Azure service to export logs to a container in a storage account created for that purpose.
1. The ARM template creates an Event Grid subscription with the storage container as publisher and the event hub (created by the Sumo Logic-provided ARM) as subscriber. Event Grid routes append blob creation events to event hub.
1. Event Hub streams the events to the AppendBlobFileTracker Azure function, to create an entry in FileOffSetMap table.
1. Periodically a Azure function named AppendBlobTaskProducer, fetches list of blobs from FileOffSetMap table and creates a task with metadata. (This is a JSON object that includes the start of the append blob, file path, container name and storage name). These tasks are then pushed to Azure Service Bus Queue.
1. The TaskConsumer Azure function, which is triggered when the service bus receives a new task, reads the append blob, from start byte, and sends that data to Sumo Logic.
1. For more information about the solution strategy, see [Azure Blob Storage(append blob)](/docs/send-data/collect-from-other-data-sources/azure-blob-storage/append-blob).

## Step 1. Configure Azure storage account

In this step, you configure a storage account to which you will export monitoring data for your Azure service. The storage account must be a General-purpose v2 (GPv2) storage account.

If you have a storage account with a container you want to use for this purpose, make a note of its resource group, storage account name and container name, and proceed to [Step 2](#step-2-configure-an-http-source).

To configure an Azure storage account, do the following:

1. Create a new storage account General-purpose v2 (GPv2) storage account. For instructions, see [Create a storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-quickstart-create-account?tabs=portal ) in Azure help.
1. Create a container (optional). All services in Azure create containers automatically. This step is needed only when you are exporting custom logs in some container.
   1. In the Azure portal, navigate to the storage account you just created (in the previous step).
   1. Select **Blobs** under **Blob Service**.
   1. Select **+ Container**.
   1. Enter the Name.
   1. Select **Private** for the Public Access Level.
   1. Click **OK**.

:::note
Make a note of the container name, as you will need to supply it later.
:::

## Step 2. Configure an HTTP source

In this step, you configure an HTTP source to receive logs from the Azure function.

1. Select a hosted collector where you want to configure the HTTP source. If desired, create a new hosted collector, as described on [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).
1. Configure an HTTP source as described in [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics). Make a note of the URL for the source because you will need it in the next step.

## Step 3. Configure Azure resources using ARM template

In this step, you use a Sumo Logic-provided Azure Resource Manager (ARM) template to create an Event Hub, three Azure functions, Service Bus Queue, and a Storage Account.

1. Download the [appendblobreaderdeploy.json](https://raw.githubusercontent.com/SumoLogic/sumologic-azure-function/master/AppendBlobReader/src/appendblobreaderdeploy.json) ARM template.
1. Click **Create a Resource**, search for **Template deployment** in the Azure Portal, and then click **Create.**
1. On the Custom deployment blade, click **Build your own template in the editor**.
1. Copy the contents of the template and paste it into the editor window.<br/><img src={useBaseUrl('/img/send-data/appendblob/appendblob-arm.png')} alt="edit-template" style={{border: '1px solid gray'}} width="800"/>
1. Click **Save**.
1. On the Custom deployment blade, do the following:
   1. Create a new Resource Group (recommended) or select an existing one.
   1. Choose Location.
   1. Set the values of the following parameters:
     * **DeployingAgainForSameStorageAccount**. Choose 'yes' if you are deploying the ARM template again for the same storage account, else choose 'no'.
     * **EventGridSystemTopicName**. If you are deploying the ARM template again for the same storage account, then provide the existing System Topic Name for the StorageAccount, else it will be created automatically.<br/><img src={useBaseUrl('/img/send-data/appendblob/appendblob-reuse-sa.png')} alt="edit-template" style={{border: '1px solid gray'}} width="800"/>
     * **SumoEndpointURL**. URL for the HTTP source you configured in [Step 2](#step-2-configure-an-http-source) above.
     * **StorageAccountName**. Name of the storage account where you are storing logs from the Azure Service that you configured in [Step 1](#step-1-configure-azure-storage-account) above.
     * **StorageAccountResourceGroupName**. Name of the resource group of the storage account you configured in [Step 1](#step-1-configure-azure-storage-account) above.
     * **StorageAccountRegion**. Name of the region of the storage account you configured in [Step 1](#step-1-configure-azure-storage-account) above.
     * **Filter Prefix** (Optional). If you want to filter logs from a specific container, enter the following by replacing the variable with your container name: `/blobServices/default/containers/<container_name>/`
    :::note
    Resource group names should not consist of an underscore.
    :::
1. Go to the **Review + create** tab, and then click **Create**.<br/><img src={useBaseUrl('/img/send-data/appendblob/appendblob-rg.png')} alt="Azure_Blob_Storage_Custom_Deploymente" style={{border: '1px solid gray'}} width="400"/>
1. Verify that the deployment was successful by looking at **Notifications** at the top right corner of the Azure Portal.<img src={useBaseUrl('/img/send-data/appendblob/appendblob-notification.png')} alt="Notifications" style={{border: '1px solid gray'}} width="800"/>
1. (Optional) In the same window, click **Go to resource group** to verify that all resources were successfully created, such as shown in the following example: <br/><img src={useBaseUrl('/img/send-data/appendblob/appendblob-resources.png')} alt="Azure_Blob_all-resources" style={{border:"1px solid gray"}} width="800"/>

:::tip
If logs from Azure Blob Storage do not start to flow into Sumo Logic, see [Troubleshoot Azure Blob Storage Log Collection](/docs/send-data/collect-from-other-data-sources/azure-blob-storage/troubleshoot-log-collection).
:::

## Ingesting from multiple storage accounts (optional)

If you want to ingest data into Sumo Logic from multiple storage accounts, perform the following tasks for each storage account separately.

:::note
The following steps assume you have noted down the resource group name, storage account name, and container name where the blobs will be ingested from.
:::

* [Step 1: Authorize App Service read from storage account](#step-1-authorize-app-service-to-read-from-storage-account) - Enables the Azure functions to read from the storage account.
* [Step 2: Create an Event Grid Subscription](#step-2-create-an-event-grid-subscription) - Subscribes all blob creation events to the Event Hub created by ARM template in [Step 3](#step-3-enabling-vnet-integration-optional) above.
* [Step 3. Enabling Vnet Integration(Optional)](#step-3-enabling-vnet-integration-optional)

### Step 1: Authorize App Service to read from storage account

This section provides instructions on authorizing the App Service to list the storage account key. This enables the Azure function to read from the storage account.

To authorize the App Service to list the storage account key, do the following:

1. Go to **Storage accounts** and click **Access control (IAM)**.

    ![AzureBlob_AccessControl_IAM.png](/img/send-data/AzureBlob_AccessControl_IAM.png)

1. Click the **Add** **+** at the top of the page.

    ![AzureBlob_IAM_Add.png](/img/send-data/AzureBlob_IAM_Add.png)

1. Select **Add role assignment** from dropdown.
1. In the **Add role assignment** window, go to **Role** tab and choose **Storage Blob Data Reader**. Click **Next**. <br/><img src={useBaseUrl('/img/send-data/storage-blob-data-reader.png')} alt="storage-blob-data-reader" width="800"/>
1. In **Members** tab, select **Managed Identity**.
1. In the **Select Managed identities** window:

   * **Subscription**: Choose Pay as you Go.
   * **Managed Identity**: Choose Function App.
   * **Select**:  **SUMOABTaskConsumer\<unique_prefix\>** app services which are created by the ARM template. Click **Select**.
1. Click **Review + assign**.
1. Click **Save**.

### Step 2: Create an event grid subscription

This section provides instructions for creating an event grid subscription that subscribes all blob creation events to the Event Hub created by ARM template in [Step 3](#step-3-enabling-vnet-integration-optional) above.

To create an event grid subscription, do the following:

1. In the left pane of the Azure portal click **All Services**, then search for and click **Event Grid Subscriptions**.

    ![AzureBlob_EventGridSubscriptions.png](/img/send-data/AzureBlob_EventGridSubscriptions.png)

1. At the top of the **Event Subscriptions** page, click **+Event Subscription**.

    ![AzureBlob_EventSubscriptionsPage.png](/img/send-data/AzureBlob_EventSubscriptionsPage.png)

    The Create Event Subscription dialog appears.

    ![AzureBlob_CreatEventSubscription_dialog.png](/img/send-data/AzureBlob_CreatEventSubscription_dialog.png)

1. Specify the following values for **Event Subscription Details**:

   * **Name:** Fill the event subscription name.
   * **Event Schema:** Select **Event Grid Schema**.

1. Specify the following values for **Topic Details**:

   * **Topic Type**. Select Storage Accounts.
   * **Subscription**. Select Pay As You Go.
   * **Resource Group**. Select the Resource Group for the Storage Account to which your Azure service will export logs, from where you want to ingest logs.
   * **Resource**. Select the Storage Account you configured, from where you want to ingest logs.
   * **System Topic Name**. Provide the topic name, if the system topic already exists then it will automatically select the existing topic.
    :::note
    If you do not see your configured Storage Account in the dropdown menu, make sure you met the requirements in [Requirements](#requirements) section.
    :::

1. Specify the following details for Event Types:

   * Uncheck the **Subscribe to all event types** box.
   * Select **Blob Created** from the **Define Event Types** dropdown.

1. Specify the following details for Endpoint Types:

   * **Endpoint Type**. Select **Event Hubs** from the dropdown.
   * **Endpoint.**  Click on **Select an endpoint.**

    The Select Event Hub dialog appears.

    ![AzureBlob_SelectEventHub-EventGrid.png](/img/send-data/AzureBlob_SelectEventHub-EventGrid.png)

1. Specify the following Select Event Hub parameters, then click **Confirm Selection.**

   * **Resource Group**. Select the resource group you created [Step 3](#step-3-enabling-vnet-integration-optional) in which all the resources created by ARM template are present.
   * **Event Hub Namespace**. Select **SUMOABEvtHubNS\<*unique string*\\>**.
   * **Event Hub**. Select **blobreadereventhub** from the dropdown.

1. Specify the following Filters tab options(Optional):

   * Check **Enable subject filtering**.
   * To filter events by container name, enter the following in the **Subject Begins With** field, replacing `<container_name>` with the name of the container from where you want to export logs: `/blobServices/default/containers/<container_name>/`

   ![img](/img/send-data/AzureBlob_FiltersDialog.png)

1. Click **Create**.

1. Verify the deployment was successful by checking **Notifications** in the top right corner of the Azure Portal.

### Step 3: Enabling VNet Integration (Optional)

This assumes that your storage account access is enabled for selected networks.

1. Create a subnet in a virtual network using the instructions in the [Azure documentation](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-manage-subnet#add-a-subnet). If you have multiple accounts in the same region, you can skip step 2 below and use the same subnet and add it to the storage account as mentioned in step 3.
1. Perform below steps for BlobTaskConsumer function app:
   1. Go to **Function App > Settings > Networking**.
   1. Under Outbound traffic, click on Vnet Integration. <br/>![azureblob-outbound](/img/send-data/appendblob/azureappendblob-outbound.png)
   1. Add the Vnet and subnet created in Step 1. <br/>![azureblob-vnet](/img/send-data/azureblob-vnet.png)
   1. Also copy the outbound ip addresses you’ll need to add it in firewall configuration of your storage account. <br/> ![azureblob-outboundip](/img/send-data/azureblob-outboundip.png)
1. Go to your storage account from where you want to collect logs from. Go to Networking and add the same Vnet and subnet. <br/>![azureblob-storageacct](/img/send-data/azureblob-storageacct.png)
1. Add the outbound ip addresses (copied in step 2.iv) from both BlobTaskConsumer function under Firewall with each ip in a single row of Address range column.
1. Verify by going to the subnet. You should see Subnet delegation and service endpoints as shown in the screenshot below. <br/>![azureblob-subnet](/img/send-data/azureblob-subnet.png)

## Azure Append Blob Limitations

1. By default the boundary regex used for json and log files are defined below. You can override it by updating `getBoundaryRegex` method of `AzureBlobTaskConsumer` function.
   * **log**: `'\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}'`
   * **json**: `'\{\\s*\"'`
1. By default, it's assumed that after 48 hours the log file won't be updated. You can override it by setting `MAX_LOG_FILE_ROLLOVER_HOURS` setting in `AppendBlobTaskProducer` function.
1. By default batch size is automatically calculated based on number of files present in the storage account and maximum batch size can be 200MB.
1. `AppendBlobTaskProducer` function sets the lock (for max 30min) and creates the task (in service bus) for the file , and then automatically releases it if `AppendBlobTaskConsumer` fails to process it, if you are seeing queueing delay of more than 30min you can increase `maxlockThresholdMin` in `getLockedEntitiesExceedingThreshold` method of `AppendBlobTaskProducer` function.
1. Log files have a file extension of .json (JSONLines), .blob(JSONLines), .csv, .txt or .log.
    * If the file is .json or .blob, the JSON objects are extracted and sent to Sumo Logic.
    * If the file is .log, .txt or .csv, log lines are sent to Sumo Logic as-is.
1. By default all the data is ingested to single HTTP source if you want to send data to multiple source (recommended in case of different log formats) you can override the `getSumoEndpoint` function in `AppendBlobTaskConsumer` function.
1. Blob file name present in `_sourceName` metadata will be truncated if it exceeds 128 char.

## Collection testing performance numbers

| File creation time in a single storage account | Number of files | Size of each file X Number of files | Sumo Logic Incoming Bytes Rate (MB/sec) | Sumo Logic Incoming Messages Rate (loglines/sec) | Sumo Logic total time taken for full ingestion | Sumo Logic Ingestion (GB) | Sumo Logic log count | Max Latency |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| ~15min | 8000 | 8000 x 5.36 MB  | 23 MB/sec | 11378.49/sec | ~ 27 min | 41.8GB | 81,925,120 | 12.74 min |
| ~29min | 16000 | 16000 x 5.36 MB  | 45.07 MB/sec | 74415.97/sec | ~ 41 min | 79.3GB | 133,948,750 | 11.98 min |
