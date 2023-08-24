---
id: amazon-elastic-file-system
title: Amazon Elastic File System (Amazon EFS)
description: Learn about the collection process for the Amazon Elastic File System (Amazon EFS) service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-elastic-file-system-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon Elastic File System (Amazon EFS) provides serverless, fully elastic file storage so that you can share file data without provisioning or managing storage capacity and performance. Amazon EFS is built to scale on demand to petabytes without disrupting applications, growing and shrinking automatically as you add and remove files. Because Amazon EFS has a simple web services interface, you can create and configure file systems quickly and easily. The service manages all the file storage infrastructure for you, meaning that you can avoid the complexity of deploying, patching, and maintaining complex file system configurations. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/efs/latest/ug/efs-metrics.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/efs/latest/ug/logging-using-cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's Amazon Elastic File System (Amazon EFS) integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/EFS` using the [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/EFS` metrics and dimensions, refer to [Amazon Elastic File System (Amazon EFS) CloudWatch metrics](https://docs.aws.amazon.com/efs/latest/ug/efs-metrics.html).
### Configure logs collection
* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/efs/latest/ug/logging-using-cloudtrail.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. Amazon EFS is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in Amazon EFS. CloudTrail captures all API calls for Amazon EFS as events, including calls from the Amazon EFS console and from code calls to Amazon EFS API operations.If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Amazon EFS. Using the information collected by CloudTrail, you can determine the request that was made to Amazon EFS, the IP address from which the request was made, who made the request, when it was made, and additional details.