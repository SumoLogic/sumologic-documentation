---
id: trim
title: trim Search Operator
sidebar_label: trim
description: Use the trim operator to eliminate leading and trailing spaces from string fields.
---

The `trim` operator eliminates leading and trailing spaces from a string field.

## Syntax

`trim(<field>) as <field>`

`trim(" <string expression> ") as <field>`

## Examples

### Remove spaces from a literal string

Take the string value " Hello World  ". To remove the leading and trailing spaces you'd do the following:

```sumo
| trim(" Hello World  ") as greeting
```

This would return a field named greeting with a new value of "Hello World".

### Remove leading and trailing spaces from a parsed field

Use `trim` after parsing a field that may contain surrounding whitespace:

```sumo
_sourceCategory=Apache/Access
| parse "user=* " as username
| trim(username) as username
```
