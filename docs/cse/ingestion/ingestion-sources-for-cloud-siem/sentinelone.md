---
id: sentinelone
title: SentinelOne - Cloud SIEM
sidebar_label: SentinelOne
description: Learn how to collect SentinelOne log messages and send them to Sumo Logic to be ingested by Cloud SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for collecting SentinelOne log messages and sending them to Sumo Logic to be ingested by Cloud SIEM.

## Step 1: Configure collection

In this step, you configure a Cloud Syslog Source to collect SentinelOne log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure a Cloud Syslog Source](#configure-a-cloud-syslog-source) below. Otherwise, create a new collector as described in [Configure a Hosted Collector](#configure-a-hosted-collector) below, and then create the Cloud Syslog Source on the collector.

### Configure a Hosted Collector

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Click **Add Collector**.
1. Click **Hosted Collector.**
1. The **Add Hosted Collector** popup appears. <br/><img src={useBaseUrl('img/cse/add-hosted-collector.png')} alt="Add hosted collector" style={{border: '1px solid gray'}} width="500"/> 
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to Cloud SIEM, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to Cloud SIEM.
    1. If all sources in this collector will be Sentinel One sources, add an additional field with key `_parser`; set the value to:
        * */Parsers/System/SentinelOne/SentinelOne CEF* if your logs are in CEF format.
        * */Parsers/System/SentinelOne/SentinelOne Syslog* if your logs are in Syslog format.

### Configure a Cloud Syslog Source

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  
1. Navigate to the Hosted Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to the Hosted
    Collector.
1. Select **Cloud Syslog**. 
1. The page refreshes. <br/><img src={useBaseUrl('img/cse/cloud-syslog-source.png')} alt="Cloud syslog source" style={{border: '1px solid gray'}} width="500"/>
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Source Host**. (Optional) Enter a string to tag the messages collected from the source. The string that you supply will be saved in a metadata field called `_sourceHost`.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. Make a note of the source category. You’ll supply it in Step 2 below.
1. **Fields**. 
    1. If you have not configured the Installed Collector to forward all sources in the collector to Cloud SIEM, click the **+Add Field** link, and add a field whose name is `_siemForward `and value is *true*.
    1. If you have not configured the collector to parse all sources in  the collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser`; set the value to:
        * */Parsers/System/SentinelOne/SentinelOne CEF* if your logs  are in CEF format.
        * */Parsers/System/SentinelOne/SentinelOne Syslog* if your logs are in Syslog format.
1. Click **Save**.
1. Make a note of the **Token** and **Host** that are displayed. You’ll supply them in [Step 2](#step-2-configure-sentinelone) below.

## Step 2: Configure SentinelOne

In this step you configure SentinelOne to send log messages to the Sumo Logic platform. If you have a SentinelOne account, you can follow directions on the SentinelOne Support [knowledge base](https://support.sentinelone.com/hc/en-us/articles/360007044894-Syslog-Integration-with-Sumo-Logic), or the instructions in Step 2 of [Collecting Logs for SentinelOne](/docs/send-data/collect-from-other-data-sources/collect-logs-sentinelone/#step-2-configure-syslog-messages) topic.

## Step 3: Verify ingestion

In this step, you verify that your logs are successfully making it into Cloud SIEM. 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
1. On the **Log Mappings** page search for "SentinelOne" and check under **Record Volume**.<br/><img src={useBaseUrl('img/cse/sentinelone-record-volume.png')} alt="SentinelOne record volume" style={{border: '1px solid gray'}} width="600"/>
1. For a more granular look at the incoming records, you can also use the Sumo Logic platform to search for SentinelOne security records.<br/><img src={useBaseUrl('img/cse/sentinelone-search.png')} alt="SentinelOne search" style={{border: '1px solid gray'}} width="400"/> 
     
