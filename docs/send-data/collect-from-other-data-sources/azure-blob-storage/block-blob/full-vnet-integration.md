---
id: full-vnet-integration
title: Collect logs from Azure Blob Storage with full Virtual Network (VNet) Integration
sidebar_label: Collect block blob with full Virtual Network integration
description: Configure a pipeline to ship logs from the Azure Blob Storage throughout the Virtual Network and then to an HTTP source on a hosted collector in Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The current solution for ingesting block blob data from an Azure Storage Account into Sumo Logic sets up a pipeline that assumes public access is enabled on the storage account being monitored.
If you prefer to restrict access and keep your storage account behind a firewall, refer to the instructions [here](/docs/send-data/collect-from-other-data-sources/azure-blob-storage/block-blob/collect-logs/). However, if your security requirements demand that all Azure resources deployed via the ARM template, including the Storage Account, Event Hub, Azure Functions, and Service Bus, are fully integrated with a Virtual Network, follow the steps outlined below.

1. Download the ARM template [https://github.com/SumoLogic/sumologic-azure-function/blob/azure\_premium\_template\_vnet\_integration/BlockBlobReader/src/blobreaderdeploywithPremiumPlan.json](https://github.com/SumoLogic/sumologic-azure-function/blob/azure_premium_template_vnet_integration/BlockBlobReader/src/blobreaderdeploywithPremiumPlan.json) that provisions the required resources, including a premium-tier Service Bus.
2. Create the following networking resources:
   * Virtual Network. For example, `brvnet`.
       :::note
       Only the Storage service endpoint associated with the functions and storage accounts is needed for the subnet.
       :::
       <img src={useBaseUrl('/img/send-data/blockblob/block-blob-vnet-creation.jpg')} alt="Virtual Network creation with storage service endpoint" width="800" />
   * Subnet. For example, `brsubnet`.
   * Network Security Group (NSG). For example, `brnsg`.
       :::note
       NSG rules remain as default; no changes required.
       :::
       <img src={useBaseUrl('/img/send-data/blockblob/block-blob-NSG-rules.png')} alt="NSG rules configuration" width="800" />
3. Enable the Virtual Network integration on each function app by navigating to **Function App** > **Networking** > **Outbound Traffic Configuration**.  
   <img src={useBaseUrl('/img/send-data/blockblob/block-blob-task-consumer-with-vnet-integration-outbound.png')} alt="TaskConsumer VNet integration outbound configuration" width="800" />
   <img src={useBaseUrl('/img/send-data/blockblob/block-blob-vnet-in-task-consumer.jpg')} alt="VNet integration in TaskConsumer" width="800" />
4. Follow the steps below to restrict access to the Storage Account storing NSG flow logs, so that only certain networks can access it:
   1. Navigate to **Storage Account** > **Networking** > **Firewalls and virtual networks**.
   2. Choose the selected networks.
   3. Select the same subnet that was configured for **SUMOBRTaskConsumer** and **SUMOBRDLQProcessor** during Virtual Networ integration.
       :::note
       No IP address whitelisting is needed.
       :::
       <img src={useBaseUrl('/img/send-data/blockblob/block-blob-sa-flow-logs-networking.png')} alt="Storage account flow logs networking configuration" width="800" />
5. Follow the steps below to restrict access to the ARM-created storage account, so that only certain networks can access it:
   1. Navigate to **Storage Account** > **Networking**.
   2. Choose the selected networks and allow access from your subnet.   
       <img src={useBaseUrl('/img/send-data/blockblob/block-blob-arm-template-sa-networking.jpg')} alt="ARM template storage account networking configuration" width="800" />
6. Configure the inbound restrictions on all three Azure Functions:
   1. Navigate to **Function App** > **Networking** > **Inbound Traffic Configuration** > **Access Restrictions**.
   2. Allow only the subnet you created in Step 2.
       <img src={useBaseUrl('/img/send-data/blockblob/block-blob-task-consumer-with-vnet-integration-inbound.png')} alt="TaskConsumer VNet integration inbound configuration" width="800" />
7. For each function app, enable the function access to the Storage Account created by the ARM template by following the steps below:
   1. Navigate to **Function App** > **Networking** > **VNet Integration** > **Configuration Routing**.
   2. Select **Content storage**.
   3. Select **Outbound internet traffic** under **Application routing**.
       <img src={useBaseUrl('/img/send-data/blockblob/block-blob-function-networking-config.png')} alt="Function networking configuration" width="800" />
   4. Set `WEBSITE_CONTENTOVERVNET` to `1` in environment variables for each function.
       <img src={useBaseUrl('/img/send-data/blockblob/block-setting-env-variable-function.png')} alt="Setting environment variable in function" width="800" />
8. Restrict access to **Service Bus** and **Event Hub** by following the steps below, so that only certain networks can access them:
   1. Navigate to **Service** > **Networking**.
   2. Set access to **Selected networks**, and select the previously created subnet in step 1.
   3. Set **Allow trusted Microsoft services to bypass this firewall** to **Yes**.
       <img src={useBaseUrl('/img/send-data/blockblob/block-blob-event-hub-networking.jpg')} alt="Event Hub networking configuration" width="800" />
9. Secure the Event Grid with managed identity to allow Event Grid to publish to Event Hub:
   1. Enable **System assigned** identity on the Event Grid Topic.
       <img src={useBaseUrl('/img/send-data/blockblob/block-blob-system-assigned-identity-topic.png')} alt="System-assigned identity for topic" width="800" />
   2. Assign the identity to the Azure Event Hubs Data Sender role on the Event Hub namespace under **Access Control (IAM)** > **Role Assignments**.
       <img src={useBaseUrl('/img/send-data/blockblob/block-blob-event-hub-namespace-add-identity.png')} alt="Adding identity to Event Hub namespace" width="800" />
   3. Configure the Event Grid subscription that uses an **Event Hub** as an endpoint and choose **System Assigned** identity for authentication.
       <img src={useBaseUrl('/img/send-data/blockblob/block-blob-event-hub-subscription-identity.png')} alt="Event Hub subscription identity configuration" width="800" />
10. Ensure your Virtual Network has service endpoints enabled for:
   - Storage
   - Service Bus
   - Event Hub
       <img src={useBaseUrl('/img/send-data/blockblob/block-blob-service-endpoint-enabling-vnet.png')} alt="Enabling service endpoints in VNet" width="800" />
11. To validate the function execution, navigate to **Function App** > **BlobTaskConsumer** > **Monitoring** > **Invocations**.
    :::note
    You should see the invocation logs if everything is correctly configured.
    :::
    <img src={useBaseUrl('/img/send-data/blockblob/block-blob-validation.png')} alt="Block blob validation logs" width="800" />
12. Replace the standard Service Bus with a premium tier.
     :::note
     The Service Bus provisioned via the current ARM template is configured with the standard tier, which does not support Virtual Network integration. To enable Virtual Network integration, it is recommended to create a new Service Bus with the premium tier.
     :::
     Follow the steps below to create a new Service Bus on the premium tier:
       1. Create a new premium Service Bus namespace:
          1. Use the same resource group and location as the old Service Bus.
          2. Enable partitioning.
          3. Initially allow public access (can restrict later).
       2. Create a new queue named `blobrangetaskqueue` with the following parameters:
          1. Maximum queue size: 40 GB
          2. Maximum message size: 1024 KB
          3. Maximum delivery count: 3
          4. Time to live: 14 days
          5. Message lock duration: 5 minutes
          6. Enable the dead letter queue.
       3. Update the connection strings in all three functions (Producer, Consumer, DLQ):
          Under **Shared access policies**, select the [RootManageSharedAccessKey](https://portal.azure.com/#) and copy the primary key from the newly created Service Bus on the premium tier as the value of `shared_access_key_value`:  
          `Endpoint=sb://<servicebus_namespace_name>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<shared_access_key_value>`
       4. Restrict Public Access:
          1. Navigate to **Service Bus** > **Networking**.
          2. Set **Public** network access to **Selected** networks.
          3. Choose the subnet created earlier.

### References

- [https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-service-endpoints](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-service-endpoints)  
- [https://learn.microsoft.com/en-us/azure/azure-functions/configure-networking-how-to?tabs=portal\#3-enable-application-and-configuration-routing](https://learn.microsoft.com/en-us/azure/azure-functions/configure-networking-how-to?tabs=portal#3-enable-application-and-configuration-routing)  
- [https://learn.microsoft.com/en-us/azure/app-service/configure-vnet-integration-routing\#content-share](https://learn.microsoft.com/en-us/azure/app-service/configure-vnet-integration-routing#content-share)  
- [https://learn.microsoft.com/en-us/azure/azure-functions/functions-app-settings\#website\_contentovervnet](https://learn.microsoft.com/en-us/azure/azure-functions/functions-app-settings#website_contentovervnet)
