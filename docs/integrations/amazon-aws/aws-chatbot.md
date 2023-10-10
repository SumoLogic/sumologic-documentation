---
id: aws-chatbot
title: AWS Chatbot
description: Learn about the collection process for the AWS Chatbot service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-chatbot-logo.png')} alt="Thumbnail icon" width="50"/>

AWS Chatbot is an AWS service that enables DevOps and software development teams to use messaging program chat rooms to monitor and respond to operational events in their AWS Cloud. AWS Chatbot processes AWS service notifications from Amazon Simple Notification Service (Amazon SNS) and forwards them to chat rooms so teams can analyze and act on them immediately, regardless of location.

You can also run AWS CLI commands in chat channels using AWS Chatbot.

For more details, refer to the [AWS documentation](https://docs.aws.amazon.com//chatbot/latest/adminguide/what-is.html).

## Log and Metric types

* [CloudWatch Metrics](https://docs.aws.amazon.com//chatbot/latest/adminguide/monitoring-cloudwatch.html#available-cloudwatch-metrics)
* [CloudWatch Logs](https://docs.aws.amazon.com//chatbot/latest/adminguide/cloudwatch-logs.html)
* [CloudTrail Logs](https://docs.aws.amazon.com//chatbot/latest/adminguide/logging-using-cloudtrail.html)

## Setup

You can collect the logs and metrics for Sumo Logic's AWS Chatbot integration by following the below steps.

### Configure metrics collection

* Collect **CloudWatch Metrics** with namespace `AWS/Chatbot` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/Chatbot` metrics and dimensions, refer to [AWS Chatbot CloudWatch metrics](https://docs.aws.amazon.com//chatbot/latest/adminguide/monitoring-cloudwatch.html#available-cloudwatch-metrics).

### Configure logs collection

* Collect [Amazon CloudWatch Logs](https://docs.aws.amazon.com//chatbot/latest/adminguide/cloudwatch-logs.html) using the [AWS Kinesis Firehose for Logs](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) source. With CloudWatch Logs for AWS Chatbot, you can see all the events handled by AWS Chatbot. 
* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com//chatbot/latest/adminguide/logging-using-cloudtrail.html) using the [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS Chatbot integrates events with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in AWS Chatbot. CloudTrail captures API calls for AWS Chatbot as events, which includes calls from the AWS Chatbot console and code calls to the AWS Chatbot API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for AWS Chatbot.
