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

You can collect the logs and metrics for Sumo Logic's Amazon AppFlow integration by following the below steps.

### Configure metrics collection

* Collect **CloudWatch Metrics** with namespace `AWS/AppFlow` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/AppFlow` metrics and dimensions, refer to [Amazom AppFlow CloudWatch metrics](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html).

### Configure logs collection

* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html) using the [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. Amazon AppFlow is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in Amazon AppFlow. CloudTrail captures all API calls for Amazon AppFlow as events, which includes calls from the Amazon AppFlow console and code calls to the Amazon AppFlow API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Amazon AppFlow.
