---
id: forward-cse-signals-to-sumo
title: Forwarding CSE Signals to Sumo Logic
sidebar_label: Send CSE Signals to Sumo Logic
description: Learn how to send raw messages, and Signals from CSE to the Sumo Logic platform.
---


:::note
The information in this topic applies to CSE users whose portal URL ends in `sumologic.com`. If your portal URL ends in `jask.ai`, see [Forward CSE Data to Sumo Logic](forward-cse-data-to-sumo.md).
:::

This topic has instructions for how to send Signals from CSE to the Sumo Logic platform. Once you perform the configuration described below, CSE will start sending data on a continuous basis. 

:::note
Forwarding of CSE Records to CSE is enabled automatically. No configuration is necessary, on either the CSE or Sumo Logic platform side.
:::

## About the configuration process

The integration process consists of creating an HTTP Source in Sumo Logic to which the data from CSE will be sent, and configuring one or more *indexes* in CSE. An index configuration specifies the URL of the target  HTTP Source, and optionally, filtering criteria to limit the data that is sent. The name you assign to the index configuration will be used to form a metadata field, `_sourceCategory`, which will be attached to the forwarded data—you’ll be able to use the `_sourceCategory` value to search the CSE data in Sumo Logic platform. 

If you see a benefit to doing so, you can segment your data further, by creating multiple index configurations, and filtering the Signals that go to each. Doing so will make it easier to search the CSE data in Sumo Logic, because the data assigned to each index has its own `_sourceCategory`. 

## Configure an HTTP Source in Sumo Logic 

In this step, you create an HTTP Source on a Hosted Collector on the Sumo Logic platform to receive data from CSE. You can use an existing Hosted Collector, or configure a new collector, as described in the Create a Hosted Collector topic.

To configure an HTTP Source:

1. In the Sumo Logic web app, go to **Manage Data \> Collection \> Collection**. 
1. On the **Collection** page, find the Host Collector where you want to locate the HTTP Source, and click **Add Source**.
1. On the **Select Source…** page, click **HTTP Logs & Metrics**. 
1. The source configuration page appears.

    ![source-for-cse.png](/img/cse/source-for-cse.png)
1. **Name**. Enter a name for the source.  
1. **Description**. (Optional) Enter a description of the source.
1. Click **Save**.
1. The **HTTP Source Address** popup appears. Copy the URL.  

### Configure CSE to forward Signals to Sumo Logic

In this step, you configure an index in CSE that specifies the URL of the target HTTP Source on Sumo Logic, and if desired, a filter expression to limit the data forwarded to Sumo Logic. 

Perform these steps for each CSE data set you want to send to Sumo Logic,

1. In the CSE UI, click the gear icon, and then choose **Sumo Logic** under **Integrations**.

    ![gear-sumologic.png](/img/cse/gear-sumologic.png)
1. On the **Integrations** page, click **Index**, and then **Create**.

    ![create-button.png](/img/cse/create-button.png)
1. The **Create Index Configuration** page appears.

    ![create-index-configuration.png](/img/cse/create-index-configuration.png)
1. **Name.** This will be used in the `_sourceCategory` metadata field that Sumo Logic will apply to messages and Signals you send from CSE to Sumo Logic.
1. **Data Stream**. By default, the **Signal** option is selected. Leave it selected.
1. **Index URL**. Enter the URL for the HTTP Source you created in the previous section.
1. **Filter Expression.** (Optional) If you enter a filter expression, only data that matches the expression will be sent to the specified HTTP Source. To filter the data sent, you can use any of the functions supported in rule expressions. For more information, see [CSE Rules Syntax](../rules/cse-rules-syntax.md).
1. Click **Create**.

## Searching CSE data in Sumo Logic

The table below shows the metadata to use when searching for CSE raw messages, Signals, and Records in Sumo Logic.

| To search for... | Use this metadata in the scope of your search... |
|--|--|
| Signals | `_sourceCategory=asoc/SIGNAL/<CseIndexName>` where `<CseIndexName>` is the name of the index configuration you created for Signals in the previous section. |
| Records | `_index = <PartitionName>` where `<PartitionName>` is the name of a Sumo Logic partition that contains CSE Records. For Partition names and more information about searching for CSE Records in Sumo Logic, see Searching for CSE Records in Sumo Logic. |
 
