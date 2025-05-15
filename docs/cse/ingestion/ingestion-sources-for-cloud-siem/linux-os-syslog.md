---
id: linux-os-syslog
title: Ingest Linux OS Syslog Data into Cloud SIEM
sidebar_label: Linux OS Syslog
description: Configure a syslog source to ingest Linux OS log messages to be parsed by Cloud SIEM’s system parser for Linux OS Syslog.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Linux OS data into Cloud SIEM:
1. [Configure a Syslog source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-a-syslog-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/Linux/Linux OS Syslog*. This ensures that the Linux OS logs are parsed and normalized into structured records in Cloud SIEM.
1. Configure forwarding for the Linux OS to the the syslog source. See [Configure forwarding to a Syslog Source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-forwarding-to-a-syslogsource).
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "Linux OS" and check the **Records** columns. A list of mappers for Linux OS Syslog will appear and you can see if logs are coming in.
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Linux OS security records.<br/><img src={useBaseUrl('img/cse/search.png')} alt="Search" style={{border: '1px solid gray'}} width="400"/>