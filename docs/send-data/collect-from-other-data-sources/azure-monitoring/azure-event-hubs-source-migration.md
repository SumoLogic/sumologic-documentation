---
id: azure-event-hubs-source-migration
title: Migrating from ARM based Azure Monitor Logs Collection
sidebar_label: Azure Event Hubs Source Migration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/azure-event-hub.svg')} alt="icon" width="40"/>

As **Azure Event Hubs source** supports logs, you can migrate your [ARM-based Azure Monitor Logs Collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source) (functions prefixed with SUMOAzureLogs). This source is available in all deployments, including FedRAMP.

Azure Event Hubs source have several advantages, including:
* Less overhead of maintenance and upgrades, since Azure Event Hubs source are upgraded automatically for bug fixes.
* Lesser cost since the old collection method is used to create multiple resources such as storage accounts, application insights, and Azure functions in your account while sources are hosted in Sumo Logic infrastructure that requires you to create only an Event Hub in your Azure account.

## Step 1. Choose a migration strategy

Choose a migration strategy that is more convenient for you. Migration can be done in two ways:

### Strategy A. Existing event hub namespaces

If you want to continue using the existing **Event hubs namespaces** that are created by the ARM template, jump to the [Configuring Parameters](#step-2-configure-parameters-for-your-event-hub-sources) section in step 2.

The advantage of using the existing strategy is that you don’t have to recreate diagnostic settings in Azure Monitor for exporting the logs to the event hub.

:::note
You need to manually delete resources (starting with the prefix Sumo) and cannot delete the whole resource group.
:::

### Strategy B. Creating new event hub namespaces

If you want to create a new event hub namespace, see steps 1 to 3 in the [Vendor configuration](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/#vendor-configuration) section. The advantage of using this strategy is you can simply delete the resource group where the ARM template was earlier deployed. This assumes you haven’t created any additional resources in the same resource group.

:::note
You need to first find out what all log types are exported to your event hub and recreate the diagnostic settings for the Azure services. Thus, we recommend creating new diagnostic settings for newer namespaces so that we can delete the older ones after verifying the new collection works without any latency.
:::

After choosing one of the above two strategies, you will now have an event hub namespace that has the logs flowing to it.

## Step 2. Configure parameters for your event hub sources

1. **Create a shared access policy**. You can create it at the namespace level if you have multiple event hubs by selecting **Shared Access Policies** on the left menu of the **Event Hubs Namespace page**.<br/><img src={useBaseUrl('/img/send-data/shared-access-policy.png')} alt="Shared access policy" style={{border: '1px solid gray'}} width="800" />
2. **Create a consumer group**.
   1. Go to your **Event Hub**.
   2. Select **Consumer groups** on left panel.
   3. Add consumer groups by clicking **+Consumer groups**.
   4. Click **Create**.

:::note
Creating **Consumer Groups** is needed only for the customers using the older event hub namespace, see [Existing event hub namespace](#strategy-a-existing-event-hub-namespaces) section in step 1. The default consumer group is already in use by function so we need to create a new one.
:::

<img src={useBaseUrl('img/send-data/consumer-groups.png')} alt="Consumer groups" style={{border: '1px solid gray'}} width="800" />

After completing the above steps, you will have **Azure Event Hubs Namespace**, **Event Hubs Instance Name**, **Shared Access Policy**, and **Consumer Group Name** - all four parameters are required for creating an event hub source.

## Step 3. Create event hub sources

For each of the event hubs present in your namespace, you need to create a Azure Event Hubs source. For more information, refer to the [Creating Azure Event Hub Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source).

:::note
We recommend giving the same source category so that your custom dashboards or apps require no changes. You can verify whether the data comes from your source using `1_source metadata`.
:::

## Step 4. Remove older resources

After verifying that all the log types are ingesting in your new source, follow the steps below for deleting the resources created by the ARM template.

### Option A. By creating a new namespace

If your resource group contains only resources created by the older ARM template, as shown below, and you have created a new namespace in a different resource group, see [Creating new event hub namespace](#strategy-b-creating-new-event-hub-namespaces) section in step 1.

 <img src={useBaseUrl('img/send-data/resource-groups.png')} alt="Resource groups" style={{border: '1px solid gray'}} width="800" />

1. **Stopping the data flow in older sumo logic source**. To stop the logs export to the older event hub namespace, we need to delete the older diagnostic settings. You can delete them by following the steps below for each of your azure services that are sending logs to sumo.
   1. Go to **Azure Portal**.
   2. Search for **Diagnostic Settings** in the **Search bar**, it will take you to a page with all the resources which have diagnostic settings.
   3. Select your **subscription**, **resource group** (for the azure service whose logs you are ingesting into sumo), and whose diagnostics status is enabled.<br/><img src={useBaseUrl('img/send-data/stopping-dataflow1.png')} alt="Stopping data flow" style={{border: '1px solid gray'}} width="800" />
   4. Select the resource name (whose logs you are ingesting into sumo) it shows a list of diagnostic settings.<br/><img src={useBaseUrl('img/send-data/diagnostic-settings1.png')} alt="Diagnostic settings" style={{border: '1px solid gray'}} width="800" />
   5. Select the setting whose event hub column matches with your older event hub namespace. Go to **Edit settings** corresponding to that setting and delete it.
 2. **Wait for all data to be ingested into Sumo**. The azure function is draining all the logs from the older event hub namespace and sending them to sumo, we will need to wait till it finishes it. You can run a query in sumo with your older source name `(_source=<your older source name>)` and see if all the data has already come into sumo till the date when you deleted the diagnostic settings.
 3. **Verify the new source is ingesting logs without any delay**. You can run the below query to verify the latency.
  ```sql
  _source=<new source name>
 | formatDate(fromMillis(_receipttime),"MM/dd hh:mm") as r
 | formatDate(fromMillis(_messagetime),"MM/dd hh:mm") as t
 | abs(_receipttime - _messagetime) as delt| delt/1000/60 as delt
 | timeslice 10m
 | min(delt), max(delt), avg(delt) by _timeslice
 ```
 :::note
 We recommend monitoring the new source for a day to verify the delay.
 :::
 4. **Deleting Resources**. Once you are sure your older data is in sumo and your new source is working without any latency, you can delete the whole resource group by clicking on the **Delete resource group** button.<br/><img src={useBaseUrl('img/send-data/delete-resource-groups.png')} alt="Delete resource groups" style={{border: '1px solid gray'}} width="800" />

 :::note
 If you see more resources than the ones shown in the above screenshot you can delete all six individual resources (the ones with the prefix sumo) one by one by selecting each resource and clicking on the **Delete** button at the top bar.
 :::


### Option B. By using an existing event hub namespace

 1. **Stopping the data flow in older sumo logic source**. The newer source will start collecting data from the point you created the source. You can verify that by running `(_source=<new source name>)` in sumo. After verifying the logs, you can stop the function apps by following the steps below.
    1. Go to the resource group, where Sumo Logic’s log collection ARM template was deployed, and select the **SumoAzureLogs** Function app.
    2. Click **Stop** at the top bar as shown below.<br/><img src={useBaseUrl('img/send-data/stopping-dataflow2.png')} alt="Stopping data flow" style={{border: '1px solid gray'}} width="800" />
 2. **Verify the new source is ingesting logs without any delay**. You can run the below query to verify the latency.
  ```sql
  _source=<new source name>
  | formatDate(fromMillis(_receipttime),"MM/dd hh:mm") as r
  | formatDate(fromMillis(_messagetime),"MM/dd hh:mm") as t
  | abs(_receipttime - _messagetime) as delt| delt/1000/60 as delt
  | timeslice 10m
  | min(delt), max(delt), avg(delt) by _timeslice
  ```

 :::note
 We recommend monitoring the new source for a day to verify the delay.
 :::

 3. **Deleting Resources**. You can delete all 5 individual resources except the **Event Hub Namespace** (the ones with the prefix sumo) by selecting each resource and clicking on the **Delete** button at the top bar.<br/><img src={useBaseUrl('img/send-data/delete-resource-groups1.png')} alt="Delete resource groups" style={{border: '1px solid gray'}} width="800" />

 :::note
 Before deleting resources, make sure your new source is working without any latency.
 :::


## FAQ

#### After migrating to Azure Event Hubs source, will the acquired data volume increase as compared to when configured with the previous ARM Template?

There won't be any change in data volume since these are the same logs we are just changing the collection method.

#### There is a 'Shared access policies' available at the event hub namespace level, can we create a single policy with a 'listen' scope, and apply the same policy for all instances?

Yes.

#### When to create a new event hub namespace?

Refer to this [Microsoft FAQ](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-faq#when-do-i-create-a-new-namespace-vs--use-an-existing-namespace-docs) section to decide whether you need single or multiple event hub namespaces.
