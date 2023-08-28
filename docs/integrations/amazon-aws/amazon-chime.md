---
id: amazon-chime
title: Amazon Chime
description: Learn about the collection process for the Amazon Chime service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-chime-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon Chime is a communications service that transforms online meetings with an application that is secure and comprehensive. Amazon Chime works across your devices so that you can stay connected. You can use Amazon Chime for online meetings, video conferencing, calls, and chat. You can also share content inside and outside of your organization. Amazon Chime is a fully managed service that runs securely on the AWS cloud, which frees IT from deploying and managing complex infrastructures. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/chime/latest/ag/what-is-chime.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/chime/latest/ag/monitoring-cloudwatch.html)
* [CloudWatch Logs](https://docs.aws.amazon.com/chime/latest/ag/monitoring-cloudwatch.html#cw-logs)
* [CloudTrail Logs](https://docs.aws.amazon.com/chime/latest/ag/cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's Amazon Chime integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/ChimeVoiceConnector` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/ChimeVoiceConnector` metrics and dimensions, refer to [Amazon Chime CloudWatch metrics](https://docs.aws.amazon.com/chime/latest/ag/monitoring-cloudwatch.html).
### Configure logs collection
* Collect [Amazon CloudWatch Logs](https://docs.aws.amazon.com/chime/latest/ag/monitoring-cloudwatch.html#cw-logs) using [AWS Kinesis Firehose for Logs](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) source. You can opt to receive media quality metric logs for your Amazon Chime Voice Connector. When you do, Amazon Chime sends detailed, per-minute metrics for all of your Amazon Chime Voice Connector calls to a CloudWatch Logs log group that is created for you. The log group name is `/aws/ChimeVoiceConnectorLogs/${VoiceConnectorID}`. 

* Collect [Amazon CloudWatch Logs](https://docs.aws.amazon.com/chime/latest/ag/monitoring-cloudwatch.html#cw-logs) using [AWS Kinesis Firehose for Logs](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) source. You can opt to receive SIP message logs for your Amazon Chime Voice Connector. When you do, Amazon Chime captures inbound and outbound SIP messages and sends them to a CloudWatch Logs log group that is created for you. The log group name is `/aws/ChimeVoiceConnectorSipMessages/${VoiceConnectorID}`. 

* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/chime/latest/ag/cloudtrail.html) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. Amazon Chime is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in Amazon Chime. CloudTrail captures all API calls for Amazon Chime as events, which includes calls from the Amazon Chime console and from code calls to the Amazon Chime APIs. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Amazon Chime. Using the information collected by CloudTrail, you can determine the request that was made to Amazon Chime, the IP address from which the request was made, who made the request, when it was made, and additional details. 
