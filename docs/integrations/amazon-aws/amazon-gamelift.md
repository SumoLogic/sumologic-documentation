---
id: amazon-gamelift
title: Amazon GameLift
description: Learn about the collection process for the Amazon GameLift service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-gamelift-logo.png')} alt="Thumbnail icon" width="50"/>

You can use Amazon GameLift to deploy, operate, and scale dedicated, low-cost servers in the cloud for session-based multiplayer games. Built on AWS global computing infrastructure, Amazon GameLift helps deliver high-performance, high-reliability game servers while dynamically scaling your resource usage to meet worldwide player demand. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-intro.html).

## Log and metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/gamelift/latest/developerguide/monitoring-cloudwatch.html)
* [Server Messages (Custom Servers)](https://docs.aws.amazon.com/gamelift/latest/developerguide/logging-server-messages-custom.html)
* [Server Messages (Realtime Servers)](https://docs.aws.amazon.com/gamelift/latest/developerguide/logging-server-messages-rts.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/gamelift/latest/developerguide/logging-using-cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's Amazon GameLift integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/GameLift` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/GameLift` metrics and dimensions, refer to [Amazon GameLift CloudWatch metrics](https://docs.aws.amazon.com/gamelift/latest/developerguide/monitoring-cloudwatch.html).

### Configure logs collection
* Collect **Server Message (Custom Servers, Realtime Servers)** using [Amazon S3](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/) source. With [Amazon GameLift custom servers](https://docs.aws.amazon.com/gamelift/latest/developerguide/logging-server-messages-custom.html) and [Amazon GameLift Realtime Servers](https://docs.aws.amazon.com/gamelift/latest/developerguide/logging-server-messages-rts.html), you write your own code to perform logging, which you configure as part of your server process configuration. Amazon GameLift uses your logging configuration to identify the files that it must upload to Amazon S3 at the end of each game session. 


* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/gamelift/latest/developerguide/logging-using-cloudtrail.html) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. Amazon GameLift is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or an AWS service in Amazon GameLift. CloudTrail captures all API calls for Amazon GameLift as events. The calls captured include calls from the Amazon GameLift console and code calls to the Amazon GameLift API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Amazon GameLift. Using the information collected by CloudTrail, you can determine the request that was made to Amazon GameLift, the IP address from which the request was made, who made the request, when it was made, and additional details.