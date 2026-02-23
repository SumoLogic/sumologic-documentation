---
id: update-aws-observability-stack
title: Update the AWS Observability Stack
sidebar_label: Update Observability Stack
description: Learn how to update the AWS Observability stack.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can update an existing observability stack using Terraform or an AWS CloudFormation template.

## Update with Terraform

The AWS Observability Terraform scripts reside in GitHub and updates will be posted on the [Changelog](/docs/observability/aws/deploy-use-aws-observability/changelog/).

To update the deployed solution:

1. Navigate to the directory where you have cloned the Sumo Logic Solution template repo and pull to get the latest version of AWS Observability Terraform configuration: 
    ```bash
    $ git pull 
    ```
1. Review the changelog and configure any new parameters as needed. See [Deploy with Terraform](/docs/observability/aws/deploy-use-aws-observability/deploy-with-terraform/) on how to configure parameters and to override default values.
1. Run the Terraform commands to update the solution:
    ```bash
    $ terraform init
    $ terraform apply
    ```

## Update with AWS CloudFormation template

Use a new version or the same version of AWS CloudFormation template to update an existing stack.

Before starting with stack update, make sure no resource has been deleted manually as it can lead to failures in the stack update procedure.

:::note
Updating the apps will create a backup of the old apps in a folder named **“BackUpOldApps''** in the **“Sumo Logic AWS Observability Apps”** folder. Delete the backed up apps after moving any customizations in old dashboards to the new dashboard folder. **Keeping multiple copies of dashboards will result in multiple dashboards in the explore dropdown hierarchy.**
:::

To update an existing stack to the latest version:

1. Locate the **Main Stack** created using the AWS CloudFormation template and click **Update**. <br/><img src={useBaseUrl('img/observability/Stack_Step1.png')} alt="Stack step 1" style={{border: '1px solid gray'}} width="800" />
1. Select **Replace Current Template**, paste the URL `https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.13.0/sumologic_observability.master.template.yaml` in the Amazon S3 URL option, and then select **Next**.
    :::note
    If you would like to download or inspect this or other versions of this template, visit the [Changelog](/docs/observability/aws/deploy-use-aws-observability/changelog/) page.
    :::
    <img src={useBaseUrl('img/observability/aws-create-stack.png')} alt="AWS create stack" style={{border: '1px solid gray'}} width="800" />
1. Keep parameters that you selected before when you created the stack and click **Next**.
1. Review all the changes listed on the **Change Set Review** and make sure you're comfortable with these changes.
1. Select the capabilities and Click **Submit**.  <br/><img src={useBaseUrl('img/observability/Stack_Step4.png')} alt="Select the capabilities" style={{border: '1px solid gray'}} width="<insert-pixel-number>" />
1. After the update is complete, the stacks that have been updated successfully will be set to a `UPDATE_COMPLETE` status.  
