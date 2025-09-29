---
id: full-vnet-integration
title: Collect Logs from Azure Blob Storage with Full VNet Integration
sidebar_label: Collect Block Blob with Full VNet Integration
description: Configure a pipeline to ship logs from the Azure Blob Storage all throughout a VNet and then to an HTTP source on a hosted collector in Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The current solution to bring the block blob data from a storage account in Sumo Logic creates a pipeline which assumes that the storage account being monitored will have public access enabled. If you just want your storage account behind a firewall, follow the instruction [here](/docs/send-data/collect-from-other-data-sources/azure-blob-storage/block-blob/collect-logs/#enabling-vnet-integration-optional). But if you want that all of the components which are created through the ARM template in Azure to be behind Azure VNet (this includes Event Hub, Azure functions, storage account, and Service Bus) then follow the below instructions: 

1. Download this template: [https://github.com/SumoLogic/sumologic-azure-function/blob/azure\_premium\_template\_vnet\_integration/BlockBlobReader/src/blobreaderdeploywithPremiumPlan.json](https://github.com/SumoLogic/sumologic-azure-function/blob/azure_premium_template_vnet_integration/BlockBlobReader/src/blobreaderdeploywithPremiumPlan.json). It creates Service Bus with Premium tier.
1. Create a Virtual Network (for example, `brvnet`), a subnet (`brsubnet`) and NSG (`brnsg`). <br/>Following is a screenshot of the Virtual Network. Only the storage service endpoint is required in the same subnet which is associated with the functions and storage accounts. <br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-vnet-creation.png')} alt="Virtual Network creation with storage service endpoint" style={{border: '1px solid gray'}} width="800" /><br/>Following is a screenshot of the NSG rules. Everything can be set to default.<br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-NSG-rules.png')} alt="NSG rules configuration" style={{border: '1px solid gray'}} width="800" />
1. Enable VNet integration in all the function apps by going to **Function App > Networking > Outbound traffic configuration**.
<br/>Following is a screenshot of TaskConsumer VNet integration of the Function.<br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-task-consumer-with-vnet-integration-outbound.png')} alt="TaskConsumer VNet integration outbound configuration" style={{border: '1px solid gray'}} width="800" /><br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-vnet-in-task-consumer.png')} alt="VNet integration in TaskConsumer" style={{border: '1px solid gray'}} width="800" />
1. You can restrict its access of the storage account containing flow logs to selected networks by going to **Storage Account > Networking**. The subnet of the storage account is the same as the subnet configured in the `SUMOBRTaskConsumer` and `SUMOBRDLQProcessor` VNet integration step.  
<br/>Below is the screenshot of the storage account where NSG flow logs are stored.  Even the IP addresses are not required to be whitelisted in the firewall (this we will fix in our docs).<br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-sa-flow-logs-networking.png')} alt="Storage account flow logs networking configuration" style={{border: '1px solid gray'}} width="800" />
1. The storage account is the one created by the ARM template. You can restrict its access to selected networks by going to **Storage Account > Networking**.<br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-arm-template-sa-networking.png')} alt="ARM template storage account networking configuration" style={{border: '1px solid gray'}} width="800" />
1. In all the three Azure functions you can restrict inbound traffic by going to **Function App > Networking > Inbound traffic configuration > Access restrictions** allowing only the subnet created in step 1.  <br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-task-consumer-with-vnet-integration-inbound.png')} alt="TaskConsumer VNet integration inbound configuration" style={{border: '1px solid gray'}} width="800" />
1. To enable functions to access the storage account created by the ARM template, you need to do the following steps:   
   1. Select **Content storage** in **Configuration Routing** and select **Outbound internet traffic** under **Application routing** in Azure Function VNet integration for each function.<br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-function-networking-config.png')} alt="Function networking configuration" style={{border: '1px solid gray'}} width="800" />
   1. Set **WEBSITE_CONTENTOVERVNET** to **1** in environment variables for each function.<br/><img src={useBaseUrl('/img/send-data/blockblob/block-setting-env-variable-function.png')} alt="Setting environment variable in function" style={{border: '1px solid gray'}} width="800" />
1. Event Hub can restrict access to selected networks to the subnet created in step 1. Ensure that **Allow trusted Microsoft services to bypass this firewall** is set to **Yes**.<br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-event-hub-networking.png')} alt="Event Hub networking configuration" style={{border: '1px solid gray'}} width="800" />
1. The event grid needs to be secured with managed identity so that it can access Event Hub. You need to do the following steps:  
   1. Enable system-assigned identity for the topic.<br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-system-assigned-identity-topic.png')} alt="System-assigned identity for topic" style={{border: '1px solid gray'}} width="800" />
   1. Add the identity to the Azure Event Hubs Data Sender role on the Event Hubs namespace under **Access Control > Role assignments**.<br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-event-hub-namespace-add-identity.png')} alt="Adding identity to Event Hub namespace" style={{border: '1px solid gray'}} width="800" />
   1. Then, configure the event subscription that uses an Event Hub as an endpoint to use the system-assigned identity.<br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-event-hub-subscription-identity.png')} alt="Event Hub subscription identity configuration" style={{border: '1px solid gray'}} width="800" />
1. The Service Bus created by ARM template is on standard tier, which does not support VNet integration. Follow the below steps to create a new Service Bus on the premium tier:  
    1. Create new Service Bus namespace with the premium plan with the following:  
       1. Same resource group as old Service Bus.
       1. Same location.
       1. Partition enabled.
       1. Public access for starting (under **Networking** tab). 
    1. Once the Service Bus namespace is created, go to **Entity > queue** and create a new queue by the name "**blobrangetaskqueue**", with the following parameters:  
       - Max queue size: `40`  
       - Message size: `1024`  
       - Max delivery count: `3`  
       - Time to live: 14 days  
       - Message lock duration: 5 min  
       - Enable dead letter queue  
    1. Update the connection string to the below format in all three Azure functions (Producer, consumer, and DLQ) from the newly created Service Bus on the premium tier under **Shared access policies**. There you can select the [RootManageSharedAccessKey](https://portal.azure.com/#) and copy the primary key from it as the value of `shared_access_key_value`:  
       `Endpoint=sb://<servicebus_namespace_name>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<shared_access_key_value>`  
    1. Go to the newly created **Service Bus > networking**. Change public network access from all networks to selected networks, and select the VNet and subnet previously created and used with other resources.
1. Enable Service endpoints for below services in your VNet.<br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-service-endpoint-enabling-vnet.png')} alt="Enabling service endpoints in VNet" style={{border: '1px solid gray'}} width="800" />
1. Go to **Function App > BlobTaskConsumer > Invocations**. You should be able to see below logs.<br/><img src={useBaseUrl('/img/send-data/blockblob/block-blob-validation.png')} alt="Block blob validation logs" style={{border: '1px solid gray'}} width="800" />


### References

[https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-service-endpoints](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-service-endpoints)  
[https://learn.microsoft.com/en-us/azure/azure-functions/configure-networking-how-to?tabs=portal\#3-enable-application-and-configuration-routing](https://learn.microsoft.com/en-us/azure/azure-functions/configure-networking-how-to?tabs=portal#3-enable-application-and-configuration-routing)  
[https://learn.microsoft.com/en-us/azure/app-service/configure-vnet-integration-routing\#content-share](https://learn.microsoft.com/en-us/azure/app-service/configure-vnet-integration-routing#content-share)  
[https://learn.microsoft.com/en-us/azure/azure-functions/functions-app-settings\#website\_contentovervnet](https://learn.microsoft.com/en-us/azure/azure-functions/functions-app-settings#website_contentovervnet)
