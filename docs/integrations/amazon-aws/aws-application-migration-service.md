---
id: aws-application-migration-service
title: AWS Application Migration Service (MGN)
description: Learn about the collection process for the AWS Application Migration Service (MGN).
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-application-migration-service-logo.png')} alt="Thumbnail icon" width="50"/>

AWS Application Migration Service (MGN) is a highly automated lift-and-shift (rehost) solution that simplifies, expedites, and reduces the cost of migrating applications to AWS. It allows companies to lift-and-shift a large number of physical, virtual, or cloud servers without compatibility issues, performance disruption, or long cutover windows. MGN replicates source servers into your AWS account. When you’re ready, it automatically converts and launches your servers on AWS so you can quickly benefit from the cost savings, productivity, resilience, and agility of the Cloud. Once your applications are running on AWS, you can leverage AWS services and capabilities to quickly and easily replatform or refactor those applications – which makes lift-and-shift a fast route to modernization. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/mgn/latest/ug/monitoring-cloudwatch.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/mgn/latest/ug/logging-using-cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's AWS Application Migration Service (MGN) integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/MGN` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/MGN` metrics and dimensions, refer to [AWS Application Migration Service CloudWatch metrics](https://docs.aws.amazon.com/mgn/latest/ug/monitoring-cloudwatch.html).
### Configure logs collection
* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/mgn/latest/ug/logging-using-cloudtrail.html) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS Application Migration Service is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in AWS Application Migration Service. CloudTrail captures all API calls for AWS Application Migration Service as events, which includes calls from the AWS Application Migration Service console and code calls to the AWS Application Migration Service API operations. If you create a trail, you can allow a continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for AWS Application Migration Service. Using the information collected by CloudTrail, you can determine the request that was made to AWS Application Migration Service, the IP address from which the request was made, who made the request, when it was made, and additional details. 