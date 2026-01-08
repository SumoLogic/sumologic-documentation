---
id: run-search-from-alert-email
title: Run a Search from an Alert Email
sidebar_label: Run a Search from an Alert Email
description: You can run a search directly from an Alert Email.
---

When you receive an email created by an [Email Alert](create-email-alert.md)  in a Scheduled Search, only the first 25 results are displayed. (We do not want to flood your email with hundreds of thousands of search results.)

**Do either of the following:**

* To make changes to the search query before you run it again, click the saved search title link, next to **Saved Search**. This will open the query in the Sumo Logic search page. 
* To see all the results of the search, under **Message Distribution**, click the **View results in Sumo Logic** link in the email. Or under **Aggregation**, click "**here**". Sumo Logic will recreate the search exactly matching the query and time parameters of the original scheduled search.

![Search from email](/img/alerts/search_from_email_new.png)

:::note
If you are a new user and someone has forwarded an alert email, the links to the search will not work until you've completed your setup process.
:::
