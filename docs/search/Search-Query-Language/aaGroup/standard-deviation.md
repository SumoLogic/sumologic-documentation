---
id: standard-deviation
---

# standard deviation

Finds the standard deviation value for a distribution of numerical
values within the time range analyzed and associated with a group
designated by the "group by" field.

### Syntax

* `stddev\<numerical_fiel\>) [as\<fiel\>] [by\<fiel\>]`

### Rules

* Creates field named `_stddev`

### Example

You can use the query below to view the standard deviation of time
delay, along with the average of time delay, max delay, and the min
delay for a Source. You can use this query to troubleshoot large message
time and receipt time discrepancies.

`_source=CollectD | abs(_receipttime - _messagetime) as delt | delt/1000/60 as delt | min(delt), max(delt), avg(delt), stddev(delt), count(*) by _collector, _sourcename`

``

Note that when you calculate the standard deviation of more than one
field, you must create an alias using the [as
operator](../Search-Operators/as-operator.md) to rename the stddev
fields. See this example:

`_sourceCategory="OS/Windows" | kv "HandleCount", "ThreadCount" | stddev(HandleCount) as stddevHandleCount, stddev(ThreadCount) as stddevThreadCount`
