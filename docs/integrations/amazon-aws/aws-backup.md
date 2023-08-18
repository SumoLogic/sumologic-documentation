---
id: aws-backup
title: AWS Backup
description: Learn about the collection process for the AWS Backup service.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-backup-logo.png')} alt="Thumbnail icon" width="50"/>

AWS Backup is a fully-managed service that makes it easy to centralize and automate data protection across AWS services, in the cloud, and on premises. Using this service, you can configure backup policies and monitor activity for your AWS resources in one place. It allows you to automate and consolidate backup tasks that were previously performed service-by-service, and removes the need to create custom scripts and manual processes. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/aws-backup/latest/devguide/cloudwatch.html#monitoring-metrics-with-cloudwatch)
* [CloudTrail Logs](https://docs.aws.amazon.com/aws-backup/latest/devguide/logging-using-cloudtrail.html)

## Setup

You can collect the logs and metrics for Sumo Logic's AWS Backup integration by following the below steps.

### Configure metrics collection

* Collect **CloudWatch Metrics** with namespace `AWS/Backup` using the [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/Backup` metrics and dimensions, refer to [AWS Backup CloudWatch metrics](https://docs.aws.amazon.com/aws-backup/latest/devguide/cloudwatch.html#monitoring-metrics-with-cloudwatch).

### Configure logs collection

* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/aws-backup/latest/devguide/logging-using-cloudtrail.html) using the [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS Backup is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in AWS Backup. CloudTrail captures all API calls for AWS Backup as events, which includes calls from the AWS Backup console and code calls to the AWS Backup API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for AWS Backup. 
