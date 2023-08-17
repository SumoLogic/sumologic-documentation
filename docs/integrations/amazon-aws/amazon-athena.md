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
This section has instructions for collecting logs and metrics for the Sumo Logic's Amazon Athena integration.

### Configure metrics collection
* Collect CloudWatch Metrics with namespace AWS/Athena using [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For AWS/Athena metrics and dimensions refer [Amazon Athena CloudWatch metrics](https://docs.aws.amazon.com/athena/latest/ug/query-metrics-viewing.html#athena-cloudwatch-metrics-table)

### Configure logs collection
* Amazon Athena is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or an AWS service in Athena. CloudTrail captures all API calls for Athena as events. The calls captured include calls from the Athena console and code calls to the Athena API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Athena. Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/athena/latest/ug/monitor-with-cloudtrail.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source.

