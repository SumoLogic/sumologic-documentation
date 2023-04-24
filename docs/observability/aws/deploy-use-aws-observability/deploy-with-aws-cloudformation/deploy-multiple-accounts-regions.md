---
id: deploy-multiple-accounts-regions
title: Deploy to Multiple Accounts and Regions
sidebar_label: Deploy to Multiple Accounts and Regions
description: Learn how to deploy the AWS Observability Solution for a single AWS region and account.
---

This topic has instructions for deploying AWS Observability Solution to multiple AWS accounts and regions  
using [Stack Sets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html).

Given that we use an account alias, we recommend you use StackSets to automatically deploy the AWS CloudFormation template across all regions in one AWS account at a time. New AWS accounts can be added to an existing stack set.

## Before you start

If this is the first time you've deployed the AWS Observability solution, read the [Before You Deploy](/docs/observability/aws/deploy-use-aws-observability/before-you-deploy/) topic for more information. And, complete the prerequisites for StackSets as described in the [AWS documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-prereqs.html).

## Step 1: Open the CloudFormation template

1. Sign on to the AWS Management console.
1. Choose an option to invoke AWS CloudFormation Template:
    * Click [this URL](https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateURL=https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.6.0/sumologic_observability.master.template.yaml) to invoke the latest Sumo Logic AWS CloudFormation template.
    * Download the AWS Observability Solution (S3 Link for cloudformation template): https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.6.0/sumologic_observability.master.template.yaml to invoke the latest Sumo Logic AWS CloudFormation template.
    :::warning
    If you would like to download or inspect this or other versions of this template, see the [Changelog](../changelog.md).
    :::
1. Select the AWS Region where you want to deploy the AWS CloudFormation template.
    :::warning
    This step is critical: if you do not select the correct region, you will deploy the solution in the wrong region.
    :::
