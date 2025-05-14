---
id: carbon-black
title: Ingest Carbon Black Cloud Data into Cloud SIEM
sidebar_label: Carbon Black Cloud
description: Configure collection of Carbon Black Cloud logs messages from an S3 bucket to be parsed by Cloud SIEM's system parser for Carbon Black Cloud.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Carbon Black Cloud data into Cloud SIEM:
1. [Configure a source for Carbon Black Cloud](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/carbon-black-cloud-source/#source-configuration) on a collector. When you configure the source, do the following:
    1. Select the [**Forward to SIEM** option](/docs/c2c/info/#metadata-fields) in the source configuration UI. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Click the **+Add** link to add a field whose name is `_parser` with value */Parsers/System/VMware/Carbon Black Cloud*. This ensures that the Carbon Black Cloud logs are parsed and normalized into structured records in Cloud SIEM.
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for Carbon Black Cloud and check the **Records** columns.
    1. For a more granular look at the incoming records, you can also search Sumo Logic for Carbon Black Cloud records.<br/> <img src={useBaseUrl('img/cse/carbon-black-search.png')} alt="A Carbon Black query" style={{border: '1px solid gray'}} width="500" />