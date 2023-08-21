---
id: aws-amplify
title: AWS Amplify
description: Learn about the collection process for the AWS Amplify service.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-amplify-logo.png')} alt="Thumbnail icon" width="50"/>

AWS Amplify is a set of purpose-built tools and features that enables frontend web and mobile developers to quickly and easily build full-stack applications on AWS. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html).

## Log and Metric types

* [CloudWatch Metrics](https://docs.aws.amazon.com/amplify/latest/userguide/access-logs.html#monitoring-with-cloudwatch)
* [CloudWatch Logs](https://docs.aws.amazon.com/amplify/latest/userguide/access-logs.html#monitoring-with-cloudwatch)
* [Access Logs](https://docs.aws.amazon.com/amplify/latest/userguide/access-logs.html#using-access-logs)
* [CloudTrail Logs](https://docs.aws.amazon.com/amplify/latest/userguide/logging-using-cloudtrail.html)

## Setup

This section has instructions for collecting logs and metrics for the Sumo Logic AWS Amplify integration.

### Configure metrics collection

* Collect CloudWatch Metrics with namespace AWS/AmplifyHosting using [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For AWS/AmplifyHosting metrics and dimensions refer to [AWS Amplify CloudWatch metrics](https://docs.aws.amazon.com/amplify/latest/userguide/access-logs.html#monitoring-with-cloudwatch).

### Configure logs collection

* Collect **Amazon CloudWatch Logs** for SSR apps using [AWS Kinesis Firehose for Logs](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) source.
* AWS Amplify stores access logs for all the apps you host in Amplify. Collect **Access Logs** using [Amazon S3](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/) source.
* AWS Amplify is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or an AWS service in Amplify. CloudTrail captures all API calls for Amplify as events. The calls captured include calls from the Amplify console and code calls to the Amplify API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Amplify. Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/amplify/latest/userguide/logging-using-cloudtrail.html) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source.