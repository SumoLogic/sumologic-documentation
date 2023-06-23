---
id: linux-os-syslog
title: Linux OS Syslog - Cloud SIEM
sidebar_label: Linux OS Syslog
description: Configure a syslog source to ingest Linux OS log messages to be parsed by CSE’s system parser for Linux OS Syslog.
---

This section has instructions for collecting Linux OS Syslog log messages and sending them to Sumo Logic to be ingested by CSE.

Current distributions of Linux write logs using Rsyslog and Systemd-journal. CSE currently supports Rsyslog and Systemd-journal logging in Linux.

## Supported Linux distributions and processes

Currently, support for Linux OS is limited to the following distributions of Linux:

* Red Hat Enterprise Linux
* Ubuntu
* Amazon Linux

Currently, support is limited to security-relevant processes, including:

* cron
* dhclient
* gpasswd
* groupadd
* groupdel
* groupmod
* passwd
* sshd
* su
* sudo
* useradd
* userdel
* usermod
* systemd
* omiserver

## Step 1: Configure collection

In this step, you configure a Syslog Source to collect Linux OS log messages. You can configure the source on an existing Installed Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure a Syslog Source](#configure-a-syslog-source) below. Otherwise, create a new collector as described in [Configure an Installed Collector](#configure-an-installed-collector) below, and then create the Syslog Source on the collector.

### Configure an Installed Collector

1. In the Sumo Logic platform, select **Manage Data** > **Collection** > **Collection**.
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
1. **Category**. Enter a string to tag the output collected from the
    source. The string that you supply will be saved in a metadata field
    called `_sourceCategory`. 
1. **Fields**. 
    * If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    * If you are planning that all sources you add to this collector will use the same log parser (if they are the same type of log), click the **+Add Field** link, and add a field whose name is `_parser` with the value */Parsers/System/Linux/Linux OS Syslog*. This will cause all sources on the collector to use the specified parser. It’s also possible to configure individual sources to forward to CSE, as described in the following section
1. Click **Save**.

### Configure a Syslog Source

1. In Sumo Logic, select **Manage Data > Collection >
    Collection**. 
1. Navigate to the Installed Collector where you want to create the
    source.
1. On the **Collectors** page, click **Add Source** next to an
    Installed Collector.
1. Select **Syslog**. 
1. The page refreshes.  
    ![syslog-source.png](/img/cse/syslog-source.png)
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Protocol**. Select the protocol that your syslog-enabled devices are currently using to send syslog data, UDP or TCP. For more information, see Choosing TCP or UDP on the *Syslog Source* page.
1. **Port**. Enter the port number for the Source to listen to. If the collector runs as root (default), use 514. Otherwise, consider 1514 or 5140. Make sure the devices are sending to the same port.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. Make a note of the source category. You’ll supply it in [Step 2](#step-2-configure-linux-os) below.
1. **Fields**. 
    * If you have not configured the Installed Collector to forward all sources in the collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*.
    * If you have not configured the Installed Collector to parse all sources in the collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with the value */Parsers/System/Linux/Linux OS Syslog*. 
1. Click **Save**.

## Step 2: Configure Linux OS

In this step, you configure forwarding to the the Syslog Source. Follow the instructions in the  Configure forwarding to Syslog Source section of the *Syslog Source* page. 

## Step 3: Verify Ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon at the top of the CSE UI, and select **Log Mappings** under **Incoming Data**.  
    ![log-mappings-link.png](/img/cse/log-mappings-link.png)
1. On the **Log Mappings** page search for "Linux OS" and check under  **Record Volume.** A list of mappers for Linux OS Syslog will appear and you can see if logs are coming in.   
    ![record-volume.png](/img/cse/record-volume.png)
1. For a more granular look at the incoming Records, you can also search the Sumo Logic platform for Linux OS security records.  
    ![search.png](/img/cse/search.png)
