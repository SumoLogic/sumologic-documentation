---
id: aws-direct-connect
title: AWS Direct Connect
description: Learn about the collection process for the AWS Direct Connect service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-direct-connect-logo.png')} alt="Thumbnail icon" width="50"/>

AWS Direct Connect links your internal network to an AWS Direct Connect location over a standard Ethernet fiber-optic cable. One end of the cable is connected to your router, the other to an AWS Direct Connect router. With this connection, you can create virtual interfaces directly to public AWS services (for example, to Amazon S3) or to Amazon VPC, bypassing internet service providers in your network path. An AWS Direct Connect location provides access to AWS in the Region with which it is associated. You can use a single connection in a public Region or AWS GovCloud (US) to access public AWS services in all other public Regions. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/directconnect/latest/UserGuide/monitoring-cloudwatch.html#metrics-dimensions)
* [CloudTrail Logs](https://docs.aws.amazon.com/directconnect/latest/UserGuide/logging_dc_api_calls.html)


## Setup
You can collect the logs and metrics for Sumo Logic's AWS Direct Connect integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/DX` using the [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/DX` metrics and dimensions, refer to [AWS Direct Connect CloudWatch metrics](https://docs.aws.amazon.com/directconnect/latest/UserGuide/monitoring-cloudwatch.html#metrics-dimensions).
### Configure logs collection
* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/directconnect/latest/UserGuide/logging_dc_api_calls.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS Direct Connect is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in AWS Direct Connect. CloudTrail captures all API calls for AWS Direct Connect as events, which includes calls from the AWS Direct Connect console and code calls to the AWS Direct Connect API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for AWS Direct Connect. Using the information collected by CloudTrail, you can determine the request that was made to AWS Direct Connect, the IP address from which the request was made, who made the request, when it was made, and additional details.