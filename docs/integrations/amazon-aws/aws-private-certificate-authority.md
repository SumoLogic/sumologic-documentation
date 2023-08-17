---
id: aws-private-certificate-authority
title: AWS Private Certificate Authority
description: Learn about the collection process for the AWS Private Certificate Authority service.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-private-certificate-authority-logo.png')} alt="Thumbnail icon" width="50"/>

AWS Private CA enables the creation of private certificate authority (CA) hierarchies, including root and subordinate CAs, without the investment and maintenance costs of operating an on-premises CA. Your private CAs can issue end-entity X.509 certificates useful in scenarios including:
* Creating encrypted TLS communication channels
* Authenticating users, computers, API endpoints, and IoT devices
* Cryptographically signing code
* Implementing Online Certificate Status Protocol (OCSP) for obtaining certificate revocation status

AWS Private CA operations can be accessed from the AWS Management Console, using the AWS Private CA API, or using the AWS CLI.

For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/privateca/latest/userguide/PcaWelcome.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/privateca/latest/userguide/PcaCloudWatch.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/privateca/latest/userguide/PcaCtIntro.html)

## Setup
This section has instructions for collecting logs and metrics for the Sumo Logic's AWS Private Certificate Authority integration.

### Configure metrics collection
* Collect CloudWatch Metrics with namespace AWS/ACMPrivateCA using [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For AWS/ACMPrivateCA metrics and dimensions refer [AWS Private Certificate Authority CloudWatch metrics](https://docs.aws.amazon.com/privateca/latest/userguide/PcaCloudWatch.html)

### Configure logs collection
* AWS Private CA is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or an AWS service. CloudTrail is enabled by default on your AWS account. You can use AWS CloudTrail to record API calls that are made by AWS Private Certificate Authority. If you configure a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for AWS Private CA. Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/privateca/latest/userguide/PcaCtIntro.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source.

