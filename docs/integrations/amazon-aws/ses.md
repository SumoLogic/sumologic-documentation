---
id: ses
title: Amazon SES
sidebar_label: Amazon SES
description: Amazon SES
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Amazon Simple Email Service (Amazon SES) is a cloud-based email sending and receiving service. The Sumo Logic App for Amazon SES helps you monitor the email platform activities. The app uses CloudTrail events and SES notifications, and provides pre-configured dashboards that provide insights on the status of the email delivery including bounced notifications, delivered notifications, and various SES CloudTrail events.

## Collecting Logs and Metrics

### Log Types
The Amazon SES App uses:
* AWS CloudTrail events for SES. For more details, see here. 
* SES Notifications. For more details, see here. 


## Installing the Amazon SES App

Now that you have set up collection for Amazon SES, install the Sumo Logic App to use the pre-configured searches and [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/06Google/Google_Cloud_Audit/Install-the-Google-Cloud-Audit-App-and-view-the-Dashboards#Dashboards) that provide visibility into your environment for real-time analysis of overall usage.

To install the app:
1. From the **App Catalog**, search for and select the app. You can click **Preview Dashboards** to verify that you have the app you need.
2. To install the app, click **Add to Library** and complete the following fields.
    1. **App Name**. You can retain the existing name, or enter a name of your choice for the app.
    2. **Data Source**. Select either of these options for **SES CloudTrail Log Source**, and **SES Notification Log Source**.
        * Choose **Source Category**, and select a source category from the list.
            * For SES CloudTrail Logs, provide sourceCategory as **AWS/Cloudtrail**
            * For SES Notification Logs, provide sourceCategory as **AWS/SES/Notifications**
        * **Choose Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (_sourceCategory=MyCategory).
3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folde**r to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your Personal folder, or other folder that you specified. From here, you can share it with your organization. See [Welcome to the New Library](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/Amazon_SES/Install-the-Amazon-SES-App-and-view-the-Dashboards) for information on working with the library in the new UI.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.



## Viewing SES Dashboards

This section provides examples of the Amazon SES App dashboards, along with descriptions of the features and functions.


### Amazon SES - CloudTrail Events Overview

See the overview of SES CloudTrail events including failed, and successful events, error codes, users, and event locations.

<img src={useBaseUrl('img/integrations/amazon-aws/AmazonSESCloudTrailEventsbyEventName.png')} alt="AWS API Gateway" />

**Successful Events Location**. See the count and location of the successful events in the last 24 hours on a world map.

**Failure Events Location**. See the count and location of the failed events in the last 24 hours on a world map.

**Event Status**. See the count of event statuses in the last 24 hours on a pie chart.

**Top Error Codes**. See the top 10 error codes by event count in the last 24 hours.

**Event Status Trend**. See the trend of success and failure event statuses in the last seven days. Failure count is a line chart, and success count is a column chart.

**Failed Events**. See the count of failed events in the last 24 hours on a pie chart.

**Failed Event Details**. See the details of failed events including the time, event name, error code, error message, AWS region, source IP address, account ID, user, type, request ID, and event count, displayed in a table.

**Successful Events**. See the count of successful events in the last 24 hours on a pie chart.

**Successful Event Details**. See the details of successful events including the time, event name, AWS region, source IP address, account ID, user, type, request ID, and event count, displayed in a table.

**Top Users**. See the details of top 10 users in the last 24 hours including the type, user name, and count, displayed in a table.

**Events by User**. See the count of events by users in the last 24 hours on a bar chart.

**Events Trend by Event Name**. See the trend in events by event name in the last 24 hours on a stacked column chart.


### Amazon SES - CloudTrail Events by Event Name

See the details of various SES CloudTrail events including the identity, get send, domain, receipt, and email address events.

<img src={useBaseUrl('img/integrations/amazon-aws/SES-Notification.png')} alt="AWS API Gateway" />

**Identity Events**. See the count of the identity events in the last seven days on a pie chart.

**Identity Event Details**. See the details of the identity event in the last seven days including the event time, event name, event type, type, user, AWS region, source IP address, event status, account ID, request ID, error code, error message, and event count, displayed in a table.

**Get Send Events**. See the count of the get send events in the last seven days on a pie chart.

**Get Send Event Details**. See the details of the get send event in the last seven days including the event time, event name, event type, type, user, AWS region, source IP address, event status, account ID, request ID, error code, error message, and event count, displayed in a table.

**Domain Events**. See the count of the domain events in the last seven days on a pie chart.

**Domain Event Details**. See the details of the domain event in the last seven days including the event time, event name, event type, type, user, AWS region, source IP address, event status, account ID, request ID, error code, error message, and event count, displayed in a table.

**Receipt Events**. See the count of the receipt events in the last seven days on a pie chart.

**Receipt Event Details**. See the details of the receipt event in the last seven days including the event time, event name, event type, type, user, AWS region, source IP address, event status, account ID, request ID, error code, error message, and event count, displayed in a table.

**Email Address Events**. See the count of the email address events in the last seven days on a pie chart.

**Email Address Event Details**. See the details of the email address event in the last seven days including the event time, event name, event type, type, user, AWS region, source IP address, event status, account ID, request ID, error code, error message, and event count, displayed in a table.


#### Amazon SES - Notification Overview

See the overview of SES notifications including the source IP locations, notification types, mail source, and notification type.

<img src={useBaseUrl('img/integrations/amazon-aws/Overview.png')} alt="AWS API Gateway" />

**Mail Source IP Locations**. See the count and location of the mail source IP addresses in the last 24 hours on a world map.

**Notification Types**. See the count and percentage of notification types in the last 24 hours on a pie chart.

**Mail Source**. See the name and count of mail sources in the last 24 hours.

**Mail Sending AccountId**. See he name and count of mail sending account ID in the last 24 hours.

**Notification Type Trend**. See the trend in the notification types in the last 24 hours on a line chart.


### Amazon SES - Delivered Notifications

See the details of delivered notifications including the email destinations, domains, reporting MTA, and delivery processing time.

<img src={useBaseUrl('img/integrations/amazon-aws/SES-Delivered.png')} alt="AWS API Gateway" />

**Top Delivered email destinations**. See the top 10 delivered email destinations by event count in the last 24 hours.

**Top Delivered email Domains**. See the top 10 delivered email domains by event count in the last 24 hours.

**Delivery Trend**. See the trend in the delivered email addresses by count in the last 24 hours on an area chart.

**Top Reporting MTA**. See the top 10 reporting mail transfer agent (MTA) by count in the last 24 hours.

**Reporting MTA IP Location**. See the count and location of the reporting MTA IP address in the last 24 hours on a world map.

**Delivery Processing Time Outlier**. See the outlier in the delivery processing time in the last 24 hours on a line chart.


### Amazon SES - Bounced Notifications

See the details of bounced notifications by email addresses, domains, bounce types, and bounce subtypes.

<img src={useBaseUrl('img/integrations/amazon-aws/AmazonSESBouncedNotifications.png')} alt="AWS API Gateway" />

**Top Bounced email Addresses.** See the top 10 bounced email addresses by count in the last 24 hours.

**Top Bounced email Domains.** See the top 10 bounced email domains by count in the last 24 hours.

**Bounce Type Trend.** See the trend in the bounce types in the last 24 hours on a stacked column chart.

**Transient Bounce. **MailBox Full. See the top 10 bounced email addresses of transient bounce type, and mailbox full bounce subtype, by count in the last 24 hours.

**Transient Bounce**. Content Rejected. See the top 10 bounced email addresses of transient bounce type, and content rejected bounce subtype, by count in the last 24 hours.

**Transient Bounce. **General. See the top 10 bounced email addresses of transient bounce type, and general subtype, by count in the last 24 hours.

**Transient Bounce**. SubType Breakup. See the count of transient bounce type for each subtype in the last 24 hours on a pie chart.

**Permanent Bounce**. Suppressed. See the top 10 bounced email addresses of permanent bounce type, and suppressed bounce subtype, by count in the last 24 hours.

**Permanent Bounce**. General. See the top 10 bounced email addresses of permanent bounce type, and general bounce subtype, by count in the last 24 hours.

**Transient Bounce.** Sub Type Trend. See the trend in the transient bounce type by subtype on a stacked column chart in the last 24 hours.

**Permanent Bounce. ** Sub Type Trend. See the trend in the permanent bounce type by subtype on a stacked column chart in the last 24 hours.

**Undetermined Bounce. **Sub Type Trend. See the trend in the undetermined bounce type by subtype on a stacked column chart in the last 24 hours.


### Amazon SES - Complaint Notifications

See information about complaints (a complaint occurs when a recipient reports that they don't want to receive an email), including the top email addresses, email domains, and UserAgents associated with complaints; and the sending AccountId, AWS region, SourceIP, and Identity associated with complaints.

<img src={useBaseUrl('img/integrations/amazon-aws/AmazonSESComplaintNotifications.png')} alt="AWS API Gateway" />

**Top Complaint email Addresses.** See the top 10 email addresses sending emails generating complaint notifications by count in the last 24 hours.

**Top Complaint email Domains.** See the top 10 email domains sending emails generating complaint notifications by count in the last 24 hours.

**Top Complaint UserAgents.** See the top 10 user agents sending emails generating complaint notifications by count in the last 24 hours.  

**Complaint Feedback Type Trend.** See the trend in the complaint feedback types in the last 24 hours on a stacked column chart.

**Top Source Generating Complaints. **See the top 10 sources generating complaint notifications in the last 24 hours.

**Sending AccountId. **See the AWS Account Id of the accounts sending emails generating complaint notifications in the last 24 hours.

**Sending AWS Region. **See the AWS region of the accounts sending emails generating complaint notifications in the last 24 hours.

**Sending SourceIP. **See the IP addresses of the users sending emails generating complaint notifications in the last 24 hours.

**Sending Identity. **See the identity of the users sending emails generating complaint notifications in the last 24 hours.
