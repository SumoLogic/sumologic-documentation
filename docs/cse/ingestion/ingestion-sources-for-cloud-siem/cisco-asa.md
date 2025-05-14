---
id: cisco-asa
title: Ingest Cisco ASA Data into Cloud SIEM
sidebar_label: Cisco ASA
description: Configure a syslog source to ingest Cisco ASA log messages to be parsed by Cloud SIEM’s system parser for Cisco ASA.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Cisco ASA data into Cloud SIEM:
1. [Configure a Syslog source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-a-syslog-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/Cisco/Cisco ASA*. This ensures that the Cisco ASA logs are parsed and normalized into structured records in Cloud SIEM.
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "Cisco ASA" and check the **Records** columns. A list of mappers for Cisco ASA Syslog will appear and you can see if logs are coming in.
    1. For a more granular look at the incoming records, you can also use search the Sumo Logic platform for Cisco ASA security records.<br/><img src={useBaseUrl('img/cse/cisco-asa-search.png')} alt="Cisco ASA search" style={{border: '1px solid gray'}} width="400"/>