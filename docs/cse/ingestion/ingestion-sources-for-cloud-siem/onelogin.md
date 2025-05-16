---
id: onelogin
title: Ingest OneLogin Data into Cloud SIEM
sidebar_label: OneLogin
description: Learn how to collect OneLogin log messages and send them to Sumo Logic to be ingested by Cloud SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest OneLogin data into Cloud SIEM:
1. [Configure an HTTP Logs and Metrics source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source) on a collector. When you configure the source, do the following:
   1. Select the **Forward to SIEM** option in the source configuration UI. This will ensure all logs for this source are forwarded to Cloud SIEM.
   1. Click the **+Add** link to add a field whose name is `_parser` with value */Parsers/System/OneLogin/OneLogin SSO JSON*. This ensures that the OneLogin logs are parsed and normalized into structured records in Cloud SIEM.
1. Configure OneLogin to send log messages to the Sumo Logic platform. For instructions, see [Streaming Real-Time OneLogin Event Data to SIEM Solutions](https://onelogin.service-now.com/support?id=kb_article&sys_id=60de41ecdb1928d0ca1c400e0b961905&kb_category=00b6ad30db185340d5505eea4b9619ae) in
the OneLogin knowledge base. You must use the SIEM (NDJSON) format. Use the **Sumo Logic HTTP Source URL** as the **Listener URL**, and a custom header is not needed. 
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "OneLogin" and check the **Records** columns. 
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for OneLogin security records:<br/>`_index=sec_record* and metadata_product = "OneLogin"`