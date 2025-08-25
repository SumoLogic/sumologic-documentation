---
id: create-email-alert
title: Create a Scheduled Search Email Alert
description: Learn how to create and customize Scheduled Search Email Alerts.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can set a scheduled search to alert you with an email when a set of conditions are satisfied. A maximum of 120 emails are sent per day per scheduled search.

## Prerequisites

Before creating an email alert, you'll first need to [create a scheduled search](schedule-search.md). Then follow the below steps.

## Create a scheduled search email alert

1. Under **Alert condition**, select **Send Notification**.
   * **Every time a search is complete.** Select this option if you want an email with search results every time the search is run (depending on the frequency, you could get an email every 15 minutes, every hour, or once a day).
   * **If the following condition is met**. Select this option if you'd like to set up a scheduled search that alerts you to specific events.
   * **Number of results.** Depending on the search, set a condition to receive an email by the number of results. If your saved search returns log messages, then the alert will use the number of messages you specify. If your query produces aggregate results, the alert will use the number of rows or aggregates (or groups) and will not trigger based on the number of raw results. For more control of your query, you can build in a threshold (for example `| where _count\> 30`)  into the Search itself and set the alerts condition here to Greater than 0. That way the query will generate results if the expected condition is met.
     * **Equal to.** Choose if there is an exact number of records in a search result at which you want to be notified.
     * **Greater than.** Choose if you want to be notified only if the search results include greater than that number of messages or groups you set in the text box.
     * **Greater than or equal to.** Choose if you want to be notified only if the search results include greater than or equal to that number of messages or groups you set in the text box. For example, to ensure you're notified only when the specific query conditions are met, set the **Number of results** condition to greater than 0.
     * **Fewer than.** Choose if you want to be notified only if the search results include fewer than that number of messages or groups you set in the text box.
     * **Fewer than or equal to.** Choose if you want to be notified only if the search results include fewer than or equal to that number of messages or groups you set in the text box.
1. Under **Alert Type**, select **Email**.
1. **Send email on failure to search owner.** Selecting this option will send an email notification to the search owner if the Scheduled Search fails to run. To troubleshoot a failed Scheduled Search, see [Why would a Scheduled Search fail?](/docs/alerts/scheduled-searches/faq#why-would-a-scheduled-search-fail) and [What Happens when a Scheduled Search is Suspended?](/docs/alerts/scheduled-searches/faq#what-happens-when-a-scheduled-search-is-suspended).
1. **Recipients**. Enter the recipients of your scheduled search email. Separate multiple email addresses with commas.
1. **Email Subject.** Provide a subject for the email. You can use alert variables to customize the subject of your email.
1. **Include in email.** Select the features you want to include in your email results:
    * **Search Query.**
    * **Result Set.**
    * **Histogram.**
    * **Results as a CSV attachment.** The maximum CSV file size allowed is 5 MB or 1,000 results. 
1. Click **Save** to add the search to the **Library**. The columns in an alert email are alphabetically ordered. To set the column order in the email alert, you can use the [`fields`](/docs/search/search-query-language/search-operators/fields) operator in your query.

### Rules

* A maximum of 120 emails are sent per day per scheduled search.
* The columns in an alert email are alphabetically ordered. To set the column order in the email alert, you can use the [`fields`](/docs/search/search-query-language/search-operators/fields) operator in your query.
* An email address will be denylisted for six hours after receiving a bounce notification. When an email address is denylisted no emails are sent to the address.
* The metadata field `_messageTime` needs to remain in UNIX format.

### Alert variables

See [Alert Variables](/docs/alerts/monitors/alert-variables) for more information and examples of variables to use in your email alerts.


## Scheduled Search email alert results

:::note
A maximum of 100 emails are sent per day per scheduled search.
:::

There are three ways to receive the results of Scheduled Searches in email:

### Scheduled email

Provides a summary of the search results every time a scheduled search is run. The subject of this email is **Search Results**. No matter what the results of the search, you'll receive an email.

Email notifications are sent to the recipient email address(es) based on the notification parameters. For queries returning high numbers of messages or group results, the email notification contains a representative sample of the first 25 messages or groups. **Most Recent Results** also **displays** the number of remaining results available, which you can view in Sumo Logic with a click.

### Alert email

Set up Alert Conditions if you'd rather just receive an alert email when certain conditions are met. This means you'd get an automated alert when or if parameters you set are triggered, based on the results of the scheduled search. For example, you could set up an alert if a certain number of users visit the free trial URL of your website. You can [run a search from this email](#run-a-search-from-an-alert-email) when you receive it.

You can be very specific with the alert condition — you can even set an exact number of results that triggers the email. Results can either be the number of log messages *OR* the number of aggregates returned by the saved search. If your saved search returns log messages, then the alert will use the number of messages you specify. If your query produces aggregate results, the alert will use the number of aggregates (or groups).

#### Run a search from an alert email

You can run a search directly from an alert email. When you receive an email created by an email alert in a Scheduled Search, only the first 25 results are displayed. (We do not want to flood your email with hundreds of thousands of search results.)

Do either of the following:
* To make changes to the search query before you run it again, click the saved search title link, next to **Saved Search**. This will open the query in the Sumo Logic search page. 
* To see all the results of the search, under **Message Distribution**, click the **View results in Sumo Logic** link in the email. Or under **Aggregation**, click "**here**". Sumo Logic will recreate the search exactly matching the query and time parameters of the original scheduled search.

![Search from email](/img/alerts/search_from_email_new.png)

:::note
If you're a new user and someone has forwarded you an alert email, the links to the search will not work until you've completed your setup process.
:::

## Customize your email alert subject and content

You can use variables to customize the subject of your email. You can also select the features you want to include in your email. For details, see [Create a Scheduled Search Email Alert](create-email-alert.md).

:::note
The columns in an alert email are alphabetically ordered. To set the column order in the email alert, you can use the [`fields`](/docs/search/search-query-language/search-operators/fields) operator in your query. 
:::

## Email alert template

The Scheduled Search Email Alert template includes the following details:

* **Saved Search.** Title of the saved search. 
* **Description.** Description of the saved search. 
* **Search String.** The search query of the saved search. 
* **Time Range.** The time range that the saved search is set to use. 
* **Run Frequency.** The frequency that the saved search is set to run. 
* **Notification Threshold.** The alert condition that the saved search is set to use.
* **Run At.** The time that the saved search has run.  
* **Scheduled By.** The name and email of the person who scheduled the saved search to run. 
* **Message Distribution.** Displays the message distribution of the saved search results in a column chart histogram on a timeline. Click to **View results in Sumo Logic**. 
* **Aggregation.** Displays the first 25 messages of the search results, and includes the complete number of results. Click "**here**" in the email to view the full results in Sumo Logic. 
* **Results as CSV attachment.** If you have selected to receive your scheduled search results as a CSV file, it will be attached to the email. The maximum CSV file size allowed is 5MB or 1,000 results. 

![Search from email](/img/alerts/search_from_email_new.png)

:::note
Rarely, there may be circumstances that prevent the histogram from loading fast enough to be included with the email before it is sent. In that case, you will receive an email with all pertinent information, just without the graph.
:::
