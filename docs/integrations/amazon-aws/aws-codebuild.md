---
id: aws-codebuild
title: AWS CodeBuild
description: Learn about the collection process for the AWS CodeBuild service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aws-codebuild-logo.png')} alt="Thumbnail icon" width="50"/>

AWS CodeBuild is a fully managed build service in the cloud. CodeBuild compiles your source code, runs unit tests, and produces artifacts that are ready to deploy. CodeBuild eliminates the need to provision, manage, and scale your own build servers. It provides prepackaged build environments for popular programming languages and build tools such as Apache Maven, Gradle, and more. You can also customize build environments in CodeBuild to use your own build tools. CodeBuild scales automatically to meet peak build requests. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html).

## Log and Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/codebuild/latest/userguide/monitoring-builds.html)
* [CloudTrail Logs](https://docs.aws.amazon.com/codebuild/latest/userguide/cloudtrail.html)


## Setup
You can collect the logs and metrics for Sumo Logic's AWS CodeBuild integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/CodeBuild` using the [AWS Kinesis Firehose for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/CodeBuild` metrics and dimensions, refer to [AWS ClodeBuild CloudWatch metrics](https://docs.aws.amazon.com/codebuild/latest/userguide/monitoring-builds.html).
### Configure logs collection
* Collect [AWS CloudTrail Logs](https://docs.aws.amazon.com/codebuild/latest/userguide/cloudtrail.html) using [AWS CloudTrail](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) source. AWS CodeBuild is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or AWS service in CodeBuild. CloudTrail captures all API calls for CodeBuild as events, including calls from the CodeBuild console and from code calls to the CodeBuild APIs. If you create a trail, you can enable continuous delivery of CloudTrail events to an S3 bucket, including events for CodeBuild. Using the information collected by CloudTrail, you can determine the request that was made to CodeBuild, the IP address from which the request was made, who made the request, when it was made, and additional details. 