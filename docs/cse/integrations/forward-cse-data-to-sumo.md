---
id: forward-cse-data-to-sumo
---

# Forward CSE Data to Sumo Logic Platform

:::note
The information in this topic applies to CSE users whose portal URL ends in `jask.ai`. If your portal URL ends in `sumologic.com`, see [Forward CSE Signals to Sumo Logic](forward-cse-signals-to-sumo.md).
:::

This topic has instructions for how to send Records and Signals to the Sumo Logic platform. Once you perform the configuration described below, CSE will start sending data on a continuous basis. 

## About the configuration process

The integration process described in this topic consists of creating an HTTP Source in Sumo Logic to which the data from CSE will be sent, and configuring one or more indexes in CSE. An index configuration specifies the type of CSE data to send to Sumo Logic (Records or Signals), the URL of the target  HTTP Source, and optionally, filtering criteria to limit the data that is sent. The name you assign to the index configuration will be used to form a metadata field, `_sourceCategory`, which will be attached to the forwarded data—you’ll be able to use the `_sourceCategory` value to search the CSE data in Sumo Logic platform. 

An index you create in CSE is specific to the type of data you want to send to Sumo Logic: Records or Signals. So, if you want to send both, at a minimum you’d set up two index configurations. You might want to segment your data further, for instance by assigning Records to different index configurations in CSE. Doing so will make it easier to search the CSE data in Sumo Logic, because the data assigned to each index has its own `_sourceCategory`. 

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
1. The **HTTP Source Address** popup appears. Copy the URL. You'll need to supply in the following step.

    ![http-source-address.png](/img/cse/http-source-address.png)

## Configure CSE to forward data to Sumo Logic platform

In this step, you configure an index in CSE that specifies what type of data you want to send to the Sumo Logic platform, the URL of the target HTTP Source on Sumo Logic, and if desired, a filter expression to limit the data forwarded to Sumo Logic. 

Perform these steps for each CSE data set you want to send to Sumo Logic,

1. In the CSE UI, click the gear icon, and then click Sumo Logic.

    [integrations-sumo.png](/img/cse/integrations-sumo.png)
1. On the **Integrations** page, click **Index**, and then **Create**.

    [index-icon.png](/img/cse/index-icon.png)
1. The **Create Index Configuration** page appears.

    [create-index-configuration.png](/img/cse/create-index-configuration.png)
1. **Name**. This will be used in the `_sourceCategory` metadata field that Sumo Logic will apply to the data you send from CSE to Sumo Logic.
1. **Data Stream**. Select one of the following options: 

   * **Record**. CSE will send Records to the Sumo Logic platform. 
   * **Signals**. CSE will send Signals to the Sumo Logic platform.

1. **Index URL**. Enter the URL for the HTTP Source you created above.
1. **Filter Expression**. (Optional) If you enter a filter expression, only data that matches the expression will be sent to the specified HTTP Source. Filtering is most useful when you're forwarding Records (as opposed to raw messages or Signals. To filter Records, you can use any of the functions supported in rule expressions. For more information, see [CSE Rules Syntax](../cse-rules/cse-rules-syntax.md).
1. Click **Create**.
