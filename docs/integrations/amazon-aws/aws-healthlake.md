---
id: aws-healthlake
title: AWS HealthLake
description: Learn about the collection process for the AWS HealthLake service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-healthlake-logo.png')} alt="Thumbnail icon" width="50"/>

AWS HealthLake is a HIPAA eligible service for clinical data ingestion, storage, and analysis utilizing the Healthcare Interoperability FHIR (R4) specification. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/healthlake/latest/devguide/what-is-amazon-health-lake.html).

## Log and metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/healthlake/latest/devguide/monitoring-cloudwatch.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/healthlake/latest/devguide/logging-using-cloudtrail.html)

## Setup
You can collect the logs and metrics for Sumo Logic's Amazon HealthLake integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/HealthLake` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/HealthLake` metrics and dimensions, refer to [Amazon HealthLake CloudWatch metrics](https://docs.aws.amazon.com/healthlake/latest/devguide/monitoring-cloudwatch.html).

### Configure logs collection
* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/healthlake/latest/devguide/logging-using-cloudtrail.html) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS HealthLake is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or an AWS service in HealthLake. CloudTrail captures all API calls for HealthLake as events. The calls captured include calls from the HealthLake console and code calls to the HealthLake API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for HealthLake. Using the information collected by CloudTrail, you can determine the request that was made to HealthLake, the IP address from which the request was made, who made the request, when it was made, and additional details.