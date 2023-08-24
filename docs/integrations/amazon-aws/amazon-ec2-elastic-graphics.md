---
id: amazon-ec2-elastic-graphics
title: Amazon EC2 Elastic Graphics
description: Learn about the collection process for the Amazon EC2 Elastic Graphics service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-ec2-elastic-graphics-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon Elastic Graphics provides flexible, low-cost, and high performance graphics acceleration for your Windows instances. Elastic Graphics accelerators come in multiple sizes and are a low-cost alternative to using GPU graphics instance types (such as G2 and G3). You have the flexibility to choose an instance type that meets the compute, memory, and storage needs of your application. Then, choose the accelerator for your instance that meets the graphics requirements of your workload.

Elastic Graphics is suited for applications that require a small or intermittent amount of additional graphics acceleration, and that use OpenGL graphics support. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/elastic-graphics.html).

## Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/elastic-graphics-cloudwatch.html)


## Setup
You can collect the metrics for Sumo Logic's Amazon EC2 Elastic Graphics integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/ElasticGPUs` using the [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/ElasticGPUs` metrics and dimensions, refer to [Amazon EC2 Elastic Graphics CloudWatch metrics](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/elastic-graphics-cloudwatch.html).