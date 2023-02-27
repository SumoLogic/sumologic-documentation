---
id: create-amazon-lambda-function
title: Create a Sumo Lambda Function
sidebar_label: AWS Lambda - Create Function
description: Sumo Logic has created an Amazon Lambda function that you can use with AWS.
---

Sumo provides a Lambda function for use with Amazon Web Services (AWS). It collects AWS Lambda logs using CloudWatch Logs and it extracts and adds a `RequestId` field to each log line to make correlation easier. 

**To add an Amazon Lambda function:**

1. Sign into the AWS Management Console.
1. Click **Lambda** in the **Compute** section.
1. On the AWS Lambda page, click **Create a Function**. 
1. On the **Blueprints** page, enter sumologic in the search field, and click the search icon.
1. Select sumologic-process-logs.   The **Create Function** page appears.
1. In the **Basic information** section:

    ![lambda4.png](/img/send-data/lambda4.png)

    1. **Name.** Enter a name for the function.
    1. **Role.** Choose one of the following options:

       * **lambda_basic_execution** role is the standard choice.
       * **Choose an existing role.** If you have any appropriate roles, you can select one.
       * **Create new role from template(s)**. If you select this option, you can continue without choosing any policy templates—it will create a role with basic Lambda execution privileges by default.

    1. **Role Name.** Enter a name for the role.
    1. **Policy templates.** If you selected **Create new role from template(s) **above, you can leave this blank. 

1. In the **cloudwatch-logs** section, you can create a trigger now, or click **Remove** if you prefer to create it later. To create the trigger:

    ![trigger.png](/img/send-data/trigger.png)

    1. **Log Group.** Select the log group that serves as the event source. Events sent to the log source will trigger your Lambda function. 
    1. **Filter Name.** Enter a filter name, even if you do not use a Filter Pattern. You can enter any placeholder. 1. **Filter Pattern.** (Optional) For information about AWS filter patterns, see [Filter and Pattern Syntax](http://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html) in AWS help.
    1. **Enable trigger.** Check the box to enable the trigger immediately. If you do not enable the trigger it will be created in a disabled state and you can test it with sample events (recommended).

    :::important
    When testing your trigger it is important to select the **CloudWatch Logs** test option under the 'Configure test event' screen because it is base 64 encoded.
    :::

    1. Click **Create Function.**

1. On the **Environment Variables** page, create an environment variable named SUMO_ENDPOINT. Set the value of the variable to the URL of the HTTP source to which your logs will be sent. In addition, you can set any of the following optional variables:

    ![lambda6.png](/img/send-data/lambda6.png)

    * `ENCODING` (Optional)—Encoding to use when decoding CloudWatch log events. Default is utf-1.
    * `SOURCE_CATEGORY_OVERRIDE` (Optional)—Override _sourceCategory value configured for the HTTP source.
    * `SOURCE_HOST_OVERRIDE` (Optional)—Override _sourceHost value configured for the HTTP source.
    * `SOURCE_NAME_OVERRIDE` (Optional)—Override _sourceName value configured for the HTTP source.
