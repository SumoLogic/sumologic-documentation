---
id: dectohex
title: decToHex Search Operator
sidebar_label: decToHex
---

The `decToHex` operator converts a long value of 16 or fewer digits to a hexadecimal string using Two's Complement for negative values.

:::note
Hexadecimal string is always returned in upper-case.
:::

## Syntax

```sql
decToHex(<long_field>) as <field>
```

```sql
decToHex("<long_string>") as <field>
```

## Examples

The following returns `V` with a value of `1337`:

```sql
| decToHex("4919") as V
```

```sql
... | count by _collector | decToHex(_count) as v
```

The following returns `d` with a value of `46`:

```sql
... | decToHex("70") as d
```
