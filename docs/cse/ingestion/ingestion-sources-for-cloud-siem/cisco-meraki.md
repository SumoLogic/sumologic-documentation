---
id: cisco-meraki
title: Ingest Cisco Meraki Data into Cloud SIEM
sidebar_label: Cisco Meraki
description: Configure a syslog source to ingest Cisco Meraki log messages to be parsed by Cloud SIEM’s system parser for Cisco Meraki.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Cisco Meraki data into Cloud SIEM:
1. [Configure a Syslog source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-a-syslog-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/Cisco/Cisco Meraki*. This ensures that the Cisco Meraki logs are parsed and normalized into structured records in Cloud SIEM.
1. Configure logging for Cisco Meraki as described in [Syslog Server Overview and Configuration](https://documentation.meraki.com/General_Administration/Monitoring_and_Reporting/Syslog_Server_Overview_and_Configuration) in Cisco help.
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "Cisco Meraki" and check the **Records** columns. A list of mappers for Cisco Meraki will appear and you can see if logs are coming in.
    1. For a more granular look at the incoming records, you can also use search the Sumo Logic platform for Cisco Meraki security records:<br/>`_index=sec_record* and metadata_product = "Meraki"`