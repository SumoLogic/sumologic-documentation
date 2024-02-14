---
id: amazon-emr
title: Amazon EMR
description: Learn about the collection process for the Amazon EMR service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-emr-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon EMR (previously called Amazon Elastic MapReduce) is a managed cluster platform that simplifies running big data frameworks, such as Apache Hadoop and Apache Spark, on AWS to process and analyze vast amounts of data. Using these frameworks and related open-source projects, you can process data for analytics purposes and business intelligence workloads. Amazon EMR also lets you transform and move large amounts of data into and out of other AWS data stores and databases, such as Amazon Simple Storage Service (Amazon S3) and Amazon DynamoDB. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html).

## Log and metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/emr/latest/ManagementGuide/UsingEMR_ViewingMetrics.html)
* [EMR Web Logs](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-manage-view-web-log-files.html#emr-manage-view-web-log-files-s3)
* [CloudTrail Logs](https://docs.aws.amazon.com/emr/latest/ManagementGuide/logging_emr_api_calls.html)


## Setup
You can collect the logs and metrics for Sumo Logic's Amazon EMR integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/ElasticMapReduce` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/ElasticMapReduce` metrics and dimensions, refer to [Amazon EMR CloudWatch metrics](https://docs.aws.amazon.com/emr/latest/ManagementGuide/UsingEMR_ViewingMetrics.html).

### Configure logs collection
* Collect **Amazon EMR and Hadoop Logs** using [Amazon S3](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/) source. Amazon EMR and Hadoop both produce [log files](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-manage-view-web-log-files.html#emr-manage-view-web-log-files-s3) that report status on the cluster. By default, these are written to the primary node in the /mnt/var/log/ directory. Depending on how you configured your cluster when you launched it, these logs may also be archived to Amazon S3. There are many types of logs written to the primary node. Amazon EMR writes step, bootstrap action, and instance state logs. Apache Hadoop writes logs to report the processing of jobs, tasks, and task attempts. Hadoop also records logs of its daemons.

* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/emr/latest/ManagementGuide/logging_emr_api_calls.html) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. Amazon EMR is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or an AWS service in Amazon EMR. CloudTrail captures all API calls for Amazon EMR as events. The calls captured include calls from the Amazon EMR console and code calls to the Amazon EMR API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Amazon EMR. Using the information collected by CloudTrail, you can determine the request that was made to Amazon EMR, the IP address from which the request was made, who made the request, when it was made, and additional details.