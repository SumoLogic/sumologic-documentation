---
id: changelog
title: AWS Observability Terraform script and CloudFormation Changelog
sidebar_label: Changelog
description: This section provides details on the available versions of the AWS Observability Cloud Formation template.
---

This section provides details on the available versions of the AWS Observability Terraform script and CloudFormation template. The details also include all the AWS and Sumo Logic resources that will be updated and resolved bugs when upgrading the existing version of the Terraform script or CloudFormation template to the latest version.

To install or upgrade to the required version of the CloudFormation template, use the URL of the YAML file corresponding to the right version number as the Amazon S3 URL in the AWS CloudFormation section of the AWS Management Console. See [Selecting a stack template](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-using-console-create-stack-template.html) for more information.

## v2.6.0, 25-April-2023

AWS Observability Solution (S3 Link for cloudformation template):`https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.6.0/sumologic_observability.master.template.yaml`

AWS Observability Solution (Terraform based) repo: [sumologic-solution-templates](https://github.com/SumoLogic/sumologic-solution-templates).

New Features:

* Support for Amazon SQS service.

Enhancements / Updates:

* Updated “AWS Account Overview” and “AWS Region Overview” dashboards to monitor newly added Amazon SQS service and other generic updates.
* AWS Lambda service related dashboard now supports InitDuration in the REPORT log with Lambda extension's new version, along with updates for trendline color fix and query optimization.
* Improved the evaluation delay time to 4 minutes for CloudWatch metrics monitors.

Bug Fixes:

* Fixed issues with the “AWS Account Overview” and “AWS Region Overview” dashboards.
* Fixed AWS Observability's Entity Inspector KPI for supported services.
* Updated SNS CloudTrail FER (AwsObservabilitySNSCloudTrailLogsFER).

## v2.5.1, 27-Sept-2022

AWS Observability Solution (S3 Link for cloudformation template): `https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.5.1/sumologic_observability.master.template.yaml`

AWS Observability Solution (Terraform based) repo: [sumologic-solution-templates](https://github.com/SumoLogic/sumologic-solution-templates).

Enhancements / Updates:
* Updated runtime of nodeJS 12.x lambdas to nodeJS 16.x.

Bug Fixes:
* Fixed FER (AwsObservabilityGenericCloudWatchLogsFER) that was mapping ECS namespace aws/ecs to ecs/containerInsights.


## v2.5.0, 29-July-2022

AWS Observability Solution (S3 Link for cloudformation template):`https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.5.0/sumologic_observability.master.template.yaml`

AWS Observability Solution (Terraform based) repo: [sumologic-solution-templates](https://github.com/SumoLogic/sumologic-solution-templates)

New Features:

* Support for Amazon EC2 CloudWatch Metric
* Support for Amazon SNS service
* New onboarding method via script for linux and windows

Enhancements / Updates:

* Updated “AWS Account Overview” and “AWS Region Overview” dashboards to monitor newly added Amazon SNS.
* Simplified Terraform onboarding by importing existing SumoLogic Fields and FERs to TF state file via fields.sh script
* Enhanced / optimized dashboards for AWS DynamoDB, AWS API Gateway, AWS Classic Load Balancer, Amazon RDS, AWS Application Load Balancer, Amazon EC2 Metrics, Amazon ElastiCache, AWS Network Load Balancer
* Terraform solution will use Sumo Logic terraform provider >= v2.16.2

Bug Fixes:

* Fixed lambda CloudWatch logs FER (AwsObservabilityLambdaCloudWatchLogsFER)
* Added new FER (AwsObservabilityGenericCloudWatchLogsFER) to handle generic CloudWatch logs namespace identification.
* Fixed creation of extra resources with terraform when user selects none to deployed
* Fixed issue with collection of generic aws namespace metric
* Fixed query for “Network Bytes In” panel in Amazon ElastiCache dashboard
* Fixed / updated documentation for Terraform solution

Deprecation:

* RCE Dashboards are deprecated from the AWS Observability solution.




## v2.4.0, 30-March-2022
AWS Observability Solution (S3 Link for cloudformation template):
https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.4.0/sumologic_observability.master.template.yaml

AWS Observability Solution (Terraform based) repo: [sumologic-solution-templates](https://github.com/SumoLogic/sumologic-solution-templates)

New Features:

* You can now select the install location for the AWS Observability app folder “AWS Observability”. Personal is the default location.
* You can share the AWS Observability app folder “AWS Observability” with the Sumo Logic organization during installation, with “Share with Org” as default.
* Added new AWS Service - Classic Elastic Load Balancer (ELB) to the AWS Observability Solution.

Enhancements / Updates:

* Updated “AWS Account Overview” and “AWS Region Overview” dashboards to monitor newly added AWS Classic ELB Service.
* Added a new “AWS EC2 - Events” dashboard for AWS CloudTrail audit log monitoring.
* Enhanced Lambda dashboards to monitor Lambda functions cold start duration.
* Updated FERs for application load balancer access logs, ECS AWS CloudTrail logs, ElastiCache CloudTrail logs and created a new EC2 related AWS CloudTrail logs FER.

Bug Fixes:

* Resolved issue for upgrade / uninstallation of AWS Observability solution if a user deletes the “apps” and/or “monitor” folder prior to upgrade or deletion.

## v2.3.0, 24-Sept-2021

CloudFormation YAML URL: https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.3.0/sumologic_observability.master.template.yaml

[Terraform folder](https://github.com/SumoLogic/sumologic-solution-templates/tree/master/aws-observability-terraform) in the [sumologic-solution-templates GitHub Repo](https://github.com/SumoLogic/sumologic-solution-templates)

Updates:

* Provide Terraform Support for setting up the AWS Observability Solution
* Allow for rapid on-boarding of multiple AWS accounts via CloudFormation templates and CSV files that map AWS account-ids to account aliases
* Allow for collection of CloudWatch metrics data from all possible AWS namespaces
* Updated ECS, ElastiCache, EC2, RDS and Lambda dashboards with minor cosmetic changes

Bug Fixes:

* Changed the IAM Role to ensure that permissions are applied to S3 buckets used by AWS Observability only
* Made the AWS Account ID available as the “accountId” field
* OOTB monitors:
  * Added a new monitor “AWS EC2 - High Total CPU Utilization”
  * Renamed “AWS EC2 - High CPU Utilization” to “AWS EC2 - High System CPU Utilization”
  * Fixed the underlying query for the “AWS EC2 - High Disk Utilization” monitor

## v2.2.0, 30-Apr-2021

CloudFormation YAML URL: https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.2.0/sumologic_observability.master.template.yaml

Updates:

* Support for Kinesis Firehose for Metrics and Logs sources
* Lambda App updates to support data formats in the Kinesis Firehose for Logs source
* Added Global Intelligence for AWS CloudTrail DevOps

Bug Fixes:

* Fix to the EC2 metrics dashboards to show Total CPU Utilization instead of System CPU Utilization.

Removals

* Metric Rules for entity fields

## v2.1.0, 04-Feb-2021

CloudFormation YAML URL: https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.1.0/sumologic_observability.master.template.yaml

Updates:

* Out-of-the-box Alerts
* Support for AWS NLB, Amazon ECS and ElastiCache
* CloudFormation template versioning
* Support for AWS/SQS and AWS/SNS CloudWatch Metrics Namespaces
* Automatic deletion of all resources created by the test CloudFormation template that checks permissions

Bug Fixes:

* FERs were not getting applied correctly for logs from existing collector sources with spaces in the source name

## v2.0.0, 10-Oct-2020

CloudFormation YAML URL: https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/sumologic_observability.master.template.yaml

Updates:

* Updated the AWS Explore hierarchy and updated all dashboards to use entity model
* Added new FERs and fields to support the entity model

## v1.0.0, 31-Aug-2020

First version of the solution
