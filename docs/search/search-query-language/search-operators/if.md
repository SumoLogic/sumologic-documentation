---
id: if
title: if and ? Search Operator
sidebar_label: if, ?
---

There are two forms of ternary expression you can use in Sumo Logic queries: one is constructed using the `if` operator, and the other uses the question mark (`?`) operator. The syntax varies slightly, but the results are equivalent. You can use the syntax you are most comfortable with.

These expressions are used to evaluate a condition as either true or false, with values assigned for each outcome. It is a shorthand way to express an if-else condition. On the basis of the test, the entire expression returns `value_if_true` if the condition is `true`, else `value_if_false` if the condition is `false`. The two sub-expressions (`value_if_true` and `value_if_false`) must have the same type.

## Syntax

```sql
if(<condition>, <value_if_true>, <value_if_false>) as <field>
```

## Examples

```sql
| if(status_code matches "5*", 1, 0) as serverError
```

```sql
| if(status_code matches "2*", 1, 0) as success
```

```sql
if(!(status_code matches "2*"), 1, 0) as failure
```

```sql
| if(status matches "WARN" or status matches "ERROR", 1, 0) as status
```

```sql
| if(alpha > 1 and beta > 5, "true", "false") as conditionState
```

### Nested if statement (if...elseif...else)

To create **nested** if statements, your query should use the following
syntax:  

```sql
| if(message matches "*/schedule?*","Alert Scheduled",
if(message matches "*/update?*","Alert Updated",
if(message matches "*/cancel?*","Alert Canceled","N/A"))) as problem
```

### Question mark (?) syntax

```sql
<condition> ? <value_if_true> : <value_if_false> as <field>
```

## Examples

```sql
| disk_usage > threshold ? "disk full" : "OK" as status
```

```sql
| !(disk_usage > threshold) ? "disk full" : "OK" as status
```

```sql
| a < b ? a : b as this_or_that     // This is the same as min(a, b)
```

For information on handling null values, see [isNull](/docs/search/search-query-language/search-operators/isnull-isempty-isblank#isnullstring) operator.
