---
id: num
title: num Search Operator
sidebar_label: num
---

The `num` operator converts a field to a double value (64-bit IEEE 754 double-precision floating-point number), which is twice as accurate as a float value (32-bit IEEE 754 single-precision floating-point number). Using `num` in a query can be useful for sorting results by number instead of alphabetically, which is the default.


## Syntax

```sql
num(<field>) [as <field>]
```

## Rules

* The value of the field must be a negative/positive integer or a real number. For example, 500, 123234820932, or 352.748.

## Example

Use this query to use num to search for Scheduled Searches, and sort them by the time it took each search to execute in seconds. Without the conversion, the results would be sorted in alphabetical order.

```sql
_sourceCategory=concierge completed execution
| parse "Execution duration: * s" as duration
| num(duration) | sort by duration
```

This query produces results like this:

![numoperator.png](/img/search/searchquerylanguage/search-operators/numoperator.png)
