---
id: zscaler-private-access
title: Zscaler Private Access - Cloud SIEM
sidebar_label: Zscaler Private Access
description: Configure an HTTP source to ingest Zscaler Private Access log messages and send them to Cloud SIEM’s Zscaler Private Access system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for collecting Zscaler Private Access (ZPA) log messages and sending them to Sumo Logic to be ingested by Cloud SIEM.

Sumo Logic Cloud SIEM supports ZPA logs sent as JSON.

## Step 1: Configure Sumo Logic core platform collection

In this step, you configure an HTTP Source to collect Zscaler Private Access log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure an HTTP Source](#configure-an-http-source) below.
Otherwise, create a new collector as described in [Configure a Hosted Collector](#configure-a-hosted-collector) below, and then create the HTTP Source on the collector.

### Configure a Hosted Collector

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Click **Add Collector**.
1. Click **Hosted Collector.**
1. The **Add Hosted Collector** popup appears.  <br/><img src={useBaseUrl('img/cse/add-hosted-collector.png')} alt="Add hosted collector" style={{border: '1px solid gray'}} width="500"/>
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to Cloud SIEM, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to Cloud SIEM.
    1. If all sources in this collector will be Zscaler Private Access sources, add an additional field with key `_parser` and value */Parsers/System/Zscaler/Zscaler Private Access/Zscaler Private Access-JSON*.
    :::note
    It’s also possible to configure individual sources to forward to Cloud SIEM, as described in the following section.
    :::

### Configure an HTTP Source

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Navigate to the Hosted Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
1. Select **HTTP Logs & Metrics**. 
1. The page refreshes.<br/><img src={useBaseUrl('img/cse/http-source.png')} alt="HTTP source" style={{border: '1px solid gray'}} width="600"/>
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Source Host.** (Optional) Enter a string to tag the messages collected from the source. The string that you supply will be saved in a metadata field called `_sourceHost.`
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`.
1. **Fields.** If you are not parsing all sources in the hosted collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with value */Parsers/System/Zscaler/Zscaler Private Access/Zscaler Private Access-JSON*.
1. **Advanced Options for Logs**. For information about the optional advance options you can configure, see [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/).
1. Click **Save**.
1. Make a note of the HTTP Source URL that is displayed. You’ll supply it in [Step 2](#step-2-configure-zscaler-private-access) below.

## Step 2: Configure Zscaler Private Access

In this step you configure Zscaler Private Access to send log messages to Sumo Logic core platform. For instructions, see [Configuring a Log Receiver](https://help.zscaler.com/zpa/configuring-log-receiver) in ZPA Help.

## Step 3: Verify ingestion

In this step, you verify that your logs are successfully making it into Cloud SIEM. 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
1. On the **Log Mappings** tab search for "ZPA" and check the **Records** columns.
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for "ZPA" security records. <br/><img src={useBaseUrl('img/cse/zscaler-search.png')} alt="Zscaler search" style={{border: '1px solid gray'}} width="400"/>
