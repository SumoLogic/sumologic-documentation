---
id: collect-with-cloudformation-template
title: Collect Amazon CloudWatch Logs using a CloudFormation Template
sidebar_label: Collect Logs using CloudFormation
description: Learn how to collect Amazon CloudWatch Logs using a CloudFormation template.
---

This page has instructions for creating AWS resources using a Sumo Logic provided CloudFormation template. The template specifies the resources necessary to send Amazon CloudWatch Logs to Sumo Logic, including a Lambda function for sending logs, another Lambda function configured with a dead letter queue for resending messages as necessary, and associated roles and permissions. For more information about the resources created, see [Download the CloudFormation template](#download-the-cloudformation-template).

When you upload the template to AWS, it creates the AWS resources described in the table below.

| Resource Name |  Description |
|:--|:--|
| `SumoCWLogGroup` | A log group that has a subscription filter (`SumoCWLogSubsriptionFilter`)  associated with it that delivers real time logs to Sumo’s CloudWatch Lambda function (`SumoCWLogsLambda`). |
| `SumoCWLogsLambda` | A Lambda function responsible for sending data to the Sumo Logic HTTP Source URL. It is configured with a dead letter queue (`SumoCWDeadLetterQueue`) that receives messages that can’t be processed successfully. You can subscribe other logs to this function except its own log group. |
| `SumoCWProcessDLQLambda` | A Lambda function responsible for reading messages from the dead letter queue and resending messages. This function is periodically triggered by AWS CloudWatch Events using a schedule rule (`SumoCWProcessDLQScheduleRule`). |
| `SumoCWLambdaPermission` | Permission to CloudWatch Logs for invoking Lambda functions. |
| `SumoCWLambdaExecutionRole` | IAM Role for the two Lambda functions. The role includes policies for creating CloudWatch Logs, running CRUD operations on the dead letter queue  (`SumoCWDeadLetterQueue`), and invoking Lambda functions. |
| `SumoCWEventsInvokeLambdaPermission` | Permission for CloudWatch events to trigger the `SumoCWProcessDLQLambda` Lambda function. |
| `SumoCWSpilloverAlarm` | An alarm that is triggered if the number of messages in the Dead Letter Queue exceeds the threshold defined in the CoudFormation template (default is 100000). The alarm is configured with a “send email” action (`SumoCWEmailSNSTopic`). You must verify receipt of emails sent to the email endpoint defined in CloudFormation template. |

To collect Amazon CloudWatch Logs using a CloudFormation template, follow the below instructions.

## Step 1: Add a Hosted Collector and HTTP Source

1. Configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
1. Configure an [HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics).

:::important
When you configure the HTTP Source, make sure to save the HTTP Source Address URL. You will need this to configure the Lambda Function.  
:::

## Step 2: Download the CloudFormation template

Download the `DLQLambdaCloudFormation.json` CloudFormation template from https://s3.amazonaws.com/appdev-cloudformation-templates/DLQLambdaCloudFormation.json.

## Step 3: Tailor the CloudFormation template

Before you upload the CloudFormation template, there are some optional configuration steps.

If you want to use the CloudFormation Template as is, proceed to [Create a stack on the AWS CloudFormation console](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs). If you want to 

### Configure environment variables for Lambda functions (Optional)

To customize `_sourceCategory`, `_sourceHost`, `_sourceName` or add additional fields you need to configure environment variables for Lambda functions​.

The following AWS Lambda environment variables are supported in both the Lambda functions. Both the functions should have same environment variables values configured to avoid inconsistencies.

|  Environment Variable | Description |
|:--|:--|
| `SOURCE_CATEGORY_OVERRIDE` | (Optional) You can use this variable to override the `_sourceCategory` configured for the HTTP Source. |
| `SOURCE_FIELDS_OVERRIDE` | (Optional) You can use this variable to override the custom metadata fields configured for the HTTP Source. Example: `key1=value1,key2=value2` |
| `SOURCE_HOST_OVERRIDE` | (Optional) You can use this variable to override the `_sourceHost` configured for the HTTP Source. |
| `SOURCE_NAME_OVERRIDE` | (Optional) You can use this variable to override the `_sourceName` configured for the HTTP Source. |

If you are configuring log collection for VPC flow logs, see the Environment variables for VPC flow log collection section on Collect Amazon VPC Flow Logs from CloudWatch using CloudFormation.

Define variables in the `Environment` section of the CloudFormation template.

```
"Environment": {
    "Variables": {
        “SOURCE_CATEGORY_OVERRIDE”: "<insert-value-here>"
        “SOURCE_HOST_OVERRIDE”: "<insert-value-here>"
        “SOURCE_NAME_OVERRIDE”: "<insert-value-here>"
        “SOURCE_FIELDS_OVERRIDE”: "<insert-value-here>"
    }
}
```

### Configure threshold for DeadLetterQueue

:::note
If you don’t want to use the `SumoCWSpilloverAlarm`, as described below in [Remove alarm resources](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs), you can skip this step.
:::

In the CloudFormation template, define the number of messages in the Dead Letter Queue that will trigger the SumoCWSpilloverAlarm, using the `Threshold` attribute in the alarm definition.  

```
"SumoCWSpilloverAlarm":{
            "Type":"AWS::CloudWatch::Alarm",
            "Properties":{
                "AlarmActions":[
                    {
                        "Ref":"SumoCWEmailSNSTopic"
                    }
                ],
                "AlarmDescription":"Notify via email if number of messages in DeadLetterQueue exceeds threshold",
                "ComparisonOperator":"GreaterThanThreshold",
                "Dimensions":[
                  {
                    "Name": "QueueName",
                    "Value": "SumoCWDeadLetterQueue"
                  }
                ],
                "EvaluationPeriods":"1",
                "MetricName":"ApproximateNumberOfMessagesVisible",
                "Namespace":"AWS/SQS",
                "Period":"3600",
                "Statistic":"Sum",
                "Threshold":"100000"
            },
            "DependsOn": ["SumoCWEmailSNSTopic"]
        }
```

### Remove alarm resources (Optional)

If you do not want the `SumoCWSpilloverAlarm` alarm to be created, remove the definitions of the `SumoCWEmailSNSTopic` and `SumoCWSpilloverAlarm` resources from the CloudFormation template. Delete the sections shown below.

```
"SumoCWEmailSNSTopic": {
            "Type":"AWS::SNS::Topic",
            "Properties":{
                "Subscription":[ {
                    "Endpoint" : "xyz@sumologic.com",
                    "Protocol" : "email"
                }]
            }
        },
        "SumoCWSpilloverAlarm":{
            "Type":"AWS::CloudWatch::Alarm",
            "Properties":{
                "AlarmActions":[
                    {
                        "Ref":"SumoCWEmailSNSTopic"
                    }
                ],
                "AlarmDescription":"Notify via email if number of messages in DeadLetterQueue exceeds threshold",
                "ComparisonOperator":"GreaterThanThreshold",
                "Dimensions":[
                  {
                    "Name": "QueueName",
                    "Value": "SumoCWDeadLetterQueue"
                  }
                ],
                "EvaluationPeriods":"1",
                "MetricName":"ApproximateNumberOfMessagesVisible",
                "Namespace":"AWS/SQS",
                "Period":"3600",
                "Statistic":"Sum",
                "Threshold":"100000"
            },
            "DependsOn": ["SumoCWEmailSNSTopic"]
        }
```

## Step 4: Create a stack on the AWS CloudFormation console

1. Sign in to the [AWS Management Console](https://s3.console.aws.amazon.com).
1. Under **Management Tools**, select **CloudFormation**.
1. Create a new stack by clicking **Create Stack**, then select “**With new resources (standard)**.”    

![CF_animated.gif](/img/send-data/CF_animated.gif)  
 
1. On the **Specify Template** window, do one of the following:

   * If you have downloaded and optionally modified the CloudFormation template, choose to **Upload a template file**, upload the `DLQLambdaCloudFormation.json` file, and then click **Next**.

        ![Create_Stack_dialog.png](/img/send-data/Create_Stack_dialog.png)

   * Otherwise, if you did not modify the CloudFormation template, select **Specify an Amazon S3 template URL** and enter: `https://s3.amazonaws.com/appdev-cloudformation-templates/DLQLambdaCloudFormation.json`

        ![Create_Stack_dialog_2.png](/img/send-data/Create_Stack_dialog_2.png)

1. Select **Next** and the **Specify Stack Details** window appears. Enter the following:

   * **Stack Name**.
   * **EmailID** (Optional) Used for alerts.
   * **IncludeLogGroupInfo.**  Set to true to include loggroup/logstream values in logs. The default value is     False. For AWS Lambda Logs **IncludeLogGroupInfo** must be set to **True**; for VPC Flow Logs it's optional. 
   * **LogFormat.** For VPC logs, choose either VPC-JSON (JSON format) or VPC-RAW (raw messages). The default value is Others. 
   * **LogStreamPrefix** (Optional) Enter comma separated list of logStream name prefixes to filter by logStream. Please note this is separate from a logGroup. This is used to only send certain logStreams within a CloudWatch logGroup(s).  LogGroup(s) still need to be subscribed to the created Lambda function     (`SumoCWLogsLambda-<Auto-Genereted-Suffix>`), regardless of what is input for this value.

    :::note
    LogStreamPrefix field does not accept special characters (`[|\\{}()[\]^$+*?.-]`). For example, you can use the comma-separated list like test-name, test-logs as the LogStream name prefixes.
    :::

    * **NumOfWorkers.** (Optional) Increase this value to speed up dead letter queue (DLQ) processing.
    * **SumoEndPointURL** (Required). Enter the HTTP Source Address URL from [Add a Hosted Collector and HTTP Source](#add-a-hosted-collector-and-http-source).

    ![Specify_Stack_Details.png](/img/send-data/Specify_Stack_Details.png)

1. Click **Next**. The **Configure Stack Options** screen will appear. You can optionally add AWS tags to tag the resources created by this Cloudformation stack. Click **Next** to get to the final **Review** window.
1. In the **Review** window, click the checkbox acknowledging that you understand the the template creates IAM resources, and click **Create**.

After few minutes you will see CREATE_COMPLETE in the Status column.

:::important
If you're using an existing log group or if you don’t want to send logs to the default group **SumoCWLogGroup** then you must do one of the following:  [Manually subscribe the **SumoCWLogsLambda** to an existing CloudWatch Log Group](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs), create a [subscription filter](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html) manually, or [Auto-Subscribe AWS Log Groups to a Lambda Function](../autosubscribe-arn-destination.md).
:::

## Step 5: Validate email address for alarms

:::note
If alarm resources in [Step 3](#remove-alarm-resources-optional) is not removed then you need to verify the email provided in [Step 4](#step-4-create-a-stack-on-the-aws-cloudformation-console).
:::

Sign in to the email account whose address you provided when performing the configuration described in [Create a stack on the AWS CloudFormation console](#create-a-stack-on-the-aws-cloudformation-console) above. Look for an email with subject "AWS Notification - Subscription Confirmation", like the example shown below.

![aws-notification.png](/img/send-data/aws-notification.png)  

To validate the email address, click **Confirm subscription** in the email.

## Step 6: Subscribe SumoCWLogsLambda to CloudWatch Log Groups

The procedure described above subscribes a single Log Group, `SumoCWLogGroup,` to the `SumoCWLogsLambda `function. If you would like to subscribe additional CloudWatch Log Groups to the `SumoCWLogsLambda` function, follow the instructions in the sections below.

### Manually subscribe SumoCWLogsLambda to an existing CloudWatch Log Group

If you only need to collect logs from a few additional CloudWatch Log groups, you can manually subscribe the `SumoCWLogsLambda` function to an existing CloudWatch Log Group using the instructions below.

1. Log in to the [AWS Management Console](https://s3.console.aws.amazon.com/).
1. Under **Management Tools**, select CloudWatch, then click **Logs** in the left- hand navigation menu.
1. Select the CloudWatch Log Group that you want to stream to Sumo Logic, click **Actions** > **Subscription Filters** > **Create Lambda subscription Filte**.
1. In the Create Lambda subscription filter page, go to **Choose Destination** section and select the Lambda function that begins with `SumoCWLogsLambda`.
1. In the **Configure log format and filters** section, select a Log format and enter a Subscription filter pattern (Optional) and Subscription filter name.
    :::info
    - If no subscription filter pattern is provided it will stream all the logs present in the log group.
    - Sometimes log format will be specified in the Sumo Logic app specific collection page, so use that specific format otherwise dashboards may not light up.
    :::
1. (Optional) In the **Test Pattern** page, select the log data to test, then click Test pattern. If test results look fine, then click **Start Streaming**.<br/> ![test-pattern.png](/img/send-data/test-pattern.png)

![stream-to-aws-lambda.png](/img/send-data/stream-to-aws-lambda.png)

### Auto-subscribe other log groups to SumoCWLogsLambda function

If you want to collect logs from multiple Log Groups, you can use Sumo’s LogGroup Lambda Connector to subscribe additional Log Groups to the Lambda function. To do so, follow the instructions in [Auto-Subscribe AWS Log Groups to a Lambda Function](../autosubscribe-arn-destination.md). When you edit the connector parameters, set the `DestinationArnValue` parameter to the `SumoCWLogsLambda` function ARN.

## Dealing with alarms​

If you receive an alarm email like the one shown in the previous section, the number of messages in the dead letter queue exceeds the threshold defined in the CloudFormation template, which by default is 100,000. This could be because:

- `SumoCWProcessDLQLambda` may not be able to process messages as quickly as the messages are received. In this case, you may want to use the Lambda console to increase the number of workers specified by the NUM_OF_WORKERS environment variable.

- `SumoCWProcessDLQLambda` may be unable process incoming messages because of an error in the message format or a configuration problem, for example, an error in the HTTP endpoint configuration. Test the function with the message in the Lambda console to see whether it is able to process the message and send it to Sumo.
