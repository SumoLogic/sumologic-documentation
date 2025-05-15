---
id: osquery
title: Ingest Osquery Data into Cloud SIEM
sidebar_label: Osquery
description: Configure an HTTP source to ingest osquery log messages and send them to the osquery system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic Cloud SIEM supports osquery logs sent in JSON format for the following log types:
* Schedule results in Events format
  :::note
  Batch and Snapshot formats are not natively supported.
  :::
* Process Auditing
* Anomaly Detection
* File Integrity Monitoring

To ingest osquery data into Cloud SIEM:
1. [Configure an HTTP Logs and Metrics source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source) on a collector. When you configure the source, do the following:
   1. Select the **Forward to SIEM** option in the source configuration UI. This will ensure all logs for this source are forwarded to Cloud SIEM.
   1. Click the **+Add** link to add a field whose name is `_parser` with value */Parsers/System/Osquery/Osquery JSON*. This ensures that the osquery logs are parsed and normalized into structured records in Cloud SIEM.
1. Configure osquery to send log messages to Sumo Logic core platform. For instructions, see [Logging osquery](https://osquery.readthedocs.io/en/stable/deployment/logging/) in osquery help.
1. To verify that your logs are successfully making it into Cloud SIEM:
   1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
   1. On the **Log Mappings** tab, search for *osquery* and check the **Records** columns.
   1. For a more granular look at the incoming records, you can also search Sumo Logic for osquery records.