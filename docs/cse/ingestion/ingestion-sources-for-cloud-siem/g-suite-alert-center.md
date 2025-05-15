---
id: g-suite-alert-center
title: Ingest G Suite Alert Center Data into Cloud SIEM
sidebar_label: G Suite Alert Center
description: Collect log messages from G Suite Alert Center to be parsed by Cloud SIEM's system parser for G Suite Alert Center.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest G Suite Alert Center data into Cloud SIEM:
1. [Configure an HTTP Logs and Metrics source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source) on a collector. When you configure the source, do the following:
   1. Select the [**Forward to SIEM** option](/docs/c2c/info/#metadata-fields) in the source configuration UI. This will ensure all logs for this source are forwarded to Cloud SIEM.
   1. Click the **+Add** link to add a field whose name is `_parser` with value */Parsers/System/Google/G Suite Alert Center*. This ensures that the G Suite Alert Center logs are parsed and normalized into structured records in Cloud SIEM.
1. To verify that your logs are successfully making it into Cloud SIEM:
   1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
   1. On the **Log Mappings** tab search for "G Suite Alert Center" and check the **Records** columns. 
   1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for G Suite Alert Center security records. <br/><img src={useBaseUrl('img/cse/gsuite-search.png')} alt="GSuite search" style={{border: '1px solid gray'}} width="400"/> 