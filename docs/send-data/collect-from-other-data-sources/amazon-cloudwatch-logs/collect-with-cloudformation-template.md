---
id: collect-with-cloudformation-template
title: Collect Amazon CloudWatch Logs using a CloudFormation Template with Secured Sumo Endpoint
sidebar_label: Collect Logs using CloudFormation
description: Learn how to collect Amazon CloudWatch Logs using a CloudFormation template with secured Sumo EndPoint.
---

:::note
The below steps assumes you have configured a Hosted collector and an HTTP Source as specified in this [section](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs).
:::

## Download the CloudFormation template

Sumo Logic provides a CloudFormation template to make setup easier. If you want to make any of the optional modifications described in this [section](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs), download the `DLQLambdaCloudFormationWithSecuredEndpoint.json` CloudFormation template from https://s3.amazonaws.com/appdev-cloudformation-templates/DLQLambdaCloudFormationWithSecuredEndpoint.json and make modifications. Otherwise, proceed to Create a SecureString Parameter console.

## Create a SecureString Parameter

You can create the parameter via AWS CLI or via Console.

If you're using AWS CLI use the below command:

```
aws ssm put-parameter --region us-east-1 --cli-input-json '{
  "Name": "SUMO_ENDPOINT",
  "Value": \<Paste the endpoint of the HTTP source created in step >",
  "Type": "SecureString"
}'
```

:::note
The above command uses the default AWS Managed Key. If you want to use Customer Managed CMK, refer [Create a SecureString parameter using a customer managed CMK](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-securestring.html#sysman-param-defaultkms).
:::

If you're using AWS Console do the following:

1. Go to https://console.aws.amazon.com/systems-manager/parameters.

   * **Name.** SUMO_ENDPOINT
   * **Tier.** Standard
   * **Type.** Select SecureString
   * **KMS Key Source.** Select the KMS Key ID or you can use the default KMS key.
   * **Value.** Paste the value of the SUMO_ENDPOINT_URL copied while creating the HTTP source.

1. Click **Save Parameter.**

![Create_SecureString_Parameter.png](/img/send-data/Create_SecureString_Parameter.png)

:::note
You can verify whether the parameter is created successfully by going to https://console.aws.amazon.com/systems-manager/parameters/?region=us-east-1&tab=Table and looking for parameter SUMO_ENDPOINT.
:::

#### Get the KMS Key ID

Follow the steps in this [document](https://docs.aws.amazon.com/kms/latest/developerguide/find-cmk-id-arn.html) to get the Key ID used to encrypt/decrypt the parameter created earlier. If you're using default AWS Managed Key the Key ID should be corresponding to the alias value [aws/ssm](https://console.aws.amazon.com/kms/home?region=us-east-1#/kms/defaultKeys/629673c1-9f21-4c2d-bf75-19617579c558/). 

### Create a stack on the AWS CloudFormation console

1. Log in to the [AWS Management Console](https://s3.console.aws.amazon.com/).
1. Under **Management Tools**, select **CloudFormation**.
1. Create a new stack by clicking **Create Stack**, then select “**With new resources (standard).**”

  ![Create_Stack_on_AWS_1.gif](/img/send-data/Create_Stack_on_AWS_1.gif)

1. On the **Specify Template** window, do one of the following:

   * If you have downloaded and optionally modified the CloudFormation template, choose to **Upload a template file**, upload the `DLQLambdaCloudFormationWithSecuredEndpoint.json` file, and then click **Next**.

    ![Create_Stack_on_AWS_2.png](/img/send-data/Create_Stack_on_AWS_2.png)

   * Otherwise, if you did not modify the CloudFormation template, select **Specify an Amazon S3 template URL** and enter: `https://s3.amazonaws.com/appdev-cloudformation-templates/DLQLambdaCloudFormationWithSecuredEndpoint.json`        

    ![Create_Stack_on_AWS_3.png](/img/send-data/Create_Stack_on_AWS_3.png)

1. Select **Next** and the **Specify Stack Details** window appears. Enter the following:
   * **Stack Name**.
   * **EmailID** (Optional). Used for alerts.
   * **IncludeLogGroupInfo.**  Set to true to include loggroup/logstream values in logs. The default value is False. For AWS Lambda Logs **IncludeLogGroupInfo** must be set to **True**; for VPC Flow Logs it's optional. 
   * **LogFormat.** For VPC logs, choose either VPC-JSON (JSON format) or VPC-RAW (raw messages). The default value is Others. 
   * **LogStreamPrefix** (Optional). Enter a comma-separated list of logStream name prefixes to filter by logStream. Please note this is separate from a logGroup. This is used to only send certain logStreams within a CloudWatch logGroup(s). LogGroup(s) still need to be subscribed to the created Lambda function (`SumoCWLogsLambda-<Auto-Genereted-Suffix>`), regardless of what is input for this value.

    :::note
    LogStreamPrefix field does not accept special characters (`[|\{}()[\]^$+*?.-]`). For example, you can use the comma-separated list like test-name, test-logs as the LogStream name prefixes.
    :::

   * **NumOfWorkers.** (Optional) Increase this value to speed up the dead letter queue (DLQ) processing.
   * **SumoURLDecryptKeyID.** (Required) Enter the Key ID copied from “Get the KMS Key ID” step.

    ![Create_Stack_on_AWS_4.png](/img/send-data/Create_Stack_on_AWS_4.png)

1. Click **Next**. The **Configure Stack Options** screen will appear. You can optionally add AWS tags to tag the resources created by this Cloudformation stack. Click **Next** to get to the final **Review** window.

1. In the **Review** window, click the checkbox acknowledging that you understand the template creates IAM resources, and click **Create**.

After a few minutes, you will see CREATE_COMPLETE in the Status column.

:::important
If you're using an existing log group or if you don’t want to send logs to the default group **SumoCWLogGroup** then you must do one of the following:  [Manually subscribe the **SumoCWLogsLambda** to an existing CloudWatch Log Group](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs), create a [subscription filter](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html) manually, or [Auto-Subscribe AWS Log Groups to a Lambda Function](../autosubscribe-arn-destination.md).
:::

Now go back to the [section](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs) and follow the instructions for remaining steps.
