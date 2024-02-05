---
id: aws-s3-source
title: Amazon S3 Source
sidebar_label: Amazon S3
description: Add an Amazon S3 Source to upload messages to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CollBegin from '../../../reuse/collection-should-begin-note.md';

<img src={useBaseUrl('img/integrations/amazon-aws/s3audit.png')} alt="icon" width="40"/>

Amazon Simple Storage Service (Amazon S3) provides a web services interface that can be used to store and retrieve any amount of data from anywhere on the web. Use an Amazon S3 Source to upload data to Sumo Logic from S3.

One Amazon S3 Source can collect data from a single S3 bucket. However, you can configure multiple S3 Sources to collect from one S3 bucket. For example, you could use one S3 Source to collect one particular data type, and then configure another S3 Source to collect another data type.

For information on S3 performance optimization, see [Request Rate and Performance Considerations](http://docs.aws.amazon.com/AmazonS3/latest/dev/request-rate-perf-considerations.html). 

## Compressed data

An S3 Source can collect either plain text or gzip-compressed text. Zip files are not supported.

Data is treated as plain text by default, but gzip decompression will be used if both of the following conditions apply:

1. The target file has a .gz or .gzip extension, or no file extension.
1. The target file's initial bytes match the gzip file format.

:::important
Files are transferred in their compressed form and decompressed when ingested. Data volume is calculated by the size of your data decompressed.
:::

## Configure an Amazon S3 Source

1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product/) to an Amazon S3 bucket.
1. [Enable logging in AWS](http://docs.aws.amazon.com/AmazonS3/latest/dev/enable-logging-console.html) using the Amazon Console.
1. Confirm that logs are being delivered to the Amazon S3 bucket.
1. Add an Amazon S3 Source to collect objects from your Amazon S3 bucket. See below for details.

## Amazon S3 Source

When you create an Amazon Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

## Rules

* If you're editing the `Collection should begin` date on a Source the new date must be after the current `Collection should begin` date.

 :::note

 <CollBegin/>

 :::

* Sumo Logic supports log files (S3 objects) that do NOT change after they are uploaded to S3. Support is not provided if your logging approach relies on updating files stored in an S3 bucket. S3 does not have a concept of updating existing files, you can only overwrite an existing file. When this overwrite happens, S3 considers it as a new file object, or a new version of the file, and that file object gets its own unique version ID.

    Sumo Logic scans an S3 bucket based on the path expression supplied, or receives an SNS notification when a new file object is created. As part of this, we receive a file name (key) and the object's ID. It's compared against a list of file objects already ingested. If a matching file ID is not found the contents of the file are ingested in full.

    When you overwrite a file in S3, the file object gets a new version ID and as a result, Sumo Logic sees it as a new file and ingests all of it. If with each version you post to S3 you are simply adding to the end of the file, then this will lead to duplicate messages ingested, one message for each version of the file you created in S3.   
* Duplicate logs are collected when changing the AWS versioned APIs setting from Yes to No and the S3 bucket has versioning enabled.
* Glacier objects will not be collected and are ignored.
* If you're using SNS you need to create a separate topic and subscription for each Source.

### Cisco Umbrella

Cisco Umbrella offers logging to a Cisco-managed S3 bucket. Collection from these buckets has the following limitations:

* AWS versioned APIs are not supported. The **Use AWS versioned APIs** setting on the Source must be disabled.
* S3 Event Notifications Integration is not supported.
* Access must be provided with an Access ID and Key. Role-based access is not supported.
* Use a prefix in the path expression so it doesn't point to the root directory.

## S3 Event Notifications Integration

Sumo’s S3 integration combines scan-based discovery and event based discovery into a unified integration that gives you the ability to maintain a low-latency integration for new content and provide assurances that no data was missed or dropped. When you enable event based notifications S3 will automatically publish new files to Amazon Simple Notification Service (SNS) topics which Sumo Logic can be subscribed. This notifies Sumo Logic immediately when new files are added to your S3 bucket so we can collect them. For more information about SNS, see the [Amazon SNS product](https://aws.amazon.com/sns/) detail page.

![Cloud_AWS_icon.png](/img/send-data/Cloud_AWS_icon.png)

Enabling event based notifications is an S3 bucket-level operation that subscribes to an SNS topic. An SNS topic is an access point that Sumo Logic can dynamically subscribe to in order to receive event notifications. When creating a Source that collects from an S3 bucket Sumo assigns an endpoint URL to the Source. The URL is for you to use in the AWS subscription to the SNS topic so AWS notifies Sumo when there are new files. See [Configuring Amazon S3 Event Notifications](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) for more information.

You can adjust the configuration of when and how AWS handles communication attempts with Sumo Logic. See [Setting Amazon SNS Delivery Retry Policies](https://docs.aws.amazon.com/sns/latest/dg/DeliveryPolicies.html) for details.

<Iframe url="https://www.youtube.com/embed/2vtjPfHQK1Q"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe';

## Create an Amazon S3 Source

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector, either an existing Hosted Collector, or one you have created for this purpose.
1. Select **Amazon S3**.
1. Enter a name for the new Source. A description is optional.
1. Select an **S3 region** or keep the default value of **Others**. The S3 region must match the appropriate S3 bucket created in your Amazon account. Selecting an AWS GovCloud region means your data will be leaving a FedRAMP-high environment. Use responsibly to avoid information spillage. See [Collection from AWS GovCloud](collection-aws-govcloud.md) for details.
1. **Use AWS versioned APIs**? Select **Yes** to collect from buckets where versioning is enabled. This uses the list-object-versions and get-object-version Amazon S3 APIs. Selecting **Yes** requires your credentials to have **ListObjectVersions** and **GetObjectVersion** permissions.

    ![versioned apis options.png](/img/send-data/versioned-apis-options.png)

1. For **Bucket Name**, enter the exact name of your organization's S3 bucket. Be sure to double-check the name as it appears in AWS, for example:

    ![img](/img/send-data/S3_Bucket.png)

1. For **Path Expression**, enter the wildcard pattern that matches the S3 objects you'd like to collect. You can use more than one wildcard (\*) in this string. Recursive path expressions use a multiple wildcard. Do **NOT** use a leading forward slash. [See About Amazon Path Expressions](amazon-path-expressions.md) for details.
1. **Collection should begin.** Choose or enter how far back you'd like to begin collecting historical logs. You can either:

   * Choose a predefined value from dropdown list, ranging from "Now" to “72 hours ago” to “All Time”.
   * Enter a relative value. To enter a relative value, click the **Collection should begin** field and press the delete key on your keyboard to clear the field. Then, enter a relative time expression, for example `-1w`. You can define when you want collection to begin in terms of months (M), weeks (w), days (d), hours (h), and minutes (m).

    :::note
    If you paused the Source and want to skip some data when you resume, update the **Collection should begin** setting to a time after it was paused.
    :::

    :::note
    <CollBegin/>
    :::

1. For **Source Category**, enter any string to tag the output collected from this Source. (Category metadata is stored in a searchable field called _sourceCategory.)
1.  **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

1. For **AWS** **Access** you have two **Access Method** options. Select **Role-based access** or **Key access** based on the AWS authentication you are providing. Role-based access is preferred, this was completed in the prerequisite step [Grant Sumo Logic access to an AWS Product](grant-access-aws-product.md). If you're collecting from a Cisco Umbrella bucket you must use **Key access**.

   * For **Role-based access** enter the Role ARN that was provided by AWS after creating the role. 

        ![Role based access input roleARN.png](/img/send-data/Role-based-access-input-roleARN.png)

   * For **Key access** enter the **Access Key ID** and **Secret Access Key.** See [AWS Access Key ID](http://docs.aws.amazon.com/STS/latest/UsingSTS/UsingTokens.html#RequestWithSTS) and [AWS Secret Access Key](https://aws.amazon.com/iam/) for details.

1. **Log File Discovery.** You have the option to set up Amazon Simple Notification Service (SNS) to notify Sumo Logic of new items in your S3 bucket. A scan interval is required and automatically applied to detect log files.

    :::important
    Sumo Logic highly recommends using an SNS Subscription Endpoint for its ability to maintain low-latency collection. This is essential to support up-to-date Alerts.

    If you're collecting from a Cisco Umbrella bucket SNS Subscription Endpoint is not supported.
    :::

    * **Scan Interval.** Sumo Logic will periodically scan your S3 bucket for new items in addition to SNS notifications. **Automatic** is recommended to not incur additional AWS charges. This sets the scan interval based on if subscribed to an SNS topic endpoint and how often new files are detected over time. If the Source is not subscribed to an SNS topic and set to **Automatic** the scan interval is 5 minutes. You may enter a set frequency to scan your S3 bucket for new data. To learn more about Scan Interval considerations, see [About setting the S3 Scan Interval](aws-s3-scan-interval-sources.md).
    * **SNS Subscription Endpoint** (**Highly Recommended**). New files will be collected by Sumo Logic as soon as the notification is received. This will provide faster collection versus having to wait for the next scan to detect the new file.

        To set up the subscription you need to get an endpoint URL from Sumo to provide to AWS. This process will save your Source and begin scanning your S3 bucket when the endpoint URL is generated. Click on **Create URL** and use the provided endpoint URL when creating your subscription in step C.     

    ![SNS create URL button.png](/img/send-data/SNS-create-URL-button.png)

### Set up SNS in AWS (Highly Recommended)

The following steps use the Amazon SNS Console. You may instead use AWS CloudFormation. Follow the instructions to use [CloudFormation to set up an SNS Subscription Endpoint](configure-your-aws-source-cloudformation.md).

1. Go to **Services >** **Simple Notification Service** and click **Create Topic**. Enter a **Topic name** and click **Create topic**. Copy the provided **Topic ARN**, you’ll need this for the next step.
 Make sure that the topic and the bucket are in the same region.

1. Again go to **Services >** **Simple Notification Service** and click **Create Subscription**. Paste the **Topic ARN** from step B above. Select **HTTPS** as the protocol and enter the **Endpoint** URL provided while creating the S3 source in Sumo Logic. Click **Create subscription** and a confirmation request will be sent to Sumo Logic. The request will be automatically confirmed by Sumo Logic.

1. Select the **Topic** created in step B and navigate to **Actions > Edit Topic Policy**. Use the following policy template, replace the `SNS-topic-ARN` and `bucket-name` placeholders in the `Resource` section of the JSON policy with your actual SNS topic ARN and S3 bucket name:

    ```json
    {
        "Version": "2008-10-17",
        "Statement": [{
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": [
                "SNS:Publish"
            ],
            "Resource": "SNS-topic-ARN",
            "Condition": {
                "ArnLike": {
                    "aws:SourceArn": "arn:aws:s3:*:*:bucket-name"
                }
            }
        }]
    }
    ```

1. Go to **Services > [S3](https://s3.console.aws.amazon.com/s3/buckets/)** and select the bucket to which you want to attach the notifications. Navigate to **Properties > Events > Add Notification**. Enter a **Name** for the event notification. In the **Events** section select **All object create events**. In the **Send to** section (notification destination) select **SNS Topic**. An **SNS** section becomes available, select the name of the topic you created in step B from the dropdown. Click **Save**.

### Complete setup in Sumo Logic

1. Set any of the following under **Advanced**:

   * **Enable Timestamp Parsing.** This option is selected by default. If it's deselected, no timestamp information is parsed at all.

     * **Time Zone.** There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs can't be     determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
     * **Timestamp Format.** By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference for more information.

   * **Enable Multiline Processing.** See [Collecting Multiline Logs](/docs/send-data/reference-information/collect-multiline-logs) for details on multiline processing and its options. This is enabled by default. Use this option if you're working with multiline messages (for example, log4J or exception stack traces). Deselect this option if you want to avoid unnecessary processing when collecting single-message-per-line files (for example, Linux system.log). Choose one of the following:

     * **Infer Boundaries.** Enable when you want Sumo Logic to automatically attempt to determine which lines belong to the same message. If you deselect the Infer Boundaries option, you will need to enter a regular expression in the Boundary Regex field to use for detecting the entire first line of multiline messages.
     * **Boundary Regex.** You can specify the boundary between messages using a regular expression. Enter a regular expression that matches the entire first line of every multiline message in your log files.

1. Create any Processing Rules you'd like for the AWS Source.
1. When you are finished configuring the Source, click **Save**.

### SNS with one bucket and multiple Sources

    :::important
    S3 Event Notifications do not allow you to have overlapping suffixes in two rules if the prefixes are overlapping for the same event type.

    In this scenario, you will likely need to have a single Event Notification for the suffix that sends to an SNS Topic, and then have multiple SNS Subscriptions to the same Topic. This will allow you to have parallel data streams for the same Event Notifications (i.e., one that points to a Sumo Endpoint, and one that points elsewhere).
    :::

When collecting from one Amazon S3 bucket with multiple Sumo Sources, you need to create a separate topic and subscription for each Source. Subscriptions and Sumo Sources should both map to only one endpoint. If you were to have multiple subscriptions Sumo would collect your objects multiple times.

Each topic needs a separate filter (prefix/suffix) so that collection does not overlap. For example, the following image shows a bucket configured with two notifications that have filters (prefix/suffix) set to notify Sumo separately about new objects in different folders.

![S3 bucket two notifications for SNS.png](/img/send-data/S3-bucket-two-notifications-for-SNS.png)

### Update Source to use S3 Event Notifications

:::tip
There is a [community supported script](https://github.com/SumoLogic/sumologic-content/tree/master/Sumo-Logic-Tools/Event_Based_S3_Automation) available that configures event based object discovery on existing AWS Sources.
:::

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. On the Collection page navigate to your Source and click **Edit**. Scroll down to **Log File Discovery** and note the Endpoint **URL** provided, you will use this in step 13.C when creating your subscription.
1. Complete steps 13.B through 13.E for [configuring SNS Notifications](#set-up-sns-in-aws-highly-recommended).

### Troubleshoot S3 Event Notifications

In the web interface under **Log File Discovery** it shows a red exclamation mark with "Sumo Logic has not received a validation request from AWS".  

![SNS error](/img/send-data/SNS-red-tick-mark.png)

Steps to troubleshoot:

1. Refresh the Source’s page to view the latest status of the subscription in the SNS Subscription section by clicking **Cancel** then **Edit** on the Source in the Collection tab.
1. Verify you have enabled sending **Notifications** from your S3 bucket to the appropriate SNS topic. This is done in the last step of [Set up SNS](#set-up-sns-in-aws-highly-recommended).
1. If you didn’t use CloudFormation check that the SNS topic has a confirmed subscription to the URL in AWS console. A "Pending Confirmation" state likely means that you entered the wrong URL while creating the subscription.    

In the web interface under **Log File Discovery** it shows a green check with "Sumo Logic has received an AWS validation request at this endpoint." but you still have high latencies.  

![SNS green tick mark](/img/send-data/sns-green-tick.png)

The green check confirms that the endpoint was used correctly, but it does not mean Sumo is receiving notifications successfully.

Steps to troubleshoot:

1. AWS writes CloudTrail and S3 Audit Logs to S3 with a latency of a few minutes. If you’re seeing latencies of around 10 minutes for these Sources it is likely because AWS is writing them to S3 later than expected. 
1. Verify you have enabled sending **Notifications** from your S3 bucket to the appropriate SNS topic. This is done in the last step of [Set up SNS](#set-up-sns-in-aws-highly-recommended).
