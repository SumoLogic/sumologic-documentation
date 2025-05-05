---
id: receive-email-alerts
title: Receive Email Alerts from Scheduled Searches
sidebar_label: Receive Email Alerts from Scheduled Searches
description: Learn about the three ways to receive the results of scheduled searches in email.
---

:::note
A maximum of 120 emails are sent per day per scheduled search.
:::

There are three ways to receive the results of scheduled searches in email:

* **Scheduled email.** Provides a summary of the search results every time a scheduled search is run. The subject of this email is **Search Results**. No matter what the results of the search, you'll receive an email.

    Email notifications are sent to the recipient email address(es) based on the notification parameters. For queries returning high numbers of messages or group results, the email notification contains a representative sample of the first 25 messages or groups. **Most Recent Results** also **displays** the number of remaining results available, which you can view in Sumo Logic with a click.

* **Alert email.** Set up Alert Conditions if you'd rather just receive an alert email when certain conditions are met. This means you'd get an automated alert when or if parameters you set are triggered, based on the results of the scheduled search. For example, you could set up an alert if a certain number of users visit the free trial URL of your website. You can [run a search from this email](run-search-from-alert-email.md) when you receive it.

    You can be very specific with the alert condition—you can even set an exact number of results that triggers the email. Results can either be the number of log messages *OR* the number of aggregates returned by the saved search. If your saved search returns log messages, then the alert will use the number of messages you specify. If your query produces aggregate results, the alert will use the number of aggregates (or groups).

:::important
Scheduled searches are run according to the time zone of an individual's computer and browser, not according to the time zone of logs.
:::

## Customize the Subject and Contents of your Email Alert

You can use variables to customize the subject of your email. You can also select the features you want to include in your email. For details, see [Create an Email Alert.](create-email-alert.md) 

:::note
The columns in an alert email are alphabetically ordered. To set the column order in the email alert, you can use the [fields](/docs/search/search-query-language/search-operators/fields) operator in your query. 
:::

## Scheduled Search Email Alert Template

The Scheduled Search Email Alert template includes the following details:

* **Saved Search.** Title of the saved search. 
* **Description.** Description of the saved search. 
* **Search String.** The search query of the saved search. 
* **Time Range.** The time range that the saved search is set to use. 
* **Run Frequency.** The frequency that the saved search is set to run. 
* **Notification Threshold.** This is the alert condition that the saved search is set to use.
* **Run At.** The time that the saved search has run.  
* **Scheduled By.** The name and email of the person who scheduled the saved search to run. 
* **Message Distribution.** Displays the message distribution of the saved search results in a column chart histogram on a timeline. Click to **View results in Sumo Logic**. 
* **Aggregation.** Displays the first 25 messages of the search results, and includes the complete number of results. Click "**here**" in the email to view the full results in Sumo Logic. 
* **Results as CSV attachment.** If you have selected to receive your scheduled search results as a CSV file, it will be attached to the email. The maximum CSV file size allowed is 5MB or 1,000 results. 

![Search from email](/img/alerts/search_from_email_new.png)

:::note
Rarely, there may be circumstances that prevent the histogram from loading fast enough to be included with the email before it is sent. In that case, you will receive an email with all pertinent information, just without the graph.
:::
