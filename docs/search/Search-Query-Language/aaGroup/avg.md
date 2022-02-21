---
id: avg
---

# avg

The averaging function (avg) calculates the average value of the
numerical field being evaluated within the time range analyzed.

### Syntax

-   `avg\<numerical_fiel\>) [as\<fiel\>] [by\<fiel\>]`

### Rules

-   Creates field named **\_avg**

### Example

`... | avg(request_received) group by hour`

Sample log message:

    Aug 2 04:06:08 : host=10.1.1.124: local/ssl2 notice mcpd[3772]: filesize=20454: diskutilization=0.4 : 01070638:5: Pool member 172.31.51.22:0 monitor status down.

Example based on sample log message above:

`disk* | parse "diskutilization=*" as disk | avg(disk) group by _sourceCategory | sort by _avg`

This query finds all messages that contain the term **disk\*** and
parses out all that have a **diskutilization= value**. It then extracts
the value of diskutilization into field **disk**. The next statement
finds the average disk utilization by category. Effectively, it gives
you a picture of how your hosts are doing on average based on the
categorization of log sources you’ve chosen.

Note that when you calculate the average of more than one field, you
must create an alias using the [as
operator](../Search-Operators/as-operator.md) to rename the average
fields. See this example:

`_sourceCategory="OS/Windows" | kv "HandleCount", "ThreadCount" | avg(HandleCount) as avgHandleCount, avg(ThreadCount) as avgThreadCount`
