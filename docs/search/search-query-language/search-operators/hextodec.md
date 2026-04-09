---
id: hextodec
title: hexToDec Search Operator
sidebar_label: hexToDec
---

The `hexToDec` operator converts a hexadecimal string of 16 or fewer characters to a long data type using Two's Complement for negative values.

## Syntax

```sumo
hexToDec("<hexadecimal string>") as <field>
```

```sumo
hexToDec(<hexadecimal_field>) as <field>
```

## Examples

The following returns `V` with a value of `4919`

```sumo
| hexToDec("0000000000001337") as V
```

```sumo
... | count by _collector | decToHex(_count) as v | hexToDec(v) as h
```

```sumo
... | count by _collector | where _count = hexToDec("7AF")
```
