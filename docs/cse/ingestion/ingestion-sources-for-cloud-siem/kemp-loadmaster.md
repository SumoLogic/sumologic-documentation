---
id: kemp-loadmaster
title: Kemp LoadMaster - Cloud SIEM
sidebar_label: Kemp LoadMaster
description: Configure a syslog source to ingest Kemp LoadMaster messages to be parsed by Cloud SIEM’s system parser for Kemp LoadMaster.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for collecting Kemp LoadMaster messages and sending them to Sumo Logic to be ingested by Cloud SIEM.

The Sumo Logic parser for Kemp LoadMaster logs primarily supports wafd (Web Application Firewall daemon) logging and various l4d (Layer 4 Load Balancing daemon) log messages. Other messages will parse, but a parser [local configuration](/docs/cse/schema/parser-editor/) might be required to actually extract all fields.  

## Step 1: Configure collection

In this step, you configure a Syslog Source to collect Kemp LoadMaster messages. You can configure the source on an existing Installed Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure a Syslog Source](#configure-a-syslog-source) below. Otherwise, create a new collector as described in [Configure an Installer collector](#configure-an-installed-collector) below, and then create the Syslog Source on the collector.

### Configure an Installed Collector

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Click **Add Collector**.
1. Click **Installed Collector**.
1. The **Add Installed Collector** popup appears.
1. Download the appropriate collector for your operating system.
1. Install the collector. Instructions for your preferred operating system and method of installation are available on the [Installed Collectors](/docs/send-data/installed-collectors) page.
1. Once the collector is installed, confirm it is available on the **Collection** page and select **Edit**.
1. The **Edit Collector popup** appears. <br/><img src={useBaseUrl('img/cse/edit-collector.png')} alt="Edit collector" style={{border: '1px solid gray'}} width="500"/>
1. **Name**. Provide a name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    * If you are planning that all the sources you add to this collector will forward log messages to Cloud SIEM, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to Cloud SIEM.
    * If you are planning that all sources you add to this collector will use the same log parser (if they are the same type of log), click the **+Add Field** link, and add a field whose name is `_parser` with the value */Parsers/System/Kemp/Kemp LoadMaster Syslog*. This will cause all sources on the collector to use the specified parser.
    :::note
    It’s also possible to configure individual sources to forward to Cloud SIEM, as described in the following section.
    :::
1. Click **Save**.

### Configure a Syslog Source

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Navigate to the Installed Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to an Installed Collector.
1. Select **Syslog**. 
1. The page refreshes. <br/><img src={useBaseUrl('img/cse/syslog-source.png')} alt="Syslog source" style={{border: '1px solid gray'}} width="500"/>
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Protocol**. Select the protocol that your syslog-enabled devices are currently using to send syslog data, UDP or TCP. For more information, see [Choosing TCP or UDP](/docs/send-data/installed-collectors/sources/syslog-source#choosing-tcp-or-udp) on the *Syslog Source* page.
1. **Port**. Enter the port number for the Source to listen to. If the collector runs as root (default), use 514. Otherwise, consider 1514 or 5140. Make sure the devices are sending to the same port.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. Make a note of the source category. You’ll supply it in Step 2 below.
1. **Fields**. 
    * If you *have not* configured the Installed Collector to forward  all sources in the collector to Cloud SIEM, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*.
    * If you *have not* configured the Installed Collector to parse all sources in the collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with the value */Parsers/System/Kemp/Kemp LoadMaster Syslog*. 
12. Click **Save**.

## Step 2: Configure Kemp LoadMaster 

Follow the instructions provided on the Kemp support site to [configure syslog logging](https://support.kemptechnologies.com/hc/en-us/articles/216491943-How-to-configure-the-LoadMaster-to-send-unexpected-reboot-event-logs-to-a-Syslog-Server).
While the linked document only focuses on unexpected reboot logs, the process for enabling other log types is the same. General instructions to Configure forwarding to Syslog Source are available in Sumo Logic help.

## Step 3: Verify Ingestion

In this step, you verify that your logs are successfully making it into Cloud SIEM. 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
1. On the **Log Mappings** tab search for "Kemp" and check the **Records** column. A list of mappers for Kemp will appear and you can see if logs are coming in. 
1. For a more granular look at the incoming Records, you can also search the Sumo Logic platform for Kemp security records. <br/><img src={useBaseUrl('img/cse/kemp-search.png')} alt="Kemp search" style={{border: '1px solid gray'}} width="400"/>
