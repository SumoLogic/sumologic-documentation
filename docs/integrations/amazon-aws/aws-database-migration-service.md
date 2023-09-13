---
id: aws-database-migration-service
title: AWS Database Migration Service (AWS DMS)
description: Learn about the collection process for the AWS Database Migration Service (AWS DMS).
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-database-migration-service-logo.png')} alt="Thumbnail icon" width="50"/>

AWS Database Migration Service (AWS DMS) is a cloud service that makes it possible to migrate relational databases, data warehouses, NoSQL databases, and other types of data stores. You can use AWS DMS to migrate your data into the AWS Cloud or between combinations of cloud and on-premises setups. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Monitoring.html#CHAP_Monitoring.Metrics)
* [Time Travel Logs](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Tasks.CustomizingTasks.TaskSettings.TimeTravel.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Monitoring.html#logging-using-cloudtrail)


## Setup
You can collect the logs and metrics for Sumo Logic's AWS Database Migration Service (AWS DMS) integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/DMS` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/DMS` metrics and dimensions, refer to [AWS Database Migration Service (AWS DMS) CloudWatch metrics](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Monitoring.html#CHAP_Monitoring.Metrics).
### Configure logs collection
* Collect **Time Travel logs** using [Amazon S3](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/) source. To log and debug replication tasks, you can use AWS DMS Time Travel. In this approach, you use Amazon S3 to store logs and encrypt them using your encryption keys. You can use Time Travel with DMS-supported PostgreSQL source endpoints and DMS-supported PostgreSQL and MySQL target endpoints. You can turn on Time Travel only for full-load and CDC tasks and for CDC only tasks. To turn on Time Travel or to modify any existing Time Travel settings, ensure that your task is stopped. For more information about Time Travel logs, see [Time Travel task settings](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Tasks.CustomizingTasks.TaskSettings.TimeTravel.html). 

* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Monitoring.html#logging-using-cloudtrail) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS DMS is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in AWS DMS. CloudTrail captures all API calls for AWS DMS as events, including calls from the AWS DMS console and from code calls to the AWS DMS API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for AWS DMS. Using the information collected by CloudTrail, you can determine the request that was made to AWS DMS, the IP address from which the request was made, who made the request, when it was made, and additional details.