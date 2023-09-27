---
id: okta
title: Okta - Cloud SIEM
sidebar_label: Okta
description: Configure an Okta source to ingest Okta log messages and send them to CSE’s Okta system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Step 1: Configure collection

In this step, you configure an Okta Source to collect Okta log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Create an Okta Source](#create-an-okta-source) below. Otherwise, create a new collector as described in [Configure a Hosted Collector](#configure-a-hosted-collector) below, and then create the Okta Source on the collector.

### Configure a Hosted Collector

1. To configure a hosted collector, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/#step-1-configure-hosted-collector).  
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    1. If all sources in this collector will be Okta sources, add an additional field with key `_parser` and value */Parsers/System/Okta/Okta*.
    :::note
    It’s also possible to configure individual sources to forward to CSE, as described in the following section.
    :::

### Create an Okta Source

1. To create an Okta source, see [Create an Okta Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/okta-source/#create-an-oktasource).
1. **SIEM Processing**. Click the checkbox to configure the source to forward log messages to CSE.
1. **Fields.** If you are not parsing all sources in the hosted collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with value  */Parsers/System/Okta/Okta*.
1. Click **Save**. 

## Step 2: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon at the top of the CSE UI, and select **Log Mappings** under **Incoming Data**.<br/><img src={useBaseUrl('img/cse/log-mappings-link.png')} alt="Log Mappings link" width="400"/>
1. On the **Log Mappings** page search for Okta and check under **Record Volume**.<br/><img src={useBaseUrl('img/cse/okta-record-volume.png')} alt="Okta record volume" width="600"/> 
1. For a more granular look at the incoming records, you can also use the Sumo Logic platform to search for Okta security records.<br/><img src={useBaseUrl('img/cse/okta-search.png')} alt="Okta search" width="500"/>   
