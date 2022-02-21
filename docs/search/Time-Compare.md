---
id: time-compare
---

# Time Compare

## Time Compare Button

The **Time Compare** button becomes available in the **Aggregates** tab
when you run an aggregate search, and allows you to run a compare
operation automatically from your search results.

The Time Compare button uses the [compare
operator](./Time-Compare.md "Time Compare") automatically in a query
with a click. The compare operator allows you to compare current search
results with data from a past time period for aggregate searches.
Compare can only be used in aggregate searches that use operators like
avg, count, pct, or sum. (For complete details, refer to
[Group](Search-Query-Language/aaGroup.md "Group or Aggregate Operators")).

You can use Time Compare to:

-   Evaluate the performance metrics of a website, such as the latency
    or the number of exceptions, before and after a deployment.  
-   Track the root cause of a production issue quickly by tracking
    specific keywords, such as memory exceptions, and comparing them
    with historic data to find any anomalous trends.
-   Compare the daily active or weekly active users on your website for
    strategic business insights.
-   Identify malicious activity or attacks by comparing failed login
    attempts against past averages.

Use the compare operator in the following ways:

-   Compare with a single time period in the past.
-   Compare with multiple time periods in the past.
-   Compare with an aggregate over multiple time periods in the past.

By default, results are displayed in the **Aggregates** tab on the
search page in a table. Each column of the output table contains results
from one of the specified queries. The first column is the field being
grouped by which contains results from the present time (or the time
range specified in the time range field). Additional columns are
suffixed by the timeshift (the period shifted back in time) of the
queries. From here, you can select a chart type to display results
visually.

For example, if you were doing a comparison with yesterday, when you use
the compare operator after the count operator, the aggregation table
results will display the column names **\_count **and **\_count_1d**.

You can also customize the prefix for a query by specifying an alias.
(See the [Advanced](./Time-Compare.md "Time Compare") section for
details.)

### Default Time Compare

Click the **Time Compare** button to run the default timeshift
comparison of 1 day. Or select another timeshift comparison from the
menu.

![time compare UI option aug 24
2021.png](./static/img/Time-Compare/time%20compare%20UI%20option%20aug%2024%202021.png)

The comparison results appear in a new column titled with the timeshift.

![timecompare results aug 24
2021.png](./static/img/Time-Compare/timecompare%20results%20aug%2024%202021.png)

### Custom Time Compare

To create a custom Time Compare, select Custom from the menu, then make
your selections in the Custom Time Compare query builder dialog.

You can retrieve time-shifted data up to the last 40 days. We do not
support going back further in time.

![CustomTimeCompare.png](./static/img/Time-Compare/CustomTimeCompare.png)

1.  Compare this query to a **\[number\] \[hour, day,
    week\]** historical timeshift.
2.  With **\[number\]** time period(s). If the number is bigger than 0:
3.  Using **\[Individual, Average, Min, or Max\] **historical results.
    1.  Individual - displays each time comparison separately, for
        example, on a different line.
    2.  Average - takes the average of your historical comparisons.
    3.  Min - takes the minimum of your historical comparisons.
    4.  Max - takes the maximum of your historical comparisons.
4.  Click **Run**.

For example, if you wanted to compare the behavior of backfill errors on
continuous queries over the last seven days, use the following query:

`backfill error | timeslice by 1m | count _timeslice`

Do not alias timeslice as we're going to use the compare operator.

Then, from the **Time Compare** button, select **Custom**, and set
the **Custom Time Compare** dialog settings to:

![7TimePeriod.png](./static/img/Time-Compare/7TimePeriod.png)

From the results in the **Aggregates** tab, you can select the line
chart icon, and display your results as:

![compare example.png](./static/img/Time-Compare/compare%20example.png)

For more compare operator examples, see
[Examples](./Time-Compare.md "Time Compare").

## Compare vs. LogCompare

The compare and [logcompare](LogCompare.md "LogCompare") operators are
very similar in syntax and functionality, but they handle different
types of data:

