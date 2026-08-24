---
id: update-aws-observability-stack-cloudformation
title: Update the AWS Observability Stack with CloudFormation
sidebar_label: Update Observability Stack
description: Learn how to update the AWS Observability stack using AWS CloudFormation.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Use a new version or the same version of the AWS CloudFormation template to update an existing stack.

Before starting with the stack update, make sure no resource has been deleted manually as it can lead to failures in the stack update procedure.

To update an existing stack to the latest version:

1. Locate the **Main Stack** created using the AWS CloudFormation template and click **Update**. <br/><img src={useBaseUrl('img/observability/Stack_Step1.png')} alt="Stack step 1" style={{border: '1px solid gray'}} width="800" />
1. Select **Replace Current Template**, paste the CloudFormation template URL in the Amazon S3 URL option, and then select **Next**.
For the latest CloudFormation template URL, see [Deploy with CloudFormation Template](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/deploy-with-aws-cloudformation/#step-0-open-the-cloudformation-template). If you would like to download or inspect other versions, visit the [Changelog](/docs/observability/aws/deploy-use-aws-observability/changelog/) page.
   <img src={useBaseUrl('img/observability/aws-create-stack.png')} alt="AWS create stack" style={{border: '1px solid gray'}} width="800" />
1. Keep parameters that you selected before when you created the stack and click **Next**.
1. Review all the changes listed on the **Change Set Review** and make sure you're comfortable with these changes.
1. Select the capabilities and Click **Submit**.  <br/><img src={useBaseUrl('img/observability/Stack_Step4.png')} alt="Select the capabilities" style={{border: '1px solid gray'}} width="800" />
1. After the update is complete, the stacks that have been updated successfully will be set to a `UPDATE_COMPLETE` status.
