---
id: update-aws-observability-stack
title: Update the AWS Observability Stack
sidebar_label: Update Observability Stack
description: Learn how to update the AWS Observability stack.
---

You can update an existing observability stack using Terraform or an AWS CloudFormation template.

## Update with Terraform

The AWS Observability Terraform scripts reside in GitHub and updates will be posted on the [Change Log](changelog.md).

To update the deployed solution:

1. Navigate to the directory where you have cloned the Sumo Logic Solution template repo and pull to get the latest version of AWS Observability Terraform configuration: 
    ```bash
    $ git pull 
    ```
1. Review the Change Log and configure any new parameters as needed. See [Deploy with Terraform](deploy-with-terraform.md) on how to configure parameters and to override default values.
1. Run the Terraform commands to update the solution:
    ```bash
    $ terraform init
    $ terraform apply
    ```

## Update with AWS CloudFormation Template

Use a new version or the same version of AWS CloudFormation template to update an existing stack.

Before starting with stack update, make sure no resource has been deleted manually as it can lead to failures in the stack update procedure.

:::note
Updating the Apps will create a backup of the old apps in a folder called as **“BackUpOldApps''** in the **“Sumo Logic AWS Observability Apps”**. Please delete the BackUp apps after moving any customizations in old dashboards to the new dashboard folder. **Keeping multiple copies of dashboards around will result in multiple dashboards in the explore dropdown hierarchy.**
:::

To update an existing stack to the latest version:

1. Locate the **Main Stack** created using AWS CloudFormation template and Click **Update**. <br/>  ![Stack_Step1.png](/img/observability/Stack_Step1.png)
1. Select **Replace Current Template**, paste the URL `https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v2.6.0/sumologic_observability.master.template.yaml` in the Amazon S3 URL option, and then select **Next**.
    :::note
    If you would like to download or inspect this or other versions of this template, please visit the [Change Log](changelog.md) page.
    :::
    ![aws-create-stack.png](/img/observability/aws-create-stack.png)
1. Keep parameters that you selected before when you created the stack and click **Next**.
1. Review all the changes listed on the **Change Set Review** and make sure you're comfortable with these changes.
1. Select the capabilities and Click **Submit**.  <br/>  ![Stack_Step4.png](/img/observability/Stack_Step4.png)
1. After the update is complete, the stacks that have been updated successfully will be set to a `UPDATE_COMPLETE` status.  