-   **compare** is used for aggregated numeric data (e.g., for analyzing
    results from a [group by](Search-Query-Language/aaGroup.md "Group")
    query or a query with aggregation operators such as count, sum, avg,
    etc. )
-   **logcompare** is used for log signature counts (used right after
    the first pipe).

## Compare Operator

The compare operator allows you to compare current search results with
data from a past time period for aggregate searches. Compare can only be
used in aggregate searches that use operators like avg, count, pct, or
sum. (For complete details, refer to
[Group](Search-Query-Language/aaGroup.md "Group or Aggregate Operators")).
It will also work with outlier, timeslice, and transpose.

If you want to use compare with timeslice, do not alias timeslice.

### Syntax

#### Single Comparison

Compare the present results with a single time period in the past. To
make the comparison, specify the time interval you want to go back, in
the form of number and time granularity:

-   `... | compare timeshift\<number\<time granularit\>`

The following query returns data from the present, along with results
from yesterday. Here the parameter `1d` specifies the time interval we
want to go back to get the data for the comparison.

`... | compare timeshift 1d`

This comparison can be displayed visually as:

![](./static/img/Time-Compare/../../Assets/Media_Repo_for_Search/compare_single_diagram.png)

In another example, this query returns data from the present along with
results from last week.

`... | compare timeshift 1w`

#### Multiple Comparison

Compare the present results with multiple time periods in the past. The
first parameter specifies the time interval between the present query
and the most recent comparison point. The second parameter specifies how
many comparison points to create.

-   `... | compare timeshift�\<number\<time granularit\>\<number of timeshift\>`

The following query returns results from the present, along with results
from every day of the past week. The first parameter, 1d, specifies the
interval between the points of comparison, and the second parameter, 7,
specifies the number of comparisons.

`... | compare timeshift 1d 7`

Which can be displayed visually as:

![](./static/img/Time-Compare/../../Assets/Media_Repo_for_Search/compare_multiple_diagram.png)

The following query returns result from the present with results from
the same day in the last 3 weeks. So if today is Monday, then this query
will show a result for today and the last three Mondays.

`... | compare timeshift 1w 3`

#### Aggregate Comparison

Aggregate the results from multiple past time periods using an
aggregation operator (avg, min, or max).

-   `... | compare timeshift�\<number\<time granularit\>\<number of shifts�\<avg/min/ma\>`

The following query returns results from the present along with the
average of the results from the last five days:

`... | compare timeshift 1d 5 avg `

Which can be displayed visually as:

![](./static/img/Time-Compare/../../Assets/Media_Repo_for_Search/compare_aggregate_diagram.png)

Other examples:

Maximum of the same day for last three weeks.

`... | compare timeshift 1w 3 max`

Minimum of the last four six-hour intervals

`... | compare timeshift 6h 4 min`

#### Advanced

You can also do multiple different comparisons queries under the same
compare operator by using multiple timeshift phrases separated by
commas.

-   `... | compare\<comparison \>,\<comparison \>, ...`

For example:

`... | compare timeshift 12h, timeshift 1d 3 avg, timeshift 1w`

You can specify an alias, and the columns generated use the name you
specify.

-   `... | compare\<compariso\> as\<alia\>`

For example:

`... | compare timeshift 1d as yesterday, timeshift 1w 4 as last_four_weeks`

### Rules

-   The compare operator must follow a group by aggregate operator, such
    as: count, min, max, or sum.
-   If you want to use timeslice with compare, do not alias timeslice.

### Limitations

-   Compare cannot generate more than **seven** additional queries. An
    additional query is generated whenever a comparison in time is
    initiated. Note that multiple comparisons and aggregate comparisons
    will generate multiple queries. For example, the following queries
    are not allowed:

`... | compare timeshift 1d 14 `

This query compares with the past 14 days data. It is not allowed as it
generates 14 queries. 

