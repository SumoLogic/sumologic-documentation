---
id: aws-vpc-flow
title: Ingest AWS VPC Flow Data into Cloud SIEM
sidebar_label: AWS VPC Flow
description: Configure collection and ingestion of VPC Flow logs from an S3 bucket to be parsed by Cloud SIEM's AWS VPC Flow system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest AWS VPC Flow data into Cloud SIEM:
1. [Collect Amazon VPC Flow logs using an Amazon S3 source](/docs/integrations/amazon-aws/vpc-flow-logs/#collecting-amazon-vpc-flow-logs-using-an-amazon-s3-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/AWS/AWS VPC Flow*. This ensures that the AWS VPC Flow logs are parsed and normalized into structured records in Cloud SIEM.
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "AWS VPC Flow" and check the **Records** columns. 
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for AWS VPC Flow security records:<br/>`_index=sec_record* and metadata_product = "VPC Flow"`