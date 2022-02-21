---
id: sum
---

# sum

Sum adds the values of the numerical field being evaluated within the
time range analyzed.

### Syntax

-   `sum\<numerical_fiel\>) [as\<fiel\>] [by\<fiel\>]`

### Rules

-   Creates field named**` `**`_sum`

### Example

`... | sum(bytes_received) group by hostname`

Sample log message:

    Aug 2 04:06:08 : host=10.1.1.124: local/ssl2 notice mcpd[3772]: filesize=20454: diskutilization=0.4 : 01070638:5: Pool member 172.31.51.22:0 monitor status down.

Example based on sample log message above:

`file*| parse "filesize=*" as filesize  | sum (filesize) group _sourceHost`

Finds all messages that contain term **file\*** and parses out all that
have a **filesize=value**. It will then extract the value of filesize
and will add all those values per host where those log messages are
generated.

Note that when you calculate the sum of more than one field, you must
create an alias using the [as
operator](../Search-Operators/as-operator.md) to rename the sum fields.
See this example:

`_sourceCategory="OS/Windows" | kv "HandleCount", "ThreadCount" | sum(HandleCount) as sumHandleCount, sum(ThreadCount) as sumThreadCount`

You can use multiple aggregation operators on the same line of a query.
For example:

`max(amount) as amount_max, count(datetime) as datetime_count, sum(_size) as messages_size_sum, last(query) as last_query`
