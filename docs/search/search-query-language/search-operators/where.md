---
id: where
---

# where

Use the **where** operator to filter results based on a boolean expression. For example, using **where** with the boolean operator [isValidIP](isValidIP.md):

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

## Syntax

```sql
... | where <boolean expression> | ...
```

## Rules

* The pipe delimiter is required to separate the **where** operator as a distinct query operator.
* The **where** operator *can't* be used inline as a query clause, like ".`.. | extract a where b==something |...`"
* Multiple **where** operators are processed in the order they are specified, with each subsequent **where **operator further filtering results.
* [Keyword expressions](../../get-started-with-search/build-search/keyword-search-expressions.md) can be used in the boolean expression, such as OR and AND.
* If defining a [built-in metadata field](../../get-started-with-search/search-basics/built-in-metadata.md) value in the boolean expression you need to quote the value. If it is not wrapped in quotes the value is interpreted as a field name.
* If you're using [**in**](in-operator.md) or **not in** to match integers, [cast "x" to a number first](Manually-Casting-String-Data-to-a-Number.md).
* The [matches](matches.md "matches") operator can be used in the boolean expression. You can use an [RE2 compliant](https://github.com/google/re2/wiki/Syntax) regular expression or use asterisks `*` as wildcards.
* Any operator that returns a boolean value can be used in the boolean expression. Such as [compareCIDRPrefix](CIDR.md "CIDR"), [contains](contains.md), [in](in-operator.md), [isBlank, isEmpty, isNull](isNull.md "isNull, isEmpty, isBlank"),  [isNumeric](isNumeric.md), [isPrivateIP](isPrivateIP.md), [isPublicIP](isPublicIP.md), [isValidIP](isValidIP.md), and [math expressions](/docs/search/search-query-language/math-expressions).

:::note
Use [comparison operators](../field-expressions.md) to produce boolean values.
:::

## Examples

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

### Using the "not" option

If you need a query using the **where** operator, where xxx DOES NOT match yyy, use "!" followed by the **matches** operator enclosed in parenthesis.

For example:

```sql
...| where !(<field xxx> matches "<value yyy>") | ...
```

or:

```sql
...| where !(status matches "200")
```

### Use where to check for null values

For details, see [isNull](isNull.md) operator.
