---
id: amazon-connect
title: Amazon Connect
description: Learn about the collection process for the Amazon Connect service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-connect-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon Connect is an omnichannel cloud contact center. You can set up a contact center in a few steps, add agents who are located anywhere, and start engaging with your customers.

You can create personalized experiences for your customers using omnichannel communications. For example, you can dynamically offer chat and voice contact, based on such factors as customer preference and estimated wait times. Agents, meanwhile, conveniently handle all customers from just one interface. For example, they can chat with customers, and create or respond to tasks as they are routed to them.

Amazon Connect is an open platform that you can integrate with other enterprise applications, such as Salesforce. You can use Amazon Connect with other AWS services to provide innovative new experiences for your customers.

For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/connect/latest/adminguide/what-is-amazon-connect.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/connect/latest/adminguide/monitoring-cloudwatch.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/connect/latest/adminguide/logging-using-cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's Amazon Connect integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/Connect` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/Connect` metrics and dimensions, refer to [Amazon Connect CloudWatch metrics](https://docs.aws.amazon.com/connect/latest/adminguide/monitoring-cloudwatch.html).
### Configure logs collection
* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/connect/latest/adminguide/logging-using-cloudtrail.html) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. Amazon Connect is integrated with AWS CloudTrail, a service that provides a record of the Amazon Connect API calls that a user, role, or AWS service makes. CloudTrail captures Amazon Connect API calls as events. All public Amazon Connect APIs support CloudTrail. Using the information that CloudTrail collects, you can identify a specific request to an Amazon Connect API, the IP address of the requester, the requester's identity, the date and time of the request, and so on. If you configure a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket.