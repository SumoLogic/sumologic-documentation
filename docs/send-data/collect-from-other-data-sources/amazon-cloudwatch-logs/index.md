---
slug: /send-data/collect-from-other-data-sources/amazon-cloudwatch-logs
title: Amazon CloudWatch Logs
description: Learn how to collect Amazon CloudWatch Logs.
---

Sumo provides multiple methods to collect logs from Amazon CloudWatch.
- **[AWS Kinesis Firehose for Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/)** (Recommended)
- **Lambda Based Collection**. Below methods can be used when you want to customize Cloudwatch logs or enrich with additional metadata. But the Sumo Logic apps may not be compatible with custom format and hence out of the box dashboards will not populate.
    - [Collect Amazon CloudWatch Logs using a CloudFormation Template](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs/collect-with-cloudformation-template/)
    - [Collect Amazon CloudWatch Logs using a CloudFormation Template with Secured Sumo Logic Endpoint](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs/collect-with-cloudformation-template-with-secured-sumoendpoint/)
    - [Collect Amazon CloudWatch Logs using a Single Lambda Function](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs/collect-with-lambda-function/) (Not recommended)


