---
id: zscaler-private-access
title: Ingest Zscaler Private Access Data into Cloud SIEM
sidebar_label: Zscaler Private Access
description: Configure an HTTP source to ingest Zscaler Private Access log messages and send them to Cloud SIEM’s Zscaler Private Access system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Zscaler Private Access data into Cloud SIEM:
1. [Configure a Syslog source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-a-syslog-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value *Parsers/System/Zscaler/Zscaler Private Access/Zscaler Private Access-JSONF*. This ensures that the Zscaler Private Access logs are parsed and normalized into structured records in Cloud SIEM.
    1. After saving the source, click the **Show URL** link and make note of the HTTP source URL. You'll supply it in the next step.
1. Configure Zscaler Private Access to send log messages to Sumo Logic core platform. For instructions, see [Configuring a Log Receiver](https://help.zscaler.com/zpa/configuring-log-receiver) in ZPA Help.
1. To verify that your logs are successfully making it into Cloud SIEM:
   1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
   1. On the **Log Mappings** tab search for "ZPA" and check the **Records** columns.
   1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for "ZPA" security records. <br/><img src={useBaseUrl('img/cse/zscaler-search.png')} alt="Zscaler search" style={{border: '1px solid gray'}} width="400"/>