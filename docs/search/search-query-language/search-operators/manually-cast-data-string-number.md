---
id: manually-cast-data-string-number
title: Casting Data to a Number or String
sidebar_label: Manually cast data to string or number
---

Most data in Sumo Logic is stored as a string data type. Metadata fields are stored as string data and parsed fields are by default parsed as string type data. Sumo Logic will implicitly cast string data to a number type assuming it is clear that you need a number to perform an action, such as a math calculation or when using a function like sum or avg. However, if there is any ambiguity about whether a number is required, the data remains string data.

## Syntax

This detail can be important when you are building queries. There are at least two cases where you will need to manually cast string data to a number so that you get the results that you expect:

* When using the **where** operator to match integers like this:
    * **where** value **in** (integer_value1, integer_value2, integer_value3)
    * **where** value **not in** (integer_value1, integer_value2, integer_value3)
* When you need to numerically sort a series of results from a query, like in this example:
  ```sql
  * | parse "took *ms" as duration | toLong(duration) | sort by duration
  ```

In the first case, if your statement looks something like "where some_value in (1, 2, 4, 16)" and you need to match (or not match) integers, then you will first need to cast "some_value" to a number.

In the second case, the results will sort out of order as text values if you don't first cast the field "duration" to a number. After the field is cast to a number type, the sort order will produce expected results.

Sumo Logic accepts these functions for casting string data to a number:

* `num()` or `number()`
* `toLong()`

You can use the function `toString()` to cast data to a string.

## Example

When casting a field, remember to separate the casting statement with a pipe, like this:

```sql
* | parse "OSload *ms" as boot_time | number(boot_time)
```
