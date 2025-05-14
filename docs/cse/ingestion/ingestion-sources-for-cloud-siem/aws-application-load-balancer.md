---
id: aws-application-load-balancer
title: Ingest AWS Application Load Balancer Data into Cloud SIEM
sidebar_label: AWS Application Load Balancer
description: Configure collection and ingestion of AWS Application Load Balancer (ALB) log messages from an S3 bucket to be parsed by Cloud SIEM's AWS ALB system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest AWS Application Load Balancer data into Cloud SIEM:
1. [Enable ELB logging in AWS](/docs/send-data/hosted-collectors/amazon-aws/aws-elastic-load-balancing-source/#enable-elb-logging-in-aws).
1. [Create an Amazon S3 source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/#create-an-amazons3-source) on a collector. When you configure the source, do the following:
   1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
   1. Add another field named `_parser` with value */Parsers/System/AWS/AWS ALB*. This ensures that the AWS Application Load Balancer logs are parsed and normalized into structured records in Cloud SIEM.
1. To verify that your logs are successfully making it into Cloud SIEM: 
   1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
   1. On the **Log Mappings** tab search for "AWS Application Load Balancer" and check the **Records** columns.
   1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for AWS ALB Flow security records.<br/><img src={useBaseUrl('img/cse/AWS-elb-search.png')} alt="AWS ELB search" style={{border: '1px solid gray'}} width="600"/>
