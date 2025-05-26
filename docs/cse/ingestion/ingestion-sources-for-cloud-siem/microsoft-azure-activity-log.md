---
id: microsoft-azure-activity-log
title: Ingest Microsoft Azure Activity Log Data into Cloud SIEM
sidebar_label: Microsoft Azure Activity Log
description: Configure an HTTP Source to ingest Microsoft Azure Activity Log messages and to be parsered by Cloud SIEM's system parser for Azure Activity Log.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Microsoft Azure Activity Log data into Cloud SIEM:
1. [Configure an HTTP Logs and Metrics source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source) on a collector. When you configure the source, do the following:
   1. Select the **Forward to SIEM** option in the source configuration UI. This will ensure all logs for this source are forwarded to Cloud SIEM.
   1. Click the **+Add** link to add a field whose name is `_parser` with value */Parsers/System/Microsoft/Microsoft Azure JSON*. This ensures that the Microsoft Azure Activity logs are parsed and normalized into structured records in Cloud SIEM.
1. Configure Azure Activity Log to send log messages to the Sumo Logic platform. For instructions, see steps for [Collecting Logs for the Azure Audit App from Event Hub](/docs/integrations/microsoft-azure/audit/#collecting-logs-for-the-azure-audit-app-from-event-hub). 
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**. 
    1. On the **Log Mappings** tab search for "Azure" and check the **Records** columns.
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Azure security records:<br/>`_index=sec_record* and metadata_product = "Azure"`
