---
id: compare
---

# Compare

The compare operator can be used with the **Time Compare** button in the
Sumo interface, which automatically generates the appropriate syntax and
adds it to your aggregate query. See [Time
Compare](../../...md "https://help.sumologic.com/05Search/Time-Compare")
for details. The following information can also be found documented in
Time Compare.

You can use compare to:

* Evaluate the performance metrics of a website, such as the latency
    or the number of exceptions, before and after a deployment.  
* Track the root cause of a production issue quickly by tracking
    specific keywords, such as memory exceptions, and comparing them
    with historic data to find any anomalous trends.
* Compare the daily active or weekly active users on your website for
    strategic business insights.
* Identify malicious activity or attacks by comparing failed login
    attempts against past averages.

Use the compare operator in the following ways:

* Compare with a single time period in the past.
* Compare with multiple time periods in the past.
* Compare with an aggregate over multiple time periods in the past.

By default, results are displayed in the ****Aggregates**** tab on the
search page in a table. Each column of the output table contains results
from one of the specified queries. The first column is suffixed with the
keyword ****target****, appended to the original column name, and
contains results from the present time (or the time range specified in
the time range field). Additional columns are suffixed by the timeshift
(the period shifted back in time) of the queries. From here, you can
select a chart type to display results visually.

For example, if you were doing a comparison with yesterday, when you use
the compare operator after the count operator, the aggregation table
results will display the column
names ****count_target ****and ****count_1d****.
\<div class="mt-contentreuse-widget" page="05Search/Time-Compare"
section="Compare Operator" show="false\>
\</di\>
\<div class="mt-contentreuse-widget" page="05Search/Time-Compare"
section="Examples" show="true\>
\</di\>

 
