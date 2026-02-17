---
id: add-fields-to-existing-host-metrics-sources
title: Add Fields to Existing Host Metrics Sources
description: Learn how to update the AWS Observability view hierarchy, updating existing host metric sources to work with AWS Observability, and how to use the solution with Control Tower accounts.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The AWS Observability Solution uses EC2 host metrics collected using Sumo Logic Host Metrics Source which is a part of Sumo Logic installed collector.

To make EC2 hosts part of the AWS Observability hierarchy, the EC2 host metrics sent to Sumo Logic need to be tagged with the following additional fields for them to be visible in the AWS Observability Solution dashboards.

| Field Name | Description | Availability in Host Metrics |
|:--|:--|:--|
| Account    | This is an alias for your AWS account—for example, production, development, or stage—that you supply when you install the solution. | No |
| Namespace  | This is the name of the AWS service (AWS/EC2). | No |

Account and Namespace are added to the metrics by adding both as Fields to Host Metrics source in Sumo Logic.

<img src={useBaseUrl('img/observability/add-fields1.png')} alt="Host metrics configuration panel" style={{border: '1px solid gray'}} width="600" />

The number of host metrics sources present in Sumo Logic can be high, and adding fields to each host metric source can be tedious.

To make the process easier for adding fields to Host metric sources, use the instructions in this document to run a CloudFormation template to automatically identify all the AWS EC2 instances and corresponding host metrics sources in Sumo Logic and automatically add the relevant account and namespace fields to the sources.

## Using the CloudFormation template

This section walks you through the process of using the CloudFormation template to add fields to host metric sources.

To deploy the CloudFormation template:

1. Sign on to the AWS Management console.

1. Invoke the CloudFormation YAML template using [this URL](https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateURL=https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.13.0/hostmetricsfields/host_metrics_add_fields.template.yaml).

1. Select the AWS Region where you want to deploy the CloudFormation template.
1. Provide the input parameters as prompted and described in the [Configuration prompts and input](#configuration-prompts-and-input) section below.
    * **Account Alias.** Make sure the Alias provided matches the account alias provided during installing AWS Observability solution for the corresponding account.
1. In **Capabilities and transforms** click each checkbox. <br/><img src={useBaseUrl('img/observability/add-fields2.png')} alt="Capabilities pane" style={{border: '1px solid gray'}} width="800" />
1. Click **Create Stack**.

## Configuration prompts and input

This section provides a listing of configuration prompts for the CloudFormation template, along with explanations for each prompt and any information you are required to provide. We recommend that you review this section and gather the required information before you start using the CloudFormation template.

### Sumo Logic access configuration (required)

| Prompt | Guideline                                                                                                                                                                                                                                        |
|:--|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sumo Logic Deployment Name | Enter au, ca, de, eu, jp, us2, fed, kr, or us1. For more information on Sumo Logic deployments, see [Sumo Logic endpoints by deployment and firewall security](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security). |
| Sumo Logic Access ID | Sumo Logic Access ID. For more information, see [Access Keys](/docs/manage/security/access-keys).                                                                                                                                                |
| Sumo Logic Access Key | Sumo Logic Access Key. This key is used for Sumo Logic API calls.                                                                                                                                                                                |
| Delete Fields when stack is deleted | True. Deletes the Account and Namespace fields from the Host Metric Sources when the stack is deleted.<br/>False. Keeps the fields in Host Metric Sources when the stack is deleted.                                                             |

### AWS account alias (required)

| Prompt | Guideline |
|:--|:--|
| Alias for your AWS account | Enter a name for the AWS environment from which you are collecting data. This name will appear in metrics and logs.<br/>Do not include special characters in the alias. |
| Force Update the Stack | Increment the value in case you want to force update the stack. |

## Update the stack

An existing stack can be updated using a new version of CloudFormation template or the same version of the CloudFormation template.

To update an existing stack, please follow the steps below:

1. Locate the **Main Stack** created using CloudFormation template and Click **Update**.  <br/>  <img src={useBaseUrl('img/observability/add-fields3.png')} alt="Update button" style={{border: '1px solid gray'}} width="800" />
1. Select ‘Use Current Template’ and select **Next**.<br/><img src={useBaseUrl('img/observability/add-fields4.png')} alt="Select Use Current Template" style={{border: '1px solid gray'}} width="800" />
1. Click **Create Stack**.
1. Add 1 to the **Force Update the Stack** parameter value and click **Next.** <br/><img src={useBaseUrl('img/observability/add-fields5.png')} alt="Force Update the Stack parameter" style={{border: '1px solid gray'}} width="800" />
1. On the **Review** page, check the **Change set preview** for potential updates. <br/><img src={useBaseUrl('img/observability/add-fields6.png')} alt="Change set preview" style={{border: '1px solid gray'}} width="800" />
1. Select the capabilities and Click **Update stack**. <br/><img src={useBaseUrl('img/observability/add-fields7.png')} alt="Update stack" style={{border: '1px solid gray'}} width="800" />

1. After the update is completed successfully, you can see **UPDATE_COMPLETE** status. If the update is not successful, please correct the errors and run the CloudFormation template again. 

## Multi-region installation using StackSets

The CloudFormation template can be deployed in a given account-region combination using CloudFormation stacks as described in the earlier section, however, AWS provides the ability to deploy the same template on multiple accounts and multiple regions using [StackSets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html).

Before you begin, complete the prerequisites for StackSets as outlined in the [AWS documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-prereqs.html).

Below are the steps to use the CloudFormation template with StackSets :

1. Go to [StackSets](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacksets) in your AWS account.
1. Click **Create StackSet**.<br/><img src={useBaseUrl('img/observability/add-fields8.png')} alt="Create StackSet" style={{border: '1px solid gray'}} width="800" />
1. Paste the URL `https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.13.0/hostmetricsfields/host_metrics_add_fields.template.yaml` in the Amazon S3 URL option and select **Next**. <br/><img src={useBaseUrl('img/observability/add-fields9.png')} alt="Choose a template" style={{border: '1px solid gray'}} width="800" />
1. Provide a StackSet Name, provide the parameters as explained in the section above, and click **Next**.
1. Add Tags if needed, select the Administrator role defined in the pre-requisites above, and click **Next**.<br/><img src={useBaseUrl('img/observability/add-fields10.png')} alt="Configure StackSet options" style={{border: '1px solid gray'}} width="800" />
1. Provide the current account ID and select all the regions in the current account where you would like to deploy the template.<br/><img src={useBaseUrl('img/observability/add-fields11.png')} alt="Set deployment options" style={{border: '1px solid gray'}} width="800" />
1. In the Deployment options, keep the default values and click **Next**. <br/><img src={useBaseUrl('img/observability/add-fields12.png')} alt="Deployment options" style={{border: '1px solid gray'}} width="800" />
1. Review the details, select the capabilities, and click **Submit**. <br/><img src={useBaseUrl('img/observability/add-fields13.png')} alt="Capabilities" style={{border: '1px solid gray'}} width="800" />

Once you hit submit, the CloudFormation template installation will execute in all the regions of the account sequentially.
