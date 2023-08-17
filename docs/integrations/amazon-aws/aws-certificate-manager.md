---
id: aws-certificate-manager
title: AWS Certificate Manager
description: Learn about the collection process for the AWS Certificate Manager service.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-certificate-manager-logo.png')} alt="Thumbnail icon" width="50"/>

AWS Certificate Manager (ACM) handles the complexity of creating, storing, and renewing public and private SSL/TLS X.509 certificates and keys that protect your AWS websites and applications. You can provide certificates for your integrated AWS services either by issuing them directly with ACM or by importing third-party certificates into the ACM management system. ACM certificates can secure singular domain names, multiple specific domain names, wildcard domains, or combinations of these. ACM wildcard certificates can protect an unlimited number of subdomains. You can also export ACM certificates signed by AWS Private CA for use anywhere in your internal PKI. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/acm/latest/userguide/cloudwatch-metrics.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/acm/latest/userguide/cloudtrail.html)

## Setup
This section has instructions for collecting logs and metrics for the Sumo Logic's AWS Certificate Manager integration.

### Configure metrics collection
* Collect CloudWatch Metrics with namespace AWS/CertificateManager using [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For AWS/CertificateManager metrics and dimensions refer [AWS Certificate Manager CloudWatch metrics](https://docs.aws.amazon.com/acm/latest/userguide/cloudwatch-metrics.html)

### Configure logs collection
* AWS Certificate Manager is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or an AWS service in ACM. CloudTrail is enabled by default on your AWS account. CloudTrail captures API calls for ACM as events, including calls from the ACM console and code calls to the ACM API operations. If you configure a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for ACM. Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/acm/latest/userguide/cloudtrail.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source.
