---
id: aws-cloudtrail
title: Ingest AWS CloudTrail Data into Cloud SIEM
sidebar_label: AWS CloudTrail
description: Configure a CloudTrail source to ingest log messages to be parsed by Cloud SIEM’s CloudTrail system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic Cloud SIEM supports the default AWS CloudTrail log format which includes all version 2 fields. See [AWS CloudTrail log records documentation](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs-fields) for more details.

To ingest AWS CloudTrail data into Cloud SIEM:
1. Unless you’ve already done so, [Configure CloudTrail in AWS](http://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-add-a-trail-using-the-console.html).
1. Before configuring collection, you need to grant Sumo Logic permission to access your AWS data. For more information, see [Grant Access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product/).
1. [Configure an AWS CloudTrail source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/#configure-an-aws-cloudtrail-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/AWS/CloudTrail*. This ensures that the CloudTrail logs are parsed and normalized into structured records in Cloud SIEM.
1. To verify that your logs are successfully making it into Cloud SIEM. 
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "CloudTrail" and check the **Records** columns.
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for CloudTrail security records:<br/>`_index=sec_record* and metadata_product = "CloudTrail"`

