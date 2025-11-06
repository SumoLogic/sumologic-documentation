---
id: rollingstd
title: rollingstd Search Operator
sidebar_label: rollingstd
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The `rollingstd` operator finds the rolling standard deviation of a field, allowing you to identify changes over time.

For example, you'd use `rollingstd` in a query to identify spikes in activity for a Collector, or for a URL in your site. You can use a `rollingstd` to find compute the average number from the past, to identify changes (larger or smaller) over time.

Two or more data points are needed to get accurate results from a `rollingstd` operator. If you attempt to find the `rollingstd` of a single data point the results will automatically be zero.

If you specify a window length of 5, but only 4 data points are available, the `rollingstd` operator takes the average of whatever is available.

## Syntax

```sql
rollingstd <field> [, window_length] [as <field>]
```

## Rules

* An alias for `rollingstd` is optional. When an alias is not provided, **`_rollingstd`** is the default alias.
* Specified fields must contain numeric values.
* To add a query that includes a `rollingstd` operator to a Dashboard, you must add a group by function **before** the `rollingstd` operator.
* The default window length is 10.
* The maximum window length is 1000.

## Examples

**Use rollingstd to see the difference of fields between time points, grouped by source host**

Running a query such as:

```sql
_sourceCategory=katta
| timeslice by 1m
| count by _timeslice,_sourceHost
| sort + _timeslice
| rollingstd _count,1 by _sourceHost
```

produces results like:

<img src={useBaseUrl('img/reuse/query-search/rollingstd_new.png')} alt="rollingstd" style={{border: '1px solid gray'}} width="400" />

### Find the rolling standard deviation of a field between time points

Using `rollingstd` with `timeslice`, you can run a query similar to:

```sql
* | parse "bytes: '*'" as bytes
| timeslice 1m
| sum(bytes) as bytes by _timeslice
| sort _timeslice
| rollingstd bytes, 5
```

that produces results like:

<img src={useBaseUrl('img/reuse/query-search/rollingstd_example.png')} alt="Example 1" style={{border: '1px solid gray'}} width="400" />

The aggregation table can be made into an area chart, like this:

<img src={useBaseUrl('img/reuse/query-search/rollingstd_example2.png')} alt="Example 2" style={{border: '1px solid gray'}} width="800" />

### Specify a window length of 5, but only 4 data points are available

Before 5 values are available, the `rollingstd` operator takes an average
of whatever is available. For example:

```sql
_sourceCategory=katta
| timeslice by 1m
| count by _timeslice,_sourceHost
| where _sourceHost="prod-katta-237"
| sort + _timeslice
| rollingstd _count,5
```

which produces results like:

<img src={useBaseUrl('img/reuse/query-search/rollingstd_new_data_points.png')} alt="Data points" style={{border: '1px solid gray'}} width="400" />

`rollingstd` is also used with the [backshift](backshift.md) operator.
