---
id: amazon-security-lake-source
title: Amazon Security Lake Source
description: Learn how to configure the Amazon Security Lake source setup using the Sumo logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Amazon Security Lake source provides a web services interface that can be used to manage data from multiple AWS sources through a single interface for multiple AWS organizations.

This makes AWS log setup relatively easy. In addition, the data available from various AWS services is in the OCSF format, making it simple to parse and correlate across different sources.

## Configure Amazon Security Lake Setup

### Step 1. Grant Sumo logic access to Amazon Security Lake console

To grant Sumo Logic access to the Amazon Security Lake source, you need to provide the Sumo Account ID and External ID.
1. **Account ID**. Remember to copy and secure your `Sumo Logic ID`: `************`. You will require this ID in further steps.
2. **External ID**. The External ID is formed from your Sumo Logic region identifier. It is a unique identifier that is used to authenticate the connection between your Sumo Logic account and your Amazon Security Lake source. The format of your Sumo Logic account identifier is: `SumoDeployment`: `SumoAccountId` where:
   * `SumoDeployment` is your Sumo Logic deployment that has to be entered in lowercase such as `au`, `ca`, `de`, `eu`, `fed`, `in`, `jp`, `us1`, or `us2`. To find your deployment, see [Sumo Logic API Authentication, Endpoints, and Security](/docs/api/getting-started).
   * `SumoAccountId` is the Organization ID shown on your Account Overview page in the Sumo Logic UI. You can access it by navigating to **Administration** > **Account**  > **Account Overview**.

After the authentication is successful, you can create the subscriber.

### Step 2. Set up subscriber in Amazon Security Lake console

To create a subscriber in Amazon Security Lake Console, follow the steps below:
1. Navigate to the Amazon Security Lake console.
1. From the left navigation, click **Subscriber**.
1. On the Subscribers page, under the **Add subscribers** tab, click **Create custom subscriber**. <br/><img src={useBaseUrl('img/send-data/setup-subscriber.png')} alt="setup-subscriber.png" width="700"/>
1. **Subscription Name**. Provide the **Subscriber name**. You may skip the **Description**, it's optional.
1. In the **Logs and events sources**, you can select which data sources you want to enable for the subscriber. Below are the two options:
   * **All Logs and event sources**. It gives you access to all of the event and log sources you choose.
   * **Specific log and event sources**. It gives you access to only the specific sources you select from the available sources. Below are the sources you may choose:
      * **CloudTrail**. View user activity and API usage in AWS services.
      * **VPC flow logs**. View details about IP traffic to and from network interfaces in your VPC.
      * **Route 53**. View DNS queries made by resources within your Amazon Virtual Private Cloud (Amazon VPC).
      * **Security Hub findings**. View Amazon Security findings from the Security Hub.

  <br/><img src={useBaseUrl('img/send-data/log-event-sources.png')} alt="log-event-sources.png" width="900px" height="1000px" />
1. **Data Access method**. For your subscriber to access the data, choose **S3** as the data access mode.<br/><img src={useBaseUrl('img/send-data/data-access-method.png')} alt="data-access-method.png" width="400"/>
1. **Subscriber Credentials**. Enter the **Account ID** and **External ID** from the [Step 1](#step-1-grant-sumo-logic-access-to-amazon-security-lake-console). <br/><img src={useBaseUrl('img/send-data/subscriber-credentials.png')} alt="subscriber-credentials.png" width="750"/>
1. **Notifications (S3 only)**. You can specify how your subscribers should be notified. For the time being, let's use the **Subscription endpoint** as the notification mode. Enter the following fields as required:
   * **Subscription endpoint**. Add the sample endpoint value for now as follows: https://collectors.sumologic.com. Note that this value will be edited in later steps.
   * **HTTPS key name** (Optional). Name of the server certificate that is used to authenticate the subscriber's connection to the AWS Security Lake.
   * **HTTPS key value**(Optional). Actual value or password associated with the key.
  <img src={useBaseUrl('img/send-data/notifications.png')} alt="notifications.png" width="800"/>
1. You can either choose to create a new service role and use it, if you haven't created one before, or you can opt to use an existing service role and select the appropriate role name. <br/> <img src={useBaseUrl('img/send-data/servicerole.png')} alt="servicerole.png" width="800"/>
1. Click **Create**. A new subscriber will be created.
1. Navigate to the Subscribers tab on the left and select the recently created Subscriber.
1. Copy and secure the AWS Role ID of the subscriber, you'll need it in later steps. <br/> <img src={useBaseUrl('img/send-data/aws-role-id.png')} alt="aws-role-id.png" width="600"/>

You're all set to add a new Amazon Security Lake Source to your Sumo Logic account.

### Step 3. Create Amazon Security Lake Source in Sumo Logic

When you create an Amazon Security Lake source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use from the existing ones or create a new Hosted Collector, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To create an Amazon Security Lake Source, follow the steps below:
1. In the Sumo Logic environment, go to **Manage Data** > **Collection** > **Collection**.
1. On the **Collectors page** click **Add Source** next to a Hosted Collector.
1. Select an existing Hosted Collector or the one you have just created.
1. Select **Amazon Security Lake**. <br/><img src={useBaseUrl('img/send-data/aws-security-lake.png')} alt="aws-security-lake.png" width="900"/>
1. Enter a name for the new **Source**. The **Description** is optional.
1. In the **Source Category**, enter any string to tag the output collected from this distinct source. (Category metadata is stored in a searchable field called **_sourceCategory**).
7. In **Fields**. Click the **+Add Field** link to add custom log metadata fields.
8. Enter the required fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a checkmark shows up when a field exists and is enabled in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point shows up when the field doesn't exist or is disabled in the **Fields table schema**.

 :::important
 In this case, an option to automatically add or enable the nonexistent fields to the **Fields table schema** is provided. If a field is sent to Sumo logic that does not exist in the **Fields table schema** or is disabled, it will be ignored and known as dropped field.
 :::

1. In **Role ARN**: Paste the AWS Role ID from your Amazon Security Lake console, see above [Step 2.11](#step-2-set-up-subscriber-in-amazon-security-lake-console).<br/><img src={useBaseUrl('img/send-data/role-arn-id.png')} alt="role-arn-id.png" width="400"/>
1. Click **Save**. A pop-up will appear with the subscription endpoint. <br/> <img src={useBaseUrl('img/send-data/subscription-endpoint.png')} alt="subscription-endpoint.png" width="400"/>

  :::note
  Remember to copy and secure the subscription endpoint. If you closed the window and could not copy the URL, don't worry. Click on the **Edit** button under the list of sources and copy the URL.
  :::

1. Optional: You can create any **Processing Rules** that you want for the Source. For more information, see [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).

The next step is to update your Amazon Security Lake subscriber to fill in the subscriber endpoint on the Subscribers page.

### Step 4: Update Amazon Security Lake subscriber

To update the Amazon Security Lake subscriber, follow the steps below:
1. Navigate to the Subscribers page and click **My Subscribers**.
2. Edit the subscriber created in the [Setup Subscriber](#step-2-set-up-subscriber-in-amazon-security-lake-console) section in step 2.
3. Navigate to the **Subscription endpoint** field at the bottom with the sample URL. Then, edit the subscription URL with the value from the Amazon Security Lake source setup. See [Step 3.10](#step-3-create-amazon-security-lake-source-in-sumo-logic) section.
4. Click **Save**.
