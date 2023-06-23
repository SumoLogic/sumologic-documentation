---
id: aws-elastic-load-balancing-source
title: AWS Elastic Load Balancing Source
sidebar_label: AWS Elastic Load Balancing
description: Add an AWS ELB Source to upload messages to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/elb.png')} alt="Thumbnail icon" width="45"/>

AWS Elastic Load Balancing (ELB) distributes incoming application traffic across multiple Amazon EC2 instances in the AWS cloud. The access logs for AWS ELB capture detailed information for all requests made to your load balancer and stores them as log files in an Amazon S3 bucket. Add an AWS ELB Source to upload these messages to Sumo Logic.

To configure an AWS ELB Source:

1. [Grant Sumo Logic access](grant-access-aws-product.md) to an Amazon S3 bucket.
1. Enable ELB logging in AWS as described in this topic.
1. Confirm that logs are being delivered to the Amazon S3 bucket.
1. Add the [AWS Source](aws-sources.md) for ELB.
1. **Optional:** Install the Sumo Logic App for AWS Elastic Load Balancing.

## Enable ELB logging in AWS

By default, ELB logging is not enabled in your organization's AWS account. You can find additional assistance for enabling logging in [AWS Documentation](http://aws.amazon.com/documentation/elastic-load-balancing/).

To enable logging in AWS:

1. In the **AWS Management Console**, choose **EC2 > Load Balancers**.
1. Under **Access Logs**, click **Edit**.
1. In the **Configure Access Logs** dialog box, click **Enable Access Logs**, then choose an Interval and S3 bucket. This is the S3 bucket that will upload logs to Sumo Logic.
1. Click **Save**.
