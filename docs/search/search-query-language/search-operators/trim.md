---
id: trim
title: trim Search Operator
sidebar_label: trim
---

The `trim` operator eliminates leading and trailing spaces from a string field.

## Syntax

```sql
trim(<field>) as <field>
```

```sql
trim(" <string expression> ") as <field>
```

## Example

Take the string value " Hello World  ". To remove the leading and trailing spaces you'd do the following:

```sql
| trim(" Hello World  ") as greeting
```

This would return a field named greeting with a new value of "Hello World".
