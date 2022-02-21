---
id: aagroup
---

# Group or Aggregate Operators

Aggregating functions evaluate messages and place them into groups.
The group operator is used in conjunction with group-by functions.

Only search results that have been aggregated using a group or aggregate
operator can be placed on a dashboard panel. See [Chart Search
Results](../Get-Started-with-Search/Search-Basics/Chart-Search-Results.md "https://help.sumologic.com/Search/Get_Started_with_Search/Search_Basics/Chart_Search_Results")
for information about charting.

When using any grouping function, the word **by** is sufficient for
representing the group operator. The typical construction when using
group-by functions is:

`grouping_function by\<`**`fieldnam\>`**

Aggregating (group-by) functions include:

-   [avg](aaGroup/avg.md "https://help.sumologic.com/Search/Search-Query-Language/aaGroup/avg")
-   [count, count_distinct, and
    count_frequent](aaGroup/count,-count-distinct,-and-count-frequent.md "count, count_distinct, and count_frequent")
-   [first and last](aaGroup/first-and-last.md "first and last")
-   [min and max](aaGroup/min-and-max.md "min and max")
-   [most_recent and
    least_recent](aaGroup/most-recent-and-least-recent.md "most_recent and least_recent")
-   [pct](aaGroup/percentile-(pct).md "percentile (pct)")
-   [stddev](aaGroup/standard-deviation.md "stddev")
-   [sum](aaGroup/sum.md "sum")
-   [values](aaGroup/values.md "values")

The ****withtime****, ****most_recent****,
and ****least_recent**** operators are not considered standalone
operators; they are designed to only be used as an alternative to
the [first and last
operators](aaGroup/first-and-last.md "first and last") in Live
Dashboards or any continuous query where first and last are not
supported.

By default, the ordering is not defined inside of groups created using a
group-by expression. To order your results,
use the [**sort**](Search-Operators/sort.md "sort") operator.

### Syntax

-   `... | group_by_function\<field_to_operate_o\> group by\<field_to_group_b\>[,\<field\>, ...]`

You can use **by** instead of **group by** so `count group by user` is
equivalent to `count by user`.

### Rules

-   Can not be used with
    the** **[LogReduce](../LogReduce/01-LogReduce-Operator.md "LogReduce Operator") operator.
-   When [parsing and naming (aliasing)
    fields](01-Parse-Operators/Parse-field-option.md "Parse field"),
    avoid using the names of grouping functions or other operators as
    field names.
-   When using **count**, or any grouping function, remember to include
    the underscore before the field name (sort by **\_count**).
-   Multiple **aggregation** functions can be on the same line but
    you can't include another function, such as a math function, on the
    same line of a query.

For example, you can't use:

`... | avg(x + y) as average, sum(x+y) as total `

You would need to do that in two separate steps, such as:

`... | x + y as z | avg(z) as average, sum(z) as total`

In another example, you can't use:

`avg(abs_latency)/1000/60 as avg_latency_min`

Instead, you would need to use two separate lines:

`avg(abs_latency_ms) as avg_latency_ms | avg_latency_ms / 1000 / 60 as avg_latency_min`

### Examples

###### Sort by \_count and limit to 10 results

`* | parse "GET * " as url  | count by url  | sort by _count  | limit 10`

###### Count by user

`status AND down  | parse regex "user=(\<use\>.*?)" | parse regex "host=(\<msg_hos\>.*?)" | count by user`

###### Count by the Source IP address

`_sourceCategory=apache  | parse "* " as src_ip | parse "GET *" as url | count by src_ip | sort by _count`

###### Group by multiple fields

`| count(field1), avg(field2) group by field1, _timeslice`

###### Use multiple aggregate operators

`    | max(amount) as amount_max, count(datetime) as datetime_count, sum(_size) as messages_size_sum, last(query) as last_query`

All Sumo Logic system-generated fields begin with an underscore ( "\_").
Group-by functions always create a Sumo Logic field named with a
combination of an underscore (\_) and the function name. Using the
function **count** inserts a field into the pipeline called **\_count**.
The function **count_distinct** inserts a field into the pipeline
called **\_count_distinct**.
