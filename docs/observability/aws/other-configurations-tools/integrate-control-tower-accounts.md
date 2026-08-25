---
id: integrate-control-tower-accounts
title: Integrate Control Tower with AWS Observability
description: Learn how to use the AWS Observability solution  with AWS Control Tower-managed accounts
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## What is AWS Control Tower?

AWS Control Tower provides the easiest way to set up and govern a new, secure, multi-account AWS environment. With AWS Control Tower, you can provision new AWS accounts that are automatically set up so they conform to company policies and best practices in a few clicks.

For more information on AWS Control Tower, see [AWS Control Tower](https://aws.amazon.com/controltower/) on the AWS site. 

## Benefits of using the AWS Observability solution with Control Tower

The AWS Observability solution can be used with Control Tower-managed accounts to: 

* **Quickly identify and resolve issues in and across multiple accounts and services**. Enable teams to seamlessly navigate and search logs and metrics data across their AWS accounts, regions, and services. Unified service and account visibility greatly speeds up troubleshooting and minimizes downtime, improving overall system availability.
* **Eliminate data silos**. Unify logs and metrics across AWS accounts and services to eliminate data silos and help teams quickly identify root causes. 
* **Accelerate time-to-value**. Streamline setup and pre-built dashboards for instant insights into AWS accounts and services, enabling visibility into the most important data out-of-the-box.  

For more information on the AWS Observability solution, see [About Sumo Logic AWS Observability](/docs/observability/aws/about/).

## Prerequisites

To integrate the AWS Observability solution with Control Tower, you collect CloudTrail audit logs from each AWS account that is managed by AWS Control Tower and store the audit logs in an S3 bucket in a Log Archive AWS account.

We recommend you familiarize yourself with the AWS Observability Solution. For more information, see:

* [About Sumo Logic AWS Observability](/docs/observability/aws/about.md)
* [Deploy and Use AWS Observability](/docs/observability/aws/deploy-use-aws-observability)
* [View the AWS Observability Solution Dashboards](/docs/observability/aws/deploy-use-aws-observability/view-dashboards/)

 :::note
 CloudTrail must be enabled for EventBridge to capture `CreateManagedAccount` and `UpdateManagedAccount` events, since these events are recorded and delivered through CloudTrail.
 :::

## Integrate AWS Control Tower-managed accounts with the AWS Observability solution

Integrating with AWS Control Tower takes several steps: 
* [Step 1](#step-1-set-up-collection-of-logs-and-metrics-data-from-your-aws-accounts):
  * [Set up collection manually](#set-up-collection-manually-for-aws-accounts): Create a CloudFormation stack in each AWS account managed by Control Tower.
  * [Set up collection automatically for new AWS accounts](#set-up-collection-automatically-for-new-aws-accounts): Deploy a single CloudFormation template to your management account so accounts created via Control Tower Account Factory are set up automatically going forward.
* [Step 2](#step-2-collect-from-the-log-archive-account): Set up collection of AWS CloudTrail logs that are aggregated from all Control Tower-managed accounts in a centralized log archive account.
* [Step 3](#step-3-create-field-extraction-rule): Create a Field Extraction Rule (FER) that will tag logs with the account aliases you set up for each child account in the previous step.
* [Step 4](#step-4-view-the-aws-observability-dashboards): View the AWS Observability dashboards for your Control Tower-managed accounts.

<img src={useBaseUrl('img/observability/Control-Architecture.png')} alt="<Control Architecture" style={{border: '1px solid gray'}} width="800" />

## Step 1: Set up collection of logs and metrics data from your AWS accounts 

In this step, you configure the collection of logs and metrics for all AWS accounts managed by Control Tower and install the apps in the solution. Follow these steps for each AWS account managed by AWS Control Tower, either manually for existing accounts or automatically for accounts created going forward.

### Set up collection manually for AWS accounts
1. Log in to the AWS Management Console as the AWS account user.
1. Follow steps 1 through 10 of the instructions in [Deploy with AWS CloudFormation](/docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation/) to configure the AWS Observability CloudFormation template.
1. In the **Sumo Logic AWS CloudTrail Source Details** section of the template, select **No** for **Create Sumo Logic CloudTrail Logs Source** and keep the default values for all other options. <br/><img src={useBaseUrl('img/observability/integrate-tower1.png')} alt="Create Sumo Logic CloudTrail Logs Source " style={{border: '1px solid gray'}} width="800" />

### Set up collection automatically for new AWS accounts

For new AWS accounts created using Control Tower Account Factory, you can configure the AWS Observability solution to deploy automatically using Control Tower lifecycle events. This eliminates the need to manually run [Set up collection manually for AWS accounts](#set-up-collection-manually-for-aws-accounts) for each new account going forward.

<img src={useBaseUrl('img/observability/integrate-tower8.png')} alt="Sumo Logic AWS ALB Log Source Details" style={{border: '1px solid gray'}} width="800" />

When an account creation or update succeeds in Control Tower, the solution captures the `CreateManagedAccount` or `UpdateManagedAccount` lifecycle event and triggers an AWS Lambda function. The Lambda function deploys the AWS Observability CloudFormation stack to the new account across all configured regions, with CloudTrail log source creation and app installation disabled. (The centralized Log Archive account handles CloudTrail logs, and apps are already installed from the manual setup above.)

The Lambda function derives the account alias from the account name (lowercase alphanumeric characters only, truncated to 30 characters) and passes it automatically to the stack.

Deploying this template to your AWS management account creates the following resources:

- An Amazon EventBridge rule that captures `CreateManagedAccount` and `UpdateManagedAccount` events from AWS Control Tower.
- An AWS Lambda function that deploys the AWS Observability CloudFormation stack to each new account.
- An AWS Secrets Manager secret, encrypted with an AWS KMS key, that stores your Sumo Logic Access ID and Access Key for use by the Lambda function.
- AWS IAM roles with the permissions required to create CloudFormation StackSets across accounts.

To deploy the lifecycle events template:

1. Log in to the AWS Management Console as the **AWS Control Tower Master Account**.
1. Download and launch the Sumo Logic Control Tower CloudFormation template in the region where your Control Tower is deployed. Use the link that matches your AWS Observability version:
   - **AWSO v2.15.0**: [controltower.template.yaml](https://raw.githubusercontent.com/SumoLogic/sumologic-solution-templates/refs/heads/master/aws-observability/apps/controltower/controltower.template.yaml)
1. In the **Sumo Logic Access Configuration** section, fill in the following required fields:

   | Parameter | Description |
   |:--|:--|
   | **Sumo Logic Deployment Name** | Your Sumo Logic deployment. Enter one of: `au`, `ca`, `ch`, `de`, `eu`, `fed`, `jp`, `kr`, `us1`, or `us2`. See [Sumo Logic Endpoints and Firewall Security](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security). |
   | **Sumo Logic Access ID** | Your Sumo Logic Access ID. See [Access Keys](/docs/manage/security/access-keys/) to create one. |
   | **Sumo Logic Access Key** | Your Sumo Logic Access Key. |
   | **Sumo Logic Organization ID** | Found on the **Account Overview** page in the Sumo Logic UI. Used for IAM role configuration in Sumo Logic AWS Sources. See [Account Settings and Preferences](/docs/get-started/account-settings-preferences/). |

   1. In the **Regions to Monitor** section, enter a comma-separated list of AWS regions where you want the AWS Observability solution deployed when a new account is created. The default value is:
      ```
      us-east-1, us-east-2, us-west-1, us-west-2, ap-south-1, ap-northeast-1, ap-northeast-2, ap-southeast-1, ap-southeast-2, ca-central-1, eu-central-1, eu-west-1, eu-west-2, eu-west-3, eu-north-1, sa-east-1
      ```
   1. Review all settings and click **Create stack**.

   <img src={useBaseUrl('img/observability/integrate-tower7.png')} alt="Sumo Logic Control Tower Template" style={{border: '1px solid gray'}} width="800" />

   :::note
   CloudFormation creates a KMS key and stores the Sumo Logic Access ID and Access Key in AWS Secrets Manager. The secret is named using the CloudFormation stack name as an alias.
   :::

## Step 2: Collect from the Log Archive account

:::note
In the instructions below, we assume the Log Archive AWS account is used only to centralize logs across AWS Control Tower-managed accounts. If this is not the case and you want to monitor AWS services in these accounts, follow the instructions in [AWS Observability Solution](/docs/observability/aws/) to set up the relevant services.
:::

1. Log in to the AWS Management Console as the Log Archive AWS account user.
1. Follow steps 1 through 10 of the instructions in the [Deploy with AWS CloudFormation](/docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation/) to configure the AWS Observability CloudFormation template.
1. In the **Sumo Logic Access Configuration** section of the template, fill in as required by the template.
1. In the **AWS Resources Tag Configuration** section of the template, select **None** for **Auto Enable Tagging** and enter `logarchive` as the account alias.
1. In the **Sumo Logic AWS Observability Apps and Alerts** section of the template, select **No** for “Install AWS Observability Apps”, as they were installed in [Step 1](#step-1-set-up-collection-of-logs-and-metrics-data-from-your-aws-accounts), above.<br/><img src={useBaseUrl('img/observability/integrate-tower2.png')} alt="Install AWS Observability Apps" style={{border: '1px solid gray'}} width="800" />
1. In the **Sumo Logic AWS CloudWatch Metrics Sources** section of the template, select **None** for **Select the Sumo Logic Metrics Sources to create**, and leave the other options blank.<br/><img src={useBaseUrl('img/observability/integrate-tower4.png')} alt="elect the Sumo Logic Metrics Sources to create" style={{border: '1px solid gray'}} width="800" />
1. In the **Sumo Logic AWS ALB Log Source** section of the template:
    1. Select **None** for **Enable ALB Access logging**. 
    1. Select **No** for **Create Sumo Logic ALB Logs Source.**
    1. Keep the default values for all the other options. <br/><img src={useBaseUrl('img/observability/integrate-tower5.png')} alt="Sumo Logic AWS ALB Log Source Details" style={{border: '1px solid gray'}} width="800" />
1. In the **Sumo Logic AWS ELB classic Log Source** section of the template:
    1. Select **None** for **Enable ELB Access logging**. 
    1. Select **No** for **Create Sumo Logic ELB Logs Source.**
    1. Keep the default values for all the other options. <br/><img src={useBaseUrl('img/observability/integrate-tower9.png')} alt="Sumo Logic AWS ALB Log Source Details" style={{border: '1px solid gray'}} width="800" />
1. In the **Sumo Logic AWS CloudTrail Source** section of the template:

    Case 1: Set up Sumo Logic CloudTrail Source to collect data in Sumo Logic.

      1. Select **Yes** for **Create Sumo Logic CloudTrail Logs Source**.
      1. Enter the name of the CloudTrail Bucket in **Amazon S3 Bucket Name**.
      1. Provide a path expression for the Logs in “**Path Expression for existing CloudTrail logs**. <br/><img src={useBaseUrl('img/observability/integrate-tower6.png')} alt="Any Existing Bucket Path Expression for the CloudTrail logs" style={{border: '1px solid gray'}} width="800" />

    Case 2: Already collecting CloudTrail Data in Sumo Logic

      1. Select **No** for **Create Sumo Logic CloudTrail Logs Source** and keep the default values for all the other options.

1. In the **Sumo Logic CloudWatch Logs Source** section of the template:
   1. Select **None** for **Select the Sumo Logic CloudWatch Logs Source Type** if you don’t plan to collect CloudWatch logs from this account.
   1. If you want to monitor Lambda CloudWatch logs, fill in the details required by the template.
1. Run through the prompts and click **Create the stack**.

## Step 3: Create Field Extraction Rule

In this step, you create a Field Extraction Rule (FER) that will tag logs with the account aliases you set up for each child account in the previous step.  

:::note
You must have a role that grants you the Manage Field Extractions capability to create an FER.
:::

1. Log in to the Sumo Logic web UI and follow the instructions in Create a Field Extraction Rule using the following values: 
    * **Rule Name**. AWS Accounts
    * **Applied At**. Ingest Time
    * **Scope**. Specific Data
    * **Metadata**. _sourceCategory 
    * **Value**.  aws/observability/cloudtrail/logs
    * **Parse Expression**. Enter a parse expression to create an “account” field that maps to the alias you set for each child account in the previous step. For example, if you used the “dev” alias for an AWS account with ID  "528560886094" and the “prod” alias for an AWS account with ID "567680881046", your parse expression would look like:   

        ```sumo
        | json "recipientAccountId"
        // Manually map your AWS account ID with the AWS account alias you set up earlier for the individual child account
        | "" as account
        | if (recipientAccountId = "528560886094", "dev", account) as account
        | if (recipientAccountId = "567680881046", "prod", account) as account
        | fields account
        ```

    The screenshot below shows what this would look like in Sumo Logic:

    <img src={useBaseUrl('img/observability/Field-Extraction-rule.png')} alt="Field Extraction rule" style={{border: '1px solid gray'}} width="400" />

## Step 4: View the AWS Observability dashboards

Now you can start monitoring your AWS services in AWS Control Tower managed accounts. For information about the solution dashboards, see [View AWS Observability Solution Dashboards](/docs/observability/aws/deploy-use-aws-observability/view-dashboards/).
