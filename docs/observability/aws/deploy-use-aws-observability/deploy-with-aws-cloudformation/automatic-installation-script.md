---
id: automatic-installation-script
title: AWS Observability Automatic Installation Script
sidebar_label: Automatic Installation Script
description: Sumo Logic provides POSIX and powershell scripts to trigger the CloudFormation template for creating a stack to deploy AWS Observability Solution.
---

Sumo Logic provides [POSIX](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability/scripts/AWSOAutoSetupScript/DeployAWSOPosix.sh) and [powershell](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability/scripts/AWSOAutoSetupScript/DeployAWSOWin.ps1) scripts to trigger the CloudFormation template for creating a stack to deploy AWS Observability Solution.

This is a simplified method of deploying AWS Observability using default parameters with just one quick command. Use it for a quick start or when you are happy with the defaults (see [table below](#Appendix-I)). For more advanced use cases, when any of the default needs to be adjusted, please fall back to  [Terraform](/docs/observability/aws/deploy-use-aws-observability/deploy-with-terraform.md) or [CloudFormation](/docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation) installation steps.


## Prerequisite

AWS CLI should be pre-installed on the system where the script is supposed to be executed.

* Set up the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).
* [Configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) to use AWS profiles.


## Input Parameters  

The script takes two inputs:

1. **SUMO ACCESS ID** - Provide the Sumo Access Id from your respective Sumo Logic Account where you want to install AWS Observability Solution. See [Create an access key](/docs/manage/security/access-keys#Create-an-access-key) in the _Access Keys_ topic for more information.
2. **SUMO ACCESS KEY** - Provide the Sumo Access Key from your respective Sumo Logic Account where you want to install AWS Observability Solution. See [Create an access key](/docs/manage/security/access-keys#Create-an-access-key) in the _Access Keys_ topic for more information.

**AWS_PROFILE** can be set as an environment variable from the command line before executing the script. If it is not set, the “default” aws profile will be used.


## CloudFormation Parameters

The script above will take only two inputs - Sumo access Id and Sumo Access Key. And internally it will trigger a CloudFormation template. This CloudFormation template requires some additional parameters. But all of these parameters will take the default value. When using this script one cannot override these values.  Refer table in **Appendix I** for all the parameters and the respective default values which will be used as part of this installation. Learn details about each parameter in detail [here](/docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation).


### Powershell Script Command Execution

Below is an example to run the powershell script with the required parameters

```
.\DeployAWSOWin.ps1 <SUMO_ACCESS_ID> <SUMO_ACCESS_KEY>
```

### Posix Script Command Execution

Below is an example to run posix script with required parameters

```
sh DeployAWSOPosix.sh <SUMO_ACCESS_ID> <SUMO_ACCESS_KEY>
```

## Appendix I

<table>
  <tr>
   <td>Parameter
   </td>
   <td>Default Value
   </td>
  </tr>
  <tr>
   <td>Sumo Logic Deployment Name
   </td>
   <td>This will be evaluated when the script is executed
   </td>
  </tr>
  <tr>
   <td>Sumo Logic Access ID
   </td>
   <td>Will be given by the User
   </td>
  </tr>
  <tr>
   <td>Sumo Logic Access Key
   </td>
   <td>Will be given by the user
   </td>
  </tr>
  <tr>
   <td>Sumo Logic Organization ID
   </td>
   <td>This will be evaluated when the script is executed.
   </td>
  </tr>
  <tr>
   <td>Delete Sumo Logic Resources when stack is deleted
   </td>
   <td>True
   </td>
  </tr>
  <tr>
   <td>Alias for your AWS account
   </td>
   <td>This will be the respective AWS Account Id
   </td>
  </tr>
  <tr>
   <td>S3 URL of a CSV file that maps AWS Account IDs to an Account Alias
   </td>
   <td>empty</td></tr>
  <tr>
   <td>Install AWS Observability apps and alerts
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>Select the kind of Metrics Source to create
   </td>
   <td>Kinesis Firehose Metrics Source
   </td>
  </tr>
  <tr>
   <td>Sumo Logic AWS Metrics Namespaces
   </td>
   <td>AWS/ApplicationELB, AWS/ApiGateway, AWS/DynamoDB, AWS/Lambda, AWS/RDS, AWS/ECS, AWS/ElastiCache, AWS/ELB, AWS/NetworkELB, AWS/SQS, AWS/SNS.</td>
  </tr>
  <tr>
   <td>Existing Sumo Logic Metrics Source API URL</td>
   <td>empty
   </td>
  </tr>
  <tr>
   <td>Enable ALB Access logging
   </td>
   <td>Both
   </td>
  </tr>
  <tr>
   <td>Create Sumo Logic ALB Logs Source
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>Existing Sumo Logic ALB Logs Source API URL
   </td>
   <td>empty
   </td>
  </tr>
  <tr>
   <td>AWS S3 Bucket Name
   </td>
   <td>empty
   </td>
  </tr>
  <tr>
   <td>Path Expression for the Existing  ALB logs
   </td>
   <td>*AWSLogs/*/elasticloadbalancing/*
   </td>
  </tr>
  <tr>
   <td>Create Sumo Logic CloudTrail Logs Source
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>Existing Sumo Logic CloudTrail Logs Source API URL
   </td>
   <td>empty
   </td>
  </tr>
  <tr>
   <td>AWS S3 Bucket Name
   </td>
   <td>empty
   </td>
  </tr>
  <tr>
   <td>Path Expression to the Existing CloudTrail logs
   </td>
   <td>AWSLogs/*/CloudTrail/*
   </td>
  </tr>
  <tr>
   <td>Select the Sumo Logic CloudWatch Logs Sources
   </td>
   <td>Kinesis Firehose Log Source
   </td>
  </tr>
  <tr>
   <td>Existing Sumo Logic Lambda CloudWatch Logs Source API URL
   </td>
   <td>empty
   </td>
  </tr>
  <tr>
   <td>Subscribe log groups to Sumo Logic Lambda Forwarder
   </td>
   <td>Both
   </td>
  </tr>
  <tr>
   <td>Regex for AWS Lambda Log Groups
   </td>
   <td>lambda
   </td>
  </tr>
  <tr>
   <td>Select the Sumo Logic Root Cause Explorer Source
   </td>
   <td>Both
   </td>
  </tr>
  <tr>
   <td>Enable ELB Classic Access logging
   </td>
   <td>Both
   </td>
  </tr>
  <tr>
   <td>Create Sumo Logic ELB Logs Source
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>Existing Sumo Logic ELB Classic Logs Source API URL
   </td>
   <td>empty
   </td>
  </tr>
  <tr>
   <td>AWS S3 Bucket Name
   </td>
   <td>empty
   </td>
  </tr>
  <tr>
   <td>Path Expression for the Existing  ELB Classic logs
   </td>
   <td>classicloadbalancing/AWSLogs/*/elasticloadbalancing/*
   </td>
  </tr>
  <tr>
   <td>Location where you want the App to be Installed
   </td>
   <td>Personal Folder
   </td>
  </tr>
  <tr>
   <td>Do you want to share App with whole organization
   </td>
   <td>True
   </td>
  </tr>
</table>
