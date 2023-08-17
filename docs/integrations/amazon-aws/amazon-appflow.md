---
id: amazon-appflow
title: Amazon AppFlow
description: Learn about the collection process for the Amazon AppFlow service.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-appflow-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon AppFlow is a fully-managed integration service that enables you to securely exchange data between software as a service (SaaS) applications and AWS services, such as Amazon Simple Storage Service (Amazon S3) and Amazon Redshift. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/appflow/latest/userguide/what-is-appflow.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup
This section has instructions for collecting logs and metrics for the Sumo Logic's Amazon AppFlow integration.

### Configure metrics collection
* Collect CloudWatch Metrics with namespace AWS/AppFlow using [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For AWS/AppFlow metrics and dimensions refer to [Amazom AppFlow CloudWatch metrics](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html).

### Configure logs collection
* Amazon AppFlow is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or an AWS service in Amazon AppFlow. CloudTrail captures all API calls for Amazon AppFlow as events. The calls captured include calls from the Amazon AppFlow console and code calls to the Amazon AppFlow API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Amazon AppFlow. Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source.
