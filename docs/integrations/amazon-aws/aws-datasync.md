---
id: aws-datasync
title: AWS DataSync
description: Learn about the collection process for the AWS DataSync service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-datasync-logo.png')} alt="Thumbnail icon" width="50"/>

AWS DataSync is an online data movement and discovery service that simplifies data migration and helps you quickly, easily, and securely transfer your file or object data to, from, and between AWS storage services. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/datasync/latest/userguide/monitor-datasync.html#accessing-metrics)
* [CloudWatch Logs](https://docs.aws.amazon.com/datasync/latest/userguide/monitor-datasync.html#cloudwatchlogs)
* [CloudTrail Logs](https://docs.aws.amazon.com/datasync/latest/userguide/logging-using-cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's AWS DataSync integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/DataSync` using the [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/DataSync` metrics and dimensions, refer to [AWS DataSync CloudWatch metrics](https://docs.aws.amazon.com/datasync/latest/userguide/monitor-datasync.html#accessing-metrics).
### Configure logs collection
* Collect **Amazon CloudWatch Logs** using [AWS Kinesis Firehose for Logs](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) source. For DataSync to send logs to your CloudWatch log group [allow DataSync to upload logs to CloudWatch log groups](https://docs.aws.amazon.com/datasync/latest/userguide/monitor-datasync.html#cloudwatchlogs)

* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/datasync/latest/userguide/logging-using-cloudtrail.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS DataSync is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in AWS DataSync. CloudTrail captures all API calls for AWS DataSync as events, which includes calls from the AWS DataSync console and code calls to the AWS DataSync API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for AWS DataSync. Using the information collected by CloudTrail, you can determine the request that was made to AWS DataSync, the IP address from which the request was made, who made the request, when it was made, and additional details.