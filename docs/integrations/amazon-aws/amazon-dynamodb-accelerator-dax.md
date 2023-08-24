---
id: amazon-dynamodb-accelerator-dax
title: Amazon DynamoDB Accelerator (DAX)
description: Learn about the collection process for the Amazon DynamoDB Accelerator (DAX) service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-dynamodb-accelerator-dax-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon DynamoDB Accelerator (DAX) is a DynamoDB-compatible caching service that enables you to benefit from fast in-memory performance for demanding applications. Amazon DynamoDB response times can be measured in single-digit milliseconds. If you require response times in microseconds, DynamoDB Accelerator (DAX) delivers fast response times for accessing eventually consistent data. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/dax-metrics-dimensions-dax.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/dax-logging-using-cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's Amazon DynamoDB Accelerator (DAX) integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/DAX` using the [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/DAX` metrics and dimensions, refer to [Amazon DynamoDB Accelerator (DAX) CloudWatch metrics](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/dax-metrics-dimensions-dax.html).
### Configure logs collection
* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/dax-logging-using-cloudtrail.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. Amazon DynamoDB Accelerator (DAX) is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in DAX.