---
id: carbon-black
title: Ingest Carbon Black Cloud Data into Cloud SIEM
sidebar_label: Carbon Black Cloud
description: Configure collection of Carbon Black Cloud logs messages from an S3 bucket to be parsed by Cloud SIEM's system parser for Carbon Black Cloud.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Carbon Black Cloud data into Cloud SIEM:
1. [Configure an AWS S3 source](/docs/cse/ingestion/ingestion-sources-for-cloud-siem/carbon-black/#configure-an-aws-s3-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Click the **+Add** link to add a field whose name is `_parser` with value */Parsers/System/VMware/Carbon Black Cloud*. This ensures that the Carbon Black Cloud logs are parsed and normalized into structured records in Cloud SIEM.
1. Configure Carbon Black Cloud to send log messages to the S3 bucket. For instructions, see [Data Forwarders](https://techdocs.broadcom.com/us/en/carbon-black/cloud/carbon-black-cloud/index/cbc-user-guide-tile/GUID-9620FAB7-FE70-45DE-9CAB-590FA358721F-en/GUID-E8D33F72-BABB-4157-A908-D8BBDB5AF349-en.html) in the Carbon Black Cloud documentation.
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for Carbon Black Cloud and check the **Records** columns.
    1. For a more granular look at the incoming records, you can also search Sumo Logic for Carbon Black Cloud records.<br/> <img src={useBaseUrl('img/cse/carbon-black-search.png')} alt="A Carbon Black query" style={{border: '1px solid gray'}} width="500" />