---
id: auth0
title: Auth0 - Cloud SIEM
sidebar_label: Auth0 system parser
description: Configure an HTTP source to ingest Auth0 log messages and send them to CSE’s Auth0 system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Step 1: Configure collection

In this step, you configure an HTTP Source to collect Auth0 log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure an HTTP Source](#configure-an-http-source) below. Otherwise, create a new collector as described in [Configure a Hosted Collector](#configure-a-hosted-collector) below, and then create the HTTP Source on the collector.

### Configure a Hosted Collector

1. In the Sumo Logic platform, select **Manage Data** > **Collection** > **Collection**.
1. Click **Add Collector**.
1. Click **Hosted Collector.**
1. The **Add Hosted Collector** popup appears.<br/><img src={useBaseUrl('img/cse/add-hosted-collector.png')} alt="Add hosted image collector" style={{border: '1px solid black'}} width="800" />
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    1. If all sources in this collector will be Auth0 sources, add an additional field with key `_parser` and value */Parsers/System/Auth0/Auth0*.

:::note
It’s also possible to configure individual sources to forward to CSE, as described in the following section.
:::

### Configure an HTTP Source

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Navigate to the Hosted Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
1. Select **HTTP Logs & Metrics**. 
1. The page refreshes.<br/><img src={useBaseUrl('img/cse/http-source.png')} alt="HTTP source" style={{border: '1px solid black'}} width="800" />
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Source Host.** (Optional) Enter a string to tag the messages collected from the source. The string that you supply will be saved in a metadata field called `_sourceHost.`
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`.
1. **SIEM Processing**. Click the checkbox to configure the source to forward log messages to CSE.
1. **Fields.** If you are not parsing all sources in the hosted collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with value */Parsers/System/Auth0/Auth0*.
12. **Advanced Options for Logs**. For information about the optional advance options you can configure, see [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/).
13. Click **Save**.
14. Make a note of the HTTP Source URL that is displayed. You’ll supply it in Step 2 below.

## Step 2: Configure Auth0

In this step you configure Auth0 to send log messages to the Sumo Logic platform. For instructions, see [Stream Logs to Sumo Logic](https://auth0.com/docs/logs/streams/stream-logs-to-sumo-logic)
in Auth0 help. 

## Step 3: Verify ingestion

In this step, you verify that your logs are successfully making it into
CSE. 

1. Click the gear icon at the top of the CSE UI, and select **Log Mappings** under **Incoming Data**.<br/><img src={useBaseUrl('img/cse/log-mappings-link.png')} alt="Log mappings link" style={{border: '1px solid black'}} width="400" /> 
1. On the **Log Mappings** page search for Auth0 and check under **Record Volume**.<br/><img src={useBaseUrl('img/cse/auth0-reocrd-volume.png')} alt="Record volume" style={{border: '1px solid black'}} width="600" />
1. For a more granular look at the incoming records, you can also use the Sumo Logic platform to search for Auth0 security records.<br/><img src={useBaseUrl('img/cse/auth0-search.png')} alt="Auth0 search" style={{border: '1px solid black'}} width="600" />
