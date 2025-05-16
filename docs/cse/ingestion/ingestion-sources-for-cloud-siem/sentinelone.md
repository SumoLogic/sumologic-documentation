---
id: sentinelone
title: Ingest SentinelOne Data into Cloud SIEM
sidebar_label: SentinelOne
description: Learn how to collect SentinelOne log messages and send them to Sumo Logic to be ingested by Cloud SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article has instructions for collecting SentinelOne log messages for CEF and Syslog ingest and sending them to Sumo Logic to be ingested by Cloud SIEM. (To collect data such as activities, agents, and threats, use the [SentinelOne Mgmt API Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sentinelone-mgmt-api-source/).)

To ingest SentinelOne data into Cloud SIEM:
1. [Configure a Syslog source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-a-syslog-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. To ensure that the SentinelOne logs are parsed and normalized into structured records in Cloud SIEM, add another field whose name is `_parser` and set the value to:
        * */Parsers/System/SentinelOne/SentinelOne CEF* if your logs  are in CEF format.
        * */Parsers/System/SentinelOne/SentinelOne Syslog* if your logs are in Syslog format.
    1. Make a note of the **Source Category**, **Token**, and **Host** for the syslog source. You’ll supply them in the next step.
1. Configure SentinelOne to send log messages to the Sumo Logic platform. If you have a SentinelOne account, you can follow directions on the SentinelOne Support [knowledge base](https://support.sentinelone.com/hc/en-us/articles/360007044894-Syslog-Integration-with-Sumo-Logic), or the instructions in [Step 2 of the *Collecting Logs for SentinelOne* article](/docs/send-data/collect-from-other-data-sources/collect-logs-sentinelone/#step-2-configure-syslog-messages).
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "SentinelOne" and check the **Records** columns.
    1. For a more granular look at the incoming records, you can also use the Sumo Logic platform to search for SentinelOne security records:<br/>`_index=sec_record* and metadata_product = "SentinelOne"`