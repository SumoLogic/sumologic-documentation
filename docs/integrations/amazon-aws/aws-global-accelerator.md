---
id: aws-global-accelerator
title: AWS Global Accelerator
description: Learn about the collection process for the AWS Global Accelerator service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-global-accelerator-logo.png')} alt="Thumbnail icon" width="50"/>

AWS Global Accelerator is a service in which you create accelerators to improve the performance of your applications for local and global users. Depending on the type of accelerator you choose, you can gain additional benefits:
* With a standard accelerator, you can improve availability of your internet applications that are used by a global audience. With a standard accelerator, Global Accelerator directs traffic over the AWS global network to endpoints in the nearest Region to the client.
* With a custom routing accelerator, you can map one or more users to a specific destination among many destinations.

For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html).

## Log and metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/global-accelerator/latest/dg/cloudwatch-monitoring.html)
* [Flow Logs](https://docs.aws.amazon.com/global-accelerator/latest/dg/monitoring-global-accelerator.flow-logs.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/global-accelerator/latest/dg/logging-using-cloudtrail.html)

## Setup
You can collect the logs and metrics for Sumo Logic's AWS Global Accelerator integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/GlobalAccelerator` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/GlobalAccelerator` metrics and dimensions, refer to [AWS Global Accelerator CloudWatch metrics](https://docs.aws.amazon.com/global-accelerator/latest/dg/cloudwatch-monitoring.html).

### Configure logs collection
* Collect **Flow Logs** using [Amazon S3](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/) source. [Flow logs](https://docs.aws.amazon.com/global-accelerator/latest/dg/monitoring-global-accelerator.flow-logs.html) enable you to capture information about the IP address traffic going to and from network interfaces in your accelerator in AWS Global Accelerator. Flow log data is published to Amazon S3. Flow logs can help you with a number of tasks. For example, you can troubleshoot why specific traffic is not reaching an endpoint, which in turn helps you diagnose overly restrictive security group rules. You can also use flow logs as a security tool to monitor the traffic that is reaching your endpoints.

* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/global-accelerator/latest/dg/logging-using-cloudtrail.html) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS Global Accelerator is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or an AWS service in Global Accelerator. CloudTrail captures all API calls for Global Accelerator as events, including calls from the Global Accelerator console and from code calls to the Global Accelerator API. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Global Accelerator.