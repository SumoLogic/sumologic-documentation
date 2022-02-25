---
id: about-logcompare
---

# About LogCompare

LogCompare allows you to compare a section of your log messages from one point in time with the same section at another point in time, and display the changes in patterns. For example, you could use LogCompare to determine if your last software deployment has broken something. Or it could help you determine what was different in your log stream right before and during a failure compared to a normal period.  LogCompare could also be helpful in finding the cause of a security event.

To use LogCompare, run a search query with non-aggregate results, then click the **LogCompare** button in the **Messages** tab. This automatically compares the current query result with the result of the same query 24 hours in the past to show what has changed.

To do this, LogCompare creates a baseline query and compares it to a new target query by applying the logcompare operator to the current result. For example, a 24-hour LogCompare, which is the default time shift, allows you to pinpoint the major changes in your log messages compared to the same time on the previous day.

![LogCompare.png](/img/search/logcompare/logcompare.png)

LogCompare reports the variance between the baseline and the target, allowing you to see the change in patterns of log messages over time.
This way, you can compare log messages from today with the same time range from yesterday, and see the percentage of changes in your log message clusters, as well as new clusters that have appeared, and clusters that are now gone.

![LogCompareCount.png](/img/search/logcompare/logcomparecount.png)

You can also use the arrow to the right of the **LogCompare** button to select a different time shift from the menu, such as **7 Days**, which is useful if your log stream has a weekly pattern.

![Menu.png](/img/search/logcompare/menu.png)

Or you can create a **Custom LogCompare** time shift, which allows you to compare the behavior of a single node to a group or cluster, or to one group against another. In the **Custom LogCompare** dialog you can specify the target and baseline query parameters independently, including query strings and their time ranges. The baseline is independent of the time range or the keywords used in the query.

Depending on the time range you have selected for the search, the LogCompare operation may take a long time to complete, due to the multiple operations it is performing. For this reason, we suggest that you select as small a time range as practical.

If the baseline query does not finish within two hours, it will timeout.
