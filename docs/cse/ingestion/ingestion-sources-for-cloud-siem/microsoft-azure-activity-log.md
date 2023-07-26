---
id: microsoft-azure-activity-log
title: Microsoft Azure Activity Log - Cloud SIEM
sidebar_label: Microsoft Azure Activity Log
description: Configure an HTTP Source to ingest Microsoft Azure Activity Log messages and to be parsered by CSE's system parser for Azure Activity Log.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for collecting Azure Activity log messages and sending them to Sumo Logic to be ingested by CSE.

## Step 1: Configure collection

In this step, you configure an HTTP Source to collect Azure Activity log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing  collector, jump to [Configure an HTTP Source](#configure-an-http-source) below. Otherwise, create a new collector as described in [Configure a hosted collector](#configure-a-hosted-collector) below, and then create the HTTP Source on the collector.

### Configure a Hosted Collector

1. In the Sumo Logic platform, select **Manage Data** > **Collection** > **Collection**.
1. Click **Add Collector**.
1. Click **Hosted Collector.**
1. The **Add Hosted Collector** popup appears.<br/><img src={useBaseUrl('img/cse/add-hosted-collector.png')} alt="Add hosted collector" width="500"/>
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    1. If all sources in this collector will be Microsoft Azure sources, add an additional field with key `_parser` and value */Parsers/System/Microsoft/Microsoft Azure JSON*.
    :::note
    It’s also possible to configure individual sources to forward to CSE, as described in the following section.
    :::

### Configure an HTTP Source

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Navigate to the Hosted Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
1. Select **HTTP Logs & Metrics**. 
1. The page refreshes.<br/><img src={useBaseUrl('img/cse/http-source.png')} alt="HTTP source" width="500"/> 
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Source Host.** (Optional) Enter a string to tag the messages collected from the source. The string that you supply will be saved in a metadata field called `_sourceHost.`
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`.
1. **Fields.** If you are not parsing all sources in the hosted collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with value */Parsers/System/Microsoft/Microsoft Azure JSON*.
1. **Advanced Options for Logs**. For information about the optional advance options you can configure, see [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/).
1. Click **Save**.
1. Make a note of the HTTP Source URL that is displayed. You’ll supply it in [Step 2](#step-2-configure-azure-activity-log) below.

## Step 2: Configure Azure Activity Log

In this step you configure Azure Activity Log to send log messages to the Sumo Logic platform. For instructions, see steps for [Collecting Logs for the Azure Audit App from Event Hub](/docs/integrations/microsoft-azure/audit/#collecting-logs-for-the-azure-audit-app-from-event-hub).

## Step 3: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon, and select **Log Mappings** under **Incoming Data**. <br/><img src={useBaseUrl('img/cse/log-mappings-link.png')} alt="Log Mappings link" width="400"/>  
1. On the **Log Mappings** page search for "Azure" and check under **Record Volume**.<br/><img src={useBaseUrl('img/cse/azure-activity-log-record-volume.png')} alt="Azure activity log record volume" width="600"/>
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Azure security records. <br/><img src={useBaseUrl('img/cse/azure-activity-log-search.png')} alt="Azure activity log search" width="400"/> 
