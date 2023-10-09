---
id: amazon-chimesdk
title: Amazon Chime SDK
description: Learn about the collection process for the Amazon Chime SDK service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-chimesdk-logo.png')} alt="Thumbnail icon" width="50"/>

The Amazon Chime SDK is a set of real-time communications components that you can use to quickly add messaging, audio, video, and screen sharing capabilities to their web or mobile applications. You can use the Amazon Chime SDK to build real-time media applications that can send and receive audio and video and allow content sharing. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/chime-sdk/latest/dg/what-is-chime-sdk.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/chime-sdk/latest/dg/service-metrics.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/chime-sdk/latest/dg/pipeline-cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's Amazon Chime SDK integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/ChimeSDK` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/ChimeSDK` metrics and dimensions, refer to [Amazon Chime SDK CloudWatch metrics](https://docs.aws.amazon.com/chime-sdk/latest/dg/service-metrics.html).
### Configure logs collection
* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/chime-sdk/latest/dg/pipeline-cloudtrail.html) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. When a user calls a supported API in the media pipeline SDK, CloudTrail logs that activity for that API in Event history, along with other AWS events. For an ongoing record of media pipeline events, you can create a trail. The event data includes the user that called the API, the IAM role used to call the API, the source IP address from which the calls were made, and when the calls occurred. 
