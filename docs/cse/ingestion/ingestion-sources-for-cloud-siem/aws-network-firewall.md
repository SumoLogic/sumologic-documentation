---
id: aws-network-firewall
title: Ingest AWS Network Firewall Data into Cloud SIEM
sidebar_label: AWS Network Firewall
description: Configure collection and ingestion of AWS Network Firewall log messages from an S3 bucket to be parsed by Cloud SIEM's AWS Network Firewall system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest AWS Network Firewall data into Cloud SIEM:
1. Enable AWS Network Firewall logs:
    1. Follow AWS instructions on [firewall log delivery](https://docs.aws.amazon.com/network-firewall/latest/developerguide/firewall-logging.html) for [S3](https://docs.aws.amazon.com/network-firewall/latest/developerguide/logging-s3.html).
    1. Before configuring collection, you need to grant Sumo Logic permission to access your AWS data. For instructions see [Grant Access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product/).  
1. [Create an Amazon S3 source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/#create-an-amazons3-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/AWS/AWS Network Firewall*. This ensures that the AWS Network Firewall logs are parsed and normalized into structured records in Cloud SIEM.
1. To verify that your logs are successfully making it into Cloud SIEM: 
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "AWS Network Firewall " and check the **Records** columns.
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for AWS Network Firewall security records:<br/>`_index=sec_record* and metadata_vendor = "AWS" and metadata_product = "Network Firewall"`