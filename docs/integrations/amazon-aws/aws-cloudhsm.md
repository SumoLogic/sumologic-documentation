---
id: aws-cloudhsm
title: AWS CloudHSM
description: Learn about the collection process for the AWS CloudHSM service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-cloudhsm-logo.png')} alt="Thumbnail icon" width="50"/>

AWS CloudHSM provides customers with hardware security modules (HSMs) in the AWS Cloud. A hardware security module is a computing device that processes cryptographic operations and provides secure storage for cryptographic keys. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/cloudhsm/latest/userguide/hsm-metrics-cw.html)
* [CloudWatch Logs](https://docs.aws.amazon.com/cloudhsm/latest/userguide/get-hsm-audit-logs-using-cloudwatch.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/cloudhsm/latest/userguide/get-api-logs-using-cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's AWS CloudHSM integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/CloudHSM` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/CloudHSM` metrics and dimensions, refer to [AWS CloudHSM CloudWatch metrics](https://docs.aws.amazon.com/cloudhsm/latest/userguide/hsm-metrics-cw.html).
### Configure logs collection
* Collect [Amazon CloudWatch Logs](https://docs.aws.amazon.com/cloudhsm/latest/userguide/get-hsm-audit-logs-using-cloudwatch.html) using [AWS Kinesis Firehose for Logs](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) source. When an HSM in your account receives a command from the AWS CloudHSM command line tools or software libraries, it records its execution of the command in audit log form. The HSM audit logs include all client-initiated management commands, including those that create and delete the HSM, log into and out of the HSM, and manage users and keys. These logs provide a reliable record of actions that have changed the state of the HSM. AWS CloudHSM collects your HSM audit logs and sends them to Amazon CloudWatch Logs on your behalf.

* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/cloudhsm/latest/userguide/get-api-logs-using-cloudtrail.html) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS CloudHSM is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in AWS CloudHSM. CloudTrail captures all API calls for AWS CloudHSM as events, which includes calls from the AWS CloudHSM console and code calls to the AWS CloudHSM API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for AWS CloudHSM. Using the information collected by CloudTrail, you can determine the request that was made to AWS CloudHSM, the IP address from which the request was made, who made the request, when it was made, and additional details.