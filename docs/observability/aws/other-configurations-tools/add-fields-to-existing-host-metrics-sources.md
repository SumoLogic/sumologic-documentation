---
id: add-fields-to-existing-host-metrics-sources
title: Add Fields to Existing Host Metrics Sources
description: Learn how to update the AWS Observability Explore hierarchy, updating existing host metric sources to work with AWS Observability, and how to use the solution with Control Tower accounts.
---

The AWS Observability Solution uses EC2 Host metrics collected using Sumo Logic Host Metrics Source which is a part of Sumo Logic installed collector.

To make EC2 hosts part of the AWS Observability hierarchy, the EC2 host metrics sent to Sumo Logic need to be tagged with the following additional fields for them to be visible in the AWS Observability Solution dashboards.

| Field Name | Description | Availability in Host Metrics |
|:--|:--|:--|
| Account    | This is an alias for your AWS account—for example, production, development, or stage—that you supply when you install the solution. | No |
| Namespace  | This is the name of the AWS service (AWS/EC2). | No |

Account and Namespace are added to the metrics by adding both as Fields
to Host Metrics source in Sumo Logic.

![Step1.png](/img/observability/add-fields1.png)

The number of Host metrics sources present in Sumo Logic can be high and adding fields to each Host metric source can be tedious.

To make the process easier for adding fields to Host metric sources, use the instructions in this document to run a CloudFormation template to automatically identify all the AWS EC2 instances and corresponding Host metrics sources in Sumo Logic and automatically add the relevant account and namespace fields to the sources.

## Using the CloudFormation template

This section walks you through the process of using the CloudFormation Template to add fields to host metric sources.

To deploy the CloudFormation template:

1. Sign on to the AWS Management console.

1. Invoke the CloudFormation yaml template using [this URL](https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateURL=https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.6.1/hostmetricsfields/host_metrics_add_fields.template.yaml).

1. Select the AWS Region where you want to deploy the CloudFormation Template.

1. Provide the input parameters as prompted and described in the [Configuration Prompts and Input](#configuration-prompts-and-input) section below.
    * **Account Alias.** Make sure the Alias provided matches the account alias provided during installing AWS Observability solution for the corresponding account.

1. In **Capabilities and transforms** click each checkbox.  

    ![Step2.png](/img/observability/add-fields2.png)

1. Click **Create Stack**.

## Configuration prompts and input

This section provides a listing of configuration prompts for the CloudFormation Template, along with explanations for each prompt and any information you are required to provide. We recommend that you review this section and gather the required information before you start using the CloudFormation template.

### Sumo Logic Access Configuration (Required)

| Prompt | Guideline |
|:--|:--|
| Sumo Logic Deployment Name | Enter au, ca, de, eu, jp, us2, in, fed or us1. For more information on Sumo Logic deployments, see the [Sumo Logic Endpoints and Firewall Security](/docs/api/getting-started#Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security) topic. |
| Sumo Logic Access ID | Sumo Logic Access ID. For more information, see [Create an access key](/docs/manage/security/access-keys.md) in the Access Keys topic. |
| Sumo Logic Access Key | Sumo Logic Access Key. This key is used for Sumo Logic API calls. |
| Delete Fields when stack is deleted | True. Deletes the Account and Namespace fields from the Host Metric Sources when the stack is deleted.<br/>False. Keeps the fields in Host Metric Sources when the stack is deleted. |

### AWS account alias (Required)

| Prompt | Guideline |
|:--|:--|
| Alias for your AWS account | Enter a name for the AWS environment from which you are collecting data. This name will appear in the Sumo Logic Explorer View, metrics, and logs.<br/>Do not include special characters in the alias. |
| Force Update the Stack | Increment the value in case you want to force update the stack. |

## Update the Stack

An existing stack can be updated using a new version of CloudFormation Template or the same version of the CloudFormation Template.

To update an existing stack, please follow the steps below:

1. Locate the **Main Stack** created using CloudFormation template and Click **Update**.  <br/>  ![Step3.png](/img/observability/add-fields3.png)
1. Select ‘Use Current Template’ and select **Next**.<br/>  ![Step4.png](/img/observability/add-fields4.png)
1. Add 1 to the ‘Force Update the Stack’ parameter value and click **Next.** <br/>  ![Step5.png](/img/observability/add-fields5.png)
1. On the **Review** page, check the C**hange set preview** for potential updates. <br/>  ![Step6.png](/img/observability/add-fields6.png)
1. Select the capabilities and Click **Update stack**. <br/>  ![Step7.png](/img/observability/add-fields7.png)

1. After the update is completed successfully, you can see **UPDATE_COMPLETE** status. If the update is not successful, please correct the errors and run the CloudFormation template again. 

## Multi Region Installation using Stack Sets

The CloudFormation template can be deployed in a given account-region combination using CloudFormation stacks as described in the earlier section, however, AWS provides the ability to deploy the same template on multiple accounts and multiple regions using [Stack Sets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html).

Before you begin, please:

Complete the prerequisites for StackSets as outlined in the [AWS documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-prereqs.html).

Below are the steps to use the CloudFormation template with Stack Sets :

1. Go to [Stack Sets](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacksets) in your AWS account.
1. Click **Create StackSet**.  
    ![Step8.png](/img/observability/add-fields8.png)
1. Paste the URL `https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.6.1/hostmetricsfields/host_metrics_add_fields.template.yaml` in the Amazon S3 URL option and select **Next**. <br/>  ![Step9.png](/img/observability/add-fields9.png)
1. Provide a Stack Set Name, provide the parameters as explained in the section above, and click **Next**.
1. Add Tags if needed, select the Administrator role defined in the pre-requisites above, and click **Next**.<br/>  ![Step10.png](/img/observability/add-fields10.png)
1. Provide the current account ID and select all the regions in the current account where you would like to deploy the template.<br/>  ![Step11.png](/img/observability/add-fields11.png)
1. In the Deployment options, keep the default values and click **Next**. <br/>  ![Step12.png](/img/observability/add-fields12.png)
1. Review the details, select the capabilities, and click **Submit**. <br/>  ![Step13.png](/img/observability/add-fields13.png)

Once you hit submit, the CloudFormation template installation will execute in all the regions of the account sequentially.
