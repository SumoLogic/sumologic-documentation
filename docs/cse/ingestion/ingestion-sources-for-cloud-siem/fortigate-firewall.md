---
id: fortigate-firewall
title: Ingest Fortigate Firewall Data into Cloud SIEM
sidebar_label: Fortigate Firewall
description: Configure a syslog source to ingest Fortigate Firewall log messages to be parsed by Cloud SIEM’s system parser for Fortigate Firewall.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Fortigate Firewall data into Cloud SIEM:
1. [Configure a Syslog source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-a-syslog-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/Fortinet/Fortigate/Fortigate-Syslog*. This ensures that the Fortigate Firewall logs are parsed and normalized into structured records in Cloud SIEM.
Configure FortiGate
1. Configure forwarding to the the syslog source:
    * If your FortiGate logs are aggregated by FortiAnalyzer, you can forward them to Sumo Logic  as described in [Configuring log forwarding](https://help.fortinet.com/fa/faz50hlp/56/5-6-1/FMG-FAZ/2400_System_Settings/1600_Log%20Forwarding/0400_Configuring.htm?Highlight=syslog) in FortiAnalyzer help.
    * If your FortiGate logs are not aggregated by FortiAnalyzer, you can forward them to Sumo Logic directly from FortiGate as described in [FortiOS documentation for syslog forwarding](https://docs.fortinet.com/document/fortigate/6.4.0/administration-guide/610676/configuring-multiple-fortianalyzers-or-syslog-servers-per-vdom).
    :::note
    Cloud SIEM supports standard syslog, CEF, or JSON log formats from FortiGate. Different parsers are required for CEF and JSON format logs.
    :::
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "FortiGate" and check the **Records** columns. A list of mappers for FortiGate will appear and you can see if logs are coming in.
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for FortiGate security records:<br/>`_index=sec_record* and metadata_product = "Fortigate"`