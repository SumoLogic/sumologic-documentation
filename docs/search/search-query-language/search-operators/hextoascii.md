---
id: hextoascii
title: hexToAscii Search Operator
sidebar_label: hexToAscii
---

The `hexToAscii` operator converts a hexadecimal string to an ASCII string.

## Syntax

```sql
hexToAscii(<hexadecimal_field>) as <field>
```

```sql
hexToAscii("<hexadecimal string>") as <field>
```

## Example

The following returns `V` with a value of `hello world`:

```sql
| hexToAscii("68656c6c6f20776f726c640a") as V
```
