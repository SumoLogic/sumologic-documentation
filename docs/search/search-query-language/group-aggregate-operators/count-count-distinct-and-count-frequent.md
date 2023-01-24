---
id: count-count-distinct-and-count-frequent
title: count, count_distinct, count_frequent Operators
sidebar_label: count, count_distinct, count_frequent
---


Aggregating (group-by) functions are used in conjunction with the group operator and a field name.

Only the word **by** is required to represent the group operator. The count function is also an operator in its own right, and therefore can be used with or without the word **by**.

## count

Counts the total number of logs that match the keyword search within the time range analyzed.

### Syntax

```sql
count[(<field>)] [as <field>] [by <field>, ...]
```

### Rules

* Default alias field is named `_count`
* The entire [_raw](/docs/search/get-started-with-search/search-basics/built-in-metadata) message is counted when no field to count is provided.

### Examples

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

When you want to count more than one field, you must create an alias using the [as operator](/docs/search/search-query-language/search-operators/as) to rename the `_count` fields.

## count_distinct

Counts only distinct occurrences of the value of a field being counted within the time range analyzed.

An empty value still counts as a unique value and will be counted.

### Syntax

```sql
count_distinct(<field>) [as <field>] [by <field>, ...]
```

### Rules

* Creates field named `_count_distinct`

### Examples

```sql
| count_distinct(username) group by hostname
```

```sql
_sourceCategory=*apache*
| parse "* -" as src_ip
| count_distinct(src_ip)
```

By default, ordering is not defined inside of groups created using a group-by expression. To order your results, use the [`sort`](/docs/search/search-query-language/search-operators/sort) operator.

If the number of distinct items returned is less than 100, the `count_distinct` function provides an exact number. If the number of distinct items returned is larger than 100, `count_distinct` instead uses an approximate algorithm, and displays a message that explains: `count_distinct saw more than 100 values, results may be approximate`

The approximation algorithm uses a relative error parameter of 2%, for example:

* 65% of the time, results are within +/- 2%.
* 95% of the time, results are within +/- 4%.
* 99% of the time, results are within +/- 6%.

So for example, if the true count of distinct items is 1,000, the result returned by the approximation algorithm is between 950 and 1050 about 95% of the time.

The error parameter value is important to making the `count_distinct` function return results quickly and in a scalable way.

Also, note that when you want to count the distinct occurrences of more than one field, you must create an alias using the [as operator](/docs/search/search-query-language/search-operators/as) to rename the _count_distinct fields. See this example:

```sql
_sourceCategory=PaloAltoNetworks
| count_distinct(threatid) as cntthreatid, count_distinct(repeatcnt) as cntrepeatcnt
```

## count_frequent

The count_frequent function can be used in cases where you want to identify the most common values for aggregations with over 10,000 distinct groups. This query returns the highest-count 10,000 results in sorted order. The resulting count field is called `_approxcount` because it is only an *estimate* of the true count; the estimate may be incorrect, but can only be over (it will never be under).

The count_frequent function is followed immediately by one or more field names.

You can use the count_frequent operator in Dashboard queries, but the number of results returned is limited to the top 100 most frequent results. All results are available when the search is run on the **Search** page, but only the top 100 are displayed in the Panel.

### Syntax

```sql
count_frequent <field>[, <field2>, field3, ...]
```

### Rules

* Creates field named `_approxcount`
* Cannot be used with other aggregating functions like `sum` or `avg`.
* Sort is built into the query and defaults to a most-to-least order.

### Example

```sql
* | parse "srcIP=*, url=*" as srcIP, url 
| count_frequent srcIP, url
```
