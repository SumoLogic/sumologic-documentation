---
id: operators
title: Sumo Logic Search Operators
description: Process data in meaningful ways and provide logic to queries with search operators. This page lists the available search operators in Sumo's search query language.
keywords:
    - as
    - accum
    - bin
tags: [as,accum,bin]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Process data in meaningful ways and provide logic to queries with search operators. This page lists the available search operators in Sumo's search query language.

Use the right-nav menu to search operators, then click on a description to expand and see syntaxes and example code.


---
## accum

<details><summary><small>The <code>accum</code> operator calculates the cumulative sum of a field. It can be used to find a count by a specific time interval and can be used to find a total running count across all intervals.</small></summary>

**Syntax**

```sql
accum <field> [as <field>] [by <field1>, <field2>, ...]
```

**Rules**

* An alias for accum is optional. When an alias is not provided, `_accum` is the default alias.
* Specified fields must contain numeric values.
* If a row contains non-numeric values, that row will be skipped.
* To add a query that includes an accum operator to a Dashboard, you
    must add a group by function before the accum operator.

**Examples**

**Requests by running total**. With the accum operator, we can find the number of requests by a user as a running total. Running a query similar to:

```sql
_sourceCategory=IIS/Access (Wyatt OR Luke)
| parse "* * * * * * * * " as date, time, csmethod, cs_uri_stem, cs_uri_query, s_port, c_ip, cs_username
| timeslice by 1m
| count as requests by _timeslice,cs_username
| sort by _timeslice asc,cs_username
| accum requests as running_total
```

produces results of a running total of all requests, similar to:

![Accum](/img/search/searchquerylanguage/search-operators/Accum.png)

**Running total by user name.** Another option is to find a running
total for each user's requests. Running a query similar to:

```sql
_sourceCategory=IIS/Access (Wyatt OR Luke)
| parse "* * * * * * * * " as date, time, csmethod, cs_uri_stem, cs_uri_query, s_port, c_ip, cs_username
| timeslice by 1m
| count as requests by _timeslice,cs_username
| sort by _timeslice asc,cs_username
| accum requests as running_total by cs_username
```

produces results of a running total for each user's requests, similar to:

![Accum by user](/img/search/searchquerylanguage/search-operators/AccumByUser.png)

</details>


---
## as operator

<details><summary><small>The <code>as</code> operator is typically used in conjunction with other operators, but it can also be used alone to rename fields or to create new constant fields.</small></summary>

**Syntax**

```sql
<ExistingFieldName> as <field>
```

```sql
<literal> as <field>
```

:::note
Fields with characters not in the `a-zA-Z0-9_` character set or that begin with a number need to be escaped, see [reference a field with special characters](../get-started-with-search/search-basics/reference-field-special-characters.md) for details.
:::

**Examples**

#### Rename a Field

When you rename a field, the original field still exists, but the new field is added.

To rename the existing field **ip_addr** as **src_ip**, use:

```sql
ip_addr as src_ip
```

So, the following full query:

```sql
_sourceCategory=Apache/Access
| parse "* - - " as ip_addr
| ip_addr as src_ip
```

Would provide results like:

![rename](/img/reuse/query-search/as_rename.png)

#### Create a New Constant Field

In this example, you will seed an existing field (**src_ip**) with a new constant (**127.10.10.1**):

```sql
_sourceCategory=Apache/Access
| "127.10.10.1" as src_ip
```

This statement “hardcodes" the value of **127.10.10.1** to the variable **src_ip**, for all the messages returned, as shown:

![new constant](/img/reuse/query-search/as_new_constant1.png)

In this example, you will create a new field (**test_src_ip**) and seed it with a constant (**127.10.10.1**):

```sql
_sourceCategory=Apache/Access
| parse "* - -" as src_ip
| "127.10.10.1" as test_src_ip
```

Which provides the following results:

![new constant](/img/reuse/query-search/as_new_constant2.png)

#### Use As in Conjunction with Other Operators

The `as` operator is useful for testing, for example, when you want to create a few log lines and seed them with specific values, like the following query:

```sql
_sourceCategory=Apache/Access
| limit 5
| "127.10.10.1" as src_ip
| "404" as status_code
| "www.sumologic.com" as url
```

Which provides the following results:

![conjunction](/img/reuse/query-search/as_conjunction.png)

In this next example, you will use `as` after a parse, to name the variable in the pattern **"\* - - "** as **src_ip**:

```sql
_sourceCategory=Apache/Access
| parse "* - - " as src_ip
```

In this example, you will use **`as`** to rename the `_count` field to **errors**.  

```sql
_sourceCategory=Apache/Access status_code=404
| count(status_code) as errors
```

</details>


---
## ASN Lookup

<details><summary><small>Sumo Logic can lookup an Autonomous System Number (ASN) and organization name by an IP address. Any IP addresses that don't have an ASN will return null values.</small></summary>

**Syntax**

The ASN Lookup operator uses <a href="#lookup-classic">lookup</a> with a specific path, `asn://default`, to provide the ASN and associated organization.

```sql
lookup\<field\> from asn://default on ip\<ip_address\>
```

|  Lookup fields |  Description |
|--|--|
| `*` | Use a wildcard (\*) character as a shortcut to return both fields. |
| `asn` | Autonomous System Number |
| `organization` | Autonomous System Organization Name or ID in some cases. |

**Example**

The following query references a data stream with IPv4 addresses, parses
those IPv4 addresses, and then uses ASN Lookup to retrieve their
autonomous system information. 

```sql
_sourceCategory=stream "remote_ip="
| parse regex "(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| lookup organization, asn from asn://default on ip = ip
```

</details>

---
## backshift

<details><summary><small>The <code>backshift</code> operator helps you compare values as they change over time. It simply shifts the data points it is given and returns them in your results in a new field.</small></summary>

