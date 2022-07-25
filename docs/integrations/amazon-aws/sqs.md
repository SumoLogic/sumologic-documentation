---
id: sqs
title: Sumo Logic App for Amazon SQS
sidebar_label: Amazon SQS
description: Amazon SQS
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service that makes it easy to decouple and scale microservices, distributed systems, and serverless applications. The Sumo Logic App for Amazon SQS is a unified logs and metrics (ULM) App that provides operational insights into your Amazon SQS utilization. The preconfigured dashboards help you monitor the key metrics, view the SQS events for queue activities, and help you plan the capacity of your SQS service utilization.

Log and Metrics Types
The App uses SQS logs and metrics for:

SQS CloudWatch Metrics. For details, see here.
SQS operations using AWS CloudTrail. For details, see here.


## Collect Logs and Metrics







## Installing the Amazon SQS App

Now that you have set up collection for Amazon SQS, install the Sumo Logic App to use the pre-configured searches and [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/Amazon_SQS/Install-the-Amazon-SQS-App-and-view-the-Dashboards#Dashboards) that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. To install the app, click **Add to Library** and complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. Select either of these options for the **SQS CloudTrail Log Source**.
        * Choose **Select from Existing Source Categories,** and select the Source Category from list.
        * Choose Enter a Custom Data Filter and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`).
    3. Enter the **SQS Metrics Source**.
    4. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
    5. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization. See [Welcome to the New Library](https://help.sumologic.com/01Start-Here/Welcome-to-the-New-Library) for information on working with the library in the new UI.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing the Dashboards

### Amazon SQS - Overview

See the details of SQS metrics including the age, delayed, visible, sent, deleted, messages, and size of the messages.

<img src={useBaseUrl('img/integrations/amazon-aws/SQS-Overview.png')} alt="SQS-Overview" />

**Events Location. **See the count of SQS CloudTrail events by location in the last 14 days on a world map.

**Approximate Age Of Oldest Message (Seconds)**. See the average of the metric approximate age of oldest message in the last 24 hours by region on a line chart.

**Approximate Number Of Messages Delayed**. See the average, sum, and maximum of the metric approximate number of messages delayed in the last 24 hours by region on a line chart.

**Events Trend**. See the trend of different events in the last 14 days on a stacked column chart.

**Approximate Number Of Messages Visible and Not Visible**. See the sum of the metric approximate number of messages visible, and the sum of the metric approximate number of messages not visible, in the last 24 hours by region on a line chart.

**Top Users**. See the top 10 users by event count in the last 14 days on a bar chart.

**Number Of Empty Receives**. See the average, sum, and maximum of the metric number of empty receives in the last 24 hours by region on a line chart.

**Lag (Sent - Deleted).** See the difference between the metrics number of messages sent and number of messages deleted, to get the lag of the messages by region in the last 24 hours on a line chart.

**Number Of Messages Received**. See the sum of the metrics number of messages received by region in the last 24 hours on a line chart.

**Sent Message Size**. See the average, sum, and maximum of the metric sent message size in the last 24 hours by region on a line chart.

**Number Of Messages Sent and Deleted**. See the sum of the metric number of messages sent, and the sum of the metric number of messages deleted, in the last 24 hours by region on a line chart.


### Amazon SQS CloudTrail Events

See the details of SQS from logs including the top users, events, and queues.

<img src={useBaseUrl('img/integrations/amazon-aws/SQS-CloudTrailEvents.png')} alt="ASQS-CloudTrailEvents" />

**Events. **See the count and percentage of the different SQS events in the last 14 days on a pie chart.

**Events Trend**. See the trend of different events in the last 14 days on a stacked column chart.

**Events Location. **See the count of SQS CloudTrail events by location in the last 14 days on a world map.

**Top Queues**. See the top 10 queue name by event count in the last 14 days displayed in a table.

**Top Users**. See the top 10 users by event count in the last 14 days displayed in a table.

**Events by User**. See the count of SQS events by user in the last 14 days on a bar chart.

**Events Details**. See the details of SQS events including the time, event name, queue name, queue URL, type, user, account ID, AWS region, source IP address, and event count, in the last 14 days, displayed in a table.


### Amazon SQS by QueueName

See the details of SQS including the delayed, invisible, deleted, lag, size, received and sent messages by queue name.

<img src={useBaseUrl('img/integrations/amazon-aws/SQS-ByQueueName.png')} alt="SQS-ByQueueName" />

**Approximate Age Of Oldest Message (Seconds)**. See the average of the metric approximate age of oldest message in the last 24 hours by queue name on a line chart.

**Approximate Number Of Messages Delayed**. See the average, sum, and maximum of the metric approximate number of messages delayed in the last 24 hours by queue name on a line chart.

**Approximate Number Of Messages Not Visible**. See the sum of the metric approximate number of messages not visible in the last 24 hours by queue name on a line chart.

**Approximate Number Of Messages Visible**. See the sum of the metric approximate number of messages visible in the last 24 hours by queue name on a line chart.

**Number Of Empty Receives**. See the average, sum, and maximum of the metric number of empty receives in the last 24 hours by queue name on a line chart.

**Number Of Messages Deleted**. See the sum of the metric number of messages deleted in the last 24 hours by queue name on a line chart.

**Number Of Messages Received**. See the sum of the metric number of messages received in the last 24 hours by queue name on a line chart.

**Number Of Messages Sent**. See the sum of the metric number of messages sent in the last 24 hours by queue name on a line chart.

**Sent Message Size**. See the average, sum, and maximum of the metric sent message size in the last 24 hours by queue name on a line chart.


### Amazon SQS by Region

See the details of SQS including the delayed, invisible, deleted, lag, size, received and sent messages by region.

<img src={useBaseUrl('img/integrations/amazon-aws/SQS-ByRegion.png')} alt="AWS API Gateway" />

**Approximate Age Of Oldest Message (Seconds)**. See the average of the metric approximate age of oldest message in the last 24 hours by region on a line chart.

**Approximate Number Of Messages Delayed.** See the average, sum, and maximum of the metric approximate number of messages delayed in the last 24 hours by region on a line chart.

**Approximate Number Of Messages Not Visible**. See the sum of the metric approximate number of messages not visible in the last 24 hours by region on a line chart.

**Approximate Number Of Messages Visible**. See the sum of the metric approximate number of messages visible in the last 24 hours by region on a line chart.

**Number Of Empty Receives**. See the average, sum, and maximum of the metric number of empty receives in the last 24 hours by region on a line chart.

**Number Of Messages Deleted**. See the sum of the metric number of messages deleted in the last 24 hours by region on a line chart.

**Number Of Messages Received**. See the sum of the metric number of messages received in the last 24 hours by region on a line chart.

**Number Of Messages Sent**. See the sum of the metric number of messages sent in the last 24 hours by region on a line chart.

**Sent Message Size**. See the average, sum, and maximum of the metric sent message size in the last 24 hours by region on a line chart.

**Lag (Sent - Deleted)**. See the difference between the metrics number of messages sent and number of messages deleted, to get the lag of the messages by region in the last 24 hours on a line chart.
