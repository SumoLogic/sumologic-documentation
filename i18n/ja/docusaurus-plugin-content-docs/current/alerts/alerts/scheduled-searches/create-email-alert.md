---
id: create-email-alert
title: Create an Email Alert
sidebar_label: Create an Email Alert
description: Create a Scheduled Search Email Alert.
---

## Create a scheduled search email alert

1. First, create a scheduled search. See [Schedule a Search.](schedule-search.md).  Then, follow the below steps to create an email alert.
1. **Alert condition. **Select** Send Notification:**

   * **Every time a search is complete.** Select this option if you want an email with search results every time the search is run (depending on the frequency, you could get an email every 15 minutes, every hour, or once a day).
   * **If the following condition is met**. Select this option if you'd like to set up a scheduled search that alerts you to specific events.
   * **Number of results.** Depending on the search, set a condition to receive an email by the number of results. If your saved search returns log messages, then the alert will use the number of messages you specify. If your query produces aggregate results, the alert will use the number of rows or aggregates (or groups) and will not trigger based on the number of raw results. For more control of your query, you can build in a threshold (for example `| where _count\> 30`)  into the Search itself and set the alerts condition here to Greater than 0. That way the query will generate results if the expected condition is met.

     * **Equal to.** Choose if there is an exact number of records in a search result at which you want to be notified.
     * **Greater than.** Choose if you want to be notified only if the search results include greater than that number of messages or groups you set in the text box.
     * **Greater than or equal to.** Choose if you want to be notified only if the search results include greater than or equal to that number of messages or groups you set in the text box. For example, to ensure you're notified only when the specific query conditions are met, set the **Number of results** condition to greater than 0.
     * **Fewer than.** Choose if you want to be notified only if the search results include fewer than that number of messages or groups you set in the text box.
     * **Fewer than or equal to.** Choose if you want to be notified only if the search results include fewer than or equal to that number of messages or groups you set in the text box.

1. **Alert Type**. Select **Email**.
1. **Send email on failure to search owner.** Selecting this option will send an email notification to the search owner if the Scheduled Search fails to run. To troubleshoot a failed Scheduled Search, see [Why Would a Scheduled Search Fail](faq.md#why-would-a-scheduled-search-fail) and [What Happens When a Scheduled Search Is Suspended](faqs/suspended-scheduled-search.md).
1. **Recipients**. Enter the recipients of your scheduled search email. Separate multiple email addresses with commas.
1. **Email Subject.** Provide a subject for the email. You can use alert variables to customize the subject of your email.
1. **Include in email.** Select the features you want to include in your email results:

    * **Search Query.**
    * **Result Set.**
    * **Histogram.**
    * **Results as a CSV attachment.** The maximum CSV file size allowed is 5 MB or 1,000 results. 

1. Click **Save** to add the search to the **Library**.** The columns in an alert email are alphabetically ordered. To set the column order in the email alert, you can use the [fields](/docs/search/search-query-language/search-operators/fields) operator in your query.

### Rules

* A maximum of 120 emails are sent per day per scheduled search.
* The columns in an alert email are alphabetically ordered. To set the column order in the email alert, you can use the [fields](/docs/search/search-query-language/search-operators/fields) operator in your query.
* An email address will be denylisted for six hours after receiving a bounce notification. When an email address is denylisted no emails are sent to the address.
* The metadata field `_messageTime` needs to remain in UNIX format.

## Alert Variables

See [Alert Variables](/docs/alerts/monitors/alert-variables) for more information and examples of variables to use in your email alerts.

 
