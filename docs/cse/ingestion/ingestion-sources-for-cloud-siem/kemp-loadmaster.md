---
id: kemp-loadmaster
title: Ingest Kemp LoadMaster Data into Cloud SIEM
sidebar_label: Kemp LoadMaster
description: Configure a syslog source to ingest Kemp LoadMaster messages to be parsed by Cloud SIEM’s system parser for Kemp LoadMaster.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Kemp LoadMaster data into Cloud SIEM:
1. [Configure a Syslog source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-a-syslog-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/Kemp/Kemp LoadMaster Syslog*. This ensures that the Kemp LoadMaster logs are parsed and normalized into structured records in Cloud SIEM.
       :::note
       The Sumo Logic parser for Kemp LoadMaster logs primarily supports wafd (Web Application Firewall daemon) logging and various l4d (Layer 4 Load Balancing daemon) log messages. Other messages will parse, but a parser [local configuration](/docs/cse/schema/parser-editor/) might be required to actually extract all fields. 
       :::
1. Follow the instructions provided on the Kemp support site to [configure syslog logging](https://support.kemptechnologies.com/hc/en-us/articles/216491943-How-to-configure-the-LoadMaster-to-send-unexpected-reboot-event-logs-to-a-Syslog-Server). While this linked page only focuses on unexpected reboot logs, the process for enabling other log types is the same. See [Configure forwarding to a Syslog Source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-forwarding-to-a-syslogsource) for general instructions to configure forwarding to a syslog source.
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "Kemp" and check the **Records** column. A list of mappers for Kemp will appear and you can see if logs are coming in. 
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Kemp security records:<br/>`_index=sec_record* and metadata_product = "LoadMaster"`