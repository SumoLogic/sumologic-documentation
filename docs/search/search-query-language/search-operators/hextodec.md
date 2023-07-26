---
id: hextodec
title: hexToDec Search Operator
sidebar_label: hexToDec
---

The `hexToDec` operator converts a hexadecimal string of 16 or fewer characters to a long data type using Two's Complement for negative values.

## Syntax

```sql
hexToDec("<hexadecimal string>") as <field>
```

```sql
hexToDec(<hexadecimal_field>) as <field>
```

## Examples

The following returns `V` with a value of `4919`

```sql
| hexToDec("0000000000001337") as V
```

```sql
... | count by _collector | decToHex(_count) as v | hexToDec(v) as h
```

```sql
... | count by _collector | where _count = hexToDec("7AF")
```
