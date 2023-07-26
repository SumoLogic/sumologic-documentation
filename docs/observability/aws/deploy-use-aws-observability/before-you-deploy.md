---
id: before-you-deploy
title: Before You Deploy
sidebar_label: Before You Deploy
description: Learn prerequisites and guidelines for deploying the AWS Observability Solution to a single AWS account and region.
---

This page describes prerequisites and guidelines for deploying Sumo Logic’s AWS Observability Solution. 

## Prerequisites

* **Sumo Logic Metrics**. The AWS Observability Solution leverages both logs and metrics to provide comprehensive monitoring and troubleshooting of your AWS cloud infrastructure. If you do not already have Metrics, contact your Sumo Logic account representative. AWS Observability integrates with Explore by populating metadata and only shows entities with metrics coming in. If you do not see expected entities, make sure configurations are correct to collect and receive metrics including the [CloudWatch Namespace](/docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation) for CloudFormation Template.
* Make sure you have access to the Sumo Logic console and as a user that is associated with Sumo Logic role and required role capabilities.
* **Role capabilities**. Make sure you have a Sumo Logic role that have the following capabilities:
  * Manage field extraction rules
  * Manage connections
  * View Account Overview
  * View Fields
  * View field extraction rules
  * Manage Content
  * Manage Collectors
  * View Collectors
  * Manage Fields
  * Manage Monitors
  * Manage Metrics Rules
  * View Monitors
  * Manage Entity Type Configs
  * Create access keys
