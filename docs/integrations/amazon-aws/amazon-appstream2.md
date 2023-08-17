---
id: amazon-appstream2
title: Amazon AppStream 2.0
description: Learn about the collection process for the Amazon AppStream 2.0 service.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-appstream2-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon AppStream 2.0 is a fully managed application streaming service that provides users with instant access to their desktop applications from anywhere. AppStream 2.0 manages the AWS resources required to host and run your applications, scales automatically, and provides access to your users on demand. AppStream 2.0 provides users access to the applications they need on the device of their choice, with a responsive, fluid user experience that is indistinguishable from natively installed applications. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/appstream2/latest/developerguide/what-is-appstream.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/appstream2/latest/developerguide/monitoring.html#monitoring-with-cloudwatch)
* [CloudTrail Logs](https://docs.aws.amazon.com/appstream2/latest/developerguide/logging-using-cloudtrail.html)

## Setup
This section has instructions for collecting logs and metrics for the Sumo Logic's Amazon AppStream 2.0 integration.

### Configure metrics collection
* Collect CloudWatch Metrics with namespace AWS/AppStream using [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For AWS/AppStream metrics and dimensions refer to [Amazon AppStream 2.0 CloudWatch metrics](https://docs.aws.amazon.com/appstream2/latest/developerguide/monitoring.html#monitoring-with-cloudwatch).

### Configure logs collection
* Amazon AppStream 2.0 is integrated with AWS CloudTrail. CloudTrail is a service that provides a record of actions taken by a user, role, or an AWS service in AppStream 2.0. CloudTrail captures API calls for AppStream 2.0 as events. The calls captured include calls from the AppStream 2.0 console and code calls to the AppStream 2.0 API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for AppStream 2.0. Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/appstream2/latest/developerguide/logging-using-cloudtrail.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source.
