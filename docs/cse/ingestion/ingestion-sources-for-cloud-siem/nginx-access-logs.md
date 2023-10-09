---
id: nginx-access-logs
title: Nginx Access Logs - Cloud SIEM
sidebar_label: Nginx Access Logs
description: Configure a syslog source to ingest Nginx Access log messages to be parsed by CSE’s system parser for Nginx.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for collecting Nginx Access Log Syslog messages and sending them to Sumo Logic to be ingested by CSE.

## Step 1: Configure collection

In this step, you configure a Syslog Source to collect Nginx Access Log messages. You can configure the source on an existing Installed Collector or create a new collector.

The Sumo Logic parser for Nginx Access Log messages supports the default “combined” format defined in `/etc/nginx/nginx.conf` and will allow additional information to be appended to that format without causing parsing to fail. Note that appended fields in a custom format will not be parsed without local configurations being applied. Other than appended fields that have local configurations applied, changes you make to the default format itself are not supported by the Sumo Logic parser.

If you’re going to use an existing collector, jump to [Configure a Syslog Source](#configure-a-syslog-source) below. Otherwise, create a new collector as described in [Configure an Installed Collector](#configure-an-installed-collector) below, and then create the Syslog Source on the collector.

### Configure an Installed Collector

1. In the Sumo Logic platform, select **Manage Data** > **Collection** > **Collection**.
1. Click **Add Collector**.
1. Click **Installed Collector**.
1. The **Add Installed Collector** popup appears.
1. Download the appropriate collector for your operating system.
1. Install the collector. Instructions for your preferred operating system and method of installation are available on the [Installed Collectors](/docs/send-data/installed-collectors) page.
1. Once the collector is installed, confirm it is available on the **Collection** page and select **Edit**.
1. The **Edit Collector popup** appears. <br/><img src={useBaseUrl('img/cse/edit-collector.png')} alt="Edit collector" width="500"/>
1. **Name**. Provide a name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    * If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    * If you are planning that all sources you add to this collector will use the same log parser (if they are the same type of log), click the **+Add Field** link, and add a field whose name is `_parser` with the value */Parsers/System/Nginx/Nginx Syslog*. This will cause all sources on the collector to use the specified parser.
    :::note
    It’s also possible to configure individual sources to forward to CSE, as described in the following section.
    :::
1. Click **Save**.

### Configure a Syslog Source

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Navigate to the Installed Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to an Installed Collector.
1. Select **Syslog**. 
1. The page refreshes. <br/><img src={useBaseUrl('img/cse/syslog-source.png')} alt="Syslog source" width="500"/>
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Protocol**. Select the protocol that your syslog-enabled devices are currently using to send syslog data, UDP or TCP. For more information, see [Choosing TCP or UDP](/docs/send-data/installed-collectors/sources/syslog-source#choosing-tcp-or-udp) on the *Syslog Source* page.
1. **Port**. Enter the port number for the Source to listen to. If the collector runs as root (default), use 514. Otherwise, consider 1514 or 5140. Make sure the devices are sending to the same port.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. Make a note of the source category. You’ll supply it in Step 2 below.
1. **Fields**. 
    * If you *have not* configured the Installed Collector to forward all sources in the collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*.
    * If you *have not* configured the Installed Collector to parse all sources in the collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with the value */Parsers/System/Nginx/Nginx Syslog *. 
1. Click **Save**.

## Step 2: Configure Nginx 

Follow the Nginx [instructions](https://docs.nginx.com/nginx/admin-guide/monitoring/logging/?_bt=569896217465&_bk=&_bm=&_bn=g&_bg=129938098486&gclid=Cj0KCQiAraSPBhDuARIsAM3Js4ofA0fdqQ-4JXfkhqJFoX7qjLl7hdHhuVe4CJsI1ESWUUdnekGV03saAuS9EALw_wcB) for configuring the access log. General instructions to Configure forwarding to Syslog Source are available in Sumo Logic help.

### Step 3: Verify Ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon at the top of the CSE UI, and select **Log Mappings** under **Incoming Data**.<br/><img src={useBaseUrl('img/cse/log-mappings-link.png')} alt="Log Mapping link" width="400"/> 
1. On the **Log Mappings** page search for "Nginx" and check under **Record Volume**, a list of mappers for Nginx will appear and you can see if logs are coming in.<br/><img src={useBaseUrl('img/cse/nginx-record-volume.png')} alt="Nginix record volume" width="600"/>
1. For a more granular look at the incoming Records, you can also search the Sumo Logic platform for Nginx security records. <br/><img src={useBaseUrl('img/cse/nginx-search.png')} alt="Nginix search" width="400"/> 
