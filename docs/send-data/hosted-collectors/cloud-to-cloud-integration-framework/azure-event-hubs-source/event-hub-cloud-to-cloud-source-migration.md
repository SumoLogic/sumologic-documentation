---
id: event-hub-cloud-to-cloud-source-migration
title: Event-Hub-Cloud-to-Cloud-Source-Migration
sidebar_label: Event Hub Cloud-to-Cloud
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Currently Cloud to Cloud Event hub source supports only logs so only [ARM based Azure Monitor Logs Collection](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Azure_Monitoring/Collect_Logs_from_Azure_Monitor) (functions prefixed with SUMOAzureLogs) can be migrated. This source is available in all deployments including fedramp.

Cloud To Cloud Sources has below advantages
1. Less overhead of maintenance and upgrades, since cloud to cloud sources are upgraded automatically for bug fixes.
2. Lesser cost since the old collection method used to create multiple resources (storage accounts, application insights, azure functions) in customer’s account while  cloud-to-cloud sources are hosted in sumo logic infra. On the other hand, cloud-to-cloud eventhub source requires you to create only eventhub in your azure account.

# Migrating to Event Hub Cloud-to-Cloud Source

## Before you begin Choose Migration Strategy

 Choose migration strategy which is more convenient to you. Migration can be done by two ways:

1. **via Existing Event Hubs Namespaces**

If you want to continue using the existing **Event hubs namespaces** that are created by the ARM template, jump to the section.
The advantage of using the existing this strategy is you don’t have to recreate diagnostic settings in Azure Monitor used for exporting the logs to eventhub.

:::
You have to manually delete resources (starting with prefix Sumo) and can’t delete the whole resource group.
:::

2. **via Creating new event hub namespaces**

  If you want to create a new event hub namespace, see steps 1 to steps 3 in the [Prerequisites](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework-azure-event-hubs-source//#prerequisites) section.



    Pros: You can simply delete the resource group where the ARM template was earlier deployed. This assumes you haven’t created any additional resources in the same resource group.


    Cons: You have to first find out what all log types are exported to your eventhub  and recreate the diagnostic settings for the azure services.


    We recommend creating new diagnostic settings for newer namespaces so that we can delete the older ones after verifying the new collection works without any latency.




After choosing one of the above two ways you will now have an event hub namespace which has the logs flowing to it.


### 2. Getting configuration parameters for your eventhub C2C sources



1. Create a shared access policy - You can create it at the namespace level if you have multiple eventhubs by selecting Shared Access Policies on the left menu of the Event Hubs Namespace page.
