---
id: run-logcompare
---

# Run LogCompare

You can run a LogCompare operation using a timeshift that is
preconfigured, or create a custom timeshift for your search. When you
click the **LogCompare** button, the default is a 24-hour timeshift.

### Run a Preconfigured LogCompare

1.  Enter a keyword to search for and press **enter** or
    select **Start**. For example: `error`

2.  Select a time range for your search. For this example, we’ve
    used **Last Minute**.

3.  When the **Messages** tab displays with the initial results, click
    **LogCompare** to run the query immediately or use the menu to
    select a different time shift.

4.  The ` logcompare` operator and `timeshift -24h` are added to your
    query, for example: 

    `error | logcompare timeshift -24h`

5.  Results appear in the **Signatures** tab.

### Run a Custom LogCompare

1.  Enter a keyword to search for and press **enter** or
    select **Start**. For example:   
      
    `_sourceCategory=stream`  
     
2.  Select a time range. For this example, we’ve used **Last Minute**.
3.  When the **Messages** tab displays with the initial results, click
    the arrow next to the **LogCompare** button, and from the menu
    select **Custom**.  
    ![logcompare_custom.png](../static/img/LogCompare/Run-LogCompare/../../../Assets/Media_Repo_for_Search/logcompare_custom.png)
4.  In the **Custom LogCompare** dialog, you can edit:

-   **Baseline Query.** The original query.
-   **Time Shift.** This is the Time Shift of the Baseline Query, and it
    controls when the Baseline Query runs. If the Time Shift is -2d,
    that means that it will run for the exact Time Range duration (1
    minute, in this query), but two days in the past.
     The Time Shift can take a single value, such as -2d, or it can take
    a range. It must be a valid range, with a start date older or
    smaller than the end date.
-   **Target Query.** Originally, the Target Query is the same as the
    Baseline Query. But you can edit it to compare against a new target.
    Here we’ve added   
    `_sourceCategory=analysis` to compare it to`_sourceCategory=stream`.
-   **Time Range.** The Time Range pertains to both the Target Query and
    the Baseline Query. You can enter a preconfigured, relative, or
    absolute time range, similar to the time range on the Search page.
    The Time Range can be specified by timeshift (start_time = now -
    timeshift) or (start_time + end_time).
    -   For the target, if the end_time is not specified, it is
        implicitly set to now if not specified.
    -   For the baseline, if the end_time is not specified, it is
        implicitly set as: (end_time = start_time + range_length.) The
        (range_length = end_time - start_time) using the target times.

1.  Click **Run**.
2.  The logcompare operator, timeshift, and baseline are added to your
    query, for example:   
      
    `_sourceCategory=analysis | logcompare timeshift -2d baseline (_sourceCategory=stream)`  
     
3.  Results appear in the **Signatures** tab.

#### Time Shift versus Time Range example

This example provides meaning to what a **Time Shift** is compared to a
**Time Range** when configuring a custom LogCompare search.

Take the following query with a **Time Range** of `-1d` where today is
November 10, 2018 (11/10/2018) and with a **Time Shift** of `-30d`:

`_sourceCategory=prod/* "error: 400" | logcompare timeshift -30d`

This query will run a current (target) search on the past
day, 11/09/2018 to 11/10/2018, and also run a baseline (historical)
search on 10/10/2018 to 10/11/2018, 30 days ago with a one day time
range, to then compare the log signatures from each search.

A query like the following with a **Time Range** of `-30d` where today
is November 10, 2018 (11/10/2018) and with a **Time Shift** of `-1d`:

`_sourceCategory=prod/* "error: 400" | logcompare timeshift -1d`

will run a current (target) search on the past 30 days, 10/11/2018 to
11/10/2018, and also run a baseline (historical) search on 10/10/2018 to
11/09/2018, one day shifted into the past with a 30 day time range, to
then compare.
