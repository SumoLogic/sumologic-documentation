---
id: isnumeric
title: isNumeric Search Operator
sidebar_label: isNumeric
---

The `isNumeric` operator checks whether a string is a valid Java number. Valid numbers include hexadecimals marked with the 0x or 0X qualifier, octal numbers, scientific notation and numbers marked with a type qualifier, like 123L.

## Syntax

* `isNumeric(\<string\>") as\<field\>`
* `isNumeric\<string_field\>) [as\<field\>]`

## Rules

* Returns `true` if the string is a valid Java number.
* Null and empty/blank strings will return `false`.
* Non-hexadecimal strings beginning with a leading zero are treated as octal values. Thus the string `09` will return false, since `9` is not a valid octal value. However, numbers beginning with `0` are treated as a decimal.

## Examples

```sql
| isNumeric(num)
```

The following returns `true`:

```sql
| isNumeric("1.56") as isNum
```

The following returns `true`:

```sql
| isNumeric("1e5") as isNum
```
