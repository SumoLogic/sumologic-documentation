---
id: aws-security-data-lake-source
title: AWS Security Data Lake Source (Beta)
description: This document explains how to configure the AWS Security Data Lake source setup using the Sumo logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

AWS Security Data Lake source provides a web services interface that can be used to manage data from multiple AWS sources through a single interface for multiple AWS organizations.

This makes AWS log setup relatively easy. Furthermore, the data available from various AWS services is in the OCSF format, making it simple to parse and correlate across different sources.


## Configure AWS Security Data Lake Setup


### Step 1. Grant Sumo logic access to AWS Security Data Lake Console

Granting Sumo logic access to the AWS AWS Security Data Lake source console would require access to **Sumo Account ID** and **External ID**. Find the details below:

1. **Account ID**. Remember to copy and secure your Sumo Logic ID: ************, it will be needed in the further steps.

2. **External ID**. The External ID is formed from your Sumo Logic region identifier. The format of your Sumo Logic account identifier is:
   `<SumoDeployment>: <SumoAccountId>`
   where:

   * **SumoDeployment** is your Sumo Logic deployment that has to be entered in lowercase such as au, ca, de, eu, fed, in, jp, us1, or us2. To find your deployment, see Sumo Logic Endpoints by Deployment and Firewall Security.
   * **SumoAccountId** is the Organization ID shown on your Account Overview in the Sumo Logic UI. You can access it by going to **Administration** > **Account**   >  **Account Overview**.


### Step 2. Setup Subscriber in AWS Security Data Lake Console

1. Create a subscriber on Security Data Lake Console. To create a subscriber, follow the instructions below:
  1. Navigate to the Security Data Lake console.
  2. From the left navigation, click **Subscriber**.
  3. On the Subscribers page, under the **Add subscribers** tab click **Create custom subscriber**. <br/><img src={useBaseUrl('img/send-data/setup-subscriber.png')} alt="setup-subscriber" />
  4. Optional: Provide the **Subscriber name** and **Description**.
  5. In the **Select Logs and events sources** section, you can select which resources you want to enable. There are two options given to you:
     * **All Logs and event sources**. All the logs and event sources will be selected if you select this option.
     * **Specify log and event sources**. Only specific sources will be selected if you go with this option.

     For example, you select **Specific log and event sources**. In the next step, you will be able to view user activity, API usage in AWS services, IP traffic details, and route S3.

  6. In **Log and event sources**, you see three options again:
     * **CloudTrail**: View user activity and API usage in AWS services.
     * **VPC flow logs**: View details about IP traffic to and from network interfaces in your VPC.
     * **Route S3**

     For example, you select Cloudtrail to get all the user activity and API usage in AWS services.

     ![cloudtrail.png](/img/send-data/cloudtrail.png)

  7. Access data.
     * **S3** or **Lakeformation** is the storage option you can choose for how your subscribers will access the data.

:::note
Subscription URL will be added to the subscriber in the later step and is kept blank deliberately.
:::


## Step 3. Create AWS Security Data Lake Source using Sumo Logic Environment

When you create an AWS Security Data Lake source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use from the existing ones or create a new Hosted Collector, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To create an AWS Security Data Lake source, follow the instructions below:
1. In the Sumo Logic environment, go to **Manage Data** > **Collection** > **Collection**.
2. On the **Collectors page, click **Add Source** next to a Hosted Collector.
3. Select an existing Hosted Collector or the one you have just created. <br/><img src={useBaseUrl('img/send-data/aws-security-lake.png')} alt="aws moose" />
4. Select **AWS Security Lake**.
5. Enter a name for the new **Source**. A **Description** is optional.
6. In the **Source Category**, enter any string to tag the output collected from this distinct source. (Category metadata is stored in a searchable field called **_sourceCategory**).
7. In **Fields**. Click the **+Add Field** link to add custom log metadata fields.
8. Enter the required fields that you want to associate, each field needs a name (key) and value.
  * ![green check circle.png](/img/reuse/green-check-circle.png)  A green circle with a checkmark shows up when a field exists and is enabled in the Fields table schema.
  * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point shows up when the field doesn't exist or is disabled in the **Fields table schema**.


:::important
In this case, an option to automatically add or enable the nonexistent fields to the **Fields table schema** is provided. If a field is sent to Sumo logic that does not exist in the **Fields table schema** or is disabled, it will be ignored and known as dropped field.
:::

9. In **Role ARN**: Copy and paste the AWS Role ARN from the Data Lake console.
10. Click **Save**. A pop-up will appear with the subscription URL.


:::note
Remember to copy and secure the subscription URL. If you closed the window and could not copy the URL, don't worry. Click on the **Edit** button under the list of sources and copy the URL.
:::

11. Optional: You can create any **Processing Rules** that you want for the AWS Source. Refer to the [Create any Processing Rules](/docs/send-data/collection/processing-rules/create-processing-rule).

### Step 4: Update AWS Security Data Lake Subscriber

1. Navigate to the Subscribers page and click **My Subscribers**.
2. Edit the subscriber created in the [Setup Subscriber](#step-2-setup-subscriber-in-aws-security-data-lake-console) section in step 2.
3. Add the subscription URL copied from the AWS Security Data Lake source setup in [Create AWS Security Data Lake Source](#step-3-create-aws-security-data -lake-source-using-sumo-logic-environment) section.
