---
id: palo-alto-firewall
title: Palo Alto Firewall
sidebar_label: Palo Alto Firewall
description: Configure collection of Palo Alto Firewall log messages to be parsed by CSE's system parser for Palo Alto Firewall.
---

This section has instructions for collecting Palo Alto Firewall log messages and sending them to Sumo Logic to be ingested by CSE.

Sumo Logic CSE supports the default comma separated value (CSV), as well as Common Event Format (CEF) logs from Palo Alto Firewalls running PAN OS 9. This guide provides steps for collecting CSV format logs.

## Step 1: Configure collection

In this step, you configure a Syslog Source to collect Palo Alto Firewall log messages. You can configure the source on an existing Installed Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure a Syslog Source](#configure-a-syslog-source) below. Otherwise, create a new collector as described in [Configure an Installed Collector](#configure-an-installed-collector) below, and then create the Syslog Source on the collector.

### Configure an Installed Collector

1. In the Sumo Logic platform, select **Manage Data \> Collection \> Collection**.
1. Click **Add Collector**.
1. Click **Installed Collector**.
1. The **Add Installed Collector** popup appears.
1. Download the appropriate collector for your operating system.
1. Install the collector. Instructions for your preferred operating system and method of installation are available on the Installed Collectors page.
1. Once the collector is installed, confirm it is available on the **Collection** page and select **Edit**.
1. The **Edit Collector popup** appears.  
    ![edit-collector.png](/img/cse/edit-collector.png)
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    1. If you are planning that all sources you add to this collector will use the same log parser (if they are the same type of log), click the **+Add Field** link, and add a field whose name is `_parser` with the value */Parsers/System/Palo Alto/PAN Firewall CSV*. This will cause all sources on the collector to use the specified parser. It’s also possible to configure individual sources to forward to CSE, as described in the following section
1. Click **Save**.

### Configure a Syslog Source

1. In Sumo Logic, select **Manage Data \> Collection \> Collection**. 
1. Navigate to the Installed Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to an Installed Collector.
1. Select **Syslog**. 
1. The page refreshes.  
    ![syslog-source.png](/img/cse/syslog-source.png)
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Protocol**. Select the protocol that your syslog-enabled devices are currently using to send syslog data, UDP or TCP. For more information, see Choosing TCP or UDP on the *Syslog Source* page.
1. **Port**. Enter the port number for the Source to listen to. If the collector runs as root (default), use 514. Otherwise, consider 1514 or 5140. Make sure the devices are sending to the same port.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. Make a note of the source category. You’ll supply it in [Step 2](#step-2-configure-palo-alto-firewall) below.
1. **Fields**. 
    1. If you have not configured the Installed Collector to forward  all sources in the collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*.
    1. If you have not configured the Installed Collector to parse all sources in the collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with the value */Parsers/System/Palo Alto/PAN Firewall CSV*. 
1. Click **Save**.

## Step 2: Configure Palo Alto Firewall

In this step you configure Palo Alto Firewall to send log messages to the Sumo Logic platform. Follow Palo Alto documentation to [Configure Log Forwarding](https://docs.paloaltonetworks.com/pan-os/8-1/pan-os-admin/monitoring/configure-log-forwarding). 

## Step 3: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon, and select **Log Mappings** under **Incoming Data**.  
    ![log-mappings-link.png](/img/cse/log-mappings-link.png)
1. On the **Log Mappings** page search for "Palo Alto" and check under **Record Volume**.   
    ![palo-alto-firewall-record-volume.png](/img/cse/palo-alto-firewall-record-volume.png)
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Palo Alto Firewall security records.  
    ![palo-alto-firewall-search.png](/img/cse/palo-alto-firewall-search.png)
