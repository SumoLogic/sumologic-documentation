---
id: diff
title: diff Search Operator
sidebar_label: diff
---

The `diff` operator calculates the rate of change in a field between consecutive rows. To produce results, `diff` requires that a specified field contain numeric data; any non-numerical values are removed from the search results.

Diff does not sort data but instead operates on rows in the order that they appear in the input stream, subtracting the number in a field from the number in the same field in the previous line.

The first line of results will never display diff results.

Adding a group by function to a diff operator query calculates the difference between consecutive values in each group. (Data from each group are calculated separately.) Grouping does not affect the order in which rows appear in the output stream.

## Syntax

* `diff <field> [as <field>] [by <field1>, <field2>, ...]`

## Rules

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

## Examples

Using `diff` to calculate the difference of a quantity between time
points.

Using `diff` with `timeslice`, you can run a query similar to:

```sql
* | parse "bytes transmitted: '*'" as bytes | timeslice 1m | sum(bytes) as bytes by _timeslice | sort _timeslice | diff bytes as diff_bytes
```

to produce results similar to:

![diffoperator.png](/img/search/searchquerylanguage/search-operators/diffoperator.png)

Note that there is no value for diff_bytes in line 1, as expected.

**Using multiple diff operators.** Multiple diff operators can be
included in a single query. For example, to calculate the diff of bytes
and compressed bytes:

```sql
* | parse "data: '*'" as Bytes  | diff Bytes as b  | parse "compress: '*'" as Compressed  | diff Compressed as c
```

**Adding a diff operator query to a Dashboard.** To add a query that
includes a **diff** operator, make sure to structure your query similar
to:

```sql
* | parse "encoded: '*'" as e  | parse "compressed: '*'" as c  | count by e,c  | diff e as d
```

If your query isn't compatible with a Dashboard, an error message
appears when you attempt to add it.
