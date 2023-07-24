---
id: collect-logs-azure-blob-storage
title: Collect Logs from Azure Blob Storage
sidebar_label: Collecting Logs
description: Configure a pipeline to ship logs from the Azure Blob Storage to an HTTP source on a hosted collector in Sumo Logic.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::info
This section has instructions for configuring a pipeline for shipping logs available from Azure Blob Storage to an Event Hub, on to an Azure Function, and finally to an HTTP source on a hosted collector in Sumo Logic. 
:::

## Requirements 

* Only General-purpose v2 (GPv2) and Blob storage accounts are supported. This integration does not support General-purpose v1 (GPv1) accounts.  
* This solution supports only log files from Blob storage that have file extensions of .csv, .json, .blob, or .log. 
* You also need to have Microsoft Authorization/role Assignments/write permissions, so they should be a "User Access Administrator" or "Owner".

## Functional overview

1. You configure the Azure service to export logs to a container in a storage account created for that purpose.
1. The ARM template creates an Event Grid subscription with the storage container as publisher and the event hub (created by the Sumo-provided ARM) as subscriber. Event Grid routes block blob creation events to event hub.
1. Event Hub streams the events to the TaskProducer Azure function, which creates tasks (a JSON object that specifies start and end byte, container name, blob path) and pushes those tasks to the service bus task queue.
1. The TaskConsumer Azure function, which is triggered when the service bus receives a new task, reads the block blob, from start byte to stop byte, and sends that data to Sumo. 
1. The set up also includes failure handling mechanism. For more information about the solution strategy, see [Azure Blob Storage](/docs/send-data/collect-from-other-data-sources/azure-blob-storage).

## Step 1. Configure Azure storage account 

In this step, you configure a storage account to which you will export monitoring data for your Azure service. The storage account must be a General-purpose v2 (GPv2) storage account.

