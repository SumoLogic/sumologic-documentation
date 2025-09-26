---
id: block-blob-full-vnet-integration
title: Collect Logs from Azure Blob Storage with full vnet integration
sidebar_label: Collect block blow with full vnet integration
description: Configure a pipeline to ship logs from the Azure Blob Storage all throughout a vnet and then to an HTTP source on a hosted collector in Sumo Logic.
---

Current solution to bring the block blob data from storage account in Sumo Logic creates a pipeline which assumes that the storage account being monitored will have public access enabled. If you just want your storage account behind a firewall follow the instruction [here](https://help.sumologic.com/docs/send-data/collect-from-other-data-sources/azure-blob-storage/block-blob/collect-logs/#step-3-enabling-vnet-integration-optional). But if you want that all of the components which are created through the arm template in azure, to be behind azure vnet (this includes event hub, azure functions, storage account, servicebus) then follow the below instructions : 

1. Download this template [https://github.com/SumoLogic/sumologic-azure-function/blob/azure\_premium\_template\_vnet\_integration/BlockBlobReader/src/blobreaderdeploywithPremiumPlan.json](https://github.com/SumoLogic/sumologic-azure-function/blob/azure_premium_template_vnet_integration/BlockBlobReader/src/blobreaderdeploywithPremiumPlan.json). It creates Service Bus also with Premium tier.

2. Create a Virtual Network (for ex brvnet), subnet (brsubnet) and NSG (brnsg).

Screenshot of the Virtual Network, Only Storage Service Endpoint is required in the same subnet which is associated with the functions and storage accounts.  
<img src={useBaseUrl('/img/send-data/blockblob/block-blob-vnet-creation.png')} alt="Virtual Network creation with storage service endpoint" style={{border: '1px solid gray'}} width="800" />

Screenshot of the NSG rules. Everything can be set to default
<img src={useBaseUrl('/img/send-data/blockblob/block-blob-NSG-rules.png')} alt="NSG rules configuration" style={{border: '1px solid gray'}} width="800" />

3. Enable VNet integration in all the function apps by going to Function App \-\> Networking \-\> Outbound traffic configuration  
Screenshot of TaskConsumer Vnet integration of the Function.   
<img src={useBaseUrl('/img/send-data/blockblob/block-blob-task-consumer-with-vnet-integration-outbound.png')} alt="TaskConsumer VNet integration outbound configuration" style={{border: '1px solid gray'}} width="800" />
<img src={useBaseUrl('/img/send-data/blockblob/block-blob-vnet-in-task-consumer.png')} alt="VNet integration in TaskConsumer" style={{border: '1px solid gray'}} width="800" />

4. You can restrict its access of Storage account containing flow logs to selected networks by going to Storage Account \-\> Networking. Subnet of storage account same as subnet configured in SUMOBRTaskConsumer and SUMOBRDLQProcessor VNe integration step.  
   Below is the screenshot of the storage account where NSG flow logs are stored.  
   Even the ip addresses are not required to be whitelisted in the firewall (this we will fix in our docs).

<img src={useBaseUrl('/img/send-data/blockblob/block-blob-sa-flow-logs-networking.png')} alt="Storage account flow logs networking configuration" style={{border: '1px solid gray'}} width="800" />

5. Storage account the one created by ARM template, you can restrict its access to selected networks by going to Storage Account \-\> Networking  
<img src={useBaseUrl('/img/send-data/blockblob/block-blob-arm-template-sa-networking.png')} alt="ARM template storage account networking configuration" style={{border: '1px solid gray'}} width="800" />
6. In all the three azure functions you can restrict inbound traffic by going to Function App \-\> Networking \-\> Inbound traffic configuration \-\> Access restrictions allowing only subnet created in step 1\.  
     
   <img src={useBaseUrl('/img/send-data/blockblob/block-blob-task-consumer-with-vnet-integration-inbound.png')} alt="TaskConsumer VNet integration inbound configuration" style={{border: '1px solid gray'}} width="800" />
7. To enable functions to access storage account created by arm template you need to do following steps   
   1. Select content storage in Configuration Routing and select Outbound internet traffic under Application routing in Azure Function Vnet integration for each function.

   <img src={useBaseUrl('/img/send-data/blockblob/block-blob-function-networking-config.png')} alt="Function networking configuration" style={{border: '1px solid gray'}} width="800" />

   

   2. Set WEBSITE\_CONTENTOVERVNET to 1 in environment variables for each function.

   <img src={useBaseUrl('/img/send-data/blockblob/block-setting-env-variable-function.png')} alt="Setting environment variable in function" style={{border: '1px solid gray'}} width="800" />


8. Event hub can restrict access to selected networks  to the subnet created in step 1 and Allow trusted services to bypass this firewall set to Yes  
   

<img src={useBaseUrl('/img/send-data/blockblob/block-blob-event-hub-networking.png')} alt="Event Hub networking configuration" style={{border: '1px solid gray'}} width="800" />

9. The event grid needs to be secured with managed identity so that it can access Event hub, you also need to do the following steps:  
1. Enable system-assigned identity for the topic
<img src={useBaseUrl('/img/send-data/blockblob/block-blob-system-assigned-identity-topic.png')} alt="System-assigned identity for topic" style={{border: '1px solid gray'}} width="800" />
2. Add the identity to the Azure Event Hubs Data Sender role on the Event Hubs namespace under Access Control  \-\> Role  assignments
<img src={useBaseUrl('/img/send-data/blockblob/block-blob-event-hub-namespace-add-identity.png')} alt="Adding identity to Event Hub namespace" style={{border: '1px solid gray'}} width="800" />
3. Then, configure the event subscription that uses an event hub as an endpoint to use the system-assigned identity.
<img src={useBaseUrl('/img/send-data/blockblob/block-blob-event-hub-subscription-identity.png')} alt="Event Hub subscription identity configuration" style={{border: '1px solid gray'}} width="800" />

10. The service bus created by arm template is on standard tier \- which does not support vnet integration. Follow the below steps to create a new Service bus on premium tier (supports premium tier)  
    1. create new service bus namespace with premium plan \-  
       1. same resource group as old service bus,  
       2. same location  
       3. partition enabled  
       4. public access for starting (under networking tab)  
    2. Once servicebus namespace is created, go to entity \> queue and create a new queue by the name "**blobrangetaskqueue**", with the following parameters:  
       Max queue size : 40  
       message size 1024  
       max delivery count 3  
       time to live 14 days  
       Message lock duration 5 min  
       enable dead letter queue  
    3. Update connection string to the below format \- in all three azure functions (Producer, consumer and DLQ). From newly created service bus on the premium tier under Shared access policies. Where you can select the [RootManageSharedAccessKey](https://portal.azure.com/#) and copy the primary key from it as the value of shared\_access\_key\_value:  
       Endpoint=sb://**\<servicebus\_namespace\_name\>**.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=**\<shared\_access\_key\_value\>**  
    4. Go to newly created service bus \> networking. Change public network access from all networks to selected networks, and select the vnet and subnet previously created and used with other resources
    

11. Enable Service endpoints for below services in your Vnet.

<img src={useBaseUrl('/img/send-data/blockblob/block-blob-service-endpoint-enabling-vnet.png')} alt="Enabling service endpoints in VNet" style={{border: '1px solid gray'}} width="800" />

12. Go to Function App \-\> BlobTaskConsumer \-\> Invocations you should be able to see below logs

<img src={useBaseUrl('/img/send-data/blockblob/block-blob-validation.png')} alt="Block blob validation logs" style={{border: '1px solid gray'}} width="800" />


### References

[https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-service-endpoints](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-service-endpoints)  
[https://learn.microsoft.com/en-us/azure/azure-functions/configure-networking-how-to?tabs=portal\#3-enable-application-and-configuration-routing](https://learn.microsoft.com/en-us/azure/azure-functions/configure-networking-how-to?tabs=portal#3-enable-application-and-configuration-routing)  
[https://learn.microsoft.com/en-us/azure/app-service/configure-vnet-integration-routing\#content-share](https://learn.microsoft.com/en-us/azure/app-service/configure-vnet-integration-routing#content-share)  
[https://learn.microsoft.com/en-us/azure/azure-functions/functions-app-settings\#website\_contentovervnet](https://learn.microsoft.com/en-us/azure/azure-functions/functions-app-settings#website_contentovervnet)
