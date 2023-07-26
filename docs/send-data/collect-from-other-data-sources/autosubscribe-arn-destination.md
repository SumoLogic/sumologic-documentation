---
id: autosubscribe-arn-destination
title: Auto-Subscribe ARN (Amazon Resource Name) Destination
sidebar_label: Amazon Resource Names (ARNs)
description: You can use an Amazon CloudWatch Log Group subscription to access log events from CloudWatch Logs in real time, and send them to Sumo Logic.
---


You can use an [Amazon CloudWatch Log Group subscription](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html) to collect log events from CloudWatch Logs in real-time, and send them to Sumo Logic. 

Sumo Logic’s LogGroup Lambda Connector is a Lambda function that automates the process of subscribing to Amazon CloudWatch Log Group subscriptions. You can use the connector in conjunction with an Amazon Kinesis Firehose data delivery stream, Sumo Logic [Lambda function](https://github.com/SumoLogic/sumologic-aws-lambda) that sends Amazon CloudWatch logs to Sumo Logic, or with another Lambda functions of your choice.

This section provides instructions for both deployment methods, and covers how to [troubleshoot the connector](#troubleshooting-the-connector).

:::important
These instructions assume that your Amazon CloudWatch log groups and this Lambda function are in the same AWS region. 

The connector can be used with existing or new log groups.
:::

## Deploying the LogGroup Lambda Connector function from a serverless repo

This section explains how to deploy the SAM application from a serverless repo. Click links for the related tasks.

To deploy LogGroup Lambda Connector, do the following:

1. Open a browser window and enter the following URL: https://serverlessrepo.aws.amazon.com/application
1. In the Serverless Application Repository, search for **sumologic**.
1. Select **Show apps that create custom IAM roles or resource policies** check box.
1. Click the **sumologic-loggroup-connector**,link, and then click **Deploy**.
1. In the **AWS Lambda > Functions > Application Settings** panel, configure the parameters as described in [configuring parameters](#configuringparameters) section below.

  ![Deploy_LogGroup_Connector.png](/img/send-data/Auto-Subscribe_AWS_ARN_Destination-ApplicationSettings.png)

1. Click the checkbox to acknowledge that the template creates IAM resources.
1. Scroll to the bottom of the window and click **Deploy**. After a few minutes, **CREATE_COMPLETE** should appear in the status column corresponding to all resources in the Resources section.
1. [Test the Lambda function](#testing-the-lambda-function).

## Configuring parameters

This section describes the parameters you can configure for the Lambda function. 

* **DestinationArnType:** The destination ARN can include Lambda ARN or a Kinesis Firehose data delivery stream ARN. Select from **Lambda** or **Kinesis** options based on how you want to send CloudWatch logs to Sumo Logic. For more details, visit [AWS log group subscription filters](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html). 

* **DestinationArnValue**: Enter the Destination ARN based on the destination ARN type.

  * **Lambda**: Enter the Amazon Resource Name (ARN) of the target Lambda function, that will receive CloudWatch logs via the Log Group subscription. To find a function's ARN, open the AWS Lambda console, and select the function from the list. A function's ARN is shown in the upper right corner of the page. 

    ![AWS_Lambda-function-parameters.png](/img/send-data/AWS_Lambda-function-parameters.png)

  * **Kinesis**: Enter the Amazon Resource Name (ARN) of the target Amazon Kinesis firehose data Delivery Stream (the stream that will receive the CloudWatch Logs via the log group subscription). To find the ARN, open the Kinesis console, and select the delivery stream from the data firehose section. A delivery stream ARN is shown in the **Delivery Stream ARN** parameter. 

    ![delivery-arn-parameter](/img/send-data/delivery-arn-parameter.png)

* **LogGroupPattern**—A Javascript regex to filter Log Groups. Log Groups that match the regular expression will be subscribed to the connector. Matching is case-insensitive. The placeholder regex Test matches testlogroup, logtestgroup, and LogGroupTest. Replace Test with a  Javascript regular expression that filters your Log Groups as desired.

  :::note
  * Don't use forward slashes (`/`) to encapsulate the regex. While normally they are needed for raw code, it's not necessary here.
  * For auto-subscribing all log groups, please use regex `.*`.
  :::

* **UseExistingLogs**—Controls whether this function will be used to create subscription filters for existing log groups. Select "True" if you want to use the function for subscribing to existing log groups.

* **LogGroupTags**: Enter comma-separated key-value pairs for filtering logGroups using tags. For Example, KeyName1=string,KeyName2=string. Only log groups that match any one of the key-value pairs will be subscribed by this Lambda function. Supported only when UseExistingLogs is set to false which means it works only for new log groups, not existing log groups.

* **RoleArn:** Provide the AWS Role ARN which has permission to put data into the provided Kinesis Firehose data delivery stream. Keep the value empty, when the destination type is Lambda.

## Using the function to auto-subscribe existing log groups

Existing log groups are automatically subscribed when the parameter **UseExistingLogs** is selected as **‘true’**. In case, you would like to run the lambda function to subscribe to existing log groups manually, follow the below instructions:

Invoke the function manually. You can invoke the function using the AWS Management Console or the AWS CLI.

* To use the console, see [Invoke the Lambda Function Manually and Verify Results, Logs, and Metrics](https://docs.aws.amazon.com/lambda/latest/dg/get-started-create-function.html#get-started-invoke-manually) in AWS Lambda help. Use the below JSON when creating the test event.

  ```json
  {
    "existingLogs": "true",
    "token": ""
  }
  ```

* To use the AWS CLI, run the following Lambda CLI invoke command to invoke the function. Note that the command requests asynchronous execution. You can optionally invoke it synchronously by specifying RequestResponse as the invocation-type parameter value.

  ```bash
  aws lambda invoke
  --invocation-type Event  
  --function-name SumoLogGroupLambdaConnector-<unique_string>
  --region us-east-2
  --payload '{"existingLogs":"true","token":""}'
  --log-type Tail outputfile.txt
  ``` 

For information about installing the CLI, see [Installing the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/installing.html).

## Testing the Lambda function

This section demonstrates how to test the Lambda function to ensure that the Connector is functioning properly.

To test the Lambda function, do the following:

1. Create a Log Group with a name that matches the regex you specified for **LogGroupPattern**. 

  ![AWS_LambdaFunction_LoggroupPattern.png](/img/send-data/AWS_LambdaFunction_LoggroupPattern.png)

  After a few seconds, the Log Group should be subscribed to the Destination AWS Resource whose ARN you specified in the `DESTINATION_ARN` environment variable.

  ![AWS_LambdaFunction_Loggroup-specified.png](/img/send-data/AWS_LambdaFunction_Loggroup-specified.png)

1. View the logs of Lambda function. You can view the logs generated by `SumoLogGroupLambdaConnector-<unique_string>` in CloudWatch in the `/aws/lambda/SumoLogGroupLambdaConnector-<unique_string>` log group.
1. (Optional) Continue with [troubleshooting the connector.](#troubleshooting-the-connector)

## Troubleshooting the connector

This section covers the most common errors you may encounter with a
connector and what you can do to resolve the issues.

 * Permission errors
 * Log Group belongs to the Lambda function that generated it

### Permission errors 

If you are getting the permission errors with your Lambda function, you may need to grant CloudWatchLogs permission to invoke your Lambda function.

The following error message indicates that CloudWatch Logs does not have
permission to invoke the Lambda function.

```
{
    "errorMessage": "Could not execute the lambda function. Make sure you have given CloudWatch Logs permission to execute your function.",
    "errorType": "InvalidParameterException",
    "stackTrace": [
        "Request.extractError (/var/runtime/node_modules/aws-sdk/lib/protocol/json.js:48:27)",
        "Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:105:20)",
        "Request.emit (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:77:10)",
        "Request.emit (/var/runtime/node_modules/aws-sdk/lib/request.js:683:14)",
        "Request.transition (/var/runtime/node_modules/aws-sdk/lib/request.js:22:10)",
        "AcceptorStateMachine.runTo (/var/runtime/node_modules/aws-sdk/lib/state_machine.js:14:12)",
        "/var/runtime/node_modules/aws-sdk/lib/state_machine.js:26:10",
        "Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:38:9)",
        "Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:685:12)",
        "Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:115:18)"
    ]
}
```

To grant CloudWatch Logs permission to invoke the Lambda function, run the following AWS CLI command:

```bash
aws lambda add-permission --function-name "<function_name>" --statement-id "lambdapermission" --principal "logs.<region>.amazonaws.com" --action "lambda:InvokeFunction" --source-arn "arn:aws:logs:<region>:<account_id>:log-group:*:*" --source-account "<account_id>" --region=<region>
```

Where:

 * `<function_name>` is the FunctionName attribute of your target lambda function
 * `<region>` is the AWS Region where your function is deployed
 * `<account>` is the AWS Account ID of your aws account

For information about Installing and configuring the AWS CLI, see [Installing the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)

### Log Group belongs to the Lambda function that generated it

The function throws the following exception if the Log Group belongs to the Lambda function that generated it. 

```
{ "errorMessage": "The log group provided is reserved for the function logs of the
destination function.", "errorType": "InvalidParameterException", "stackTrace":
[
"Request.extractError (/var/runtime/node_modules/aws-sdk/lib/protocol/json.js:48:27)",
"Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:105:20)",
"Request.emit (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:77:10)",
"Request.emit (/var/runtime/node_modules/aws-sdk/lib/request.js:683:14)",
"Request.transition (/var/runtime/node_modules/aws-sdk/lib/request.js:22:10)",
"AcceptorStateMachine.runTo (/var/runtime/node_modules/aws-sdk/lib/state_machine.js:14:12)",
"/var/runtime/node_modules/aws-sdk/lib/state_machine.js:26:10",
"Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:38:9)",
"Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:685:12)",
"Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:115:18)"
] }
```
