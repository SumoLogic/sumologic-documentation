---
id: create-a-logcompare-email-alert
---

# Create a LogCompare Email Alert

With LogCompare, you can create a Scheduled Search that will send an
email alert when certain conditions are met. For example, you can be
alerted when new signatures are found.

To do this, use a search query such as:

`error | ``logcompare`` timeshift -24h | where (_isNew)`

Then to create the alert, save and schedule your search query.

To prevent gaps in your LogCompare results, configure the **time range**
of your Scheduled Search to be a little longer than the frequency of
your search. For example, if you configure the search to run every 4
hours, the time range you select when you configure the Scheduled Search
should be **-4h30m**.

When selecting the time range of your search, keep in mind:

-   With a smaller time range, more emails will be generated, unless you
    configure it so that an email is only sent when there are results.
-   When the time range is smaller, the LogReduce results are also less
    accurate. For example, if you were to use a 1s time range, any new
    signature information would likely be useless.
-   The larger the time range, the longer it takes for the email alert
    to be generated.

By default, LogCompare email notifications provide details on the
**Score**, **Count**, and **Signature**, as shown in the following email
example. This is not configurable.

![](../static/img/LogCompare/Create-a-LogCompare-Email-Alert/../../../Assets/Media_Repo_for_Search/logcompare_email_alert.png)

## Create a LogCompare scheduled search and email alert

1.  On the **Search** page, enter your logcompare query. For example:  
    `error | ``logcompare`` timeshift -24h | where (_isNew)`
2.  Below the search field, click **Save As**.  
    ![NewSignatures.png](../static/img/LogCompare/Create-a-LogCompare-Email-Alert/NewSignatures.png)
3.   In the **Save Search As** dialog, for **Search name**, enter a name
    for your Saved Search. This example uses **New Signatures**.
4.  (Optional) If you'd like, type an optional description to help you
    identify this search.
5.  Choose a **Time Range** option that will be the default range when
    you run the saved search. (To prevent gaps in your LogCompare
    results, the time range should be a bit longer than the frequency at
    which your search is run.)
6.  Click **Schedule this search**. The **Schedule this search** dialog
    opens.  
    ![SaveLogreduce.png](../static/img/LogCompare/Create-a-LogCompare-Email-Alert/SaveLogreduce.png)
7.  For **Run Frequency**, select the frequency you would like your
    search to run. The frequency should match the time range.
8.  For **Time range for scheduled search**, again, select a time range
    that matches the frequency.
9.  For **Alert condition** select **Send notification every time upon
    search completion**.
10. For **Alert Type**, select **Email**.
11. Under **Recipients**, enter your email.
12. Click **Save** to add the search to the **Library**.
