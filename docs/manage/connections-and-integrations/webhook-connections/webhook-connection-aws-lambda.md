---
id: webhook-connection-for-aws-lambda
---

# Webhook Connection for AWS Lambda

You can trigger an AWS Lambda function directly from a Scheduled
Search or Monitor by configuring a webhook connection. You can use the
Webhook Connection as the Alert Type in a [Scheduled
Search](Schedule-Searches-for-Webhook-Connections.md "Schedule Searches for Webhook Connections") or
the Connection Type in
a [Monitor](../../../Visualizations-and-Alerts/Alerts/Monitors.md "Monitors").

For example, you can create a Scheduled Search that triggers a Lambda
function when too many requests are received from a suspicious IP
address. The Lambda function can shut down additional requests from that
IP address, while simultaneously sending a notification to the security
team for review.

### Build an API in the API Gateway to expose a Lambda function

First, generate an Invoke URL, with a POST method for your Lambda
function by creating an API in Amazon API Gateway. For information about
exposing an HTTP endpoint, see Amazon's API Gateway documentation:
\<http://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.htm\>

When you have created the Invoke URL, copy and paste it into a notepad.
You will need it to configure the webhook connection in the next
section.

### Create a Webhook connection

You need the ********Manage connections******** [role
capability](../../Users-and-Roles/Manage-Roles/05-Role-Capabilities.md "Role Capabilities") to
create webhook connections.

Configure the webhook connection to trigger the AWS Lambda function.

1.  Go to **Manage Data \> Monitoring \> Connections**.
2.  On the **Connections** page click **Add**.
3.  Click **AWS Lambda**.
4.  In the **Create Connection** dialog, enter: 1.  **Name.** Enter a name for the Connection. 2.  **Description.** Optional: Enter a Description for the     Connection. 3.  **URL.** Enter the Invoke URL from the previous section. 4.  **Access Key and Secret Key.** Enter your AWS Access Key and     Secret Key.     1.  Secure your API gateway method by selecting **AWS_IAM** for         the authorization type.     2.  Create an IAM user who has basic API gateway invoke         access. You can use the AWS managed         policy **AmazonAPIGatewayInvokeFullAccess**. 5.  **Region.** Select your region. 6.  **Service Name.** Enter **execute-api** as the service name. 7.  (Optional) ********Custom Headers********, enter up to five     comma separated key-value pairs. 8.  **Payload.** Enter a JSON object in the format required. For     details on variables that can be used as parameters within your     JSON object, see [Webhook Payload     Variables](Set_Up_Webhook_Connections.md "Set Up Webhook Connections"). 
5.  Click **Test Connection**. If the connection is made, you will see a 200 OK response message.
6.  Click **Save**.
