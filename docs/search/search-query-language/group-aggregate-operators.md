---
id: group-aggregate-operators
title: Group or Aggregate Operators
description: Evaluate messages and place them into groups.
---

Aggregating (group-by) functions evaluate messages and place them into groups. The group operator is used in conjunction with group-by functions.

Only search results that have been aggregated using a group or aggregate operator can be placed on a dashboard panel. See [Chart Search Results](/docs/search/get-started-with-search/search-basics/chart-search-results) for information about charting.

## Overview

When using any grouping function, the word **by** is sufficient for representing the group operator. The typical construction when using group-by functions is:

```sql
grouping_function by <fieldname>
```

:::important
The **`withtime`**, **`most_recent`**, and **`least_recent`** operators are not considered standalone operators; they are designed to only be used as an alternative to the [first and last operators](/docs/search/search-query-language/group-aggregate-operators#first-last) in Live Dashboards or any continuous query where first and last are not supported.
:::

By default, the ordering is not defined inside of groups created using a group-by expression. To order your results, use the [**sort**](/docs/search/search-query-language/search-operators#sort) operator.

### Syntax

* `... | group_by_function <field_to_operate_on> group by <field_to_group_by>[, <field2>, ...]`

You can use **by** instead of **group by** so `count group by user` is equivalent to `count by user`.

### Rules

* Cannot be used with the [LogReduce](/docs/search/logreduce) operator.
* When [parsing and naming (aliasing) fields](docs/search/search-query-language/parse-operators/parse-field-option.md), avoid using the names of grouping functions or other operators as field names.
* When using **count**, or any grouping function, remember to include the underscore before the field name (sort by `_count`).
* Multiple **aggregation** functions can be on the same line but you can't include another function, such as a math function, on the same line of a query.

For example, you can't use:

```sql
... | avg(x + y) as average, sum(x+y) as total
```

You would need to do that in two separate steps, such as:

```sql
... | x + y as z | avg(z) as average, sum(z) as total
```

In another example, you can't use:

```sql
avg(abs_latency)/1000/60 as avg_latency_min
```

Instead, you'd need to use two separate lines:

```sql
avg(abs_latency_ms) as avg_latency_ms
| avg_latency_ms / 1000 / 60 as avg_latency_min
```

### Examples

```sql title="Sort by _count and limit to 10 results"
* | parse "GET * " as url 
| count by url 
| sort by _count 
| limit 10
```

```sql title="Count by user"
status AND down 
| parse regex "user=(\<use\>.*?)"
| parse regex "host=(\<msg_hos\>.*?)"
| count by user
```

```sql title="Count by the Source IP address"
_sourceCategory=apache 
| parse "* " as src_ip
| parse "GET *" as url
| count by src_ip
| sort by _count
```


```sql title="Group by multiple fields"
| count(field1), avg(field2) group by field1, _timeslice
```


```sql title="Use multiple aggregate operators"
| max(amount) as amount_max, count(datetime) as datetime_count, sum(_size) as messages_size_sum, last(query) as last_query
```

All Sumo Logic system-generated fields begin with an underscore (`_`). Group-by functions always create a Sumo Logic field named with a combination of an underscore (`_`) and the function name. Using the function **`count`** inserts a field into the pipeline called `_count`. The function **`count_distinct`** inserts a field into the pipeline called `_count_distinct`.


## avg

The averaging function (avg) calculates the average value of the numerical field being evaluated within the time range analyzed.

#### Syntax

```sql
avg(<numerical_field>) [as <field>] [by <field>]
```

#### Rules

* Creates field named `_avg`

#### Examples

#### Parse milliseconds and calculate average

This example query parses the number of milliseconds and calculates the average across the search time range.

```sql
_sourceCategory=app
| parse "time taken: * ms," as time
| avg(time) as avg_time
```

An example snippet from a log would like this:  `time taken: 21 ms,` where the value parsed from `time taken` would be 21, which in this case is in milliseconds.

The average operator would calculate against all parsed values and return the average, which would be returned in the **Aggregates** tab as a number, such as 50.

![avg results](/img/search/searchquerylanguage/group-aggregate-operators/avg-results.png)

#### Use Aggregate in Query

This example shows you how to use more than one aggregate operator like avg in a query. This is useful when you need to calculate the average of more than one field.

When multiple aggregates are used you need to create an alias using the as operator so they each get a unique field name. For example,

```sql
| avg(time) as avg_time, avg(_size) as logSize
```


## count, count_distinct, count_frequent

Aggregating (group-by) functions are used in conjunction with the group operator and a field name.

Only the word **by** is required to represent the group operator. The count function is also an operator in its own right, and therefore can be used with or without the word **by**.

#### count

Counts the total number of logs that match the keyword search within the time range analyzed.

#### Syntax

```sql
count[(<field>)] [as <field>] [by <field>, ...]
```

#### Rules

* Default alias field is named `_count`
* The entire [_raw](/docs/search/get-started-with-search/search-basics/built-in-metadata) message is counted when no field to count is provided.

#### Examples

To count the number of logs:

```sql
| count
```

To count the number of logs from a specific field, in this example the field is `port`:

```sql
| count(port)
```

To count the number of logs from a specific field based on grouping by other fields: 

```sql
| count(port) by srcAddress, tgtAddress
```

The same example above with an alias field name, `countOfPort`, and an additional aggregate operator, `avg`:

```sql
| count(port) as countOfPort, avg(bytes) by srcAddress, tgtAddress
| sort by countOfPort
```

When you want to count more than one field, you must create an alias using the [as operator](/docs/search/search-query-language/search-operators#as-operator) to rename the `_count` fields.

#### count_distinct

Counts only distinct occurrences of the value of a field being counted within the time range analyzed.

An empty value still counts as a unique value and will be counted.

#### Syntax

```sql
count_distinct(<field>) [as <field>] [by <field>, ...]
```

#### Rules

* Creates field named `_count_distinct`

#### Examples

```sql
| count_distinct(username) group by hostname
```

```sql
_sourceCategory=*apache*
| parse "* -" as src_ip
| count_distinct(src_ip)
```

By default, ordering is not defined inside of groups created using a group-by expression. To order your results, use the [**sort**](/docs/search/search-query-language/search-operators#sort) operator.

If the number of distinct items returned is less than 100, the **count_distinct** function provides an exact number. If the number of distinct items returned is larger than 100, **count_distinct** instead uses an approximate algorithm, and displays a message that explains: `count_distinct saw more than 100 values, results may be approximate`

The approximation algorithm uses a relative error parameter of 2%, for example:

* 65% of the time, results are within +/- 2%.
* 95% of the time, results are within +/- 4%.
* 99% of the time, results are within +/- 6%.

So for example, if the true count of distinct items is 1,000, the result returned by the approximation algorithm is between 950 and 1050 about 95% of the time.

The error parameter value is important to making the **count_distinct** function return results quickly and in a scalable way.

Also, note that when you want to count the distinct occurrences of more than one field, you must create an alias using the [as operator](/docs/search/search-query-language/search-operators#as-operator) to rename the _count_distinct fields. See this example:

```sql
_sourceCategory=PaloAltoNetworks
| count_distinct(threatid) as cntthreatid, count_distinct(repeatcnt) as cntrepeatcnt
```

#### count_frequent

The count_frequent function can be used in cases where you want to identify the most common values for aggregations with over 10,000 distinct groups. This query returns the highest-count 10,000 results in sorted order. The resulting count field is called `_approxcount` because it is only an *estimate* of the true count; the estimate may be incorrect, but can only be over (it will never be under).

The count_frequent function is followed immediately by one or more field names.

You can use the count_frequent operator in Dashboard queries, but the number of results returned is limited to the top 100 most frequent results. All results are available when the search is run on the **Search** page, but only the top 100 are displayed in the Panel.

#### Syntax

```sql
count_frequent <field>[, <field2>, field3, ...]
```

#### Rules

* Creates field named `_approxcount`
* Cannot be used with other aggregating functions like **sum** or **avg**.
* Sort is built into the query and defaults to a most-to-least order.

#### Example

```sql
* | parse "srcIP=*, url=*" as srcIP, url 
| count_frequent srcIP, url
```


## first, last

The **first** and **last** operators return the first or last result relative to the sort order. By default, searches return results in descending chronological order (most recent descending to oldest).

For example, the following image shows a few results in the default sort order. The **#** column starts at one, and the **Time** values start with the most recent.

![new_to_old_default_result_order.png](/img/search/searchquerylanguage/group-aggregate-operators/new_to_old_default_result_order.png)

* The **first** result is indicated with the **#** value of 1. This **first** result has the most recent **Time**.
* The **last** result is indicated with the **#** value of 1. This **last** result has the oldest **Time**.

:::tip
Using the [sort](/docs/search/search-query-language/search-operators#sort) operator allows you to change the default sort order.
:::

#### Limitations

First and last are not supported in Live Dashboards or any continuous query. Instead, use the **withtime** operator, see [most_recent and least_recent](/docs/search/search-query-language/group-aggregate-operators#most_recent-least_recent).

#### first

The default sort order for returned messages is reverse chronological—most recent descending to oldest. So **first** finds the most recent value of the field being evaluated within the time range. However, if you have specified a sort order other than descending chronological, then **first** finds the message that precedes all others based on the sort order defined in your query.

If there is no sort order specified for returned results (for example, when using **limit 20**), then **first** simply returns the first result encountered without respect to date or list order.

#### Syntax

```sql
first(<field>) [as <field>] [by <field>]
```

#### Rules

* The default field created is named **`_first`**

#### Example

```sql
... | first(error_message) group by hostname
```

Note that when you find the first occurrence of more than one field, you must create an alias using the [as
operator](/docs/search/search-query-language/search-operators#as-operator) to rename the _first fields. See this example:

```sql
_sourceCategory=Apache/Access
| first(url) as first_url, first(status_code) as first_statuscode
```

#### last

Finds the last value of the field being evaluated within the time range and according to the specified sort order. Remember that the default order for returned messages is reverse chronological—most recent descending to oldest. Therefore, **last** is the oldest result in the returned list. If you have specified an order other than reverse chronological, then **last** finds the ending message that follows all others based on your sort order.

#### Syntax

```sql
last(<field>) [as <field>] [by <field>]
```

#### Rules

* The default field created is named `_last`

#### Example

```sql
... | last(status_code) group by hostname
```

Sample log message:

```json
Aug 2 04:06:08 : host=10.1.1.124: local/ssl2 notice mcpd[3772]: filesize=20454: diskutilization=0.4 : 01070638:5: Pool member 172.31.51.22:0 monitor status down.
```

Example based on sample log message:

```sql
disk*
| parse "diskutilization=*" as disk
| disk>0.8?1:0 as overcapacity
| last(overcapacity) by _sourceHost
| sort by _last
```

This query finds all messages that contain the term **disk\*** and parses out all that have a **diskutilization=** value. It then extracts the value of diskutilization into field **disk**. It then determines if that value is greater than 80% and will find the last occurrence of that value per host effectively producing a list of hosts that have disk utilization that is over 80%.

Note that when you find the last occurrence of more than one field, you must create an alias using the [as operator](/docs/search/search-query-language/search-operators#as-operator) to rename the `_last` fields. See this example:

```sql
_sourceCategory=Apache/Access
| last(url) as last_url, last(status_code) as last_statuscode
```

## median

In order to calculate the median value for a particular field, you can utilize the [percentile (pct) operator](#percentile-pct) with a percentile argument of 50.

#### Syntax

```sql
pct(<field> [, 50]) [as <field>] [by <field>]
```

#### Rules

* Creates a field with the naming convention: `_<field>_pct_50`

#### Examples

For example:

```sql
* | parse "data=*" as data
  | pct(data, 50) as median
```

To calculate the median value of a field called "Len:\*" as seconds, and then take the median, use the following query:

```sql
| parse "Len: *" as seconds
| pct(seconds,50) as median
```

Which would return results similar to:

![Median.png](/img/search/searchquerylanguage/group-aggregate-operators/median.png)


## min, max

Use the min and max functions to find the smallest or largest value in a set of values.

#### max

Extracts the maximum value of the numerical field being evaluated within the time range.

#### Syntax

```sql
max(<numerical_field>) [as <field>] [by <field>]
```

#### Rules

* Creates field named **`_max`**

#### Example

```sql
... | max(request_received) group by hour
```

```sql
... | max(request_received) as max_request_received, max(request_sent) as max_request_sent
```

When you calculate the maximum value of more than one field, you must create an alias using the [as operator](/docs/search/search-query-language/search-operators#as-operator) to rename the max fields.

See this example:

```sql
_sourceCategory="OS/Windows"
| kv "HandleCount", "ThreadCount"
| max(HandleCount) as maxHandleCount, max(ThreadCount) as maxThreadCount
```

#### min

Extracts the minimum value of the numerical field being evaluated within the time range.

#### Syntax

```sql
min(numerical_field) [as <field>] [by <field>]
```

#### Rules

* Creates field named `_min`

#### Example

```sql
... | min(request_received) group by hour
```

```sql
​... | min(request_received) as min_request_received, max(request_sent) as max_request_sent
```

When you calculate the minimum value of more than one field, you must create an alias using the [as operator](/docs/search/search-query-language/search-operators#as-operator) to rename the min fields.

See this example:

```sql
_sourceCategory="OS/Windows"
| kv "HandleCount", "ThreadCount"
| min(HandleCount) as minHandleCount, min(ThreadCount) as minThreadCount
```


## most_recent, least_recent

The **most_recent** and **least_recent** operators, used with the **withtime** operator, are aggregate operators that allow you to select the most recent or least recent value within a group.

The **withtime** operator is given a field and creates a JSON object with the field's value and its timestamp in milliseconds. A field is created with the format **x_withtime** that appears as part of your search results. Then
the **most_recent** and **least_recent** operators are used to order your data referencing the **x_withtime** field.

The **withtime**, **most_recent**, and **least_recent** operators are not considered standalone operators; they are designed to only be used as an alternative to the [first and last operators](#first-last) in Live Dashboards or any continuous query where first and last are not supported.

#### Syntax

The field `status` is used in the following syntax expressions to represent any field.

```sql
| parse ... as status | withtime status | most_recent(status_withtime) [as <field>] by _sourcehost
```

```sql
| parse ... as status | withtime status | least_recent(status_withtime) [as <field>] by _sourcehost
```

#### Rules

* Default alias field is named **`_mostrecent`** or **`_leastrecent`**

#### Examples

**Find the most recent visitors to our site by IP.**

Say we would like to keep an eye on visitors that hit our site from different countries. This query will provide the most recent IP addresses based on the logline message time:

```sql
*ip* OR *address*
| parse regex "(?<IP>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| lookup latitude, longitude, country_code from geo://location on ip=IP
| where !isNull(country_code)
| withtime IP
| most_recent(ip_withtime) by country_code
```

produces results like:

![Mostrecent.png](/img/search/searchquerylanguage/group-aggregate-operators/mostrecent.png)


## pct sampling

The percent sampling function, pct_sampling, finds the percentile of a given field. Multiple pct_sampling functions can be included in one query.

The pct_sampling function will return an approximate result for searches that produce large volumes of data.

:::note
To find the percentile, the function uses a sample of 1,000 messages. This may cause results to be slightly different for different queries when you may expect the results to be the same. 
:::

#### Syntax

```sql
| pct_sampling(<field> [, percentile]) [as <field>] [by <field>]
```

```sql
| pct_sampling(<field> [, percentile, percentile, percentile]) [as <field>] [by <field>]
```

#### Rules

* Creates a field with the naming convention: `_<field>_pct_<percentile>`.
* Separate multiple percent arguments in one query with commas.

#### Examples

```sql
* | parse "data=*" as data
| pct_sampling(data, 95)
```

Sample log message:

```
Aug 2 04:06:08 : host=10.1.1.124: local/ssl2 notice mcpd[3772]: filesize=20454: diskutilization=0.4 : 01070638:5: Pool member 172.31.51.22:0 monitor status down.
```

Example based on sample log message:

```sql
file*
| parse "filesize=*" as filesize
| pct_sampling(filesize, 75, 95) by _sourceHost
```

Running this query creates fields named `_filesize_pct_75` and `_filesize_pct_95`.

A query can also take more multiple percent arguments, such as: `| pct_sampling(q1_delay, 10, 20, 30, 40, 50, 60, 70, 80, 90)`

Running this query creates fields named `_q1_delay_pct_10, _q1_delay_pct_20, _q1_delay_pct_30,` ... to`_q1_delay_pct_90`.



## percentile (pct)

The pct operator finds the specified percentiles of a given field. 

The operator works in two ways:

1. The operator returns exact percentiles at under 1,000 data points.
1. At over 1,000 data points, the pct operator automatically switches to the t-digest algorithm for approximate results. This approximation is more accurate near the extremes (such as 99th and 1st percentiles) and less accurate closer to the median.

The input to the operator is a percentile. For example:

* **pct(x, 50)** gives the median (50th percentile and 0.5th quantile).
* **pct(x, 0.50)** gives the 0.5th percentile, or 0.005th quantile (for example not the median).

#### Syntax

```sql
...| pct(<field> [, percentile]) [as <field>] [by <field>]
```

```sql
...| pct(<field> [, percentile, percentile, percentile]) [by <field>]
```

#### Rules

* Default alias field is named: `_<fieldname>_pct_<percentile>`
* Separate multiple percentile arguments in one query with commas.
* Multiple pct functions can be included in the same group-by aggregation.
* The pct operator supports decimal percentiles.

#### Examples

```sql
| parse "filesize=*" as filesize
| pct(filesize, 75, 95) by _sourceHost
```

Running this query creates the fields `_filesize_pct_75` and `_filesize_pct_95`, corresponding to the 75th and 95th percentile file sizes for each source host.

To find the 99.9th percentile in a query, use, for example, `pct(millis, 99.9)`.


## stddev

Finds the standard deviation value for a distribution of numerical
values within the time range analyzed and associated with a group
designated by the "group by" field.

#### Syntax

```sql
stddev(<numerical_field>) [as <field>] [by <field>]
```

#### Rules

* Creates field named **`_stddev`**

#### Example

You can use the query below to view the standard deviation of time delay, along with the average of time delay, max delay, and the min delay for a Source. You can use this query to troubleshoot large message time and receipt time discrepancies.

```sql
_source=CollectD
| abs(_receipttime - _messagetime) as delt
| delt/1000/60 as delt
| min(delt), max(delt), avg(delt), stddev(delt), count(*) by _collector, _sourcename
```

![avg results](/img/search/searchquerylanguage/group-aggregate-operators/stddev.png)

When you calculate the standard deviation of more than one field, you must create an alias using the [as operator](/docs/search/search-query-language/search-operators#as-operator) to rename the stddev fields. See this example:

```sql
_sourceCategory="OS/Windows"
| kv "HandleCount", "ThreadCount"
| stddev(HandleCount) as stddevHandleCount, stddev(ThreadCount) as stddevThreadCount
```


## sum

Sum adds the values of the numerical field being evaluated within the time range analyzed.

#### Syntax

```sql
sum(<numerical_field>) [as <field>] [by <field>]
```

#### Rules

* Creates field named **`_sum`**

#### Example

```sql
... | sum(bytes_received) group by hostname
```

Sample log message:

```Aug 2 04:06:08 : host=10.1.1.124: local/ssl2 notice mcpd[3772]: filesize=20454: diskutilization=0.4 : 01070638:5: Pool member 172.31.51.22:0 monitor status down.
```

Example based on sample log message above:

```sql
file*| parse "filesize=*" as filesize
| sum (filesize) group _sourceHost
```

Finds all messages that contain term **file\*** and parses out all that
have a **filesize=value**. It will then extract the value of filesize
and will add all those values per host where those log messages are
generated.

When you calculate the sum of more than one field, you must create an alias using the [as operator](/docs/search/search-query-language/search-operators#as-operator) to rename the sum fields. See this example:

```sql
_sourceCategory="OS/Windows"
| kv "HandleCount", "ThreadCount"
| sum(HandleCount) as sumHandleCount, sum(ThreadCount) as sumThreadCount
```

You can use multiple aggregation operators on the same line of a query. For example:

```sql
max(amount) as amount_max, count(datetime) as datetime_count, sum(_size) as messages_size_sum, last(query) as last_query
```


## values

The **values** operator provides all the distinct values of a field. This allows you to quickly identify and understand all the values a field has in your data. Additionally, you have the option to group by other fields of interest.

#### Syntax

```sql
values(<field>) [by <group_by_fields>] [as <field_name>]
```

#### Response Field

The response field separates each value with a new line character and places them in lexicographical order as follows:

* Numbers before letters
* Numbers sorted in ascending based on the value of the first digit
* Letters sorted in alphabetical order
* Uppercase before lowercase letters

This is an example of a response field with IP addresses:

![values operator response field example.png](/img/search/searchquerylanguage/group-aggregate-operators/values-operator-response-field-example.png)

#### Limitation

* The first 100 distinct values are returned for a field.

#### Examples

#### Operational Analytics

To identify all IP addresses by region.

```
_sourceCategory=Labs/*
| parse regex "(?<ip_address>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| values(ip_address) by region
```

To identify all IP addresses and namespaces by region.

```
_sourceCategory=Labs/*
| parse regex "(?<ip_address>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| values(ip_address) as val_ip, values(namespace) as val_namespace by region
```

To identify all sources by error type in my stack that logged an error in the last 24 hours.

```sql
_sourceCategory=prod01*
| parse regex "(?i)(?<log_level>WARN|CRITICAL|ERROR|FATAL)"
| toUppercase(log_level)
| _sourceCategory as sc
| count as errors, values(sc) by log_level
```

To identify users that logged in from more than one country in the last 24 hours with a list of countries logged in from.

```sql
_sc=org-service “login”
| parse username
| geolookup country on ip=login_ip
| count_distinct(country), values(country) by username
| where count_distinct > 1
```

#### Security Analytics

To know if my services have interacted with any known IOC threats.

```sql
...| values(IOC) by src_ip
```

To understand what ports were scanned or communicated over by one
src_ip.

```sql
_source="PatchingInfo" and _collector="AWS SecurityHub Non Prod"
| json field=_raw "port_name" as ports
| json field=_raw "src_ip" as src_ip
| values(ports) by ami
```
