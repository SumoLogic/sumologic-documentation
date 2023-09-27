---
id: amazon-athena
title: Amazon Athena
description: Learn about the collection process for the Amazon Athena service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-athena-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon Athena is an interactive query service that makes it easy to analyze data directly in Amazon Simple Storage Service (Amazon S3) using standard SQL. With a few actions in the AWS Management Console, you can point Athena at your data stored in Amazon S3 and begin using standard SQL to run ad-hoc queries and get results in seconds. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/athena/latest/ug/what-is.html).

## Log and Metric types

* [CloudWatch Metrics](https://docs.aws.amazon.com/athena/latest/ug/query-metrics-viewing.html#athena-cloudwatch-metrics-table)
* [CloudTrail Logs](https://docs.aws.amazon.com/athena/latest/ug/monitor-with-cloudtrail.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Amazon Athena integration by following the below steps.

### Configure metrics collection

* Collect **CloudWatch Metrics** with namespace `AWS/Athena` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/Athena` metrics and dimensions, refer to [Amazon Athena CloudWatch metrics](https://docs.aws.amazon.com/athena/latest/ug/query-metrics-viewing.html#athena-cloudwatch-metrics-table).

### Configure logs collection

* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/athena/latest/ug/monitor-with-cloudtrail.html) using the [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. Amazon Athena is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in Athena. CloudTrail captures all API calls for Athena as events, which includes calls from the Athena console and code calls to the Athena API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Athena. 
