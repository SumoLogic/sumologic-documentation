---
id: fillmissing
title: fillmissing Search Operator
sidebar_label: fillmissing
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `fillmissing` operator allows you to specify groups that should be represented in data output. When you run a standard <a href="/docs/search/search-query-language/group-aggregate-operators">group-by</a> query, Sumo Logic only returns non-empty groups in the results. For example, if your query is grouping by timeslice, then only the timeslices that have data are returned.

This can be a problem because:

* The lack of data is sometimes also an interesting event, but there is no easy way to capture this information. For example, the [outlier](outlier.md) operator can't catch anomalies arising from missing data because it can only mark an existing timeslice as anomalous.
* Missing data can lead to misleading visualizations. For example, if you plot a line chart across timeslices with missing data, the chart will interpolate across the missing timeslices and represent them deceptively as nonempty.

The `fillmissing` operator addresses this shortcoming by allowing you to specify groups that should be represented in the output, even if those groups have no data.

## How it works

The `fillmissing` operator allows you to define generators over the fields in the output. Each generator applies to one field and enumerates all the values that you'd like to appear in the output for that field, even if some of those values are not present in the data.

You can define multiple generators, which enumerate tuples for every combination of the values enumerated by each of the generators (such as the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product)). For example, if you used the following query:

```sql
| fillmissing values("a1", "a2") in A,
              values("b1") in B,
              values("c1", "c2", "c3") in C
```

The generators for the three fields (A, B, and C) enumerate the tuples:

| A | B | C |
|:--|:--|:--|
| a1 | b1 | c1 |
| a1 | b1 | c2 |
| a1 | b1 | c3 |
| a2 | b1 | c1 |
| a2 | b1 | c2 |
| a2 | b1 | c3 |

Fields with generators defined are called **key fields**. The remaining fields are called **non-key fields**.

Given the list of generators, `fillmissing` ensures that every tuple enumerated by the generators is present in the output. In particular, when one of the enumerated tuples is missing, `fillmissing` will append a record to the output with the missing values for the key fields and some constant default value for the non-key fields.

### Generators

The `fillmissing` operator supports the following types of generators:

* **Timeslice**. Enumerates all the timeslices with a given granularity in a query time range. For example, `timeslice(15m)` enumerates all the 15-minute timeslices in the query time range.

  :::note
  Buckets need to be based on a time period.
  :::

* **Values**. Enumerates the fixed set of values given in arguments. For example, `values("a", "b", "c")` enumerates the values "a", "b", and "c". Currently, only string literals are supported for the arguments.

### Default values for non-key fields

When `fillmissing` appends a record to the output, the key fields of the record contain the missing values, while the remaining fields contain some constant value. You can configure the constant value for those fields. If you don't, a default value is assigned that depends on the type of the field:

| Field Type | Default Value |
|:--|:--|
| integer | 0 |
| double | 0.0 |
| boolean | false |
| String (or other) | null |

:::important
The fillmissing operator allows generators to enumerate up to 10,000 combinations of values; the same limit as group-by operators. If the limit is exceeded, extra values are omitted. The operator will issue a warning when this happens.
:::

## Syntax

This section describes the syntax for the `fillmissing` operator.

```sql
fillmissing <keyFieldGenerator> [, <keyFieldGenerator> ]  [ with <nonKeyFieldSpecs> ] [ takeLast ]
```

* The `keyFieldGenerator` generates key fields that the operator then references to ensure all specified combinations of values are present. Any missing values are filled based on the specified `nonKeyFieldSpecs`, one for each key field. Two generators are supported:

| Generator | Syntax |
| :-- | :-- |
| Timeslice | `timeslice[(<integer><time_period>)] [in <field>]`<br/><br/>If no time period is specified, the same time period from the previous timeslice operator is used. |
| Values | `values("<value1>", "<value2>", ...) in <field>`<br/>or<br/>`values all in <field>`<br/><br/>The all option uses all the distinct values for the field from the query results. |

* The `nonKeyFieldSpecs` are optional. They allow you to configure the default constant values for one or more non-key fields. The syntax for each specification looks like:

  * Constant Value (`<constantValue>`): `<double> | <int> | <stringLiteral> | null`
  * Constant non key: `<constantValue> for <field>`

* Use the `takeLast` option to fill in values for non-key fields by taking the value from the previous timeslice. This requires the `timeslice` generator be defined.

## Rules

* In Live Dashboards, you must use the `fillmissing` operator after an aggregate operator.
* Buckets from the timeslice generator need to be based on a time period. Supported `<time_period>` values are weeks `(w)`, days `(d)`, hours `(h)`, minutes `(m)`, and seconds `(s)`.

## Examples

### Timeslice generator

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

### Value generator

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

### All option

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

### Multiple generators and transpose

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

### Takelast option

```sql
_sourceCategory="asthana_json_test" and _collector="Asthana-Test"
| timeslice 1m
| count by _timeslice, sweets
| fillmissing timeslice, values all in sweets takelast
| transpose row _timeslice column sweets
```

This query provides the following results:

![takeLast with transpose.png](/img/search/searchquerylanguage/search-operators/takeLast-with-transpose.png)
