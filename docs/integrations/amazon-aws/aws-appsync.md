---
id: aws-appsync
title: AWS AppSync
description: Learn about the collection process for the AWS AppSync service.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-appsync-logo.png')} alt="Thumbnail icon" width="50"/>

AWS AppSync enables developers to connect their applications and services to data and events with secure, serverless and high-performing GraphQL and Pub/Sub APIs. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/appsync/latest/devguide/what-is-appsync.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/appsync/latest/devguide/monitoring.html#cw-metrics)
* [CloudWatch Logs](https://docs.aws.amazon.com/appsync/latest/devguide/monitoring.html#cwl)
* [CloudTrail Logs](https://docs.aws.amazon.com/appsync/latest/devguide/cloudtrail-logging.html)


## Setup
This section has instructions for collecting logs and metrics for the Sumo Logic's AWS AppSync integration.

### Configure metrics collection
* Collect CloudWatch Metrics with namespace AWS/AppSync using [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For AWS/AppSync metrics and dimensions refer [AWS AppSync CloudWatch metrics](https://docs.aws.amazon.com/appsync/latest/devguide/monitoring.html#cw-metrics)

### Configure logs collection
* You can configure two types of logging on any new or existing GraphQL API: request-level and field-level. For more information, see [AWS AppSync CloudWatch Logs](https://docs.aws.amazon.com/appsync/latest/devguide/monitoring.html#cwl). Collect Amazon CloudWatch Logs using [AWS Kinesis Firehose for Logs](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) source.

* AWS AppSync is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in AWS AppSync. CloudTrail captures all API calls for AWS AppSync as events. The calls captured include calls from the AWS AppSync console and from code calls to the AWS AppSync APIs. You can use the information collected by CloudTrail to determine the request that was made to AWS AppSync, the IP address of the requester, who made the request, when the request was made, and additional details. You can create a trail to enable continuous delivery of CloudTrail events to an Amazon Simple Storage Service (Amazon S3) bucket, including events for AWS AppSync. Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/appsync/latest/devguide/cloudtrail-logging.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source.