The backshift operator can be used with [rollingstd](#rollingstd), [smooth](#smooth), or any other operators whose results could be affected by spikes of data (where a spike could possibly throw off future results).

It is important to note that `backshift` does not automatically add timeslices, nor does it do any sorting. You can manually add other operators in the query to add timeslices, for example, and any kind of sorting you'd like to include. To add time-series analysis, add `_timeslice | ... | sort + _timeslice` *before* the `backshift` operator in the query.

**Syntax**

```sql
backshift <field> [, shift_length] [by <field>]
```

**Rules**

* An alias for `backshift` is optional. When an alias is not provided, `_backshift`** **is the default alias.
* Specified fields must contain numeric values.
* To add a query that includes a `backshift` operator to a dashboard, you must add a group by function before the `backshift` operator.
* The default window length (`shift_length`) is 1.
* The maximum window length is 1000.

**Example**

Use `backshift` to see the difference of fields between time points.

Running a query like this:

```sql
_sourcecategory=Labs/Apache/Access
| timeslice by 1m
| count by _timeslice
| sort + _timeslice
| backshift _count,10 as size
```

produces results like:

![backshift_new_table.png](/img/search/searchquerylanguage/search-operators/backshift-table-1.png)

Then you can visualize the results as an area chart.

![backshift_new_graph.png](/img/search/searchquerylanguage/search-operators/area-chart-backshift-1.png)

</details>



---
## base64Decode

<details><summary><small>The <code>base64Decode</code> operator takes a base64 string and converts it to an ASCII string. Input must be a valid base64 string. Invalid input is returned unaltered.</small></summary>

**Syntax**

```sql
base64Decode("<string>"[, "<encoding>"]) as <field>
```

```sql
base64Decode(<string_field>[, "<encoding>"]) as <field>
```

#### Supported encodings

* US-ASCII
* UTF-8 (default)
* UTF-16
* UTF-16BE
* UTF-16LE
* UTF-32
* UTF-32BE
* UTF-32LE

**Examples**

The following example returns `V` with a value of `http://codec.apache.org/commmons`:

```sql
| base64Decode("aHR0cDovL2NvZGVjLmFwYWNoZS5vcmcvY29tbW1vbnM=") as V
```   

The following example returns `V` with a value of `This is a test string`:

```sql
| base64Decode("VABoAGkAcwAgAGkAcwAgAGEAIAB0AGUAcwB0ACAAcwB0AHIAaQBuAGcA", "UTF-16LE") as V
```

</details>


---
## base64Encode

<details><summary><small>The <code>base64Encode</code> operator takes an ASCII string and converts it to a base64 string.</small></summary>

**Syntax**

```sql
base64Encode("<string>") as <field>
```

```sql
base64Encode(<string_field>) as <field>
```

**Example**

```sql
| base64Encode("hello world") as base64
```

Returns `base64` with a value of `aGVsbG8gd29ybGQ=`.

</details>

---
## bin

<details><summary><small>The <code>bin</code> operator assigns output results to user defined bins. A bin is configured to hold a range of values that can be used for sorting results in a histogram and further aggregation. It is a quick and effective way to visualize the distribution of data.</small></summary>

**Syntax**

```sql
bin <numeric field> width=<#>[, min=<#>][, max=<#>]
```

Where:

* `<numeric field>` is the field you want to assign to bins. The data type needs to be numerical. **Required**.
* `<width>` is the bin width as a floating point number. **Required**.
* `<min>` is the lower boundary of the results as a floating point number. All data points with values less than the **min** are assigned to the first bin. **Optional**.
* `<max>` is the upper boundary of the results as a floating point number. All data points with values more than the **max** are assigned to the last bin. **Optional**.

#### Output Fields

* `_bin_label` is the default alias field, which has a standard interval representation.
* `_bin_lower` is the lower boundary of the bin interval.
* `_bin_upper` is the upper boundary of the bin interval.

:::tip
You can sort by the lower or upper boundary of the bin interval.
:::

**Examples**

#### Distribution of error counts

A query counting error messages and using the bin operator to see the
distribution of error counts based on bins with a width of 100:

```sql
_sourceCategory=stream error
| timeslice 1m
| count by _timeslice
| bin _count width=100.0
| count by _bin_label, _bin_lower
| sort by _bin_lower
```

![bin operator charted.png](/img/search/searchquerylanguage/search-operators/bin-operator-charted.png)

#### Latency distribution

A query parsing the latency of a function call and using the bin
operator to see latency distribution over time:

```sql
_sourceCategory=analytics
| parse "ms: *" as time
| bin time width=10.0, min = 0.0, max = 500.0
```

You can aggregate bins further:

```sql
_sourceCategory=analytics
| parse "ms: *" as time
| bin time width=10, min = 0, max = 500
| count by _bin_label, _bin_upper
| sort by _bin_upper
```

![example bin.png](/img/search/searchquerylanguage/search-operators/example-bin.png)

</details>


---
## cat

<details><summary><small>You can use the <code>cat</code> operator to view the contents of a lookup table. Not supported in live dashboards or scheduled searches.</small></summary>

**Syntax**

```sql
cat path://”<path-to-table>”
```

Where:

* `path-to-table` is the path to the lookup table in the Sumo Logic Library.

For example: 

```sql
cat path://"/Library/Users/myusername@sumologic.com/Suspicious Users"
```

To determine the path to a lookup table, highlight the row for the table in the Sumo Logic Library, and select **Copy path to clipboard** from the three-dot more options menu for the table.   
 
If your lookup table is very large, it may take a few minutes to display.

You can export query results in the **Messages** tab of the search results. Click the gear icon and select an export option.

</details>

----
## CIDR

<details><summary><small>Sumo Logic's three CIDR operators work with CIDR (Classless Inter-Domain Routing, sometimes pronounced "cider") notation to narrow the analysis of IPv4 networks to specific subnets. CIDR notations specify the routing prefix of IP addresses. Using the CIDR operators, you can determine the amount of traffic between network segments, review events from hosts within a specified network segment, or even use a <code>not</code> operator to find addresses that didn't originate from a particular network segment. CIDR operators can be used to compare the network segment of two IPv4 addresses, or just identify the network segment involved in particular messages.</small></summary>

:::note
IPv6 addresses (for example "2001:db8::ff00:42:8329") combine a 64-bit network address with a 64-bit host address, so identifying the network segment is easy. The network is the high-order 64 bits in the value.
:::

IPv4 addresses use a variable number of bits to describe the network. The first 24 bits, for example, might represent the subnetwork, and the remaining 8 bits identify individual hosts on that network. The portion of the address representing the network segment is called the prefix, and the number of bits allocated to the prefix is the prefix_length.

The familiar "dotted quad" notation for IPv4 addresses can be difficult to compare if the number of bits assigned to the network is not 16 or 24. The CIDR operators are designed to help.

For general information about Classless Inter-Domain Routing, see this [online article](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing).

### getCIDRPrefix

Extracts the network prefix from an IPv4 address. 

**Syntax**

```sql
getCIDRPrefix("<ip_addr>", "<prefix_length>") as <field>
```

Where:

* `ip_addr` is a string representation (such as "10.10.1.35")
* `prefix_length` is an integer value in string/text format (0-32)

**Examples**

The following returns `10.10.1.0`:

```sql
getCIDRPrefix("10.10.1.35", "24") as net
```

The following returns `10.10.1.32`:

```sql
getCIDRPrefix("10.10.1.35", "27") as net
```

The following returns `10.10.1.32`:

```sql
getCIDRPrefix("10.10.1.35", "29") as net
```

### compareCIDRPrefix

Compares two IPv4 addresses and returns true if the network prefixes match.

**Syntax**

```sql
compareCIDRPrefix("<ip_addr1>", "<ip_addr2>", "<prefix_length>") as <field>
```

`ip_add1` and `ip_addr2` are string representations (such as "10.10.1.35")

`prefix_length` is an integer value in string/text format (0-32)

**Boolean expression syntax**

```sql
compareCIDRPrefix(<ip_addr1>, <ip_addr2>, "<prefix_length>")
```

**Examples**

To review events from a specific network segment:

1. Search for the events. For example, let's say we'd like to review firewall logs:

    ```
    (denied OR rejected AND _sourcecategory=firewall | ...
    ```

1. Parse the IP addresses. For example:   

    ```sql
    ... | parse "ip=*," as ip_address ...
    ```

1. Compare to the full CIDR notation you requested. For example, 10.10.1.32/27:  

    ```sql
    ... | where compareCIDRPrefix("10.10.1.32", ip_address, "27") | ...
    ```

1. Keep matching records, and drop non-matching records from search results:  

    ```sql
    ... | count by ip_address
    ```

To review events not from a specific network segment:

1. Search for the events. For example, let's say we'd like to review firewall logs:  

   ```
   (denied OR rejected AND _sourcecategory=firewall | ...
   ```

1. Parse the IP addresses. For example:   

    ```sql
    ... | parse "ip=*," as ip_address ...
    ```

1. Compare to the full CIDR notation you requested, and drop matching records. For example, 10.10.1.32/27:  

    ```sql
    ... | where !compareCIDRPrefix("10.10.1.32", ip_address, "27") | ...
    ```

### maskFromCIDR

A utility function that returns a subnet mask for boolean operations with IPv4 addresses.

**Syntax**

```sql
maskFromCIDR("<prefix_length>") as <field>
```

Where:

* `prefix_length` is an integer value in string/text format (0-32)

|  CIDR |   Mask |
|----------|-----------------|
| 32       | 255.255.255.255 |
| 31       | 255.255.255.254 |
| 30       | 255.255.255.252 |
| 29       | 255.255.255.248 |
| ...      | ...             |


</details>

---
## compare

<details><summary><small>The <code>compare</code> operator can be used with the <strong>Time Compare</strong> button in the Sumo interface, which automatically generates the appropriate syntax and adds it to your aggregate query. See <a href="/docs/search/time-compare">Time Compare</a> for details. The following information can also be found documented in Time Compare.</small></summary>

You can use compare to:

* Evaluate the performance metrics of a website, such as the latency or the number of exceptions, before and after a deployment.  
* Track the root cause of a production issue quickly by tracking specific keywords, such as memory exceptions, and comparing them with historic data to find any anomalous trends.
* Compare the daily active or weekly active users on your website for strategic business insights.
* Identify malicious activity or attacks by comparing failed login attempts against past averages.

Use the compare operator in the following ways:

* Compare with a single time period in the past.
* Compare with multiple time periods in the past.
* Compare with an aggregate over multiple time periods in the past.

By default, results are displayed in the **Aggregates** tab on the search page in a table. Each column of the output table contains results from one of the specified queries. The first column is suffixed with the keyword **target**, appended to the original column name, and contains results from the present time (or the time range specified in the time range field). Additional columns are suffixed by the timeshift (the period shifted back in time) of the queries. From here, you can select a chart type to display results visually.

For example, if you were doing a comparison with yesterday, when you use the compare operator after the count operator, the aggregation table results will display the column names **count_target** and **count_1d**.

**Syntax**

#### Single Comparison

Compare the present results with a single time period in the past. To make the comparison, specify the time interval you want to go back, in the form of number and time granularity:

```sql
... | compare timeshift <number><time granularity>
```

The following query returns data from the present, along with results from yesterday. Here the parameter `1d` specifies the time interval we want to go back to get the data for the comparison.

```sql
... | compare timeshift 1d
```

This comparison can be displayed visually as:

![compare single diagram](/img/reuse/query-search/compare_single_diagram.png)

In another example, this query returns data from the present along with results from last week.

```sql
... | compare timeshift 1w
```

#### Multiple Comparison

Compare the present results with multiple time periods in the past. The first parameter specifies the time interval between the present query and the most recent comparison point. The second parameter specifies how many comparison points to create.

```sql
... | compare timeshift <number><time granularity> <number of timeshifts>
```

The following query returns results from the present, along with results from every day of the past week. The first parameter, 1d, specifies the interval between the points of comparison, and the second parameter, 7, specifies the number of comparisons.

```sql
... | compare timeshift 1d 7
```

Which can be displayed visually as:

![compare multiple diagram](/img/reuse/query-search/compare_multiple_diagram.png)

The following query returns result from the present with results from the same day in the last 3 weeks. So if today is Monday, then this query will show a result for today and the last three Mondays.

```sql
... | compare timeshift 1w 3
```

#### Aggregate Comparison

Aggregate the results from multiple past time periods using an aggregation operator (avg, min, or max).

```sql
... | compare timeshift <number><time granularity> <number of shifts <avg/min/max>
```

The following query returns results from the present along with the average of the results from the last five days:

```sql
... | compare timeshift 1d 5 avg
```

Which can be displayed visually as:

![compare aggregate](/img/reuse/query-search/compare_aggregate_diagram.png)

Other examples:

* Maximum of the same day for last three weeks: `... | compare timeshift 1w 3 max`
* Minimum of the last four six-hour intervals: `... | compare timeshift 6h 4 min`

#### Advanced

You can also do multiple different comparisons queries under the same compare operator by using multiple timeshift phrases separated by commas.
```
... | compare\<comparison \>,\<comparison \>, ...
```

For example:

```sql
... | compare timeshift 12h, timeshift 1d 3 avg, timeshift 1w
```

You can specify an alias, and the columns generated use the name you specify.

```sql
... | compare <comparison 1>, <comparison 2>, ...
```

For example:

```sql
... | compare timeshift 1d as yesterday, timeshift 1w 4 as last_four_weeks
```

**Rules**

* The compare operator must follow a group by aggregate operator, such as: `count`, `min`, `max`, or `sum`.
* If you want to use timeslice with compare, don't alias timeslice.

#### Limitations

* Compare can't generate more than **seven** additional queries. An additional query is generated whenever a comparison in time is initiated. Note that multiple comparisons and aggregate comparisons will generate multiple queries. For example, the following queries are not allowed:

    ```sql
    ... | compare timeshift 1d 14
    ```

    This query compares with the past 14 days data. It is not allowed as it
    generates 14 queries. 

    ```sql
    ... | compare timeshift 1d 5 avg, timeshift 1w  4
    ```

    This query compares with the last five days, and the same day for the
    last four weeks. It is not allowed as it generates 9 queries. 

* Duplicate aliases are not allowed. For example, the following query is not allowed:

    ```sql
    ... | compare timeshift 1d 7 as last_week, timeshift 1d 7 avg as last_week
    ```

* Real time queries using time compare need to have at least three timeslices within its time range. For example, if the time range is 10 minutes, your timeslices need to be no longer than 3 minutes so that there are at least three of them.
* Compare is not supported in Scheduled Views.
* Compare can only be used once in a search query.

**Examples**

#### Compare time series data with past data

Use compare to analyze the change in log counts between two days.

```sql
error
| timeslice by 1h
| count by _timeslice
| compare timeshift 2d
```

The query returns results from both today and two days ago, with each day in its separate column. Today's results are represented by `_count`.

![Count-2d.png](/img/search/timecompare/Count-2d.png)

Create a line chart to visualize the results.

![count-2dLineChart.png](/img/search/timecompare/count-2dLineChart.png)

Using the multiple comparison feature, you can compare the number of
logs against every ten minutes of the past hour:

```sql
_sourceHost = prod
| timeslice by 1m
| count by _timeslice
| compare timeshift 10m 5
```

Each ten-minute period produces its own column in the output table:

![tenminute.png](/img/search/timecompare/tenminute.png)

Create a line chart to visualize the results.  

![TenMinuteLIneChart.png](/img/search/timecompare/TenMinuteLIneChart.png)

Alternatively, you can compare against the average of all the ten minute
periods:

```sql
_sourceHost = prod
| timeslice by 1m
| count by _timeslice
| compare timeshift 10m 5 avg
```

![TenMinAvg.png](/img/search/timecompare/TenMinAvg.png)

Create a line chart to visualize the results.  

![TenMinAvgLineChart.png](/img/search/timecompare/TenMinAvgLineChart.png)

#### Compare categorical data parsed from logs

Use compare to analyze the change in delays on different _sourceHosts
using parsed data from logs.

```sql
"delay:"
| parse "delay: *" as delay
| avg(delay) as average_delay_in_millis by _sourceHost
| compare timeshift 30m
```

This example computes the average delay per `_sourceHost`, and compares with results from 30 minutes ago.

![DelayAvg.png](/img/search/timecompare/DelayAvg.png)

These results would create a line chart such as the following.

![DelayLineChart.png](/img/search/timecompare/DelayLineChart.png)

#### Compare after a Transpose operation

You can use the compare operator after a transpose operation, such as the following:

```sql
_sourceCategory=analytics
| timeslice 1m
| count by _timeslice, _sourceHost
| transpose row _timeslice column _sourceHost as %"nite-analytics-1", %"nite-analytics-2"
| compare with timeshift 15m
```

</details>


---
## concat

<details><summary><small>The <code>concat</code> operator allows you to concatenate or join multiple strings, numbers, and fields into a single user-defined field. It concatenates strings end-to-end and joins them into a new string that you define. For example, to concatenate the words "foot" and "ball" would give you "football". You can also use punctuation and spaces in quotes to concatenate strings in a readable way.</small></summary>

In another example, a log message has a table with the elements of a mailing address, but separated into different fields such as `Street_Number`, `City`, `State`, and `Zip_Code`. You can use the concatenate operate to assemble the fields into a new field called `Mailing_Address` for a customer.

In another example, if you had a log message of an incident with four fields, such as `Signature_Name`, `Vendor_Signature`,
`Incident Detail_URL`, and `Analyst_Assessment` that you wanted to combine into a single field (a single string) called `Event_Detail`, the concatenate operator would also allow you to do this.

**Syntax**

```sql
concat(<field1>, <field2>[, <field3>, ...]) as <field>
```

**Rules**

* You must define a name for the new field to concatenate the named fields. There is no default.
* You can use punctuation and spaces in quotes to concatenate strings in a readable way.
* A null field is treated as an empty string.
* The operator allows 2 to 16 input fields. To use more than 16 inputs, you can combine operators. See example.
* AND and OR are not supported.

**Examples**

#### Concatenate fields with and without punctuation

If you had the following fields: field1 = time, field2 = 4, field3 = logs.

Using this query:

```sql
... | concat(field1, field2, field3) as new_string
```

would return: `new_string = time4logs`

If you add punctuation and spaces in quotes, like this:

```sql
... | concat(field1, " ", field2, " ", field3) as new_string
```

you'd get: `new_string = time 4 logs`

#### Concatenate fields to create an IP Address

In this example, to create an IP address out of separate message log
fields, concatenate four number fields with punctuation to complete a
new field named `ip_address`.

```sql
... | concat(octet1, ".", octet2, ".", octet3, ".", octet4) as ip_address
```

#### Concatenate first and last names

In this example, you'd concatenate fields for a first and last name
to create a new field called **fullName**.

```sql
... | concat(firstName, " ", lastName) as fullName
```

#### Formatting dates

You can use the Concat operator to format dates, as shown:

```sql
... | concat(month, "/", day, "/", year) as date
```

#### Concatenate more than 16 inputs

To use more than 16 inputs with the concat operator, you can combine operators, using one of the following formats:

```sql
... | concat(field1, field2, ...) as b
| concat(b, field17, field18,...) as c
| ...
```

```sql
... | concat(concat(field1, field2, ...), field17, field18,...) as concatenated_fields
```

#### See Also

For information on formatting strings, see [Format](#format) operator.

</details>


---
## contains

<details><summary><small>The <code>contains</code> operator compares string values of two <a href="/docs/search/search-query-language/parse-operators">parsed</a> fields and returns a boolean result based on whether the second field's value exists in the first.</small></summary>


**Syntax**

```sql
contains(<field1>, <field2>) as <field>
```

```sql
<field1> contains <field2> as <field>
```

```sql
| where <field1> contains <field2>
```

```sql
| where contains(<field1>, <field2>)
```

**Rules**

* Requires field values to be strings. You may [cast values](#casting-data-to-a-number-or-string) if needed.
* The full string of field2 must exist within field1.
* Comparison is case sensitive.
* Returns `true` when the value from field2 was found and `false` when the value was not found in field1.
* Returns `true` if field1 and field2 are empty, and `false` when only one is empty.

**Example**

Given the following example log:

```
instance of alertNotification{ EventIdentifier = 100; Address = 123 Main Street, San Francisco, California; City = San Francisco; State = CA;}
```

Parsing the log so the fields are `city` with the value "San Francisco" and `address` with the value "123 Main Street, San Francisco, California" you'd use the contains operator to return the log if the value of `city` is found in the value of `address`.

```sql
| where contains(address, city)
```

</details>

---
## decToHex

<details><summary><small>The <code>decToHex</code> operator converts a long value of 16 or fewer digits to a hexadecimal string using Two's Complement for negative values.</small></summary>

:::note
Hexadecimal string is always returned in upper-case.
:::

**Syntax**

```sql
decToHex(<long_field>) as <field>
```

```sql
decToHex("<long_string>") as <field>
```

**Examples**

The following returns `V` with a value of `1337`:

```sql
| decToHex("4919") as V
```

```sql
... | count by _collector | decToHex(_count) as v
```

The following returns `d` with a value of `46`:

```sql
... | decToHex("70") as d
```

</details>

---
## dedup

<details><summary><small>The <code>dedup</code> operator removes duplicate results. You have the option to remove consecutively and by specific fields. This allows you to filter your results to identify the most recent or last few events based on an identical combination of results.</small></summary>

For example, to find the most recent value of services you'd use the following operation: `| dedup 1 by service`.

#### Supported features
The operator is supported in the following features:

* [Log Search](/docs/search)
* [Dashboards (New)](docs/dashboards-new/about.md)
* [Dashboards](/docs/dashboards), including live mode
* [Scheduled Searches](docs/alerts/scheduled-searches/schedule-search.md)

**Syntax**

```sql
dedup [consecutive] [<int>] [by <field>[, <field2>, ...]]
```

| Parameter | Description | Example |
| -- | -- | -- |
| consecutive | Removes duplicate combinations of values that are in succession. | Remove only consecutive duplicate events. Keep non-consecutive duplicate events. In this example, duplicates must have the same combination of values as the source and host fields for them to be removed. Non-consecutive events with the same combination of source and host fields will be retained.<br/>`... | dedup consecutive by source, host` |
| int | Specifies the number of most recent events to return. | For search results that have the same source value, keep the first three that occur and remove all subsequent search results.<br/>`... | dedup 3 by source` |
| field | A comma-separated list of field names to remove duplicate values from. If no fields are specified, the query is run against _raw, the full raw log message.<br/>For example, `| dedup` is the same as `| dedup` by _raw. | Remove duplicate search results based on _sourceCategory.<br/>`... | dedup by _sourceCategory` |

**Rules**

* Non-aggregate and aggregate queries are supported.

    * non-aggregate queries process up to 100k results.
    * aggregate queries process all results.

* Use the [sort operator](#sort) before dedup to control the order of removed results.
* Running dedup against the full raw log message is inefficient and is not recommended.
* The histogram only shows results the dedup operator returned.

**Examples**

The following examples use this sample data.

| Timestamp	City | Country | Continent | Population (in millions) |
| -- | -- | -- | -- |
| 05/09/2021 11:32:00 | Las Vegas | USA	North | America	2.31 |
| 05/09/2021 11:32:00 | Paris | France |  | 6.945 |
| 05/09/2021 11:30:00 | Karachi | | Asia | 16.1 |
| 05/09/2021 11:29:00 | Chennai | India | Asia | 4.7 |
| 05/09/2021 11:28:05 | Mumbai | India | Asia | 20.7 |
| 05/09/2021 11:28:00 | Bangalore | India | Asia | 12.7 |
| 05/09/2021 11:27:00 | Florida | USA | North America | 2.4 |
| 05/09/2021 11:26:00 | Washington | USA | North America | 7.6 |
| 05/09/2021 11:25:00 | New York | USA | North America | 8.8 |
| 05/09/2021 11:24:00 | San Francisco | USA	North America | 8.5 |
| 05/09/2021 11:23:00 | Delhi | India | Asia | 11 |
| 05/09/2021 11:22:00 | Kolkata | India | Asia | 4.5 |

#### Remove duplicate search results by country

```sql
| dedup by country
```

Returns the most recent record for each country:

![deup by country](/img/search/searchquerylanguage/search-operators/dedup-by-country.png)

#### Keep the first 3 duplicate results

For search results that have the same country value, keep the first three that occur and remove all subsequent search results.

```sql
| dedup 3 by country
```

Returns the following results:

![deup by 3](/img/search/searchquerylanguage/search-operators/dedup-last-3.png)

#### Keep results with same combination of values in multiple fields

For search results that have the same country AND continent values, keep the first two search results that occur and remove all subsequent results.

```sql
| dedup 2 by country, continent
```

Returns the following results:

![deup by 3](/img/search/searchquerylanguage/search-operators/dedup-by-two-fields.png)

#### Remove only consecutive duplicate events

Remove only consecutive duplicate events. Keep non-consecutive duplicate events. In this example, duplicates must have the same combination of values as the country and continent fields for them to be removed. Non-consecutive events with the same combination of source and host fields will be retained.

```sql
| dedup consecutive by country, continent
```

Returns the following results:

![deup by 3](/img/search/searchquerylanguage/search-operators/dedup-consecutively-two-fields.png)

</details>

---
## diff

<details><summary><small>The <code>diff</code> operator calculates the rate of change in a field between consecutive rows. To produce results, diff requires that a specified field contain numeric data; any non-numerical values are removed from the search results.</small></summary>

Diff does not sort data but instead operates on rows in the order that they appear in the input stream, subtracting the number in a field from the number in the same field in the previous line.

The first line of results will never display diff results.

Adding a group by function to a diff operator query calculates the difference between consecutive values in each group. (Data from each group are calculated separately.) Grouping does not affect the order in which rows appear in the output stream.

**Syntax**

* `diff\<fiel\> [as\<fiel\>] [by\<field\>,\<field\>, ...]`

**Rules**

* An alias for diff is optional. When an alias is not provided, _diff
    is the default alias.
* Specified fields must contain numeric values.
* If a row contains non-numeric values, that row will be
    skipped; diff uses the row before that (until it finds an acceptable
    row with a numeric value).
* The diff corresponding to the first row in any results is null
    (empty).
* To add a query that includes a diff operator to a Dashboard, you
    must add a group by function before the diff operator.

**Examples**

**Using diff to calculate the difference of a quantity between time
points.** 

Using diff with timeslice, you can run a query similar to:

`* | parse "bytes transmitted: '*'" as bytes | timeslice 1m | sum(bytes) as bytes by _timeslice | sort _timeslice | diff bytes as diff_bytes`

to produce results similar to:

![diffoperator.png](/img/search/searchquerylanguage/search-operators/diffoperator.png)

Note that there is no value for diff_bytes in line 1, as expected.

**Using multiple diff operators.** Multiple diff operators can be
included in a single query. For example, to calculate the diff of bytes
and compressed bytes:

`* | parse "data: '*'" as Bytes  | diff Bytes as b  | parse "compress: '*'" as Compressed  | diff Compressed as c`

**Adding a diff operator query to a Dashboard.** To add a query that
includes a **diff** operator, make sure to structure your query similar
to:

`* | parse "encoded: '*'" as e  | parse "compressed: '*'" as c  | count by e,c  | diff e as d`

If your query isn't compatible with a Dashboard, an error message
appears when you attempt to add it.

</details>

---
## fields

<details><summary><small>The <code>fields</code> operator allows you to specify which fields to display and their order in the results of a query. Use a fields operator to reduce the "clutter" of a search output that contains fields that aren't completely relevant to your query.</small></summary>

There are two fields operator modes:

* Allowlist - only the fields included are kept in the search output.
* Denylist - all the fields except those you specify to be excluded are in the search output.

To specify the [order of returned fields](#ordering-fields) you must use the fields operator last, at the end of your query.

:::note
Fields are not returned in the specified order in Search Job API and Webhook results.
:::

#### Allowlist

For allowlist mode, only fields you specify for inclusion are kept in the search output. For example, to strip out every field except for method and status_code, your query would be:

```sql
_sourceCategory=Apache/Access
| parse " \"* " as method
| parse "\" * " as status_code
| fields method, status_code
```

The search results would look like this:  

![Fields](/img/search/searchquerylanguage/search-operators/Fields.png)

Allowlist queries allow all system internal fields (fields prefixed with an underscore "_") to pass.

#### Denylist

For denylist mode, all fields except for those you explicitly *remove* remain in the search output. Denylist mode is indicated with a minus sign "-" in a query. For example, to only remove the log_level, module, and process_id fields, your query would be:

```sql
_sourceCategory=*apache*
| fields - log_level, module, process_id
```

Denylist queries will also remove internal fields (fields prefixed with an underscore "_") when specified. For example:

```sql
_sourceCategory=*apache*
| count by size
| fields - _count
```

Make sure that your query does not repeat or duplicate individual fields, or your search query will fail. 

#### Non-aggregate vs. Aggregate Query Results

The fields displayed in query results are different for non-aggregate and aggregate queries.

By default, all non-aggregate query results, which appear in the **Messages** tab, include the # (results list number), Time, and Message field, along with any other fields you have allowlisted in your query.

Aggregate query results, which appear in the **Aggregates** tab, include only the fields that you have specified in your query.

For example, for this non-aggregate query:

```sql
_sourceCategory=Apache/Access
| parse " \"* " as method
| parse "\" * " as status_code
| fields method, status_code
```

The search results would look like this:

![Fields_nonaggregate](/img/search/searchquerylanguage/search-operators/Fields_nonaggr.png)

While the same query with an added *count by* statement to make it an aggregate query:

```sql
_sourceCategory=Apache/Access
| parse " \"* " as method
| parse "\" * " as status_code
| count by method, status_code
| fields status_code, method
```

This would provide the following results:

![](/img/reuse/query-search/fields_operator_aggregate.png)

#### Use a Field Name that Contains Spaces or Special Characters

The Sumo Logic search language allows `a-zA-Z\` as valid characters for identifiers for fields. In cases where a field name contains other characters you need to escape the field name by using the `%` character and wrapping the field name in double quotes. 

Syntax: `%"field_name"`

Here's an example:

```sql
| "Robot" as %"learning robot .33."
```

This creates a field named "learning robot .33." with the value "Robot".

#### Ordering fields

By default, the fields in non-aggregated results are ordered alphabetically. You can specify a different order by using the fields operator.

For example, if you used:

```sql
| fields status_code, method
```

Sumo displays the **status_code** field first, then the **method** field second.

In an aggregate result, field and column order follows the requested order of the query.

For example, if you used:

```sql
| count by status_code, method
```

Sumo displays the **status_code** field first, and the **method** field second.

</details>

---
## fillmissing

<details><summary><small>The <code>fillmissing</code> operator allows you to specify groups that should be represented in data output. When you run a standard <a href="/docs/search/search-query-language/group-aggregate-operators">group-by</a> query, Sumo Logic only returns non-empty groups in the results. For example, if your query is grouping by timeslice, then only the timeslices that have data are returned.</small></summary>

This can be a problem because:

* The lack of data is sometimes also an interesting event, but there is no easy way to capture this information. For example, the [outlier](#outlier) operator can't catch anomalies arising from missing data because it can only mark an existing timeslice as anomalous.
* Missing data can lead to misleading visualizations. For example, if you plot a line chart across timeslices with missing data, the chart will interpolate across the missing timeslices and represent them deceptively as nonempty.

The `fillmissing` operator addresses this shortcoming by allowing you to specify groups that should be represented in the output, even if those groups have no data.

#### How it works

The `fillmissing` operator allows you to define generators over the fields in the output. Each generator applies to one field and enumerates all the values that you'd like to appear in the output for that field, even if some of those values are not present in the data.

You can define multiple generators, which enumerate tuples for every combination of the values enumerated by each of the generators (such as the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product)). For example, if you used the following query:

```sql
| fillmissing values("a1", "a2") in A,
              values("b1") in B,
              values("c1", "c2", "c3") in C
```

The generators for the three fields (A, B, and C) enumerate the tuples:

| A | B | C |
|--|--|--|
| a1 | b1 | c1 |
| a1 | b1 | c2 |
| a1 | b1 | c3 |
| a2 | b1 | c1 |
| a2 | b1 | c2 |
| a2 | b1 | c3 |

Fields with generators defined are called **key fields**. The remaining fields are called **non-key fields**.

Given the list of generators, `fillmissing` ensures that every tuple enumerated by the generators is present in the output. In particular, when one of the enumerated tuples is missing, `fillmissing` will append a record to the output with the missing values for the key fields and some constant default value for the non-key fields.

#### Generators

The `fillmissing` operator supports the following types of generators:

* **Timeslice**. Enumerates all the timeslices with a given granularity in a query time range. For example, `timeslice(15m)` enumerates all the 15-minute timeslices in the query time range.

  :::note
  Buckets need to be based on a time period.
  :::

* **Values**. Enumerates the fixed set of values given in arguments. For example, `values("a", "b", "c")` enumerates the values "a", "b", and "c". Currently, only string literals are supported for the arguments.

#### Default values for non-key fields

When `fillmissing` appends a record to the output, the key fields of the record contain the missing values, while the remaining fields contain some constant value. You can configure the constant value for those fields. If you don't, a default value is assigned that depends on the type of the field:

| Field Type | Default Value |
|--|--|
| integer | 0 |
| double | 0.0 |
| boolean | false |
| String (or other) | null |

:::important
The fillmissing operator allows generators to enumerate up to 10,000 combinations of values; the same limit as group-by operators. If the limit is exceeded, extra values are omitted. The operator will issue a warning when this happens.
:::

**Syntax**

This section describes the syntax for the `fillmissing` operator.

```sql
fillmissing <keyFieldGenerator> [, <keyFieldGenerator> ]  [ with <nonKeyFieldSpecs> ] [ takeLast ]
```

* The `keyFieldGenerator` generates key fields that the operator then references to ensure all specified combinations of values are present. Any missing values are filled based on the specified `nonKeyFieldSpecs`, one for each key field. Two generators are supported:

| Generator | Syntax |
| -- | -- |
| Timeslice | `timeslice[(<integer><time_period>)] [in <field>]`<br/><br/>If no time period is specified, the same time period from the previous timeslice operator is used. |
| Values | `values("<value1>", "<value2>", ...) in <field>`<br/>or<br/>`values all in <field>`<br/><br/>The all option uses all the distinct values for the field from the query results. |

* The `nonKeyFieldSpecs` are optional. They allow you to configure the default constant values for one or more non-key fields. The syntax for each specification looks like:

  * Constant Value (`<constantValue>`): `<double> | <int> | <stringLiteral> | null`
  * Constant non key: `<constantValue> for <field>`

* Use the `takeLast` option to fill in values for non-key fields by taking the value from the previous timeslice. This requires the `timeslice` generator be defined.

**Rules**

* In Live Dashboards, you must use the `fillmissing` operator after an aggregate operator.
* Buckets from the timeslice generator need to be based on a time period. Supported `<time_period>` values are weeks `(w)`, days `(d)`, hours `(h)`, minutes `(m)`, and seconds `(s)`.

**Examples**

#### Timeslice generator

This example query counts the number of login events in 15-minute timeslices. Notice that in the query with `fillmissing`, timeslices with a count of zero are shown in the output.

Notice also that for the timeslice generator, the key field name is optional. (It defaults to `_timeslice`.)

<Tabs
  groupId="timeslice-generator"
  className="unique-tabs"
  defaultValue="tab1"
  values={[
    {label: 'Without Fillmissing', value: 'tab1'},
    {label: 'With Fillmissing', value: 'tab2'},
  ]}>

<TabItem value="tab1">

```sql
login
| timeslice 15m
| count by _timeslice
| sort by _timeslice
```

![fillmissing-example-1-without.png](/img/search/searchquerylanguage/search-operators/fillmissing-example-1-without.png)

</TabItem>
<TabItem value="tab2">

```sql
login
| timeslice 15m
| count by _timeslice
| fillmissing timeslice
| sort by _timeslice
```

![fillmissing-example1-with.png](/img/search/searchquerylanguage/search-operators/fillmissing-example1-with.png)

</TabItem>
</Tabs>

#### Value generator

This example query counts by a discrete field (`type`). Here, you can use the `value()` generator to enumerate the three types (web, api, and internal) that are required in the output.

Notice also how we changed the default value of `_count` from 0 to -1.

<Tabs
  groupId="value-generator"
  className="unique-tabs"
  defaultValue="tab3"
  values={[
    {label: 'Without Fillmissing', value: 'tab3'},
    {label: 'With Fillmissing', value: 'tab4'},
  ]}>

<TabItem value="tab3">

```sql
login
| count by type
```

![fillmissing-example-1-without.png](/img/search/searchquerylanguage/search-operators/fillmissing-example2-without.png)

</TabItem>
<TabItem value="tab4">

```sql
	login
| count by type
| fillmissing values("web", "api", "internal") in type
  with -1 for _count
```

![fillmissing-example1-with.png](/img/search/searchquerylanguage/search-operators/fillmissing-example2-with.png)

</TabItem>
</Tabs>

#### All option

The all option uses all the distinct values for the field from the query results without requiring you to enumerate the values of the field manually.

```sql
_sourceCategory="asthana_json_test" and _collector="Asthana-Test"
| timeslice 1m
| count by _timeslice, sweets
| fillmissing timeslice, values all in sweets
| transpose row _timeslice column sweets
```

This query provides the following results:

![all option with transpose.png](/img/search/searchquerylanguage/search-operators/all-option-with-transpose.png)

#### Multiple generators and transpose

This example shows how multiple generators can be used to enumerate every combination of the required values in two key fields (`type` and `_timeslice`). Notice that while transpose can show some of the missing values, it misses the rows where none of the types have any data.

<Tabs
  groupId="multiple-generator"
  className="unique-tabs"
  defaultValue="tab1"
  values={[
    {label: 'Without Fillmissing', value: 'tab1'},
    {label: 'With Fillmissing', value: 'tab2'},
  ]}>

<TabItem value="tab1">

```sql
login
| parse "Completed in * ms." as latency
| timeslice 15m
| pct(latency, 99) by type, _timeslice
| transpose row _timeslice column type
```

![fillmissing-example-1-without.png](/img/search/searchquerylanguage/search-operators/fillmissing-example3-none.png)

</TabItem>
<TabItem value="tab2">

```sql
login
| parse "Completed in * ms." as latency
| timeslice 15m
| pct(latency, 99) by type, _timeslice
| fillmissing timeslice,
  values("rework", "view", "mix") in type
| transpose row _timeslice column type
```

![fillmissing-example1-with.png](/img/search/searchquerylanguage/search-operators/fillmissing-example3-before.png)

</TabItem>
</Tabs>

Note that in this simple example, you can achieve a similar effect without the need to specify all the expected values for the `type` field, by applying the `fillmissing` operator after the `transpose`, like this:

```sql
login
| parse "Completed in * ms." as latency
| timeslice 15m
| pct(latency, 99) by type, _timeslice
| transpose row _timeslice column type
| fillmissing timeslice
```

However, the filled-in fields will always be null (instead of 0 like in the previous example). Currently, there is no way to change the default null value.

#### Takelast option

```sql
_sourceCategory="asthana_json_test" and _collector="Asthana-Test"
| timeslice 1m
| count by _timeslice, sweets
| fillmissing timeslice, values all in sweets takelast
| transpose row _timeslice column sweets
```

This query provides the following results:

![takeLast with transpose.png](/img/search/searchquerylanguage/search-operators/takeLast-with-transpose.png)

</details>


---
## filter operator

<details><summary><small>Use the <code>filter</code> operator to filter the output of a search based on the filtering criteria of a child query. The filter operator keeps only the records that match the filter criteria, allowing you to restrict search results to the most relevant information.</small></summary>

**Syntax**

```sql
"filter" <fieldname>+ in (<child_query>)
<child_query> ::= (non data-retrieval sumo query )
<fieldname> ::= (name of a field)
```

#### Caveats

* Filter operator must follow an aggregate operator.
* All the fields must be present in the output fields for the child query.
* The compare operator and filter operator are not supported in the child query. 
* The filter operator can be used instead of the `where` operator.

#### Limitations

The operator can process up to 100,000 data points for a single query. It automatically drops the data points that exceed the limit and issues a warning. 

**Examples**

##### Show all source hosts with outlier violations

```sql
_sourceCategory=HttpServers
| timeslice 1m
| count by _timeslice, _sourceHost
| filter _sourcehost in (outlier _count by _sourceHost | where _count_violation > 0)
| transpose row _timeslice column _sourcehost
```

##### Show top two source hosts with the most messages

```sql
_sourceCategory=HttpServers
| timeslice 1m
| count by _timeslice, _sourceHost
| filter _sourcehost in (sum(_count) by _sourceHost | top 2 _sourceHost by _sum )
| transpose row _timeslice column _sourcehost
```

##### Show top three source hosts with most outlier violations

```sql
_sourceCategory=HttpServers
| timeslice 1m
| count by _timeslice, _sourceHost
| filter _sourcehost in (outlier _count by _sourceHost | sum(_count_violation) by _sourcehost | top 3 _sourceHost by _sum )
| transpose row _timeslice column _sourcehost
```

</details>

---
## format

<details><summary><small>The <code>format</code> operator allows you to format and combine data from parsed fields. Numbers, strings, and dates can be formatted into a user-defined string. This allows data in logs, such as dates or currency amounts, to be formatted as human readable, when otherwise it would be hard to decipher.</small></summary>

The [Concat](#concat) operator is a simpler version of the Format operator, and may be used instead for simpler use cases.

**Syntax**

```sql
format(<formatSpecifier>, <field1>[, <field2>, <field3>, ...]) as <field>
```

The Sumo Logic Format operator supports all Java String.format syntax, as defined in [Oracle's Formatter](https://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html#syntax)

**Rules**

* The first argument to the Format operator must be a format specifier, which is a string.
* You must define a name for the new field to use Format. There is no default alias.
* The operator allows up to 16 input fields to format. To use more than 16 inputs, you can combine operators.
* AND and OR are not supported
* If a field is null or incompatible, an error will be thrown.
* Use the Format operator after the aggregate.
* You must convert your data type to numeric before converting to hexadecimal, or your data will be dropped.

**Examples**

##### Format two strings into one string

In this query, we search for errors, then parse the field “fiveMinuteRate” as “rate”, then combine the text “Five Minute Rate is :” and the rate together as “formattedVal”.

```sql
error
| parse "fiveMinuteRate=*," as rate
| format("%s : %s","Five Minute Rate is :" , rate) as formattedVal
```

which results in:

![Format](/img/search/searchquerylanguage/search-operators/Format.png)

##### Format numbers

You can format big decimals, this one sets up to 20.

```sql
| format( "%.20f",number) as bigDecimal
```

This query allows you to format number fields from a message log into a
properly formatted, human-readable currency amount.

```sql
| format( "$%.2f",number) as currency
```

This query does the same but also places thousands separators.

```sql
| format("$%,.2f",number)  as currency
```

##### Formatting dates

Use the following query to format fields in a message log into a
readable date.

```sql
| parse “*-*-*” “as year, month, day | format (“%d/%d/%d”, month, day, year) as date
```

##### Convert strings to uppercase

Use this format specifier to convert strings to uppercase:

```sql
| format("%S: %d", name, age) as personAge
```

##### Convert numeric data to hexadecimal

For example, to convert a field, collectorId, to 16 character uppercase hexadecimal:

```sql
| parse “*-*-*” “as year, month, day
| format (“%d/%d/%d”, month, day, year) as date
```

##### Format a single value with a symbol, like percent, at the end

In this query, we have a single value, like the average cache miss percentage, and we add a "%" to the end.

```sql
| format("%.3f %s", avg_cache_miss_pct,"%") as avg_cache_miss_pct
```

For more options, see [toLowerCase and toUpperCase](#toLowerCase-and-toUpperCase).

</details>

---
## formatDate

<details><summary><small>The <code>formatDate</code> operator allows you to format dates in log files as a string in the format you require, such as US date formatting, European formatting, and timestamps. </small></summary>

**Syntax**

```sql
formatDate(<date> [, <format> [, <timeZone>]]) as <field>
```

**Returns:**

A date String, in US-style date format if no format is specified. The date is in the local timezone of the user if no timeZone is specified.

**Parameters:**

* **date** - milliseconds (13 digits), as a Long. You can also use formatDate with the [Now](#now) operator.
* **format** - any valid date and time pattern String accepted by Java’s [SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html). For more details about specifying the **format** see [Timestamps, Time  Zones, Time Ranges, and Date Formats](docs/send-data/reference-information/time-reference.md).
* **timeZone** - a String, such as "America/Los_Angeles" or "Europe/London"

:::important
Convert the date parameter to Long if necessary. Passing a String can produce the error: "Multiple definitions found for function formatDate(String, String)." The solution is to cast the date parameter using the [toLong](#casting-data-to-a-number-or-string) operator.
:::

**Examples**

##### Date format yyyy-MM-dd

Use the following query to return results for the current date using the date format **yyyy-MM-dd**.

```sql
* | formatDate(now(), "yyyy-MM-dd") as today
```

This creates the today column, and returns the following results.

![FormatDate](/img/search/searchquerylanguage/search-operators/FormatDate.png)

##### European date format** **dd-MM-yyyy

Use the following query to create a **today** column, and return the results using the European date format of day, month, year, **dd-MM-yyyy**.

```sql
* | formatDate(now(),"dd-MM-yyyy") as today
```

This returns the following results:

![EuropeanDateFormat](/img/search/searchquerylanguage/search-operators/EuropeanDateFormat.png)

##### US date format with a timestamp

This example creates a **today** column and uses the US date format with a timestamp, **MM-dd-yyyy HH:mm**.

```sql
* | formatDate(now(), "MM-dd-yyyy HH:mm", "America/New_York") as today
```

Which returns results like:

![DateTimestamp](/img/search/searchquerylanguage/search-operators/DateTimestamp.png)

##### Find messages with incorrect timestamps

This query allows you to find messages with incorrect timestamps.

```sql
* | formatDate(_receipttime, "MM/dd/yyyy HH:mm:ss:SSS") as receiptDate
| formatDate(_messageTime, "MM/dd/yyyy HH:mm:ss:SSS") as messageDate
| _receiptTime - _messageTime as delay
| delay / 60000 as delayInMinutes
```

This query produces results like this:

![Incorrect Timestamp](/img/search/searchquerylanguage/search-operators/IncorrectTimestamp.png)

##### Determine age of log messages

This query lets you determine the age of your log messages.

```sql
* | formatDate(_messageTime, "MM/dd/yyyy HH:mm:ss:SSS") as messageDate
| formatDate(now(), "MM/dd/yyyy HH:mm:ss:SSS") as today
| now() as currentTime
| currentTime - _messageTime as messageAge
| messageAge / (60*1000) as messageAgeInMinutes
```

Which produces results like this:

![Message age](/img/search/searchquerylanguage/search-operators/MessageAge.png)

##### Messages by Day of the Week

To get the day of the week from your logs, you can reference your log's timestamps, which are stored as the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_messageTime`. You can also parse out any dates in your logs and use the [formatDate](#formatDate) operator to get the day of the week.  

Beginning with the `_messageTime` field, you can determine the day of the week, and then remove the days you don't want using the formatDate operator. This example query provides results only for Mondays:

```sql
| formatDate(_messagetime, "EEE") as day
| where day="Mon"
```

This example query provides only weekday results:

```sql
| formatDate(_messagetime, "EEE") as day
| where !(day="Sat" or day="Sun")
```

If you don't use `_messageTime`, and instead parse out another timestamp, you can convert it to milliseconds and determine the day this way:

```sql
| parseDate(parsedtime, "MM/dd/yyyy HH:mm:ss a") as inMilliseconds
```

##### Format a milliseconds (13 digits) epoch value

With the following example query:

```sql
_sourceCategory=sourceCategory
| parse "] [*][*][*].[*]" as (user, datasource, session, command)
| count, min(_messageTime), max(_messageTime) by session
```

You get the following results:

| # | session | _count | _min | _max |
|--------|------------------|-------------|-------------|-------------|
|  1     | 7oEmE+KLpk1nVYpF | 22          | 1.35844e+12 | 1.35844e+12 |
|  2     | 6uklr9UDkTOg79je | 412         | 1.35844e+12 | 1.35844e+12 |
|  3     | q0K6ztX9IvpZWh1p | 18          | 1.35844e+12 | 1.35844e+12 |

In the results, the **`_min`** and **`_max`** values are displayed as an epoch value. You can format these epoch values into a readable date with an experimental operator, **`toLong`**.

* [toLong](#casting-data-to-a-number-or-string) casts the data into a Long data type as milliseconds.

Normally, to convert the epoch time into a date formatted string you'd do something like this:

```sql
* | formatDate(_messagetime, "``MM-dd-``yyyy`` HH:mm:ss") as myDate
```

However, in the case where you are using **Min** and **Max** to get the first and last values, you also need to convert the return value to a "Long" value type using the experimental [toLong](#casting-data-to-a-number-or-string) operator. This is because when you run the **Min** and **Max** operators, the return value gets reformatted as a "Double" value type that the formatDate operator can't read.

```sql
* | count, min(_messagetime) as mindate | formatDate(toLong(mindate))
```

For the given example, the following query gets the proper date/time values in the results:

```sql
_sourceCategory=sourceCategory
| parse "] [*][*][*].[*]" as (user, datasource, session, command)
| count, min(_messagetime) as mindate, max(_messagetime) as maxdate by session
| formatDate(toLong(mindate),"MM-dd-yyyy HH:mm:ss:SSS") as mindate
| formatDate(toLong(maxdate),"MM-dd-yyyy HH:mm:ss:SSS") as maxdate
```

##### Format a seconds (10 digits) epoch value

If your timestamp is a normal Unix timestamp it is in seconds since January 1, 1970 at 00:00:00 GMT. The formatDate operator requires your timestamp to be in milliseconds. Therefore, you need to convert by multiplying by 1,000 since there are 1,000 milliseconds in a second.

```sql
...
| toLong(eventTimeInEpochSeconds * 1000) as eventTimeInEpochMs
| formatDate(eventTimeInEpochMs, "MM-dd-yyyy") as eventTimeHuman
```

</details>

---
## Geo Lookup (Map)

<details><summary><small>Sumo Logic can match a <a href="/docs/search/search-query-language/parse-operators">parsed</a> IPv4 or IPv6 address to its geographical location on a map. To create the map the <code>lookup</code> operator matches parsed IP addresses to their physical location based on the latitude and longitude of where the addresses originated. The precision for latitude and longitude degrees is up to five decimal places. </small></summary>

Any IP addresses that don't have a location, such as internal addresses, will return null values.

:::note
The Geo Lookup (Map) operator is the first step in creating [Map Charts](/docs/dashboards-new/panels/map-charts).
:::

Required fields:

* latitude
* longitude
* _count

Optional fields, depending on how specific you’d like the output to
be you can include all the optional fields or choose a subset:

* continent
* country_code
* country_name
* region
* city
* state
* postal_code
* connection_type
* country_cf
* state_cf
* city_cf

Details of these data fields can be found in [Neustar's documentation](https://ipintelligence.neustar.biz/portal/#documentation) under the GeoPoint Data Glossary topic.

**Syntax**

The Geo Lookup operator uses <a href="#lookup-classic">lookup</a> with a specific path, `geo://location`, to produce a map. 

To map the IP addresses properly you must [count](/docs/search/search-query-language/group-aggregate-operators#count-count_distinct-count_frequent) by the `latitude` and `longitude` fields. You must have the `_count` field in your results. If you want to use a different field's value [rename](#as-operator "as operator") it to `_count` so the map uses the field.

Your query should use the following syntax:

```sql
| parse "[ip_fieldname]" as [ip_address]
| lookup latitude, longitude [optional_geo_locator fields]
  from geo://location on ip=[ip_address]
| count by latitude, longitude, [other geo_locator fields]
| sort _count
```

This syntax produces aggregate results, so you can add a map to a Dashboard.

#### Limitations

* Map charts have a display limit of 10,000 results.
* Colors of map markers can't be changed.

**Examples**

Sample log message:

```
2017-12-13 10:29:17,037 -0800 INFO [hostId=prod-frontend-1] [module=SERVICE] [logger=service.endpoint.auth.v1.impl.AuthenticationServiceDelegate [thread=btpool0-8] [remote_ip=67.180.85.25] Successful login for user 'da@users.com', organization: '0000000000000005
```

Using logs that match the example log format, running a query like this:

```sql
| parse "remote_ip=*]" as remote_ip
| lookup latitude, longitude from geo://location on ip = remote_ip
| count by latitude, longitude
| sort _count
```

would produce the following results:

![geo lookup world map.png](/img/search/searchquerylanguage/search-operators/geo-lookup-world-map.png)

##### View map of Geo Lookup results

Enter a query that parses the IP field from your logs, a **lookup** operator to match IP addresses to a lookup table, and then the geolocation fields you’d like to use to chart each IP address.

1. By default, results display as a table:  

    ![geo lookup results fields.png](/img/search/searchquerylanguage/search-operators/geo-lookup-results-fields.png)

1. Click the **Map** icon in the **Aggregates** tab. The map displays:  

    ![map icon location.png](/img/search/searchquerylanguage/search-operators/map-icon-location.png)

1. Do any of the following:

    * Use the zoom slider to zoom in or out on an area of the map. Alternately, click and drag to zoom in or see different areas of a map.
    * Click any marker on the map to see more detail about where IPs originate in a specific area:  

        ![click map marker with zoomed results.png](/img/search/searchquerylanguage/search-operators/click-map-marker-with-zoomed-results.png)

1. (Optional) Click **Add to Dashboard** to create a new Dashboard or add the map to an existing Dashboard. After adding a map to a Dashboard you will still be able to zoom in and drill down on the data.

#### Handle null values

To find a mismatch from a geo lookup operator query, use the [isNull](#isNull) operator.

For example, running a query like:

```sql
| parse "remote_ip=*]" as remote_ip
| lookup country_code from geo://location on ip = remote_ip
| if (isNull(country_code), "unknown", country_code) as country_code
```

returns results similar to:

![isNull.png](/img/search/searchquerylanguage/search-operators/isNull.png)

</details>

---
## geoip

<details><summary><small>Sumo Logic can match a <a href="/docs/search/search-query-language/parse-operators">parsed</a> IPv4 or IPv6 address to its geographical location on a <a href="/docs/dashboards-new/panels/map-charts">map chart</a>. To create the map, the <code>geoip</code> operator matches parsed IP addresses to their physical location based on the latitude and longitude of where the addresses originated. The precision for latitude and longitude degrees is up to five decimal places. </small></summary>

Any IP addresses that don't have a location, such as internal addresses, will return null values.

**Syntax**

```sql
geoip <ip_address_field> [<optional_field1>, <optional_field2>...]
```

##### Default result fields

* latitude
* longitude
* country_code
* country_name
* city
* state

##### Optional fields

Depending on how specific you’d like the output to be you can include
all the optional fields or choose a subset:

* region
* continent
* postal_code
* connection_type
* country_cf
* state_cf
* city_cf

Details of these data fields can be found in [Neustar's documentation](https://ipintelligence.neustar.biz/portal/#documentation) under the GeoPoint Data Glossary topic.

**Syntax** to Map

To map the IP addresses properly you must [count](/docs/search/search-query-language/group-aggregate-operators#count-count_distinct-count_frequent) by the `latitude` and `longitude` fields. You must have the `_count` field in your results. If you want to use a different field's value [rename](#as-operator) it to `_count` so the map uses the field.

Your query should use the following syntax:

```sql
| parse "[ip_fieldname]" as [ip_address]
| geoip ip_address
| count by latitude, longitude, [other geo_locator fields]
```

This syntax produces aggregate results, so you can add a map to a Dashboard.

#### Limitations

* Map charts have a display limit of 10,000 results.
* Colors of map markers can't be changed.

**Examples**

Sample log message:

```
2017-12-13 10:29:17,037 -0800 INFO [hostId=prod-frontend-1] [module=SERVICE] [logger=service.endpoint.auth.v1.impl.AuthenticationServiceDelegate [thread=btpool0-8] [remote_ip=67.180.85.25] Successful login for user 'da@users.com', organization: '0000000000000005
```

Using logs that match the example log format, running a query like this:

```sql
| parse "remote_ip=*]" as remote_ip
| geoip remote_ip
| count by latitude, longitude
| sort _count
```

would produce the following results:

![geo lookup world map.png](/img/search/searchquerylanguage/search-operators/geo-lookup-world-map.png)

##### View map of geoip results

Enter a query that parses the IP field from your logs, a **geoip** operator to match IP addresses and return geolocation fields you’d like to use to chart each IP address.

1. By default, results display as a table:  

    ![geo lookup results fields.png](/img/search/searchquerylanguage/search-operators/geo-lookup-results-fields.png)

1. Click the **Map** icon in the **Aggregates** tab. The map displays:  

    ![map icon location.png](/img/search/searchquerylanguage/search-operators/map-icon-location.png)

1. Do any of the following:

   * Use the zoom slider to zoom in or out on an area of the map. Alternately, click and drag to zoom in or see different areas of a map.
   * Click any marker on the map to see more detail about where IPs originate in a specific area:  

       ![click map marker with zoomed results.png](/img/search/searchquerylanguage/search-operators/click-map-marker-with-zoomed-results.png)

1. (Optional) Click **Add to Dashboard** to create a new Dashboard or add the map to an existing Dashboard. After adding a map to a Dashboard you will still be able to zoom in and drill down on the data.

##### Optional fields

This example returns the optional fields region, continent, and postal_code.

```sql
| parse "remote_ip=*]" as remote_ip
| geoip remote_ip
| count by latitude, longitude, region, continent, postal_code
```

##### Handle null values

To find a mismatch from a geo lookup operator query, use the [isNull](#isNull) operator.

For example, running a query like:

```sql
| parse "remote_ip=*]" as remote_ip
| geoip remote_ip
| if (isNull(country_code), "unknown", country_code) as country_code
```

returns results similar to:

![isNull.png](/img/search/searchquerylanguage/search-operators/isNull.png)

</details>

---
## hash

<details><summary><small>The <code>hash</code> operator uses a cryptographic hash algorithm to obscure data into a random string value. The operator supports MD5, SHA1, SHA2, and MurmurHash3 algorithms. The default is MD5 if no algorithm is specified.</small></summary>

This is helpful when working with sensitive data such as email addresses, usernames, credit cards, and social security numbers. Each unique value will have a unique hash code allowing you to maintain anonymity.

**Syntax** 

As a Search operator, hash processes the provided field against the specified algorithm to change the current values into random unique values.

```sql
hash(<field>[<algorithm]) [as <field>]
```

Where:

* `<algorithm>` - Define the algorithm type as either `md5`, `sha1`, `sha2_256`, or `murmur3_128`. The default is `md5`.

**Examples**

##### Email address

Hash a field of email addresses.

```sql
_sourceCategory=myLogs
| parse "email=*" as email_address
| hash("email_address", "md5") as hashed_email
```

##### Username

Find a hashed username with the help of the [where](#where) and [matches](#matches) operators.

```sql
_sourceCategory=myLogs
| parse "username=*" as username
| where username matches hash("username", "md5")
```

#### Source IP

Get the source IP addresses by user hashes.

```sql
_sourceCategory=myLogs
| parse "username=*" as username
| parse "src_ip=*" as src_ip
| hash(username, "sha_256") as user_hash
| count by src_ip, user_hash
```

#### Unique identifier

Create a unique identifier for each log message by concatenating the built-in metadata fields (image below) `_messagetime` and `_messageid`.

```sql
| hash(concat(_messagetime, _messageid), "sha1") as guid
```

![built-in metadata fields](/img/search/get-started-search/build-search/dynamic-parsing/copy-button-messages-table.png)

</details>

---
## haversine

<details><summary><small>The <code>haversine</code> operator returns the distance between latitude and longitude values of two coordinates in kilometers. Coordinates need to be positive or negative values based on being north/south or east/west, instead of using the terms N/S, E/W.</small></summary>

**Syntax**

```sql
haversine(<latitude1>, <longitude1>, <latitude2>, <longitude2>) as <field>
```

**Example**

```sql
| haversine(39.04380, -77.48790, 45.73723, -119.81143) as distanceKMs
```

This returns a field named distanceKMs with the value '3,512.71000'.

#### Return value in miles

To convert kilometers (KM) to miles you can divide the KM value by 1.609344.

```sql
| haversine(39.04380, -77.48790, 45.73723, -119.81143)/1.609344 as distanceMiles
```

</details>

---
## hexToAscii

<details><summary><small>The <code>hexToAscii</code> operator converts a hexadecimal string to an ASCII string.</small></summary>

**Syntax**

```sql
hexToAscii(<hexadecimal_field>) as <field>
```

```sql
hexToAscii("<hexadecimal string>") as <field>
```

**Example**

The following returns `V` with a value of `hello world`:

```sql
| hexToAscii("68656c6c6f20776f726c640a") as V
```

</details>

---
## hexToDec

<details><summary><small>The <code>hexToDec</code> operator converts a hexadecimal string of 16 or fewer
characters to a long data type using Two's Complement for negative values.</small></summary>

**Syntax**

```sql
hexToDec("<hexadecimal string>") as <field>
```

```sql
hexToDec(<hexadecimal_field>) as <field>
```

**Examples**

The following returns `V` with a value of `4919`

```sql
| hexToDec("0000000000001337") as V
```

```sql
... | count by _collector | decToHex(_count) as v | hexToDec(v) as h
```

```sql
... | count by _collector | where _count = hexToDec("7AF")
```

</details>

---
## if operator and ?

<details><summary><small>There are two forms of ternary expression you can use in Sumo Logic queries: one is constructed using the <code>if</code> operator, and the other uses the question mark (<code>?</code>) operator. The syntax varies slightly, but the results are equivalent. You can use the syntax you are most comfortable with.</small></summary>

These expressions are used to evaluate a condition as either true or false, with values assigned for each outcome. It is a shorthand way to express an if-else condition. On the basis of the test, the entire expression returns `value_if_true` if the condition is `true`, else `value_if_false` if the condition is `false`. The two sub-expressions (`value_if_true` and `value_if_false`) must have the same type.

**Syntax**

```sql
if(<condition>, <value_if_true>, <value_if_false>) as <field>
```

**Examples**

```sql
| if(status_code matches "5*", 1, 0) as serverError
```

```sql
| if(status_code matches "2*", 1, 0) as success
```

```sql
if(!(status_code matches "2*"), 1, 0) as failure
```

```sql
| if(status matches "WARN" or status matches "ERROR", 1, 0) as status
```

```sql
| if(alpha > 1 and beta > 5, "true", "false") as conditionState
```

#### Nested if statement (if...elseif...else)

To create **nested** if statements, your query should use the following
syntax:  

```sql
| if(message matches "*/schedule?*","Alert Scheduled",
if(message matches "*/update?*","Alert Updated",
if(message matches "*/cancel?*","Alert Canceled","N/A"))) as problem
```

#### Question mark (?) syntax

```sql
<condition> ? <value_if_true> : <value_if_false> as <field>
```

#**Examples**

```sql
| disk_usage > threshold ? "disk full" : "OK" as status
```

```sql
| !(disk_usage > threshold) ? "disk full" : "OK" as status
```

```sql
| a < b ? a : b as this_or_that     // This is the same as min(a, b)
```

For information on handling null values, see [isNull](#isNull) operator.

</details>

---
## in operator

<details><summary><small>The <code>in</code> operator returns a Boolean value: true if the specified property is in the specified object, or false if it is not.</small></summary>

**Syntax**

```sql
<field> in (<value_1>[, <value_2>, <value_3>, ...])
```

In the syntax, we are checking the value of the field provided for the \<field\> argument.

If the value of `<field>` matches any of value arguments (`<value_1>, <value_2>, ...`) the function will return true. Otherwise, it will return false.

**Examples**

##### Find 5xx or 4xx errors, otherwise OK message

The following query:

```
_sourceCategory=Apache/Access
| parse "GET * HTTP/1.1\" * * \"*\"" as url, status_code, size, referrer
| if (status_code in ("500", "501", "502", "503", "504", "505", "506", "401", "402", "403", "404"), "error", "OK message") as reason
```

would return results similar to:

![in](/img/search/searchquerylanguage/search-operators/in.png)

</details>

---
## ipv4ToNumber

<details><summary><small>The <code>ipv4ToNumber</code> operator allows you to convert an Internet Protocol version 4 (IPv4) IP address from the octet dot-decimal format to a decimal format. This decimal format makes it easier to compare one IP address to another, rather than relying on IP masking.</small></summary>

:::tip
The [CIDR operator](#CIDR) allows you to leverage CIDR (Classless Inter-Domain Routing) notation to narrow the analysis of IPv4 networks to specific subnets.
:::

**Syntax**

```sql
ipv4ToNumber(<ip_addr>) [as <field>]
```

**Rules**

* The input to the function must be a valid IPv4 address string.

**Examples**

##### Parse IP addresses and convert to number

The following query parses IP addresses, and converts them to numbers, then uses the fields operator to remove all fields except "ip" and "num".

```sql
_sourceCategory=service remote_ip
| parse "[remote_ip=*]" as ip
| ipv4ToNumber(ip) as num
| fields ip, num
```

would produce results like:

![ipv4](/img/reuse/query-search/ipv4ToNumber.png)

##### Detect the IP range for a single user

The following query looks at the number of IP addresses, and the IP range, by user. This could be used to determine if someone has hacked a user account.

```sql
_sourceCategory=service remote_ip
| parse "auth=User:*:" as user
| parse "[remote_ip=*]" as remote_ip
| ipv4ToNumber(remote_ip) as remote_ip_dec
| max(remote_ip_dec) as max_ip, min(remote_ip_dec) as min_ip, count_distinct(remote_ip_dec) as count_ips by user
| max_ip - min_ip as ip_range
| where ip_range > 0
| fields user, count_ips, ip_range
```

would produce results like:

![ipv4ToNumber](/img/search/searchquerylanguage/search-operators/ipv4ToNumber.png)

</details>


---
## isNull, isEmpty, isBlank

<details><summary><small><ul>
<li>The <code>isNull</code> operator checks a string and returns a boolean value: true if the string is null, or false if the string is not null.</li>
<li>The <code>isEmpty</code> operator checks if a string contains no characters and is only whitespace.</li><li> The <code>isBlank</code> operator checks if a string contains no characters, is only whitespace, and is null.</li>
</ul></small></summary>

#### When is a field null?

Fields can hold a null value for the following reasons:

* A [parsing operation](/docs/search/search-query-language/parse-operators) failed to parse a value.
* There is a mismatch from a <a href="#lookup-classic">lookup</a> operator query.
* There is a missing field from a [geo lookup](#geo-lookup-map) operator query.
* There is a missing field from a [transpose](#transpose) operator query.

#### When to use isNull, isEmpty, isBlank

##### isNull(<`string`>)

Checks if the `<string>` value is "null".

* `isNull(null) = true`
* `isNull("") = false`
* `isNull(" ") = false`
* `isNull("bob") = false`
* `isNull(" bob ") = false`

Returns `true` if the string is null.

##### isEmpty(<`string`>)

Checks if the `<string>` value is an empty string containing no characters or whitespace.

* `isEmpty(null) = true`
* `isEmpty("") = true`
* `isEmpty(" ") = false`
* `isEmpty("bob") = false`
* `isEmpty(" bob ") = false`

Returns `true` if the string is null or empty.

##### isBlank(<`string`>)

Checks if the value is null, empty, or contains only whitespace characters.

* `isBlank(null) = true`
* `isBlank("") = true`
* `isBlank(" ") = true`
* `isBlank("bob") = false`
* `isBlank(" bob ") = false`

Returns `true` if the string is null, empty, or only whitespace.

**Examples**

**Run a geo lookup query where we can find remote IP addresses that are not in the geo database.**

In this situation, no `country_code` will be associated with the IP address and the field value will be null.

Running a query like:

```sql
| parse "remote_ip=*]" as remote_ip
| lookup country_code from geo://location on ip = remote_ip
| if (isNull(country_code), "unknown", country_code) as country_code
```

uses the `isNull` operator to check the field value of `country_code` and if it returns `true` has the `if` operator replace the value with the string `unknown`:

![isNull](/img/search/searchquerylanguage/search-operators/isNull.png)

**Use [where](#where) to check for null values.**

To check for null values from a lookup operation, use a query like:

```sql
| parse "example_ip=*]" as ip
| lookup country_name, city from geo://location on ip = ip
| where isNull(country_name)
```

</details>

---
## isNumeric

<details><summary><small>The <code>isNumeric</code> operator checks whether a string is a valid Java number. Valid numbers include hexadecimals marked with the 0x or 0X qualifier, octal numbers, scientific notation and numbers marked with a type qualifier, like <code>123L</code>. </small></summary>

**Syntax**

* `isNumeric(\<strin\>") as\<fiel\>`
* `isNumeric\<string_fiel\>) [as\<fiel\>]`

**Rules**

* Returns `true` if the string is a valid Java number.
* Null and empty/blank strings will return `false`.
* Non-hexadecimal strings beginning with a leading zero are treated as octal values. Thus the string `09` will return false, since `9` is not a valid octal value. However, numbers beginning with `0` are treated as a decimal.

**Examples**

```sql
| isNumeric(num)
```

The following returns `true`:

```sql
| isNumeric("1.56") as isNum
```

The following returns `true`:

```sql
| isNumeric("1e5") as isNum
```

</details>


---
## isPrivateIP

<details><summary><small>The <code>isPrivateIP</code> operator checks if an IPv4 address is private and returns a boolean.</small></summary>

**Syntax**

```sql
isPrivateIP("<IPv4_string>") as <field>
```

```sql
isPrivateIP(<IPv4_string_field>) [as <field>]
```

**Rules**

* Returns `true` if the input is a valid private IPv4 address.
* Invalid IPv4 addresses are dropped from the results.

The following warning is shown when results are dropped or an IPv6
address is detected:  
    
![isprivateip operator warning for dropped invalid ip addresses.png](/img/search/searchquerylanguage/search-operators/isprivateip-dropped-warning.png)

**Examples**

`| isPrivateIP(dest_host)`

The following returns `true`:

```sql
| isPrivateIP("10.255.255.255") as isPrivate
```

The following returns `true`:

```sql
| isPrivateIP("192.168.0.1") as isPrivate
```

The following returns `false`:

```sql
| isPrivateIP("127.0.0.1") as isPrivate
```

</details>

---
## isPublicIP

<details><summary><small>The <code>isPublicIP</code> operator checks if an IPv4 address is public and returns a boolean.</small></summary>

**Syntax**

```sql
isPublicIP("<IPv4_string>") as <field>
```

```sql
isPublicIP(<IPv4_string_field>) [as <field>]
```

**Rules**

* Returns `true` if the input is a valid public IPv4 address.
* Invalid IPv4 addresses are dropped from the results.

The following warning is shown when results are dropped or an IPv6 address is detected:  
    
![isprivateip operator](/img/search/searchquerylanguage/search-operators/isprivateip-dropped-warning.png)

**Examples**

```sql
| isPublicIP(dest_host)
```

The following returns `false`:
```sql
| isPublicIP("10.255.255.255") as isPublic
```

</details>

---
## isReservedIP

<details><summary><small>The <code>isReservedIP</code> operator checks if an IPv4 address is reserved as defined by <a href="https://tools.ietf.org/html/rfc5735">RFC 5735</a> and returns a boolean.</small></summary>

**Syntax**

* `isReservedIP(\<IPv4_strin\>") as\<fiel\>`
* `isReservedIP\<IPv4_string_fiel\>) [as\<fiel\>]`

**Rules**

* Returns `true` if the input is a valid reserved IPv4 address.
* Invalid IPv4 addresses are dropped from the results.

The following warning is shown when results are dropped or an IPv6 address is detected:  
    
![isprivateip operator warning for dropped invalid ip addresses.png](/img/search/searchquerylanguage/search-operators/isprivateip-dropped-warning.png)

**Examples**

```sql
| isReservedIP(dest_host)
```

The following returns `true`:

```sql
| isReservedIP("127.0.0.0") as isReserved
```

The following returns `true`:

```sql
| isReservedIP("169.254.0.0") as isReserved
```

The following returns `true`:

```sql
| isReservedIP("192.0.0.0") as isReserved
```

</details>


---
## isValidIP, isValidIPv4, isValidIPv6

<details><summary><small>The <code>isValidIP</code> operator checks if the value is a valid IP address. The <code>isValidIPv4</code> and <code>isValidIPv6</code> operators check if the value is a valid IPv4 or IPv6 address respectively. </small></summary>

**Syntax**

##### isValidIP

```sql
isValidIP("<IP_string>") as <field>
```

```sql
isValidIP(<IP_string_field>) [as <field>]
```

##### isValidIPv4

```sql
isValidIPv4("<IP_string>") as <field>
```

```sql
isValidIPv4(<IP_string_field>) [as <field>]
```

##### isValidIPv6

```sql
isValidIPv6("<IP_string>") as <field>
```

```sql
isValidIPv6(<IP_string_field>) [as <field>]
```

**Rules**

* Returns `true` if the input is a valid IP address.

**Examples**

```sql
| isValidIP(dest_host)
```

The following returns `true`:

```sql
| isValidIP("10.255.255.255") as isIP
```

The following returns `true`:

```sql
| isValidIP("192.168.0.1") as isIP
```

The following returns `false`:

```sql
| isValidIP("127.0.500.1") as isIP
```

</details>

---
## join

<details><summary><small>The <code>join</code> operator combines records of two or more data streams. Results are admitted on-the-fly to allow real time tables to be built. Values common to each table are then delivered as search results. The join operator in Sumo Logic works much like an <a href="https://en.wikipedia.org/wiki/Join_(SQL)#Inner_join">inner SQL join</a>.</small></summary>

**Syntax**

```sql
... | join
(parse "starting stream from *" AS a) as t1,
(parse "starting search * from parent stream *" AS b, c) as t2,
(parse "starting save * from parent stream *" AS d, e) as t3
on t1.a = t2.c
and t1.a = t3.e
```

A `timewindow` can be added to constrain how far apart in time records
are allowed to join, using the following syntax:

```sql
... | join
(parse "starting stream from *" AS a) as t1,
(parse "starting search * from parent stream *" AS b, c) as t2,
(parse "starting save * from parent stream *" AS d, e) as t3
on t1.a = t2.c
and t1.a = t3.e
[timewindow 10m]
```

To operate on fields in each table after the ON clause, use this syntax:

```sql
... | join
(parse "starting stream from *" AS a) AS t1,
(parse "starting search * from parent stream *" AS b, c) AS t2
on t1.a = t2.c
| fields t1_a, t2_b
```

**Rules**

* Two or more tables must be created for a query.
* The join expression can not specify a [keyword search expression](docs/search/get-started-with-search/build-search/keyword-search-expressions.md) (scope), if provided it is ignored.
* Data must be present in the time range you choose for the query.
* Join can be used in Dashboard Panels, but in the query they must be included after the first `group-by` phrase.
* [Subqueries](../subqueries.md) are supported, and can include aggregate operators.

#### Limitations

* There is a limit of 50,000 messages input in total, which is enforced as 25,000 per table for a join operation between two tables. If you go over this limit, you will receive an error message. 
* There is a limit of 10 million messages output in total, as it is possible to have more output messages than input messages from the two tables you may be performing a *join* on. If you go over this limit, you will receive the following error message: 

    `The number of output messages exceeds 10,000,000. Please refine your search or shorten the time range to reduce the number of output messages.`

* Only conjunctive conditions (AND) are allowed. Using NOT or OR conditions is not supported.
* [Real Time Alerts](docs/alerts/scheduled-searches/create-real-time-alert.md) don't support the join operator.
* The join operator uses sliding windows to store candidates for joins in order to prevent unbounded memory usage when joining between two large relations. Because of this, the result of the join could be incomplete and inconsistent from run-to-run.
* The following conditions are not currently supported in the ON clause:

    ```
    t1.a = 3
    t1.a != t2.c
    NOT t1.a
    t1.a = t2.c OR t1.b = t2.d
    ```

**Examples**

#### Running a Join operator query

For this example, run a Join query on two tables using logs that look like:

```
starting stream from stream-2454
starting stream from stream-7343
starting search search-733434 from parent stream stream-2454
starting search search-854343 from parent stream stream-7343
starting stream from stream-6543
starting search search-455563 from parent stream stream-6543
starting search search-32342 from parent stream stream-7343
```

Running a query like:

```sql
* | join
(parse "starting stream from *" AS a) AS T1,
(parse "starting search * from parent stream *" AS b, c) AS T2
on T1.a = T2.c
```

returns results similar to:

| a | b | c |
|-------------|---------------|-------------|
| stream-2454 | search-733434 | stream-2454 |
| stream-7343 | search-854343 | stream-7343 |
| stream-7343 | search-32342  | stream-7343 |
| stream-6543 | search-854343 | stream-6543 |

#### Performance

The join operator can consume significant processing time. Selectivity
reduces the number of log messages that must be considered. To improve
join operator performance, place the parse operators toward the start of
the query expression, bringing the search anchors to the front of the
search scope, as in this example:

```
("starting stream from" OR "starting search") | join
(parse "starting stream from *" AS a) AS t1,
(parse "starting search * from parent stream *" AS b, c) AS t2
on t1.a = t2.c...
```

#### Using Join with a Diff operator

Let’s say our logs look something like:

```
event=login session=12345 time=20130512
event=purchase session=12345 value=50
event=login session=23456 time=20130513
event=purchase session=12345 value=100
event=purchase session=23456 value=120
event=purchase session=23456 value=200
event=purchase session=23456 value=20
```

Running a query like:

```sql
* | join
(parse "event=login session=* time=*" AS s1,time) as t1,
(parse "event=purchase session=* value=*" AS s2, v2) as t2
on t1.s1 = t2.s2
```

Produces results similar to:

| s1 | time | s2 | v2 |
|--------|----------|--------|--------|
| 12345  | 20130512 | 12345  | 50     |
| 12345  | 20130512 | 12345  | 100    |
| 23456  | 20130513 | 23456  | 120    |
| 23456  | 20130513 | 23456  | 200    |
| 23456  | 20130513 | 23456  | 20     |

Adding a Diff operator, such as:

```sql
* | join
(parse "event=login session=* time=*" AS s1,time) as t1,
(parse "event=purchase session=* value=*" AS s2, v2) as t2
on t1.s1 = t2.s2
| diff t2_v2 by t2_s2
```

produces results similar to:

| s1 | time | s2 | v2 | _diff |
|--------|----------|--------|--------|------------|
| 12345  | 20170512 | 12345  | 50     | null       |
| 12345  | 20170512 | 12345  | 100    | 50         |
| 23456  | 20170513 | 23456  | 120    | null       |
| 23456  | 20170513 | 23456  | 200    | 80         |
| 23456  | 20170513 | 23456  | 20     | -180       |

In another example with diff, running a query such as:

```sql
_sourceCategory=[sourceCategoryName] | join
(parse "Attempting to execute task *. delay: * ms." as taskId, delay) as t1,
(parse "Completed execution of task *. Execution duration: * s" as taskId, duration) as t2
on t1.taskId = t2.taskId
| diff t1_delay as delay_diff
| fields t1_taskId, t1_delay, delay_diff, t2_duration
```

Produces results in the **Aggregate** tab like:

![NewAggregation.png](/img/search/searchquerylanguage/search-operators/NewAggregation.png)

#### Operate on fields after the ON clause

Assume you have a Join query, such as:

```sql
* | join
(parse "starting stream from *" AS a) AS t1,
(parse "starting search * from parent stream *" AS b, c) AS t2
on t1.a = t2.c
```

After the Join statement, to use the T1.a and the T2.b fields in subsequent clauses, you'd instead refer to them as T1_a and T1_b. For example, to use the [fields operator](#fields-operator) to single out the T1.a and T2.b values, use the following query:

```sql
* | join
(parse "starting stream from *" AS a) AS t1,
(parse "starting search * from parent stream *" AS b, c) AS t2
on t1.a = t2.c
| fields t1_a, t2_b
```

</details>

---
## length

<details><summary><small>The <code>length</code> operator returns the number of characters in a string. You can use it in where clauses or to create new fields.</small></summary>

For example, you'd use the Length operator in free text fields where content is arbitrary to find cases where the field has a substantial amount of text using **length() > minimum** in a query. Or in a case where a long length would be abnormal, you can find these strings quickly using **length() > 10000** in a query.

**Syntax**

```sql
length(<field>) [as <field>]
```

**Rules**

* If the string is null, it returns 0.
* The length operator only works on string fields.

**Examples**

**Find only short queries.**

Use the following query to find queries under 20 characters.

```sql
_sourceCategory=apache error
| parse "query: *," as query
| where length(query) <= 20
```

**Count by the length of the query.**

Use this query to count results by the length of the query.

```sql
_sourceCategory=apache error
| parse "query: *," as query
| length(query) as query_length
| count by query_length
| sort by _count desc
```

</details>

---
## limit

<details><summary><small>The <code>limit</code> operator reduces the number of raw messages or aggregate results returned. If you simply query for a particular term, for example "error" without using an aggregation operator such as group by, limit will reduce the number of raw messages returned. If you first use group-by or other aggregation operator, the limit operator will reduce the number of grouped results instead.</small></summary>

The limit operator is useful for creating lists of events for a Dashboard, which allows you to see at a glance, for example, the "Top 10" service operations, system operations, errors, or other system or user activities.

Sumo Logic Apps often use the limit operator in queries to display system data in Dashboards for various uses.

**Syntax**

```sql
limit #
```

**Rules**

* The limit operator supports requests for up to 10,000 results. You can't use "limit 10001" or more.

**Examples**

**Top 10 errors.**

In this example, we simply query for the term "error" without using an aggregation operator, and limit will reduce the number of raw messages returned to 10.

```sql
error *
| limit 10
```

The message tab displays only the first 10 error messages for the time
range you have queried.

**Count Top 5 errors for a source.**

In this query, you can search for errors, count by the `_sourceCategory`, sort by the count, and limit the results to the top 5 errors.

```sql
error *
| count by _sourceCategory
| sort by _count | limit 5
```

which would provide results similar to:

![limit operator](/img/reuse/query-search/limit_operator_example1.png)

**Top 10 Service Operations:**

In this query, you can see the top 10 Windows services per host that have started and stopped over the last 10 hours.

```sql
_sourceCategory=OS/Windows Service Control Manager
| parse regex "Message = \"The (?<service>\w.+?) service entered the (?<state>\w+) state"
| parse regex "ComputerName = \"(?<host>[^\"]+)\";"
| if(state="running", 1, 0) as starts
| if(state="stopped",1,0) as stops
| sum(starts) as starts, sum(stops) as stops by service,host
| sort by stops, starts
| limit 10
```

which can be displayed in a bar chart like this:

![Limit](/img/search/searchquerylanguage/search-operators/Limit.png)

See [Sort](#sort) operator for more information.

</details>

---
## lookup (Classic)

<details><summary><small>The <code>lookup</code> (classic) operator maps data in your log messages to meaningful information saved in Sumo or on an HTTPS server. For example, you'd use a lookup operator to map "userID" to a real user's name. Or, you'd use a lookup operator to find deny-listed IP addresses.</small></summary>

In either case, you will point the operator to one of the following:

* A table of saved data generated by the [Save](#save-lookups-classic) operator.
* A CSV file hosted on an HTTPS server. Attempting to run the lookup operator against a CSV hosted on an HTTP server will not be loaded in Sumo Logic.

:::note
This topic has information about the classic version of the `lookup` operator that works with the classic Lookup Tables feature. For information about the new, more scalable Lookup Tables feature and the new `lookup` operator that works with it, see <a href="/docs/search/lookup-tables">Lookup Tables</a> and <a href="#lookup">lookup</a>.
:::

**Syntax**

```sql
lookup <outputColumn-1> [as <field>] [,<outputColumn-2> [as <field>]] from <filePath> on <joinColumn-1> [,<joinColumn-2>]
```

Where:

* `outputColumn-x` is a list of field names in the header of the `filePath`.
* `filePath` is an HTTPS address of a CSV file containing the external relationship table or a table saved to the Sumo Logic file system by the Save operator.

    :::note
    Basic authentication is supported for CSV files, with the following syntax: `<https://USERNAME:PASSWORD@company.com/userTable.cs>`
    :::

* `joinColumn-x `is a list of pairs of field names that define the relationship between values in the log data results with matching values in an external table.

**Rules**

* The size limit for the CSV file is 8MB.
* If using an HTTPS resource, the file must be downloaded within 10 seconds. If the file can't be downloaded in 10 seconds, it is probably too large.
* Your `joinColumn-x` need to be of the same data type and are case sensitive. If your search result's field consists of integer data then the field in your external lookup table must also be integer data. You can cast data to a string or numeric value, see [Casting Data to a Number or String](#casting-data-to-a-number-or-string).
* If looking up a [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field you need to either [rename the field](#as-operator) using the `as` option in the lookup operation or [filter null values](#isNull) immediately after the lookup operation.

#### Structuring CSV files

Sumo Logic supports HTTPS-hosted lookup CSV files with the following restrictions:

* The CSV file must contain a header line.
* The header line can't use special characters.
* Fields that contain special characters, such as commas, must be enclosed in quotes. Wrapping all fields in your CSV file is worthwhile, though, as it would prevent any upload issues that might occur, should special characters be introduced in the future.
* No spaces are allowed between quotes and values. For example:  
    ```
    "id","name","time"
    "1","foo","6-15-12"
    "2","zoo","6-14-12"
    "3","woo","6-13-12"
    ```
* An URL provided to a lookup (classic) operator should be consistent in its use of query escape/unescaped parameters.   

    For example, the following URL is invalid since it is inconsistent in its use of escape characters (%7C versus \|):  

    `http://localhost:5000/test?v=csv&f1=indicator%7CSHA1&f2=indicator|SHA1`  

    These URLs will be accepted:  

    `http://localhost:5000/test?v=csv&f1=indicator*|SHA1&f2=indicator|*``SHA1``http``://localhost:5000/test?v=csv&f1=indicator*%7CSHA1&f2=indicator%7C*SHA1`

#### Dashboard limitation

The lookup operator behaves differently when used in live mode versus interactive mode or an interactive search. When used in live mode the lookup operation is done continually to provide real-time results. However, only the most recent data point is looked up in real time, while the previous data points keep their previously looked up result. An interactive search will conduct the lookup operation on all data points when the query is processed. Therefore, when comparing live mode results to interactive results you will likely have differences in your lookup results.

For example, say you are plotting the average price of a stock over the last 30 days.

In live mode, lookup will return the real-time price and retain the previously looked up data points during the 30 day period.

In an interactive search, lookup will only use the real-time stock price to plot over the past 30 days. In this case, you'd have to provide the previous stock prices for the past 30 days.

In other words, in live mode, lookup will use and retain the lookup data at that point in time when it ran. Whereas lookup in an interactive search will only use the data that was available when it ran.

**Examples**

Type the lookup operator in the **Search** tab, just as you'd any other operator.

To match the userID string with a users' ID in your CSV, your query could be:

```sql
* | parse "name=*, phone number=*," as (name, phone)
| lookup email from https://company.com/userTable.csv on name=userName, phone=cell
```

where the `userTable.csv` file includes the following:

```
"id","userName","email","IP","cell"
"1","Joe","joe@example.com","192.168.1.1","650-123-4567"
"2","John","john@example.com","192.168.1.2","212-123-4567"
"3","Susan","susan@example.com","192.168.1.3","914-123-4567"
"4","John","another_john@example.com",192.168.1.4","408-123-4567"
"5","John","yet_another_john@example.com","192.169.1.5","734-123-4567"
```

Running this query adds three fields to the output: **name**, **phone**, and **email**.

#### Composite field lookup

In our example above we had several users named John. A lookup operator can be used on a composite set of fields, so you can identify the correct email for each person named John because each unique cell phone number has also been mapped using a query like:

```sql
* | parse "name=*, phone number=*," as (name, phone)
| lookup email from https://company.com/userTable.csv on name=userName, phone=cell
```

Running this query adds an **email** field to the output.

#### Using multiple lookup operators together

Another way to use a lookup operator is to chain lookup operators together. Each operator can call separate CSV files. For example, if you wanted to find user names and the position each user has in a company, your query could be:

```sql
* | parse "userID=*," as userID
| lookup userName from https://company.com/userTable.csv on userID=id
| lookup position from https://company.com/userPosition.csv on userID=id
```

where the userPosition.csv file includes the following:

```
"id","position"
"1","Salesperso"
"2","Salesperson"
"3","Engineer"
"4","Manager"
"5","Senior Engineer"
```

In our example above, the first operator finds the name, and the second finds the position.

#### Handling null values

To find a mismatch from a lookup operator query, use the [isNull](#isNull) operator.

For example, running a query like:

```sql
| parse "code=*]" as code
| lookup status_code from shared/statusupdates on status = code
| if (isNull(status_code), "unknown", status_code) as status_code
```

#### Using lookup to access saved data

Once you've saved the results of a search to the Sumo Logic file system using a [Save](#save-lookups-classic) operator, the lookup operator allows you to search that data.

For example, say we wanted to find the date when users signed up in a file named newDailyUsers (the full path is myFolder/mySubFolder/newDailyUsers). We'd use this query to find that information:

```sql
* | parse "user_name=*," as name
  | lookup date from myFolder/mySubFolder/newDailyUsers on name=name
```

A file generated by a save operator can be saved to an org-level **shared** folder. This allows for others in your organization to use your search results when running their lookup queries. See [saving files to a shared location](#save-lookups-classic) for details.

#### Duplicate keys error

If the key you specify in a lookup operation matches several records, you get an error message that warns you of the duplication:

`Lookup table folder/myfolder/filename has duplicate keys. The last value associated with a duplicated key will be used in the lookup result. `

You only get the last associated value as a result. 

For example, if you are searching your Apache Access logs from 34.87.4.6 and you are looking for an internal server errors by a specific keyid, lookup provides the last result that matches your criteria:

![lookup-duplicate.png](/img/search/searchquerylanguage/search-operators/lookup-duplicate.png)

</details>

---
## lookup

<details><summary><small>The <code>lookup</code> operator can return one or more fields from a lookup table hosted by Sumo Logic and add the fields to the log messages returned by your query. You create a lookup table using the lookup UI or the <a href="https://api.sumologic.com/docs/#tag/lookupManagement">Lookup API</a>. You can populate a lookup table by uploading a CSV file using the Lookup API, or by using the <a href="#save"><code>save</code> operator</a> to save the results of a log query. </small></summary>

:::note
New Lookup Tables are available in all deployments except Sumo Logic's Montreal deployment, pending AWS providing a required AWS service in the Montreal region.
:::

For information about lookup tables, see [Create and Manage Lookup Tables](docs/search/lookup-tables/create-lookup-table.md).

#### lookup requirements and limitations

This section describes requirements and limitations for the `lookup` operator and .csv files that contain lookup data.

#### lookup requirements 

* The size limit for a lookup table is 100 MB.
* The `lookup` operator matches event field names and values to lookup table field names and values in a case-insensitive manner. 
* The columns you specify in the join condition for the lookup must be of the same data type. For example, if the event field on the left side of the join is an integer, the lookup field on the right side must also be integer. You can cast data to a string or numeric value. For more information, see [Casting Data to a Number or String](#casting-data-to-a-number-or-string).

#### CSV file requirements 

These requirements apply to lookup tables that you upload in CSV format:
 
* The CSV file must contain a header line.
* The header line can't use special characters. Any leading or trailing spaces in the header line will be trimmed.  

For example:

```
"id","name","time"
"1","foo","6-15-12"
"2","zoo","6-14-12"
"3","woo","6-13-12"
```

#### How Sumo processes malformed .csv files

If your .csv file does not conform to the requirements described above, some or all of the rows in the table will not be indexed and saved, depending on the error encountered. Here’s how Sumo handles different types or errors in lookup files:

* Data type mismatches. Sumo will not index and store a row if any of its columns contain data whose type varies from the type defined for that column in the table schema. For example, if a field whose type is numeric contains a non-numeric string (“foo”), or a field whose type is boolean contains a non-boolean string ("blah") instead of "true" or "false".
* Schema mismatches. Sumo will not index and file any row in a file, if the schema of the .csv file does not match the schema of the lookup table. In this case, Sumo will reject the entire file.  
* Overly large lookup file. Sumo will not index and file any row in a lookup file if the file is too large or has too many rows. In this case, Sumo will reject the entire file.  

#### Dashboard limitation 

The `lookup` operator behaves differently when used in live mode versus interactive mode or an interactive search. When used in live mode the lookup operation is done continually to provide real-time results. However, only the most recent data point is looked up in real time, while the previous data points keep their previously looked up result. An interactive search will conduct the lookup operation on all data points when the query is processed. Therefore, when you compare live mode results to interactive results you will likely see differences in your lookup results.

For example, say you are plotting the average price of a stock over the last 30 days.

In live mode, `lookup` returns the real-time price and retains the previously looked up data points during the 30 day period.

In an interactive search, `lookup` will only use the real-time stock price to plot over the past 30 days. In this case, you'd have to provide the previous stock prices for the past 30 days.

In other words, in live mode, `lookup` will use and retain the lookup data at that point in time when it ran. Whereas `lookup` in an interactive search will only use the data that was available when it ran.

#### Lookup syntax 

```sql
lookup <outputColumn-1> [as <field>] [,<outputColumn-2> [as <field>]] from path://"<filePath>" on <joinColumn-1> [,<joinColumn-2>]
```

Where:

* `outputColumn-x` is a list of field names in the header of the lookup table.

* `filePath` is the path to the lookup table in the Sumo Logic Library. If the lookup table is in a personal folder, the path looks like this:  

    `/Library/Users/myusername@sumologic.com/Suspicious Users`

    If the lookup table is in an [Admin Recommended](docs/manage/content-sharing/admin-mode.md) folder, the path looks like this:  

    `/Library/Admin Recommended/Lookups/Approved Cloud Jump Stations`  

    To determine the path to a lookup table, highlight the row for the table in the Sumo Logic Library, and select **Copy path to clipboard** from the three-dot more options menu for the table.   

    ![more-options-lookup.png](/img/search/searchquerylanguage/search-operators/more-options-lookup.png)

* `joinColumn-x` is a list of pairs of field names that define the relationship between values in the log data results with matching values in the lookup table, for example:  

    `name=userName, phone=cell`

**Examples**

#### Return one field

This lookup matches the `userEmail` field value from a log message with the `email` field in the lookup table at the specified path, and if a match is found, returns the value of the `cell` field with the alias `c1`.

```sql
| lookup cell as c1 from path://"/Library/Users/myusername@sumologic.com/Suspicious Users" on userEmail=email
```

In the example above, specifying an alias (the `as c1` part of the statement) is optional. Aliases are required only when a lookup returns multiple fields. 

:::note
If you're using `lookup` to return a single field, you can place the `lookup` operator before a `where` clause, and within a `where` clause.
:::

#### Return multiple fields

This lookup matches the `userEmail` field value from a log message  with the `email` field in the lookup table at the specified path, and if a match is found, returns the the value of two fields from the matching row: `cell1` and `cell2`, with the aliases `c1` and `c2`, respectively: 

```sql
| lookup cell1 as c1, cell2 as c2 from path://"/Library/Users/myusername@sumologic.com/Suspicious Users" on userEmail=email
```

#### Return all fields in a row

This lookup matches the `userID `field from a log message with the value of `ID` field in the specified lookup table, and returns all of the fields from the matching row.

```sql
| lookup * from path://"/Library/Users/myusername@sumologic.com/Users" on userID=id
```

#### Using multiple lookup operators together

Another way to use a lookup operator is to chain lookup operators together. Each operator can call separate CSV files. For example, if you wanted to find user names and the position each user has in a company, your query could be:

```sql
* | parse "userID=*," as userID
| lookup userName from https://company.com/userTable.csv on userID=id
| lookup position from https://company.com/userPosition.csv on userID=id
```

where the `userPosition.csv` file includes the following:

```
"id","position"
"1","Salesperso"
"2","Salesperson"
"3","Engineer"
"4","Manager"
"5","Senior Engineer"
```

In our example above, the first `lookup` finds the name, and the second finds the position.

#### Handling null values

To find a mismatch from a `lookup`  query, use the [isNull](#isNull) operator.

For example:

```sql
| parse "code=*]" as code
| lookup status_code from shared/statusupdates on status = code
| if (isNull(status_code), "unknown", status_code) as status_code
```

#### Using two keys

In this example, we match the value of two fields from a log message against two fields in a lookup table:

* the `userEmail` field value from a log message with the `email` field in the lookup table
* the `userStatus` field value with the `status` field in the lookup table

and if a match is found, we return the value of two fields from the matching row: `cell1` and `cell2`, with the aliases `c1` and `c2`, respectively.

```sql
| lookup cell1 as c1, cell2 as c2 from path://"/Library/Users/myusername@sumologic.com/Suspicious Users" on userEmail=email, userStatus=status
```

</details>

---
## lookupContains

<details><summary><small>Use the lookupContains operator to determine whether a key exists in a lookup table. It will return a boolean value.</small></summary>

**Syntax**

The syntax for `lookupContains` in varies depending on whether you use the operator within a `where` expression, or before it.

#### Within a where expression

This is the syntax for using `lookupContains` within a `where`
expression:

```sql
... | where lookupContains (path://”<path-to-table>”, <event-field>=<lookup-field>) | ...
```

Where:

* `<path-to-table>` is the full path to the lookup table in the Sumo Logic library, for example:  

    `/Library/Users/username@sumologic.com/lookup-table-name`  

    To determine the path to a lookup table, highlight the row for the table in the Sumo Logic library, and select **Copy  path **from the tree-dot more options menu for the table.   
     
* `event-field` is a field in a log. 
* `lookup-field` is a field in the lookup table.

**Example** 1: Using lookupContains within a where expression to compare a single field

The example below compares the value of the `userID` field in an event
to values of the `user` field in the `suspicious-users` lookup table,
and returns `true` if the field values match.

```sql
... | where lookupContains(path://"/Library/Users/username@sumologic.com/suspicious-users", userID=user) | ...
```

**Example** 2: Using lookupContains within a where expression to compare multiple fields

The example below compares the value of the `userID` field in an event to values of the `user` field in the `suspicious-users` lookup table, and compares the value of the `userIP` field in the event to values of the `sourceIP` field in the lookup table and returns `true` if the both sets of field values match.

```sql
... | where lookupContains(path://"/Library/Users/username@sumologic.com/suspicious-users", userID=user AND userIP=sourceIP) | ...
```

#### Before a where expression

When you use `lookupContains` before a `where` expression, you need to supply an alias for the return value, using `as`. This form allows you to use the alias in later clauses of the search query.

```sql
... | lookupContains (path://"<path-to-table>", <event-field>=<lookup-field>) as <field> | where <field> = true
```

Where:

* `<path-to-table>` is the full path to the lookup table in the Sumo Logic library, for example:  

    `/Library/Users/username@sumologic.com/lookup-table-name`  

    To determine the path to a lookup table, highlight the row for the table in the Sumo Logic library, and select **Copy path** from the tree-dot more options menu for the table.   
     
* `event-field` is a field in a log. 
* `field` is the name that you assign as the alias for the field. 

</details>

---
## Luhn

<details><summary><small>The luhn operator uses Luhn’s algorithm to check message logs for strings of numbers that may be credit card numbers and then validates them. It takes a string as an input, strips out all characters that are not numerals, and checks if the resulting string is a valid credit card number, returning true or false accordingly.</small></summary>

**Syntax**

```sql
luhn(<field>) [as <field>]
```

```sql
luhn("<input string>") [as <field>]
```

**Examples**

#### Identify and verify credit card numbers in message logs

Use the following query to identify credit card numbers in message logs, and verify them using the Luhn operator:

```sql
| parse regex "(?<maybecc>\d{4}-\d{4}-\d{4}-\d{4})" nodrop
| parse regex "(?<maybecc>\d{4}\s\d{4}\s\d{4}\s\d{4})" nodrop
| parse regex "(?<maybecc>\d{16})" nodrop
| if (luhn(maybecc), true, false) as valid
```

which provides results such as:

![operator example](/img/reuse/query-search/luhn_operator_example.png)

#### Search for and verify a specific credit card number

Use the following query to search for a specific credit card number and verify it using the Luhn operator:

```sql
*| "6666-7777-6666-8888" as b
 | luhn(b) as d
```

It would provide the following results:

![operator example](/img/reuse/query-search/lunh_operator_example1.png)

</details>

---
## Manually cast data to string or number

<details><summary><small>Most data in Sumo Logic is stored as a string data type. Metadata fields are stored as string data and parsed fields are by default parsed as string type data. Sumo Logic will implicitly cast string data to a number type assuming it is clear that you need a number to perform an action, such as a math calculation or when using a function like <code>sum</code> or <code>avg</code>. However, if there is any ambiguity about whether a number is required, the data remains string data.</small></summary>

This detail can be important when you are building queries. There are at least two cases where you will need to manually cast string data to a number so that you get the results that you expect:

* When using the **where** operator to match integers like this:
    * **where** value **in** (integer_value1, integer_value2, integer_value3)
    * **where** value **not in** (integer_value1, integer_value2, integer_value3)
* When you need to numerically sort a series of results from a query,
    like in this example:

    ```sql
    * | parse "took *ms" as duration | toLong(duration) | sort by duration
    ```

In the first case, if your statement looks something like "where some_value in (1, 2, 4, 16)" and you need to match (or not match) integers, then you will first need to cast "some_value" to a number.

In the second case, the results will sort out of order as text values if you don't first cast the field "duration" to a number. After the field is cast to a number type, the sort order will produce expected results.

Sumo Logic accepts these functions for casting string data to a number:

* `num()` or `number()`
* `toLong()`

You can use the function `toString()` to cast data to a string.

When casting a field, remember to separate the casting statement with a pipe, like this:

```sql
* | parse "OSload *ms" as boot_time | number(boot_time)
```

</details>

---
## matches

<details><summary><small>The matches operator can be used to match a string to a wildcard pattern or an RE2 compliant regex. The operator returns a boolean value; the operator can be used with <code>where</code> or <code>if</code> operators.</small></summary>

Matches can be used in Dashboard Panels, and are very commonly used in conjunction with other operators to build robust queries.

**Syntax**

:::important
The string expression is case-sensitive and can be provided as a field.
:::

```sql
<string expression> matches <pattern> as <field>
```

```sql
if(<string expression> matches <pattern>, <value_if_true>, <value_if_false>) as <field>
```

```sql
if(<string expression> matches /<regex>/, <value_if_true>, <value_if_false>) as <field>
```

```sql
where <string expression> matches <pattern>
```

```sql
where <string expression> matches /<regex>/
```

```sql
where !(<string expression> matches <pattern>)
```

**Rules**

* Patterns use asterisks `*` as wildcards.
* Regex must be [RE2 compliant](https://github.com/google/re2/wiki/Syntax).

**Examples**

#### Matching with regex to filter results

See a [case insensitive parse regex example](./parse-operators/parse-variable-patterns-using-regex.md).

This example is using a regex to match certain IPv4 addresses in a parsed field named `ip`. The regex we are using is:

`12\.1[34][1-5]\.12\.12[3-7]`

A query can use this regex with the **matches** operator with a **where** or **if** operator to filter the results. With a where operator you can filter the results to return only matching `ip` addresses:

```sql
| where ip matches /12\.1[34][1-5]\.12\.12[3-7]/
```

With an if operator you can return an additional boolean field, in this example the new field will be named `ip_group` and will have a value of `1` when the `ip` matched the regex:

```sql
| if(ip matches /12\.1[34][1-5]\.12\.12[3-7]/, 1,0) as ip_group
```

#### Identifying the browsers and operating systems used to access your website

Running a query containing a matches operator on Apache Access logs can show you the breakdown of the devices and browsers that are accessing your site. You can then create a Dashboard with this query. We have used a transpose operator in this query to allow us to name the axis of our column chart.

Running a search like:

```
_sourceCategory=Apache/Access
| extract "\"[A-Z]+ \S+ HTTP/[\d\.]+\" \S+ \S+ \S+ \"(?<agent>[^\"]+?)\""
| if (agent matches "*Windows NT*","Windows","Other") as OS
| if (agent matches "*Macintosh*","MacOS",OS) as OS
| if (agent matches "*iPad*","iPad",OS) as OS
| if (agent matches "*iPhone*","iPhone",OS) as OS
| if (agent matches "*Android*","Android",OS) as OS
| if (agent matches "*MSIE*","Internet Explorer","Other") as Browser
| if (agent matches "*Firefox*","Firefox",Browser) as Browser
| if (agent matches "*Safari*","Safari",Browser) as Browser
| if (agent matches "*Chrome*","Chrome",Browser) as Browser
| count(agent) by OS,Browser
| transpose row os column browser as *
```

Produces aggregate results similar to the following, when you configure it to create a [stacked column chart](../../dashboards-new/panels/column-charts.md):

![Matches](/img/search/searchquerylanguage/search-operators/matches.png)

#### Viewing errors and warnings over time

In this example, we will run a query against Windows logs to see the distribution of errors and warnings over the previous hours. Using a timeslice operator in the query breaks the results into one-hour buckets.

Running a search like:

```sql
_sourceCategory=OS/Windows (error or warning)
| parse "Type = \"*\";" as evtType
| if (_raw matches "*EventType = Error*",1,0) as errors
| if (_raw matches "*EventType = Warning*",1,0) as warnings
| if (evtType matches "Error*",1,errors) as errors
| if (evtType matches "Warning*",1,warnings) as warnings
| timeslice by 1h
| sum(errors) as errors, sum(warnings) as warnings by _timeslice
| sort _timeslice asc
```

Produces results similar to the following, when you configure it to be visualized as a [linechart](../../dashboards-new/panels/line-charts.md):

![Matches Event](/img/search/searchquerylanguage/search-operators/Matches_Ex.png)

#### Matching against parsed field values

The matches operator can match against your parsed fields by using the [concat](#concat) operator to add wildcards to the necessary location of your parsed field. The following example is parsing the instance value and then concatenating wildcards to the beginning and end of the parsed field. This provides the matches operator the necessary wildcards to match against.

```sql
| parse "instance \"*\"" as instance
| concat("*", instance, "*") as instance_match
| where !(host matches instance_match)
```

</details>

---
## now

<details><summary><small>The <code>now</code> returns the current epoch time in milliseconds. It can be used with the <code>formatDate</code> operator to get the formatted current time.</small></summary>

It is important to note that the Now operator outputs the exact time (down to the millisecond) each and every time it is executed. This means that if you use now with every message in a search, it will return slightly different results in every message, as messages are not all processed by your search at once.

**Syntax**

```sql
now()
```

**Example**

#### Return the current date

This query returns a long version of the current date and time in milliseconds.

```sql
* | now() as current_date
```

Which returns results similar to:

![Current date](/img/search/searchquerylanguage/search-operators/CurrentDate.png)

#### Return the current date using formatDate.

Use the following query with formatDate to return results for the current date formatted as YYYY-MM-dd.

```sql
* | formatDate(now(), "YYYY-MM-dd") as today
```

This returns the following results.

![Today](/img/search/searchquerylanguage/search-operators/Today.png)

For more examples, see [formatDate](#formatDate) operator.

</details>

---
## num

<details><summary><small>The num operator converts a field to a floating point number. Using num in a query is useful for sorting results by number instead of alphabetically, which is the default.</small></summary>


**Syntax**

```sql
num(<field>) [as <field>]
```

**Rules**

* The value of the field must be a negative/positive integer or a real number. For example, 500, 123234820932, or 352.748.

**Example**

Use this query to use num to search for Scheduled Searches, and sort them by the time it took each search to execute in seconds. Without the conversion, the results would be sorted in alphabetical order.

```sql
_sourceCategory=concierge completed execution
| parse "Execution duration: * s" as duration
| num(duration) | sort by duration
```

This query produces results like this:

![numoperator.png](/img/search/searchquerylanguage/search-operators/numoperator.png)

</details>

---
## outlier

<details><summary><small>Given a series of time-stamped numerical values, using the <code>outlier</code> operator in a query can identify values in a sequence that seem unexpected, and would identify an alert or violation, for example, for a scheduled search.</small></summary>

To do this, the Outlier operator tracks the moving average and standard deviation of a numerical field. An outlier is identified based on a specified *threshold* of standard deviations around the expected value. If a data point is outside the threshold, it is considered to be an outlier.

**Syntax**

```sql
...
| timeslice <time_period>
| <aggregate operator> as <field> by _timeslice
| outlier <field> [window=<#>, threshold=<#>, consecutive=<#>, direction=<+->]
```

```sql
...
| timeslice <time_period>
| <aggregate operator> by _timeslice, <field>
| outlier <_aggregate> by <field> [window=<#>, threshold=<#>, consecutive=<#>, direction=<+->]
```

A `timeslice` is required.

The second syntax example uses an additional “group by” clause to find
outliers for multiple values of a field. See the example below for
details.

The following table lists the fields returned in outlier results:

| Field | Description |
| -- | -- |
| `<field>_error` | This is the \<field\> - mean. |
| `<field>_lower` | This is the mean - threshold\*standard deviation. |
| `<field>_upper` | This is the mean + threshold\*standard deviation. |
| `<field>_indicator` | This is either 0 or 1. It is set to 1 for a data point outside of the lower and upper boundaries. Data observed further than the specified number of standard deviations from the rolling average is an outlier, known as an indicator. |
| `<field>_violation` | This is either 0 or 1. It is set to 1 for hitting the specified number of consecutive indicators, known as an outlier. |

You can configure options by setting parameters through keyword arguments, such as window, threshold, consecutive, and direction.

| Keyword Argument | Description |
| -- | -- |
| window | Sets the trailing number of data points to calculate mean and sigma. The default is 10. |
| threshold | Sets the number of standard deviations for calculating violations. The default is 3.0. |
| consecutive | Sets the required number of consecutive indicator data points (outliers) to trigger a violation. The default is 1. |
| direction | Use `+-`, `+`, or `-`, to specify which direction should trigger violations:<ul><li>Use `+-` for positive or negative deviations. This is the default.</li><li>Use `+` for only positive deviations (more than expected).</li><li>Use `-` for only negative deviations (less than expected).</li></ul> |

For example, this query would set the following parameters:

```sql
... | outlier <field> window=5,threshold=3,consecutive=2,direction=+-
```

* **window=5** : Use the trailing 5 data points to calculate mean and sigma.
* **threshold=3** : Calculate violation based on +/- 3 standard deviations.
* **consecutive=2** : Trigger a violation by returning `<field>_violation=1` in the search results only if 2 or more consecutive indicator data points occur.
* **direction=+-** : Uses positive or negative deviations.

**Rules**

* The outlier operator must appear after a group by aggregator, such as count, min, max, or sum.
* The original target field must be numeric.
* A [timeslice](#timeslice) is required.

#### Limitations

* Because the most recent time bucket in a query may have incomplete data, it is ignored by outlier. Consequently, if an alert is set to trigger on `<field>_violation` changing to 1, this alert will trigger one timeslice later.

**Examples**

#### IIS logs

Run the following query to find outlier values in IIS logs over the last
6 hours.

```sql
_sourceCategory=IIS/Access
| parse regex "\d+-\d+-\d+ \d+:\d+:\d+ (?<server_ip>\S+) (?<method>\S+) (?<cs_uri_stem>/\S+?) \S+ \d+ (?<user>\S+) (?<client_ip>[\.\d]+) "
| parse regex "\d+ \d+ \d+ (?<response_time>\d+)$"
| timeslice 15m
| max(response_time) as response_time by _timeslice
| outlier response_time window=5,threshold=3,consecutive=2,direction=+-
```

![IIS](/img/search/searchquerylanguage/search-operators/IIS.png)

The outlier values are represented by the pink triangles in the resulting chart.

#### Apache logs - Server Errors Over Time

Run the following query to find outlier values in Apache logs over the
last 3 hours.

```
_sourceCategory=Apache/Access
| parse "HTTP/1.1\" * " as status_code
| where status_code matches "5*"
| timeslice 5m
| count(status_code) as status_code by _timeslice
| outlier status_code window=5,threshold=3,consecutive=1,direction=+-
```

![Apache](/img/search/searchquerylanguage/search-operators/Apache-Access.png)

The outlier values are represented by the pink triangles in the
resulting chart.

#### Use an additional “group by” clause to find outliers for multiple values of `_sourceHost`.

You can also run a query like this:

```sql
_sourceCategory=Apache/Access
| timeslice 1m
| count by _timeslice, _sourceHost
| outlier _count by _sourceHost
```

This way, you can run outlier analysis separately for each value of `_sourceHost`, as shown.

![Group by](/img/search/searchquerylanguage/search-operators/Group-by.png)

This example will only produce an aggregation table, not a chart, but the indicator and violation fields will correctly reflect each `_sourceHost` processing.

#### Alert on an outlier

This query counts the number of errors over time and sends an alert when an outlier is detected. When an outlier is detected, the value of `<field_name>_violation` will be set to 1. In the example below, the `<field_name>` is `_count`. By creating a [Real Time Alert](docs/alerts/scheduled-searches/create-real-time-alert.md) and sending a notification if greater than 0 results are found, you can alert on an outlier.

```sql
"error"
| timeslice by 15m
| count as today by _timeslice
| compare timeshift -1d as vs_yesterday // create a delta field that represents the difference between historical and current data
| (today - today_vs_yesterday) as delta // use an Outlier to statistically monitor spikes or dips in the delta
| outlier delta
| where delta_violation = 1
```

#### Multidimensional Outlier Detection

The Outlier operator supports multidimensional or multi-time series detection. Multidimensional outlier detection is useful when you want to monitor the behavior of each user, server, application feature, or other single “entity”, rather than some aggregation across all entities.  

For example, you'd detect failed logins by user. To do so, you'd want to understand whether any user account, individually, has experienced a strange amount of failed logins, not whether we have seen some spike in the average or total amount of failed logins across all users. The latter may be useful, but with hundreds or thousands of users (entities), a spike in failed logins may get lost in the noise of a “normal” amount of total failed logins, and you'd miss a spike in failed logins for one specific user.

Other examples include:

* Detecting anomalies while tracking page faults, disk operation, or CPU utilization for all the nodes in a cluster simultaneously.
* Monitoring the performance of every workstation simultaneously, without the need to build an outlier report for each one.
* Monitoring failed image uploads for every user of an application (not total failed uploads across all users).

If you have used the outlier operator, it is easy to create a multidimensional outlier operation. Just add **`by <dimension>`** to the end of the query.

For example, the following example query will determine many time series, one per each `_sourceHost`:

```sql
_sourceCategory=Apache/Access
| timeslice 1m
| count by _timeslice,_sourceHost
| outlier _count by _sourceHost
```

You can display the raw results of a multidimensional time series in a table chart, but currently other chart options are not available.

In the following table chart, a value of 1 in the `_count_violation` column indicates that the data point corresponding to that timeslice is
an outlier.

![Multidimensional](/img/search/searchquerylanguage/search-operators/Multidimensional.png)

#### Alerts Based on Multidimensional Outlier Results

To create an alert based on the multi-series outlier table above, extract `_count_violation`.

This way, you will not need to build an alert for each series of data (each `_sourceHost` in the previous example), and you can automatically monitor a dynamic series for deviating behavior.

The following example query allows you to monitor when application users experience failures. It monitors all user accounts by unique user ID, and applies outlier to the amount of “fail” messages that occur across every user account:

```sql
_sourceCategory=O365*
| parse "\"UserId\":\"*\"" as user_id
| parse "\"ResultStatus\":\"*\"" as result
| where result = "fail"
| timeslice 30m
| count by user_id, _timeslice
| outlier _count by user_id
| fields _timeslice,user_id, _count_violation
| transpose row _timeslice column user_id
```

Once you have run the query, you can click **Save As** to create a [Scheduled Search](docs/alerts/scheduled-searches/schedule-search.md) and configure it to send an [alert](/docs/alerts) when any user account experiences an unusual amount of failures, or other event you want to monitor each series of data for.

To visualize your results, on the Search page, you can create a column chart, then change the stacking property to normal to display alerts by unique **user_id** (the multidimensional aspect).

![Alert](/img/search/searchquerylanguage/search-operators/Outlier-Alert.png)

#### Chart Multidimensional Outlier Results

This section provides two examples of how to display multidimensional outlier results in charts.

**Example** 1: Outlier Distribution Across Time

In this example, we’ll extract `_count_violation` from the multi-series outlier table and display that. This allows you to display the distribution of outliers among various time-series.

```sql
error (_sourceCategory=Apache* or _sourceCategory=IIS*)
| timeslice 1m
| count by _timeslice, _sourceCategory
| outlier _count by _sourceCategory
| fields _timeslice,_sourceCategory, _count_violation
| transpose row _timeslice column _sourceCategory
```

When you select a [line chart](../../dashboards-new/panels/line-charts.md), this example will display something like the following:

![Outlier Distribution](/img/search/searchquerylanguage/search-operators/OutlierDistri.png)

**Example** 2: Outlier Ranking

This example query uses the **`_count_error`** (distance from the expected value for that timeslice) and the value of the standard deviation for the baseline, then determines how many standard deviation a data point is from its expected value.

This way, you can display outliers visually in terms of deviation from the expected value.

```sql
_sourceCategory=Apache*
| timeslice 30m
| count  by _timeslice, status_code
| outlier _count by status_code
| where _count_std >0
| if(_count_violation=1,abs(_count_error)/_count_std, 0) as deviation
| fields _timeslice, status_code, deviation
| transpose row _timeslice column status_code
```

When you select a [line chart](../../dashboards-new/panels/line-charts.md), this example will display something like the following:

![Outlier Ranking](/img/search/searchquerylanguage/search-operators/OutlierRanking.png)

In the line chart, you can see which series is producing the most “deviating” outliers.

This approach effectively displays the severity of the outlier, because the spikes represent the magnitude (how many standard deviations the value is from the mean) in one time-series compared to another time-series.  

</details>

---
## predict

<details><summary><small>Uses a series of time-stamped numerical values to predict future values. The <code>predict</code> operator can be useful in the following cases:
<ul><li>As an early warning system, alerting you when a threshold is about to be reached.</li><li> For resource and capacity planning, helpful for determining seasonal impacts, like a Cyber Monday rush on an ecommerce site.</li>
<li>Improved risk calculation.</li></ul></small></summary>

For example, you'd use `predict` to take your current disk space capacity numbers, and predict when your system might run out of disk space. In these cases, the sooner an operations manager is informed that a key threshold is about to be reached the more effectively he or she can plan to avoid service degradation.

The `predict` operator supports two predictive models:

* Auto-regressive. Uses an advanced auto-regressive (AR) algorithm to learn patterns in the data. It automatically detects the cyclical patterns in the data and uses the cycles in its prediction.   
* Linear regression. Uses existing data over the query time range as a training set to generate a [linear model](http://en.wikipedia.org/wiki/Linear_regression), and then extrapolates future values using this model.

:::note
If a missing data point is encountered in the generated time series, Sumo uses a zero value and issues a warning to alert you. If you'd like to use customized values, you can do so with the [fillmissing](#fillmissing) operator.   
:::

**Syntax**

The syntax for **`predict`** varies depending on whether you use the linear regression model or the auto-regressive model. In either case, the following requirements apply:

* The query must contain an aggregate operator for example, `count, min, max, sum` and so on. Aggregation must be by timeslice, for example, `count by _timeslice.`
* The query must contain the `timeslice` operator.
* Both the aggregate operator and the `timeslice` operator must precede the `predict` operator.

**Syntax** for the linear regression model

For the linear regression model:

```sql
... | timeslice 1m | count by _timeslice | predict _count by 1m
```

The linear regression algorithm produces the following fields in the
output:  

* `_count` The number of matches per minute for the currently selected time range.
* `_count_predicted` Value predicted by the simple linear model.
* `_count_error` Value predicted by the simple linear model, minus the actual number.

**Syntax** for the auto-regressive model

```sql
... | timeslice 1m | count by _timeslice | predict _count by 1m model=ar, ar.window=n, forecast=n
```

The table below defines the parameters for running `predict` using the AR model.

| Parameter | Description |
| -- | -- |
| `model=ar` | Required. Use this parameter to use the AR model, rather than a simple linear regression. |
| `ar.window` | Optional. Use this parameter to specify the number of consecutive data points on which to base the prediction.<br/><br/>The window size greatly impacts the performance of the autoregressive model. As a result, Sumo Logic automatically chooses the best default value for your query.<br/><br/>The auto-regressive model requires more data points than the linear regression option to train a proper model. We recommended that you generate more than 100 data points for the AR model. If the number of data points is less than 100, Sumo Logic displays a warning stating that the learned model may not be optimal.<br/><br/>If you want to customize the window size, we recommend that you to set the window size to be larger than 40% of the data points in the time series. However, don’t make the window size too large. The maximum would be 60%. Otherwise, the model will not be trained properly. |
| `forecast` | Optional. Use this option to specify the duration of the prediction, either in terms of data points or minutes. The forecast parameter uses the same syntax as the `timeslice` operator and accepts either:<ul><li>A simple number, such as `forecast=5`, which predicts five data points into the future.</li><li>A time granularity, such as `forecast=5m`, which predicts five minutes into the future.</li></ul><br/>If you don’t specify a value for the `forecast` parameter, the operator will default to three data points into the future, or `forecast=3`. |

In the following query, the first three lines count the number of messages that contain an error term for every half minute. The last line uses the auto-regressive model to predict 100 data points in the future, based on 50 data points.

```sql
_sourceCategory=taskmanager jobState=InQueue error | timeslice 30s | count by _timeslice | predict _count by 30s model=ar,ar.window=50,forecast=100
```

The auto-regressive algorithm produces the following fields in the
output:

* `_count` The number of errors per 30-second timeslice.
* `_count_predicted` Value predicted by the auto-regressive algorithm.
* `_count_linear` Value predicted by the simple linear regression.
* `_count_error` Value predicted by the simple linear regression minus
    the actual number.

#### Limitations

These internal limitations are meant to provide "speed bumps" to ensure the best performance.

* `predict` will not use more than 10,000 input points to estimate the model.
* `predict` will not forecast more than 100 points into the future.
* `predict` will not interpolate more than 20,000 input points. Predict adds "phantom" input points where there should be a timeslice, but no data point is present.

#### Cyclical patterns and the auto-regressive model

If there are cyclical patterns that fit within the `ar.window`, the auto-regressive algorithm will learn the cyclical pattern and use that in prediction.

For example, if there is an hourly cyclical pattern, the following query will learn that cycle:

```sql
... | timeslice 5m
| <aggregate function> by _timeslice as _val  
| predict _val by 5m model=ar, ar.window=15
```

In this query, the window size (15 consecutive data points) covers more than 1 hour (15 data points \* 5m interval = 75 minutes). So if there are cyclical patterns with a period of less than 75 minutes, the model will discover them.

**Examples**

#### predict using linear regression

This query predicts the count of 404 errors per minute using linear regression.

```sql
_sourceCategory=Labs/Apache/Access status_code=404 | timeslice 1m | count(status_code) as error_count by _timeslice | predict error_count by 1m
```

The query returns an aggregation table with columns for `error_count`, `error_count_predicted`, and `error_count_error`.

![agg-table-predict-linear.png](/img/search/searchquerylanguage/search-operators/agg-table-predict-linear.png)

From here, you can select the **Line Chart** icon, and automatically create a Combo Chart that represents the `error_count_error` as a column chart, and the `error_count` and `error_count_predicted` mapped on top of that with separate lines. Note that the `(absolute value)_count_error` series is toggled off by default. Click it in the legend to display the column chart.

![combo-chart-predict-linear.png](/img/search/searchquerylanguage/search-operators/combo-chart-predict-linear.png)

#### predict using auto-regressive model

This query predicts the count of 404 errors per minute using the auto-regressive model.

```sql
_sourceCategory=Labs/Apache/Access status_code=404 | timeslice 1m | count(status_code) as error_count by _timeslice | predict error_count by 1m model=ar
```

The query returns an aggregation table with columns for `error_count`, `error_count_predicted`, `error_count_linear`, and `_error_count_error`.

![agg-table-predict-ar.png](/img/search/searchquerylanguage/search-operators/agg-table-predict-ar.png)

From here, you can select the **Line Chart** icon, and automatically create a Combo Chart that represents the `error_count_error` as a column chart, and the `error_count` and `error_count_predicted` mapped on top of that with separate lines. Note that the `(absolute value)_count_error` series is toggled off by default. Click it in the legend to display the column chart.

![combo-chart-predict-ar.png](/img/search/searchquerylanguage/search-operators/combo-chart-predict-ar.png)

Note that, if desired, you can display the `_count_linear` series, to see the value predicted by the simple linear regression model by clicking it in the legend.

![combo-chart-predict-ar-with-linear.png](/img/search/searchquerylanguage/search-operators/combo-chart-predict-ar-with-linear.png)

</details>

---
## queryEndTime()

<details><summary><small>The <code>queryEndTime()</code> operator returns the end time of the search <a href="/docs/search/get-started-with-search/build-search/set-time-range">time range</a> in milliseconds. You can use it in combination with <a href="#queryStartTime">queryStartTime()</a> to establish times and ranges for your non-continuous queries.</small></summary>

:::note
For dashboards in live mode or real time scheduled searches queryTimeRange() is a more suitable option. In most cases the results would still be the same as using queryStartTime() and queryEndTime(), but the latter can be off from the real range by a few milliseconds.
:::

**Syntax**

```sql
queryEndTime() as <field>
```

**Rules**

* An alias is required.

**Example**

To get a duration of your query:

```sql
error
| (queryEndTime() - queryStartTime()) as duration
```

To list start time, end time, and duration:

```sql
error
| queryStartTime() as starttime
| queryEndTime() as endtime
| (endtime - starttime) as duration
```

</details>

---
## queryStartTime()

<details><summary><small>The <code>queryStartTime()</code> operator returns the start time of the search <a href="/docs/search/get-started-with-search/build-search/set-time-range">time range</a> in milliseconds. You can use it in combination with <a href="#queryEndTime">queryEndTime()</a> to establish times and ranges for your non-continuous queries.</small></summary>

:::note
For dashboards in live mode or real time scheduled searches, queryTimeRange() is a more suitable option. In most cases the results would still be the same as using queryStartTime() and queryEndTime(), but the latter can be off from the real range by a few milliseconds.
:::

**Syntax**

```sql
queryStartTime() as <field>
```

**Rules**

* An alias is required.

**Examples**

To get a duration of your query:

```sql
error
| (queryEndTime() - queryStartTime()) as duration
```

To list start time, end time, and duration:

```sql
error
| queryStartTime() as starttime
| queryEndTime() as endtime
| (endtime - starttime) as duration
```

</details>

---
## queryTimeRange()

<details><summary><small>The <code>queryTimeRange()</code> operator returns the time duration for the query being executed in milliseconds. You can use it to establish time ranges for your continuous queries (CQs). This is a preferred operator for queries that are run in live dashboards or real time scheduled searches since it is more accurate than <a href="#queryStartTime">queryStartTime()</a> and <a href="#queryEndTime">queryEndTime()</a> operators in these cases.</small></summary>


**Syntax**

```sql
queryTimeRange() as <field>
```

**Rules**

* An alias is required.

**Examples**

To get the range of time for your query:

```sql
error
| queryTimeRange() as range
```

</details>

---
## replace

<details><summary><small>The <code>replace</code> operator allows you to replace all instances of a specified string with another string. You can specify the string to replace with a matching regex or literal text. You might use it to find all instances of a name and change it to a new name or to replace punctuation in a field with different punctuation. This operator is useful anytime you need to rename something.</small></summary>


**Syntax**

```sql
replace(<sourceString>, <searchString>, <replaceString>) as <field>
```

```sql
replace(<sourceString>, /<regex>/, <replaceString>) as <field>
```

**Rules**

* An alias is required.
* If any of the inputs are null, the output is null.
* If the searchString is not found or the regex does not match, the sourceString is returned intact.
* Regex must be [RE2 compliant](https://github.com/google/re2/wiki/Syntax).
* The string is case sensitive.
* When using multiple replace operators on the same field you must use the same alias, see an [example below](#use-the-replace-operator-on-multiple-strings-within-one-field).

#### Regex usage

You can use a regex to define what you want to replace. Capture groups are optional. You can use named or numbered capture groups to then reference in the `<replaceString>`.

Named capture groups: `/(?<section>flight)\/(?<id>[0-9]{5,})/`

Where you'd reference the named capture group **section** by its name in the `<replaceString>` with `${section}`.

Numbered capture group: `/(flight)\/([0-9]{5,})/`

Where you'd reference the first capture group in the `<replaceString>` with `$1`, and the second capture group with `$2`.

Using `$0` will reference the whole matching string.

#### Required characters to escape

If the `<replaceString>` needs to include the dollar sign (`$`), it needs to be escaped as `\\$`. Similarly, backslash itself needs to be escaped as `\\\\`. Some other escapable characters include:

* `\n` : replace with a new line character
* `\t` : a tab character

**Examples**

#### Replace unique IDs in URLs with a regex

If you have a URL and would like to see the number of times it was visited, but don't want to aggregate with unique IDs, you can replace the IDs with an empty string. Take the following URL, where in this example it belongs to a field named `url`:

`http://somewebsite.com/flight/12345678/certification`

To remove the ID `12345678` from the field `url` you can use the following query with a regex:

```sql
| replace(url, /[0-9]{5,}/, "") as url
```

This provides the URL like:

`http://somewebsite.com/flight//certification`

This would allow you to count the number of times the URL was requested without the specific IDs.

#### Replace with regex capture group

Following on from the previous example, you can reference strings in a capture group from your regex to use in the replace string. Take the same URL:

`http://somewebsite.com/flight/12345678/certification`

To replace the ID section of the URL with different text that includes a string from a capture group you can use the following query:

```sql
| replace(url, /(flight)\/([0-9]{5,})/, "new-$2-url") as url
```

This provides the URL like:

`http://somewebsite.com/new-12345678-url/certification`

The regex has two capture groups and in the `<replaceString>` we have specified $2 to have the second capture group's value included in the `<replaceString>`.

#### Replace periods in a field with different punctuation

To replace periods in a field with different punctuation, you'd use the following query. This query also uses the [Fields](#fields-operator) operator to display only the required fields.

```sql
error
| parse "[logger=*]" as logger
| replace(logger, ".","->") as logger_replace
| fields logger, logger_replace
```

which provides results like:

![replace](/img/reuse/query-search/replace_operator_example.png)

#### Remove underscores from a field to make it human readable

If you had underscores in a field called `moduleName`, you'd use a query such as:

```sql
... | replace(moduleName, "_", " ") as humanReadableModuleName
```

#### Replace periods in a phone number with dashes

To replace periods in a phone number with dashes, you'd use a query such as:

```sql
phone_num
| parse "[phone_num=*]" as phone_num
| replace(phone_num, ".", "-") as phone_num_dash
```

#### Rename a deployment’s abbreviation with a full name

In this example, we have a field called `deploymentName` with values that are abbreviations for the different deployments in an environment, such as `apac-prod`, `eu-prod`, `us-prod`, and `us-dev`. To replace the abbreviations with full titles for each deployment, you'd use a query like this:

```sql
replace(deploymentName,"apac","Asia Pacific") as deploymentName
| replace(deploymentName,"eu","Europe") as deploymentName
| replace(deploymentName,"us","United States") as deploymentName
| replace(deploymentName,"prod","Production") as deploymentName
| replace(deploymentName,"dev","Development") as deploymentName
```

#### Use the Replace operator on multiple strings within one field

For example, in multiple strings, to replace all number 5's with number 7's, and also replace all 4's with 2's, use multiple replace operations, as shown in the following query:

```sql
| replace(field, "5","7") as field
| replace(field, "4","2") as field
```

:::important
The same field name, `field` in the above example, needs to be passed to subsequent replace operations. You can change the field name (alias) in the last replace operation.
:::

In this example, we set the initial event_id to match the event_code, and then do the replace operation on the event_id. This way, the event_id is always set with the match, and then the replaced value is passed back into the field with any subsequent operations that don't match.

```sql
_sourceName=Application
|timeslice 1h
| parse "SourceName = \"*\";" as Source
| parse "Type = \"*\";" as Level
| parse "EventCode = *;" as Event_Code
| event_code as event_id
|replace(event_id, "1073743528","1704") as event_id
|replace(event_id,"1073758208","16384") as event_id
|replace(event_id,"1073742726","902") as event_id
|replace(event_id,"1073742890","1066") as event_id
|replace(event_id,"1073742724","900") as event_id
|replace(event_id,"1073750833","9009") as event_id
|replace(event_id,"1073742727","903") as event_id
|replace(event_id,"1073742827","1003") as event_id
|fields - event_code
//|count by level, _timeslice
//|transpose row _timeslice column level
|count by event_id
```

</details>

---
## rollingstd

<details><summary><small>The <code>rollingstd</code> operator finds the rolling standard deviation of a field, allowing you to identify changes over time.</small></summary>

For example, you'd use rollingstd in a query to identify spikes in activity for a Collector, or for a URL in your site. You can use a rollingstd to find compute the average number from the past, to identify changes (larger or smaller) over time.

Two or more data points are needed to get accurate results from a rollingstd operator. If you attempt to find the rollingstd of a single data point the results will automatically be zero.

If you specify a window length of 5, but only 4 data points are available, the rollingstd operator takes the average of whatever is available.

**Syntax**

```sql
rollingstd <field> [, window_length] [as <field>]
```

**Rules**

* An alias for rollingstd is optional. When an alias is not provided, **`_rollingstd`** is the default alias.
* Specified fields must contain numeric values.
* To add a query that includes a rollingstd operator to a Dashboard, you must add a group by function **before** the rollingstd operator.
* The default window length is 10.
* The maximum window length is 1000.

**Examples**

**Use rollingstd to see the difference of fields between time points, grouped by source host**

Running a query such as:

```sql
_sourcecategory=katta
| timeslice by 1m
| count by _timeslice,_sourcehost
| sort + _timeslice
| rollingstd _count,1 by _sourcehost
```

produces results like:

![rollingstd](/img/reuse/query-search/rollingstd_new.png)

#### Find the rolling standard deviation of a field between time points

Using rollingstd with timeslice, you can run a query similar to:

```sql
* | parse "bytes: '*'" as bytes
| timeslice 1m
| sum(bytes) as bytes by _timeslice
| sort _timeslice
| rollingstd bytes, 5
```

that produces results like:

![example 1](/img/reuse/query-search/rollingstd_example.png)

The aggregation table can be made into an area chart, like this:

![example 2](/img/reuse/query-search/rollingstd_example2.png)

#### Specify a window length of 5, but only 4 data points are available

Before 5 values are available, the rollingstd operator takes an average
of whatever is available. For example:

```sql
_sourcecategory=katta
| timeslice by 1m
| count by _timeslice,_sourcehost
| where _sourcehost="prod-katta-237"
| sort + _timeslice
| rollingstd _count,5
```

which produces results like:

![data points](/img/reuse/query-search/rollingstd_new_data_points.png)

Rollingstd is also used with the [Backshift](#backshift) operator.

</details>

---
## save (Lookups Classic)

<details><summary><small>The <code>save</code> (classic) operator works with the classic Lookup Tables feature. For information about the new, more scalable Lookup Tables feature and the new <code>save</code> operator that works with it, see <a href="/docs/search/lookup-tables">Lookup Tables</a> and <a href="#save">save</a>. The new <code>save</code> operator allows you to merge new and changed rows, whereas, this classic <code>save</code> operator can only append to existing rows.</small></summary>

Using the **save** operator allows you to save the results of a query into the Sumo Logic file system. Later, you can use the lookup operator to access the saved data. The save operator saves data in a simple format to a location you choose.

You will need to remember the path where you point the save operator to put the file. You may want to save searches that contain save operators so you can refer to it later. There is no way to locate the saved file if you forget the path.

**Syntax**

```sql
save [append]\<myFolder/mySubFolder/myFileNam\>
```

**Rules**

* The file size limit for saved data is 500MB.
* Queries that use the Save operator can't be [pinned](/docs/get-started/library#search-the-library).

**Examples**

Let's say you want to save data about new user accounts created each day. Your Save operator could look like:

```sql
| parse "name=*," as name
| parse "action=*," as action
| parse "date=*," as date
| where action="sign-up"
| first(date) as date, first(action) as action by name
| save myFolder/mySubFolder/newDailyUsers
```

The above search would create a file that looks like this:

| Name | Action | Date |
|----------|------------|------------|
| John     | sign-up    | 2012-08-20 |
| Bill     | sign-up    | 2012-08-21 |
| Bob      | sign-up    | 2012-08-21 |

You can access data in the saved table using the lookup operator.

Aggregate results can also be saved with the save operator.

#### Use the Fields operator to remove unnecessary fields

When creating a save file, make sure that the file is as small as possible to work more quickly. A good way to do this is to remove unnecessary fields using the [Fields](#fields-operator) operator. This includes [built-in metadata fields](/docs/search/get-started-with-search/search-basics/built-in-metadata), like `_raw`.

#### Saving files to a shared location

A file generated by a save operator can be saved to an org-level shared folder. This allows for others in your organization to use your search results when running their lookup queries.

:::note
Files saved to a shared location can only be modified by the person who originally shared the file.
:::

To save a file to a shared location include the word **shared** at the beginning:

```sql
...save /shared/myFolder/mySubFolder/fileName
```

For more information, see [Using Lookup to Access Saved Data](#lookup-classic).

#### Appending to saved files

Once you've created a file generated by a save operator, you can append data at any time. If you are running a scheduled daily search that calculates properties for the current day, that data is appended to the existing file containing results from the previous days. Data you append to a file must match exactly; if the new results don't match the previous results an error message appears, including cases where you attempt to append with additional fields.

If you don't use "append" the previously saved data will be overwritten.

Let's say that you'd like to append to your **newDailyUsers** file each day by scheduling this search to run every 24 hours:

```sql
| parse "name=*," as name
| parse "action=*," as action
| parse "date=*," as date
| where action="sign-up"
| first(date) as date, first(action) as action by name
| save append myFolder/mySubFolder/newDailyUsers
```

Each day the query runs the above data is appended to the **newDailyUsers** file.

You can also append data to a saved file from different queries. For example, say we have two sources, "bill" that includes billing information, and "config" that contains account information, and we'd like to be able to search for some values from each source. These searches would create a table with information from both sources:

```sql
_source=bill | parse "user_id=*," as name
| parse "user_email=*," as email
| save myFolder/mySubFolder/NameEmailMapping
```

```sql
_source=config | parse "_user=[*]" as name
| parse "contact_info=[*]" as email
| save append myFolder/mySubFolder/NameEmailMapping
```

</details>


---
## save

<details><summary><small>The <code>save</code> operator allows you to save the results of a query to a lookup table you have already created, as described in <a href="/docs/search/lookup-tables/create-lookup-table">Create a Lookup Table</a>. You can use the <a href="#lookup">lookup</a> and <a href="#cat">cat</a> operator to access the saved data.</small></summary>

You can use the `append` option with `save` to merge new and changed rows into a lookup table. If you use `save` without `append`, any existing rows in the lookup table will be overwritten by your search results. 

If your lookup table is configured with a time-to-live (TTL), creating or updating a row sets or resets the TTL for that row.   

Either raw or aggregated results can be saved with the `save` operator.

**Syntax** 

```sql
save [append] path://”<path-to-table>”
```

Where: 

* `path-to-table` is the path to the lookup table in the Sumo Logic Library.

:::note
Be sure to specify the path to the table in in this format: `path://”<path-to-table>”`
:::

To determine the path to a lookup table, highlight the row for the table in the Sumo Logic Library, and select **Copy path to clipboard** from the three-dot more options menu for the table.

**Rules** 

* Your search schema must match the schema of the Lookup Table that you are writing to, including the data types of the fields you want to save to the lookup table. Make sure your search returns all of the fields defined for the lookup table and no additional fields. Additional fields will be dropped and not saved to the lookup table. If your search returns fewer fields than that defined for the lookup table, the search will fail.
* The file size limit for lookup tables is 100 MB.
* You can't create a lookup table with the `save` operator. You must first create a lookup table, as described in [Create a Lookup Table](docs/search/lookup-tables/create-lookup-table.md). 
* The `save` operator is not supported with Scheduled Views.
* Queries that use the `save` operator can't be pinned.

**Example** 

#### Using save without append

This example saves search results data about new user accounts to the lookup table on Sumo Logic  .

```sql
| parse "name=*," as name
| parse "action=*," as action
| parse "date=*," as date
| where action="sign-up"
| first(date) as date, first(action) as action by name
| save path://"/Library/Users/myusername@sumologic.com/Users"
```

The above search would populate the lookup table to have these rows:

| Name | Action | Date |
|----------|------------|------------|
| John     | sign-up    | 2012-08-20 |
| Bill     | sign-up    | 2012-08-21 |
| Bob      | sign-up    | 2012-08-21 |

#### Using save with append

You can use the `append` option to add rows to a lookup table and to update existing rows. For example, you'd run a scheduled search once a day and use `save append` to merge new and changed rows into the table. If a row in your search results has the same primary key as a row in the lookup, the lookup table row will be updated. If the primary key in a row in the search results does not match a row in the lookup table, the new row will be added to the lookup. Fields returned by your search that are not in the Lookup Table schema will be dropped and not saved to the lookup table. If your search returns fewer fields than that defined for the lookup table, the search will fail.

Let's say that you'd like to append your lookup file each day by scheduling this search to run every 24 hours:

```sql
| parse "name=*," as name
| parse "action=*," as action
| parse "date=*," as date
| where action="sign-up"
| first(date) as date, first(action) as action by name
| save append path://"/Library/Users/myusername@sumologic.com/Users"
```

Each day the query runs and the new and changed rows are written to the table.

You can also append data to a saved file from different queries. For example, say we have two sources, "bill" that includes billing information, and "config" that contains account information, and we'd like to be able to search for some values from each source. These searches would populate a table with information from both sources:

```sql
_source=bill | parse "user_id=*," as name
| parse "user_email=*," as email
| save path://"/Library/Users/myusername@sumologic.com/Users"
_source=config | parse "_user=[*]" as name
| parse "contact_info=[*]" as email
| save append path://"/Library/Users/myusername@sumologic.com/Users"
```

</details>

---
## sessionize

<details><summary><small>The <code>sessionize</code> operator allows you to use an extracted value from one log message (generated from one system) to find correlating values in log messages from other systems. After you run sessionize, these related events are displayed on the same page. The thread of logs woven together is called a <i>session</i>.</small></summary>

Depending on your use case, you'd also use the [join](#join) operator, which may be more appropriate and easier to use.

For example, let's say we have the value of a userRequestId, which entered a distributed system; the request goes through systems named Service, Stream, and Config:

![sessionize layout](/img/reuse/query-search/Sessionize_layout.png)

Each system generated log messages, so we know that at some point a failure occurred. We know the userRequestID value from the log files from the Service machine, and we know the serviceSessionId, streamRequestId, and configSessionId. Using **sessionize**, we can weave together these disparate logs to identify where the failure occurred.

:::note
Queries using sessionize can't be added to a Dashboard.
:::

**Syntax**

```sql
sessionize ("<anchor pattern1>") as (<alias list1>), ("<anchor pattern2>") as (<alias list2>)
```

Where *anchor pattern* is like a parse anchor expression, except that it can include variables from previous expressions (using `$variableName`).

**Rules**

* The sessionize operator is followed by more than one [anchor](./parse-operators/parse-predictable-patterns-using-an-anchor.md) expression.
* Each anchor expression can be used to extract one or more variables from a matching log.
* You can use the extracted variable to join with a second log message containing that variable using a $variableName notation.

After using the [Trace](#trace) operator to find related sessions, you can use the sessionize operator to refine the results.

**Example**

Let's say we have two events that interest us in our Windows events:

* When users are logged off
* When someone restarts a session

These two events together for a system can reveal how problematic a particular Windows machine, domain, or logon ID can be.

In this example:

```sql
_sourceCategory=OS/Windows
 | sessionize "ComputerName = \"*\";\n\tEventCode = 4778;*Account Name:\t\t*\r*Account Domain:\t\t*\r*Logon ID:\t\t*\r" as (computerName,_11,userName,_u1,domain,_d1,logonID),
 "ComputerName = \"$computerName\";\n\tEventCode = 4779;*Account Name:\t\t$userName\r*Account Domain:\t\t$domain\r*Logon ID:\t\t*\r" as (_event2,_u2,_d2,_21)
```

1. Specify the search conditions that correlate the logs. In this example a simple `_sourceCategory` of all my Windows logs.
1. Extract the information relevant to the sessions you want to compare. In this case, we want to compare Windows disconnect events, code 4779 to reconnections, 4778 to see if someone disconnects, were they able to reconnect.

Here's an example of the results from this query:

![sessionize.png](/img/search/searchquerylanguage/search-operators/sessionize.png)

</details>

---
## smooth

<details><summary><small>The <code>smooth</code> operator calculates the rolling (or moving) average of a field, measuring the average of a value to "smooth" random variation. Smooth operator reveals trends in the data set you include in a query.</small></summary>

Within a query that contains a smooth operator you will choose a window (described as window_length in the syntax below); the average of the values within the window creates a data point.

If you specify a window length of 5, but only 4 data points are available, the smooth operator takes the average of whatever is available.

Adding a group by function to a smooth operator query produces a running average within each group (with data from each group calculated separately).

**Syntax**

```sql
smooth <field> [, <window length>] [as <field>]
```

**Rules**

* An alias for smooth is optional. When an alias is not provided, `_smooth` is the default alias.
* The specified field must contain numeric values.
* To add a query that includes a smooth operator to a Dashboard, you must add a group by function before the smooth operator.
* The default window length is 10.
* The maximum window length is 1000.

**Example**

The following examples use the `sort` operator to sort the time prior to calculating the rolling average with `smooth`.

#### Use smooth to see the difference of fields between time points, grouped by source host

Running a query such as:

```sql
_sourcecategory=katta
| timeslice by 1m
| count by _timeslice,_sourcehost
| sort + _timeslice
| smooth _count, 50 by _sourcehost
```

produces results like:

![too smooth.png](/img/search/searchquerylanguage/search-operators/too-smooth.png)

#### Smooth the difference of a quantity between time points

Using smooth with timeslice, you can run a query similar to:

```sql
* | parse "bytes transmitted: '*'" as bytes
| timeslice 1m
| sum(bytes) as bytes by _timeslice
| sort _timeslice
| smooth bytes, 5
```

that produces results like:

![smooth.png](/img/search/searchquerylanguage/search-operators/smooth.png)

#### Use backshift with smooth and rollingstd to view the averages of incoming bytes

Running a query like:

```sql
...| timeslice by 1m
| avg(oneMinuteRate) as avgRateByHost by _sourcehost,_timeslice
| sum(avgratebyhost) as totalIncomingRate by _timeslice
| sort + _timeslice
| backshift totalIncomingRate, 1 as lagRate
| smooth lagRate,10 as movingAvg
| rollingstd lagRate,10 as rollingStd
| movingAvg + (3 * rollingStd) as upper
| movingAvg - (3 * rollingStd) as lower
```

produces results similar to:

![OneMinuteRate.png](/img/search/searchquerylanguage/search-operators/OneMinuteRate.png)

#### Specify a window length of 5, but only 4 data points are available

Before 5 values are available, the smooth operator takes an average of whatever is available. For example:

```sql
_sourcecategory=katta
| timeslice by 1m
| count by _timeslice,_sourcehost
| where _sourcehost="nite-katta-cold-4"
| sort + _timeslice
| smooth _count,5
```

produces results like:

![Coldsmooth.png](/img/search/searchquerylanguage/search-operators/Coldsmooth.png)

</details>

---
## sort

<details><summary><small>The <code>sort</code> operator orders aggregated search results. The default sort order is descending. Then you can use the <code>top</code> or <code>limit</code> operators to reduce the number of sorted results returned.</small></summary>

Order is also synonymous with sort. You can use them interchangeably in your queries.

**Syntax**

```sql
sort by <field> (displays results as descending, by default)
```

```sql
sort by +<field> (displays results as ascending)
```

```sql
sort by <field> asc (displays results as ascending)
```

```sql
sort by <fieldA>, <fieldB>
```

```sql
top <#> <field>​​​​​​​ by <group_by_operator>
```

**Rules**

* Default sort order is descending.
* Sorting is case sensitive with lower-case followed by upper-case.
* To reverse the sort order to ascending, type a plus sign (+) before the field name you are sorting by. Alternatively, you can type **asc** after the field name.
* To numerically sort, first [cast the field to a number](#casting-data-to-a-number-or-string). Otherwise, the sort will be ordered as a text field.

**Example**

```sql
status AND down | extract "user=(?<user>.*?):" | count (*) group by user | sort by _count
```

```sql
... | count user | top 2 user by _count
```

```sql
... | count user | sort by _count asc
```

#### Top 10 pages by page hits

This example counts page hits by sourceHost, sorts them by page hits, and limits the results to the top 10.

```sql
_sourceCategory=Labs/Apache/Access
| count as page_hits by _sourceHost
| sort by page_hits
| limit 10
```

which provides results like:

![sort](/img/reuse/query-search/sort_operator_example.png)

For more information, see [Top](#top) operator or [Limit](#limit) operator.

</details>

---
## substring

<details><summary><small>The <code>substring</code> operator allows you to specify an offset that will output only part of a string, referred to as a substring. You can use this operator to output just a part of a string instead of the whole string, for example, if you wanted to output an employee’s initials instead of their whole name.</small></summary>

**Syntax**

```sql
substring(<sourceString>, <startOffset>, <endOffset>) as <outputField>
```

```sql
substring(<sourceString>, <startOffset>) as <outputField>
```

**Rules**

* The `startOffset` must be a non-negative integer and less than the ength of the sourceString.
* The `endOffset` must be a non-negative integer that is equal to or greater than startOffset.
* If the `endOffset` is not specified, the substring is taken from the startOffset until the very end of the sourceString.
* The `endOffset` may be equal to or greater than the length of the sourceString, but it would behave the same as if the user did not specify an endOffset.

**Example**

#### Output "world!" from "Hello world!"

Use the following query to output only the word "world!" and the exclamation point from "Hello world!"

```sql
... | substring("Hello world!", 6)
```

#### Output "Sumo" from "Sumo Logic"

This query would output the word "Sumo" from the company name "Sumo Logic".

```sql
... | substring("Sumo Logic", 0, 4)
```

Whereas this query would output the entire company name:

```sql
... | substring("Sumo Logic", 0, 100)
```

#### Output the year from the string dateTimeString

This query would output only the year from the string dateTimeString:

```sql
... | substring(dateTimeString, 0, 4)
```

#### Get an employee’s initials from their first name and last name

Use the following query to extract an employee’s initials from substrings firstName and lastName, then transform the letters to uppercase and Concat them as "initials":

```sql
| substring(firstName, 0, 1) as x
| substring(lastName, 0, 1) as y
| toUpperCase(concat(x, y)) as initials
```

#### Invalid Examples

These are examples of queries that will not work with the Substring Operator:

This query will not work because the startOffset is negative:

```sql
... | substring("Hello world", -1)
```

This query will not work because numerically the endOffset is before the startOffset:

```sql
... | substring("Hello world", 3, 2)
```

</details>

---
## threatip

<details><summary><small>The <code>threatip</code> operator correlates <a href="https://www.crowdstrike.com/sumologic">CrowdStrike's</a> threat intelligence data based on IP addresses from your log data, providing security analytics that helps you to detect threats in your environment, while also protecting against sophisticated and persistent cyber-attacks.</small></summary>

The `threatip` operator uses the same lookup as the [Threat Intel Quick Analysis App](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#viewing-threat-intel-quick-analysis-dashboards) but is simplified for only IP threat lookups. For further details on how this lookup works and what to do with the results see [Threat Intel FAQs](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#Threat-Intel-FAQ).

The only [Indicators of Compromise (IOC)](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#Threat-Intel-FAQ) supported is IP address.

**Syntax**

```sql
threatip <ip_address_field>
```

#### Response Fields

* actor
* malicious_confidence
* raw_threat
* type

**Example**

```
_sourceCategory=Labs/*
| parse regex "(?<ip_address>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| threatip ip_address
| where !(isNull(malicious_confidence))
```

</details>


---
## Timeslice Join Results

<details><summary><small>The <code>timeslice</code> operator uses the metadata field <code>_messagetime</code> to organize the logs by slices. In your query, you need to specify the <code>timeslice</code> operation before the <code>join</code>, because the <code>_messagetime</code> field will no longer exist after the <code>join</code> operation is performed. When you add the <code>timeslice</code> before the <code>join</code>, each of the tables created by the <code>join</code> will now include a <code>_timeslice</code> field. </small></summary>

You can reference the table's `_timeslice` field to use in your `group by` operation. The name of the table is appended to the table's fields.

For example, if your table is named **errors**, your field would be **errors__timeslice**. (Notice that the name uses *two* underscores.)

Here's an example query:

```sql
*
| timeslice 1h
| join
(parse "starting stream from * " AS streamId) AS table1,
(parse "starting search from parent stream * " AS streamId) AS table2
on table1.streamId = table2.streamId
| count table1_streamId, table1__timeslice
| formatDate(fromMillis(table1__timeslice ), "MM/dd/yyyy HH:mm:ss z") as timeslice
```

</details>

---
## timeslice

<details><summary><small>The timeslice operator aggregates data by time period, so you can create bucketed results based on a fixed interval (for example, five-minute buckets). Timeslice also supports creating a fixed-target number of buckets, for example, 150 buckets over the last 60 minutes.</small></summary>

There are two primary use cases for this operator:

1. Group data into time-sliced buckets for aggregation analysis
1. Group data into time-sliced buckets for time-series visual analysis

Let’s say you log each time a user successfully logs into your service, and you want to track how many logins per hour, on a daily basis. You can use the timeslice operator to group the data into one-hour segments, and view the data over a 24 hour period.

**Syntax** 

```sql
timeslice <#><time_period> [as <field>] | <aggregating_operator> by <field>
```

```sql
timeslice <#> buckets [as <field>] | <aggregating_operator> by <field>
```

Supported `<time_period>` values are weeks (`w`), days (`d`), hours (`h`), minutes (`m`), and seconds (`s`).

To group data by (M) month you can use the formatDate operator to format _timeslice to a month format, like this:

```sql
| timeslice 1d
| formatDate(_timeslice,"MM-01-yyyy") as month
| parseDate(month,"MM-dd-yyyy") as _timeslice
| <aggregating_operator> by _timeslice
```

**Rules**

* An alias for the timeslice field is optional. If an alias is not provided, a default `_timeslice` field is created that marks the start of the timeslice in milliseconds.
* Creates a field named `__timeslice_end` that marks the end of the timeslice in milliseconds.
* The timeslice operator is commonly used in conjunction with the transpose operator. After you’ve timesliced the data into buckets, the transpose operator allows you to plot aggregated data in a time series.
* The timeslice operator must be used with an aggregating operator such as **count by** or **group by**.
* The number of buckets in your query is a target or maximum, not necessarily the exact number of buckets that will be returned. For example, if your query specifies 150 buckets, Sumo Logic will find a reasonable clock-aligned resolution to return approximately 150 buckets in the query results.
* If you use timeslice with the compare or outlier operators, **don't** alias timeslice. They expect _timeslice.
* If no time period or bucket is specified it defaults to the time range of the Search.

**Example**

Successful logins per hour.

```sql
 _sourceCategory=exampleApplication*
| parse "login_status=*" as login_status
| where login_status="success"
| timeslice 1h
| count by _timeslice
```

![Aggregates.png](/img/search/searchquerylanguage/search-operators/Timeslice-Aggregates.png)

#### Known Issue

There is a known issue with the timeslice operator and Daylight Savings Time (DST). When the clock moves forward, any timeslice operation that crosses the DST boundary is affected. For this reason, results may show more than one entry for that day.

For example, in Australia, DST goes into effect on October 2nd for Spring. For that day, with a 1d timeslice, you would see two entries for the same day: one for 12 a.m. and another for 11 p.m.

In another example, if you had a 4h timeslice, you would usually see results at 12 a.m., 4 a.m., 8 a.m., 12 p.m., etc. But when the DST happens, the result after 12 a.m. could be either 3 a.m. or 5 a.m., depending on Fall or Spring.


#### Basic examples

**Timeslice 5m**   

Fixed-size buckets at 5 minutes. The output field is **default _timeslice**.

**Timeslice 2h as 2hrs** 

Fixed-size buckets that are 2 hours long. The output field name is aliased to **2hrs**.

**Timeslice 150 buckets**   

Bucketing to 150 buckets over the search results.

**Timeslice 1m as `my_time_bucket_field_name`**   

Fixed-size buckets of 1 minute each. The output field name is aliased to **`my_time_bucket_field_name`**.

**Example** in queries

This outputs a table in the Aggregates tab with columns `_count` and **`_timeslice`** with the timeslices spaced in 5 minute intervals:

```sql
* | timeslice 5m | count by _timeslice 
```

This outputs three columns: `_count`, `_sourceCategory`, and **`my_field_name_alias`**:

```sql
* | timeslice 5m as my_field_name_alias | count by _sourceCategory, my_field_name_alias
```

This outputs a table in the Aggregates tab with columns `_count`, `_sourceCategory`, and `_timeslice` with 10 rows for each `_sourceCategory` in that table if you have messages covering the entire search period:

```sql
* | timeslice 10 buckets | count by _sourceCategory, _timeslice
```

#### Additional Examples

**Example 1:** Checking the server distribution over time to make sure the load balancer is working properly.

```sql
_sourceCategory=Apache/Access
| timeslice 1h
| parse regex "(?<ip_address>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| count _timeslice, ip_address
| transpose row _timeslice column ip_address
```

This query produces these results in the Aggregates tab, which you can
display as a column chart.

![Timeslice](/img/search/searchquerylanguage/search-operators/timeslice_ex1.png)

**Example 2:** All computer access to Sumo Logic over time.

```sql
_sourceCategory=*IIS*
| parse "* * * * * * * * " as date, time, csmethod, cs_uri_stem, cs_uri_query, s_port, s_ip, cs_useragent
| timeslice 1m
| count by _timeslice, s_ip
| transpose row _timeslice column s_ip
```

This query produces these results in the Aggregates tab, which you can display as a stacked column chart:

![Timeslice Example](/img/search/searchquerylanguage/search-operators/TimeSliceEx2.png)

**Example 3:** Monitoring non-normal status codes (400s and 500s) on Apache servers.

```
_sourceCategory=Apache/Access
| parse "HTTP/1.1\" * " as status_code
| where status_code >= 400
| timeslice 5m
| count as count by _timeslice,_sourceHost
| transpose row _timeslice column _sourceHost
```

This query produces these results in the Aggregates tab, which you can display as an area chart:

![Timeslice example](/img/search/searchquerylanguage/search-operators/Timeslice-Ex3.png)

</details>

---
## toLowerCase and toUpperCase

<details><summary><small>The <code>toLowerCase</code> operator takes a string and converts it to all lower case letters. The <code>toUpperCase</code> operator takes a string and converts it to all uppercase letters.</small></summary>

These operators can be useful for normalizing source logs with inconsistent capitalization, such as Windows Event logs, or changing file names and paths for files systems that require all lower case letters. They are especially useful for queries that include conditionals and grouping, in order to reduce the number of groups in the search results.

:::tip
**toLowerCase** and **toUpperCase** are useful when you use the following equating conditions with Sumo operators: the equal to sign (=) and the not equal to sign (!=) sign. These conditions are case-sensitive in Sumo Logic. For more information, see [Using toLowerCase or toUpperCase with an equating condition].
:::

**Syntax**

```sql
toLowerCase(<string>) [as <field>]
```

```sql
toUpperCase(<string>) [as <field>]
```

**Rules**

* Non-string fields are not accepted.

**Examples**

#### Using toUpperCase with a conditional operator

Use the following query to return all the `_sourceHost` matches in upper case letters.

```sql
_sourceCategory=service OR _sourceCategory=search
| toUpperCase(_sourceHost) as _sourceHost
| where _sourceHost matches "NITE*"
```

which provides results like:

![](/img/reuse/query-search/toUpperCase.png)

#### Using toLowerCase or toUpperCase with an equating condition

**toLowerCase** and **toUpperCase** are useful when you use the equal to sign (=) or the not equal to sign (!=) with Sumo operators. These conditions are case-sensitive in Sumo Logic. The following example uses **toLowerCase** to convert the hash value to lower case before performing the lookup. 

```sql
*
| limit 1
| toLowerCase ("B101CD29E18A515753409AE86CE68A4CEDBE0D640D385EB24B9BBB69CF8186AE") as hash
| count hash
| fields -_count
| lookup raw from sumo://threat/cs on threat = hash{code}
```

#### Using toUpperCase with the count operator

This query also returns all matching `_sourceHost` values in upper case letters, using the count operator.

```sql
_sourceCategory=service OR _sourceCategory=search
| toUpperCase(_sourceHost) as _sourceHost
| count by _sourceHost
```

which produces results like:

![](/img/reuse/query-search/toUpperCase_count.png)

#### Find a user name and convert it to lowercase

This query will search a Source Category for a user name and convert it to lowercase, no matter how the name has been input.

```sql
_sourceCategory=OS/Linux/Security
| parse "user=* " as username
| toLowerCase(username) as username
| where username matches "*joe smith*"
```

</details>

---
## top

<details><summary><small>Use the <code>top</code> operator with the <a href="#sort">sort</a> operator, to reduce the number of sorted results returned.</small></summary>

:::tip
We recommend you instead use the [topk](#topk) operator so you can take advantage of its additional functionality.
:::

**Syntax**

```sql
top <#> <field> [by <group_by_operator>]
```

**Examples**

#### List the Top 5 source categories with errors

Use the following query to list the top 5 source categories with errors,
and get their count.

```sql
error | top 5 _sourcecategory
```

which produces results like:

![example](/img/reuse/query-search/top_example1.png)

You can use the following query to get the same results, but make the
count explicit:

```sql
error | top 5 _sourcecategory by count
```

#### List the Top 10 source categories by message time

This query lists the top 10 source categories by message time, without
an explicit count.

```sql
error | top 10 _sourcecategory by _messagetime
```

which produces results like:

![example](/img/reuse/query-search/top_example3.png)

</details>

---
## topk

<details><summary><small>Allows you to select the top values from fields and group them by fields. The topk operator can replace the top operator and adds the ability to choose the top of top.</small></summary>

:::tip
If you're using top, we recommend switching to topk for all your queries so that you can take advantage of the additional functionality of topk.
:::

**Syntax**

```sql
topk(<#>, <top_field>[, <top_field_2>, ...]) [by <group_by_fields>]
```

`#` is an integer equal to or greater than 1.

#### Response Field

* `_rank` - the order number of the result.

**Example**

#### Top 5 source hosts generating errors

Look at the top five source hosts generating the most errors and the number of errors for given timeslices:

```sql
error
| timeslice 1m
| count by _timeslice, _sourceHost
| topk(5, _count)
```

![basic error ranking results.png](/img/search/searchquerylanguage/search-operators/topk/basic-error-ranking-results.png)

#### Top 2 results

Look at the top 2 results for a given category:

```sql
error
| timeslice 1m
| count by _timeslice, _sourceHost
| topk(2,_count) by _sourceHost
```

Let's figure out what is the maximum error count for each sourceHost for the given time range slightly changing our query. We’ll add a by clause to the given operator and provide sourceHost as an argument. This tells the system that we want to look for the top “x” counts for each source Host.

![basic top 2 rank.png](/img/search/searchquerylanguage/search-operators/topk/basic-top-2-rank.png)

Find the top two source host, source category pairs.

```sql
error
| timeslice 1m
| count by _timeslice, _sourceHost, _sourceCategory
| topk(2,_count) by _sourceHost, _sourceCategory
```

We can specify more than one argument to group by. In the query above, we are looking for the top 2 results for each source host, source Category pairs.

![basic top with group by.png](/img/search/searchquerylanguage/search-operators/topk/basic-top-with-group-by.png)  

</details>

---
## total

<details><summary><small>The <code>total</code> operator inserts the sum of a set of fields into every row of the set. Unlike the sum operator, which produces an aggregate value, the total operator inserts the total value as a new column, enabling expressions that compare an individual value to the total.</small></summary>

**Syntax**

Create a new field (named **`_total`** by default) containing the sum of the specified field:

```sql
total <field>
```

Create a new field containing the sum of the specified field for groups of the set of fields specified in the by clause. A given row's total is the sum of the specified field for all rows with matching values in the by clause fields.

```sql
total <field> [as <field>] [by <field1>, <field2>, ...]
```

**Rules**

* An alias for total is optional. If no alias is given, **`_total`** is used by default.
* Rows in which the specified field contains non-numeric values will be skipped.
* There is a limit of 100k messages that can be totaled. 

**Examples**

#### Calculate the total

In this example, you can find the total data (bytes) transmitted for a time range. Running a query such as:

```sql
* | parse "bytes:*," as data
| total data as t_data
```

produces results similar to:

![Total.png](/img/search/searchquerylanguage/search-operators/Total.png)

Note that the t_data value of 16,761,621,241.25455 is the sum of the data field in all rows, many of which are not visible  here.

This query produces only three results, illustrating that _total is simply the sum of ps:

```sql
* | parse "BytesTotalPersec = \"*\"" as ps
| where ps > 3000
| total ps
```

![total op](/img/search/searchquerylanguage/search-operators/total-op.png)

#### Calculate totals by message time

To group rows by their message time and calculate different totals for each time, use the `_messageTime` field:

```sql
* | limit 10
| 1 as data
| total data by _messagetime
```

This query looks at the first 10 rows and creates a field called data in each. Rather than simply totaling data—which would be 10—this query groups the rows by their message time and provides the total for each group.

#### Calculate the running total of requests

Say you'd like to find the running total of requests from certain users. Running a query similar to:

```sql
_sourceCategory=IIS (Wyatt OR Luke)
| parse "* * * * * * * * " as date, time, csmethod, cs_uri_stem, cs_uri_query, s_port, c_ip, cs_username
| timeslice by 1m
| count as requests by _timeslice,cs_username
| sort by _timeslice asc, cs_username
| total requests as running_total by cs_username
```

produces results similar to:

![RunningTotal.png](/img/search/searchquerylanguage/search-operators/RunningTotal.png)

</details>

---
## tourl

<details><summary><small>The <code>tourl</code> operator provides you the ability to assign a short name that describes the URL. It is similar to creating a href for the URL with a short name. URLs are generally long and they don't tell you what information is displayed when the URL is opened. A common benefit of using this operator is to provide a description of a URL to display in dashboards.</small></summary>


**Syntax**

```sql
tourl(<url_column_name>, <url_short_name_column>) as <field>
```

```sql
tourl(<url_column_name>, <url_short_name_column>, <url_short_name_prefix>, <url_short_name_suffix>) as <field>
```

Where:

* `url_column_name` is the column having the URL to which you want to assign a short name.
* `url_short_name_``column` is the short name for the URL. It can be a static name that you specify, or it can be a variable that uses a value from a column.
* `url_short_name_prefix` (optional) is the prefix, if any, to the short name. Requires suffix.
* `url_short_name_suffix` (optional) is the suffix, if any, to the short name. Requires prefix.

**Rules**

* If you choose to specify one optional parameter, you must specify both the optional parameters - prefix and suffix. You should provide an empty string ("") if you don't have a value for one.
* Only fully-formed URLs (for example, `https://google.com`) are supported as values for `url_column_name`.
* For the link to be clickable your query needs to aggregate by the returned field.
* You can only specify a single URL. `tourl` does not support merging multiple outputs into a single field.

#### Tabs

When your URL points to another Sumo Logic feature from your account, such as a Dashboard (New), Search, Traces, or Collection page, you will have the option to open the link in another Sumo Logic tab or browser tab.

Right-click the link to view the tab-options menu:

![tab menu.png](/img/search/searchquerylanguage/search-operators/tourl-tab-menu.png)

If you don't see the menu it is not a supported link.

* The URL must be from the same host.
* The menu isn't available in full-screen mode. 

**Example**

#### Providing a static name as short name

If you’re sharing the Akamai Denials by Host search query in a dashboard with others, you can use the tourl operator to add a href to the URL in the dashboard. You’ll run this query to generate the short name:

```sql
| tourl("https://www.sumologic.net/ui/#section/search/H10KMVHzntXo9PrFAumuFemdU27f2iqU7bA3U7Lq", "Akamai Denials by Host") as AkamaiQuery
| count AkamaiQuery
```

When you add this to a dashboard, you’ll see the short name. When you click the link, it will open the Akamai denials by host search query.

![AkamaiSearchQuery.png](/img/search/searchquerylanguage/search-operators/tourl-AkamaiSearchQuery.png)

#### Using a column for short name, and a prefix

In the dashboard of failed scheduled searches, you can use the tourl operator to display the time when the scheduled searches failed and linking it to the search URL, instead of displaying the URL of the scheduled searches.

You’ll run this query to generate the short name:

```sql
_index=sumologic_audit class=scheduled_search action=FINISH status=FAILURE
| where _sourceCategory="scheduled_search"
| KV "SchTime", "Url"
| tourl(Url, SchTime,"Scheduled search failed at: ","") as urlfailed
| count by urlfailed
```

Notice the query uses the value `"Scheduled search failed at: "` as the value for the prefix optional parameter, and an empty string ("") for the suffix parameter.

The query result will be:

![tourlResult.png](/img/search/searchquerylanguage/search-operators/tourlResult.png)

When you add the result to a dashboard, you’ll see the short name. When you click the link, it will take you to the scheduled search query.

![toUrlDashboard.png](/img/search/searchquerylanguage/search-operators/toUrlDashboard.png)

</details>

---
## trace

<details><summary><small>The <code>trace</code> operator acts as a highly sophisticated filter to connect the dots across different log messages. You can use any identifying value with a trace operator, such as a user ID, IP address, or session ID, to retrieve a comprehensive set of activity associated to that original ID.</small></summary>

Trace operators require the following:

* [Regular expression](./parse-operators/parse-variable-patterns-using-regex.md) to find related messages.
* Starting value (for example, an ID).

**Syntax**

```sql
trace "<regex>" "<starting_value>"
```

#### Tracing session IDs

Let's say that your product uses a variety of session IDs to track requests as they flow through your system. Different components use a series of four-digit hexadecimal IDs to process a customer order, as shown here:

![trace_graphic 4.png](/img/search/searchquerylanguage/search-operators/trace_graphic.png)

Imagine that an error happened at some point in the process, generating an error including "PROCESSING FAILED: webID=7F92. Starting from this information, we can use a trace operator in our query to following the chain of activity:

```sql
* | trace "ID=([0-9a-fA-F]{4})" "7F92" | where _raw matches "*ERROR*"
```

This query tells trace how to identify the individual pieces of the chain, using the four-digit hexadecimal string following "ID=". Trace then scans incoming logs to connect the dots, building a chain based on IDs occurring together in the same log, starting from the value we supplied (7F92 in our example). So if trace observes a long, "Initiating requestID=082A for webID=7F92" it identifies the relationship between the webID we supplied with the requestID. Trace will continue to scan
logs, building the chain of events. Log messages unrelated to these values are disregarded.

#### Tracing forward and backward in time

You can use a trace operator to trace events in the past or to track future events. In either case, a chain is built, finding links between log messages to determine activity based on whatever values you query. For our forward and backward trace operations, we're going to assume that a specific Windows computer has been compromised.

We want to build a chain of events from the compromised host to try to determine the identity of the hacker. To do this, we will need to:

1. Identify the relevant login messages.
1. Give the compromised host as the first value to match.
1. Extract other relevant values (src_host, dest_host, login_user).

#### Tracing forward

We want to trace all Windows logins moving forward (+), starting from John's workstation (which may be compromised), to build a chain of events. We can use a trace operator query to produce the following results:

```
* "EventIdentifier 4624" "\nLogon Type:\t\t\t10" OR "\nLogon Type:\t\t\t2"| trace + "(?:Computer|Workstation )Name(?: = \"|:\\t)?(.+?)(?:\"|\s)" "JohnWorkstation.example.com" | extract "ComputerName = \"(?<dest_host>.+?)\"" | extract "Workstation Name:\\t(?<src_host>.+?)\s" | extract "New Logon:[\s\S]+?Account Name:\\t\\t(?<login_user>.*?)\s"
```

![](/img/reuse/query-search/trace_forward_example.png)

Trace tells us that from John's Workstation there was a login event to WIN1.example.com, from which there was a login to WIN2.example.com and then to WIN3.example.com within the same time frame. While we may not know if these login events were from the same person, it helps to determine potentially affected hosts (especially since generic usernames were used as well as an Administrator).

#### Tracing backward

We want to build a chain of events going backwards in time (-) from a compromised host, Win3.example.com, to try to determine the identity of the hacker. We want to trace all Windows logins moving backward, starting from Win3.example.com to build a chain of events. We can use a trace operator query to produce the following results:

```
* "EventIdentifier = 4624" "\nLogon Type:\t\t\t10" OR "\nLogon Type:\t\t\t3"| trace - "(?:Computer|Workstation )Name(?: = \"|:\\t)?(.+?)(?:\"|\s)" "WIN3.example.com" | extract "ComputerName = \"(?<dest_host>.+?)\"" | extract "Workstation Name:\\t(?<src host>.+?)\s" | extract "New Logon:[\s\S]+?Account Name:\\t\\t(?<login_user>.*?)\s"
```

![](/img/reuse/query-search/trace_backwards_example.png)

From these results, we can see that for WIN3.example.com there was a login event from WIN2.example.com from which there was another login event from WIN1.example.com. WIN1.example.com was logged into by John from his workstation, allowing us to identify the attacker.

</details>

---
## transpose

<details><summary><small>Similar to a Pivot Table in Excel, the <code>transpose</code> operator allows you to take a list and turn it into a table in the Aggregates tab, as shown by the examples below. You can define what data makes the rows and columns.</small></summary>

**Without transpose, the following query renders factual but not a useful table below:**

```sql
_sourceCategory=Labs/Apache/Access
| timeslice 5m
| count by _timeslice, status_code
```

![Table without transpose](/img/search/searchquerylanguage/search-operators/transpose/TableWithoutTranspose.png)

**With transpose, you can use your query to define your rows as the timeslice and the columns as the status code:**

```sql {4}
_sourceCategory=Labs/Apache/Access
| timeslice 5m
| count by _timeslice, status_code
| transpose row _timeslice column status_code
```

![Table with transpose](/img/search/searchquerylanguage/search-operators/transpose/TableWithTranpose.png)

To make this information present as a table, transpose dynamically creates columns for aggregate search results. This allows you to change the output of a query by turning search results into fields, so you can design queries without first knowing the output schema. In this way, transpose formats the data correctly for charts in Dashboard Panels. 

For example, the screenshots below represent the same data from the same time range, but the second screenshot is generated from a query using the transpose operator.

**Without transpose, the data is represented according to timeslice, but not aggregated by status code:**

![Without transpose](/img/search/searchquerylanguage/search-operators/transpose/WithoutTranspose.png)

**With transpose, the results display in an easy-to-read manner status codes by timeslice:**

![With transpose](/img/search/searchquerylanguage/search-operators/transpose/WithTranpose.png)

**Syntax**

```sql
transpose row [<row fields>] column [<column fields>] as [<output fields>]
```

```sql
transpose row [<row fields>] column [<column fields>]
```

Results can be influenced in three ways:

1. By using a comma-separated list of variable names (such as "a, b"), only the specified output fields appear in the output table.
1. By using a comma-separated list of variable names, followed by a comma and a star (such as "a, b,\*"), the specified output fields appear in the output table, followed by dynamic fields.
1. By including a single star ("\*") all dynamic fields appear in the output. Use this option when you want to add all your fields to the resulting table.
1. To reference the fields after 'transpose' you need to specify the field names as output fields.

As a reminder, if a field name contains a special character (such as -) the character must be quoted in **%""**, as in %"test-zz-1". Because column names computed from data tend to include special characters, this is especially important to keep in mind when using a transpose operator.

**Rules**

* Transpose is not supported with the [Join](#join) operator.
* Transpose supports a maximum of 300 dynamic fields (columns to be created).
* Fields are returned alphabetically.

**Example**

#### Viewing errors by module

Let's say that errors are logged by module; we'd like to view errors by each module's name. Running a query similar to:

```sql
error | parse "module=*]" asmodule| timeslice 1m
| count as value by _timeslice, module
| transpose row _timeslice column module as [moduleName1, moduleName2, ...]
```

will produce results with each module represented with a distinct color, similar to:

![Transpose_operator_errors_by_module](/img/reuse/query-search/Transpose_operator_errors_by_module.png)

Try changing the Stacking setting (under Change Properties) to **Normal** to see how graphs are affected by this option. For more information, see [Chart Search Results](/docs/search/get-started-with-search/search-basics/chart-search-results).

#### View successful logins by user

Because you can use the transpose operator without prior knowledge of the fields it will generate, you can view logins by users and organization. Running a query similar to:

```sql
_sourceCategory=service
| parse "Successful login for user '*', organization: '*'" as user, org_id
| timeslice 1d
| count _timeslice, user
| transpose row _timeslice column user
```

will produce a stacked graph similar to:

![Successful Logins](/img/search/searchquerylanguage/search-operators/transpose/SuccessfulLogins.png)

#### View web server status codes

Let's return to the query with the Apache web server status codes, but status_code is a pre-parsed field.

```sql
_sourceCategory=Apache/Access
| timeslice 1m
| count by _timeslice, status_code
| transpose row _timeslice column status_code
```

Results are initially returned in the **Aggregates** tab in the form that we want.

![Webserver StatusCode](/img/search/searchquerylanguage/search-operators/transpose/WebserverStatusCode.png)

Then you can select the **Column** chart button, and under **Change Properties**, set the **Stacking** setting to **Normal** to create a stacked column chart.

![Status Codes Stacked Graph](/img/search/searchquerylanguage/search-operators/transpose/Status-Code-stacked-graph.png)

For information on handling null fields, see [isNull](#isNull) operator.

#### Order transposed results

Continuing from the previous example, you can influence the results by specifying the variable names, see [Syntax](#transpose) for details. You need to know the variable names returned from the transpose operation if you want to order them. In this example, if you know you will get 200, 400, and 500 status codes returned in your results you'd order them by specifying the variable names in the order you want, like this:

```sql {4}
_sourceCategory=Apache/Access
| timeslice 1m
| count by _timeslice, status_code
| transpose row _timeslice column status_code as %"200", %"400", %"500"
```

</details>

---
## trim

<details><summary><small>The <code>trim</code> operator eliminates leading and trailing spaces from a string field.</small></summary>

**Syntax**

```sql
trim(<field>) as <field>
```

```sql
trim(" <string expression> ") as <field>
```

**Example**

Take the string value " Hello World  ". To remove the leading and trailing spaces you'd do the following:

```sql
| trim(" Hello World  ") as greeting
```

This would return a field named greeting with a new value of "Hello World".

</details>

---
## urldecode

<details><summary><small>The <code>urldecode</code> operator decodes a URL you include in a query, returning the decoded (unescaped) URL string.</small></summary>

For example, a URL that looks like this:

```
http%3A%2F%2Fyourmainserver-city55555.org%2Ffunctions%2Fmain.php%3Fgk%3DGk45MgHJhEYx8bPYvGfiWS7o3KLdfg90%26
```

can be decoded to:

```
http://yourmainserver-city55555.org/functions/main.php?gk=Gk45MgHJhEYx8bPYvGfiWS7o3KLdfg90&
```

**Syntax**

```sql
urldecode(<url_field>) [as <field>]
```

```sql
urldecode("<url string>") as <field>
```

**Example**

Let's say you'd like to decode URLs connecting to your firewall. Running a query like:

```sql
http:
| parse "Connecting to firewall at URL: *" as url
| urldecode(url) as decoded
```

returns results of each URL, both in the encoded and decoded state, allowing you to run additional queries on the parsed, decoded URLs.

</details>

---
## urlencode

<details><summary><small>The <code>urlencode</code> operator encodes the URL into an ASCII character set. This is the standard format in which URLs can be sent over the internet.</small></summary>

For example, if your URL looks like this:

```
http://yourmainserver-city55555.org/functions/main.php?gk=Gk45MgHJhEYx8bPYvGfiWS7o3KLdfg90&
```

It will be encoded to:

```
http%3A%2F%2Fyourmainserver-city55555.org%2Ffunctions%2Fmain.php%3Fgk%3DGk45MgHJhEYx8bPYvGfiWS7o3KLdfg90%26
```

**Syntax**

```sql
urlencode(<url_field>) [as <field>]
```

```sql
urlencode("<url string>") as <field>
```

**Example**

To encode a URL in your PagerDuty logs, you can run this query:

```sql
_sourceCategory=pagerduty
| kv "html_url" as url
| urlencode(url) as url
```

The query returns the field `url` encoded:

![urlencode.png](/img/search/searchquerylanguage/search-operators/urlencode.png)

</details>

---
## where

<details><summary><small>The <code>where</code> operator allows you to filter results based on a boolean expression.</small></summary>

For example, using **where** with the boolean operator [isValidIP](#isvalidip-isvalidipv4-isvalidipv6):

* Filters as true and returns results:

    ```sql
    | where isValidIP("192.168.0.10")
    ```

* Filters as false and will not return results:

    ```sql
    | where !isValidIP("192.168.0.10")
    ```


The **where** operator must appear as a separate operator distinct from other operators, delimited by the pipe symbol ("\|"). In other words, the following construct will not work and will generate a syntax error:

This query will NOT work:

```sql
...| parse "seconds=*;" as time where > 5
```

Instead, separate the **where** operator from the preceding **parse** operator like this:

`...| parse "seconds=*;" as time  | where time\> 5`

**Syntax**

```sql
... | where <boolean expression> | ...
```

**Rules**

* The pipe delimiter is required to separate the **where** operator as a distinct query operator.
* The **where** operator *can't* be used inline as a query clause, like ".`.. | extract a where b==something |...`"
* Multiple **where** operators are processed in the order they are specified, with each subsequent **where **operator further filtering results.
* [Keyword expressions](docs/search/get-started-with-search/build-search/keyword-search-expressions.md) can be used in the boolean expression, such as OR and AND.
* If defining a [built-in metadata field](/docs/search/get-started-with-search/search-basics/built-in-metadata) value in the boolean expression you need to quote the value. If it is not wrapped in quotes the value is interpreted as a field name.
* If you're using [**in**](#in-operator) or **not in** to match integers, [cast "x" to a number first](#casting-data-to-a-number-or-string).
* The [matches](#matches) operator can be used in the boolean expression. You can use an [RE2 compliant](https://github.com/google/re2/wiki/Syntax) regular expression or use asterisks `*` as wildcards.
* Any operator that returns a boolean value can be used in the boolean expression. Such as [compareCIDRPrefix](#CIDR), [contains](#contains), [in](#in-operator), [isBlank, isEmpty, isNull](#isnull-isempty-isblank), [isNumeric](#isNumeric), [isPrivateIP](#isPrivateIP), [isPublicIP](#isPublicIP), [isValidIP](#isvalidip-isvalidipv4-isvalidipv6), and [math expressions](/docs/search/search-query-language/math-expressions).

:::note
Use [comparison operators](docs/search/search-query-language/field-expressions.md) to produce boolean values.
:::

**Example**

```sql
... | where a<b
```

```sql
... | where a=x
```

```sql
... | where a>=x
```

```sql
... | where a<=x
```

```sql
... | where a<x
```

```sql
... | where x<10
```

```sql
... | where (x >=10 and x <=20)
```

```sql
... | where x="some string"
```

```sql
... | where _sourceCategory="xyz"
```

```sql
... | where error="fail*"
```

```sql
... | where user<>"root"
```

```sql
... | where x matches "some string"
```

```sql
... | where x matches "fail*"
```

```sql
... | where x matches /regex/
```

```sql
... | where !(x matches /regex/)
```

```sql
... | num(x) | where x in (4, 3, 5)
```

```sql
... | where x in ("error", "fail")
```

```sql
... | where x not in ("error", "fail")
```

```sql
... | where x matches "Android" or x matches "iPhone" or x matches "iPad"
```

#### Using the "not" option

If you need a query using the **where** operator, where xxx DOES NOT match yyy, use "!" followed by the **matches** operator enclosed in parenthesis.

For example:

```sql
...| where !(<field xxx> matches "<value yyy>") | ...
```

or:

```sql
...| where !(status matches "200")
```

#### Use where to check for null values

For details, see [isNull](#isNull) operator.

</details>
