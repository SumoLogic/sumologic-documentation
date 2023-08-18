---
id: aws-apprunner
title: AWS App Runner
description: Learn about the collection process for the AWS App Runner service.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-apprunner-logo.png')} alt="Thumbnail icon" width="50"/>

AWS App Runner is a fully managed container application service that lets you build, deploy, and run containerized web applications and API services without prior infrastructure or container experience. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/apprunner/latest/dg/what-is-apprunner.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/apprunner/latest/dg/monitor-cw.html)
* [CloudWatch Logs](https://docs.aws.amazon.com/apprunner/latest/dg/monitor-cwl.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/apprunner/latest/dg/monitor-ct.html)

## Setup

You can collect the logs and metrics for Sumo Logic's AWS App Runner integration by following the below steps.

### Configure metrics collection

* Collect **CloudWatch Metrics** with namespace `AWS/AppRunner` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/AppRunner` metrics and dimensions, refer to [AWS App Runner CloudWatch metrics](https://docs.aws.amazon.com/apprunner/latest/dg/monitor-cw.html).

### Configure logs collection

* Collect **Amazon CloudWatch Logs** using the [AWS Kinesis Firehose for Logs](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) source. App Runner collects the output of your application code and streams it to Amazon CloudWatch Logs, these log records might prove useful in security and access audits. For more information, refer to [App Runner CloudWatch Logs](https://docs.aws.amazon.com/apprunner/latest/dg/monitor-cwl.html). 

* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/apprunner/latest/dg/monitor-ct.html) using the [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS App Runner is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in App Runner. CloudTrail captures all API calls for App Runner as events, which includes calls from the App Runner console and code calls to the App Runner API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for App Runner. 
