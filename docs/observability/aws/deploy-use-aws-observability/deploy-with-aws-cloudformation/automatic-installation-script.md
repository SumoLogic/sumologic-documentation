---
id: automatic-installation-script
title: AWS Observability Automatic Installation Script
sidebar_label: Automatic Installation Script
description: Sumo Logic provides POSIX and powershell scripts to trigger the CloudFormation template for creating a stack to deploy AWS Observability Solution.
---

Sumo Logic provides [POSIX](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability/scripts/AWSOAutoSetupScript/DeployAWSOPosix.sh) and [powershell](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability/scripts/AWSOAutoSetupScript/DeployAWSOWin.ps1) scripts to trigger the CloudFormation template for creating a stack to deploy AWS Observability Solution.

This is a simplified method of deploying AWS Observability using default parameters with just one quick command. Use it for a quick start or when you are happy with the defaults (see [table below](#appendix-i)). For more advanced use cases, when any of the default needs to be adjusted, please fall back to [Terraform](/docs/observability/aws/deploy-use-aws-observability/deploy-with-terraform.md) or [CloudFormation](/docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation) installation steps.

:::tip Multi-account and region
If you need to add support for multiple AWS accounts or multiple regions, refer to the Sumo Logic documentation for [CloudFormation](/docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation) or [Terraform](/docs/observability/aws/deploy-use-aws-observability/deploy-with-terraform.md).
:::

## Prerequisite

AWS CLI should be pre-installed on the system where the script is supposed to be executed.

* Set up the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).
* [Configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) to use AWS profiles.
* Select/Change the enabled [AWS region](https://docs.aws.amazon.com/cli/latest/reference/configure/set.html) where you want to deploy the solution.

<details>
<summary>Example: How to change your default AWS region to us-west-1</summary>

Run the following command with AWS region as us-west-1:
```sh
aws configure set region us-west-1
```
</details>



## Input Parameters  

The script takes two inputs:

1. **SUMO ACCESS ID** - Provide the Sumo Access Id from your respective Sumo Logic Account where you want to install AWS Observability Solution. See [Create an access key](/docs/manage/security/access-keys#from-the-preferences-page) for more information.
2. **SUMO ACCESS KEY** - Provide the Sumo Access Key from your respective Sumo Logic Account where you want to install AWS Observability Solution. See [Create an access key](/docs/manage/security/access-keys#from-the-preferences-page) for more information.

**AWS_PROFILE** can be set as an environment variable from the command line before executing the script. If it is not set, the “default” aws profile will be used.


## CloudFormation Parameters

The script above will take only two inputs - Sumo access Id and Sumo Access Key. And internally it will trigger a CloudFormation template. This CloudFormation template requires some additional parameters. But all of these parameters will take the default value. When using this script one cannot override these values. Refer to the table in **Appendix I** for all the parameters and the respective default values which will be used as part of this installation. Learn details about each parameter in detail [here](/docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation).


### PowerShell Script Command Execution

Below is an example to run the powershell script with the required parameters

```
$uri="https://raw.githubusercontent.com/SumoLogic/sumologic-solution-templates/master/aws-observability/scripts/AWSOAutoSetupScript/DeployAWSOWin.ps1";$path=".\DeployAWSOWin.ps1";(New-Object System.Net.WebClient).DownloadFile($uri, $path);
.\DeployAWSOWin.ps1 <SUMO_ACCESS_ID> <SUMO_ACCESS_KEY>
```

### Posix Script Command Execution

Below is an example to run posix script with required parameters

```
wget "https://raw.githubusercontent.com/SumoLogic/sumologic-solution-templates/master/aws-observability/scripts/AWSOAutoSetupScript/DeployAWSOPosix.sh"

chmod +x DeployAWSOPosix.sh

./DeployAWSOPosix.sh <SUMO_ACCESS_ID> <SUMO_ACCESS_KEY>
```

## Appendix I

| Parameter | Default Value |
|:---|:---|
| Sumo Logic Deployment Name | This will be evaluated when the script is executed |
| Sumo Logic Access ID | Will be given by the User |
| Sumo Logic Access Key | Will be given by the user |
| Sumo Logic Organization ID | This will be evaluated when the script is executed. |
| Delete Sumo Logic Resources when stack is deleted | True |
| Alias for your AWS account | This will be the respective AWS Account Id |
| S3 URL of a CSV file that maps AWS Account IDs to an Account Alias | empty |
| Install AWS Observability apps and alerts | Yes |
| Select the kind of Metrics Source to create | Kinesis Firehose Metrics Source |
| Sumo Logic AWS Metrics Namespaces | AWS/ApplicationELB, AWS/ApiGateway, AWS/DynamoDB, AWS/Lambda, AWS/RDS, AWS/ECS, AWS/ElastiCache, AWS/ELB, AWS/NetworkELB, AWS/SQS, AWS/SNS. |
| Existing Sumo Logic Metrics Source API URL | empty |
| Enable ALB Access logging | Both |
| Create Sumo Logic ALB Logs Source | Yes |
| Existing Sumo Logic ALB Logs Source API URL | empty |
| AWS S3 Bucket Name | empty |
| Path Expression for the Existing ALB logs | `*AWSLogs/*/elasticloadbalancing/*` |
| Create Sumo Logic CloudTrail Logs Source | Yes |
| Existing Sumo Logic CloudTrail Logs Source API URL | empty |
| AWS S3 Bucket Name | empty |
| Path Expression to the Existing CloudTrail logs | `AWSLogs/*/CloudTrail/*` |
| Select the Sumo Logic CloudWatch Logs Sources | Kinesis Firehose Log Source |
| Existing Sumo Logic Lambda CloudWatch Logs Source API URL | empty |
| Subscribe log groups to Sumo Logic Lambda Forwarder | Both |
| Regex for AWS Lambda Log Groups | lambda |
| Select the Sumo Logic Root Cause Explorer Source | Both |
| Enable ELB Classic Access logging | Both |
| Create Sumo Logic ELB Logs Source | Yes |
| Existing Sumo Logic ELB Classic Logs Source API URL | empty |
| AWS S3 Bucket Name | empty |
| Path Expression for the Existing ELB Classic logs | `classicloadbalancing/AWSLogs/*/elasticloadbalancing/*` |
| Location where you want the App to be Installed | Personal Folder |
| Do you want to share App with whole organization | True |
