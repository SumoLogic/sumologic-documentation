---
id: amazon-cloudsearch
title: Amazon CloudSearch
description: Learn about the collection process for the Amazon CloudSearch service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-cloudsearch-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon CloudSearch is a fully managed service in the cloud that makes it easy to set up, manage, and scale a search solution for your website or application.

With Amazon CloudSearch you can search large collections of data such as web pages, document files, forum posts, or product information. You can quickly add search capabilities without having to become a search expert or worry about hardware provisioning, setup, and maintenance. As your volume of data and traffic fluctuates, Amazon CloudSearch scales to meet your needs. You can use Amazon CloudSearch to index and search both structured data and plain text. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/cloudsearch/latest/developerguide/what-is-cloudsearch.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/cloudsearch/latest/developerguide/cloudwatch-monitoring.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/cloudsearch/latest/developerguide/logging-config-api-calls.html)


## Setup
You can collect the logs and metrics for Sumo Logic's Amazon CloudSearch integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/CloudSearch` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/CloudSearch` metrics and dimensions, refer to [Amazon CloudSearch CloudWatch metrics](https://docs.aws.amazon.com/cloudsearch/latest/developerguide/cloudwatch-monitoring.html).
### Configure logs collection
* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/cloudsearch/latest/developerguide/logging-config-api-calls.html) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. Amazon CloudSearch integrates with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in Amazon CloudSearch. CloudTrail captures all configuration API calls for Amazon CloudSearch as events, which includes calls from the Amazon CloudSearch console, CLI, or SDKs. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Amazon CloudSearch. Using the information collected by CloudTrail, you can determine the request that was made to Amazon CloudSearch, the IP address from which the request was made, who made the request, when it was made, and additional details.