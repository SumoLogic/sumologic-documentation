---
id: aws-ground-station
title: AWS Ground Station
description: Learn about the collection process for the AWS Ground Station service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-ground-station-logo.png')} alt="Thumbnail icon" width="50"/>

AWS Ground Station is a fully managed service that enables you to control satellite communications, process satellite data, and scale your satellite operations. This means that you no longer have to build or manage your own ground station infrastructure. AWS Ground Station enables you to focus on innovating and rapidly experimenting with new applications that ingest satellite data and dynamically scale your server and storage use, rather than spend resources on operating and maintaining your own ground stations. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/ground-station/latest/ug/what-is-aws-ground-station.html).

## Log and metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/ground-station/latest/ug/metrics.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/ground-station/latest/ug/logging-using-cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's AWS Ground Station integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/GroundStation` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/GroundStation` metrics and dimensions, refer to [AWS Ground Station CloudWatch metrics](https://docs.aws.amazon.com/ground-station/latest/ug/metrics.html).

### Configure logs collection
* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/ground-station/latest/ug/logging-using-cloudtrail.html) using [AWS CloudTrail](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS Ground Station is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or an AWS service in AWS Ground Station. CloudTrail captures all API calls for AWS Ground Station as events. The calls captured include calls from the AWS Ground Station console and code calls to the AWS Ground Station API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for AWS Ground Station. Using the information collected by CloudTrail, you can determine the request that was made to AWS Ground Station, the IP address from which the request was made, who made the request, when it was made, and additional details.