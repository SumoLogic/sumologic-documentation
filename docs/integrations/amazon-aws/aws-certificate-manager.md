---
id: aws-certificate-manager
title: AWS Certificate Manager
description: Learn about the collection process for the AWS Certificate Manager service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-certificate-manager-logo.png')} alt="Thumbnail icon" width="50"/>

AWS Certificate Manager (ACM) handles the complexity of creating, storing, and renewing public and private SSL/TLS X.509 certificates and keys that protect your AWS websites and applications. You can provide certificates for your integrated AWS services either by issuing them directly with ACM or by importing third-party certificates into the ACM management system. ACM certificates can secure singular domain names, multiple specific domain names, wildcard domains, or combinations of these. ACM wildcard certificates can protect an unlimited number of subdomains. You can also export ACM certificates signed by AWS Private CA for use anywhere in your internal PKI. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html).

## Log and metric types

* [CloudWatch Metrics](https://docs.aws.amazon.com/acm/latest/userguide/cloudwatch-metrics.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/acm/latest/userguide/cloudtrail.html)

## Setup

You can collect the logs and metrics for Sumo Logic's AWS Certificate Manager integration by following the below steps.

### Configure metrics collection

* Collect **CloudWatch Metrics** with namespace `AWS/CertificateManager` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/CertificateManager` metrics and dimensions, refer to [AWS Certificate Manager CloudWatch metrics](https://docs.aws.amazon.com/acm/latest/userguide/cloudwatch-metrics.html).

### Configure logs collection

* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/acm/latest/userguide/cloudtrail.html) using the [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS Certificate Manager is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in ACM. CloudTrail is enabled by default on your AWS account. CloudTrail captures API calls for ACM as events, which includes calls from the ACM console and code calls to the ACM API operations. If you configure a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for ACM.
