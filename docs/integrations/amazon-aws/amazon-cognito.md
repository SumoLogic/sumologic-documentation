---
id: amazon-cognito
title: Amazon Cognito
description: Learn about the collection process for the Amazon Cognito service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-cognito-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon Cognito is an identity platform for web and mobile apps. It’s a user directory, an authentication server, and an authorization service for OAuth 2.0 access tokens and AWS credentials. With Amazon Cognito, you can authenticate and authorize users from the built-in user directory, from your enterprise directory, and from consumer identity providers like Google and Facebook. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/cognito/latest/developerguide/metrics-for-cognito-user-pools.html)
* [CloudWatch Logs](https://docs.aws.amazon.com/cognito/latest/developerguide/tracking-quotas-and-usage-in-cloud-watch-logs.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/cognito/latest/developerguide/logging-using-cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's Amazon Cognito integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/Cognito` using the [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/Cognito` metrics and [dimensions](https://docs.aws.amazon.com/cognito/latest/developerguide/dimensions-for-cognito-user-pools.html), refer to [Amazon Cognito CloudWatch metrics](https://docs.aws.amazon.com/cognito/latest/developerguide/metrics-for-cognito-user-pools.html).
### Configure logs collection
* Collect [Amazon CloudWatch Logs](https://docs.aws.amazon.com/cognito/latest/developerguide/tracking-quotas-and-usage-in-cloud-watch-logs.html) using [AWS Kinesis Firehose for Logs](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) source. You can configure your user pool to send detailed logs of some additional activity to a CloudWatch log group. These logs are of a finer granularity than those in AWS CloudTrail, and can be useful to troubleshoot your user pool. When you activate this feature, you can choose the log group where you want Amazon Cognito to send logs. User activity logging is useful when you want to find out the status of email and SMS messages that your user pool delivered with Amazon SNS and Amazon SES. Currently, you can only deliver Error-level user notification logs from your user pool.

* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/cognito/latest/developerguide/logging-using-cloudtrail.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. Amazon Cognito is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in Amazon Cognito. CloudTrail captures a subset of API calls for Amazon Cognito as events, including calls from the Amazon Cognito console and from code calls to the Amazon Cognito API operations. If you create a trail, you can choose to deliver CloudTrail events to an Amazon S3 bucket, including events for Amazon Cognito. Using the information collected by CloudTrail, you can determine the request that was made to Amazon Cognito, the IP address from which the request was made, who made the request, when it was made, and additional details. 