`... | compare timeshift 1d 5 avg, timeshift 1w  4 `

This query compares with the last five days, and the same day for the
last four weeks. It is not allowed as it generates 9 queries. 

-   Duplicate aliases are not allowed. For example, the following query
    is not allowed:

`... | compare timeshift 1d 7 as last_week, timeshift 1d 7 avg as last_week`

-   Real time queries using time compare need to have at least three
    timeslices within its time range. For example, if the time range is
    10 minutes, your timeslices need to be no longer than 3 minutes so
    that there are at least three of them.
-   Compare is not supported in Scheduled Views.
-   Compare can only be used once in a search query.

## Examples

### Compare time series data with past data

Use compare to analyze the change in log counts between two days.

`error | timeslice by 1h | count by _timeslice | compare timeshift 2d`

The query returns results from both today and two days ago, with each
day in its separate column. (Today's results are represented by
\_count.)

![Count-2d.png](./static/img/Time-Compare/Count-2d.png)

Create a line chart to visualize the results.

![count-2dLineChart.png](./static/img/Time-Compare/count-2dLineChart.png)

Using the multiple comparison feature, you can compare the number of
logs against every ten minutes of the past hour:

`_sourceHost = prod | timeslice by 1m | count by _timeslice | compare timeshift 10m 5`

Each ten-minute period produces its own column in the output table:  
![tenminute.png](./static/img/Time-Compare/tenminute.png)

Create a line chart to visualize the results.  
![TenMinuteLIneChart.png](./static/img/Time-Compare/TenMinuteLIneChart.png)

Alternatively, you can compare against the average of all the ten minute
periods:

`_sourceHost = prod | timeslice by 1m | count by _timeslice | compare timeshift 10m 5 avg`

![TenMinAvg.png](./static/img/Time-Compare/TenMinAvg.png)

Create a line chart to visualize the results.  
  
![TenMinAvgLineChart.png](./static/img/Time-Compare/TenMinAvgLineChart.png)

### Compare categorical data parsed from logs

Use compare to analyze the change in delays on different \_sourceHosts
using parsed data from logs.

`"delay:" | parse "delay: *" as delay | avg(delay) as average_delay_in_millis by _sourceHost | compare timeshift 30m`

This example computes the average delay per \_sourceHost, and compares
with results from 30 minutes ago.

![DelayAvg.png](./static/img/Time-Compare/DelayAvg.png)

These results would create a line chart such as the following.

![DelayLineChart.png](./static/img/Time-Compare/DelayLineChart.png)

### Compare after a Transpose operation

You can use the compare operator after a transpose operation, such as
the following:

`_sourceCategory=analytics | timeslice 1m | count by _timeslice, _sourceHost | transpose row _timeslice column _sourceHost as %"nite-analytics-1", %"nite-analytics-2" | compare with timeshift 15m`

## Create an Email Alert

You can use the compare operator to create scheduled search email
alerts.

For example, if you want to be alerted if there is a 15% spike in login
failures compared to the average of the last seven days, you could use
the following query:

`_sourceCateogy=WebserverLogs "Bad username or password" | timeslice 30m | count _timeslice | compare timeshift 1d 7 avg | abs(_count - _count_7d_avg )/ _count_7d_avg as percentOver | where percentOver\> 0.15`

You can then use this query to build the scheduled search email alert.

1.  On the Search page, under the query box, click **Save As**.
2.  Click **Schedule this search**.
3.  For **Run frequency**, select the time period at which you want to
    schedule this search. For this alert, we have selected **Every 2
    Hours**.  
    ![Save Item.png](./static/img/Time-Compare/Save%20Item.png)
4.  For **Send notification**, select **if the following condition is
    met**.
5.  For **Alert condition**, select **Greater than \>,** and
    for **Number of results **enter **5**.
6.  For **Alert Type**, select **Email**.
7.  Enter the email address you want the alert email to go to.
8.  Click **Save**.

You will now be notified if there is a spike in login failure.  

 
