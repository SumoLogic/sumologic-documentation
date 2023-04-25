---
slug: /observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation
title: Deploy with AWS CloudFormation
description: Learn about the process of executing the AWS CloudFormation template to set up the AWS Observability Solution for a single AWS region and account combination.
---

This section walks you through the process of executing the AWS CloudFormation template to set up the AWS Observability Solution **for a single AWS region and account** combination.

:::note
If you are ready to deploy the solution to multiple AWS regions and accounts, see [Deploy to Multiple Accounts and Regions](deploy-multiple-accounts-regions.md).   
:::

:::tip
Click [here](https://youtu.be/aqngY0lUWUI) to view a microlesson on deploying the AWS Observability Solution with the AWS CloudFormation template. 
:::

## Before you start

If this is the first time you've deployed the AWS Observability Solution, read the [Before You Deploy](../before-you-deploy.md) topic for information about:

* Prerequisites for installing the solution.
* Things you should keep in mind before you run the CloudFormation template.
* Instructions for setting up Sumo Logic Host Metric Sources on your EC2 hosts. 

## Review required inputs

The sections below describe the configuration prompts in the CloudFormation template and the information you need to supply. Before you start filling out the template, it’s a good idea to review each section to make sure you know which sections you want to fill out, and that you have the information you need to proceed.

AWS Observability integrates with Explore by populating metadata and only shows entities with metrics coming in. If you do not see expected entities, make sure configurations are correct to collect and receive metrics. For example, metrics for Lambda functions must be coming in for those entities to show in the Explore view. If you do not see Lambda functions, verify the Cloud Formation stack is correctly configured including the AWS/Lambda namespace to collect metrics. 

"AWS Observability Apps-\<Version\> \<Date of installation\>" folder of dashboards by default will be created in the personal library and will be shared with the Sumo org of the user that the Sumo Logic Access keys belong to.

## Step 1: Open the CloudFormation template

1. Sign on to the AWS Management console.
1. Choose an option:
   * Click [this URL](https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateURL=https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.5.1/sumologic_observability.master.template.yaml)
   * Click the AWS Observability Solution (S3 Link for cloudformation template): https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.5.1/sumologic_observability.master.template.yaml to invoke the latest Sumo Logic AWS CloudFormation template. If you would like to download or inspect this or other versions of this template, please visit [Change Log](../changelog.md).
    :::note
    In case you want to modify the Collector Name and Source Categories of the Sumo Logic sources that will be created by default, you can do so by downloading CloudFormation template version 2.1.0 or greater and following [these instructions](#modify-the-collector-name-and-source-categories) before proceeding to the next step. 
    :::
1. Select the AWS Region where you want to deploy the AWS CloudFormation template.
    :::warning
    This step is critical: if you do not select the correct region, you will deploy the solution in the wrong region.
    :::
1. Proceed to [Step 2](#step-2-sumo-logic-access-configuration), below.

## Step 2: Sumo Logic access configuration 

Provide a response to each prompt in this section.

| Prompt | Guideline |
|:--|:--|
| Sumo Logic Deployment Name | Enter au, ca, de, eu, jp, us2, in, fed or us1. See [Sumo Logic Endpoints and Firewall Security](/docs/api/getting-started#Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security) for more information on Sumo Logic deployments. |
| Sumo Logic Access ID | Sumo Logic Access ID. See [Create an access key](/docs/manage/security/access-keys.md) for more information. |
| Sumo Logic Access Key | Sumo Logic Access Key. This key is used for Sumo Logic API calls. |
| Sumo Logic Organization ID | You can find your org on the Preferences page in the Sumo Logic UI.  Your org ID will be used to configure the IAM Role for Sumo Logic AWS Sources. |
| Delete Sumo Logic Resources when stack is deleted | To delete collectors, sources and apps in Sumo Logic when the stack is deleted, set this parameter to "True". If this is set to "False", Sumo Logic resources are not deleted when the AWS CloudFormation stack is deleted. Deletion of updated resources will be skipped. |

## Step 3: AWS account alias 

Provide a response to the prompt in this section.

| Prompt | Guideline |
|:--|:--|
| Alias for your AWS account | Enter an account alias for the AWS environment from which you are collecting data. This alias should be something that makes it easy for you to identify what this AWS account is being used for (for example, dev, prod, billing, and marketplace). This name will appear in the Sumo Logic Explorer View, metrics and logs can be queried via the “account field”.<br/>**Important:** Account Aliases should be alphanumeric and cannot include special characters such as “-, $, _” etc.<br/> Leave this blank If you're using CloudFormation StackSets to deploy the solution in multiple AWS accounts. |
| S3 URL of a CSV file that maps AWS Account IDs to an Account Alias | This parameter is applicable only If you're using CloudFormation StackSets to deploy the solution in multiple AWS accounts.<br/> The S3 URL of the CSV file should have public read access when deploying or updating the solution.<br/>Enter the S3 URL of a CSV file which contains the mapping of AWS Account IDs to an Account Alias in the following format:<br/>**accountid,alias**<br/>For example:<br/>**1234567,dev**<br/>**9876543,prod** |


## Step 4: Sumo Logic AWS Observability apps and Alerts

You should only install the AWS Observability apps and alerts the first
time you run the template.

| Prompt | Guideline |
|:--|:--|
| Install AWS Observability apps and alerts | <ul><li>**Yes** –  Installs the apps (AWS EC2, AWS Application Load Balancer, Amazon RDS, AWS API Gateway, AWS Lambda, AWS DynamoDB, AWS ECS, Amazon ElastiCache, Amazon Classic Load Balancer, and AWS NLB) and alerts for the AWS Observability Solution. All the apps are installed in the Sumo Logic AWS Observability  Personal folder in Sumo Logic and all alerts are installed in an AWS Observability folder of the Monitors folder.</li><li>**No** – Skips the installation of the apps.</li></ul> |

## Step 5: Sumo Logic AWS CloudWatch Metrics Sources

Provide responses to the prompts in this section.

| Prompt | Guideline |
|:--|:--|
| Select the kind of CloudWatch Metrics Source to create | **Note:** Switching from one type of Metrics Source to another can result in re-computation of your Root Cause Explorer anomaly detection models. This re-computation can take a couple of days to finish and meanwhile you will not get new Events of Interest (EOIs).<ul><li>**CloudWatch Metrics Source** - Creates Sumo Logic AWS CloudWatch Metrics Sources.</li><li>**Kinesis Firehose Metrics Source (Recommended)** -  Creates a Sumo Logic AWS Kinesis Firehose for Metrics Source.<br/>**Note:** This new source has cost and performance benefits over the CloudWatch Metrics Source is therefore recommended.</li><li>**None** - Skips the Installation of both the Sumo Logic Sources</li></ul> |
| Sumo Logic AWS Metrics Namespaces | Enter a comma-delimited list of the namespaces which will be used for both AWS CloudWatch Metrics and Inventory Sources. The default will be AWS/ApplicationELB, AWS/ApiGateway, AWS/DynamoDB, AWS/Lambda, AWS/RDS, AWS/ECS, AWS/ElastiCache, AWS/ELB, AWS/NetworkELB, AWS/SQS, AWS/SNS.<br/>AWS/AutoScaling will be appended to Namespaces for Inventory Sources.<br/>Supported namespaces are based on the type of CloudWatch Metrics Source you have selected above. See the relevant docs for the [Kinesis Firehose Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source.md) and the [CloudWatch Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics.md) for details on which namespaces they support. |
| Existing Sumo Logic Metrics Source API URL | You must supply this URL if you are already collecting CloudWatch Metrics. Provide the existing Sumo Logic Metrics Source API URL. The account field will be added to the Source. For information on how to determine the URL, see [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md). |

## Step 6: Sumo Logic AWS ALB Log Source

Provide responses to the prompts in this section.

| Prompt | Guideline |
|:--|:--|
| Enable ALB Access logging | <ul><li>**New** - Automatically enables collection of logs via Amazon S3 when new Application Load Balancers are created. This does not affect ALB resources already collecting logs.</li><li>**Existing** - Enables collection of logs via Amazon S3 for existing Application Load Balancers only.</li><li>**Both** - Enables collection of logs for new and existing Application Load Balancers</li><li>**None** - Does not enable collection of logs for Application Load Balancers</li></ul> |
| Create Sumo Logic ALB Logs Source | <ul><li>**Yes** - Creates a Sumo Logic ALB Log Source that collects ALB logs from an existing bucket or a new bucket.</li><li>**No** - Select this if you already have an ALB source configured in Sumo Logic.</li></ul> |
| Existing Sumo Logic ALB Logs Source API URL | You must supply this URL if you are already collecting ALB logs. Enter the existing Sumo Logic ALB Source API URL. The account, accountId, and region fields will be added to the Source. For information on how to determine the URL, see [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md). |
| AWS S3 Bucket Name | If you selected "No" to creating a new source above, skip this step. Provide a name of an existing S3 bucket name where you would like to store ALB logs. If this is empty, a new bucket will be created in the region |
| Path Expression for the Existing  ALB logs | This is required in case the above existing bucket is already configured to receive ALB access logs. If this is blank, Sumo Logic will store logs in the path expression: `elasticloadbalancing/AWSLogs/*` |

## Step 7: Sumo Logic AWS CloudTrail Source

Provide responses to the prompts in this section.

If you are collecting AWS CloudTrail logs from multiple AWS accounts into a common S3 bucket, please run the CloudFormation template in the account that has the S3 bucket and please see the Centralized CloudTrail Log Collection [help page](centralized-aws-cloudtrail-log-collection.md).

| Prompt | Guideline |
|:--|:--|
| Create Sumo Logic CloudTrail Logs Source | <ul><li>**Yes** - Creates a Sumo Logic CloudTrail Log Source that collects CloudTrail logs from an existing bucket or new bucket.</li><li>**No** - If you already have a CloudTrail Log Source collecting CloudTrail logs.</li></ul> |
| Existing Sumo Logic CloudTrail Logs Source API URL |  Required if you are already collecting CloudTrail logs. Provide the existing Sumo Logic CloudTrail Source API URL. The account field will be added to the Source. For information on how to determine the URL, see [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md). |
| AWS S3 Bucket Name | If you selected "No" to creating a new source above, skip this step. Provide a name of an existing S3 bucket where you would like to store CloudTrail logs. If this is empty, a new bucket will be created in the region. |
| Path Expression to the Existing CloudTrail logs | This is required in case the above existing bucket is already configured to receive CloudTrail logs. If this is blank, Sumo Logic will store logs in the path expression: `AWSLogs/*/CloudTrail/*/*` |

## Step 8: Sumo Logic AWS Lambda CloudWatch logs

Provide responses to the prompts in this section.

| Prompt | Guideline |
|:--|:--|
| Select the Sumo Logic CloudWatch Logs Sources | <ul><li>**Lambda Log Forwarder** - Creates a Sumo Logic CloudWatch Log Source that collects CloudWatch logs via a Lambda function.</li><li>**Kinesis Firehose Log Source** - Creates a Sumo Logic Kinesis Firehose Source to collect CloudWatch logs.</li><li>**Both** (Switch from Lambda Log Forwarder to Kinesis Firehose Log Source) - Use this option if you would like to switch from using the Lambda Log Forwarder to the new Kinesis Firehose Log Source. If you select this option, the template will subscribe all existing log groups to the new Kinesis Firehose logs Source. To remove the old source please rerun the template by selecting the Kinesis Firehose Log Source in this option (Check the CloudWatch Logs for Lambda Log groups subscriber which should have a message “All Log Groups are subscribed to Destination Type”).</li><li>**None** - Skips installation of both sources.</li></ul> |
| Existing Sumo Logic Lambda CloudWatch Logs Source API URL | Required you already collect AWS Lambda CloudWatch logs. Provide the existing Sumo Logic AWS Lambda CloudWatch Source API URL. The account, region and namespace fields will be added to the Source. For information on how to determine the URL, see [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md). |
| Subscribe log groups to Sumo Logic Lambda Forwarder | <ul><li>**New** - Automatically subscribes new AWS Lambda log groups to Lambda, to send logs to Sumo Logic.</li><li>**Existing** - Automatically subscribes existing log groups to Lambda, to send logs to Sumo Logic.</li><li>**Both** - Automatically subscribes new and existing log groups.</li><li>**None** - Skips Automatic subscription of log groups.</li></ul> |
| Regex for AWS Lambda Log Groups | Enter a regex for matching log group names. For more information, see [Configuring parameters](/docs/send-data/collect-from-other-data-sources/autosubscribe-arn-destination.md) in the *Auto-Subscribe AWS Log Groups to a Lambda Function topic*. |

## Step 9: Sumo Logic Root Cause Explorer Sources

Provide responses to the prompts in this section.

| Prompt | Guideline |
|:--|:--|
| Select the Sumo Logic Root Cause Explorer Source | <ul><li>**Inventory Source** - Creates a Sumo Logic Inventory Source used by Root Cause Explorer.</li><li>**X-Ray Source** - Creates a Sumo Logic AWS X-Ray Source that collects X-Ray Trace Metrics from your AWS account.</li><li>**Both** - Install both Inventory and Xray sources.</li><li>**None** - Skips installation of both sources.</li></ul> |

## Step 10: Sumo Logic AWS ELB Classic Log Source

Provide responses to the prompts in this section.

| Prompt | Guideline |
|:--|:--|
| Enable ELB Classic Access logging | <ul><li>**New** - Automatically enables collection of logs via Amazon S3 when new Classic Load Balancers are created. This does not affect ELB classic resources already collecting logs.</li><li>**Existing** - Enables collection of logs via Amazon S3 for existing Classic Load Balancers only.</li><li>**Both** - Enables collection of logs for new and existing Classic Load Balancers</li><li>**None** - Does not enable collection of logs for Classic Load Balancers</li></ul> |
| Create Sumo Logic ELB Logs Source | <ul><li>**Yes** - Creates a Sumo Logic ELB classic Log Source that collects ELB Classic logs from an existing bucket or a new bucket.</li><li>**No** - Select this if you already have an ELB Classic source configured in Sumo Logic.</li></ul> |
| Existing Sumo Logic ELB Classic Logs Source API URL | You must supply this URL if you are already collecting ELB Classic logs. Enter the existing Sumo Logic ELB Classic Source API URL. The account, and region fields will be added to the Source. For information on how to determine the URL, see View or Download Source JSON Configuration. |
| AWS S3 Bucket Name | If you selected "No" to create a new source above, skip this step. Provide a name of an existing S3 bucket name where you would like to store ELB Classic logs. If this is empty, a new bucket will be created in the region. |
| Path Expression for the Existing  ELB Classic logs | This is required in case the above existing bucket is already configured to receive ELB Classic access logs. If this is blank, Sumo Logic will store logs in the path expression: `classicloadbalancing/AWSLogs/*` |

## Step 11: App Installation and Sharing

Provide responses to the prompts in this section.

| Prompt | Guideline |
|:--|:--|
| Location where you want the App to be Installed | <ul><li>**Personal Folder** - Installs App in user's Personal folder.</li><li>**Admin Recommended Folder** - Installs App in Admin Recommended Folder</li></ul> |
| Do you want to share App with whole organization | <ul><li>**True** - Installed App will have view permission to all members of the organization. </li><li>**False** - Installed App will be visible only to user installing the solution.</li></ul> |

## Step 12: Create stack

1. In **Capabilities and transforms** click each checkbox.

    ![CFT_Capabilities_Transforms.png](/img/observability/CFT_Capabilities_Transforms.png)
1. Click **Create Stack**.
1. Verify that the AWS CloudFormation template has executed successfully in a CREATE_COMPLETE status.  This indicates that all the resources have been created successfully in both Sumo Logic and AWS.
1. If the AWS CloudFormation template has not run successfully, identify and fix any permission errors till the stack completes with a CREATE_COMPLETE status. See [Troubleshooting](#troubleshooting) for assistance with how to resolve these errors.

## Modify the collector name and source categories

The AWS Observability CloudFormation template creates collector and sources with pre-configured names and source categories. The capability to update the collector name and source categories has been added from version v2.1.0 and above.

:::note
Do not update the source names as created by CloudFormation template in Sumo Logic. Updating the source name will break the FERs and impact the AWS Observability dashboards.
:::

Follow the steps below to change the default collector name and source categories

1. Download the template version 2.1.0 or later from the [change log](../changelog.md) page.

1. Modify the collector name and source categories in the Mapping section of the CloudFormation template.

    ![mappings.png](/img/observability/mappings.png)

1. Deploy the CloudFormation template.

## Troubleshooting

While deploying the template, you may receive error messages such as `CREATE_FAILED` status or `ROLLBACK_COMPLETE` status for various reasons. This section provides information on how to troubleshoot such AWS CloudFormation installation failures.

### Determine the cause of a CloudFormation installation failure

This section walks you through the process of troubleshooting an AWS CloudFormation installation failure.

To debug an AWS CloudFormation installation failure, do the following:

1. After the stack rollback is complete and the status is ROLLBACK_COMPLETE, go to the parent stack. In the parent stack, look for the first failure as shown in the following example. The failure can be a direct reason or can point to a nested stack.

    ![Troubleshooting_1.png](/img/observability/Troubleshooting_1.png)
1. Look for direct reasons for the failure that is available in the parent stack, as shown in the following example.

    ![Troubleshooting_2.png](/img/observability/Troubleshooting_2.png)
1. To find indirect reasons for the failure, go to the nested stack mentioned in the status reason, as shown in the following example. Take a note of the resources mentioned in the reason.

    ![Troubleshooting_3.png](/img/observability/Troubleshooting_3.png)
1. Select the deleted option to find the nested stacks, as shown in the following example.

    ![Troubleshooting_4.png](/img/observability/Troubleshooting_4.png)
1. Go to the nested stack and look for the resource mentioned in the previous step to identify the reason, as shown in the following example.

    ![Troubleshooting_5.png](/img/observability/Troubleshooting_5.png)

### Optimize CloudTrail log ingest

By default, the AWS Observability solution collects AWS CloudTrail logs for all AWS services. To reduce ingestion volume, you can define processing rules that limit log collection to only the logs that are relevant to dashboards provided by the AWS Observability solution.

Define the processing rules for the Sumo Logic AWS CloudTrail Source that was created when you ran the CloudFormation template.

For instructions, see Create a Processing Rule. Create the following rules, selecting Include messages that match as the rule type, using these regular expressions:

```
.*\"eventSource\":\"elasticloadbalancing\.amazonaws\.com\".*
.*\"eventSource\":\"dynamodb\.amazonaws\.com\".*
.*\"eventSource\":\"ec2\.amazonaws\.com\".*
.*\"eventSource\":\"rds\.amazonaws\.com\".*
.*\"eventSource\":\"lambda\.amazonaws\.com\".*
.*\"eventSource\":\"apigateway\.amazonaws\.com\".*
.*\"eventSource\":\"ecs\.amazonaws\.com\".*
.*\"eventSource\":\"elasticache\.amazonaws\.com\".*
.*\"eventsource\":\"sns\.amazonaws\.com\".*
.*\"eventsource\":\"sqs\.amazonaws\.com\".*
```

### Common errors

Below are some common errors that can occur while using the Cloud Formation template. 

| Error | Description | Resolution |
|:--|:--|:--|
| The API rate limit for this user has been exceeded. | This error indicates that AWS CloudFormation execution has exceeded the API rate limit set on the Sumo Logic side. It can occur if you install the AWS CloudFormation template in multiple regions or accounts using the same Access Key and Access ID. | Do not install the AWS CloudFormation template in multiple regions or accounts with the same Access Key and Access ID. |
| S3 Bucket already exists. | The error can occur if:<br/>An S3 bucket with the same name exists in  S3, or<br/>
The S3 Bucket is not present in S3 but is referenced by some other AWS CloudFormation stack which created it.	Remove the S3 bucket from S3 or select “No” in the AWS Cloudformation template for S3 bucket creation. | Remove the AWS CloudFormation Stack which references the S3 bucket. |
| The S3 bucket you tried to delete is not empty. | The error can occur when deleting the stack with a non-empty S3 bucket. | Delete the S3 bucket manually if you do not need the bucket or its content in the future. |

### Rolling back the AWS Observability Solution

When you roll back the AWS Observability Solution, all the [resources](../resources.md) that were created with the AWS CloudFormation stack are deleted. The resources deleted with a rollback include AWS Observability Solution apps, collectors, sources, S3 buckets, Lambda functions, IAM roles, bucket policy, SNS topic, and SNS subscriptions. 

Rolling back the AWS Observability Solution deletes the main AWS CloudFormation stack, including the nested stack and associated Sumo Logic and AWS resources. The following rollback guidelines apply:

* Sumo Logic resources are deleted based on the “Delete Sumo Logic Resources when the stack is deleted” flag provided during the AWS CloudFormation configuration. These resources include apps, collectors, and sources.
* AWS resources are deleted by default, regardless of the flag provided. These resources include S3 buckets, Lambda functions, IAM roles, bucket policy, SNS topic, and SNS subscription.

To uninstall the AWS Observability Solution:

1. Log in to your AWS account and go to CloudFormation.
1. Select the main stack you want to delete.
1. Select **Delete**.

![CFT_Uninstall.png](/img/observability/CFT_Uninstall.png)
