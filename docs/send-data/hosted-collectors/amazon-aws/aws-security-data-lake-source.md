---
id: amazon-security-lake-source
title: Amazon Security Lake Source (Beta)
description: This document explains how to configure the Amazon Security Lake source setup using the Sumo logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

:::note
This feature is in Beta. To participate, contact your Sumo account executive.
:::

Amazon Security Lake source provides a web services interface that can be used to manage data from multiple AWS sources through a single interface for multiple AWS organizations.

This makes AWS log setup relatively easy. In addition, the data available from various AWS services is in the OCSF format, making it simple to parse and correlate across different sources.

## Configure Amazon Security Lake Setup


### Step 1. Grant Sumo logic access to Amazon Security Lake console

Granting Sumo logic access to the Amazon Security Lake source  requires access to **Sumo Account ID** and **External ID**. Find the details below:

1. **Account ID**. Remember to copy and secure your Sumo Logic ID: ************. It will be needed in the further steps.
2. **External ID**. The External ID is formed from your Sumo Logic region identifier. The format of your Sumo Logic account identifier is: `<SumoDeployment>: <SumoAccountId>` where:
   * **SumoDeployment** is your Sumo Logic deployment that has to be entered in lowercase such as au, ca, de, eu, fed, in, jp, us1, or us2. To find your deployment, see [Sumo Logic API Authentication, Endpoints, and Security](/docs/api/getting-started.md).
   * **SumoAccountId** is the Organization ID shown on your Account Overview in the Sumo Logic UI. You can access it by going to **Administration** > **Account**  > **Account Overview**.


### Step 2. Set up subscriber in Amazon Security Lake console

Create a subscriber in Amazon Security Lake Console. To create a subscriber, follow the instructions below:
1. Navigate to the Security Lake console.
2. From the left navigation, click **Subscriber**.
3. On the Subscribers page, under the **Add subscribers** tab click **Create custom subscriber**. <br/><img src={useBaseUrl('img/send-data/setup-subscriber.png')} alt="setup-subscriber" />
4. (Optional) Provide the **Subscriber name** and **Description**.
5. In the **Select Logs and events sources** section, you can select which resources you want to enable. There are two options:
     * **All Logs and event sources**. All the logs and event sources will be selected if you select this option.
     * **Specify log and event sources**. Only specific sources will be selected if you go with this option. For example, you select **Specific log and event sources**. In the next step, you will be able to view user activity, API usage in AWS services, IP traffic details, and log and event information from Amazon Route 53.
6. In **Log and event sources**, you have these options:
     * **CloudTrail**: View user activity and API usage in AWS services.
     * **VPC flow logs**: View details about IP traffic to and from network interfaces in your VPC.
     * **Route 53**: View Amazon Route 53 Resolver query logs.
7. Access data.
     * **S3** or **Lakeformation** is the storage option you can choose for how your subscribers will access the data.
     :::note
     Subscription URL will be added to the subscriber in the later step and is kept blank deliberately.
     :::


### Step 3. Create Amazon Security Lake source in Sumo Logic

When you create an Amazon Security Lake source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use from the existing ones or create a new Hosted Collector, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

**To create an Amazon Security Lake source:**

1. In the Sumo Logic environment, go to **Manage Data** > **Collection** > **Collection**.
2. On the **Collectors page, click **Add Source** next to a Hosted Collector.
3. Select an existing Hosted Collector or the one you have just created. <br/><img src={useBaseUrl('img/send-data/aws-security-lake.png')} alt="amazon security lake" />
4. Select **Amazon Security Lake**.
5. Enter a name for the new **Source**. A **Description** is optional.
6. In the **Source Category**, enter any string to tag the output collected from this distinct source. (Category metadata is stored in a searchable field called **_sourceCategory**).
7. In **Fields**. Click the **+Add Field** link to add custom log metadata fields.
8. Enter the required fields that you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png)  A green circle with a checkmark shows up when a field exists and is enabled in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point shows up when the field doesn't exist or is disabled in the **Fields table schema**.
   :::important
   In this case, an option to automatically add or enable the nonexistent fields to the **Fields table schema** is provided. If a field is sent to Sumo logic that does not exist in the **Fields table schema** or is disabled, it will be ignored and known as dropped field.
   :::
9. In **Role ARN**: Copy and paste the AWS Role ARN from the Amazon Security Lake console.
10. Click **Save**. A pop-up will appear with the subscription URL.
  :::note
  Remember to copy and secure the subscription URL. If you closed the window and could not copy the URL, don't worry. Click on the **Edit** button under the list of sources and copy the URL.
  :::
11. Optional: You can create any **Processing Rules** that you want for the Source. Refer to [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule.md).

### Step 4: Update Amazon Security Lake subscriber

1. Navigate to the Subscribers page and click **My Subscribers**.
2. Edit the subscriber created in the [Setup Subscriber](#step-2-set-up-subscriber-in-amazon-security-lake-console) section in step 2.
3. Add the subscription URL copied from the Amazon Security Lake source setup in [Create Amazon Security Lake Source](#step-3-create-amazon-security-lake-source-in-sumo-logic) section.
