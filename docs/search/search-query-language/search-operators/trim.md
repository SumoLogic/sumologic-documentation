---
id: trim
title: trim Search Operator
sidebar_label: trim
description: Use the `trim` operator to eliminate leading and trailing spaces from string fields. Cleans up string data with unwanted whitespace, normalizes field values for accurate matching, and prepares data for comparison or aggregation. Useful for data cleanup, standardizing user input, and ensuring consistent string formatting.
---

The `trim` operator eliminates leading and trailing spaces from a string field.

## Syntax

`trim(<field>) as <field>`

`trim(" <string expression> ") as <field>`

## Example

Take the string value " Hello World  ". To remove the leading and trailing spaces you'd do the following:

```sumo
| trim(" Hello World  ") as greeting
```

This would return a field named greeting with a new value of "Hello World".
