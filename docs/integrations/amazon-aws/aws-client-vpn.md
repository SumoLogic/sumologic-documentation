---
id: aws-client-vpn
title: AWS Client VPN
description: Learn about the collection process for the AWS Client VPN service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-client-vpn-logo.png')} alt="Thumbnail icon" width="50"/>

AWS Client VPN is a managed client-based VPN service that enables you to securely access your AWS resources and resources in your on-premises network. With Client VPN, you can access your resources from any location using an OpenVPN-based VPN client. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com//vpn/latest/clientvpn-admin/what-is.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com//vpn/latest/clientvpn-admin/monitoring-cloudwatch.html)
* [CloudTrail Logs](https://docs.aws.amazon.com//vpn/latest/clientvpn-admin/monitoring-cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's AWS Client VPN integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/ClientVPN` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/ClientVPN` metrics and dimensions, refer to [AWS Client VPN CloudWatch metrics](https://docs.aws.amazon.com//vpn/latest/clientvpn-admin/monitoring-cloudwatch.html).
### Configure logs collection
* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com//vpn/latest/clientvpn-admin/monitoring-cloudtrail.html) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS Client VPN is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in Client VPN. CloudTrail captures all API calls for Client VPN as events, which includes calls from the Client VPN console and code calls to the Client VPN API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Client VPN. Use the information collected by CloudTrail to determine the request that was made to Client VPN, the requesting IP address, the requester, when it was made, and additional details.