If you have a storage account with a container you want to use for this purpose, make a note of its resource group, storage account name and container name, and proceed to [Step 2](#step-2-configure-an-http-source).

To configure an Azure storage account, do the following:

1. Create a new storage account General-purpose v2 (GPv2) storage account. For instructions, see [Create a storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-quickstart-create-account?tabs=portal ) in Azure help.
1. Create a container(Optional) all services in azure create containers automatically. This step is needed only when you are exporting custom logs in some container.

   * In the Azure portal, navigate to the storage account you just created (in the previous step).
   * Select **Blobs** under **Blob Service**.
   * Select **+ Container**.
   * Enter the Name.
   * Select **Private** for the Public Access Level.
   * Click **OK**.

:::note
Make a note of the container name, you will need to supply it later.
:::

## Step 2. Configure an HTTP source

In this step, you configure an HTTP source to receive logs from the Azure function.

1. Select a hosted collector where you want to configure the HTTP source. If desired, create a new hosted collector, as described on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
1. Configure an HTTP source, as described on [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics). Make a note of the URL for the source, you will need it in the next step.

## Step 3. Configure Azure resources using ARM template

In this step, you use a Sumo-provided Azure Resource Manager (ARM) template to create an Event Hub, three Azure functions, Service Bus Queue, and a Storage Account.

1. Download the [blobreaderdeploy.json](https://raw.githubusercontent.com/SumoLogic/sumologic-azure-function/master/BlockBlobReader/src/blobreaderdeploy.json) ARM template.

    :::note
    The above template uses Consumption Plan which does not support VNet integration, you can use [blobreaderdeploywithPremiumPlan.json](https://raw.githubusercontent.com/SumoLogic/sumologic-azure-function/master/BlockBlobReader/src/blobreaderdeploywithPremiumPlan.json) which uses Elastic Premium plan.
    :::

1. Click **Create a Resource**, search for **Template deployment** in the Azure Portal, and then click **Create.**
1. On the Custom deployment blade, click **Build your own template in the editor**.
1. Copy the contents of the template and paste it into the editor window.<br/><img src={useBaseUrl('/img/send-data/edit-template.png')} alt="edit-template" width="800"/>
1. Click **Save**.
1. On the Custom deployment blade, do the following:

   1. Create a new Resource Group (recommended) or select an existing one.
   1. Choose Location.
   1. Set the values of the following parameters:

      * SumoEndpointURL: URL for the HTTP source you configured in [Step 2](#step-2-configure-an-http-source) above.
      * StorageAccountName: Name of the storage account where you are storing logs from Azure Service that you configured in [Step 1](#step-1-configure-azure-storage-account) above.
      * StorageAccountResourceGroupName: Name of the resource group of the storage account you configured in [Step 1](#step-1-configure-azure-storage-account) above.
      * StorageAccountRegion: Name of the region of the storage account you configured in [Step 1](#step-1-configure-azure-storage-account) above.
      * Filter Prefix (Optional): If you want to filter logs from a specific container, enter the following by replacing the variable with your container name: `/blobServices/default/containers/<container_name>/`

    :::note
    Resource group names should not consist of an underscore.
    :::
1. Go to the **Review + create** tab, and then click **Create**.<br/><img src={useBaseUrl('/img/send-data/Azure_Blob_Storage_Custom_Deployment.png')} alt="Azure_Blob_Storage_Custom_Deploymente" width="400"/>
1. Verify that the deployment was successful by looking at **Notifications** at the top right corner of the Azure Portal.

    ![notification-success.png](/img/send-data/notification-success.png)

1. (Optional) In the same window, click **Go to resource group** to verify that all resources were successfully created, such as shown in the following example: <br/><img src={useBaseUrl('/img/send-data/Azure_Blob_all-resources.png')} alt="Azure_Blob_all-resources" width="800"/>
1. Go to **Storage accounts** and search for **sumobrlogs**, then select **sumobrlogs\<*random-string*\\>**. <br/><img src={useBaseUrl('/img/send-data/storage-accounts.png')} alt="storage-accounts" width="800"/>
1. In the **Data Storage** menu, do the following:
    1. Click **Tables**.
    1. Click **+ Table**.
    1. Enter **FileOffsetMap** as table name and click **OK**.

<img src={useBaseUrl('/img/send-data/Azure_Blob_create-table.png')} alt="Azure_Blob_create-table" width="900"/>

<details><summary>Example: Push NSG flow logs from a Network Security Group to Azure Blob Storage</summary>
This section describes how to push logs from a network security group into Azure Blob Storage by configuring nsg flow Logs. The instructions use a network security group as an example.
<ol>
    <li>Login to the Azure Portal.</li>
    <li>Click <strong>Network security groups > Select a network security group</strong>.</li>
    <li>Click on <strong>NSG flow logs</strong> when you see it under <strong>Monitoring</strong>, and click <strong>Create</strong>.</li>
    <li>Click on <strong>Select resource</strong> and choose a NSG that is present in the same region as the storage account configured in <a href="/docs/send-data/collect-from-other-data-sources/azure-blob-storage/collect-logs-azure-blob-storage#step-1-configure-azure-storage-account">Step 1</a>.</li>
    <li>Under <strong>Subscription > Storage Accounts</strong>, select the storage account configured in <a href="/docs/send-data/collect-from-other-data-sources/azure-blob-storage/collect-logs-azure-blob-storage#step-1-configure-azure-storage-account">Step 1</a>.</li>
    <li>Specify the <strong>Retention (days)</strong> and click <strong>Review + create</strong>. <br/><img src={useBaseUrl('/img/send-data/review+create.png')} alt="review+create" width="700"/></li>
    <li> Review the configuration of the flow log and click <strong>Create</strong>. <br/><img src={useBaseUrl('/img/send-data/review-configuration.png')} alt="review-configuration" width="600"/></li>
</ol>
</details>

:::tip
If logs from Azure Blob Storage do not start to flow into Sumo Logic, see the [Troubleshoot Azure Blob Storage Log Collection](troubleshoot-azure-blob-storage-log-collection.md).
:::

## Ingesting from Multiple Storage Accounts (Optional)

If you want to ingest data into Sumo from multiple storage accounts, perform following tasks for each storage account separately.

:::note
The following steps assume you have noted down the resource group name, storage account name, and container name where the blobs will be ingested from.
:::

* [Step 1: Authorize App Service read from storage account](#step-1-authorize-app-service-to-list-storage-account-key) - Enables the Azure functions to read from the storage account.
* [Step 2: Create an Event Grid Subscription](#step-2-create-an-event-grid-subscription) - Subscribes all blob creation events to the Event Hub created by ARM template in [Step 3](#step-3-enabling-vnet-integration-optional) above.
* [Step 3. Enabling Vnet Integration(Optional)](#step-3-enabling-vnet-integration-optional)

### Step 1: Authorize App Service to read from storage account

This section provides instructions on authorizing the App Service to list the Storage Account key. This enables the Azure function to read from the storage account.

To authorize the App Service to list the Storage Account key, do the following:

1. Go to **Storage Account** and click **Access Control(IAM)**.

    ![AzureBlob_AccessControl_IAM.png](/img/send-data/AzureBlob_AccessControl_IAM.png)

1. Click the **Add** **+** at the top of the page.

    ![AzureBlob_IAM_Add.png](/img/send-data/AzureBlob_IAM_Add.png)

1. Select **Add role assignment** from dropdown.
1. In the **Add role assignment** window, go to **Role** tab and choose **Storage Blob Data Reader**. Click **Next**. <br/><img src={useBaseUrl('/img/send-data/storage-blob-data-reader.png')} alt="storage-blob-data-reader" width="800"/>
1. In **Members** tab, select **Managed Identity**.
1. In the **Select Managed identities** window,

   * **Subscription**: Choose Pay as you Go.
   * **Managed Identity**: Choose Function App.
   * **Select**:  **Select SUMOBRDLQProcessor\<unique_prefix\>** and **SUMORTaskConsumer\<unique_prefix\>** app services which are created by the ARM template. Click **Select**.
1. Click **Review + assign**
1. Click **Save**.

### Step 2: Create an Event Grid Subscription

This section provides instructions for creating an event grid subscription, that subscribes all blob creation events to the Event Hub created by ARM template in [Step 3](#step-3-enabling-vnet-integration-optional) above.

To create an event grid subscription, do the following:

1. In the left pane of Azure portal click **All Services**, then search for and click **Event Grid Subscriptions**.

    ![AzureBlob_EventGridSubscriptions.png](/img/send-data/AzureBlob_EventGridSubscriptions.png)

1. At the top of the **Event subscriptions** page, click **+Event Subscription**. 

    ![AzureBlob_EventSubscriptionsPage.png](/img/send-data/AzureBlob_EventSubscriptionsPage.png)

    The Create Event Subscription dialog appears.

    ![AzureBlob_CreatEventSubscription_dialog.png](/img/send-data/AzureBlob_CreatEventSubscription_dialog.png)

1. Specify the following values for **Event Subscription Details**:

   * **Name:** Fill the event subscription name.
   * **Event Schema:** Select **Event Grid Schema**.

1. Specify the following values for **Topic Details**:

   * **Topic Type**. Select Storage Accounts.
   * **Subscription**. Select Pay As You Go
   * **Resource Group**. Select the Resource Group for the Storage Account to which your Azure service will export logs, from where you want to ingest logs. 
   * **Resource**. Select the Storage Account you configured, from where you want to ingest logs.

    :::note
    If you don't see your configured Storage Account in the dropdown menu, make sure you met the requirements in [Requirements](#requirements) section.
    :::

1. Specify the following details for Event Types:

   * Uncheck the **Subscribe to all event types** box.
   * Select **Blob Created** from the **Define Event Types** dropdown.

1. Specify the following details for Endpoint Types: 

   * **Endpoint Type**. Select **Event Hubs** from the dropdown. 
   * **Endpoint.**  Click on **Select an endpoint.** 

    The Select Event Hub dialog appears.

    ![AzureBlob_SelectEventHub-EventGrid.png](/img/send-data/AzureBlob_SelectEventHub-EventGrid.png)

1. Specify the following Select Event Hub parameters, then click **Confirm Selection.**

   * **Resource Group**. Select the resource group you created [Step 3](#step-3-enabling-vnet-integration-optional) in which all the resources created by ARM template are present.
   * **Event Hub Namespace**. Select **SUMOBREventHubNamespace\<*unique string*\\>**.
   * **Event Hub**. Select **blobreadereventhub** from the dropdown.

1. Specify the following Filters tab options:

   * Check Enable subject filtering.
   * To filter events by container name, enter the following in the **Subject Begins With** field, replacing `<container_name>` with the name of the container from where you want to export logs.  `/blobServices/default/containers/<container_name>/`

   ![img](/img/send-data/AzureBlob_FiltersDialog.png)

1. Click **Create**.

1. Verify the deployment was successful by checking **Notifications** in the top right corner of the Azure Portal.

### Step 3: Enabling VNet Integration (Optional)

Assuming you have used the modified template which uses standard/premium plan for BlobTaskConsumer and [DLQTaskConsumer](https://portal.azure.com/#blade/WebsitesExtension/FunctionMenuBlade/resourceId/%2Fsubscriptions%2Fc088dc46-d692-42ad-a4b6-9a542d28ad2a%2FresourceGroups%2Fleast%2Fproviders%2FMicrosoft.Web%2Fsites%2FSUMOBRDLQProcessorekbxzlepnhs4g%2Ffunctions%2FDLQTaskConsumer) functions. This assumes that your storage account access is enabled for selected networks.

1. Create a subnet in a virtual network using the instructions in the [doc](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-manage-subnet#add-a-subnet). If you have multiple accounts in the same region you can skip step 2 below and use the same subnet and add it to the storage account as mentioned in step 3.
1. Perform below steps for both BlobTaskConsumer and [DLQTaskConsumer](https://portal.azure.com/#blade/WebsitesExtension/FunctionMenuBlade/resourceId/%2Fsubscriptions%2Fc088dc46-d692-42ad-a4b6-9a542d28ad2a%2FresourceGroups%2Fleast%2Fproviders%2FMicrosoft.Web%2Fsites%2FSUMOBRDLQProcessorekbxzlepnhs4g%2Ffunctions%2FDLQTaskConsumer) function apps.

   1. Go to **Function App > Networking**. 
   1. Under Outbound traffic, click on Vnet Integration. 

    ![azureblob-outbound](/img/send-data/azureblob-outbound.png)

   1. Add the Vnet and subnet created in Step 1.

    ![azureblob-vnet](/img/send-data/azureblob-vnet.png)

   1. Also copy the outbound ip addresses you’ll need to add it in firewall configuration of your storage account.

    ![azureblob-outboundip](/img/send-data/azureblob-outboundip.png)

1. Go to your storage account from where you want to collect logs from. Go to Networking and add the same Vnet and subnet.

    ![azureblob-storageacct](/img/send-data/azureblob-storageacct.png)

1. Add the outbound ip addresses (copied in step 2.d) from both BlobTaskConsumer and [DLQTaskConsumer](https://portal.azure.com/#blade/WebsitesExtension/FunctionMenuBlade/resourceId/%2Fsubscriptions%2Fc088dc46-d692-42ad-a4b6-9a542d28ad2a%2FresourceGroups%2Fleast%2Fproviders%2FMicrosoft.Web%2Fsites%2FSUMOBRDLQProcessorekbxzlepnhs4g%2Ffunctions%2FDLQTaskConsumer) functions under Firewall with each ip in a single row of Address range column.
1. Verify by going to the subnet. You should see Subnet delegation and service endpoints as shown in the screenshot below.

    ![azureblob-subnet](/img/send-data/azureblob-subnet.png)


## Collection testing performance numbers

| File creation time in a single storage account | Number of files | Size of each file X Number of files | Sumo Logic Incoming Bytes Rate (MB/sec) | Sumo Logic Incoming Messages Rate (loglines/sec) | Sumo Logic total time take for full ingestion | Sumo Logic Ingestion (GB) | Sumo Logic log count |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| ~3 minutes | 100 | 100MB X 80 + 104MB X 20 | Avg 40MB/sec <br/> MAX 190MB/sec | MAX 411811/sec | 3.77 minutes | 9.31 | 20,643,840 |
