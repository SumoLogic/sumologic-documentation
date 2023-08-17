---
id: amazon-cloudfront
title: Amazon CloudFront
description: Learn about the collection process for the Amazon CloudFront service.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-cloudfront-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon CloudFront is a web service that speeds up distribution of your static and dynamic web content, such as .html, .css, .js, and image files, to your users. CloudFront delivers your content through a worldwide network of data centers called edge locations. When a user requests content that you're serving with CloudFront, the request is routed to the edge location that provides the lowest latency (time delay), so that content is delivered with the best possible performance. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/monitoring-using-cloudwatch.html)
* [Access Logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html)
* [Real-time logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html)
* CloudWatch Logs
  * [Edge Function Logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-logs.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/logging_using_cloudtrail.html)


## Setup
This section has instructions for collecting logs and metrics for the Sumo Logic's Amazon CloudFront integration.

### Configure metrics collection
* Collect CloudWatch Metrics with namespace [AWS/CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/monitoring-using-cloudwatch.html) using [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For AWS/CloudFront metrics and dimensions refer [Amazon CloudFront CloudWatch metrics](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/programming-cloudwatch-metrics.html)

### Configure logs collection
* You can configure CloudFront to create log files that contain detailed information about every user request that CloudFront receives. These are called standard logs, also known as [access logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html). If you enable standard logs, you can also specify the Amazon S3 bucket that you want CloudFront to save files in. Collect Access Logs using [Amazon S3](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/) source.

* With CloudFront [real-time logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html), you can get information about requests made to a distribution in real time (logs are delivered within seconds of receiving the requests). You can use real-time logs to monitor, analyze, and take action based on content delivery performance. Collect real-time Logs using [Amazon S3](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/) source if you have real-time logs destination set to S3 bucket.

* You can use Amazon CloudWatch Logs to get logs for your [edge functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-logs.html), both Lambda@Edge and CloudFront Functions. Collect Amazon CloudWatch Logs using [AWS Kinesis Firehose for Logs](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) source.

* Amazon CloudFront is integrated with CloudTrail, an AWS service that captures information about every request that is sent to the CloudFront API by your AWS account, including your IAM users. CloudTrail periodically saves log files of these requests to an Amazon S3 bucket that you specify. CloudTrail captures information about all requests, whether they were made using the CloudFront console, the CloudFront API, the AWS SDKs, the CloudFront CLI, or another service, for example, AWS CloudFormation. Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/logging_using_cloudtrail.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source.