* **Sumo Logic Access ID and Key**. When you deploy the solution, you’ll need to supply a Sumo Logic Access ID and Access Key, which enable you to use Sumo Logic APIs. Make sure you have the role capabilities listed above before generating the Access ID and Key.
* **AWS credentials**. To deploy the solution, you will need to log onto the AWS Console. For the CloudFormation template deployment option, your AWS role must have the permissions described by this [JSON file](https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/AWSObservabilityCFTemplatePermissions.json). As necessary, you may add JSON text to an existing or a new policy associated with an AWS IAM role as described in the [AWS documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-and-attach-iam-policy.html). For Terraform deployment options, see the \*.tmpl files in this folder [aws-observability-terraform/source-module/templates/](https://github.com/SumoLogic/sumologic-solution-templates/tree/master/aws-observability-terraform/source-module/templates).
* Set up the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and configure the AWS CLI as described in the [AWS documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) if you would like to use an AWS profile for Terraform script based deployment.
* The AWS Observability solution comes with pre-packaged alerts in the form of Sumo Logic Monitors. To understand more about their capabilities please visit the Monitors page.

## Deployment options

You can deploy AWS Observability to a single AWS account and region, or to all of your accounts in all regions. We provide instructions for both alternatives. 

Typically you would first deploy the solution to a single AWS account and region, kick the tires, and then expand the deployment. See [Deploy AWS Observability](/docs/observability/aws/deploy-use-aws-observability) for a limited deployment. [See Deploy to Multiple Accounts and Regions](deploy-with-aws-cloudformation/deploy-multiple-accounts-regions.md) for a broader deployment. 

You have two options for deploying:

* Deploy using an [AWS CloudFormation template](/docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation)
* Deploy using a [Terraform Script](deploy-with-terraform.md)

The Sumo Logic AWS Observability solution supports the following AWS regions:
* Asia Pacific (Hong Kong)
* Asia Pacific (Tokyo)
* Asia Pacific (Seoul)
* Asia Pacific (Mumbai)
* Asia Pacific (Singapore)
* Asia Pacific (Sydney)
* Canada (Central)
* Europe (Frankfurt)
* Europe (Stockholm)
* Europe (Ireland)
* Europe (London)
* Europe (Paris)
* Middle East (Bahrain)
* South America (São Paulo)
* US East (N. Virginia)
* US East (Ohio)
* US West (N. California)
* US West (Oregon)

:::note
The region(s) must be enabled and active before deploying the solution.
:::

## Deployment considerations  

You deploy the solution by either running an AWS CloudFormation template or via Terraform scripts. When doing so, consider the following.

### Do you already have the required sources? 

When you deploy, you are given the option to create the Sumo Logic sources that the solution applications rely upon. If you have already configured those sources, you do not have to create new ones. You can just provide the URLs of the relevant Sumo Logic sources as part of the AWS CloudFormation or Terraform configuration.

:::note
If you use existing sources for the AWS Observability solution, rather than create new ones, it is not necessary to modify the existing metadata and source categories associated with the sources—the metadata that the solution depends on will be added to the sources at deployment time. 
:::

### Install the solution apps once

The CloudFormation template gives you the option to install the solution apps. You should install the apps only during the first execution of the AWS CloudFormation template for a given Sumo Logic account.

The Terraform script gives you the option to install the solution apps using app-modules. You should install the apps only once with the app-modules for a given Sumo Logic account.

### Bucket considerations

In the sections of the Terraform scripts or CloudFormation template that relate to creating Sumo Logic sources, you can specify an existing S3 bucket to store the logs that the source collects. If you don’t supply a bucket name, the template will create a new one. We recommend you use an existing bucket if possible. 

### Do you use AWS Control Tower?

If you use AWS Control Tower to manage your accounts, see the [Sumo Logic-AWS Control Tower integration guide](https://d1.awsstatic.com/Marketplace/solutions-center/downloads/SumoLogic-AWS-ControlTower-Implementation%20Guide-v2.0.pdf)
that specifically calls out how to use the AWS Observability solution to monitor AWS Control Tower managed accounts.

:::note
This integration is supported only via AWS CloudFormation.
:::

### Running the CloudFormation template from the command line

If desired, you can run the AWS CloudFormation template from the AWS CLI, using the [deploy](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/deploy/index.html) command.  You can use this [script](https://github.com/SumoLogic/sumologic-solution-templates/tree/master/aws-observability/scripts/DeployTemplate), as an example. 

### Configure Host Metrics sources 

Follow the instructions in this section to configure an Sumo Logic Installed Collector and a Host Metrics Source on each of your AWS EC2 hosts. You will assign `account` and `Namespace` metadata fields to the sources so that incoming logs and metrics will be appropriately tagged.

:::note
This step is not necessary if you already have an Installed Collector and Host Metrics tagged with account and Namespace metadata fields.
:::

Perform these steps for each EC2 host.

1. Set up an Installed Collector. For instructions, see Installed Collectors.
1. Add a Host Metrics Source to the Installed Collector. For instructions, see Manually Configure a Host Metrics Source. In the **Fields** portion of the configuration::
1. Add a field named `account`, and set it to your AWS account alias.
1. Add a field `Namespace` named and set it to `AWS/EC2`. 
1. Set the **Scan Interval** (the frequency at which the Source is scanned) to 1 minute. 

:::note
A default Scan Interval of 1 minute is recommended. You can set it to a higher or lower interval as needed. Faster intervals may result in increased consumption cost.
:::

To automate the above, see [Add Fields to Existing Host Metrics Sources](../other-configurations-tools/add-fields-to-existing-host-metrics-sources.md). 

Going forward, you can also build your EC2 AMI machine image with these fields and settings. For instructions, see [this blog](https://www.sumologic.com/blog/packer-and-sumo-logic).

Here’s a sample `sources.json` file that you can include in your AMI.

```json
{
  "api.version": "v1",
   "source": {
    "name": "Host Metrics",
    "category": "hostmetrics",
    "automaticDateParsing": false,
    "multilineProcessingEnabled": true,
    "useAutolineMatching": true,
    "contentType": "HostMetrics",
    "forceTimeZone": false,
    "filters": [],
    "cutoffTimestamp": 0,
    "encoding": "UTF-8",
    "fields": {
      "account": "<your AWS account alias>",
      "Namespace": "AWS/EC2"
    },
    "thirdPartyRef": {
      "resources": [
        {
          "serviceType": "HostMetrics",
          "path": {
            "type": "NoPathExpression"
          },
          "authentication": {
            "type": "NoAuthentication"
          }
        }
      ]
    },
    "interval": 300000,
    "metrics": [
      "CPU_User",
      "CPU_Sys",
 …..
    ],
    "processMetrics": [],
    "sourceType": "SystemStats"
  }
}
```

## Verify AWS and Sumo Logic Permissions

Before setting up the AWS Observability solution we recommend testing permissions for both AWS and Sumo Logic by using a test AWS CloudFormation template. To execute this template:

1. Invoke the AWS CloudFormation template at this [URL](https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.6.1/permissionchecker/permissioncheck.template.yaml).
1. Select the desired AWS region to test.
1. Enter a Stack Name, Sumo Logic Deployment, and Sumo Logic Access ID and Access Key.<br/>  ![Testing_sumo_Permission_1.png](/img/observability/Testing_sumo_Permission_1.png)
1. Click **Create Stack.**
1. Verify that the AWS CloudFormation template has executed successfully in a CREATE_COMPLETE status.
    * This indicates that you have all the right permissions on both the Sumo Logic and the AWS side to proceed with the installation of the solution. 
    * All the resources (Sumo Logic and AWS) created by template are also deleted.<br/>  ![Testing_sumo_Permission_2.png](/img/observability/Testing_sumo_Permission_2.png)
1. If the AWS CloudFormation template has not executed successfully, identify and fix any permission errors till the stack completes with a `CREATE_COMPLETE` status. 
1. Once the AWS CloudFormation stack has executed successfully, delete the AWS CloudFormation Stack.
