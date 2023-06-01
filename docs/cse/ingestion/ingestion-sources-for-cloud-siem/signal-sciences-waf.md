---
id: signal-sciences-waf
title: Signal Sciences WAF - Cloud SIEM
sidebar_label: Signal Sciences WAF
description: Lean how to collect Signal Sciences WAF log messages and sending them to Sumo Logic to be ingested by CSE.
---

This section has instructions for collecting Signal Sciences WAF log messages and sending them to Sumo Logic to be ingested by CSE.

## Step 1: Configure collection

In this step, you configure an HTTP Source to collect Signal Sciences WAF log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure an HTTP Source](#configure-an-http-source) below. Otherwise, create a new collector as described in [Configure a hosted collector](#configure-a-hosted-collector) below, and then create the HTTP Source on the collector.

### Configure a Hosted Collector

1. In the Sumo Logic platform, select **Manage Data** > **Collection** > **Collection**.
1. Click **Add Collector**.
1. Click **Hosted Collector.**
1. The **Add Hosted Collector** popup appears.  
    ![add-hosted-collector.png](/img/cse/add-hosted-collector.png)
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field  called `_sourceCategory`.
1. **Fields**. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
:::note
It’s also possible to configure individual sources to forward to CSE, as described in the following section.
:::

### Configure an HTTP Source

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Navigate to the Hosted Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
1. Select **HTTP Logs & Metrics**. 
1. The page refreshes.  
    ![http-source.png](/img/cse/http-source.png)
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Source Host.** (Optional) Enter a string to tag the messages collected from the source. The string that you supply will be saved in a metadata field called `_sourceHost.`
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. Make a note of the source category. You’ll supply it in [Step 2](#step-2-configure-signal-sciences-waf) below.
1. **SIEM Processing.** Click the checkbox to configure the source to forward log messages to CSE.
1. **Advanced Options for Logs**. For information about the optional advance options you can configure, see HTTP Logs and Metrics Source.
1. Click **Save**.
1. Make a note of the HTTP Source URL that is displayed. You’ll supply it in [Step 2](#step-2-configure-signal-sciences-waf) below.

## Step 2: Configure Signal Sciences WAF

In this step you configure Signal Sciences WAF to send log messages to the Sumo Logic platform.

1. Go to the **SigSci Site Tools > Integrations** in the **SigSci** dashboard.
1. Click **Add** for **Generic Webhook**.
1. Paste the HTTP Source URL from the previous step into the **Webhook URL** field and click **Add**.

For more information on Generic Webhooks refer to the [Generic Webhooks](https://docs.fastly.com/signalsciences/integrations/generic-webhooks/) page in Fastly help.

## Step 3: CSE Ingest Configuration

In this step, you configure a Sumo Logic Ingest Mapping in CSE for the source category assigned to your source or collector you configured in [Step 1](#step-1-configure-collection). The mapping tells CSE the information it needs to select the right mapper to process messages that have been tagged with that source category. 

1. Click the gear icon, and select **Sumo Logic** under **Integrations**.  
    ![gear-sumo-link.png](/img/cse/gear-sumo-link.png)
1. On the **Sumo Logic Ingest Mappings** page, click **Create**.
1. On the **Create Sumo Logic Mapping** popup:
    * **Source Category**. Enter the category you assigned to the HTTP Source or Hosted Collector in [Step 1](#step-1-configure-collection). 
    * **Format**. Enter *JSON.*
    * **Vendor**. Enter *SignalSciences*.
    * **Product**. Enter *WAF*. 
    * **Event ID**. Enter *.\**
1. Click **Create** to save the mapping.

## Step 4: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon at the top of the CSE UI, and select **Log Mappings** under **Incoming Data**.  
    ![log-mappings-link.png](/img/cse/log-mappings-link.png)
1. On the **Log Mappings** page search for "Signal Sciences" and check under **Record Volume**.  
    ![signal-sciences-record-volume.png](/img/cse/signal-sciences-record-volume.png)
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Signal Sciences WAF security records.  
     