1. Proceed to [Step 2](#step-2-sumo-logic-access-configuration) below.

## Step 2: Sumo Logic access configuration 

The below table displays the response to each prompt during Step 2.

| Prompt | Guideline |
|:--|:--|
| Sumo Logic Deployment Name | Enter au, ca, de, eu, jp, us2, in, fed or us1. See [Sumo Logic Endpoints and Firewall Security](/docs/api/getting-started#Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security) for more information on Sumo Logic deployments. |
| Sumo Logic Access ID | Sumo Logic Access ID. See [Create an access key](/docs/manage/security/access-keys.md) for more information. |
| Sumo Logic Access Key | Sumo Logic Access Key. This key is used for Sumo Logic API calls. |
| Sumo Logic Organization ID | You can find your org on the Preferences page in the Sumo Logic UI.  Your org ID will be used to configure the IAM Role for Sumo Logic AWS Sources. |
| Delete Sumo Logic Resources when stack is deleted | To delete collectors, sources and apps in Sumo Logic when the stack is deleted, set this parameter to "True". If this is set to "False", Sumo Logic resources are not deleted when the AWS CloudFormation stack is deleted. Deletion of updated resources will be skipped. |

## Step 3: AWS account alias 

The below table displays the response to each prompt during Step 3.

| Prompt | Guideline |
|:--|:--|
| Alias for your AWS account | Enter an account alias for the AWS environment from which you are collecting data. This alias should be something that makes it easy for you to identify what this AWS account is being used for (for example, dev, prod, billing, and marketplace). This name will appear in the Sumo Logic Explorer View, metrics and logs can be queried via the “account field”.<br/>**Important:** Account Aliases should be alphanumeric and cannot include special characters such as “-, $, _” etc.<br/> Leave this blank If you're using CloudFormation StackSets to deploy the solution in multiple AWS accounts. |
| S3 URL of a CSV file that maps AWS Account IDs to an Account Alias | This parameter is applicable only If you're using CloudFormation StackSets to deploy the solution in multiple AWS accounts.<br/> The S3 URL of the CSV file should have public read access when deploying or updating the solution.<br/>Enter the S3 URL of a CSV file which contains the mapping of AWS Account IDs to an Account Alias in the following format:<br/>**accountid,alias**<br/>For example:<br/>**1234567,dev**<br/>**9876543,prod** |

## Step 4: Install Apps

Perform the following steps to install apps.

1. Complete the prerequisites for StackSets as described in the [AWS documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-prereqs.html).
1. Install the apps by running the AWS CloudFormation Stack once in any given account and region. Use the configuration below to set up only app dashboards.
1. Install AWS Observability Apps as **Yes**.  <br/>  ![Multiaccount 1.png](/img/observability/Multiaccount_1.png)
1. Select the Sumo Logic Metrics Sources to create as **None**.  <br/>  ![Multiaccount 2.png](/img/observability/Multiaccount_2.png)
1. Enable ALB Access logging as **None** and Create Sumo Logic ALB Logs Source as **No**. <br/>  ![Multiaccount 3.png](/img/observability/Multiaccount_3.png)
1. Create Sumo Logic CloudTrail Logs Source as **No**.  <br/>  ![Multiaccount4.png](/img/observability/Multiaccount_4.png)
1. Create Sumo Logic CloudWatch Logs Source as **No**.<br/>  ![Multiaccount5.png](/img/observability/Multiaccount_5.png)
1. Enable ELB Classic Access logging as **None** and Create Sumo Logic ELB Classic Logs Source as **No**. <br/>  ![Multiaccount6.png](/img/observability/Multiaccount6.png)
1. Location where you want the App to be Installed as **PersonalFolder**. And for **Do you want to share App with whole organization**, set as **True**.<br/>  ![Multiaccount7.png](/img/observability/Multiaccount7.png)

## Step 5: Determine account aliases

If you are going to deploy the solution in multiple AWS accounts, we highly recommend that you prepare a CSV file that maps your AWS Account-ids to account aliases. These aliases should be something that makes it easy for you to identify what this AWS account is being used for (for example, dev, prod, billing, and marketplace). These names will appear in the Sumo Logic Explorer View, metrics, and logs and can be queried using the “account field”.

The following is an example of the CSV file format to use:

`accountid,alias`

`234234234324,dev`

`214324324324,prod`

Please upload this file to an Amazon S3 bucket and make it accessible to the account from where you are going to run the CloudFormation template. 

In case you do not provide a CSV file or if we detect that it does not have the right format, the AWS account-id will be used as the alias and this value will be used for the “account” field in Sumo Logic.

### Use the AWS CloudFormation template with StackSets

1. Go to [Stack Sets](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacksets)
    in your AWS account.
1. Click **Create StackSet**.  
    ![CloudFormation_Stackset 1.png](/img/observability/ClodFormation_Stackset_1.png)
1. Paste the URL `https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.6.0/sumologic_observability.master.template.yaml` in the Amazon S3 URL option and click **Next**. If you'd like to download or inspect this or other versions of this template, see the [Changelog](../changelog.md).<br/>  ![multi-create-stack.png](/img/observability/multi-create-stack.png)
1. Provide a StackSet Name and supply the values for each of the prompts listed as per instructions in the [Deploy the AWS Observability Solution](/docs/observability/aws/deploy-use-aws-observability) section with the following exception:
    * Leave the field “Alias for AWS Account Identification” blank.  <br/>  ![aws-field.png](/img/observability/aws-field.png)
    * Provide the S3 Object URL of a CSV file that maps AWS Account IDs to an Account Alias in Section 2 of the template “AWS Account Alias”.  <br/>  ![aws-url.png](/img/observability/aws-url.png)
    * Answer **No** in Section 3 of the template "Install AWS Observability Apps". <br/>  ![ClodFormation_Stackset 3.png](/img/observability/ClodFormation_Stackset_3.png)
    * Click **Next**.
1. Add Tags, select the Administrator role defined in the prerequisites above, and click **Next**.<br/>  ![ClodFormation_Stackset 4.png](/img/observability/ClodFormation_Stackset_4.png)
1. Provide a single AWS account number only and select a list of regions in the account where you would like to deploy the AWS CloudFormation template as shown in the screenshot below:
   * You will need to select all the regions in the current account where you would like to deploy the template.<br/>  ![ClodFormation_Stackset 5.png](/img/observability/ClodFormation_Stackset_5.png)
1. Increasing the **Maximum concurrent actions** to be more than 1 is not recommended and can cause your stack set deployment to fail. Stack sets should be deployed one at a time, sequentially. Click **Next**.  <br/>  ![ClodFormation_Stackset  6.png](/img/observability/ClodFormation_Stackset_6.png)
1. Review the details, select the capabilities and click **Submit**. <br/>  ![ClodFormation_Stackset 7.png](/img/observability/ClodFormation_Stackset_7.png)
1. Once you hit submit, the AWS CloudFormation template will execute in the provided account and regions sequentially.

## Add more accounts to the same Stack Set

1. Select **Add new stacks to StackSet**.<br/>  ![ClodFormation_Stackset 8.png](/img/observability/ClodFormation_Stackset_8.png)
1. In ‘**Set deployment options**’, Enter the account number and regions you want to deploy the stack.  <br/>  ![ClodFormation_Stackset 9.png](/img/observability/ClodFormation_Stackset_9.png)
1. Verify the S3 mapping file contains the mapping for the new Account ID.
1. Review the details, select the capabilities, and click **Submit**.
