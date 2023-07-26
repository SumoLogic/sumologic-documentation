---
id: aws-lambda
title: Webhook Connection for AWS Lambda
sidebar_label: AWS Lambda
description: You can trigger an AWS Lambda function directly from a Sumo Logic alert by configuring a webhook connection.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/connection-and-integration/aws-lambda.svg')} alt="Thumbnail icon" width="50"/>

You can trigger an AWS Lambda function directly from a Monitor or Scheduled Search by configuring a webhook connection. You can use the Webhook Connection as the Connection Type in a [Monitor](/docs/alerts/monitors) or the Alert Type in a [Scheduled Search](schedule-searches-webhook-connections.md).

For example, you can create a Monitor that triggers a Lambda function when too many requests are received from a suspicious IP address. The Lambda function can shut down additional requests from that IP address, while simultaneously sending a notification to the security team for review.

## How to expose a Lambda function

To expose a Lambda function, you can use the **Enable function URL** option or build an API in the API Gateway.

Lambda can be called directly using **Function URL**. See [Creating and managing Lambda function URLs](https://docs.aws.amazon.com/lambda/latest/dg/urls-configuration.html) for details.

In more demanding use cases, lambda can be accessed via **API Gateway**. To use this approach, generate an Invoke URL with a POST method for your Lambda function by creating an API in Amazon API Gateway. For information about exposing an HTTP endpoint in API Gateway, see the [Amazon API Gateway documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html).

Secure your Lambda Function URL or API Gateway method by selecting **AWS_IAM** for the authorization type in configuration on AWS side.

:::tip
Have your webhook URL handy by copying and pasting it to a notepad. You'll need it to configure your webhook connection in the next section.
:::

To authenticate the Sumo Logic backend and allow webhook calls, you'll need to create in your AWS Account an IAM User account with very restricted privileges. Creating Lambda Function URL you need to create your own policy while building an API Gateway you can use AWS managed policy. In the following sections, you'll find detailed steps for both cases. 

### Lambda Function URL

If you use the Lambda Function URL to expose a Lambda function, you'll need to:

1. Create **Customer managed** policy with the **lambda:InvokeFunctionUrl** action allowed.
  :::note
  This is different from the **lambda:InvokeFunction** action, which is used in the AWS-managed IAM Policy **AWSLambdaRole**.
  :::
   ```json title="IAM Customer Managed Policy template"
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Effect": "Allow",
               "Action": [
                   "lambda:InvokeFunctionUrl"
               ],
               "Resource": "arn:aws:lambda:*:*:function:*"
           }
       ]
   }
   ```
2. Create an IAM user account and assign **Customer managed** policy created in step 1.
3. Create an AWS Access Key for this account. Take note of your **Access key** and **Secret access key**, which you'll need in the next section to authenticate your Webhook connection.

### Build an API Gateway

If you're building an API Gateway to expose a Lambda function, you'll need to:

1. Create an IAM user account with basic API gateway invoke access using the AWS managed policy **AmazonAPIGatewayInvokeFullAccess**.
2. Create an AWS Access Key for this account. Take note of your **Access key** and **Secret access key**, which you'll need in the next section to authenticate your Webhook connection.

## Create a Webhook connection

:::note
You need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities.md) to create webhook connections.
:::

Configure the webhook connection to trigger the AWS Lambda function.

1. Go to **Manage Data** > **Monitoring** > **Connections**.
1. On the **Connections** page, click **Add**.
1. Click **AWS Lambda**.
1. In the **Create Connection** dialog, enter:
    * **Name.** Enter a name for the Connection.
    * **Description.** Optional: Enter a Description for the Connection.
    * **URL.** Enter the Invoke URL from the previous section.
    * **Access Key ID** and **Secret Access Key.** Enter AWS Access key and Secret access key for the account with required IAM policy assigned created in previous section.
    * **Region.** Select your region.
    * **Service Name.**
      * For Lambda Function URL, enter **lambda** as the service name.
      * For API Gateway, enter **execute-api** as the service name.
    * (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
    * **Alert Payload.** Under Alert Payload, which allows you to customize the alert notification, enter a JSON object accepted by your Lambda function. For details on variables that can be used as parameters within your JSON object, see [Webhook Payload Variables](set-up-webhook-connections.md). 
    * **Recovery Payload.** Under Recovery Payload, which allows you to customize the recovery notification, enter a JSON object accepted by your Lambda function. 
1. Click **Test Alert or Test Recovery**. If the connection is made to your Lambda function successfully, you will see a 200 OK response message.
1. Click **Save**.
