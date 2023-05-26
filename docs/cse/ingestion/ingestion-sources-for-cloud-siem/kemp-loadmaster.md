---
id: kemp-loadmaster
title: Kemp LoadMaster - Cloud SIEM
sidebar_label: Kemp LoadMaster
description: Configure a syslog source to ingest Kemp LoadMaster messages to be parsed by CSE’s system parser for Kemp LoadMaster.
---

This section has instructions for collecting Kemp LoadMaster messages and sending them to Sumo Logic to be ingested by CSE.

The Sumo Logic parser for Kemp LoadMaster logs primarily supports wafd (Web Application Firewall daemon) logging and various l4d (Layer 4 Load Balancing daemon) log messages. Other messages will parse, but a parser [local configuration](../schema/parser-editor.md) might be required to actually extract all fields.  

## Step 1: Configure collection

In this step, you configure a Syslog Source to collect Kemp LoadMaster messages. You can configure the source on an existing Installed Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure a Syslog Source](#configure-a-syslog-source) below. Otherwise, create a new collector as described in [Configure an Installer collector](#configure-an-installed-collector) below, and then create the Syslog Source on the collector.

### Configure an Installed Collector

1. In the Sumo Logic platform, select **Manage Data** > **Collection** > **Collection**.
1. Click **Add Collector**.
1. Click **Installed Collector**.
1. The **Add Installed Collector** popup appears.
1. Download the appropriate collector for your operating system.
1. Install the collector. Instructions for your preferred operating system and method of installation are available on the [Installed Collectors](/docs/send-data/installed-collectors) page.
1. Once the collector is installed, confirm it is available on the **Collection** page and select **Edit**.
1. The **Edit Collector popup** appears.  
    ![edit-collector.png](/img/cse/edit-collector.png)
1. **Name**. Provide a name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    * If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    * If you are planning that all sources you add to this collector will use the same log parser (if they are the same type of log), click the **+Add Field** link, and add a field whose name is `_parser` with the value */Parsers/System/Kemp/Kemp LoadMaster Syslog*. This will cause all sources on the collector to use the specified parser.
    :::note
    It’s also possible to configure individual sources to forward to CSE, as described in the following section.
    :::
1. Click **Save**.

### Configure a Syslog Source

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Navigate to the Installed Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to an Installed Collector.
1. Select **Syslog**. 
1. The page refreshes.  
    ![syslog-source.png](/img/cse/syslog-source.png)
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Protocol**. Select the protocol that your syslog-enabled devices are currently using to send syslog data, UDP or TCP. For more information, see Choosing TCP or UDP on the *Syslog Source* page.
1. **Port**. Enter the port number for the Source to listen to. If the collector runs as root (default), use 514. Otherwise, consider 1514 or 5140. Make sure the devices are sending to the same port.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. Make a note of the source category. You’ll supply it in Step 2 below.
1. **Fields**. 
    * If you *have not* configured the Installed Collector to forward  all sources in the collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*.
    * If you *have not* configured the Installed Collector to parse all sources in the collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with the value */Parsers/System/Kemp/Kemp LoadMaster Syslog*. 
12. Click **Save**.

## Step 2: Configure Kemp LoadMaster 

Follow the instructions provided on the Kemp support site to [configure syslog logging](https://support.kemptechnologies.com/hc/en-us/articles/16491943-How-to-configure-the-LoadMaster-to-send-unexpected-reboot-event-logs-to-a-Syslog-Server).
While the linked document only focuses on unexpected reboot logs, the process for enabling other log types is the same. General instructions to Configure forwarding to Syslog Source are available in Sumo Logic help.

## Step 3: Verify Ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon at the top of the CSE UI, and select **Log Mappings** under **Incoming Data**.  
    ![log-mappings-link.png](/img/cse/log-mappings-link.png)
1. On the **Log Mappings** page search for "Kemp" and check under **Record Volume**, a list of mappers for Kemp will appear and you can see if logs are coming in.   
    ![kemp-reocrd-volume.png](/img/cse/kemp-reocrd-volume.png)
1. For a more granular look at the incoming Records, you can also search the Sumo Logic platform for Kemp security records.  
    ![kemp-search.png](/img/cse/kemp-search.png)
