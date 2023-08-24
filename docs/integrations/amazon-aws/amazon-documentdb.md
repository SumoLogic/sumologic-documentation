---
id: amazon-documentdb
title: Amazon DocumentDB
description: Learn about the collection process for the Amazon DocumentDB service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-documentdb-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon DocumentDB (with MongoDB compatibility) is a fast, reliable, and fully managed database service. Amazon DocumentDB makes it easy to set up, operate, and scale MongoDB-compatible databases in the cloud. With Amazon DocumentDB, you can run the same application code and use the same drivers and tools that you use with MongoDB. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/documentdb/latest/developerguide/cloud_watch.html)
* [CloudWatch Logs](https://docs.aws.amazon.com/documentdb/latest/developerguide/profiling.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/documentdb/latest/developerguide/logging-with-cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's Amazon DocumentDB integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/DocDB` using the [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/DocDB` metrics and dimensions, refer to [Amazon DocumentDB CloudWatch metrics](https://docs.aws.amazon.com/documentdb/latest/developerguide/cloud_watch.html).
### Configure logs collection
* Collect [Amazon CloudWatch Logs](https://docs.aws.amazon.com/documentdb/latest/developerguide/profiling.html) using [AWS Kinesis Firehose for Logs](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) source. You can use the profiler in Amazon DocumentDB (with MongoDB compatibility) to log the execution time and details of operations that were performed on your cluster. The profiler is useful for monitoring the slowest operations on your cluster to help you improve individual query performance and overall cluster performance. By default, the profiler feature is disabled. When enabled, the profiler logs operations that are taking longer than a customer-defined threshold value (for example, 100 ms) to Amazon CloudWatch Logs. Logged details include the profiled command, time, plan summary, and client metadata.

* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/documentdb/latest/developerguide/logging-with-cloudtrail.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. Amazon DocumentDB (with MongoDB compatibility) is integrated with AWS CloudTrail, a service that provides a record of actions taken by users, roles, or AWS service in Amazon DocumentDB (with MongoDB compatibility). CloudTrail captures all AWS CLI API calls for Amazon DocumentDB as events, including calls from the Amazon DocumentDB console and from code calls to the Amazon DocumentDB SDK. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Amazon DocumentDB. Using the information collected by CloudTrail, you can determine the request that was made to Amazon DocumentDB (with MongoDB compatibility), the IP address from which the request was made, who made the request, when it was made, and other details.