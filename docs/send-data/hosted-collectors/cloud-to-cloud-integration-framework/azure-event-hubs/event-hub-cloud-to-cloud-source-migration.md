---
id: event-hub-cloud-to-cloud-source-migration
title: Event-Hub-Cloud-to-Cloud-Source-Migration
sidebar_label: Event Hub Cloud-to-Cloud Source Migration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Currently, Cloud to Cloud Event hub source supports only logs so only [ARM-based Azure Monitor Logs Collection](https://help.sumologic.com/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-logs-azure-monitor/) (functions prefixed with SUMOAzureLogs) can be migrated. This source is available in all deployments including **fedramp**.

Cloud To Cloud Sources have below advantages
1. Less overhead of maintenance and upgrades, since cloud-to-cloud sources are upgraded automatically for bug fixes.
2. Lesser cost since the old collection method is used to create multiple resources such as storage accounts, application insights, and azure functions in the customer’s account while cloud-to-cloud sources are hosted in sumo logic infra. On the other hand, a cloud-to-cloud event hub source requires you to create only an event hub in your Azure account.

# Migrating to Event Hub Cloud-to-Cloud Source

## Step 1- Choose a migration strategy

 Choose a migration strategy that is more convenient for you. Migration can be done in two ways:

### 1. **via Existing event hub namespaces**

If you want to continue using the existing **Event hubs namespaces** that are created by the ARM template, jump to the section.
The advantage of using the existing strategy is that you don’t have to recreate diagnostic settings in Azure Monitor for exporting the logs to the event hub.

::: note
You have to manually delete resources (starting with the prefix Sumo) and cannot delete the whole resource group.
:::

### 2. **via Creating new event hub namespaces**

If you want to create a new event hub namespace, see steps 1 to steps 3 in the [Prerequisites](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework-azure-event-hubs-source//#prerequisites) section. The advantage of using this strategy is you can simply delete the resource group where the ARM template was earlier deployed. This assumes you haven’t created any additional resources in the same resource group.

::: note
You have to first find out what all log types are exported to your event hub and recreate the diagnostic settings for the Azure services. Thus, we recommend creating new diagnostic settings for newer namespaces so that we can delete the older ones after verifying the new collection works without any latency.
:::

After choosing one of the above two strategies, you will now have an event hub namespace that has the logs flowing to it.

## Step 2. Getting configuration parameters for your event hub cloud-to-cloud sources

1. **Create a shared access policy**
You can create it at the namespace level if you have multiple event hubs by selecting **Shared Access Policies** on the left menu of the **Event Hubs Namespace page**.

![Creating Shared Access Policy](/img/send-data/shared-access-policy.png)

2. **Create a consumer group**
   1. Go to your **Event Hub**.
   2. Select **Consumer groups** on left panel.
   3. Add consumer groups by clicking **+Consumer groups**.
   4. Click **Create**.

::: note
Creating consumer groups is needed only for customers using the older event hub namespace i.e [Strategy 1](### via Existing Event Hubs Namespaces**). The default consumer group is already in use by function so we need a new one.
::
![Creating Consumer Group](/img/send-data/consumer-groups.png)

After completing the above steps, you will have **Azure Event Hubs Namespace**, **Event Hubs Instance Name**, **Shared Access Policy**, and **Consumer Group Name** - all the four parameters required for creating event hub source.

## Step 3. Creating event hub cloud-to-cloud sources

For each of the event hubs present in your namespace, you need to create a c2c source, see ![Creating Azure Event Hub Source](https://help.sumologic.com/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#create-an-azure-event-hubssource) section.

::: note
We recommend giving the same source category so that your custom dashboards or apps require no changes. You can verify whether the data comes from your source using `1_source metadata`.
:::

## Step 4. Removing older resources

After verifying that all the log types are ingesting in your new source, follow the below steps for deleting the resources created by the ARM template.

### If you have created a new namespace

If your resource group contains only resources created by the older ARM template, as shown below, and you have created a new namespace in a different resource group, see step 1 in [Strategy 2](### via Creating New Event Hub Namespaces).

 ![Resource Groups](/img/send-data/removing-resource-step1.png)

 1. **Stopping the data flow in older sumo logic source**
    To stop the logs export to the older event hub namespace, we need to delete the older diagnostic settings. You can delete them by following the steps below for each of your azure services that are sending logs to sumo.
   1. Go to **Azure Portal**
   2. Search for **Diagnostic Settings** in the **Search bar**, it will take you to a page with all the resources which have diagnostic settings.
   3. Select your **subscription**, **resource group** (for the azure service whose logs you are ingesting into sumo), and whose diagnostics status is enabled.

  ![Stopping Data Flow](/img/send-data/stopping-dataflow.png)

   4. Select the resource name (whose logs you are ingesting into sumo) it shows a list of diagnostic settings.

  ![Diagnostic Settings](/img/send-data/diagnostic-settings.png)  

   5. Select the setting whose event hub column matches with your older event hub namespace. Go to **Edit settings** corresponding to that setting and delete it.

 2. **Wait for all data to be ingested into Sumo**
 The azure function is draining all the logs from the older event hub namespace and sending them to sumo, we will need to wait till it finishes it. You can run a query in sumo with your older source name `(_source=<your older source name>)` and see if all the data has already come into sumo till the date when you deleted the diagnostic settings.

 3. **Verify the new source is ingesting logs without any delay**
 You can run the below query to verify the latency.

 ```sql
 _source=<new source name>
| formatDate(fromMillis(_receipttime),"MM/dd hh:mm") as r
| formatDate(fromMillis(_messagetime),"MM/dd hh:mm") as t
| abs(_receipttime - _messagetime) as delt| delt/1000/60 as delt
| timeslice 10m
| min(delt), max(delt), avg(delt) by _timeslice
```

::: note
We recommend monitoring the new source for a day to verify the delay.
:::

 4. **Deleting Resources**
 Once you are sure your older data is in sumo and your new source is working without any latency, then you can delete the whole resource group by clicking on the **Delete resource group** button.

![Resource Groups](img/send-data/resource-groups-step2.png)

::: note
If you see more resources than the ones shown in the above screenshot you can delete all 6 individual resources (the ones with the prefix sumo) one by one by selecting each resource and clicking on the Delete button at the top bar.
:::

### If using an existing event hub namespace

1. **Stopping the data flow in older sumo logic source**
The newer source will start collecting data from the point you created the source. You can verify that by running `(_source=<new source name>)` in sumo. After verifying the logs, you can stop the function apps by following the steps below.
  1. Go to the resource group, where Sumo Logic’s log collection ARM template was deployed, and select the **SumoAzureLogs<> Function** app.
  2. Click **Stop** at the top bar as shown below.

  ![Stopping Data Flow](img/send-data/stopping-data-flow2.png)

2. **Verify the new source is ingesting logs without any delay**
 You can run the below query to verify the latency.

 ```sql
 _source=<new source name>
| formatDate(fromMillis(_receipttime),"MM/dd hh:mm") as r
| formatDate(fromMillis(_messagetime),"MM/dd hh:mm") as t
| abs(_receipttime - _messagetime) as delt| delt/1000/60 as delt
| timeslice 10m
| min(delt), max(delt), avg(delt) by _timeslice
```
::: note
We recommend monitoring the new source for a day to verify the delay.
:::

3. **Deleting Resources**
After making sure that your new source is working without any latency, you can delete all 5 individual resources except the **Event Hub Namespace** (the ones with the prefix sumo) by selecting each resource and clicking on the **Delete** button at the top bar.

![Delete Resource Groups](/img/send-data/delete-resource-groups.png)

# FAQ
Q1. After migrating to C2C, will the (data volume) that can be acquired increase compared to when configured with the previous ARM Template?
A. There won't be any change in data volume since these are the same logs we are just changing the collection method.

Q2. There is a 'Shared access policies' available at the event hub namespace level, can we create a single policy with a 'listen' scope, and apply the same policy for all instances?
A. Yes.

Q3. When to create a new event hub namespace?
A. To learn more, refer to the ![FAQ](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-faq#when-do-i-create-a-new-namespace-vs--use-an-existing-namespace-docs) section to decide whether you need single or multiple event hub namespaces.
