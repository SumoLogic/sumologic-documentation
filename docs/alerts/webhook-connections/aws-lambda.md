---
id: aws-lambda
title: Webhook Connection for AWS Lambda
sidebar_label: AWS Lambda
description: You can trigger an AWS Lambda function directly from a Sumo Logic alert by configuring a webhook connection.
---

You can trigger an AWS Lambda function directly from a Scheduled Search or Monitor by configuring a webhook connection. You can use the Webhook Connection as the Alert Type in a [Scheduled Search](schedule-searches-webhook-connections.md) or the Connection Type in a [Monitor](/docs/alerts/monitors).

For example, you can create a Scheduled Search that triggers a Lambda function when too many requests are received from a suspicious IP address. The Lambda function can shut down additional requests from that IP address, while simultaneously sending a notification to the security team for review.

## Build an API in the API Gateway to expose a Lambda function

First, generate an Invoke URL, with a POST method for your Lambda function by creating an API in Amazon API Gateway. For information about exposing an HTTP endpoint, see Amazon's [API Gateway documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html).

When you have created the Invoke URL, copy and paste it into a notepad. You will need it to configure the webhook connection in the next section.

## Create a Webhook connection

:::note
You need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities.md) to create webhook connections.
:::

Configure the webhook connection to trigger the AWS Lambda function.

1. Go to **Manage Data \> Monitoring \> Connections**.
1. On the **Connections** page click **Add**.
1. Click **AWS Lambda**.
1. In the **Create Connection** dialog, enter:

    * **Name.** Enter a name for the Connection.
    * **Description.** Optional: Enter a Description for the Connection.
    * **URL.** Enter the Invoke URL from the previous section.
    * **Access Key and Secret Key.** Enter your AWS Access Key and Secret Key.
    * Secure your API gateway method by selecting **AWS_IAM** for the authorization type.
    * Create an IAM user who has basic API gateway invoke access. You can use the AWS managed policy **AmazonAPIGatewayInvokeFullAccess**.
    * **Region.** Select your region.
    * **Service Name.** Enter **execute-api** as the service name.
    * (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
    * **Payload.** Enter a JSON object in the format required. For details on variables that can be used as parameters within your JSON object, see [Webhook Payload Variables](set-up-webhook-connections.md) . 

1. Click **Test Connection**. If the connection is made, you will see a 200 OK response message.
1. Click **Save**.
