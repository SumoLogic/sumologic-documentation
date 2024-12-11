---
id: okta
title: Okta - Cloud SIEM
sidebar_label: Okta
description: Configure an Okta source to ingest Okta log messages and send them to Cloud SIEM’s Okta system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Step 1: Configure collection

In this step, you configure an Okta Source to collect Okta log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Create an Okta Source](#create-an-okta-source) below. Otherwise, create a new collector as described in [Configure a Hosted Collector](#configure-a-hosted-collector) below, and then create the Okta Source on the collector.

### Configure a Hosted Collector

1. To configure a hosted collector, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/#step-1-configure-hosted-collector).  
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to Cloud SIEM, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to Cloud SIEM.
    1. If all sources in this collector will be Okta sources, add an additional field with key `_parser` and value */Parsers/System/Okta/Okta*.
    :::note
    It’s also possible to configure individual sources to forward to Cloud SIEM, as described in the following section.
    :::

### Create an Okta Source

1. To create an Okta source, see [Okta Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/okta-source/).
1. **SIEM Processing**. Click the checkbox to configure the source to forward log messages to Cloud SIEM.
1. **Fields.** If you are not parsing all sources in the hosted collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with value  */Parsers/System/Okta/Okta*.
1. Click **Save**. 

## Step 2: Verify ingestion

In this step, you verify that your logs are successfully making it into Cloud SIEM. 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
1. On the **Log Mappings** tab search for Okta and check the **Records** columns.
1. For a more granular look at the incoming records, you can also use the Sumo Logic platform to search for Okta security records.<br/><img src={useBaseUrl('img/cse/okta-search.png')} alt="Okta search" style={{border: '1px solid gray'}} width="500"/>   
