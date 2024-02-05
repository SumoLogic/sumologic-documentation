---
id: where
title: where Search Operator
sidebar_label: where
---

The `where` operator allows you to filter results based on a boolean expression.

For example, using `where` with the boolean operator [`isValidIP`](/docs/search/search-query-language/search-operators/isvalidip/#isvalidip):

* Filters as true and returns results:
    ```sql
    | where isValidIP("192.168.0.10")
    ```
* Filters as false and will not return results:
    ```sql
    | where !isValidIP("192.168.0.10")
    ```

The `where` operator must appear as a separate operator distinct from other operators, delimited by the pipe symbol (`|`). In other words, the following construct will not work and will generate a syntax error:

This query will NOT work:

```sql
...| parse "seconds=*;" as time where > 5
```

Instead, separate the `where` operator from the preceding `parse` operator like this:

```sql
...| parse "seconds=*;" as time  | where time > 5
```
## Syntax

```sql
... | where <boolean expression> | ...
```

## Rules

* The pipe delimiter is required to separate the `where` operator as a distinct query operator.
* The `where` operator *can't* be used inline as a query clause, like ".`.. | extract a where b==something |...`"
* You must use the `matches` syntax with the `where` operator when using wildcards `*`.
* Multiple `where` operators are processed in the order they are specified, with each subsequent `where` operator further filtering results.
* [Keyword expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md) can be used in the boolean expression, such as OR and AND.
* If defining a [built-in metadata field](/docs/search/get-started-with-search/search-basics/built-in-metadata) value in the boolean expression you need to quote the value. If it is not wrapped in quotes the value is interpreted as a field name.
* If you're using [`in`](in.md) or **not in** to match integers, [cast "x" to a number first](/docs/search/search-query-language/search-operators/manually-cast-data-string-number).
* The [`matches`](matches.md) operator can be used in the boolean expression. You can use an [RE2 compliant](https://github.com/google/re2/wiki/Syntax) regular expression or use asterisks `*` as wildcards.
* Any operator that returns a boolean value can be used in the boolean expression, such as [compareCIDRPrefix](cidr.md), [`contains`](contains.md), [`in`](in.md), [`isBlank`, `isEmpty`, `isNull`](/docs/search/search-query-language/search-operators/isnull-isempty-isblank), [`isNumeric`](/docs/search/search-query-language/search-operators/isnumeric), [`isPrivateIP`](/docs/search/search-query-language/search-operators/isprivateip), [`isPublicIP`](ispublicip.md), [`isValidIP`](/docs/search/search-query-language/search-operators/isvalidip/#isvalidip), and [math expressions](/docs/search/search-query-language/math-expressions).

:::note
Use [comparison operators](/docs/search/search-query-language/field-expressions.md) to produce boolean values.
:::

## Example

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

If you need a query using the `where` operator, where xxx DOES NOT match yyy, use "!" followed by the `matches` operator enclosed in parenthesis.

For example:

```sql
...| where !(<field xxx> matches "<value yyy>") | ...
```

or:

```sql
...| where !(status matches "200")
```

#### Use where to check for null values

For details, see the [`isNull`](/docs/search/search-query-language/search-operators/isnull-isempty-isblank#isnullstring) operator.
