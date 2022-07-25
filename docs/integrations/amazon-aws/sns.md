---
id: sns
title: Sumo Logic App for Amazon SNS
sidebar_label: Amazon SNS
description: Amazon SNS
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/sns.png')} alt="DB icon" width="50"/>

Amazon Simple Notification Service (SNS) is a pub/sub messaging and mobile notifications service for coordinating the delivery of messages to subscribing endpoints and clients.

The Sumo Logic App for Amazon SNS is a unified logs and metrics (ULM) App that provides insights into the operations and utilization of your SNS service. The preconfigured dashboards help you monitor the key metrics by application, platform, region, and topic name, view the SNS events for activities, and help you plan the capacity of your SNS service.

Log and Metrics Types
The App uses SNS logs and metrics:

SNS CloudWatch Metrics. For details, see here. 
SNS operations using AWS CloudTrail. For details, see here. 

## Collect Logs and Metrics


## Installing the Amazon SNS App

Now that you have set up collection for Amazon SNS, install the Sumo Logic App to use the pre-configured searches and [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/Amazon_SNS/Install-the-Amazon-SNS-App-and-view-the-Dashboards#Dashboards) that provide visibility into your environment for real-time analysis of overall usage.

**To install the app:**

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. To install the app, click **Add to Library** and complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. Enter the **SNS Metrics Source**.
    3. Select either of these options for the **SNS CloudTrail Log Source**.
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (_sourceCategory=MyCategory). 
    4. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
    5. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization. See [Welcome to the New Library](https://help.sumologic.com/01Start-Here/Welcome-to-the-New-Library) for information on working with the library in the new UI.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing the SNS Dashboards

### Overview

See the overview of your SNS service including the successful and failed events, messages published, notifications, and users.

<img src={useBaseUrl('img/integrations/amazon-aws/SNS-Overview.png')} alt="Amazon SNS" />

**Successful Events Location**. See the count and location of successful events in your SNS in the last 24 hours on a world map.

**Failure Events Location**. See the count and location of failed events in your SNS in the last 24 hours on a world map.

**Number of Messages Published**. See the sum of the metric number of messages published in the last 24 hours on a line chart.

**Successful Events**. See the count and percentage of successful events on the last 24 hours on a pie chart.

**Failed Events**. See the count and percentage of failed events on the last 24 hours on a pie chart.

**Message Publish Size**. See the average of the metric publish size in the last 24 hours for the different regions and topic names on a line chart.

**Number of Notifications Delivered.** See the sum on the metric number of notifications delivered in the last 24 hours for the different regions and topic names.

**Top Users**. See the top 10 users by event count in the last 24 hours on a bar chart.

**Events Trend by Event Name**. See the event trend by event name in the last 24 hours on a stacked column chart.

**Number of Notifications Failed**. See the sum on the metric number of notifications failed in the last 24 hours for the different regions and topic names.

**Published Messages Comparison**. See the difference between the metrics number of messages published in the last two days on a line chart.

**Message Publish Size Comparison**. See the difference between the metrics publish size in the last two days on a line chart.


### CloudTrail Events

See the details of failed, and successful events, error codes, event status trend, users, and topic names.

<img src={useBaseUrl('img/integrations/amazon-aws/SNS-CloudTrailEvents.png')} alt="Amazon SNS" />

**Successful Events Location**. See the count and location of successful events in your SNS in the last 24 hours on a world map.

**Failure Events Location**. See the count and location of failed events in your SNS in the last 24 hours on a world map.

**Event Status**. See the count and percentage of event statuses in the last 24 hours on a pie chart.

**Top Error Codes**. See the top 10 error codes by event count in the last 24 hours on a table.

**Event Status Trend**. See the event status trend in the last seven days with failures on a line chart and successes on a column chart.

**Failed Events**. See the count and percentage of the different failed events in the last 24 hours on a pie chart.

**Failed Event Details**. See the details of failed events in the last 24 hours including the time, event name, error code, error message, AWS region, source IP address, account ID, user, type, and event count, displayed in a table.

**Successful Events**. See the count and percentage of the different successful events in the last 24 hours on a pie chart.

**Successful Event Details**. See the details of successful events in the last 24 hours including the time, event name, AWS region, source IP address, account ID, user, type, request ID, name, topic ARN, user agent, and event count, displayed in a table.

**Top Users**. See the top 10 users by event count in the last 24 hours.

**Events by User**. See the count and name of the different events by users in the last 24 hours.

**Most Active TopicNames**. See the top 10 active topic names by event count in the last 24 hours.

**Events Trend by Event Name**. See the event trend by event name in the last 24 hours on a stacked column chart.


### Metrics by Application and Platform

See the details of the metrics messages published, message publish size, notifications delivered, notifications failed, and SMS success rate.

<img src={useBaseUrl('img/integrations/amazon-aws/SNS-ByApplicationAndPlatform.png')} alt="Amazon SNS" />

#### Application

**Number of Messages Published.** See the sum of the metric number of messages published by applications in the last 24 hours on a line chart.

**Message Publish Size**. See the average of the metric publish size by applications in the last 24 hours on a line chart.

**Number of Notifications Delivered**. See the sum of the metric number of notifications delivered by application in the last 24 hours on a line chart.

**Number of Notifications Failed**. See the sum of the metric number of notifications failed by application in the last 24 hours on a line chart.


#### Platform

**Number of Messages Published**. See the sum of the metric number of messages published by platforms in the last 24 hours on a line chart.

**Message Publish Size.** See the average of the metric publish size by platforms in the last 24 hours on a line chart.

**Number of Notifications Delivered**. See the sum of the metric number of notifications delivered by platforms in the last 24 hours on a line chart.

**Number of Notifications Failed**. See the sum of the metric number of notifications failed by platforms in the last 24 hours on a line chart.

**SMS Success Rate**. See the average of the metric SMS success rate by SMS type and country in the last 24 hours on a line chart.


### Metrics by Region

See the details of the metrics messages published, message publish size, notifications delivered, and notifications failed by region.

<img src={useBaseUrl('img/integrations/amazon-aws/SNS-ByRegion.png')} alt="Amazon SNS" />

**Number of Messages Published**. See the sum of the metric number of messages published by regions in the last 24 hours on a line chart.

**Message Publish Size**. See the average of the metric publish size by regions in the last 24 hours on a line chart.

**Number of Notifications Delivered**. See the sum of the metric number of notifications delivered by regions in the last 24 hours on a line chart.

**Number of Notifications Failed**. See the sum of the metric number of notifications failed by regions in the last 24 hours on a line chart.


### Metrics by TopicName

See the details of the metrics messages published, message publish size, notifications delivered, and notifications failed by topic name.

<img src={useBaseUrl('img/integrations/amazon-aws/SNS-ByTopicName.png')} alt="Amazon SNS" />

**Number of Messages Published.** See the sum of the metric number of messages published by topic name in the last 24 hours on a line chart.

**Message Publish Size.** See the average of the metric publish size by topic name in the last 24 hours on a line chart.

**Number of Notifications Delivered.** See the sum of the metric number of notifications delivered by topic name in the last 24 hours on a line chart.

**Number of Notifications Failed.** See the sum of the metric number of notifications failed by topic name in the last 24 hours on a line chart.  
