---
id: signal-sciences-waf
title: Signal Sciences WAF - Cloud SIEM
sidebar_label: Signal Sciences WAF
description: Lean how to collect Signal Sciences WAF log messages and sending them to Sumo Logic to be ingested by Cloud SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for collecting Signal Sciences WAF log messages and sending them to Sumo Logic to be ingested by Cloud SIEM.

## Step 1: Configure collection

In this step, you configure an HTTP Source to collect Signal Sciences WAF log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure an HTTP Source](#configure-an-http-source) below. Otherwise, create a new collector as described in [Configure a hosted collector](#configure-a-hosted-collector) below, and then create the HTTP Source on the collector.

### Configure a Hosted Collector

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  
1. Click **Add Collector**.
1. Click **Hosted Collector.**
1. The **Add Hosted Collector** popup appears. <br/><img src={useBaseUrl('img/cse/add-hosted-collector.png')} alt="Add hosted collector" style={{border: '1px solid gray'}} width="500"/>
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field  called `_sourceCategory`.
1. **Fields**. If you are planning that all the sources you add to this collector will forward log messages to Cloud SIEM, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to Cloud SIEM.
:::note
It’s also possible to configure individual sources to forward to Cloud SIEM, as described in the following section.
:::

### Configure an HTTP Source

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Navigate to the Hosted Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
1. Select **HTTP Logs & Metrics**. 
1. The page refreshes. <br/><img src={useBaseUrl('img/cse/http-source.png')} alt="HTTP source" style={{border: '1px solid gray'}} width="600"/>
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Source Host.** (Optional) Enter a string to tag the messages collected from the source. The string that you supply will be saved in a metadata field called `_sourceHost.`
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. Make a note of the source category. You’ll supply it in [Step 2](#step-2-configure-signal-sciences-waf) below.
1. **SIEM Processing.** Click the checkbox to configure the source to forward log messages to Cloud SIEM.
1. **Advanced Options for Logs**. For information about the optional advance options you can configure, see [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/).
1. Click **Save**.
1. Make a note of the HTTP Source URL that is displayed. You’ll supply it in [Step 2](#step-2-configure-signal-sciences-waf) below.

## Step 2: Configure Signal Sciences WAF

In this step you configure Signal Sciences WAF to send log messages to the Sumo Logic platform.

1. Go to the **SigSci Site Tools > Integrations** in the **SigSci** dashboard.
1. Click **Add** for **Generic Webhook**.
1. Paste the HTTP Source URL from the previous step into the **Webhook URL** field and click **Add**.

For more information on Generic Webhooks refer to the [Generic Webhooks](https://docs.fastly.com/signalsciences/integrations/generic-webhooks/) page in Fastly help.

## Step 3: Cloud SIEM Ingest Configuration

In this step, you configure a Sumo Logic Ingest Mapping in Cloud SIEM for the source category assigned to your source or collector you configured in [Step 1](#step-1-configurecollection). The mapping tells Cloud SIEM the information it needs to select the right mapper to process messages that have been tagged with that source category. 

1.  [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Integrations** select **Sumo Logic**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Ingest Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Ingest Mappings**.  
1. On the **Ingest Mappings** tab, click **+ Add Ingest Mapping**.
1. On the **Add Ingest Mapping** popup:
    * **Source Category**. Enter the category you assigned to the HTTP Source or Hosted Collector in [Step 1](#step-1-configurecollection). 
    * **Format**. Enter *JSON.*
    * **Vendor**. Enter *SignalSciences*.
    * **Product**. Enter *WAF*. 
    * **Event ID**. Enter *.\**
1. Click **Create** to save the mapping.

## Step 4: Verify ingestion

In this step, you verify that your logs are successfully making it into Cloud SIEM. 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
1. On the **Log Mappings** page search for "Signal Sciences" and check the **Records** columns. <br/><img src={useBaseUrl('img/cse/signal-sciences-record-volume.png')} alt="Signal Sciences record volume" style={{border: '1px solid gray'}} width="800"/>
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Signal Sciences WAF security records.  
     
