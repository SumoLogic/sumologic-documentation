---
id: amazon-eventbridge
title: Amazon EventBridge
description: Learn about the collection process for the Amazon EventBridge service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-eventbridge-logo.png')} alt="Thumbnail icon" width="50"/>

EventBridge is a serverless service that uses events to connect application components together, making it easier for you to build scalable event-driven applications. Event-driven architecture is a style of building loosely-coupled software systems that work together by emitting and responding to events. Event-driven architecture can help you boost agility and build reliable, scalable applications. Use EventBridge to route events from sources such as home-grown applications, AWS services, and third-party software to consumer applications across your organization. EventBridge provides simple and consistent ways to ingest, filter, transform, and deliver events so you can build applications quickly. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html).

## Log and metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-monitoring.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-logging-monitoring.html#eb-info-in-cloudtrail)


## Setup
You can collect the logs and metrics for Sumo Logic's Amazon EventBridge integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/Events` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/Events` metrics and dimensions, refer to [Amazon EventBridge CloudWatch metrics](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-monitoring.html).

### Configure logs collection
* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-logging-monitoring.html#eb-info-in-cloudtrail) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. Amazon EventBridge works with AWS CloudTrail, a service that records actions from AWS services. CloudTrail captures API calls made by or on behalf of your AWS account from the EventBridge console and to EventBridge API operations. Using the information collected by CloudTrail, you can determine what request was made to EventBridge, the IP address from which the request was made, who made the request, when it was made, and more.